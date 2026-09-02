const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const newCSS = 
/* ===================================================
   ENHANCEMENT STYLES — Added 2026-09-01
=================================================== */

/* ── Library Mini-Quiz ── */
.lesson-quiz {
    margin-top: 40px;
    padding: 28px 32px;
    background: rgba(56,189,248,0.04);
    border: 1px solid rgba(56,189,248,0.15);
    border-radius: 16px;
    border-top: 4px solid var(--accent-primary);
}
.quiz-header { margin-bottom: 20px; }
.quiz-eyebrow {
    display: block;
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--accent-primary);
    font-weight: 700;
    margin-bottom: 4px;
}
.quiz-subtitle { font-size: 0.9rem; color: var(--text-muted); }
.quiz-q-block { margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.quiz-q-block:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
.quiz-q-text { font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 12px; line-height: 1.6; }
.quiz-opts { display: flex; flex-direction: column; gap: 8px; }
.quiz-opt-btn {
    text-align: left;
    padding: 10px 16px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    color: var(--text-primary);
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
    line-height: 1.5;
}
.quiz-opt-btn:hover:not(:disabled) { border-color: var(--accent-primary); background: rgba(56,189,248,0.08); }
.quiz-opt-btn:disabled { cursor: default; opacity: 0.9; }
.quiz-opt-btn.qopt-correct { border-color: #22c55e !important; background: rgba(34,197,94,0.12) !important; color: #22c55e !important; }
.quiz-opt-btn.qopt-wrong   { border-color: #ef4444 !important; background: rgba(239,68,68,0.1) !important; color: #ef4444 !important; }
.quiz-exp {
    margin-top: 10px;
    padding: 10px 14px;
    background: rgba(0,0,0,0.2);
    border-radius: 8px;
    font-size: 0.88rem;
    line-height: 1.6;
    color: var(--text-secondary, #cbd5e1);
}

/* ── Related Modules ── */
.related-modules {
    margin-top: 28px;
    padding-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.07);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
}
.related-label {
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--text-muted);
    font-weight: 700;
    margin-right: 4px;
}
.related-link {
    padding: 6px 14px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 999px;
    background: rgba(255,255,255,0.04);
    color: var(--text-muted);
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
}
.related-link:hover { border-color: var(--accent-primary); color: var(--accent-primary); background: rgba(56,189,248,0.08); }

/* ── Explain it Differently ── */
.alt-analogy-wrap { margin-top: 20px; }
.alt-analogy-btn {
    padding: 8px 18px;
    border: 1px dashed rgba(255,255,255,0.2);
    border-radius: 999px;
    background: transparent;
    color: var(--text-muted);
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
}
.alt-analogy-btn:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
.alt-analogy-block {
    margin-top: 12px;
    padding: 16px 20px;
    background: rgba(139,92,246,0.08);
    border-left: 3px solid #8b5cf6;
    border-radius: 0 10px 10px 0;
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--text-secondary, #cbd5e1);
}

/* ── Flashcard Mastery Buttons ── */
.fc-mastery-row {
    display: flex;
    gap: 10px;
    margin-top: 16px;
    padding-top: 14px;
    border-top: 1px dashed rgba(255,255,255,0.08);
}
.fc-mastery-btn {
    flex: 1;
    padding: 9px 0;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.1);
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.2s ease;
}
.fc-btn-got { background: rgba(34,197,94,0.1); color: #22c55e; border-color: rgba(34,197,94,0.3); }
.fc-btn-got:hover { background: rgba(34,197,94,0.2); }
.fc-btn-still { background: rgba(239,68,68,0.08); color: #ef4444; border-color: rgba(239,68,68,0.25); }
.fc-btn-still:hover { background: rgba(239,68,68,0.15); }
.fc-mastery-counter {
    font-size: 0.78rem;
    color: var(--text-muted);
    text-align: center;
    margin-top: 8px;
}
.fc-mastery-bar {
    height: 3px;
    background: rgba(255,255,255,0.06);
    border-radius: 999px;
    margin-top: 6px;
    overflow: hidden;
}
.fc-mastery-fill {
    height: 100%;
    background: linear-gradient(90deg, #22c55e, #38bdf8);
    border-radius: 999px;
    transition: width 0.5s ease;
}

/* ── Progress Dashboard (Homepage) ── */
.progress-dashboard {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    max-width: 1100px;
    margin: 0 auto 40px;
}
.progress-stat {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px;
    padding: 20px 24px;
    text-align: center;
}
.progress-stat-value {
    font-size: 2rem;
    font-weight: 800;
    color: var(--text-primary);
    line-height: 1;
    margin-bottom: 4px;
}
.progress-stat-label {
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--text-muted);
    font-weight: 600;
}
.progress-stat.highlight .progress-stat-value { color: var(--accent-primary); }

/* ── Achievement Toast ── */
#achievement-toast {
    position: fixed;
    bottom: -120px;
    right: 24px;
    z-index: 9999;
    background: rgba(15,15,20,0.95);
    border: 1px solid rgba(255,255,255,0.12);
    border-left: 4px solid #FF9900;
    border-radius: 14px;
    padding: 16px 20px;
    max-width: 320px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    transition: bottom 0.4s cubic-bezier(0.34,1.56,0.64,1);
    backdrop-filter: blur(16px);
}
#achievement-toast.toast-visible { bottom: 24px; }
.achievement-glow {
    position: absolute; inset: 0;
    border-radius: 14px;
    background: radial-gradient(ellipse at top right, rgba(255,153,0,0.08), transparent 70%);
    pointer-events: none;
}
.achievement-inner { display: flex; align-items: center; gap: 14px; }
.achievement-icon { font-size: 2.2rem; line-height: 1; }
.achievement-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 1.5px; color: #FF9900; font-weight: 700; margin-bottom: 2px; }
.achievement-title { font-size: 1rem; font-weight: 800; color: var(--text-primary); }
.achievement-desc { font-size: 0.82rem; color: var(--text-muted); margin-top: 2px; }

/* ── Badge Wall ── */
.badge-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 14px; }
.badge-item {
    padding: 16px 12px;
    border-radius: 12px;
    text-align: center;
    border: 1px solid rgba(255,255,255,0.07);
    transition: all 0.2s ease;
}
.badge-earned {
    background: rgba(255,153,0,0.08);
    border-color: rgba(255,153,0,0.3);
}
.badge-locked {
    background: rgba(255,255,255,0.02);
    opacity: 0.4;
    filter: grayscale(1);
}
.badge-icon { font-size: 2rem; margin-bottom: 8px; }
.badge-name { font-size: 0.8rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.badge-desc { font-size: 0.72rem; color: var(--text-muted); line-height: 1.4; }

/* ── Exam Timer ── */
.exam-timer {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 999px;
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-primary);
    font-variant-numeric: tabular-nums;
    margin-bottom: 20px;
}
.exam-timer.timer-warning { color: #f59e0b; border-color: rgba(245,158,11,0.4); background: rgba(245,158,11,0.08); }
.exam-timer.timer-danger  { color: #ef4444; border-color: rgba(239,68,68,0.4); background: rgba(239,68,68,0.08); animation: pulse 1s infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.7} }

@media (max-width: 768px) {
    .progress-dashboard { grid-template-columns: repeat(2, 1fr); }
    .lesson-quiz { padding: 20px 16px; }
    .badge-grid { grid-template-columns: repeat(3, 1fr); }
}
;

css += newCSS;
fs.writeFileSync('style.css', css, 'utf8');
console.log('New styles added to style.css');
