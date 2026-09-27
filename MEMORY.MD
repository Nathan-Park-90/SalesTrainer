## MAMMOTH ACADEMY — Memory Log
Last updated: 2026-09-12

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
`www/` is the live app — it's the Capacitor `webDir` (see `capacitor.config.json`), so it's what actually ships. There is **no root-level duplicate anymore** (there used to be a stale pre-rebrand copy of the whole app sitting at the project root alongside ~150 one-off scratch scripts; both were removed).

```
MammothAcademy/
├── android/                 ← Capacitor native Android project
├── www/                     ← THE LIVE APP — everything below is under here
│   ├── index.html           ← Homepage: hero, dynamic Certification Tracks grid, zone cards, badge modal
│   ├── library.html         ← Library: course switcher (searchable dropdown) + module TOC + lesson canvas
│   ├── gym.html              ← Gym: flashcards + arch lab + sales scenarios
│   ├── arena.html            ← Arena: per-cert exam simulators
│   ├── daily.html            ← Daily Flash: short daily lessons, one track per course pack
│   ├── sprint.html           ← Sprint/War Room: Kanban + Scrum sprint challenges
│   ├── path.html             ← Smart Path: cross-track progress dashboard, built from DATA._courseMeta
│   ├── courses/              ← One file per certification/course pack (see below) — THE content source of truth
│   ├── course-loader.js      ← Auto-discovers every COURSE_* global and merges them into window.DATA
│   ├── app.js                ← Core learning engine (library rendering, lessons, quizzes, exams)
│   ├── scrum.js               ← Kanban board logic (sprint.html only)
│   ├── achievements.js        ← 12-badge achievement system, toast, badge wall
│   ├── pwa.js                 ← Service worker registration
│   ├── sw.js                  ← Service worker
│   ├── style.css              ← Global styles + all enhancement CSS
│   ├── manifest.json           ← PWA manifest
│   ├── assets/, fonts/         ← Logo/icons, offline font stack (mammoth-fonts.css + woff2s)
├── notebooklm_exports/       ← One .md transcript per module (47), for NotebookLM Audio Overviews
└── MEMORY.MD                 ← This file
```

**There is no `data.js` anymore.** Content used to live in one giant `data.js`; it's now fully modular — every course is its own file under `www/courses/`, auto-merged at runtime by `course-loader.js`. Adding a new course requires zero changes to app.js/HTML: drop a new `courses/<id>.js` file defining a `COURSE_<NAME>` global with the shape below, and add one `<script src="courses/<id>.js">` tag (before `course-loader.js`) to each HTML page.

---

## Course Pack Shape (`www/courses/*.js`)
Each file defines `var COURSE_<NAME> = { meta, modules, flashcards, exam, daily, arch, sales }`.

- `meta`: `{ id, name, subtitle, icon, color, category, examKey, examName?, passThreshold?, examDurationMinutes?, flashcardCat, dailyTrackKey, domains, version }`
  - `id` — stable course id, used everywhere as the join key (never array position)
  - `category` — grouping label for the Library's course-switcher dropdown (e.g. "AWS", "CompTIA", "Agile & Scrum", "Sales")
  - `domains` — maps each official exam domain name to the exact module `title` that best covers it, used by Smart Path's "review your weakest domain" deep link. **Keep this in sync with real module titles and the exam's `domain` tags** — both silently no-op if they drift (see Known Bugs Fixed below).
- `modules[]`: `{ title, topics[{title, prose, tags[], quiz[]}], related[] }`
  - **No "Module N:" prefix in `title`** — numbering is rendered dynamically (`Module <localIdx+1>`) by app.js from each module's position in its own course, never hardcoded in content.
  - `related`: array of `{ course: <courseId>, idx: <that module's position within its own course> }` — NOT a raw index into the merged course list. Can point to a different course.
