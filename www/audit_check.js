const fs = require('fs');

// Load data
let content = fs.readFileSync('data.js', 'utf8');
let evalContent = content.replace('const DATA =', 'var DATA=');
eval(evalContent);

console.log('======================================');
console.log('  SALESTRAINER FULL AUDIT REPORT');
console.log('======================================');

// 1. DATA INTEGRITY
console.log('\n[1] DATA INTEGRITY');
console.log('  Flashcards:', DATA.flashcards ? DATA.flashcards.length : 'MISSING');
console.log('  exam_aws:', DATA.exam_aws ? DATA.exam_aws.length : 'MISSING');
console.log('  exam_psm:', DATA.exam_psm ? DATA.exam_psm.length : 'MISSING');
console.log('  arch:', DATA.arch ? DATA.arch.length : 'MISSING');
console.log('  daily_lessons:', DATA.daily_lessons ? DATA.daily_lessons.length : 'MISSING');
console.log('  course:', DATA.course ? DATA.course.length : 'MISSING');
console.log('  sales:', DATA.sales ? DATA.sales.length : 'MISSING');

// 2. FLASHCARD ISSUES
console.log('\n[2] FLASHCARDS');
let noAnalogy = DATA.flashcards.filter(c => !c.analogy);
let noBack = DATA.flashcards.filter(c => !c.back && !c.ans);
console.log('  Missing analogy:', noAnalogy.length);
console.log('  Missing answer:', noBack.length);

// 3. EXAM QUESTION ISSUES
console.log('\n[3] EXAM_AWS QUESTION HEALTH');
let domains = {};
let issues = [];
DATA.exam_aws.forEach((q, i) => {
    if (!q.domain) issues.push('Q' + i + ': missing domain');
    if (!q.exp) issues.push('Q' + i + ': missing explanation');
    if (q.ans === undefined) issues.push('Q' + i + ': missing ans');
    if (!q.opts || q.opts.length < 4) issues.push('Q' + i + ': fewer than 4 options');
    domains[q.domain] = (domains[q.domain] || 0) + 1;
});
console.log('  Issues found:', issues.length, issues.length ? '(first 3: ' + issues.slice(0,3).join('; ') + ')' : '');
let total = DATA.exam_aws.length;
Object.entries(domains).forEach(([d, n]) => {
    console.log('  ' + d + ': ' + n + ' (' + Math.round(n/total*100) + '%)');
});

// 4. ARCH SCENARIOS
console.log('\n[4] ARCHITECTURE SCENARIOS');
DATA.arch.forEach((sc, i) => {
    let status = [];
    if (!sc.palette || sc.palette.length === 0) status.push('NO PALETTE');
    if (!sc.zones || sc.zones.length === 0) status.push('NO ZONES');
    if (!sc.wm) status.push('NO WIN MSG');
    if (!sc.dm || Object.keys(sc.dm).length === 0) status.push('NO DECOYS');
    // Check all needed services exist in palette
    (sc.zones || []).forEach(z => {
        (z.needed || []).forEach(svc => {
            if (!sc.palette.includes(svc)) {
                status.push('NEEDED "' + svc + '" not in palette!');
            }
        });
    });
    console.log('  [' + (i+1) + '] ' + (sc.title || 'Untitled') + ': ' + (status.length ? '? ' + status.join(', ') : '? OK'));
});

// 5. DAILY LESSONS
console.log('\n[5] DAILY LESSONS');
DATA.daily_lessons.forEach((l, i) => {
    let status = [];
    if (!l.slides || l.slides.length < 3) status.push('< 3 slides');
    if (!l.quiz || l.quiz.length < 5) status.push('< 5 quiz Qs');
    (l.quiz || []).forEach((q, qi) => {
        if (q.ans === undefined) status.push('quiz Q' + qi + ' missing ans');
        if (!q.exp) status.push('quiz Q' + qi + ' missing exp');
    });
    console.log('  Day ' + (i+1) + ' ' + (l.concept || '?') + ': ' + (status.length ? '? ' + status.join(', ') : '? OK'));
});

// 6. SALES SCENARIOS
console.log('\n[6] SALES SCENARIOS');
DATA.sales.forEach((s, i) => {
    let status = [];
    if (!s.opts || s.opts.length < 3) status.push('< 3 options');
    const okCount = (s.opts || []).filter(o => o.ok).length;
    if (okCount === 0) status.push('NO correct answer');
    if (okCount > 1) status.push('MULTIPLE correct answers (' + okCount + ')');
    (s.opts || []).forEach((o, oi) => {
        if (!o.fb) status.push('opt' + oi + ' missing feedback');
    });
    console.log('  [' + (i+1) + '] ' + (s.persona || '?') + ': ' + (status.length ? '? ' + status.join(', ') : '? OK'));
});

// 7. COURSE MODULES
console.log('\n[7] COURSE MODULES');
let courseIssues = 0;
DATA.course.forEach((m, i) => {
    let status = [];
    if (!m.topics || m.topics.length === 0) status.push('NO TOPICS');
    (m.topics || []).forEach((t, ti) => {
        if (!t.prose && !t.content) status.push('topic ' + ti + ' missing prose');
    });
    if (status.length) {
        console.log('  Module ' + i + ' ' + m.title + ': ? ' + status.join(', '));
        courseIssues++;
    }
});
if (courseIssues === 0) console.log('  All 24 modules have prose. ?');

console.log('\n======================================');
console.log('  AUDIT COMPLETE');
console.log('======================================');
