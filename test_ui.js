const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf-8');
const dataScript = fs.readFileSync('data.js', 'utf-8');
const appScript = fs.readFileSync('app.js', 'utf-8');

const dom = new JSDOM(html, {
    runScripts: "dangerously",
    beforeParse(window) {
        // Setup console interception
        window.console.log = (...args) => console.log('BROWSER LOG:', ...args);
        window.console.error = (...args) => console.error('BROWSER ERROR:', ...args);
        window.console.warn = (...args) => console.warn('BROWSER WARN:', ...args);
        
        window.onerror = function(message, source, lineno, colno, error) {
            console.error('BROWSER UNCAUGHT EXCEPTION:', message, error);
        };
    }
});

// Load the scripts directly into the JSDOM window
try {
    const scriptEl1 = dom.window.document.createElement('script');
    scriptEl1.textContent = dataScript;
    dom.window.document.body.appendChild(scriptEl1);

    const scriptEl2 = dom.window.document.createElement('script');
    scriptEl2.textContent = appScript;
    dom.window.document.body.appendChild(scriptEl2);

    // Trigger DOMContentLoaded
    dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
    
    console.log("Scripts executed. Checking state...");
    setTimeout(() => {
        console.log("Flashcard container innerHTML length:", dom.window.document.getElementById('fc-container')?.innerHTML.length);
        console.log("Lesson TOC innerHTML length:", dom.window.document.getElementById('lesson-toc')?.innerHTML.length);
        console.log("Exam container innerHTML length:", dom.window.document.getElementById('exam-container')?.innerHTML.length);
    }, 100);

} catch (e) {
    console.error("Test execution failed:", e);
}
