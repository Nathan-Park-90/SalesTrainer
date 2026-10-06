/* Mammoth mode: the hidden retro theme shared by every Nathan Park / Mammoth Capital site.
   Source of truth: MammothCapitalSite/site/mammoth/ (copied to each site by tools/sync-mammoth.py; edit it there).

   Unlock (any of):  the Konami code  (up up down down left right left right B A)
                     five quick taps on the logo  (the element matching data-egg, default ".brand, .logo, [data-mammoth-egg]")
                     ?mammoth=on in the address  (?mammoth=off turns it off)
   Once unlocked, a "Mammoth mode" switch appears in any [data-mammoth-setting] slot (a site's settings or theme menu).
   Load:  <script src="/mammoth/mammoth-mode.js" data-site="portfolio" defer></script>
   The page gets html[data-mammoth] and the per-site rules in mammoth-mode.css. Per browser, remembered in localStorage. */
(function () {
  'use strict';
  var me = document.currentScript, site = (me && me.dataset.site) || 'site';
  var EGG = (me && me.dataset.egg) || '.brand, .logo, [data-mammoth-egg]';
  var base = me && me.src ? me.src.replace(/[^/]*(\?.*)?$/, '') : '/mammoth/';
  var KEY_ON = 'mammoth.mode', KEY_SEEN = 'mammoth.unlocked';
  var html = document.documentElement;
  html.setAttribute('data-mm-site', site);

  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function put(k, v) { try { v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) { } }

  var css = document.createElement('link');
  css.rel = 'stylesheet'; css.href = base + 'mammoth-mode.css?v=1';
  (document.head || html).appendChild(css);

  function isOn() { return html.hasAttribute('data-mammoth'); }
  function set(on, quiet) {
    if (on) { html.setAttribute('data-mammoth', ''); put(KEY_ON, '1'); put(KEY_SEEN, '1'); }
    else { html.removeAttribute('data-mammoth'); put(KEY_ON, null); }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) { if (!meta.dataset.mmWas) meta.dataset.mmWas = meta.content; meta.content = on ? '#0F1733' : meta.dataset.mmWas; }
    renderSlots();
    if (!quiet) toast(on ? 'MAMMOTH MODE: ON' : 'Mammoth mode off', on ? 'Tap the logo 5 times to turn it off' : '');
    try { window.dispatchEvent(new CustomEvent('mammothmode', { detail: { on: on } })); } catch (e) { }
  }

  // the saved choice and ?mammoth= apply before first paint (the script tag is in <head>)
  var q = /[?&]mammoth=(on|off|1|0)\b/.exec(location.search);
  if (q) set(q[1] === 'on' || q[1] === '1', true);
  else if (get(KEY_ON) === '1') html.setAttribute('data-mammoth', '');

  function toast(title, sub) {
    var t = document.getElementById('mm-toast');
    if (!t) { t = document.createElement('div'); t.id = 'mm-toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.innerHTML = '';
    var b = document.createElement('b'); b.textContent = title; t.appendChild(b);
    if (sub) { var s = document.createElement('span'); s.textContent = sub; t.appendChild(s); }
    t.className = 'show';
    clearTimeout(t._h); t._h = setTimeout(function () { t.className = ''; }, 3200);
  }

  // settings slots: hidden until this browser has unlocked Mammoth mode once
  function renderSlots() {
    var slots = document.querySelectorAll('[data-mammoth-setting]');
    for (var i = 0; i < slots.length; i++) {
      var slot = slots[i];
      if (get(KEY_SEEN) !== '1') { slot.hidden = true; continue; }
      slot.hidden = false;
      var btn = slot.querySelector('.mm-switch');
      if (!btn) {
        btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'mm-switch ' + (slot.dataset.class || '');
        btn.title = 'Mammoth mode';
        btn.addEventListener('click', function () { set(!isOn()); });
        slot.appendChild(btn);
      }
      btn.setAttribute('aria-pressed', isOn() ? 'true' : 'false');
      btn.classList.toggle(slot.dataset.activeClass || 'active', isOn());
      var tpl = slot.querySelector('template');               // a site can supply the button's inside (e.g. a theme dot)
      if (tpl) { if (!btn.firstChild) btn.innerHTML = tpl.innerHTML; }
      else btn.textContent = (slot.dataset.label || 'Mammoth mode') + (slot.dataset.label ? '' : isOn() ? ': on' : ': off');
    }
  }

  // Konami code
  var seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'], pos = 0;
  document.addEventListener('keydown', function (e) {
    var k = e.key && e.key.length === 1 ? e.key.toLowerCase() : e.key;
    pos = k === seq[pos] ? pos + 1 : (k === seq[0] ? 1 : 0);
    if (pos === seq.length) { pos = 0; set(!isOn()); }
  });

  // five quick taps on the logo. A logo that links to the page you're on doesn't reload it (the taps would be lost);
  // one that links elsewhere still works as a link.
  var taps = [];
  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest(EGG) : null;
    if (!el) { taps = []; return; }
    var a = e.target.closest('a[href]');
    var here = function (path) { return path.replace(/index\.html$/, ''); };
    if (a && here(a.pathname) === here(location.pathname) && !a.hash) e.preventDefault();
    var now = Date.now();
    taps = taps.filter(function (t) { return now - t < 2000; }); taps.push(now);
    if (taps.length >= 5) { taps = []; set(!isOn()); }
  }, true);

  // print in the site's normal look (recipes, claim packets and checklists are printed)
  var wasOn = false;
  window.addEventListener('beforeprint', function () { wasOn = isOn(); if (wasOn) html.removeAttribute('data-mammoth'); });
  window.addEventListener('afterprint', function () { if (wasOn) html.setAttribute('data-mammoth', ''); });

  window.MammothMode = { set: set, on: isOn, unlocked: function () { return get(KEY_SEEN) === '1'; } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderSlots); else renderSlots();
})();
