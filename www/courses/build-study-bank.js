// Exports every course pack into study_bank/<course-id>.json for Jake the micromanager (FamilyOS on Nathan's home server), which
// drills Nathan in Discord and by voice. Run from the project root:  node www/courses/build-study-bank.js
// Then copy study_bank/*.json to the study coach (command in Nathan's private notes).
// Item ids are a hash of the question text, so Jake's spaced-repetition history survives reordering and new content;
// editing a question's wording starts that one question fresh.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');

const COURSES = path.join(__dirname);
const OUT = path.join(__dirname, '..', '..', 'study_bank');
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of fs.readdirSync(COURSES).filter(f => f.endsWith('.js') && !f.startsWith('build'))) {
    vm.runInContext(fs.readFileSync(path.join(COURSES, f), 'utf8'), ctx, { filename: f });
}
const hash = s => crypto.createHash('sha1').update(String(s).trim()).digest('hex').slice(0, 10);
fs.mkdirSync(OUT, { recursive: true });

for (const key of Object.keys(ctx).filter(k => k.startsWith('COURSE_'))) {
    const c = ctx[key];
    const id = c.meta.id;
    const items = [];
    (c.exam || []).forEach(q => items.push({
        id: `${id}:mc:${hash(q.q)}`, kind: 'mc', source: 'exam', q: q.q, opts: q.opts, ans: q.ans,
        exp: q.exp || '', domain: q.domain || '', module: '',
    }));
    (c.modules || []).forEach((m, mi) => (m.topics || []).forEach(t => (t.quiz || []).forEach(q => items.push({
        id: `${id}:mc:${hash(q.q)}`, kind: 'mc', source: 'lesson', q: q.q, opts: q.opts, ans: q.ans,
        exp: q.exp || '', domain: '', module: `Module ${mi + 1}: ${m.title}`, topic: t.title,
    }))));
    (c.flashcards || []).forEach(f => items.push({
        id: `${id}:fc:${hash(f.front)}`, kind: 'flash', q: f.front, back: f.back, analogy: f.analogy || '',
        domain: f.domain || '', module: '',
    }));
    const seen = new Set();
    const unique = items.filter(i => !seen.has(i.id) && seen.add(i.id));
    const bank = {
        course: id, name: c.meta.name, exam: c.meta.examName || c.meta.subtitle || '', passThreshold: c.meta.passThreshold || null,
        domains: c.meta.domains || {}, built: new Date().toISOString(), items: unique,
    };
    fs.writeFileSync(path.join(OUT, `${id}.json`), JSON.stringify(bank, null, 1));
    const mc = unique.filter(i => i.kind === 'mc').length;
    console.log(`${id.padEnd(22)} ${mc} multiple-choice, ${unique.length - mc} flashcards` +
                (unique.length < items.length ? ` (${items.length - unique.length} duplicates dropped)` : ''));
}
