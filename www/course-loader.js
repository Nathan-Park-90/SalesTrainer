/**
 * Mammoth Academy — course-loader.js
 * Auto-discovers all COURSE_* globals and merges them into window.DATA
 * To add a new course: drop a new COURSE_*.js file and load it before this script
 */

(function() {
    'use strict';

    const DATA = {
        course:         [],
        flashcards:     [],
        arch:           [],
        sales:          [],
        daily_lessons:  [],
        pbq:            [],   // performance-based question labs (gym.html PBQ Lab), tagged with courseId
        _courseMeta:    []   // registry of loaded course packs
        // exam_<key> arrays (e.g. exam_aws, exam_psm) are created below, one per
        // course pack that declares meta.examKey — no fixed list to maintain here.
    };

    // Auto-discover all COURSE_* globals on window
    const courseKeys = Object.keys(window).filter(k => /^COURSE_[A-Z]/.test(k));

    courseKeys.forEach(key => {
        const pack = window[key];
        if (!pack || !pack.meta) return;

        DATA._courseMeta.push(pack.meta);

        if (Array.isArray(pack.modules)) {
            // Tag each module with its source course, and with its position
            // WITHIN that course (localIdx) — the stable identity used for
            // display numbering, progress storage, and related-module links.
            // Never use a module's position in the merged DATA.course array
            // for any of those: that global position shifts if script load
            // order changes or a course gains/loses modules, silently
            // corrupting saved progress and cross-links (see courseId note
            // above — localIdx exists for the same reason).
            pack.modules.forEach((mod, i) => { mod.courseId = pack.meta.id; mod.localIdx = i; });
            DATA.course.push(...pack.modules);
        }
        if (Array.isArray(pack.flashcards)) {
            // Each pack numbers its own flashcards from ~1, so raw ids collide across
            // packs once merged (e.g. AWS card 101 and Scrum card 101 both exist) —
            // that made the mastery toggle capable of silently unmastering the wrong
            // card. Prefix with the pack id so every card's id is globally unique.
            pack.flashcards.forEach(card => { card.id = pack.meta.id + '_' + card.id; });
            DATA.flashcards.push(...pack.flashcards);
        }
        if (Array.isArray(pack.arch))       DATA.arch.push(...pack.arch);
        if (Array.isArray(pack.pbq)) {
            pack.pbq.forEach(p => { p.courseId = pack.meta.id; });
            DATA.pbq.push(...pack.pbq);
        }
        if (Array.isArray(pack.sales))      DATA.sales.push(...pack.sales);
        if (Array.isArray(pack.daily)) {
            // Tag every daily lesson with its pack's dailyTrackKey unless the lesson
            // already sets its own `track` (the original AWS lessons predate this field
            // and rely on the "untagged = aws" convention, so don't override those).
            pack.daily.forEach(l => { if (!l.track && pack.meta.dailyTrackKey) l.track = pack.meta.dailyTrackKey; });
            DATA.daily_lessons.push(...pack.daily);
        }

        if (Array.isArray(pack.exam) && pack.meta.examKey) {
            const key = 'exam_' + pack.meta.examKey;
            if (!DATA[key]) DATA[key] = [];
            DATA[key].push(...pack.exam);
        }
    });

    // Expose globally
    window.DATA = DATA;

    console.log('[Mammoth Academy] Loaded ' + courseKeys.length + ' course pack(s):',
        DATA._courseMeta.map(m => m.name).join(', '));
    console.log('[Mammoth Academy] Totals — Modules:', DATA.course.length,
        '| Flashcards:', DATA.flashcards.length,
        '| AWS Qs:', DATA.exam_aws.length,
        '| PSM Qs:', DATA.exam_psm.length,
        '| Daily:', DATA.daily_lessons.length,
        '| Sales:', DATA.sales.length,
        '| Arch:', DATA.arch.length);
})();
