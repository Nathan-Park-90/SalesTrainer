const fs = require('fs');

// ═══════════════════════════════
// PAGE AUDIT
// ═══════════════════════════════
const pages = ['index.html', 'curriculum.html', 'training.html', 'exam.html', 'daily.html', 'scrum.html'];
console.log('=== PAGE AUDIT ===');
pages.forEach(p => {
    const c = fs.readFileSync(p, 'utf8');
    const issues = [];
    if (!c.includes('width=device-width'))     issues.push('NO viewport');
    if (!c.includes('style.css'))              issues.push('NO stylesheet');
    if (!c.includes('daily.html'))             issues.push('Daily nav missing');
    if (!c.includes('particle-canvas'))        issues.push('NO particle canvas');
    if (!c.includes('data-js') && !c.includes('data.js')) issues.push('NO data.js');
    console.log(p + (issues.length ? '  ❌ ' + issues.join(' | ') : '  ✅'));
});

// ═══════════════════════════════
// DATA AUDIT
// ═══════════════════════════════
let content = fs.readFileSync('data.js', 'utf8');
let evalContent = content.replace('const DATA =', 'var DATA=');
eval(evalContent);

console.log('\n=== DATA AUDIT ===');
console.log('flashcards total:          ', DATA.flashcards ? DATA.flashcards.length : 0);
console.log('flashcards missing analogy:', DATA.flashcards ? DATA.flashcards.filter(c => !c.analogy).length : 'N/A');
console.log('exam_aws total:            ', DATA.exam_aws ? DATA.exam_aws.length : 0);
console.log('exam_aws missing exp:      ', DATA.exam_aws ? DATA.exam_aws.filter(q => !q.exp || q.exp.length < 10).length : 0);
console.log('exam_psm total:            ', DATA.exam_psm ? DATA.exam_psm.length : 0);
console.log('arch scenarios:            ', DATA.arch ? DATA.arch.length : 0);
console.log('daily lessons:             ', DATA.daily_lessons ? DATA.daily_lessons.length : 0);
console.log('course modules:            ', DATA.course ? DATA.course.length : 0);
console.log('sales scenarios:           ', DATA.sales ? DATA.sales.length : 0);

const domains = {};
if (DATA.exam_aws) DATA.exam_aws.forEach(q => {
    const d = q.domain || 'None';
    domains[d] = (domains[d] || 0) + 1;
});
console.log('\n=== DOMAIN DISTRIBUTION ===');
console.log(domains);

if (DATA.daily_lessons) {
    const dlIssues = DATA.daily_lessons.filter(d => !d.slides || d.slides.length < 3 || !d.quiz || d.quiz.length < 5);
    console.log('\n=== DAILY LESSONS INCOMPLETE ===', dlIssues.length > 0 ? dlIssues.map(d => d.concept) : 'None');
}

// ═══════════════════════════════
// CSS AUDIT
// ═══════════════════════════════
const css = fs.readFileSync('style.css', 'utf8');
console.log('\n=== CSS AUDIT ===');
console.log('768px breakpoint present:', css.includes('max-width: 768px') ? '✅' : '❌');
console.log('900px breakpoint present:', css.includes('max-width: 900px') ? '✅' : '❌');
console.log('backdrop-filter present: ', css.includes('backdrop-filter') ? '✅' : '❌');
console.log('library-tabs defined:    ', css.includes('.library-tabs') ? '✅' : '❌');
console.log('study-tabs defined:      ', css.includes('.study-tabs') ? '✅ (ShorinjiGame port only)' : '❌');

// ═══════════════════════════════
// APP.JS FUNCTION CHECK
// ═══════════════════════════════
const appjs = fs.readFileSync('app.js', 'utf8');
console.log('\n=== APP.JS FUNCTION AUDIT ===');
const fns = ['startExam', 'submitExamA', 'renderExamQ', 'nextExamQ', 'renderFlashcard', 'renderArch', 'verifyArch', 'renderLessonTOC', 'renderLessonContent', 'renderScenarios', 'renderThreats'];
fns.forEach(fn => {
    console.log(fn + ':', appjs.includes(fn) ? '✅' : '❌ MISSING');
});

console.log('\n=== AUDIT COMPLETE ===');
