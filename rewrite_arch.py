import codecs

c = codecs.open('app.js', 'r', 'utf-8').read()

start_marker = "// --- Architecture Sandbox ---"
end_marker = "// --- Sales Scenarios ---"

start_idx = c.find(start_marker)
end_idx = c.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Markers not found!")
    exit(1)

new_logic = """// --- Architecture Sandbox ---
    renderArch() {
        const archProb = document.getElementById('arch-problem');
        if (!archProb || !DATA.arch || DATA.arch.length === 0) return;
        
        if (typeof this.state.archIdx === 'undefined') this.state.archIdx = 0;
        if (this.state.archIdx >= DATA.arch.length) {
            archProb.innerHTML = "<h3 style='color:var(--accent-success);'>Architecture Curriculum Complete!</h3><p>You have mastered all design patterns.</p>";
            document.getElementById('arch-palette').innerHTML = '';
            document.getElementById('arch-drop-zone').innerHTML = '';
            document.getElementById('arch-feedback').innerHTML = '';
            return;
        }

        this.state.archSetup = DATA.arch[this.state.archIdx];
        this.state.activeZoneId = null; // Reset selection
        
        // Setup Problem
        archProb.innerHTML = `
            <div style="font-weight: bold; color: var(--accent-primary); margin-bottom: 10px;">Scenario ${this.state.archIdx + 1}: ${this.state.archSetup.title}</div>
            ${this.state.archSetup.problem || this.state.archSetup.desc || this.state.archSetup.brief}
        `;
        
        // Setup Palette (Draggables)
        const palette = document.getElementById('arch-palette');
        let tokensHtml = `<div class="palette-title">Available Services</div>`;
        const services = this.state.archSetup.draggables || [];
        services.forEach(svc => {
            tokensHtml += `<div class="service-token" onclick="app.addServiceToCanvas('${svc}')" id="palette-token-${svc.replace(/[^a-zA-Z0-9]/g, '')}">${svc}</div>`;
        });
        palette.innerHTML = tokensHtml;
        
        // Setup Drop Zones
        const dropZone = document.getElementById('arch-drop-zone');
        let zonesHtml = '';
        if (this.state.archSetup.zones) {
            this.state.archSetup.zones.forEach((z, i) => {
                zonesHtml += `
                    <div class="arch-zone" id="arch-zone-${i}" onclick="app.selectZone(${i})">
                        <div class="arch-zone-title">${z.name}</div>
                        <!-- tokens dropped here -->
                    </div>
                `;
            });
        }
        
        // Add action buttons
        dropZone.innerHTML = zonesHtml;
        
        // Clear old feedback and buttons
        const fb = document.getElementById('arch-feedback');
        fb.innerHTML = `
            <div style="display:flex; justify-content:space-between; margin-top:20px;">
                <button class="btn-primary" style="background:transparent; border:1px solid var(--glass-border); color:var(--text-primary);" onclick="app.resetArch()">Reset Board</button>
                <button class="btn-primary" onclick="app.verifyArch()">Verify Architecture</button>
            </div>
            <div id="arch-validation-msg" style="margin-top:20px;"></div>
        `;
    },

    selectZone(zoneId) {
        // Deselect all
        document.querySelectorAll('.arch-zone').forEach(z => z.classList.remove('active'));
        
        // Select target
        const target = document.getElementById('arch-zone-' + zoneId);
        if (target) {
            target.classList.add('active');
            this.state.activeZoneId = zoneId;
        }
    },

    addServiceToCanvas(svc) {
        if (this.state.activeZoneId === null) {
            const msg = document.getElementById('arch-validation-msg');
            if (msg) msg.innerHTML = '<span style="color:var(--accent-warning);">Please tap a Zone on the canvas first to select it.</span>';
            return;
        }

        const targetZone = document.getElementById('arch-zone-' + this.state.activeZoneId);
        if (!targetZone) return;

        // Create token
        const token = document.createElement('div');
        token.className = 'service-token in-zone';
        token.textContent = svc;
        token.dataset.svc = svc; // Store raw name for validation
        token.onclick = function(e) {
            e.stopPropagation(); // prevent triggering selectZone
            app.removeService(svc, this);
        };
        
        targetZone.appendChild(token);
        
        // Hide from palette
        const pt = document.getElementById('palette-token-' + svc.replace(/[^a-zA-Z0-9]/g, ''));
        if (pt) pt.style.display = 'none';
        
        // Clear warning
        const msg = document.getElementById('arch-validation-msg');
        if (msg) msg.innerHTML = '';
    },

    removeService(svc, tokenElement) {
        // Remove from zone
        tokenElement.remove();
        // Show in palette
        const pt = document.getElementById('palette-token-' + svc.replace(/[^a-zA-Z0-9]/g, ''));
        if (pt) pt.style.display = 'inline-flex';
    },
    
    resetArch() {
        this.renderArch();
    },
    
    nextArch() {
        this.state.archIdx++;
        this.renderArch();
    },

    verifyArch() {
        const msg = document.getElementById('arch-validation-msg');
        if(!msg) return;
        
        const setup = this.state.archSetup;
        let isPerfect = true;
        
        // Check Decoys (dm)
        if (setup.dm) {
            for (const [decoyName, decoyMsg] of Object.entries(setup.dm)) {
                // Look for it anywhere on the board
                const tokens = document.querySelectorAll('.arch-zone .service-token');
                for (let t of tokens) {
                    if (t.dataset.svc === decoyName) {
                        msg.innerHTML = `<div style="color:var(--accent-danger); padding:15px; background:rgba(239, 68, 68, 0.1); border-radius:8px; border-left:4px solid var(--accent-danger);">${decoyMsg}</div>`;
                        return; // Fatal flaw
                    }
                }
            }
        }
        
        // Validate correct placement per zone
        let allPlaced = 0;
        let totalRequired = 0;
        
        setup.zones.forEach((z, i) => {
            const zoneEl = document.getElementById('arch-zone-' + i);
            if (!zoneEl) return;
            
            const placedTokens = Array.from(zoneEl.querySelectorAll('.service-token')).map(t => t.dataset.svc);
            
            if (z.correct) {
                totalRequired += z.correct.length;
                z.correct.forEach(reqSvc => {
                    if (!placedTokens.includes(reqSvc)) {
                        isPerfect = false;
                    } else {
                        allPlaced++;
                    }
                });
            }
        });
        
        // Check if they just placed nothing
        if (allPlaced === 0) {
            msg.innerHTML = '<span style="color:var(--accent-warning);">You must place services into the architecture zones.</span>';
            return;
        }

        if (isPerfect && allPlaced === totalRequired) {
            // Disable palette and zones
            document.getElementById('arch-palette').style.pointerEvents = 'none';
            document.getElementById('arch-palette').style.opacity = '0.5';
            document.querySelectorAll('.arch-zone').forEach(z => {
                z.style.pointerEvents = 'none';
                z.classList.remove('active');
            });
            
            msg.innerHTML = `
                <div style="color:var(--accent-success); padding:15px; background:rgba(16, 185, 129, 0.1); border-radius:8px; border-left:4px solid var(--accent-success); margin-bottom:15px;">
                    ${setup.wm || "Architecture Verified!"}
                </div>
                <button class="btn-primary" onclick="app.nextArch()">Next Scenario &rarr;</button>
            `;
        } else {
            msg.innerHTML = '<span style="color:var(--accent-warning);">Architecture validation failed. Check your placements and try again.</span>';
        }
    },

    // --- Sales Scenarios ---"""

c_new = c[:start_idx] + new_logic + c[end_idx + len("// --- Sales Scenarios ---"):]

with codecs.open('app.js', 'w', 'utf-8') as f:
    f.write(c_new)

print("Sandbox logic successfully replaced in app.js!")
