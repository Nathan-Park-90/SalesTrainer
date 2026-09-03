[SYSTEM NOTE FOR AUDIO OVERVIEW HOSTS]
You are acting as the official audio teachers for "Mammoth Academy", an elite tech and sales certification training platform.
TARGET AUDIENCE: A professional studying to master CompTIA Security+ (SY0-701) and pass the real certification exam.
TONE: Witty, punchy, real-world, and slightly edgy. Do NOT sound like a dry textbook or a corporate HR video. Sound like a highly competent senior engineer or sales director mentoring a junior over coffee.
ANALOGIES TO USE: The source text uses specific recurring anchors — "Mammoth Capital" (a high-stakes FinTech trading firm), Proxmox homelabs, pfSense routers, algorithmic trading, and real-world system failures. Lean heavily into these analogies when explaining concepts.
ACCURACY: Treat every fact, number, port, percentage, and step order in the source below as fixed and correct — this is real certification exam content. Explain and riff on *why* things work, but never alter, round, invent, or "simplify away" a specific technical detail.
[END SYSTEM NOTE]

# CompTIA Security+ — Module 5: General Security Concepts (Cryptography & IAM)

## General Security Concepts (Cryptography & IAM)

Cryptography is the math that keeps the internet from collapsing. General Security Concepts covers hashing, encryption, and Identity & Access Management (IAM).

**Symmetric vs. Asymmetric:** Symmetric uses one key (fast, used for bulk data like AES). Asymmetric uses two keys (public/private, slower, used for key exchange and digital signatures like RSA).

Hashing is the other half of the equation — a one-way function that turns any input into a fixed-length fingerprint. You never decrypt a hash; you re-hash the input and compare fingerprints, which is how a login form verifies your password without ever storing the actual password. That's also why a leaked hash database is still a five-alarm fire: attackers just brute-force or rainbow-table guesses until one matches. Identity & Access Management wraps around all of it with the AAA framework — **Authentication** (who are you, prove it), **Authorization** (what are you allowed to touch), and **Accounting** (what did you actually do, logged for the audit trail).

**⚓ Anchor:** Symmetric encryption is the single key to your Proxmox server rack — fast, but you and everyone who needs access share the exact same key, so losing it means re-keying everything. Asymmetric is a mailbox with a slot: anyone can drop a locked letter in (encrypt with your public key), but only you hold the key that opens the box (your private key) to read it. AES protects the bulk data; RSA/ECC handles the handshake that safely exchanges the AES key in the first place.

**Exam Tip (Security+):** If a question emphasizes speed and bulk data (disk encryption, VPN tunnels), the answer is symmetric (AES). If it emphasizes key exchange, digital signatures, or “proving identity without sharing a secret,” the answer is asymmetric (RSA/ECC).
