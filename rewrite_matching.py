import codecs

c = codecs.open('app.js', 'r', 'utf-8').read()

start_marker = "// 2. Find a relevant flashcard"
end_marker = "// Fallback to random card"

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
                
                """

c_new = c[:start_idx] + new_logic + c[end_idx:]

with codecs.open('app.js', 'w', 'utf-8') as f:
    f.write(c_new)

print("Flashcard matching logic updated to use tags array!")
