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
    initArchState() {
        if (typeof this.state.archIdx === 'undefined') this.state.archIdx = 0;
        if (this.state.archIdx >= DATA.arch.length) return false; // Done

        this.state.archSetup = DATA.arch[this.state.archIdx];
        this.state.archPalette = [...this.state.archSetup.draggables]; // Clone
        this.state.archBoard = []; // Array of arrays mapping to zones
        if (this.state.archSetup.zones) {
            this.state.archSetup.zones.forEach(() => {
                this.state.archBoard.push([]);
            });
        }
        this.state.selectedSvc = null;
        this.state.selectedZoneId = null;
        this.state.archLocked = false;
        return true;
    },

    renderArch() {
        const archProb = document.getElementById('arch-problem');
        if (!archProb || !DATA.arch || DATA.arch.length === 0) return;
        
        // Ensure state is initialized
        if (!this.state.archBoard) {
            const hasMore = this.initArchState();
            if (!hasMore) {
                archProb.innerHTML = "<h3 style='color:var(--accent-success);'>Architecture Curriculum Complete!</h3><p>You have mastered all design patterns.</p>";
                document.getElementById('arch-palette').innerHTML = '';
                document.getElementById('arch-drop-zone').innerHTML = '';
                document.getElementById('arch-feedback').innerHTML = '';
                return;
            }
        }

        // Render Problem Statement
        archProb.innerHTML = `
            <div style="font-weight: bold; color: var(--accent-primary); margin-bottom: 10px;">Scenario ${this.state.archIdx + 1}: ${this.state.archSetup.title}</div>
            ${this.state.archSetup.problem || this.state.archSetup.desc || this.state.archSetup.brief}
        `;
        
        // Render Palette
        const palette = document.getElementById('arch-palette');
        let tokensHtml = `<div class="palette-title">Available Services</div>`;
        this.state.archPalette.forEach(svc => {
            const isSelected = this.state.selectedSvc === svc ? 'selected-token' : '';
            tokensHtml += `<div class="service-token ${isSelected}" onclick="app.selectService('${svc}')">${svc}</div>`;
        });
        palette.innerHTML = tokensHtml;
        
        // Render Drop Zones
        const dropZone = document.getElementById('arch-drop-zone');
        let zonesHtml = '';
        if (this.state.archSetup.zones) {
            this.state.archSetup.zones.forEach((z, i) => {
                const isActive = this.state.selectedZoneId === i ? 'active' : '';
                zonesHtml += `
                    <div class="arch-zone ${isActive}" onclick="app.selectZone(${i})">
                        <div class="arch-zone-title">${z.name}</div>
                        ${this.state.archBoard[i].map(svc => `
                            <div class="service-token in-zone" onclick="event.stopPropagation(); app.removeService('${svc}', ${i})">${svc}</div>
                        `).join('')}
                    </div>
                `;
            });
        }
        dropZone.innerHTML = zonesHtml;
        
        // Render Feedback & Buttons
        const fb = document.getElementById('arch-feedback');
        if (!this.state.archLocked) {
            fb.innerHTML = `
                <div style="display:flex; justify-content:space-between; margin-top:20px;">
                    <button class="btn-primary" style="background:transparent; border:1px solid var(--glass-border); color:var(--text-primary);" onclick="app.resetArch()">Reset Board</button>
                    <button class="btn-primary" onclick="app.verifyArch()">Verify Architecture</button>
                </div>
                <div id="arch-validation-msg" style="margin-top:20px;"></div>
            `;
        }
    },

    selectService(svc) {
        if (this.state.archLocked) return;
        
        // If a zone is already selected, drop it there instantly
        if (this.state.selectedZoneId !== null) {
            this.state.archBoard[this.state.selectedZoneId].push(svc);
            this.state.archPalette = this.state.archPalette.filter(s => s !== svc);
            
            // Clear selections
            this.state.selectedZoneId = null;
            this.state.selectedSvc = null;
            this.renderArch();
            
            const msg = document.getElementById('arch-validation-msg');
            if (msg) msg.innerHTML = '';
            return;
        }
        
        // Otherwise, select the service (or toggle off)
        if (this.state.selectedSvc === svc) {
            this.state.selectedSvc = null;
        } else {
            this.state.selectedSvc = svc;
        }
        this.renderArch();
    },

    selectZone(zoneId) {
        if (this.state.archLocked) return;
        
        // If a service is already selected, drop it here instantly
        if (this.state.selectedSvc !== null) {
            this.state.archBoard[zoneId].push(this.state.selectedSvc);
            this.state.archPalette = this.state.archPalette.filter(s => s !== this.state.selectedSvc);
            
            // Clear selections
            this.state.selectedZoneId = null;
            this.state.selectedSvc = null;
            this.renderArch();
            
            const msg = document.getElementById('arch-validation-msg');
            if (msg) msg.innerHTML = '';
            return;
        }
        
        // Otherwise, select the zone (or toggle off)
        if (this.state.selectedZoneId === zoneId) {
            this.state.selectedZoneId = null;
        } else {
            this.state.selectedZoneId = zoneId;
        }
        this.renderArch();
    },

    removeService(svc, zoneId) {
        if (this.state.archLocked) return;
        
        // Remove from zone
        this.state.archBoard[zoneId] = this.state.archBoard[zoneId].filter(s => s !== svc);
        
        // Put back in palette
        this.state.archPalette.push(svc);
        
        // Clear selections just in case
        this.state.selectedZoneId = null;
        this.state.selectedSvc = null;
        
        this.renderArch();
    },
    
    resetArch() {
        if (this.state.archLocked) return;
        this.initArchState();
        this.renderArch();
    },
    
    nextArch() {
        this.state.archIdx++;
        this.state.archBoard = null; // force re-init
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
                let isDecoyPresent = false;
                this.state.archBoard.forEach(zoneServices => {
                    if (zoneServices.includes(decoyName)) isDecoyPresent = true;
                });
                
                if (isDecoyPresent) {
                    msg.innerHTML = `<div style="color:var(--accent-danger); padding:15px; background:rgba(239, 68, 68, 0.1); border-radius:8px; border-left:4px solid var(--accent-danger);">${decoyMsg}</div>`;
                    return; // Fatal flaw
                }
            }
        }
        
        // Validate correct placement per zone
        let allPlaced = 0;
        let totalRequired = 0;
        
        setup.zones.forEach((z, i) => {
            const placedTokens = this.state.archBoard[i];
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
            this.state.archLocked = true;
            this.state.selectedSvc = null;
            this.state.selectedZoneId = null;
            
            // Lock UI visually
            document.getElementById('arch-palette').style.opacity = '0.5';
            
            // Re-render to apply locks and show success button
            this.renderArch();
            
            const fb = document.getElementById('arch-feedback');
            fb.innerHTML = `
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

print("Sandbox logic successfully updated with Bidirectional Engine!")
