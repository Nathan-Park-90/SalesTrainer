"""End-to-end check of the game.js review engine in the real pages (Playwright, chromium).

    python tools/test-game-e2e.py

Serves www/ on a local port, loads a legacy profile (st_failed_qs + a live st_streak), and checks:
migration on first load, no console/page errors on any page, Arena practice + exam recording (no double count),
the Arena draw putting migrated misses first, lesson quiz + Daily recording, and the derived streak on the Daily page.
Exit 1 on any failure.
"""
import functools, http.server, json, socketserver, sys, threading
from pathlib import Path
from playwright.sync_api import sync_playwright

WWW = Path(__file__).resolve().parent.parent / "www"
PAGES = ["index.html", "library.html", "gym.html", "arena.html", "daily.html", "path.html", "sprint.html"]
fails = []


def check(cond, msg):
    print(("ok   " if cond else "FAIL ") + msg)
    if not cond:
        fails.append(msg)


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def serve():
    httpd = socketserver.ThreadingTCPServer(("127.0.0.1", 0), functools.partial(Quiet, directory=str(WWW)))
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, f"http://127.0.0.1:{httpd.server_address[1]}/"


def main():
    httpd, base = serve()
    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context(viewport={"width": 390, "height": 844}, service_workers="block")
        page = ctx.new_page()
        errors = []
        page.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))
        page.on("console", lambda m: errors.append(f"console: {m.text}") if m.type == "error" else None)

        # --- legacy profile -------------------------------------------------------------------------------
        page.goto(base + "index.html")
        legacy = page.evaluate("""() => {
            localStorage.clear();
            const texts = DATA.exam_aws.slice(0, 3).map(q => q.q);
            const y = new Date(); y.setHours(y.getHours() - 4); y.setDate(y.getDate() - 1);
            localStorage.setItem('st_failed_qs', JSON.stringify(texts.concat(['a question that no longer exists'])));
            localStorage.setItem('st_streak', '4');
            localStorage.setItem('st_last_daily', y.toDateString());
            localStorage.setItem('st_exam_practice', '1');
            return { ids: DATA.exam_aws.slice(0, 3).map(q => Game.qid(q)) };
        }""")
        page.reload()
        st = page.evaluate("() => ({ failed: localStorage.getItem('st_failed_qs'), review: JSON.parse(localStorage.getItem('st_review') || '{}'), streak: localStorage.getItem('st_streak'), log: JSON.parse(localStorage.getItem('st_daylog') || '{}') })")
        check(st["failed"] is None, "migration removed st_failed_qs")
        check(sorted(st["review"].keys()) == sorted(legacy["ids"]) and all(r["b"] == 0 for r in st["review"].values()), "the 3 missed questions became box-0 review records")
        check(st["streak"] == "4" and len(st["log"]) == 4, f"live 4-day streak kept (st_streak={st['streak']}, {len(st['log'])} log days)")

        # --- every page loads clean ---------------------------------------------------------------------
        for name in PAGES:
            page.goto(base + name)
            page.wait_for_load_state("load")
            ok = page.evaluate("() => !!(window.Game && Game.__v && window.DATA)")
            check(ok, f"{name}: game.js loaded")
        check(not errors, "no console or page errors on any page" + ("" if not errors else ": " + " | ".join(errors[:5])))

        # --- Arena: practice mode, real clicks ----------------------------------------------------------
        page.goto(base + "arena.html")
        page.wait_for_selector(".exam-card")
        page.locator(".exam-card").first.click()
        page.wait_for_selector(".exam-opt")
        drawn = page.evaluate("() => app.exam.questions.map(q => Game.qid(q, app.exam.meta.id))")
        check(all(i in drawn for i in legacy["ids"]), "the migrated misses are in the first draw")
        for n in range(5):
            multi = page.evaluate("() => app.examIsMulti(app.exam.questions[app.exam.idx])")
            need = page.evaluate("() => app.examCorrect(app.exam.questions[app.exam.idx]).length")
            opts = page.locator(".exam-opt")
            for k in range(need if multi else 1):
                opts.nth(k).click()
            if multi:
                page.locator(".exam-check").click()
            page.wait_for_selector(".exam-explain")
            page.evaluate("() => app.gotoExamQ(app.exam.idx + 1)")
        st = page.evaluate("() => ({ today: Game.Day.today(), streak: localStorage.getItem('st_streak'), n: Object.values(Game.Review.all()).reduce((s, r) => s + r.n, 0), recs: Object.keys(Game.Review.all()).length })")
        check(st["today"]["a"] == 5 and st["today"]["done"], f"5 practice answers logged today ({st['today']})")
        check(st["streak"] == "5", f"day goal reached -> streak 5 (got {st['streak']})")
        # Submit: the 5 revealed questions must not be recorded twice; the other 60 are recorded once (unanswered = miss).
        page.evaluate("() => app.submitExam()")
        # Rematch copies (F4) the run never reached are not recorded (that would be a second miss).
        total = page.evaluate("() => app.exam.questions.filter((q, i) => !(q._rematch && !app.exam.answers[i].length)).length")
        st2 = page.evaluate("() => ({ n: Object.values(Game.Review.all()).reduce((s, r) => s + r.n, 0), a: Game.Day.today().a })")
        check(st2["a"] == total, f"exam submit logged each question once ({st2['a']} of {total})")
        check(st2["n"] - st["n"] == total - 5, f"review records: +{st2['n'] - st['n']} (want {total - 5})")
        again = page.evaluate("() => { app.submitExam(); return Game.Day.today().a; }")
        check(again == total, "submitting twice changes nothing")

        # --- Next draw: due questions first -------------------------------------------------------------
        page.goto(base + "arena.html")
        draw = """() => {
            const meta = DATA._courseMeta.find(m => m.examKey === 'aws');
            const qs = app.sampleExam(meta, null, Math.random);
            return qs.map(q => Game.Review.priority(Game.qid(q, meta.id)));
        }"""
        order = page.evaluate(draw)
        check(order.count(0) == 0 and order.count(2) == 0, f"same day: today's misses wait until tomorrow, unseen questions fill the draw ({order.count(1)} unseen)")
        page.evaluate("() => { const real = Game.env.now; Game.env.now = () => real() + 864e5; }")
        order = page.evaluate(draw)
        misses = page.evaluate("() => Game.Review.due('aws-saa-c03').filter(id => Game.entry(id) && Game.entry(id).source === 'exam').length")
        check(order.count(0) == min(misses, 65), f"next day: every due question is drawn first ({order.count(0)} of {misses} due)")

        # --- Lesson quiz (library) ----------------------------------------------------------------------
        page.goto(base + "library.html")
        where = page.evaluate("""() => {
            for (let mi = 0; mi < DATA.course.length; mi++) {
                const m = DATA.course[mi];
                if (m.courseId !== 'aws-saa-c03') continue;
                for (let ti = 0; ti < m.topics.length; ti++) if ((m.topics[ti].quiz || []).length) return [mi, ti, Game.qid(m.topics[ti].quiz[0], m.courseId)];
            }
        }""")
        page.evaluate(f"() => app.renderLessonContent({where[0]}, {where[1]})")
        page.wait_for_selector(f"#qqb-{where[0]}-{where[1]}-0 .quiz-opt-btn")
        before = page.evaluate("() => Game.Day.today().a")
        page.locator(f"#qqb-{where[0]}-{where[1]}-0 .quiz-opt-btn").first.click()
        st = page.evaluate(f"() => ({{ a: Game.Day.today().a, rec: Game.Review.get({json.dumps(where[2])}) }})")
        check(st["a"] == before + 1 and st["rec"] and st["rec"]["n"] >= 1, "lesson quiz answer recorded under the Jake-compatible id")

        # --- Daily -----------------------------------------------------------------------------------------
        page.goto(base + "daily.html")
        shown = page.locator("#streak-count").inner_text()
        check(shown == "5", f"Daily page shows the derived streak ({shown})")
        page.evaluate("() => daily.startQuiz()")
        page.wait_for_selector(".quiz-opt")
        before = page.evaluate("() => Game.Day.today().a")
        page.locator(".quiz-opt").first.click()
        st = page.evaluate("() => ({ a: Game.Day.today().a, id: Game.qid(daily.lesson.quiz[0]) })")
        rec = page.evaluate(f"() => Game.Review.get({json.dumps(st['id'])})")
        check(st["a"] == before + 1 and rec is not None and st["id"].startswith("aws-saa-c03:mc:"), f"Daily answer recorded ({st['id']})")

        # --- Home + achievements still read the derived keys ------------------------------------------------
        page.goto(base + "index.html")
        ach = page.evaluate("() => typeof Achievements !== 'undefined' ? String(Achievements.getStats ? Achievements.getStats().streak : localStorage.getItem('st_streak')) : localStorage.getItem('st_streak')")
        check(ach == "5", f"achievements see streak 5 ({ach})")

        # --- Juice wiring: toggle on every page, Arena feedback, overclock after the daily minimum -----------------
        ctx3 = browser.new_context(viewport={"width": 360, "height": 800}, service_workers="block")
        p3 = ctx3.new_page()
        errs3 = []
        p3.on("pageerror", lambda e: errs3.append(f"pageerror: {e}"))
        p3.on("console", lambda m: errs3.append(f"console: {m.text}") if m.type == "error" else None)
        for name in PAGES:
            p3.goto(base + name)
            p3.wait_for_load_state("load")
            st = p3.evaluate("() => ({ t: document.querySelectorAll('.jc-sound-toggle').length, sw: document.documentElement.scrollWidth, w: innerWidth, j: !!(window.Juice && Juice.react) })")
            check(st["j"] and st["t"] == 1 and st["sw"] <= st["w"], f"{name} @360: Juice loaded, 1 sound toggle, no overflow ({st})")
        p3.evaluate("() => { localStorage.clear(); localStorage.setItem('st_exam_practice', '1'); }")
        p3.goto(base + "arena.html")
        p3.wait_for_selector(".exam-card")
        p3.locator(".exam-card").first.click()
        p3.wait_for_selector(".exam-opt")
        p3.evaluate("""() => { window.__fx = []; new MutationObserver(ms => ms.forEach(m => {
            const c = m.target.className || ''; if (/jc-(correct|miss|combo|mastered|rematch)/.test(c)) __fx.push(c.match(/jc-\\w+/)[0]); }))
            .observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] }); }""")
        for n in range(5):
            multi = p3.evaluate("() => app.examIsMulti(app.exam.questions[app.exam.idx])")
            need = p3.evaluate("() => app.examCorrect(app.exam.questions[app.exam.idx]).length")
            for k in range(need if multi else 1):
                p3.locator(".exam-opt").nth(k).click()
            if multi:
                p3.locator(".exam-check").click()
            p3.wait_for_selector(".exam-explain")
            p3.wait_for_timeout(60)
            if n < 4:
                p3.evaluate("() => app.gotoExamQ(app.exam.idx + 1)")
        fx = p3.evaluate("() => ({ fx: __fx, daily: document.documentElement.dataset.daily || '', flag: Game.Day.justHitGoal })")
        check(len(fx["fx"]) >= 5, f"Arena practice: every reveal fired a feedback effect ({fx['fx']})")
        check(fx["daily"] == "done" and fx["flag"] is False, f"5th answer -> overclock on, justHitGoal cleared ({fx})")
        p3.goto(base + "index.html")
        st = p3.evaluate("() => ({ d: document.documentElement.dataset.daily, steady: document.documentElement.classList.contains('jc-oc-steady'), anim: getComputedStyle(document.documentElement).animationName })")
        check(st["d"] == "done" and st["steady"] and st["anim"] == "none", f"later page loads: overclock steady, no running animation ({st})")
        check(not errs3, "juice wiring: no console/page errors" + ("" if not errs3 else ": " + " | ".join(errs3[:5])))
        ctx3.close()

        # --- private window: storage throws -> pages still work ----------------------------------------------
        ctx2 = browser.new_context(service_workers="block")
        ctx2.add_init_script("""(() => { const deny = () => { throw new DOMException('denied', 'SecurityError'); };
            Object.defineProperty(window, 'localStorage', { get: deny, configurable: true }); })();""")
        p2 = ctx2.new_page()
        errs2 = []
        p2.on("pageerror", lambda e: errs2.append(str(e.stack or e)))
        p2.goto(base + "daily.html")
        ok = p2.evaluate("() => { const r = Game.Review.record(Game.qid(DATA.exam_aws[0]), true); return !!r && r.box === 1; }")
        check(ok, "storage denied: record() still works in memory")
        check(not [e for e in errs2 if "game.js" in e], "storage denied: no game.js errors")
        for e in errs2:
            print("    (pre-existing, other script) " + e.splitlines()[0] + " @ " + next((l.strip() for l in e.splitlines()[1:] if "http" in l), "?"))

        if errors:
            for e in errors:
                print("   ", e)
        browser.close()
    httpd.shutdown()
    print(f"\n{'FAILED: ' + str(len(fails)) if fails else 'PASSED'}")
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
