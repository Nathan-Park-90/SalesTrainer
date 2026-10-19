/**
 * Mammoth Academy — PWA registration + "Save for offline" button
 * Loaded on every page (see the <script src="pwa.js"> tag) so the service
 * worker gets installed no matter which page a visitor lands on first.
 *
 * The button goes in #offline-card when a page has one (the home page), and
 * into the footer everywhere else. It shows whether the whole app is stored on
 * this device, downloads it on tap, and offers Chrome's "install app" prompt
 * when the browser allows it (iPhone/iPad: Share -> Add to Home Screen).
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
.ma-offline { display:flex; flex-wrap:wrap; align-items:center; gap:10px; font-family:var(--font-mono, monospace); font-size:0.78rem; }
.ma-offline-card { margin:18px auto 32px; justify-content:center; text-align:center; max-width:1100px; padding:14px 16px; border:1px solid rgba(0,242,255,0.25); border-radius:12px; background:rgba(13,19,36,0.85); }
.ma-offline-card .ma-offline-text { flex:1 1 220px; color:#cbd5e1; line-height:1.45; }
.ma-offline-card .ma-offline-text b { color:#f8fafc; font-family:var(--font-heading, sans-serif); font-size:0.95rem; display:block; margin-bottom:2px; }
.ma-offline-footer { justify-content:center; margin-top:10px; color:#94a3b8; }
.ma-offline button { font:inherit; font-weight:700; cursor:pointer; padding:9px 14px; border-radius:999px; border:1px solid rgba(0,242,255,0.55); background:rgba(0,242,255,0.12); color:#00f2ff; min-height:40px; }
.ma-offline button:hover { background:rgba(0,242,255,0.22); }
.ma-offline button[disabled] { opacity:0.6; cursor:default; }
.ma-offline button.ma-offline-done { border-color:rgba(34,197,94,0.6); background:rgba(34,197,94,0.12); color:#4ade80; }
.ma-offline-hint { flex:1 0 100%; color:#94a3b8; font-size:0.72rem; }
.ma-offline-hint[hidden] { display:none; }`;

    function build() {
        const slot = document.getElementById('offline-card');
        const footer = document.querySelector('.mammoth-footer');
        if (!slot && !footer) return;
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);

        const box = document.createElement('div');
        box.className = 'ma-offline ' + (slot ? 'ma-offline-card' : 'ma-offline-footer');
        box.innerHTML = (slot ? '<div class="ma-offline-text"><b>📥 Study offline</b><span class="ma-offline-status">Checking this device…</span></div>' : '<span class="ma-offline-status"></span>') +
            '<button type="button" class="ma-offline-save">Save for offline</button>' +
            '<button type="button" class="ma-offline-install" hidden>Install app</button>' +
            '<div class="ma-offline-hint" hidden></div>';
        if (slot) slot.appendChild(box); else footer.appendChild(box);

        const statusEl = box.querySelector('.ma-offline-status');
        const saveBtn = box.querySelector('.ma-offline-save');
        const installBtn = box.querySelector('.ma-offline-install');
        const hint = box.querySelector('.ma-offline-hint');

        const showInstall = () => {
            if (standalone()) { installBtn.hidden = true; hint.hidden = true; return; }
            if (installPrompt) { installBtn.hidden = false; hint.hidden = true; return; }
            installBtn.hidden = true;
            if (slot && isApple) {
                hint.hidden = false;
                hint.textContent = 'Tip: tap Share → Add to Home Screen to open it like an app.';
            }
        };

        const render = (s) => {
            const ready = s && s.cached === s.total;
            saveBtn.disabled = false;
            saveBtn.classList.toggle('ma-offline-done', !!ready);
            saveBtn.textContent = ready ? '✓ Saved on this device' : 'Save for offline';
            if (slot) {
                statusEl.textContent = ready
                    ? (standalone() ? 'Installed and ready. Every track works with no signal, airplane mode included.'
                        : 'Ready. Every track works with no signal, airplane mode included. Tap again any time to refresh.')
                    : 'Download the whole academy (all tracks, about 3 MB) so it works on a plane or with no signal.';
            }
            showInstall();
        };

        const check = () => ask('status').then(render).catch(() => render(null));

        saveBtn.addEventListener('click', () => {
            if (!navigator.onLine) {
                if (slot) statusEl.textContent = 'You are offline right now. Connect once, then tap Save.';
                return;
            }
            saveBtn.disabled = true;
            saveBtn.classList.remove('ma-offline-done');
            saveBtn.textContent = 'Downloading…';
            ask('download').then((s) => {
                render(s);
                if (!s.ok && slot) statusEl.textContent = 'Saved ' + s.cached + ' of ' + s.total + ' files. Check the connection and tap again.';
            }).catch(() => {
                render(null);
                if (slot) statusEl.textContent = 'The download did not finish. Check the connection and tap again.';
            });
        });

        installBtn.addEventListener('click', () => {
            if (!installPrompt) return;
            installPrompt.prompt();
            installPrompt.userChoice.finally(() => { installPrompt = null; showInstall(); });
        });

        window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installPrompt = e; showInstall(); });
        window.addEventListener('appinstalled', () => { installPrompt = null; showInstall(); });
        // The first visit installs the worker in the background; re-check once it has finished precaching.
        navigator.serviceWorker.addEventListener('controllerchange', check);
        check();
    }

    // Catch the install prompt even if it fires before the page is built.
    window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installPrompt = e; });
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
    else build();
})();