- `exam[].domain` must exactly match one of the keys in `meta.domains` (or the official exam's real domain name) — a typo'd or invented domain name silently breaks Smart Path's weak-domain detection for every question tagged with it.

**Course-loader identity fields** (set automatically, never store these in the course file itself): `mod.courseId`, `mod.localIdx` (module's 0-based position within its own course — the stable id used for progress storage, display numbering, and related-links), `flashcard.id` (prefixed with the course id to stay globally unique).

---

## Current Course Catalog (as of 2026-09-03)
| Course | id | Exam code | Modules |
|---|---|---|---|
| AWS Solutions Architect | `aws-saa-c03` | SAA-C03 (current) | 13 |
| Sales Engineering | `sales-engineering` | — (career track, no exam) | 5 |
| Professional Scrum Master | `psm-scrum` | PSM I, 2020 Scrum Guide (current) | 6 (last 2 are supplementary CSM content, outside PSM I's own scope) |
| CompTIA Security+ | `comptia-securityplus` | SY0-701 (current; successor SY0-801 previews ~Oct 2026) | 5 |
| CompTIA Network+ | `comptia-networkplus` | **N10-009** (relabeled 2026-09-03 — N10-008 is retired) | 5 |
| CompTIA A+ | `comptia-aplus` | **Core 1 (220-1201) & Core 2 (220-1202)** (relabeled 2026-09-03 — 1101/1102 retired Sep 2025) | 8 |
| CompTIA Cloud+ | `comptia-cloudplus` | **CV0-004** (relabeled 2026-09-03 — CV0-003 retired) | 5 |

**CompTIA A+ content gap — fixed 2026-09-03**: added 3 new modules (Networking, Virtualization & Cloud, and a 2-topic Security module) covering the domains that previously had zero content — Networking (23% of Core 1), Virtualization and Cloud (11% of Core 1), and Security (28% of Core 2, the single largest domain on either exam). A+ now has 8 modules and 19 exam questions across all 9 official domains.

**Lower-priority gaps**: PSM I's exam bank is 40 questions vs. the real exam's 80; AWS's exam bank is a bit Cost-heavy vs. the official 20% Cost / 26% Resilient split; CompTIA Cloud+ has no exam questions tagged to the "DevOps Fundamentals" domain (10% of CV0-004) despite being touched on in the IaC module's prose.

---

## Library Navigation
The course switcher on `library.html` is a single compact trigger ("Now Viewing: <course>") that opens a searchable panel grouped by `meta.category` (`app.renderLibraryTabs()` / `app.toggleCourseMenu()` / `app.filterCourseMenu()` in app.js). This replaced first a flat tab row, then a wrapping-chip row — both broke down as the catalog grew past ~4 courses. The dropdown scales to any number of courses with zero layout growth; **do not revert to a tab/chip row** as more courses are added.

Gotcha: any element toggled via the `hidden` attribute that also has its own CSS `display` rule needs an explicit `.selector[hidden] { display: none; }` override — an author stylesheet's `display` rule has equal specificity to (and wins the cascade tie against) the browser's built-in `[hidden]{display:none}` UA rule, so the element renders open/visible by default without it. Hit this twice building the course-menu panel and its rows.

---

## localStorage Keys
| Key | Type | Description |
|---|---|---|
| st_highscore_<examKey> | int | Best score for that exam, per course (e.g. `st_highscore_aws`) |
| st_streak | int | Daily study streak |
| st_last_daily | string | Date of last daily completion |
| st_daily_day_<trackKey> | int | Current day in that course's daily track |
| st_fc_mastered | array | Flashcard ids marked mastered (ids are `<courseId>_<originalId>`, globally unique) |
| st_badges | array | Earned badge ids |
| st_quiz_<courseId>_<localIdx>_<topicIdx> | 'done' | Mini-quiz completion, keyed by stable per-course module identity (NOT the module's position in the merged course list — that shifts if script load order or any course's size ever changes) |

---

## Known Bugs Fixed (2026-09-03 session)
- **Accidental data loss**: every `.js`/`.py` file at root and in `www/` had been truncated to 0 bytes by some earlier process. Recovered from git HEAD; root-level duplicate app + ~150 scratch scripts removed entirely afterward (they predated the `www/` migration and were never the live app).
- **Global module numbering**: every course used to share one continuous "Module N" counter across the whole catalog (AWS 1–13, Sales silently continuing as 14–18, Scrum with no numbering at all, each CompTIA cert crammed into a single module 20–23). Fixed: numbering is now computed per-course from `localIdx`, never stored in title text.
- **`related` links and quiz-progress keys used raw position in the merged `DATA.course` array** — worked only by coincidence because script load order never changed; one course reorder away from silently scrambling saved progress and cross-links. Re-keyed to `courseId + localIdx`.
- **CompTIA A+ meta.domains** and Security+ 10/42 exam questions were tagged with non-canonical or stale domain names (e.g. `"Network Security"` instead of one of SY0-701's real 5 domain names) — broke Smart Path's weak-domain detection silently. Retagged to the official domain taxonomy for each cert.

---

## Achievements (achievements.js) — 12 Badges
| ID | Icon | Title | Condition |
|---|---|---|---|
| first_blood | ⚔️ | First Blood | Completed first exam |
| passing_grade | ✅ | Passing Grade | Scored 72%+ |
| overachiever | 🏆 | Overachiever | Scored 85%+ |
| streak_3 | 🔥 | On Fire | 3-day streak |
| streak_7 | 💎 | Consistent | 7-day streak |
| flash_master | ⚡ | Flash Master | Completed all daily lessons in a track |
| card_sharp | 🃏 | Card Sharp | 30+ flashcards mastered |
| ace | 🎯 | The Ace | 60+ flashcards mastered |
| arch_initiate | 🏗️ | Arch Initiate | 1 architecture scenario done |
| arch_master | 🌐 | Cloud Architect | All architecture scenarios done |
| quiz_complete | 📝 | Active Learner | 1 library mini-quiz done |
| scholar | 📚 | Scholar | 10+ library mini-quizzes done |

---

## Technical Notes
- Platform: 100% offline, local HTML/JS/CSS. No CDN, no internet required. `www/` is the Capacitor webDir — that's what ships to Android, not the project root.
- PowerShell: use semicolons not `&&` for chaining commands
- Node scripts: write to file then run — avoid backtick template literals in `node -e "..."`
- `app.init()` must NOT be called on index.html (causes stale DOM injection from renderScenarios etc.)
- gym.html is self-contained with its own `gym{}` object — does not use `app{}` for flashcards
- sprint.html uses scrum.js for Kanban board logic only
- daily.html is self-contained with its own `daily{}` object
- arena.html patches `app.startExam` to also start the timer
- When testing locally, watch for browser caching of `www/*.js`/`*.css` across reloads on the same dev-server port — a plain reload can silently serve a stale script even after the file on disk changed. Bumping the local server's port forces a clean fetch.

---

## Audio Lectures (`notebooklm_exports/`)
One Markdown transcript per module (47, one per `courses/*.js` module — regenerate with `npm run export-notebooklm`, which runs `www/courses/build-notebooklm-exports.js` against the live course data). Each file opens with a system note framing NotebookLM's Audio Overview hosts as senior-mentor-style teachers who must lean on the site's established analogies (Mammoth Capital, Proxmox, pfSense) and, critically, are told never to alter a specific fact, number, or step order — followed by the module's actual lesson prose with its anchor/tip callouts pulled out as clearly labeled lines.

**Rebuild this whenever course content changes** — it went stale for a full session (24 files covering only the original AWS/Sales/Scrum modules, zero of the 23 CompTIA modules added later) before anyone noticed, because nothing regenerates it automatically. The old generator (`export_notebooklm.js`, removed) read a `data.js` file that no longer exists and detected course boundaries with hardcoded module-index ranges — the same "position instead of stable identity" bug fixed everywhere else; the new one reads `courses/*.js` directly via each module's real `courseId`.

**Is NotebookLM the right tool for this?** Worth being honest about the trade-off rather than assuming yes:
- **Good fit for**: building intuition and hearing concepts explained conversationally on a commute/workout — genuinely engaging, free, and it already matches the established teaching voice when fed these transcripts.
- **Weak fit for**: exam-accurate drilling. Audio Overview hosts summarize and riff in their own words rather than reading verbatim — for content where the exact number matters (a port, a domain weight percentage, an exact step order), there's real drift/hallucination risk despite the system note's explicit "never alter a specific detail" instruction, which is a strong request, not a guarantee.
- **Operational friction**: no batch API as of this writing — each module (or course, if grouped) has to be uploaded and "Generate Audio" clicked manually in the NotebookLM UI, one at a time, and re-running produces a different conversation each time with no version tracking against source changes.
- **Alternative worth considering**: a straight TTS narration of the actual lesson prose (already written in the site's voice, not dry textbook copy) would be immune to the drift risk and could be scripted end-to-end with no manual UI clicking — but needs a TTS API/service, which isn't set up here.

**Recommendation**: keep NotebookLM for the conceptual/intuition pass, but don't treat its audio as authoritative for exact facts close to exam day — go back to the actual Library lesson for that.

---

## Open Items / Roadmap
| Priority | Item |
|---|---|
| Low | PSM I exam bank is 60 questions (expanded from 40 on 2026-09-03), still short of the real exam's 80 — expand further if it's still feeling thin in practice |
| Low | CompTIA Security+ successor SY0-801 previews ~Oct 2026, GA ~Nov 2026 — re-audit Security+ content once its objectives publish (headline addition: AI/LLM security coverage) |
| Phase 3 | Capacitor wrapper polish for iOS/Android App Store submission |
| Done | NotebookLM audio overviews — **all 47/47 modules confirmed done as of 2026-09-13** (verified directly in the NotebookLM UI, not assumed). A prior session had wrongly claimed "all done" without checking; this time every module was individually confirmed via the Studio panel's Play/Interactive-mode controls before being marked complete.
