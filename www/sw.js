/**
 * Mammoth Academy — service worker
 * The whole site is static (no backend, no API calls — all progress lives in
 * localStorage), which makes it a clean fit for full offline caching: once a
 * visitor has loaded a page, they can keep studying with no connection at all.
 *
 * Strategy: network-first, falling back to cache. Online visitors always get
 * the latest content (this app is under active development); offline visitors
 * get whatever was last cached. Bump CACHE_NAME on any app-shell file list
 * change so old caches get cleaned up on the next visit.
 */
const CACHE_NAME = 'mammoth-academy-v13';  // v13: Oct 19, 2026 (network timeout so a stalled connection falls back to the cache)
const NETWORK_TIMEOUT_MS = 3500;          // plane Wi-Fi / one bar of signal: stop waiting and serve the saved copy
let networkDeadUntil = 0;                 // after a timeout/failure, answer from the cache at once for a while
const AUDIO_CACHE = 'mammoth-audio';      // NotebookLM episodes saved offline by lecture.js; survives version bumps

const APP_SHELL = [
  'index.html',
  'library.html',
  'gym.html',
  'arena.html',
  'daily.html',
  'sprint.html',
  'path.html',
  'style.css',
  'app.js',
  'course-loader.js',
  'achievements.js',
  'scrum.js',
  'pwa.js',
  'sync.js',
  'pbq.js',
  'cram.js',
  'diagrams.js',
  'lecture.js',
  'mammoth/mammoth-mode.js?v=1',
  'mammoth/mammoth-mode.css?v=1',
  'courses/aws-saa-c03.js',
  'courses/sales-engineering.js',
  'courses/psm-scrum.js',
  'courses/comptia-securityplus.js',
  'courses/comptia-networkplus.js',
  'courses/comptia-aplus.js',
  'courses/comptia-cloudplus.js',
  'fonts/mammoth-fonts.css',
  'fonts/outfit-400.woff2',
  'fonts/outfit-600.woff2',
  'fonts/outfit-700.woff2',
  'fonts/outfit-800.woff2',
  'fonts/jetbrains-mono-400.woff2',
  'fonts/jetbrains-mono-600.woff2',
  'fonts/jetbrains-mono-700.woff2',
  'audio/manifest.json',
  'assets/mammoth-logo.png',
  'assets/icon-192.png',
  'assets/icon-512.png',
  'assets/icon-maskable-512.png',
  'assets/apple-touch-icon.png',
  'manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME && k !== AUDIO_CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// "Save for offline" button (pwa.js): 'status' reports how much of the app is on this device, 'download' fetches
// every app file fresh and stores it. Replies go back on the MessageChannel port the page sent.
self.addEventListener('message', (event) => {
  const type = event.data && event.data.type;
  const port = event.ports && event.ports[0];
  if (!port || (type !== 'status' && type !== 'download')) return;
  const status = () => caches.open(CACHE_NAME)
    .then((cache) => Promise.all(APP_SHELL.map((u) => cache.match(u, { ignoreSearch: true }))))
    .then((hits) => ({ cached: hits.filter(Boolean).length, total: APP_SHELL.length, version: CACHE_NAME }));
  const work = type === 'download'
    ? caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL.map((u) => new Request(u, { cache: 'reload' })))).then(status)
    : status();
  event.waitUntil(work
    .then((s) => port.postMessage(Object.assign({ ok: true }, s)))
    .catch((err) => status().then((s) => port.postMessage(Object.assign({ ok: false, error: String(err) }, s)))));
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  // Only handle same-origin requests — let cross-origin (fonts.googleapis.com,
  // the Mammoth Capital site link, etc.) pass through untouched.
  if (new URL(event.request.url).origin !== self.location.origin) return;

  // Audio episodes: serve a copy the listener saved offline, otherwise stream from the network untouched
  // (media requests are byte ranges, which can't be stored, and a 50 MB episode shouldn't be cached by accident).
  if (new URL(event.request.url).pathname.includes('/audio/') && !event.request.url.endsWith('manifest.json')) {
    event.respondWith(caches.open(AUDIO_CACHE).then((c) => c.match(event.request.url, { ignoreSearch: true })).then((hit) => hit || fetch(event.request)));
    return;
  }

  event.respondWith(networkFirst(event));
});

// Network-first with a timeout. Online visitors get the latest files; when the network is down OR just stalls
// (in-flight Wi-Fi, a dead zone), the cached copy is served after NETWORK_TIMEOUT_MS instead of a blank wait.
// Only clean same-origin 200s are cached, so an error page or a portal redirect never overwrites a good copy.
function networkFirst(event) {
  const req = event.request;
  const fromCache = () =>
    // ignoreSearch: pages reference assets as file.js?v=<deploy stamp> (tools/stamp-assets.js), while the
    // precache stores plain file.js; either copy is fine offline.
    caches.match(req, { ignoreSearch: true }).then((hit) =>
      hit || (req.mode === 'navigate' ? caches.match('index.html') : undefined));

  const network = fetch(req);
  // Registered first (and synchronously), so the clone happens before the page reads the body, and the worker
  // stays alive to finish the cache write even when the timeout already answered from the cache.
  event.waitUntil(network.then((response) => {
    if (!(response.ok && response.type === 'basic' && !response.redirected)) return;
    const copy = response.clone();
    return caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
  }).catch(() => {}));

  return new Promise((resolve) => {
    let done = false;
    const finish = (r) => { if (!done && r) { done = true; resolve(r); } };
    // One page load pulls ~30 files; once the network has stalled, don't make each of them wait out the timeout.
    const wait = Date.now() < networkDeadUntil ? 0 : NETWORK_TIMEOUT_MS;
    const timer = setTimeout(() => {
      networkDeadUntil = Date.now() + 30000;
      fromCache().then(finish);
    }, wait);
    network
      .then((response) => {
        clearTimeout(timer);
        networkDeadUntil = 0;
        if (response.ok) return finish(response);
        // Server error/404: prefer a cached copy, otherwise pass the real response through.
        return fromCache().then((hit) => finish(hit || response));
      })
      .catch(() => {
        clearTimeout(timer);
        networkDeadUntil = Date.now() + 30000;
        return fromCache().then((hit) => finish(hit || Response.error()));
      });
  });
}
