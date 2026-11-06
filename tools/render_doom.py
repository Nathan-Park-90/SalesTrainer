"""Renders Doom Scroll clips with Kokoro (kokoro-onnx, CPU). Runs on the render box, started by tools/doom-speech.py render.
  python render_doom.py list.json outdir [modeldir]  -> outdir/<voice>/<hash>.mp3 (48 kb/s mono) + outdir/index.tsv (voice, hash, seconds)
Skips clips that already exist, so it can be re-run after the list grows. Text is lightly normalised for speech first.
modeldir holds kokoro-v1.0.onnx + voices-v1.0.bin (default: the current folder). Runs at low priority; needs ffmpeg on PATH.
"""
import json, os, re, subprocess, sys, time
import soundfile as sf
from kokoro_onnx import Kokoro

VOICES = {"onyx": "am_onyx", "michael": "am_michael"}
SUBS = [
    (r"\s[—–]\s", ", "), (r"[—–]", ", "), (r"&", " and "), (r"\bvs\.?\b", "versus"), (r"\be\.g\.", "for example"), (r"\bi\.e\.", "that is"),
    (r"\bAZs\b", "A Zs"), (r"\bAZ\b", "A Z"), (r"\bIAM\b", "I A M"), (r"\bEC2\b", "E C 2"), (r"\bS3\b", "S 3"), (r"\bRDS\b", "R D S"),
    (r"\bVPC\b", "V P C"), (r"\bSQS\b", "S Q S"), (r"\bSNS\b", "S N S"), (r"\bKMS\b", "K M S"), (r"\bEBS\b", "E B S"), (r"\bEFS\b", "E F S"),
    (r"\bELB\b", "E L B"), (r"\bALB\b", "A L B"), (r"\bNLB\b", "N L B"), (r"\bECS\b", "E C S"), (r"\bEKS\b", "E K S"), (r"\bCDN\b", "C D N"),
    (r"\bTTL\b", "T T L"), (r"\bRPO\b", "R P O"), (r"\bRTO\b", "R T O"), (r"\bCPU\b", "C P U"), (r"\bGPU\b", "G P U"), (r"\bSSD\b", "S S D"),
    (r"\bHDD\b", "H D D"), (r"\bTCP\b", "T C P"), (r"\bUDP\b", "U D P"), (r"\bDNS\b", "D N S"), (r"\bSSH\b", "S S H"), (r"\bVPN\b", "V P N"),
    (r"\bCLI\b", "C L I"), (r"\bSDK\b", "S D K"), (r"\bAPI\b", "A P I"), (r"\bMFA\b", "M F A"), (r"\bSSO\b", "S S O"), (r"\bACL\b", "A C L"),
    (r"\bNACL\b", "nackle"), (r"\bIOPS\b", "eye ops"), (r"\bSaaS\b", "sass"), (r"\bPaaS\b", "pass"), (r"\bIaaS\b", "eye-as"),
    (r"\s+", " "),
]


def norm(t):
    for a, b in SUBS:
        t = re.sub(a, b, t)
    return t.strip()


def main(listfile, out, models=".", shard=(0, 1)):
    try:   # stay out of the way of whatever else the machine is doing (Nov 5: a full-speed run on VM 103 ended in a reboot)
        import psutil
        p = psutil.Process()
        p.nice(psutil.BELOW_NORMAL_PRIORITY_CLASS if os.name == "nt" else 15)
    except Exception:
        if os.name != "nt":
            try: os.nice(15)
            except Exception: pass
    items = json.load(open(listfile, encoding="utf-8"))
    os.makedirs(out, exist_ok=True)
    # Shards share the cores: give each its slice of threads and stop onnxruntime's thread pool from spin-waiting, otherwise
    # four shards x eight spinning threads crawl (Nov 5: 4 clips in 2 minutes). One shard alone keeps the default pool.
    import onnxruntime as ort
    so = ort.SessionOptions()
    if shard[1] > 1:
        so.intra_op_num_threads = max(1, (os.cpu_count() or 8) // 2 // shard[1])
        so.inter_op_num_threads = 1
        so.add_session_config_entry("session.intra_op.allow_spinning", "0")
    sess = ort.InferenceSession(os.path.join(models, "kokoro-v1.0.onnx"), so, providers=["CPUExecutionProvider"])
    k = Kokoro.from_session(sess, os.path.join(models, "voices-v1.0.bin"))
    # Several shards run side by side (one process is mostly single-threaded phonemizing); each keeps its own index file and
    # skips whatever any index already lists, so a re-run only renders what is missing.
    n, k_ = shard[1], shard[0]
    idx = os.path.join(out, "index.tsv" if n == 1 else f"index-{k_}.tsv")
    have = set()
    for name in os.listdir(out):
        if name.startswith("index") and name.endswith(".tsv"):
            for line in open(os.path.join(out, name), encoding="utf-8"):
                p = line.rstrip("\n").split("\t")
                if len(p) >= 2:
                    have.add((p[0], p[1]))
    todo = [it for i, it in enumerate(items) if i % n == k_ and (it["voice"], it["hash"]) not in have]
    print(f"shard {k_ + 1}/{n}: {len(items)} clips in the list, {len(todo)} to render here", flush=True)
    t0 = time.time(); done = 0; secs = 0.0
    with open(idx, "a", encoding="utf-8") as index:
        for it in todo:
            v = it["voice"]
            os.makedirs(os.path.join(out, v), exist_ok=True)
            mp3 = os.path.join(out, v, it["hash"] + ".mp3")
            wav = mp3[:-4] + ".wav"
            try:
                samples, sr = k.create(norm(it["text"]), voice=VOICES[v], speed=1.0, lang="en-us")
                sf.write(wav, samples, sr)
                subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", wav, "-ac", "1", "-b:a", "48k", mp3], check=True)
                os.remove(wav)
                dur = len(samples) / sr
                index.write(f"{v}\t{it['hash']}\t{dur:.2f}\n"); index.flush()
                done += 1; secs += dur
                if done % 25 == 0:
                    print(f"{done}/{len(todo)} rendered, {secs/60:.1f} min of audio, {time.time()-t0:.0f} s elapsed", flush=True)
            except Exception as e:
                print(f"FAILED {v}/{it['hash']}: {e}", flush=True)
    print(f"done: {done} clips, {secs/60:.1f} min of audio in {time.time()-t0:.0f} s", flush=True)


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--shard=")]
    sh = next((a.split("=")[1] for a in sys.argv[1:] if a.startswith("--shard=")), "0/1")   # --shard=i/n, i from 0
    main(args[0], args[1], args[2] if len(args) > 2 else ".", tuple(int(x) for x in sh.split("/")))
