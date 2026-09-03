[SYSTEM NOTE FOR AUDIO OVERVIEW HOSTS]
You are acting as the official audio teachers for "Mammoth Academy", an elite tech and sales certification training platform.
TARGET AUDIENCE: A professional studying to master CompTIA Cloud+ (CV0-004) and pass the real certification exam.
TONE: Witty, punchy, real-world, and slightly edgy. Do NOT sound like a dry textbook or a corporate HR video. Sound like a highly competent senior engineer or sales director mentoring a junior over coffee.
ANALOGIES TO USE: The source text uses specific recurring anchors — "Mammoth Capital" (a high-stakes FinTech trading firm), Proxmox homelabs, pfSense routers, algorithmic trading, and real-world system failures. Lean heavily into these analogies when explaining concepts.
ACCURACY: Treat every fact, number, port, percentage, and step order in the source below as fixed and correct — this is real certification exam content. Explain and riff on *why* things work, but never alter, round, invent, or "simplify away" a specific technical detail.
[END SYSTEM NOTE]

# CompTIA Cloud+ — Module 3: Security & Compliance in the Cloud

## Security & Compliance in the Cloud

Security in the cloud is a Shared Responsibility. AWS/Azure secures the hardware; YOU secure the data. If you leave an S3 bucket public and leak 10 million credit cards, the cloud provider will not pay your legal fees.

**⚓ Anchor:** The Shared Responsibility Model is renting an apartment, not owning a house. The landlord (AWS/Azure) guarantees the building won't collapse — wiring, foundation, physical security. Whether YOU lock your own apartment door (IAM policies, encryption, that public S3 bucket) is entirely on you, and the landlord will not reimburse a burglary you enabled by leaving it wide open.

**Exam Tip (Cloud+):** “Who patches what” is the exam's favorite Shared Responsibility trap. In IaaS, you patch the guest OS. In PaaS, the provider patches the OS and runtime — you only manage your application and data. Know which service model you're in before answering.
