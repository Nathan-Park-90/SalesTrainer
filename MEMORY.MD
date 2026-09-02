## MAMMOTH ACADEMY — Memory Log
Last updated: 2026-09-02

---

## Brand
- Product: **Mammoth Academy** (Mammoth Capital sub-brand)
- Tagline: *Certifications don't make experts. Pressure does.*
- Colors: bg=#020617, accent=#00f2ff (MC cyan), card=#0d1324
- Fonts: Outfit (headings, wt 400/600/700/800) + JetBrains Mono (labels/data, wt 400/600/700) — all offline woff2 in /fonts/
- Logo: assets/mammoth-logo.png (from mammothcapital.site)
- Footer: Links back to mammothcapital.site on every page
- Tone: Witty, punchy, slightly edgy. All analogies anchor to Mammoth Capital (FinTech), Proxmox homelab, pfSense, MSTR/Bitcoin, TradingView Pine Script

---

## File Structure
```
MammothAcademy/             ← root folder
├── index.html              ← Homepage: hero, progress stats, zone grid, badge modal
├── library.html            ← Library: 24-module course library (AWS/Sales/Scrum tabs)
├── gym.html                ← Gym: flashcards + arch lab + sales scenarios
├── arena.html              ← Arena: AWS exam + PSM exam + tiered practice
├── daily.html              ← Daily Flash: AWS track (days 1-13) + Scrum track (days 14-20)
├── sprint.html             ← Sprint/War Room: Kanban + sprint challenges
├── data.js                 ← ALL content (single source of truth)
├── app.js                  ← Core learning engine
├── scrum.js                ← Kanban board logic
├── style.css               ← Global styles + all enhancement CSS
├── achievements.js         ← 12-badge achievement system, toast, badge wall
├── memory.md               ← This file
├── assets/
│   └── mammoth-logo.png    ← Mammoth Capital logo (69kb, from mammothcapital.site)
├── fonts/                  ← Offline font stack
│   ├── mammoth-fonts.css
│   ├── outfit-400.woff2 / outfit-600.woff2 / outfit-700.woff2 / outfit-800.woff2
│   └── jetbrains-mono-400.woff2 / jetbrains-mono-600.woff2 / jetbrains-mono-700.woff2
└── notebooklm_exports/     ← 24 .md files for NotebookLM audio generation
```

---

## DATA Structure (data.js)
- `DATA.flashcards[]`     — 89 cards. Fields: id, cat, front, back, analogy, domain
- `DATA.exam_aws[]`       — 96 questions. Fields: q, opts[], ans, exp, domain
  - Domain balance: Secure 28% / Performance 26% / Resilient 25% / Cost 21%
- `DATA.exam_psm[]`       — 40 questions
- `DATA.arch[]`           — 5 scenarios (Level 1–4 + Final Boss). Fields: title, desc, zones, palette, dm, wm
- `DATA.sales[]`          — 10 scenarios. Fields: id, persona, scenario, opts[{text,ok,fb}]
  - Personas: CTO-Logistics, CTO-Azure, VP Ops-FinTech, Multi-Stakeholder-Healthcare,
    CFO-SaaS, CTO-Startup, VP Infra-Enterprise, CISO-FinServ, Dir IT-Healthcare, VP Eng-PostReorg
- `DATA.course[]`         — 24 modules (0–12 AWS, 13–17 Sales, 18–23 Scrum)
  - Fields: title, icon, topics[{title, prose, quiz[]}], related[], track
- `DATA.daily_lessons[]`  — 20 lessons
  - AWS track: days 1–13 (track field absent or 'aws')
  - Scrum track: days 14–20 (track='scrum')
  - Fields: day, concept, domain, icon, color, tagline, slides[], quiz[]

---

