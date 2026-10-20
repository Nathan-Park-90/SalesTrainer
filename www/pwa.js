/**
 * Mammoth Academy — PWA registration + "Save for offline"
 * Loaded on every page (see the <script src="pwa.js"> tag) so the service
 * worker gets installed no matter which page a visitor lands on first.
 *
 * "📥 OFFLINE" sits in every page's navbar and opens a panel; the home page
 * also shows it as a card (#offline-card). It shows whether the whole app is
 * stored on this device, downloads it on tap, and offers Chrome's "install
 * app" prompt when the browser allows it (iPhone/iPad: Share -> Add to Home Screen).
 */
if ('serviceWorker' in navigator) {
    const registerSW = () => {
        navigator.serviceWorker.register('sw.js').catch((err) => {
            console.warn('[Mammoth Academy] Service worker registration failed:', err);
        });
    };
    // If this script runs after the page has already finished loading (a slow
    // script load, a cached/instant load, etc.), the 'load' event has already
    // fired and would never come again — register immediately in that case.
    if (document.readyState === 'complete') {
        registerSW();
    } else {
        window.addEventListener('load', registerSW);
    }
}

(function () {
    if (!('serviceWorker' in navigator) || !window.MessageChannel) return;

    let installPrompt = null;
    const standalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    const ask = (type) => navigator.serviceWorker.ready.then((reg) => new Promise((resolve, reject) => {
        const worker = navigator.serviceWorker.controller || reg.active;
        if (!worker) return reject(new Error('no worker'));
        const ch = new MessageChannel();
        const t = setTimeout(() => reject(new Error('timeout')), type === 'download' ? 120000 : 8000);
        ch.port1.onmessage = (e) => { clearTimeout(t); resolve(e.data); };
        worker.postMessage({ type }, [ch.port2]);
    }));

    const css = `
.ma-offline { display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:10px; text-align:center; font-family:var(--font-mono, monospace); font-size:0.78rem; }
.ma-offline-card { margin:18px auto 32px; max-width:1100px; padding:14px 16px; border:1px solid rgba(0,242,255,0.25); border-radius:12px; background:rgba(13,19,36,0.85); }
.ma-offline-text { flex:1 1 220px; color:#cbd5e1; line-height:1.45; }
.ma-offline-text b { color:#f8fafc; font-family:var(--font-heading, sans-serif); font-size:0.95rem; display:block; margin-bottom:2px; }
.ma-offline button { font:inherit; font-weight:700; cursor:pointer; padding:9px 14px; border-radius:999px; border:1px solid rgba(0,242,255,0.55); background:rgba(0,242,255,0.12); color:#00f2ff; min-height:40px; }
.ma-offline button:hover { background:rgba(0,242,255,0.22); }
.ma-offline button[disabled] { opacity:0.6; cursor:default; }
.ma-offline button.ma-offline-done { border-color:rgba(34,197,94,0.6); background:rgba(34,197,94,0.12); color:#4ade80; }
.ma-offline-hint { flex:1 0 100%; color:#94a3b8; font-size:0.72rem; }
.ma-offline [hidden] { display:none; }
.ma-offline-nav.ma-offline-ok { color:#4ade80 !important; }
.ma-offline-overlay { position:fixed; inset:0; z-index:100000; display:flex; align-items:center; justify-content:center; padding:16px; background:rgba(2,6,23,0.78); }
.ma-offline-overlay[hidden] { display:none; }
.ma-offline-panel { position:relative; width:100%; max-width:420px; padding:24px 18px 18px; border:1px solid rgba(0,242,255,0.35); border-radius:14px; background:#0d1324; box-shadow:0 20px 60px rgba(0,0,0,0.6); }
.ma-offline-close { position:absolute; top:4px; right:6px; width:40px; height:40px; border:0; background:none; color:#94a3b8; font-size:1.5rem; cursor:pointer; }`;

    const boxes = [];
    let last = null;    // last status from the service worker: {cached, total, ...}
    let busy = false;

    function makeBox(cls) {
        const box = document.createElement('div');
        box.className = 'ma-offline ' + cls;
        box.innerHTML = '<div class="ma-offline-text"><b>📥 Study offline</b><span class="ma-offline-status">Checking this device…</span></div>' +
            '<button type="button" class="ma-offline-save">Save for offline</button>' +
            '<button type="button" class="ma-offline-install" hidden>Install app</button>' +
            '<div class="ma-offline-hint" hidden>Tip: tap Share → Add to Home Screen to open it like an app.</div>';
        box.querySelector('.ma-offline-save').addEventListener('click', save);
        box.querySelector('.ma-offline-install').addEventListener('click', install);
        boxes.push(box);
        return box;
    }

    // Every box (home card, nav panel) and the nav label show the same state.
    function render(message) {
        const ready = !!(last && last.cached === last.total);
        boxes.forEach((box) => {
            const btn = box.querySelector('.ma-offline-save');
            btn.disabled = busy;
            btn.classList.toggle('ma-offline-done', ready && !busy);
            btn.textContent = busy ? 'Downloading…' : ready ? '✓ Saved on this device' : 'Save for offline';
            box.querySelector('.ma-offline-status').textContent = message || (ready
                ? (standalone() ? 'Installed and ready. Every track works with no signal, airplane mode included.'
                    : 'Ready. Every track works with no signal, airplane mode included. Tap again any time to refresh.')
                : 'Download the whole academy (all tracks, about 3 MB) so it works on a plane or with no signal.');
            box.querySelector('.ma-offline-install').hidden = standalone() || !installPrompt;
            box.querySelector('.ma-offline-hint').hidden = standalone() || !!installPrompt || !isApple;
        });
        document.querySelectorAll('.ma-offline-nav').forEach((a) => {
            a.classList.toggle('ma-offline-ok', ready);
            a.textContent = ready ? '✓ OFFLINE' : '📥 OFFLINE';
        });
    }

    const check = () => ask('status').then((s) => { last = s; render(); }).catch(() => render());

    function save() {
        if (!navigator.onLine) return render('You are offline right now. Connect once, then tap Save.');
        busy = true;
        render();
        ask('download').then((s) => {
            busy = false;
            last = s;
            render(s.ok ? '' : 'Saved ' + s.cached + ' of ' + s.total + ' files. Check the connection and tap again.');
        }).catch(() => {
            busy = false;
            render('The download did not finish. Check the connection and tap again.');
        });
    }

    function install() {
        if (!installPrompt) return;
        installPrompt.prompt();
        installPrompt.userChoice.finally(() => { installPrompt = null; render(); });
    }

    function build() {
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);

        // Home page: a card under the stats bar.
        const slot = document.getElementById('offline-card');
        if (slot) slot.appendChild(makeBox('ma-offline-card'));

        // Every page: "📥 OFFLINE" in the navbar (next to SYNC) opens a panel; #offline in the URL opens it too.
        const overlay = document.createElement('div');
        overlay.className = 'ma-offline-overlay';
        overlay.hidden = true;
        overlay.innerHTML = '<div class="ma-offline-panel" role="dialog" aria-modal="true" aria-label="Study offline"><button type="button" class="ma-offline-close" aria-label="Close">×</button></div>';
        overlay.firstChild.appendChild(makeBox(''));
        document.body.appendChild(overlay);
        const openPanel = () => { overlay.hidden = false; check(); };
        const closePanel = () => {
            overlay.hidden = true;
            if (location.hash === '#offline') history.replaceState(null, '', location.pathname + location.search);
        };
        overlay.addEventListener('click', (e) => { if (e.target === overlay || e.target.closest('.ma-offline-close')) closePanel(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !overlay.hidden) closePanel(); });

        const nav = document.querySelector('.navbar .nav-links');
        if (nav) {
            const li = document.createElement('li');
            li.innerHTML = '<a href="#offline" class="ma-offline-nav" title="Save the academy for offline use">📥 OFFLINE</a>';
            nav.appendChild(li);
        }
        // One tap does it all: open the panel and, unless everything is already saved, start the download.
        document.addEventListener('click', (e) => {
            if (!e.target.closest('a[href="#offline"]')) return;
            e.preventDefault();
            overlay.hidden = false;
            ask('status').then((s) => { last = s; }).catch(() => {}).then(() => {
                if (last && last.cached === last.total) render(); else if (!busy) save();
            });
        });
        if (location.hash === '#offline') openPanel();

        window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installPrompt = e; render(); });
        window.addEventListener('appinstalled', () => { installPrompt = null; render(); });
        // The first visit installs the worker in the background; re-check once it has finished precaching.
        navigator.serviceWorker.addEventListener('controllerchange', check);
        check();
    }

    // Catch the install prompt even if it fires before the page is built.
    window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installPrompt = e; });
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
    else build();
})();
