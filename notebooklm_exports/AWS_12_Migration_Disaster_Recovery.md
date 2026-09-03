[SYSTEM NOTE FOR AUDIO OVERVIEW HOSTS]
You are acting as the official audio teachers for "Mammoth Academy", an elite tech and sales certification training platform.
TARGET AUDIENCE: A professional studying to master AWS Solutions Architect (SAA-C03 Certification) and pass the real certification exam.
TONE: Witty, punchy, real-world, and slightly edgy. Do NOT sound like a dry textbook or a corporate HR video. Sound like a highly competent senior engineer or sales director mentoring a junior over coffee.
ANALOGIES TO USE: The source text uses specific recurring anchors — "Mammoth Capital" (a high-stakes FinTech trading firm), Proxmox homelabs, pfSense routers, algorithmic trading, and real-world system failures. Lean heavily into these analogies when explaining concepts.
ACCURACY: Treat every fact, number, port, percentage, and step order in the source below as fixed and correct — this is real certification exam content. Explain and riff on *why* things work, but never alter, round, invent, or "simplify away" a specific technical detail.
[END SYSTEM NOTE]

# AWS Solutions Architect — Module 12: Migration & Disaster Recovery

## Disaster Recovery Strategies (RTO & RPO)

At some point, something will fail. A region will have an outage. A database will be corrupted. A ransomware attack will encrypt your production systems. The question isn't if — it's whether you're prepared when it happens. Disaster Recovery is the discipline of answering: *how much data can we afford to lose, and how long can we afford to be down—* The exam makes these concepts mathematically precise with two metrics.

**RPO (Recovery Point Objective):** The maximum age of data you can recover. How much data loss is acceptable? If you backup every 4 hours and disaster strikes 3.5 hours after the last backup, you lose 3.5 hours of data. That's your RPO. A bank might have an RPO of zero seconds (no data loss tolerated). A small blog might have an RPO of 24 hours (daily backups are fine).

**RTO (Recovery Time Objective):** The maximum acceptable downtime. How long can the system be offline before the business critically fails? An e-commerce site on Black Friday might have an RTO of 30 seconds. An internal analytics dashboard might have an RTO of 4 hours.

**The Four DR Strategies (cheapest to fastest recovery):**

**1. Backup & Restore (High RTO/RPO, Lowest Cost):** Back up data to S3. In a disaster, provision infrastructure from scratch and restore from backup. Hours to recover. Suitable for non-critical systems or extremely tight budgets.

**2. Pilot Light (Medium RTO/RPO, Low Cost):** Core components (just the database, the critical data source) run continuously in the DR region. Application servers are off. In a disaster, quickly boot the app tier (pre-configured AMIs ready) and point it at the running database. Recovery: 10-30 minutes.

**3. Warm Standby (Low RTO/RPO, Medium Cost):** A fully functional, scaled-down version of production runs continuously in the DR region. In a disaster, scale it up to production capacity. Recovery: minutes. Carries ongoing cost for the running mini-environment.

**4. Multi-Site Active-Active (Near-Zero RTO/RPO, Highest Cost):** Full production environments running simultaneously in multiple regions. Traffic is distributed (Route 53 latency routing). Failover is near-instantaneous — Route 53 simply stops sending traffic to the failed region. Zero data loss. Maximum cost. Required for systems where any downtime is unacceptable.

**⚓ Anchor:** Backup & Restore is keeping a spare tire in the trunk — you're not going anywhere quickly after a blowout, but at least you're not calling a tow truck. Pilot Light is having a generator wired but unplugged — you'll have power in minutes once you flip the switch. Warm Standby is a second office already set up with desks, computers, and a skeleton crew — ready to scale up the moment the main office floods. Multi-Site Active is having two full offices already running — if one building loses power, every employee is already working from the other one. The price differential between these four options is as dramatic as the recovery time difference.

**Exam Tip:** The exam describes a business scenario and asks which DR strategy meets the RTO/RPO requirements at the lowest cost. Always match cost to requirements — don't recommend Active-Active for a non-critical internal tool. The principle is: use the cheapest strategy that meets the RTO/RPO. Over-engineering DR is as wrong an answer as under-engineering it.

---

## The AWS Snow Family

Here's an uncomfortable math problem: you have 100 terabytes of on-premises data to migrate to AWS. Your internet connection is 1 Gbps. At theoretical maximum transfer speed, 24 hours a day, 7 days a week, it will take you **over 9 days** to transfer that data — and that's before accounting for real-world network congestion, errors, and retries. At 100 Mbps, you're looking at months. AWS had a better idea: *put the data on a truck.*

