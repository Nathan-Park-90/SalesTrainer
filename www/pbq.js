/**
 * Mammoth Academy — CompTIA PBQ Lab (pbq.js, used by gym.html)
 *
 * Performance-based questions built from each course pack's `pbq` array (DATA.pbq, tagged with courseId by
 * course-loader.js), so a new PBQ is content only. Three part kinds:
 *   grid  — rows × columns of selects or typed answers (optional terminal/log snippet per row)
 *   order — put items in sequence
 *   acl   — an ordered firewall rule table, graded by sending test flows through it (first match wins,
 *           implicit deny at the end), the way a real PBQ checks behaviour rather than one "right" table
 * Partial credit per cell/item/flow, like the real exams. Best score per PBQ is kept in st_pbq_<id>.
 */
const pbq = {
    filter: 'all',
    current: null,   // { p, state: [per-part state], graded: null | result }

    esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); },
    best(id) { const v = parseFloat(localStorage.getItem('st_pbq_' + id)); return isFinite(v) ? v : null; },
    metaOf(courseId) { return (DATA._courseMeta || []).find(m => m.id === courseId) || {}; },
    list() { return DATA.pbq || []; },

    init() {
        const root = document.getElementById('pbq-app');
        if (!root) return;
        const count = document.getElementById('pbq-count');
        const tracks = new Set(this.list().map(p => p.courseId)).size;
        if (count) count.textContent = `${this.list().length} performance-based questions across ${tracks} CompTIA tracks`;
        this.renderList();
    },

    // ───────── list ─────────
    renderList() {
        this.current = null;
        const root = document.getElementById('pbq-app');
        const tracks = [...new Set(this.list().map(p => p.courseId))];
        const shown = this.list().filter(p => this.filter === 'all' || p.courseId === this.filter);
        const pill = (id, label) => `<button class="pbq-pill${this.filter === id ? ' active' : ''}" onclick="pbq.setFilter('${id}')">${label}</button>`;
        root.innerHTML = `
            <div class="pbq-pills">${pill('all', 'All tracks')}${tracks.map(t => { const m = this.metaOf(t); return pill(t, `${m.icon || ''} ${this.esc(m.name || t)}`); }).join('')}</div>
            <div class="pbq-cards">${shown.map(p => {
                const m = this.metaOf(p.courseId);
                const n = this.list().filter(x => x.courseId === p.courseId).indexOf(p) + 1;
                const b = this.best(p.id);
                const badge = b === null ? '<span class="pbq-badge new">Not attempted</span>'
                    : `<span class="pbq-badge ${b >= 1 ? 'full' : b >= 0.8 ? 'pass' : 'low'}">Best ${Math.round(b * 100)}%</span>`;
                return `<button class="pbq-card" style="--track-color:${m.color || '#00f2ff'};" onclick="pbq.open('${p.id}')">
                    <span class="pbq-card-track">${m.icon || ''} ${this.esc(m.name || '')} &middot; PBQ ${n}</span>
                    <span class="pbq-card-title">${this.esc(p.title)}</span>
                    <span class="pbq-card-foot">${p.parts.map(x => `<span class="pbq-kind">${{ grid: 'Match', order: 'Sequence', acl: 'Rule table' }[x.kind]}</span>`).join('')}${badge}</span>
                </button>`;
            }).join('')}</div>`;
    },

    setFilter(id) { this.filter = id; this.renderList(); },

    // ───────── detail ─────────
    open(id) {
        const p = this.list().find(x => x.id === id);
        if (!p) return;
        const state = p.parts.map(part => {
            if (part.kind === 'grid') return part.rows.map(() => ({}));
            if (part.kind === 'order') return [...part.start];
            if (part.kind === 'acl') return part.rules.map(r => Object.assign({}, r));
        });
        this.current = { p, state, graded: null };
        this.render();
        const root = document.getElementById('pbq-app');
        if (root.scrollIntoView) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    reset() { if (this.current) this.open(this.current.p.id); },

    optionsFor(part, row, col) { return (row.options && row.options[col.key]) || col.options || []; },

    render() {
        const { p, graded } = this.current;
        const m = this.metaOf(p.courseId);
        const root = document.getElementById('pbq-app');
        const ctx = p.context ? `<div class="pbq-context"><div class="pbq-context-title">${this.esc(p.context.title || 'Exhibit')}</div><pre>${this.esc(p.context.body)}</pre></div>` : '';
        root.innerHTML = `
            <button class="pbq-back" onclick="pbq.renderList()">&larr; All PBQs</button>
            <div class="pbq-head" style="--track-color:${m.color || '#00f2ff'};">
                <div class="pbq-card-track">${m.icon || ''} ${this.esc(m.name || '')}${m.subtitle ? ' ' + this.esc(m.subtitle) : ''}</div>
                <h3>${this.esc(p.title)}</h3>
                <div class="pbq-brief">${p.brief}</div>
            </div>
            ${ctx}
            ${p.parts.map((part, pi) => `<section class="pbq-part"><h4>${p.parts.length > 1 ? `Part ${pi + 1}: ` : ''}${this.esc(part.title || '')}</h4>${this['render_' + part.kind](part, pi)}</section>`).join('')}
            <div class="pbq-actions">
                <button class="pbq-btn primary" onclick="pbq.submit()">${graded ? 'Re-grade' : 'Submit'}</button>
                <button class="pbq-btn" onclick="pbq.reset()">Reset</button>
            </div>
            <div id="pbq-result" role="status" aria-live="polite">${graded ? this.resultHtml(graded) : ''}</div>`;
    },

    // grid: rows × columns
    render_grid(part, pi) {
        const g = this.current.graded && this.current.graded.parts[pi];
        return `<div class="pbq-grid" style="--cols:${part.columns.length};">
            <div class="pbq-grid-head"><span>Item</span>${part.columns.map(c => `<span>${this.esc(c.label)}</span>`).join('')}</div>
            ${part.rows.map((row, ri) => {
                const vals = this.current.state[pi][ri];
                const cells = part.columns.map(col => {
                    const mark = g ? (g.cells[ri][col.key] ? ' ok' : ' bad') : '';
                    const aria = this.esc(`${row.label}: ${col.label}`);
                    if (col.type === 'text') {
                        return `<input class="pbq-input${mark}" type="text" inputmode="decimal" autocomplete="off" spellcheck="false" aria-label="${aria}" placeholder="${this.esc(col.placeholder || '')}" value="${this.esc(vals[col.key] || '')}" oninput="pbq.setCell(${pi},${ri},'${col.key}',this.value)">`;
                    }
                    const opts = this.optionsFor(part, row, col);
                    const cur = vals[col.key];
                    return `<select class="pbq-select${mark}" aria-label="${aria}" onchange="pbq.setCell(${pi},${ri},'${col.key}',this.value===''?undefined:${'Number(this.value)'})">
                        <option value="">Choose&hellip;</option>
                        ${opts.map((o, oi) => `<option value="${oi}"${cur === oi ? ' selected' : ''}>${this.esc(o)}</option>`).join('')}
                    </select>`;
                }).join('');
                const fb = g && !g.rowOk[ri] ? `<div class="pbq-row-fb">Correct: ${part.columns.map(c => `<strong>${this.esc([].concat(row.answer[c.key])[0])}</strong>`).join(' &middot; ')}. ${row.explain || ''}</div>`
                    : g && row.explain ? `<div class="pbq-row-fb good">${row.explain}</div>` : '';
                return `<div class="pbq-row${g ? (g.rowOk[ri] ? ' ok' : ' bad') : ''}">
                    <div class="pbq-row-label">${this.esc(row.label)}${row.detail ? `<pre class="pbq-detail">${this.esc(row.detail)}</pre>` : ''}</div>
                    ${cells}${fb}
                </div>`;
            }).join('')}
        </div>`;
    },

    setCell(pi, ri, key, v) {
        this.current.state[pi][ri][key] = v;
    },

    // order: move items up/down
    render_order(part, pi) {
        const g = this.current.graded && this.current.graded.parts[pi];
        const items = this.current.state[pi];
        return `<ol class="pbq-order">${items.map((it, i) => `
            <li class="${g ? (it === part.items[i] ? 'ok' : 'bad') : ''}">
                <span class="pbq-order-n">${i + 1}</span><span class="pbq-order-text">${this.esc(it)}</span>
                <button class="pbq-mini" aria-label="Move ${this.esc(it)} up" ${i === 0 ? 'disabled' : ''} onclick="pbq.move(${pi},${i},-1)">&#9650;</button>
                <button class="pbq-mini" aria-label="Move ${this.esc(it)} down" ${i === items.length - 1 ? 'disabled' : ''} onclick="pbq.move(${pi},${i},1)">&#9660;</button>
            </li>`).join('')}</ol>
            ${g && g.correct < g.total ? `<div class="pbq-row-fb">Correct order: ${part.items.map(x => this.esc(x)).join(' &rarr; ')}. ${part.explain || ''}</div>` : g && part.explain ? `<div class="pbq-row-fb good">${part.explain}</div>` : ''}`;
    },

    move(pi, i, d) {
        const a = this.current.state[pi];
        const j = i + d;
        if (j < 0 || j >= a.length) return;
        [a[i], a[j]] = [a[j], a[i]];
        this.render();
        const btns = document.querySelectorAll(`.pbq-part:nth-of-type(${pi + 1}) .pbq-order li:nth-child(${j + 1}) .pbq-mini`);
        if (btns.length) (d < 0 ? btns[0] : btns[1]).focus();
    },

    // acl: editable ordered rule table + traffic simulation results
    render_acl(part, pi) {
        const rules = this.current.state[pi];
        const g = this.current.graded && this.current.graded.parts[pi];
        const sel = (ri, key, opts) => `<select class="pbq-select" aria-label="Rule ${ri + 1} ${key}" onchange="pbq.setRule(${pi},${ri},'${key}',this.value)">${opts.map(o => `<option${rules[ri][key] === o ? ' selected' : ''}>${this.esc(o)}</option>`).join('')}</select>`;
        const objs = Object.keys(part.objects);
        const table = `<div class="pbq-acl">
            <div class="pbq-acl-head"><span>#</span><span>Action</span><span>Proto</span><span>Source</span><span>Destination</span><span>Port</span><span>Order</span></div>
            ${rules.map((r, ri) => `<div class="pbq-acl-row${r.action === 'Disabled' ? ' off' : ''}">
                <span class="pbq-acl-n">${ri + 1}</span>
                ${sel(ri, 'action', ['Permit', 'Deny', 'Disabled'])}${sel(ri, 'proto', part.protocols)}${sel(ri, 'src', objs)}${sel(ri, 'dst', objs)}${sel(ri, 'port', part.ports)}
                <span class="pbq-acl-move"><button class="pbq-mini" aria-label="Move rule ${ri + 1} up" ${ri === 0 ? 'disabled' : ''} onclick="pbq.moveRule(${pi},${ri},-1)">&#9650;</button><button class="pbq-mini" aria-label="Move rule ${ri + 1} down" ${ri === rules.length - 1 ? 'disabled' : ''} onclick="pbq.moveRule(${pi},${ri},1)">&#9660;</button></span>
            </div>`).join('')}
            <div class="pbq-acl-row implicit"><span class="pbq-acl-n">&infin;</span><span class="pbq-acl-implicit">Implicit deny: anything not matched above is dropped</span></div>
        </div>`;
        const sim = g ? `<div class="pbq-flows"><div class="pbq-flows-title">Test traffic (${g.correct}/${g.total} handled correctly)</div>
            ${g.flows.map(f => `<div class="pbq-flow ${f.ok ? 'ok' : 'bad'}"><span>${f.ok ? '&#10003;' : '&#10007;'} ${this.esc(f.label)}</span><span>should <strong>${f.expect.toLowerCase()}</strong>; ${f.rule === null ? 'hit the implicit deny' : `matched rule ${f.rule + 1} (${f.got.toLowerCase()})`}</span></div>`).join('')}</div>` : '';
        return table + sim;
    },

    setRule(pi, ri, key, v) {
        this.current.state[pi][ri][key] = v;
        if (key === 'action') this.render();   // greys out disabled rows
    },

    moveRule(pi, ri, d) {
        const a = this.current.state[pi];
        const j = ri + d;
        if (j < 0 || j >= a.length) return;
        [a[ri], a[j]] = [a[j], a[ri]];
        this.render();
        const btns = document.querySelectorAll(`.pbq-acl-row:nth-child(${j + 2}) .pbq-mini`);
        if (btns.length) (d < 0 ? btns[0] : btns[1]).focus();
    },

    // ───────── grading ─────────
    norm(v) { return String(v == null ? '' : v).trim().toLowerCase().replace(/\s+/g, ' ').replace(/\/\d+$/, ''); },
    ipInt(ip) { return ip.split('.').reduce((a, o) => (a << 8) + (parseInt(o, 10) & 255), 0) >>> 0; },
    inCidr(ip, cidr) {
        const [net, bits] = cidr.split('/');
        const b = parseInt(bits, 10);
        const mask = b === 0 ? 0 : (~0 << (32 - b)) >>> 0;
        return (this.ipInt(ip) & mask) === (this.ipInt(net) & mask);
    },
    // First match wins; nothing matched = implicit deny. Returns { action, rule: index | null }.
    evaluate(part, rules, flow) {
        for (let i = 0; i < rules.length; i++) {
            const r = rules[i];
            if (r.action === 'Disabled') continue;
            if (r.proto !== 'Any' && r.proto !== flow.proto) continue;
            if (r.port !== 'Any' && r.port !== flow.port) continue;
            if (!this.inCidr(flow.src, part.objects[r.src]) || !this.inCidr(flow.dst, part.objects[r.dst])) continue;
            return { action: r.action, rule: i };
        }
        return { action: 'Deny', rule: null };
    },

    gradePart(part, st) {
        if (part.kind === 'grid') {
            const cells = [], rowOk = [];
            let correct = 0, total = 0;
            part.rows.forEach((row, ri) => {
                cells[ri] = {};
                let all = true;
                part.columns.forEach(col => {
                    const accepted = [].concat(row.answer[col.key]);
                    let ok;
                    if (col.type === 'text') ok = accepted.some(a => this.norm(a) === this.norm(st[ri][col.key]));
                    else {
                        const opts = this.optionsFor(part, row, col);
                        const v = st[ri][col.key];
                        ok = v !== undefined && accepted.includes(opts[v]);
                    }
                    cells[ri][col.key] = ok;
                    total++; if (ok) correct++; else all = false;
                });
                rowOk[ri] = all;
            });
            return { correct, total, cells, rowOk };
        }
        if (part.kind === 'order') {
            const correct = st.filter((it, i) => it === part.items[i]).length;
            return { correct, total: part.items.length };
        }
        if (part.kind === 'acl') {
            const flows = part.flows.map(f => {
                const r = this.evaluate(part, st, f);
                return { label: f.label, expect: f.expect, got: r.action, rule: r.rule, ok: r.action === f.expect };
            });
            return { correct: flows.filter(f => f.ok).length, total: flows.length, flows };
        }
    },

    submit() {
        const { p, state } = this.current;
        const parts = p.parts.map((part, pi) => this.gradePart(part, state[pi]));
        const correct = parts.reduce((s, x) => s + x.correct, 0);
        const total = parts.reduce((s, x) => s + x.total, 0);
        const pct = total ? correct / total : 0;
        const prev = this.best(p.id);
        try { if (prev === null || pct > prev) localStorage.setItem('st_pbq_' + p.id, pct.toFixed(4)); } catch (e) { }
        this.current.graded = { parts, correct, total, pct, best: Math.max(pct, prev || 0) };
        this.render();
        const res = document.getElementById('pbq-result');
        if (res && res.scrollIntoView) res.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },

    resultHtml(g) {
        const pct = Math.round(g.pct * 100);
        const cls = g.pct >= 1 ? 'full' : g.pct >= 0.8 ? 'pass' : 'low';
        const verdict = g.pct >= 1 ? 'Perfect. Every item correct.' : g.pct >= 0.8 ? 'Strong. Fix the red items and re-grade.' : 'Not yet. Read the feedback on the red items, adjust, and re-grade.';
        return `<div class="pbq-result ${cls}">
            <div class="pbq-score">${pct}%<span>${g.correct} / ${g.total} items &middot; best ${Math.round(g.best * 100)}%</span></div>
            <div class="pbq-verdict">${verdict} Real PBQs give partial credit the same way.</div>
            <div class="pbq-solution"><strong>Solution walkthrough:</strong> ${this.current.p.solution}</div>
        </div>`;
    }
};
