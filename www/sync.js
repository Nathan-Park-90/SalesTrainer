/**
 * Mammoth Academy — Sync & Backup (sync.js, loaded on every page)
 *
 * All progress lives in this browser's localStorage, so moving it between a phone, a laptop and the
 * Android build needs no server: export a versioned, checksummed payload as a Sync Code (compressed,
 * Base64URL, copied to the clipboard) or a .json file, then import it on the other device with
 * Smart Merge or Overwrite. Keys are copied byte-for-byte (st_quiz_<courseId>_<localIdx>_<topic>,
 * flashcard ids, exam keys), so nothing downstream sees a renamed or re-keyed value.
 *
 * Opens from the ⇄ button in the navbar or footer, or any page with #sync in the URL.
 */
(function () {
    'use strict';

    const APP = 'mammoth-academy';
    const VERSION = 1;
    const UNDO_KEY = 'ma_sync_undo';        // pre-import snapshot; not st_*, so it is never exported
    const MAX_BYTES = 4 * 1024 * 1024;      // far above any real backup; rejects junk pastes early
    const isOurs = k => /^st_/.test(k) || k === 'mammoth.mode' || k === 'mammoth.unlocked';
    // Array-valued keys that Smart Merge unions (ids, so a union never duplicates or renames anything).
    const UNION_KEYS = ['st_fc_mastered', 'st_badges', 'st_sales_solved', 'st_arch_done_ids', 'st_completed', 'st_failed_qs'];

    // ---------- storage (every access guarded: private windows can throw) ----------
    function readState() {
        const keys = {};
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (isOurs(k)) keys[k] = localStorage.getItem(k);
            }
        } catch (e) { /* storage unavailable: empty state */ }
        return keys;
    }
    function writeState(keys, clearFirst) {
        if (clearFirst) Object.keys(readState()).forEach(k => localStorage.removeItem(k));
        Object.keys(keys).forEach(k => localStorage.setItem(k, keys[k]));
    }

    // ---------- payload ----------
    // CRC-32 over a canonical (sorted) serialization: pure JS, so the same backup checks out on every
    // browser and the Android WebView, secure context or not.
    const CRC_TABLE = (() => {
        const t = [];
        for (let n = 0; n < 256; n++) {
            let c = n;
            for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
            t[n] = c >>> 0;
        }
        return t;
    })();
    function crc32(str) {
        const bytes = new TextEncoder().encode(str);
        let c = 0xFFFFFFFF;
        for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
        return ((c ^ 0xFFFFFFFF) >>> 0).toString(16).padStart(8, '0');
    }
    const canonical = keys => JSON.stringify(Object.keys(keys).sort().map(k => [k, keys[k]]));

    function buildPayload() {
        const keys = readState();
        return { app: APP, version: VERSION, exportedAt: new Date().toISOString(), keyCount: Object.keys(keys).length, checksum: crc32(canonical(keys)), keys };
    }

    function validate(p) {
        if (!p || typeof p !== 'object' || Array.isArray(p)) return 'That isn\'t a Mammoth Academy backup.';
        if (p.app !== APP) return 'That backup is from a different app.';
        if (!Number.isInteger(p.version) || p.version < 1) return 'The backup has no valid version number.';
        if (p.version > VERSION) return 'This backup was made by a newer version of Mammoth Academy. Reload this page to update, then try again.';
        if (!p.keys || typeof p.keys !== 'object' || Array.isArray(p.keys)) return 'The backup has no progress data.';
        for (const [k, v] of Object.entries(p.keys)) {
            if (!isOurs(k)) return 'The backup contains an unexpected key (' + k.slice(0, 40) + ').';
            if (typeof v !== 'string') return 'The backup has a malformed value for ' + k + '.';
        }
        for (const k of UNION_KEYS) {
            if (p.keys[k] === undefined) continue;
            try { if (!Array.isArray(JSON.parse(p.keys[k]))) throw 0; } catch (e) { return 'The backup has a malformed list for ' + k + '.'; }
        }
        if (crc32(canonical(p.keys)) !== p.checksum) return 'The checksum doesn\'t match: the code was cut off or edited. Copy it again in full.';
        return null;
    }

    // ---------- Sync Code: "MA1z." + Base64URL(deflate(JSON)), or "MA1j." uncompressed ----------
    function toB64url(bytes) {
        let bin = '';
        for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
        return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    function fromB64url(s) {
        const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4);
        const bin = atob(b64);
        const out = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
        return out;
    }
    async function pipe(bytes, stream) {
        return new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer());
    }
    async function encodeCode(payload) {
        const bytes = new TextEncoder().encode(JSON.stringify(payload));
        if (typeof CompressionStream === 'function') {
            try { return 'MA1z.' + toB64url(await pipe(bytes, new CompressionStream('deflate-raw'))); } catch (e) { /* fall through */ }
        }
        return 'MA1j.' + toB64url(bytes);
    }
    async function decodeInput(text) {
        const t = String(text || '').trim();
        if (!t) throw new Error('Paste a Sync Code or choose a backup file first.');
        if (t.length > MAX_BYTES * 2) throw new Error('That is far too large to be a Mammoth Academy backup.');
        if (t[0] === '{') return JSON.parse(t);
        const m = t.replace(/\s+/g, '').match(/^MA1([zj])\.([A-Za-z0-9_-]+)$/);
        if (!m) throw new Error('That doesn\'t look like a Sync Code (they start with "MA1").');
        const damaged = 'That Sync Code is cut off or damaged. Copy it again in full (it can be long).';
        let bytes;
        try { bytes = fromB64url(m[2]); } catch (e) { throw new Error(damaged); }
        if (m[1] === 'z') {
            if (typeof DecompressionStream !== 'function') throw new Error('This browser can\'t open compressed Sync Codes. Use a .json backup file instead.');
            // A truncated deflate stream surfaces as a generic stream error ("Failed to fetch").
            try { bytes = await pipe(bytes, new DecompressionStream('deflate-raw')); } catch (e) { throw new Error(damaged); }
        }
        if (bytes.length > MAX_BYTES) throw new Error('That is far too large to be a Mammoth Academy backup.');
        return JSON.parse(new TextDecoder().decode(bytes));
    }

    // ---------- Smart Merge ----------
    const num = v => { const n = parseFloat(v); return isFinite(n) ? n : 0; };
    const list = v => { try { const a = JSON.parse(v); return Array.isArray(a) ? a : []; } catch (e) { return []; } };
    const dateOf = v => { const t = Date.parse(v); return isFinite(t) ? t : 0; };

    function smartMerge(local, incoming) {
        const out = Object.assign({}, local);
        Object.keys(incoming).forEach(k => {
            const a = local[k], b = incoming[k];
            if (a === undefined) { out[k] = b; return; }
            if (UNION_KEYS.includes(k)) {
                // Values are only re-serialized when the union actually adds something, so a merge that
                // changes nothing leaves this device's stored strings byte-for-byte as they were.
                const merged = list(a), before = merged.length;
                list(b).forEach(x => { if (!merged.includes(x)) merged.push(x); });
                if (merged.length !== before) out[k] = JSON.stringify(merged);
            } else if (/^st_quiz_/.test(k)) {
                out[k] = a === 'done' || b === 'done' ? 'done' : a;
            } else if (/^st_highscore/.test(k) || /^st_daily_day_/.test(k) || k === 'st_streak' || k === 'st_arch_completed') {
                out[k] = num(b) > num(a) ? b : a;             // best score, furthest lesson, longest streak
            } else if (k === 'st_last_daily') {
                out[k] = dateOf(b) > dateOf(a) ? b : a;        // most recent study day keeps the streak alive
            } else if (/^st_domain_perf_/.test(k)) {
                // Per domain, keep whichever device has seen more questions. Summing would double-count
                // every time the same backup is merged again; this way a repeat merge changes nothing.
                let pa = {}, pb = {};
                try { pa = JSON.parse(a) || {}; } catch (e) { }
                try { pb = JSON.parse(b) || {}; } catch (e) { }
                let changed = false;
                Object.keys(pb).forEach(d => { if (!pa[d] || num(pb[d].total) > num(pa[d].total)) { pa[d] = pb[d]; changed = true; } });
                if (changed) out[k] = JSON.stringify(pa);
            }
            // Anything else (track choice, Practice mode, theme): this device's own setting wins.
        });
        if (out.st_arch_done_ids && list(out.st_arch_done_ids).length > num(out.st_arch_completed)) out.st_arch_completed = String(list(out.st_arch_done_ids).length);
        return out;
    }

    // ---------- summaries shown before anything is applied ----------
    function summarize(keys) {
        const quizzes = Object.keys(keys).filter(k => /^st_quiz_/.test(k) && keys[k] === 'done').length;
        let best = 0;
        Object.keys(keys).forEach(k => { if (/^st_highscore_pct_/.test(k)) best = Math.max(best, num(keys[k])); });
        return {
            cards: list(keys.st_fc_mastered).length,
            quizzes,
            streak: num(keys.st_streak),
            badges: list(keys.st_badges).length,
            best: best > 0 ? Math.round(best * 100) + '%' : '—',
            exams: Object.keys(keys).filter(k => /^st_highscore_/.test(k)).length > 0
        };
    }
    function summaryRow(label, s) {
        return `<tr><th scope="row">${label}</th><td>${s.cards}</td><td>${s.quizzes}</td><td>${s.streak}</td><td>${s.badges}</td><td>${s.best}</td></tr>`;
    }

    // ---------- modal ----------
    let modal, pending = null, lastFocus = null;
    const $ = sel => modal.querySelector(sel);
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const isNativeApp = () => !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());

    function build() {
        modal = document.createElement('div');
        modal.className = 'sync-backdrop';
        modal.hidden = true;
        modal.innerHTML = `
            <div class="sync-dialog" role="dialog" aria-modal="true" aria-labelledby="sync-title">
                <div class="sync-head">
                    <h2 id="sync-title">&#8644; Sync &amp; Backup</h2>
                    <button class="sync-x" type="button" aria-label="Close" data-close>&#10005;</button>
                </div>
                <p class="sync-lead">Your progress is saved only in this browser. Move it to your phone, laptop or the Android app, or keep a backup. Nothing is uploaded anywhere.</p>
                <div class="sync-tabs" role="tablist">
                    <button type="button" role="tab" id="sync-tab-export" aria-selected="true" data-tab="export">Export</button>
                    <button type="button" role="tab" id="sync-tab-import" aria-selected="false" data-tab="import">Import / Restore</button>
                </div>

                <section class="sync-pane" data-pane="export" role="tabpanel" aria-labelledby="sync-tab-export">
                    <div class="sync-now"></div>
                    <div class="sync-actions">
                        <button type="button" class="sync-btn primary" data-act="copy">Copy Sync Code</button>
                        <button type="button" class="sync-btn" data-act="download">Download Backup (.json)</button>
                    </div>
                    <p class="sync-native-note" hidden>In the Android app, use <strong>Copy Sync Code</strong> and paste it somewhere safe (a note or a message to yourself); file downloads don't work inside the app.</p>
                    <label class="sync-label" for="sync-code-out">Sync Code</label>
                    <textarea id="sync-code-out" class="sync-code" readonly rows="3" placeholder="Press Copy Sync Code"></textarea>
                    <div class="sync-msg" data-msg="export" role="status" aria-live="polite"></div>
                </section>

                <section class="sync-pane" data-pane="import" role="tabpanel" aria-labelledby="sync-tab-import" hidden>
                    <label class="sync-label" for="sync-code-in">Paste a Sync Code</label>
                    <textarea id="sync-code-in" class="sync-code" rows="3" placeholder="MA1z.…" spellcheck="false" autocomplete="off"></textarea>
                    <div class="sync-or">or</div>
                    <label class="sync-btn sync-file">Choose a backup file (.json)<input type="file" accept=".json,application/json" data-file hidden></label>
                    <div class="sync-actions"><button type="button" class="sync-btn primary" data-act="check">Check Backup</button></div>
                    <div class="sync-preview" hidden></div>
                    <div class="sync-msg" data-msg="import" role="status" aria-live="polite"></div>
                    <div class="sync-undo" hidden></div>
                </section>
            </div>`;
        document.body.appendChild(modal);

        modal.addEventListener('click', e => {
            if (e.target === modal || e.target.closest('[data-close]')) return close();
            const tab = e.target.closest('[data-tab]');
            if (tab) return showTab(tab.dataset.tab);
            const act = e.target.closest('[data-act]');
            if (act) return actions[act.dataset.act](act);
        });
        modal.addEventListener('keydown', e => {
            if (e.key === 'Escape') { e.preventDefault(); close(); }
            if (e.key === 'Tab') trapFocus(e);
        });
        $('[data-file]').addEventListener('change', async e => {
            const f = e.target.files && e.target.files[0];
            if (!f) return;
            if (f.size > MAX_BYTES) return say('import', 'That file is far too large to be a Mammoth Academy backup.', 'bad');
            $('#sync-code-in').value = await f.text();
            say('import', 'Loaded ' + f.name + '. Press Check Backup.', '');
            e.target.value = '';
        });
        if (isNativeApp()) {
            $('[data-act="download"]').hidden = true;
            $('.sync-native-note').hidden = false;
        }
    }

    function trapFocus(e) {
        const f = [...modal.querySelectorAll('button:not([hidden]), textarea, input[type="radio"], input[type="checkbox"], label.sync-file')]
            .filter(el => el.offsetParent !== null && !el.disabled);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    function say(which, text, cls) {
        const el = $(`[data-msg="${which}"]`);
        el.className = 'sync-msg' + (cls ? ' ' + cls : '');
        el.textContent = text;
    }

    function showTab(name) {
        modal.querySelectorAll('[data-tab]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === name)));
        modal.querySelectorAll('[data-pane]').forEach(p => { p.hidden = p.dataset.pane !== name; });
        if (name === 'export') renderNow();
        if (name === 'import') renderUndo();
    }

    function renderNow() {
        const s = summarize(readState());
        $('.sync-now').innerHTML = `<table class="sync-table"><thead><tr><th></th><th>Cards mastered</th><th>Mini-quizzes</th><th>Streak</th><th>Badges</th><th>Best exam</th></tr></thead><tbody>${summaryRow('This device', s)}</tbody></table>`;
    }

    function renderUndo() {
        let snap = null;
        try { snap = JSON.parse(localStorage.getItem(UNDO_KEY) || 'null'); } catch (e) { }
        const box = $('.sync-undo');
        if (!snap || !snap.at) { box.hidden = true; return; }
        box.hidden = false;
        box.innerHTML = `Last import: ${esc(new Date(snap.at).toLocaleString())}. <button type="button" class="sync-link" data-act="undo">Undo it</button>`;
    }

    const actions = {
        async copy(btn) {
            btn.disabled = true;
            try {
                const code = await encodeCode(buildPayload());
                const out = $('#sync-code-out');
                out.value = code;
                let copied = false;
                try { await navigator.clipboard.writeText(code); copied = true; } catch (e) {
                    out.focus(); out.select();
                    try { copied = document.execCommand('copy'); } catch (e2) { }
                }
                say('export', copied
                    ? `Copied (${code.length.toLocaleString()} characters). On the other device open ⇄ Sync & Backup → Import and paste it.`
                    : 'Your browser blocked the clipboard. The code is selected below: copy it by hand.', copied ? 'good' : '');
            } catch (e) {
                say('export', 'Couldn\'t create the code: ' + e.message, 'bad');
            } finally { btn.disabled = false; }
        },
        download() {
            const payload = buildPayload();
            const d = new Date();
            const name = `mammoth-academy-backup-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}.json`;
            const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
            const a = document.createElement('a');
            a.href = url; a.download = name;
            document.body.appendChild(a); a.click(); a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 2000);
            say('export', 'Saved ' + name + ' (' + payload.keyCount + ' items).', 'good');
        },
        async check() {
            $('.sync-preview').hidden = true;
            pending = null;
            let p;
            try { p = await decodeInput($('#sync-code-in').value); } catch (e) {
                return say('import', e instanceof SyntaxError ? 'That code or file is damaged (it isn\'t valid JSON).' : e.message, 'bad');
            }
            const err = validate(p);
            if (err) return say('import', err, 'bad');
            pending = p;
            say('import', '', '');
            const local = readState();
            const merged = smartMerge(local, p.keys);
            const pv = $('.sync-preview');
            pv.hidden = false;
            pv.innerHTML = `
                <p class="sync-ok">&#10003; Valid backup from ${esc(new Date(p.exportedAt).toLocaleString())} (${p.keyCount} items, checksum ${esc(p.checksum)}).</p>
                <table class="sync-table"><thead><tr><th></th><th>Cards mastered</th><th>Mini-quizzes</th><th>Streak</th><th>Badges</th><th>Best exam</th></tr></thead><tbody>
                    ${summaryRow('This device', summarize(local))}
                    ${summaryRow('Backup', summarize(p.keys))}
                    ${summaryRow('After Smart Merge', summarize(merged))}
                </tbody></table>
                <fieldset class="sync-modes">
                    <legend>How should it be applied?</legend>
                    <label><input type="radio" name="sync-mode" value="merge" checked><span><strong>Smart Merge</strong>: keep the best of both (highest exam scores, every mastered card, completed module and badge, the longest streak). Safe to repeat.</span></label>
                    <label><input type="radio" name="sync-mode" value="overwrite"><span><strong>Overwrite this device</strong>: replace everything here with the backup.</span></label>
                </fieldset>
                <label class="sync-confirm" hidden><input type="checkbox" data-confirm><span>I understand this device's current progress will be replaced.</span></label>
                <div class="sync-actions"><button type="button" class="sync-btn primary" data-act="apply">Apply Smart Merge</button></div>`;
            pv.querySelectorAll('input[name="sync-mode"]').forEach(r => r.addEventListener('change', () => {
                const over = pv.querySelector('input[name="sync-mode"]:checked').value === 'overwrite';
                pv.querySelector('.sync-confirm').hidden = !over;
                pv.querySelector('[data-act="apply"]').textContent = over ? 'Overwrite This Device' : 'Apply Smart Merge';
            }));
            pv.querySelector('[data-act="apply"]').focus();
        },
        apply() {
            if (!pending) return;
            const over = $('input[name="sync-mode"]:checked').value === 'overwrite';
            if (over && !$('[data-confirm]').checked) return say('import', 'Tick the box to confirm the overwrite first.', 'bad');
            const before = readState();
            try {
                localStorage.setItem(UNDO_KEY, JSON.stringify({ at: Date.now(), keys: before }));
                if (over) writeState(pending.keys, true);
                else writeState(smartMerge(before, pending.keys), false);
            } catch (e) {
                try { writeState(before, true); } catch (e2) { }
                return say('import', 'Couldn\'t save on this device (' + (e.name || e.message) + '). Nothing was changed.', 'bad');
            }
            pending = null;
            $('.sync-preview').hidden = true;
            say('import', (over ? 'Device overwritten.' : 'Progress merged.') + ' Reloading…', 'good');
            setTimeout(() => location.reload(), 900);
        },
        undo() {
            let snap = null;
            try { snap = JSON.parse(localStorage.getItem(UNDO_KEY) || 'null'); } catch (e) { }
            if (!snap || !snap.keys) return;
            try {
                writeState(snap.keys, true);
                localStorage.removeItem(UNDO_KEY);
            } catch (e) { return say('import', 'Undo failed: ' + (e.name || e.message), 'bad'); }
            say('import', 'Restored this device to how it was before the last import. Reloading…', 'good');
            setTimeout(() => location.reload(), 900);
        }
    };

    function open(tab) {
        if (!modal) build();
        lastFocus = document.activeElement;
        modal.hidden = false;
        document.documentElement.classList.add('sync-open');
        showTab(tab || 'export');
        $(`[data-tab="${tab || 'export'}"]`).focus();
    }
    function close() {
        modal.hidden = true;
        document.documentElement.classList.remove('sync-open');
        if (location.hash === '#sync') history.replaceState(null, '', location.pathname + location.search);
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    // ---------- entry points: navbar + footer on every page ----------
    function addButtons() {
        const nav = document.querySelector('.navbar .nav-links');
        if (nav && !nav.querySelector('.sync-nav')) {
            const li = document.createElement('li');
            li.innerHTML = '<a href="#sync" class="sync-nav" title="Sync & Backup progress" aria-label="Sync and back up progress">&#8644; SYNC</a>';
            nav.appendChild(li);
        }
        const foot = document.querySelector('.mammoth-footer-inner');
        if (foot && !foot.querySelector('.sync-foot')) {
            foot.insertAdjacentHTML('beforeend', '<span class="mammoth-footer-divider">&middot;</span><a href="#sync" class="mammoth-footer-link sync-foot">&#8644; Sync &amp; Backup</a>');
        }
        document.addEventListener('click', e => {
            const a = e.target.closest('a[href="#sync"]');
            if (!a) return;
            e.preventDefault();
            open('export');
        });
        if (location.hash === '#sync') open('export');
        window.addEventListener('hashchange', () => { if (location.hash === '#sync') open('export'); });
    }

    // Exposed for other pages' links and for tests.
    window.MammothSync = { open, buildPayload, validate, encodeCode, decodeInput, smartMerge, summarize, crc32, canonical, VERSION };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addButtons);
    else addButtons();
})();
