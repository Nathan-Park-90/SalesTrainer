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
        exam_aws:       [],
        exam_psm:       [],
        arch:           [],
        sales:          [],
        daily_lessons:  [],
        _courseMeta:    []   // registry of loaded course packs
    };

    // Auto-discover all COURSE_* globals on window
    const courseKeys = Object.keys(window).filter(k => /^COURSE_[A-Z]/.test(k));

    courseKeys.forEach(key => {
        const pack = window[key];
        if (!pack || !pack.meta) return;

        DATA._courseMeta.push(pack.meta);

        if (Array.isArray(pack.modules))    DATA.course.push(...pack.modules);
        if (Array.isArray(pack.flashcards)) DATA.flashcards.push(...pack.flashcards);
        if (Array.isArray(pack.arch))       DATA.arch.push(...pack.arch);
        if (Array.isArray(pack.sales))      DATA.sales.push(...pack.sales);
        if (Array.isArray(pack.daily))      DATA.daily_lessons.push(...pack.daily);

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
