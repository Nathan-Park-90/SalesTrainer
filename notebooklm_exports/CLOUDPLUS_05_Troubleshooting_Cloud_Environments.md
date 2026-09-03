[SYSTEM NOTE FOR AUDIO OVERVIEW HOSTS]
You are acting as the official audio teachers for "Mammoth Academy", an elite tech and sales certification training platform.
TARGET AUDIENCE: A professional studying to master CompTIA Cloud+ (CV0-004) and pass the real certification exam.
TONE: Witty, punchy, real-world, and slightly edgy. Do NOT sound like a dry textbook or a corporate HR video. Sound like a highly competent senior engineer or sales director mentoring a junior over coffee.
ANALOGIES TO USE: The source text uses specific recurring anchors — "Mammoth Capital" (a high-stakes FinTech trading firm), Proxmox homelabs, pfSense routers, algorithmic trading, and real-world system failures. Lean heavily into these analogies when explaining concepts.
ACCURACY: Treat every fact, number, port, percentage, and step order in the source below as fixed and correct — this is real certification exam content. Explain and riff on *why* things work, but never alter, round, invent, or "simplify away" a specific technical detail.
[END SYSTEM NOTE]

# CompTIA Cloud+ — Module 5: Troubleshooting Cloud Environments

## Troubleshooting Cloud Environments

Troubleshooting the cloud usually boils down to three things: IAM (permissions are wrong), Security Groups (firewall is blocking it), or Routing (VPC subnet is misconfigured). If you can't reach the server, it's the network. If you can reach it but get a 403, it's permissions.

**⚓ Anchor:** This is the same triage order as diagnosing why you can't SSH into a homelab VM. Can't reach it at all? Check the network path first (Security Group / VPC routing) before assuming the box itself is broken. Reach it but get denied? That's a permissions problem (IAM), not a networking one — don't tear apart firewall rules when the real issue is a policy that never granted the action in the first place.

**Exam Tip (Cloud+):** A 403 (Forbidden) response means the network path worked and the request WAS received — that's an IAM/permissions issue, not a connectivity issue. A timeout with no response at all points to Security Groups or routing. The exam expects you to tell these apart from the error code alone.
