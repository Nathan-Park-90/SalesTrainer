#!/usr/bin/env python3
"""
Playwright acceptance suite for Mammoth Academy F1 (active track lock) + F5 (homepage next-question card).
Run:
    python tools/test-home.py
    python tools/test-home.py --selftest
"""

from __future__ import annotations

import functools
import http.server
import json
import os
import pathlib
import socket
import sys
import threading
import time
from playwright.sync_api import sync_playwright, Page, BrowserContext

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

ROOT = pathlib.Path(__file__).resolve().parents[1]
WWW = ROOT / "www"
SHOTS_DIR = ROOT / "tools" / "home-shots"

# In-memory bug injection state for --selftest (never touches files on disk)
PLANTED_BUG: str | None = None


class _BugInjectableHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, fmt: str, *args) -> None:  # silence request log
        pass

    def do_GET(self) -> None:
        global PLANTED_BUG
        path_only = self.path.split("?", 1)[0].split("#", 1)[0]
        if PLANTED_BUG == "ignore_due" and path_only.endswith("/home-card.js"):
            raw = (WWW / "home-card.js").read_text(encoding="utf-8")
            patched = raw.replace(
                "const dueExamIds = Game.Review.due(activeId)",
                "const dueExamIds = [] /* PLANTED_BUG: ignore_due */",
            )
            body = patched.encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/javascript; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(body)
            return

        if PLANTED_BUG == "track_not_persisted" and path_only.endswith("/game.js"):
            raw = (WWW / "game.js").read_text(encoding="utf-8")
            patched = raw.replace(
                "set('st_active_track'",
                "void('st_active_track' /* PLANTED_BUG: track_not_persisted */",
            )
            body = patched.encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/javascript; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(body)
            return

        super().do_GET()


def start_server() -> tuple[http.server.ThreadingHTTPServer, str]:
    handler = functools.partial(_BugInjectableHandler, directory=str(WWW))
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("127.0.0.1", 0))
        port = s.getsockname()[1]
    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", port), handler)
    thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    thread.start()
    return httpd, f"http://127.0.0.1:{port}"


def check(cond: bool, msg: str, failures: list[str]) -> None:
    if cond:
        print(f"  ✓ {msg}")
    else:
        print(f"  ✗ FAIL: {msg}")
        failures.append(msg)


def attach_error_listeners(page: Page, console_errors: list[str], page_errors: list[str]) -> None:
    def on_console(m):
        if m.type == "error":
            console_errors.append(f"{page.url}: {m.text}")

    def on_pageerror(e):
        page_errors.append(f"{page.url}: {e}")

    page.on("console", on_console)
    page.on("pageerror", on_pageerror)


def hide_particles(page: Page) -> None:
    page.evaluate(
        """() => {
            const c = document.getElementById('particle-canvas');
            if (c) c.style.display = 'none';
        }"""
    )


def run_check_1_no_errors(browser, base: str, failures: list[str]) -> None:
    print("\n1. No console errors / page errors on index, daily, arena, library, path")
    ctx = browser.new_context(viewport={"width": 1280, "height": 800}, service_workers="block")
    page = ctx.new_page()
    c_err: list[str] = []
    p_err: list[str] = []
    attach_error_listeners(page, c_err, p_err)

    for pg in ["index.html", "daily.html", "arena.html", "library.html", "path.html"]:
        resp = page.goto(f"{base}/{pg}", wait_until="domcontentloaded")
        page.wait_for_timeout(150)
        check(resp is not None and resp.status == 200, f"{pg} HTTP 200", failures)

    check(len(c_err) == 0, f"zero console.error across 5 pages (got {c_err})", failures)
    check(len(p_err) == 0, f"zero pageerror across 5 pages (got {p_err})", failures)
    ctx.close()


