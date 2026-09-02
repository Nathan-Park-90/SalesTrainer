const fs = require('fs');

// --- UPDATE STYLE.CSS ---
let style = fs.readFileSync('style.css', 'utf8');

// 1. Sidebar scrolling
style = style.replace(
    'top: 100px;',
    'top: 100px;\n    max-height: calc(100vh - 140px);\n    overflow-y: auto;\n    scrollbar-width: thin;\n    scrollbar-color: var(--primary-color) transparent;'
);

// 2. TOC Headers hover and pointer
style = style.replace(
    '.toc-module-header {\n    font-weight: 700;',
    '.toc-module-header {\n    font-weight: 700;\n    cursor: pointer;\n    transition: color 0.2s;\n}\n.toc-module-header:hover {\n    color: var(--primary-color);'
);

// 3. TOC Topics hidden by default, visible when active
style = style.replace(
    '.toc-topics {\n    display: flex;',
    '.toc-topics {\n    display: none;\n}\n.toc-module.active .toc-topics {\n    display: flex;'
);

fs.writeFileSync('style.css', style);


// --- UPDATE APP.JS ---
let app = fs.readFileSync('app.js', 'utf8');

// 1. Add activeModuleIdx state
app = app.replace(
    'state: {\n        archSetup: null\n    },',
    'state: {\n        archSetup: null\n    },\n    activeModuleIdx: 0,'
);

// 2. Update renderLessonTOC
const oldTOC = `        let html = '';
        DATA.course.forEach((mod, modIndex) => {
            html += \`
                <div class="toc-module">
                    <div class="toc-module-header">\${mod.title}</div>`;

const newTOC = `        let html = '';
        DATA.course.forEach((mod, modIndex) => {
            const isActive = modIndex === this.activeModuleIdx ? 'active' : '';
            html += \`
                <div class="toc-module \${isActive}">
                    <div class="toc-module-header" onclick="app.toggleModule(\${modIndex})">\${mod.title}</div>`;

app = app.replace(oldTOC, newTOC);

// 3. Add toggleModule method
app = app.replace(
    'renderLessonContent(modIdx, topicIdx) {',
    `toggleModule(idx) {
        if (this.activeModuleIdx === idx) {
            this.activeModuleIdx = -1; // collapse
        } else {
            this.activeModuleIdx = idx; // expand
        }
        this.renderLessonTOC();
    },

    renderLessonContent(modIdx, topicIdx) {`
);

// 4. Auto-sync in renderLessonContent
app = app.replace(
    'const topic = mod.topics[topicIdx];',
    `const topic = mod.topics[topicIdx];
        
        // Auto-sync TOC
        if (this.activeModuleIdx !== modIdx) {
            this.activeModuleIdx = modIdx;
            this.renderLessonTOC();
        }`
);

fs.writeFileSync('app.js', app);
console.log('Successfully refactored TOC to accordion in style.css and app.js');
