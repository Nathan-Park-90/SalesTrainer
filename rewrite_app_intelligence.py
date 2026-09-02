import codecs

c = codecs.open('app.js', 'r', 'utf-8').read()

start_marker = "renderLessonContent(modIdx, topicIdx) {"
end_marker = "};\n"

start_idx = c.find(start_marker)
end_idx = c.find(end_marker, start_idx)

if start_idx == -1 or end_idx == -1:
    print("Markers not found!")
    exit(1)

new_logic = """renderLessonContent(modIdx, topicIdx) {
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
        
        // Next/Prev logic
        let hasNext = false, hasPrev = false;
        let nextMod = modIdx, nextTopic = topicIdx + 1;
        let prevMod = modIdx, prevTopic = topicIdx - 1;

        if (nextTopic >= mod.topics.length) {
            if (modIdx + 1 < DATA.course.length) { hasNext = true; nextMod = modIdx + 1; nextTopic = 0; }
        } else { hasNext = true; }

        if (prevTopic < 0) {
            if (modIdx - 1 >= 0) { hasPrev = true; prevMod = modIdx - 1; prevTopic = DATA.course[prevMod].topics.length - 1; }
        } else { hasPrev = true; }
        
        // Fade in animation
        canvas.style.opacity = 0;
        
        const rawProse = topic.prose || topic.content || "";
        
        canvas.innerHTML = `
            <div class="lesson-content-wrapper">
                <div class="module-eyebrow">${mod.title}</div>
                <h1 class="lesson-title">${topic.title}</h1>
                <div class="lesson-prose">
                    ${rawProse}
                </div>
                
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
            const alertMatch = rawProse.match(/<div class="lesson-alert">([\s\S]*?)<\\/div>/);
            if (alertMatch && alertMatch[1]) {
                // Strip nested tags for a clean summary if desired, or just pass it through
                const cleanAlert = alertMatch[1].replace(/<strong>|<\\/strong>/g, '');
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
                // Extract keywords from title (e.g. "Compute: EC2" -> "EC2")
                const keywords = topic.title.split(/[:\s]+/).filter(w => w.length > 2);
                let matchedCard = null;
                
                // Shuffle array to get random if multiple match
                const shuffledCards = [...DATA.flashcards].sort(() => 0.5 - Math.random());
                
                for (let card of shuffledCards) {
                    let matches = false;
                    for (let kw of keywords) {
                        if (card.front.includes(kw) || card.back.includes(kw) || card.cat.includes(kw)) {
                            matches = true;
                            break;
                        }
                    }
                    if (matches) {
                        matchedCard = card;
                        break;
                    }
                }
                
                // Fallback to random card
                if (!matchedCard) matchedCard = shuffledCards[0];
                
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
    }
"""

c_new = c[:start_idx] + new_logic + c[end_idx:]

with codecs.open('app.js', 'w', 'utf-8') as f:
    f.write(c_new)

print("Intelligence Panel logic injected into app.js!")