def run_check_2_new_visitor(browser, base: str, failures: list[str]) -> None:
    print("\n2. New visitor (empty storage): pitch visible, no #ma-next, hero unchanged")
    ctx = browser.new_context(viewport={"width": 1280, "height": 800}, service_workers="block")
    page = ctx.new_page()
    c_err: list[str] = []
    p_err: list[str] = []
    attach_error_listeners(page, c_err, p_err)

    page.goto(f"{base}/index.html", wait_until="domcontentloaded")
    state = page.evaluate(
        """() => {
            const pitch = document.getElementById('ma-pitch');
            const next = document.getElementById('ma-next');
            const hero = document.querySelector('.ma-hero');
            const sub = document.querySelector('.ma-subtitle');
            const title = document.querySelector('h1.ma-title');
            return {
                pitchVisible: !!(pitch && getComputedStyle(pitch).display !== 'none' && pitch.offsetHeight > 0),
                hasNext: !!next,
                heroReturning: !!(hero && hero.classList.contains('is-returning')),
                subVisible: !!(sub && getComputedStyle(sub).display !== 'none' && sub.offsetHeight > 0),
                titleFontSize: title ? parseFloat(getComputedStyle(title).fontSize) : 0,
                activeFirst: document.querySelector('#ma-tracks-grid .ma-track-card')?.getAttribute('data-track'),
                hasSwitchDrawer: !!document.querySelector('#ma-tracks-grid details.ma-switch')
            };
        }"""
    )
    check(state["pitchVisible"], "#ma-pitch is visible for new visitor", failures)
    check(not state["hasNext"], "#ma-next is absent for new visitor", failures)
    check(not state["heroReturning"], ".ma-hero does not have .is-returning for new visitor", failures)
    check(state["subVisible"], ".ma-subtitle is visible for new visitor", failures)
    check(state["titleFontSize"] >= 32, f"h1.ma-title full size ({state['titleFontSize']}px)", failures)
    check(state["activeFirst"] == "aws-saa-c03", "default active track card (aws-saa-c03) is first in #ma-tracks-grid", failures)
    check(state["hasSwitchDrawer"], "<details class='ma-switch'> drawer is present", failures)
    check(len(c_err) == 0 and len(p_err) == 0, "no console/page errors on new visitor index", failures)
    ctx.close()


