[SYSTEM NOTE FOR AUDIO OVERVIEW HOSTS]
You are acting as the official audio teachers for "Mammoth Academy", an elite tech and sales certification training platform.
TARGET AUDIENCE: A professional studying to master CompTIA A+ (Core 1 (220-1201) & Core 2 (220-1202)) and pass the real certification exam.
TONE: Witty, punchy, real-world, and slightly edgy. Do NOT sound like a dry textbook or a corporate HR video. Sound like a highly competent senior engineer or sales director mentoring a junior over coffee.
ANALOGIES TO USE: The source text uses specific recurring anchors — "Mammoth Capital" (a high-stakes FinTech trading firm), Proxmox homelabs, pfSense routers, algorithmic trading, and real-world system failures. Lean heavily into these analogies when explaining concepts.
ACCURACY: Treat every fact, number, port, percentage, and step order in the source below as fixed and correct — this is real certification exam content. Explain and riff on *why* things work, but never alter, round, invent, or "simplify away" a specific technical detail.
[END SYSTEM NOTE]

# CompTIA A+ — Module 6: Networking Fundamentals for the Field Tech

## Ports, Protocols, and the Network Layer Techs Actually Touch

Networking is 23% of Core 1 — the single biggest chunk of the exam after Hardware and Network Troubleshooting itself — and it's the domain most helpdesk techs try to skip because "the network guys handle that." They don't, not when a user can't print, can't reach a shared drive, or can't VPN in from home, and you're the first call.

Start with the ports. Every network service listens on a numbered door, and the exam expects you to know the doorman by number on sight: **21** FTP, **22** SSH, **23** Telnet, **25** SMTP, **53** DNS, **80** HTTP, **110** POP3, **143** IMAP, **443** HTTPS, **445** SMB (Windows file sharing), **3389** RDP. If a user can browse the web but can't reach a mapped drive, you're not looking at a DNS problem (53) — you're looking at port 445 blocked somewhere between them and the file server.

IP addressing is the other half. IPv4 addresses are four octets (192.168.1.10), and a subnet mask tells a device which part of that address is the "building" (network) and which part is the "apartment number" (host) — a /24 mask (255.255.255.0) means the last octet is yours to hand out, giving you 254 usable host addresses. Private ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) never route on the public internet directly — that's what NAT on your SOHO router is for, translating your private IP to its one public IP before traffic leaves the building.

Cabling still matters even in a wireless-first world: Cat5e tops out around 1 Gbps, Cat6 pushes 10 Gbps over shorter runs, Cat6a holds that 10 Gbps over the full 100-meter run. Fiber (single-mode for long-haul, multimode for shorter in-building runs) trades copper's distance and interference limits for cost and fragility. On the wireless side, know your standards by number, not just letter: 802.11ac (Wi-Fi 5) is 5 GHz only; 802.11ax (Wi-Fi 6/6E) adds the 6 GHz band, which is what the "E" in 6E actually means.

**⚓ Anchor:** Port numbers are apartment numbers in one big office building (the IP address). The building's front desk gets you in the door, but knock on the wrong apartment — port 80 instead of 443 — and nobody who can actually help you answers. A pfSense box doing port forwarding is nothing more than a doorman with a clipboard: "package for apartment 443? Send it to the server in unit 10.0.0.5." Get the port wrong and it doesn't matter how right the address was.

**Exam Tip (A+):** Memorize the port list cold — the exam will describe a symptom ("can reach the website but email won't send") and expect you to identify the blocked port without it ever using the word "port." Ports are tested by scenario, not by flashcard.
