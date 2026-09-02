
import sys

c = open('index.html', encoding='utf-8').read()

# 1. Update Navigation
nav_start = c.find('<nav id="nav">')
nav_end = c.find('</nav>') + 6

new_nav = """<nav id="nav">
  <button class="nb active" id="nb-flash" onclick="goTo('flash')">
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="4" width="16" height="13" rx="2.5" stroke="currentColor" stroke-width="1.6"/><path d="M7 9h8M7 13h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>Cards
  </button>
  <button class="nb" id="nb-arch" onclick="goTo('arch')">
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="13" width="5" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="8.5" y="8" width="5" height="11" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="15" y="3" width="5" height="16" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>Arch
  </button>
  <button class="nb" id="nb-scene" onclick="goTo('scene')">
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 3.5h14a1.5 1.5 0 011.5 1.5v8a1.5 1.5 0 01-1.5 1.5H8.5L4 18V5a1.5 1.5 0 011.5-1.5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 9h6M8 12h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>Sales
  </button>
  <button class="nb" id="nb-exam" onclick="goTo('exam'); if(typeof startExam === 'function') startExam();">
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M11 7v4l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>Exam
  </button>
  <button class="nb" id="nb-threats" onclick="goTo('threats'); if(typeof renderThreats === 'function') renderThreats();">
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2L2 7l9 5 9-5-9-5z" stroke="currentColor" stroke-width="1.5"/><path d="M2 17l9 5 9-5M2 12l9 5 9-5" stroke="currentColor" stroke-width="1.5"/></svg>Threats
  </button>
</nav>"""

c = c[:nav_start] + new_nav + c[nav_end:]

# 2. Add Sections before <div class="toast-ctr">
toast_idx = c.find('<div class="toast-ctr">')

new_sections = """
<section id="v-exam" class="view hidden">
  <div class="glass-panel p-6 text-center text-gray-300">Loading Exam Engine...</div>
</section>
<section id="v-threats" class="view hidden">
  <div class="glass-panel p-6 text-center text-gray-300">Loading Threat Intel...</div>
</section>
"""
c = c[:toast_idx] + new_sections + c[toast_idx:]

# 3. Add JS Logic at the end of the script
script_end = c.rfind('</script>')

