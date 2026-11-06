#!/usr/bin/env python3
"""Playwright acceptance suite for Blueprint F3 (Intel drawer) + F4 (Rematch & Score isolation).

Usage:
    python tools/test-intel.py
    python tools/test-intel.py --selftest
"""
import functools
import http.server
import pathlib
import socket
import sys
import threading
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parents[1] / "www"
SHOTS_DIR = pathlib.Path(__file__).resolve().parent / "intel-shots"


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def serve():
    sock = socket.socket()
    sock.bind(("127.0.0.1", 0))
    port = sock.getsockname()[1]
    sock.close()
    handler = functools.partial(QuietHandler, directory=str(ROOT))
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", port), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv, f"http://127.0.0.1:{port}/"


def run_check_5(page, base, plant_score_bug=False):
    """Check 5: Score isolation in Arena practice (and no rematch in exam mode)."""
    page.goto(base + "arena.html")
    page.wait_for_selector(".exam-card")
    page.evaluate("""() => {
        localStorage.clear();
        localStorage.setItem('st_exam_practice', '1');
        const cb = document.getElementById('exam-practice');
        if (cb) cb.checked = true;
    }""")

    # Start a short 5-question practice run on AWS so we can complete & verify all totals
    base_count = page.evaluate("""() => {
        app.startExam('aws');
        app.exam.practice = true;
        // Trim to 5 base single-choice questions for a deterministic short practice run
        const singles = app.exam.questions.filter(q => !app.examIsMulti(q)).slice(0, 5);
        app.exam.questions = singles;
        app.exam.answers = singles.map(() => []);
        app.exam.checked = singles.map(() => false);
        app.exam.flagged = singles.map(() => false);
        app.exam.recorded = [];
        app.exam.idx = 0;
        app.renderExamQ();
        return singles.length;
    }""")

    if plant_score_bug:
        # Plant bug: clear _rematch flag after makeRematch so rematch copies get counted in score/grid/domain totals
        page.evaluate("""() => {
            const origMake = Intel.makeRematch;
            Intel.makeRematch = function(q, cid) {
                const c = origMake.call(this, q, cid);
                delete c._rematch;
                return c;
            };
        }""")

    # Q0: intentionally miss -> queues a rematch at idx 3
    wrong0 = page.evaluate("""() => {
        const q = app.exam.questions[0];
        const corr = app.examCorrect(q);
        return q.opts.findIndex((_, i) => !corr.includes(i));
    }""")
    page.locator("#exam-opts .exam-opt").nth(wrong0).click()
    page.evaluate("() => Intel.close()")

    # Answer all remaining questions in the queue (including the rematch copy) RIGHT
    total_with_rematch = page.evaluate("() => app.exam.questions.length")
    for idx in range(1, total_with_rematch):
        page.evaluate(f"() => app.gotoExamQ({idx})")
        right_idx = page.evaluate("""() => {
            const q = app.exam.questions[app.exam.idx];
            return app.examCorrect(q)[0];
        }""")
        page.locator("#exam-opts .exam-opt").nth(right_idx).click()

    # Open question grid before submitting to check grid tile count
    page.evaluate("() => app.toggleExamGrid()")
    grid_count = page.locator(".exam-grid .exam-tile").count()

    # Submit exam and inspect score isolation metrics
    res = page.evaluate("""() => {
        app.submitExam();
        const domPerf = JSON.parse(localStorage.getItem('st_domain_perf_aws') || '{}');
        const domTotal = Object.values(domPerf).reduce((s, d) => s + (d.total || 0), 0);
        const domCorrect = Object.values(domPerf).reduce((s, d) => s + (d.correct || 0), 0);
        const hs = parseInt(localStorage.getItem('st_highscore_aws') || '0', 10);
        const hsPct = parseFloat(localStorage.getItem('st_highscore_pct_aws') || '0');
        const scoreText = (document.querySelector('.exam-result-score') || {}).textContent || '';
        return {
            exScore: app.exam.score,
            exTotal: app.exam.total,
            exPct: app.exam.pct,
            domTotal,
            domCorrect,
            hs,
            hsPct,
            scoreText
        };
    }""")

    # Also check exam mode (practice = false) queues no rematch on miss
    exam_mode_ok = page.evaluate("""() => {
        app.leaveExam();
        localStorage.setItem('st_exam_practice', '0');
        const cb = document.getElementById('exam-practice');
        if (cb) cb.checked = false;
        app.startExam('aws');
        app.exam.practice = false;
        const beforeLen = app.exam.questions.length;
        const q0 = app.exam.questions[0];
        const corr = app.examCorrect(q0);
        const wrongIdx = q0.opts.findIndex((_, i) => !corr.includes(i));
        app.chooseExamOpt(wrongIdx);
        const afterChooseLen = app.exam.questions.length;
        const dialogOpen = !!document.querySelector('dialog.ma-sheet[open]');
        app.submitExam();
        const afterSubmitLen = app.exam.questions.length;
        return beforeLen === afterChooseLen && beforeLen === afterSubmitLen && !dialogOpen;
    }""")

    # Base count is 5; Q0 was missed (1 wrong), Q1..Q4 were right (4 right). Rematch was right but must be ignored!
    expected_score = base_count - 1
    expected_pct = round(expected_score / base_count, 4)
    ok = (
        grid_count == base_count
        and res["exTotal"] == base_count
        and res["exScore"] == expected_score
        and abs(res["exPct"] - expected_pct) < 1e-3
        and res["hs"] == expected_score
        and abs(res["hsPct"] - expected_pct) < 1e-3
        and res["domTotal"] == base_count
        and res["domCorrect"] == expected_score
        and f"{expected_score}/{base_count}" in res["scoreText"]
        and exam_mode_ok
    )
    return ok, {"base_count": base_count, "grid_count": grid_count, "res": res, "exam_mode_ok": exam_mode_ok}