def run_check_3_seeded_due(browser, base: str, failures: list[str]) -> tuple[BrowserContext, Page, str]:
    print("\n3. Returning visitor with seeded due AWS exam question: #ma-next shows that exact question within 1000ms")
    ctx = browser.new_context(viewport={"width": 1280, "height": 800}, service_workers="block")
    page = ctx.new_page()
    c_err: list[str] = []
    p_err: list[str] = []
    attach_error_listeners(page, c_err, p_err)

    # First load once to inspect a non-first single-answer AWS exam question ID
    page.goto(f"{base}/index.html", wait_until="domcontentloaded")
    seed_info = page.evaluate(
        """() => {
            const examIds = (Game.index().exam.get('aws-saa-c03') || []).filter(id => {
                const e = Game.entry(id);
                return e && e.source === 'exam' && typeof e.q.ans === 'number';
            });
            // Pick index 7 (non-first so fallback to index 0 would never accidentally match)
            const targetId = examIds[7] || examIds[1] || examIds[0];
            const entry = Game.entry(targetId);
            localStorage.clear();
            const rev = {};
            rev[targetId] = { b: 1, t: 1700000000, due: '2020-01-01', n: 2, r: 1, m: 1 };
            localStorage.setItem('st_review', JSON.stringify(rev));
            return { targetId, qText: entry.q.q };
        }"""
    )
    target_id = seed_info["targetId"]

    # Reload and measure visibility timing relative to navigation start (performance.now())
    page.goto(f"{base}/index.html", wait_until="domcontentloaded")
    result = page.evaluate(
        """() => {
            const sec = document.getElementById('ma-next');
            const qEl = document.getElementById('ma-next-q');
            const stats = document.getElementById('ma-stats');
            const pitch = document.getElementById('ma-pitch');
            const hero = document.querySelector('.ma-hero');
            const sub = document.querySelector('.ma-subtitle');
            const visible = !!(sec && !sec.hidden && sec.offsetHeight > 0 && qEl && qEl.offsetHeight > 0);
            const elapsedMs = performance.now();
            const aboveStats = !!(sec && stats && (sec.compareDocumentPosition(stats) & Node.DOCUMENT_POSITION_FOLLOWING));
            return {
                visible,
                elapsedMs,
                shownQid: sec ? sec.getAttribute('data-qid') : null,
                shownHtml: qEl ? qEl.innerHTML : '',
                aboveStats,
                pitchHidden: !!(pitch && getComputedStyle(pitch).display === 'none'),
                heroCollapsed: !!(hero && hero.classList.contains('is-returning') && sub && getComputedStyle(sub).display === 'none')
            };
        }"""
    )

    check(result["visible"], "#ma-next card is visible", failures)
    check(result["elapsedMs"] <= 1000, f"#ma-next visible within 1000ms of nav start ({result['elapsedMs']:.1f}ms)", failures)
    check(result["shownQid"] == target_id, f"#ma-next shows seeded due question ({result['shownQid']} == {target_id})", failures)
    check(result["aboveStats"], "#ma-next is placed above #ma-stats", failures)
    check(result["pitchHidden"], "#ma-pitch is hidden for returning visitor", failures)
    check(result["heroCollapsed"], "hero is collapsed (.is-returning, subtitle hidden) for returning visitor", failures)
    check(len(c_err) == 0 and len(p_err) == 0, "no console/page errors on returning visitor load", failures)
    return ctx, page, target_id


