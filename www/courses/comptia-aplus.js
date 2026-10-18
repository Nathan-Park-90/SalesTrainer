/* Mammoth Academy — Course Pack */
/* Auto-loaded by course-loader.js */

var COURSE_COMPTIA_APLUS = {
  "meta": {
    "id": "comptia-aplus",
    "name": "CompTIA A+",
    "subtitle": "Core 1 (220-1201) & Core 2 (220-1202)",
    "icon": "💻",
    "color": "#f59e0b",
    "examKey": "aplus",
    "flashcardCat": "CompTIA A+",
    "dailyTrackKey": "aplus",
    "domains": {
      "Hardware and Network Troubleshooting": "Hardware & The Helpdesk Trenches",
      "Mobile Devices": "Mobile Devices & Virtualization",
      "Hardware": "Hardware Components",
      "Operating Systems": "Operating Systems & Software",
      "Software Troubleshooting": "Operating Systems & Software",
      "Operational Procedures": "Operational Procedures",
      "Networking": "Networking Fundamentals for the Field Tech",
      "Virtualization and Cloud": "Virtualization & The Cloud (Where Hardware Goes to Retire)",
      "Security": "Security: The Domain That Decides If You Pass Core 2"
    },
    "version": "1.0.0",
    "category": "CompTIA",
    "passThreshold": 0.77,
    "examDurationMinutes": 90,
    "examName": "CompTIA A+",
    "examFormat": {
      "questions": 90,
      "passLabel": "675 / 900 (Core 1), 700 / 900 (Core 2)",
      "blueprint": [
        {
          "domain": "Hardware and Network Troubleshooting",
          "label": "Hardware & Network Troubleshooting",
          "weight": 14
        },
        {
          "domain": "Hardware",
          "label": "Hardware",
          "weight": 12.5
        },
        {
          "domain": "Networking",
          "label": "Networking",
          "weight": 11.5
        },
        {
          "domain": "Mobile Devices",
          "label": "Mobile Devices",
          "weight": 6.5
        },
        {
          "domain": "Virtualization and Cloud",
          "label": "Virtualization & Cloud Computing",
          "weight": 5.5
        },
        {
          "domain": "Operating Systems",
          "label": "Operating Systems",
          "weight": 14
        },
        {
          "domain": "Security",
          "label": "Security",
          "weight": 14
        },
        {
          "domain": "Software Troubleshooting",
          "label": "Software Troubleshooting",
          "weight": 11.5
        },
        {
          "domain": "Operational Procedures",
          "label": "Operational Procedures",
          "weight": 10.5
        }
      ],
      "modes": [
        {
          "id": "core1",
          "name": "A+ Core 1 (220-1201)",
          "passThreshold": 0.75,
          "passLabel": "675 / 900 (75%)",
          "questions": 90,
          "minutes": 90,
          "blueprint": [
            {
              "domain": "Hardware and Network Troubleshooting",
              "label": "Hardware & Network Troubleshooting",
              "weight": 28
            },
            {
              "domain": "Hardware",
              "label": "Hardware",
              "weight": 25
            },
            {
              "domain": "Networking",
              "label": "Networking",
              "weight": 23
            },
            {
              "domain": "Mobile Devices",
              "label": "Mobile Devices",
              "weight": 13
            },
            {
              "domain": "Virtualization and Cloud",
              "label": "Virtualization & Cloud Computing",
              "weight": 11
            }
          ]
        },
        {
          "id": "core2",
          "name": "A+ Core 2 (220-1202)",
          "passThreshold": 0.78,
          "passLabel": "700 / 900 (78%)",
          "questions": 90,
          "minutes": 90,
          "blueprint": [
            {
              "domain": "Operating Systems",
              "label": "Operating Systems",
              "weight": 28
            },
            {
              "domain": "Security",
              "label": "Security",
              "weight": 28
            },
            {
              "domain": "Software Troubleshooting",
              "label": "Software Troubleshooting",
              "weight": 23
            },
            {
              "domain": "Operational Procedures",
              "label": "Operational Procedures",
              "weight": 21
            }
          ]
        },
        {
          "id": "combined",
          "name": "A+ Combined (Core 1 + Core 2)",
          "passLabel": "Must clear both cores",
          "questions": 180,
          "minutes": 180,
          "blueprint": [
            {
              "domain": "Hardware and Network Troubleshooting",
              "label": "Hardware & Network Troubleshooting",
              "weight": 14
            },
            {
              "domain": "Hardware",
              "label": "Hardware",
              "weight": 12.5
            },
            {
              "domain": "Networking",
              "label": "Networking",
              "weight": 11.5
            },
            {
              "domain": "Mobile Devices",
              "label": "Mobile Devices",
              "weight": 6.5
            },
            {
              "domain": "Virtualization and Cloud",
              "label": "Virtualization & Cloud Computing",
              "weight": 5.5
            },
            {
              "domain": "Operating Systems",
              "label": "Operating Systems",
              "weight": 14
            },
            {
              "domain": "Security",
              "label": "Security",
              "weight": 14
            },
            {
              "domain": "Software Troubleshooting",
              "label": "Software Troubleshooting",
              "weight": 11.5
            },
            {
              "domain": "Operational Procedures",
              "label": "Operational Procedures",
              "weight": 10.5
            }
          ],
          "parts": [
            {
              "name": "Core 1",
              "domains": [
                "Hardware and Network Troubleshooting",
                "Hardware",
                "Networking",
                "Mobile Devices",
                "Virtualization and Cloud"
              ],
              "passThreshold": 0.75
            },
            {
              "name": "Core 2",
              "domains": [
                "Operating Systems",
                "Security",
                "Software Troubleshooting",
                "Operational Procedures"
              ],
              "passThreshold": 0.78
            }
          ]
        }
      ]
    }
  },
  "modules": [
    {
      "title": "Hardware & The Helpdesk Trenches",
      "topics": [
        {
          "title": "Hardware & The Helpdesk Trenches",
          "prose": "<p>A+ is the rite of passage. It's the trench warfare of IT. This is where you learn how to handle a motherboard without frying it with static electricity, how to differentiate DDR4 from DDR5 RAM, and how to revive a completely dead Windows machine using nothing but a USB stick and sheer willpower.</p>\n\n<p>The core of A+ troubleshooting is the <strong>CompTIA Troubleshooting Methodology</strong>. Memorize it like a religious text:\n1. Identify the problem (Question the user, check logs).\n2. Establish a theory of probable cause (Occam's razor—start with the obvious).\n3. Test the theory to determine the cause.\n4. Establish a plan of action to resolve the problem and implement the solution.\n5. Verify full system functionality and implement preventive measures.\n6. Document findings, actions, and outcomes.</p>\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> The six-step troubleshooting methodology is a pilot's pre-flight checklist, not a suggestion — it exists because panicked improvisation is how a 5-minute fix becomes a 3-hour outage. A junior tech skips straight to “reinstall Windows.” A CompTIA-certified tech identifies the problem, forms a theory, tests it cheaply first, and only then commits to the nuclear option.</div>\n\n<div class=\"lesson-alert\"><strong>Exam Tip (A+):</strong> When a scenario gives you multiple valid-sounding fixes, pick whichever matches the CURRENT step in the methodology, not the fix that would ultimately work. If the scenario is still at “establish a theory,” the answer is a diagnostic action, not a repair action.</div>",
          "tags": [
            "comptia",
            "a-plus",
            "troubleshooting"
          ],
          "quiz": [
            {
              "q": "According to the CompTIA troubleshooting methodology, what should an IT technician do immediately after identifying the problem?",
              "opts": [
                "Establish a plan of action",
                "Verify full system functionality",
                "Document findings and outcomes",
                "Establish a theory of probable cause"
              ],
              "ans": 3,
              "exp": "After identifying the problem, the next step is to establish a theory of probable cause before making any changes to the system."
            },
            {
              "q": "A user complains that their laptop battery only lasts 30 minutes off the charger. What is the most likely probable cause?",
              "opts": [
                "The laptop's AC adapter is supplying too much voltage",
                "The battery has reached the end of its chemical lifecycle and cannot hold a charge",
                "The laptop needs a BIOS update",
                "The hard drive is spinning too fast"
              ],
              "ans": 1,
              "exp": "Lithium-ion batteries degrade over time. A drastically reduced battery life usually indicates a chemically depleted battery that needs replacement."
            },
            {
              "q": "What is the final step in the CompTIA troubleshooting methodology?",
              "opts": [
                "Verify system functionality",
                "Implement the solution",
                "Document findings, actions, and outcomes",
                "Perform a root cause analysis"
              ],
              "ans": 2,
              "exp": "Documentation is the crucial final step. It ensures that if the issue happens again, there is a record of how it was resolved, adding to the organization's knowledge base."
            }
          ]
        }
      ],
      "related": [
        {
          "course": "psm-scrum",
          "idx": 3
        }
      ]
    },
    {
      "title": "Operating Systems & Software",
      "topics": [
        {
          "title": "Operating Systems & Software",
          "prose": "<p>Core 2 covers Windows, macOS, and Linux. You need to know the Control Panel, Settings app, Task Manager, and the Command Prompt. A blue screen (BSOD) is usually a driver or hardware fault. A spinning beachball on Mac means the CPU is pegged.</p>\n\n<p>Linux swaps the GUI-first approach for a terminal-first one — top is Task Manager, sudo is “run as administrator,” and a stray permissions error is usually a chmod/chown problem, not a mystery. Across all three operating systems, the instinct is the same: Task Manager / Activity Monitor / top tells you WHAT is eating resources before you decide whether to kill it or dig deeper.</p></p>\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> A BSOD is a printout taped to a broken vending machine, not silence — it's the OS telling you exactly which driver or hardware component it choked on (the stop code), if you bother to read past the scary blue color. Most techs screenshot it and Google the stop code instead of actually reading what it says; don't be that tech.</div>\n\n<div class=\"lesson-alert\"><strong>Exam Tip (A+):</strong> Know which OS owns which recovery tool: Windows Recovery Environment (WinRE) and System Restore for Windows; Safe Mode and Time Machine for macOS; a live USB and fsck for Linux. The exam expects the tool that matches the OS in the question, not just any “sounds right” answer.</div>",
          "tags": [
            "comptia",
            "a-plus",
            "os"
          ],
          "quiz": [
            {
              "q": "Which Windows tool is used to manage hard drives, initialize disks, and format partitions?",
              "opts": [
                "Device Manager",
                "Task Manager",
                "Disk Management",
                "System Configuration"
              ],
              "ans": 2,
              "exp": "Disk Management (diskmgmt.msc) is the GUI tool for managing disks and volumes."
            },
            {
              "q": "What is the Linux command to change file permissions?",
              "opts": [
                "chown",
                "chmod",
                "grep",
                "sudo"
              ],
              "ans": 1,
              "exp": "chmod (change mode) is used to change the access permissions of file system objects."
            },
            {
              "q": "In Windows, which utility allows you to configure programs to run automatically at startup?",
              "opts": [
                "Task Manager",
                "Event Viewer",
                "Performance Monitor",
                "Component Services"
              ],
              "ans": 0,
              "exp": "In modern Windows (10/11), startup programs are managed via the Startup tab in Task Manager."
            }
          ]
        }
      ],
      "related": [
        {
          "course": "comptia-aplus",
          "idx": 2
        },
        {
          "course": "comptia-aplus",
          "idx": 3
        }
      ]
    },
    {
      "title": "Hardware Components",
      "topics": [
        {
          "title": "Hardware Components",
          "prose": "<p>CPUs, RAM, Motherboards, Power Supplies. You must know the socket types, RAM generations (DDR4 vs DDR5), and how to calculate wattage for a PSU. If the PC turns on but there's no display and it beeps 3 times, check the RAM.</p>\n\n<p>POST (Power-On Self-Test) beep codes are the motherboard talking before the OS ever loads — no display and no beeps usually means the motherboard itself or the power supply is dead; no display but beeps means POST is running and telling you specifically what's missing. Sizing a PSU isn't guesswork either — add up the wattage draw of the CPU, GPU, drives, and fans, then leave 20-30% headroom so the PSU isn't running flat-out at 100% load every day, which shortens its life.</p></p>\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> RAM generations are USB plugs on purpose — DDR4 and DDR5 sticks are keyed differently so you physically cannot force the wrong generation into a slot. That's not a bug, it's the motherboard saving you from yourself, the same way you can't jam a SATA power cable into a PCIe slot no matter how hard you try.</div>\n\n<div class=\"lesson-alert\"><strong>Exam Tip (A+):</strong> 3 beeps on POST is a classic exam scenario for a RAM fault — memorize that “no display + beep code” means the problem is BEFORE the OS loads, which rules out any software-based answer choice immediately.</div>",
          "tags": [
            "comptia",
            "a-plus",
            "hardware"
          ],
          "quiz": [
            {
              "q": "Which motherboard component is responsible for maintaining the system time when the computer is turned off?",
              "opts": [
                "CPU",
                "CMOS Battery",
                "Northbridge",
                "Southbridge"
              ],
              "ans": 1,
              "exp": "The CMOS battery (usually a CR2032) provides constant power to the RTC (Real Time Clock)."
            },
            {
              "q": "What type of storage uses non-volatile flash memory and connects directly to the PCIe bus via the M.2 slot for maximum speed?",
              "opts": [
                "SATA HDD",
                "SATA SSD",
                "NVMe SSD",
                "USB Flash Drive"
              ],
              "ans": 2,
              "exp": "NVMe (Non-Volatile Memory Express) SSDs use the PCIe bus for vastly superior read/write speeds compared to SATA."
            },
            {
              "q": "Which display technology requires a backlight because its pixels do not emit their own light?",
              "opts": [
                "OLED",
                "Plasma",
                "LCD",
                "CRT"
              ],
              "ans": 2,
              "exp": "LCD (Liquid Crystal Display) requires an LED or CCFL backlight to illuminate the pixels."
            }
          ]
        }
      ],
      "related": [
        {
          "course": "comptia-aplus",
          "idx": 3
        },
        {
          "course": "comptia-aplus",
          "idx": 4
        }
      ]
    },
    {
      "title": "Mobile Devices & Virtualization",
      "topics": [
        {
          "title": "Mobile Devices & Virtualization",
          "prose": "<p>Mobile devices use ARM processors and rely heavily on wireless connectivity (Cellular, Wi-Fi, Bluetooth). Virtualization requires a Hypervisor (Type 1 bare-metal like ESXi, or Type 2 hosted like VirtualBox). Virtualization abstracts hardware; Cloud computing rents it to you.</p>\n\n<p>The Type 1 vs. Type 2 hypervisor distinction is really about who's the boss of the hardware. A Type 1 (bare-metal) hypervisor like ESXi or Proxmox VE IS the operating system — it talks to the hardware directly and runs VMs on top with near-native performance, which is why every serious homelab and every enterprise data center runs Type 1. A Type 2 (hosted) hypervisor like VirtualBox is just another application running inside a normal OS, fine for a quick test VM on a laptop, but with a full OS's overhead sitting between it and the hardware.</p></p>\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> A Type 2 hypervisor is a tent pitched inside your living room — convenient, works fine for a weekend, but you're still paying for and fighting the house (host OS) underneath it. A Type 1 hypervisor tears the house down and builds a proper foundation — that's why a Proxmox box outperforms a laptop running five VirtualBox VMs on top of Windows.</div>\n\n<div class=\"lesson-alert\"><strong>Exam Tip (A+):</strong> “Runs directly on hardware, no host OS” = Type 1. “Runs as an application inside an existing OS” = Type 2. The exam will describe the setup, not use the words “Type 1/2” directly — recognize the pattern.</div>",
          "tags": [
            "comptia",
            "a-plus",
            "mobile"
          ],
          "quiz": [
            {
              "q": "Which of the following is a Type 1 hypervisor?",
              "opts": [
                "VMware Workstation",
                "Oracle VirtualBox",
                "Microsoft Hyper-V (Server)",
                "Parallels Desktop"
              ],
              "ans": 2,
              "exp": "Hyper-V (when installed as a role on Windows Server) acts as a Type 1 (bare-metal) hypervisor. The others run on top of a host OS (Type 2)."
            },
            {
              "q": "What protocol is primarily used by Apple devices to stream audio and video to an Apple TV?",
              "opts": [
                "Miracast",
                "Chromecast",
                "AirPlay",
                "DLNA"
              ],
              "ans": 2,
              "exp": "AirPlay is Apple's proprietary protocol for wireless streaming between devices."
            },
            {
              "q": "A user complains their phone battery is swollen and pushing the screen out. What is the immediate action?",
              "opts": [
                "Squeeze the screen back into place",
                "Puncture the battery to relieve pressure",
                "Power down the device and place it in a fire-safe container",
                "Plug it in to drain the battery safely"
              ],
              "ans": 2,
              "exp": "A swollen lithium-ion battery is a severe fire hazard. Do not puncture or charge it; isolate it in a fireproof container immediately."
            }
          ]
        }
      ],
      "related": [
        {
          "course": "comptia-aplus",
          "idx": 4
        },
        {
          "course": "comptia-aplus",
          "idx": 0
        }
      ]
    },
    {
      "title": "Operational Procedures",
      "topics": [
        {
          "title": "Operational Procedures",
          "prose": "<p>Professionalism, documentation, and safety. This covers ESD (Electrostatic Discharge) straps, ticketing systems, change management, and how to talk to frustrated end-users without losing your job.</p>\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> An ESD strap looks like theater until the one time it isn't — a static discharge you can't even feel (as low as 10-30 volts) is enough to silently kill a modern CPU or RAM stick that never shows a symptom until it fails three weeks later. Ground yourself before you touch the components, not after you remember you should have.</div>\n\n<div class=\"lesson-alert\"><strong>Exam Tip (A+):</strong> Professionalism and change-management questions aren't filler — they show up constantly. The “correct” answer to “a frustrated user is yelling at you” is almost always: don't argue, actively listen, and avoid being judgmental — not “explain why they're wrong.”</div>",
          "tags": [
            "comptia",
            "a-plus",
            "procedures"
          ],
          "quiz": [
            {
              "q": "What is the best way to protect internal PC components from ESD when working on a carpeted floor?",
              "opts": [
                "Wear rubber gloves",
                "Use an anti-static wrist strap attached to the unpainted metal chassis",
                "Keep the computer plugged into the wall",
                "Work very quickly"
              ],
              "ans": 1,
              "exp": "An anti-static wrist strap safely grounds you to the computer chassis, equalizing electrical potential and preventing static discharge."
            },
            {
              "q": "A user is irate because their PC crashed and they lost an hour of work. What is the best response?",
              "opts": [
                "Tell them they should have saved their work",
                "Actively listen, apologize for the frustration, and begin troubleshooting",
                "Transfer them to a manager",
                "Ignore the emotion and ask for the error code"
              ],
              "ans": 1,
              "exp": "Active listening and empathy defuse tense situations, which is a core soft skill in IT support."
            },
            {
              "q": "What document provides detailed instructions on how to handle, store, and dispose of hazardous chemicals like printer toner?",
              "opts": [
                "SLA",
                "AUP",
                "MSDS / SDS",
                "EULA"
              ],
              "ans": 2,
              "exp": "A Safety Data Sheet (SDS), formerly MSDS, outlines the handling, hazards, and disposal procedures for chemicals."
            }
          ]
        }
      ],
      "related": [
        {
          "course": "comptia-aplus",
          "idx": 0
        },
        {
          "course": "comptia-aplus",
          "idx": 1
        }
      ]
    },
    {
      "title": "Networking Fundamentals for the Field Tech",
      "topics": [
        {
          "title": "Ports, Protocols, and the Network Layer Techs Actually Touch",
          "prose": "<p>Networking is 23% of Core 1 — the single biggest chunk of the exam after Hardware and Network Troubleshooting itself — and it's the domain most helpdesk techs try to skip because \"the network guys handle that.\" They don't, not when a user can't print, can't reach a shared drive, or can't VPN in from home, and you're the first call.</p>\n\n<p>Start with the ports. Every network service listens on a numbered door, and the exam expects you to know the doorman by number on sight: <strong>21</strong> FTP, <strong>22</strong> SSH, <strong>23</strong> Telnet, <strong>25</strong> SMTP, <strong>53</strong> DNS, <strong>80</strong> HTTP, <strong>110</strong> POP3, <strong>143</strong> IMAP, <strong>443</strong> HTTPS, <strong>445</strong> SMB (Windows file sharing), <strong>3389</strong> RDP. If a user can browse the web but can't reach a mapped drive, you're not looking at a DNS problem (53) — you're looking at port 445 blocked somewhere between them and the file server.</p>\n\n<p>IP addressing is the other half. IPv4 addresses are four octets (192.168.1.10), and a subnet mask tells a device which part of that address is the \"building\" (network) and which part is the \"apartment number\" (host) — a /24 mask (255.255.255.0) means the last octet is yours to hand out, giving you 254 usable host addresses. Private ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) never route on the public internet directly — that's what NAT on your SOHO router is for, translating your private IP to its one public IP before traffic leaves the building.</p>\n\n<p>Cabling still matters even in a wireless-first world: Cat5e tops out around 1 Gbps, Cat6 pushes 10 Gbps over shorter runs, Cat6a holds that 10 Gbps over the full 100-meter run. Fiber (single-mode for long-haul, multimode for shorter in-building runs) trades copper's distance and interference limits for cost and fragility. On the wireless side, know your standards by number, not just letter: 802.11ac (Wi-Fi 5) is 5 GHz only; 802.11ax (Wi-Fi 6/6E) adds the 6 GHz band, which is what the \"E\" in 6E actually means.</p>\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> Port numbers are apartment numbers in one big office building (the IP address). The building's front desk gets you in the door, but knock on the wrong apartment — port 80 instead of 443 — and nobody who can actually help you answers. A pfSense box doing port forwarding is nothing more than a doorman with a clipboard: \"package for apartment 443? Send it to the server in unit 10.0.0.5.\" Get the port wrong and it doesn't matter how right the address was.</div>\n\n<div class=\"lesson-alert\"><strong>Exam Tip (A+):</strong> Memorize the port list cold — the exam will describe a symptom (\"can reach the website but email won't send\") and expect you to identify the blocked port without it ever using the word \"port.\" Ports are tested by scenario, not by flashcard.</div>",
          "tags": [
            "comptia",
            "a-plus",
            "networking"
          ],
          "quiz": [
            {
              "q": "A user can reach internal file shares by IP address (\\\\10.0.0.5\\shared works) but not by hostname (\\\\FILESERVER\\shared fails). Which service is most likely unavailable?",
              "opts": [
                "HTTP (port 80)",
                "DNS (port 53)",
                "RDP (port 3389)",
                "HTTPS (port 443)"
              ],
              "ans": 1,
              "exp": "Name resolution — turning a hostname into an IP — is DNS's job on port 53. Direct-IP access working while hostname access fails is the classic DNS-down symptom."
            },
            {
              "q": "Which of the following is a private, non-routable IPv4 address?",
              "opts": [
                "8.8.8.8",
                "192.168.1.50",
                "1.1.1.1",
                "34.201.10.5"
              ],
              "ans": 1,
              "exp": "192.168.0.0/16 is one of the three reserved private ranges (along with 10.0.0.0/8 and 172.16.0.0/12) — it never routes directly on the public internet."
            },
            {
              "q": "A technician must run a cable the full 100-meter maximum length allowed by the standard while still supporting 10 Gbps. Which cable meets both requirements?",
              "opts": [
                "Cat5e",
                "Cat6",
                "Cat6a",
                "Cat3"
              ],
              "ans": 2,
              "exp": "Cat6 can hit 10 Gbps but only over shorter runs (~55m); Cat6a holds 10 Gbps across the full 100-meter maximum run length."
            }
          ]
        }
      ],
      "related": [
        {
          "course": "comptia-aplus",
          "idx": 2
        },
        {
          "course": "comptia-aplus",
          "idx": 1
        }
      ]
    },
    {
      "title": "Virtualization & The Cloud (Where Hardware Goes to Retire)",
      "topics": [
        {
          "title": "The Five Traits of “Actually Cloud” and the Three Ways to Rent It",
          "prose": "<p>Every vendor calls everything \"cloud\" now, which makes the term nearly meaningless — except CompTIA (borrowing from NIST) defines it precisely with five characteristics, and the exam expects you to recognize all five by description, not by name. <strong>On-demand self-service</strong>: you provision a VM by clicking a button, not by filing a ticket and waiting three days for a human to rack a server. <strong>Broad network access</strong>: reachable from anywhere, any device, over standard internet protocols. <strong>Resource pooling</strong>: your workload shares a physical host with other tenants' workloads, invisibly. <strong>Rapid elasticity</strong>: capacity scales up and down automatically with demand, not by a person manually adding RAM. <strong>Measured service</strong>: you're metered and billed for exactly what you use, like a utility bill, not a flat fee for a box.</p>\n\n<p>Above those five traits sit three service models, and mixing them up is the single most common Virtualization/Cloud mistake on this exam. <strong>IaaS</strong> (Infrastructure as a Service) rents you the raw virtual hardware — VMs, storage, networking — and you install and manage the OS and everything above it yourself. <strong>PaaS</strong> (Platform as a Service) hands you a ready-to-deploy runtime — you push code, the platform handles the OS, patching, and scaling underneath it. <strong>SaaS</strong> (Software as a Service) is the finished application — you just log in and use it; you touch none of the infrastructure at all.</p>\n\n<p>Client-side virtualization is the same hypervisor concept scaled down to a technician's own workstation: running a Type 2 hypervisor like VirtualBox or VMware Workstation to spin up a disposable Windows VM for testing a sketchy installer, or to run a legacy application that refuses to work on the current OS, without touching the host machine's real configuration. It's a sandbox, not a production tool — when the VM gets messy, you delete it and start over, which is exactly the point.</p>\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> IaaS, PaaS, and SaaS are three ways to rent a kitchen. IaaS rents you an empty commercial kitchen — you bring your own pots, ingredients, and cook the food yourself. PaaS is a meal-kit service — the ingredients and recipe are handled, you just do the cooking. SaaS is a restaurant — you sit down, order, and eat; you never see the kitchen at all. Get handed a scenario on the exam and ask yourself: how much of the kitchen am I responsible for?</div>\n\n<div class=\"lesson-alert\"><strong>Exam Tip (A+):</strong> If a question describes deploying code to a platform that automatically handles the OS, patching, and runtime, that's PaaS — not IaaS. If it describes renting raw virtual machines you configure from the OS up yourself, that's IaaS. The exam tests recognition of the scenario, not the acronym.</div>",
          "tags": [
            "comptia",
            "a-plus",
            "virtualization",
            "cloud"
          ],
          "quiz": [
            {
              "q": "A developer wants to deploy application code without managing the underlying operating system, patching, or server capacity. Which cloud service model best fits?",
              "opts": [
                "IaaS",
                "PaaS",
                "SaaS",
                "DaaS"
              ],
              "ans": 1,
              "exp": "PaaS hands over a ready-to-run platform — the provider manages the OS and runtime, the developer just deploys code."
            },
            {
              "q": "Which cloud characteristic describes a system automatically adding server capacity during a traffic spike and removing it afterward without human action?",
              "opts": [
                "Measured service",
                "Resource pooling",
                "Rapid elasticity",
                "Broad network access"
              ],
              "ans": 2,
              "exp": "Rapid elasticity is capacity scaling up and down automatically with demand, with no manual provisioning step."
            },
            {
              "q": "A technician wants to test an unfamiliar installer without risking the host machine's configuration. What is the BEST approach?",
              "opts": [
                "Install it directly and use System Restore afterward if needed",
                "Create a client-side VM using a Type 2 hypervisor and test it there",
                "Ask a coworker to test it on their machine first",
                "Disable the host's antivirus and run it"
              ],
              "ans": 1,
              "exp": "A disposable client-side VM (VirtualBox, VMware Workstation) isolates the test from the host entirely — delete the VM and the risk is gone."
            }
          ]
        }
      ],
      "related": [
        {
          "course": "comptia-cloudplus",
          "idx": 1
        },
        {
          "course": "comptia-aplus",
          "idx": 3
        }
      ]
    },
    {
      "title": "Security: The Domain That Decides If You Pass Core 2",
      "topics": [
        {
          "title": "Malware, Social Engineering, and the Human Attack Surface",
          "prose": "<p>Security is 28% of Core 2 — tied with Operating Systems as the largest domain on either exam — because a technician who can build a flawless network but ships it with the admin password still set to \"admin\" has built nothing. Malware and social engineering are where most real-world breaches start, and CompTIA expects you to name each variant by its actual behavior, not just its reputation.</p>\n\n<p><strong>Viruses</strong> attach to a host file and need that file executed to spread. <strong>Worms</strong> need no host file and no user action at all — they self-replicate across a network on their own, which is why an unpatched, internet-facing machine can be compromised in minutes. <strong>Trojans</strong> disguise themselves as legitimate software; the payload only detonates once a user willingly installs it. <strong>Ransomware</strong> encrypts a victim's files and demands payment for the key. <strong>Keyloggers</strong> silently record every keystroke, harvesting credentials without ever touching a file the user would notice. <strong>Rootkits</strong> bury themselves at the OS or firmware level specifically to hide from the antivirus scanning above them — which is why a rootkit infection often can't be trusted to be fully removed without a full OS reinstall.</p>\n\n<p>Social engineering skips the malware entirely and attacks the person instead of the machine. <strong>Phishing</strong> is the mass-email version; <strong>spear phishing</strong> targets one specific person with researched, personalized bait; <strong>whaling</strong> targets an executive specifically. <strong>Shoulder surfing</strong> is someone reading your screen or PIN entry over your shoulder. <strong>Tailgating</strong> is following an authorized person through a badge-locked door without badging in yourself — the single most effective and most underrated physical attack there is, because it exploits politeness, not a technical flaw.</p>\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> Worms and viruses are the difference between a cough and an itch you have to scratch. A virus needs someone to \"scratch\" it — open the infected attachment — before it spreads. A worm just coughs on its own, no action required, which is why one unpatched machine on a flat network can take down the whole floor overnight while everyone's asleep. Segment your network — the way a pfSense VLAN keeps IoT devices off the main LAN — and a worm outbreak stays a head cold instead of the whole office catching pneumonia.</div>\n\n<div class=\"lesson-alert\"><strong>Exam Tip (A+):</strong> The exam loves describing an attack in plain English and expecting you to name the exact term — \"an email pretending to be your CEO asking for a wire transfer\" is whaling, not generic phishing. Match the specificity of the target to the specificity of the term.</div>",
          "tags": [
            "comptia",
            "a-plus",
            "security",
            "malware"
          ],
          "quiz": [
            {
              "q": "Malware that self-replicates across a network without requiring any user action or host file is best classified as a:",
              "opts": [
                "Virus",
                "Worm",
                "Trojan",
                "Rootkit"
              ],
              "ans": 1,
              "exp": "Worms spread on their own across a network with no host file and no user action required — unlike a virus, which needs an infected file to be executed."
            },
            {
              "q": "An attacker follows an employee through a badge-secured door without presenting their own credentials. This is an example of:",
              "opts": [
                "Shoulder surfing",
                "Whaling",
                "Tailgating",
                "Spear phishing"
              ],
              "ans": 2,
              "exp": "Tailgating is gaining physical access by following an authorized person through a secured door, exploiting politeness rather than a technical flaw."
            }
          ]
        },
        {
          "title": "Hardening Windows, Mobile Devices, and the SOHO Network",
          "prose": "<p>Knowing the threats is half the domain; the other half is locking things down before the threat shows up. On a Windows workstation that starts with <strong>BitLocker</strong> (full-disk encryption, so a stolen laptop's drive is unreadable without the recovery key), <strong>Windows Defender/antivirus</strong> kept current and actively scanning, the built-in <strong>firewall</strong> left on rather than \"fixed\" by disabling it, and <strong>UAC</strong> (User Account Control) prompting before anything runs with elevated privileges — the little permission popup users love to click through without reading, which exists specifically to stop malware from silently gaining admin rights.</p>\n\n<p>Mobile devices get their own checklist: a <strong>screen lock</strong> (PIN, pattern, or biometric) is the baseline, <strong>remote wipe</strong> is the insurance policy for when the device is lost or stolen rather than just locked, and <strong>full-device encryption</strong> (on by default on modern iOS/Android) protects the data at rest the same way BitLocker does on a laptop. None of it matters if the device stays in its factory-default state — always change default credentials on anything with a login screen, mobile or not.</p>\n\n<p>SOHO wireless routers ship configured for the vendor's convenience, not your security, and hardening one is a fixed checklist worth memorizing: change the default admin password immediately, enable <strong>WPA3</strong> (or WPA2 if the hardware can't do WPA3 — never WEP, never open), disable WPS (a well-known brute-force weak point), and consider disabling SSID broadcast and enabling MAC filtering as additional-but-not-primary layers — they slow down a casual snoop but won't stop anyone running real reconnaissance tools, so they're a supplement to WPA3, never a replacement for it.</p>\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> UAC is the \"are you sure?\" text message a bank sends before a big transfer — annoying, easy to approve without reading, and exactly the point where a scammer's whole plan falls apart if you actually stop and look. Malware relies on you clicking \"Yes\" on autopilot the same way a phishing victim approves a fraudulent transfer without reading it. The popup only works if you actually read it.</div>\n\n<div class=\"lesson-alert\"><strong>Exam Tip (A+):</strong> SSID hiding and MAC filtering show up as WRONG answers whenever a question asks for the BEST or PRIMARY security control — they're real but weak, easily defeated with basic wireless scanning tools. WPA3 (or WPA2) is always the correct primary answer; the others are supplements at best.</div>",
          "tags": [
            "comptia",
            "a-plus",
            "security",
            "hardening"
          ],
          "quiz": [
            {
              "q": "Which Windows feature specifically prompts a user for confirmation before an application is allowed to run with administrative privileges?",
              "opts": [
                "BitLocker",
                "Windows Defender",
                "User Account Control (UAC)",
                "Windows Firewall"
              ],
              "ans": 2,
              "exp": "UAC is the permission prompt that requires explicit confirmation before a process can run with elevated (administrative) privileges."
            },
            {
              "q": "Which of the following provides the STRONGEST primary security for a SOHO wireless network?",
              "opts": [
                "Disabling SSID broadcast",
                "Enabling MAC filtering",
                "WPA3 encryption",
                "Reducing transmit power"
              ],
              "ans": 2,
              "exp": "WPA3 (or WPA2 where WPA3 isn't supported) is real cryptographic security; SSID hiding, MAC filtering, and power reduction are weak supplements easily bypassed with basic tools."
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
          "course": "comptia-aplus",
          "idx": 4
        }
      ]
    }
  ],
  "flashcards": [
    {
      "id": 209,
      "cat": "CompTIA A+",
      "domain": "Troubleshooting",
      "front": "APIPA (169.254.x.x)",
      "back": "Automatic Private IP Addressing. Assigned by Windows when the client cannot reach a DHCP server.",
      "analogy": "The network equivalent of talking to yourself because nobody else is answering."
    },
    {
      "id": 210,
      "cat": "CompTIA A+",
      "domain": "Troubleshooting",
      "front": "ping vs tracert",
      "back": "Ping tests basic reachability. Tracert/Traceroute shows the exact path of hops to the destination and where latency occurs.",
      "analogy": "Ping is asking 'Are you there?'. Tracert is asking 'Which exact roads did you take to get there and where was the traffic?'."
    },
    {
      "id": 301,
      "cat": "CompTIA A+",
      "domain": "Hardware",
      "front": "ECC RAM",
      "back": "Error-Correcting Code RAM. Detects and corrects single-bit errors in memory on the fly. Used in servers.",
      "analogy": "A proofreader checking every single letter of a document as it's being typed to prevent a crash."
    },
    {
      "id": 302,
      "cat": "CompTIA A+",
      "domain": "Hardware",
      "front": "NVMe (Non-Volatile Memory Express)",
      "back": "Storage protocol that uses the high-speed PCIe bus instead of SATA, providing massively faster read/write speeds.",
      "analogy": "Upgrading from a two-lane dirt road (SATA) to a 16-lane superhighway (PCIe) for your data."
    },
    {
      "id": 303,
      "cat": "CompTIA A+",
      "domain": "Hardware",
      "front": "OLED vs LCD",
      "back": "OLED pixels emit their own light (true blacks, no backlight). LCD requires an LED/CCFL backlight to shine through the pixels.",
      "analogy": "OLED is a stadium screen made of individual lightbulbs. LCD is a stained glass window with the sun shining behind it."
    },
    {
      "id": 304,
      "cat": "CompTIA A+",
      "domain": "OS",
      "front": "SFC (System File Checker)",
      "back": "Windows CLI tool (sfc /scannow) that scans and replaces corrupted or missing protected system files.",
      "analogy": "An auto-mechanic that scans the engine and automatically replaces any broken spark plugs with factory originals."
    },
    {
      "id": 305,
      "cat": "CompTIA A+",
      "domain": "OS",
      "front": "chkdsk (Check Disk)",
      "back": "Scans the file system and hard drive for logical errors and bad sectors, and attempts to fix them.",
      "analogy": "A street sweeper fixing potholes on the hard drive."
    },
    {
      "id": 306,
      "cat": "CompTIA A+",
      "domain": "Mobile",
      "front": "MDM (Mobile Device Management)",
      "back": "Enterprise software used to enforce security policies, wipe data, and push apps to employee mobile devices.",
      "analogy": "A remote control for the IT department to securely manage every phone in the company."
    },
    {
      "id": 307,
      "cat": "CompTIA A+",
      "domain": "Troubleshooting",
      "front": "CompTIA Troubleshooting Step 1",
      "back": "Identify the problem. Gather information from the user, identify changes, and review logs.",
      "analogy": "A doctor taking a patient's history and asking 'where does it hurt?' before ordering an MRI."
    },
    {
      "id": 308,
      "cat": "CompTIA A+",
      "domain": "Troubleshooting",
      "front": "CompTIA Troubleshooting Step 2",
      "back": "Establish a theory of probable cause. Use Occam's razor (start with the obvious).",
      "analogy": "The doctor diagnosing that a headache is probably just dehydration, not a brain tumor."
    },
    {
      "id": 309,
      "cat": "CompTIA A+",
      "domain": "Troubleshooting",
      "front": "BSOD (Blue Screen of Death)",
      "back": "A fatal system error in Windows, usually caused by bad hardware (RAM/HDD) or corrupted device drivers.",
      "analogy": "The OS pulling the emergency brake to prevent the hardware from destroying itself."
    },
    {
      "id": 310,
      "cat": "CompTIA A+",
      "domain": "Procedures",
      "front": "ESD (Electrostatic Discharge)",
      "back": "The sudden flow of electricity between two electrically charged objects. Prevented by anti-static wrist straps.",
      "analogy": "A lightning strike for microchips. You won't feel it, but it will instantly fry a CPU."
    },
    {
      "id": 410,
      "cat": "CompTIA A+",
      "domain": "Troubleshooting",
      "front": "Security Groups vs NACLs",
      "back": "Security Groups act as stateful firewalls at the Instance/VM level. NACLs act as stateless firewalls at the Subnet level.",
      "analogy": "NACLs are the guard at the neighborhood gate. Security Groups are the locks on your specific front door."
    }
  ],
  "exam": [
    {
      "q": "An analyst notices that log entries from the primary database server have stopped arriving at the SIEM. Upon investigation, the server's hard drive is completely full. Which CompTIA troubleshooting step should the analyst perform next?",
      "opts": [
        "Establish a plan of action to resolve the problem",
        "Establish a theory of probable cause",
        "Document findings, actions, and outcomes",
        "Verify full system functionality"
      ],
      "ans": 0,
      "exp": "The problem has been identified (logs stopped) and the probable cause has been established (hard drive is full). The next step in the methodology is to establish a plan of action to resolve it (e.g., clearing space or expanding the volume).",
      "domain": "Hardware and Network Troubleshooting",
      "whyWrong": [
        "",
        "Establishing a theory of probable cause comes before confirming the root cause; here the analyst has already investigated and confirmed the drive is full.",
        "Documenting findings, actions, and outcomes is the final (sixth) step of the CompTIA troubleshooting methodology, performed only after the fix is verified.",
        "Verifying full system functionality happens after the remediation plan has been implemented, not before the full disk has been addressed."
      ]
    },
    {
      "q": "A user spills coffee on their laptop keyboard. The laptop immediately powers off and emits a burning smell. What should the technician do FIRST?",
      "opts": [
        "Remove the battery and disconnect the AC adapter",
        "Open the laptop casing to inspect the motherboard",
        "Use compressed air to dry the keyboard",
        "Document the incident for insurance"
      ],
      "ans": 0,
      "exp": "Safety and preventing further electrical damage is the first priority. Disconnect all power sources immediately before assessing internal damage.",
      "domain": "Hardware and Network Troubleshooting",
      "whyWrong": [
        "",
        "Opening the chassis while the AC adapter or internal battery is still connected risks further short-circuit damage and shock.",
        "Blowing compressed air across liquid while power is still attached can push conductive moisture deeper under motherboard components.",
        "Documentation is done after immediate electrical and safety hazards have been neutralized by removing all power sources."
      ]
    },
    {
      "q": "A company requires a display technology for a conference room that provides the truest blacks, highest contrast ratios, and does not require a backlight. Which technology fits this description?",
      "opts": [
        "TN LCD",
        "IPS LCD",
        "OLED",
        "Mini-LED"
      ],
      "ans": 2,
      "exp": "OLED (Organic Light Emitting Diode) displays do not use a backlight. Each pixel generates its own light and can turn off completely, providing true blacks and infinite contrast.",
      "domain": "Mobile Devices",
      "whyWrong": [
        "TN (Twisted Nematic) LCD panels rely on a constant backlight and have the poorest viewing angles and contrast ratios of modern panel types.",
        "IPS (In-Plane Switching) LCDs offer accurate color and wide viewing angles, but they still require a backlight that causes light bleed on dark scenes.",
        "",
        "Mini-LED uses thousands of tiny LEDs for local dimming zones, but it is still a backlight behind an LCD panel rather than self-emissive pixels."
      ]
    },
    {
      "q": "A server requires RAM that can detect and correct single-bit memory errors on the fly to prevent system crashes. What type of RAM should be installed?",
      "opts": [
        "Non-parity",
        "ECC",
        "SODIMM",
        "VRAM"
      ],
      "ans": 1,
      "exp": "ECC (Error-Correcting Code) RAM detects and corrects common kinds of internal data corruption, making it critical for enterprise servers.",
      "domain": "Hardware",
      "whyWrong": [
        "Non-parity consumer RAM lacks extra error-checking bits, so it can neither detect nor correct single-bit memory corruption.",
        "",
        "SODIMM (Small Outline DIMM) describes the compact physical form factor used in laptops and mini-PCs, not error-correcting logic.",
        "VRAM (Video RAM, such as GDDR6) is dedicated high-bandwidth memory soldered onto a graphics card for rendering frames, not system server memory."
      ]
    },
    {
      "q": "A Windows 11 machine is stuck in a reboot loop and crashes with a Blue Screen of Death (BSOD) immediately after the boot logo. Which built-in tool is BEST for recovering the OS without losing user data?",
      "opts": [
        "Disk Management",
        "Windows Recovery Environment (WinRE)",
        "Task Manager",
        "Regedit"
      ],
      "ans": 1,
      "exp": "WinRE (Windows Recovery Environment) provides tools like Startup Repair, System Restore, and Safe Mode to troubleshoot boot failures without destroying data.",
      "domain": "Operating Systems",
      "whyWrong": [
        "Disk Management is a graphical snap-in inside a running Windows desktop for partitioning drives; it cannot be launched when Windows fails to boot.",
        "",
        "Task Manager monitors and terminates running processes inside an active Windows session, which is inaccessible during a boot-time BSOD loop.",
        "Regedit edits the Windows Registry from a running desktop (or manually loaded hive) and does not provide automated Startup Repair or System Restore."
      ]
    },
    {
      "q": "A user's Android phone is experiencing severe battery drain, high data usage, and pop-up ads appearing even when the browser is closed. What is the MOST likely cause?",
      "opts": [
        "A failing lithium-ion battery",
        "A compromised Wi-Fi network",
        "Malware or adware infection",
        "Outdated OS firmware"
      ],
      "ans": 2,
      "exp": "Sudden battery drain, unexplained data spikes, and system-wide pop-ups are textbook symptoms of a malware or adware infection on a mobile device.",
      "domain": "Software Troubleshooting",
      "whyWrong": [
        "An aging lithium-ion battery explains rapid discharge, but hardware battery wear never generates cellular data spikes or pop-up ads.",
        "A compromised Wi-Fi network can intercept unencrypted traffic, but it does not inject system-wide pop-ups onto the phone when the browser is closed.",
        "",
        "Outdated OS firmware may have unpatched bugs, but it does not suddenly spawn background ad pop-ups and runaway data usage on its own."
      ]
    },
    {
      "q": "Before making significant changes to the Windows Registry to fix a corrupt application, what should a technician do to ensure they can revert if something goes wrong?",
      "opts": [
        "Create a System Restore point or export the Registry",
        "Run the System File Checker (sfc /scannow)",
        "Reboot into Safe Mode",
        "Update the application's drivers"
      ],
      "ans": 0,
      "exp": "Always create a backup (like a System Restore point or a direct Registry export) before editing the Registry, as an incorrect change can render the OS unbootable.",
      "domain": "Operational Procedures",
      "whyWrong": [
        "",
        "sfc /scannow repairs corrupted Microsoft system files, but it does not back up custom Registry keys or undo manual Registry edits.",
        "Booting into Safe Mode loads minimal drivers and services, which does not back up the Registry or provide a way to roll back a bad edit.",
        "Updating device drivers replaces hardware driver files rather than backing up the Registry hives before manual editing."
      ]
    },
    {
      "q": "A desktop computer intermittently shuts down without warning, especially when the user is playing graphics-intensive games or rendering video. The fans are very loud before it crashes. What is the MOST likely culprit?",
      "opts": [
        "Failing hard drive",
        "Corrupted display drivers",
        "Thermal shutdown due to overheating",
        "Bad RAM modules"
      ],
      "ans": 2,
      "exp": "Intensive tasks generate significant heat. If the cooling system (fans/heatsinks) is inadequate or clogged with dust, the CPU/GPU will overheat and trigger a thermal shutdown to prevent permanent damage.",
      "domain": "Hardware and Network Troubleshooting",
      "whyWrong": [
        "A failing hard drive causes slow file reads, clicking noises, or OS freezes, not sudden power-offs preceded by maximum fan spin during heavy GPU/CPU loads.",
        "Corrupted display drivers typically trigger a driver reset or a BSOD error code rather than an abrupt hardware power cut under thermal load.",
        "",
        "Bad RAM modules cause random BSODs (like MEMORY_MANAGEMENT) at any workload level rather than predictable thermal cutoffs when fans ramp up."
      ]
    },
    {
      "q": "Which Windows command-line utility is used to verify the integrity of all protected system files and replace incorrect, corrupted, changed, or damaged versions?",
      "opts": [
        "chkdsk",
        "diskpart",
        "sfc",
        "gpupdate"
      ],
      "ans": 2,
      "exp": "SFC (System File Checker) scans the integrity of all protected system files and replaces incorrect versions with correct Microsoft versions.",
      "domain": "Operating Systems",
      "whyWrong": [
        "chkdsk scans the disk volume for filesystem metadata errors and bad physical sectors; it does not validate protected Windows OS binaries against Microsoft's component store.",
        "diskpart is a command-line disk partitioning utility used to create, format, or delete volumes, not to repair corrupted Windows system files.",
        "",
        "gpupdate refreshes Active Directory and local Group Policy settings on the machine without scanning or repairing OS system files."
      ]
    },
    {
      "q": "A technician needs to connect a legacy printer to a modern PC. The printer has a large, 25-pin D-sub connector. What type of port is this?",
      "opts": [
        "VGA",
        "Serial (RS-232)",
        "Parallel (LPT)",
        "SCSI"
      ],
      "ans": 2,
      "exp": "Legacy printers typically used Parallel ports (LPT), which physically featured a 25-pin D-subminiature (DB-25) female connector on the PC.",
      "domain": "Hardware",
      "whyWrong": [
        "VGA uses a 15-pin 3-row D-sub (DE-15) connector to carry analog video to a monitor, not a 25-pin printer interface.",
        "RS-232 serial ports on PCs typically use a 9-pin male D-sub (DE-9) connector for COM devices rather than the 25-pin female LPT printer port.",
        "",
        "External SCSI connectors use high-density 50-pin or 68-pin interfaces for legacy storage arrays and scanners, not a standard 25-pin LPT printer port."
      ]
    },
    {
      "q": "A user brings a company-owned smartphone to the helpdesk. They forgot the passcode, and after 10 failed attempts, the phone automatically wiped all its data. What enterprise security feature caused this?",
      "opts": [
        "Geofencing",
        "Mobile Device Management (MDM) policy",
        "Remote wipe",
        "Biometric failure lock"
      ],
      "ans": 1,
      "exp": "Mobile Device Management (MDM) platforms allow administrators to enforce security policies on mobile devices, such as automatically wiping data after a specific number of failed login attempts to prevent brute-force attacks.",
      "domain": "Mobile Devices",
      "whyWrong": [
        "Geofencing triggers policy actions based on the device's physical GPS location, not the number of failed passcode attempts.",
        "",
        "A remote wipe is manually initiated over the network by an administrator when a device is reported lost or stolen, rather than triggering locally on the 10th bad PIN.",
        "Failed biometric attempts (fingerprint/face) simply fall back to requiring the device passcode; they do not factory-reset the phone."
      ]
    },
    {
      "q": "When handling a ticket for a VIP user, the technician realizes the requested software is not approved for company use. According to best practices in operational procedures, what should the technician do?",
      "opts": [
        "Install it anyway because it's a VIP",
        "Refuse the installation and close the ticket immediately",
        "Politely inform the user of the policy and suggest approved alternatives",
        "Tell the user to buy a personal laptop for the software"
      ],
      "ans": 2,
      "exp": "Professionalism requires enforcing company policy while providing excellent customer service. Explaining the policy respectfully and offering an approved workaround is the correct procedure.",
      "domain": "Operational Procedures",
      "whyWrong": [
        "Bypassing software approval policies for a VIP introduces unvetted security and licensing risks and violates change/security governance.",
        "Abruptly closing the ticket without explaining the policy or offering approved options is poor customer service that leaves the user's business need unresolved.",
        "",
        "Telling an employee to buy personal hardware to bypass corporate controls encourages Shadow IT and violates acceptable use standards."
      ]
    },
    {
      "q": "A help desk technician receives a call that a user's laptop can browse websites fine but cannot connect to the company VPN. Which port should the technician verify is not blocked by a firewall along the path, assuming an IPsec-based VPN?",
      "opts": [
        "Port 80",
        "Port 443 only",
        "UDP 500 / 4500 (IKE/NAT-T)",
        "Port 25"
      ],
      "ans": 2,
      "exp": "IPsec VPNs rely on IKE (UDP 500) and NAT-T (UDP 4500) for key exchange; blocking these prevents the tunnel from establishing even though general web traffic (80/443) works fine.",
      "domain": "Networking",
      "whyWrong": [
        "Port 80 is used for unencrypted HTTP web browsing, which is already working and is not used by IPsec VPN tunnels.",
        "Port 443 is used by HTTPS and SSL/TLS VPNs, whereas an IPsec VPN requires UDP ports 500 (IKE) and 4500 (NAT-T) to negotiate security associations.",
        "",
        "Port 25 is used by Simple Mail Transfer Protocol (SMTP) for routing email between mail servers, not IPsec VPN establishment."
      ]
    },
    {
      "q": "A technician is configuring a SOHO router and wants to give a specific internal server a consistent, predictable internal address for port forwarding. What should be configured?",
      "opts": [
        "DHCP reservation",
        "Dynamic DNS",
        "Subnetting",
        "NAT"
      ],
      "ans": 0,
      "exp": "A DHCP reservation ties a specific device's MAC address to a fixed IP within the DHCP scope, so port forwarding rules pointed at that IP never break when the lease renews.",
      "domain": "Networking",
      "whyWrong": [
        "",
        "Dynamic DNS (DDNS) maps a changing public WAN IP address to a hostname; it does not lock a local server's private LAN IP address.",
        "Subnetting divides a network into smaller IP ranges, which does not stop the DHCP server from assigning a different IP within the subnet when a lease expires.",
        "NAT translates between private LAN IPs and the router's public WAN IP, but it relies on the internal server keeping a fixed private IP via DHCP reservation or static assignment."
      ]
    },
    {
      "q": "A company wants to migrate its email hosting so it no longer manages any physical or virtual mail servers, and simply pays for user mailboxes. Which cloud model does this describe?",
      "opts": [
        "IaaS",
        "PaaS",
        "SaaS",
        "Private cloud"
      ],
      "ans": 2,
      "exp": "Consuming a finished application (hosted mailboxes) with zero infrastructure management is SaaS — the provider owns everything below the login screen.",
      "domain": "Virtualization and Cloud",
      "whyWrong": [
        "IaaS rents raw virtual machines and storage, meaning the company would still have to install, patch, and administer the mail server OS and software itself.",
        "PaaS provides a managed runtime for custom-built applications, whereas turnkey hosted email mailboxes are a finished SaaS product.",
        "",
        "A private cloud is single-tenant infrastructure dedicated to one organization, which still requires managing mail server infrastructure unless consumed as SaaS."
      ]
    },
    {
      "q": "Which characteristic of cloud computing means a customer is billed only for the exact compute and storage resources consumed, similar to a utility bill?",
      "opts": [
        "Resource pooling",
        "Measured service",
        "Rapid elasticity",
        "On-demand self-service"
      ],
      "ans": 1,
      "exp": "Measured service is the metering/billing characteristic — pay for what's actually used, not a flat fee.",
      "domain": "Virtualization and Cloud",
      "whyWrong": [
        "Resource pooling means the provider serves multiple customers from shared physical hardware, not how individual usage is metered and billed.",
        "",
        "Rapid elasticity is the automatic scaling of capacity out and in based on demand, whereas measured service is the metering that bills you only for what ran.",
        "On-demand self-service allows users to provision cloud resources immediately without human interaction from the provider, rather than describing pay-per-use metering."
      ]
    },
    {
      "q": "An employee reports that files on a shared drive are suddenly all encrypted with a .locked extension, and a text file demands payment for the decryption key. This is an example of:",
      "opts": [
        "A rootkit",
        "Ransomware",
        "A keylogger",
        "Spyware"
      ],
      "ans": 1,
      "exp": "Encrypting a victim's files and demanding payment for the decryption key is the defining behavior of ransomware.",
      "domain": "Security",
      "whyWrong": [
        "A rootkit hides malicious processes at the kernel or firmware level to evade detection; it does not encrypt user files and post a ransom note.",
        "",
        "A keylogger covertly records keystrokes to steal passwords and sensitive text without encrypting files or demanding extortion payments.",
        "Spyware silently monitors user activity and harvests data in the background, whereas ransomware overtly locks files and demands payment."
      ]
    },
    {
      "q": "A technician finds that antivirus software cannot detect or remove a persistent infection that appears to operate below the operating system level. This behavior is most consistent with a:",
      "opts": [
        "Virus",
        "Worm",
        "Rootkit",
        "Trojan"
      ],
      "ans": 2,
      "exp": "Rootkits specifically embed at the OS or firmware level to hide from security software running above them, which is why standard AV scans often can't detect or fully remove them.",
      "domain": "Security",
      "whyWrong": [
        "A standard virus attaches to user-space executable files or documents and does not hook the OS kernel or firmware to hide from antivirus tools.",
        "A worm self-replicates across network shares or vulnerabilities to spread rapidly, rather than embedding below the OS kernel to cloak itself.",
        "",
        "A Trojan disguises itself as a legitimate program to trick the user into running it, which does not by itself grant kernel-level stealth below the OS."
      ]
    },
    {
      "q": "Which mobile device security feature allows an organization to erase all data on a lost or stolen phone?",
      "opts": [
        "Screen lock",
        "Remote wipe",
        "Full-device encryption",
        "Biometric authentication"
      ],
      "ans": 1,
      "exp": "Remote wipe erases the device's data remotely once it's confirmed lost or stolen — a screen lock and encryption protect data at rest but don't erase it.",
      "domain": "Security",
      "whyWrong": [
        "A screen lock requires a PIN, pattern, or passcode to unlock the UI, but it does not erase the data stored on the lost device.",
        "",
        "Full-device encryption scrambles stored data so it cannot be read without the key, but the encrypted data remains on the phone rather than being erased.",
        "Biometric authentication verifies a fingerprint or face scan at login; it does not remotely purge data after a device is lost."
      ]
    },
    {
      "q": "A field technician is configuring an email client on a user's laptop to connect to the company's mail server over TLS encryption. The user must be able to both synchronize folders on the mail server across multiple devices and send outgoing messages. Which default TCP ports must be open through the local firewall for this configuration? (Choose TWO.)",
      "opts": [
        "TCP 993 (IMAPS)",
        "TCP 587 (SMTP with STARTTLS)",
        "TCP 110 (POP3)",
        "TCP 3389 (RDP)",
        "TCP 445 (SMB)"
      ],
      "ans": [
        0,
        1
      ],
      "domain": "Networking",
      "exp": "IMAPS (TCP port 993) keeps messages and folders synchronized on the mail server across multiple devices over implicit TLS, and authenticated SMTP submission (TCP port 587) handles sending outgoing email with TLS encryption.",
      "whyWrong": [
        "",
        "",
        "TCP port 110 is unencrypted POP3, which downloads mail to a single device rather than synchronizing server-side folders over TLS.",
        "TCP port 3389 is used by Windows Remote Desktop Protocol (RDP) for remote GUI sessions, not email delivery.",
        "TCP port 445 is used by Server Message Block (SMB) for Windows file and printer sharing, not email synchronization."
      ]
    },
    {
      "q": "A technician is hardening a Windows 11 Pro laptop for a traveling finance executive. The security policy requires that all data on the internal NVMe SSD remain unreadable if the drive is physically removed by a thief, and that an explicit administrator prompt appear whenever any process attempts to run with elevated privileges. Which built-in Windows features must the technician enable or verify? (Choose TWO.)",
      "opts": [
        "BitLocker",
        "User Account Control (UAC)",
        "Windows Defender Firewall",
        "System Restore",
        "Remote Desktop (RDP)"
      ],
      "ans": [
        0,
        1
      ],
      "domain": "Security",
      "exp": "BitLocker provides full-disk encryption (typically backed by the system's TPM) so a physically removed drive cannot be read without the decryption key. User Account Control (UAC) enforces a confirmation or credential prompt before any process is allowed to elevate to administrative privileges.",
      "whyWrong": [
        "",
        "",
        "Windows Defender Firewall filters inbound and outbound network traffic; it neither encrypts the SSD at rest nor prompts on local privilege elevation.",
        "System Restore saves snapshots of system files and registry settings for rollback, providing no disk encryption or privilege-elevation protection.",
        "Remote Desktop allows remote network logins over TCP 3389, which increases attack surface rather than encrypting the disk or gating privilege elevation."
      ]
    }
  ],
  "daily": [
    {
      "day": 1,
      "track": "aplus",
      "concept": "Troubleshooting Methodology — The 6-Step Checklist",
      "domain": "Hardware and Network Troubleshooting",
      "icon": "🛠️",
      "color": "#f59e0b",
      "tagline": "Diagnose before you dissect. Follow the six steps.",
      "slides": [
        {
          "title": "What Is the CompTIA Troubleshooting Methodology?",
          "body": "Randomly swapping parts or reinstalling Windows turns a five-minute fix into a three-hour outage. The <strong>CompTIA Troubleshooting Methodology</strong> is a structured six-step framework designed to isolate and resolve hardware and software failures systematically. Every help desk ticket starts by identifying the problem through user questioning and log inspection before you touch a single setting.",
          "anchor": "🧭 Never touch the hardware until you have questioned the user and checked for recent changes."
        },
        {
          "title": "The Six Steps and How the Exam Tests Them",
          "body": "Memorize the exact sequence: <strong>1. Identify the problem</strong>, <strong>2. Establish a theory of probable cause</strong> (start with the obvious), <strong>3. Test the theory</strong>, <strong>4. Establish a plan of action and implement the solution</strong>, <strong>5. Verify full system functionality and implement preventive measures</strong>, and <strong>6. Document findings, actions, and outcomes</strong>. If your theory fails during step 3, you return to step 2 to form a new theory or escalate. On the A+ exam, always pick the action that matches the <em>current</em> step in the scenario rather than jumping ahead to the final repair.",
          "anchor": "📋 Identify → Theory → Test → Plan & Fix → Verify → Document: never skip a step on the exam."
        },
        {
          "title": "Real-World: Mammoth Capital Help Desk",
          "body": "A quantitative analyst at Mammoth Capital reports that neither of her external monitors works after returning from lunch. Instead of ordering a replacement GPU, the help desk technician follows step 2 (question the obvious) and checks under the desk, discovering the cleaning crew bumped the docking station power brick loose. After reconnecting the adapter, the technician verifies both displays work at native resolution and documents the ticket in the knowledge base.",
          "anchor": "🔌 Occam's razor rules the help desk: check physical power and cables before blaming the motherboard."
        }
      ],
      "quiz": [
        {
          "q": "A technician suspects that a user's flickering monitor is caused by a damaged DisplayPort cable. After swapping in a known-good DisplayPort cable to test the theory, the monitor continues to flicker. According to the CompTIA troubleshooting methodology, what should the technician do NEXT?",
          "opts": [
            "Replace the workstation's graphics card immediately",
            "Establish a new theory of probable cause or escalate if necessary",
            "Document the failed cable swap and close the ticket",
            "Reinstall the operating system to rule out driver corruption"
          ],
          "ans": 1,
          "exp": "When testing a theory does not confirm the cause (Step 3), the technician must return to Step 2 to establish a new theory of probable cause or escalate the issue. Jumping straight to replacing the GPU or OS skips forming and testing a new theory."
        },
        {
          "q": "A user calls the help desk and reports that they cannot print to the third-floor accounting laser printer. What should the technician do FIRST?",
          "opts": [
            "Restart the print spooler service on the print server",
            "Replace the printer's maintenance kit and toner cartridge",
            "Reinstall the printer driver on the user's workstation",
            "Question the user about any error messages and check whether other users can print"
          ],
          "ans": 3,
          "exp": "Step 1 of the methodology is to identify the problem by questioning the user, identifying changes, and determining whether the issue affects one person or the entire floor before making any changes."
        },
        {
          "q": "A technician replaces a failed power supply inside a desktop PC, boots the system to the Windows login screen, and immediately leaves the user's desk. Twenty minutes later, the user calls back because their secondary storage drive is missing and the front USB ports do not work. Which troubleshooting step did the technician fail to complete?",
          "opts": [
            "Verify full system functionality and implement preventive measures",
            "Establish a theory of probable cause",
            "Identify the problem and inquire about environmental changes",
            "Perform a system backup before initiating repairs"
          ],
          "ans": 0,
          "exp": "Booting to the login screen only confirms the primary boot drive and PSU work. Step 5 requires verifying full system functionality — including secondary drives and peripherals — before considering the repair complete."
        },
        {
          "q": "After rolling back a buggy audio driver on an executive's laptop, a technician tests the speakers and microphone in a video call and confirms the issue is resolved. What is the technician's FINAL step?",
          "opts": [
            "Establish a plan of action for future driver updates",
            "Test the theory on a second laptop of the same model",
            "Document the findings, actions taken, and outcomes in the ticketing system",
            "Clone the hard drive to create a recovery image"
          ],
          "ans": 2,
          "exp": "Step 6 — documenting findings, actions, and outcomes — is always the final step of the CompTIA troubleshooting methodology so the team has a historical record in the knowledge base."
        },
        {
          "q": "A help desk technician tests a theory and confirms that a corrupt local profile is preventing a user from opening Microsoft Outlook. The technician now maps out the steps to back up the user's local files and rebuild the profile during the user's lunch break. Which step of the methodology is the technician performing?",
          "opts": [
            "Identify the problem",
            "Establish a plan of action to resolve the problem and implement the solution",
            "Test the theory to determine the cause",
            "Document findings, actions, and outcomes"
          ],
          "ans": 1,
          "exp": "Once the root cause is confirmed in Step 3, Step 4 is to establish a plan of action to resolve the problem and implement the solution."
        }
      ]
    },
    {
      "day": 2,
      "track": "aplus",
      "concept": "Operating Systems & Recovery — Windows, macOS & Linux",
      "domain": "Operating Systems",
      "icon": "🖥️",
      "color": "#f59e0b",
      "tagline": "Three OS families, one job: find what broke and fix it.",
      "slides": [
        {
          "title": "Cross-Platform OS Administration",
          "body": "CompTIA A+ Core 2 tests your ability to administer and troubleshoot <strong>Windows</strong>, <strong>macOS</strong>, and <strong>Linux</strong> side by side. While Windows relies heavily on graphical tools like Disk Management and Task Manager, Linux favors terminal utilities like <em>top</em>, <em>chmod</em>, and <em>chown</em>, and macOS bridges a UNIX foundation with utilities like Activity Monitor and Disk Utility. Across all three platforms, your first move during a slowdown is checking which process is consuming CPU, memory, or disk I/O.",
          "anchor": "🔍 Task Manager on Windows, Activity Monitor on macOS, and top on Linux all answer what is eating your resources."
        },
        {
          "title": "Crash Diagnostics and Built-In Recovery Tools",
          "body": "When an operating system fails to boot or crashes mid-session, the exam expects you to match the symptom to the native recovery tool. On Windows, a <strong>Blue Screen of Death (BSOD)</strong> points to a faulty driver or failing hardware, while <strong>Windows Recovery Environment (WinRE)</strong>, <strong>System Restore</strong>, <em>sfc /scannow</em>, and <em>chkdsk</em> repair corrupted boot records and system files. On macOS, <strong>Time Machine</strong> handles backups and Safe Mode isolates third-party extensions; on Linux, a live USB and <em>fsck</em> repair damaged file systems.",
          "anchor": "🚑 Match the recovery tool to the OS: WinRE and SFC for Windows, Time Machine for macOS, fsck for Linux."
        },
        {
          "title": "Real-World: Mammoth Capital Trading Floor",
          "body": "After a Tuesday morning GPU driver update, a trader's Windows 11 workstation at Mammoth Capital hits a BSOD stop code every time the multi-chart layout loads. The technician boots into <strong>Safe Mode</strong> via WinRE, uses <strong>Device Manager</strong> to roll back the display adapter driver to the previous stable version, and runs <em>sfc /scannow</em> to confirm no protected system files were corrupted during the crash. The workstation boots cleanly without losing a single local spreadsheet.",
          "anchor": "⏪ When a recent driver update causes a BSOD, boot into Safe Mode and roll back the driver before considering a wipe."
        }
      ],
      "quiz": [
        {
          "q": "A Linux administrator writes a shell script named backup.sh, but when a technician attempts to execute it, the terminal returns 'Permission denied.' Which command grants execute permissions on the file?",
          "opts": [
            "chmod +x backup.sh",
            "chown root backup.sh",
            "grep -x backup.sh",
            "ls -la backup.sh"
          ],
          "ans": 0,
          "exp": "The chmod (change mode) command modifies file access permissions in Linux, and +x adds the execute bit. The chown command changes file ownership rather than execute permissions."
        },
        {
          "q": "A technician physically installs a second internal NVMe SSD into a Windows 11 workstation. The drive is detected in UEFI/BIOS, but it does not appear as a drive letter in File Explorer. Which Windows utility should the technician use to initialize, partition, and format the new drive?",
          "opts": [
            "Device Manager",
            "Event Viewer",
            "Disk Management",
            "System Configuration (msconfig)"
          ],
          "ans": 2,
          "exp": "Disk Management (diskmgmt.msc) is used to initialize new storage drives, create partitions/volumes, format file systems, and assign drive letters."
        },
        {
          "q": "A graphic designer on macOS reports that their video editing application is completely unresponsive and showing a spinning beachball cursor, while Finder and other apps still respond. Which built-in macOS tool should the technician open to inspect CPU usage and force-quit the hung process?",
          "opts": [
            "Time Machine",
            "Keychain Access",
            "Disk Utility",
            "Activity Monitor"
          ],
          "ans": 3,
          "exp": "Activity Monitor is the macOS equivalent of Windows Task Manager, allowing technicians to view CPU, memory, and disk usage by process and force-quit unresponsive applications."
        },
        {
          "q": "After a sudden power outage at a branch office, a Windows workstation boots slowly and logs file system structure errors on the C: drive. Which command-line tool scans the disk for logical file system errors and bad sectors and attempts to repair them?",
          "opts": [
            "gpupdate /force",
            "chkdsk /r",
            "taskkill /f",
            "diskpart"
          ],
          "ans": 1,
          "exp": "Check Disk (chkdsk /r) scans the drive for logical file system errors and physical bad sectors, recovering readable information. Diskpart manages partitions and will not repair sector errors."
        },
        {
          "q": "A user complains that their Windows 11 laptop takes several minutes to finish loading after they sign in because numerous chat and updater apps launch automatically. Where should the technician go to disable unnecessary startup applications?",
          "opts": [
            "The Startup Apps section in Task Manager",
            "Windows Memory Diagnostic",
            "Performance Monitor",
            "Disk Cleanup"
          ],
          "ans": 0,
          "exp": "In Windows 10 and Windows 11, user startup applications and their startup impact are managed directly in the Startup Apps tab of Task Manager."
        }
      ]
    },
    {
      "day": 3,
      "track": "aplus",
      "concept": "PC Internals — Motherboards, RAM, Storage & Power",
      "domain": "Hardware",
      "icon": "🔌",
      "color": "#f59e0b",
      "tagline": "When the screen stays black, listen to the motherboard.",
      "slides": [
        {
          "title": "Core Internal Components",
          "body": "Every PC is built around the <strong>motherboard</strong>, which connects the CPU, RAM, storage drives, and expansion cards while drawing regulated DC power from the <strong>Power Supply Unit (PSU)</strong>. Memory modules like <strong>DDR4</strong> and <strong>DDR5</strong> are physically keyed with different notch positions so they cannot be forced into the wrong generation slot, while servers use <strong>ECC RAM</strong> to detect and correct single-bit memory errors on the fly. For storage, <strong>M.2 NVMe SSDs</strong> connect directly over high-speed PCIe lanes, leaving SATA SSDs and spinning HDDs far behind.",
          "anchor": "⚡ NVMe rides the PCIe highway; SATA takes the back road; DDR4 and DDR5 notches never mix."
        },
        {
          "title": "POST, CMOS, Displays, and PSU Sizing",
          "body": "When you press the power button, the motherboard runs the <strong>Power-On Self-Test (POST)</strong> before any operating system loads. If critical hardware like RAM or the GPU fails POST, the board emits <strong>beep codes</strong> or lights diagnostic LEDs, whereas losing the system clock and BIOS settings every time wall power is unplugged points to a dead <strong>CR2032 CMOS battery</strong>. On the exam, remember that <strong>OLED</strong> displays emit light per pixel with no backlight, <strong>LCD</strong> panels require an LED backlight, and PSUs should be sized with 20 to 30 percent wattage headroom above peak component draw.",
          "anchor": "🔊 No video + POST beeps = pre-OS hardware fault (check RAM or GPU, never Windows drivers)."
        },
        {
          "title": "Real-World: Workstation Upgrade Gone Silent",
          "body": "A technician at Mammoth Capital upgrades a quantitative developer's workstation from 32 GB to 64 GB of DDR5 RAM. Upon pressing the power button, the chassis fans spin up, the monitors remain completely black, and the motherboard speaker emits three short beeps. Recognizing a classic POST memory error, the technician powers down the PC, grounds himself, and firmly reseats the new DIMMs in the dual-channel slots until both retention clips click into place.",
          "anchor": "🔧 Three beeps and a black screen after a hardware swap almost always means unseated or faulty RAM."
        }
      ],
      "quiz": [
        {
          "q": "A user reports that whenever their desktop PC is unplugged from the wall outlet over the weekend, it displays a 'CMOS Checksum Error' on Monday morning and the system clock resets to midnight on January 1. What component needs to be replaced?",
          "opts": [
            "The M.2 NVMe boot drive",
            "The 24-pin ATX power supply cable",
            "The CR2032 CMOS battery on the motherboard",
            "The CPU thermal paste"
          ],
          "ans": 2,
          "exp": "The coin-cell CMOS battery (typically CR2032) supplies standby power to the Real-Time Clock (RTC) and CMOS settings when AC power is disconnected."
        },
        {
          "q": "A technician is installing two identical 16 GB DDR5 RAM modules into a motherboard that has four DIMM slots (A1, A2, B1, B2). How should the technician populate the slots to maximize memory performance?",
          "opts": [
            "Place both modules in Channel A (slots A1 and A2) so they sit next to each other",
            "Install the modules in the matched dual-channel pair (such as A2 and B2) specified in the motherboard manual",
            "Install only one 16 GB module to reduce memory controller latency",
            "Mix one DDR4 module and one DDR5 module across channels"
          ],
          "ans": 1,
          "exp": "Populating the matched slots across both memory channels enables dual-channel mode, doubling the communication bandwidth between the memory controller and RAM."
        },
        {
          "q": "A technician upgrades an office PC with a high-wattage discrete GPU for 3D modeling. The PC boots to the Windows desktop without issue, but suddenly powers off whenever the user starts a heavy 3D render. CPU and GPU temperatures remain below 65°C right before the crash. What is the MOST likely cause?",
          "opts": [
            "A failing CMOS battery",
            "An incompatible M.2 SATA drive",
            "Corrupted monitor EDID firmware",
            "An undersized Power Supply Unit (PSU) tripping under peak wattage load"
          ],
          "ans": 3,
          "exp": "When a GPU transitions from idle to full 3D load, its power draw spikes sharply. If the PSU lacks sufficient wattage capacity and headroom, over-power protection trips and shuts the system off immediately."
        },
        {
          "q": "A technician presses the power button on a desktop PC. The case fans spin, the monitor remains blank, and the motherboard emits a repeating series of three short beeps. Which of the following causes can the technician immediately rule out?",
          "opts": [
            "Corrupted Windows display drivers",
            "Improperly seated RAM modules",
            "Failed memory DIMMs",
            "Unseated graphics card"
          ],
          "ans": 0,
          "exp": "POST beep codes occur during hardware initialization before the operating system ever begins loading, which rules out any Windows software or driver issue."
        },
        {
          "q": "Which storage technology uses non-volatile flash memory in a compact gum-stick form factor and communicates directly over PCIe lanes for multi-gigabyte-per-second throughput?",
          "opts": [
            "3.5-inch 7200 RPM SATA HDD",
            "2.5-inch SATA III SSD",
            "M.2 NVMe SSD",
            "External USB 3.0 flash drive"
          ],
          "ans": 2,
          "exp": "M.2 NVMe SSDs attach directly to the PCIe bus rather than the legacy SATA controller, delivering vastly higher throughput and lower latency."
        }
      ]
    },
    {
      "day": 4,
      "track": "aplus",
      "concept": "Mobile Hardware & Hypervisors — Pocket to Bare Metal",
      "domain": "Mobile Devices",
      "icon": "📱",
      "color": "#f59e0b",
      "tagline": "ARM in your pocket, hypervisors in the rack.",
      "slides": [
        {
          "title": "Mobile Architecture and Wireless Connectivity",
          "body": "Modern smartphones and tablets run on power-efficient <strong>ARM processors</strong> with integrated system-on-chip (SoC) designs and rely on wireless protocols including 5G/LTE cellular, Wi-Fi, Bluetooth, and NFC. Enterprise IT teams manage company-owned and BYOD phones centrally using <strong>Mobile Device Management (MDM)</strong> to enforce passcodes, push VPN profiles, and quarantine or wipe compromised devices. On the hardware side, a physically <strong>swollen lithium-ion battery</strong> pushing against the screen or chassis is an immediate fire hazard that must never be charged or punctured.",
          "anchor": "🔋 Swollen battery = immediate fire hazard: power the device down and isolate it in a fire-safe container."
        },
        {
          "title": "Type 1 vs. Type 2 Hypervisors",
          "body": "Virtualization abstracts physical CPU, RAM, and storage so multiple virtual machines (VMs) can run on a single host using a <strong>hypervisor</strong>. A <strong>Type 1 (bare-metal)</strong> hypervisor — such as VMware ESXi, Microsoft Hyper-V Server, or Proxmox VE — installs directly onto the physical server hardware with no underlying host OS. A <strong>Type 2 (hosted)</strong> hypervisor — such as Oracle VirtualBox, VMware Workstation, or Parallels — runs as a regular application inside an existing desktop OS like Windows or macOS.",
          "anchor": "🏗️ Type 1 runs directly on bare metal (data center); Type 2 runs inside a host OS (desktop sandbox)."
        },
        {
          "title": "Real-World: Lab Consolidation at Mammoth Capital",
          "body": "Mammoth Capital's QA engineers were keeping four aging desktop towers under their desks just to test trading client builds on different Windows and Linux versions. The infrastructure team replaces the four towers with a single rack server running a <strong>Type 1 bare-metal hypervisor</strong> and allocates dedicated CPU cores and ECC RAM to each guest VM. Before any VM starts, the technician enables <strong>hardware virtualization extensions</strong> (Intel VT-x / AMD-V) in the server's UEFI/BIOS.",
          "anchor": "⚙️ If a 64-bit VM refuses to launch, check that Intel VT-x or AMD-V is enabled in UEFI/BIOS."
        }
      ],
      "quiz": [
        {
          "q": "A technician installs Oracle VirtualBox on a newly built Windows 11 workstation and attempts to boot a 64-bit Ubuntu virtual machine, but the hypervisor throws an error stating hardware virtualization is unavailable. Where should the technician resolve this?",
          "opts": [
            "In Windows Disk Management by converting the disk to GPT",
            "In the Windows Firewall advanced inbound rules",
            "By upgrading the workstation's power supply unit",
            "In the motherboard UEFI/BIOS settings by enabling Intel VT-x or AMD-V"
          ],
          "ans": 3,
          "exp": "Running 64-bit guest virtual machines requires CPU hardware virtualization extensions (Intel VT-x or AMD-V/SVM) to be enabled in the host's UEFI/BIOS firmware."
        },
        {
          "q": "An infrastructure engineer installs VMware ESXi directly onto a bare-metal rack server with no underlying host operating system. How is this hypervisor classified?",
          "opts": [
            "Type 1 (bare-metal) hypervisor",
            "Type 2 (hosted) hypervisor",
            "Container runtime engine",
            "Application sandbox"
          ],
          "ans": 0,
          "exp": "A Type 1 hypervisor runs directly on the physical server hardware without a host operating system, providing near-native performance for enterprise workloads."
        },
        {
          "q": "An employee brings a company smartphone to the help desk because the display glass is bulging outward and separating from the metal frame. What should the technician do FIRST?",
          "opts": [
            "Clamp the screen back down with adhesive tape and run a battery calibration cycle",
            "Power off the phone immediately, do not charge it, and place it in a fire-safe container",
            "Puncture the battery wrapper carefully inside a fume hood to release trapped gas",
            "Connect the phone to a computer via USB to update the battery management firmware"
          ],
          "ans": 1,
          "exp": "A bulging screen indicates a swollen lithium-ion battery, which poses a severe thermal runaway and fire risk. The device must be powered down immediately, unplugged, and isolated in a fire-safe container."
        },
        {
          "q": "A financial firm allows employees to access corporate email on their personal phones (BYOD) but requires corporate data to reside in an encrypted workspace that IT can selectively wipe if an employee leaves the company. What platform enables this?",
          "opts": [
            "BIOS supervisor password",
            "Local Administrator Password Solution (LAPS)",
            "Mobile Device Management (MDM) with containerization",
            "Port forwarding on the SOHO router"
          ],
          "ans": 2,
          "exp": "MDM platforms enforce security policies on mobile devices and use containerization (partitioning) on BYOD devices so corporate apps and data can be managed or remotely wiped without erasing the user's personal photos."
        },
        {
          "q": "A user pairs a standard wireless Bluetooth headset with their laptop at their desk, but the audio stutters and disconnects whenever they walk down the hall to the break room 15 meters (50 feet) away. What is the MOST likely reason?",
          "opts": [
            "Bluetooth requires a line-of-sight infrared beam to maintain a connection",
            "Standard Class 2 Bluetooth devices have a maximum operating range of roughly 10 meters (33 feet)",
            "The user's laptop is missing an NFC controller chip",
            "Bluetooth only operates on the 6 GHz wireless frequency band"
          ],
          "ans": 1,
          "exp": "Most consumer Bluetooth headsets and laptops use Class 2 radios, which are designed for short-range Personal Area Networks (PANs) up to about 10 meters (33 feet), especially through office walls."
        }
      ]
    },
    {
      "day": 5,
      "track": "aplus",
      "concept": "Safety, Change Control & Professionalism — IT Ops Rules",
      "domain": "Operational Procedures",
      "icon": "🦺",
      "color": "#f59e0b",
      "tagline": "Ground your wrist, back up your work, keep your cool.",
      "slides": [
        {
          "title": "ESD Protection and Physical Safety",
          "body": "An <strong>Electrostatic Discharge (ESD)</strong> as small as 30 volts — far below the ~3,000 volts required for a human to feel a shock — can permanently damage or cause latent failure in a CPU or RAM module. Before touching internal components, disconnect AC power, press the power button to drain residual capacitor charge, and clip an <strong>ESD wrist strap</strong> to unpainted chassis metal. For chemical hazards such as laser printer toner or cleaning solvents, always consult the <strong>Safety Data Sheet (SDS)</strong> for proper handling and disposal rules.",
          "anchor": "⚡ You can't feel a 30-volt static zap, but a microchip dies from it — wear the ESD strap every time."
        },
        {
          "title": "Change Management and Customer Communication",
          "body": "In enterprise IT, unauthorized production tweaks cause more outages than hardware failures. Formal <strong>Change Management</strong> requires a documented request, risk assessment, a defined maintenance window, and a tested <strong>rollback plan</strong> before any production change goes live. When dealing with frustrated or angry users on the help desk, CompTIA's rule is consistent: practice <strong>active listening</strong>, avoid arguing or blaming the user, respect confidential data on their screen, and explain policies politely.",
          "anchor": "🔄 No change goes to production without an approved window and a tested rollback plan."
        },
        {
          "title": "Real-World: The Friday Afternoon Firmware Patch",
          "body": "A junior technician at Mammoth Capital notices a firmware update for the office print server at 4:30 PM on tax-filing Friday and wants to install it immediately. The senior engineer stops him and points to the <strong>Change Advisory Board (CAB)</strong> policy: all non-emergency updates require a scheduled weekend maintenance window, stakeholder notification, and a full VM snapshot for rollback. Following change control saves the floor from an unscheduled printing outage during peak deadline hours.",
          "anchor": "🛑 Never push a non-emergency update during peak business hours without change approval and a backup."
        }
      ],
      "quiz": [
        {
          "q": "A technician is preparing to replace a faulty RAM stick inside a desktop computer in a dry, carpeted office. What is the BEST procedure to prevent Electrostatic Discharge (ESD) damage?",
          "opts": [
            "Leave the AC power cord plugged in and wear latex gloves while handling the RAM",
            "Unplug the AC power cord, place the PC on an anti-static mat, and attach an ESD wrist strap to unpainted metal on the chassis",
            "Rub the RAM contacts with isopropyl alcohol immediately before inserting the module",
            "Hold the RAM module across the gold contact pins to equalize electrical charge"
          ],
          "ans": 1,
          "exp": "Unplugging AC power and clipping an ESD wrist strap to bare chassis metal equalizes electrical potential between the technician and the computer, preventing static discharge."
        },
        {
          "q": "A system administrator submits a change request to upgrade the database driver on a critical trading server. Before the Change Advisory Board (CAB) approves the request, which element is MOST important to include in case the new driver fails during deployment?",
          "opts": [
            "A documented rollback (backout) plan to restore the previous working state",
            "A list of all employees hired in the past year",
            "A quote for replacing the office uninterruptible power supplies",
            "An Acceptable Use Policy (AUP) signed by the vendor"
          ],
          "ans": 0,
          "exp": "Every formal change request requires a tested rollback or backout plan so the team can rapidly revert to the known-good configuration if the change causes unexpected failures."
        },
        {
          "q": "While replacing a waste toner bottle on a floor-standing laser printer, a technician accidentally drops the container and spills fine toner powder across the carpet. How should the technician handle the cleanup?",
          "opts": [
            "Sweep it up with a dry broom and wash the rest down the breakroom sink with hot water",
            "Use a standard office upright vacuum cleaner to suck up the powder quickly",
            "Consult the Safety Data Sheet (SDS) and use a specialized toner vacuum with fine HEPA filtration",
            "Spray compressed air across the carpet to disperse the toner particles"
          ],
          "ans": 2,
          "exp": "The SDS provides safe cleanup instructions for hazardous materials like toner. A standard vacuum must never be used because fine toner particles pass through standard bags, melt from motor heat, and can create a static dust explosion hazard."
        },
        {
          "q": "While sitting at an HR manager's desk to troubleshoot a USB headset, a technician notices a confidential layoff list open on the second monitor. What should the technician do?",
          "opts": [
            "Take a photo of the screen to document the user's desktop environment in the ticket",
            "Warn coworkers on the help desk team about the upcoming layoffs",
            "Read the document carefully to verify whether the IT department is affected",
            "Politely ask the HR manager to minimize or close the document, complete the repair, and keep anything seen strictly confidential"
          ],
          "ans": 3,
          "exp": "Professionalism and privacy standards require technicians to avoid viewing sensitive user data, ask the user to secure confidential screens when possible, and never disclose sensitive information."
        },
        {
          "q": "A trader calls the help desk frustrated and speaking loudly because his workstation rebooted for an update five minutes before a client call. What is the BEST way for the technician to handle the conversation?",
          "opts": [
            "Listen actively without interrupting, express empathy for the disruption, and focus immediately on getting him connected for his call",
            "Interrupt the user to explain that he ignored three reboot reminder pop-ups earlier in the week",
            "Place the user on hold without warning until he calms down",
            "Tell the user that Windows updates are mandatory and hang up"
          ],
          "ans": 0,
          "exp": "Active listening, empathy, and avoiding a defensive or judgmental tone de-escalate frustrated users and allow the technician to solve the immediate problem."
        }
      ]
    },
    {
      "day": 6,
      "track": "aplus",
      "concept": "Ports, IP Addressing & Cabling — Field Tech Networking",
      "domain": "Networking",
      "icon": "🌐",
      "color": "#f59e0b",
      "tagline": "Know your ports by heart and your cables by distance.",
      "slides": [
        {
          "title": "Essential Ports and Protocols",
          "body": "Every network service listens on a standardized port number that CompTIA tests relentlessly through troubleshooting scenarios. Memorize the heavy hitters: <strong>21</strong> (FTP), <strong>22</strong> (SSH/SFTP), <strong>23</strong> (Telnet — unencrypted, avoid), <strong>25</strong> (SMTP), <strong>53</strong> (DNS), <strong>67/68</strong> (DHCP), <strong>80</strong> (HTTP), <strong>110</strong> (POP3), <strong>143</strong> (IMAP), <strong>443</strong> (HTTPS), <strong>445</strong> (SMB Windows file sharing), and <strong>3389</strong> (RDP). When one specific task fails — like mapping a Windows shared drive while web browsing works fine — check the port for that protocol first (port 445 for SMB).",
          "anchor": "🚪 IP addresses get you to the building; port numbers get you to the right service's door."
        },
        {
          "title": "IPv4 Addressing, DHCP, and Cabling Standards",
          "body": "Private IPv4 ranges (<strong>10.0.0.0/8</strong>, <strong>172.16.0.0/12</strong>, and <strong>192.168.0.0/16</strong>) are used inside LANs and translated to a public IP via <strong>NAT</strong> at the router, while a <strong>169.254.x.x (APIPA)</strong> address means a Windows client could not reach a DHCP server. For copper cabling, <strong>Cat5e</strong> supports 1 Gbps up to 100 meters, <strong>Cat6</strong> supports 10 Gbps up to 55 meters, and <strong>Cat6a</strong> maintains 10 Gbps across the full 100-meter maximum run. On Wi-Fi, <strong>802.11ac (Wi-Fi 5)</strong> runs on 5 GHz, while <strong>802.11ax (Wi-Fi 6E)</strong> expands into the low-interference 6 GHz band.",
          "anchor": "📏 Need 10 Gbps at the full 100-meter copper limit? Only Cat6a or higher holds the speed."
        },
        {
          "title": "Real-World: The Unreachable Trading NAS",
          "body": "An analyst at Mammoth Capital reports he can browse HTTPS websites (port 443) and ping the internal NAS at 10.10.20.50, but mapping the Windows network share <em>\\\\10.10.20.50\\research</em> fails with a connection timeout. The field tech recognizes that Windows file sharing relies on <strong>SMB over TCP port 445</strong>, not HTTP or ICMP. A quick check of the host firewall reveals a recent hardening script blocked outbound port 445 on the analyst's VLAN, and adding an exception restores drive access immediately.",
          "anchor": "📁 Can ping the file server but can't map the Windows share? Check TCP port 445 (SMB)."
        }
      ],
      "quiz": [
        {
          "q": "A remote support technician can ping a Windows Server in the branch office by IP address, but attempts to connect using Microsoft Remote Desktop (RDP) time out immediately. Which port is most likely blocked on the branch firewall?",
          "opts": [
            "TCP port 22",
            "TCP port 445",
            "TCP port 3389",
            "UDP port 53"
          ],
          "ans": 2,
          "exp": "Remote Desktop Protocol (RDP) listens on TCP/UDP port 3389. Port 22 is SSH, port 445 is SMB file sharing, and port 53 is DNS."
        },
        {
          "q": "A user plugs their laptop into a conference room Ethernet jack and complains they cannot reach the internet or any internal servers. Running ipconfig shows an IPv4 address of 169.254.42.19. What is the cause of this address?",
          "opts": [
            "The DNS server returned an invalid public IP address",
            "The laptop is connected to an IPv6-only network",
            "The default gateway is blocking TCP port 443",
            "The laptop could not reach a DHCP server and self-assigned an APIPA address"
          ],
          "ans": 3,
          "exp": "Any address in the 169.254.0.0/16 block is an Automatic Private IP Addressing (APIPA) address, assigned by the OS when DHCP discovery fails."
        },
        {
          "q": "A technician is running twisted-pair Ethernet cables above a drop ceiling that is used as an air-return duct (plenum space) for the building's HVAC system. Which type of cable jacket MUST be used to comply with fire safety codes?",
          "opts": [
            "Plenum-rated (CMP) cable",
            "PVC (Polyvinyl Chloride) riser cable",
            "Unshielded Cat3 phone wire",
            "Standard patch cord with a vinyl jacket"
          ],
          "ans": 0,
          "exp": "Plenum-rated (CMP) cable has a low-smoke, fire-retardant jacket required in HVAC air-handling spaces so toxic fumes are not circulated through the building during a fire."
        },
        {
          "q": "Which wireless networking standard introduced support for the 6 GHz frequency spectrum in addition to the 2.4 GHz and 5 GHz bands?",
          "opts": [
            "802.11n (Wi-Fi 4)",
            "802.11ax (Wi-Fi 6E)",
            "802.11ac (Wi-Fi 5)",
            "802.11g"
          ],
          "ans": 1,
          "exp": "Wi-Fi 6E extends the IEEE 802.11ax standard into the 6 GHz band, providing wider channels and minimal interference from legacy devices."
        },
        {
          "q": "An executive wants her incoming email folders and read/unread message states to stay synchronized across her iPhone, iPad, and Windows desktop over an encrypted connection. Which protocol and port should the technician configure for incoming mail?",
          "opts": [
            "POP3 on TCP port 110",
            "SMTP on TCP port 25",
            "FTP on TCP port 21",
            "IMAPS on TCP port 993"
          ],
          "ans": 3,
          "exp": "IMAP synchronizes messages and folders across multiple client devices (unlike POP3, which downloads and typically removes messages), and IMAPS secures that traffic over TCP port 993."
        }
      ]
    },
    {
      "day": 7,
      "track": "aplus",
      "concept": "Cloud Models & Traits — IaaS, PaaS, SaaS & Client VMs",
      "domain": "Virtualization and Cloud",
      "icon": "☁️",
      "color": "#f59e0b",
      "tagline": "Rent the hardware, the runtime, or the finished app.",
      "slides": [
        {
          "title": "The Five NIST Characteristics of Cloud",
          "body": "CompTIA defines true cloud computing using five core traits: <strong>On-demand self-service</strong> (provision resources instantly without human approval), <strong>Broad network access</strong> (reach services from any standard device over the network), <strong>Resource pooling</strong> (multi-tenant hardware shared dynamically across customers), <strong>Rapid elasticity</strong> (scale capacity out and in automatically with load), and <strong>Measured service</strong> (metered pay-as-you-go billing). On the exam, you will be given a business scenario and asked which of these five characteristics is being demonstrated.",
          "anchor": "☁️ Self-service, broad access, resource pooling, rapid elasticity, measured service — the 5 cloud pillars."
        },
        {
          "title": "IaaS vs. PaaS vs. SaaS and Client Sandboxes",
          "body": "The three cloud service models divide responsibility at different layers: <strong>IaaS (Infrastructure as a Service)</strong> rents virtualized servers, storage, and networking while you manage the OS and apps; <strong>PaaS (Platform as a Service)</strong> provides a managed runtime where developers push code without patching OSes; and <strong>SaaS (Software as a Service)</strong> delivers a complete turn-key application in a browser. Locally, technicians use <strong>client-side virtualization</strong> with snapshots to safely test suspicious installers or run legacy 32-bit apps in an isolated VM.",
          "anchor": "🍽️ IaaS = rent the kitchen; PaaS = meal kit + chef's counter; SaaS = order off the menu."
        },
        {
          "title": "Real-World: VDI Rollout at Mammoth Capital",
          "body": "Mammoth Capital hires 30 seasonal compliance auditors who need secure access to internal Windows financial tools from thin clients without storing any company data locally. Instead of buying 30 high-end laptops, IT deploys <strong>Virtual Desktop Infrastructure (VDI)</strong> hosted in a hybrid cloud environment. Each auditor logs into a centralized virtual desktop session where compute, storage, and patching are controlled entirely in the data center, and when the audit ends, the instances are decommissioned in minutes.",
          "anchor": "🖥️ VDI keeps sensitive data in the data center while letting thin clients run heavy desktop apps."
        }
      ],
      "quiz": [
        {
          "q": "A small accounting firm replaces its locally installed payroll software with a subscription-based web application accessed through a browser, where the vendor handles all servers, databases, and software updates. Which cloud service model is this?",
          "opts": [
            "Software as a Service (SaaS)",
            "Infrastructure as a Service (IaaS)",
            "Platform as a Service (PaaS)",
            "Bare-metal colocation"
          ],
          "ans": 0,
          "exp": "SaaS delivers a complete, ready-to-use application over the internet with the provider managing all underlying infrastructure, operating systems, and application patches."
        },
        {
          "q": "A cloud provider hosts virtual machines from dozens of unrelated customer organizations on the same physical server cluster, dynamically allocating CPU and RAM while keeping each customer's environment logically isolated. Which cloud computing characteristic does this describe?",
          "opts": [
            "Measured service",
            "On-demand self-service",
            "Broad network access",
            "Resource pooling"
          ],
          "ans": 3,
          "exp": "Resource pooling (multi-tenancy) means multiple customers share the same underlying physical hardware pool, with resources dynamically assigned and isolated by the hypervisor."
        },
        {
          "q": "A system administrator provisions virtual machines, virtual networks, and raw block storage volumes in the cloud, then installs Ubuntu Linux, configures iptables firewall rules, and manages database patches manually. Which service model is the administrator using?",
          "opts": [
            "SaaS",
            "IaaS",
            "PaaS",
            "FaaS"
          ],
          "ans": 1,
          "exp": "IaaS rents the raw virtualized infrastructure (compute, storage, networking) while leaving operating system installation, patching, and software management to the customer."
        },
        {
          "q": "A help desk technician is about to test a questionable driver package inside a client-side virtual machine and wants to be able to revert the VM to its exact clean state in seconds if the driver causes a crash. What should the technician do BEFORE installing the driver?",
          "opts": [
            "Convert the host machine's hard drive from MBR to GPT",
            "Enable bridged networking on the virtual NIC",
            "Take a VM snapshot (checkpoint) in the hypervisor",
            "Increase the VM's video memory allocation to maximum"
          ],
          "ans": 2,
          "exp": "A VM snapshot captures the exact disk, memory, and configuration state of a virtual machine at a point in time, allowing one-click rollback if a test goes wrong."
        },
        {
          "q": "A hospital keeps patient electronic health records on a private on-premises data center for regulatory compliance, while using a public cloud provider to run its public website and seasonal vaccination scheduling portal. What type of cloud deployment model is this?",
          "opts": [
            "Hybrid cloud",
            "Community cloud",
            "Public-only cloud",
            "Client-side sandbox"
          ],
          "ans": 0,
          "exp": "A hybrid cloud combines private (on-premises) infrastructure with public cloud services, allowing organizations to keep sensitive data in-house while leveraging public cloud elasticity."
        }
      ]
    },
    {
      "day": 8,
      "track": "aplus",
      "concept": "Malware, Social Engineering & Hardening — Core 2 Security",
      "domain": "Security",
      "icon": "🔐",
      "color": "#f59e0b",
      "tagline": "Patch the OS, encrypt the disk, and watch the door.",
      "slides": [
        {
          "title": "Malware Taxonomy and the 7-Step Removal Process",
          "body": "CompTIA tests your ability to distinguish malware by behavior: a <strong>worm</strong> self-replicates across networks without user interaction, a <strong>virus</strong> requires a host file to be executed, a <strong>Trojan</strong> disguises itself as legitimate software, <strong>ransomware</strong> encrypts files for extortion, and a <strong>rootkit</strong> hides deep in the OS kernel or firmware. When removing malware, follow the official CompTIA sequence: <strong>1. Investigate and verify symptoms</strong>, <strong>2. Quarantine the infected system</strong> (disconnect from the network), <strong>3. Disable System Restore</strong> in Windows (so malware cannot hide in restore points), <strong>4. Remediate</strong> (update AV and scan in Safe Mode), <strong>5. Schedule scans and updates</strong>, <strong>6. Re-enable System Restore and create a new restore point</strong>, and <strong>7. Educate the end user</strong>.",
          "anchor": "🦠 Quarantine first, disable System Restore before scanning, and educate the user last."
        },
        {
          "title": "Social Engineering and Endpoint/SOHO Hardening",
          "body": "Attackers frequently bypass technical controls through social engineering: <strong>phishing</strong> casts a wide email net, <strong>spear phishing</strong> targets a specific person or role, <strong>whaling</strong> targets executives, and <strong>tailgating</strong> follows an employee through a badge-locked door. To harden endpoints and SOHO routers, enable <strong>BitLocker</strong> full-disk encryption, keep <strong>User Account Control (UAC)</strong> enabled to block silent privilege escalation, change default router admin passwords, disable <strong>WPS</strong>, and use <strong>WPA3</strong> encryption. Remember the exam trap: hiding the SSID or filtering MAC addresses is never a substitute for strong WPA3/WPA2 encryption.",
          "anchor": "🛡️ WPA3 and disabling WPS actually secure Wi-Fi; hiding the SSID only fools casual bystanders."
        },
        {
          "title": "Real-World: Contained Infection at Mammoth Capital",
          "body": "An intern at Mammoth Capital opens an invoice attachment from a spear-phishing email and notices command prompt windows flashing rapidly on her workstation. The help desk technician immediately unplugs the workstation's Ethernet cable and disables Wi-Fi to <strong>quarantine</strong> the host before a worm or ransomware payload can traverse the LAN. After disabling old System Restore points, cleaning the system from a pre-installation environment, creating a fresh restore point, and walking the intern through phishing red flags, the workstation returns to service safely.",
          "anchor": "🔌 Step 2 of malware response is always quarantine: pull the network cable before the infection spreads."
        }
      ],
      "quiz": [
        {
          "q": "A technician investigates a user's workstation and confirms symptoms of an active malware infection. According to the CompTIA malware removal process, what should the technician do NEXT?",
          "opts": [
            "Create a new Windows System Restore point immediately",
            "Quarantine the infected system by disconnecting it from wired and wireless networks",
            "Conduct an end-user security awareness training session",
            "Delete the user's documents folder to save time"
          ],
          "ans": 1,
          "exp": "Step 2 of the CompTIA malware removal process — immediately after investigating and verifying symptoms — is to quarantine the infected host by disconnecting it from all networks so the malware cannot spread or contact a command-and-control server."
        },
        {
          "q": "Why does the CompTIA malware removal procedure require disabling System Restore in Windows BEFORE remediating the infection and then re-enabling it afterward?",
          "opts": [
            "System Restore prevents the computer from booting into Safe Mode",
            "Disabling System Restore automatically updates Windows Defender definitions",
            "Malware often backs itself up inside protected restore points and could reinfect the system if an old restore point is used",
            "System Restore encrypts the drive with BitLocker during antivirus scans"
          ],
          "ans": 2,
          "exp": "Disabling System Restore purges existing restore points where malware copies may be hiding, preventing reinfection after the main drive is cleaned."
        },
        {
          "q": "An attacker crafts a highly personalized email addressed to Mammoth Capital's Chief Executive Officer, spoofing the firm's tax partner and requesting an urgent signature and wire transfer for an acquisition. How is this social engineering attack specifically classified?",
          "opts": [
            "Whaling",
            "Tailgating",
            "Shoulder surfing",
            "Dumpster diving"
          ],
          "ans": 0,
          "exp": "Whaling is a targeted spear-phishing attack aimed specifically at C-level executives or senior leadership ('big fish')."
        },
        {
          "q": "A traveling sales director has her Windows 11 laptop stolen from a hotel lobby. Which security feature ensures that even if the thief removes the NVMe SSD and connects it to another computer as an external drive, the files remain completely unreadable?",
          "opts": [
            "Windows Firewall inbound rules",
            "User Account Control (UAC)",
            "A BIOS boot order password",
            "BitLocker full-disk encryption with TPM"
          ],
          "ans": 3,
          "exp": "BitLocker encrypts the entire storage volume at rest using keys sealed in the Trusted Platform Module (TPM), preventing offline data extraction if the physical drive is removed."
        },
        {
          "q": "While hardening a new SOHO wireless router for an executive's home office, a technician changes the default admin password and enables WPA3 Personal encryption. Which router feature should the technician DISABLE to prevent an attacker from brute-forcing an 8-digit PIN to obtain the Wi-Fi passphrase?",
          "opts": [
            "DHCP server",
            "Wi-Fi Protected Setup (WPS)",
            "NAT (Network Address Translation)",
            "Stateful Packet Inspection (SPI)"
          ],
          "ans": 1,
          "exp": "Wi-Fi Protected Setup (WPS) uses an 8-digit PIN that is vulnerable to offline brute-force attacks in a matter of hours, allowing attackers to bypass strong WPA2/WPA3 passphrases."
        }
      ]
    }
  ],
  "arch": [
    {
      "title": "Level 8: The Workstation Rebuild",
      "desc": "A VIP's workstation is catastrophically failing. It takes 10 minutes to boot, crashes when opening large files, and overheats. Replace the bottleneck components to build a high-performance, stable machine.",
      "zones": [
        {
          "id": "storage",
          "name": "Storage Subsystem",
          "accepts": [
            "nvme"
          ]
        },
        {
          "id": "memory",
          "name": "Memory & Logic",
          "accepts": [
            "ecc",
            "dualchan"
          ]
        },
        {
          "id": "cooling",
          "name": "Thermal Management",
          "accepts": [
            "liquid",
            "paste"
          ]
        }
      ],
      "palette": [
        {
          "id": "nvme",
          "label": "M.2 NVMe SSD",
          "type": "resource"
        },
        {
          "id": "hdd",
          "label": "7200 RPM SATA HDD",
          "type": "resource"
        },
        {
          "id": "ecc",
          "label": "ECC DDR5 RAM",
          "type": "resource"
        },
        {
          "id": "dualchan",
          "label": "Populate Dual Channels",
          "type": "policy"
        },
        {
          "id": "liquid",
          "label": "AIO Liquid Cooler",
          "type": "resource"
        },
        {
          "id": "paste",
          "label": "Reapply Thermal Paste",
          "type": "policy"
        }
      ],
      "dm": {
        "storage": [
          "nvme"
        ],
        "memory": [
          "ecc",
          "dualchan"
        ],
        "cooling": [
          "liquid",
          "paste"
        ]
      },
      "wm": "Spot on. The NVMe SSD eliminates the boot bottleneck. ECC RAM prevents data corruption crashes, and populating dual channels doubles bandwidth. Reapplying paste and adding an AIO cooler solves the thermal throttling."
    }
  ],
  "sales": []
};
