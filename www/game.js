/**
 * Mammoth Academy: game layer core (game.js, loaded on every page after course-loader.js, before app.js)
 *
 * One review history for every answer surface (Arena, lesson quizzes, Daily, the homepage card):
 *   Game.qid(question)            -> "<courseId>:mc:<sha1(text) first 10 hex>", the same id Jake's study bank uses
 *   Game.Review.record(qid, right) Leitner boxes 0-5 (+0, +1, +3, +7, +16, +35 days), up one box per day at most
 *   Game.Review.due / priority / mastery / readiness / nemesis
 *   Game.Day                      day log (st_daylog) and the derived streak (st_streak / st_last_daily kept in sync)
 *   Game.Track                    the active track (st_active_track), synced across devices
 *
 * Storage keys (all st_*, so Sync & Backup carries them; merge rules live in sync.js):
 *   st_review       {"<qid>":{b,t,due,n,r,m,u}}  b box, t last answer (epoch s), due "YYYY-MM-DD", n seen, r right,
 *                                                m misses since the question was last mastered, u day of the last box move
 *   st_daylog       {"YYYY-MM-DD":{a,c,d?}}      answers, correct, d = 1 when a Daily lesson was passed that day; 90 days kept
 *   st_active_track {"id","t"}
 * Days are the LOCAL date and roll over at 04:00, so late-night study counts for the day you're still in.
 * A day counts for the streak with 5+ answers anywhere, or a passed Daily lesson (the old rule, so nobody loses a day).
 * Every storage access is guarded: private windows and corrupt values never throw.
 */
