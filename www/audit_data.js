const fs = require('fs');
const c = fs.readFileSync('data.js', 'utf8');

// Find start of flashcards
const idx1 = c.indexOf('flashcards:');
console.log('--- First Flashcards ---');
console.log(c.substring(idx1, idx1 + 1500));

// Find start of exam
const idx2 = c.indexOf('exam:');
console.log('\n--- First Exam Question ---');
console.log(c.substring(idx2, idx2 + 1500));

// Find start of arch
const idx3 = c.indexOf('arch:');
console.log('\n--- Architecture Sandbox ---');
console.log(c.substring(idx3, idx3 + 1500));
