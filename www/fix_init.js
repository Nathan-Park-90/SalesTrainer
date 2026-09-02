const fs = require('fs');
const files = ['index.html', 'curriculum.html', 'training.html', 'exam.html'];

files.forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace('if(window.app && app.init) app.init();', "if(typeof app !== 'undefined' && app.init) app.init();");
    fs.writeFileSync(f, c);
});
console.log('Fixed window.app check in all HTML files.');
