const fs = require('fs');
const { JSDOM } = require('jsdom');

const dom = new JSDOM(fs.readFileSync('curriculum.html', 'utf8'), { runScripts: 'dangerously' });

// Add a global error listener for the JSDOM window
dom.window.addEventListener('error', (event) => {
    console.error('Browser Error:', event.error);
});

dom.window.eval(fs.readFileSync('data.js', 'utf8'));
dom.window.eval(fs.readFileSync('app.js', 'utf8'));

dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
console.log('TOC length on load:', dom.window.document.getElementById('lesson-toc').innerHTML.length);

try {
    dom.window.app.setLibraryTab('aws');
    console.log('TOC length after click:', dom.window.document.getElementById('lesson-toc').innerHTML.length);
} catch (e) {
    console.error('JS Error calling setLibraryTab:', e.message);
}
