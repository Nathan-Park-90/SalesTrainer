#!/usr/bin/env python3
"""Sync & Backup round trip with the game-layer keys, through the real modal (phone <-> PC).

Two separate browser profiles stand in for the phone (390x844) and the PC (1280x800). Each one plays a little, then
the phone's Sync Code is pasted into the PC (Smart Merge), and the PC's merged code goes back to the phone. Asserts:
st_review per question newest-t wins, st_daylog per day keeps the busier device, st_active_track newest wins,
st_boss_down is a union, st_juice stays on its device, sessionStorage ma_boss_last never travels, both devices end
identical on the synced keys, and a repeat merge changes nothing.

Usage: python tools/test-sync-roundtrip.py
"""
import functools
import http.server
import json
import pathlib
import socket
import sys
import threading
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parents[1] / "www"
SYNCED = ["st_review", "st_daylog", "st_active_track", "st_boss_down"]


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):  # noqa: A002
        pass


def serve():
    sock = socket.socket()
    sock.bind(("127.0.0.1", 0))
    port = sock.getsockname()[1]
    sock.close()
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", port), functools.partial(QuietHandler, directory=str(ROOT)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv, f"http://127.0.0.1:{port}/"


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    srv, base = serve()
    results = []

    def check(cond, label, detail: object = ""):
        results.append(bool(cond))
        print(f"  {'ok  ' if cond else 'FAIL'} {label}" + ("" if cond or detail == "" else f"  -> {detail}"))

    with sync_playwright() as p:
        browser = p.chromium.launch()
        phone = browser.new_context(viewport={"width": 390, "height": 844}, service_workers="block")
        pc = browser.new_context(viewport={"width": 1280, "height": 800}, service_workers="block")
        errors = []
        pages = {}
        for name, ctx in (("phone", phone), ("pc", pc)):
            pg = ctx.new_page()
            pg.on("pageerror", lambda e, n=name: errors.append(f"{n} pageerror: {e}"))
            pg.on("console", lambda m, n=name: errors.append(f"{n} console: {m.text}") if m.type == "error" else None)
            pg.goto(base + "index.html")
            pg.wait_for_load_state("load")
            pages[name] = pg
        ph, pcp = pages["phone"], pages["pc"]

        # Shared question ids (same course, same scheme on both devices)
        ids = ph.evaluate("() => [...Game.index().exam.get('aws-saa-c03')].slice(0, 6)")
        # Phone: answers 0..2 for real; question 3 answered long ago; boss 'down' for domain X; track AWS set now.
        ph.evaluate("""(ids) => {
            Game.Review.record(ids[0], true);
            Game.Review.record(ids[1], false);
            Game.Review.record(ids[2], true);
            const rv = JSON.parse(localStorage.getItem('st_review') || '{}');
            rv[ids[3]] = { b: 3, t: 1000, due: '2026-01-01', n: 4, r: 4, m: 0, u: '2025-12-20' };
            localStorage.setItem('st_review', JSON.stringify(rv));
            const log = JSON.parse(localStorage.getItem('st_daylog') || '{}');
            log['2026-10-01'] = { a: 9, c: 7 };
            log['2026-10-02'] = { a: 2, c: 1 };
            localStorage.setItem('st_daylog', JSON.stringify(log));
            localStorage.setItem('st_boss_down', JSON.stringify(['aws-saa-c03:Design Secure Architectures']));
            localStorage.setItem('st_juice', JSON.stringify({ sound: 1, haptics: 1 }));
            sessionStorage.setItem('ma_boss_last', '{"aws-saa-c03":{"hp":40}}');
        }""", ids)
        # PC: newer record for question 3, its own question 4, a different boss domain, an older track pick.
        pcp.evaluate("""(ids) => {
            const now = Math.floor(Date.now() / 1000);
            const rv = {};
            rv[ids[3]] = { b: 0, t: now + 60, due: '2026-11-04', n: 5, r: 4, m: 1, u: '2026-11-03' };
            rv[ids[4]] = { b: 1, t: now - 3600, due: '2026-11-04', n: 1, r: 1, m: 0, u: '2026-11-03' };
            localStorage.setItem('st_review', JSON.stringify(rv));
            localStorage.setItem('st_daylog', JSON.stringify({ '2026-10-01': { a: 3, c: 3 }, '2026-10-02': { a: 6, c: 5, d: 1 } }));
            localStorage.setItem('st_boss_down', JSON.stringify(['aws-saa-c03:Design High-Performing Architectures']));
            localStorage.setItem('st_active_track', JSON.stringify({ id: 'psm-scrum', t: 1 }));
            localStorage.setItem('st_juice', JSON.stringify({ sound: 0, haptics: 0 }));
        }""", ids)
        ph.evaluate("() => Game.Track.set('aws-saa-c03')")
        before_phone = ph.evaluate(f"() => Object.fromEntries({json.dumps(SYNCED)}.map(k => [k, localStorage.getItem(k)]))")
        before_pc = pcp.evaluate(f"() => Object.fromEntries({json.dumps(SYNCED)}.map(k => [k, localStorage.getItem(k)]))")

        def export_code(pg):
            pg.evaluate("() => MammothSync.open('export')")
            pg.locator('.sync-dialog [data-act="copy"]').click()
            pg.wait_for_function("() => (document.getElementById('sync-code-out').value || '').length > 20")
            code = pg.locator("#sync-code-out").input_value()
            pg.keyboard.press("Escape")
            return code

        def import_code(pg, code):
            pg.evaluate("() => MammothSync.open('import')")
            pg.locator("#sync-code-in").fill(code)
            pg.locator('.sync-dialog [data-act="check"]').click()
            pg.wait_for_selector('.sync-preview [data-act="apply"]')
            with pg.expect_navigation():
                pg.locator('.sync-preview [data-act="apply"]').click()
            pg.wait_for_load_state("load")

        def state(pg):
            return pg.evaluate(f"""() => ({{
                keys: Object.fromEntries({json.dumps(SYNCED)}.map(k => [k, JSON.parse(localStorage.getItem(k) || 'null')])),
                juice: JSON.parse(localStorage.getItem('st_juice') || 'null'),
                track: Game.Track.get()
            }})""")

        code1 = export_code(ph)
        payload = pcp.evaluate("async (c) => (await MammothSync.decodeInput(c))", code1)
        pkeys = (payload or {}).get("keys") or (payload or {}).get("payload", {}).get("keys") or {}
        check("st_review" in pkeys and "st_boss_down" in pkeys and "st_daylog" in pkeys and "st_active_track" in pkeys,
              "phone's Sync Code carries st_review, st_daylog, st_active_track, st_boss_down", sorted(pkeys)[:12])
        check("ma_boss_last" not in pkeys, "sessionStorage ma_boss_last is not in the code")

        import_code(pcp, code1)
        s_pc = state(pcp)
        rv = s_pc["keys"]["st_review"] or {}
        ph_rv = json.loads(before_phone["st_review"])
        check(all(i in rv for i in ids[:5]), "PC now has the phone's records and keeps its own (5 questions)", sorted(rv))
        check(rv.get(ids[3], {}).get("t") == json.loads(before_pc["st_review"])[ids[3]]["t"],
              "a question on both: the newer answer (PC's) wins", rv.get(ids[3]))
        check(rv.get(ids[1]) == ph_rv[ids[1]], "phone's miss arrives unchanged (box 0)", rv.get(ids[1]))
        log = s_pc["keys"]["st_daylog"] or {}
        check(log.get("2026-10-01", {}).get("a") == 9 and log.get("2026-10-02", {}).get("a") == 6 and log["2026-10-02"].get("d") == 1,
              "daylog per day keeps the busier device and a passed Daily", log)
        check(s_pc["track"] == "aws-saa-c03", f"active track: the newer pick (phone's AWS) wins on the PC (got {s_pc['track']})")
        check(sorted(s_pc["keys"]["st_boss_down"] or []) == sorted(["aws-saa-c03:Design Secure Architectures",
              "aws-saa-c03:Design High-Performing Architectures"]), "st_boss_down is the union", s_pc["keys"]["st_boss_down"])
        check(s_pc["juice"] == {"sound": 0, "haptics": 0}, "PC keeps its own sound setting (st_juice is device-only)", s_pc["juice"])

        code2 = export_code(pcp)
        import_code(ph, code2)
        s_ph = state(ph)
        # st_boss_down is a set: a union keeps each device's own order, so compare it sorted.
        def norm(keys):
            return dict(keys, st_boss_down=sorted(keys.get("st_boss_down") or []))
        check(norm(s_ph["keys"]) == norm(s_pc["keys"]), "after the trip back both devices hold identical synced keys",
              {k: (norm(s_ph["keys"])[k] == norm(s_pc["keys"])[k]) for k in SYNCED})
        check(s_ph["juice"] == {"sound": 1, "haptics": 1}, "phone keeps its own sound setting", s_ph["juice"])

        # Repeat merge: nothing changes byte for byte
        raw_before = pcp.evaluate("() => JSON.stringify(Object.fromEntries(Object.keys(localStorage).filter(k => k.startsWith('st_')).sort().map(k => [k, localStorage.getItem(k)])))")
        import_code(pcp, code2)
        raw_after = pcp.evaluate("() => JSON.stringify(Object.fromEntries(Object.keys(localStorage).filter(k => k.startsWith('st_')).sort().map(k => [k, localStorage.getItem(k)])))")
        check(raw_before == raw_after, "merging the same code again changes nothing")

        # The merged profile still drives the game layer: path bosses and the home card render with no errors
        for name in ("path.html", "index.html", "arena.html"):
            pcp.goto(base + name)
            pcp.wait_for_load_state("load")
        pcp.goto(base + "index.html")
        pcp.wait_for_selector("#ma-next", timeout=3000)
        check(pcp.locator("#ma-next").is_visible(), "merged PC is a returning visitor: the next-question card shows")
        check(not errors, "no console or page errors", errors[:5])
        browser.close()
    srv.shutdown()
    ok = all(results)
    print(f"\n{'PASSED' if ok else 'FAILED'}: {sum(results)}/{len(results)}")
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
