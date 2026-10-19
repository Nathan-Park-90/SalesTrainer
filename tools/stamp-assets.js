// stamp-assets.js — run before every deploy:  npm run stamp
//
// Cloudflare caches .js/.css at its edge for 4 hours (no Cache-Control from the origin, so its default static TTL
// applies). HTML isn't cached, so a deploy used to serve NEW pages with OLD scripts until the edge expired (Oct 19:
// the PBQ tab loaded with yesterday's course-loader.js and showed nothing). Every local script/stylesheet URL in
// www/*.html now carries ?v=<stamp>; a new stamp per deploy means new URLs the edge has never cached.
// The service worker matches its offline cache with ignoreSearch, so stamped URLs still work offline.
const fs = require('fs'), path = require('path');
const WWW = path.join(__dirname, '..', 'www');
const d = new Date();
const stamp = process.argv[2] || [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes()]
    .map((n, i) => String(n).padStart(i ? 2 : 4, '0')).join('');

// Local (relative) .js / .css references only; external URLs and data: are left alone.
const RE = /(<(?:script|link)\b[^>]*?\b(?:src|href)=")(?!https?:|\/\/|data:)([^"?#]+\.(?:js|css))(?:\?[^"#]*)?(")/g;
let files = 0, refs = 0;
for (const f of fs.readdirSync(WWW).filter(f => f.endsWith('.html'))) {
    const p = path.join(WWW, f);
    const src = fs.readFileSync(p, 'utf8');
    let n = 0;
    const out = src.replace(RE, (m, pre, url, post) => { n++; return `${pre}${url}?v=${stamp}${post}`; });
    if (out !== src) { fs.writeFileSync(p, out); files++; }
    refs += n;
}
console.log(`stamp ${stamp}: ${refs} asset references in ${files} pages`);