(function (root) {
    'use strict';
    if (root.Game && root.Game.__v) return; // safe to load twice

    const INTERVALS = [0, 1, 3, 7, 16, 35];   // days until due after reaching box i
    const MASTERED = 3;
    const DAY_GOAL = 5;
    const ROLLOVER_H = 4;
    const KEEP_DAYS = 90;
    const MIN_DOMAIN_QS = 15;
    const DEFAULT_TRACK = 'aws-saa-c03';      // D4

    // ---------- clock + storage (both swappable for tests) ----------
    const env = {
        now: () => Date.now(),
        store: (() => { try { return root.localStorage; } catch (e) { return null; } })()
    };
    function get(k) { try { return env.store ? env.store.getItem(k) : null; } catch (e) { return null; } }
    function set(k, v) { try { if (env.store) env.store.setItem(k, v); } catch (e) { /* quota/private: drop */ } }
    function del(k) { try { if (env.store) env.store.removeItem(k); } catch (e) { } }
    function getJSON(k, fallback) {
        const raw = get(k);
        if (raw == null) return fallback;
        try { const v = JSON.parse(raw); return v && typeof v === 'object' && !Array.isArray(v) ? v : fallback; } catch (e) { return fallback; }
    }

    // ---------- days ----------
    const pad = n => (n < 10 ? '0' : '') + n;
    const ymd = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
    function dayKey(ms) {
        const d = new Date(ms == null ? env.now() : ms);
        d.setHours(d.getHours() - ROLLOVER_H);
        return ymd(d);
    }
    function parseDay(key) {                   // noon local, so DST shifts never move the date
        const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(key || ''));
        return m ? new Date(+m[1], +m[2] - 1, +m[3], 12) : null;
    }
    function addDays(key, n) { const d = parseDay(key); d.setDate(d.getDate() + n); return ymd(d); }
    function daysBetween(a, b) { return Math.round((parseDay(b) - parseDay(a)) / 864e5); } // b - a

    // ---------- SHA-1 (pure JS over UTF-8, matches Node's crypto in build-study-bank.js) ----------
    function sha1hex(str) {
        const bytes = new TextEncoder().encode(str);
        const len = bytes.length, words = new Uint32Array((((len + 8) >> 6) + 1) * 16);
        for (let i = 0; i < len; i++) words[i >> 2] |= bytes[i] << (24 - (i & 3) * 8);
        words[len >> 2] |= 0x80 << (24 - (len & 3) * 8);
        words[words.length - 1] = len * 8;
        let h0 = 0x67452301, h1 = 0xEFCDAB89, h2 = 0x98BADCFE, h3 = 0x10325476, h4 = 0xC3D2E1F0;
        const w = new Uint32Array(80);
        const rol = (x, n) => (x << n) | (x >>> (32 - n));
        for (let off = 0; off < words.length; off += 16) {
            for (let i = 0; i < 16; i++) w[i] = words[off + i];
            for (let i = 16; i < 80; i++) w[i] = rol(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1);
            let a = h0, b = h1, c = h2, d = h3, e = h4;
            for (let i = 0; i < 80; i++) {
                const f = i < 20 ? ((b & c) | (~b & d)) + 0x5A827999
                    : i < 40 ? (b ^ c ^ d) + 0x6ED9EBA1
                    : i < 60 ? ((b & c) | (b & d) | (c & d)) + 0x8F1BBCDC
                    : (b ^ c ^ d) + 0xCA62C1D6;
                const t = (rol(a, 5) + f + e + w[i]) | 0;
                e = d; d = c; c = rol(b, 30); b = a; a = t;
            }
            h0 = (h0 + a) | 0; h1 = (h1 + b) | 0; h2 = (h2 + c) | 0; h3 = (h3 + d) | 0; h4 = (h4 + e) | 0;
        }
        return [h0, h1, h2, h3, h4].map(h => (h >>> 0).toString(16).padStart(8, '0')).join('');
    }
    const hash10 = s => sha1hex(String(s).trim()).slice(0, 10);

    // ---------- question index (built lazily from the COURSE_* packs) ----------
    let idx = null;                            // { byId: Map(qid -> entry), byObj: WeakMap(question -> qid), byText: Map }
    const qText = q => (q && (q.q != null ? q.q : q.front)) || '';
    function buildIndex() {
        idx = { byId: new Map(), byObj: new WeakMap(), byText: new Map(), exam: new Map() };
        const packs = Object.keys(root).filter(k => /^COURSE_[A-Z]/.test(k)).map(k => root[k]).filter(p => p && p.meta && p.meta.id);
        packs.forEach(p => {
            const cid = p.meta.id;
            const examList = [];
            const add = (q, source, extra) => {
                const text = qText(q);
                if (!text) return;
                const id = cid + ':mc:' + hash10(text);
                idx.byObj.set(q, id);
                const prev = idx.byId.get(id);
                if (!prev || (source === 'exam' && prev.source !== 'exam')) {
                    idx.byId.set(id, Object.assign({ id, courseId: cid, source, q, domain: q.domain || '' }, extra));
                }
                const t = String(text).trim();
                if (!idx.byText.has(t)) idx.byText.set(t, new Set());
                idx.byText.get(t).add(id);
                if (source === 'exam') examList.push(id);
            };
            (p.exam || []).forEach(q => add(q, 'exam'));
            (p.modules || []).forEach((m, mi) => (m.topics || []).forEach((t, ti) => (t.quiz || []).forEach(q => add(q, 'lesson', { module: mi, topic: ti }))));
            (p.daily || []).forEach(l => (l.quiz || []).forEach(q => add(q, 'daily')));
            idx.exam.set(cid, [...new Set(examList)]);
        });
        return idx;
    }
    const index = () => idx || buildIndex();
    function qid(q, courseId) {
        if (!q) return null;
        const hit = index().byObj.get(q);
        if (hit) return hit;
        // A question object we haven't indexed (a copy, or a pack loaded later): hash it with the given course.
        return courseId && qText(q) ? courseId + ':mc:' + hash10(qText(q)) : null;
    }
    const courseOf = id => String(id).split(':mc:')[0];

    // ---------- review engine ----------
    let cache = null;
    function load() { if (!cache) cache = getJSON('st_review', {}); return cache; }
    function save() { set('st_review', JSON.stringify(cache)); }
    function rec(id) { const r = load()[id]; return r && typeof r === 'object' ? r : null; }

    function record(id, right) {
        if (!id) return null;
        const recs = load();
        const today = dayKey();
        const old = rec(id);
        const r = old ? Object.assign({}, old) : { b: 0, t: 0, due: today, n: 0, r: 0, m: 0 };
        const before = r.b | 0;
        r.b = Math.max(0, Math.min(5, before));
        r.n = (r.n | 0) + 1;
        r.t = Math.max(Math.floor(env.now() / 1000), (old && old.t | 0) + 1); // strictly newer, so merges keep this answer
        const out = { id, right: !!right, prevBox: before, rematch: false, mastered: false, moved: false, nemesis: false };
        if (right) {
            r.r = (r.r | 0) + 1;
            out.rematch = !!old && before === 0 && (r.m | 0) > 0;
            if (r.u !== today) {
                r.b = Math.min(5, before + 1);
                r.u = today;
                r.due = addDays(today, INTERVALS[r.b]);
                out.moved = true;
                if (r.b >= MASTERED && before < MASTERED) { out.mastered = true; r.m = 0; }
            }
        } else {
            r.b = 0;
            r.m = (r.m | 0) + 1;
            r.due = addDays(today, 1);
        }
        recs[id] = r;
        save();
        out.box = r.b;
        out.nemesis = isNemesis(r);
        Day.add(!!right);
        return out;
    }
    const isNemesis = r => !!r && (r.m | 0) >= 2 && (r.b | 0) < MASTERED;

    // 0 = due now (seen, due today or earlier, box 0 first), 1 = never seen, 2 = seen and not due yet.
    function priority(id) {
        const r = rec(id);
        if (!r) return 1;
        return !r.due || r.due <= dayKey() ? 0 : 2;
    }
    function due(courseId, limit) {
        const today = dayKey(), recs = load();
        const list = Object.keys(recs).filter(id => (!courseId || courseOf(id) === courseId) && recs[id] && (!recs[id].due || recs[id].due <= today));
        list.sort((a, b) => (recs[a].b - recs[b].b) || String(recs[a].due).localeCompare(String(recs[b].due)));
        return limit ? list.slice(0, limit) : list;
    }
    // Mastery credit for one question: 1 at box >= 3, 0.5 once it is overdue by more than its own interval.
    function credit(r, today) {
        if (!r || (r.b | 0) < MASTERED) return 0;
        const late = r.due ? daysBetween(r.due, today) : 0;
        return late > INTERVALS[r.b | 0] ? 0.5 : 1;
    }
    function mastery(courseId) {
        const meta = ((root.DATA && root.DATA._courseMeta) || []).find(m => m.id === courseId) || null;
        const ids = index().exam.get(courseId) || [];
        const today = dayKey();
        const bp = (meta && meta.examFormat && meta.examFormat.blueprint) || [];
        const doms = new Map();
        bp.forEach(d => doms.set(d.domain, { domain: d.domain, label: d.label || d.domain, weight: +d.weight || 0, n: 0, mastered: 0 }));
        ids.forEach(id => {
            const e = index().byId.get(id);
            const name = (e && e.domain) || 'Other';
            if (!doms.has(name)) {
                if (bp.length) return;           // not on the blueprint: doesn't count toward readiness
                doms.set(name, { domain: name, label: name, weight: 0, n: 0, mastered: 0 });
            }
            const d = doms.get(name);
            d.n++;
            d.mastered += credit(rec(id), today);
        });
        const list = [...doms.values()];
        if (!bp.length) list.forEach(d => { d.weight = d.n; }); // no blueprint: weight by bank size
        list.forEach(d => { d.pct = d.n ? d.mastered / d.n : 0; d.enough = d.n >= MIN_DOMAIN_QS; d.hp = Math.round(100 - d.pct * 100); });
        const totalW = list.reduce((s, d) => s + d.weight, 0);
        const readiness = totalW ? list.reduce((s, d) => s + d.weight * d.pct, 0) / totalW : 0;
        return {
            courseId, domains: list, readiness,
            measurable: list.length > 0 && list.every(d => d.enough),
            bossReady: list.length > 0 && list.every(d => d.enough && d.pct >= 0.8)
        };
    }

    // ---------- day log + streak ----------
    const Day = {
        log() { return getJSON('st_daylog', {}); },
        add(right) {
            const log = Day.log(), k = dayKey();
            const e = log[k] && typeof log[k] === 'object' ? log[k] : { a: 0, c: 0 };
            const hadGoal = Day.counts(e);
            e.a = (e.a | 0) + 1;
            if (right) e.c = (e.c | 0) + 1;
            log[k] = e;
            Day.write(log);
            if (!hadGoal && Day.counts(e)) Day.justHitGoal = true;
        },
        // A passed Daily lesson still counts the day, as it always has.
        markDaily() {
            const log = Day.log(), k = dayKey();
            const e = log[k] && typeof log[k] === 'object' ? log[k] : { a: 0, c: 0 };
            if (e.d) return;
            const hadGoal = Day.counts(e);
            e.d = 1;
            log[k] = e;
            Day.write(log);
            if (!hadGoal) Day.justHitGoal = true;
        },
        counts: e => !!e && ((e.a | 0) >= DAY_GOAL || !!e.d),
        write(log) {
            const oldest = addDays(dayKey(), -KEEP_DAYS);
            Object.keys(log).forEach(k => { if (!parseDay(k) || k < oldest) delete log[k]; });
            set('st_daylog', JSON.stringify(log));
            Day.sync(log);
        },
        today() { const e = Day.log()[dayKey()] || {}; return { a: e.a | 0, c: e.c | 0, goal: DAY_GOAL, done: Day.counts(e) }; },
        // Consecutive counting days ending today, or yesterday if today isn't done yet (the streak is still alive).
        streak(log) {
            log = log || Day.log();
            let k = dayKey();
            if (!Day.counts(log[k])) k = addDays(k, -1);
            let n = 0, last = null;
            while (Day.counts(log[k])) { if (!last) last = k; n++; k = addDays(k, -1); }
            if (!last) {                          // broken: remember the most recent counting day for st_last_daily
                last = Object.keys(log).filter(d => Day.counts(log[d])).sort().pop() || null;
            }
            return { days: n, last };
        },
        // st_streak / st_last_daily stay as the old pages, achievements and the kiosk read them.
        sync(log) {
            const s = Day.streak(log);
            set('st_streak', String(s.days));
            if (s.last) set('st_last_daily', parseDay(s.last).toDateString());
            return s;
        }
    };

    // ---------- active track ----------
    const Track = {
        get() {
            const metas = (root.DATA && root.DATA._courseMeta) || [];
            const s = getJSON('st_active_track', null);
            if (s && metas.some(m => m.id === s.id)) return s.id;
            if (metas.some(m => m.id === DEFAULT_TRACK) || !metas.length) return DEFAULT_TRACK;
            return metas[0].id;
        },
        set(id) { if (id) set('st_active_track', JSON.stringify({ id: String(id), t: Math.floor(env.now() / 1000) })); },
        meta() { return ((root.DATA && root.DATA._courseMeta) || []).find(m => m.id === Track.get()) || null; }
    };

    // ---------- migrations (both idempotent; run on every load, cheap when there's nothing to do) ----------
    function migrate() {
        // 1. Legacy streak -> day log. Only when there is no day log yet, and only if the old streak is still alive.
        if (get('st_daylog') == null) {
            const log = {};
            const streak = parseInt(get('st_streak') || '0', 10) || 0;
            const lastRaw = get('st_last_daily');
            const lastMs = lastRaw ? Date.parse(lastRaw) : NaN;
            if (streak > 0 && isFinite(lastMs)) {
                const last = ymd(new Date(lastMs));      // the old key is a plain local date (no 04:00 rollover)
                const gap = daysBetween(last, dayKey());
                if (gap >= 0 && gap <= 1) {
                    for (let i = 0; i < Math.min(streak, KEEP_DAYS); i++) log[addDays(last, -i)] = { a: 0, c: 0, d: 1, s: 1 };
                }
            }
            Day.write(log);
        } else {
            Day.sync(Day.log());                 // a broken streak shows 0 after a missed day, on every page
        }
        // 2. st_failed_qs (question texts) -> box-0 review records. Also catches an old backup imported later.
        const raw = get('st_failed_qs');
        if (raw != null) {
            let texts = [];
            try { const a = JSON.parse(raw); if (Array.isArray(a)) texts = a; } catch (e) { }
            const recs = load(), today = dayKey();
            let added = 0;
            texts.forEach(text => {
                const ids = index().byText.get(String(text).trim());
                if (!ids) return;
                ids.forEach(id => {
                    if (recs[id]) return;              // already reviewed since: the newer record wins
                    recs[id] = { b: 0, t: 0, due: today, n: 1, r: 0, m: 1 };
                    added++;
                });
            });
            if (added) save();
            del('st_failed_qs');
            Game.migrated = added;
        }
    }

    const Game = {
        __v: 1,
        INTERVALS, MASTERED, DAY_GOAL,
        env, sha1hex, hash10, dayKey, addDays, daysBetween,
        qid, courseOf, index,
        entry: id => index().byId.get(id) || null,
        Review: {
            record, priority, due, mastery, credit,
            get: rec,
            all: () => load(),
            nemesis: id => isNemesis(rec(id)),
            readiness: courseId => mastery(courseId).readiness,
            reload() { cache = null; }
        },
        Day, Track, migrate,
        // Tests swap the clock/storage, then call reset() to drop caches.
        reset() { cache = null; idx = null; Day.justHitGoal = false; }
    };
    root.Game = Game;
    try { migrate(); } catch (e) { if (root.console) console.warn('[game] migration skipped:', e); }
})(typeof window !== 'undefined' ? window : globalThis);
