/**
 * Mammoth Academy — home-card.js (Blueprint F5: homepage "next question" card)
 * Loaded on index.html after game.js and app.js. Never calls app.init().
 */
(function (root) {
    'use strict';

    const state = {
        activeId: null,
        entry: null,
        lastQid: null,
        answered: false,
        seen: new Set(),
        chain: null,       // { active: boolean, total: 5, count: number, right: number }
        summary: null      // e.g. "4 / 5 right · 🔥 6"
    };

    function getStore(k) {
        try { return root.localStorage ? root.localStorage.getItem(k) : null; } catch (e) { return null; }
    }
    function getList(k) {
        const raw = getStore(k);
        if (!raw) return [];
        try { const a = JSON.parse(raw); return Array.isArray(a) ? a : []; } catch (e) { return []; }
    }

    function isReturningVisitor() {
        const streak = parseInt(getStore('st_streak') || '0', 10) || 0;
        const mastered = getList('st_fc_mastered');
        const badges = getList('st_badges');
        const examPacks = (root.DATA && DATA._courseMeta || []).filter(m => m.examKey);
        let anyAttempted = false;
        examPacks.forEach(m => {
            const score = parseInt(getStore('st_highscore_' + m.examKey) || '0', 10) || 0;
            const pct = parseFloat(getStore('st_highscore_pct_' + m.examKey) || '0') || 0;
            if (score > 0 || pct > 0) anyAttempted = true;
        });
        const hasReview = !!(root.Game && Game.Review && Object.keys(Game.Review.all()).length > 0);
        return streak > 0 || mastered.length > 0 || badges.length > 0 || anyAttempted || hasReview;
    }

    function isSingleAns(entry) {
        return !!(entry && entry.q && typeof entry.q.ans === 'number' && Array.isArray(entry.q.opts) && entry.q.opts.length > 0);
    }

    function chooseCandidate(ids, lastQid, seenSet) {
        if (!ids || !ids.length) return null;
        const notLast = ids.filter(id => id !== lastQid);
        const pool = notLast.length ? notLast : ids;
        const fresh = pool.filter(id => !seenSet.has(id));
        return fresh.length ? fresh[0] : pool[0];
    }

    // Pick the question for the active track (F5):
    // 1. first Game.Review.due(activeId) id whose entry is a single-answer exam question;
    // 2. else an unseen (!Game.Review.get(id)) single-answer exam question from the weakest domain (lowest pct with n > 0);
    // 3. else any single-answer exam question; a track with no exam questions uses its lesson-quiz questions
    //    (Game.entry(id).source === 'lesson'); a track with neither hides the card.
    function pickQuestion(courseId, lastQid) {
        if (!root.Game) return null;
        const activeId = courseId || Game.Track.get();
        const idx = Game.index();

        // 1. Due single-answer exam questions, most urgent first
        const dueExamIds = Game.Review.due(activeId).filter(id => {
            const e = Game.entry(id);
            return e && e.source === 'exam' && isSingleAns(e);
        });
        if (dueExamIds.length) {
            const picked = chooseCandidate(dueExamIds, lastQid, state.seen);
            if (picked) return Game.entry(picked);
        }

        // All single-answer exam questions for this course
        const allExamIds = (idx.exam.get(activeId) || []).filter(id => {
            const e = Game.entry(id);
            return e && e.source === 'exam' && isSingleAns(e);
        });

        if (allExamIds.length) {
            // 2. Unseen single-answer exam question from the weakest domain (lowest pct with n > 0)
            const m = Game.Review.mastery(activeId);
            const weakDomains = ((m && m.domains) || [])
                .filter(d => d.n > 0)
                .slice()
                .sort((a, b) => a.pct - b.pct);

            for (let i = 0; i < weakDomains.length; i++) {
                const dom = weakDomains[i].domain;
                const unseenInDom = allExamIds.filter(id => {
                    if (Game.Review.get(id)) return false;
                    const e = Game.entry(id);
                    return ((e && e.domain) || 'Other') === dom;
                });
                if (unseenInDom.length) {
                    const picked = chooseCandidate(unseenInDom, lastQid, state.seen);
                    if (picked) return Game.entry(picked);
                }
            }

            // 3a. Any unseen single-answer exam question, else any single-answer exam question
            const unseenAny = allExamIds.filter(id => !Game.Review.get(id));
            const picked = chooseCandidate(unseenAny.length ? unseenAny : allExamIds, lastQid, state.seen);
            if (picked) return Game.entry(picked);
        }

        // 3b. Track with no exam questions: use its lesson-quiz questions (source === 'lesson')
        const lessonIds = [];
        idx.byId.forEach((e, id) => {
            if (e && e.courseId === activeId && e.source === 'lesson' && isSingleAns(e)) {
                lessonIds.push(id);
            }
        });
        if (lessonIds.length) {
            const dueLessons = Game.Review.due(activeId).filter(id => lessonIds.includes(id));
            const unseenLessons = lessonIds.filter(id => !Game.Review.get(id));
            const pool = dueLessons.length ? dueLessons : (unseenLessons.length ? unseenLessons : lessonIds);
            const picked = chooseCandidate(pool, lastQid, state.seen);
            if (picked) return Game.entry(picked);
        }

        return null;
    }

    function optText(o) {
        if (root.app && typeof root.app.examOptText === 'function') return root.app.examOptText(o);
        return (o && o.text) || o;
    }

    function ensureSection() {
        let sec = document.getElementById('ma-next');
        if (!sec) {
            const stats = document.getElementById('ma-stats');
            if (!stats || !stats.parentNode) return null;
            sec = document.createElement('section');
            sec.id = 'ma-next';
            sec.className = 'ma-next';
            stats.parentNode.insertBefore(sec, stats);
        }
        sec.hidden = false;
        return sec;
    }

    function removeSection() {
        const sec = document.getElementById('ma-next');
        if (sec && sec.parentNode) sec.parentNode.removeChild(sec);
    }

    function syncStatsStreak(days) {
        const statEl = document.getElementById('stat-streak');
        if (statEl) {
            statEl.textContent = days > 0 ? '🔥 ' + days : '0';
            statEl.classList.toggle('lit', days >= 3);
        }
        const coldEl = document.getElementById('coldstart-banner');
        if (coldEl && days > 0) coldEl.hidden = true;
    }

    function syncHeroState(returning) {
        const hero = document.querySelector('.ma-hero');
        if (hero) hero.classList.toggle('is-returning', !!returning);
        const pitchEl = document.getElementById('ma-pitch');
        if (pitchEl) pitchEl.style.display = returning ? 'none' : 'block';
        const coldEl = document.getElementById('coldstart-banner');
        if (coldEl) coldEl.hidden = !!returning;
    }

    function renderCardDOM(entry) {
        const sec = ensureSection();
        if (!sec || !entry) {
            removeSection();
            return;
        }
        state.entry = entry;
        state.lastQid = entry.id;
        state.answered = false;
        state.seen.add(entry.id);

        const q = entry.q;
        const meta = ((root.DATA && DATA._courseMeta) || []).find(m => m.id === entry.courseId) || {};
        const today = Game.Day.today();
        const streak = Game.Day.streak().days;
        const domainTag = entry.domain || meta.name || entry.courseId;
        const chainStep = state.chain && state.chain.active ? `${state.chain.count + 1} / ${state.chain.total}` : '';

        sec.setAttribute('data-course', entry.courseId);
        sec.setAttribute('data-qid', entry.id);

        const optsHtml = (q.opts || []).map((o, i) => `
            <button type="button" class="ma-next-opt opt" data-idx="${i}" onclick="HomeCard.answer(${i})">
                <span class="ma-opt-letter">${String.fromCharCode(65 + i)}.</span>
                <span class="ma-opt-text">${optText(o)}</span>
            </button>
        `).join('');

        sec.innerHTML = `
            <div class="ma-next-card qcard vt" id="ma-next-card">
                <div class="ma-next-head">
                    <div class="ma-next-head-left">
                        <span class="ma-next-title">Next question</span>
                        <span class="ma-next-domain" id="ma-next-domain">${domainTag}</span>
                        ${chainStep ? `<span class="ma-next-chain" id="ma-next-chain">Set ${chainStep}</span>` : ''}
                    </div>
                    <div class="ma-next-head-right">
                        <span class="ma-next-progress" id="ma-next-progress">${today.a} / ${today.goal} today</span>
                        <span class="ma-next-streak" id="ma-next-streak">🔥 ${streak}</span>
                    </div>
                </div>
                ${state.summary ? `<div class="ma-next-summary" id="ma-next-summary" role="status">${state.summary}</div>` : ''}
                <div class="ma-next-q q" id="ma-next-q">${q.q || q.front || ''}</div>
                <div class="ma-next-opts" id="ma-next-opts" role="group" aria-label="Answer choices">${optsHtml}</div>
                <div class="ma-next-feedback" id="ma-next-feedback" hidden></div>
                <div class="ma-next-goal" id="ma-next-goal" hidden></div>
                <div class="ma-next-actions">
                    <button type="button" class="ma-next-btn primary" id="ma-btn-next" onclick="HomeCard.next()">Next</button>
                    <button type="button" class="ma-next-btn" id="ma-btn-five" onclick="HomeCard.fiveMore()">5 more</button>
                </div>
            </div>
        `;
    }

    function swapCard(updateFn) {
        const reduced = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!reduced && typeof document !== 'undefined' && typeof document.startViewTransition === 'function') {
            let ran = false;
            try {
                document.startViewTransition(() => {
                    if (!ran) { ran = true; updateFn(); }
                });
                if (!ran) { ran = true; updateFn(); }
                return;
            } catch (e) {
                if (!ran) updateFn();
                return;
            }
        }
        updateFn();
    }

    function answer(chosenIdx) {
        if (!state.entry || state.answered) return;
        state.answered = true;
        // Clear any leftover summary from a previous 5-more set once a new answer lands
        if (!state.chain || !state.chain.active) {
            state.summary = null;
            const prevSum = document.getElementById('ma-next-summary');
            if (prevSum) prevSum.remove();
        }

        const entry = state.entry;
        const q = entry.q;
        const right = chosenIdx === q.ans;
        const res = Game.Review.record(entry.id, right);
        // Read before Juice.react: react consumes the flag (and fires 'daily' itself).
        const hitGoal = !!Game.Day.justHitGoal;
        const hasReact = !!(root.Juice && typeof root.Juice.react === 'function');

        const cardEl = document.getElementById('ma-next-card');
        const secEl = document.getElementById('ma-next');
        const btns = secEl ? secEl.querySelectorAll('.ma-next-opt') : [];
        btns.forEach((btn, i) => {
            btn.disabled = true;
            if (i === q.ans) {
                btn.classList.add('right', 'correct');
            } else if (i === chosenIdx && !right) {
                btn.classList.add('wrong', 'incorrect');
            }
        });

        if (cardEl) {
            cardEl.classList.toggle('right', right);
            cardEl.classList.toggle('wrong', !right);
            if (!right) cardEl.classList.add('shake');
        }
        if (secEl) {
            secEl.classList.toggle('right', right);
            secEl.classList.toggle('wrong', !right);
        }

        // Explanation + whyWrong[chosen] on a miss
        const fbEl = document.getElementById('ma-next-feedback');
        if (fbEl) {
            const expText = q.exp || q.explanation || q.back || '';
            const whyText = !right
                ? ((q.whyWrong && q.whyWrong[chosenIdx]) || (q.opts && q.opts[chosenIdx] && q.opts[chosenIdx].fb) || '')
                : '';
            let html = `<div class="ma-next-verdict ${right ? 'right' : 'wrong'}">${right ? '✓ Correct' : '✗ Incorrect'}</div>`;
            if (whyText) {
                html += `<div class="ma-next-trap"><strong>Trap:</strong> ${whyText}</div>`;
            }
            if (expText) {
                html += `<div class="ma-next-exp">${expText}</div>`;
            }
            fbEl.innerHTML = html;
            fbEl.className = 'ma-next-feedback ' + (right ? 'right' : 'wrong');
            fbEl.hidden = false;
        }

        // Optional globals: Juice.react (combo/mastered/rematch aware) else Juice.fire, and Intel.open
        if (hasReact) {
            try { root.Juice.react(res, btns[right ? q.ans : chosenIdx] || cardEl); } catch (e) {}
        } else if (root.Juice && typeof root.Juice.fire === 'function') {
            try { root.Juice.fire(right ? 'correct' : 'miss', cardEl); } catch (e) {}
        }
        if (!right && root.Intel && typeof root.Intel.open === 'function') {
            try { root.Intel.open({ q, chosen: chosenIdx, courseId: entry.courseId }); } catch (e) {}
        }

        // Update progress text + streak + stats row streak
        const today = Game.Day.today();
        const streak = Game.Day.streak().days;
        const progEl = document.getElementById('ma-next-progress');
        if (progEl) progEl.textContent = `${today.a} / ${today.goal} today`;
        const streakEl = document.getElementById('ma-next-streak');
        if (streakEl) streakEl.textContent = `🔥 ${streak}`;
        syncStatsStreak(streak);

        // Daily minimum hit celebration
        if (hitGoal) {
            const goalEl = document.getElementById('ma-next-goal');
            if (goalEl) {
                goalEl.textContent = '⚡ Daily minimum hit';
                goalEl.hidden = false;
            }
            if (!hasReact && root.Juice && typeof root.Juice.fire === 'function') {
                try { root.Juice.fire('daily', cardEl); } catch (e) {}
            }
            Game.Day.justHitGoal = false;
        }

        // Update "5 more" chain if active
        if (state.chain && state.chain.active) {
            state.chain.count++;
            if (right) state.chain.right++;
            const chainEl = document.getElementById('ma-next-chain');
            if (chainEl) chainEl.textContent = `Set ${state.chain.count} / ${state.chain.total}`;

            if (state.chain.count >= state.chain.total) {
                state.chain.active = false;
                state.summary = `${state.chain.right} / ${state.chain.total} right · 🔥 ${streak}`;
                if (cardEl) {
                    let sumEl = document.getElementById('ma-next-summary');
                    if (!sumEl) {
                        sumEl = document.createElement('div');
                        sumEl.id = 'ma-next-summary';
                        sumEl.className = 'ma-next-summary';
                        sumEl.setAttribute('role', 'status');
                        const qNode = document.getElementById('ma-next-q');
                        cardEl.insertBefore(sumEl, qNode);
                    }
                    sumEl.textContent = state.summary;
                }
            }
        }
    }

    function next() {
        const activeId = (root.Game && Game.Track) ? Game.Track.get() : state.activeId;
        const nextEntry = pickQuestion(activeId, state.lastQid);
        if (!nextEntry) {
            removeSection();
            return;
        }
        swapCard(() => renderCardDOM(nextEntry));
    }

    function fiveMore() {
        state.chain = { active: true, total: 5, count: 0, right: 0 };
        state.summary = null;
        const activeId = (root.Game && Game.Track) ? Game.Track.get() : state.activeId;
        const nextEntry = pickQuestion(activeId, state.lastQid);
        if (!nextEntry) {
            removeSection();
            return;
        }
        swapCard(() => renderCardDOM(nextEntry));
    }

    function onTrackChange(newTrackId) {
        state.activeId = newTrackId || ((root.Game && Game.Track) ? Game.Track.get() : null);
        state.lastQid = null;
        state.seen.clear();
        state.chain = null;
        state.summary = null;
        syncHeroState(true);
        const entry = pickQuestion(state.activeId, null);
        if (!entry) {
            removeSection();
            return;
        }
        renderCardDOM(entry);
    }

    function init() {
        if (!root.Game || !root.DATA) return;
        const returning = isReturningVisitor();
        syncHeroState(returning);
        if (!returning) {
            removeSection();
            return;
        }
        state.activeId = Game.Track.get();
        const entry = pickQuestion(state.activeId, state.lastQid);
        if (!entry) {
            removeSection();
            return;
        }
        renderCardDOM(entry);
    }

    root.HomeCard = {
        init,
        answer,
        next,
        fiveMore,
        onTrackChange,
        pickQuestion,
        isReturningVisitor,
        state
    };

    if (typeof document !== 'undefined') {
        if (document.getElementById('ma-stats')) {
            init();
        } else if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    }
})(typeof window !== 'undefined' ? window : globalThis);
