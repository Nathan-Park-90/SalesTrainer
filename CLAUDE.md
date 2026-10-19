# Mammoth Academy — Project Memory

**Read `MEMORY.MD` in this same folder first.** That file is the real, actively-maintained
project memory (brand, file structure, architecture, conventions) — this `CLAUDE.md` exists
only so Claude Code auto-loads it at session start and knows to go read `MEMORY.MD`, since
Claude Code's auto-load convention looks for `CLAUDE.md` specifically, not `MEMORY.MD`.

Keep updating `MEMORY.MD` going forward (that's the file with the real content and the
"last updated" line). If this project's memory ever gets consolidated, merge `MEMORY.MD`'s
content into this file directly rather than maintaining two files.

**Oct 6, 2026: Mammoth mode.** Every `www/*.html` loads `mammoth/mammoth-mode.js` (hidden retro theme: Konami code or 5 taps
on the logo). The `www/mammoth/` folder is a copy; the source is MammothCapitalSite `site/mammoth/` + `tools/sync-mammoth.py`.
Service worker cache is `mammoth-academy-v7` (Oct 19, 2026). Sync & Backup: `www/sync.js`; CompTIA PBQ Lab: `www/pbq.js` (see MEMORY.MD). Deploy steps are in Nathan's private notes (MammothCapitalSite CLAUDE.md, "Mammoth Academy operations").
