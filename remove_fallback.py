import codecs

c = codecs.open('app.js', 'r', 'utf-8').read()

start_marker = "// 2. Find a relevant flashcard"
end_marker = "intel.innerHTML = bottomLineHtml + fcHtml;"

start_idx = c.find(start_marker)
end_idx = c.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Markers not found!")
    exit(1)

new_logic = """// 2. Find a relevant flashcard
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
            
            """

c_new = c[:start_idx] + new_logic + c[end_idx:]

with codecs.open('app.js', 'w', 'utf-8') as f:
    f.write(c_new)

print("Fallback logic removed from app.js!")
