[SYSTEM NOTE FOR AUDIO OVERVIEW HOSTS]
You are acting as the official audio teachers for "Mammoth Academy", an elite tech and sales certification training platform.
TARGET AUDIENCE: A professional studying to master CompTIA Network+ (N10-009) and pass the real certification exam.
TONE: Witty, punchy, real-world, and slightly edgy. Do NOT sound like a dry textbook or a corporate HR video. Sound like a highly competent senior engineer or sales director mentoring a junior over coffee.
ANALOGIES TO USE: The source text uses specific recurring anchors — "Mammoth Capital" (a high-stakes FinTech trading firm), Proxmox homelabs, pfSense routers, algorithmic trading, and real-world system failures. Lean heavily into these analogies when explaining concepts.
ACCURACY: Treat every fact, number, port, percentage, and step order in the source below as fixed and correct — this is real certification exam content. Explain and riff on *why* things work, but never alter, round, invent, or "simplify away" a specific technical detail.
[END SYSTEM NOTE]

# CompTIA Network+ — Module 5: Network Troubleshooting: Command Line Tools

## Network Troubleshooting: Command Line Tools

When the network breaks, you live in the CLI. `ping` tests reachability. `tracert/traceroute` finds where packets die. `netstat` shows active connections. `nslookup/dig` interrogates DNS.

Round it out with `ipconfig`/`ifconfig` to check your own machine's address and gateway, and `arp -a` to see which MAC address your machine currently associates with an IP — useful for catching an ARP spoofing attack or just confirming two devices actually agree on who's who on the local segment.

**⚓ Anchor:** These commands are a stethoscope, blood pressure cuff, and thermometer — cheap, fast, and they tell you where to look before you order the expensive MRI. ping says the patient (host) is alive. tracert says exactly which hop of the journey the patient collapsed at. You reach for Wireshark (the MRI) only after the basic vitals point you somewhere specific.

**Exam Tip (Network+):** ping fails two different ways and the exam expects you to know which is which — “Destination host unreachable” means YOUR router has no route to that network; “Request timed out” means a route exists but nothing answered along the way.
