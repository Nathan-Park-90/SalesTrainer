/**
 * Mammoth Academy — Fail-First Intel Drawer & Rematch helper (intel.js, Blueprint F3 + F4)
 * Loaded after juice.js on arena.html, library.html, daily.html, index.html.
 */
(function (root) {
    'use strict';

    if (root.Intel && root.Intel.__loaded) return;

    const STYLE_CSS = `
dialog.ma-sheet { position: fixed; max-height: 85vh; overflow-y: auto; overflow-x: hidden; overflow-wrap: anywhere; word-break: break-word; background: var(--bg-card, #0d1324); }
html[data-mammoth] dialog.ma-sheet { background: var(--mm-bg2, #1D2B53); }
.ma-sheet-head {
    font-family: var(--font-mono, monospace);
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: var(--accent-danger, #ef4444);
    margin-bottom: 8px;
}
.ma-sheet-trap, .ma-sheet-rule {
    font-size: 0.92rem;
    line-height: 1.55;
    overflow-wrap: anywhere;
}
.ma-sheet-answer {
    margin: 4px 0;
    color: var(--accent-success, #10b981);
    font-weight: 700;
}
.ma-sheet-exp {
    color: var(--text-main, #f8fafc);
}
.ma-sheet-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-heading, system-ui, sans-serif);
    font-size: 0.84rem;
    font-weight: 700;
    color: var(--text-main, #f8fafc);
    background: var(--bg-card-hover, #131b31);
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 10px;
    padding: 8px 13px;
    cursor: pointer;
    text-decoration: none;
    line-height: 1.25;
    transition: border-color 0.2s ease, background 0.2s ease;
}
@media (hover: hover) {
    .ma-sheet-btn:hover {
        border-color: var(--accent-primary, #00f2ff);
    }
}
.ma-sheet-btn.primary {
    background: color-mix(in oklch, var(--accent-primary, #00f2ff) 18%, var(--bg-card-hover, #131b31));
    border-color: color-mix(in oklch, var(--accent-primary, #00f2ff) 50%, #1e2a47);
    color: var(--text-main, #f8fafc);
}
.ma-sheet-btn.ma-sheet-gotit {
    margin-left: auto;
}
.aut-links {
    margin-top: 10px;
}
.rematch-tag {
    display: inline-block;
    font-family: var(--font-mono, monospace);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--accent-warning, #f59e0b);
    background: rgba(245, 158, 11, 0.14);
    border: 1px solid rgba(245, 158, 11, 0.45);
    padding: 3px 10px;
    border-radius: 999px;
    margin-bottom: 10px;
}
.rematch-tag[hidden] { display: none; }
html[data-mammoth] .ma-sheet-btn {
    font-family: var(--mm-pixel, monospace);
    background: var(--mm-navy, #1D2B53);
    color: var(--mm-ink, #FFF1E8);
    border: 2px solid #000;
    border-radius: 0;
    box-shadow: 2px 2px 0 #000;
}
html[data-mammoth] .ma-sheet-btn.primary {
    background: var(--mm-orange, #FFA300);
    color: #000;
}
html[data-mammoth] .ma-sheet-answer {
    color: var(--mm-green, #00E436);
}
`;

    let dialog = null;
    let currentOnClose = null;
    let styleInjected = false;

    const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

    function injectStyles() {
        if (styleInjected || typeof document === 'undefined' || !document.head) return;
        styleInjected = true;
        const style = document.createElement('style');
        style.id = 'ma-intel-styles';
        style.textContent = STYLE_CSS;
        document.head.appendChild(style);
    }

    function correctIndices(q) {
        if (!q) return [0];
        if (Array.isArray(q.ans)) return q.ans;
        if (Array.isArray(q.correct)) return q.correct;
        if (typeof q.ans === 'number') return [q.ans];
        if (typeof q.correct === 'number') return [q.correct];
        return [q.correct_index || 0];
    }

    function optText(o) {
        if (root.app && typeof root.app.examOptText === 'function') return root.app.examOptText(o);
        return (o && o.text) || o || '';
    }

    function whyFor(q, i) {
        if (!q || i == null) return '';
        if (root.app && typeof root.app.examWhy === 'function') {
            return root.app.examWhy(q, i) || '';
        }
        return (q.whyWrong && q.whyWrong[i]) || (q.opts && q.opts[i] && q.opts[i].fb) || '';
    }

    function resolveCourseId(q, courseId) {
        if (courseId) return courseId;
        if (root.Game && q) {
            const id = Game.qid(q);
            if (id) return Game.courseOf(id);
            if (Game.Track) return Game.Track.get();
        }
        return null;
    }

    // Resolve "Read the lesson" and "Cram sheet" targets for a question.
    // 1. q.ref: { module, topic, cram?: { sheet, q } }
    // 2. Fallback: DATA._courseMeta[i].domains[q.domain] -> module title (no topic, no cram)
    // 3. Neither resolves -> hide lesson link
    function resolveLinks(q, courseId) {
        if (!q) return { lessonHref: null, cram: null, cramHref: null };
        const cid = resolveCourseId(q, courseId);
        const courses = (root.DATA && Array.isArray(root.DATA.course)) ? root.DATA.course : [];
        const metas = (root.DATA && Array.isArray(root.DATA._courseMeta)) ? root.DATA._courseMeta : [];

        let lessonHref = null;
        if (q.ref && typeof q.ref.module === 'string' && q.ref.module) {
            const mod = courses.find(m => m.title === q.ref.module && (!cid || m.courseId === cid))
                || courses.find(m => m.title === q.ref.module);
            if (mod || !courses.length) {
                const targetCourse = (mod && mod.courseId) || cid || 'aws-saa-c03';
                const hasTopic = typeof q.ref.topic === 'string' && q.ref.topic && (
                    !mod || !Array.isArray(mod.topics) || mod.topics.some(t => t.title === q.ref.topic)
                );
                lessonHref = 'library.html?course=' + encodeURIComponent(targetCourse)
                    + '&title=' + encodeURIComponent(q.ref.module)
                    + (hasTopic ? '&topic=' + encodeURIComponent(q.ref.topic) : '');
            }
        } else if (q.domain) {
            const meta = (cid && metas.find(m => m.id === cid))
                || metas.find(m => m.domains && m.domains[q.domain]);
            const modTitle = meta && meta.domains && meta.domains[q.domain];
            if (modTitle) {
                const modExists = !courses.length || courses.some(m => m.courseId === meta.id && m.title === modTitle);
                if (modExists) {
                    lessonHref = 'library.html?course=' + encodeURIComponent(meta.id)
                        + '&title=' + encodeURIComponent(modTitle);
                }
            }
        }

        let cram = null;
        let cramHref = null;
        if (q.ref && q.ref.cram && typeof q.ref.cram.sheet === 'string' && q.ref.cram.sheet) {
            cram = { sheet: q.ref.cram.sheet, q: q.ref.cram.q != null ? String(q.ref.cram.q) : '' };
            cramHref = 'library.html#cram=' + encodeURIComponent(cram.sheet)
                + (cram.q ? '&q=' + encodeURIComponent(cram.q) : '');
        }

        return { lessonHref, cram, cramHref };
    }

    function linksHtml(q, courseId, includeGotIt) {
        injectStyles();
        const { lessonHref, cram, cramHref } = resolveLinks(q, courseId);
        if (!lessonHref && !cram && !includeGotIt) return '';
        const parts = [];
        if (lessonHref) {
            parts.push(`<a class="ma-sheet-btn primary ma-sheet-lesson" href="${lessonHref}">\uD83D\uDCD6 Read the lesson</a>`);
        }
        if (cram) {
            parts.push(`<a class="ma-sheet-btn ma-sheet-cram" href="${cramHref}" data-cram-sheet="${esc(cram.sheet)}" data-cram-q="${esc(cram.q)}">\u26A1 Cram sheet</a>`);
        }
        if (includeGotIt) {
            parts.push(`<button type="button" class="ma-sheet-btn ma-sheet-gotit">Got it</button>`);
        }
        return `<div class="ma-sheet-links${includeGotIt ? '' : ' aut-links'}">${parts.join('')}</div>`;
    }

    function getCramApi() {
        if (root.Cram && typeof root.Cram.open === 'function') return root.Cram;
        try {
            if (typeof Cram !== 'undefined' && Cram && typeof Cram.open === 'function') return Cram;
        } catch (e) {}
        return null;
    }

    function fireOnClose() {
        const fn = currentOnClose;
        currentOnClose = null;
        if (typeof fn === 'function') {
            try { fn(); } catch (e) {}
        }
    }

    function ensureDialog() {
        injectStyles();
        if (dialog && dialog.isConnected) return dialog;
        dialog = document.createElement('dialog');
        dialog.className = 'ma-sheet';
        dialog.id = 'ma-intel-sheet';
        dialog.setAttribute('aria-label', 'Question breakdown');
        document.body.appendChild(dialog);

        dialog.addEventListener('close', fireOnClose);

        dialog.addEventListener('click', e => {
            if (e.target === dialog) {
                close();
                return;
            }
            const gotIt = e.target.closest('.ma-sheet-gotit');
            if (gotIt) {
                e.preventDefault();
                close();
                return;
            }
            const cramLink = e.target.closest('.ma-sheet-cram');
            if (cramLink) {
                const cramApi = getCramApi();
                if (cramApi) {
                    e.preventDefault();
                    const sheetId = cramLink.getAttribute('data-cram-sheet');
                    const query = cramLink.getAttribute('data-cram-q') || '';
                    close();
                    cramApi.open(sheetId, query);
                }
            }
        });

        return dialog;
    }

    function open(opts) {
        if (!opts || !opts.q || typeof document === 'undefined' || !document.body) return null;
        // Never open in Arena exam mode (only practice mode), never on results page
        if (root.app && root.app.exam && (!root.app.exam.practice || root.app.exam.done)) return null;

        const q = opts.q;
        const chosen = opts.chosen;
        const courseId = opts.courseId;
        const dlg = ensureDialog();

        // If already open from a previous action, clear previous onClose before updating
        currentOnClose = null;
        if (dlg.open) {
            try { dlg.close(); } catch (e) { dlg.removeAttribute('open'); }
        }
        currentOnClose = typeof opts.onClose === 'function' ? opts.onClose : null;

        const correct = correctIndices(q);
        const picks = Array.isArray(chosen) ? chosen : (typeof chosen === 'number' ? [chosen] : []);
        const wrongPicks = picks.filter(i => typeof i === 'number' && !correct.includes(i));
        const traps = wrongPicks.map(i => whyFor(q, i)).filter(Boolean);

        const rightTexts = correct
            .map(i => (q.opts && q.opts[i] != null) ? optText(q.opts[i]) : '')
            .filter(Boolean);
        const exp = q.exp || q.explanation || q.back || '';

        const trapHtml = traps.length
            ? `<div class="ma-sheet-trap"><strong>Trap:</strong> <span class="ma-sheet-trap-text">${traps.join('<br>')}</span></div>`
            : '';

        const ruleHtml = `<div class="ma-sheet-rule"><strong>Rule:</strong>${rightTexts.length ? ` <span class="ma-sheet-answer">${rightTexts.join(' &middot; ')}</span>` : ''}${exp ? `<div class="ma-sheet-exp">${exp}</div>` : ''}</div>`;

        const domainLabel = q.domain ? ` &middot; ${esc(q.domain)}` : '';

        dlg.innerHTML = `
            <div class="ma-sheet-grab"></div>
            <div class="ma-sheet-head">\u26A0 Missed${domainLabel}</div>
            ${trapHtml}
            ${ruleHtml}
            ${linksHtml(q, courseId, true)}
        `;

        if (typeof dlg.showModal === 'function') {
            try { dlg.showModal(); } catch (e) { dlg.setAttribute('open', ''); }
        } else {
            dlg.setAttribute('open', '');
        }

        const gotItBtn = dlg.querySelector('.ma-sheet-gotit');
        if (gotItBtn && typeof gotItBtn.focus === 'function') {
            gotItBtn.focus();
        }
        return dlg;
    }

    function close(silent) {
        if (!dialog || !dialog.open) return;
        if (silent) currentOnClose = null;
        try { dialog.close(); } catch (e) { dialog.removeAttribute('open'); }
        if (!silent) fireOnClose();
    }

    // Create a rematch copy of a missed question with shuffled options and remapped ans + whyWrong.
    function makeRematch(q, courseId) {
        if (!q || !Array.isArray(q.opts)) return null;
        const n = q.opts.length;
        const order = q.opts.map((_, i) => i);
        for (let i = n - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tmp = order[i];
            order[i] = order[j];
            order[j] = tmp;
        }
        // Guarantee a different option order when there are at least 2 options
        if (n > 1 && order.every((oldIdx, newIdx) => oldIdx === newIdx)) {
            const tmp = order[0];
            order[0] = order[1];
            order[1] = tmp;
        }

        const copy = Object.assign({}, q, {
            opts: order.map(oldIdx => q.opts[oldIdx]),
            _rematch: true
        });

        if (Array.isArray(q.whyWrong)) {
            copy.whyWrong = order.map(oldIdx => q.whyWrong[oldIdx]);
        } else if (q.whyWrong && typeof q.whyWrong === 'object') {
            const ww = {};
            order.forEach((oldIdx, newIdx) => {
                if (oldIdx in q.whyWrong) ww[newIdx] = q.whyWrong[oldIdx];
            });
            copy.whyWrong = ww;
        }

        if (Array.isArray(q.ans)) {
            copy.ans = q.ans.map(oldIdx => order.indexOf(oldIdx)).sort((a, b) => a - b);
        } else if (typeof q.ans === 'number') {
            copy.ans = order.indexOf(q.ans);
        }

        if (Array.isArray(q.correct)) {
            copy.correct = q.correct.map(oldIdx => order.indexOf(oldIdx)).sort((a, b) => a - b);
        } else if (typeof q.correct === 'number') {
            copy.correct = order.indexOf(q.correct);
        }

        if (typeof q.correct_index === 'number') {
            copy.correct_index = order.indexOf(q.correct_index);
        }

        if (root.Game && typeof root.Game.qid === 'function') {
            const id = root.Game.qid(q, courseId);
            if (id && typeof root.Game.index === 'function') {
                try { root.Game.index().byObj.set(copy, id); } catch (e) {}
            }
        }

        return copy;
    }

    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', injectStyles);
        } else {
            injectStyles();
        }
    }

    root.Intel = {
        __loaded: true,
        open,
        close,
        resolveLinks,
        linksHtml,
        makeRematch
    };
})(typeof window !== 'undefined' ? window : globalThis);
