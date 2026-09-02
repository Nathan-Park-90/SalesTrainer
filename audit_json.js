const fs = require('fs');

// The file starts with 'const DATA = '
let c = fs.readFileSync('data.js', 'utf8');
let jsonStr = c.replace('const DATA = ', '');
// Clean up trailing semicolon if there is one
jsonStr = jsonStr.trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);

try {
    const data = JSON.parse(jsonStr);
    console.log('--- Flashcards ---');
    console.log('Count:', data.flashcards.length);
    console.log('Card 10:', data.flashcards[9]);
    console.log('Card 35:', data.flashcards[34]); // one of the newer ones

    console.log('\n--- Exam Questions ---');
    console.log('Count:', data.exam.length);
    console.log('Q 1:', data.exam[0]);

    console.log('\n--- Architecture Sandbox ---');
    console.log('Count:', data.arch.length);
    console.log('Sandbox 1:', data.arch[0]);

    console.log('\n--- Course Modules ---');
    console.log('Count:', data.course.length);
    console.log('Module 11:', data.course[10]);

} catch(e) {
    console.error('Error parsing JSON:', e.message);
    // Print the end of the string to see if there is extra stuff
    console.log(jsonStr.slice(-100));
}
