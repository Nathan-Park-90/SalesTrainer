const fs = require('fs');
const files = ['index.html', 'curriculum.html', 'training.html', 'exam.html'];

files.forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    if (!c.includes('daily.html')) {
        // Insert "Daily" link before "Sprint"
        c = c.replace(
            /<li><a href="scrum\.html"[^>]*>Sprint<\/a><\/li>/,
            '<li><a href="daily.html">Daily</a></li>\n            <li><a href="scrum.html">Sprint</a></li>'
        );
        fs.writeFileSync(f, c, 'utf8');
        console.log('Updated nav in:', f);
    } else {
        console.log('Already has daily:', f);
    }
});