def run_check_4_answer_right_and_wrong(page: Page, target_id: str, failures: list[str]) -> None:
    print("\n4. Answer right -> record n +1 & Game.Day.today().a +1; answer wrong on another card -> wrong styling + record b == 0")
    before = page.evaluate(
        """(qid) => {
            window.__juiceCalls = [];
            window.__intelCalls = [];
            window.Juice = { fire: (ev, el) => window.__juiceCalls.push({ ev, hasEl: !!el }) };
            window.Intel = { open: (arg) => window.__intelCalls.push(arg) };
            return {
                rec: Game.Review.get(qid),
                dayA: Game.Day.today().a,
                ans: Game.entry(qid).q.ans
            };
        }""",
        target_id,
    )
    ans_idx = before["ans"]
    page.locator(f"#ma-next-opts .ma-next-opt[data-idx='{ans_idx}']").click()

    after_right = page.evaluate(
        """(qid) => {
            const sec = document.getElementById('ma-next');
            const card = document.getElementById('ma-next-card');
            const fb = document.getElementById('ma-next-feedback');
            const btns = Array.from(document.querySelectorAll('#ma-next-opts .ma-next-opt'));
            return {
                rec: Game.Review.get(qid),
                dayA: Game.Day.today().a,
                allDisabled: btns.every(b => b.disabled),
                hasRightClass: !!(card && card.classList.contains('right')),
                fbVisible: !!(fb && !fb.hidden && fb.textContent.trim().length > 0),
                progText: document.getElementById('ma-next-progress')?.textContent,
                juiceCalls: window.__juiceCalls.slice(),
                intelCalls: window.__intelCalls.length
            };
        }""",
        target_id,
    )
    check(after_right["rec"]["n"] == before["rec"]["n"] + 1, f"right answer increments record.n ({before['rec']['n']} -> {after_right['rec']['n']})", failures)
    check(after_right["dayA"] == before["dayA"] + 1, f"right answer increments Game.Day.today().a ({before['dayA']} -> {after_right['dayA']})", failures)
    check(after_right["allDisabled"], "option buttons locked after answering", failures)
    check(after_right["hasRightClass"], "card has .right styling after right answer", failures)
    check(after_right["fbVisible"], "explanation feedback shown after right answer", failures)
    check(len(after_right["juiceCalls"]) == 1 and after_right["juiceCalls"][0]["ev"] == "correct" and after_right["intelCalls"] == 0, "Juice.fire('correct', card) called when window.Juice is present", failures)

    # Click "Next" to load another card and answer wrong
    page.locator("#ma-btn-next").click()
    next_info = page.evaluate(
        """() => {
            const qid = document.getElementById('ma-next')?.getAttribute('data-qid');
            const entry = Game.entry(qid);
            const ans = entry.q.ans;
            const wrongIdx = ans === 0 ? 1 : 0;
            return { qid, ans, wrongIdx };
        }"""
    )
    check(next_info["qid"] != target_id, f"Next button loaded a different question ({next_info['qid']} != {target_id})", failures)
    page.locator(f"#ma-next-opts .ma-next-opt[data-idx='{next_info['wrongIdx']}']").click()

    after_wrong = page.evaluate(
        """(info) => {
            const card = document.getElementById('ma-next-card');
            const chosenBtn = document.querySelector(`#ma-next-opts .ma-next-opt[data-idx='${info.wrongIdx}']`);
            const rec = Game.Review.get(info.qid);
            const lastJuice = window.__juiceCalls[window.__juiceCalls.length - 1];
            const lastIntel = window.__intelCalls[window.__intelCalls.length - 1];
            delete window.Juice;
            delete window.Intel;
            return {
                rec,
                cardWrong: !!(card && card.classList.contains('wrong')),
                btnWrong: !!(chosenBtn && chosenBtn.classList.contains('wrong')),
                shakeClass: !!(card && card.classList.contains('shake')),
                lastJuice,
                lastIntel: lastIntel ? { chosen: lastIntel.chosen, courseId: lastIntel.courseId, hasQ: !!lastIntel.q } : null
            };
        }""",
        next_info,
    )
    check(after_wrong["cardWrong"] and after_wrong["btnWrong"], "wrong answer applies .wrong styling to card and chosen option", failures)
    check(after_wrong["shakeClass"], "wrong answer applies .shake class (translate property)", failures)
    check(after_wrong["rec"] is not None and after_wrong["rec"]["b"] == 0, f"wrong answer resets record.b to 0 (got {after_wrong['rec']})", failures)
    check(
        after_wrong["lastJuice"] is not None and after_wrong["lastJuice"]["ev"] == "miss"
        and after_wrong["lastIntel"] == {"chosen": next_info["wrongIdx"], "courseId": "aws-saa-c03", "hasQ": True},
        "Juice.fire('miss', card) and Intel.open({q, chosen, courseId}) called on miss when present",
        failures,
    )


