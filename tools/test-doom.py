"""Doom Scroll (doom.html) end-to-end check, Nov 5 2026.
Serves www/ on a free port, opens the page on a phone-sized viewport, picks the AWS track, answers a question,
flips a flashcard, scrolls through a few cards and checks that Game recorded the answers (st_review, st_daylog)
and that the top bar counts them. Nov 6: also validates courses/aws-clips.json against the pack and walks a clip
card (play overlay, no iframe before the tap, DONE WATCHING -> question -> :clip: record); YouTube is never loaded.
Screenshots land in tools/doom-shots/.
Run: python tools/test-doom.py            (needs: pip install playwright; python -m playwright install chromium)
"""
from __future__ import annotations
import functools, http.server, json, os, pathlib, socket, sys, threading
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parents[1]
WWW = ROOT / "www"
SHOTS = ROOT / "tools" / "doom-shots"

def serve():
    s = socket.socket(); s.bind(("127.0.0.1", 0)); port = s.getsockname()[1]; s.close()
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a, **k): pass
    handler = functools.partial(Quiet, directory=str(WWW))
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", port), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv, f"http://127.0.0.1:{port}"

def main() -> int:
    srv, base = serve()
    fails: list[str] = []
    def check(cond, msg):
        print(("ok   " if cond else "FAIL ") + msg)
        if not cond: fails.append(msg)
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, is_mobile=True, has_touch=True)
        page = ctx.new_page()
        errors: list[str] = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        # a 404 is fine: audio/doom/manifest.json only exists once narration has been rendered and pulled (git-ignored)
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" and "favicon" not in m.text and "404" not in m.text else None)
        page.goto(base + "/doom.html"); page.wait_for_load_state("networkidle")
        check(page.locator("#d-pick").is_visible(), "landing with track picker shows")
        n_tracks = page.locator(".d-track").count()
        check(n_tracks >= 7, f"{n_tracks} tracks listed")
        check(page.locator(".d-mode.on").get_attribute("data-mode") == "learn", "Learn is the default mode")
        check("module 1 of 13" in page.locator(".d-track", has_text="AWS").first.inner_text(), "AWS row shows module 1 of 13 in Learn")
        page.screenshot(path=str(SHOTS / "landing.png"))
        # ---- CLIPS: courses/aws-clips.json validates against the AWS pack (titles exist, times sane, ids unique) ----
        clips = page.evaluate("fetch('courses/aws-clips.json').then(r => r.json())")
        mods = page.evaluate("COURSE_AWS.modules.map(m => ({t: m.title, topics: m.topics.map(x => x.title)}))")
        titles = {m["t"]: set(m["topics"]) for m in mods}
        items = clips.get("clips", [])
        check(clips.get("course") == "aws-saa-c03" and 24 <= len(items) <= 36, f"aws-clips.json: {len(items)} clips for {clips.get('course')}")
        bad = [c["id"] for c in items if c.get("module") not in titles]
        check(not bad, f"every clip names an existing module title: {bad}")
        bad = [c["id"] for c in items if c.get("topic") and c["topic"] not in titles.get(c.get("module"), set())]
        check(not bad, f"every clip topic exists in its module: {bad}")
        bad = [c["id"] for c in items if not (45 <= int(c["end"]) - int(c["start"]) <= 150) or int(c["start"]) < 0]
        check(not bad, f"every segment runs 45 to 150 s: {bad}")
        ids = [c["id"] for c in items]
        check(len(ids) == len(set(ids)), "clip ids are unique")
        import re as _re
        bad = [c["id"] for c in items if not _re.fullmatch(r"[A-Za-z0-9_-]{11}", c.get("youtubeId", ""))]
        check(not bad, f"every youtubeId is an 11-character id: {bad}")
        bad = [c["id"] for c in items if not (c.get("q") and len(c["q"].get("opts", [])) == 4 and 0 <= int(c["q"].get("ans", -1)) < 4 and c["q"].get("exp") and c.get("why") and c.get("title") and c.get("channel") and c.get("verified"))]
        check(not bad, f"every clip has title, why, channel, verified date and a 4-option question with exp: {bad}")
        covered = {c["module"] for c in items}
        check(len(covered) == len(titles), f"every module has at least one clip ({len(covered)} of {len(titles)})")
        # ---- LEARN: cover, prose cards, anchor, then the topic quiz; no exam-bank question before a module is done ----
        page.locator(".d-track", has_text="AWS").first.click()
        page.wait_for_timeout(300)
        check(page.locator("#d-pick").is_hidden(), "picker hides after choosing AWS")
        kinds = page.evaluate("[...document.querySelectorAll('.d-card')].map(c=>c.dataset.kind)")
        check(kinds[0] == "cover" and kinds[1] == "prose", f"Learn opens with a module cover then prose: {kinds}")
        check("M1/13" in page.locator("#d-track").inner_text(), "chip shows the module pointer")
        page.screenshot(path=str(SHOTS / "learn-cover.png"))
        page.locator(".d-card").nth(1).scroll_into_view_if_needed(); page.wait_for_timeout(400)
        page.screenshot(path=str(SHOTS / "learn-prose.png"))
        for _ in range(14):
            page.keyboard.press("ArrowDown"); page.wait_for_timeout(300)
        kinds = page.evaluate("[...document.querySelectorAll('.d-card')].map(c=>c.dataset.kind+':'+(c.dataset.src||''))")
        check("anchor:" in kinds, f"an anchor card follows the first topic: {kinds}")
        first_q = next((k for k in kinds if k.startswith("q:")), None)
        check(first_q == "q:lesson", f"the first question in Learn is that topic's lesson quiz ({first_q})")
        check("q:exam" not in kinds, "no exam-bank question before a module is done")
        ai = kinds.index("anchor:") if "anchor:" in kinds else -1
        if ai >= 0:
            page.locator(".d-card").nth(ai).scroll_into_view_if_needed(); page.wait_for_timeout(300)
            page.screenshot(path=str(SHOTS / "learn-anchor.png"))
        ptr = page.evaluate("JSON.parse(localStorage.getItem('st_doom_learn')||'{}')")
        check(ptr.get("aws-saa-c03", {}).get("i", 0) >= 10, f"Learn pointer saved as cards are reached: {ptr}")
        # reload continues from the pointer, not the cover
        page.reload(); page.wait_for_load_state("networkidle"); page.wait_for_timeout(300)
        kinds2 = page.evaluate("[...document.querySelectorAll('.d-card')].map(c=>c.dataset.kind)")
        check(page.locator("#d-pick").is_hidden() and kinds2 and kinds2[0] != "cover", f"reload resumes mid-module: {kinds2}")
        # a finished module: fake the pointer at the end of module 1 and check the done card + boss round + unlock
        page.evaluate("localStorage.setItem('st_doom_learn', JSON.stringify({'aws-saa-c03': {m: 3, i: 999, done: [0, 1, 2]}}))")
        page.reload(); page.wait_for_load_state("networkidle"); page.wait_for_timeout(400)
        kinds3 = page.evaluate("[...document.querySelectorAll('.d-card')].map(c=>c.dataset.kind+':'+(c.dataset.src||''))")
        ptr3 = page.evaluate("JSON.parse(localStorage.getItem('st_doom_learn')||'{}')")
        check(3 in ptr3.get("aws-saa-c03", {}).get("done", []), f"module 4 marked done: {ptr3}")
        check("moddone:" in kinds3 and kinds3.count("q:exam") >= 1, f"module-done card then boss-round exam questions: {kinds3}")
        mi = kinds3.index("moddone:") if "moddone:" in kinds3 else -1
        if mi >= 0:
            page.locator(".d-card").nth(mi).scroll_into_view_if_needed(); page.wait_for_timeout(300)
            page.screenshot(path=str(SHOTS / "learn-done.png"))
        # ---- CLIP card: interleaved with the boss round, play overlay, question on DONE WATCHING, recorded as :clip: ----
        check("clip:" in kinds3, f"a clip card follows the module-done card: {kinds3}")
        check(not any(a == "clip:" and b == "clip:" for a, b in zip(kinds3, kinds3[1:])), "never two clips in a row")
        ci = kinds3.index("clip:") if "clip:" in kinds3 else -1
        if ci >= 0:
            clip = page.locator(".d-card").nth(ci)
            clip.scroll_into_view_if_needed(); page.wait_for_timeout(400)
            cid = clip.get_attribute("data-clip")
            entry = next((c for c in items if c["id"] == cid), None)
            check(entry is not None and entry["module"] == mods[3]["t"], f"the clip belongs to the module just finished ({cid})")
            check(clip.locator(".d-play").is_visible(), "the play overlay shows (no iframe until the tap)")
            check(clip.locator("iframe").count() == 0, "no YouTube iframe is created before the tap")
            src = clip.locator(".d-video").get_attribute("data-src") or ""
            want_src = f"youtube-nocookie.com/embed/{entry['youtubeId']}?start={entry['start']}&end={entry['end']}&rel=0&modestbranding=1&playsinline=1" if entry else ""
            check(want_src and want_src in src, f"embed src carries the id, start/end, rel=0, modestbranding, playsinline: {src}")
            check(clip.locator(".d-why").inner_text().strip() == (entry or {}).get("why", "").strip(), "the why line shows above the video")
            page.screenshot(path=str(SHOTS / "clip.png"))
            clip.locator(".d-done").click(); page.wait_for_timeout(300)
            check(clip.locator(".d-opt").count() == 4, "DONE WATCHING reveals the 4-option question")
            check(clip.locator(".d-done").count() == 0, "the done button goes away once the question shows")
            clip.locator(".d-opt").nth(int(entry["q"]["ans"]) if entry else 0).click(); page.wait_for_timeout(300)
            check(clip.locator(".d-after.good").count() == 1 and clip.locator(".d-opt.right").count() == 1, "the clip question grades like any question")
            rev = page.evaluate("JSON.parse(localStorage.getItem('st_review')||'{}')")
            check(any(k == f"aws-saa-c03:clip:{cid}" for k in rev), f"the answer is recorded as aws-saa-c03:clip:<id>: {list(rev)}")
            page.screenshot(path=str(SHOTS / "clip-question.png"))
        sl = page.evaluate("DoomDebug.speechList('aws-saa-c03')")
        check(any(x["text"].startswith("A real one.") and x["voice"] == "onyx" for x in sl), "speechList carries the clip teach lines (Onyx)")
        check(any(x["text"].startswith((items[0]["q"]["q"] if items else "~")) and x["voice"] == "michael" for x in sl), "speechList carries the clip questions (Michael)")
        page.evaluate("localStorage.removeItem('st_review'); localStorage.removeItem('st_daylog')")
        # ---- GRIND: the original feed ----
        page.evaluate("localStorage.removeItem('st_doom_learn')")
        page.goto(base + "/doom.html?track=aws-saa-c03&mode=grind"); page.wait_for_load_state("networkidle"); page.wait_for_timeout(300)
        check(page.locator("#d-pick").is_hidden(), "?mode=grind&track= starts straight into Grind")
        check("GRIND" in page.locator("#d-track").inner_text(), "chip shows GRIND")
        check(page.locator(".d-card").count() >= 4, "first cards rendered ahead")
        check("track=aws-saa-c03" in page.url, "URL carries the track")
        # answer the first question card we can find (scroll to it)
        cards = page.locator(".d-card")
        q = None
        for i in range(cards.count()):
            if cards.nth(i).get_attribute("data-kind") == "q": q = cards.nth(i); break
        check(q is not None, "a question card exists in the first batch")
        q.scroll_into_view_if_needed(); page.wait_for_timeout(400)
        page.screenshot(path=str(SHOTS / "question.png"))
        q.locator(".d-opt").first.click(); page.wait_for_timeout(300)
        check(q.locator(".d-after").count() == 1, "verdict block appears after answering")
        check(q.locator(".d-opt.right").count() >= 1, "the right answer is highlighted")
        page.screenshot(path=str(SHOTS / "answered.png"))
        rev = page.evaluate("JSON.parse(localStorage.getItem('st_review')||'{}')")
        check(len(rev) == 1 and list(rev)[0].startswith("aws-saa-c03:mc:"), f"st_review has the answer: {list(rev)}")
        day = page.evaluate("Game.Day.today()")
        check(day["a"] == 1, f"day log counts 1 answer: {day}")
        check(page.locator("#d-today").inner_text() == "1", "top bar shows 1 today")
        # keyboard: ArrowDown moves to the next card (the active card is tracked by the IntersectionObserver)
        top0 = page.evaluate("document.getElementById('d-feed').scrollTop")
        page.keyboard.press("ArrowDown"); page.wait_for_timeout(500)
        top1 = page.evaluate("document.getElementById('d-feed').scrollTop")
        check(top1 > top0, f"ArrowDown scrolls to the next card ({top0} -> {top1})")
        # a flashcard: scroll on (rendering ahead) until one is in the DOM, then flip and grade it
        found_fc = False
        for _ in range(30):
            idx = page.evaluate("[...document.querySelectorAll('.d-card')].findIndex(c=>c.dataset.kind==='fc')")
            if idx >= 0:
                fc = page.locator(".d-card").nth(idx)
                fc.scroll_into_view_if_needed(); page.wait_for_timeout(400)
                fc.locator(".d-btn.flip").click(); page.wait_for_timeout(200)
                check(fc.locator(".d-back").is_visible(), "flashcard flips")
                fc.locator(".d-btn.yes").click(); page.wait_for_timeout(200)
                page.screenshot(path=str(SHOTS / "flashcard.png"))
                found_fc = True; break
            page.keyboard.press("ArrowDown"); page.wait_for_timeout(350)
        check(found_fc, "found and answered a flashcard")
        # a fact card: 30% of Grind slots, so keep scrolling (rendering ahead) until one is in the DOM instead of trusting six draws
        for _ in range(30):
            kinds = page.evaluate("[...document.querySelectorAll('.d-card')].map(c=>c.dataset.kind)")
            if "fact" in kinds: break
            page.keyboard.press("ArrowDown"); page.wait_for_timeout(300)
        check("fact" in kinds, f"a fact card appeared in the mix: {kinds}")
        fi = kinds.index("fact") if "fact" in kinds else -1
        if fi >= 0:
            page.locator(".d-card").nth(fi).scroll_into_view_if_needed(); page.wait_for_timeout(400)   # reaching it renders the cards after it
            page.screenshot(path=str(SHOTS / "fact.png"))
            kinds = page.evaluate("[...document.querySelectorAll('.d-card')].map(c=>c.dataset.kind)")
        check(fi >= 0 and fi + 1 < len(kinds) and kinds[fi + 1] == "q", f"a fact is followed by a question: {kinds}")
        total = page.evaluate("document.querySelectorAll('.d-card').length")
        check(total >= 6, f"feed keeps rendering ahead ({total} cards)")
        day = page.evaluate("Game.Day.today()")
        check(day["a"] == 2, f"day log counts 2 answers: {day}")
        # the picker reopens from the chip and keeps the mix
        page.locator("#d-track").click(); page.wait_for_timeout(200)
        check(page.locator("#d-pick").is_visible(), "track chip reopens the picker")
        check(page.locator(".d-track.primary").inner_text().find("AWS") >= 0, "current track listed first")
        # desktop size renders too
        ctx2 = b.new_context(viewport={"width": 1280, "height": 800}); pg2 = ctx2.new_page()
        pg2.goto(base + "/doom.html?track=comptia-securityplus"); pg2.wait_for_load_state("networkidle")
        check(pg2.locator("#d-pick").is_hidden(), "?track= deep link skips the landing")
        k2 = pg2.evaluate("[...document.querySelectorAll('.d-card')].map(c=>c.dataset.kind)")
        check(k2[0] == "cover", f"Security+ (no exam refs) also starts with a cover in Learn: {k2}")
        pg2.screenshot(path=str(SHOTS / "desktop.png"))
        check(not errors, "no page errors: " + "; ".join(errors[:3]))
        b.close()
    srv.shutdown()
    print("\n" + ("ALL OK" if not fails else f"{len(fails)} FAILED"))
    return 1 if fails else 0

if __name__ == "__main__":
    sys.exit(main())
