// Regenerates notebooklm_exports/*.md from the current modular courses/*.js
// source of truth. Replaces the old export_notebooklm.js, which read a
// data.js file that no longer exists (courses were split out of it) and
// hardcoded module-index ranges to detect which course a module belonged to
// — the same "global position instead of stable identity" bug fixed
// elsewhere in the codebase this session.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const COURSES_DIR = __dirname;
const EXPORT_DIR = path.join(__dirname, '..', '..', 'notebooklm_exports');

const FILES = [
  ['aws-saa-c03.js', 'COURSE_AWS', 'AWS'],
  ['sales-engineering.js', 'COURSE_SALES_ENGINEERING', 'SALES'],
  ['psm-scrum.js', 'COURSE_PSM_SCRUM', 'SCRUM'],
  ['comptia-securityplus.js', 'COURSE_COMPTIA_SECURITYPLUS', 'SECPLUS'],
  ['comptia-networkplus.js', 'COURSE_COMPTIA_NETWORKPLUS', 'NETPLUS'],
  ['comptia-aplus.js', 'COURSE_COMPTIA_APLUS', 'APLUS'],
  ['comptia-cloudplus.js', 'COURSE_COMPTIA_CLOUDPLUS', 'CLOUDPLUS'],
];

function loadPack(file, varname) {
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(COURSES_DIR, file), 'utf8'), sandbox);
  return sandbox[varname];
}

function slugify(s) {
  return s.replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '_').slice(0, 60);
}

// Converts a topic's HTML prose into clean Markdown, pulling each
// lesson-alert callout out into a clearly labeled line instead of leaving
// raw <div>/<strong> markup or collapsing it into the paragraph flow.
function htmlToMarkdown(html) {
  if (!html) return '';
  let md = html;

  // Anchor / Tip callouts -> "**Label:** body" on their own line
  md = md.replace(/<div class="lesson-alert"[^>]*><strong>([^<]+):<\/strong>\s*([\s\S]*?)<\/div>/g,
    (_, label, body) => `\n\n**${label.trim()}:** ${body.trim()}\n`);

  md = md.replace(/<\/p>\s*<p>/g, '\n\n');
  md = md.replace(/<p>/g, '');
  md = md.replace(/<\/p>/g, '\n\n');
  md = md.replace(/<strong>/g, '**').replace(/<\/strong>/g, '**');
  md = md.replace(/<em>/g, '*').replace(/<\/em>/g, '*');
  md = md.replace(/<code>/g, '`').replace(/<\/code>/g, '`');
  md = md.replace(/<ul>/g, '\n').replace(/<\/ul>/g, '\n');
  md = md.replace(/<li>/g, '- ').replace(/<\/li>/g, '\n');
  md = md.replace(/<br\s*\/?>/g, '\n');
  md = md.replace(/<[^>]+>/g, ''); // strip anything left

  md = md.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&mdash;/g, '—').replace(/&nbsp;/g, ' ').replace(/&#39;/g, "'").replace(/&quot;/g, '"');

  // Collapse 3+ blank lines (old converter left doubled blank lines between
  // every paragraph) down to a single blank line between paragraphs.
  md = md.replace(/\n{3,}/g, '\n\n').trim();
  return md;
}

const systemNote = (courseName) => `[SYSTEM NOTE FOR AUDIO OVERVIEW HOSTS]
You are acting as the official audio teachers for "Mammoth Academy", an elite tech and sales certification training platform.
TARGET AUDIENCE: A professional studying to master ${courseName} and pass the real certification exam.
TONE: Witty, punchy, real-world, and slightly edgy. Do NOT sound like a dry textbook or a corporate HR video. Sound like a highly competent senior engineer or sales director mentoring a junior over coffee.
ANALOGIES TO USE: The source text uses specific recurring anchors — "Mammoth Capital" (a high-stakes FinTech trading firm), Proxmox homelabs, pfSense routers, algorithmic trading, and real-world system failures. Lean heavily into these analogies when explaining concepts.
ACCURACY: Treat every fact, number, port, percentage, and step order in the source below as fixed and correct — this is real certification exam content. Explain and riff on *why* things work, but never alter, round, invent, or "simplify away" a specific technical detail.
[END SYSTEM NOTE]

`;

// Clean the old export set so stale/renamed files never linger alongside
// the freshly generated ones.
if (fs.existsSync(EXPORT_DIR)) {
  fs.readdirSync(EXPORT_DIR).filter(f => f.endsWith('.md')).forEach(f => fs.unlinkSync(path.join(EXPORT_DIR, f)));
} else {
  fs.mkdirSync(EXPORT_DIR);
}

let total = 0;
FILES.forEach(([file, varname, prefix]) => {
  const pack = loadPack(file, varname);
  const courseName = `${pack.meta.name}${pack.meta.subtitle ? ' (' + pack.meta.subtitle + ')' : ''}`;

  pack.modules.forEach((mod, i) => {
    const num = String(i + 1).padStart(2, '0');
    const body = mod.topics.map(t => `## ${t.title}\n\n${htmlToMarkdown(t.prose)}`).join('\n\n---\n\n');
    const md = systemNote(courseName) + `# ${pack.meta.name} — Module ${i + 1}: ${mod.title}\n\n` + body + '\n';

    const fname = `${prefix}_${num}_${slugify(mod.title)}.md`;
    fs.writeFileSync(path.join(EXPORT_DIR, fname), md, 'utf8');
    total++;
  });
});

console.log(`Generated ${total} module transcripts in notebooklm_exports/`);
