/* Mammoth Academy — Course Pack */
/* Auto-loaded by course-loader.js */

var COURSE_COMPTIA_SECURITYPLUS = {
  "meta": {
    "id": "comptia-securityplus",
    "name": "CompTIA Security+",
    "subtitle": "SY0-701",
    "icon": "🛡️",
    "color": "#10b981",
    "examKey": "securityplus",
    "flashcardCat": "CompTIA Security+",
    "dailyTrackKey": "securityplus",
    "domains": {
      "General Security Concepts": "General Security Concepts (Cryptography & IAM)",
      "Threats, Vulnerabilities, and Mitigations": "Threats, Vulnerabilities & The Cost of Downtime",
      "Security Architecture": "The Perimeter is Dead (Zero Trust Architecture)",
      "Security Operations": "Security Operations: Hunting in the Noise",
      "Security Program Management and Oversight": "Program Management & Governance"
    },
    "version": "1.0.0",
    "category": "CompTIA"
  },
  "modules": [
    {
      "title": "The Perimeter is Dead (Zero Trust Architecture)",
      "topics": [
        {
          "title": "The Perimeter is Dead (Zero Trust Architecture)",
          "prose": "\n<p>For decades, enterprise security relied on a castle-and-moat architecture. You buy a massive firewall (the moat), put all your servers inside (the castle), and assume anyone who makes it inside is a good guy. <strong>That model is dead.</strong> When an attacker spear-phishes Karen in accounting, they don't attack the firewall—they just walk right through the front door using her VPN credentials. Once inside, they move laterally, escalating privileges until they own your domain controllers.</p>\n\n<p><strong>Zero Trust</strong> is the answer. It operates on one brutal truth: <em>Trust nothing, verify everything.</em> Location is no longer a proxy for trust. Just because a request comes from the internal corporate LAN doesn't mean it's legitimate. In a Zero Trust environment, every single request—whether from a coffee shop or a wired desk on the 5th floor—is authenticated, authorized, and encrypted.</p>\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> Think of traditional networking like a nightclub. The bouncer (firewall) checks your ID at the door, but once you're in, you can talk to anyone and drink anything. Zero Trust is like having a personal bodyguard assigned to every single patron. You want to talk to the bartender? Show ID. You want to walk to the bathroom? Show ID. It's high friction for attackers, low blast radius for the business.</div>\n\n<p>In your homelab, this means you don't just dump all your Proxmox containers on a flat `/24` subnet. You segment them. Your public-facing NGINX reverse proxy sits in a DMZ. It talks to your backend database on a dedicated, firewalled VLAN via pfSense, allowing <em>only</em> port 5432, and dropping everything else. <strong>Implicit Deny</strong> is the law of the land.</p>\n\n\n<div class=\"lesson-alert\"><strong>Exam Tip (Security+):</strong> When an answer choice implies trusting a request because it came from the internal LAN, that's the wrong answer under Zero Trust — every request is authenticated and authorized, full stop, regardless of where it originates.</div>",
          "tags": [
            "comptia",
            "security-plus",
            "architecture"
          ],
          "quiz": [
            {
              "q": "What is the foundational principle of a Zero Trust architecture?",
              "opts": [
                "Internal network traffic is inherently secure",
                "Firewalls should inspect all encrypted payloads",
                "Trust no user or device, regardless of their location on the network",
                "All external traffic must be routed through a VPN"
              ],
              "ans": 2,
              "exp": "Zero Trust assumes breach. It requires strict identity verification for every person and device trying to access resources, regardless of whether they are sitting within the network perimeter or accessing it remotely."
            },
            {
              "q": "Which configuration ensures that a firewall blocks any traffic that is not explicitly allowed by an administrator?",
              "opts": [
                "Implicit Deny",
                "Stateful Inspection",
                "Port Security",
                "Access Control List (ACL) Bypass"
              ],
              "ans": 0,
              "exp": "Implicit Deny is the principle that if a condition is not explicitly met by a rule in a firewall or ACL, the traffic should be rejected by default."
            },
            {
              "q": "When setting up a pfSense router to segment a database server from a web server, what concept are you implementing to minimize the blast radius of a web server compromise?",
              "opts": [
                "Network Address Translation (NAT)",
                "Network Segmentation",
                "Load Balancing",
                "Intrusion Detection"
              ],
              "ans": 1,
              "exp": "Network segmentation breaks a network into smaller, isolated subnets or VLANs. If the web server is compromised, the attacker cannot easily pivot to the database server because traffic between the segments is tightly controlled."
            }
          ]
        }
      ],
      "related": [
        {
          "course": "sales-engineering",
          "idx": 1
        },
        {
          "course": "sales-engineering",
          "idx": 2
        }
      ]
    },
    {
      "title": "Security Operations: Hunting in the Noise",
      "topics": [
        {
          "title": "Security Operations: Hunting in the Noise",
          "prose": "\n<p>Security Operations (SecOps) is where the rubber meets the road. It accounts for <strong>28% of the Security+ exam</strong> because an architecture is only as good as the team monitoring it. If a tree falls in the forest and no one reads the logs, it still crushes your infrastructure.</p>\n\n<p>The core of SecOps is the <strong>SIEM (Security Information and Event Management)</strong>. A SIEM aggregates logs from your firewalls, endpoints, servers, and applications into a single pane of glass. But aggregating logs isn't security—it's just hoarding text files. The real value is <strong>correlation</strong>. When a user logs in from New York, and three minutes later the same user attempts an RDP session from Moscow, the SIEM correlates those impossible travel logs and fires an alert.</p>\n\n<div class=\"lesson-alert\"><strong>Pro Tip:</strong> <em>If you aren't logging it, it didn't happen. If you are logging it but not alerting on it, you're just writing a very detailed autopsy report for the forensic team after your company goes bankrupt.</em></div>\n\n<p><strong>Incident Response (IR) Phases:</strong><br>\n1. <strong>Preparation:</strong> Having playbooks, tools, and contacts ready before the breach.<br>\n2. <strong>Identification:</strong> Determining if an incident actually occurred (e.g., verifying a SIEM alert).<br>\n3. <strong>Containment:</strong> Stopping the bleeding (e.g., isolating a ransomware-infected host from the network).<br>\n4. <strong>Eradication:</strong> Removing the threat (deleting the malware, closing the vulnerability).<br>\n5. <strong>Recovery:</strong> Restoring from backups, bringing systems back online.<br>\n6. <strong>Lessons Learned:</strong> The post-mortem. Updating playbooks so it doesn't happen again.</p>\n\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> A single log line is a whisper in a hurricane — useless alone. A SIEM is the pfSense box on your homelab that doesn't just drop a packet from a scanning bot in Belarus, it notices that same IP hit three different services in ten minutes and escalates it from “noise” to “pattern.” Correlation is what turns a haystack of logs into the one needle that's actually on fire.</div>",
          "tags": [
            "comptia",
            "security-plus",
            "secops"
          ],
          "quiz": [
            {
              "q": "A security analyst notices an alert from the SIEM. They verify that a workstation is actively beaconing to a known malicious command-and-control (C2) server. What is the immediate next step in the Incident Response process?",
              "opts": [
                "Eradication: Delete the malware file",
                "Containment: Disconnect the workstation from the network",
                "Recovery: Reimage the workstation from a golden image",
                "Lessons Learned: Write a post-mortem report"
              ],
              "ans": 1,
              "exp": "Once identified, the immediate priority is Containment—stopping the threat from spreading laterally across the network. Only after it is isolated do you move to Eradicate the threat."
            },
            {
              "q": "What is the primary function of a SIEM system?",
              "opts": [
                "To automatically block incoming DDOS attacks",
                "To encrypt data at rest on enterprise servers",
                "To aggregate, correlate, and analyze log data from across the enterprise",
                "To provide Multi-Factor Authentication for end users"
              ],
              "ans": 2,
              "exp": "A SIEM (Security Information and Event Management) tool collects logs from various sources, correlates events to detect anomalies, and generates actionable alerts for security teams."
            },
            {
              "q": "Which of the following is an example of an 'Impossible Travel' anomaly?",
              "opts": [
                "A user logs in from a known corporate IP, then logs out 5 minutes later",
                "A user authenticates from New York, and 10 minutes later authenticates from London",
                "A user fails their password 3 times before succeeding",
                "A user accesses the network via VPN on a Saturday"
              ],
              "ans": 1,
              "exp": "Impossible travel occurs when a user authenticates from two geographically distant locations in a timeframe that makes physical travel between them impossible, heavily implying compromised credentials."
            }
          ]
        }
      ],
      "related": [
        {
          "course": "comptia-securityplus",
          "idx": 2
        },
        {
          "course": "comptia-securityplus",
          "idx": 3
        }
      ]
    },
    {
      "title": "Threats, Vulnerabilities & The Cost of Downtime",
      "topics": [
        {
          "title": "Threats, Vulnerabilities & The Cost of Downtime",
          "prose": "\n<p>Let's talk business impact. At Mammoth Capital, if our high-frequency trading algorithm goes offline for 60 seconds because of a DDoS attack, we aren't just \"experiencing technical difficulties.\" We are bleeding P&L. Understanding threats isn't about memorizing dictionary definitions of malware; it's about understanding how attackers dismantle business continuity.</p>\n\n<p><strong>Ransomware:</strong> It doesn't just encrypt data; modern ransomware gangs practice <em>double extortion</em>. They encrypt your systems so you can't operate, AND they steal your sensitive data (like proprietary trading algorithms or customer PII) and threaten to leak it if you don't pay. Backups solve the encryption problem; they don't solve the data leak problem. The only defense is stopping the exfiltration in the first place.</p>\n\n<p><strong>Phishing & Social Engineering:</strong> Humans are the weakest link in any cryptographic system. Why burn zero-day exploits against an enterprise firewall when you can just call the helpdesk, pretend to be a frustrated VP who lost his MFA token, and get them to reset it? <em>Vishing</em> (voice phishing) and <em>Smishing</em> (SMS phishing) bypass multi-million dollar tech stacks by exploiting human psychology.</p>\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> Think of vulnerabilities as an open window in your house. The threat is the burglar outside. The risk is the intersection of the two—the likelihood the burglar finds the window and steals your TV. You manage risk by either patching the vulnerability (locking the window) or mitigating the threat (buying a guard dog).</div>\n\n\n<div class=\"lesson-alert\"><strong>Exam Tip (Security+):</strong> Don't confuse a Threat, a Vulnerability, and a Risk. The unpatched CVE is the vulnerability. The attacker group scanning for it is the threat. Risk is the two multiplied together — likelihood × impact. A critical vulnerability with no active exploitation in the wild can be lower risk than a medium one under real-world attack.</div>",
          "tags": [
            "comptia",
            "security-plus",
            "threats"
          ],
          "quiz": [
            {
              "q": "An attacker compromises a company's database, encrypts the hard drives, and demands Bitcoin for the decryption key. They also threaten to release customer data to the public if the ransom is not paid. What type of attack is this?",
              "opts": [
                "Cryptojacking",
                "Double Extortion Ransomware",
                "Distributed Denial of Service (DDoS)",
                "SQL Injection"
              ],
              "ans": 1,
              "exp": "Double extortion involves both encrypting the victim's data to halt operations and stealing sensitive data to threaten public release, increasing the pressure to pay."
            },
            {
              "q": "An employee receives a text message claiming to be from the IT department, urging them to click a link to reset an expired password. What kind of attack is this?",
              "opts": [
                "Vishing",
                "Pharming",
                "Smishing",
                "Whaling"
              ],
              "ans": 2,
              "exp": "Smishing (SMS Phishing) uses text messages to trick victims into clicking malicious links or revealing sensitive information."
            },
            {
              "q": "Which formula accurately describes how Security professionals calculate Risk?",
              "opts": [
                "Risk = Threat × Vulnerability",
                "Risk = Malware + Human Error",
                "Risk = Exploit ÷ Controls",
                "Risk = Perimeter Defenses - Attack Vectors"
              ],
              "ans": 0,
              "exp": "Risk is typically evaluated as the intersection of a Threat (a potential danger) and a Vulnerability (a weakness). If either is zero, there is no active risk."
            }
          ]
        }
      ],
      "related": [
        {
          "course": "comptia-securityplus",
          "idx": 3
        },
        {
          "course": "comptia-securityplus",
          "idx": 4
        }
      ]
    },
    {
      "title": "Program Management & Governance",
      "topics": [
        {
          "title": "Program Management & Governance",
          "prose": "<p>Security isn't just firewalls; it's paperwork with teeth. <strong>Program Management</strong> (20% of the exam) covers the policies, compliance (like HIPAA, GDPR), and risk assessments that dictate what the firewalls should actually do.</p><div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> If you buy the best locks in the world but have no policy saying employees must lock the doors when they leave, you have no security. Governance is the policy. Architecture is the lock. SecOps is the alarm.</div>\n\n<div class=\"lesson-alert\"><strong>Exam Tip (Security+):</strong> Governance questions usually hinge on WHO is accountable, not who does the work. A Data Owner (typically a business exec) is accountable for classifying data; a Data Custodian (typically IT) just implements the controls the owner requires.</div>",
          "tags": [
            "comptia",
            "security-plus",
            "governance"
          ],
          "quiz": [
            {
              "q": "Which policy dictates what an employee can and cannot do on a corporate laptop?",
              "opts": [
                "SLA",
                "AUP",
                "NDA",
                "MOU"
              ],
              "ans": 1,
              "exp": "The Acceptable Use Policy (AUP) outlines permitted behaviors on corporate devices."
            },
            {
              "q": "A company requires two executives to sign off before transferring funds over $10,000. What principle is this?",
              "opts": [
                "Least Privilege",
                "Job Rotation",
                "Dual Control",
                "Mandatory Access Control"
              ],
              "ans": 2,
              "exp": "Dual control (or separation of duties) requires two individuals to complete a critical task."
            },
            {
              "q": "Which metric defines the maximum amount of data loss a company can tolerate after a disaster?",
              "opts": [
                "RTO",
                "RPO",
                "MTTR",
                "MTBF"
              ],
              "ans": 1,
              "exp": "Recovery Point Objective (RPO) is the acceptable amount of data loss, measured in time (e.g., restoring from a 24-hour old backup)."
            }
          ]
        }
      ],
      "related": [
        {
          "course": "comptia-securityplus",
          "idx": 4
        },
        {
          "course": "comptia-securityplus",
          "idx": 0
        }
      ]
    },
    {
      "title": "General Security Concepts (Cryptography & IAM)",
      "topics": [
        {
          "title": "General Security Concepts (Cryptography & IAM)",
          "prose": "<p>Cryptography is the math that keeps the internet from collapsing. General Security Concepts covers hashing, encryption, and Identity & Access Management (IAM).</p><p><strong>Symmetric vs. Asymmetric:</strong> Symmetric uses one key (fast, used for bulk data like AES). Asymmetric uses two keys (public/private, slower, used for key exchange and digital signatures like RSA).</p>\n\n<p>Hashing is the other half of the equation — a one-way function that turns any input into a fixed-length fingerprint. You never decrypt a hash; you re-hash the input and compare fingerprints, which is how a login form verifies your password without ever storing the actual password. That's also why a leaked hash database is still a five-alarm fire: attackers just brute-force or rainbow-table guesses until one matches. Identity & Access Management wraps around all of it with the AAA framework — <strong>Authentication</strong> (who are you, prove it), <strong>Authorization</strong> (what are you allowed to touch), and <strong>Accounting</strong> (what did you actually do, logged for the audit trail).</p></p>\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> Symmetric encryption is the single key to your Proxmox server rack — fast, but you and everyone who needs access share the exact same key, so losing it means re-keying everything. Asymmetric is a mailbox with a slot: anyone can drop a locked letter in (encrypt with your public key), but only you hold the key that opens the box (your private key) to read it. AES protects the bulk data; RSA/ECC handles the handshake that safely exchanges the AES key in the first place.</div>\n\n<div class=\"lesson-alert\"><strong>Exam Tip (Security+):</strong> If a question emphasizes speed and bulk data (disk encryption, VPN tunnels), the answer is symmetric (AES). If it emphasizes key exchange, digital signatures, or “proving identity without sharing a secret,” the answer is asymmetric (RSA/ECC).</div>",
          "tags": [
            "comptia",
            "security-plus",
            "crypto"
          ],
          "quiz": [
            {
              "q": "Which algorithm is used to ensure data integrity by creating a fixed-size unique output from a variable-size input?",
              "opts": [
                "AES",
                "RSA",
                "SHA-256",
                "ECC"
              ],
              "ans": 2,
              "exp": "SHA-256 is a hashing algorithm. Hashes provide integrity, not confidentiality."
            },
            {
              "q": "When sending an encrypted email using asymmetric encryption, which key is used to encrypt the message?",
              "opts": [
                "The sender's public key",
                "The sender's private key",
                "The recipient's public key",
                "The recipient's private key"
              ],
              "ans": 2,
              "exp": "You encrypt the message with the recipient's public key so that only the recipient can decrypt it with their private key."
            },
            {
              "q": "Which IAM model relies on clearance levels and classification labels (e.g., Top Secret)?",
              "opts": [
                "MAC",
                "DAC",
                "RBAC",
                "ABAC"
              ],
              "ans": 0,
              "exp": "Mandatory Access Control (MAC) uses labels and clearances, strictly enforced by the OS, commonly used in military environments."
            }
          ]
        }
      ],
      "related": [
        {
          "course": "comptia-securityplus",
          "idx": 0
        },
        {
          "course": "comptia-securityplus",
          "idx": 1
        }
      ]
    }
  ],
  "flashcards": [
    {
      "id": 1,
      "cat": "CompTIA Security+",
      "domain": "Architecture",
      "front": "Zero Trust Architecture",
      "back": "A security model centered on the belief that organizations should not automatically trust anything inside or outside its perimeters. 'Never trust, always verify.'",
      "analogy": "Like a nightclub where instead of a bouncer at the door, every single patron has a personal bodyguard checking their ID before they can take a sip of their drink."
    },
    {
      "id": 101,
      "cat": "CompTIA Security+",
      "domain": "General Security Concepts",
      "front": "CIA Triad",
      "back": "Confidentiality (Encryption), Integrity (Hashing), Availability (Redundancy).",
      "analogy": "The holy trinity of security. Confidentiality = keeping a secret. Integrity = knowing the secret wasn't altered. Availability = actually being able to read the secret when you need to."
    },
    {
      "id": 102,
      "cat": "CompTIA Security+",
      "domain": "General Security Concepts",
      "front": "Non-Repudiation",
      "back": "Proving that a specific user performed an action, preventing them from denying it later. Achieved via Digital Signatures.",
      "analogy": "A notary stamp on a contract. You can't say 'I didn't sign that' if your verified signature is on it."
    },
    {
      "id": 103,
      "cat": "CompTIA Security+",
      "domain": "Threats",
      "front": "Phishing vs. Spear Phishing vs. Whaling",
      "back": "Phishing = Broad net. Spear Phishing = Targeted at a specific person. Whaling = Targeted at a C-level executive.",
      "analogy": "Phishing is throwing dynamite in a lake. Spear phishing is using a sniper rifle. Whaling is hunting Moby Dick."
    },
    {
      "id": 104,
      "cat": "CompTIA Security+",
      "domain": "Threats",
      "front": "SQL Injection (SQLi)",
      "back": "Attacker inputs SQL commands into web forms to manipulate the backend database. Mitigated by Parameterized Queries.",
      "analogy": "Like telling the bouncer at the club that your name is 'John DROP TABLE Users;'."
    },
    {
      "id": 105,
      "cat": "CompTIA Security+",
      "domain": "Architecture",
      "front": "Air Gap",
      "back": "A physical security measure where a secure network is physically isolated from unsecured networks (like the internet).",
      "analogy": "Cutting the actual bridge to the castle. The only way in is to physically walk across the moat with a USB drive."
    },
    {
      "id": 106,
      "cat": "CompTIA Security+",
      "domain": "Architecture",
      "front": "Honeypot",
      "back": "A decoy system designed to lure attackers to study their methods without risking production data.",
      "analogy": "A fake vault in a bank filled with tracking dye to catch burglars while the real vault remains hidden."
    },
    {
      "id": 107,
      "cat": "CompTIA Security+",
      "domain": "SecOps",
      "front": "SIEM (Security Information and Event Management)",
      "back": "A centralized tool that collects, stores, and correlates logs from across the enterprise to detect threats.",
      "analogy": "The command center of a casino where security watches 1,000 cameras at once and correlates when a known cheat walks in."
    },
    {
      "id": 108,
      "cat": "CompTIA Security+",
      "domain": "SecOps",
      "front": "Incident Response: Containment",
      "back": "The phase where you isolate the threat to prevent lateral movement (e.g., unplugging an infected machine or disabling a port).",
      "analogy": "Closing the blast doors on a spaceship when there's a hull breach to save the rest of the ship."
    },
    {
      "id": 109,
      "cat": "CompTIA Security+",
      "domain": "Program Management",
      "front": "RTO vs RPO",
      "back": "RTO (Recovery Time Objective): Max allowed downtime. RPO (Recovery Point Objective): Max allowed data loss (age of backups).",
      "analogy": "RTO = How long until the store reopens after a fire. RPO = How much inventory was lost in the fire."
    },
    {
      "id": 110,
      "cat": "CompTIA Security+",
      "domain": "Program Management",
      "front": "Separation of Duties",
      "back": "Requiring more than one person to complete a critical task to prevent fraud and errors.",
      "analogy": "It takes two different keys turned simultaneously to launch the nuclear missile."
    },
    {
      "id": 208,
      "cat": "CompTIA Security+",
      "domain": "Security",
      "front": "DHCP Snooping",
      "back": "A switch feature that drops DHCP offers from untrusted ports to prevent rogue DHCP server attacks.",
      "analogy": "A bouncer checking IDs to make sure nobody is handing out fake VIP passes in the club."
    },
    {
      "id": 406,
      "cat": "CompTIA Security+",
      "domain": "Security",
      "front": "Shared Responsibility Model",
      "back": "The provider secures the cloud (hardware, hypervisor). The customer secures what is IN the cloud (data, OS, IAM).",
      "analogy": "The landlord secures the apartment building doors. You are responsible for locking your own apartment door."
    },
    {
      "id": 407,
      "cat": "CompTIA Security+",
      "domain": "Security",
      "front": "CloudTrail / Audit Logging",
      "back": "Services that record API calls, tracking exactly who made a change, when, and from what IP address.",
      "analogy": "The security camera footage showing exactly who unlocked the server room door at 2:00 AM."
    }
  ],
  "exam": [
    {
      "q": "A threat actor compromises a single workstation and uses an open SMB port to spread ransomware automatically to every other workstation on the flat /24 subnet. What architectural failure allowed this?",
      "opts": [
        "Lack of Network Segmentation",
        "Failure to implement Multi-Factor Authentication",
        "Outdated Anti-Virus signatures",
        "Insufficient bandwidth on the core switch"
      ],
      "ans": 0,
      "exp": "While AV or MFA might have stopped the initial compromise, the lack of network segmentation (a flat network) is the architectural failure that allowed the malware to spread laterally without friction.",
      "domain": "Security Architecture"
    },
    {
      "q": "A company requires employees to insert a smart card and scan their fingerprint to enter the server room. Which authentication factors are being used?",
      "opts": [
        "Something you know and something you are",
        "Something you have and something you know",
        "Something you have and something you are",
        "Something you are and somewhere you are"
      ],
      "ans": 2,
      "exp": "A smart card is a physical token ('Something you have'), and a fingerprint is a biometric identifier ('Something you are').",
      "domain": "General Security Concepts"
    },
    {
      "q": "A Chief Information Security Officer (CISO) is defining the access control model for a new HR application. The requirement states that access must be granted based on the user's department, clearance level, and the time of day. Which of the following access control models is the BEST fit?",
      "opts": [
        "Role-Based Access Control (RBAC)",
        "Discretionary Access Control (DAC)",
        "Mandatory Access Control (MAC)",
        "Attribute-Based Access Control (ABAC)"
      ],
      "ans": 3,
      "exp": "ABAC grants access based on a combination of attributes, such as user role, time of day, location, and device status. RBAC only looks at the user's role.",
      "domain": "General Security Concepts"
    },
    {
      "q": "Which cryptographic concept ensures that a sender cannot later deny having sent a specific message?",
      "opts": [
        "Confidentiality",
        "Integrity",
        "Non-repudiation",
        "Obfuscation"
      ],
      "ans": 2,
      "exp": "Non-repudiation (often achieved via digital signatures) proves that a specific user sent a message and prevents them from denying it later.",
      "domain": "General Security Concepts"
    },
    {
      "q": "An organization wants to securely exchange encryption keys over an untrusted network (the internet) without physically sending the keys. Which algorithm is BEST suited for this task?",
      "opts": [
        "AES-256",
        "RSA",
        "Diffie-Hellman",
        "SHA-256"
      ],
      "ans": 2,
      "exp": "Diffie-Hellman is a key exchange protocol specifically designed to allow two parties to establish a shared secret key over an insecure channel.",
      "domain": "General Security Concepts"
    },
    {
      "q": "A security analyst notices a spike in CPU usage on several web servers. Upon investigation, they discover unauthorized cryptocurrency mining software running on the servers. What type of attack has occurred?",
      "opts": [
        "Ransomware",
        "Cryptojacking",
        "Logic Bomb",
        "Rootkit"
      ],
      "ans": 1,
      "exp": "Cryptojacking involves unauthorized use of a victim's computing resources to mine cryptocurrency.",
      "domain": "Threats, Vulnerabilities, and Mitigations"
    },
    {
      "q": "A user receives an email that appears to be from their bank, stating their account has been compromised and providing a link to 'reset their password.' The link directs the user to a fake website. What type of attack is this?",
      "opts": [
        "Phishing",
        "Spear Phishing",
        "Whaling",
        "Vishing"
      ],
      "ans": 0,
      "exp": "Phishing is a broad social engineering attack via email designed to trick users into providing credentials or sensitive info. Spear phishing targets specific individuals, while whaling targets executives.",
      "domain": "Threats, Vulnerabilities, and Mitigations"
    },
    {
      "q": "An attacker intercepts communication between a client and a web server, downgrades the encryption protocol to an older, vulnerable version, and captures the plaintext data. What type of attack is this?",
      "opts": [
        "On-path (Man-in-the-Middle) attack",
        "Replay attack",
        "Pass-the-Hash attack",
        "Cross-Site Scripting (XSS)"
      ],
      "ans": 0,
      "exp": "An on-path (formerly Man-in-the-Middle) attack occurs when an attacker intercepts and alters communication between two parties, such as forcing a protocol downgrade.",
      "domain": "Threats, Vulnerabilities, and Mitigations"
    },
    {
      "q": "A threat actor inserts malicious code into an open-source library that is widely used by many enterprise applications. When organizations update the library, their systems become compromised. What type of attack is this?",
      "opts": [
        "Watering Hole attack",
        "Supply Chain attack",
        "Zero-day attack",
        "Cross-Site Request Forgery (CSRF)"
      ],
      "ans": 1,
      "exp": "A supply chain attack targets the software development lifecycle, compromising a vendor or dependency to infect all downstream users.",
      "domain": "Threats, Vulnerabilities, and Mitigations"
    },
    {
      "q": "Which of the following is the BEST mitigation against Pass-the-Hash (PtH) attacks in a Windows environment?",
      "opts": [
        "Implementing WPA3 on the wireless network",
        "Disabling NTLM and forcing Kerberos authentication",
        "Installing a host-based firewall",
        "Updating anti-virus signatures daily"
      ],
      "ans": 1,
      "exp": "Pass-the-Hash exploits NTLM hashes. Disabling NTLM in favor of Kerberos (and utilizing features like Windows Defender Credential Guard) mitigates PtH.",
      "domain": "Threats, Vulnerabilities, and Mitigations"
    },
    {
      "q": "A security assessment reveals that an application accepts user input without validation, allowing an attacker to execute arbitrary SQL commands on the backend database. What is the BEST remediation for this vulnerability?",
      "opts": [
        "Implement a Web Application Firewall (WAF)",
        "Use parameterized queries (prepared statements)",
        "Encrypt the database at rest",
        "Require Multi-Factor Authentication"
      ],
      "ans": 1,
      "exp": "While a WAF can block some attacks, the best and most fundamental remediation for SQL injection is using parameterized queries in the application code.",
      "domain": "Threats, Vulnerabilities, and Mitigations"
    },
    {
      "q": "An attacker targets a company's DNS server and alters the records so that users trying to access the company's intranet are redirected to a malicious server. What is this attack called?",
      "opts": [
        "DNS Poisoning",
        "ARP Spoofing",
        "Domain Hijacking",
        "MAC Flooding"
      ],
      "ans": 0,
      "exp": "DNS Poisoning (or DNS Spoofing) corrupts the DNS cache to redirect traffic to a malicious IP address.",
      "domain": "Threats, Vulnerabilities, and Mitigations"
    },
    {
      "q": "An organization wants to allow third-party developers to access specific backend APIs without exposing the internal network or the raw API endpoints. Which architectural component should they deploy?",
      "opts": [
        "Reverse Proxy",
        "Virtual Private Network (VPN)",
        "API Gateway",
        "Intrusion Prevention System (IPS)"
      ],
      "ans": 2,
      "exp": "An API Gateway sits between clients and services, providing API routing, rate limiting, authentication, and security without exposing the internal architecture.",
      "domain": "Security Architecture"
    },
    {
      "q": "Which of the following concepts describes a network architecture where micro-segmentation is used to enforce strict access controls between individual workloads in a data center?",
      "opts": [
        "Software-Defined Networking (SDN)",
        "Zero Trust Architecture",
        "Defense in Depth",
        "Perimeter Security"
      ],
      "ans": 1,
      "exp": "Micro-segmentation is a core component of Zero Trust Architecture, ensuring that workloads can only communicate with authorized entities, even if they are on the same subnet.",
      "domain": "Security Architecture"
    },
    {
      "q": "To ensure high availability of a critical web application, a company deploys three identical web servers behind a network appliance that distributes incoming traffic equally among them. What is this appliance?",
      "opts": [
        "Load Balancer",
        "Next-Generation Firewall (NGFW)",
        "Web Application Firewall (WAF)",
        "VPN Concentrator"
      ],
      "ans": 0,
      "exp": "A Load Balancer distributes incoming network traffic across multiple servers to ensure no single server becomes overwhelmed, providing high availability.",
      "domain": "Security Architecture"
    },
    {
      "q": "A company is migrating to the cloud and wants to ensure that its encryption keys are managed in a dedicated, tamper-resistant hardware appliance rather than in software. Which cloud service should they use?",
      "opts": [
        "Hardware Security Module (HSM)",
        "Trusted Platform Module (TPM)",
        "Key Management Service (KMS)",
        "Cloud Access Security Broker (CASB)"
      ],
      "ans": 0,
      "exp": "A Hardware Security Module (HSM) is a physical, tamper-resistant device used to securely generate, store, and manage cryptographic keys.",
      "domain": "Security Architecture"
    },
    {
      "q": "Which of the following is the BEST reason to deploy a honeypot on a corporate network?",
      "opts": [
        "To trap automated malware",
        "To study attacker behavior and gather threat intelligence",
        "To offload malicious traffic from production servers",
        "To automatically block attackers at the firewall"
      ],
      "ans": 1,
      "exp": "Honeypots are decoy systems designed to lure attackers. The primary purpose is to monitor them, study their tactics, and gather threat intelligence without risking production assets.",
      "domain": "Security Architecture"
    },
    {
      "q": "A security analyst is reviewing SIEM logs and notices a workstation communicating with a known malicious IP address over port 443. What is the analyst's FIRST step in the incident response process?",
      "opts": [
        "Reimage the workstation",
        "Isolate the workstation from the network",
        "Verify the alert to ensure it is a true positive",
        "Block the IP address on the perimeter firewall"
      ],
      "ans": 2,
      "exp": "Before taking disruptive actions like isolating a machine or blocking IPs (Containment), the analyst must first Identify and verify the alert to ensure it isn't a false positive.",
      "domain": "Security Operations"
    },
    {
      "q": "During a forensic investigation, an analyst creates a bit-by-bit copy of a compromised hard drive and calculates the SHA-256 hash of both the original drive and the copy. Why is this step performed?",
      "opts": [
        "To encrypt the data for secure transport",
        "To prove the chain of custody",
        "To maintain data integrity and prove the evidence was not altered",
        "To compress the image size"
      ],
      "ans": 2,
      "exp": "Hashing the original drive and the forensic image proves data integrity—verifying that the forensic copy is an exact, unaltered replica of the original evidence.",
      "domain": "Security Operations"
    },
    {
      "q": "Which of the following vulnerability scanning concepts involves the scanner logging into the target system with administrative credentials to check for missing patches and misconfigurations?",
      "opts": [
        "Non-credentialed scan",
        "Credentialed scan",
        "Passive scanning",
        "Penetration testing"
      ],
      "ans": 1,
      "exp": "A credentialed scan uses valid authentication credentials to log into the system, providing a deep, accurate assessment of vulnerabilities, missing patches, and registry keys.",
      "domain": "Security Operations"
    },
    {
      "q": "A company requires all privileged accounts to use a system where passwords are automatically rotated every 12 hours and checked out only when needed. What type of solution is this?",
      "opts": [
        "Identity Provider (IdP)",
        "Privileged Access Management (PAM)",
        "Single Sign-On (SSO)",
        "Data Loss Prevention (DLP)"
      ],
      "ans": 1,
      "exp": "Privileged Access Management (PAM) solutions vault privileged credentials, enforce checkout processes, and automatically rotate passwords to secure administrative accounts.",
      "domain": "Security Operations"
    },
    {
      "q": "Which tool would a security analyst use to actively capture and analyze network packets traversing the network in real-time to diagnose a malicious payload?",
      "opts": [
        "Nmap",
        "Wireshark",
        "Metasploit",
        "Nessus"
      ],
      "ans": 1,
      "exp": "Wireshark is a widely used protocol analyzer (packet sniffer) that captures and inspects network traffic in real-time.",
      "domain": "Security Operations"
    },
    {
      "q": "An organization wants to automatically detect and block known malicious payloads entering the network. Which solution should they deploy at the perimeter?",
      "opts": [
        "Intrusion Detection System (IDS)",
        "Intrusion Prevention System (IPS)",
        "Data Loss Prevention (DLP)",
        "Endpoint Detection and Response (EDR)"
      ],
      "ans": 1,
      "exp": "An IPS sits inline on the network and actively blocks malicious traffic. An IDS only detects and alerts.",
      "domain": "Security Operations"
    },
    {
      "q": "A user's laptop is stolen. The IT department uses a remote management tool to send a command that securely deletes all data on the hard drive. What is this action called?",
      "opts": [
        "Remote wipe",
        "Full disk encryption",
        "Geofencing",
        "Mobile Device Management (MDM) lockdown"
      ],
      "ans": 0,
      "exp": "A remote wipe sends a command to a lost or stolen device to securely erase its contents, protecting sensitive data.",
      "domain": "Security Operations"
    },
    {
      "q": "Which phase of the Incident Response lifecycle involves analyzing what went wrong, what went right, and how to improve procedures for the next incident?",
      "opts": [
        "Preparation",
        "Containment",
        "Eradication",
        "Lessons Learned"
      ],
      "ans": 3,
      "exp": "Lessons Learned is the final phase of incident response, focusing on the post-mortem analysis and process improvement.",
      "domain": "Security Operations"
    },
    {
      "q": "A security operations center (SOC) implements a script that automatically isolates a host from the network if the EDR detects ransomware behavior. What concept does this represent?",
      "opts": [
        "Continuous Integration",
        "Security Orchestration, Automation, and Response (SOAR)",
        "Threat Hunting",
        "Vulnerability Management"
      ],
      "ans": 1,
      "exp": "SOAR platforms automate security workflows and incident response actions, such as automatically isolating a compromised host based on specific triggers.",
      "domain": "Security Operations"
    },
    {
      "q": "A company decides not to purchase earthquake insurance for its datacenter because the datacenter is located in an area with no history of seismic activity, making the risk negligible. Which risk management strategy is this?",
      "opts": [
        "Risk Acceptance",
        "Risk Transference",
        "Risk Avoidance",
        "Risk Mitigation"
      ],
      "ans": 0,
      "exp": "Risk acceptance means acknowledging the risk but deciding not to take further action to mitigate or transfer it because the cost of mitigation outweighs the potential loss.",
      "domain": "Security Program Management and Oversight"
    },
    {
      "q": "Which document formally outlines the responsibilities, expected behavior, and acceptable use of corporate IT assets for all employees?",
      "opts": [
        "Service Level Agreement (SLA)",
        "Acceptable Use Policy (AUP)",
        "Non-Disclosure Agreement (NDA)",
        "Business Impact Analysis (BIA)"
      ],
      "ans": 1,
      "exp": "An Acceptable Use Policy (AUP) is a document that employees must sign, dictating what they can and cannot do on corporate devices and networks.",
      "domain": "Security Program Management and Oversight"
    },
    {
      "q": "During disaster recovery planning, the business determines that the critical database cannot be down for more than 4 hours without causing catastrophic financial loss. What does this 4-hour metric represent?",
      "opts": [
        "Recovery Point Objective (RPO)",
        "Maximum Tolerable Downtime (MTD)",
        "Recovery Time Objective (RTO)",
        "Mean Time to Repair (MTTR)"
      ],
      "ans": 2,
      "exp": "The Recovery Time Objective (RTO) is the maximum acceptable amount of time a system can be down after a disaster before it severely impacts the business.",
      "domain": "Security Program Management and Oversight"
    },
    {
      "q": "An organization implements a policy requiring that two separate administrators must authenticate before any changes are made to the core firewall configuration. What principle is being enforced?",
      "opts": [
        "Least Privilege",
        "Separation of Duties",
        "Dual Control",
        "Mandatory Access Control"
      ],
      "ans": 2,
      "exp": "Dual Control (often related to Separation of Duties) requires two distinct individuals to authorize an action, preventing a single rogue admin from compromising the system.",
      "domain": "Security Program Management and Oversight"
    },
    {
      "q": "A healthcare provider must ensure that its data handling practices meet the legal requirements of HIPAA. This is an example of adhering to:",
      "opts": [
        "Industry Frameworks",
        "Regulatory Compliance",
        "Internal Policies",
        "Risk Assessments"
      ],
      "ans": 1,
      "exp": "HIPAA is a federal law. Adhering to laws and legal requirements mandated by the government is known as regulatory compliance.",
      "domain": "Security Program Management and Oversight"
    },
    {
      "q": "Which process determines the potential financial and operational impact of various disasters on specific business units, helping to prioritize recovery efforts?",
      "opts": [
        "Business Impact Analysis (BIA)",
        "Vulnerability Scan",
        "Penetration Test",
        "Tabletop Exercise"
      ],
      "ans": 0,
      "exp": "A Business Impact Analysis (BIA) identifies critical business functions and the potential impacts (financial, operational) if those functions are disrupted.",
      "domain": "Security Program Management and Oversight"
    },
    {
      "q": "A network engineer wants to prevent unauthorized switches from being connected to the corporate network and causing a spanning tree loop. Which feature should be enabled on the access ports?",
      "opts": [
        "BPDU Guard",
        "Port Security",
        "DHCP Snooping",
        "Dynamic ARP Inspection"
      ],
      "ans": 0,
      "exp": "BPDU Guard disables a port if it receives a Bridge Protocol Data Unit (BPDU) from an unauthorized switch, protecting the Spanning Tree topology.",
      "domain": "Security Architecture"
    },
    {
      "q": "An organization wants to authenticate users connecting to the wireless network using their Active Directory credentials rather than a shared password. Which protocol should the WPA2-Enterprise network use to communicate with the authentication server?",
      "opts": [
        "RADIUS",
        "TACACS+",
        "Kerberos",
        "LDAP"
      ],
      "ans": 0,
      "exp": "RADIUS is the standard protocol used by wireless access points to forward authentication requests to a central server (like NPS or ISE) in a WPA2/3-Enterprise setup.",
      "domain": "Security Architecture"
    },
    {
      "q": "Which network security tool is placed inline on the network and actively drops packets that match the signature of a known SQL injection attack?",
      "opts": [
        "IDS",
        "IPS",
        "Syslog server",
        "Packet sniffer"
      ],
      "ans": 1,
      "exp": "An Intrusion Prevention System (IPS) is inline and actively blocks threats. An Intrusion Detection System (IDS) only monitors and alerts.",
      "domain": "Security Operations"
    },
    {
      "q": "To prevent rogue DHCP servers from handing out incorrect IP addresses and gateways to clients, which switch feature must be implemented?",
      "opts": [
        "DHCP Snooping",
        "ARP Inspection",
        "Port Security",
        "VLAN Tagging"
      ],
      "ans": 0,
      "exp": "DHCP Snooping categorizes switch ports as trusted or untrusted. It drops DHCP Offer messages originating from untrusted ports (where end users sit).",
      "domain": "Security Architecture"
    },
    {
      "q": "An administrator configures a firewall rule to explicitly drop any inbound traffic that does not match a previously permitted connection. What principle is this?",
      "opts": [
        "Stateful inspection",
        "Stateless inspection",
        "Implicit deny",
        "Zero Trust"
      ],
      "ans": 2,
      "exp": "Implicit Deny is a firewall rule (usually invisible at the bottom of the ACL) that blocks all traffic that wasn't explicitly allowed by higher rules.",
      "domain": "General Security Concepts"
    },
    {
      "q": "An organization is disposing of old hard drives that contained highly sensitive financial data. They want to ensure the data is permanently destroyed and the drives can never be reused. Which method is BEST?",
      "opts": [
        "Standard formatting",
        "Degaussing",
        "Physical destruction (shredding)",
        "Low-level formatting"
      ],
      "ans": 2,
      "exp": "Physical destruction (like shredding or incineration) is the only foolproof method to guarantee data cannot be recovered and the drive cannot be reused.",
      "domain": "Security Architecture"
    },
    {
      "q": "A user wants to securely authenticate to their workstation using a physical hardware token plugged into a USB port. Which protocol or standard is this device most likely using?",
      "opts": [
        "FIDO/U2F",
        "RADIUS",
        "TACACS+",
        "LDAP"
      ],
      "ans": 0,
      "exp": "FIDO (Fast IDentity Online) U2F (Universal 2nd Factor) is an open authentication standard that enables hardware tokens (like YubiKeys) to securely authenticate users.",
      "domain": "General Security Concepts"
    },
    {
      "q": "During a security audit, it is discovered that a developer accidentally hardcoded an AWS IAM access key and secret key into a Python script and uploaded it to a public GitHub repository. What should the security team do FIRST?",
      "opts": [
        "Delete the GitHub repository",
        "Rotate/Revoke the exposed IAM keys immediately",
        "Fire the developer",
        "Change the root account password"
      ],
      "ans": 1,
      "exp": "The immediate priority is to invalidate the compromised credentials to prevent attackers from using them to access the AWS environment. The keys must be revoked or deleted in IAM immediately.",
      "domain": "Security Operations"
    },
    {
      "q": "An organization wants to authenticate its corporate Active Directory users to a third-party Cloud CRM application without forcing users to create a new password or storing the AD passwords in the cloud. Which protocol is BEST for this?",
      "opts": [
        "SAML (Security Assertion Markup Language)",
        "RADIUS",
        "IPsec",
        "EAP-TLS"
      ],
      "ans": 0,
      "exp": "SAML is an XML-based open standard for exchanging authentication and authorization data between an identity provider (AD) and a service provider (the SaaS CRM), enabling Single Sign-On (SSO).",
      "domain": "General Security Concepts"
    },
    {
      "q": "To ensure that all cloud API calls (e.g., creating a user, deleting a VM) are logged for auditing and compliance purposes, which type of service must be enabled?",
      "opts": [
        "Performance Monitoring (e.g., CloudWatch)",
        "Audit Logging / CloudTrail",
        "Web Application Firewall (WAF)",
        "Vulnerability Scanner"
      ],
      "ans": 1,
      "exp": "Audit logging services (like AWS CloudTrail) record who made an API call, when it was made, and what the action was, which is critical for security and compliance audits.",
      "domain": "Security Operations"
    }
  ],
  "daily": [
    {
      "track": "securityplus",
      "day": 4,
      "concept": "Security+ Review - Day 4",
      "domain": "Security+",
      "icon": "🛡️",
      "color": "#10b981",
      "tagline": "CompTIA Security+ Core Principles",
      "slides": [
        "Welcome to the CompTIA Daily Sprint.",
        "Today we are reviewing core concepts for Security+.",
        "Review your flashcards, check the library modules, and prepare for the mini-quiz."
      ],
      "quiz": [
        {
          "q": "Are you ready to crush the Security+ exam?",
          "opts": [
            "Yes, let's go.",
            "I need more coffee.",
            "Still reviewing flashcards.",
            "Bring on the pain."
          ],
          "ans": 0,
          "exp": "Confidence is key. Let's execute."
        }
      ]
    },
    {
      "track": "securityplus",
      "day": 8,
      "concept": "Security+ Review - Day 8",
      "domain": "Security+",
      "icon": "🛡️",
      "color": "#10b981",
      "tagline": "CompTIA Security+ Core Principles",
      "slides": [
        "Welcome to the CompTIA Daily Sprint.",
        "Today we are reviewing core concepts for Security+.",
        "Review your flashcards, check the library modules, and prepare for the mini-quiz."
      ],
      "quiz": [
        {
          "q": "Are you ready to crush the Security+ exam?",
          "opts": [
            "Yes, let's go.",
            "I need more coffee.",
            "Still reviewing flashcards.",
            "Bring on the pain."
          ],
          "ans": 0,
          "exp": "Confidence is key. Let's execute."
        }
      ]
    },
    {
      "track": "securityplus",
      "day": 12,
      "concept": "Security+ Review - Day 12",
      "domain": "Security+",
      "icon": "🛡️",
      "color": "#10b981",
      "tagline": "CompTIA Security+ Core Principles",
      "slides": [
        "Welcome to the CompTIA Daily Sprint.",
        "Today we are reviewing core concepts for Security+.",
        "Review your flashcards, check the library modules, and prepare for the mini-quiz."
      ],
      "quiz": [
        {
          "q": "Are you ready to crush the Security+ exam?",
          "opts": [
            "Yes, let's go.",
            "I need more coffee.",
            "Still reviewing flashcards.",
            "Bring on the pain."
          ],
          "ans": 0,
          "exp": "Confidence is key. Let's execute."
        }
      ]
    }
  ],
  "arch": [
    {
      "title": "Level 5: Zero Trust Perimeter (pfSense & Proxmox)",
      "desc": "A junior engineer dumped all your Proxmox containers on a flat /24 subnet and port-forwarded 80/443 directly to the NGINX box. You need to implement a Zero Trust perimeter. Place the services in the correct VLANs and configure the pfSense rules.",
      "zones": [
        {
          "id": "wan",
          "name": "WAN (Internet)",
          "accepts": [
            "user",
            "attacker"
          ]
        },
        {
          "id": "dmz",
          "name": "VLAN 10: DMZ",
          "accepts": [
            "nginx",
            "waf"
          ]
        },
        {
          "id": "lan",
          "name": "VLAN 20: Secure LAN",
          "accepts": [
            "db",
            "backend"
          ]
        },
        {
          "id": "pfsense",
          "name": "pfSense Firewall",
          "accepts": [
            "rule_allow_443",
            "rule_deny_all",
            "rule_allow_db"
          ]
        }
      ],
      "palette": [
        {
          "id": "nginx",
          "label": "NGINX Reverse Proxy",
          "type": "resource"
        },
        {
          "id": "db",
          "label": "PostgreSQL Cluster",
          "type": "resource"
        },
        {
          "id": "backend",
          "label": "Node.js API",
          "type": "resource"
        },
        {
          "id": "waf",
          "label": "Web App Firewall",
          "type": "resource"
        },
        {
          "id": "rule_allow_443",
          "label": "Allow Inbound 443 -> DMZ",
          "type": "policy"
        },
        {
          "id": "rule_allow_db",
          "label": "Allow DMZ -> LAN 5432",
          "type": "policy"
        },
        {
          "id": "rule_deny_all",
          "label": "Implicit Deny All",
          "type": "policy"
        }
      ],
      "dm": {
        "wan": [],
        "dmz": [
          "nginx",
          "waf"
        ],
        "lan": [
          "db",
          "backend"
        ],
        "pfsense": [
          "rule_allow_443",
          "rule_allow_db",
          "rule_deny_all"
        ]
      },
      "wm": "Perfect. The WAF and NGINX proxy absorb public traffic in the DMZ. The pfSense firewall explicitly permits only port 443 into the DMZ, and only port 5432 from the DMZ to the Secure LAN. Everything else drops via Implicit Deny. This is how you prevent a compromised web server from pivoting to the database."
    }
  ],
  "sales": []
};
