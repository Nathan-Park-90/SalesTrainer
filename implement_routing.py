
import re

# 1. Update index.html with CSS and markup adjustments
html_code = open('index.html', encoding='utf-8').read()

new_css = """
/* SPA Routing Styles */
.section, .hero { 
    display: none !important; 
    opacity: 0; 
    transition: opacity 0.3s ease; 
}
.view-active { 
    display: block !important; 
    opacity: 1 !important; 
}
.hero.view-active {
    display: flex !important;
}
"""
idx = html_code.find('</style>')
if idx != -1:
    html_code = html_code[:idx] + new_css + html_code[idx:]

# Default to showing the lessons section instead of hero
html_code = html_code.replace('<section id="hero" class="hero">', '<section id="hero" class="hero">')
html_code = html_code.replace('<section id="lessons" class="section">', '<section id="lessons" class="section view-active">')

# Make Curriculum tab active by default in nav
html_code = html_code.replace('<li><a href="#hero" class="active">Home</a></li>', '<li><a href="#hero">Home</a></li>')
html_code = html_code.replace('<li><a href="#lessons">Curriculum</a></li>', '<li><a href="#lessons" class="active">Curriculum</a></li>')

open('index.html', 'w', encoding='utf-8').write(html_code)
print("Updated index.html CSS for SPA routing.")

# 2. Update app.js with Router logic
app_code = open('app.js', encoding='utf-8').read()

# Add initRouter() to the app object
router_code = """
    // --- Routing Engine ---
    initRouter() {
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.navigate(targetId);
                
                // Update active state in nav
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
        
        // Ensure the initial view is fully rendered
        this.renderLessonTOC();
    },

    navigate(viewId) {
        // Hide all views
        document.querySelectorAll('.section, .hero').forEach(el => {
            el.classList.remove('view-active');
        });
        
        // Show target view
        const target = document.getElementById(viewId);
        if(target) {
            target.classList.add('view-active');
        }

        // Trigger view-specific re-renders if necessary
        if(viewId === 'lessons') {
            // Force re-render of TOC and load first topic if canvas is empty or says "Select a module"
            const canvas = document.getElementById('lesson-canvas');
            if(canvas.innerHTML.includes('Select a module') || canvas.innerHTML.trim() === '') {
                this.renderLessonTOC();
            }
        }
    },
"""

# Inject router_code right after init: function() { ... },
init_end = app_code.find('    scoreCard(quality) {')
if init_end != -1:
    app_code = app_code[:init_end] + router_code + '\n' + app_code[init_end:]

# Call this.initRouter() inside init()
init_inner_end = app_code.find('this.renderExamQ();', app_code.find('init() {'))
if init_inner_end != -1:
    insert_pos = app_code.find('\n', init_inner_end)
    app_code = app_code[:insert_pos] + '\n        this.initRouter();' + app_code[insert_pos:]

# Wait, `this.renderExamQ();` is in init().
# Wait, actually `this.renderLessonTOC();` is in init() already!
# Let's remove the original `this.renderLessonTOC();` from init() to prevent double calling.
app_code = app_code.replace('this.renderLessonTOC();', '', 1) # Removes the first occurrence inside init()

open('app.js', 'w', encoding='utf-8').write(app_code)
print("Updated app.js with Router logic.")
