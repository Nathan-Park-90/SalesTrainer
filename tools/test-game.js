#!/usr/bin/env node
// Unit tests for www/game.js (review engine, day log, streak, migrations) and the sync.js merge rules it relies on.
// Plain Node, no installs. Fake clock + fake localStorage, real course packs.
//   node tools/test-game.js             run the suite (exit 1 on any failure)
//   node tools/test-game.js --selftest  also plant bugs in copies of the sources and confirm the suite catches each one
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');

const WWW = path.join(__dirname, '..', 'www');
const read = f => fs.readFileSync(path.join(WWW, f), 'utf8');
const COURSE_FILES = fs.readdirSync(path.join(WWW, 'courses')).filter(f => f.endsWith('.js') && !f.startsWith('build'));
const SRC = { game: read('game.js'), sync: read('sync.js'), loader: read('course-loader.js'), courses: COURSE_FILES.map(f => [f, read('courses/' + f)]) };

class FakeStore {
    constructor(init) { this.m = new Map(Object.entries(init || {})); }
    get length() { return this.m.size; }
    key(i) { return [...this.m.keys()][i] ?? null; }
    getItem(k) { return this.m.has(k) ? this.m.get(k) : null; }
    setItem(k, v) { this.m.set(k, String(v)); }
    removeItem(k) { this.m.delete(k); }
    obj() { return Object.fromEntries(this.m); }
}
class ThrowingStore { get length() { throw new Error('denied'); } key() { throw new Error('denied'); } getItem() { throw new Error('denied'); } setItem() { throw new Error('denied'); } removeItem() { throw new Error('denied'); } }

// Local wall-clock time -> ms (the app works in the device's local time zone).
const at = (y, mo, d, h = 12, mi = 0) => new Date(y, mo - 1, d, h, mi).getTime();
const DAY = 864e5;

function loadWorld(src, store, nowMs) {
    const ctx = { console: { log() { }, warn() { }, error: console.error }, TextEncoder, TextDecoder, __now: nowMs };
    ctx.window = ctx;
    ctx.localStorage = store;
    vm.createContext(ctx);
    vm.runInContext('Date.now = () => __now;', ctx);
    src.courses.forEach(([f, s]) => vm.runInContext(s, ctx, { filename: f }));
    vm.runInContext(src.loader, ctx, { filename: 'course-loader.js' });
    vm.runInContext(src.game, ctx, { filename: 'game.js' });
    const G = ctx.Game;
    G.setNow = ms => { ctx.__now = ms; };
    return { ctx, G };
}
function loadSync(src) {
    const ctx = {
        console, TextEncoder, TextDecoder, localStorage: new FakeStore(), location: { hash: '', reload() { } },
        document: { readyState: 'loading', addEventListener() { } }, addEventListener() { }
    };
    ctx.window = ctx;
    vm.createContext(ctx);
    vm.runInContext(src.sync, ctx, { filename: 'sync.js' });
    return ctx.MammothSync;
}

