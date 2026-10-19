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
const CACHE_NAME = 'mammoth-academy-v12';  // v12: Oct 19, 2026 (Daily tab fits phones again)
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
  'assets/mammoth-logo.png',
  'assets/icon-192.png',
  'assets/icon-512.png',
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

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() =>
        // ignoreSearch: pages reference assets as file.js?v=<deploy stamp> (tools/stamp-assets.js), while the
        // precache stores plain file.js; either copy is fine offline.
        caches.match(event.request, { ignoreSearch: true }).then((cached) => cached || caches.match('index.html'))
      )
  );
});
