import codecs
import re

with codecs.open('index.html', 'r', 'utf-8') as f:
    html = f.read()

# Remove the broken second nav and particle canvas from index.html if it exists
if html.count('<nav class="navbar">') > 1:
    # Just extract the raw sections manually
    pass

def extract_section(id_str):
    pattern = rf'(<section id="{id_str}".*?</section>)'
    match = re.search(pattern, html, re.DOTALL)
    if match:
        s = match.group(1)
        # Remove any view-active or display:none
        s = re.sub(r'\s*view-active\s*', ' ', s)
        s = re.sub(r'display:\s*none;?', '', s)
        return s
    return f'<section id="{id_str}"><h1>Error loading {id_str}</h1></section>'

sec_lessons = extract_section('lessons')
sec_core = extract_section('core-knowledge')
sec_arch = extract_section('architecture')
sec_scen = extract_section('scenarios')
sec_exam = extract_section('exam')
sec_threats = extract_section('threats')

base_template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SalesTrainer | Premium Desktop</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <canvas id="particle-canvas"></canvas>

    <nav class="navbar">
        <div class="nav-brand">
            <div class="brand-icon"></div>
            SalesTrainer
        </div>
        <ul class="nav-links">
            <li><a href="index.html" {nav_home}>Home</a></li>
            <li><a href="curriculum.html" {nav_curr}>Library</a></li>
            <li><a href="training.html" {nav_train}>Gym</a></li>
            <li><a href="exam.html" {nav_exam}>Arena</a></li>
        </ul>
    </nav>
    
    <div style="padding-top: 80px;">
        {content}
    </div>

    <script src="data.js"></script>
    <script src="app.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            if(window.app && app.init) app.init();
        });
    </script>
</body>
</html>
"""

def write_page(filename, sections, active_nav):
    content = '\n\n'.join(sections)
    page = base_template.replace('{content}', content)
    
    for nav in ['nav_home', 'nav_curr', 'nav_train', 'nav_exam']:
        if nav == active_nav:
            page = page.replace('{' + nav + '}', 'class="active"')
        else:
            page = page.replace('{' + nav + '}', '')
            
    with codecs.open(filename, 'w', 'utf-8') as f:
        f.write(page)

# 1. Index (Hub)
hub_content = """
    <section id="hero" class="hero" style="display:block;">
        <h1>Master the Enterprise Sale</h1>
        <p>A completely unlocked, uncompromising desktop-first training engine for Solutions Engineering.</p>
        <div style="display: flex; gap: 20px; justify-content: center; margin-top: 40px;">
            <button class="btn-primary" onclick="window.location.href='curriculum.html'">1. Library (Learn)</button>
            <button class="btn-primary" onclick="window.location.href='training.html'">2. Gym (Train)</button>
            <button class="btn-primary" onclick="window.location.href='exam.html'">3. Arena (Test)</button>
        </div>
    </section>
"""
write_page('index.html', [hub_content], 'nav_home')
write_page('curriculum.html', [sec_lessons], 'nav_curr')
write_page('training.html', [sec_core, sec_arch], 'nav_train')
write_page('exam.html', [sec_scen, sec_exam, sec_threats], 'nav_exam')

print("Successfully generated clean HTML files.")