function suite(src) {
    const results = [];
    const test = (name, fn) => {
        try { fn(); results.push([name, null]); } catch (e) { results.push([name, e.message || String(e)]); }
    };
    const eq = (a, b, msg) => { const x = JSON.stringify(a), y = JSON.stringify(b); if (x !== y) throw new Error(`${msg || 'mismatch'}: got ${x}, want ${y}`); };
    const ok = (c, msg) => { if (!c) throw new Error(msg || 'assertion failed'); };

    // One world with all the course packs; each test swaps in a fresh store and clock.
    const W = loadWorld(src, new FakeStore(), at(2026, 11, 3));
    const G = W.G;
    const fresh = (init, nowMs) => { G.env.store = new FakeStore(init); G.setNow(nowMs); G.reset(); return G.env.store; };
    const anyExam = (courseId, n) => [...G.index().exam.get(courseId)].slice(0, n || 1);

    test('SHA-1 matches Node crypto on every question text, ids match the Jake study-bank formula', () => {
        let n = 0;
        const ctx = { window: {} }; vm.createContext(ctx);
        src.courses.forEach(([f, s]) => vm.runInContext(s, ctx));
        for (const key of Object.keys(ctx).filter(k => k.startsWith('COURSE_'))) {
            const c = ctx[key], id = c.meta.id;
            const qs = (c.exam || []).concat(...(c.modules || []).map(m => [].concat(...(m.topics || []).map(t => t.quiz || []))));
            qs.forEach(q => {
                const want = `${id}:mc:${crypto.createHash('sha1').update(String(q.q).trim()).digest('hex').slice(0, 10)}`;
                const got = `${id}:mc:${G.hash10(q.q)}`;
                if (got !== want) throw new Error(`id mismatch for ${want}`);
                n++;
            });
        }
        ok(n > 500, 'expected hundreds of questions, got ' + n);
        eq(G.hash10('  Which service?\t '), crypto.createHash('sha1').update('Which service?').digest('hex').slice(0, 10), 'text is trimmed before hashing, like Jake');
        // Exam questions are indexed by object identity (the same objects the Arena draws).
        const aws = W.ctx.DATA.exam_aws;
        eq(aws.length, G.index().exam.get('aws-saa-c03').length, 'AWS exam index size');
        ok(G.qid(aws[0]) === 'aws-saa-c03:mc:' + crypto.createHash('sha1').update(aws[0].q.trim()).digest('hex').slice(0, 10), 'qid(object)');
    });

    test('40-day fake clock: boxes and due dates follow 0/+1/+3/+7/+16/+35', () => {
        fresh({}, at(2026, 11, 3, 9));
        const id = anyExam('aws-saa-c03')[0];
        let day = at(2026, 11, 3, 9);
        const want = [[1, '2026-11-04'], [2, '2026-11-07'], [3, '2026-11-14'], [4, '2026-11-30'], [5, '2027-01-04'], [5, '2027-02-08']];
        // Answer right on each due date (and every day in between, which must not move it early... except the
        // once-a-day rule still allows one move per day, so we only answer ON due dates here).
        const seen = [];
        for (let step = 0; step < want.length; step++) {
            G.setNow(day);
            const out = G.Review.record(id, true);
            const r = G.Review.get(id);
            seen.push([r.b, r.due]);
            ok(out.moved, 'should move on its due day ' + step);
            day = new Date(r.due + 'T09:00:00').getTime();
        }
        eq(seen, want, 'box/due sequence');
        // Through 40 days of daily study the box can't jump more than one per day.
        fresh({}, at(2026, 11, 3, 9));
        for (let d = 0; d < 40; d++) {
            G.setNow(at(2026, 11, 3, 9) + d * DAY);
            G.Review.record(id, true); G.Review.record(id, true); G.Review.record(id, true);
            const r = G.Review.get(id);
            eq(r.b, Math.min(5, d + 1), 'box on day ' + d);
        }
        eq(G.Review.get(id).n, 120, 'times seen');
        eq(G.Review.get(id).r, 120, 'times right');
    });

    test('Wrong -> box 0, due tomorrow; misses count; nemesis at 2 misses until mastered; rematch flag', () => {
        fresh({}, at(2026, 11, 3, 10));
        const id = anyExam('aws-saa-c03')[0];
        G.Review.record(id, true);                      // box 1
        let out = G.Review.record(id, false);
        let r = G.Review.get(id);
        eq([r.b, r.due, r.m], [0, '2026-11-04', 1], 'after a miss');
        ok(!out.nemesis, 'one miss is not a nemesis');
        out = G.Review.record(id, false);
        ok(out.nemesis && G.Review.nemesis(id), 'two misses = nemesis');
        out = G.Review.record(id, true);                // same day: box already moved today -> stays 0
        ok(out.rematch, 'clearing a box-0 miss is a rematch');
        eq(G.Review.get(id).b, 0, 'no second move on the same day (it moved 0->1 earlier today)');
        for (let d = 1; d <= 3; d++) { G.setNow(at(2026, 11, 3, 10) + d * DAY); out = G.Review.record(id, true); }
        r = G.Review.get(id);
        eq(r.b, 3, 'three separate right days -> box 3');
        ok(out.mastered, 'reaching box 3 reports mastered');
        ok(!G.Review.nemesis(id), 'nemesis cleared once mastered');
        // Rematch inside the same sitting on a fresh question: miss then right moves it to box 1, no further.
        fresh({}, at(2026, 11, 3, 10));
        G.Review.record(id, false);
        out = G.Review.record(id, true);
        ok(out.rematch && out.moved, 'rematch clears it');
        eq(G.Review.get(id).b, 1, 'rematch promotes to box 1 only');
        G.Review.record(id, true);
        eq(G.Review.get(id).b, 1, 'still box 1 the same day');
    });

    test('Day rolls over at 04:00 local; 5 answers count the day; missed day resets the streak', () => {
        const id = anyExam('aws-saa-c03')[0];
        const s = fresh({}, at(2026, 11, 3, 23, 50));
        eq(G.dayKey(at(2026, 11, 4, 0, 10)), '2026-11-03', '00:10 belongs to the day before');
        eq(G.dayKey(at(2026, 11, 4, 4, 10)), '2026-11-04', '04:10 is the new day');
        for (let i = 0; i < 5; i++) G.Review.record(id, i % 2 === 0);
        G.setNow(at(2026, 11, 4, 0, 10));
        for (let i = 0; i < 5; i++) G.Review.record(id, true);
        eq(G.Day.log()['2026-11-03'], { a: 10, c: 8 }, '23:50 + 00:10 = one day of 10');
        eq(G.Day.streak().days, 1, 'one day');
        G.setNow(at(2026, 11, 4, 4, 10));
        for (let i = 0; i < 4; i++) G.Review.record(id, true);
        eq(G.Day.streak().days, 1, '4 answers do not count the new day yet, streak still alive from yesterday');
        G.Review.record(id, true);
        eq(G.Day.streak().days, 2, '5th answer counts the day');
        ok(G.Day.justHitGoal, 'goal flag set when the 5th answer lands');
        eq(s.getItem('st_streak'), '2', 'st_streak kept in step');
        eq(s.getItem('st_last_daily'), new Date(2026, 10, 4).toDateString(), 'st_last_daily keeps the old toDateString format');
        // Skip Nov 5 entirely; on Nov 6 the streak is gone.
        G.setNow(at(2026, 11, 6, 12));
        eq(G.Day.streak().days, 0, 'a missed day resets');
        G.migrate();
        eq(s.getItem('st_streak'), '0', 'load-time sync writes the reset');
        G.Day.markDaily();
        eq(G.Day.streak().days, 1, 'a passed Daily lesson counts the day');
        eq(G.Day.today().done, true, 'today done');
    });

    test('Legacy streak migrates into the day log only while it is alive, once', () => {
        let s = fresh({ st_streak: '7', st_last_daily: new Date(2026, 10, 2).toDateString() }, at(2026, 11, 3, 12));
        G.migrate();
        eq(G.Day.streak().days, 7, 'alive streak (last = yesterday) kept');
        eq(s.getItem('st_streak'), '7');
        G.migrate(); G.migrate();
        eq(Object.keys(G.Day.log()).length, 7, 'second migration adds nothing');
        s = fresh({ st_streak: '4', st_last_daily: new Date(2026, 10, 3).toDateString() }, at(2026, 11, 3, 12));
        G.migrate();
        eq(G.Day.streak().days, 4, 'last = today kept');
        s = fresh({ st_streak: '9', st_last_daily: new Date(2026, 9, 29).toDateString() }, at(2026, 11, 3, 12));
        G.migrate();
        eq(G.Day.streak().days, 0, 'dead streak not resurrected');
        eq(s.getItem('st_streak'), '0');
        s = fresh({}, at(2026, 11, 3, 12));
        G.migrate();
        eq(s.getItem('st_streak'), '0', 'fresh profile');
        // Day log keeps 90 days.
        const log = {}; for (let i = 0; i < 120; i++) log[G.addDays('2026-11-03', -i)] = { a: 5, c: 5 };
        s = fresh({ st_daylog: JSON.stringify(log) }, at(2026, 11, 3, 12));
        G.Review.record(anyExam('aws-saa-c03')[0], true);
        ok(Object.keys(G.Day.log()).length <= 91, 'trimmed to 90 days, got ' + Object.keys(G.Day.log()).length);
    });

    test('st_failed_qs migrates to box-0 records, keeps newer records, is idempotent, and is removed', () => {
        const aws = W.ctx.DATA.exam_aws;
        const [q1, q2, q3] = aws;
        const id2 = G.qid(q2);
        const later = { b: 2, t: 1790000000, due: '2026-11-05', n: 3, r: 3, m: 0, u: '2026-11-02' };
        const s = fresh({ st_failed_qs: JSON.stringify([q1.q, '  ' + q2.q + ' ', 'text that matches nothing']), st_review: JSON.stringify({ [id2]: later }) }, at(2026, 11, 3, 12));
        G.migrate();
        ok(s.getItem('st_failed_qs') === null, 'legacy key removed');
        const r1 = G.Review.get(G.qid(q1));
        eq([r1.b, r1.m, r1.due], [0, 1, '2026-11-03'], 'missed question is due now at box 0');
        eq(G.Review.get(id2), later, 'a newer record is never overwritten');
        ok(!G.Review.get(G.qid(q3)), 'unrelated question untouched');
        eq(G.Review.priority(G.qid(q1)), 0, 'migrated miss draws first');
        eq(G.Review.priority(G.qid(q3)), 1, 'unseen next');
        eq(G.Review.priority(id2), 2, 'not due last');
        const before = s.getItem('st_review');
        s.setItem('st_failed_qs', JSON.stringify([q1.q]));   // an old backup imported later
        G.reset(); G.migrate();
        eq(s.getItem('st_review'), before, 'second migration changes nothing');
        eq(G.Review.due('aws-saa-c03'), [G.qid(q1)], 'due list');
    });

    test('Mastery, decay and readiness follow the blueprint weights', () => {
        fresh({}, at(2026, 11, 3, 12));
        const m0 = G.Review.mastery('aws-saa-c03');
        eq(m0.domains.map(d => [d.domain, d.weight, d.n]), [['Secure', 30, 61], ['Resilient', 26, 56], ['Performance', 24, 50], ['Cost', 20, 46]], 'AWS domains');
        eq(m0.readiness, 0, 'nothing mastered');
        ok(m0.measurable, 'AWS domains all have 15+ questions');
        const secure = [...G.index().exam.get('aws-saa-c03')].filter(id => G.entry(id).domain === 'Secure');
        const recs = {};
        secure.forEach(id => { recs[id] = { b: 3, t: 1, due: '2026-11-10', n: 3, r: 3, m: 0 }; });
        G.env.store.setItem('st_review', JSON.stringify(recs)); G.reset();
        const m1 = G.Review.mastery('aws-saa-c03');
        eq(m1.domains[0].pct, 1, 'Secure fully mastered');
        eq(m1.domains[0].hp, 0, 'Secure boss HP 0');
        ok(Math.abs(m1.readiness - 0.30) < 1e-9, 'readiness = 0.30, got ' + m1.readiness);
        ok(!m1.bossReady, 'final boss still locked');
        // Box 3 interval is 7 days: 7 days late still counts, 8 days late counts half.
        G.setNow(at(2026, 11, 17, 12));
        eq(G.Review.mastery('aws-saa-c03').domains[0].pct, 1, '7 days overdue still mastered');
        G.setNow(at(2026, 11, 18, 12));
        eq(G.Review.mastery('aws-saa-c03').domains[0].pct, 0.5, '8 days overdue counts half');
        const cp = G.Review.mastery('comptia-cloudplus');
        ok(!cp.measurable, 'Cloud+ is a thin bank');
        const psm = G.Review.mastery((W.ctx.DATA._courseMeta.find(m => /psm|scrum/i.test(m.id)) || {}).id);
        ok(psm.domains.length >= 1, 'a pack without a blueprint still reports domains');
    });

    test('Track: defaults to AWS, set/get, unknown id falls back, corrupt value ignored', () => {
        const s = fresh({}, at(2026, 11, 3, 12));
        eq(G.Track.get(), 'aws-saa-c03', 'default');
        G.Track.set('psm-scrum');
        eq(G.Track.get(), W.ctx.DATA._courseMeta.some(m => m.id === 'psm-scrum') ? 'psm-scrum' : 'aws-saa-c03');
        eq(JSON.parse(s.getItem('st_active_track')).t, Math.floor(at(2026, 11, 3, 12) / 1000), 'timestamped');
        s.setItem('st_active_track', JSON.stringify({ id: 'no-such-course', t: 5 }));
        eq(G.Track.get(), 'aws-saa-c03', 'unknown id');
        s.setItem('st_active_track', '{nope');
        eq(G.Track.get(), 'aws-saa-c03', 'corrupt');
    });

    test('Corrupt or unavailable storage never throws', () => {
        const id = anyExam('aws-saa-c03')[0];
        fresh({ st_review: '{nope', st_daylog: '[1,2]', st_failed_qs: 'xx', st_streak: 'abc', st_last_daily: 'garbage' }, at(2026, 11, 3, 12));
        G.migrate();
        G.Review.record(id, true);
        eq(G.Review.get(id).b, 1, 'recovers with a fresh record');
        G.env.store = new ThrowingStore(); G.reset();
        G.migrate();
        const out = G.Review.record(id, false);
        eq(out.box, 0, 'still answers in memory');
        G.Review.mastery('aws-saa-c03'); G.Day.streak(); G.Track.get(); G.Track.set('x');
        G.env.store = null; G.reset();
        G.Review.record(id, true); G.migrate();
    });

    // ---------- sync.js merge rules ----------
    const S = loadSync(src);
    const recA = { b: 3, t: 200, due: '2026-11-10', n: 5, r: 4, m: 0 };
    const recB = { b: 0, t: 300, due: '2026-11-04', n: 6, r: 4, m: 1 };
    const A = {
        st_review: JSON.stringify({ q1: recA, q2: { b: 1, t: 50, due: '2026-11-02', n: 1, r: 1, m: 0 } }),
        st_daylog: JSON.stringify({ '2026-11-01': { a: 9, c: 7 }, '2026-11-02': { a: 2, c: 2 } }),
        st_active_track: JSON.stringify({ id: 'aws-saa-c03', t: 100 }),
        st_streak: '3', st_fc_mastered: JSON.stringify(['a'])
    };
    const B = {
        st_review: JSON.stringify({ q1: recB, q3: { b: 2, t: 10, due: '2026-11-06', n: 2, r: 2, m: 0 } }),
        st_daylog: JSON.stringify({ '2026-11-02': { a: 6, c: 1 }, '2026-11-03': { a: 0, c: 0, d: 1 }, '2026-11-01': { a: 1, c: 1, d: 1 } }),
        st_active_track: JSON.stringify({ id: 'psm-scrum', t: 150 }),
        st_failed_qs: JSON.stringify(['old text'])
    };

    test('Merge: st_review per question newest t, st_daylog per date higher a (+ Daily flag), track newest', () => {
        const ab = S.smartMerge(A, B);
        const r = JSON.parse(ab.st_review);
        eq(r.q1, recB, 'newer answer wins');
        ok(r.q2 && r.q3, 'records only on one side are kept');
        const d = JSON.parse(ab.st_daylog);
        eq(d['2026-11-01'], { a: 9, c: 7, d: 1 }, 'higher a kept, Daily pass from the other device kept');
        eq(d['2026-11-02'], { a: 6, c: 1 }, 'the busier device wins the date');
        eq(d['2026-11-03'], { a: 0, c: 0, d: 1 }, 'new date added');
        eq(JSON.parse(ab.st_active_track).id, 'psm-scrum', 'newest track choice');
        eq(ab.st_failed_qs, B.st_failed_qs, 'legacy key carried over as-is (game.js migrates it on reload)');
    });

    test('Merge is idempotent and symmetric: A<-B, B<-A, repeat', () => {
        const ab = S.smartMerge(A, B), ba = S.smartMerge(B, A);
        ['st_review', 'st_daylog', 'st_active_track'].forEach(k => eq(JSON.parse(ab[k]) && sortKeys(JSON.parse(ab[k])), sortKeys(JSON.parse(ba[k])), k + ' symmetric'));
        const again = S.smartMerge(ab, B);
        eq(again, ab, 'merging the same backup twice changes nothing (byte for byte)');
        const round = S.smartMerge(ab, ba);
        eq(Object.keys(round).sort().map(k => [k, k.startsWith('st_') && /^[[{]/.test(round[k]) ? sortKeys(JSON.parse(round[k])) : round[k]]),
            Object.keys(ab).sort().map(k => [k, k.startsWith('st_') && /^[[{]/.test(ab[k]) ? sortKeys(JSON.parse(ab[k])) : ab[k]]), 'A+B merged with B+A is stable');
        eq(S.smartMerge(A, A), A, 'self-merge is a no-op');
    });

    test('Backup validation: st_failed_qs no longer union-checked, object keys must be objects', () => {
        const mk = keys => ({ app: 'mammoth-academy', version: 1, keys, checksum: S.crc32(S.canonical(keys)) });
        eq(S.validate(mk({ st_review: '{}', st_daylog: '{}', st_active_track: '{"id":"x","t":1}' })), null, 'good backup');
        ok(S.validate(mk({ st_review: '[1]' })), 'array st_review rejected');
        ok(S.validate(mk({ st_daylog: '{nope' })), 'corrupt st_daylog rejected');
        eq(S.validate(mk({ st_failed_qs: 'not even json' })), null, 'legacy key is no longer validated as a list');
        const merged = S.smartMerge({ st_failed_qs: '["a"]' }, { st_failed_qs: '["b"]' });
        eq(merged.st_failed_qs, '["a"]', 'no union for st_failed_qs any more');
    });

    return results;
}
function sortKeys(o) { return o && typeof o === 'object' && !Array.isArray(o) ? Object.keys(o).sort().reduce((a, k) => (a[k] = sortKeys(o[k]), a), {}) : o; }

function report(results, quiet) {
    const failed = results.filter(r => r[1]);
    if (!quiet) results.forEach(([n, e]) => console.log((e ? 'FAIL ' : 'ok   ') + n + (e ? '\n       ' + e : '')));
    return failed;
}

const all = suite(SRC);
const main = report(all);
console.log(`\n${main.length ? 'FAILED' : 'PASSED'}: ${all.length - main.length}/${all.length} tests`);
let exit = main.length ? 1 : 0;

if (process.argv.includes('--selftest')) {
    // Each planted bug must make at least one test fail; a bug the suite misses is a hole in the suite.
    const PLANTS = [
        ['game', 'box moves more than once a day', "if (r.u !== today) {", 'if (true) {'],
        ['game', 'no 04:00 rollover', 'const ROLLOVER_H = 4;', 'const ROLLOVER_H = 0;'],
        ['game', 'wrong interval table', 'const INTERVALS = [0, 1, 3, 7, 16, 35];', 'const INTERVALS = [0, 1, 2, 7, 16, 35];'],
        ['game', 'miss due today instead of tomorrow', 'r.due = addDays(today, 1);', 'r.due = today;'],
        ['game', 'migration overwrites newer records', 'if (recs[id]) return;              // already', 'if (false) return;              // already'],
        ['game', 'legacy streak seeded one day short', 'i < Math.min(streak, KEEP_DAYS)', 'i < Math.min(streak - 1, KEEP_DAYS)'],
        ['game', 'Daily pass no longer counts the day', 'counts: e => !!e && ((e.a | 0) >= DAY_GOAL || !!e.d),', 'counts: e => !!e && ((e.a | 0) >= DAY_GOAL),'],
        ['game', 'no decay', 'return late > INTERVALS[r.b | 0] ? 0.5 : 1;', 'return 1;'],
        ['game', 'SHA-1 without trim', "const hash10 = s => sha1hex(String(s).trim()).slice(0, 10);", "const hash10 = s => sha1hex(String(s)).slice(0, 10);"],
        ['sync', 'oldest review record wins', '|| num(x.t) > num(pa[id].t)) { pa[id] = x;', '|| num(x.t) < num(pa[id].t)) { pa[id] = x;'],
        ['sync', 'daylog sums instead of max', "if (!y || num(x.a) > num(y.a)) {", "if (!y || true) {"],
        ['sync', 'st_failed_qs back in the union', "const UNION_KEYS = ['st_fc_mastered',", "const UNION_KEYS = ['st_failed_qs', 'st_fc_mastered',"],
    ];
    console.log('\nself-test (planted bugs):');
    PLANTS.forEach(([file, name, from, to]) => {
        if (!SRC[file].includes(from)) { console.log(`  HOLE  ${name}: pattern not found in ${file}.js (update the self-test)`); exit = 1; return; }
        const mutated = Object.assign({}, SRC, { [file]: SRC[file].replace(from, to) });
        let failed;
        try { failed = report(suite(mutated), true); } catch (e) { failed = [[name, e.message]]; }
        if (failed.length) console.log(`  caught  ${name}  (${failed.length} test${failed.length > 1 ? 's' : ''} failed, e.g. "${failed[0][0]}")`);
        else { console.log(`  MISSED  ${name}`); exit = 1; }
    });
}
process.exit(exit);
