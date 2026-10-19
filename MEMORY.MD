## MAMMOTH ACADEMY — Memory Log
Last updated: 2026-10-19

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
- `meta.examFormat` (Oct 18, 2026): `{ questions, passLabel, blueprint: [{domain, label, weight}], modes?: [{id, name, passThreshold, passLabel, questions, minutes, blueprint, parts?}] }`. `blueprint[].domain` must match the bank's `q.domain` tags; the Arena samples by these weights. A+ uses `modes` (core1 / core2 / combined; combined has `parts` so it passes only if BOTH cores clear their own bar). Written by a script, not by hand; Cloud+ uses the CV0-004 six-domain blueprint (incl. DevOps Fundamentals 10%), NOT the CV0-003 one.
- `exam[]` items: `{ q, opts, ans, domain, exp (PSM: explanation), whyWrong }`. `ans` is a number, or an **array for multi-response** ("(Choose TWO.)"; graded all-or-nothing). `whyWrong` is aligned with `opts`, `""` at correct indices (shown as "Trap:" lines in the results autopsy). Every one of the 272 questions has it.
- `daily[]` lessons: exactly 3 slides `{title, body (strong/em only), anchor}` + 5 quiz Qs. One lesson per module for CompTIA and Sales (Sales track key `sales`).
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
| st_highscore_<examKey> | int | Best raw score on a FULL-length run (read by Home/Smart Path as score / min(bank, 65)); single-core A+ runs don't write it |
| st_highscore_pct_<examKey> | float string | Best percentage from any run/mode (Oct 18); Home and Smart Path prefer it. Written on a first attempt even at 0% |
| st_exam_practice | '1'/'0' | Arena Practice mode toggle (instant feedback) vs. real exam rules |
| st_failed_qs | array | Question texts missed in the Arena (drawn first next time) |
| st_pbq_<pbqId> | float string | Best score (0-1) on that CompTIA PBQ (pbq.js); Smart Path counts 80%+ as passed; Sync merges by max |
| ma_sync_undo | object | Snapshot taken right before the last Sync & Backup import (powers "Undo it"). Deliberately NOT `st_`-prefixed so it is never exported |
| st_domain_perf_<examKey> | object | Cumulative per-domain correct/total from the Arena, feeds Smart Path's weakest domain |
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

---

