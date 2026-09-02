const fs = require('fs');

let js = fs.readFileSync('app.js', 'utf8');

// 1. Update submitExamA to record failed questions
let submitReplacement = `
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
            explanationText = \`<strong>Feedback:</strong> \${q.opts[selectedIdx].fb}<br><br><strong>General Rule:</strong> \${explanationText}\`;
        }

        expText.innerHTML = explanationText;
        expPanel.style.display = 'block';
    },`;

js = js.replace(/submitExamA\(selectedIdx, correctIdx\) \{[\s\S]*?expPanel\.style\.display = 'block';\s*\}/, submitReplacement.trim());


// 2. Update startExam to prioritize failed questions
let startReplacement = `
    startExam(type = 'aws') {
        const baseData = type === 'psm' ? DATA.exam_psm : (DATA.exam_aws || DATA.exam);
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
        
        this.state.domainStats = {
            'Secure': { correct: 0, total: 0 },
            'Resilient': { correct: 0, total: 0 },
            'Performance': { correct: 0, total: 0 },
            'Cost': { correct: 0, total: 0 },
            'Other': { correct: 0, total: 0 }
        };
        
        this.renderExamQ();
    },`;

js = js.replace(/startExam\(type = 'aws'\) \{[\s\S]*?this\.renderExamQ\(\);\s*\}/, startReplacement.trim());

fs.writeFileSync('app.js', js, 'utf8');
console.log('Spaced Repetition implemented successfully.');