def run_check_7(page, base, plant_timer_bug=False):
    """Check 7: Daily miss opens drawer and pauses auto-advance (still on same quizIdx after 2.7s; advances after closing)."""
    page.goto(base + "daily.html")
    page.wait_for_selector("#btn-next")
    page.evaluate("""() => {
        localStorage.clear();
        daily.init();
        daily.startQuiz();
    }""")
    page.wait_for_selector(".quiz-opt")

    if plant_timer_bug:
        # Plant bug: force 2.5s auto-advance even when missed and drawer is open
        page.evaluate("""() => {
            const origAnswer = daily.answer.bind(daily);
            daily.answer = function(idx) {
                origAnswer(idx);
                setTimeout(() => {
                    this.quizIdx++;
                    this.renderQuestion();
                }, 2500);
            };
        }""")

    wrong_idx = page.evaluate("""() => {
        const q = daily.lesson.quiz[0];
        return q.opts.findIndex((_, i) => i !== q.ans);
    }""")
    page.locator(".quiz-opt").nth(wrong_idx).click()

    drawer_open = page.evaluate("() => !!document.querySelector('dialog.ma-sheet[open]')")
    page.wait_for_timeout(3500)
    idx_while_open = page.evaluate("() => daily.quizIdx")
    still_open = page.evaluate("() => !!document.querySelector('dialog.ma-sheet[open]')")

    # Now close the drawer via "Got it" button and verify it advances after a short beat
    if still_open:
        page.locator("dialog.ma-sheet .ma-sheet-gotit").click()
    page.wait_for_timeout(600)
    idx_after_close = page.evaluate("() => daily.quizIdx")

    ok = drawer_open and still_open and idx_while_open == 0 and idx_after_close == 1
    return ok, {
        "drawer_open": drawer_open,
        "still_open": still_open,
        "idx_while_open": idx_while_open,
        "idx_after_close": idx_after_close,
    }


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    selftest = "--selftest" in sys.argv
    SHOTS_DIR.mkdir(parents=True, exist_ok=True)
    srv, base = serve()
    passed = 0
    failed = 0

    def check(cond, label, detail=""):
        nonlocal passed, failed
        if cond:
            passed += 1
            print(f"  ok   {label}")
        else:
            failed += 1
            print(f"  FAIL {label}" + (f" -> {detail}" if detail else ""))

    with sync_playwright() as pw:
        browser = pw.chromium.launch()

        if selftest:
            print("Running --selftest (planting score-isolation and auto-advance bugs)...")
            ctx = browser.new_context(viewport={"width": 390, "height": 844}, service_workers="block")
            p = ctx.new_page()
            ok5_bug, d5 = run_check_5(p, base, plant_score_bug=True)
            check(not ok5_bug, "selftest: planted rematch-counted-in-score bug causes Check 5 to fail", d5)
            ok7_bug, d7 = run_check_7(p, base, plant_timer_bug=True)
            check(not ok7_bug, "selftest: planted unpaused-auto-advance bug causes Check 7 to fail", d7)
            ctx.close()
            browser.close()
            srv.shutdown()
            print(f"\nSELFTEST {'PASSED' if failed == 0 else 'FAILED'}: {passed}/{passed + failed}")
            sys.exit(0 if failed == 0 else 1)

        ctx = browser.new_context(viewport={"width": 390, "height": 844}, service_workers="block")
        page = ctx.new_page()
        errors = []
        page.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))
        page.on("console", lambda m: errors.append(f"console: {m.text}") if m.type == "error" else None)

        # ------------------------------------------------------------------
        # Check 1: Wrong answer in Arena practice opens <dialog class="ma-sheet" open>
        # with trap text, correct option + explanation, and working lesson link
        # ------------------------------------------------------------------
        page.goto(base + "arena.html")
        page.wait_for_selector(".exam-card")
        q1_info = page.evaluate("""() => {
            localStorage.clear();
            localStorage.setItem('st_exam_practice', '1');
            const cb = document.getElementById('exam-practice');
            if (cb) cb.checked = true;
            app.startExam('aws');
            app.exam.practice = true;
            // Pick a single-answer AWS question that has ref.module, ref.topic, and whyWrong
            const cand = DATA.exam_aws.find(q =>
                !app.examIsMulti(q) &&
                q.ref && q.ref.module && q.ref.topic &&
                q.whyWrong && Object.keys(q.whyWrong).length > 0
            );
            app.exam.questions[0] = cand;
            app.exam.idx = 0;
            app.renderExamQ();
            const corr = app.examCorrect(cand);
            const wrongIdx = cand.opts.findIndex((_, i) => !corr.includes(i) && cand.whyWrong[i]);
            return {
                wrongIdx,
                expectedTrap: cand.whyWrong[wrongIdx],
                expectedCorrect: app.examOptText(cand.opts[corr[0]]),
                expectedExp: app.examExp(cand),
                expectedMod: cand.ref.module,
                expectedTopic: cand.ref.topic
            };
        }""")
        page.locator("#exam-opts .exam-opt").nth(q1_info["wrongIdx"]).click()
        page.wait_for_selector("dialog.ma-sheet[open]")
        page.wait_for_timeout(380)

        # Save normal 390x844 screenshot of the open Intel drawer
        normal_shot = SHOTS_DIR / "drawer-normal-390x844.png"
        page.screenshot(path=str(normal_shot))

        # Save html[data-mammoth] 390x844 screenshot of the open Intel drawer
        page.evaluate("() => document.documentElement.setAttribute('data-mammoth', '1')")
        page.wait_for_timeout(100)
        mammoth_shot = SHOTS_DIR / "drawer-mammoth-390x844.png"
        page.screenshot(path=str(mammoth_shot))
        page.evaluate("() => document.documentElement.removeAttribute('data-mammoth')")

        c1 = page.evaluate("""() => {
            const dlg = document.querySelector('dialog.ma-sheet[open]');
            if (!dlg) return null;
            const trap = (dlg.querySelector('.ma-sheet-trap') || {}).textContent || '';
            const rule = (dlg.querySelector('.ma-sheet-rule') || {}).textContent || '';
            const link = dlg.querySelector('.ma-sheet-lesson');
            return {
                trap,
                rule,
                href: link ? link.getAttribute('href') : null
            };
        }""")
        check(
            c1 is not None
            and q1_info["expectedTrap"] in c1["trap"]
            and q1_info["expectedCorrect"] in c1["rule"]
            and q1_info["expectedExp"][:40] in c1["rule"]
            and c1["href"] is not None
            and "library.html?course=aws-saa-c03" in c1["href"]
            and "title=" in c1["href"]
            and "topic=" in c1["href"],
            "1a. Arena practice miss opens <dialog class='ma-sheet' open> with trap, rule, and lesson deep-link",
            c1,
        )

        # Follow the lesson link and confirm it lands on that exact topic (h1.lesson-title)
        page.locator("dialog.ma-sheet .ma-sheet-lesson").click()
        page.wait_for_selector("h1.lesson-title")
        landed_title = page.locator("h1.lesson-title").inner_text().strip()
        check(
            landed_title == q1_info["expectedTopic"],
            f"1b. Following lesson link lands on exact topic h1.lesson-title ({landed_title!r})",
        )

        # Also check lesson quiz miss on library.html opens the drawer
        quiz_miss_opened = page.evaluate("""() => {
            for (let mi = 0; mi < DATA.course.length; mi++) {
                const m = DATA.course[mi];
                for (let ti = 0; ti < m.topics.length; ti++) {
                    const qz = m.topics[ti].quiz || [];
                    if (qz.length > 0) {
                        app.renderLessonContent(mi, ti);
                        const wrongOi = qz[0].opts.findIndex((_, i) => i !== qz[0].ans);
                        app.answerQuiz(mi, ti, 0, wrongOi);
                        const open = !!document.querySelector('dialog.ma-sheet[open]');
                        Intel.close();
                        return open;
                    }
                }
            }
            return false;
        }""")
        check(quiz_miss_opened, "1c. Lesson quiz miss (answerQuiz) opens the Intel drawer")

        # ------------------------------------------------------------------
        # Check 2: Multi-answer wrong pick shows traps for wrong picks;
        # right answer does NOT open the drawer; onClose focuses Next control
        # ------------------------------------------------------------------
        page.goto(base + "arena.html")
        page.wait_for_selector(".exam-card")
        multi_info = page.evaluate("""() => {
            localStorage.setItem('st_exam_practice', '1');
            const cb = document.getElementById('exam-practice');
            if (cb) cb.checked = true;
            app.startExam('aws');
            app.exam.practice = true;
            const multiQ = DATA.exam_aws.find(q => app.examIsMulti(q) && q.whyWrong);
            const singleQ = DATA.exam_aws.find(q => !app.examIsMulti(q));
            app.exam.questions[0] = multiQ;
            app.exam.questions[1] = singleQ;
            app.exam.idx = 0;
            app.renderExamQ();
            const corr = app.examCorrect(multiQ);
            const wrongs = multiQ.opts.map((_, i) => i).filter(i => !corr.includes(i)).slice(0, corr.length);
            return {
                wrongs,
                expectedTraps: wrongs.map(i => multiQ.whyWrong[i]).filter(Boolean),
                singleCorrect: app.examCorrect(singleQ)[0]
            };
        }""")
        for wi in multi_info["wrongs"]:
            page.locator("#exam-opts .exam-opt").nth(wi).click()
        page.locator(".exam-check").click()
        page.wait_for_selector("dialog.ma-sheet[open]")
        multi_trap_text = page.locator("dialog.ma-sheet .ma-sheet-trap").inner_text()
        all_traps_shown = all(t in multi_trap_text for t in multi_info["expectedTraps"])
        page.locator("dialog.ma-sheet .ma-sheet-gotit").click()
        focused_next = page.evaluate("() => document.activeElement && document.activeElement.classList.contains('exam-nav-btn')")

        # Advance to Q1 and pick the RIGHT answer -> drawer must NOT open
        page.evaluate("() => app.gotoExamQ(1)")
        page.locator("#exam-opts .exam-opt").nth(multi_info["singleCorrect"]).click()
        right_opened = page.evaluate("() => !!document.querySelector('dialog.ma-sheet[open]')")
        check(
            all_traps_shown and focused_next and not right_opened,
            "2. Multi-answer wrong pick shows traps for each wrong pick, onClose focuses Next, right answer does not open drawer",
            {"all_traps_shown": all_traps_shown, "focused_next": focused_next, "right_opened": right_opened},
        )

        # ------------------------------------------------------------------
        # Check 3: Question with q.ref.cram shows Cram button; on library.html
        # opens .cram-drawer filtered to q.ref.cram.q; on arena.html links to
        # library.html#cram=<sheet>&q=<term> and loading that URL opens drawer filtered
        # ------------------------------------------------------------------
        cram_arena = page.evaluate("""() => {
            const cramQ = DATA.exam_aws.find(q => !app.examIsMulti(q) && q.ref && q.ref.cram && q.ref.cram.sheet && q.ref.cram.q);
            app.exam.questions[2] = cramQ;
            app.gotoExamQ(2);
            const corr = app.examCorrect(cramQ);
            const wrongIdx = cramQ.opts.findIndex((_, i) => !corr.includes(i));
            app.chooseExamOpt(wrongIdx);
            const btn = document.querySelector('dialog.ma-sheet[open] .ma-sheet-cram');
            return {
                cramQ,
                wrongIdx,
                href: btn ? btn.getAttribute('href') : null,
                sheet: cramQ.ref.cram.sheet,
                query: cramQ.ref.cram.q
            };
        }""")
        check(
            cram_arena["href"] is not None
            and cram_arena["href"].startswith("library.html#cram=")
            and cram_arena["sheet"] in cram_arena["href"],
            f"3a. On arena.html, Cram button links to {cram_arena['href']}",
        )

        # Navigate to that library.html#cram=<sheet>&q=<term> URL and confirm .cram-drawer opens filtered
        page.goto(base + cram_arena["href"])
        page.wait_for_selector(".cram-drawer:not([hidden])")
        cram_hash_state = page.evaluate("""() => {
            const dr = document.querySelector('.cram-drawer');
            const input = dr && dr.querySelector('.cram-search');
            const activeTab = dr && dr.querySelector('.cram-tab[aria-selected="true"]');
            const rows = dr ? dr.querySelectorAll('.cram-body tbody tr, .cram-body .cram-steps li.hit').length : 0;
            const bodyText = dr ? (dr.querySelector('.cram-body') || {}).textContent || '' : '';
            const hasEmpty = !!(dr && dr.querySelector('.cram-empty'));
            return {
                open: !!(dr && !dr.hidden),
                val: input ? input.value : '',
                sheet: activeTab ? activeTab.getAttribute('data-sheet') : '',
                rows,
                hasEmpty,
                hasQueryText: bodyText.toLowerCase().includes((input ? input.value : '').toLowerCase())
            };
        }""")
        check(
            cram_hash_state["open"]
            and cram_hash_state["val"] == cram_arena["query"]
            and cram_hash_state["sheet"] == cram_arena["sheet"]
            and cram_hash_state["rows"] > 0
            and not cram_hash_state["hasEmpty"]
            and cram_hash_state["hasQueryText"],
            "3b. Loading library.html#cram=<sheet>&q=<term> opens .cram-drawer filtered to query",
            cram_hash_state,
        )

        # Also test clicking Cram button inside Intel drawer while on library.html (calls Cram.open directly)
        cram_direct_state = page.evaluate("""() => {
            Cram.close();
            const cramQ = DATA.exam_aws.find(q => !app.examIsMulti(q) && q.ref && q.ref.cram && q.ref.cram.sheet && q.ref.cram.q);
            const corr = app.examCorrect(cramQ);
            const wrongIdx = cramQ.opts.findIndex((_, i) => !corr.includes(i));
            Intel.open({ q: cramQ, chosen: wrongIdx, courseId: 'aws-saa-c03' });
            const cramBtn = document.querySelector('dialog.ma-sheet[open] .ma-sheet-cram');
            if (cramBtn) cramBtn.click();
            const dr = document.querySelector('.cram-drawer');
            const input = dr && dr.querySelector('.cram-search');
            return {
                dialogClosed: !document.querySelector('dialog.ma-sheet[open]'),
                cramOpen: !!(dr && !dr.hidden),
                searchVal: input ? input.value : '',
                expectedQuery: cramQ.ref.cram.q
            };
        }""")
        check(
            cram_direct_state["dialogClosed"]
            and cram_direct_state["cramOpen"]
            and cram_direct_state["searchVal"] == cram_direct_state["expectedQuery"],
            "3c. On library.html, clicking Cram button closes Intel dialog and opens .cram-drawer searched",
            cram_direct_state,
        )

        # ------------------------------------------------------------------
        # Check 4: Question with no q.ref but a mapped q.domain (e.g. psm-scrum)
        # links to fallback module without topic=
        # ------------------------------------------------------------------
        fallback_info = page.evaluate("""() => {
            Cram.close();
            const psmQ = DATA.exam_psm.find(q => !q.ref && q.domain);
            const corr = app.examCorrect(psmQ);
            const wrongIdx = psmQ.opts.findIndex((_, i) => !corr.includes(i));
            Intel.open({ q: psmQ, chosen: wrongIdx, courseId: 'psm-scrum' });
            const link = document.querySelector('dialog.ma-sheet[open] .ma-sheet-lesson');
            const href = link ? link.getAttribute('href') : null;
            Intel.close();
            return { href, domain: psmQ.domain };
        }""")
        check(
            fallback_info["href"] is not None
            and "library.html?course=psm-scrum&title=" in fallback_info["href"]
            and "topic=" not in fallback_info["href"],
            f"4. Question without q.ref but with mapped q.domain ({fallback_info['domain']}) links to fallback module without topic=",
            fallback_info,
        )

        # ------------------------------------------------------------------
        # Check 5: Score isolation in Arena practice + no rematch in exam mode
        # ------------------------------------------------------------------
        ok5, detail5 = run_check_5(page, base, plant_score_bug=False)
        check(ok5, "5. Score isolation: total, %, st_highscore_*, st_domain_perf_*, and grid count exclude _rematch; exam mode queues no rematch", detail5)

        # ------------------------------------------------------------------
        # Check 6: Rematch card at idx + 3 with _rematch: true, "⚔ Rematch" tag,
        # shuffled options with ans and whyWrong remapped, answering right fires
        # .jc-rematch, and missing a rematch does not queue a third copy
        # ------------------------------------------------------------------
        page.goto(base + "arena.html")
        page.wait_for_selector(".exam-card")
        rematch_setup = page.evaluate("""() => {
            localStorage.clear();
            localStorage.setItem('st_exam_practice', '1');
            const cb = document.getElementById('exam-practice');
            if (cb) cb.checked = true;
            app.startExam('aws');
            app.exam.practice = true;
            const q0 = DATA.exam_aws.find(q => !app.examIsMulti(q) && q.whyWrong && Object.keys(q.whyWrong).length >= 2);
            const q1 = DATA.exam_aws.find(q => !app.examIsMulti(q) && q !== q0 && q.whyWrong);
            const others = DATA.exam_aws.filter(q => !app.examIsMulti(q) && q !== q0 && q !== q1).slice(0, 6);
            const list = [q0, q1, ...others];
            app.exam.questions = list.slice();
            app.exam.answers = list.map(() => []);
            app.exam.checked = list.map(() => false);
            app.exam.flagged = list.map(() => false);
            app.exam.recorded = [];
            app.exam.idx = 0;
            app.renderExamQ();
            const corr0 = app.examCorrect(q0)[0];
            const wrong0 = q0.opts.findIndex((_, i) => i !== corr0);
            const corr1 = app.examCorrect(q1)[0];
            const wrong1 = q1.opts.findIndex((_, i) => i !== corr1);
            return {
                origOpts0: q0.opts.slice(),
                origCorrectText0: app.examOptText(q0.opts[corr0]),
                origWhyMap0: Object.fromEntries(q0.opts.map((o, i) => [app.examOptText(o), (q0.whyWrong && q0.whyWrong[i]) || ''])),
                wrong0,
                wrong1
            };
        }""")
        # Miss Q0 at idx 0 -> rematch queued at idx 3
        page.locator("#exam-opts .exam-opt").nth(rematch_setup["wrong0"]).click()
        page.evaluate("() => Intel.close()")

        # Inspect the rematch copy at idx 3 before advancing
        r_copy = page.evaluate("""() => {
            const rq = app.exam.questions[3];
            const corrIdx = app.examCorrect(rq)[0];
            return {
                isRematch: !!rq._rematch,
                opts: rq.opts.slice(),
                correctText: app.examOptText(rq.opts[corrIdx]),
                corrIdx,
                whyMap: Object.fromEntries(rq.opts.map((o, i) => [app.examOptText(o), (rq.whyWrong && rq.whyWrong[i]) || '']))
            };
        }""")
        # Navigate to idx 3 and verify "⚔ Rematch" tag and .jc-rematch on right answer
        page.evaluate("""() => {
            window.__rematchFx = [];
            new MutationObserver(ms => ms.forEach(m => {
                const c = m.target.className || '';
                if (c.includes('jc-rematch')) window.__rematchFx.push('jc-rematch');
            })).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });
            app.gotoExamQ(3);
        }""")
        rematch_tag_text = (page.locator(".rematch-tag").text_content() or "").strip()
        page.locator("#exam-opts .exam-opt").nth(r_copy["corrIdx"]).click()
        fired_jc_rematch = page.evaluate("() => window.__rematchFx.includes('jc-rematch')")

        # Also test that missing a rematch does NOT queue a third copy:
        # Miss Q1 at idx 1 -> rematch of Q1 queued at idx 4; then go to idx 4 and miss the rematch!
        no_third_copy = page.evaluate("""(wrong1) => {
            app.gotoExamQ(1);
            app.chooseExamOpt(wrong1);
            Intel.close();
            const lenAfterFirstMiss = app.exam.questions.length;
            // Find the rematch of Q1 at idx 4
            app.gotoExamQ(4);
            const rq1 = app.exam.questions[4];
            const corr1 = app.examCorrect(rq1)[0];
            const wrongRematchIdx = rq1.opts.findIndex((_, i) => i !== corr1);
            app.chooseExamOpt(wrongRematchIdx);
            Intel.close();
            const lenAfterRematchMiss = app.exam.questions.length;
            return !!rq1._rematch && lenAfterFirstMiss === lenAfterRematchMiss;
        }""", rematch_setup["wrong1"])

        check(
            r_copy["isRematch"]
            and r_copy["opts"] != rematch_setup["origOpts0"]
            and r_copy["correctText"] == rematch_setup["origCorrectText0"]
            and r_copy["whyMap"] == rematch_setup["origWhyMap0"]
            and "Rematch" in rematch_tag_text
            and fired_jc_rematch
            and no_third_copy,
            "6. Rematch card at idx+3 has _rematch:true, '⚔ Rematch' tag, shuffled opts with remapped ans/whyWrong, fires .jc-rematch, and queues no 3rd copy on miss",
            {
                "isRematch": r_copy["isRematch"],
                "shuffled": r_copy["opts"] != rematch_setup["origOpts0"],
                "correctTextMatch": r_copy["correctText"] == rematch_setup["origCorrectText0"],
                "whyMapMatch": r_copy["whyMap"] == rematch_setup["origWhyMap0"],
                "rematch_tag_text": rematch_tag_text,
                "fired_jc_rematch": fired_jc_rematch,
                "no_third_copy": no_third_copy,
            },
        )

        # ------------------------------------------------------------------
        # Check 7: Daily miss opens drawer and pauses auto-advance; also verify
        # Daily rematch and score/pips isolation
        # ------------------------------------------------------------------
        ok7, detail7 = run_check_7(page, base, plant_timer_bug=False)
        check(ok7, "7a. Daily miss opens drawer and pauses auto-advance (still on quizIdx 0 after 3.5s; advances after closing)", detail7)

        # Finish the rest of the Daily quiz (including the rematch at idx 3) and verify pips + score isolation
        daily_iso = page.evaluate("""() => {
            clearTimeout(daily.advanceTimer);
            const baseLen = daily.lesson._origQuiz.length;
            const totalLen = daily.lesson.quiz.length;
            const rematchAt3 = !!(daily.lesson.quiz[3] && daily.lesson.quiz[3]._rematch);
            while (daily.mode === 'quiz' && daily.quizIdx < daily.lesson.quiz.length) {
                const q = daily.lesson.quiz[daily.quizIdx];
                daily.answer(q.ans);
                clearTimeout(daily.advanceTimer);
                daily.quizIdx++;
                daily.renderQuestion();
            }
            const pipsCount = document.querySelectorAll('#quiz-pips .quiz-pip').length;
            const scoreText = (document.getElementById('completion-score') || {}).textContent || '';
            return {
                baseLen,
                totalLen,
                rematchAt3,
                pipsCount,
                score: daily.score,
                scoreText
            };
        }""")
        check(
            daily_iso["rematchAt3"]
            and daily_iso["totalLen"] == daily_iso["baseLen"] + 1
            and daily_iso["pipsCount"] == daily_iso["baseLen"]
            and daily_iso["score"] == daily_iso["baseLen"] - 1
            and daily_iso["scoreText"] == f"{daily_iso['baseLen'] - 1}/{daily_iso['baseLen']}",
            "7b. Daily queues rematch at idx+3 and isolates Daily score, 80% pass check, and pips from _rematch",
            daily_iso,
        )

        # ------------------------------------------------------------------
        # Check 8: Arena results autopsy (examAutopsyHtml) renders inline
        # lesson + cram links on missed questions without opening the drawer
        # ------------------------------------------------------------------
        page.goto(base + "arena.html")
        page.wait_for_selector(".exam-card")
        autopsy_info = page.evaluate("""() => {
            localStorage.setItem('st_exam_practice', '0');
            const cb = document.getElementById('exam-practice');
            if (cb) cb.checked = false;
            app.startExam('aws');
            app.exam.practice = false;
            const cramQ = DATA.exam_aws.find(q => !app.examIsMulti(q) && q.ref && q.ref.module && q.ref.topic && q.ref.cram);
            const rightQ = DATA.exam_aws.find(q => !app.examIsMulti(q) && q !== cramQ);
            app.exam.questions = [cramQ, rightQ];
            app.exam.answers = [[], [app.examCorrect(rightQ)[0]]];
            app.exam.checked = [false, false];
            app.exam.flagged = [false, false];
            app.exam.recorded = [];
            app.submitExam();
            app.setExamFilter('all');
            const wrongAut = document.querySelector('.exam-autopsy.wrong');
            const rightAut = document.querySelector('.exam-autopsy.right');
            const dialogOpen = !!document.querySelector('dialog.ma-sheet[open]');
            return {
                dialogOpen,
                wrongHasLesson: !!(wrongAut && wrongAut.querySelector('.ma-sheet-lesson')),
                wrongHasCram: !!(wrongAut && wrongAut.querySelector('.ma-sheet-cram')),
                rightHasLinks: !!(rightAut && rightAut.querySelector('.ma-sheet-links'))
            };
        }""")
        check(
            not autopsy_info["dialogOpen"]
            and autopsy_info["wrongHasLesson"]
            and autopsy_info["wrongHasCram"]
            and not autopsy_info["rightHasLinks"],
            "8. Arena results autopsy renders inline lesson + cram links on missed questions without opening drawer",
            autopsy_info,
        )

        # ------------------------------------------------------------------
        # Check 10 (added in audit): spec items the checks above skip.
        # a) clearing a rematch leaves the record at box 1 that day
        # b) a miss with < 3 cards left queues the rematch last
        # c) practice miss + submit before reaching the rematch: m stays 1 (no false nemesis)
        # d) Esc closes the drawer, focus lands on the Next control
        # e) 390x844 with the drawer open: no horizontal scroll
        # ------------------------------------------------------------------
        page.goto(base + "arena.html")
        page.wait_for_selector(".exam-card")
        setup10 = page.evaluate("""() => {
            localStorage.clear();
            localStorage.setItem('st_exam_practice', '1');
            const cb = document.getElementById('exam-practice');
            if (cb) cb.checked = true;
            app.startExam('aws');
            app.exam.practice = true;
            const list = DATA.exam_aws.filter(q => !app.examIsMulti(q)).slice(0, 6);
            app.exam.questions = list.slice();
            app.exam.answers = list.map(() => []);
            app.exam.checked = list.map(() => false);
            app.exam.flagged = list.map(() => false);
            app.exam.recorded = [];
            app.exam.idx = 3;
            app.renderExamQ();
            const q = list[3];
            const corr = app.examCorrect(q)[0];
            return { wrong: q.opts.findIndex((_, i) => i !== corr), qid: Game.qid(q, 'aws-saa-c03') };
        }""")
        page.locator("#exam-opts .exam-opt").nth(setup10["wrong"]).click()
        page.wait_for_selector("dialog.ma-sheet[open]")
        page.wait_for_timeout(380)
        no_hscroll = page.evaluate("() => document.documentElement.scrollWidth <= window.innerWidth")
        page.keyboard.press("Escape")
        page.wait_for_timeout(150)
        esc_state = page.evaluate("""() => {
            const a = document.activeElement;
            return {
                closed: !document.querySelector('dialog.ma-sheet[open]'),
                focusNext: !!(a && a.matches('.exam-nav-btn.primary, .exam-nav-btn.submit'))
            };
        }""")
        # 6 cards, miss at index 3 (position 4) -> rematch at index 6 (position 7) = last
        last_state = page.evaluate("""(qid) => {
            const qs = app.exam.questions;
            const rq = qs[qs.length - 1];
            return { len: qs.length, lastIsRematch: !!rq._rematch && Game.qid(rq, 'aws-saa-c03') === qid };
        }""", setup10["qid"])
        # Clear the rematch, then read the record's box
        page.evaluate("() => app.gotoExamQ(app.exam.questions.length - 1)")
        right_r = page.evaluate("() => app.examCorrect(app.exam.questions[app.exam.idx])[0]")
        page.locator("#exam-opts .exam-opt").nth(right_r).click()
        box_after = page.evaluate("(qid) => (Game.Review.get(qid) || {}).b", setup10["qid"])

        # Near the end: 6 cards, miss at index 4 (2 left after it) -> rematch goes last (index 6)
        near_end = page.evaluate("""() => {
            localStorage.clear();
            app.leaveExam();
            app.startExam('aws');
            app.exam.practice = true;
            const list = DATA.exam_aws.filter(q => !app.examIsMulti(q)).slice(10, 16);
            app.exam.questions = list.slice();
            app.exam.answers = list.map(() => []);
            app.exam.checked = list.map(() => false);
            app.exam.flagged = list.map(() => false);
            app.exam.recorded = [];
            app.exam.idx = 4;
            app.renderExamQ();
            const q = list[4];
            const corr = app.examCorrect(q)[0];
            app.chooseExamOpt(q.opts.findIndex((_, i) => i !== corr));
            Intel.close();
            const qs = app.exam.questions;
            return { len: qs.length, lastIsRematch: !!qs[6] && !!qs[6]._rematch, q5Kept: qs[5] === list[5] };
        }""")

        # Submit before reaching the rematch: the miss is recorded once (m === 1), not a nemesis
        false_nem = page.evaluate("""() => {
            localStorage.clear();
            app.leaveExam();
            app.startExam('aws');
            app.exam.practice = true;
            const list = DATA.exam_aws.filter(q => !app.examIsMulti(q)).slice(20, 26);
            app.exam.questions = list.slice();
            app.exam.answers = list.map(() => []);
            app.exam.checked = list.map(() => false);
            app.exam.flagged = list.map(() => false);
            app.exam.recorded = [];
            app.exam.idx = 0;
            app.renderExamQ();
            const q = list[0];
            const qid = Game.qid(q, 'aws-saa-c03');
            const corr = app.examCorrect(q)[0];
            app.chooseExamOpt(q.opts.findIndex((_, i) => i !== corr));
            Intel.close();
            app.submitExam();
            const r = Game.Review.get(qid) || {};
            return { m: r.m, nemesis: Game.Review.nemesis(qid) };
        }""")
        check(box_after == 1, f"10a. Clearing a rematch the same day leaves the record at box 1 (got {box_after})")
        check(last_state["len"] == 7 and last_state["lastIsRematch"]
              and near_end["len"] == 7 and near_end["lastIsRematch"] and near_end["q5Kept"],
              "10b. Miss at position 4 of 6 returns at position 7; a miss with fewer than 3 cards left goes last",
              {"pos4": last_state, "near_end": near_end})
        check(false_nem.get("m") == 1 and not false_nem.get("nemesis"),
              "10c. Practice miss then submit before the rematch: m stays 1, no false nemesis", false_nem)
        check(esc_state["closed"] and esc_state["focusNext"],
              "10d. Esc closes the drawer and focus lands on the Next control", esc_state)
        check(no_hscroll, "10e. 390x844 with the drawer open: scrollWidth <= innerWidth")

        # ------------------------------------------------------------------
        # Check 9: Screenshots saved + zero console/page errors
        # ------------------------------------------------------------------
        check(
            normal_shot.exists() and normal_shot.stat().st_size > 1000
            and mammoth_shot.exists() and mammoth_shot.stat().st_size > 1000,
            f"9a. Saved 390x844 normal and html[data-mammoth] drawer screenshots to {SHOTS_DIR.name}/",
        )
        check(
            not errors,
            "9b. Zero console or page errors across all acceptance checks"
            + ("" if not errors else ": " + " | ".join(errors[:5])),
        )

        ctx.close()
        browser.close()

    srv.shutdown()
    print(f"\n{'PASSED' if failed == 0 else 'FAILED'}: {passed}/{passed + failed} checks")
    sys.exit(0 if failed == 0 else 1)


if __name__ == "__main__":
    main()
