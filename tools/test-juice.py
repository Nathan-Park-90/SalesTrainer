#!/usr/bin/env python3
"""Playwright acceptance test suite for Mammoth Academy juice layer (juice.css + juice.js)."""

import argparse
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
DEMO_HTML = ROOT / "tools" / "juice-demo.html"
SHOTS_DIR = ROOT / "tools" / "juice-shots"

ALL_EVENTS = ["tap", "correct", "combo", "miss", "rematch", "mastered", "daily", "burst"]

AUDIO_WRAP_INIT_SCRIPT = """
(() => {
    window.__audioCtxCount = 0;
    const OrigAC = window.AudioContext || window.webkitAudioContext;
    if (OrigAC) {
        const WrappedAC = function(...args) {
            window.__audioCtxCount++;
            return new OrigAC(...args);
        };
        WrappedAC.prototype = OrigAC.prototype;
        window.AudioContext = WrappedAC;
        if (window.webkitAudioContext) {
            window.webkitAudioContext = WrappedAC;
        }
    }
})();
"""


def check_2_clean_profile_and_no_audio_when_muted(page):
    """Check 2: settings() is {sound:false, haptics:true} on a clean profile; 0 AudioContext when firing all events."""
    s = page.evaluate("() => window.Juice.settings()")
    assert s == {"sound": False, "haptics": True}, f"Expected default settings {{sound: False, haptics: True}}, got {s}"

    page.evaluate(
        """(events) => {
            const el = document.getElementById('eventTarget');
            for (const ev of events) {
                window.Juice.fire(ev, el);
            }
        }""",
        ALL_EVENTS,
    )
    count = page.evaluate("() => window.__audioCtxCount")
    assert count == 0, f"Expected 0 AudioContext constructions with sound off, got {count}"


def check_3_one_audio_context_when_sound_on(page):
    """Check 3: With sound on, one AudioContext total after firing every event twice."""
    page.evaluate("() => window.Juice.set('sound', true)")
    page.evaluate(
        """(events) => {
            const el = document.getElementById('eventTarget');
            for (let r = 0; r < 2; r++) {
                for (const ev of events) {
                    window.Juice.fire(ev, el);
                }
            }
        }""",
        ALL_EVENTS,
    )
    count = page.evaluate("() => window.__audioCtxCount")
    assert count == 1, f"Expected exactly 1 AudioContext after firing every event twice with sound on, got {count}"
    page.evaluate("() => window.Juice.set('sound', false)")


def check_4_miss_class_lifecycle_and_replay(page):
    """Check 4: fire('miss', el) adds .jc-miss, removes after animation; firing twice in a row replays."""
    added = page.evaluate(
        """() => {
            const el = document.getElementById('eventTarget');
            el.classList.remove('jc-miss');
            window.Juice.fire('miss', el);
            return el.classList.contains('jc-miss');
        }"""
    )
    assert added is True, "Expected .jc-miss to be present immediately after Juice.fire('miss', el)"

    # animationend normally lands ~0.45 s in; under CPU load it can be late, and juice.js has a 1.5 s fallback
    # timer, so poll up to that bound instead of a fixed 550 ms sleep (that was flaky: 2 of 3 runs on Nov 3).
    try:
        page.wait_for_function("() => !document.getElementById('eventTarget').classList.contains('jc-miss')", timeout=1800)
    except Exception:
        pass
    still_there = page.evaluate("() => document.getElementById('eventTarget').classList.contains('jc-miss')")
    assert still_there is False, "Expected .jc-miss to be removed after animation finishes"

    replay_info = page.evaluate(
        """() => {
            const el = document.getElementById('eventTarget');
            let removeCalls = 0;
            let addCalls = 0;
            const origRemove = el.classList.remove.bind(el.classList);
            const origAdd = el.classList.add.bind(el.classList);
            el.classList.remove = function(...args) {
                if (args.includes('jc-miss')) removeCalls++;
                return origRemove(...args);
            };
            el.classList.add = function(...args) {
                if (args.includes('jc-miss')) addCalls++;
                return origAdd(...args);
            };
            try {
                window.Juice.fire('miss', el);
                window.Juice.fire('miss', el);
                return {
                    hasClass: el.classList.contains('jc-miss'),
                    removeCalls,
                    addCalls
                };
            } finally {
                el.classList.remove = origRemove;
                el.classList.add = origAdd;
            }
        }"""
    )
    assert replay_info["hasClass"] is True, "Expected .jc-miss to be present after second fire('miss', el)"
    assert replay_info["removeCalls"] >= 2 and replay_info["addCalls"] == 2, (
        f"Expected replay to remove and re-add .jc-miss on second call, got {replay_info}"
    )

    page.wait_for_timeout(550)
    after_replay = page.evaluate("() => document.getElementById('eventTarget').classList.contains('jc-miss')")
    assert after_replay is False, "Expected .jc-miss to be removed after replayed animation finishes"