def run_check_5_five_more(page: Page, failures: list[str]) -> None:
    print("\n5. '5 more' answers 5 cards with no immediate repeat; then summary shows")
    prev_qid = page.evaluate("() => document.getElementById('ma-next')?.getAttribute('data-qid')")
    page.locator("#ma-btn-five").click()

    seen_qids: list[str] = []
    immediate_repeat = False
    goal_celebrated = False

    for step in range(5):
        q_info = page.evaluate(
            """() => {
                const qid = document.getElementById('ma-next')?.getAttribute('data-qid');
                const entry = Game.entry(qid);
                return { qid, ans: entry.q.ans };
            }"""
        )
        qid = q_info["qid"]
        if step == 0 and qid == prev_qid:
            immediate_repeat = True
        if seen_qids and seen_qids[-1] == qid:
            immediate_repeat = True
        seen_qids.append(qid)

        # Answer right on 4 of them, wrong on 1
        pick_idx = q_info["ans"] if step != 2 else (1 if q_info["ans"] == 0 else 0)
        page.locator(f"#ma-next-opts .ma-next-opt[data-idx='{pick_idx}']").click()

        goal_state = page.evaluate(
            """() => {
                const g = document.getElementById('ma-next-goal');
                return {
                    goalShown: !!(g && !g.hidden && g.textContent.includes('Daily minimum hit')),
                    justHitFlag: Game.Day.justHitGoal
                };
            }"""
        )
        if goal_state["goalShown"]:
            goal_celebrated = True
            check(goal_state["justHitFlag"] is False, "Game.Day.justHitGoal reset to false after celebration", failures)

        if step < 4:
            page.locator("#ma-btn-next").click()

    summary_state = page.evaluate(
        """() => {
            const sumEl = document.getElementById('ma-next-summary');
            return {
                exists: !!sumEl,
                text: sumEl ? sumEl.textContent.trim() : ''
            };
        }"""
    )
    check(len(seen_qids) == 5, f"answered 5 questions in '5 more' set ({len(seen_qids)})", failures)
    check(not immediate_repeat, f"no immediate question repeat across '5 more' ({seen_qids})", failures)
    check(goal_celebrated, "'Daily minimum hit' note appeared on 5th answer of the day", failures)
    check(
        summary_state["exists"] and "4 / 5 right" in summary_state["text"] and "🔥" in summary_state["text"],
        f"summary shown after 5 cards: '{summary_state['text']}'",
        failures,
    )


