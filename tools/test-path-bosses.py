"""Playwright acceptance suite for Smart Path domain bosses (F7) and Arena #boss=<examKey> deep link.

    python tools/test-path-bosses.py
    python tools/test-path-bosses.py --selftest
"""
import functools, http.server, json, socketserver, sys, threading
from pathlib import Path
from playwright.sync_api import sync_playwright

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parent.parent
WWW = ROOT / "www"
SHOTS = ROOT / "tools" / "path-shots"


def make_handler(mutation=None):
    class Handler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(WWW), **kwargs)

        def end_headers(self):
            self.send_header("Cache-Control", "no-store")
            super().end_headers()

        def do_GET(self):
            clean_path = self.path.split("?", 1)[0].split("#", 1)[0]
            if mutation and clean_path in ("/path.html", "path.html"):
                src = (WWW / "path.html").read_text(encoding="utf-8")
                old, new = mutation
                if old not in src:
                    self.send_error(500, f"Mutation target not found: {old}")
                    return
                body = src.replace(old, new, 1).encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)
                return
            super().do_GET()

        def log_message(self, *a):
            pass

    return Handler


def serve(mutation=None):
    httpd = socketserver.ThreadingTCPServer(("127.0.0.1", 0), make_handler(mutation))
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, f"http://127.0.0.1:{httpd.server_address[1]}/"