## localStorage Keys
| Key | Type | Description |
|---|---|---|
| st_highscore | int | Best exam score (out of 65) |
| st_failed_qs | array | Wrong question texts for spaced repetition |
| st_streak | int | Daily study streak |
| st_last_daily | string | Date of last daily completion |
| st_daily_day | int | Current AWS daily day (1–13) |
| st_daily_day_aws | int | Current day in AWS track |
| st_daily_day_scrum | int | Current day in Scrum track |
| st_fc_mastered | array | Card IDs marked as mastered |
| st_arch_completed | int | Architecture scenarios completed |
| st_badges | array | Earned badge IDs |
| st_quiz_M_T | 'done' | Mini-quiz completion for module M, topic T |
| st_completed | array | Completed module IDs |

---

## Features Built (Session History)
1. **Library mini-quiz** — 72 questions (24 × 3), active recall after every lesson, tracks completion
2. **Flashcard mastery** — Got It / Still Learning buttons, progress bar, persisted in localStorage
3. **Progress dashboard** — Homepage stats bar: streak, best score, mastery %, achievements
4. **Exam timer** — 130-min AWS / 60-min PSM countdown, amber at 20min, red at 5min, auto-submit
5. **Sales Scenarios ×10** — 10 distinct personas with per-option feedback
6. **Achievements** — 12 badges, toast notifications, badge wall modal (click Achievements on homepage)
7. **Scrum Daily Flash** — 7 lessons days 14–20, AWS/Scrum toggle on daily.html
8. **Cross-module links** — Every module links to 2+ related modules
9. **NotebookLM exports** — 24 .md files in notebooklm_exports/ for audio teacher generation
10. **Full rebrand** — SalesTrainer → Mammoth Academy. MC palette, Outfit+JBMono fonts, logo, footer
11. **CompTIA Pack (v1)** — Modularized `comptia-certifications.js` covering A+, Network+, Security+, and Cloud+ with Mammoth tone (Proxmox/pfSense/MSTR analogies).

---

## Achievements (achievements.js) — 12 Badges
| ID | Icon | Title | Condition |
|---|---|---|---|
| first_blood | ⚔️ | First Blood | Completed first exam |
| passing_grade | ✅ | Passing Grade | Scored 72%+ |
| overachiever | 🏆 | Overachiever | Scored 85%+ |
| streak_3 | 🔥 | On Fire | 3-day streak |
| streak_7 | 💎 | Consistent | 7-day streak |
| flash_master | ⚡ | Flash Master | Completed all 13 daily lessons |
| card_sharp | 🃏 | Card Sharp | 30+ flashcards mastered |
| ace | 🎯 | The Ace | 60+ flashcards mastered |
| arch_initiate | 🏗️ | Arch Initiate | 1 architecture scenario done |
| arch_master | 🌐 | Cloud Architect | All 5 architecture scenarios |
| quiz_complete | 📝 | Active Learner | 1 library mini-quiz done |
| scholar | 📚 | Scholar | 10+ library mini-quizzes done |

---

## Technical Notes
- Platform: 100% offline, local HTML/JS/CSS. No CDN, no internet required
- PowerShell: use semicolons not `&&` for chaining commands
- Node scripts: write to file then run — avoid backtick template literals in `node -e "..."`
- `app.init()` must NOT be called on index.html (causes stale DOM injection from renderScenarios etc.)
- gym.html is self-contained with its own `gym{}` object — does not use `app{}` for flashcards
- sprint.html uses scrum.js for Kanban board logic only
- daily.html is self-contained with its own `daily{}` object
- arena.html patches `app.startExam` to also start the timer

---

## Open Items / Roadmap
| Priority | Item |
|---|---|
| Phase 2 | CompTIA: Build 90-question exam pool for `arena.html` hitting exact domain weights (Sec+ Ops 28%, etc.) |
| Phase 2 | CompTIA: Add pfSense/Zero-Trust Architecture Scenarios to `gym.html` |
| Low | Cost domain at 21% vs 24% target — add ~3 more cost questions |
| Phase 3 | Course modularization to /courses/*.json files (for future subjects like Azure) |
| Phase 3 | Capacitor wrapper for iOS/Android App Store submission |
| User action | NotebookLM audio: upload notebooklm_exports/*.md, use Deep Dive format with Mammoth Capital focus prompt |