def run_check_6_switch_track(page: Page, base: str, failures: list[str]) -> None:
    print("\n6. Making Scrum active via drawer -> Game.Track.get() changes, card belongs to Scrum, persists on reload, daily.html & arena.html follow")
    # Open the <details class="ma-switch"> drawer and click "Make active" on psm-scrum
    drawer = page.locator("#ma-tracks-grid details.ma-switch")
    drawer.locator("summary").click()
    btn = drawer.locator("button.ma-make-active[data-track='psm-scrum']")
    btn.click()

    after_switch = page.evaluate(
        """() => {
            const activeTrack = Game.Track.get();
            const firstGridCard = document.querySelector('#ma-tracks-grid .ma-track-card');
            const firstGridTrack = firstGridCard ? firstGridCard.getAttribute('data-track') : null;
            const hasActiveTag = !!(firstGridCard && firstGridCard.querySelector('.ma-track-active-tag'));
            const cardQid = document.getElementById('ma-next')?.getAttribute('data-qid');
            const cardEntry = cardQid ? Game.entry(cardQid) : null;
            return {
                activeTrack,
                firstGridTrack,
                hasActiveTag,
                cardCourseId: cardEntry ? cardEntry.courseId : null
            };
        }"""
    )
    check(after_switch["activeTrack"] == "psm-scrum", f"Game.Track.get() is 'psm-scrum' (got {after_switch['activeTrack']})", failures)
    check(after_switch["firstGridTrack"] == "psm-scrum" and after_switch["hasActiveTag"], "Scrum card is now first in #ma-tracks-grid with 'Active track' tag", failures)
    check(after_switch["cardCourseId"] == "psm-scrum", f"#ma-next question belongs to 'psm-scrum' (got {after_switch['cardCourseId']})", failures)

    # Reload index.html and confirm grid still shows Scrum first
    page.reload(wait_until="domcontentloaded")
    after_reload = page.evaluate(
        """() => {
            const firstGridCard = document.querySelector('#ma-tracks-grid .ma-track-card');
            const cardQid = document.getElementById('ma-next')?.getAttribute('data-qid');
            const cardEntry = cardQid ? Game.entry(cardQid) : null;
            return {
                activeTrack: Game.Track.get(),
                firstGridTrack: firstGridCard ? firstGridCard.getAttribute('data-track') : null,
                cardCourseId: cardEntry ? cardEntry.courseId : null
            };
        }"""
    )
    check(after_reload["activeTrack"] == "psm-scrum" and after_reload["firstGridTrack"] == "psm-scrum", "after reload, #ma-tracks-grid still shows psm-scrum first", failures)
    check(after_reload["cardCourseId"] == "psm-scrum", "after reload, #ma-next still shows a psm-scrum question", failures)

    # Also verify a track with no exam questions (sales-engineering) falls back to lesson-quiz questions
    sales_pick = page.evaluate(
        """() => {
            const e = HomeCard.pickQuestion('sales-engineering', null);
            return e ? { courseId: e.courseId, source: e.source } : null;
        }"""
    )
    check(sales_pick == {"courseId": "sales-engineering", "source": "lesson"}, f"sales-engineering (no exam bank) falls back to lesson-quiz questions (got {sales_pick})", failures)

    # Navigate to daily.html -> should open on Scrum's dailyTrackKey ('scrum')
    page.goto(f"{base}/daily.html", wait_until="domcontentloaded")
    daily_track = page.evaluate("() => daily.activeTrack")
    check(daily_track == "scrum", f"daily.html opens on active track's dailyTrackKey 'scrum' (got {daily_track})", failures)

    # Navigate to arena.html -> should list Scrum's exam card first with 'Active track' tag
    page.goto(f"{base}/arena.html", wait_until="domcontentloaded")
    arena_first = page.evaluate(
        """() => {
            const firstCard = document.querySelector('#gauntlet-btn-container .exam-card');
            return {
                course: firstCard ? firstCard.getAttribute('data-course') : null,
                text: firstCard ? firstCard.textContent : '',
                hasActiveTag: !!(firstCard && firstCard.querySelector('.exam-active-tag'))
            };
        }"""
    )
    check(
        arena_first["course"] == "psm-scrum" and arena_first["hasActiveTag"],
        f"arena.html lists Scrum exam card first with 'Active track' tag (got course={arena_first['course']})",
        failures,
    )

    # Also verify library.html and path.html respect active track and deep-link override
    page.goto(f"{base}/library.html", wait_until="domcontentloaded")
    lib_default = page.evaluate(
        """() => {
            const firstRow = document.querySelector('#course-menu-panel .course-menu-row');
            return {
                activeCourseFilter: app.state.activeLibraryTab,
                firstRowCourse: firstRow ? firstRow.getAttribute('data-course') : null
            };
        }"""
    )
    check(lib_default["activeCourseFilter"] == "psm-scrum", f"library.html selects active track 'psm-scrum' by default (got {lib_default['activeCourseFilter']})", failures)
    check(lib_default["firstRowCourse"] == "psm-scrum", f"library.html course switcher lists 'psm-scrum' first (got {lib_default['firstRowCourse']})", failures)

    page.goto(f"{base}/library.html?course=aws-saa-c03", wait_until="domcontentloaded")
    lib_deeplink = page.evaluate("() => app.state.activeLibraryTab")
    check(lib_deeplink == "aws-saa-c03", f"library.html deep link ?course=aws-saa-c03 wins over active track (got {lib_deeplink})", failures)

    page.goto(f"{base}/path.html", wait_until="domcontentloaded")
    path_first = page.evaluate("() => document.querySelector('#path-tracks .path-card')?.getAttribute('data-course')")
    check(path_first == "psm-scrum", f"path.html renders active track 'psm-scrum' first (got {path_first})", failures)

    page.goto(f"{base}/path.html?course=aws-saa-c03", wait_until="domcontentloaded")
    path_deeplink = page.evaluate("() => document.querySelector('#path-tracks .path-card')?.getAttribute('data-course')")
    check(path_deeplink == "aws-saa-c03", f"path.html deep link ?course=aws-saa-c03 wins over active track (got {path_deeplink})", failures)


