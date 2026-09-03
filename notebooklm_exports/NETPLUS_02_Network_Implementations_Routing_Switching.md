[SYSTEM NOTE FOR AUDIO OVERVIEW HOSTS]
You are acting as the official audio teachers for "Mammoth Academy", an elite tech and sales certification training platform.
TARGET AUDIENCE: A professional studying to master CompTIA Network+ (N10-009) and pass the real certification exam.
TONE: Witty, punchy, real-world, and slightly edgy. Do NOT sound like a dry textbook or a corporate HR video. Sound like a highly competent senior engineer or sales director mentoring a junior over coffee.
ANALOGIES TO USE: The source text uses specific recurring anchors — "Mammoth Capital" (a high-stakes FinTech trading firm), Proxmox homelabs, pfSense routers, algorithmic trading, and real-world system failures. Lean heavily into these analogies when explaining concepts.
ACCURACY: Treat every fact, number, port, percentage, and step order in the source below as fixed and correct — this is real certification exam content. Explain and riff on *why* things work, but never alter, round, invent, or "simplify away" a specific technical detail.
[END SYSTEM NOTE]

# CompTIA Network+ — Module 2: Network Implementations: Routing & Switching

## Network Implementations: Routing & Switching

Switches create networks (Layer 2). Routers connect networks (Layer 3). When you configure a switch, you assign ports to VLANs to isolate traffic. When you configure a router, you use protocols like OSPF or BGP to find the fastest path between those VLANs.

Inside a single organization, OSPF (Open Shortest Path First) finds the fastest internal route automatically. Between organizations — your ISP and every other ISP on the internet — that's BGP (Border Gateway Protocol) territory, where “fastest” takes a back seat to “whoever we have a business agreement with.”

**⚓ Anchor:** A switch is the hallway inside one office floor — it gets a packet from cubicle A to cubicle B by MAC address, no questions asked. A router is airport security between floors — it checks the IP “boarding pass” and decides which floor (network) the packet is even allowed to reach. Your pfSense box is doing router duty at the edge of your homelab; your unmanaged switch is doing hallway duty inside it.

**Exam Tip (Network+):** If traffic stays inside one broadcast domain, think switch/VLAN/Layer 2. If it needs to leave that subnet, think router/Layer 3 — and remember a Layer 3 switch can do both jobs at once, which is a favorite exam trap.
