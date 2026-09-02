
import re

c = open('index.html', encoding='utf-8').read()

# 1. CSS Modifications
# Remove height and overflow constraints
c = re.sub(r'html,body\{height:100%;[^}]+overflow:hidden;', 
           "html,body{min-height:100vh; font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',system-ui,sans-serif; background:var(--b0);color:var(--t1);overflow-x:hidden;overflow-y:auto;", c)

c = re.sub(r'#app\{[^}]+height:100vh;height:100dvh;[^}]+overflow:hidden;', 
           "#app{display:flex;flex-direction:column;min-height:100vh;max-width:1200px;width:100%;margin:0 auto;overflow:visible;position:relative;z-index:1", c)

# Fix views
c = re.sub(r'\.view\{display:none;padding:18px 18px 28px;min-height:100%;animation:vIn \.3s var\(--ease\) both\}',
           ".view{display:block;padding:80px 18px 60px;min-height:80vh;border-bottom:1px solid var(--br1);}", c)
c = re.sub(r'\.view\.active\{display:block\}', '', c)

# Fix Nav to be sticky top
c = re.sub(r'#nav\{flex-shrink:0;display:flex;[^}]+padding:8px 0 max\(12px,env\(safe-area-inset-bottom\)\)\}',
           "#nav{position:sticky;top:0;z-index:40;display:flex;background:rgba(10,16,32,.95);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid var(--br1);padding:10px 0;margin-top:10px;}", c)
c = re.sub(r'\.nb\{[^}]+\}', 
           ".nb{flex:1;display:flex;flex-direction:column;align-items:center;gap:5px;padding:8px 2px;color:var(--t3);font-size:11px;font-weight:800;letter-spacing:.4px;text-transform:uppercase;position:relative;transition:all var(--ease)}.nb:hover{color:var(--blue);background:rgba(255,255,255,0.02);border-radius:8px;}", c)
c = re.sub(r'\.nb::after\{[^}]+\}', "", c)
c = re.sub(r'\.nb\.active::after\{[^}]+\}', "", c)
c = re.sub(r'\.nb\.active\{color:var\(--blue\)\}', ".nb.active{color:var(--blue);background:rgba(79,158,255,0.05);border-radius:8px;}", c)

# Add Canvas CSS
c = c.replace('/* HEADER */', '''
/* CANVAS */
#bg-canvas { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 0; pointer-events: none; opacity: 0.6; mix-blend-mode: screen; }
/* SECTION HEADERS */
.sec-title { font-size: 2.5rem; font-weight: 900; background: linear-gradient(135deg, #fff, #9ca3af); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1rem; text-align: center; letter-spacing: -0.02em; }
.sec-desc { font-size: 1.1rem; color: #9ca3af; text-align: center; max-width: 600px; margin: 0 auto 3rem; line-height: 1.6; }
/* HEADER */''')

# 2. HTML Modifications
# Insert Canvas at the very beginning of body
c = c.replace('<div id="app">', '<canvas id="bg-canvas"></canvas>\n<div id="app">')

# Extract Nav and move it right after #hdr
nav_start = c.find('<nav id="nav">')
nav_end = c.find('</nav>') + 6
nav_html = c[nav_start:nav_end]
c = c[:nav_start] + c[nav_end:] # remove nav from bottom

hdr_end = c.find('</div>\n<div id="main">') + 6
c = c[:hdr_end] + '\n' + nav_html + '\n' + c[hdr_end:]

# Add titles to views
c = c.replace('<section id="v-flash" class="view active">', '<section id="v-flash" class="view">\n<h2 class="sec-title">Core Knowledge</h2>\n<p class="sec-desc">Spaced repetition flashcards designed to build rapid recall of critical concepts.</p>')
c = c.replace('<section id="v-arch" class="view">', '<section id="v-arch" class="view">\n<h2 class="sec-title">Architecture Sandbox</h2>\n<p class="sec-desc">Drag and drop AWS services onto the canvas to solve architectural challenges.</p>')
c = c.replace('<section id="v-scene" class="view">', '<section id="v-scene" class="view">\n<h2 class="sec-title">Sales Scenarios</h2>\n<p class="sec-desc">Practice objection handling and technical framing in high-pressure situations.</p>')
c = c.replace('<section id="v-exam" class="view">', '<section id="v-exam" class="view">\n<h2 class="sec-title">Exam Simulator</h2>\n<p class="sec-desc">10-question timed pressure test. 90 seconds per question. Prove your knowledge.</p>')
c = c.replace('<section id="v-threats" class="view">', '<section id="v-threats" class="view">\n<h2 class="sec-title">Threat Intelligence</h2>\n<p class="sec-desc">Analyze real-world breach scenarios and design the architectural countermeasures.</p>')

# 3. JS Modifications
# Rewrite goTo to scroll
goto_str = '''function goTo(tab){
  curTab=tab;
  document.querySelectorAll('.nb').forEach(b=>b.classList.remove('active'));
  document.getElementById('nb-'+tab).classList.add('active');
  const section = document.getElementById('v-'+tab);
  const navHeight = document.getElementById('nav').offsetHeight + document.getElementById('hdr').offsetHeight;
  window.scrollTo({
    top: section.offsetTop - navHeight - 20,
    behavior: 'smooth'
  });
}'''

# Replace old goTo
old_goto_start = c.find('function goTo(tab){')
if old_goto_start != -1:
    old_goto_end = c.find('curTab=tab;', old_goto_start) + 11
    # Actually the old goTo had some extra lines for renderFlash etc. Let's just find the closing bracket.
    # It's tricky to regex replace the exact function. Let's use string split/join or simple find.
    old_goto_end = c.find('}', old_goto_start) + 1
    c = c[:old_goto_start] + goto_str + c[old_goto_end:]

# Add IntersectionObserver for nav highlighting
observer_js = '''
// Scroll spy for nav
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.view');
  const navBtns = document.querySelectorAll('.nb');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id').replace('v-', '');
        navBtns.forEach(b => b.classList.remove('active'));
        const btn = document.getElementById('nb-' + id);
        if(btn) btn.classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -70% 0px' });
  
  sections.forEach(sec => observer.observe(sec));
  initParticles();
});

function initParticles() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * -0.4 - 0.1;
            this.opacity = Math.random() * 0.4 + 0.1;
            // Shorinji color is gold/brown. We will use Blue/Purple for SalesTrainer.
            this.color = Math.random() > 0.5 ? '79, 158, 255' : '167, 139, 250';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.y < 0) { this.y = height; this.x = Math.random() * width; }
            if (this.x < 0 || this.x > width) this.speedX *= -1;
        }
        draw() {
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    for (let i = 0; i < 40; i++) particles.push(new Particle());
    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}
'''
c = c.replace('// INIT', observer_js + '\n// INIT')

open('index.html', 'w', encoding='utf-8').write(c)
print("GUI Overhaul applied!")
