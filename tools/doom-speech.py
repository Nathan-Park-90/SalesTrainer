"""Doom Scroll narration: list -> render -> pull.  (Nov 5, 2026; Nathan picked Kokoro am_onyx (teacher) + am_michael (quizmaster).)

  python tools/doom-speech.py list [courseId ...]   headless Chromium opens www/doom.html and asks the page itself
                                                    (DoomDebug.speechList) for every clip a pack can play -> tools/doom-speech/list.json
  python tools/doom-speech.py render --local [--shards=4]
                                                    renders on this machine into www/audio/doom/ (kokoro-onnx on CPU, low priority,
                                                    one index-<i>.tsv per shard, skips clips any index already lists). ~2 h for AWS.
  python tools/doom-speech.py manifest               writes www/audio/doom/manifest.json ({voice: {hash: seconds}}) from index*.tsv
  python tools/doom-speech.py push                   tars www/audio/doom/ to the web server's audio volume (no app deploy needed)
  python tools/doom-speech.py render                 (remote) copies the list + render_doom.py to the render box and starts the job
                                                    there with nohup; Nov 5: the box shares CPU with Jake, so prefer --local
  python tools/doom-speech.py status                 (remote) tail of that render log
  python tools/doom-speech.py pull                   (remote) copies the finished mp3s into www/audio/doom/<voice>/ + manifest.json

The render box (host, user, key) is read from tools/doom-speech.local.json, which is git-ignored: this repo is public and
never carries hostnames. Example: {"host": "<tailnet name>", "user": "nate", "key": "~/.ssh/client_key", "dir": "tts-samples"}
"""
from __future__ import annotations
import functools, http.server, json, os, pathlib, shlex, socket, subprocess, sys, threading

ROOT = pathlib.Path(__file__).resolve().parents[1]
WWW = ROOT / "www"
OUT = ROOT / "tools" / "doom-speech"
LIST = OUT / "list.json"
AUDIO = WWW / "audio" / "doom"
VOICES = {"onyx": "am_onyx", "michael": "am_michael"}
DEFAULT_COURSES = ["aws-saa-c03"]


def box():
    p = ROOT / "tools" / "doom-speech.local.json"
    if not p.exists():
        sys.exit("tools/doom-speech.local.json is missing (see the docstring); the render box is never written into this repo")
    c = json.loads(p.read_text(encoding="utf-8"))
    key = os.path.expanduser(c.get("key", "~/.ssh/client_key"))
    target = f"{c['user']}@{c['host']}"
    return target, key, c.get("dir", "tts-samples")


def ssh(cmd, check=True):
    target, key, _ = box()
    return subprocess.run(["ssh", "-i", key, target, cmd], check=check, text=True, capture_output=True)


def scp(src, dst, to_box=True):
    target, key, _ = box()
    args = ["scp", "-q", "-i", key] + ([src, f"{target}:{dst}"] if to_box else [f"{target}:{src}", dst])
    subprocess.run(args, check=True)


def serve():
    s = socket.socket(); s.bind(("127.0.0.1", 0)); port = s.getsockname()[1]; s.close()

    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a, **k): pass
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", port), functools.partial(Quiet, directory=str(WWW)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv, f"http://127.0.0.1:{port}"


def cmd_list(courses):
    from playwright.sync_api import sync_playwright
    OUT.mkdir(parents=True, exist_ok=True)
    srv, base = serve()
    items = []
    with sync_playwright() as p:
        b = p.chromium.launch(); page = b.new_page()
        page.goto(base + "/doom.html"); page.wait_for_load_state("networkidle")
        for c in courses:
            got = page.evaluate("c => DoomDebug.speechList(c)", c)
            for it in got:
                it["course"] = c
            items += got
            secs = sum(len(it["text"]) for it in got) / 15.0   # ~15 characters per second of speech
            print(f"{c}: {len(got)} clips, ~{secs/60:.0f} min of audio")
        b.close()
    srv.shutdown()
    seen, uniq = set(), []
    for it in items:
        k = (it["voice"], it["hash"])
        if k not in seen:
            seen.add(k); uniq.append(it)
    LIST.write_text(json.dumps(uniq, ensure_ascii=False, indent=0), encoding="utf-8")
    print(f"wrote {LIST} ({len(uniq)} unique clips)")


MODELS = pathlib.Path(os.path.expanduser("~/.cache/kokoro"))   # kokoro-v1.0.onnx + voices-v1.0.bin (kokoro-onnx GitHub release "model-files-v1.0")


def cmd_render_local():
    """Render on this machine (kokoro-onnx on CPU, low priority) straight into www/audio/doom/. Nov 5: the first run on the
    home server coincided with that VM rebooting, so the laptop does the rendering now. Re-runnable; skips finished clips."""
    for f in ("kokoro-v1.0.onnx", "voices-v1.0.bin"):
        if not (MODELS / f).exists():
            sys.exit(f"{MODELS / f} is missing: download both files from the kokoro-onnx release 'model-files-v1.0' first")
    AUDIO.mkdir(parents=True, exist_ok=True)
    n = int(next((a.split("=")[1] for a in sys.argv if a.startswith("--shards=")), "4"))   # one process is ~1.5 cores; four fill a laptop
    pids = []
    for i in range(n):
        log = open(OUT / f"render-{i}.log", "a", encoding="utf-8")
        p = subprocess.Popen([sys.executable, str(ROOT / "tools" / "render_doom.py"), str(LIST), str(AUDIO), str(MODELS), f"--shard={i}/{n}"], stdout=log, stderr=subprocess.STDOUT)
        pids.append(p.pid)
    print(f"rendering in the background, {n} shards (pids {pids}); logs: {OUT}/render-*.log; then: python tools/doom-speech.py manifest")


