const fs = require('fs');
let c = fs.readFileSync('app.js', 'utf-8');

const oldInit = `init() {
        if(typeof DATA === 'undefined') {
            console.error("DATA object not found.");
            return;
        }
        this.renderFlashcard();
        this.renderArch();
        this.renderScenarios();
        this.renderThreats();
        this.initRouter();
        
    },`;

const newInit = `init() {
        if(typeof DATA === 'undefined') {
            console.error("DATA object not found.");
            return;
        }
        this.renderFlashcard();
        this.renderArch();
        this.renderScenarios();
        this.renderThreats();
        this.renderLessonTOC(); // Trigger TOC render
    },`;

c = c.replace(oldInit, newInit);

const routingStart = c.indexOf('// --- Routing Engine ---');
const routingEnd = c.indexOf('// --- Flashcards ---');

if (routingStart !== -1 && routingEnd !== -1) {
    c = c.substring(0, routingStart) + c.substring(routingEnd);
}

fs.writeFileSync('app.js', c);
console.log('Successfully updated app.js for MPA routing.');
