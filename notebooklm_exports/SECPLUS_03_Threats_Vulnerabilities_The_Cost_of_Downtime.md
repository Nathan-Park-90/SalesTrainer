[SYSTEM NOTE FOR AUDIO OVERVIEW HOSTS]
You are acting as the official audio teachers for "Mammoth Academy", an elite tech and sales certification training platform.
TARGET AUDIENCE: A professional studying to master CompTIA Security+ (SY0-701) and pass the real certification exam.
TONE: Witty, punchy, real-world, and slightly edgy. Do NOT sound like a dry textbook or a corporate HR video. Sound like a highly competent senior engineer or sales director mentoring a junior over coffee.
ANALOGIES TO USE: The source text uses specific recurring anchors — "Mammoth Capital" (a high-stakes FinTech trading firm), Proxmox homelabs, pfSense routers, algorithmic trading, and real-world system failures. Lean heavily into these analogies when explaining concepts.
ACCURACY: Treat every fact, number, port, percentage, and step order in the source below as fixed and correct — this is real certification exam content. Explain and riff on *why* things work, but never alter, round, invent, or "simplify away" a specific technical detail.
[END SYSTEM NOTE]

# CompTIA Security+ — Module 3: Threats, Vulnerabilities & The Cost of Downtime

## Threats, Vulnerabilities & The Cost of Downtime

Let's talk business impact. At Mammoth Capital, if our high-frequency trading algorithm goes offline for 60 seconds because of a DDoS attack, we aren't just "experiencing technical difficulties." We are bleeding P&L. Understanding threats isn't about memorizing dictionary definitions of malware; it's about understanding how attackers dismantle business continuity.

**Ransomware:** It doesn't just encrypt data; modern ransomware gangs practice *double extortion*. They encrypt your systems so you can't operate, AND they steal your sensitive data (like proprietary trading algorithms or customer PII) and threaten to leak it if you don't pay. Backups solve the encryption problem; they don't solve the data leak problem. The only defense is stopping the exfiltration in the first place.

**Phishing & Social Engineering:** Humans are the weakest link in any cryptographic system. Why burn zero-day exploits against an enterprise firewall when you can just call the helpdesk, pretend to be a frustrated VP who lost his MFA token, and get them to reset it? *Vishing* (voice phishing) and *Smishing* (SMS phishing) bypass multi-million dollar tech stacks by exploiting human psychology.

**⚓ Anchor:** Think of vulnerabilities as an open window in your house. The threat is the burglar outside. The risk is the intersection of the two—the likelihood the burglar finds the window and steals your TV. You manage risk by either patching the vulnerability (locking the window) or mitigating the threat (buying a guard dog).

**Exam Tip (Security+):** Don't confuse a Threat, a Vulnerability, and a Risk. The unpatched CVE is the vulnerability. The attacker group scanning for it is the threat. Risk is the two multiplied together — likelihood × impact. A critical vulnerability with no active exploitation in the wild can be lower risk than a medium one under real-world attack.