def check_5_float_and_burst_cleanup(page):
    """Check 5: float and burst nodes are removed after they finish."""
    counts_start = page.evaluate(
        """() => {
            const el = document.getElementById('burstBox');
            window.Juice.float(el, '+1', 'good');
            window.Juice.burst(el);
            return {
                floats: el.querySelectorAll('.jc-float').length,
                sparks: el.querySelectorAll('.jc-spark').length
            };
        }"""
    )
    assert counts_start["floats"] == 1, f"Expected 1 .jc-float immediately after float(), got {counts_start['floats']}"
    assert counts_start["sparks"] == 12, f"Expected 12 .jc-spark immediately after burst(), got {counts_start['sparks']}"

    page.wait_for_timeout(1150)
    counts_end = page.evaluate(
        """() => {
            const el = document.getElementById('burstBox');
            return {
                floats: el.querySelectorAll('.jc-float').length,
                sparks: el.querySelectorAll('.jc-spark').length
            };
        }"""
    )
    assert counts_end["floats"] == 0, f"Expected 0 .jc-float after animation finishes, got {counts_end['floats']}"
    assert counts_end["sparks"] == 0, f"Expected 0 .jc-spark after animation finishes, got {counts_end['sparks']}"


def check_6_daily_overclock_hue(page):
    """Check 6: fire('daily') sets html[data-daily='done']; --ma-hue computed value changes over time."""
    page.evaluate("() => { delete document.documentElement.dataset.daily; }")
    page.wait_for_timeout(50)

    page.evaluate("() => window.Juice.fire('daily', document.getElementById('ocCard'))")
    daily_attr = page.evaluate("() => document.documentElement.dataset.daily")
    assert daily_attr == "done", f"Expected html[data-daily='done'], got {daily_attr!r}"

    samples = []
    for _ in range(6):
        val = page.evaluate("() => getComputedStyle(document.documentElement).getPropertyValue('--ma-hue').trim()")
        samples.append(val)
        page.wait_for_timeout(120)

    unique_samples = set(samples)
    assert len(unique_samples) > 1, f"Expected --ma-hue computed value to change over time, got static samples: {samples}"


def check_7_reduced_motion(browser, demo_url):
    """Check 7: With reduced_motion='reduce', computed animation-name of .jc-miss is not the shake keyframes."""
    ctx_normal = browser.new_context(reduced_motion="no-preference")
    p_normal = ctx_normal.new_page()
    p_normal.goto(demo_url, wait_until="load")
    normal_anim = p_normal.evaluate(
        """() => {
            const el = document.getElementById('eventTarget');
            window.Juice.fire('miss', el);
            return getComputedStyle(el).animationName;
        }"""
    )
    ctx_normal.close()
    assert normal_anim == "jc-shake", f"Expected normal motion animationName to be 'jc-shake', got {normal_anim!r}"

    ctx_rm = browser.new_context(reduced_motion="reduce")
    p_rm = ctx_rm.new_page()
    p_rm.goto(demo_url, wait_until="load")
    rm_anim = p_rm.evaluate(
        """() => {
            const el = document.getElementById('eventTarget');
            window.Juice.fire('miss', el);
            return getComputedStyle(el).animationName;
        }"""
    )
    ctx_rm.close()
    assert rm_anim != "jc-shake", f"Expected reduced-motion .jc-miss animationName NOT to be 'jc-shake', got {rm_anim!r}"


