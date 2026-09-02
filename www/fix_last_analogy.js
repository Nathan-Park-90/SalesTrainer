const fs = require('fs');
let content = fs.readFileSync('data.js', 'utf8');
let evalContent = content.replace('const DATA =', 'var DATA=');
eval(evalContent);

// Fix the last missing flashcard analogy
DATA.flashcards = DATA.flashcards.map(card => {
    if (card.front && card.front.startsWith('Is there a "Sprint 0"') && !card.analogy) {
        return { ...card, analogy: "Sprint 0 is a waterfall concept smuggled into Scrum disguise — like calling your pre-trade research session a 'Trade 0'. Scrum starts with Sprint 1. If setup is needed, it's work — put it in the backlog and timebox it like any other Sprint." };
    }
    return card;
});

fs.writeFileSync('data.js', 'const DATA = ' + JSON.stringify(DATA, null, 4) + ';', 'utf8');

// Verify
let check = JSON.parse(content.replace('const DATA =', '').trim().slice(0,-1));
const missing = DATA.flashcards.filter(c => !c.analogy);
console.log('Remaining flashcards missing analogy:', missing.length);
console.log('✅ All done.');
