/* Mammoth Academy — Course Pack */
/* Auto-loaded by course-loader.js */

var COURSE_COMPTIA_NETWORKPLUS = {
  "meta": {
    "id": "comptia-networkplus",
    "name": "CompTIA Network+",
    "subtitle": "N10-009",
    "icon": "🌐",
    "color": "#3b82f6",
    "examKey": "networkplus",
    "flashcardCat": "CompTIA Network+",
    "dailyTrackKey": "networkplus",
    "domains": {
      "Networking Concepts": "The OSI Model: Not Just Theory",
      "Network Implementation": "Network Implementations: Routing & Switching",
      "Network Operations": "Network Operations & Documentation",
      "Network Security": "Network Security & Hardening",
      "Network Troubleshooting": "Network Troubleshooting: Command Line Tools"
    },
    "version": "1.0.0",
    "category": "CompTIA"
  },
  "modules": [
    {
      "title": "The OSI Model: Not Just Theory",
      "topics": [
        {
          "title": "The OSI Model: Not Just Theory",
          "prose": "<p>Network+ is where we learn how the pipes actually work. <strong>The OSI Model</strong> isn't just a textbook concept; it's a troubleshooting framework. When a junior trader complains that their trading terminal isn't connecting to the exchange, you don't instantly replace the router. You walk the stack.</p>\n<ul>\n<li><strong>Layer 1 (Physical):</strong> Is the CAT6 cable plugged in? Did a rat chew it?</li>\n<li><strong>Layer 2 (Data Link):</strong> Are the MAC addresses resolving? Is there a switching loop taking down the VLAN?</li>\n<li><strong>Layer 3 (Network):</strong> Are IP routes configured correctly? Can you <code>ping</code> the gateway?</li>\n<li><strong>Layer 4 (Transport):</strong> Is TCP port 443 blocked by a firewall?</li>\n<li><strong>Layer 7 (Application):</strong> Is the DNS server returning the right IP? Is the web app throwing a 500 error?</li>\n</ul>\n<p>By isolating the layer where communication fails, you isolate the problem.</p>\n\n<div class=\"lesson-alert\"><strong>Exam Tip (Network+):</strong> The exam loves handing you a symptom and asking which layer it lives at. “Duplicate IP address” is Layer 3. “Wrong VLAN” is Layer 2. “Cable unplugged” is Layer 1. Memorize the layer-to-symptom mapping, not just the layer names.</div>\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> The OSI model is a hospital triage checklist, not a textbook diagram. A patient who “isn't breathing” gets checked airway-first, not blood-pressure-first. In your pfSense homelab, if a VM can't reach the internet, you don't start by tweaking DNS (Layer 7) — you check the virtual NIC is up (Layer 1) and the VLAN tag matches the switch port (Layer 2) before you ever touch application settings.</div>",
          "tags": [
            "comptia",
            "network-plus",
            "osi"
          ],
          "quiz": [
            {
              "q": "Which OSI layer is responsible for logical addressing and routing?",
              "opts": [
                "Layer 1 (Physical)",
                "Layer 2 (Data Link)",
                "Layer 3 (Network)",
                "Layer 4 (Transport)"
              ],
              "ans": 2,
              "exp": "Layer 3 (Network) uses logical addresses (like IP addresses) to route packets between different networks."
            },
            {
              "q": "If an administrator is troubleshooting a problem where two switches are creating an endless broadcast storm, which OSI layer is primarily involved?",
              "opts": [
                "Layer 2",
                "Layer 3",
                "Layer 4",
                "Layer 7"
              ],
              "ans": 0,
              "exp": "Layer 2 (Data Link) handles MAC addresses and switching. Broadcast storms and switching loops (mitigated by Spanning Tree Protocol) occur here."
            },
            {
              "q": "At which layer of the OSI model does TCP (Transmission Control Protocol) operate to ensure reliable data delivery?",
              "opts": [
                "Layer 2",
                "Layer 3",
                "Layer 4",
                "Layer 5"
              ],
              "ans": 2,
              "exp": "Layer 4 (Transport) is responsible for end-to-end communication, utilizing protocols like TCP for reliable delivery and UDP for fast, connectionless delivery."
            }
          ]
        }
      ],
      "related": [
        {
          "course": "psm-scrum",
          "idx": 2
        },
        {
          "course": "aws-saa-c03",
          "idx": 11
        }
      ]
    },
    {
      "title": "Network Implementations: Routing & Switching",
      "topics": [
        {
          "title": "Network Implementations: Routing & Switching",
          "prose": "<p>Switches create networks (Layer 2). Routers connect networks (Layer 3). When you configure a switch, you assign ports to VLANs to isolate traffic. When you configure a router, you use protocols like OSPF or BGP to find the fastest path between those VLANs.</p>\n\n<p>Inside a single organization, OSPF (Open Shortest Path First) finds the fastest internal route automatically. Between organizations — your ISP and every other ISP on the internet — that's BGP (Border Gateway Protocol) territory, where “fastest” takes a back seat to “whoever we have a business agreement with.”</p></p>\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> A switch is the hallway inside one office floor — it gets a packet from cubicle A to cubicle B by MAC address, no questions asked. A router is airport security between floors — it checks the IP “boarding pass” and decides which floor (network) the packet is even allowed to reach. Your pfSense box is doing router duty at the edge of your homelab; your unmanaged switch is doing hallway duty inside it.</div>\n\n<div class=\"lesson-alert\"><strong>Exam Tip (Network+):</strong> If traffic stays inside one broadcast domain, think switch/VLAN/Layer 2. If it needs to leave that subnet, think router/Layer 3 — and remember a Layer 3 switch can do both jobs at once, which is a favorite exam trap.</div>",
          "tags": [
            "comptia",
            "network-plus",
            "routing"
          ],
          "quiz": [
            {
              "q": "Which protocol prevents switching loops in a Layer 2 network?",
              "opts": [
                "OSPF",
                "BGP",
                "STP",
                "ARP"
              ],
              "ans": 2,
              "exp": "Spanning Tree Protocol (STP) blocks redundant links to prevent broadcast storms and loops."
            },
            {
              "q": "Which routing protocol is an exterior gateway protocol used to route traffic across the internet?",
              "opts": [
                "OSPF",
                "EIGRP",
                "RIP",
                "BGP"
              ],
              "ans": 3,
              "exp": "Border Gateway Protocol (BGP) is the protocol that makes the internet work by routing between different autonomous systems."
            },
            {
              "q": "What is the purpose of an ARP request?",
              "opts": [
                "Resolve a domain name to an IP",
                "Resolve an IP address to a MAC address",
                "Assign an IP address to a client",
                "Route packets between subnets"
              ],
              "ans": 1,
              "exp": "The Address Resolution Protocol (ARP) broadcasts an IP to find the associated physical MAC address on a local network."
            }
          ]
        }
      ],
      "related": [
        {
          "course": "comptia-networkplus",
          "idx": 2
        },
        {
          "course": "comptia-networkplus",
          "idx": 3
        }
      ]
    },
    {
      "title": "Network Operations & Documentation",
      "topics": [
        {
          "title": "Network Operations & Documentation",
          "prose": "<p>Operations is about keeping the lights on. It covers monitoring (SNMP, Syslog), documentation (wiring diagrams, baselines), and High Availability (load balancing, clustering).</p>\n\n<p>SNMP (Simple Network Management Protocol) polls devices for health metrics — CPU, interface utilization, temperature — on a schedule. Syslog is the opposite direction: devices push event messages to a central server the moment something happens. A healthy NOC uses both — SNMP for “is it trending toward a problem,” Syslog for “what just broke.”</p></p>\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> SNMP is checking your homelab's Proxmox dashboard every five minutes to see CPU creeping toward 90%. Syslog is pfSense firing off a message the instant a WAN link actually drops. One is a dashboard you glance at; the other is a phone that rings when the house is on fire — a mature network needs both, because a dashboard nobody's watching is just wallpaper.</div>\n\n<div class=\"lesson-alert\"><strong>Exam Tip (Network+):</strong> Know your baseline. The exam will describe “unusual” network behavior and expect you to recognize that you can't call something abnormal without first having documented what normal looks like — that documented normal is the baseline.</div>",
          "tags": [
            "comptia",
            "network-plus",
            "operations"
          ],
          "quiz": [
            {
              "q": "Which SNMP component stores information about the managed device?",
              "opts": [
                "Agent",
                "Manager",
                "MIB",
                "Trap"
              ],
              "ans": 2,
              "exp": "The Management Information Base (MIB) is the database on the agent that stores metrics and configuration data."
            },
            {
              "q": "What is the term for a snapshot of network performance under normal working conditions?",
              "opts": [
                "Baseline",
                "Threshold",
                "SLA",
                "Topology"
              ],
              "ans": 0,
              "exp": "A baseline is established during normal operation so you have a reference point to detect anomalies later."
            },
            {
              "q": "Which protocol is used to send log messages to a centralized server?",
              "opts": [
                "SNMP",
                "Syslog",
                "SMTP",
                "NTP"
              ],
              "ans": 1,
              "exp": "Syslog (port 514) sends event messages to a centralized logging server."
            }
          ]
        }
      ],
      "related": [
        {
          "course": "comptia-networkplus",
          "idx": 3
        },
        {
          "course": "comptia-networkplus",
          "idx": 4
        }
      ]
    },
    {
      "title": "Network Security & Hardening",
      "topics": [
        {
          "title": "Network Security & Hardening",
          "prose": "<p>Network security involves hardening devices (disabling unused ports, changing default passwords) and deploying perimeter defenses like Firewalls, IPS, and VPNs (IPsec, SSL/TLS).</p>\n\n<p>A firewall decides whether traffic is allowed based on rules (ports, IPs, protocols) — a bouncer with a guest list. An IPS (Intrusion Prevention System) goes further, inspecting the actual payload for known attack patterns and dropping malicious traffic even if it technically matches an allowed port. For encrypted tunnels, IPsec operates at Layer 3 and is the standard for site-to-site VPNs connecting two office networks; SSL/TLS operates higher up the stack and secures an individual remote-access session, like a laptop VPN client.</p></p>\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> Disabling unused switch ports and killing default passwords is putting a deadbolt on every door of the house, not just the front one. Most breaches don't kick down the reinforced front door (the firewall) — they walk in through the garage side-door nobody bothered to lock (an unhardened device still running <code>admin/admin</code>).</div>\n\n<div class=\"lesson-alert\"><strong>Exam Tip (Network+):</strong> “Change the default credentials” and “disable unused ports/services” show up constantly as the correct hardening answer — the exam rewards eliminating attack surface before it rewards buying another appliance.</div>",
          "tags": [
            "comptia",
            "network-plus",
            "security"
          ],
          "quiz": [
            {
              "q": "Which switch feature ensures that only a specific MAC address can communicate on a port?",
              "opts": [
                "Port Security",
                "802.1X",
                "DHCP Snooping",
                "VLAN Hopping"
              ],
              "ans": 0,
              "exp": "Port security restricts input to an interface by limiting the MAC addresses of the stations allowed to access the port."
            },
            {
              "q": "Which IPsec protocol provides data confidentiality (encryption)?",
              "opts": [
                "AH",
                "ESP",
                "IKE",
                "ISAKMP"
              ],
              "ans": 1,
              "exp": "Encapsulating Security Payload (ESP) encrypts the payload for confidentiality, whereas Authentication Header (AH) only provides integrity."
            },
            {
              "q": "What port is typically used for a secure HTTPS web interface?",
              "opts": [
                "80",
                "443",
                "22",
                "3389"
              ],
              "ans": 1,
              "exp": "HTTPS uses TCP port 443 for encrypted web traffic."
            }
          ]
        }
      ],
      "related": [
        {
          "course": "comptia-networkplus",
          "idx": 4
        },
        {
          "course": "comptia-networkplus",
          "idx": 0
        }
      ]
    },
    {
      "title": "Network Troubleshooting: Command Line Tools",
      "topics": [
        {
          "title": "Network Troubleshooting: Command Line Tools",
          "prose": "<p>When the network breaks, you live in the CLI. <code>ping</code> tests reachability. <code>tracert/traceroute</code> finds where packets die. <code>netstat</code> shows active connections. <code>nslookup/dig</code> interrogates DNS.</p>\n\n<p>Round it out with <code>ipconfig</code>/<code>ifconfig</code> to check your own machine's address and gateway, and <code>arp -a</code> to see which MAC address your machine currently associates with an IP — useful for catching an ARP spoofing attack or just confirming two devices actually agree on who's who on the local segment.</p>\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> These commands are a stethoscope, blood pressure cuff, and thermometer — cheap, fast, and they tell you where to look before you order the expensive MRI. ping says the patient (host) is alive. tracert says exactly which hop of the journey the patient collapsed at. You reach for Wireshark (the MRI) only after the basic vitals point you somewhere specific.</div>\n\n<div class=\"lesson-alert\"><strong>Exam Tip (Network+):</strong> ping fails two different ways and the exam expects you to know which is which — “Destination host unreachable” means YOUR router has no route to that network; “Request timed out” means a route exists but nothing answered along the way.</div>",
          "tags": [
            "comptia",
            "network-plus",
            "cli"
          ],
          "quiz": [
            {
              "q": "Which command shows the MAC address of the local machine on Windows?",
              "opts": [
                "ipconfig /all",
                "netstat -a",
                "arp -a",
                "route print"
              ],
              "ans": 0,
              "exp": "ipconfig /all displays full TCP/IP configuration for all adapters, including the physical (MAC) address."
            },
            {
              "q": "A user can ping 8.8.8.8 but cannot open google.com. Which tool should you use to troubleshoot?",
              "opts": [
                "tracert",
                "nslookup",
                "netstat",
                "nmap"
              ],
              "ans": 1,
              "exp": "nslookup or dig is used to query DNS servers and troubleshoot name resolution failures."
            },
            {
              "q": "Which command displays all active TCP connections and listening ports on a host?",
              "opts": [
                "ping",
                "netstat",
                "tracert",
                "arp"
              ],
              "ans": 1,
              "exp": "netstat (Network Statistics) displays active connections, routing tables, and a number of network interface statistics."
            }
          ]
        }
      ],
      "related": [
        {
          "course": "comptia-networkplus",
          "idx": 0
        },
        {
          "course": "comptia-networkplus",
          "idx": 1
        }
      ]
    }
  ],
  "flashcards": [
    {
      "id": 2,
      "cat": "CompTIA Network+",
      "domain": "OSI Model",
      "front": "OSI Layer 3",
      "back": "The Network Layer. Handles logical addressing (IP addresses) and routing of packets across multiple networks. Routers operate here.",
      "analogy": "Like the postal system sorting facility reading zip codes to determine which truck your package needs to go on."
    },
    {
      "id": 201,
      "cat": "CompTIA Network+",
      "domain": "Fundamentals",
      "front": "OSI Layer 2 (Data Link)",
      "back": "Handles MAC addresses and switching. Protocols: Ethernet, ARP, STP. Devices: Switches.",
      "analogy": "The local neighborhood mail carrier who only knows physical street addresses (MACs)."
    },
    {
      "id": 202,
      "cat": "CompTIA Network+",
      "domain": "Fundamentals",
      "front": "OSI Layer 3 (Network)",
      "back": "Handles IP addresses and routing. Protocols: IP, ICMP, OSPF, BGP. Devices: Routers.",
      "analogy": "The postal sorting facility that routes mail to different states and countries using zip codes (IPs)."
    },
    {
      "id": 203,
      "cat": "CompTIA Network+",
      "domain": "Fundamentals",
      "front": "TCP vs UDP",
      "back": "TCP is connection-oriented, reliable, and has error checking (HTTP, SSH). UDP is connectionless, fast, and unreliable (VoIP, Video).",
      "analogy": "TCP is certified mail with a return receipt. UDP is throwing a newspaper on a porch from a moving car."
    },
    {
      "id": 204,
      "cat": "CompTIA Network+",
      "domain": "Fundamentals",
      "front": "DNS (Domain Name System)",
      "back": "Resolves human-readable domain names (google.com) to IP addresses (8.8.8.8). Runs on Port 53.",
      "analogy": "The phonebook of the internet. You look up a name to get the phone number."
    },
    {
      "id": 205,
      "cat": "CompTIA Network+",
      "domain": "Implementations",
      "front": "VLAN (Virtual LAN)",
      "back": "Logically separates a physical switch into multiple isolated broadcast domains at Layer 2.",
      "analogy": "Taking one massive open-plan office and building soundproof walls to separate the departments."
    },
    {
      "id": 206,
      "cat": "CompTIA Network+",
      "domain": "Implementations",
      "front": "STP (Spanning Tree Protocol)",
      "back": "Layer 2 protocol that prevents switching loops and broadcast storms by blocking redundant links.",
      "analogy": "A traffic cop who shuts down a roundabout entrance to prevent gridlock, but opens it if another road closes."
    },
    {
      "id": 207,
      "cat": "CompTIA Network+",
      "domain": "Operations",
      "front": "SNMP (Simple Network Management Protocol)",
      "back": "Used to monitor and configure network devices. Uses Agents, Managers, and MIBs. Port 161.",
      "analogy": "The dashboard in a car showing you exactly how the engine (router) is performing in real-time."
    },
    {
      "id": 208,
      "cat": "CompTIA Network+",
      "domain": "Security",
      "front": "DHCP Snooping",
      "back": "A switch feature that drops DHCP offers from untrusted ports to prevent rogue DHCP server attacks.",
      "analogy": "A bouncer checking IDs to make sure nobody is handing out fake VIP passes in the club."
    },
    {
      "id": 209,
      "cat": "CompTIA Network+",
      "domain": "Troubleshooting",
      "front": "APIPA (169.254.x.x)",
      "back": "Automatic Private IP Addressing. Assigned by Windows when the client cannot reach a DHCP server.",
      "analogy": "The network equivalent of talking to yourself because nobody else is answering."
    },
    {
      "id": 210,
      "cat": "CompTIA Network+",
      "domain": "Troubleshooting",
      "front": "ping vs tracert",
      "back": "Ping tests basic reachability. Tracert/Traceroute shows the exact path of hops to the destination and where latency occurs.",
      "analogy": "Ping is asking 'Are you there?'. Tracert is asking 'Which exact roads did you take to get there and where was the traffic?'."
    }
  ],
  "exam": [
    {
      "q": "You are troubleshooting a network issue where a workstation cannot reach the internet. You can successfully ping the default gateway (192.168.1.1) but cannot ping 8.8.8.8. Which OSI layer is most likely where the issue resides?",
      "opts": [
        "Layer 1 (Physical)",
        "Layer 2 (Data Link)",
        "Layer 3 (Network)",
        "Layer 7 (Application)"
      ],
      "ans": 2,
      "exp": "Because you can reach the local gateway, Layer 1 and 2 are functioning. The failure to route traffic beyond the local subnet to an external IP indicates a Layer 3 (Network) routing issue at the gateway/firewall.",
      "domain": "Network Troubleshooting"
    },
    {
      "q": "Which of the following IPv4 addresses is a valid loopback address used for local testing?",
      "opts": [
        "192.168.1.1",
        "127.0.0.1",
        "169.254.0.1",
        "10.0.0.1"
      ],
      "ans": 1,
      "exp": "127.0.0.1 is the standard IPv4 loopback address. 169.254.x.x is APIPA, and 10.x.x.x/192.168.x.x are private IP ranges.",
      "domain": "Networking Concepts"
    },
    {
      "q": "A network administrator needs to assign an IPv6 address to a router interface that will only be routable within the local site, not across the internet. Which IPv6 prefix should be used?",
      "opts": [
        "2000::/3",
        "FE80::/10",
        "FD00::/8",
        "FF00::/8"
      ],
      "ans": 2,
      "exp": "FD00::/8 (Unique Local Address) is the IPv6 equivalent of a private IPv4 address. FE80::/10 is link-local (only on the local segment). 2000::/3 is global unicast, and FF00::/8 is multicast.",
      "domain": "Networking Concepts"
    },
    {
      "q": "Which routing protocol uses the Shortest Path First (Dijkstra) algorithm and groups routers into areas to limit routing update traffic?",
      "opts": [
        "RIPv2",
        "BGP",
        "OSPF",
        "EIGRP"
      ],
      "ans": 2,
      "exp": "OSPF (Open Shortest Path First) is a link-state routing protocol that uses Dijkstra's algorithm and hierarchical areas (like Area 0) to scale efficiently.",
      "domain": "Networking Concepts"
    },
    {
      "q": "At which layer of the OSI model does a standard, unmanaged network switch operate?",
      "opts": [
        "Layer 1 (Physical)",
        "Layer 2 (Data Link)",
        "Layer 3 (Network)",
        "Layer 4 (Transport)"
      ],
      "ans": 1,
      "exp": "A standard switch operates at Layer 2 (Data Link) and forwards frames based on MAC addresses.",
      "domain": "Networking Concepts"
    },
    {
      "q": "A technician is mapping out the ports required for secure remote administration and file transfer. Which ports should be allowed through the firewall for SSH and SFTP?",
      "opts": [
        "Port 21 and Port 22",
        "Port 22 only",
        "Port 22 and Port 23",
        "Port 443 and Port 22"
      ],
      "ans": 1,
      "exp": "Both SSH (Secure Shell) and SFTP (SSH File Transfer Protocol) operate over TCP Port 22.",
      "domain": "Networking Concepts"
    },
    {
      "q": "Which Wi-Fi standard introduced MU-MIMO (Multi-User Multiple Input Multiple Output) and operates exclusively in the 5 GHz band?",
      "opts": [
        "802.11n (Wi-Fi 4)",
        "802.11ac (Wi-Fi 5)",
        "802.11ax (Wi-Fi 6)",
        "802.11g"
      ],
      "ans": 1,
      "exp": "802.11ac (Wi-Fi 5) operates only in the 5 GHz band and introduced downlink MU-MIMO.",
      "domain": "Networking Concepts"
    },
    {
      "q": "A network engineer wants to logically separate the Accounting department's traffic from the HR department's traffic on the same physical switch. What technology should they implement?",
      "opts": [
        "Subnetting",
        "VLANs",
        "VPN",
        "Spanning Tree Protocol (STP)"
      ],
      "ans": 1,
      "exp": "Virtual LANs (VLANs) segment a physical switch into multiple logical networks at Layer 2, isolating broadcast domains.",
      "domain": "Network Implementation"
    },
    {
      "q": "When configuring a trunk link between two Cisco switches to carry multiple VLANs, which protocol is typically used to tag the frames?",
      "opts": [
        "802.1Q",
        "802.1X",
        "STP",
        "LACP"
      ],
      "ans": 0,
      "exp": "IEEE 802.1Q is the industry-standard networking protocol used to tag frames with their VLAN ID over trunk links.",
      "domain": "Network Implementation"
    },
    {
      "q": "A company is opening a new branch office and needs a cost-effective way to connect the branch network to the headquarters securely over the public internet. Which implementation is BEST?",
      "opts": [
        "MPLS leased line",
        "Site-to-Site VPN",
        "Client-to-Site VPN",
        "SD-WAN"
      ],
      "ans": 1,
      "exp": "A Site-to-Site VPN creates a secure, encrypted tunnel over the internet between two routers/firewalls, connecting the entire branch network to HQ cost-effectively.",
      "domain": "Network Implementation"
    },
    {
      "q": "To combine the bandwidth of three 1 Gbps switch ports into a single 3 Gbps logical link, which protocol should the network engineer use?",
      "opts": [
        "Spanning Tree Protocol (STP)",
        "Link Aggregation Control Protocol (LACP)",
        "Border Gateway Protocol (BGP)",
        "VLAN Trunking Protocol (VTP)"
      ],
      "ans": 1,
      "exp": "LACP (802.3ad) allows multiple physical links to be bundled together to form a single logical link for increased bandwidth and redundancy.",
      "domain": "Network Implementation"
    },
    {
      "q": "A technician is terminating a Cat6 cable and needs to ensure it follows the TIA/EIA-568B standard. Which wire color should be placed in pin 1?",
      "opts": [
        "White/Green",
        "Green",
        "White/Orange",
        "Orange"
      ],
      "ans": 2,
      "exp": "In the T568B standard, Pin 1 is White/Orange. In T568A, Pin 1 is White/Green.",
      "domain": "Network Implementation"
    },
    {
      "q": "A network administrator wants to monitor the bandwidth utilization and interface errors on a core router from a central dashboard. Which protocol is designed for this?",
      "opts": [
        "Syslog",
        "SNMP",
        "SMTP",
        "ICMP"
      ],
      "ans": 1,
      "exp": "Simple Network Management Protocol (SNMP) is used to collect metrics (like bandwidth and CPU usage) and configure network devices centrally.",
      "domain": "Network Operations"
    },
    {
      "q": "Which type of documentation provides a visual representation of how devices are physically connected, including port numbers and cable types?",
      "opts": [
        "Logical network diagram",
        "Physical network diagram",
        "Standard Operating Procedure (SOP)",
        "Asset register"
      ],
      "ans": 1,
      "exp": "A physical network diagram shows the actual hardware, cabling, and physical layout of the network. A logical diagram shows IP addresses, subnets, and routing.",
      "domain": "Network Operations"
    },
    {
      "q": "The network team is planning to update the firmware on the core distribution switches. To minimize disruption, they plan to do this at 2:00 AM on a Sunday. What process are they following?",
      "opts": [
        "Incident Response",
        "Change Management",
        "Disaster Recovery",
        "Business Continuity"
      ],
      "ans": 1,
      "exp": "Change management is the formal process of planning, reviewing, testing, and scheduling changes (like firmware updates during a maintenance window) to minimize risk.",
      "domain": "Network Operations"
    },
    {
      "q": "Which metric describes the average amount of time a network device operates before it experiences a hardware failure?",
      "opts": [
        "MTTR",
        "MTBF",
        "RPO",
        "RTO"
      ],
      "ans": 1,
      "exp": "Mean Time Between Failures (MTBF) measures reliability—the average time a device runs before breaking down.",
      "domain": "Network Operations"
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
      "domain": "Network Security"
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
      "domain": "Network Security"
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
      "domain": "Network Security"
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
      "domain": "Network Security"
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
      "domain": "Network Security"
    },
    {
      "q": "A user's workstation has the IP address 169.254.12.45. They cannot reach the internet or local servers, but the link light on their NIC is solid green. What is the MOST likely cause?",
      "opts": [
        "The DNS server is down",
        "The DHCP server is unreachable or out of addresses",
        "The default gateway is configured incorrectly",
        "The Ethernet cable is unplugged"
      ],
      "ans": 1,
      "exp": "169.254.x.x is an APIPA (Automatic Private IP Addressing) address. The OS assigns this to itself when it asks for an IP via DHCP and receives no response. Since the link light is on, the physical connection (cable) is fine.",
      "domain": "Network Troubleshooting"
    },
    {
      "q": "An engineer replaces a failed 10G SFP+ module with a new one. The link comes up, but the interface shows a massive number of CRC errors and dropped frames. The cable is a 200-meter multimode fiber run. What is the MOST likely issue?",
      "opts": [
        "Tx/Rx are reversed",
        "Speed mismatch",
        "Duplex mismatch",
        "Attenuation / dirty fiber face"
      ],
      "ans": 3,
      "exp": "CRC errors and dropped frames on a fiber link, assuming the link is actually up, usually point to dirty fiber ends, a bad bend radius, or attenuation causing signal degradation. Reversed Tx/Rx would result in the link not coming up at all.",
      "domain": "Network Troubleshooting"
    },
    {
      "q": "Users report they can reach websites by typing IP addresses (e.g., 8.8.8.8) into their browser, but not by typing domain names (e.g., google.com). Which protocol is failing?",
      "opts": [
        "DHCP",
        "DNS",
        "HTTP",
        "ARP"
      ],
      "ans": 1,
      "exp": "DNS (Domain Name System) resolves human-readable domain names to IP addresses. If IP addresses work but domains don't, DNS is the point of failure.",
      "domain": "Network Troubleshooting"
    },
    {
      "q": "A network technician suspects that a router is dropping packets due to congestion. Which command-line tool will trace the path the packets take and report latency/loss at each hop?",
      "opts": [
        "ping",
        "ipconfig",
        "tracert / traceroute",
        "netstat"
      ],
      "ans": 2,
      "exp": "tracert (Windows) or traceroute (Linux/Cisco) shows the route packets take to a destination, displaying latency and timeouts for every router (hop) along the way.",
      "domain": "Network Troubleshooting"
    },
    {
      "q": "Two newly configured switches are connected via a trunk link. Switch A has native VLAN 1, and Switch B has native VLAN 99. What issue will occur?",
      "opts": [
        "A routing loop",
        "VLAN mismatch / Native VLAN mismatch",
        "Spanning tree failure",
        "Duplex mismatch"
      ],
      "ans": 1,
      "exp": "A native VLAN mismatch occurs when the two ends of a trunk link are configured with different native VLANs. This causes untagged frames to leak into the wrong VLAN, breaking connectivity and generating CDP/LLDP error logs.",
      "domain": "Network Troubleshooting"
    },
    {
      "q": "Which wireless standard operates simultaneously on the 2.4 GHz, 5 GHz, and 6 GHz bands to drastically increase throughput and reduce latency?",
      "opts": [
        "Wi-Fi 5 (802.11ac)",
        "Wi-Fi 6 (802.11ax)",
        "Wi-Fi 6E (802.11ax)",
        "Wi-Fi 4 (802.11n)"
      ],
      "ans": 2,
      "exp": "Wi-Fi 6E extends the 802.11ax standard to include the 6 GHz frequency band, offering wider channels and less interference.",
      "domain": "Networking Concepts"
    }
  ],
  "daily": [
    {
      "track": "networkplus",
      "day": 1,
      "concept": "Network+ Review - Day 1",
      "domain": "Network+",
      "icon": "🌐",
      "color": "#3b82f6",
      "tagline": "CompTIA Network+ Core Principles",
      "slides": [
        "Welcome to the CompTIA Daily Sprint.",
        "Today we are reviewing core concepts for Network+.",
        "Review your flashcards, check the library modules, and prepare for the mini-quiz."
      ],
      "quiz": [
        {
          "q": "Are you ready to crush the Network+ exam?",
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
      "track": "networkplus",
      "day": 5,
      "concept": "Network+ Review - Day 5",
      "domain": "Network+",
      "icon": "🌐",
      "color": "#3b82f6",
      "tagline": "CompTIA Network+ Core Principles",
      "slides": [
        "Welcome to the CompTIA Daily Sprint.",
        "Today we are reviewing core concepts for Network+.",
        "Review your flashcards, check the library modules, and prepare for the mini-quiz."
      ],
      "quiz": [
        {
          "q": "Are you ready to crush the Network+ exam?",
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
      "track": "networkplus",
      "day": 9,
      "concept": "Network+ Review - Day 9",
      "domain": "Network+",
      "icon": "🌐",
      "color": "#3b82f6",
      "tagline": "CompTIA Network+ Core Principles",
      "slides": [
        "Welcome to the CompTIA Daily Sprint.",
        "Today we are reviewing core concepts for Network+.",
        "Review your flashcards, check the library modules, and prepare for the mini-quiz."
      ],
      "quiz": [
        {
          "q": "Are you ready to crush the Network+ exam?",
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
      "track": "networkplus",
      "day": 13,
      "concept": "Network+ Review - Day 13",
      "domain": "Network+",
      "icon": "🌐",
      "color": "#3b82f6",
      "tagline": "CompTIA Network+ Core Principles",
      "slides": [
        "Welcome to the CompTIA Daily Sprint.",
        "Today we are reviewing core concepts for Network+.",
        "Review your flashcards, check the library modules, and prepare for the mini-quiz."
      ],
      "quiz": [
        {
          "q": "Are you ready to crush the Network+ exam?",
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
      "title": "Level 6: The Switching Loop (STP & VLANs)",
      "desc": "A new intern plugged both ends of a Cat6 cable into the core switch, creating a massive broadcast storm that took down the trading floor. You must logically segment the network using VLANs and prevent future loops.",
      "zones": [
        {
          "id": "core",
          "name": "Core Switch",
          "accepts": [
            "stp",
            "trunk"
          ]
        },
        {
          "id": "access1",
          "name": "Access Switch 1 (Trading)",
          "accepts": [
            "vlan10",
            "portsec"
          ]
        },
        {
          "id": "access2",
          "name": "Access Switch 2 (HR)",
          "accepts": [
            "vlan20"
          ]
        }
      ],
      "palette": [
        {
          "id": "stp",
          "label": "Enable Rapid STP (802.1w)",
          "type": "policy"
        },
        {
          "id": "vlan10",
          "label": "Assign VLAN 10 (High Priority)",
          "type": "resource"
        },
        {
          "id": "vlan20",
          "label": "Assign VLAN 20 (Standard)",
          "type": "resource"
        },
        {
          "id": "trunk",
          "label": "Configure 802.1Q Trunk",
          "type": "policy"
        },
        {
          "id": "portsec",
          "label": "BPDU Guard / Port Security",
          "type": "policy"
        }
      ],
      "dm": {
        "core": [
          "stp",
          "trunk"
        ],
        "access1": [
          "vlan10",
          "portsec"
        ],
        "access2": [
          "vlan20"
        ]
      },
      "wm": "Perfect. Spanning Tree Protocol (STP) on the core prevents the loop. The 802.1Q trunk carries the separated VLANs to the access switches, and BPDU Guard on the trading switch ensures no rogue switches can hijack the STP root."
    }
  ],
  "sales": []
};