The AWS Snow Family is a suite of physical data migration devices — ruggedized hardware that AWS ships to your data center. You load your data locally at full disk speeds (no internet bottleneck), then ship the device back to AWS, where they ingest it directly into S3. Network latency: zero. Transfer speed: limited only by your local disk I/O.

**Snowcone:** 8TB usable storage. Small enough to fit in a backpack. Rugged, battery-operated, can be deployed in harsh environments — oil fields, military operations, disaster zones. The "edge computing + data collection" device.

**Snowball Edge Storage Optimized:** 80TB usable storage. The size of a large suitcase. Rack-mountable in your data center. You plug it into your network, run the data transfer client, and when it's full, UPS ships it back to AWS in a tamper-evident, encrypted container. The bread-and-butter migration device for data centers.

**Snowball Edge Compute Optimized:** 42TB storage + powerful GPU. Designed for edge computing scenarios where you need to process data before transferring it — ML inference on video feeds in locations with no internet connectivity.

**AWS Snowmobile:** An actual 45-foot shipping container pulled by a 18-wheeler truck. Holds up to 100 petabytes. AWS drives it to your campus, you connect via a high-speed fiber connection, fill it with exabytes of data, and they drive it to an AWS data center. Reserved for companies migrating entire data centers — video archives, scientific research datasets, government records at national scale.

**⚓ Anchor:** Andrew Tanenbaum, the computer scientist, said it best in 1981: "Never underestimate the bandwidth of a station wagon full of tapes hurtling down the highway." The Snow family is AWS's acknowledgment that sometimes physics wins — when your dataset is large enough, shipping atoms is faster than transmitting bits. A Snowball driving 70 mph on an interstate with 80TB of data delivers more effective bandwidth than most enterprise internet connections.

**Exam Tip:** The trigger phrase for Snow Family questions: *"limited bandwidth," "large dataset migration," "unreliable connectivity," or "edge location with no internet."* The decision: Snowcone = tiny, portable, harsh environments. Snowball Edge = standard data center migrations. Snowmobile = petabyte-scale, entire data center migrations.

---

## AWS DataSync & Storage Gateway

The Snow Family solves the one-time, massive migration problem. But what about the ongoing reality of hybrid cloud — where you have on-premises systems that will continue generating data for years, and you need a continuous, automated, reliable way to move that data to AWS—

**AWS DataSync** is an agent-based data transfer service. You install a lightweight DataSync agent on your on-premises servers or in your VMware environment. The agent securely transfers files and objects between your local NFS/SMB/HDFS storage and AWS (S3, EFS, FSx) at up to 10x faster than open-source tools. DataSync handles scheduling, monitoring, encryption in transit, data integrity verification, and automatic retries — without you writing any custom transfer scripts.

**AWS Storage Gateway** is the complement to DataSync — it's not about migration, it's about *extending* your on-premises storage with cloud capacity while your applications think they're talking to local storage:

**File Gateway:** Presents an NFS or SMB share to your on-premises applications. Files written to this share are transparently stored as objects in S3. Applications never know their files live in the cloud — they just see a network drive.

**Volume Gateway:** Presents block storage (iSCSI interface) to on-premises servers. Frequently accessed data is cached locally for fast access; all data is backed up as EBS snapshots in the cloud. Disaster recovery: restore the volume anywhere from the EBS snapshot.

**Tape Gateway:** Emulates a physical tape library for backup software that still writes to tape (more common than you'd think in enterprises). Your backup application talks to a virtual tape library that automatically archives tapes to S3 and Glacier. Eliminates physical tape management without changing the backup workflow.

**⚓ Anchor:** DataSync is an automated moving company — it schedules regular runs between your old house (on-premises) and your new apartment (S3/EFS), handles the heavy lifting, verifies nothing was broken in transit, and retries if something went wrong. Storage Gateway is a teleportation door — your applications open the door and see a local filing cabinet, but every document they put in it silently appears in an S3 vault 500 miles away. The door looks local. The storage is cloud.

**Exam Tip:** DataSync = scheduled, automated file transfer between on-premises and AWS. Storage Gateway = make AWS storage appear as local storage to on-premises applications. The key difference: DataSync moves data. Storage Gateway extends storage transparently.