def check_8_mount_toggle_idempotent_and_flips(page):
    """Check 8: mountToggle() twice -> one toggle; clicking flips st_juice.sound and aria-pressed."""
    page.evaluate("() => { localStorage.removeItem('st_juice'); window.Juice.mountToggle(); window.Juice.mountToggle(); }")
    count = page.evaluate("() => document.querySelectorAll('.navbar .nav-links .jc-sound-toggle').length")
    assert count == 1, f"Expected exactly 1 .jc-sound-toggle after calling mountToggle() twice, got {count}"

    initial = page.evaluate(
        """() => ({
            pressed: document.querySelector('.jc-sound-toggle').getAttribute('aria-pressed'),
            sound: window.Juice.settings().sound
        })"""
    )
    assert initial == {"pressed": "false", "sound": False}, f"Unexpected initial toggle state: {initial}"

    page.click(".jc-sound-toggle")
    after_first = page.evaluate(
        """() => ({
            pressed: document.querySelector('.jc-sound-toggle').getAttribute('aria-pressed'),
            sound: window.Juice.settings().sound,
            raw: JSON.parse(localStorage.getItem('st_juice'))
        })"""
    )
    assert after_first["pressed"] == "true", f"Expected aria-pressed='true' after click, got {after_first['pressed']}"
    assert after_first["sound"] is True, "Expected Juice.settings().sound to be True after click"
    assert after_first["raw"]["sound"] == 1, f"Expected st_juice.sound == 1 in localStorage, got {after_first['raw']}"

    page.click(".jc-sound-toggle")
    after_second = page.evaluate(
        """() => ({
            pressed: document.querySelector('.jc-sound-toggle').getAttribute('aria-pressed'),
            sound: window.Juice.settings().sound,
            raw: JSON.parse(localStorage.getItem('st_juice'))
        })"""
    )
    assert after_second["pressed"] == "false", f"Expected aria-pressed='false' after second click, got {after_second['pressed']}"
    assert after_second["sound"] is False, "Expected Juice.settings().sound to be False after second click"
    assert after_second["raw"]["sound"] == 0, f"Expected st_juice.sound == 0 in localStorage, got {after_second['raw']}"


def check_9_mobile_viewport_no_overflow(page, save_shot=False):
    """Check 9: Viewport 360x800 has document.documentElement.scrollWidth <= 360."""
    page.set_viewport_size({"width": 360, "height": 800})
    page.wait_for_timeout(100)
    scroll_w = page.evaluate("() => document.documentElement.scrollWidth")
    assert scroll_w <= 360, f"Expected scrollWidth <= 360 at 360x800 viewport, got {scroll_w}"
    if save_shot:
        SHOTS_DIR.mkdir(parents=True, exist_ok=True)
        page.screenshot(path=str(SHOTS_DIR / "mobile-360.png"), full_page=True)


def check_10_corrupt_storage_defaults(page):
    """Check 10: Corrupt st_juice ('{nope') -> defaults, no throw."""
    res = page.evaluate(
        """() => {
            localStorage.setItem('st_juice', '{nope');
            return window.Juice.settings();
        }"""
    )
    assert res == {"sound": False, "haptics": True}, f"Expected defaults on corrupt st_juice, got {res}"


