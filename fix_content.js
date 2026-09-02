const fs = require('fs');
let c = fs.readFileSync('data.js', 'utf8').replace('const DATA = ', 'var DATA=');
eval(c);

let fixed = 0;
DATA.course.forEach(mod => {
    mod.topics.forEach(t => {
        if (t.content && t.prose && t.prose.trim().startsWith('<div class="lesson-analogy">')) {
            t.prose = t.content + t.prose;
            fixed++;
        }
    });
});

let out = 'const DATA = ' + JSON.stringify(DATA, null, 2) + ';\n\n';
out += 'const SK="commuter_v3",XP_R={hard:5,good:10,easy:20,arch:50,sales:30,demo:40};\n';
out += 'const XP_CYCLE=200,IV={hard:60000,good:600000,easy:86400000};\n';
fs.writeFileSync('data.js', out);
console.log('Fixed:', fixed);
