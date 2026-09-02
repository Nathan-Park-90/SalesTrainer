const fs = require('fs');

let c = fs.readFileSync('app.js', 'utf8');

c = c.replace('<div class="fc-front">', '<div class="card-front">');
c = c.replace('<div class="fc-back">', '<div class="card-back" style="display:none;">');
c = c.replace('onclick="this.classList.toggle(\'flipped\')"', `onclick="this.classList.toggle('flipped'); const b = this.querySelector('.card-back'); b.style.display = b.style.display === 'none' ? 'block' : 'none';"`);

c = c.replace('${topic.prose}', '${topic.prose || topic.content || ""}');

fs.writeFileSync('app.js', c);
console.log('Fixed app.js');