js_logic = """
// EXAM & THREATS LOGIC
let examState = { idx: 0, score: {}, active: false, timer: null };

function startExam() {
  examState = { idx: 0, score: {}, active: true, timer: null };
  renderExamQ();
}

function renderExamQ() {
  if (examState.idx >= DATA.exam.length) return finishExam();
  let q = DATA.exam[examState.idx];
  let h = `
    <div class="glass-panel p-6 mb-4">
      <div style="font-size: 0.875rem; color: #60a5fa; margin-bottom: 0.5rem;">Question ${examState.idx + 1} of ${DATA.exam.length}</div>
      <h3 style="font-size: 1.25rem; font-weight: bold; color: white; margin-bottom: 1rem;">${q.q}</h3>
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        ${q.opts.map((opt, i) => `
          <button class="exam-btn" style="text-align: left; padding: 1rem; border-radius: 0.75rem; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: #d1d5db; transition: all 0.2s; cursor: pointer;" onclick="ansExam(${i}, ${q.a === i})">
            ${opt}
          </button>
        `).join('')}
      </div>
      <div style="height: 0.5rem; width: 100%; background: rgba(255,255,255,0.1); margin-top: 1.5rem; border-radius: 999px; overflow: hidden;">
        <div id="exam-timer-bar" style="height: 100%; background: #3b82f6; transition: width 1s linear; width: 100%;"></div>
      </div>
    </div>
  `;
  document.getElementById('v-exam').innerHTML = h;
  startExamTimer();
}

function startExamTimer() {
  clearInterval(examState.timer);
  let left = 90;
  examState.timer = setInterval(() => {
    left--;
    let bar = document.getElementById('exam-timer-bar');
    if (bar) {
      bar.style.width = (left / 90 * 100) + '%';
      if (left <= 20) bar.style.background = '#ef4444'; // Red
    }
    if (left <= 0) {
      clearInterval(examState.timer);
      ansExam(-1, false);
    }
  }, 1000);
}

function ansExam(selected, isCorrect) {
  clearInterval(examState.timer);
  let btns = document.getElementById('v-exam').querySelectorAll('.exam-btn');
  let q = DATA.exam[examState.idx];
  
  // Highlight
  btns.forEach(b => b.style.pointerEvents = 'none');
  if (selected >= 0) {
      btns[selected].style.background = isCorrect ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)';
      btns[selected].style.borderColor = isCorrect ? '#22c55e' : '#ef4444';
  }
  if (!isCorrect && selected !== -1) {
      btns[q.a].style.background = 'rgba(34,197,94,0.2)';
      btns[q.a].style.borderColor = '#22c55e';
  }
  
  if (isCorrect) {
    let domain = q.domain || 'General';
    examState.score[domain] = (examState.score[domain] || 0) + 1;
  }
  
  // Append explanation
  let exp = document.createElement('div');
  exp.style.marginTop = '1rem';
  exp.style.padding = '1rem';
  exp.style.background = 'rgba(255,255,255,0.05)';
  exp.style.borderRadius = '0.75rem';
  exp.style.color = '#9ca3af';
  exp.style.fontSize = '0.875rem';
  exp.innerHTML = `<strong>Feedback:</strong> ${q.exp}`;
  document.getElementById('v-exam').firstElementChild.appendChild(exp);
  
  setTimeout(() => {
    examState.idx++;
    renderExamQ();
  }, 4000);
}

function finishExam() {
  let breakdown = Object.entries(examState.score).map(([k, v]) => `<div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;"><span style="color: #9ca3af;">${k}</span><span style="font-weight: bold; color: white;">${v}</span></div>`).join('');
  let h = `
    <div class="glass-panel p-6 text-center" style="max-width: 500px; margin: 0 auto;">
      <h2 style="font-size: 1.5rem; color: #60a5fa; margin-bottom: 1.5rem; font-weight: bold;">Exam Complete</h2>
      <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 0.75rem; padding: 1rem; margin-bottom: 1.5rem; text-align: left;">
        <h3 style="font-size: 0.875rem; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">Domain Performance</h3>
        ${breakdown || '<span style="color: #9ca3af;">No points scored.</span>'}
      </div>
      <button style="background: #2563eb; color: white; font-weight: bold; padding: 0.75rem 1.5rem; border-radius: 0.75rem; border: none; cursor: pointer; width: 100%; transition: background 0.2s;" onmouseover="this.style.background='#1d4ed8'" onmouseout="this.style.background='#2563eb'" onclick="startExam()">Retake Exam</button>
    </div>
  `;
  document.getElementById('v-exam').innerHTML = h;
}

// THREAT INTEL LOGIC
function renderThreats() {
  let h = `<div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 600px; margin: 0 auto;">`;
  DATA.threats.forEach((t, i) => {
    h += `
      <div class="glass-panel p-6" style="border-left: 4px solid #ef4444;">
        <div style="color: #f87171; font-size: 0.875rem; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">Threat Intel Scenario</div>
        <h3 style="font-size: 1.25rem; color: white; font-weight: bold; margin-bottom: 1rem;">${t.title}</h3>
        <p style="color: #d1d5db; line-height: 1.6; margin-bottom: 1.5rem;">${t.scenario}</p>
        <p style="color: white; font-weight: bold; margin-bottom: 1rem;">${t.question}</p>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;" id="threat-opts-${i}">
          ${t.opts.map((opt, optIdx) => `
            <button class="threat-btn-${i}" style="text-align: left; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: #9ca3af; cursor: pointer;" onclick="ansThreat(${i}, ${optIdx}, ${t.a === optIdx})">${opt}</button>
          `).join('')}
        </div>
        <div id="threat-exp-${i}" style="display: none; margin-top: 1rem; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 0.5rem; border: 1px solid rgba(255,255,255,0.1); color: #d1d5db; font-size: 0.875rem;">
          <strong>Analysis:</strong> ${t.exp}
        </div>
      </div>
    `;
  });
  h += `</div>`;
  document.getElementById('v-threats').innerHTML = h;
}

function ansThreat(tIdx, optIdx, isCorrect) {
  let btns = document.querySelectorAll(`.threat-btn-${tIdx}`);
  btns.forEach(b => b.style.pointerEvents = 'none');
  
  if (isCorrect) {
    btns[optIdx].style.background = 'rgba(34,197,94,0.2)';
    btns[optIdx].style.borderColor = '#22c55e';
    btns[optIdx].style.color = 'white';
  } else {
    btns[optIdx].style.background = 'rgba(239,68,68,0.2)';
    btns[optIdx].style.borderColor = '#ef4444';
    btns[optIdx].style.color = 'white';
    // Highlight correct
    let correctIdx = DATA.threats[tIdx].a;
    btns[correctIdx].style.background = 'rgba(34,197,94,0.2)';
    btns[correctIdx].style.borderColor = '#22c55e';
    btns[correctIdx].style.color = 'white';
  }
  
  document.getElementById(`threat-exp-${tIdx}`).style.display = 'block';
}

// Add hover effect style globally for exam buttons
const style = document.createElement('style');
style.innerHTML = `
  .exam-btn:hover { background: rgba(255,255,255,0.1) !important; }
  .threat-btn-0:hover, .threat-btn-1:hover, .threat-btn-2:hover { background: rgba(255,255,255,0.1) !important; color: white !important; }
`;
document.head.appendChild(style);

"""
c = c[:script_end] + js_logic + c[script_end:]

open('index.html', 'w', encoding='utf-8').write(c)
print("UI and Logic injected!")
