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
        }
    },

    // Build one exam button per course pack that declares an exam — so a new
    // exam-bearing subject needs only a courses/*.js file, no arena.html edits.
    renderExamGauntletButtons() {
        const container = document.getElementById('gauntlet-btn-container');
        if (!container || !DATA._courseMeta) return;

        const examPacks = DATA._courseMeta.filter(m => m.examKey);
        container.innerHTML = examPacks.map(meta => `
            <button class="gauntlet-btn" style="--tab-color:${meta.color || '#00f2ff'};" onclick="app.startExam('${meta.examKey}')">
                Start ${meta.examName || meta.name + ' Exam'}
            </button>
        `).join('');

        const descEl = document.getElementById('gauntlet-desc');
        if (descEl && examPacks.length) {
            const bars = examPacks.map(m => `${Math.round((m.passThreshold || 0.72) * 100)}% for ${m.examName || m.name}`).join(', ');
            descEl.textContent = `Up to 65 questions, weighted toward the ones you've missed before. Passing bar matches each real exam's own cut score: ${bars}.`;
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
    startExam(type) {
        const examPacks = (DATA._courseMeta || []).filter(m => m.examKey);
        if (!type) type = examPacks[0] && examPacks[0].examKey;

        // The exam-bearing course pack whose meta.examKey matches — the single source
        // of truth for this exam's display name, pass bar, and domain taxonomy, so a
        // new exam-bearing subject just needs a courses/*.js file with these set.
        const meta = examPacks.find(m => m.examKey === type);
        const baseData = DATA['exam_' + type];
        if(!baseData || baseData.length === 0) return;
        
        // --- Spaced Repetition Logic ---
        let failedQs = JSON.parse(localStorage.getItem('st_failed_qs')) || [];
        
        // Split bank into 'failed' and 'new/mastered'
        let priorityDeck = [];
        let standardDeck = [];
        
        baseData.forEach(q => {
            let qText = q.q || q.front;
            if (failedQs.includes(qText)) {
                priorityDeck.push(q);
            } else {
                standardDeck.push(q);
            }
        });
        
        // Shuffle both decks independently
        priorityDeck = priorityDeck.sort(() => 0.5 - Math.random());
        standardDeck = standardDeck.sort(() => 0.5 - Math.random());
        
        // Combine them (failed questions always appear first in the exam)
        let combined = [...priorityDeck, ...standardDeck];
        
        // Select up to 65 questions
        let examData = combined.slice(0, 65);
        // -------------------------------
        
        this.state.activeExamData = examData;
        this.state.examActive = true;
        this.state.examScore = 0;
        this.state.examQIdx = 0;
        this.state.examType = type;
        this.state.examMeta = meta;
        this.state.highScore = parseInt(localStorage.getItem('st_highscore_' + type) || '0');

        // Domain categories are exam-specific (AWS SAA-C03's are the Well-Architected
        // pillars; PSM I's mirror the Scrum Guide's own structure) — each course pack
        // declares its own via meta.domains, so a new exam needs no app.js changes.
        const domainNames = [...Object.keys((meta && meta.domains) || {}), 'Other'];
        this.state.domainStats = {};
        domainNames.forEach(d => { this.state.domainStats[d] = { correct: 0, total: 0 }; });
        
        this.renderExamQ();
    },

    renderExamQ() {
        const ctr = document.getElementById('exam-container');
        if(!ctr) return;
        
        const currentExam = this.state.activeExamData;
        if(!currentExam) return;
        
        if(this.state.examQIdx >= currentExam.length) {
            // Passing bar matches each real certification's actual cut score, not a generic
            // guess — comes from the course pack's own meta.passThreshold.
            let passThreshold = (this.state.examMeta && this.state.examMeta.passThreshold) || 0.72;
            let pass = (this.state.examScore / currentExam.length) >= passThreshold;
            
            // Save high score (per exam type — AWS and PSM have different question counts,
            // so a raw score is only meaningful compared against others of the same type)
            if (this.state.examScore > this.state.highScore) {
                this.state.highScore = this.state.examScore;
                localStorage.setItem('st_highscore_' + this.state.examType, this.state.examScore);
            }

            // Persist domain performance cumulatively across attempts, so the Smart Path
            // can spot genuinely weak domains instead of just the last exam's snapshot.
            if (this.state.domainStats) {
                const domKey = 'st_domain_perf_' + this.state.examType;
                const persisted = JSON.parse(localStorage.getItem(domKey) || '{}');
                for (const [dom, stats] of Object.entries(this.state.domainStats)) {
                    if (!persisted[dom]) persisted[dom] = { correct: 0, total: 0 };
                    persisted[dom].correct += stats.correct;
                    persisted[dom].total += stats.total;
                }
                localStorage.setItem(domKey, JSON.stringify(persisted));
            }

            // Build Domain Analytics HTML
            let analyticsHtml = '<div style="display:flex; justify-content:space-between; flex-wrap:wrap; margin-top:20px; gap:10px;">';
            if (this.state.domainStats) {
                for (const [dom, stats] of Object.entries(this.state.domainStats)) {
                    if (stats.total > 0) {
                        let pct = Math.round((stats.correct / stats.total) * 100);
                        let color = pct >= passThreshold * 100 ? 'var(--accent-success)' : 'var(--accent-danger)';
                        analyticsHtml += `
                            <div style="flex:1; min-width:140px; background:rgba(255,255,255,0.05); padding:15px; border-radius:8px; border-top:3px solid ${color};">
                                <div style="font-size:0.85rem; color:var(--text-muted);">${dom}</div>
                                <div style="font-size:1.5rem; font-weight:bold; color:${color}; margin: 5px 0;">${pct}%</div>
                                <div style="font-size:0.75rem;">${stats.correct}/${stats.total} correct</div>
                            </div>
                        `;
                    }
                }
            }
            analyticsHtml += '</div>';

            ctr.innerHTML = `
                <div style="text-align:center;">
                    <h2 style="color:var(--text-primary); margin-bottom:10px;">Exam Completed</h2>
                    <div class="timer" style="font-size: 3rem; margin-bottom: 5px; color: ${pass ? 'var(--accent-success)' : 'var(--accent-danger)'}">${this.state.examScore}/${currentExam.length}</div>
                    <div style="color:var(--text-muted); margin-bottom:20px; font-size: 0.9rem;">Highest Score: ${this.state.highScore}</div>
                    <h3>${pass ? 'PASS (Ready for Certification)' : 'FAIL (Review Weak Domains)'}</h3>
                    
                    ${analyticsHtml}

                    <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 30px;">
                        ${(DATA._courseMeta || []).filter(m => m.examKey).map(m => `
                            <button class="btn-primary" onclick="app.startExam('${m.examKey}')" style="background: ${m.color || 'var(--accent-primary)'}; border: none; padding: 12px 24px;">Retake ${m.name}</button>
                        `).join('')}
                    </div>
                </div>
            `;
            return;
        }

        let q = currentExam[this.state.examQIdx];
        let opts = q.opts.map((opt, i) => `
            <button class="option-btn" onclick="app.submitExamA(${i}, ${q.ans || q.correct_index || 0})">${opt.text || opt}</button>
        `).join('');

        ctr.innerHTML = `
            <div class="exam-status">
                <div style="font-weight:700; color:var(--text-muted);">Question ${this.state.examQIdx + 1} of ${currentExam.length} (${(this.state.examMeta && this.state.examMeta.name) || this.state.examType})</div>
                <div class="timer">Live</div>
            </div>
            <div class="q-text">${q.q || q.front}</div>
            <div class="options-grid" id="exam-opts">
                ${opts}
            </div>
            <div id="exam-explanation" style="display:none; margin-top: 30px; padding: 25px; background: rgba(56, 189, 248, 0.05); border-left: 4px solid var(--accent-primary); border-radius: 8px;">
                <h4 style="color: var(--accent-primary); margin-top: 0; margin-bottom: 15px;">Why?</h4>
                <div id="exam-exp-text" style="font-size: 1.05rem; line-height: 1.6; margin-bottom: 20px;"></div>
                <button class="btn-primary" onclick="app.nextExamQ()">Next Question</button>
            </div>
        `;
    },

    submitExamA(selectedIdx, correctIdx) {
        const opts = document.getElementById('exam-opts').children;
        for(let btn of opts) { btn.disabled = true; }
        
        let q = this.state.activeExamData[this.state.examQIdx];
        let dom = q.domain || 'Other';
        if (this.state.domainStats && this.state.domainStats[dom]) {
            this.state.domainStats[dom].total++;
        }
        
        // --- Spaced Repetition Tracking ---
        let failedQs = JSON.parse(localStorage.getItem('st_failed_qs')) || [];
        let qText = q.q || q.front;
        
        if (selectedIdx === correctIdx) {
            opts[selectedIdx].classList.add('correct');
            this.state.examScore++;
            if (this.state.domainStats && this.state.domainStats[dom]) {
                this.state.domainStats[dom].correct++;
            }
            // Remove from failed list if they got it right
            failedQs = failedQs.filter(text => text !== qText);
        } else {
            opts[selectedIdx].classList.add('wrong');
            opts[correctIdx].classList.add('correct');
            // Add to failed list to force repetition next time
            if (!failedQs.includes(qText)) {
                failedQs.push(qText);
            }
        }
        localStorage.setItem('st_failed_qs', JSON.stringify(failedQs));
        // ----------------------------------

        const expPanel = document.getElementById('exam-explanation');
        const expText = document.getElementById('exam-exp-text');
        
        let explanationText = q.exp || q.explanation || q.back || "No detailed explanation provided for this question.";
        
        if(q.opts[selectedIdx] && q.opts[selectedIdx].fb) {
            explanationText = `<strong>Feedback:</strong> ${q.opts[selectedIdx].fb}<br><br><strong>General Rule:</strong> ${explanationText}`;
        }

        expText.innerHTML = explanationText;
        expPanel.style.display = 'block';
    },

    nextExamQ() {
        this.state.examQIdx++;
        this.renderExamQ();
    },

    // --- Course Engine ---
    setLibraryTab(tab) {
        // The tab key IS the course id (see renderLibraryTabs) — no separate mapping
        // table to keep in sync when a new course pack is added.
        this.state.activeLibraryTab = tab;

        // Update tab UI
        document.querySelectorAll('.lib-tab').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`.lib-tab[onclick*="${tab}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        // Find the first module for this course by course id, not array position —
        // a hardcoded index silently breaks if course sizes or load order ever change.
        let firstModIdx = DATA.course.findIndex(m => m.courseId === tab);
        if (firstModIdx === -1) firstModIdx = 0;

        this.activeModuleIdx = firstModIdx;
        this.activeTopicIdx = 0;
        
        this.renderLessonTOC();
        this.renderLessonContent(firstModIdx, 0);
    },

    // Build the Library's subject tab bar from every loaded course pack — so dropping
    // in a new courses/*.js file (with a <script> tag) is the only step needed to add
    // a subject; no HTML or app.js changes required.
    renderLibraryTabs() {
        const container = document.getElementById('library-tabs');
        if (!container || !DATA._courseMeta) return;

        container.innerHTML = DATA._courseMeta.map((meta, i) => `
            <button class="lib-tab ${i === 0 ? 'active' : ''}" style="--tab-color:${meta.color || '#00f2ff'};" onclick="app.setLibraryTab('${meta.id}')">
                <span class="tab-icon">${meta.icon || '📖'}</span>
                <span class="tab-text">${meta.name}</span>
            </button>
        `).join('');
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
            
            // 1. Extract heuristic/bottom line
            let bottomLineHtml = '';
            // Regex to find the first lesson-alert or blockquote
            const alertMatch = rawProse.match(/<div class="lesson-alert">([\s\S]*?)<\/div>/);
            if (alertMatch && alertMatch[1]) {
                // Strip nested tags for a clean summary if desired, or just pass it through
                const cleanAlert = alertMatch[1].replace(/<strong>|<\/strong>/g, '');
                bottomLineHtml = `
                    <div class="intel-widget">
                        <h4>The Bottom Line</h4>
                        <p>${cleanAlert}</p>
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

