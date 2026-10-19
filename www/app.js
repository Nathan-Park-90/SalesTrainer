// ==========================================
// 1. Theme Toggle
// ==========================================
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const target = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', target);
        });
    }
}

// ==========================================
// 2. Application Logic
// ==========================================
const app = {
    state: {
        currentCardIdx: 0,
        examActive: false,
        examScore: 0,
        examQIdx: 0,
        archSetup: null,
        activeLibraryTab: null, // resolved to the first loaded course pack in renderLessonTOC()
        activeModuleIdx: 0,
        activeTopicIdx: 0
    },



    init() {
        this.renderScenarios();
        this.renderThreats();
        
        // --- Amnesia Fix (localStorage) ---
        this.state.completedModules = JSON.parse(localStorage.getItem('st_completed')) || [];
        // highScore is loaded per exam type inside startExam() — different exams have
        // different question counts, so raw scores aren't comparable across types and
        // are tracked under separate keys.
        // ----------------------------------

        // Auto-load course UI if on curriculum page
        if (document.getElementById('lesson-toc')) {
            this.renderLibraryTabs();
            this.renderLessonTOC();
            this.renderLessonContent(0, 0); // Auto-load first topic immediately
        }

        // Auto-build the exam gauntlet buttons if on the Arena page
        if (document.getElementById('gauntlet-btn-container')) {
            this.renderExamGauntletButtons();
            this.bindExamKeys();
        }
    },

    // Build one exam card per course pack that declares an exam (and one per mode,
    // e.g. A+ Core 1 / Core 2 / Combined) — so a new exam-bearing subject needs
    // only a courses/*.js file with meta.examFormat, no arena.html edits.
    renderExamGauntletButtons() {
        const container = document.getElementById('gauntlet-btn-container');
        if (!container || !DATA._courseMeta) return;
        clearInterval(this.examTimer);

        const examPacks = DATA._courseMeta.filter(m => m.examKey && (DATA['exam_' + m.examKey] || []).length);
        const cards = [];
        examPacks.forEach(meta => {
            const modes = (meta.examFormat && meta.examFormat.modes) || [null];
            modes.forEach(mode => {
                const f = this.examFormatFor(meta, mode);
                const n = this.sampleExam(meta, mode, () => 0.5).length;
                cards.push(`
                    <button class="gauntlet-btn exam-card" style="--tab-color:${meta.color || '#00f2ff'};" onclick="app.startExam('${meta.examKey}'${mode ? `, '${mode.id}'` : ''})">
                        <span class="exam-card-name">${meta.icon || ''} ${f.name}</span>
                        <span class="exam-card-meta">${n} Qs &middot; ${f.minutes} min &middot; Pass ${f.passLabel}</span>
                    </button>`);
            });
        });
        container.innerHTML = `
            <label class="exam-practice-toggle">
                <input type="checkbox" id="exam-practice" ${localStorage.getItem('st_exam_practice') === '1' ? 'checked' : ''} onchange="localStorage.setItem('st_exam_practice', this.checked ? '1' : '0')">
                <span><strong>Practice mode</strong>: show the answer after each question. Leave off for real testing-center rules (no feedback until you submit).</span>
            </label>
            <div class="exam-card-grid">${cards.join('')}</div>`;

        const descEl = document.getElementById('gauntlet-desc');
        if (descEl && examPacks.length) {
            descEl.textContent = 'Questions are drawn to match each exam\'s official domain weights, with the ones you\'ve missed before drawn first. Flag questions, jump around with the question grid, and review before you submit.';
        }
    },

    // --- Flashcards ---
    renderFlashcard() {
        const ctr = document.getElementById('fc-container');
        if (!ctr || !DATA.flashcards || DATA.flashcards.length === 0) return;
        
        let card = DATA.flashcards[this.state.currentCardIdx];
        
        // Rebuilt to Accordion / Click-to-reveal approach
        ctr.innerHTML = `
            <div class="flashcard accordion-card" onclick="this.classList.toggle('flipped'); const b = this.querySelector('.card-back'); b.style.display = b.style.display === 'none' ? 'block' : 'none';">
                <div class="fc-badge">${card.cat}</div>
                <div class="card-front">
                    <h3>${card.front}</h3>
                    <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 20px;">Click to reveal answer</div>
                </div>
                <div class="card-back" style="display:none;">
                    <p>${card.back}</p>
                    ${card.analogy ? `<div class="fc-analogy"><strong>Analogy:</strong> ${card.analogy}</div>` : ''}
                </div>
            </div>
            
            <div class="fc-controls">
                <button class="btn-secondary" onclick="app.nextCard()">Next Card</button>
            </div>
            <div class="progress-text">Card ${this.state.currentCardIdx + 1} of ${DATA.flashcards.length}</div>
        `;
    },

    nextCard() {
        this.state.currentCardIdx++;
        if (this.state.currentCardIdx >= DATA.flashcards.length) {
            this.state.currentCardIdx = 0;
            alert("Syllabus complete! Restarting cycle.");
        }
        this.renderFlashcard();
    },

    // --- Architecture Sandbox ---
    initArchState() {
        if (typeof this.state.archIdx === 'undefined') this.state.archIdx = 0;
        if (this.state.archIdx >= DATA.arch.length) return false; // Done

        this.state.archSetup = DATA.arch[this.state.archIdx];
        this.state.archPalette = [...(this.state.archSetup.palette || this.state.archSetup.draggables || [])];
        this.state.archBoard = []; // Array of arrays mapping to zones
        if (this.state.archSetup.zones) {
            this.state.archSetup.zones.forEach(() => {
                this.state.archBoard.push([]);
            });
        }
        this.state.selectedSvc = null;
        this.state.selectedZoneId = null;
        this.state.archLocked = false;
        return true;
    },

    renderArch() {
        const archProb = document.getElementById('arch-problem');
        if (!archProb || !DATA.arch || DATA.arch.length === 0) return;
        
        // Ensure state is initialized
        if (!this.state.archBoard) {
            const hasMore = this.initArchState();
            if (!hasMore) {
                archProb.innerHTML = "<h3 style='color:var(--accent-success);'>Architecture Curriculum Complete!</h3><p>You have mastered all design patterns.</p>";
                document.getElementById('arch-palette').innerHTML = '';
                document.getElementById('arch-drop-zone').innerHTML = '';
                document.getElementById('arch-feedback').innerHTML = '';
                return;
            }
        }

        // Render Problem Statement
        archProb.innerHTML = `
            <div style="font-weight: bold; color: var(--accent-primary); margin-bottom: 10px;">Scenario ${this.state.archIdx + 1}: ${this.state.archSetup.title}</div>
            ${this.state.archSetup.problem || this.state.archSetup.desc || this.state.archSetup.brief}
        `;
        
        // Render Palette
        const palette = document.getElementById('arch-palette');
        let tokensHtml = `<div class="palette-title">Available Services</div>`;
        this.state.archPalette.forEach(svc => {
            const isSelected = this.state.selectedSvc === svc ? 'selected-token' : '';
            tokensHtml += `<div class="service-token ${isSelected}" onclick="app.selectService('${svc}')">${svc}</div>`;
        });
        palette.innerHTML = tokensHtml;
        
        // Render Drop Zones
        const dropZone = document.getElementById('arch-drop-zone');
        let zonesHtml = '';
        if (this.state.archSetup.zones) {
            this.state.archSetup.zones.forEach((z, i) => {
                const isActive = this.state.selectedZoneId === i ? 'active' : '';
                zonesHtml += `
                    <div class="arch-zone ${isActive}" onclick="app.selectZone(${i})">
                        <div class="arch-zone-title">${z.label || z.name}</div>
                        ${this.state.archBoard[i].map(svc => `
                            <div class="service-token in-zone" onclick="event.stopPropagation(); app.removeService('${svc}', ${i})">${svc}</div>
                        `).join('')}
                    </div>
                `;
            });
        }
        dropZone.innerHTML = zonesHtml;
        
        // Render Feedback & Buttons
        const fb = document.getElementById('arch-feedback');
        if (!this.state.archLocked) {
            fb.innerHTML = `
                <div style="display:flex; justify-content:space-between; margin-top:20px;">
                    <button class="btn-primary" style="background:transparent; border:1px solid var(--glass-border); color:var(--text-primary);" onclick="app.resetArch()">Reset Board</button>
                    <button class="btn-primary" onclick="app.verifyArch()">Verify Architecture</button>
                </div>
                <div id="arch-validation-msg" style="margin-top:20px;"></div>
            `;
        }
    },

    selectService(svc) {
        if (this.state.archLocked) return;
        
        // If a zone is already selected, drop it there instantly
        if (this.state.selectedZoneId !== null) {
            this.state.archBoard[this.state.selectedZoneId].push(svc);
            this.state.archPalette = this.state.archPalette.filter(s => s !== svc);
            
            // Clear selections
            this.state.selectedZoneId = null;
            this.state.selectedSvc = null;
            this.renderArch();
            
            const msg = document.getElementById('arch-validation-msg');
            if (msg) msg.innerHTML = '';
            return;
        }
        
        // Otherwise, select the service (or toggle off)
        if (this.state.selectedSvc === svc) {
            this.state.selectedSvc = null;
        } else {
            this.state.selectedSvc = svc;
        }
        this.renderArch();
    },

    selectZone(zoneId) {
        if (this.state.archLocked) return;
        
        // If a service is already selected, drop it here instantly
        if (this.state.selectedSvc !== null) {
            this.state.archBoard[zoneId].push(this.state.selectedSvc);
            this.state.archPalette = this.state.archPalette.filter(s => s !== this.state.selectedSvc);
            
            // Clear selections
            this.state.selectedZoneId = null;
            this.state.selectedSvc = null;
            this.renderArch();
            
            const msg = document.getElementById('arch-validation-msg');
            if (msg) msg.innerHTML = '';
            return;
        }
        
        // Otherwise, select the zone (or toggle off)
        if (this.state.selectedZoneId === zoneId) {
            this.state.selectedZoneId = null;
        } else {
            this.state.selectedZoneId = zoneId;
        }
        this.renderArch();
    },

    removeService(svc, zoneId) {
        if (this.state.archLocked) return;
        
        // Remove from zone
        this.state.archBoard[zoneId] = this.state.archBoard[zoneId].filter(s => s !== svc);
        
        // Put back in palette
        this.state.archPalette.push(svc);
        
        // Clear selections just in case
        this.state.selectedZoneId = null;
        this.state.selectedSvc = null;
        
        this.renderArch();
    },
    
    resetArch() {
        if (this.state.archLocked) return;
        this.initArchState();
        this.renderArch();
    },
    
    nextArch() {
        this.state.archIdx++;
        this.state.archBoard = null; // force re-init
        this.renderArch();
    },

    verifyArch() {
        const msg = document.getElementById('arch-validation-msg');
        if(!msg) return;
        
        const setup = this.state.archSetup;
        let isPerfect = true;
        
        // Check Decoys (dm)
        if (setup.dm) {
            for (const [decoyName, decoyMsg] of Object.entries(setup.dm)) {
                // Look for it anywhere on the board
                let isDecoyPresent = false;
                this.state.archBoard.forEach(zoneServices => {
                    if (zoneServices.includes(decoyName)) isDecoyPresent = true;
                });
                
                if (isDecoyPresent) {
                    msg.innerHTML = `<div style="color:var(--accent-danger); padding:15px; background:rgba(239, 68, 68, 0.1); border-radius:8px; border-left:4px solid var(--accent-danger);">${decoyMsg}</div>`;
                    return; // Fatal flaw
                }
            }
        }
        
        // Validate correct placement per zone
        let allPlaced = 0;
        let totalRequired = 0;
        
        setup.zones.forEach((z, i) => {
            const placedTokens = this.state.archBoard[i];
            if (z.correct) {
                totalRequired += z.correct.length;
                z.correct.forEach(reqSvc => {
                    if (!placedTokens.includes(reqSvc)) {
                        isPerfect = false;
                    } else {
                        allPlaced++;
                    }
                });
            }
        });
        
        // Check if they just placed nothing
        if (allPlaced === 0) {
            msg.innerHTML = '<span style="color:var(--accent-warning);">You must place services into the architecture zones.</span>';
            return;
        }

        if (isPerfect && allPlaced === totalRequired) {
            this.state.archLocked = true;
            this.state.selectedSvc = null;
            this.state.selectedZoneId = null;
            
            // Lock UI visually
            document.getElementById('arch-palette').style.opacity = '0.5';
            
            // Re-render to apply locks and show success button
            this.renderArch();
            
            const fb = document.getElementById('arch-feedback');
            fb.innerHTML = `
                <div style="color:var(--accent-success); padding:15px; background:rgba(16, 185, 129, 0.1); border-radius:8px; border-left:4px solid var(--accent-success); margin-bottom:15px;">
                    ${setup.wm || "Architecture Verified!"}
                </div>
                <button class="btn-primary" onclick="app.nextArch()">Next Scenario &rarr;</button>
            `;
        } else {
            msg.innerHTML = '<span style="color:var(--accent-warning);">Architecture validation failed. Check your placements and try again.</span>';
        }
    },

    // --- Sales Scenarios ---
    renderScenarios() {
        const grid = document.getElementById('scene-grid');
        if (!grid || !DATA.sales) return;
        
        let html = '';
        DATA.sales.forEach((scene, i) => {
            html += `
                <div class="scenario-card" onclick="this.classList.toggle('revealed')">
                    <div class="scenario-badge">${scene.type || 'Field Scenario'}</div>
                    <div class="scenario-title">${scene.prompt || scene.trigger || scene.scenario || 'Customer Interaction'}</div>
                    <div class="scenario-challenge" style="font-size:0.9rem; color:var(--text-muted); margin-bottom: 20px;">Think of your response, then click to reveal.</div>
                    
                    <div class="scenario-reveal" style="display: none; margin-top: 20px; border-top: 1px dashed var(--glass-border); padding-top: 20px;">
                        ${scene.bad ? `<div class="scenario-desc"><strong>Bad Frame:</strong> <span style="color:var(--accent-danger)">${scene.bad}</span></div>` : ''}
                        <div class="scenario-desc"><strong>Pro Frame:</strong> <span style="color:var(--accent-success)">${scene.good || scene.reframe || scene.ans || "Correct approach hidden."}</span></div>
                    </div>
                </div>
            `;
        });
        grid.innerHTML = html;
    },

    // --- Threat Intel ---
    renderThreats() {
        const ticker = document.getElementById('threat-ticker');
        if (!ticker) return;
        
        const threats = DATA.threats || [
            { trigger: "Ransomware targets on-prem SAN", hook: "Is your recovery tied to your primary network?" },
            { trigger: "Competitor drops price 40%", hook: "Price is what you pay when value is unestablished." },
            { trigger: "MSTR +15% overnight", hook: "Can your database handle the 10x read spike?" }
        ];
        
        let html = '';
        threats.forEach(t => {
            html += `<div class="threat-item"><strong>ALERT:</strong> ${t.trigger} &mdash; <em>${t.hook}</em></div>`;
        });
        ticker.innerHTML = html;
    },

    // --- Exam Simulator ---
    // Testing-center rules: no feedback until you submit (unless Practice mode is on),
    // flag for review, jump anywhere from the question grid, a real countdown that
    // auto-submits, and all-or-nothing grading for "Choose TWO" questions.

    // Correct answer(s) as option indices. Single-choice questions keep their original
    // numeric `ans`; multi-response ones use an array in `ans` (or `correct`).
    examCorrect(q) {
        if (Array.isArray(q.ans)) return q.ans;
        if (Array.isArray(q.correct)) return q.correct;
        if (typeof q.ans === 'number') return [q.ans];
        if (typeof q.correct === 'number') return [q.correct];
        return [q.correct_index || 0];
    },
    examIsMulti(q) { return q.type === 'multi' || this.examCorrect(q).length > 1; },
    examIsRight(q, chosen) {
        const c = this.examCorrect(q);
        return chosen.length === c.length && c.every(i => chosen.includes(i));
    },
    examOptText(o) { return (o && o.text) || o; },
    examExp(q) { return q.exp || q.explanation || q.back || 'No detailed explanation provided for this question.'; },
    // Why a wrong option is a trap: q.whyWrong (array aligned with opts, or {index: text}),
    // falling back to the older per-option `fb` field.
    examWhy(q, i) { return (q.whyWrong && q.whyWrong[i]) || (q.opts[i] && q.opts[i].fb) || ''; },
    examLetter(i) { return String.fromCharCode(65 + i); },

    // One exam's rules: the pack's meta.examFormat, overridden by a mode (A+ Core 1/2).
    examFormatFor(meta, mode) {
        const f = meta.examFormat || {};
        const m = mode || {};
        return {
            name: m.name || meta.examName || meta.name + ' Exam',
            questions: m.questions || f.questions || 65,
            minutes: m.minutes || meta.examDurationMinutes || 90,
            passThreshold: m.passThreshold || meta.passThreshold || 0.72,
            passLabel: m.passLabel || f.passLabel || Math.round((meta.passThreshold || 0.72) * 100) + '%',
            blueprint: m.blueprint || f.blueprint || [],
            parts: m.parts || null
        };
    },

    // Draw the exam. Each blueprint domain gets its official share of the questions
    // (largest-remainder rounding); slots a domain can't fill from the bank go to a
    // random fill from the rest. Inside every draw, questions missed before go first
    // (spaced repetition). A mode's blueprint also limits the pool to its domains.
    sampleExam(meta, mode, rand) {
        rand = rand || Math.random;
        const f = this.examFormatFor(meta, mode);
        let pool = DATA['exam_' + meta.examKey] || [];
        if (mode && f.blueprint.length) {
            const doms = new Set(f.blueprint.map(d => d.domain));
            pool = pool.filter(q => doms.has(q.domain));
        }
        const failed = new Set(JSON.parse(localStorage.getItem('st_failed_qs') || '[]'));
        const shuffle = list => list.map(q => [rand(), q]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
        const missedFirst = list => {
            const s = shuffle(list);
            return s.filter(q => failed.has(q.q || q.front)).concat(s.filter(q => !failed.has(q.q || q.front)));
        };
        const n = Math.min(f.questions, pool.length);
        const picked = new Set();
        const totalW = f.blueprint.reduce((s, d) => s + d.weight, 0);
        if (totalW > 0) {
            const quotas = f.blueprint.map(d => {
                const exact = n * d.weight / totalW;
                return { domain: d.domain, take: Math.floor(exact), rem: exact - Math.floor(exact) };
            });
            let left = n - quotas.reduce((s, x) => s + x.take, 0);
            [...quotas].sort((a, b) => b.rem - a.rem).forEach(x => { if (left > 0) { x.take++; left--; } });
            quotas.forEach(x => missedFirst(pool.filter(q => q.domain === x.domain)).slice(0, x.take).forEach(q => picked.add(q)));
        }
        missedFirst(pool.filter(q => !picked.has(q))).slice(0, n - picked.size).forEach(q => picked.add(q));
        return shuffle([...picked]); // served mixed, not in domain blocks
    },

    startExam(type, modeId) {
        const examPacks = (DATA._courseMeta || []).filter(m => m.examKey);
        if (!type) type = examPacks[0] && examPacks[0].examKey;
        const meta = examPacks.find(m => m.examKey === type);
        if (!meta) return;
        const mode = ((meta.examFormat && meta.examFormat.modes) || []).find(m => m.id === modeId) || null;
        const questions = this.sampleExam(meta, mode);
        if (!questions.length) return;
        const f = this.examFormatFor(meta, mode);
        const practiceEl = document.getElementById('exam-practice');

        this.exam = {
            type, meta, mode, f, questions,
            answers: questions.map(() => []),
            checked: questions.map(() => false), // practice mode: revealed and locked
            flagged: questions.map(() => false),
            idx: 0,
            practice: practiceEl ? practiceEl.checked : localStorage.getItem('st_exam_practice') === '1',
            gridOpen: false,
            reviewing: false,
            done: false,
            startedAt: Date.now(),
            endsAt: Date.now() + f.minutes * 60000 // wall-clock, so a sleeping tab can't stretch it
        };
        this.state.examActive = true;
        clearInterval(this.examTimer);
        this.examTimer = setInterval(() => this.tickExamTimer(), 1000);
        this.renderExamQ();
        this.scrollExamIntoView();
    },

    tickExamTimer() {
        const ex = this.exam;
        if (!ex || ex.done) { clearInterval(this.examTimer); return; }
        const left = Math.max(0, Math.round((ex.endsAt - Date.now()) / 1000));
        const el = document.getElementById('exam-timer');
        if (el) {
            el.querySelector('span').textContent = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0');
            el.className = 'exam-timer' + (left <= 300 ? ' timer-danger' : left <= 1200 ? ' timer-warning' : '');
        }
        if (left <= 0) { ex.timedOut = true; this.submitExam(); }
    },

    renderExamQ() {
        const ctr = document.getElementById('exam-container');
        const ex = this.exam;
        if (!ctr || !ex) return;
        if (ex.done) return this.renderExamResults();
        if (ex.reviewing) return this.renderExamReview();

        const q = ex.questions[ex.idx];
        const multi = this.examIsMulti(q);
        const correct = this.examCorrect(q);
        const need = correct.length;
        const chosen = ex.answers[ex.idx];
        const locked = ex.checked[ex.idx];
        const answered = ex.answers.filter(a => a.length).length;
        const flagged = ex.flagged.filter(Boolean).length;
        const WORDS = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'];

        const opts = q.opts.map((o, i) => {
            const sel = chosen.includes(i);
            let cls = sel ? ' selected' : '';
            if (locked) cls += correct.includes(i) ? ' correct' : sel ? ' wrong' : '';
            return `<button class="option-btn exam-opt${multi ? ' multi' : ''}${cls}" role="${multi ? 'checkbox' : 'radio'}" aria-checked="${sel}" ${locked ? 'disabled' : ''} onclick="app.chooseExamOpt(${i})">
                <span class="opt-mark"></span><span class="opt-letter">${this.examLetter(i)}.</span><span class="opt-text">${this.examOptText(o)}</span>
            </button>`;
        }).join('');

        ctr.innerHTML = `
            <div class="exam-shell">
                <div class="exam-topbar">
                    <div class="exam-topbar-title">${ex.f.name}${ex.practice ? ' <span class="exam-pill">Practice</span>' : ''}</div>
                    <div class="exam-timer" id="exam-timer">&#9201; <span>--:--</span></div>
                </div>
                <div class="exam-toolbar">
                    <div class="exam-counter">Question ${ex.idx + 1} of ${ex.questions.length}</div>
                    <button class="exam-tool flag${ex.flagged[ex.idx] ? ' on' : ''}" aria-pressed="${ex.flagged[ex.idx]}" onclick="app.toggleExamFlag()">&#128681; ${ex.flagged[ex.idx] ? 'Flagged' : 'Flag for Review'}</button>
                    <button class="exam-tool" aria-expanded="${ex.gridOpen}" onclick="app.toggleExamGrid()">&#9638; ${answered}/${ex.questions.length} answered${flagged ? ' &middot; ' + flagged + ' flagged' : ''} ${ex.gridOpen ? '&#9652;' : '&#9662;'}</button>
                </div>
                ${ex.gridOpen ? this.examGridHtml(false) : ''}
                ${multi ? `<div class="exam-select-badge">SELECT ${WORDS[need] || need}</div>` : ''}
                <div class="q-text">${q.q || q.front}</div>
                <div class="options-grid exam-opts" id="exam-opts" role="${multi ? 'group' : 'radiogroup'}">${opts}</div>
                <div class="exam-hint" id="exam-hint">${multi && !locked ? `Choose ${need}. ${chosen.length} of ${need} selected.` : ''}</div>
                ${ex.practice && multi && !locked ? `<button class="btn-primary exam-check" ${chosen.length === need ? '' : 'disabled'} onclick="app.checkExamQ()">Check Answer</button>` : ''}
                ${locked ? this.examExplainHtml(q, chosen) : ''}
                <div class="exam-nav">
                    <button class="exam-nav-btn" ${ex.idx === 0 ? 'disabled' : ''} onclick="app.gotoExamQ(${ex.idx - 1})">&larr; Previous</button>
                    ${ex.idx < ex.questions.length - 1 ? `<button class="exam-nav-btn primary" onclick="app.gotoExamQ(${ex.idx + 1})">Next &rarr;</button>` : ''}
                    <button class="exam-nav-btn submit" onclick="app.openExamReview()">Review &amp; Submit</button>
                </div>
            </div>`;
        this.tickExamTimer();
    },

    // Numbered tiles: answered / unanswered / flagged / current; tap one to jump there.
    examGridHtml(big) {
        const ex = this.exam;
        const tiles = ex.questions.map((q, i) => {
            const cls = (ex.answers[i].length ? 'answered' : 'unanswered') + (ex.flagged[i] ? ' flagged' : '') + (i === ex.idx && !ex.reviewing ? ' current' : '');
            const label = 'Question ' + (i + 1) + (ex.answers[i].length ? ', answered' : ', unanswered') + (ex.flagged[i] ? ', flagged' : '');
            return `<button class="exam-tile ${cls}" title="${label}" aria-label="${label}" onclick="app.gotoExamQ(${i})">${i + 1}</button>`;
        }).join('');
        return `<div class="exam-grid-wrap${big ? ' big' : ''}">
            <div class="exam-grid">${tiles}</div>
            <div class="exam-grid-legend"><span><i class="answered"></i>Answered</span><span><i class="unanswered"></i>Unanswered</span><span><i class="flagged"></i>Flagged</span></div>
        </div>`;
    },

    chooseExamOpt(i) {
        const ex = this.exam;
        if (!ex || ex.done || ex.reviewing || ex.checked[ex.idx]) return;
        const q = ex.questions[ex.idx];
        const need = this.examCorrect(q).length;
        const a = ex.answers[ex.idx];
        if (!this.examIsMulti(q)) {
            ex.answers[ex.idx] = [i];
            if (ex.practice) ex.checked[ex.idx] = true;
        } else if (a.includes(i)) {
            ex.answers[ex.idx] = a.filter(x => x !== i);
        } else if (a.length < need) {
            ex.answers[ex.idx] = a.concat(i).sort((x, y) => x - y);
        } else {
            // Like the real exam: you can't tick more boxes than it asks for.
            const hint = document.getElementById('exam-hint');
            if (hint) { hint.textContent = `Only ${need} allowed. Untick one first.`; hint.classList.add('warn'); }
            return;
        }
        this.renderExamQ();
    },

    checkExamQ() {
        const ex = this.exam;
        const q = ex.questions[ex.idx];
        if (ex.answers[ex.idx].length !== this.examCorrect(q).length) return;
        ex.checked[ex.idx] = true;
        this.renderExamQ();
    },

    gotoExamQ(i) {
        const ex = this.exam;
        if (!ex || ex.done || i < 0 || i >= ex.questions.length) return;
        ex.idx = i;
        ex.reviewing = false;
        this.renderExamQ();
        this.scrollExamIntoView();
    },
    toggleExamFlag() { const ex = this.exam; ex.flagged[ex.idx] = !ex.flagged[ex.idx]; this.renderExamQ(); },
    toggleExamGrid() { this.exam.gridOpen = !this.exam.gridOpen; this.renderExamQ(); },
    openExamReview() { this.exam.reviewing = true; this.renderExamQ(); this.scrollExamIntoView(); },

    // Keep the question (and the sticky timer bar) in view below the fixed site navbar.
    scrollExamIntoView() {
        const shell = document.querySelector('.exam-shell');
        const nav = document.querySelector('.navbar');
        if (!shell) return;
        const navH = nav ? nav.offsetHeight : 0;
        document.documentElement.style.setProperty('--exam-sticky-top', navH + 'px');
        const top = shell.getBoundingClientRect().top + window.scrollY - navH - 12;
        if (Math.abs(window.scrollY - top) > 4) window.scrollTo({ top, behavior: 'smooth' });
    },

    // Practice-mode reveal: the answer, why it wins, and why each other option is a trap.
    examExplainHtml(q, chosen) {
        const right = this.examIsRight(q, chosen);
        const correct = this.examCorrect(q);
        const traps = q.opts.map((o, i) => {
            if (correct.includes(i)) return '';
            const why = this.examWhy(q, i);
            const picked = chosen.includes(i);
            if (!why && !picked) return '';
            return `<li${picked ? ' class="picked"' : ''}><strong>${this.examLetter(i)}.</strong> ${picked ? '<span class="trap-tag">Your pick</span> ' : ''}${why || 'Not the best answer here; see why the answer wins above.'}</li>`;
        }).join('');
        return `<div class="exam-explain ${right ? 'right' : 'wrong'}">
            <div class="exam-explain-head">${right ? '&#10003; Correct' : '&#10007; Incorrect'} &middot; Answer: ${correct.map(i => this.examLetter(i)).join(', ')}</div>
            <div><strong>Why it wins:</strong> ${this.examExp(q)}</div>
            ${traps ? `<div class="exam-traps-head">Why the others are traps</div><ul class="exam-traps">${traps}</ul>` : ''}
        </div>`;
    },

    renderExamReview() {
        const ctr = document.getElementById('exam-container');
        const ex = this.exam;
        const unanswered = ex.answers.map((a, i) => a.length ? -1 : i).filter(i => i >= 0);
        const flagged = ex.flagged.map((f, i) => f ? i : -1).filter(i => i >= 0);
        const links = list => list.map(i => `<button class="exam-link" onclick="app.gotoExamQ(${i})">Q${i + 1}</button>`).join(' ');
        ctr.innerHTML = `
            <div class="exam-shell">
                <div class="exam-topbar">
                    <div class="exam-topbar-title">Review before you submit &middot; ${ex.f.name}</div>
                    <div class="exam-timer" id="exam-timer">&#9201; <span>--:--</span></div>
                </div>
                <div class="exam-review-stats">
                    <div><strong>${ex.questions.length - unanswered.length}</strong>answered</div>
                    <div class="${unanswered.length ? 'warn' : ''}"><strong>${unanswered.length}</strong>unanswered</div>
                    <div class="${flagged.length ? 'flag' : ''}"><strong>${flagged.length}</strong>flagged</div>
                </div>
                ${flagged.length ? `<p class="exam-review-line">&#128681; Flagged: ${links(flagged)}</p>` : ''}
                ${unanswered.length ? `<p class="exam-review-line">&#9888;&#65039; Unanswered (scored as wrong): ${links(unanswered)}</p>` : ''}
                ${this.examGridHtml(true)}
                <div class="exam-nav">
                    <button class="exam-nav-btn" onclick="app.gotoExamQ(${ex.idx})">&larr; Back to the exam</button>
                    <button class="exam-nav-btn submit" onclick="app.submitExam()">Submit Exam</button>
                </div>
            </div>`;
        this.tickExamTimer();
    },

    submitExam() {
        const ex = this.exam;
        if (!ex || ex.done) return;
        ex.done = true;
        ex.finishedAt = Date.now();
        clearInterval(this.examTimer);
        this.state.examActive = false;

        // Grade (all-or-nothing per question) and update the spaced-repetition list.
        const domainStats = {};
        const failed = new Set(JSON.parse(localStorage.getItem('st_failed_qs') || '[]'));
        ex.results = ex.questions.map((q, i) => {
            const right = this.examIsRight(q, ex.answers[i]);
            const dom = q.domain || 'Other';
            const s = domainStats[dom] = domainStats[dom] || { correct: 0, total: 0 };
            s.total++;
            if (right) { s.correct++; failed.delete(q.q || q.front); } else failed.add(q.q || q.front);
            return right;
        });
        localStorage.setItem('st_failed_qs', JSON.stringify([...failed]));
        ex.domainStats = domainStats;
        ex.score = ex.results.filter(Boolean).length;
        ex.pct = ex.score / ex.questions.length;
        if (ex.f.parts) {
            ex.partResults = ex.f.parts.map(p => {
                const idx = ex.questions.map((q, i) => i).filter(i => p.domains.includes(ex.questions[i].domain));
                const c = idx.filter(i => ex.results[i]).length;
                const pct = idx.length ? c / idx.length : 0;
                return { name: p.name, correct: c, total: idx.length, pct, bar: p.passThreshold, pass: idx.length > 0 && pct >= p.passThreshold };
            });
            ex.passed = ex.partResults.every(p => p.pass);
        } else {
            ex.passed = ex.pct >= ex.f.passThreshold;
        }

        // Stays compatible with Home and Smart Path: st_highscore_<exam> keeps its old
        // meaning (correct answers on a full-length run, read as score / min(bank, 65)),
        // so single-core A+ runs don't write it; every run updates the best percentage.
        if (!ex.mode || ex.mode.id === 'combined') {
            const best = localStorage.getItem('st_highscore_' + ex.type);
            if (best === null || ex.score > parseInt(best)) localStorage.setItem('st_highscore_' + ex.type, ex.score);
        }
        // Written on a first attempt even at 0%, so "attempted" shows up on the Smart Path.
        const prevPct = localStorage.getItem('st_highscore_pct_' + ex.type);
        const bestPct = parseFloat(prevPct || '0');
        if (prevPct === null || ex.pct > bestPct) localStorage.setItem('st_highscore_pct_' + ex.type, ex.pct.toFixed(4));
        ex.bestPct = Math.max(ex.pct, bestPct);

        // Domain performance accumulates across attempts, so the Smart Path can spot
        // genuinely weak domains instead of just the last exam's snapshot.
        const domKey = 'st_domain_perf_' + ex.type;
        const persisted = JSON.parse(localStorage.getItem(domKey) || '{}');
        for (const [dom, s] of Object.entries(domainStats)) {
            if (!persisted[dom]) persisted[dom] = { correct: 0, total: 0 };
            persisted[dom].correct += s.correct;
            persisted[dom].total += s.total;
        }
        localStorage.setItem(domKey, JSON.stringify(persisted));

        ex.filter = ex.results.some(r => !r) ? 'wrong' : 'all';
        this.renderExamQ();
        if (typeof Achievements !== 'undefined') Achievements.check('arena');
        this.scrollExamIntoView();
    },

    setExamFilter(k) { this.exam.filter = k; this.renderExamQ(); },

    leaveExam() {
        if (this.exam && !this.exam.done) clearInterval(this.examTimer);
        this.exam = null;
        this.state.examActive = false;
        const ctr = document.getElementById('exam-container');
        if (ctr) ctr.innerHTML = '<div class="gauntlet-btn-container" id="gauntlet-btn-container"></div>';
        this.renderExamGauntletButtons();
    },

    renderExamResults() {
        const ctr = document.getElementById('exam-container');
        const ex = this.exam;
        const labelOf = {};
        ex.f.blueprint.forEach(d => { labelOf[d.domain] = d.label; });

        // Domain breakdown in blueprint order (heaviest first), with any untagged extras after.
        const bp = ex.f.blueprint.slice().sort((a, b) => b.weight - a.weight);
        Object.keys(ex.domainStats).filter(d => !(d in labelOf)).forEach(d => bp.push({ domain: d, label: d, weight: null }));
        const bar = ex.f.passThreshold;
        const rows = bp.map(d => {
            const s = ex.domainStats[d.domain];
            const weight = d.weight ? `<span>${Math.round(d.weight * 10) / 10}% of exam</span>` : '';
            if (!s) return `<div class="exam-dom-row empty"><div class="exam-dom-name">${d.label}${weight}</div><div class="exam-dom-bar"></div><div class="exam-dom-val">not drawn</div></div>`;
            const p = s.correct / s.total;
            const cls = p >= bar ? 'good' : 'bad';
            return `<div class="exam-dom-row"><div class="exam-dom-name">${d.label}${weight}</div>
                <div class="exam-dom-bar"><div class="${cls}" style="width:${Math.round(p * 100)}%"></div></div>
                <div class="exam-dom-val ${cls}">${Math.round(p * 100)}%<span>${s.correct}/${s.total}</span></div></div>`;
        }).join('');

        const parts = (ex.partResults || []).map(p => `<div class="exam-part ${p.pass ? 'good' : 'bad'}"><strong>${p.name}</strong> ${p.total ? Math.round(p.pct * 100) + '%' : 'no questions'} (needs ${Math.round(p.bar * 100)}%) ${p.pass ? '&#10003;' : '&#10007;'}</div>`).join('');

        const counts = { wrong: ex.results.filter(r => !r).length, flagged: ex.flagged.filter(Boolean).length, right: ex.score, all: ex.questions.length };
        const names = { wrong: 'Incorrect', flagged: 'Flagged', right: 'Correct', all: 'All' };
        const show = ex.questions.map((q, i) => i).filter(i => ex.filter === 'all' || (ex.filter === 'wrong' && !ex.results[i]) || (ex.filter === 'right' && ex.results[i]) || (ex.filter === 'flagged' && ex.flagged[i]));
        const used = Math.max(1, Math.round((ex.finishedAt - ex.startedAt) / 60000));

        ctr.innerHTML = `
            <div class="exam-shell exam-results">
                <div class="exam-result-hero ${ex.passed ? 'pass' : 'fail'}">
                    <div class="exam-result-verdict">${ex.passed ? 'PASS' : 'NOT YET'}</div>
                    <div class="exam-result-score">${ex.score}/${ex.questions.length}<span>${Math.round(ex.pct * 100)}%</span></div>
                    <div class="exam-result-sub">${ex.f.name} &middot; pass mark ${ex.f.passLabel} &middot; ${used} min used${ex.timedOut ? ' (time ran out)' : ''} &middot; best ${Math.round(ex.bestPct * 100)}%</div>
                    ${parts ? `<div class="exam-parts">${parts}</div>` : ''}
                    ${/scaled/.test(ex.f.passLabel) || ex.f.parts ? '<div class="exam-result-note">CompTIA scores are scaled (100-900), so the percentage bar is an estimate of the cut score, not an exact conversion.</div>' : ''}
                </div>
                <h3 class="exam-h">Score by official exam domain</h3>
                <div class="exam-domains">${rows}</div>
                <h3 class="exam-h">Question autopsy</h3>
                <div class="exam-filter">${['wrong', 'flagged', 'right', 'all'].map(k => `<button class="${ex.filter === k ? 'on' : ''}" onclick="app.setExamFilter('${k}')">${names[k]} (${counts[k]})</button>`).join('')}</div>
                <div class="exam-autopsies">${show.map(i => this.examAutopsyHtml(i, labelOf)).join('') || '<p class="exam-empty">Nothing in this list.</p>'}</div>
                <div class="exam-nav">
                    <button class="exam-nav-btn primary" onclick="app.startExam('${ex.type}'${ex.mode ? `, '${ex.mode.id}'` : ''})">Retake this exam</button>
                    <button class="exam-nav-btn" onclick="app.leaveExam()">All exams</button>
                </div>
            </div>`;
    },

    // Every option, marked: the right answer(s), your pick, and why each wrong one is a trap.
    examAutopsyHtml(i, labelOf) {
        const ex = this.exam, q = ex.questions[i], chosen = ex.answers[i], correct = this.examCorrect(q);
        const opts = q.opts.map((o, j) => {
            const isC = correct.includes(j), picked = chosen.includes(j);
            const why = isC ? '' : this.examWhy(q, j);
            return `<li class="${isC ? 'is-correct' : ''}${picked ? ' is-picked' : ''}">
                <div class="aut-opt"><span class="aut-mark">${isC ? '&#10003;' : picked ? '&#10007;' : ''}</span><strong>${this.examLetter(j)}.</strong> ${this.examOptText(o)}${picked ? ' <span class="trap-tag">Your answer</span>' : ''}</div>
                ${why ? `<div class="aut-why"><strong>Trap:</strong> ${why}</div>` : ''}
            </li>`;
        }).join('');
        const status = ex.results[i] ? '&#10003; Correct' : chosen.length ? '&#10007; Incorrect' : '&mdash; Unanswered';
        return `<div class="exam-autopsy ${ex.results[i] ? 'right' : 'wrong'}">
            <div class="aut-head"><span>Q${i + 1} &middot; ${labelOf[q.domain] || q.domain || 'General'}${this.examIsMulti(q) ? ' &middot; Select ' + correct.length : ''}</span><span>${ex.flagged[i] ? '&#128681; ' : ''}${status}</span></div>
            <div class="aut-q">${q.q || q.front}</div>
            <ul class="aut-opts">${opts}</ul>
            <div class="aut-exp"><strong>Why the answer wins:</strong> ${this.examExp(q)}</div>
        </div>`;
    },

    // Keyboard like a testing-center UI: 1-9 / A-E pick, F flags, arrows move.
    // Also warns before leaving the page mid-exam.
    bindExamKeys() {
        if (this._examKeysBound) return;
        this._examKeysBound = true;
        document.addEventListener('keydown', e => {
            const ex = this.exam;
            if (!ex || ex.done || ex.reviewing || e.ctrlKey || e.metaKey || e.altKey || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
            const k = e.key.toLowerCase();
            const n = ex.questions[ex.idx].opts.length;
            if (k === 'f') { this.toggleExamFlag(); e.preventDefault(); }
            else if (/^[1-9]$/.test(k) && +k <= n) { this.chooseExamOpt(+k - 1); e.preventDefault(); }
            else if (/^[a-e]$/.test(k) && k.charCodeAt(0) - 97 < n) { this.chooseExamOpt(k.charCodeAt(0) - 97); e.preventDefault(); }
            else if (k === 'arrowright') this.gotoExamQ(ex.idx + 1);
            else if (k === 'arrowleft') this.gotoExamQ(ex.idx - 1);
        });
        window.addEventListener('beforeunload', e => {
            if (this.exam && !this.exam.done) { e.preventDefault(); e.returnValue = ''; }
        });
    },

    // --- Course Engine ---
    setLibraryTab(tab) {
        // The tab key IS the course id (see renderLibraryTabs) — no separate mapping
        // table to keep in sync when a new course pack is added. An unknown id falls
        // back to the first course so the sidebar never renders empty.
        if (!DATA._courseMeta.some(m => m.id === tab)) tab = DATA._courseMeta[0] && DATA._courseMeta[0].id;
        this.state.activeLibraryTab = tab;

        // Re-render the switcher so the trigger label/icon and the checked
        // row both reflect the new selection, and close the picker panel.
        this.renderLibraryTabs();
        const panel = document.getElementById('course-menu-panel');
        if (panel) panel.hidden = true;

        // Find the first module for this course by course id, not array position —
        // a hardcoded index silently breaks if course sizes or load order ever change.
        let firstModIdx = DATA.course.findIndex(m => m.courseId === tab);
        if (firstModIdx === -1) firstModIdx = 0;

        this.activeModuleIdx = firstModIdx;
        this.activeTopicIdx = 0;
        
        this.renderLessonTOC();
        this.renderLessonContent(firstModIdx, 0);
    },

    // Build the Library's course switcher from every loaded course pack — so
    // dropping in a new courses/*.js file (with a <script> tag) is the only
    // step needed to add a subject; no HTML or app.js changes required.
    //
    // A flat row of tabs (the original design) reads fine for 3-4 courses but
    // becomes an unreadable wall the moment the catalog grows — 7 already
    // crushed it, and this is meant to scale to 100+. So instead this renders
    // a single compact trigger ("Now Viewing: <course>") that opens a
    // searchable panel grouped by each course's meta.category — the page
    // never grows past one control no matter how many courses exist.
    renderLibraryTabs() {
        const container = document.getElementById('library-tabs');
        if (!container || !DATA._courseMeta) return;

        const groups = {};
        DATA._courseMeta.forEach(meta => {
            const cat = meta.category || 'Other';
            (groups[cat] = groups[cat] || []).push(meta);
        });

        const active = DATA._courseMeta.find(m => m.id === this.state.activeLibraryTab) || DATA._courseMeta[0];

        const rows = Object.keys(groups).sort().map(cat => `
            <div class="course-menu-group" data-group>
                <div class="course-menu-group-label">${cat}</div>
                ${groups[cat].map(meta => `
                    <button class="course-menu-row ${meta.id === active.id ? 'active' : ''}" data-search="${(meta.name + ' ' + (meta.subtitle || '')).toLowerCase()}" style="--tab-color:${meta.color || '#00f2ff'};" onclick="app.setLibraryTab('${meta.id}')">
                        <span class="course-menu-icon">${meta.icon || '📖'}</span>
                        <span class="course-menu-name">${meta.name}</span>
                        ${meta.subtitle ? `<span class="course-menu-sub">${meta.subtitle}</span>` : ''}
                        ${meta.id === active.id ? '<span class="course-menu-check">&#10003;</span>' : ''}
                    </button>
                `).join('')}
            </div>
        `).join('');

        // One-tap icon badges under the trigger so every track is visible at a
        // glance. Capped (the rest stay one click away in the panel) so this row
        // can't turn back into the wall of chips the panel replaced.
        const BADGE_CAP = 10;
        const all = DATA._courseMeta;
        const badges = all.slice(0, BADGE_CAP).map(meta => `
            <button class="course-badge ${meta.id === active.id ? 'active' : ''}" style="--tab-color:${meta.color || '#00f2ff'};" title="${meta.name}" aria-label="${meta.name}" onclick="app.setLibraryTab('${meta.id}')">${meta.icon || '📖'}</button>
        `).join('') + (all.length > BADGE_CAP ? `<button class="course-badge more" onclick="app.toggleCourseMenu(event)">+${all.length - BADGE_CAP}</button>` : '');

        container.innerHTML = `
            <button class="course-menu-trigger" style="--tab-color:${active.color || '#00f2ff'};" onclick="app.toggleCourseMenu(event)">
                <span class="course-menu-trigger-icon">${active.icon || '📖'}</span>
                <span class="course-menu-trigger-text"><span class="course-menu-trigger-label">Now Viewing</span>${active.name}${active.subtitle ? `<span class="course-menu-trigger-sub">${active.subtitle}</span>` : ''}</span>
                <span class="course-menu-count">${all.length} tracks <span class="course-menu-caret">&#9662;</span></span>
            </button>
            <div class="course-badges" aria-label="All tracks">${badges}</div>
            <div class="course-menu-panel" id="course-menu-panel" hidden>
                <input type="text" class="course-menu-search" id="course-menu-search" placeholder="Search courses..." oninput="app.filterCourseMenu(this.value)">
                <div class="course-menu-list">${rows}</div>
            </div>
        `;
    },

    toggleCourseMenu(e) {
        if (e) e.stopPropagation();
        const panel = document.getElementById('course-menu-panel');
        if (!panel) return;
        const opening = panel.hidden;
        panel.hidden = !opening;
        if (opening) {
            const search = document.getElementById('course-menu-search');
            if (search) { search.value = ''; this.filterCourseMenu(''); search.focus(); }
            document.addEventListener('click', (ev) => {
                if (!panel.contains(ev.target) && !ev.target.closest('.course-menu-trigger')) { panel.hidden = true; }
            }, { once: true });
        }
    },

    filterCourseMenu(query) {
        const q = query.trim().toLowerCase();
        document.querySelectorAll('#course-menu-panel .course-menu-row').forEach(row => {
            row.hidden = q.length > 0 && !row.dataset.search.includes(q);
        });
        document.querySelectorAll('#course-menu-panel [data-group]').forEach(group => {
            const anyVisible = [...group.querySelectorAll('.course-menu-row')].some(r => !r.hidden);
            group.hidden = !anyVisible;
        });
    },

    renderLessonTOC() {
        const toc = document.getElementById('lesson-toc');
        if (!toc || !DATA.course) return;

        if (!this.state.activeLibraryTab) {
            // Default to the first loaded course pack, not a hardcoded id.
            this.state.activeLibraryTab = (DATA._courseMeta[0] && DATA._courseMeta[0].id) || null;
        }

        let html = '';
        DATA.course.forEach((mod, modIndex) => {
            // Filter by active tab (by the module's source course, not array position)
            const tab = this.state.activeLibraryTab;
            if (mod.courseId !== tab) return;

            const isActive = modIndex === this.activeModuleIdx ? 'active' : '';
            html += `
                <div class="toc-module ${isActive}">
                    <div class="toc-module-header" onclick="app.toggleModule(${modIndex})">
                        <div class="mod-title">${mod.icon || '&#128214;'} Module ${mod.localIdx + 1}: ${mod.title}</div>
                        <div class="chevron">&#9660;</div>
                    </div>
                    <div class="toc-topics">
                        ${mod.topics.map((t, topicIndex) => {
                            const isTopicActive = (modIndex === this.activeModuleIdx && topicIndex === this.activeTopicIdx) ? 'active-topic' : '';
                            return `
                            <a href="#" class="nav-links toc-link ${isTopicActive}" onclick="app.renderLessonContent(${modIndex}, ${topicIndex}); return false;">
                                ${t.title}
                            </a>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        });
        toc.innerHTML = html;
        
        // Auto-load first topic if nothing is active
        if(DATA.course.length > 0 && typeof this.activeTopicIdx === 'undefined') {
            this.renderLessonContent(0,0);
        }
    },

    toggleModule(idx) {
        if (this.activeModuleIdx === idx) {
            this.activeModuleIdx = -1; // collapse
        } else {
            this.activeModuleIdx = idx; // expand
        }
        this.renderLessonTOC();
    },

    renderLessonContent(modIdx, topicIdx) {
        const canvas = document.getElementById('lesson-canvas');
        if (!canvas) return;
        
        const mod = DATA.course[modIdx];
        const topic = mod.topics[topicIdx];
        
        // Auto-sync TOC
        this.activeTopicIdx = topicIdx;
        if (this.activeModuleIdx !== modIdx) {
            this.activeModuleIdx = modIdx;
        }
        this.renderLessonTOC();
        
        // Next/Prev logic — stays within the current course. Reaching the last
        // topic of a course's last module ends that course's flow rather than
        // silently rolling into the next course's module 1 (which is what
        // raw global-array-adjacency did before courses had their own
        // identity), so "Next" never quietly walks you out of the class
        // you're taking.
        let hasNext = false, hasPrev = false;
        let nextMod = modIdx, nextTopic = topicIdx + 1;
        let prevMod = modIdx, prevTopic = topicIdx - 1;

        if (nextTopic >= mod.topics.length) {
            const cand = modIdx + 1;
            if (cand < DATA.course.length && DATA.course[cand].courseId === mod.courseId) {
                hasNext = true; nextMod = cand; nextTopic = 0;
            }
        } else { hasNext = true; }

        if (prevTopic < 0) {
            const cand = modIdx - 1;
            if (cand >= 0 && DATA.course[cand].courseId === mod.courseId) {
                hasPrev = true; prevMod = cand; prevTopic = DATA.course[cand].topics.length - 1;
            }
        } else { hasPrev = true; }

        // Fade in animation
        canvas.style.opacity = 0;

        const rawProse = topic.prose || topic.content || "";

        // Build quiz block — keyed by courseId+localIdx (stable identity), not
        // modIdx (that module's position in the merged DATA.course array,
        // which shifts if script load order or course sizes ever change and
        // would silently point saved progress at the wrong module/topic).
        const quizKey = 'st_quiz_' + mod.courseId + '_' + mod.localIdx + '_' + topicIdx;
        const quizDone = localStorage.getItem(quizKey) === 'done';
        // A lesson with no quiz counts as done once it's been read, otherwise its module could never be
        // completed on the Smart Path. Separate key, so it doesn't count toward the quiz badges.
        if (!(topic.quiz && topic.quiz.length)) {
            try { localStorage.setItem('st_read_' + mod.courseId + '_' + mod.localIdx + '_' + topicIdx, 'done'); } catch (e) { }
        }
        let quizHtml = '';
        if (topic.quiz && topic.quiz.length > 0) {
            quizHtml = `
                <div class="lesson-quiz" id="lesson-quiz-${modIdx}-${topicIdx}">
                    <div class="quiz-header">
                        <span class="quiz-eyebrow">⚡ Check Your Understanding</span>
                        <span class="quiz-subtitle">Active recall — answer before moving on.</span>
                    </div>
                    <div class="quiz-questions" id="quiz-qs-${modIdx}-${topicIdx}">
                        ${topic.quiz.map((qItem, qi) => `
                            <div class="quiz-q-block" id="qqb-${modIdx}-${topicIdx}-${qi}">
                                <div class="quiz-q-text">${qi + 1}. ${qItem.q}</div>
                                <div class="quiz-opts">
                                    ${(qItem.opts || []).map((opt, oi) => `
                                        <button class="quiz-opt-btn" onclick="app.answerQuiz(${modIdx},${topicIdx},${qi},${oi})">
                                            ${String.fromCharCode(65+oi)}. ${opt}
                                        </button>
                                    `).join('')}
                                </div>
                                <div class="quiz-exp" id="qexp-${modIdx}-${topicIdx}-${qi}" style="display:none;"></div>
                            </div>
                        `).join('')}
                    </div>
                </div>`;
        }

        // Build related modules block — related entries are {course, idx} pairs
        // (a course id + that module's stable localIdx), not raw positions in
        // the merged DATA.course array, so links stay correct across courses
        // regardless of script load order or how many modules any course has.
        let relatedHtml = '';
        if (mod.related && mod.related.length > 0) {
            const links = mod.related.map(r => {
                const rIdx = DATA.course.findIndex(m => m.courseId === r.course && m.localIdx === r.idx);
                const rMod = DATA.course[rIdx];
                return rMod ? `<button class="related-link" onclick="app.renderLessonContent(${rIdx}, 0)">${rMod.icon || '📖'} ${rMod.title}</button>` : '';
            }).join('');
            relatedHtml = `<div class="related-modules"><span class="related-label">🔗 Related Topics</span>${links}</div>`;
        }

        const courseMeta = (DATA._courseMeta || []).find(m => m.id === mod.courseId);
        const courseName = courseMeta ? courseMeta.name : '';

        canvas.innerHTML = `
            <div class="lesson-content-wrapper">
                <div class="module-eyebrow">${courseName ? courseName + ' &middot; ' : ''}Module ${mod.localIdx + 1}: ${mod.title}</div>
                <h1 class="lesson-title">${topic.title}</h1>
                <div class="lesson-prose">
                    ${rawProse}
                </div>
                ${(topic.diagrams || []).map(id => typeof Diagrams !== 'undefined' ? Diagrams.render(id) : '').join('')}
                ${topic.altAnalogy ? `
                <div class="alt-analogy-wrap">
                    <button class="alt-analogy-btn" onclick="this.nextElementSibling.style.display='block';this.style.display='none';">
                        🔄 Explain it differently
                    </button>
                    <div class="alt-analogy-block" style="display:none;">
                        <strong>Alternative Angle:</strong> ${topic.altAnalogy}
                    </div>
                </div>` : ''}
                ${quizHtml}
                ${relatedHtml}
                <div class="topic-nav">
                    ${hasPrev ? `<button class="nav-btn prev-btn" onclick="app.renderLessonContent(${prevMod}, ${prevTopic})">&larr; Previous</button>` : '<div></div>'}
                    ${hasNext ? `<button class="nav-btn next-btn" onclick="app.renderLessonContent(${nextMod}, ${nextTopic})">Next Topic &rarr;</button>` : '<div></div>'}
                </div>
            </div>
        `;
        
        // --- Populating the Contextual Intelligence Panel ---
        const intel = document.getElementById('lesson-intelligence');
        if (intel && window.innerWidth > 1200) {
            intel.style.display = 'block';
            
            // 1. Key Takeaway — the single most exam-relevant line from this
            // topic, not just whatever callout happens to be first. Every
            // lesson-alert div in the prose is either an anchor analogy
            // (memorable, but not itself testable) or a Tip (Exam Tip / Pro
            // Tip / Sales Tip — literally "what you need to know to pass"),
            // so prefer a Tip and only fall back to the anchor if the topic
            // has no tip at all. The old regex only matched a bare
            // `class="lesson-alert"` with no other attributes, so it silently
            // skipped every styled anchor div and just grabbed whichever
            // plain div happened to match first — not a deliberate choice.
            let bottomLineHtml = '';
            const alerts = [...rawProse.matchAll(/<div class="lesson-alert"[^>]*>([\s\S]*?)<\/div>/g)]
                .map(m => m[1]);
            const labeled = alerts.map(html => {
                const labelMatch = html.match(/^<strong>([^<]+):<\/strong>\s*/);
                return {
                    label: labelMatch ? labelMatch[1].replace(/[⚓]/g, '').trim() : '',
                    body: labelMatch ? html.slice(labelMatch[0].length) : html
                };
            });
            const tip = labeled.find(a => /tip/i.test(a.label));
            const takeaway = tip || labeled.find(a => !/anchor/i.test(a.label)) || labeled[0];

            if (takeaway) {
                bottomLineHtml = `
                    <div class="intel-widget">
                        <h4>Key Takeaway</h4>
                        ${takeaway.label ? `<div class="intel-takeaway-label">${takeaway.label}</div>` : ''}
                        <p>${takeaway.body}</p>
                    </div>
                `;
            } else {
                // Fallback heuristic based on module title
                bottomLineHtml = `
                    <div class="intel-widget">
                        <h4>Sales Heuristic</h4>
                        <p>Focus on business outcomes (TCO, Agility, Risk) rather than deep technical features when positioning <strong>${topic.title}</strong>.</p>
                    </div>
                `;
            }
            
            // 2. Find a relevant flashcard
            let fcHtml = '';
            if (DATA.flashcards && DATA.flashcards.length > 0) {
                let matchedCard = null;
                const shuffledCards = [...DATA.flashcards].sort(() => 0.5 - Math.random());
                
                // New Strict Tagging Engine Matcher
                if (topic.tags && topic.tags.length > 0) {
                    for (let card of shuffledCards) {
                        if (card.tags && card.tags.some(tag => topic.tags.includes(tag))) {
                            matchedCard = card;
                            break;
                        }
                    }
                }
                
                if (matchedCard) {
                    fcHtml = `
                        <div class="intel-widget" style="background: rgba(0,0,0,0.2);">
                            <h4>Active Recall Match</h4>
                            <div class="intel-flashcard" onclick="this.classList.toggle('revealed')">
                                <div class="intel-fc-front">${matchedCard.front}</div>
                                <div style="font-size: 0.8rem; color: var(--text-muted); font-style: italic;">Tap to reveal answer</div>
                                <div class="intel-fc-back">${matchedCard.back}</div>
                            </div>
                        </div>
                    `;
                }
            }
            
            intel.innerHTML = bottomLineHtml + fcHtml;
        } else if (intel) {
            intel.style.display = 'none';
        }
        
        // Close mobile sidebar if open
        const toc = document.getElementById('lesson-toc');
        if (toc && toc.classList.contains('mobile-open')) {
            toc.classList.remove('mobile-open');
        }
        
        // Audio lecture bar (lecture.js, Library only): read-aloud / NotebookLM episode for this topic,
        // auto-continuing into the next topic when it finishes.
        if (typeof Lecture !== 'undefined') Lecture.attach(mod, topicIdx, hasNext ? [nextMod, nextTopic] : null);

        // Scroll to top of page/canvas
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Fade back in
        setTimeout(() => { canvas.style.opacity = 1; }, 50);
    },

    answerQuiz(modIdx, topicIdx, qi, chosenOi) {
        const mod = DATA.course[modIdx];
        const topic = mod.topics[topicIdx];
        const qItem = topic.quiz[qi];
        const blockId = 'qqb-' + modIdx + '-' + topicIdx + '-' + qi;
        const block = document.getElementById(blockId);
        if (!block) return;

        const btns = block.querySelectorAll('.quiz-opt-btn');
        btns.forEach((btn, i) => {
            btn.disabled = true;
            if (i === qItem.ans) btn.classList.add('qopt-correct');
            else if (i === chosenOi && i !== qItem.ans) btn.classList.add('qopt-wrong');
        });

        const expEl = document.getElementById('qexp-' + modIdx + '-' + topicIdx + '-' + qi);
        if (expEl) {
            expEl.innerHTML = (chosenOi === qItem.ans ? '&#x2705; Correct! ' : '&#x274C; Not quite. ') + (qItem.exp || '');
            expEl.style.display = 'block';
        }

        // Check if all questions in this quiz are answered
        const allBtns = block.closest('.quiz-questions').querySelectorAll('.quiz-opt-btn');
        const disabledBtns = block.closest('.quiz-questions').querySelectorAll('.quiz-opt-btn:disabled');
        const totalQs = topic.quiz.length;
        const answeredQs = block.closest('.quiz-questions').querySelectorAll('.quiz-q-block .quiz-opt-btn.qopt-correct, .quiz-q-block .quiz-opt-btn.qopt-wrong').length;
        if (answeredQs >= totalQs) {
            localStorage.setItem('st_quiz_' + mod.courseId + '_' + mod.localIdx + '_' + topicIdx, 'done');
            if (typeof Achievements !== 'undefined') Achievements.check('quiz_complete');
        }
    }
};

