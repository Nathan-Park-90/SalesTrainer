const fs = require('fs');

// 1. Read and eval data.js safely
let rawData = fs.readFileSync('data.js', 'utf8');
rawData = rawData.replace('const DATA =', 'var DATA=');
eval(rawData); // populates global DATA object

// 2. Reorder Module 5 to the end
const careerModule = DATA.course[4]; // Index 4 is Module 5
DATA.course.splice(4, 1);
DATA.course.push(careerModule);

// 3. Renumber Module titles
DATA.course.forEach((mod, idx) => {
    // Replace "Module X: Title" with "Module X: Title" (updated X)
    mod.title = mod.title.replace(/^Module \d+:/, `Module ${idx + 1}:`);
});

// 4. Implement Strict Tagging Engine for Course Topics
// We will auto-tag based on keywords in the title, plus generic tags
DATA.course.forEach(mod => {
    mod.topics.forEach(topic => {
        topic.tags = [];
        const tLower = topic.title.toLowerCase();
        if (tLower.includes('vpc') || tLower.includes('subnet') || tLower.includes('peering') || tLower.includes('gateway') || tLower.includes('route 53') || tLower.includes('cloudfront')) {
            topic.tags.push('networking');
        }
        if (tLower.includes('ec2') || tLower.includes('lambda') || tLower.includes('ecs') || tLower.includes('eks') || tLower.includes('fargate') || tLower.includes('batch')) {
            topic.tags.push('compute');
        }
        if (tLower.includes('s3') || tLower.includes('ebs') || tLower.includes('storage')) {
            topic.tags.push('storage');
        }
        if (tLower.includes('rds') || tLower.includes('dynamodb') || tLower.includes('database')) {
            topic.tags.push('database');
        }
        if (tLower.includes('iam') || tLower.includes('security') || tLower.includes('kms') || tLower.includes('waf') || tLower.includes('shield') || tLower.includes('zero trust')) {
            topic.tags.push('security');
        }
        if (tLower.includes('sales') || tLower.includes('pitching') || tLower.includes('demo') || tLower.includes('cto') || tLower.includes('gong')) {
            topic.tags.push('sales');
        }
        if (tLower.includes('career') || tLower.includes('portfolio') || tLower.includes('interview')) {
            topic.tags.push('career');
        }
        // Always add a direct keyword tag
        if (tLower.includes('vpc')) topic.tags.push('vpc');
        if (tLower.includes('ec2')) topic.tags.push('ec2');
        if (tLower.includes('s3')) topic.tags.push('s3');
        if (tLower.includes('rds')) topic.tags.push('rds');
        if (tLower.includes('lambda')) topic.tags.push('lambda');
        if (tLower.includes('dynamodb')) topic.tags.push('dynamodb');
    });
});

// 5. Implement Strict Tagging Engine for Flashcards
DATA.flashcards.forEach(card => {
    card.tags = [];
    const txt = (card.front + ' ' + card.back).toLowerCase();
    
    if (txt.includes('vpc') || txt.includes('subnet') || txt.includes('nacl') || txt.includes('security group')) card.tags.push('networking', 'vpc');
    if (txt.includes('ec2')) card.tags.push('compute', 'ec2');
    if (txt.includes('lambda') || txt.includes('serverless')) card.tags.push('compute', 'lambda');
    if (txt.includes('s3')) card.tags.push('storage', 's3');
    if (txt.includes('ebs')) card.tags.push('storage', 'ebs');
    if (txt.includes('rds')) card.tags.push('database', 'rds');
    if (txt.includes('dynamodb')) card.tags.push('database', 'dynamodb');
    if (txt.includes('route 53') || txt.includes('cloudfront')) card.tags.push('networking');
    if (txt.includes('iam') || txt.includes('kms') || txt.includes('encryption')) card.tags.push('security');
    
    // Explicit mappings for Sales cards
    if (card.cat === 'Sales') {
        card.tags.push('sales');
        if (txt.includes('discovery') || txt.includes('demo')) card.tags.push('career'); // maps to SE Career/Sales
    }
});

// 6. Content Sweep & Formatting for Anchors
// We want to ensure that every "<strong>Anchor:</strong>" or similar has a clean double line break before it.
DATA.course.forEach(mod => {
    mod.topics.forEach(topic => {
        if (topic.prose) {
            // Replace any sloppy breaks before anchor with a clean <br><br>
            // We use regex to find the Anchor block
            topic.prose = topic.prose.replace(/(<br\s*\/?>\s*)*<div class="lesson-alert">\s*<strong>Anchor:<\/strong>/gi, '<br><br><div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong>');
            
            // Fix double nested alerts if any script error caused it
            topic.prose = topic.prose.replace(/<div class="lesson-alert">\s*<div class="lesson-alert">/gi, '<div class="lesson-alert">');
            topic.prose = topic.prose.replace(/<\/div>\s*<\/div>/g, '</div>');
        }
    });
});

// 7. Serialize back to data.js
const serialized = 'const DATA = ' + JSON.stringify(DATA, null, 4) + ';';
fs.writeFileSync('data.js', serialized, 'utf8');

console.log('Audit complete. Modules reordered, tags injected, formatting swept.');
