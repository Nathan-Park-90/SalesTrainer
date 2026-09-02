// =============================================
// Mammoth Academy Achievement System
// achievements.js — loaded on all pages
// =============================================
const Achievements = {
    badges: [
        { id: 'first_blood',   icon: '⚔️',  title: 'First Blood',       desc: 'Completed your first exam',                    check: (s) => parseInt(s.highscore) > 0 },
        { id: 'passing_grade', icon: '✅',  title: 'Passing Grade',     desc: 'Scored 72%+ on the full exam',                 check: (s) => parseInt(s.highscore) >= 47 },
        { id: 'overachiever',  icon: '🏆',  title: 'Overachiever',      desc: 'Scored 85%+ on the full exam',                 check: (s) => parseInt(s.highscore) >= 56 },
        { id: 'streak_3',      icon: '🔥',  title: 'On Fire',           desc: '3-day study streak',                           check: (s) => parseInt(s.streak) >= 3 },
        { id: 'streak_7',      icon: '💎',  title: 'Consistent',        desc: '7-day study streak',                           check: (s) => parseInt(s.streak) >= 7 },
        { id: 'flash_master',  icon: '⚡',  title: 'Flash Master',      desc: 'Completed all 13 AWS daily lessons',           check: (s) => parseInt(s.dailyDayAws) >= 13 },
        { id: 'sprint_ready',  icon: '🏃',  title: 'Sprint Ready',      desc: 'Completed all 7 Scrum daily lessons',          check: (s) => parseInt(s.dailyDayScrum) >= 7 },
        { id: 'card_sharp',    icon: '🃏',  title: 'Card Sharp',        desc: 'Mastered 30+ flashcards',                      check: (s) => s.mastered.length >= 30 },
        { id: 'ace',           icon: '🎯',  title: 'The Ace',           desc: 'Mastered 60+ flashcards',                      check: (s) => s.mastered.length >= 60 },
        { id: 'arch_initiate', icon: '🏗️',  title: 'Arch Initiate',     desc: 'Completed your first Architecture scenario',   check: (s) => s.archCompleted >= 1 },
        { id: 'arch_master',   icon: '🌐',  title: 'Cloud Architect',   desc: 'Completed all 5 Architecture scenarios',       check: (s) => s.archCompleted >= 5 },
        { id: 'quiz_complete', icon: '📝',  title: 'Active Learner',    desc: 'Completed a Library mini-quiz',                check: (s) => s.quizzesDone >= 1 },
        { id: 'scholar',       icon: '📚',  title: 'Scholar',           desc: 'Completed 10+ Library mini-quizzes',           check: (s) => s.quizzesDone >= 10 },
    ],

    getState() {
        const mastered = JSON.parse(localStorage.getItem('st_fc_mastered') || '[]');
        const quizKeys = Object.keys(localStorage).filter(k => k.startsWith('st_quiz_') && localStorage.getItem(k) === 'done');
        return {
            highscore:    localStorage.getItem('st_highscore') || 0,
            streak:       localStorage.getItem('st_streak') || 0,
            dailyDayAws:   localStorage.getItem('st_daily_day_aws') || 0,
            dailyDayScrum: localStorage.getItem('st_daily_day_scrum') || 0,
            mastered:     mastered,
            archCompleted: parseInt(localStorage.getItem('st_arch_completed') || '0'),
            quizzesDone:  quizKeys.length
        };
    },

    getEarned() {
        return JSON.parse(localStorage.getItem('st_badges') || '[]');
    },

    check(trigger) {
        const state = this.getState();
        const earned = this.getEarned();
        let newBadges = [];

        this.badges.forEach(badge => {
            if (!earned.includes(badge.id) && badge.check(state)) {
                earned.push(badge.id);
                newBadges.push(badge);
            }
        });

        if (newBadges.length > 0) {
            localStorage.setItem('st_badges', JSON.stringify(earned));
            newBadges.forEach(b => this.toast(b));
        }
    },

    toast(badge) {
        // Remove any existing toast
        const existing = document.getElementById('achievement-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'achievement-toast';
        toast.innerHTML = '<div class="achievement-glow"></div><div class="achievement-inner"><span class="achievement-icon">' + badge.icon + '</span><div><div class="achievement-label">Achievement Unlocked</div><div class="achievement-title">' + badge.title + '</div><div class="achievement-desc">' + badge.desc + '</div></div></div>';
        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => toast.classList.add('toast-visible'), 50);
        // Animate out
        setTimeout(() => {
            toast.classList.remove('toast-visible');
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    },

    renderBadgeWall(containerId) {
        const el = document.getElementById(containerId);
        if (!el) return;
        const earned = this.getEarned();
        el.innerHTML = this.badges.map(b => {
            const isEarned = earned.includes(b.id);
            return '<div class="badge-item ' + (isEarned ? 'badge-earned' : 'badge-locked') + '" title="' + b.desc + '">' +
                '<div class="badge-icon">' + b.icon + '</div>' +
                '<div class="badge-name">' + b.title + '</div>' +
                '<div class="badge-desc">' + b.desc + '</div>' +
            '</div>';
        }).join('');
    }
};

// Auto-check on every page load
document.addEventListener('DOMContentLoaded', () => {
    Achievements.check('page_load');
});
