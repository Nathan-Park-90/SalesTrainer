import codecs

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

def write_page(filename, content, active_nav):
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
write_page('index.html', hub_content, 'nav_home')


# 2. Curriculum
curr_content = """
    <section id="lessons" class="section" style="display:block;">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Teaching Engine</span>
                <h2 class="section-title">AWS & SE Curriculum</h2>
                <p class="section-desc">Master the foundational concepts before entering the test simulators.</p>
            </div>
            
            <div class="lesson-layout">
                <aside class="lesson-sidebar" id="lesson-toc">
                    <!-- TOC injected by JS -->
                </aside>
                <article class="lesson-canvas" id="lesson-canvas">
                    <div class="lesson-placeholder">Select a module from the sidebar to begin.</div>
                </article>
            </div>
        </div>
    </section>
"""
write_page('curriculum.html', curr_content, 'nav_curr')


# 3. Training
train_content = """
    <section id="core-knowledge" class="section" style="display:block;">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Active Recall</span>
                <h2 class="section-title">Core Knowledge Base</h2>
                <p class="section-desc">Test your instant recall of AWS architecture, security patterns, and sales frameworks.</p>
            </div>
            <div class="flashcard-container" id="fc-container">
                <!-- Flashcards injected by JS -->
            </div>
        </div>
    </section>

    <section id="architecture" class="section" style="display:block;">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Design Lab</span>
                <h2 class="section-title">Architecture Sandbox</h2>
                <p class="section-desc">Drag and drop AWS services onto the canvas to solve the design constraints.</p>
            </div>
            <div class="arch-sandbox">
                <div class="arch-problem-statement" id="arch-problem">
                    <!-- Problem injected by JS -->
                </div>
                <div class="arch-workspace">
                    <div class="arch-palette" id="arch-palette">
                        <!-- Tokens injected by JS -->
                    </div>
                    <div class="arch-canvas" id="arch-drop-zone">
                        <div style="color:var(--text-muted); padding:40px;">Drop services here</div>
                    </div>
                </div>
                <div style="margin-top:20px; text-align:right;">
                    <button class="btn-primary" onclick="app.verifyArch()">Verify Architecture</button>
                </div>
                <div id="arch-feedback" class="arch-feedback"></div>
            </div>
        </div>
    </section>
"""
write_page('training.html', train_content, 'nav_train')


# 4. Exam
exam_content = """
    <section id="scenarios" class="section" style="display:block;">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Field Execution</span>
                <h2 class="section-title">Sales Scenarios</h2>
                <p class="section-desc">Real-world objections and scenarios. Think of your response, then click to reveal the Pro Frame.</p>
            </div>
            <div class="scenario-grid" id="scene-grid">
                <!-- Scenarios injected by JS -->
            </div>
        </div>
    </section>

    <section id="exam" class="section" style="display:block;">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Certification</span>
                <h2 class="section-title">SAA-C03 Simulator</h2>
                <p class="section-desc">10-question timed technical exam. 80% required to pass.</p>
            </div>
            <div class="exam-engine" id="exam-container" style="max-width: 800px; margin: 0 auto; background: var(--surface-bg); border: 1px solid var(--glass-border); border-radius: 20px; padding: 40px;">
                <div style="text-align:center;">
                    <button class="btn-primary" onclick="app.startExam()" style="font-size: 1.2rem; padding: 15px 40px;">Initialize Exam</button>
                </div>
            </div>
        </div>
    </section>

    <section id="threats" class="section" style="display:block;">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Live Feeds</span>
                <h2 class="section-title">Threat Intel & Macro</h2>
                <p class="section-desc">Simulated live feed of critical market and security events impacting our customers.</p>
            </div>
            <div class="threat-ticker" id="threat-ticker">
                <!-- Threats injected by JS -->
            </div>
        </div>
    </section>
"""
write_page('exam.html', exam_content, 'nav_exam')

print("Successfully generated clean MPA HTML files.")
