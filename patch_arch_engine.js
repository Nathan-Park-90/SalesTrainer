const fs = require('fs');
let js = fs.readFileSync('app.js', 'utf8');

// Fix 1: draggables -> palette (with fallback)
js = js.replace(
    "this.state.archPalette = [...this.state.archSetup.draggables]; // Clone",
    "this.state.archPalette = [...(this.state.archSetup.palette || this.state.archSetup.draggables || [])];"
);

// Fix 2: zone.name -> zone.label  
js = js.replace(
    '`<div class="arch-zone-title">${z.name}</div>`',
    '`<div class="arch-zone-title">${z.label || z.name}</div>`'
);
js = js.replace(
    "<div class=\"arch-zone-title\">${z.name}</div>",
    "<div class=\"arch-zone-title\">${z.label || z.name}</div>"
);

// Fix 3: z.correct -> z.needed (with fallback)
js = js.replace(
    'if (z.correct) {\n                totalRequired += z.correct.length;\n                z.correct.forEach(reqSvc => {',
    'if (z.needed || z.correct) {\n                const reqList = z.needed || z.correct;\n                totalRequired += reqList.length;\n                reqList.forEach(reqSvc => {'
);

fs.writeFileSync('app.js', js, 'utf8');
console.log('app.js engine patched: palette, label, needed all fixed.');
