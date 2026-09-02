const fs = require('fs');
const path = require('path');

// 1. Load the DATA object
let content = fs.readFileSync('data.js', 'utf8');
let evalContent = content.replace('const DATA =', 'var DATA=');
eval(evalContent);

// 2. Create export directory
const exportDir = path.join(__dirname, 'notebooklm_exports');
if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir);
}

// 3. Helper to clean HTML to Markdown
function htmlToMarkdown(html) {
    if (!html) return "";
    let md = html;
    md = md.replace(/<p>/g, '\n\n');
    md = md.replace(/<\/p>/g, '');
    md = md.replace(/<strong>/g, '**');
    md = md.replace(/<\/strong>/g, '**');
    md = md.replace(/<em>/g, '*');
    md = md.replace(/<\/em>/g, '*');
    md = md.replace(/<ul>/g, '\n');
    md = md.replace(/<\/ul>/g, '\n');
    md = md.replace(/<li>/g, '- ');
    md = md.replace(/<\/li>/g, '\n');
    md = md.replace(/<br\s*\/?>/g, '\n');
    md = md.replace(/<[^>]+>/g, ''); // Strip remaining tags
    
    // Basic entity decoding
    md = md.replace(/&amp;/g, '&');
    md = md.replace(/&lt;/g, '<');
    md = md.replace(/&gt;/g, '>');
    md = md.replace(/&mdash;/g, '—');
    md = md.replace(/&nbsp;/g, ' ');
    md = md.replace(/&#128214;/g, '??');
    
    return md.trim();
}

// 4. The "Smart Base" System Prompt for NotebookLM
const getSystemPrompt = (trackName) => 
[SYSTEM NOTE FOR AUDIO OVERVIEW HOSTS]
You are acting as the official audio teachers for "SalesTrainer", an elite tech and sales training platform.
TARGET AUDIENCE: A professional studying to master  + trackName +  and pass rigorous industry certifications.
TONE: Witty, punchy, real-world, and slightly edgy. Do NOT sound like a dry textbook or a corporate HR video. Sound like a highly competent senior engineer or sales director mentoring a junior over coffee.
ANALOGIES TO USE: The source text uses specific anchors—"Mammoth Capital" (a high-stakes FinTech firm), Proxmox homelabs, pfSense routers, algorithm trading, and real-world system failures. Lean heavily into these analogies when explaining concepts.
FORMAT: Treat this as an engaging, fast-paced masterclass. Focus on *why* things work and the real-world trade-offs, exactly as written in the module below. Never change the technical facts.
[END SYSTEM NOTE]
;

// 5. Generate a file for each module
let exportedCount = 0;

DATA.course.forEach((mod, idx) => {
    // Determine track
    let track = "AWS Solutions Architect (SAA-C03)";
    if (idx >= 13 && idx <= 17) track = "Technical Sales Engineering";
    if (idx >= 18) track = "Scrum Master (PSM 1)";

    let fileContent = getSystemPrompt(track) + '\n\n';
    fileContent += '# ' + mod.title + '\n\n';

    if (mod.topics) {
        mod.topics.forEach(topic => {
            fileContent += '## ' + topic.title + '\n\n';
            fileContent += htmlToMarkdown(topic.prose || topic.content) + '\n\n';
            fileContent += '---\n\n';
        });
    }

    // Format filename: 01_Module_Name.md
    const safeTitle = mod.title.replace(/[^a-z0-9]/gi, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
    const num = (idx + 1).toString().padStart(2, '0');
    const filename = num + '_' + safeTitle + '.md';
    
    fs.writeFileSync(path.join(exportDir, filename), fileContent, 'utf8');
    exportedCount++;
});

console.log('Successfully exported ' + exportedCount + ' modules to /notebooklm_exports');