def run_suite(p, mutation=None, take_shots=False, quiet=False):
    fails = []
    failed_groups = set()

    def check(cond, msg, group=None):
        if not quiet:
            print(("ok   " if cond else "FAIL ") + msg)
        if not cond:
            fails.append(msg)
            if group is not None:
                failed_groups.add(group)

    httpd, base = serve(mutation=mutation)
    try:
        browser = p.chromium.launch()
        ctx = browser.new_context(viewport={"width": 1280, "height": 800}, service_workers="block")
        page = ctx.new_page()
        errors = []
        page.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))
        page.on("console", lambda m: errors.append(f"console: {m.text}") if m.type == "error" else None)

        # --- 2. Empty profile on path.html --------------------------------------------------------------
        page.goto(base + "path.html")
        page.wait_for_load_state("load")
        page.evaluate("() => { localStorage.clear(); sessionStorage.clear(); }")
        page.reload()
        page.wait_for_load_state("load")

        empty_state = page.evaluate("""() => {
            const firstCard = document.querySelector('.path-card');
            const awsCard = document.querySelector('.path-card[data-course="aws-saa-c03"]');
            if (!awsCard) return null;
            const rings = [...awsCard.querySelectorAll('.ma-ring')].map(r => ({
                domain: r.getAttribute('data-domain'),
                text: r.querySelector('.ma-ring-val') ? r.querySelector('.ma-ring-val').textContent.trim() : r.textContent.trim(),
                pct: r.style.getPropertyValue('--pct').trim(),
                down: r.classList.contains('is-down')
            }));
            const hpEl = awsCard.querySelector('.ma-hp');
            const countEl = awsCard.querySelector('.ma-count');
            const lockedEl = awsCard.querySelector('.path-final-boss.is-locked');
            const fightBtn = awsCard.querySelector('a[href*="arena.html#boss="]');
            const nemesisEl = awsCard.querySelector('.path-nemesis');
            const covEl = awsCard.querySelector('details.path-coverage');
            const bp = (DATA._courseMeta.find(m => m.id === 'aws-saa-c03').examFormat || {}).blueprint || [];
            return {
                firstCourse: firstCard ? firstCard.getAttribute('data-course') : null,
                activeTrack: Game.Track.get(),
                bpDomains: bp.map(d => d.domain),
                rings,
                hp: hpEl ? hpEl.style.getPropertyValue('--hp').trim() : null,
                num: countEl ? countEl.style.getPropertyValue('--num').trim() : null,
                lockedText: lockedEl ? lockedEl.textContent.trim() : null,
                hasFightBtn: !!fightBtn,
                hasNemesis: !!nemesisEl,
                covPresent: !!covEl,
                covOpen: covEl ? covEl.open : null,
                readinessVal: awsCard.querySelector('.path-readiness-val').textContent.trim(),
                readinessLabel: awsCard.querySelector('.path-readiness-label').textContent.trim()
            };
        }""")

        check(empty_state is not None, "2. AWS card rendered on path.html", group=2)
        if empty_state:
            check(empty_state["firstCourse"] == empty_state["activeTrack"], f"2. Active track ({empty_state['activeTrack']}) rendered first", group=2)
            check(
                len(empty_state["rings"]) == 4
                and [r["domain"] for r in empty_state["rings"]] == empty_state["bpDomains"]
                and all(r["text"] == "0%" and r["pct"] == "0" and not r["down"] for r in empty_state["rings"]),
                f"2. Empty profile: 4 AWS blueprint rings all at 0% ({[r['text'] for r in empty_state['rings']]})",
                group=2,
            )
            check(empty_state["hp"] == "100" and empty_state["num"] == "100", f"2. Empty profile: HP bar at 100 (hp={empty_state['hp']}, num={empty_state['num']})", group=2)
            check(
                empty_state["lockedText"] is not None
                and "Unlocks when every domain is at 80%+" in empty_state["lockedText"]
                and "0 of 4 domains there" in empty_state["lockedText"]
                and not empty_state["hasFightBtn"],
                f"2. Empty profile: final boss locked ({empty_state['lockedText']})",
                group=2,
            )
            check(not empty_state["hasNemesis"], "2. Empty profile: no nemesis list", group=2)
            check(empty_state["covPresent"] and empty_state["covOpen"] is False, "2. Empty profile: Coverage fold present and closed", group=2)

        if take_shots:
            SHOTS.mkdir(parents=True, exist_ok=True)
            page.add_style_tag(content="#particle-canvas { display: none !important; }")
            sw_1280 = page.evaluate("() => ({ sw: document.documentElement.scrollWidth, w: window.innerWidth })")
            check(sw_1280["sw"] <= sw_1280["w"], f"7. Empty @1280x800: scrollWidth ({sw_1280['sw']}) <= innerWidth ({sw_1280['w']})", group=7)
            page.screenshot(path=str(SHOTS / "empty-1280x800.png"), full_page=True)

            page.set_viewport_size({"width": 360, "height": 800})
            page.wait_for_timeout(50)
            sw_360 = page.evaluate("() => ({ sw: document.documentElement.scrollWidth, w: window.innerWidth })")
            check(sw_360["sw"] <= sw_360["w"], f"7. Empty @360x800: scrollWidth ({sw_360['sw']}) <= innerWidth ({sw_360['w']})", group=7)
            page.screenshot(path=str(SHOTS / "empty-360x800.png"), full_page=True)
            page.set_viewport_size({"width": 1280, "height": 800})

        # --- 3. Seeded profile (partial domains, one >= 80%) -------------------------------------------
        seeded_info = page.evaluate("""() => {
            localStorage.clear();
            const m0 = Game.Review.mastery('aws-saa-c03');
            const targetFracs = [0.85, 0.50, 0.30, 0.15];
            const futureDue = Game.addDays(Game.dayKey(), 7);
            const allIds = Game.index().exam.get('aws-saa-c03');
            const byDom = {};
            allIds.forEach(id => {
                const d = Game.entry(id).domain;
                (byDom[d] = byDom[d] || []).push(id);
            });
            const rev = {};
            const picked = [];
            m0.domains.forEach((d, idx) => {
                const ids = byDom[d.domain] || [];
                const n = ids.length;
                const k = idx === 0 ? Math.ceil(n * 0.85) : Math.floor(n * targetFracs[idx]);
                for (let i = 0; i < k; i++) {
                    rev[ids[i]] = { b: 3, t: 1700000000, due: futureDue, n: 3, r: 3, m: 0 };
                }
                picked.push({ domain: d.domain, k, n, expectedPct: Math.round((k / n) * 100) });
            });
            localStorage.setItem('st_review', JSON.stringify(rev));
            return picked;
        }""")
        page.reload()
        page.wait_for_load_state("load")
        page.wait_for_timeout(40)

        seeded_state = page.evaluate("""() => {
            const m = Game.Review.mastery('aws-saa-c03');
            const awsCard = document.querySelector('.path-card[data-course="aws-saa-c03"]');
            const rings = [...awsCard.querySelectorAll('.ma-ring')].map(r => ({
                domain: r.getAttribute('data-domain'),
                text: r.querySelector('.ma-ring-val').textContent.trim(),
                pctProp: r.style.getPropertyValue('--pct').trim(),
                isDown: r.classList.contains('is-down')
            }));
            const hpEl = awsCard.querySelector('.ma-hp');
            const fightBtn = awsCard.querySelector('a[href*="arena.html#boss="]');
            const bossDown = JSON.parse(localStorage.getItem('st_boss_down') || '[]');
            const bossLast = JSON.parse(sessionStorage.getItem('ma_boss_last') || '{}');
            return {
                mastery: m,
                rings,
                hpProp: hpEl ? hpEl.style.getPropertyValue('--hp').trim() : null,
                expectedHp: String(Math.round(100 - m.readiness * 100)),
                hasFightBtn: !!fightBtn,
                bossDown,
                hasBossLast: !!bossLast['aws-saa-c03']
            };
        }""")

        for i, p_dom in enumerate(seeded_info):
            ring = seeded_state["rings"][i]
            m_dom = seeded_state["mastery"]["domains"][i]
            want_pct = round(m_dom["pct"] * 100)
            check(
                ring["text"] == f"{want_pct}%" and want_pct == p_dom["expectedPct"] and ring["pctProp"] == str(want_pct),
                f"3. Ring {p_dom['domain']}: text={ring['text']} matches mastery pct={want_pct}% and k/n={p_dom['k']}/{p_dom['n']}",
                group=3,
            )

        check(
            seeded_state["hpProp"] == seeded_state["expectedHp"],
            f"3. HP bar --hp={seeded_state['hpProp']} equals Math.round(100 - readiness*100)={seeded_state['expectedHp']}",
            group=3,
        )
        check(
            seeded_state["rings"][0]["isDown"] and not any(r["isDown"] for r in seeded_state["rings"][1:]),
            f"3. >=80% ring ({seeded_state['rings'][0]['domain']}) has .is-down and others do not",
            group=3,
        )
        down_key = f"aws-saa-c03:{seeded_info[0]['domain']}"
        check(
            seeded_state["bossDown"] == [down_key],
            f"3. st_boss_down contains [{down_key}] ({seeded_state['bossDown']})",
            group=3,
        )
        # Reload a second time and confirm st_boss_down does not add it twice
        page.reload()
        page.wait_for_load_state("load")
        boss_down_2 = page.evaluate("() => JSON.parse(localStorage.getItem('st_boss_down') || '[]')")
        check(
            boss_down_2 == [down_key],
            f"3. Second load does not duplicate st_boss_down ({boss_down_2})",
            group=3,
        )

        # Also check that final boss is STILL locked when only 1 of 4 domains is >= 80%
        check(
            not seeded_state["hasFightBtn"],
            "4. Final boss stays locked when only 1 of 4 domains is >= 80%",
            group=4,
        )

        # --- 5. Two nemesis records (m: 2, b: 0) -> nemesis list shows 2 entries ------------------------
        page.evaluate("""() => {
            const rev = JSON.parse(localStorage.getItem('st_review') || '{}');
            const allIds = Game.index().exam.get('aws-saa-c03');
            const unseen = allIds.filter(id => !rev[id]).slice(0, 2);
            const tomorrow = Game.addDays(Game.dayKey(), 1);
            unseen.forEach(id => {
                rev[id] = { b: 0, t: 1700000100, due: tomorrow, n: 2, r: 0, m: 2 };
            });
            localStorage.setItem('st_review', JSON.stringify(rev));
        }""")
        page.reload()
        page.wait_for_load_state("load")
        nem_state = page.evaluate("""() => {
            const awsCard = document.querySelector('.path-card[data-course="aws-saa-c03"]');
            const det = awsCard.querySelector('details.path-nemesis');
            if (!det) return null;
            const summary = det.querySelector('summary').textContent.trim();
            const items = [...det.querySelectorAll('.path-nemesis-item')].map(li => ({
                q: li.querySelector('.path-nemesis-q').textContent.trim(),
                dom: li.querySelector('.path-nemesis-dom').textContent.trim()
            }));
            return { summary, items };
        }""")
        check(
            nem_state is not None and nem_state["summary"] == "Nemesis questions (2)" and len(nem_state["items"]) == 2 and all(x["q"] and x["dom"] for x in nem_state["items"]),
            f"5. Two nemesis records -> nemesis list shows 2 entries ({nem_state['summary'] if nem_state else 'missing'})",
            group=5,
        )

        if take_shots:
            page.add_style_tag(content="#particle-canvas { display: none !important; }")
            sw_1280_s = page.evaluate("() => ({ sw: document.documentElement.scrollWidth, w: window.innerWidth })")
            check(sw_1280_s["sw"] <= sw_1280_s["w"], f"7. Seeded @1280x800: scrollWidth ({sw_1280_s['sw']}) <= innerWidth ({sw_1280_s['w']})", group=7)
            page.screenshot(path=str(SHOTS / "seeded-1280x800.png"), full_page=True)

            page.set_viewport_size({"width": 360, "height": 800})
            page.wait_for_timeout(50)
            sw_360_s = page.evaluate("() => ({ sw: document.documentElement.scrollWidth, w: window.innerWidth })")
            check(sw_360_s["sw"] <= sw_360_s["w"], f"7. Seeded @360x800: scrollWidth ({sw_360_s['sw']}) <= innerWidth ({sw_360_s['w']})", group=7)
            page.screenshot(path=str(SHOTS / "seeded-360x800.png"), full_page=True)
            page.set_viewport_size({"width": 1280, "height": 800})

        # --- 6. Thin-bank track (< 15 questions per domain) shows "not enough" state --------------------
        thin_state = page.evaluate("""() => {
            const metas = DATA._courseMeta.filter(m => m.examKey && m.examFormat && m.examFormat.blueprint);
            for (const m of metas) {
                const mas = Game.Review.mastery(m.id);
                if (!mas.measurable && mas.domains.some(d => !d.enough)) {
                    const card = document.querySelector(`.path-card[data-course="${m.id}"]`);
                    if (!card) continue;
                    const unm = card.querySelector('.path-boss-unmeasurable');
                    const dimRings = [...card.querySelectorAll('.ma-ring.is-dim')].map(r => r.textContent.trim());
                    const label = card.querySelector('.path-readiness-label').textContent.trim();
                    return {
                        courseId: m.id,
                        unmeasurableText: unm ? unm.textContent.trim() : null,
                        hasHpBar: !!card.querySelector('.ma-hp'),
                        dimRings,
                        label
                    };
                }
            }
            return null;
        }""")
        check(
            thin_state is not None
            and thin_state["unmeasurableText"] == "Not enough questions to measure readiness yet"
            and not thin_state["hasHpBar"]
            and len(thin_state["dimRings"]) >= 1
            and all("Qs, not enough yet" in t for t in thin_state["dimRings"])
            and thin_state["label"] == "Readiness (estimate)",
            f"6. Thin-bank track ({thin_state['courseId'] if thin_state else 'none'}) shows not-enough state and dimmed rings",
            group=6,
        )

        # --- 4. Seed every AWS domain >= 80% -> Fight the final boss -> Arena deep link -----------------
        page.evaluate("""() => {
            const futureDue = Game.addDays(Game.dayKey(), 7);
            const allIds = Game.index().exam.get('aws-saa-c03');
            const byDom = {};
            allIds.forEach(id => {
                const d = Game.entry(id).domain;
                (byDom[d] = byDom[d] || []).push(id);
            });
            const rev = {};
            Object.values(byDom).forEach(ids => {
                const k = Math.ceil(ids.length * 0.85);
                for (let i = 0; i < k; i++) {
                    rev[ids[i]] = { b: 3, t: 1700000200, due: futureDue, n: 3, r: 3, m: 0 };
                }
            });
            localStorage.setItem('st_review', JSON.stringify(rev));
            localStorage.setItem('st_exam_practice', '1');
        }""")
        page.reload()
        page.wait_for_load_state("load")

        boss_btn_state = page.evaluate("""() => {
            const awsCard = document.querySelector('.path-card[data-course="aws-saa-c03"]');
            const btn = awsCard.querySelector('a.path-final-btn.ma-overclock-aware');
            return btn ? {
                href: btn.getAttribute('href'),
                text: btn.textContent.trim(),
                visible: btn.offsetWidth > 0 && btn.offsetHeight > 0
            } : null;
        }""")
        check(
            boss_btn_state is not None
            and boss_btn_state["visible"]
            and boss_btn_state["href"] == "arena.html#boss=aws"
            and "Fight the final boss" in boss_btn_state["text"],
            f"4. Every AWS domain >=80% -> final boss button visible with href=arena.html#boss=aws ({boss_btn_state})",
            group=4,
        )

        if boss_btn_state and boss_btn_state["visible"]:
            page.locator('.path-card[data-course="aws-saa-c03"] a.path-final-btn').click()
            page.wait_for_load_state("load")
            page.wait_for_selector(".exam-shell")
            arena_state = page.evaluate("""() => ({
                active: !!(app.exam && !app.exam.done),
                type: app.exam ? app.exam.type : null,
                mode: app.exam ? app.exam.mode : null,
                qLen: app.exam ? app.exam.questions.length : 0,
                fullLen: app.exam ? app.exam.f.questions : -1,
                practice: app.exam ? app.exam.practice : null,
                storedPractice: localStorage.getItem('st_exam_practice'),
                hash: location.hash
            })""")
            check(
                arena_state["active"]
                and arena_state["type"] == "aws"
                and arena_state["mode"] is None
                and arena_state["qLen"] == 65
                and arena_state["qLen"] == arena_state["fullLen"]
                and arena_state["practice"] is False
                and arena_state["storedPractice"] == "1"
                and arena_state["hash"] == "",
                f"4. Clicking final boss starts full AWS exam in exam mode, st_exam_practice='1' unchanged, hash cleared ({arena_state})",
                group=4,
            )
        else:
            check(False, "4. Clicking final boss button (skipped because button not visible)", group=4)

        # --- 1. Check unknown #boss= key is ignored cleanly and no console/page errors ------------------
        page.goto(base + "arena.html?unknown=1#boss=unknown_exam_key")
        page.wait_for_load_state("load")
        unknown_ok = page.evaluate("() => !app.exam && !!document.querySelector('.exam-card')")
        check(unknown_ok, "1. Unknown #boss=<key> ignored cleanly on arena.html", group=1)
        check(not errors, "1. No console or page errors on path.html and arena.html" + ("" if not errors else ": " + " | ".join(errors[:5])), group=1)

        browser.close()
    finally:
        httpd.shutdown()

    return fails, failed_groups


def main():
    with sync_playwright() as p:
        fails, _ = run_suite(p, mutation=None, take_shots=True, quiet=False)
        exit_code = 1 if fails else 0

        if "--selftest" in sys.argv:
            print("\nself-test (planted bugs):")
            plants = [
                (
                    "rings use 1 - pct",
                    "const ringPct = Math.round(d.pct * 100);",
                    "const ringPct = Math.round((1 - d.pct) * 100);",
                    3,
                ),
                (
                    "final boss ignores bossReady",
                    "const finalReady = m.bossReady;",
                    "const finalReady = false;",
                    4,
                ),
            ]
            for name, old, new, expected_group in plants:
                _, failed_groups = run_suite(p, mutation=(old, new), take_shots=False, quiet=True)
                if expected_group in failed_groups:
                    print(f"  caught  {name} (check {expected_group} failed as expected)")
                else:
                    print(f"  MISSED  {name} (expected check {expected_group} to fail, got {sorted(failed_groups)})")
                    exit_code = 1

        print(f"\n{'FAILED' if exit_code else 'PASSED'}")
        sys.exit(exit_code)


if __name__ == "__main__":
    main()