def run_selftest(browser, demo_url):
    """Check 11: Plant-a-bug self-check confirming check 4 and check 2 fail when bugs are planted."""
    print("Running --selftest (plant-a-bug verification)...")

    # Bug 1: monkeypatch Juice.fire to skip class removal and confirm check 4 fails
    ctx1 = browser.new_context()
    p1 = ctx1.new_page()
    p1.goto(demo_url, wait_until="load")
    p1.evaluate(
        """() => {
            window.Juice.fire = function(ev, el) {
                if (ev === 'miss' && el) el.classList.add('jc-miss');
            };
        }"""
    )
    check4_caught = False
    check4_err = ""
    try:
        check_4_miss_class_lifecycle_and_replay(p1)
    except AssertionError as exc:
        check4_caught = True
        check4_err = str(exc)
    finally:
        ctx1.close()

    print(f"  [selftest 1] Planted skip-class-removal bug -> check 4 failed as expected: {check4_caught} ({check4_err})")
    assert check4_caught, "Selftest failed: check 4 did NOT fail when Juice.fire skipped class removal!"

    # Bug 2: set default sound to on and confirm check 2 fails
    ctx2 = browser.new_context()
    ctx2.add_init_script(AUDIO_WRAP_INIT_SCRIPT)
    p2 = ctx2.new_page()
    p2.goto(demo_url, wait_until="load")
    p2.evaluate("() => { window.Juice._defaults = { sound: 1, haptics: 1 }; }")
    check2_caught = False
    check2_err = ""
    try:
        check_2_clean_profile_and_no_audio_when_muted(p2)
    except AssertionError as exc:
        check2_caught = True
        check2_err = str(exc)
    finally:
        ctx2.close()

    print(f"  [selftest 2] Planted default-sound-on bug   -> check 2 failed as expected: {check2_caught} ({check2_err})")
    assert check2_caught, "Selftest failed: check 2 did NOT fail when default sound was set to on!"
    print("PASS: Both planted bugs were caught by checks 4 and 2.")


def run_all():
    parser = argparse.ArgumentParser(description="Test Mammoth Academy juice layer")
    parser.add_argument("--selftest", action="store_true", help="Run plant-a-bug self-checks")
    args = parser.parse_args()

    if not DEMO_HTML.exists():
        print(f"ERROR: {DEMO_HTML} not found", file=sys.stderr)
        sys.exit(1)

    demo_url = DEMO_HTML.resolve().as_uri()

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)

        if args.selftest:
            run_selftest(browser, demo_url)
            browser.close()
            return

        context = browser.new_context(viewport={"width": 1280, "height": 900})
        context.add_init_script(AUDIO_WRAP_INIT_SCRIPT)
        page = context.new_page()

        console_errors = []
        page_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda err: page_errors.append(str(err)))

        page.goto(demo_url, wait_until="load")

        # Save desktop screenshot before mutating state
        SHOTS_DIR.mkdir(parents=True, exist_ok=True)
        page.screenshot(path=str(SHOTS_DIR / "desktop.png"), full_page=True)

        check_2_clean_profile_and_no_audio_when_muted(page)
        print("PASS 2: Clean profile settings {sound:false, haptics:true} & 0 AudioContexts when muted")

        check_3_one_audio_context_when_sound_on(page)
        print("PASS 3: Exactly 1 AudioContext constructed after firing all events twice with sound on")

        check_4_miss_class_lifecycle_and_replay(page)
        print("PASS 4: fire('miss', el) adds .jc-miss, removes on animationend, and replays on double fire")

        check_5_float_and_burst_cleanup(page)
        print("PASS 5: float() and burst() DOM nodes are cleaned up after animations finish")

        check_6_daily_overclock_hue(page)
        print("PASS 6: fire('daily') sets html[data-daily='done'] and animates --ma-hue over time")

        check_7_reduced_motion(browser, demo_url)
        print("PASS 7: prefers-reduced-motion: reduce switches .jc-miss away from shake keyframes")

        check_8_mount_toggle_idempotent_and_flips(page)
        print("PASS 8: mountToggle() is idempotent and clicking flips st_juice.sound & aria-pressed")

        check_9_mobile_viewport_no_overflow(page, save_shot=True)
        print("PASS 9: Viewport 360x800 has no horizontal overflow (scrollWidth <= 360)")

        check_10_corrupt_storage_defaults(page)
        print("PASS 10: Corrupt st_juice ('{nope') returns defaults without throwing")

        assert not console_errors, f"Console errors detected: {console_errors}"
        assert not page_errors, f"Page errors detected: {page_errors}"
        print("PASS 1: Zero console errors and zero page errors")

        context.close()
        browser.close()
        print(f"Screenshots saved to {SHOTS_DIR}")


if __name__ == "__main__":
    run_all()
