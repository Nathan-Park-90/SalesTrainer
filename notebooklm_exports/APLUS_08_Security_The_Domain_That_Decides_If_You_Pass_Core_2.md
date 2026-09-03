[SYSTEM NOTE FOR AUDIO OVERVIEW HOSTS]
You are acting as the official audio teachers for "Mammoth Academy", an elite tech and sales certification training platform.
TARGET AUDIENCE: A professional studying to master CompTIA A+ (Core 1 (220-1201) & Core 2 (220-1202)) and pass the real certification exam.
TONE: Witty, punchy, real-world, and slightly edgy. Do NOT sound like a dry textbook or a corporate HR video. Sound like a highly competent senior engineer or sales director mentoring a junior over coffee.
ANALOGIES TO USE: The source text uses specific recurring anchors — "Mammoth Capital" (a high-stakes FinTech trading firm), Proxmox homelabs, pfSense routers, algorithmic trading, and real-world system failures. Lean heavily into these analogies when explaining concepts.
ACCURACY: Treat every fact, number, port, percentage, and step order in the source below as fixed and correct — this is real certification exam content. Explain and riff on *why* things work, but never alter, round, invent, or "simplify away" a specific technical detail.
[END SYSTEM NOTE]

# CompTIA A+ — Module 8: Security: The Domain That Decides If You Pass Core 2

## Malware, Social Engineering, and the Human Attack Surface

Security is 28% of Core 2 — tied with Operating Systems as the largest domain on either exam — because a technician who can build a flawless network but ships it with the admin password still set to "admin" has built nothing. Malware and social engineering are where most real-world breaches start, and CompTIA expects you to name each variant by its actual behavior, not just its reputation.

**Viruses** attach to a host file and need that file executed to spread. **Worms** need no host file and no user action at all — they self-replicate across a network on their own, which is why an unpatched, internet-facing machine can be compromised in minutes. **Trojans** disguise themselves as legitimate software; the payload only detonates once a user willingly installs it. **Ransomware** encrypts a victim's files and demands payment for the key. **Keyloggers** silently record every keystroke, harvesting credentials without ever touching a file the user would notice. **Rootkits** bury themselves at the OS or firmware level specifically to hide from the antivirus scanning above them — which is why a rootkit infection often can't be trusted to be fully removed without a full OS reinstall.

Social engineering skips the malware entirely and attacks the person instead of the machine. **Phishing** is the mass-email version; **spear phishing** targets one specific person with researched, personalized bait; **whaling** targets an executive specifically. **Shoulder surfing** is someone reading your screen or PIN entry over your shoulder. **Tailgating** is following an authorized person through a badge-locked door without badging in yourself — the single most effective and most underrated physical attack there is, because it exploits politeness, not a technical flaw.

**⚓ Anchor:** Worms and viruses are the difference between a cough and an itch you have to scratch. A virus needs someone to "scratch" it — open the infected attachment — before it spreads. A worm just coughs on its own, no action required, which is why one unpatched machine on a flat network can take down the whole floor overnight while everyone's asleep. Segment your network — the way a pfSense VLAN keeps IoT devices off the main LAN — and a worm outbreak stays a head cold instead of the whole office catching pneumonia.

**Exam Tip (A+):** The exam loves describing an attack in plain English and expecting you to name the exact term — "an email pretending to be your CEO asking for a wire transfer" is whaling, not generic phishing. Match the specificity of the target to the specificity of the term.

---

## Hardening Windows, Mobile Devices, and the SOHO Network

Knowing the threats is half the domain; the other half is locking things down before the threat shows up. On a Windows workstation that starts with **BitLocker** (full-disk encryption, so a stolen laptop's drive is unreadable without the recovery key), **Windows Defender/antivirus** kept current and actively scanning, the built-in **firewall** left on rather than "fixed" by disabling it, and **UAC** (User Account Control) prompting before anything runs with elevated privileges — the little permission popup users love to click through without reading, which exists specifically to stop malware from silently gaining admin rights.

Mobile devices get their own checklist: a **screen lock** (PIN, pattern, or biometric) is the baseline, **remote wipe** is the insurance policy for when the device is lost or stolen rather than just locked, and **full-device encryption** (on by default on modern iOS/Android) protects the data at rest the same way BitLocker does on a laptop. None of it matters if the device stays in its factory-default state — always change default credentials on anything with a login screen, mobile or not.

SOHO wireless routers ship configured for the vendor's convenience, not your security, and hardening one is a fixed checklist worth memorizing: change the default admin password immediately, enable **WPA3** (or WPA2 if the hardware can't do WPA3 — never WEP, never open), disable WPS (a well-known brute-force weak point), and consider disabling SSID broadcast and enabling MAC filtering as additional-but-not-primary layers — they slow down a casual snoop but won't stop anyone running real reconnaissance tools, so they're a supplement to WPA3, never a replacement for it.

**⚓ Anchor:** UAC is the "are you sure?" text message a bank sends before a big transfer — annoying, easy to approve without reading, and exactly the point where a scammer's whole plan falls apart if you actually stop and look. Malware relies on you clicking "Yes" on autopilot the same way a phishing victim approves a fraudulent transfer without reading it. The popup only works if you actually read it.

**Exam Tip (A+):** SSID hiding and MAC filtering show up as WRONG answers whenever a question asks for the BEST or PRIMARY security control — they're real but weak, easily defeated with basic wireless scanning tools. WPA3 (or WPA2) is always the correct primary answer; the others are supplements at best.
