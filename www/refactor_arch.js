const fs = require('fs');

let c = fs.readFileSync('app.js', 'utf8');

const oldArch = `    renderArch() {
        const archProb = document.getElementById('arch-problem');
        if (!archProb || !DATA.arch || DATA.arch.length === 0) return;
        
        this.state.archSetup = DATA.arch[0];
        archProb.innerHTML = this.state.archSetup.problem || this.state.archSetup.desc || this.state.archSetup.brief;
        
        const palette = document.getElementById('arch-palette');
        let tokensHtml = \`<div class="palette-title">Available Services</div>\`;
        
        const services = this.state.archSetup.draggables || ["EC2", "S3", "RDS", "Lambda", "API Gateway", "CloudFront", "SQS", "EventBridge"];
        services.forEach(svc => {
            tokensHtml += \`<div class="service-token" draggable="true" ondragstart="app.drag(event)" id="token-\${svc.replace(/[^a-zA-Z0-9]/g, '')}">\${svc}</div>\`;
        });
        palette.innerHTML = tokensHtml;
        
        const dropZone = document.getElementById('arch-drop-zone');
        dropZone.innerHTML = '';
        
        dropZone.ondragover = (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); };
        dropZone.ondragleave = (e) => { dropZone.classList.remove('drag-over'); };
        dropZone.ondrop = (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            let data = e.dataTransfer.getData("text");
            if (!data) return;
            let original = document.getElementById(data);
            if (!original) return;
            let nodeCopy = original.cloneNode(true);
            nodeCopy.id = data + "-dropped-" + Date.now();
            nodeCopy.removeAttribute('draggable');
            dropZone.appendChild(nodeCopy);
        };
    },`;

const newArch = `    renderArch() {
        const archProb = document.getElementById('arch-problem');
        if (!archProb || !DATA.arch || DATA.arch.length === 0) return;
        
        this.state.archSetup = DATA.arch[0];
        archProb.innerHTML = this.state.archSetup.problem || this.state.archSetup.desc || this.state.archSetup.brief;
        
        const palette = document.getElementById('arch-palette');
        let tokensHtml = \`<div class="palette-title">Available Services</div>\`;
        
        const services = this.state.archSetup.draggables || ["EC2", "S3", "RDS", "Lambda", "API Gateway", "CloudFront", "SQS", "EventBridge"];
        services.forEach(svc => {
            tokensHtml += \`<div class="service-token" onclick="app.addServiceToCanvas('\${svc}')" id="token-\${svc.replace(/[^a-zA-Z0-9]/g, '')}">\${svc}</div>\`;
        });
        palette.innerHTML = tokensHtml;
        
        const dropZone = document.getElementById('arch-drop-zone');
        dropZone.innerHTML = '<div style="color:var(--text-muted); padding:40px; pointer-events: none;" id="arch-empty-msg">Tap a service to add it here</div>';
    },

    addServiceToCanvas(svc) {
        const dropZone = document.getElementById('arch-drop-zone');
        if (!dropZone) return;
        
        // Remove placeholder if present
        const msg = document.getElementById('arch-empty-msg');
        if (msg) msg.remove();
        
        const token = document.createElement('div');
        token.className = 'service-token';
        token.textContent = svc;
        token.id = "token-" + svc.replace(/[^a-zA-Z0-9]/g, '') + "-dropped-" + Date.now();
        // Add delete functionality
        token.onclick = function() {
            this.remove();
            if (dropZone.children.length === 0) {
                dropZone.innerHTML = '<div style="color:var(--text-muted); padding:40px; pointer-events: none;" id="arch-empty-msg">Tap a service to add it here</div>';
            }
        };
        
        dropZone.appendChild(token);
    },`;

c = c.replace(oldArch, newArch);
// We can also safely remove the app.drag method since it is unused now.
c = c.replace(`    drag(event) {
        event.dataTransfer.setData("text", event.target.id);
    },`, '');

fs.writeFileSync('app.js', c);
console.log('Successfully refactored app.js for Click-to-Build architecture.');