def run_check_7_viewports_and_screenshots(browser, base: str, failures: list[str]) -> None:
    print("\n7. 360x800 and 1280x800: scrollWidth <= innerWidth; save screenshots (new + returning, both sizes) to tools/home-shots/")
    SHOTS_DIR.mkdir(parents=True, exist_ok=True)

    for visitor_mode in ["new", "returning"]:
        for w, h in [(360, 800), (1280, 800)]:
            ctx = browser.new_context(viewport={"width": w, "height": h}, service_workers="block")
            page = ctx.new_page()
            page.goto(f"{base}/index.html", wait_until="domcontentloaded")
            if visitor_mode == "returning":
                page.evaluate(
                    """() => {
                        const examIds = Game.index().exam.get('aws-saa-c03') || [];
                        const qid = examIds[3] || examIds[0];
                        localStorage.setItem('st_review', JSON.stringify({
                            [qid]: { b: 1, t: 1700000000, due: '2020-01-01', n: 3, r: 2, m: 1 }
                        }));
                        localStorage.setItem('st_streak', '4');
                    }"""
                )
                page.reload(wait_until="domcontentloaded")

            hide_particles(page)
            page.wait_for_timeout(100)

            dims = page.evaluate(
                """() => ({
                    scrollWidth: document.documentElement.scrollWidth,
                    innerWidth: window.innerWidth
                })"""
            )
            check(
                dims["scrollWidth"] <= dims["innerWidth"],
                f"{visitor_mode} @ {w}x{h}: scrollWidth ({dims['scrollWidth']}) <= innerWidth ({dims['innerWidth']})",
                failures,
            )

            shot_path = SHOTS_DIR / f"home-{visitor_mode}-{w}x{h}.png"
            page.screenshot(path=str(shot_path), full_page=False)
            check(shot_path.exists() and shot_path.stat().st_size > 1000, f"saved screenshot {shot_path.name}", failures)
            ctx.close()


def run_check_8_selftest(browser, base: str, failures: list[str]) -> None:
    global PLANTED_BUG
    print("\n8. --selftest: plant two bugs (card ignores due records; track set not persisted) and confirm checks 3 and 6 fail")

    # Bug 1: card ignores due records -> check 3 must fail
    PLANTED_BUG = "ignore_due"
    try:
        bug1_failures: list[str] = []
        ctx, _page, _tid = run_check_3_seeded_due(browser, base, bug1_failures)
        ctx.close()
    finally:
        PLANTED_BUG = None

    check(
        len(bug1_failures) > 0 and any("seeded due question" in f for f in bug1_failures),
        f"planted bug 1 (ignore_due) caused check 3 to fail as expected ({bug1_failures})",
        failures,
    )

    # Bug 2: track set not persisted -> check 6 must fail
    PLANTED_BUG = "track_not_persisted"
    try:
        bug2_failures: list[str] = []
        ctx, page, _tid = run_check_3_seeded_due(browser, base, [])
        run_check_6_switch_track(page, base, bug2_failures)
        ctx.close()
    finally:
        PLANTED_BUG = None

    check(
        len(bug2_failures) > 0,
        f"planted bug 2 (track_not_persisted) caused check 6 to fail as expected ({bug2_failures})",
        failures,
    )


def main() -> int:
    httpd, base = start_server()
    failures: list[str] = []
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            run_check_1_no_errors(browser, base, failures)
            run_check_2_new_visitor(browser, base, failures)
            ctx, page, target_id = run_check_3_seeded_due(browser, base, failures)
            run_check_4_answer_right_and_wrong(page, target_id, failures)
            run_check_5_five_more(page, failures)
            run_check_6_switch_track(page, base, failures)
            ctx.close()
            run_check_7_viewports_and_screenshots(browser, base, failures)
            run_check_8_selftest(browser, base, failures)
            browser.close()
    finally:
        httpd.shutdown()

    if failures:
        print(f"\nFAILED ({len(failures)} checks):")
        for f in failures:
            print(f"  - {f}")
        return 1

    print("\nALL HOME ACCEPTANCE CHECKS PASSED (including --selftest)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
