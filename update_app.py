import re

with open('app.js', 'r', encoding='utf8') as f:
    js = f.read()

# 1. Add localStorage to init()
init_replacement = """    init() {
        this.renderScenarios();
        this.renderThreats();
        
        // --- Amnesia Fix (localStorage) ---
        this.state.completedModules = JSON.parse(localStorage.getItem('st_completed')) || [];
        this.state.highScore = localStorage.getItem('st_highscore') || 0;
        // ----------------------------------

        // Auto-load course UI if on curriculum page
        if (document.getElementById('lesson-toc')) this.renderLessonTOC();
    },"""

js = re.sub(r'    init\(\) \{.*?if \(document\.getElementById\(\'lesson-toc\'\)\) this\.renderLessonTOC\(\);\n    \},', init_replacement, js, flags=re.DOTALL)

# 2. Add domain tracking to startExam
start_exam_replacement = """    startExam(type = 'aws') {
        const baseData = type === 'psm' ? DATA.exam_psm : (DATA.exam_aws || DATA.exam);
        if(!baseData || baseData.length === 0) return;
        
        // Shuffle the questions to prevent pattern memorization
        let shuffled = [...baseData].sort(() => 0.5 - Math.random());
        // Select up to 65 questions for the simulator session
        let examData = shuffled.slice(0, 65);
        
        this.state.activeExamData = examData;
        this.state.examActive = true;
        this.state.examScore = 0;
        this.state.examQIdx = 0;
        this.state.examType = type;
        
        // --- Analytics Engine Setup ---
        this.state.domainStats = {
            'Secure': { correct: 0, total: 0 },
            'Resilient': { correct: 0, total: 0 },
            'Performance': { correct: 0, total: 0 },
            'Cost': { correct: 0, total: 0 },
            'Other': { correct: 0, total: 0 }
        };
        // ------------------------------
        
        this.renderExamQ();
    },"""

js = re.sub(r'    startExam\(type = \'aws\'\) \{.*?this\.renderExamQ\(\);\n    \},', start_exam_replacement, js, flags=re.DOTALL)


# 3. Update submitExamA to track domains
submit_exam_replacement = """    submitExamA(selectedIdx, correctIdx) {
        const opts = document.getElementById('exam-opts').children;
        for(let btn of opts) { btn.disabled = true; }
        
        let q = this.state.activeExamData[this.state.examQIdx];
        let dom = q.domain || 'Other';
        if (this.state.domainStats && this.state.domainStats[dom]) {
            this.state.domainStats[dom].total++;
        }
        
        if (selectedIdx === correctIdx) {
            opts[selectedIdx].classList.add('correct');
            this.state.examScore++;
            if (this.state.domainStats && this.state.domainStats[dom]) {
                this.state.domainStats[dom].correct++;
            }
        } else {
            opts[selectedIdx].classList.add('wrong');
            opts[correctIdx].classList.add('correct');
        }

        const expPanel = document.getElementById('exam-explanation');
        const expText = document.getElementById('exam-exp-text');
        
        let explanationText = q.exp || q.explanation || q.back || "No detailed explanation provided for this question.";
        
        // If opts are objects with feedback (like sales scenarios converted to exam)
        if(q.opts[selectedIdx] && q.opts[selectedIdx].fb) {
            explanationText = `<strong>Feedback:</strong> ${q.opts[selectedIdx].fb}<br><br><strong>General Rule:</strong> ${explanationText}`;
        }

        expText.innerHTML = explanationText;
        expPanel.style.display = 'block';
    },"""

js = re.sub(r'    submitExamA\(selectedIdx, correctIdx\) \{.*?expPanel\.style\.display = \'block\';\n    \},', submit_exam_replacement, js, flags=re.DOTALL)


# 4. Update renderExamQ to render analytics breakdown instead of just pass/fail
render_exam_replacement = """    renderExamQ() {
        const ctr = document.getElementById('exam-container');
        if(!ctr) return;
        
        const currentExam = this.state.activeExamData;
        if(!currentExam) return;
        
        if(this.state.examQIdx >= currentExam.length) {
            let pass = (this.state.examScore / currentExam.length) >= 0.72; // AWS passing score is ~72%
            
            // Save high score
            if (this.state.examScore > this.state.highScore) {
                this.state.highScore = this.state.examScore;
                localStorage.setItem('st_highscore', this.state.examScore);
            }
            
            // Build Domain Analytics HTML
            let analyticsHtml = '<div style="display:flex; justify-content:space-between; flex-wrap:wrap; margin-top:20px; gap:10px;">';
            if (this.state.domainStats) {
                for (const [dom, stats] of Object.entries(this.state.domainStats)) {
                    if (stats.total > 0) {
                        let pct = Math.round((stats.correct / stats.total) * 100);
                        let color = pct >= 72 ? 'var(--accent-success)' : 'var(--accent-danger)';
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

                    <div style="display: flex; gap: 10px; justify-content: center; margin-top: 30px;">
                        <button class="btn-primary" onclick="app.startExam('aws')" style="background: #FF9900; border: none; padding: 12px 24px;">Retake AWS Exam</button>
                        <button class="btn-primary" onclick="app.startExam('psm')" style="background: #0056D2; border: none; padding: 12px 24px;">Retake Scrum Exam</button>
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
                <div style="font-weight:700; color:var(--text-muted);">Question ${this.state.examQIdx + 1} of ${currentExam.length} (${this.state.examType === 'psm' ? 'Scrum PSM 1' : 'AWS SAA-C03'})</div>
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
    },"""

js = re.sub(r'    renderExamQ\(\) \{.*?Next Question</button>\n            </div>\n        `;\n    \},', render_exam_replacement, js, flags=re.DOTALL)

with open('app.js', 'w', encoding='utf8') as f:
    f.write(js)
print("Updated app.js with Analytics and LocalStorage")