def cmd_manifest():
    """Writes www/audio/doom/manifest.json ({voice: {hash: seconds}}) from index.tsv, counting only clips that exist."""
    indexes = sorted(AUDIO.glob("index*.tsv"))
    if not indexes:
        sys.exit("no index*.tsv yet: nothing rendered")
    manifest = {v: {} for v in VOICES}
    for idx in indexes:
        for line in idx.read_text(encoding="utf-8").splitlines():
            parts = line.strip().split("\t")
            if len(parts) >= 3 and parts[0] in manifest and (AUDIO / parts[0] / f"{parts[1]}.mp3").exists():
                manifest[parts[0]][parts[1]] = round(float(parts[2]), 1)
    (AUDIO / "manifest.json").write_text(json.dumps(manifest, separators=(",", ":")), encoding="utf-8")
    total = sum(len(m) for m in manifest.values())
    size = sum(f.stat().st_size for f in AUDIO.rglob("*.mp3")) / 1e6
    print(f"manifest: {', '.join(f'{v} {len(m)}' for v, m in manifest.items())} = {total} clips, {size:.0f} MB in {AUDIO}")


def cmd_render():
    target, key, d = box()
    ssh(f"mkdir -p ~/{d}/doom")
    scp(str(LIST), f"~/{d}/doom/list.json")
    scp(str(ROOT / "tools" / "render_doom.py"), f"~/{d}/render_doom.py")
    r = ssh(f"cd ~/{d} && . venv/bin/activate && nohup python render_doom.py doom/list.json doom > doom/render.log 2>&1 & echo started")
    print(r.stdout.strip())
    print("watch with: python tools/doom-speech.py status")


def cmd_status():
    _, _, d = box()
    r = ssh(f"tail -n 5 ~/{d}/doom/render.log; wc -l < ~/{d}/doom/index.tsv 2>/dev/null || echo 0", check=False)
    print(r.stdout.strip() or r.stderr.strip())


def cmd_pull():
    target, key, d = box()
    AUDIO.mkdir(parents=True, exist_ok=True)
    for v in VOICES:
        (AUDIO / v).mkdir(exist_ok=True)
        # one tar stream per voice: hundreds of small files, one SSH session
        with open(AUDIO / f"{v}.tar", "wb") as f:
            subprocess.run(["ssh", "-i", key, target, f"cd ~/{d}/doom && tar cf - {v} 2>/dev/null || true"], check=True, stdout=f)
        subprocess.run(["tar", "xf", str(AUDIO / f"{v}.tar"), "-C", str(AUDIO)], check=True)
        (AUDIO / f"{v}.tar").unlink()
    scp(f"~/{d}/doom/index.tsv", str(OUT / "index.tsv"), to_box=False)
    manifest = {v: {} for v in VOICES}
    for line in (OUT / "index.tsv").read_text(encoding="utf-8").splitlines():
        parts = line.strip().split("\t")
        if len(parts) >= 3 and parts[0] in manifest and (AUDIO / parts[0] / f"{parts[1]}.mp3").exists():
            manifest[parts[0]][parts[1]] = round(float(parts[2]), 1)
    (AUDIO / "manifest.json").write_text(json.dumps(manifest, separators=(",", ":")), encoding="utf-8")
    total = sum(len(m) for m in manifest.values())
    size = sum(f.stat().st_size for f in AUDIO.rglob("*.mp3")) / 1e6
    print(f"manifest: {', '.join(f'{v} {len(m)}' for v, m in manifest.items())} = {total} clips, {size:.0f} MB in {AUDIO}")


def cmd_push():
    """Copies www/audio/doom/ to the web server's audio folder (its own volume next to the app, so the Academy deploy,
    which empties the app folder, never touches 250 MB of clips). Target from doom-speech.local.json: deploy_ssh, deploy_dir."""
    c = json.loads((ROOT / "tools" / "doom-speech.local.json").read_text(encoding="utf-8"))
    host, d = c.get("deploy_ssh"), c.get("deploy_dir")
    if not host or not d:
        sys.exit("doom-speech.local.json needs deploy_ssh (an ssh alias) and deploy_dir (the server folder served at audio/doom/)")
    if not (AUDIO / "manifest.json").exists():
        sys.exit("nothing to push: run pull first")
    tar = subprocess.Popen(["tar", "czf", "-", "-C", str(AUDIO), "."], stdout=subprocess.PIPE)
    subprocess.run(["ssh", host, f"mkdir -p {shlex.quote(d)} && cd {shlex.quote(d)} && tar xzf - && chmod -R a+rX . && ls */ | wc -l && du -sh ."],
                   stdin=tar.stdout, check=True)
    tar.wait()
    print("pushed; manifest.json is served with the clips, so no app deploy is needed for new audio")


if __name__ == "__main__":
    what = sys.argv[1] if len(sys.argv) > 1 else "list"
    if what == "list":
        cmd_list(sys.argv[2:] or DEFAULT_COURSES)
    elif what == "render" and "--local" in sys.argv:
        cmd_render_local()
    elif what == "render":
        cmd_render()
    elif what == "manifest":
        cmd_manifest()
    elif what == "status":
        cmd_status()
    elif what == "pull":
        cmd_pull()
    elif what == "push":
        cmd_push()
    else:
        sys.exit(__doc__)
