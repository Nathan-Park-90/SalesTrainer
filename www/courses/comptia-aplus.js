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
      "Operational Procedures": "Operational Procedures"
    },
    "version": "1.0.0",
    "category": "CompTIA"
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
      "domain": "Hardware and Network Troubleshooting"
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
      "domain": "Hardware and Network Troubleshooting"
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
      "domain": "Mobile Devices"
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
      "domain": "Hardware"
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
      "domain": "Operating Systems"
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
      "domain": "Software Troubleshooting"
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
      "domain": "Operational Procedures"
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
      "domain": "Hardware and Network Troubleshooting"
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
      "domain": "Operating Systems"
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
      "domain": "Hardware"
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
      "domain": "Mobile Devices"
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
      "domain": "Operational Procedures"
    }
  ],
  "daily": [
    {
      "track": "aplus",
      "day": 2,
      "concept": "A+ Review - Day 2",
      "domain": "A+",
      "icon": "💻",
      "color": "#f59e0b",
      "tagline": "CompTIA A+ Core Principles",
      "slides": [
        "Welcome to the CompTIA Daily Sprint.",
        "Today we are reviewing core concepts for A+.",
        "Review your flashcards, check the library modules, and prepare for the mini-quiz."
      ],
      "quiz": [
        {
          "q": "Are you ready to crush the A+ exam?",
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
      "track": "aplus",
      "day": 6,
      "concept": "A+ Review - Day 6",
      "domain": "A+",
      "icon": "💻",
      "color": "#f59e0b",
      "tagline": "CompTIA A+ Core Principles",
      "slides": [
        "Welcome to the CompTIA Daily Sprint.",
        "Today we are reviewing core concepts for A+.",
        "Review your flashcards, check the library modules, and prepare for the mini-quiz."
      ],
      "quiz": [
        {
          "q": "Are you ready to crush the A+ exam?",
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
      "track": "aplus",
      "day": 10,
      "concept": "A+ Review - Day 10",
      "domain": "A+",
      "icon": "💻",
      "color": "#f59e0b",
      "tagline": "CompTIA A+ Core Principles",
      "slides": [
        "Welcome to the CompTIA Daily Sprint.",
        "Today we are reviewing core concepts for A+.",
        "Review your flashcards, check the library modules, and prepare for the mini-quiz."
      ],
      "quiz": [
        {
          "q": "Are you ready to crush the A+ exam?",
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
      "track": "aplus",
      "day": 14,
      "concept": "A+ Review - Day 14",
      "domain": "A+",
      "icon": "💻",
      "color": "#f59e0b",
      "tagline": "CompTIA A+ Core Principles",
      "slides": [
        "Welcome to the CompTIA Daily Sprint.",
        "Today we are reviewing core concepts for A+.",
        "Review your flashcards, check the library modules, and prepare for the mini-quiz."
      ],
      "quiz": [
        {
          "q": "Are you ready to crush the A+ exam?",
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
