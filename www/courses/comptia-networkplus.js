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
    "category": "CompTIA",
    "passThreshold": 0.8,
    "examDurationMinutes": 90,
    "examName": "CompTIA Network+ N10-009",
    "examFormat": {
      "questions": 90,
      "passLabel": "720 / 900 (scaled)",
      "blueprint": [
        {
          "domain": "Network Troubleshooting",
          "label": "Network Troubleshooting",
          "weight": 24
        },
        {
          "domain": "Networking Concepts",
          "label": "Networking Concepts",
          "weight": 23
        },
        {
          "domain": "Network Implementation",
          "label": "Network Implementation",
          "weight": 20
        },
        {
          "domain": "Network Operations",
          "label": "Network Operations",
          "weight": 19
        },
        {
          "domain": "Network Security",
          "label": "Network Security",
          "weight": 14
        }
      ]
    }
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
      "domain": "Network Troubleshooting",
      "whyWrong": [
        "Layer 1 covers physical cabling and signaling; since the workstation can ping 192.168.1.1, the physical link is up and working.",
        "Layer 2 handles local MAC switching and ARP; reaching the default gateway on the local subnet proves Layer 2 frame delivery is intact.",
        "",
        "Layer 7 involves application protocols like HTTP or DNS, whereas pinging 8.8.8.8 uses ICMP at Layer 3 without touching Layer 7."
      ]
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
      "domain": "Networking Concepts",
      "whyWrong": [
        "192.168.1.1 is an RFC 1918 Class C private address commonly assigned to a SOHO default gateway, not the local host's TCP/IP loopback interface.",
        "",
        "169.254.0.0/16 is the APIPA link-local range automatically self-assigned when a DHCP server cannot be reached, not a loopback address.",
        "10.0.0.0/8 is an RFC 1918 Class A private address range used for internal LAN routing, whereas 127.0.0.0/8 is reserved for loopback testing."
      ]
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
      "domain": "Networking Concepts",
      "whyWrong": [
        "2000::/3 is the Global Unicast Address (GUA) range, which IS publicly routable across the internet rather than restricted to the local site.",
        "FE80::/10 is a Link-Local address that routers never forward beyond a single local broadcast segment, so it cannot route across subnets within the site.",
        "",
        "FF00::/8 is the IPv6 multicast address range used for one-to-many group traffic, not a unicast address assigned to a router interface for site-internal routing."
      ]
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
      "domain": "Networking Concepts",
      "whyWrong": [
        "RIPv2 is a distance-vector protocol that uses hop count (max 15 hops) via the Bellman-Ford algorithm, not Dijkstra's link-state algorithm or hierarchical areas.",
        "BGP is a path-vector exterior gateway protocol that routes between Autonomous Systems across the internet using AS-path attributes, not internal OSPF areas.",
        "",
        "EIGRP is an advanced distance-vector protocol that uses the DUAL algorithm and composite metrics rather than Dijkstra's Shortest Path First tree."
      ]
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
      "domain": "Networking Concepts",
      "whyWrong": [
        "Layer 1 devices (like hubs and repeaters) blindly regenerate electrical bits out all ports without reading MAC addresses, whereas an unmanaged switch learns MAC tables at Layer 2.",
        "",
        "Layer 3 requires routing packets by IP address; only routers or managed Layer 3 switches inspect IP headers, not a standard unmanaged switch.",
        "Layer 4 tracks TCP/UDP port numbers and sessions, which is handled by end hosts, stateful firewalls, or load balancers rather than an unmanaged switch."
      ]
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
      "domain": "Networking Concepts",
      "whyWrong": [
        "Port 21 is used by legacy FTP (and FTPS control), whereas SFTP is an extension of SSH that tunnels file transfers entirely over TCP port 22.",
        "",
        "Port 23 is unencrypted Telnet, which sends credentials in cleartext and should be disabled, not opened alongside SSH/SFTP on port 22.",
        "Port 443 is used for HTTPS web traffic; neither SSH nor SFTP requires port 443 because both protocols run over TCP port 22."
      ]
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
      "domain": "Networking Concepts",
      "whyWrong": [
        "802.11n (Wi-Fi 4) operates in both the 2.4 GHz and 5 GHz bands and introduced single-user MIMO, not MU-MIMO.",
        "",
        "802.11ax (Wi-Fi 6) operates across both 2.4 GHz and 5 GHz rather than exclusively in 5 GHz, and expanded MU-MIMO to uplink rather than introducing it.",
        "802.11g is a legacy 54 Mbps standard that operates exclusively in the 2.4 GHz band without MIMO support."
      ]
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
      "domain": "Network Implementation",
      "whyWrong": [
        "Subnetting divides IP address ranges at Layer 3, but without VLANs on the physical switch, both subnets would still share the same Layer 2 broadcast domain.",
        "",
        "A VPN encrypts traffic across an untrusted network like the internet; it is not used to segment ports on an internal physical switch.",
        "Spanning Tree Protocol prevents Layer 2 switching loops across redundant switch links; it does not partition switch ports into separate departmental broadcast domains."
      ]
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
      "domain": "Network Implementation",
      "whyWrong": [
        "",
        "IEEE 802.1X is a port-based network access control (NAC) authentication standard, a classic look-alike trap for 802.1Q VLAN tagging.",
        "Spanning Tree Protocol (802.1D/802.1w) blocks redundant switch paths to prevent Layer 2 loops; it does not insert VLAN ID tags into Ethernet frames.",
        "LACP (802.3ad) bundles multiple physical ports into a single aggregated link (port channel), rather than tagging frames with VLAN identifiers."
      ]
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
      "domain": "Network Implementation",
      "whyWrong": [
        "An MPLS circuit provides dedicated private connectivity through a carrier rather than tunneling over the public internet, making it far more expensive than a VPN.",
        "",
        "A Client-to-Site (remote access) VPN requires VPN software on each individual user's laptop rather than connecting the entire branch LAN to HQ at the router level.",
        "SD-WAN dynamically steers traffic across multiple WAN transports (MPLS, LTE, broadband), whereas a simple encrypted tunnel between two offices over the internet is a Site-to-Site VPN."
      ]
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
      "domain": "Network Implementation",
      "whyWrong": [
        "Without link aggregation, STP treats three parallel cables between switches as a loop hazard and blocks two of them, leaving you with 1 Gbps instead of 3 Gbps.",
        "",
        "BGP is a Layer 3 exterior gateway routing protocol used between Autonomous Systems on the internet, not a Layer 2 port-bundling protocol.",
        "VTP is a Cisco-proprietary protocol that synchronizes VLAN database names across switches; it does not aggregate physical switch ports."
      ]
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
      "domain": "Network Implementation",
      "whyWrong": [
        "White/Green is placed in Pin 1 for the T568A standard (and Pin 3 in T568B), making it the classic exam mix-up when terminating T568B.",
        "Solid Green belongs in Pin 6 in T568B (and Pin 2 in T568A); Pin 1 always uses a white-striped wire in both standards.",
        "",
        "Solid Orange goes in Pin 2 of a T568B connector, immediately after White/Orange on Pin 1."
      ]
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
      "domain": "Network Operations",
      "whyWrong": [
        "Syslog pushes timestamped event and error text messages when state changes occur, rather than polling structured interface counters like bandwidth utilization.",
        "",
        "Simple Mail Transfer Protocol (port 25) is used to send email messages between mail servers, not to poll performance metrics from routers.",
        "ICMP is used by tools like ping and traceroute to test reachability and report delivery errors, not to query interface bandwidth and error counters."
      ]
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
      "domain": "Network Operations",
      "whyWrong": [
        "A logical network diagram maps Layer 3 IP subnets, VLAN IDs, and routing flows rather than physical rack locations, patch panel ports, and cable types.",
        "",
        "An SOP is a step-by-step written instruction document for performing a repeatable operational task, not a visual diagram of hardware cabling.",
        "An asset register is a tabular inventory tracking serial numbers, purchase dates, and owners of equipment, without illustrating how ports and cables are interconnected."
      ]
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
      "domain": "Network Operations",
      "whyWrong": [
        "Incident response reacts to an active security breach or unplanned outage, whereas scheduling a planned firmware upgrade in a maintenance window is change management.",
        "",
        "Disaster recovery restores critical IT infrastructure after a catastrophic outage, not during a routine, pre-scheduled firmware maintenance window.",
        "Business continuity keeps essential business operations functioning during an unplanned disruption, rather than governing planned Sunday-morning switch updates."
      ]
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
      "domain": "Network Operations",
      "whyWrong": [
        "Mean Time to Repair (MTTR) measures how long it takes to fix or replace a failed device after it breaks, not how long a repairable device runs between failures.",
        "",
        "Recovery Point Objective (RPO) defines the maximum tolerable data loss measured in time (backup frequency), not hardware longevity.",
        "Recovery Time Objective (RTO) is the maximum acceptable downtime to restore a service after an outage, not a hardware reliability metric."
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
      "domain": "Network Security",
      "whyWrong": [
        "",
        "Port security restricts access based on the number or list of MAC addresses on a port, but it does not specifically watch for Spanning Tree BPDUs to stop STP topology changes.",
        "DHCP Snooping blocks rogue DHCP Offer/Ack messages on untrusted ports; it does not inspect Layer 2 Spanning Tree frames from an unauthorized switch.",
        "Dynamic ARP Inspection (DAI) validates ARP packets against the DHCP Snooping binding table to prevent ARP poisoning, not rogue switch loops."
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
      "domain": "Network Security",
      "whyWrong": [
        "",
        "TACACS+ is designed for administrative device access (like SSH into routers) with full command authorization, whereas 802.1X/WPA2-Enterprise wireless access points require RADIUS.",
        "Kerberos uses tickets for Windows domain authentication, but wireless access points acting as 802.1X authenticators speak RADIUS to the AAA server, not raw Kerberos.",
        "LDAP queries directory services like Active Directory; the RADIUS server may query AD via LDAP in the background, but the access point itself talks to the AAA server using RADIUS."
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
      "domain": "Network Security",
      "whyWrong": [
        "An Intrusion Detection System (IDS) sits out-of-band on a SPAN/TAP port to monitor traffic copies and raise alerts; it cannot actively drop malicious inline packets.",
        "",
        "A Syslog server passively collects and stores log messages sent from network devices; it does not sit inline or inspect and block live network packets.",
        "A packet sniffer (like Wireshark or tcpdump) captures network frames for human analysis and troubleshooting, without blocking malicious traffic."
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
      "domain": "Network Security",
      "whyWrong": [
        "",
        "Dynamic ARP Inspection blocks spoofed IP-to-MAC ARP replies using the DHCP Snooping binding table, but it does not block the rogue DHCP Offer packets themselves.",
        "Port security limits how many or which MAC addresses can use a switch port; a rogue DHCP server running on a single allowed MAC address will pass right through it.",
        "VLAN tagging (802.1Q) labels frames on trunk links to separate broadcast domains, which does not stop a rogue device inside a VLAN from answering DHCP requests."
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
      "domain": "Network Security",
      "whyWrong": [
        "Stateful inspection tracks connections in a state table so return traffic is allowed; it does not explain why unmatched new traffic is dropped by default.",
        "Stateless inspection filters each packet against static header rules; it is a filtering method, not the default-deny behavior that drops whatever no rule allows.",
        "",
        "Zero Trust is a holistic security architecture requiring continuous verification of every user and device, not a single default-drop firewall rule."
      ]
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
      "domain": "Network Troubleshooting",
      "whyWrong": [
        "A DNS failure prevents resolving domain names to IPs, but it does not cause the OS to fall back to a 169.254.x.x APIPA address during IP configuration.",
        "",
        "A wrong default gateway prevents routing outside the local subnet, but the host would still have its valid IP address rather than a 169.254.x.x APIPA address.",
        "An unplugged Ethernet cable would cause a link-down state with no solid green link light on the NIC."
      ]
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
      "domain": "Network Troubleshooting",
      "whyWrong": [
        "If the transmit (Tx) and receive (Rx) fiber strands were reversed, neither transceiver would see light on its Rx port and the link would not come up at all.",
        "If the two SFP+ ports were set to mismatched speeds without compatible negotiation, the link would remain down rather than passing corrupted frames with CRC errors.",
        "Fiber optic 10G SFP+ connections use separate Tx and Rx strands and operate exclusively at full duplex, so half/full duplex mismatches do not occur.",
        ""
      ]
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
      "domain": "Network Troubleshooting",
      "whyWrong": [
        "If DHCP were failing, the workstations would lack valid IP configurations and could not reach external IP addresses like 8.8.8.8 either.",
        "",
        "Reaching websites by IP address in the browser proves HTTP/HTTPS transport is working; only the name-to-IP lookup before the HTTP request is failing.",
        "ARP resolves the local default gateway's MAC address; if ARP were failing, no traffic could leave the local subnet even when using raw IP addresses."
      ]
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
      "domain": "Network Troubleshooting",
      "whyWrong": [
        "ping only measures end-to-end reachability and round-trip time to the final destination without revealing which intermediate router hop is introducing latency or packet loss.",
        "ipconfig displays the local host's IP address, subnet mask, and default gateway; it does not send probe packets across the network path.",
        "",
        "netstat lists active TCP/UDP sockets and local routing tables on the host rather than testing per-hop latency along a remote path."
      ]
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
      "domain": "Network Troubleshooting",
      "whyWrong": [
        "A routing loop is a Layer 3 issue where routers circulate packets endlessly due to inconsistent routing tables, not a Layer 2 trunk tagging discrepancy.",
        "",
        "While CDP/LLDP and STP may log native VLAN inconsistency warnings, the specific configuration error between VLAN 1 and VLAN 99 on the trunk is a Native VLAN mismatch.",
        "A duplex mismatch occurs when one port is set to full duplex and the other to half duplex, causing late collisions rather than untagged frames crossing VLANs."
      ]
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
      "domain": "Networking Concepts",
      "whyWrong": [
        "Wi-Fi 5 (802.11ac) operates only in the 5 GHz band and does not support 2.4 GHz or 6 GHz.",
        "Standard Wi-Fi 6 (802.11ax) operates on 2.4 GHz and 5 GHz only; the 6 GHz spectrum was added specifically in the Wi-Fi 6E extension.",
        "",
        "Wi-Fi 4 (802.11n) is an older standard supporting only 2.4 GHz and 5 GHz, with no 6 GHz capability."
      ]
    },
    {
      "q": "A network engineer is connecting a new distribution switch to a core switch using two 10 Gbps fiber links. The connection must carry traffic for VLANs 10, 20, and 30 simultaneously while combining both physical links into a single 20 Gbps logical channel with active negotiation. Which protocols must the engineer configure on the switch interfaces? (Choose TWO.)",
      "opts": [
        "IEEE 802.1Q",
        "IEEE 802.3ad (LACP)",
        "IEEE 802.1X",
        "IEEE 802.1D (STP)",
        "IEEE 802.3af (PoE)"
      ],
      "ans": [
        0,
        1
      ],
      "domain": "Network Implementation",
      "exp": "IEEE 802.1Q is the standard trunking protocol that tags Ethernet frames so multiple VLANs (10, 20, and 30) can traverse the same link. IEEE 802.3ad (Link Aggregation Control Protocol / LACP) dynamically negotiates and bundles the two 10 Gbps physical interfaces into a single 20 Gbps logical port channel.",
      "whyWrong": [
        "",
        "",
        "IEEE 802.1X provides port-based network access control (NAC) authentication for clients, not VLAN trunking or link aggregation.",
        "IEEE 802.1D (Spanning Tree Protocol) prevents Layer 2 loops by blocking redundant links rather than combining them into a 20 Gbps logical channel.",
        "IEEE 802.3af delivers Power over Ethernet (up to 15.4W) over copper twisted-pair cabling, which does not apply to fiber links or link aggregation."
      ]
    },
    {
      "q": "After a penetration test, the security team reports that an attacker plugged a laptop into a conference room wall jack, handed out fake default gateway addresses to nearby clients, and also poisoned the ARP caches of existing hosts on the subnet to intercept traffic. Which two switch features must be enabled together on the access switch to block BOTH attack vectors? (Choose TWO.)",
      "opts": [
        "DHCP Snooping",
        "Dynamic ARP Inspection (DAI)",
        "BPDU Guard",
        "802.1Q VLAN Trunking",
        "Spanning Tree Root Guard"
      ],
      "ans": [
        0,
        1
      ],
      "domain": "Network Security",
      "exp": "DHCP Snooping blocks unauthorized DHCP Offer and ACK messages coming from untrusted access ports (stopping the rogue DHCP server) and builds a trusted IP-to-MAC binding table. Dynamic ARP Inspection (DAI) uses that binding table to validate ARP responses and drop spoofed ARP packets (stopping the ARP poisoning attack).",
      "whyWrong": [
        "",
        "",
        "BPDU Guard disables an access port if it receives Spanning Tree BPDUs from an unauthorized switch, which does not stop a laptop from sending rogue DHCP or ARP packets.",
        "802.1Q VLAN Trunking tags frames across inter-switch trunk links; enabling trunking on a conference room jack would actually increase the risk of VLAN hopping.",
        "Root Guard prevents an unauthorized switch from becoming the STP Root Bridge, which does not inspect or block rogue DHCP offers or spoofed ARP replies."
      ]
    },
    {
      "q": "A network technician is troubleshooting a Windows workstation that cannot load an internal HTTPS web portal at https://portal.corp.local. The technician can ping the portal server's IP address (10.20.30.15), but wants to verify from the Windows command line whether the hostname resolves to 10.20.30.15 and whether the workstation currently has an established TCP session to port 443 on that IP. Which two built-in commands should the technician run? (Choose TWO.)",
      "opts": [
        "nslookup portal.corp.local",
        "netstat -an",
        "ipconfig /flushdns",
        "arp -a",
        "tracert -d 10.20.30.15"
      ],
      "ans": [
        0,
        1
      ],
      "domain": "Network Troubleshooting",
      "exp": "nslookup portal.corp.local queries the configured DNS server to verify whether the FQDN resolves to the expected IP address (10.20.30.15). netstat -an lists all active TCP and UDP connections and listening ports in numeric form, confirming whether a TCP session to 10.20.30.15:443 is established.",
      "whyWrong": [
        "",
        "",
        "ipconfig /flushdns clears the local DNS resolver cache without displaying what IP address portal.corp.local resolves to or showing active TCP connections.",
        "arp -a displays the local Layer 2 IP-to-MAC address cache for the local subnet, not DNS name resolution or Layer 4 TCP port 443 session states.",
        "tracert -d 10.20.30.15 traces Layer 3 ICMP hops to the IP with DNS resolution disabled (-d), neither testing the hostname lookup nor checking TCP port 443 sockets."
      ]
    }
  ],
  "daily": [
    {
      "day": 1,
      "track": "networkplus",
      "concept": "The OSI Model — Walking the 7-Layer Stack",
      "domain": "Networking Concepts",
      "icon": "🥞",
      "color": "#3b82f6",
      "tagline": "Don't guess when the network breaks. Walk the stack.",
      "slides": [
        {
          "title": "What Is the OSI Model?",
          "body": "The <strong>Open Systems Interconnection (OSI)</strong> model divides network communication into seven distinct layers from physical wiring up to the end-user application: <strong>1. Physical</strong> (bits, cables, optics), <strong>2. Data Link</strong> (frames, MAC addresses, switches, VLANs), <strong>3. Network</strong> (packets, IP addresses, routers), <strong>4. Transport</strong> (segments and datagrams, TCP/UDP port numbers), <strong>5. Session</strong>, <strong>6. Presentation</strong>, and <strong>7. Application</strong> (HTTP, DNS, SMTP). Every layer serves the layer above it and relies on the layer below it through <em>encapsulation</em>. In the field, it is your primary troubleshooting checklist.",
          "anchor": "🧱 Layer 1 = Bits, Layer 2 = Frames (MAC), Layer 3 = Packets (IP), Layer 4 = Segments (TCP/UDP)."
        },
        {
          "title": "Symptom-to-Layer Mapping on the Exam",
          "body": "The Network+ exam tests the OSI model by giving you a failure symptom and asking which layer is broken. Unplugged patch cords, damaged fiber, or EMI crosstalk live at <strong>Layer 1</strong>; wrong VLAN tags, MAC spoofing, or STP switching loops live at <strong>Layer 2</strong>; duplicate IP addresses, missing default gateways, or broken OSPF routes live at <strong>Layer 3</strong>; and a firewall blocking TCP port 443 lives at <strong>Layer 4</strong>. If you can ping a server's IP address (Layer 3 works) but a browser gets an HTTP 503 error or DNS fails, your lower layers are healthy and the problem is at <strong>Layer 7</strong>.",
          "anchor": "🎯 If ping works by IP, Layers 1 through 3 are healthy — look at Layer 4 ports or Layer 7 services."
        },
        {
          "title": "Real-World: Mammoth Capital Trading Terminal",
          "body": "Five minutes before market open at Mammoth Capital, a trader's workstation loses connection to the internal order-routing gateway. A junior tech wants to restart the core router, but the senior network engineer walks the OSI stack starting at <strong>Layer 1</strong> and spots an amber port LED with rising CRC errors caused by a crushed Cat6 patch cord under the trader's chair mat. Replacing the patch cable at Layer 1 fixes the outage in sixty seconds without touching a single router config.",
          "anchor": "🔌 Check Layer 1 link lights and physical cables first before reconfiguring Layer 3 routers."
        }
      ],
      "quiz": [
        {
          "q": "After a desk relocation, a user reports no network connectivity and the technician observes that both the link and activity LEDs on the workstation's RJ-45 network port are completely dark. At which layer of the OSI model should the technician begin troubleshooting?",
          "opts": [
            "Layer 1 (Physical)",
            "Layer 2 (Data Link)",
            "Layer 3 (Network)",
            "Layer 7 (Application)"
          ],
          "ans": 0,
          "exp": "Dark link LEDs indicate a lack of electrical or optical carrier signal — an unplugged cable, bad patch cord, or dead switch port — which is a Layer 1 (Physical) issue."
        },
        {
          "q": "A workstation on VLAN 10 (10.1.10.45/24) can communicate with every other computer on VLAN 10, but cannot reach any servers on VLAN 20 (10.1.20.0/24) because its default gateway address is typed incorrectly. At which OSI layer does this misconfiguration exist?",
          "opts": [
            "Layer 1 (Physical)",
            "Layer 2 (Data Link)",
            "Layer 3 (Network)",
            "Layer 5 (Session)"
          ],
          "ans": 2,
          "exp": "Local communication within VLAN 10 uses Layer 2 MAC switching, which works fine. Routing packets across subnets via an IP default gateway operates at Layer 3 (Network)."
        },
        {
          "q": "Mammoth Capital streams real-time market tick data and VoIP audio where low latency is critical and retransmitting a dropped packet seconds later is worse than ignoring it. Which Layer 4 protocol is best suited for this traffic?",
          "opts": [
            "TCP",
            "ICMP",
            "ARP",
            "UDP"
          ],
          "ans": 3,
          "exp": "UDP (User Datagram Protocol) is a connectionless Layer 4 Transport protocol with minimal header overhead and no retransmission delays, ideal for real-time audio, video, and market feeds."
        },
        {
          "q": "As data travels down the OSI stack on a sending host, Layer 2 encapsulates the Layer 3 packet with a header containing source and destination MAC addresses and a trailer with a Frame Check Sequence (FCS). What is the Protocol Data Unit (PDU) at Layer 2 called?",
          "opts": [
            "Segment",
            "Frame",
            "Packet",
            "Bit"
          ],
          "ans": 1,
          "exp": "The PDU at Layer 2 (Data Link) is a Frame. Layer 1 uses Bits, Layer 3 uses Packets, and Layer 4 uses Segments (TCP) or Datagrams (UDP)."
        },
        {
          "q": "A network engineer verifies that a client can ping an internal web server's IP address and complete a TCP three-way handshake on port 443, but the user's browser displays 'HTTP 503 Service Unavailable.' At which OSI layer is the failure occurring?",
          "opts": [
            "Layer 2 (Data Link)",
            "Layer 3 (Network)",
            "Layer 7 (Application)",
            "Layer 4 (Transport)"
          ],
          "ans": 2,
          "exp": "A successful ping confirms Layers 1–3, and a completed TCP handshake on port 443 confirms Layer 4. An HTTP 503 status code comes from the web application service itself at Layer 7 (Application)."
        }
      ]
    },
    {
      "day": 2,
      "track": "networkplus",
      "concept": "Routing & Switching — VLANs, Trunks, STP & OSPF",
      "domain": "Network Implementation",
      "icon": "🔀",
      "color": "#3b82f6",
      "tagline": "Switches build neighborhoods; routers connect cities.",
      "slides": [
        {
          "title": "Layer 2 Switching: VLANs, 802.1Q, STP, and LACP",
          "body": "Managed switches operate at Layer 2 using MAC address tables and let you carve one physical switch into multiple isolated broadcast domains using <strong>VLANs</strong>. To carry multiple VLANs between switches over a single cable, you configure an <strong>802.1Q trunk port</strong> that tags each frame with its VLAN ID (except the untagged <em>Native VLAN</em>, which must match on both ends). Meanwhile, <strong>Spanning Tree Protocol (STP / 802.1D)</strong> and <strong>Rapid STP (802.1w)</strong> automatically block redundant paths to prevent broadcast storms, while <strong>LACP (802.3ad)</strong> bundles multiple physical links into one high-bandwidth logical channel.",
          "anchor": "🏷️ Access ports carry one untagged VLAN to an endpoint; 802.1Q trunk ports carry tagged VLANs between switches."
        },
        {
          "title": "Layer 3 Routing: ARP, OSPF, and BGP",
          "body": "Because VLANs isolate broadcast domains, traffic moving between VLANs requires a Layer 3 device — a router or Layer 3 switch performing <strong>inter-VLAN routing</strong>. Within a local subnet, hosts use <strong>ARP</strong> to resolve a known IPv4 address to a destination MAC address. Across networks, <strong>OSPF</strong> is a fast link-state Interior Gateway Protocol (IGP) that uses Dijkstra's shortest-path algorithm inside an organization, while <strong>BGP</strong> is the path-vector Exterior Gateway Protocol (EGP) that routes traffic between autonomous systems across the global internet.",
          "anchor": "🗺️ OSPF routes inside your enterprise (IGP); BGP routes between ISPs and autonomous systems (EGP)."
        },
        {
          "title": "Real-World: Surviving a Cable Loop at Mammoth Capital",
          "body": "During a trading floor expansion at Mammoth Capital, a contractor accidentally plugs both ends of a patch cable into two ports on the distribution switch while connecting a new access switch. Because <strong>Rapid Spanning Tree Protocol (RSTP / 802.1w)</strong> is enabled across the switching fabric, the switch immediately detects its own BPDUs and places the redundant port into a blocking state in milliseconds. The contractor's mistake logs a clean warning instead of triggering a Layer 2 broadcast storm that would halt trading.",
          "anchor": "🛡️ Without STP, a single looped patch cable turns a broadcast frame into an infinite network meltdown."
        }
      ],
      "quiz": [
        {
          "q": "A network engineer connects an access switch on the second floor to the core switch in the data center using a single fiber uplink. Traffic for VLAN 10 (Voice), VLAN 20 (Data), and VLAN 30 (Guest) must all traverse this single fiber link while remaining logically isolated. How should the uplink ports on both switches be configured?",
          "opts": [
            "As untagged access ports assigned to VLAN 1",
            "As IEEE 802.1Q trunk ports permitting VLANs 10, 20, and 30",
            "As half-duplex ports with Spanning Tree disabled",
            "As port-mirroring (SPAN) destination ports"
          ],
          "ans": 1,
          "exp": "An IEEE 802.1Q trunk port inserts a 4-byte VLAN tag into Ethernet frames, allowing multiple VLANs to cross a single physical link between switches while maintaining broadcast isolation."
        },
        {
          "q": "Two workstations are plugged into adjacent ports on the same Layer 2 switch. Workstation A is in VLAN 100 (192.168.100.10/24) and Workstation B is in VLAN 200 (192.168.200.10/24). What is required for Workstation A to send packets to Workstation B?",
          "opts": [
            "A Layer 3 router or Layer 3 switch configured for inter-VLAN routing",
            "A crossover Ethernet cable between the two workstations",
            "Enabling LACP link aggregation on the two workstation ports",
            "Disabling ARP on both workstations"
          ],
          "ans": 0,
          "exp": "VLANs are separate Layer 2 broadcast domains and separate Layer 3 subnets. Traffic between different VLANs must pass through a Layer 3 routing interface (either a router-on-a-stick or Layer 3 switch SVIs)."
        },
        {
          "q": "An administrator wants to combine four physical 10 Gbps ports between two distribution switches into a single 40 Gbps logical channel that balances traffic and survives the failure of any single cable. Which standard protocol accomplishes this?",
          "opts": [
            "802.1Q",
            "802.1X",
            "802.1D (STP)",
            "802.3ad (LACP)"
          ],
          "ans": 3,
          "exp": "Link Aggregation Control Protocol (LACP / IEEE 802.3ad) bundles multiple physical interfaces into a single logical Port-Channel (LAG) for higher throughput and link redundancy without STP blocking the links."
        },
        {
          "q": "Which dynamic routing protocol is an open-standard link-state Interior Gateway Protocol (IGP) that calculates the best path using interface cost and organizes large networks around a backbone Area 0?",
          "opts": [
            "BGP",
            "RIPv2",
            "OSPF",
            "EIGRP"
          ],
          "ans": 2,
          "exp": "Open Shortest Path First (OSPF) is a vendor-neutral link-state IGP that uses cost (derived from bandwidth) and hierarchical areas connected to Area 0."
        },
        {
          "q": "During a maintenance window, an engineer swaps out a failed firewall router with a replacement appliance configured with the exact same IPv4 address (10.0.0.1). For the next two minutes, several internal servers cannot reach the internet until their local caches refresh. Why did this temporary outage occur?",
          "opts": [
            "The DNS root servers needed to update the local subnet mask",
            "The internal servers' ARP caches still mapped 10.0.0.1 to the old router's MAC address",
            "Spanning Tree disabled the servers' hard drives",
            "OSPF Area 0 changed the servers' TCP port numbers"
          ],
          "ans": 1,
          "exp": "Hosts cache IP-to-MAC mappings in their local ARP table. Until the old ARP entry expires or a gratuitous ARP updates it, frames sent to 10.0.0.1 are addressed to the old hardware's MAC address."
        }
      ]
    },
    {
      "day": 3,
      "track": "networkplus",
      "concept": "Network Operations — SNMP, Syslog, Baselines & Uptime",
      "domain": "Network Operations",
      "icon": "📊",
      "color": "#3b82f6",
      "tagline": "If you don't know normal, you won't spot an outage.",
      "slides": [
        {
          "title": "Monitoring with SNMP, Syslog, and NTP",
          "body": "Network Operations Centers (NOCs) rely on three foundational protocols to observe infrastructure health: <strong>SNMP</strong>, <strong>Syslog</strong>, and <strong>NTP</strong>. In SNMP, a central manager polls device agents over <strong>UDP port 161</strong> to query structured metrics in the <strong>MIB (Management Information Base)</strong>, while agents send unsolicited alert <em>Traps</em> over <strong>UDP port 162</strong> (always use <strong>SNMPv3</strong> for encryption and authentication). Meanwhile, <strong>Syslog (UDP port 514)</strong> streams timestamped event logs to a central collector, and <strong>NTP (UDP port 123)</strong> keeps every device's clock synchronized so log timelines actually match.",
          "anchor": "⏱️ SNMP polls metrics (161/162), Syslog pushes events (514), and NTP syncs the clocks (123)."
        },
        {
          "title": "Documentation, Baselines, and Availability Metrics",
          "body": "Good documentation separates a professional network from guesswork: <strong>physical diagrams</strong> map racks, patch panels, and cable runs, while <strong>logical diagrams</strong> map subnets, VLAN IDs, and routing protocols, and a <strong>performance baseline</strong> captures what normal traffic looks like. On the exam, know your reliability and recovery metrics cold: <strong>MTBF</strong> (Mean Time Between Failures) measures reliability, while <strong>MTTR</strong> (Mean Time To Repair) measures how fast you fix an outage. For disaster recovery, <strong>RPO (Recovery Point Objective)</strong> defines how much data loss you can tolerate in time, and <strong>RTO (Recovery Time Objective)</strong> defines how long systems can stay down.",
          "anchor": "📐 RPO = how much data you can lose (backup frequency); RTO = how long you can be down (failover speed)."
        },
        {
          "title": "Real-World: Gateway Redundancy at Mammoth Capital",
          "body": "If Mammoth Capital's single edge router fails during market hours, workstations pointed at default gateway 10.10.1.1 would lose connectivity even if a backup router sits in the next rack. The network team deploys a pair of routers running a <strong>First Hop Redundancy Protocol (FHRP)</strong> like VRRP or HSRP, sharing a single <strong>Virtual IP (VIP)</strong> at 10.10.1.1 while physical routers hold 10.10.1.2 and 10.10.1.3. When the active router drops during a power supply test, the standby takes over the VIP in sub-seconds, and simultaneously emits an <strong>SNMPv3 Trap</strong> and a <strong>Syslog</strong> alert to the NOC.",
          "anchor": "🔄 FHRP (VRRP/HSRP) gives two physical routers one shared Virtual IP so the default gateway never dies."
        }
      ],
      "quiz": [
        {
          "q": "A penetration tester captures management VLAN traffic and discovers that router polling requests contain readable plaintext community strings such as 'public' and 'private.' How should the network engineer remediate this vulnerability?",
          "opts": [
            "Change the SNMP polling port from UDP 161 to TCP 80",
            "Replace SNMP with DHCP Snooping on all routers",
            "Disable NTP synchronization on the management VLAN",
            "Upgrade all monitored devices from SNMPv1/v2c to SNMPv3 with authentication and encryption"
          ],
          "ans": 3,
          "exp": "SNMPv1 and SNMPv2c transmit community strings in cleartext. SNMPv3 replaces plaintext community strings with authenticated and encrypted communication."
        },
        {
          "q": "While investigating a security breach across three switches and a firewall, a SOC analyst notices that the Syslog timestamps from the switches are 22 minutes behind the firewall's logs, making it impossible to reconstruct the exact attack timeline. Which service should be configured across all network devices?",
          "opts": [
            "SNMP Traps on UDP port 162",
            "Network Time Protocol (NTP) on UDP port 123",
            "Dynamic Host Configuration Protocol (DHCP) on UDP port 67",
            "Simple Mail Transfer Protocol (SMTP) on TCP port 25"
          ],
          "ans": 1,
          "exp": "NTP (UDP port 123) synchronizes device clocks against a reference time source so that Syslog entries and audit trails across different devices share an accurate, unified timeline."
        },
        {
          "q": "Mammoth Capital's business continuity plan states that if the primary portfolio database fails, the firm cannot lose more than 5 minutes of committed transactions, and the database service must be back online within 30 minutes. Which metrics do '5 minutes' and '30 minutes' represent?",
          "opts": [
            "RPO = 5 minutes; RTO = 30 minutes",
            "RTO = 5 minutes; RPO = 30 minutes",
            "MTBF = 5 minutes; MTTR = 30 minutes",
            "SLA = 5 minutes; MIB = 30 minutes"
          ],
          "ans": 0,
          "exp": "Recovery Point Objective (RPO) measures the maximum acceptable age of lost data (5 minutes of transactions), while Recovery Time Objective (RTO) measures the maximum acceptable downtime duration (30 minutes)."
        },
        {
          "q": "A new network administrator wants to understand how traffic is segmented and routed between departments. Which document shows IPv4 CIDR blocks, VLAN IDs, firewall zones, and OSPF routing areas rather than physical rack elevations?",
          "opts": [
            "A physical wiring and patch panel schedule",
            "A Safety Data Sheet (SDS)",
            "A logical network diagram",
            "A rack thermal heat map"
          ],
          "ans": 2,
          "exp": "A logical network diagram illustrates how data flows across the network — including subnets, VLANs, IP addressing, and routing protocols — whereas a physical diagram shows racks, ports, and cable runs."
        },
        {
          "q": "An enterprise deploys two core routers at the edge of its LAN and wants all internal hosts to configure a single default gateway IP address (10.1.0.1) that automatically fails over to the standby router if the primary router fails. What protocol provides this shared Virtual IP?",
          "opts": [
            "Spanning Tree Protocol (STP)",
            "Link Layer Discovery Protocol (LLDP)",
            "Domain Name System (DNS)",
            "A First Hop Redundancy Protocol (FHRP) such as VRRP or HSRP"
          ],
          "ans": 3,
          "exp": "First Hop Redundancy Protocols (such as vendor-neutral VRRP or Cisco HSRP) allow two or more routers to share a Virtual IP (VIP) and virtual MAC address for seamless default gateway failover."
        }
      ]
    },
    {
      "day": 4,
      "track": "networkplus",
      "concept": "Network Security — Layer 2 Defenses, AAA, IPS & VPNs",
      "domain": "Network Security",
      "icon": "🛡️",
      "color": "#3b82f6",
      "tagline": "Lock the switch ports first, then guard the perimeter.",
      "slides": [
        {
          "title": "Layer 2 Switch Hardening",
          "body": "Perimeter firewalls cannot stop an attacker who plugs directly into an unhardened wall jack inside the building. At Layer 2, you lock down access switches with a four-part defense: <strong>Port Security</strong> limits which MAC addresses can use a port (and shuts the port down on violation), <strong>DHCP Snooping</strong> blocks rogue DHCP servers on untrusted ports, <strong>Dynamic ARP Inspection (DAI)</strong> uses the DHCP Snooping binding table to drop spoofed ARP replies, and <strong>BPDU Guard</strong> immediately disables any access port that receives Spanning Tree BPDUs from an unauthorized switch.",
          "anchor": "🔒 Port Security stops rogue MACs; DHCP Snooping stops rogue DHCP; DAI stops ARP poisoning; BPDU Guard stops rogue switches."
        },
        {
          "title": "802.1X, AAA, IDS vs. IPS, and VPNs",
          "body": "For identity-based access control, <strong>IEEE 802.1X (NAC)</strong> blocks a switch port or enterprise Wi-Fi connection until a supplicant authenticates against a central <strong>RADIUS</strong> or <strong>TACACS+</strong> AAA server. At the network edge, a firewall filters traffic by rules (ending in an <strong>implicit deny</strong>), an out-of-band <strong>IDS</strong> passively alerts on attack signatures, and an inline <strong>IPS</strong> actively drops malicious packets in real time. For encrypted traffic over untrusted networks, <strong>IPsec</strong> (using <strong>ESP</strong> for encryption) handles Layer 3 site-to-site VPNs, while <strong>TLS/SSL VPNs</strong> commonly handle remote-access laptop clients.",
          "anchor": "⚔️ IDS watches and alerts from the sideline; IPS sits inline and drops the attack packet."
        },
        {
          "title": "Real-World: Rogue Device on the Trading Floor",
          "body": "A vendor visiting Mammoth Capital unplugs a conference room VoIP phone and plugs his laptop into the wall jack hoping to sniff local subnet traffic. Because the switch port is hardened with <strong>802.1X</strong> and <strong>sticky MAC port security</strong>, the port immediately rejects the unrecognized MAC address, transitions into an <em>err-disabled</em> state, and fires an alert to the SOC. Even if the vendor had brought a pocket travel router, <strong>DHCP Snooping</strong> and <strong>BPDU Guard</strong> would have prevented it from handing out rogue IPs or altering the Spanning Tree topology.",
          "anchor": "🚫 An unused wall jack should be administratively shut down or assigned to a dead-end parking VLAN."
        }
      ],
      "quiz": [
        {
          "q": "An attacker connected to the office LAN broadcasts forged ARP replies claiming the attacker's MAC address is the default gateway IP, attempting an on-path (man-in-the-middle) interception. Which switch feature checks ARP packets against a trusted IP-to-MAC binding database and drops the forged packets?",
          "opts": [
            "BPDU Guard",
            "Port Mirroring (SPAN)",
            "Dynamic ARP Inspection (DAI)",
            "802.1Q VLAN Tagging"
          ],
          "ans": 2,
          "exp": "Dynamic ARP Inspection (DAI) intercepts ARP packets on untrusted ports and validates them against the trusted DHCP Snooping binding table, dropping spoofed ARP responses."
        },
        {
          "q": "A security architect requires that any laptop plugged into a conference room wall jack must authenticate with a digital certificate against a central RADIUS server before the switch port allows any LAN traffic. Which standard enforces this port-based Network Access Control?",
          "opts": [
            "IEEE 802.1X",
            "IEEE 802.1Q",
            "IEEE 802.3af (PoE)",
            "IEEE 802.1w (RSTP)"
          ],
          "ans": 0,
          "exp": "IEEE 802.1X provides port-based Network Access Control (NAC), blocking all non-authentication traffic on a switch port or wireless AP until the supplicant is verified by the AAA/RADIUS server."
        },
        {
          "q": "Mammoth Capital places a network security appliance directly in the physical traffic path behind its border router so that packets matching known exploit signatures are dropped before reaching internal web servers. What type of system is this?",
          "opts": [
            "A passive Intrusion Detection System (IDS) on a tap port",
            "An inline Intrusion Prevention System (IPS)",
            "A Syslog collector",
            "An authoritative DNS forwarder"
          ],
          "ans": 1,
          "exp": "An Intrusion Prevention System (IPS) sits inline in the traffic path and actively drops malicious packets, whereas an IDS sits out-of-band on a SPAN/tap port and only generates alerts."
        },
        {
          "q": "A network engineer is hardening a new managed switch before deploying it into production. Along with changing default passwords and shutting down unused physical ports, which configuration best secures remote command-line administration?",
          "opts": [
            "Enable Telnet on port 23 and allow access from 0.0.0.0/0",
            "Enable TFTP on UDP port 69 for unauthenticated configuration backups",
            "Place the switch management IP on the guest Wi-Fi VLAN",
            "Disable Telnet and enable SSHv2 on port 22 restricted to a dedicated management VLAN"
          ],
          "ans": 3,
          "exp": "Telnet sends credentials and commands in plaintext over port 23. Hardening requires disabling Telnet, enabling encrypted SSH (port 22), and restricting management access to an isolated management VLAN."
        },
        {
          "q": "When configuring an IPsec site-to-site VPN tunnel between Mammoth Capital's New York and London offices, which IPsec protocol must be selected to ensure the packet payload is encrypted for confidentiality?",
          "opts": [
            "Authentication Header (AH)",
            "Generic Routing Encapsulation (GRE) without IPsec",
            "Encapsulating Security Payload (ESP)",
            "Point-to-Point Protocol (PPP)"
          ],
          "ans": 2,
          "exp": "Encapsulating Security Payload (ESP) provides both payload encryption (confidentiality) and authentication/integrity. Authentication Header (AH) provides integrity and authentication only, with no encryption."
        }
      ]
    },
    {
      "day": 5,
      "track": "networkplus",
      "concept": "CLI Diagnostics — Ping, Traceroute, DNS & Physical Faults",
      "domain": "Network Troubleshooting",
      "icon": "💻",
      "color": "#3b82f6",
      "tagline": "The GUI lies; the command line tells you where it died.",
      "slides": [
        {
          "title": "The Essential CLI Toolkit",
          "body": "When a network breaks, six CLI commands give you immediate ground truth: <strong>ipconfig / ifconfig / ip addr</strong> checks local IP, subnet mask, gateway, and MAC address; <strong>ping</strong> tests ICMP reachability and round-trip latency; <strong>tracert / traceroute</strong> maps every Layer 3 router hop along a path; <strong>nslookup / dig</strong> queries DNS servers directly; <strong>arp -a</strong> inspects the IP-to-MAC translation table; and <strong>netstat</strong> lists active TCP/UDP connections and listening ports. Always start local and work outward: verify your own IP first, ping the default gateway second, ping a remote IP third, and test DNS resolution last.",
          "anchor": "🩺 Local IP → Default Gateway → Remote IP → DNS Name: the four-step CLI diagnostic ladder."
        },
        {
          "title": "Reading the Output and Physical Layer Clues",
          "body": "The Network+ exam tests whether you can interpret subtle differences in command output and interface counters. In <em>ping</em>, <strong>Request timed out</strong> means a route exists but no reply came back (often a firewall dropping ICMP or a down remote host), whereas <strong>Destination host unreachable</strong> means a router has no route to the destination network or ARP failed locally. On physical links, high <strong>CRC errors / FCS errors</strong> point to EMI, a bad cable, or dirty fiber connectors; a <strong>duplex mismatch</strong> (one side full-duplex, the other half-duplex) causes late collisions and asymmetrically slow throughput; and a <strong>169.254.x.x</strong> address points to DHCP failure or a wrong VLAN on the switch port.",
          "anchor": "⚠️ Ping works by IP but fails by hostname = DNS issue (test with nslookup or dig)."
        },
        {
          "title": "Real-World: Pinpointing a Black Hole at Mammoth Capital",
          "body": "Traders at Mammoth Capital's Chicago branch report they can access local file servers but cannot reach the New York market feed server at 10.50.10.20. The on-call engineer runs <strong>ipconfig</strong> (valid IP and gateway), pings the local gateway (1 ms reply), and then runs <strong>tracert 10.50.10.20</strong>, which shows clean 2 ms hops to the Chicago WAN router followed by asterisks (* * *) at the MPLS provider handoff. Armed with the exact failing hop IP from <em>tracert</em>, the engineer opens a carrier ticket with proof that packets are dying at the provider edge rather than wasting hours checking internal switches.",
          "anchor": "🗺️ Ping tells you THAT the path is broken; traceroute tells you WHICH hop broke it."
        }
      ],
      "quiz": [
        {
          "q": "After replacing a patch cord and manually configuring an access switch port, a user complains that large file uploads are painfully slow even though the link light is green. Checking the switch interface counters reveals hundreds of late collisions. What is the MOST likely cause?",
          "opts": [
            "The DNS server cache is poisoned",
            "A duplex mismatch between the switch port and the workstation NIC (one set to full-duplex, the other to half-duplex)",
            "The workstation's default gateway is set to 127.0.0.1",
            "An expired SSL certificate on the file server"
          ],
          "ans": 1,
          "exp": "Late collisions and severe throughput degradation on a working copper link are classic symptoms of a duplex mismatch, where the full-duplex side transmits without waiting while the half-duplex side expects CSMA/CD."
        },
        {
          "q": "A developer reports that her workstation cannot connect to 'repo.internal.mammoth.local'. A technician opens a terminal and successfully pings the repository server's IP address (10.20.30.15), but pinging the hostname fails. Which command should the technician run NEXT to diagnose the issue?",
          "opts": [
            "arp -d *",
            "netstat -rn",
            "tracert 10.20.30.15",
            "nslookup repo.internal.mammoth.local"
          ],
          "ans": 3,
          "exp": "Since IP connectivity to 10.20.30.15 works, Layers 1–3 are healthy and the issue is name resolution. Running nslookup (or dig) queries the DNS server directly to see if the A record is missing or the DNS server is unreachable."
        },
        {
          "q": "A system administrator suspects that a compromised workstation has a rogue service listening on an unusual TCP port and maintaining an outbound connection to an unknown external IP. Which command-line tool displays active TCP connections and listening ports on the host?",
          "opts": [
            "ping",
            "nslookup",
            "netstat",
            "ipconfig /release"
          ],
          "ans": 2,
          "exp": "The netstat (or ss on Linux) utility displays active incoming and outgoing network connections, listening TCP/UDP ports, and the processes associated with each socket."
        },
        {
          "q": "A technician runs 'ping 172.16.50.10' from a workstation (10.1.1.25) and immediately receives 'Reply from 10.1.1.1: Destination net unreachable' (where 10.1.1.1 is the local router). What does this output tell the technician?",
          "opts": [
            "The local router (10.1.1.1) has no route in its routing table for the 172.16.50.0 network",
            "The workstation's Ethernet cable is unplugged",
            "The remote host (172.16.50.10) is blocking ICMP Echo Requests with a host firewall",
            "The workstation failed to obtain an IP address from DHCP"
          ],
          "ans": 0,
          "exp": "When a router returns 'Destination net unreachable,' it means the packet reached the router at 10.1.1.1, but that router lacks a matching route to forward the packet toward the destination network."
        },
        {
          "q": "A field technician terminates a new Cat6 cable run between a patch panel and a wall jack using RJ-45 keystone jacks, but a laptop plugged into the wall jack shows a link speed of only 100 Mbps instead of 1 Gbps. Which tool should the technician attach to both ends of the cable to check if one of the eight internal wires is open, shorted, or crossed?",
          "opts": [
            "A Wi-Fi spectrum analyzer",
            "A cable continuity and wire map tester",
            "An optical power meter",
            "A protocol analyzer (Wireshark)"
          ],
          "ans": 1,
          "exp": "1000BASE-T (1 Gbps) requires all four wire pairs (all 8 pins), whereas 100BASE-TX only requires two pairs (pins 1, 2, 3, and 6). A continuity/wire map tester checks all 8 pins end-to-end for opens, shorts, or split pairs."
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
