/**
 * Mammoth Academy — Audio Lecture bar (lecture.js; used by the Library lesson renderer)
 *
 * Two ways to listen to a lesson hands-free:
 *  • Read-aloud (always available): the device's own speech synthesis reads the ACTUAL lesson text, section by
 *    section, so every port, limit and step order is exact. On-device voices work offline.
 *  • Episode (when one exists): a NotebookLM Audio Overview for the module, listed in audio/manifest.json as
 *    { "<courseId>": { "<module localIdx>": { "file": "aws/03-vpc.m4a", "title": "…" } } }. Great for intuition;
 *    the hosts paraphrase, so exact facts should come from the lesson. "Save offline" stores the file in the
 *    'mammoth-audio' cache, which the service worker serves without a connection.
 *
 * Speech is spoken in sentence-sized chunks: Chrome stops long single utterances after ~15 s, and short chunks let a
 * speed change take effect immediately. Pause = cancel + resume at the current chunk (speechSynthesis.pause() is
 * unreliable on Android).
 */
const Lecture = (function () {
    'use strict';

    const RATES = [1, 1.25, 1.5, 2];
    const PREF_RATE = 'ma_lecture_rate', PREF_AUTO = 'ma_lecture_auto', PREF_MODE = 'ma_lecture_mode';   // device prefs, not progress
    const AUDIO_CACHE = 'mammoth-audio';
    const pref = (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } };
    const setPref = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { } };
    const synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;

    const st = {
        chunks: [],          // [{ text, el, section }]
        sections: [],        // [{ el, label }]
        idx: 0,
        playing: false,
        rateIdx: Math.max(0, RATES.indexOf(parseFloat(pref(PREF_RATE, '1')))),
        auto: pref(PREF_AUTO, '1') === '1',
        mode: pref(PREF_MODE, 'read'),
        next: null,          // [modIdx, topicIdx] of the following topic, for auto-continue
        continuing: false,   // set while auto-advancing so the next topic starts playing by itself
        voice: null,
        episode: null,       // { file, title, url } for this module, if the manifest lists one
        audio: null,
        token: 0             // invalidates callbacks from a previous topic's utterances
    };
    let manifest = null, manifestLoaded = false;

    // ── voices: the learner's saved choice, else the best American male voice the device has ──
    // Oct 19, 2026 (Nathan): "I prefer a male speaker that is direct and articulate", not British. Voice names differ per
    // platform: Edge's online "Natural" voices (Andrew, Brian, Guy...), Windows (David, Mark), Apple (Aaron, Evan, Tom...),
    // Android's Google voices (en-us-x-iol/iom/tpd are male). Android Chrome often lists one voice per language: the male
    // one is then chosen in Android's text-to-speech settings.
    const PREF_VOICE = 'ma_lecture_voice';
    const MALE = /\b(andrew|brian|christopher|eric|guy|roger|steffan|davis|jason|tony|david|mark|aaron|alex|evan|tom|fred|nathan|ryan|joe|male)\b|x-(iol|iom|tpd)/i;
    const englishVoices = () => (synth ? synth.getVoices() : []).filter(v => /^en(-|_|$)/i.test(v.lang));
    function voiceScore(v) {
        const lang = v.lang.replace('_', '-');
        return (/^en-US$/i.test(lang) ? 100 : /^en-(GB|UK)$/i.test(lang) ? 0 : 40)
            + (MALE.test(v.name + ' ' + v.voiceURI) ? 50 : 0)
            + (/natural|neural|premium|enhanced/i.test(v.name) ? 20 : 0)
            + (v.localService ? 5 : 0);
    }
    function pickVoice() {
        if (!synth) return null;
        const en = englishVoices();
        const saved = pref(PREF_VOICE, '');
        return (saved && en.find(v => v.voiceURI === saved)) || en.slice().sort((a, b) => voiceScore(b) - voiceScore(a))[0]
            || synth.getVoices()[0] || null;
    }
    if (synth) {
        st.voice = pickVoice();
        synth.addEventListener && synth.addEventListener('voiceschanged', () => { st.voice = pickVoice(); if (bar) fillVoices(); });
    }
    function fillVoices() {
        const sel = bar && bar.querySelector('.lec-voice');
        if (!sel) return;
        const en = englishVoices().sort((a, b) => voiceScore(b) - voiceScore(a));
        sel.innerHTML = en.map(v => `<option value="${escapeHtml(v.voiceURI)}"${st.voice && v.voiceURI === st.voice.voiceURI ? ' selected' : ''}>`
            + `${escapeHtml(v.name.replace(/^Microsoft /, '').replace(/ - English.*$/, ''))} (${escapeHtml(v.lang)})</option>`).join('');
        sel.hidden = en.length < 2;
    }

    // ── episode manifest (optional file) ──
    function audioBase() {
        // Inside the Android app the page is served from the app bundle, which doesn't ship the (large) audio;
        // stream it from the site instead.
        return /^https?:$/.test(location.protocol) && !/^localhost$/.test(location.hostname) ? 'audio/' : 'https://academy.mammothcapital.site/audio/';
    }
    function loadManifest() {
        if (manifestLoaded) return Promise.resolve(manifest);
        manifestLoaded = true;
        return fetch(audioBase() + 'manifest.json', { cache: 'no-cache' })
            .then(r => (r.ok ? r.json() : {}))
            .catch(() => ({}))
            .then(m => (manifest = m || {}));
    }

    // ── build the chunk list from the rendered lesson ──
    function collect(wrapper) {
        st.chunks = []; st.sections = [];
        const blocks = [wrapper.querySelector('.lesson-title')]
            .concat([...wrapper.querySelectorAll('.lesson-prose p, .lesson-prose h2, .lesson-prose h3, .lesson-prose h4, .lesson-prose li, .lesson-prose .lesson-alert, .lesson-prose .lesson-h3')])
            .filter(Boolean)
            // skip blocks nested in another collected block (e.g. a <p> inside a callout) so nothing is read twice
            .filter((el, i, all) => !all.some(o => o !== el && o.contains(el)));
        blocks.forEach(el => {
            const t = (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim();
            if (!t) return;
            const section = st.sections.length;
            st.sections.push({ el, label: t.length > 60 ? t.slice(0, 57) + '…' : t });
            // sentence-sized pieces, merged up to ~220 characters
            const parts = t.match(/[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g) || [t];
            let buf = '';
            parts.forEach(p => {
                if ((buf + p).length > 220 && buf) { st.chunks.push({ text: buf.trim(), el, section }); buf = ''; }
                buf += p;
            });
            if (buf.trim()) st.chunks.push({ text: buf.trim(), el, section });
        });
    }

    // ── UI ──
    let bar = null;
    function barHtml() {
        const ep = st.episode;
        return `
            <div class="lecture-bar" role="region" aria-label="Audio lecture">
                <button type="button" class="lec-btn lec-play" data-act="toggle" aria-label="Play lecture">&#9654;</button>
                <button type="button" class="lec-btn" data-act="prev" aria-label="Previous section">&#9198;</button>
                <button type="button" class="lec-btn" data-act="next" aria-label="Next section">&#9197;</button>
                <div class="lec-info">
                    <div class="lec-mode">${ep && st.mode === 'episode' ? '🎙️ Episode · ' + escapeHtml(ep.title || 'NotebookLM Audio Overview') : '📖 Read-aloud · the exact lesson text'}</div>
                    <div class="lec-section" aria-live="polite"></div>
                    <div class="lec-progress"><span></span></div>
                </div>
                <button type="button" class="lec-btn lec-rate" data-act="rate" aria-label="Playback speed">${RATES[st.rateIdx]}&times;</button>
                ${synth && st.mode !== 'episode' ? '<select class="lec-voice" aria-label="Voice" title="Voice" hidden></select>' : ''}
                <label class="lec-auto" title="Continue into the next topic automatically"><input type="checkbox" data-act="auto" ${st.auto ? 'checked' : ''}> Auto-next</label>
                ${ep ? `<div class="lec-modes" role="group" aria-label="Listening mode">
                    <button type="button" class="lec-chip${st.mode === 'episode' ? ' on' : ''}" data-act="mode-episode">🎙️ Episode</button>
                    <button type="button" class="lec-chip${st.mode !== 'episode' ? ' on' : ''}" data-act="mode-read">📖 Read</button>
                    ${st.mode === 'episode' ? '<button type="button" class="lec-chip" data-act="save">⤓ Save offline</button>' : ''}
                </div>` : ''}
                ${!synth && !(ep && st.mode === 'episode') ? '<div class="lec-warn">Read-aloud isn\'t available in this browser.</div>' : ''}
            </div>`;
    }
    function escapeHtml(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

    function updateUi() {
        if (!bar) return;
        const play = bar.querySelector('.lec-play');
        play.innerHTML = st.playing ? '&#10074;&#10074;' : '&#9654;';
        play.setAttribute('aria-label', st.playing ? 'Pause lecture' : 'Play lecture');
        bar.classList.toggle('playing', st.playing);
        const fill = bar.querySelector('.lec-progress span');
        const label = bar.querySelector('.lec-section');
        if (st.mode === 'episode' && st.audio) {
            const a = st.audio, d = isFinite(a.duration) ? a.duration : 0;
            const fmt = s => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
            label.textContent = d ? `${fmt(a.currentTime)} / ${fmt(d)}` : 'Loading episode…';
            fill.style.width = d ? (a.currentTime / d * 100) + '%' : '0%';
            return;
        }
        const c = st.chunks[st.idx];
        const sec = c ? c.section : 0;
        label.textContent = st.sections.length ? `Section ${sec + 1} / ${st.sections.length} · ${st.sections[sec].label}` : 'Nothing to read on this page.';
        fill.style.width = st.chunks.length ? (st.idx / st.chunks.length * 100) + '%' : '0%';
        document.querySelectorAll('.lecture-on').forEach(e => e.classList.remove('lecture-on'));
        if (st.playing && c) c.el.classList.add('lecture-on');
    }

    // ── read-aloud engine ──
    function speak() {
        if (!synth) return;
        const c = st.chunks[st.idx];
        if (!c) return finished();
        const my = st.token;
        const u = new SpeechSynthesisUtterance(c.text);
        u.rate = RATES[st.rateIdx];
        if (st.voice) { u.voice = st.voice; u.lang = st.voice.lang; } else u.lang = 'en-US';
        u.onend = () => { if (my !== st.token || !st.playing) return; st.idx++; updateUi(); speak(); };
        u.onerror = e => {
            if (my !== st.token || !st.playing) return;
            if (e.error === 'interrupted' || e.error === 'canceled') return;
            st.playing = false; updateUi();
            const label = bar && bar.querySelector('.lec-section');
            if (label) label.textContent = 'This device has no usable voice for read-aloud (' + e.error + ').';
        };
        updateUi();
        const rect = c.el.getBoundingClientRect();
        if (rect.top < 80 || rect.bottom > window.innerHeight) c.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        synth.speak(u);
    }
    function stopSpeech() { st.token++; if (synth) synth.cancel(); }
    function finished() {
        st.playing = false;
        updateUi();
        if (st.auto && st.next && typeof app !== 'undefined') {
            st.continuing = true;
            app.renderLessonContent(st.next[0], st.next[1]);
        }
    }

    // ── episode engine ──
    function ensureAudio() {
        if (st.audio) return st.audio;
        const a = new Audio(st.episode.url);
        a.preload = 'metadata';
        a.playbackRate = RATES[st.rateIdx];
        a.addEventListener('timeupdate', updateUi);
        a.addEventListener('loadedmetadata', updateUi);
        a.addEventListener('ended', () => { st.playing = false; updateUi(); });
        a.addEventListener('error', () => { st.playing = false; updateUi(); const l = bar && bar.querySelector('.lec-section'); if (l) l.textContent = 'Couldn\'t load the episode (offline and not saved?).'; });
        st.audio = a;
        return a;
    }

    const actions = {
        toggle() {
            if (st.mode === 'episode' && st.episode) {
                const a = ensureAudio();
                if (st.playing) { a.pause(); st.playing = false; } else { a.play().catch(() => { }); st.playing = true; }
                return updateUi();
            }
            if (!synth) return;
            if (st.playing) { st.playing = false; stopSpeech(); updateUi(); }
            else { if (st.idx >= st.chunks.length) st.idx = 0; st.playing = true; stopSpeech(); speak(); }
        },
        jump(dir) {
            if (st.mode === 'episode' && st.audio) { st.audio.currentTime = Math.max(0, st.audio.currentTime + dir * 15); return updateUi(); }
            const cur = st.chunks[st.idx] ? st.chunks[st.idx].section : 0;
            const target = Math.min(Math.max(cur + dir, 0), st.sections.length - 1);
            st.idx = Math.max(0, st.chunks.findIndex(c => c.section === target));
            if (st.playing) { stopSpeech(); speak(); } else updateUi();
        },
        prev() { actions.jump(-1); },
        next() { actions.jump(1); },
        rate() {
            st.rateIdx = (st.rateIdx + 1) % RATES.length;
            setPref(PREF_RATE, String(RATES[st.rateIdx]));
            bar.querySelector('.lec-rate').innerHTML = RATES[st.rateIdx] + '&times;';
            if (st.audio) st.audio.playbackRate = RATES[st.rateIdx];
            if (st.playing && st.mode !== 'episode') { stopSpeech(); speak(); }   // restart the chunk at the new speed
        },
        auto(el) { st.auto = el.checked; setPref(PREF_AUTO, st.auto ? '1' : '0'); },
        'mode-episode'() { switchMode('episode'); },
        'mode-read'() { switchMode('read'); },
        save(btn) {
            if (!('caches' in window) || !st.episode) return;
            btn.disabled = true; btn.textContent = 'Saving…';
            caches.open(AUDIO_CACHE)
                .then(c => fetch(st.episode.url).then(r => { if (!r.ok) throw new Error(r.status); return c.put(st.episode.url, r); }))
                .then(() => { btn.textContent = '✓ Saved offline'; })
                .catch(() => { btn.textContent = 'Save failed'; btn.disabled = false; });
        }
    };

    function switchMode(m) {
        stop();
        st.mode = m;
        setPref(PREF_MODE, m);
        mountBar();
    }

    function stop() {
        st.playing = false;
        stopSpeech();
        if (st.audio) { st.audio.pause(); }
        document.querySelectorAll('.lecture-on').forEach(e => e.classList.remove('lecture-on'));
    }

    function mountBar() {
        const wrapper = document.querySelector('#lesson-canvas .lesson-content-wrapper');
        if (!wrapper) return;
        if (bar) bar.remove();
        const holder = document.createElement('div');
        holder.innerHTML = barHtml();
        bar = holder.firstElementChild;
        wrapper.insertBefore(bar, wrapper.firstChild);
        bar.addEventListener('click', e => {
            const b = e.target.closest('[data-act]');
            if (!b || b.tagName === 'INPUT') return;
            actions[b.dataset.act](b);
        });
        bar.querySelector('[data-act="auto"]').addEventListener('change', e => actions.auto(e.target));
        const vsel = bar.querySelector('.lec-voice');
        if (vsel) {
            fillVoices();
            vsel.addEventListener('change', () => {
                const v = englishVoices().find(x => x.voiceURI === vsel.value);
                if (!v) return;
                st.voice = v; setPref(PREF_VOICE, v.voiceURI);
                if (st.playing) { stopSpeech(); speak(); }      // hear the new voice straight away
            });
        }
        updateUi();
    }

    // Called by app.renderLessonContent() after each topic renders.
    function attach(mod, topicIdx, next) {
        const resume = st.continuing;
        st.continuing = false;
        stop();
        if (st.audio) { st.audio.src = ''; st.audio = null; }
        st.next = next;
        st.idx = 0;
        const wrapper = document.querySelector('#lesson-canvas .lesson-content-wrapper');
        if (!wrapper) return;
        collect(wrapper);
        st.episode = null;
        mountBar();
        loadManifest().then(m => {
            const e = m && m[mod.courseId] && m[mod.courseId][String(mod.localIdx)];
            if (e && e.file) {
                st.episode = { file: e.file, title: e.title, url: audioBase() + e.file };
                if (!resume) mountBar();
            }
            if (resume) { if (st.mode === 'episode' && !st.episode) st.mode = 'read'; mountBar(); actions.toggle(); }
        });
    }

    window.addEventListener('pagehide', stop);
    return { attach, stop, state: st, RATES };
})();