## Study coach: Jake drills Nathan in Discord (Sep 28, 2026)
**Why:** Nathan built all of this but wasn't opening the app. Motivation fix = bring the questions to him via Jake
(FamilyOS on Nathan's home server), not more features inside the app. Decisions (Nathan): **one track at a time: AWS SAA-C03**;
**daily round at 20:00**; **study streak shown on the family kiosk** so the kids can cheer him on.
- `www/courses/build-study-bank.js` exports every course to `study_bank/<course-id>.json` (MC exam + lesson-quiz
  questions, flashcards; ids = hash of the question text). **Rebuild + copy to the study coach whenever
  course content changes:** `node www/courses/build-study-bank.js` then
  (the copy command is in Nathan's private notes: MammothCapitalSite CLAUDE.md, "Mammoth Academy operations").
- FamilyOS `study_coach.py` (Leitner spaced repetition in family_rag.sqlite `study_cards`/`study_answers`, streak =
  days with >= 5 answers) + `discord_micromanager.py` (`study_loop`: 20:00 round, 20:40 one nudge if skipped, 00:05
  kiosk refresh; reactions answer; commands **quiz me** / **study stats** / **stop studying**). Switch track with
  env `STUDY_TRACK` (e.g. `comptia-securityplus`) in FamilyOS `.env`, then restart the bot.
- Kiosk tile via ParkFamilySite `api/kiosk.php` action `study` (token-only). Jake's briefing mentions the streak.

## Audit of the two Sep 28 plan docs
- `MammothAcademy_Audit_and_Action_Plan.md`: inventory accurate; diagnosis fair; but in-app fun can't fix "not
  opening the app", "XP for trying" rewards busywork (weight XP to correct answers on due/hard cards), and there was
  no single goal/date across 7 tracks. XP/levels/juice/rival = phase 2, and it must sync across devices.
- `MammothAcademy_Discord_Integration_Gameplan.md`: right idea, built (see above) with fixes: FamilyOS can't read
  the desktop folder (JSON export instead), Jake runs Qwen3.8-27B not 8B, a fixed daily slot instead of random
  heartbeat ambushes (ping limits), multiple-choice reactions instead of LLM-graded free text, and the XP sync
  needs a real host.
- **Progress is per-browser localStorage**, so phone/PC progress differ; cross-device sync is the prerequisite for
  the XP layer. `Code/Mammoth/CompTIAplus/` is an exact copy of this repo (same git HEAD) - ask Nathan before touching it.

## Next (not built yet)
- "Hey Jake, quiz me" by voice (kiosk / voice page) using the same bank + study_coach.
- Phase 2 in-app: XP/levels from correct answers (incl. Discord/voice), sounds/confetti, rival, cross-device sync
  (needs the academy's hosting details from Nathan).
- Set a target exam date for AWS SAA-C03 and put it on the family calendar.

## Hosting (Sep 29, 2026)
- **New home: `academy.mammothcapital.site`**, served from Nathan's home server. `www/` is copied to
  the server and served by the portfolio's web server; see `Desktop\Code\Mammoth\MammothCapitalSite\CLAUDE.md`
  + `nginx/portfolio.conf`. **Re-copy `www/` after every app change:**
  (deploy command: private notes, "Mammoth Academy operations")
  (bump `CACHE_NAME` in `sw.js` so installed copies update).
- The subdomain goes live once the Cloudflare wildcard route `*.mammothcapital.site` exists. Until then the old host
  **learncenter.online** (on a *second* Hostinger account/plan that Nathan manages) still serves the app. That domain
  (GoDaddy) **expires Nov 23, 2026**: move everything before then and let it lapse.
- Case study: `https://mammothcapital.site/academy`.
- Git: this repo's remote is `SalesTrainer` and it's **4 commits ahead and unpushed**. `Code/Mammoth/CompTIAplus` is another
  clone of the same repo that has diverged (2 commits). Ask Nathan which is canonical before pushing either.

## Session Oct 18, 2026 (Claude Code): parity fixes, Arena exam mode, real Daily Flash content
Live at academy.mammothcapital.site, service worker v5.
- **Footer**: Ko-fi tip link (`ko-fi.com/nathan_park`) on every page. Mammoth-mode kit re-synced from MammothCapitalSite.
- **Library**: `?course=` with a missing/stale `&title=` now opens that course's Module 1 (used to silently show AWS); unknown course ids fall back to the first course. Bigger "Now Viewing" trigger with a track count and up to 10 one-tap icon badges (capped on purpose, see Library Navigation).
- **Home**: Library card lists every loaded track (generated); Arena card counts exams from data; stats bar always visible with a cold-start "New here? ... Daily Flash" banner when all four stats are zero.
- **Smart Path**: weak domains with no mapped module link to the next unfinished module instead of "undefined"; Cloud+ maps DevOps Fundamentals; Best Exam Score shows % with the pass bar. (The outside report said Cloud+ was missing from Path: it wasn't.)
- **Arena** (app.js exam simulator, CSS in arena.html): testing-center mode (no feedback until submit), flag for review, collapsible question grid, review screen, sticky timer under the navbar that auto-submits (the old inline timer was wiped on every render and crashed on expiry), keyboard (1-9/A-E, F, arrows), leave-page warning, optional Practice mode. Results: verdict vs pass mark, per-official-domain bars, filterable per-question autopsy with Trap lines. Tests: scratch Playwright suites (arena/audit/daily flow), all green.
- **Content** (drafted by agy on Gemini 4 Argon, every answer key reviewed by Claude): 28 Daily Flash lessons (Sales 5, A+ 8, Net+ 5, Sec+ 5, Cloud+ 5) replacing CompTIA placeholders that rendered "undefined"; Scrum lesson anchors were authoring notes and are now real takeaways; `whyWrong` on all 252 old questions + 20 new multi-response questions. Corrections made in review: SY0-701 IR steps (Detection/Analysis, not Identification), an ambiguous implicit-deny question (Net+/Sec+), an MTD-vs-RTO question, KMS FIPS wording, PSM Scrum-Team size and Daily Scrum wording.
- **Study bank** (Jake): multi-response questions are excluded (the coach grades one reaction); PSM explanations were blank in the export (field is `explanation`) and are fixed.
- Banks are still thin vs. real exams (A+ Core 2 has 9 questions; Cloud+ has no Security-domain questions, so the sampler fills those slots from other domains).

## Sync & Backup (Oct 19, 2026) — `www/sync.js`, loaded on every page
Moves progress between browsers/devices with no server. Opened by the "⇄ SYNC" item sync.js injects into the navbar,
the "⇄ Sync & Backup" footer link, or `#sync` on any URL. CSS at the end of style.css.
- **What's exported:** every `st_*` key plus `mammoth.mode` / `mammoth.unlocked`, values copied as raw strings (no
  renaming, so courseId/localIdx/flashcard-id keys survive). Payload `{app:"mammoth-academy", version:1, exportedAt,
  keyCount, checksum (CRC-32 of the sorted key/value list), keys}`.
- **Sync Code:** `MA1z.` + Base64URL(deflate-raw(JSON)) via CompressionStream; `MA1j.` = uncompressed fallback. Raw
  JSON pastes are accepted too. **File:** `mammoth-academy-backup-YYYY-MM-DD.json` (download hidden in the Capacitor
  app, where downloads don't work; it says to use the code).
- **Validation before anything is written:** app id, version (newer = "reload to update"), only our keys, string values,
  list keys parse as arrays, checksum. A truncated or edited code says so in plain words.
- **Smart Merge:** union for st_fc_mastered / st_badges / st_sales_solved / st_arch_done_ids / st_completed /
  st_failed_qs; st_quiz_* done if either; max for st_highscore* / st_daily_day_* / st_streak / st_arch_completed;
  most recent st_last_daily; st_domain_perf_* keeps the larger sample per domain (summing would double-count on a
  repeat merge); preferences stay this device's. Idempotent: values are only rewritten when the merge changes them.
  **Overwrite** needs a confirm tick and replaces only our keys (other apps' keys on the origin are untouched).
  Every import saves an undo snapshot first.
- Also fixed that day: the First Blood / Passing Grade / Overachiever badges read `st_highscore`, which nothing has
  written since exams split per course, so they could never unlock; they now use the best `st_highscore_pct_*`.
  The Arena runs the badge check after each exam. The service worker now precaches sync.js and all 7 course packs
  (the 4 CompTIA packs were missing, so those tracks weren't fully offline). Cache v6.
- Tests: scratch Playwright `sync_test.py` (two separate browser profiles, every merge rule, idempotency, undo,
  overwrite, file restore, 9 kinds of bad input, uncompressed fallback, phone layout): all pass.

## CompTIA PBQ Lab (Oct 19, 2026) — `www/pbq.js`, Gym tab "🧪 CompTIA PBQ Lab" (`gym.html#pbq`)
- Content lives in each CompTIA pack's `pbq` array (3 per track, 12 total); course-loader merges them into `DATA.pbq`
  tagged with courseId. PBQ: `{id, title, brief (HTML), context?{title, body (escaped pre)}, parts[], solution}`.
  Part kinds: `grid` (rows × select/text columns; per-row `options` override; `detail` = escaped terminal/log text;
  answers by option text, text answers normalized for case/spaces/"/nn"), `order` (`items` correct order, `start`),
  `acl` (`objects` name→CIDR, `rules` starting table, `flows` with expected Permit/Deny; graded by simulating each
  flow: first match wins, Disabled rows skipped, implicit deny). Partial credit per cell/item/flow.
- Source of truth for the 12 PBQs was a scratch `pbq-data.js` injected by script; to change one, edit the pack JSON
  (or regenerate). Every answer key was verified end-to-end: entered through the real UI it scores 100%; blank or
  the shipped broken ACL scores under 50%.
- Smart Path shows "PBQ Labs passed (80%+) x / 3" on CompTIA cards and points the CTA at the PBQs once modules are
  done. Home Gym card counts PBQs.
- **Architecture Lab fixes (same day):** the 4 CompTIA `arch` labs were authored in another shape
  (`zones[].accepts` ids, palette objects, answer map in `dm`) and rendered "[object Object]", threw on click and
  passed with an empty board. Converted to the renderer's shape (`zones[].label/needed`, palette strings, `dm` =
  decoy → message) and retitled "<Track> Lab: …". Also fixed a bug in all labs: clicking a filled zone landed on a
  chip and REMOVED it instead of placing the selected service (chip clicks now stopPropagation and place when a
  service is selected). Note `st_arch_done_ids` is keyed by position in DATA.arch (AWS 0-4, then CompTIA by script
  load order): don't reorder course scripts.
- Tests: scratch `pbq_test.py` (all 12 PBQs scored through the UI, ACL simulation cases, partial credit, Smart
  Path/Home counts, Sync merge, all 9 arch labs solvable and empty boards rejected, phone layout). Cache v7.

## Deploys and Cloudflare's edge cache (Oct 19, 2026) — run `npm run stamp` before every deploy
Cloudflare caches .js/.css at its edge for 4 hours (origin sends no Cache-Control) but not HTML, so a deploy served new
pages with old scripts (the PBQ tab loaded with yesterday's course-loader.js and showed nothing). `tools/stamp-assets.js`
rewrites every local script/stylesheet reference in www/*.html to `?v=<yyyymmddhhmm>`; new URLs per deploy can't be
stale. The service worker serves its offline cache with `ignoreSearch`, so stamped URLs work offline (tested). There is
no Cloudflare API token (GODMODE says so), so purging needs the dashboard; stamping makes that unnecessary.

## Study tools (Oct 19, 2026): cram sheets, lesson diagrams, audio lecture bar
- **Cram Sheets** (`www/cram.js`, library + gym; floating "⚡ Cram Sheets" button, `#cram` opens it): searchable
  drawer with Ports & Protocols, a COMPUTED CIDR /16–/32 matrix (never hand-type masks), Wi-Fi/copper/fiber,
  AWS hard limits + S3 classes + EBS types, and ordered processes (A+ 6-step and Network+ 7-step troubleshooting,
  malware removal, laser imaging, SY0-701 / PICERL / NIST IR, Scrum events). Searching shows which other sheets match.
- **Diagrams** (`www/diagrams.js`): inline themed SVGs `aws-vpc`, `aws-dr`, `osi`, `zero-trust`; a topic opts in with
  `diagrams: [id]` in its pack (AWS M3 topics 2-3, AWS M12 topic 1, Net+ M1, Sec+ M1). "⤢ Expand" opens a full-screen
  view (the lesson column is ~460 px on desktop). The study test checks no label is clipped or overlapping.
- **Audio lecture bar** (`www/lecture.js`, top of every Library lesson): Read-aloud via the device's speechSynthesis
  reads the EXACT lesson text in sentence chunks (offline with on-device voices), section indicator + highlight,
  1×/1.25×/1.5×/2×, prev/next section, Auto-next into the following topic. Episode mode plays NotebookLM Audio
  Overviews listed in `www/audio/manifest.json` (`{courseId: {moduleLocalIdx: {file, title}}}`, currently `{}`):
  **the episodes are still only inside NotebookLM (Nathan, Oct 19); download them, drop them in www/audio/, add
  manifest entries.** "Save offline" puts one in the `mammoth-audio` cache, which the service worker keeps across
  version bumps and serves offline; it never caches audio by accident. Inside the Android app, audio streams from
  the site. Prefs `ma_lecture_*` are device-only (not st_, so not synced).
- **Text fix:** 22 question marks in AWS/PSM/Sales content had been turned into em dashes ("What do you do—");
  restored (incl. 3 AWS exam questions and 2 flashcards; study bank rebuilt).
- Layout fix: `.lesson-canvas` needs `min-width: 0` (grid item) or wide content pushes phones sideways.
- Screenshot tip: the fixed `#particle-canvas` makes headless Chrome captures come out black at random; hide it in
  test screenshots. Tests: scratch `study_test.py` (fake speechSynthesis records what would be spoken).

## Track Expansion Engine, run 1: AWS SAA-C03 (Oct 19, 2026)
Nathan's "Prompt 6" (one track at a time, order: AWS → Sec+ → Net+ → A+ Core 1/2 → Cloud+/PSM). AWS is done:
**54 lessons (+13), 92 flashcards (+55), 213 exam questions (+120: Secure 36, Cost 24, Resilient 31, Performance 29;
24 multi-response)**, 3 Check-Your-Understanding questions on every lesson (28 older lessons got theirs). All existing
module/lesson/question ids kept (progress + Discord quiz unaffected); new flashcard ids continue from the max.
- Drafted by agy (gemini-4-argon-high) in per-job worktrees, then **every answer key reviewed** and fact-fixed
  before merging: gp3 limits (raised by AWS in 2025: don't quote 16,000 IOPS), "hundreds of" CloudFront edge locations,
  Snowcone/Snowmobile retired, Elastic IPs billed since 2024, ALB cross-zone can be turned off, gp2 caps at 250 MB/s,
  EBS volumes can't shrink, single-Region KMS keys can't become Multi-Region, NLB TLS listeners don't keep client IPs.
- Merge tool + fix scripts live in the session scratchpad (`merge-expansion.js <pack> <draftsDir> [--write]`: validates
  shapes, domains, "(Choose TWO.)" + 5 options for multi-response, then appends). Re-use it for the next track.
- Lecture bar (same day): voice menu; default is an American male voice (Nathan doesn't want British voices).
- SW cache `mammoth-academy-v11`. Study bank rebuilt; **Jake (VM 103) was unreachable, copy it when it's back.**
