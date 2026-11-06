/* ================== MAMMOTH ACADEMY · JUICE LAYER (juice.js) ==================
   Visual, Web Audio synth, and haptic feedback helpers.
   Plain script, no modules, safe to load twice, offline-only, all storage in try/catch. */
(function () {
    'use strict';

    if (window.Juice && window.Juice.__loaded) return;

    var STORAGE_KEY = 'st_juice';
    var FLAME_SVG = '<svg class="ma-flame" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 1.5c.8 3.6-3.8 6.2-3.8 11a5.8 5.8 0 0 0 11.6 0c0-3.2-1.8-5.3-2.6-7.4-.6 2-1.7 3.2-2.9 3.6.4-2.6-.2-5.2-2.3-7.2z"/></svg>';

    var EFFECT_CLASSES = {
        correct: 'jc-correct',
        combo: 'jc-combo',
        miss: 'jc-miss',
        rematch: 'jc-rematch',
        mastered: 'jc-mastered'
    };

    var VIBRATE_PATTERNS = {
        miss: 40,
        daily: [20, 40, 20],
        burst: 60
    };

    var activeEffects = typeof WeakMap !== 'undefined' ? new WeakMap() : null;
    var memFallback = null;
    var audioCtx = null;
    var masterGain = null;

    function isTruthySetting(val, fallback) {
        if (val === undefined || val === null) return Boolean(fallback);
        if (val === false || val === 0 || val === '0' || val === 'false') return false;
        if (val === true || val === 1 || val === '1' || val === 'true') return true;
        return Boolean(fallback);
    }

    function settings() {
        var defs = (window.Juice && window.Juice._defaults) || { sound: 0, haptics: 1 };
        var raw = null;
        try {
            raw = localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            raw = memFallback;
        }
        if (!raw && memFallback) raw = memFallback;
        if (typeof raw === 'string' && raw.length > 0) {
            try {
                var parsed = JSON.parse(raw);
                if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
                    return {
                        sound: isTruthySetting(parsed.sound, defs.sound),
                        haptics: isTruthySetting(parsed.haptics, defs.haptics)
                    };
                }
            } catch (e) {
                /* Corrupt JSON falls back to defaults without throwing */
            }
        }
        return {
            sound: Boolean(defs.sound),
            haptics: Boolean(defs.haptics)
        };
    }

    function set(key, value) {
        var cur = settings();
        if (key === 'sound' || key === 'haptics') {
            cur[key] = Boolean(value);
        }
        var payload = JSON.stringify({
            sound: cur.sound ? 1 : 0,
            haptics: cur.haptics ? 1 : 0
        });
        memFallback = payload;
        try {
            localStorage.setItem(STORAGE_KEY, payload);
        } catch (e) {
            /* Ignore quota or private-browsing storage errors */
        }
        syncToggleButtons();
        return cur;
    }

    function ensureRelative(el) {
        if (!el || !el.style || typeof getComputedStyle !== 'function') return;
        try {
            if (getComputedStyle(el).position === 'static') {
                el.style.position = 'relative';
            }
        } catch (e) { }
    }

    function isReducedMotion() {
        try {
            if (document.body && document.body.classList.contains('jc-rm')) return true;
            return Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        } catch (e) {
            return false;
        }
    }

    /* ---------- Web Audio Synth (lazy AudioContext, master gain <= 0.08) ---------- */
    function getAudio() {
        var Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return null;
        if (!audioCtx) {
            audioCtx = new Ctx();
            masterGain = audioCtx.createGain();
            masterGain.gain.value = 0.08;
            masterGain.connect(audioCtx.destination);
        }
        if (audioCtx.state === 'suspended' && typeof audioCtx.resume === 'function') {
            try {
                var p = audioCtx.resume();
                if (p && typeof p.catch === 'function') p.catch(function () { });
            } catch (e) { }
        }
        return audioCtx;
    }

    function playNote(ctx, freq, type, offsetSec, durSec, peakGain, endFreq) {
        var now = ctx.currentTime + (offsetSec || 0);
        var dur = Math.max(0.01, durSec || 0.05);
        var peak = Math.min(0.95, Math.max(0.01, peakGain || 0.7));
        var attack = Math.min(0.004, dur * 0.25);

        var osc = ctx.createOscillator();
        var env = ctx.createGain();
        osc.type = type || 'sine';
        osc.frequency.setValueAtTime(freq, now);
        if (endFreq && endFreq > 0) {
            osc.frequency.exponentialRampToValueAtTime(endFreq, now + dur);
        }

        /* Envelope prevents clicks at start and end of every oscillator note */
        env.gain.setValueAtTime(0.0001, now);
        env.gain.linearRampToValueAtTime(peak, now + attack);
        env.gain.exponentialRampToValueAtTime(0.0001, now + dur);

        osc.connect(env);
        env.connect(masterGain || ctx.destination);
        osc.start(now);
        osc.stop(now + dur + 0.005);
    }

    function playSound(event) {
        if (!settings().sound) return;
        try {
            var ctx = getAudio();
            if (!ctx) return;
            switch (event) {
                case 'tap':
                    /* 800 Hz square 15 ms */
                    playNote(ctx, 800, 'square', 0, 0.015, 0.6);
                    break;
                case 'correct':
                    /* Rising major third: 660 -> 831 Hz */
                    playNote(ctx, 660, 'triangle', 0, 0.065, 0.8);
                    playNote(ctx, 830.61, 'triangle', 0.055, 0.085, 0.85);
                    break;
                case 'combo':
                    /* Pentatonic run: 5 notes, 40 ms each */
                    var penta = [523.25, 587.33, 659.25, 783.99, 880.0];
                    for (var i = 0; i < penta.length; i++) {
                        playNote(ctx, penta[i], 'triangle', i * 0.04, 0.04, 0.75);
                    }
                    break;
                case 'miss':
                    /* 110 Hz sawtooth 120 ms, quieter */
                    playNote(ctx, 110, 'sawtooth', 0, 0.12, 0.4, 92);
                    break;
                case 'rematch':
                    /* Two-note sting */
                    playNote(ctx, 587.33, 'triangle', 0, 0.055, 0.8);
                    playNote(ctx, 880.0, 'square', 0.05, 0.095, 0.65);
                    break;
                case 'mastered':
                    /* Short cyan shimmer */
                    playNote(ctx, 783.99, 'sine', 0, 0.05, 0.65, 1046.5);
                    break;
                case 'daily':
                    /* 3-note major chord */
                    playNote(ctx, 523.25, 'triangle', 0, 0.18, 0.35);
                    playNote(ctx, 659.25, 'triangle', 0.015, 0.18, 0.32);
                    playNote(ctx, 783.99, 'triangle', 0.03, 0.2, 0.32);
                    break;
                case 'burst':
                    /* Layered chord */
                    playNote(ctx, 261.63, 'sawtooth', 0, 0.22, 0.22);
                    playNote(ctx, 392.00, 'triangle', 0.01, 0.22, 0.24);
                    playNote(ctx, 523.25, 'triangle', 0.02, 0.22, 0.24);
                    playNote(ctx, 659.25, 'sine', 0.03, 0.24, 0.22);
                    playNote(ctx, 783.99, 'sine', 0.04, 0.25, 0.22);
                    break;
                default:
                    break;
            }
        } catch (e) { }
    }

    function vibrate(event) {
        var pat = VIBRATE_PATTERNS[event];
        if (!pat || !settings().haptics) return;
        try {
            if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
                navigator.vibrate(pat);
            }
        } catch (e) { }
    }

    /* ---------- Visual helpers: class replay, float, burst ---------- */
    function applyEffectClass(el, cls) {
        if (!el || !el.classList || !cls) return;

        var map = activeEffects ? activeEffects.get(el) : null;
        if (map && map[cls]) {
            clearTimeout(map[cls].timer);
            el.removeEventListener('animationend', map[cls].onEnd);
            delete map[cls];
        }

        /* Remove class and force reflow so re-firing the same effect replays its keyframes */
        el.classList.remove(cls);
        void el.offsetWidth;
        el.classList.add(cls);

        var done = false;
        function cleanup() {
            if (done) return;
            done = true;
            clearTimeout(timer);
            el.removeEventListener('animationend', onEnd);
            el.classList.remove(cls);
            if (map && map[cls]) delete map[cls];
        }

        function onEnd(e) {
            if (e && e.target !== el) return;
            cleanup();
        }

        var timer = setTimeout(cleanup, 1500);
        el.addEventListener('animationend', onEnd);

        if (activeEffects) {
            if (!map) {
                map = {};
                activeEffects.set(el, map);
            }
            map[cls] = { timer: timer, onEnd: onEnd };
        }
    }

    function floatLabel(el, text, kind) {
        if (!el || !el.appendChild) return null;
        ensureRelative(el);

        var k = (kind === 'bad' || kind === 'gold') ? kind : 'good';
        var node = document.createElement('span');
        node.className = 'jc-float jc-float-' + k;
        node.setAttribute('aria-hidden', 'true');
        node.textContent = text != null ? String(text) : '';
        el.appendChild(node);

        var removed = false;
        function removeNode() {
            if (removed) return;
            removed = true;
            clearTimeout(fallbackTimer);
            node.removeEventListener('animationend', removeNode);
            if (node.parentNode) node.parentNode.removeChild(node);
        }

        node.addEventListener('animationend', removeNode);
        var fallbackMs = isReducedMotion() ? 60 : 1100;
        var fallbackTimer = setTimeout(removeNode, fallbackMs);
        return node;
    }

    function burst(el) {
        if (!el || !el.appendChild) return;
        ensureRelative(el);

        var old = el.querySelectorAll('.jc-spark');
        for (var j = 0; j < old.length; j++) {
            if (old[j].parentNode) old[j].parentNode.removeChild(old[j]);
        }

        var fallbackMs = isReducedMotion() ? 60 : 1000;
        for (var i = 0; i < 12; i++) {
            (function (idx) {
                var spark = document.createElement('span');
                spark.className = 'jc-spark';
                spark.setAttribute('aria-hidden', 'true');
                spark.style.setProperty('--i', String(idx));
                el.appendChild(spark);

                var gone = false;
                function cleanSpark() {
                    if (gone) return;
                    gone = true;
                    clearTimeout(t);
                    spark.removeEventListener('animationend', cleanSpark);
                    if (spark.parentNode) spark.parentNode.removeChild(spark);
                }
                spark.addEventListener('animationend', cleanSpark);
                var t = setTimeout(cleanSpark, fallbackMs);
            })(i);
        }
    }

    function fire(event, el) {
        var cls = EFFECT_CLASSES[event];
        if (cls && el) {
            applyEffectClass(el, cls);
        }

        if (event === 'correct' && el) {
            floatLabel(el, '+1', 'good');
        } else if (event === 'rematch' && el) {
            floatLabel(el, 'Revenge', 'gold');
        } else if (event === 'daily') {
            if (document.documentElement) {
                document.documentElement.classList.remove('jc-oc-steady');
                document.documentElement.dataset.daily = 'done';
            }
            if (el) burst(el);
        } else if (event === 'burst') {
            if (el) burst(el);
        }

        playSound(event);
        vibrate(event);
    }

    /* ---------- Navbar sound toggle (idempotent) ---------- */
    function renderToggleButton(btn) {
        var on = settings().sound;
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        btn.innerHTML = '<span class="jc-sound-icon" aria-hidden="true">' + (on ? '\uD83D\uDD0A' : '\uD83D\uDD07') + '</span> <span class="jc-sound-label">Sound</span>';
    }

    function syncToggleButtons() {
        var btns = document.querySelectorAll('.jc-sound-toggle');
        for (var i = 0; i < btns.length; i++) {
            renderToggleButton(btns[i]);
        }
    }

    function mountToggle() {
        var nav = document.querySelector('.navbar .nav-links');
        if (!nav) return null;

        var existing = nav.querySelector('.jc-sound-toggle');
        if (existing) {
            renderToggleButton(existing);
            return existing;
        }

        var li = document.createElement('li');
        li.className = 'jc-sound-li';

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'jc-sound-toggle';
        btn.title = 'Toggle sound effects';
        btn.setAttribute('aria-label', 'Sound');
        renderToggleButton(btn);

        btn.addEventListener('click', function () {
            var next = !settings().sound;
            set('sound', next);
        });

        li.appendChild(btn);
        nav.appendChild(li);
        return btn;
    }

    /* ---------- Juice.react(result, el): one call per answer, from a Game.Review.record() result ----------
       right -> rematch | mastered | combo (every 5th right in a row) | correct; wrong -> miss.
       Also fires 'daily' once when Game.Day.justHitGoal flips on (and clears the flag). */
    var runRight = 0;
    function react(res, el) {
        if (!res) return null;
        var ev;
        if (res.right) {
            runRight++;
            ev = res.rematch ? 'rematch' : res.mastered ? 'mastered' : (runRight % 5 === 0 ? 'combo' : 'correct');
        } else {
            runRight = 0;
            ev = 'miss';
        }
        fire(ev, el);
        if (ev === 'mastered' || ev === 'combo') floatLabel(el, ev === 'mastered' ? 'Mastered' : 'x' + runRight, 'gold');
        try {
            if (window.Game && window.Game.Day && window.Game.Day.justHitGoal) {
                window.Game.Day.justHitGoal = false;
                fire('daily', el);
            }
        } catch (e) { }
        return ev;
    }

    var Juice = {
        __loaded: true,
        _defaults: { sound: 0, haptics: 1 },
        fire: fire,
        float: floatLabel,
        burst: burst,
        settings: settings,
        set: set,
        mountToggle: mountToggle,
        flameSvg: FLAME_SVG,
        react: react
    };

    window.Juice = Juice;
    window.juice = fire;

    /* Overclock stays on for the rest of the day once the daily minimum is met (game.js loads first). */
    function boot() {
        mountToggle();
        try {
            if (window.Game && window.Game.Day && window.Game.Day.today().done) {
                document.documentElement.classList.add('jc-oc-steady');
                document.documentElement.dataset.daily = 'done';
            }
        } catch (e) { }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
