/* Mammoth Academy — Course Pack */
/* Auto-loaded by course-loader.js */

var COURSE_COMPTIA_CLOUDPLUS = {
  "meta": {
    "id": "comptia-cloudplus",
    "name": "CompTIA Cloud+",
    "subtitle": "CV0-004",
    "icon": "☁️",
    "color": "#8b5cf6",
    "examKey": "cloudplus",
    "flashcardCat": "CompTIA Cloud+",
    "dailyTrackKey": "cloudplus",
    "domains": {
      "Cloud Architecture": "Cloud Architecture & Design",
      "Deployment": "Infrastructure as Code (IaC) & Cloud Operations",
      "Security": "Security & Compliance in the Cloud",
      "Operations": "Operations, Support, and FinOps",
      "Troubleshooting": "Troubleshooting Cloud Environments"
    },
    "version": "1.0.0",
    "category": "CompTIA"
  },
  "modules": [
    {
      "title": "Infrastructure as Code (IaC) & Cloud Operations",
      "topics": [
        {
          "title": "Infrastructure as Code (IaC) & Cloud Operations",
          "prose": "<p>If you are still clicking around in a web UI to deploy servers in 2026, you aren't doing Cloud Engineering; you're doing Cloud Tourism. Enterprise cloud runs on <strong>Infrastructure as Code (IaC)</strong>. Tools like Terraform and AWS CloudFormation allow you to define your entire infrastructure—networks, VMs, databases, firewalls—as text files.</p>\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> Think of IaC as a recipe. If Mammoth Capital needs to stand up a disaster recovery site in Europe because our main trading floor in New York lost power, we don't start manually clicking buttons to build servers. We run a Terraform script, and 5 minutes later, an identical, fully-configured environment spins up in the EU region. It is repeatable, auditable, and immutable.</div>\n\n<p>Cloud+ is about understanding <strong>Deployment, Operations, and Troubleshooting</strong>. It's knowing the difference between elasticity (scaling automatically based on demand) and high availability (ensuring the system stays up when a node dies). It's managing costs so your CTO doesn't have a stroke when the AWS bill arrives, and it's securing the shared responsibility model.</p>\n\n<div class=\"lesson-alert\"><strong>Exam Tip (Cloud+):</strong> “Elasticity” and “scalability” are not the same word on this exam. Scalability is the system's theoretical capacity to grow. Elasticity is that growth happening automatically, in response to real-time demand, and shrinking back down when demand drops. If a scenario mentions “automatically” and “based on load,” the answer is elasticity.</div>",
          "tags": [
            "comptia",
            "cloud-plus",
            "iac"
          ],
          "quiz": [
            {
              "q": "Which cloud computing benefit allows a retail website to automatically add more web servers during a massive Black Friday traffic spike, and remove them when traffic subsides?",
              "opts": [
                "High Availability",
                "Rapid Elasticity",
                "Disaster Recovery",
                "Resource Pooling"
              ],
              "ans": 1,
              "exp": "Rapid elasticity is the ability to automatically scale resources outward or inward dynamically based on real-time demand, ensuring performance without overpaying for idle resources."
            },
            {
              "q": "What is the primary advantage of using Infrastructure as Code (IaC)?",
              "opts": [
                "It eliminates the need for cloud security controls",
                "It allows for consistent, repeatable, and version-controlled infrastructure deployments",
                "It encrypts all data stored in the cloud automatically",
                "It replaces the need for software developers"
              ],
              "ans": 1,
              "exp": "IaC allows administrators to define infrastructure using code, which can be stored in version control (like Git). This ensures deployments are perfectly identical every time, eliminating human error."
            },
            {
              "q": "In an Infrastructure as a Service (IaaS) model, which of the following is the customer responsible for securing?",
              "opts": [
                "The physical data center facilities",
                "The physical server hardware",
                "The virtualization hypervisor",
                "The guest operating system and applications"
              ],
              "ans": 3,
              "exp": "Under the Shared Responsibility Model for IaaS, the cloud provider secures the underlying physical infrastructure and hypervisor, while the customer is responsible for patching and securing the guest OS, applications, and data."
            }
          ]
        }
      ],
      "related": [
        {
          "course": "aws-saa-c03",
          "idx": 11
        },
        {
          "course": "psm-scrum",
          "idx": 2
        }
      ]
    },
    {
      "title": "Cloud Architecture & Design",
      "topics": [
        {
          "title": "Cloud Architecture & Design",
          "prose": "<p>Designing for the cloud means designing for failure. You assume servers will die, zones will flood, and disks will corrupt. You use Auto-Scaling Groups and Load Balancers across multiple Availability Zones to ensure the application survives the infrastructure's death.</p>\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> Designing for the cloud is building trading infrastructure assuming any single server can vanish mid-trade — because on commodity cloud hardware, eventually one will. You don't pray the box stays up; you spread the workload across multiple Availability Zones behind a Load Balancer so one zone's outage is a shrug, not an incident call at 3 AM.</div>\n\n<div class=\"lesson-alert\"><strong>Exam Tip (Cloud+):</strong> When a question describes surviving the loss of an entire data center (not just one server), the answer involves multiple Availability Zones or Regions — a single AZ, no matter how many servers are in it, is still one blast radius.</div>",
          "tags": [
            "comptia",
            "cloud-plus",
            "architecture"
          ],
          "quiz": [
            {
              "q": "What is the purpose of spanning a cloud deployment across multiple Availability Zones (AZs)?",
              "opts": [
                "To decrease latency for users",
                "To increase fault tolerance and high availability",
                "To reduce monthly billing costs",
                "To comply with data sovereignty laws"
              ],
              "ans": 1,
              "exp": "AZs are physically isolated data centers within a region. Deploying across them ensures that if one data center fails, the application stays online via the other AZ."
            },
            {
              "q": "Which database type is best suited for unstructured data and massive horizontal scalability in the cloud?",
              "opts": [
                "Relational Database (SQL)",
                "NoSQL Database",
                "In-Memory Cache",
                "Data Warehouse"
              ],
              "ans": 1,
              "exp": "NoSQL databases (like DynamoDB or MongoDB) are designed for unstructured data and scale horizontally much easier than traditional SQL databases."
            },
            {
              "q": "What architecture pattern uses small, independent services communicating over APIs rather than a single massive codebase?",
              "opts": [
                "Monolithic",
                "Microservices",
                "Client-Server",
                "Mainframe"
              ],
              "ans": 1,
              "exp": "Microservices break an application into modular, independently deployable services, which is ideal for cloud agility and scaling."
            }
          ]
        }
      ],
      "related": [
        {
          "course": "comptia-cloudplus",
          "idx": 2
        },
        {
          "course": "comptia-cloudplus",
          "idx": 3
        }
      ]
    },
    {
      "title": "Security & Compliance in the Cloud",
      "topics": [
        {
          "title": "Security & Compliance in the Cloud",
          "prose": "<p>Security in the cloud is a Shared Responsibility. AWS/Azure secures the hardware; YOU secure the data. If you leave an S3 bucket public and leak 10 million credit cards, the cloud provider will not pay your legal fees.</p>\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> The Shared Responsibility Model is renting an apartment, not owning a house. The landlord (AWS/Azure) guarantees the building won't collapse — wiring, foundation, physical security. Whether YOU lock your own apartment door (IAM policies, encryption, that public S3 bucket) is entirely on you, and the landlord will not reimburse a burglary you enabled by leaving it wide open.</div>\n\n<div class=\"lesson-alert\"><strong>Exam Tip (Cloud+):</strong> “Who patches what” is the exam's favorite Shared Responsibility trap. In IaaS, you patch the guest OS. In PaaS, the provider patches the OS and runtime — you only manage your application and data. Know which service model you're in before answering.</div>",
          "tags": [
            "comptia",
            "cloud-plus",
            "security"
          ],
          "quiz": [
            {
              "q": "Under the Shared Responsibility Model for SaaS, what is the customer responsible for?",
              "opts": [
                "Physical data center security",
                "OS patching",
                "Data and user access management",
                "Network infrastructure"
              ],
              "ans": 2,
              "exp": "In SaaS (Software as a Service), the provider manages almost everything. The customer is only responsible for managing their data and who has access to it (IAM)."
            },
            {
              "q": "Which tool acts as an intermediary between users and cloud services to enforce corporate security policies?",
              "opts": [
                "CASB",
                "WAF",
                "Hypervisor",
                "Load Balancer"
              ],
              "ans": 0,
              "exp": "A Cloud Access Security Broker (CASB) enforces security policies (like DLP and IAM) across multiple cloud platforms."
            },
            {
              "q": "To comply with data residency regulations, a European company must ensure its data never leaves the EU. How is this enforced in the cloud?",
              "opts": [
                "By using strong encryption",
                "By selecting only European Regions for deployment",
                "By using a VPN",
                "By deploying on Edge locations"
              ],
              "ans": 1,
              "exp": "Cloud providers guarantee that data stored in a specific Region (e.g., eu-central-1) will not be moved out of that region without explicit customer action."
            }
          ]
        }
      ],
      "related": [
        {
          "course": "comptia-cloudplus",
          "idx": 3
        },
        {
          "course": "comptia-cloudplus",
          "idx": 4
        }
      ]
    },
    {
      "title": "Operations, Support, and FinOps",
      "topics": [
        {
          "title": "Operations, Support, and FinOps",
          "prose": "<p>Operations is maintaining the machine. Patching VMs, rotating keys, and optimizing costs. FinOps (Cloud Financial Operations) is critical because the cloud is an OpEx (Operational Expenditure) model—if you leave a 64-core VM running all month doing nothing, you still pay thousands for it.</p>\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> An idle 64-core VM is a Proxmox server left running full-tilt in an empty homelab closet 24/7 — except in the cloud, nobody just eats the electricity bill quietly. Every idle hour is an invoice line item, which is why FinOps treats “right-sizing” and “shutting down dev environments at 6 PM” as real engineering work, not busywork.</div>\n\n<div class=\"lesson-alert\"><strong>Exam Tip (Cloud+):</strong> Reserved/committed-use instances save money on predictable, always-on workloads; on-demand pricing is for spiky or short-lived ones. A scenario describing a workload that runs 24/7/365 for three years and asks how to cut costs is pointing straight at reserved capacity, not autoscaling.</div>",
          "tags": [
            "comptia",
            "cloud-plus",
            "operations"
          ],
          "quiz": [
            {
              "q": "What is the primary difference between CapEx and OpEx in cloud computing?",
              "opts": [
                "CapEx is pay-as-you-go; OpEx is upfront investment",
                "CapEx is upfront hardware investment; OpEx is pay-as-you-go monthly billing",
                "CapEx applies to SaaS; OpEx applies to IaaS",
                "There is no difference"
              ],
              "ans": 1,
              "exp": "Capital Expenditure (CapEx) involves buying physical servers upfront. Operational Expenditure (OpEx) is renting cloud resources and paying monthly based on consumption."
            },
            {
              "q": "A company wants to guarantee compute capacity for a database server that will run 24/7 for the next 3 years while receiving a massive billing discount. What should they purchase?",
              "opts": [
                "On-Demand Instances",
                "Spot Instances",
                "Reserved Instances",
                "Dedicated Hosts"
              ],
              "ans": 2,
              "exp": "Reserved Instances (or Savings Plans) provide massive discounts (up to 72%) in exchange for a 1- or 3-year commitment to continuous usage."
            },
            {
              "q": "Which process involves updating the operating system on running cloud instances to fix security vulnerabilities without causing downtime?",
              "opts": [
                "Rolling updates / Patch management",
                "Lift-and-shift",
                "Right-sizing",
                "Auto-scaling"
              ],
              "ans": 0,
              "exp": "A rolling update patches instances one by one (or in batches) behind a load balancer, ensuring zero downtime for the overall application."
            }
          ]
        }
      ],
      "related": [
        {
          "course": "comptia-cloudplus",
          "idx": 4
        },
        {
          "course": "comptia-cloudplus",
          "idx": 0
        }
      ]
    },
    {
      "title": "Troubleshooting Cloud Environments",
      "topics": [
        {
          "title": "Troubleshooting Cloud Environments",
          "prose": "<p>Troubleshooting the cloud usually boils down to three things: IAM (permissions are wrong), Security Groups (firewall is blocking it), or Routing (VPC subnet is misconfigured). If you can't reach the server, it's the network. If you can reach it but get a 403, it's permissions.</p>\n\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> This is the same triage order as diagnosing why you can't SSH into a homelab VM. Can't reach it at all? Check the network path first (Security Group / VPC routing) before assuming the box itself is broken. Reach it but get denied? That's a permissions problem (IAM), not a networking one — don't tear apart firewall rules when the real issue is a policy that never granted the action in the first place.</div>\n\n<div class=\"lesson-alert\"><strong>Exam Tip (Cloud+):</strong> A 403 (Forbidden) response means the network path worked and the request WAS received — that's an IAM/permissions issue, not a connectivity issue. A timeout with no response at all points to Security Groups or routing. The exam expects you to tell these apart from the error code alone.</div>",
          "tags": [
            "comptia",
            "cloud-plus",
            "troubleshooting"
          ],
          "quiz": [
            {
              "q": "A newly deployed EC2 instance in a public subnet cannot be reached from the internet via SSH. What is the MOST likely cause?",
              "opts": [
                "The hypervisor crashed",
                "The Security Group does not allow inbound port 22",
                "The CPU is overutilized",
                "The disk is full"
              ],
              "ans": 1,
              "exp": "If an instance is running but unreachable over a specific port, the Security Group (cloud firewall) or Network ACL is almost certainly blocking the traffic."
            },
            {
              "q": "An application is experiencing latency spikes when querying a cloud-managed database. Monitoring shows the database's Read IOPS are maxed out, but CPU usage is low. What is the BEST solution?",
              "opts": [
                "Upgrade the CPU",
                "Add a Read Replica or scale the storage IOPS",
                "Reboot the database",
                "Implement a WAF"
              ],
              "ans": 1,
              "exp": "If IOPS (disk read/write speed) is the bottleneck, you must provision faster storage or offload read traffic to a Read Replica."
            },
            {
              "q": "An administrator cannot delete an S3 bucket, receiving an 'Access Denied' error, even though they have full Administrator privileges. What is the likely cause?",
              "opts": [
                "The bucket is not empty",
                "The bucket policy explicitly denies deletion",
                "The internet connection dropped",
                "The AWS console is down"
              ],
              "ans": 1,
              "exp": "In AWS, an explicit DENY in a bucket policy overrides any ALLOW permissions granted by IAM policies, even for an Administrator."
            }
          ]
        }
      ],
      "related": [
        {
          "course": "comptia-cloudplus",
          "idx": 0
        },
        {
          "course": "comptia-cloudplus",
          "idx": 1
        }
      ]
    }
  ],
  "flashcards": [
    {
      "id": 3,
      "cat": "CompTIA Cloud+",
      "domain": "Deployment",
      "front": "Infrastructure as Code (IaC)",
      "back": "The process of managing and provisioning computer data centers through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools.",
      "analogy": "Instead of manually building a house brick-by-brick (clicking in a UI), you feed a blueprint into a 3D printer and the house builds itself."
    },
    {
      "id": 401,
      "cat": "CompTIA Cloud+",
      "domain": "Architecture",
      "front": "IaaS vs PaaS vs SaaS",
      "back": "IaaS: You manage OS/Data (AWS EC2). PaaS: You manage App/Data (Heroku). SaaS: You only manage Data (Salesforce).",
      "analogy": "IaaS is leasing a car. PaaS is taking a taxi. SaaS is riding a bus."
    },
    {
      "id": 402,
      "cat": "CompTIA Cloud+",
      "domain": "Architecture",
      "front": "Availability Zones (AZs)",
      "back": "Distinct, physically isolated data centers within a Cloud Region, connected by low-latency links for high availability.",
      "analogy": "Keeping your backup generator in a separate building so one fire doesn't destroy both."
    },
    {
      "id": 403,
      "cat": "CompTIA Cloud+",
      "domain": "Architecture",
      "front": "Rapid Elasticity",
      "back": "The ability to automatically scale cloud resources out/in based on demand (Auto-Scaling).",
      "analogy": "A restaurant that automatically spawns new tables and waiters when a busload of tourists arrives."
    },
    {
      "id": 404,
      "cat": "CompTIA Cloud+",
      "domain": "Deployment",
      "front": "Infrastructure as Code (IaC)",
      "back": "Managing and provisioning cloud infrastructure using machine-readable definition files (e.g., Terraform, CloudFormation).",
      "analogy": "A blueprint that builds the house automatically when you hit 'Enter'."
    },
    {
      "id": 405,
      "cat": "CompTIA Cloud+",
      "domain": "Deployment",
      "front": "Lift and Shift (Re-hosting)",
      "back": "Migrating an application to the cloud exactly as it is, without redesigning its architecture.",
      "analogy": "Picking up your entire physical desk and moving it to a new office building without reorganizing the drawers."
    },
    {
      "id": 406,
      "cat": "CompTIA Cloud+",
      "domain": "Security",
      "front": "Shared Responsibility Model",
      "back": "The provider secures the cloud (hardware, hypervisor). The customer secures what is IN the cloud (data, OS, IAM).",
      "analogy": "The landlord secures the apartment building doors. You are responsible for locking your own apartment door."
    },
    {
      "id": 407,
      "cat": "CompTIA Cloud+",
      "domain": "Security",
      "front": "CloudTrail / Audit Logging",
      "back": "Services that record API calls, tracking exactly who made a change, when, and from what IP address.",
      "analogy": "The security camera footage showing exactly who unlocked the server room door at 2:00 AM."
    },
    {
      "id": 408,
      "cat": "CompTIA Cloud+",
      "domain": "Operations",
      "front": "CapEx vs OpEx",
      "back": "CapEx (Capital Expenditure) is upfront hardware cost. OpEx (Operational Expenditure) is pay-as-you-go cloud billing.",
      "analogy": "CapEx is buying a house with cash. OpEx is renting an apartment month-to-month."
    },
    {
      "id": 409,
      "cat": "CompTIA Cloud+",
      "domain": "Operations",
      "front": "Reserved Instances / Savings Plans",
      "back": "Committing to a specific amount of compute usage for 1 or 3 years in exchange for massive billing discounts.",
      "analogy": "Signing a 3-year lease to get your rent cut in half, instead of paying premium daily rates."
    },
    {
      "id": 410,
      "cat": "CompTIA Cloud+",
      "domain": "Troubleshooting",
      "front": "Security Groups vs NACLs",
      "back": "Security Groups act as stateful firewalls at the Instance/VM level. NACLs act as stateless firewalls at the Subnet level.",
      "analogy": "NACLs are the guard at the neighborhood gate. Security Groups are the locks on your specific front door."
    }
  ],
  "exam": [
    {
      "q": "Your trading firm deploys a new Terraform script that provisions 50 identical web servers to handle market open traffic, then terminates 40 of them an hour later. Which cloud characteristic does this best demonstrate?",
      "opts": [
        "High Availability",
        "Rapid Elasticity",
        "Resource Pooling",
        "Measured Service"
      ],
      "ans": 1,
      "exp": "Rapid Elasticity allows cloud environments to automatically provision (scale out) and de-provision (scale in) resources based on dynamic workload demands.",
      "domain": "Deployment"
    },
    {
      "q": "A technician is setting up a new virtual machine in Proxmox. To ensure the VM can communicate directly with other devices on the physical network as if it were a physical host, which networking mode should be configured?",
      "opts": [
        "NAT (Network Address Translation)",
        "Host-Only",
        "Bridged",
        "Internal"
      ],
      "ans": 2,
      "exp": "Bridged networking allows the VM's virtual network interface to connect directly to the physical network, obtaining its own IP address from the local DHCP server.",
      "domain": "Cloud Architecture"
    },
    {
      "q": "A company is designing a disaster recovery architecture in AWS. They want their secondary site to have a scaled-down version of a fully functional environment that can quickly scale up to handle production traffic if the primary site fails. Which DR strategy is this?",
      "opts": [
        "Backup and Restore",
        "Pilot Light",
        "Warm Standby",
        "Multi-Site Active/Active"
      ],
      "ans": 2,
      "exp": "Warm Standby means a scaled-down version of a fully functional environment is always running in the secondary location. (Pilot Light only keeps core services like DBs running, while web servers are completely off).",
      "domain": "Cloud Architecture"
    },
    {
      "q": "Which metric is used by cloud providers in a Service Level Agreement (SLA) to guarantee the percentage of time a service will be operational and accessible?",
      "opts": [
        "RTO",
        "RPO",
        "Uptime Availability (e.g., 99.99%)",
        "MTTR"
      ],
      "ans": 2,
      "exp": "Uptime Availability, expressed as a percentage (the 'nines'), is the standard metric used in SLAs to guarantee service reliability.",
      "domain": "Operations"
    },
    {
      "q": "A cloud engineer writes a YAML file defining the exact state of a Kubernetes cluster, including pods, services, and ingress rules. The engineer commits this file to a Git repository, which automatically triggers a pipeline to deploy it. What is this practice called?",
      "opts": [
        "Continuous Integration (CI)",
        "GitOps / Infrastructure as Code (IaC)",
        "Serverless Computing",
        "Microservices Architecture"
      ],
      "ans": 1,
      "exp": "GitOps uses Git repositories as the single source of truth to deliver infrastructure as code. Declarative files (like YAML) define the desired state, and automated tools deploy it.",
      "domain": "Deployment"
    },
    {
      "q": "A cloud administrator notices that a web application running on an auto-scaling group of EC2 instances is frequently crashing due to Out of Memory (OOM) errors during peak hours. The instances are t3.micro. What is the BEST long-term solution?",
      "opts": [
        "Vertically scale the instances (e.g., upgrade to t3.medium or large)",
        "Horizontally scale by adding more t3.micro instances",
        "Reboot the instances every hour",
        "Implement a CDN"
      ],
      "ans": 0,
      "exp": "If an individual application process requires more memory than a single instance can provide (causing OOM errors), horizontal scaling won't fix it—each new instance will just crash. The instance type must be vertically scaled to provide more RAM.",
      "domain": "Troubleshooting"
    },
    {
      "q": "A SaaS provider hosts data for multiple distinct enterprise clients within the same underlying database structure. What concept ensures that Client A cannot query or view Client B's data?",
      "opts": [
        "Data at rest encryption",
        "Multitenancy and Logical Isolation",
        "Physical Air-gapping",
        "Hardware Security Modules"
      ],
      "ans": 1,
      "exp": "Multitenancy allows multiple customers (tenants) to share the same physical resources, while logical isolation (enforced via software/database design) ensures their data remains strictly separated.",
      "domain": "Cloud Architecture"
    },
    {
      "q": "A company is migrating its on-premises virtual machines to the cloud by copying the VM images exactly as they are and running them on cloud compute instances without modifying the OS or application architecture. What migration strategy is this?",
      "opts": [
        "Re-platforming",
        "Re-architecting",
        "Lift-and-Shift (Re-hosting)",
        "Repurchasing"
      ],
      "ans": 2,
      "exp": "Lift-and-Shift (Re-hosting) involves migrating applications exactly as they are, without modifying their architecture or code, to quickly move them to the cloud.",
      "domain": "Deployment"
    },
    {
      "q": "A cloud engineer configures a billing alert that triggers an email if the monthly cloud spend exceeds $1,000. Which operational practice does this support?",
      "opts": [
        "Patch Management",
        "Capacity Planning",
        "Cost Management / FinOps",
        "Disaster Recovery"
      ],
      "ans": 2,
      "exp": "Billing alerts and budgets are fundamental tools of Cost Management (FinOps), ensuring cloud resources do not generate unexpected charges.",
      "domain": "Operations"
    },
    {
      "q": "A web application hosted in the cloud is experiencing high latency for users in Europe, while users in the US report excellent performance. The servers are located in the US East region. What is the BEST way to improve performance for European users without deploying a new server cluster in Europe?",
      "opts": [
        "Upgrade the US servers' CPU",
        "Implement a Content Delivery Network (CDN)",
        "Increase the database storage IOPS",
        "Configure a Site-to-Site VPN"
      ],
      "ans": 1,
      "exp": "A CDN caches static assets (images, CSS, JS) at edge locations globally. European users will download these assets from a local European edge node, drastically reducing latency without requiring new application servers.",
      "domain": "Troubleshooting"
    },
    {
      "q": "Which cloud service model provides the consumer with the ability to deploy onto the cloud infrastructure consumer-created or acquired applications created using programming languages, libraries, services, and tools supported by the provider?",
      "opts": [
        "IaaS (Infrastructure as a Service)",
        "PaaS (Platform as a Service)",
        "SaaS (Software as a Service)",
        "BaaS (Backup as a Service)"
      ],
      "ans": 1,
      "exp": "In Platform as a Service (PaaS), the provider manages the underlying infrastructure (servers, network, OS), while the consumer manages the deployed applications and data (e.g., AWS Elastic Beanstalk or Heroku).",
      "domain": "Cloud Architecture"
    },
    {
      "q": "A company requires a highly available block storage volume to attach to an active database server. The volume must survive an instance reboot. Which type of storage should they provision?",
      "opts": [
        "Object Storage (e.g., Amazon S3)",
        "Ephemeral/Instance Store",
        "Persistent Block Storage (e.g., Amazon EBS)",
        "File Storage (e.g., Amazon EFS)"
      ],
      "ans": 2,
      "exp": "Persistent block storage behaves like a physical hard drive attached to a server. It retains data independently of the compute instance's lifecycle (unlike ephemeral storage).",
      "domain": "Deployment"
    },
    {
      "q": "A cloud engineer needs to apply an OS security patch to a fleet of 100 Linux VMs. Rather than logging into each machine individually, they use a configuration management tool to deploy the patch simultaneously. What is this practice called?",
      "opts": [
        "Blue/Green Deployment",
        "Automation and Orchestration",
        "Auto-scaling",
        "Continuous Delivery"
      ],
      "ans": 1,
      "exp": "Automation (scripting a single task) and Orchestration (coordinating multiple automated tasks across a fleet) eliminate manual toil and ensure consistent configuration management.",
      "domain": "Operations"
    },
    {
      "q": "A user complains that they cannot access a cloud-hosted database from their office IP address, but they can access it when they connect via their home network. What is the MOST likely cause?",
      "opts": [
        "The database is offline",
        "The office IP address is blocked by the cloud provider's Security Group / Firewall rules",
        "The user's home network is compromised",
        "The database ran out of storage space"
      ],
      "ans": 1,
      "exp": "If a service is accessible from one IP but not another, the issue is almost always a network access control list (ACL) or security group rule that explicitly blocks or fails to allow the office IP.",
      "domain": "Troubleshooting"
    }
  ],
  "daily": [
    {
      "track": "cloudplus",
      "day": 3,
      "concept": "Cloud+ Review - Day 3",
      "domain": "Cloud+",
      "icon": "☁️",
      "color": "#8b5cf6",
      "tagline": "CompTIA Cloud+ Core Principles",
      "slides": [
        "Welcome to the CompTIA Daily Sprint.",
        "Today we are reviewing core concepts for Cloud+.",
        "Review your flashcards, check the library modules, and prepare for the mini-quiz."
      ],
      "quiz": [
        {
          "q": "Are you ready to crush the Cloud+ exam?",
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
      "track": "cloudplus",
      "day": 7,
      "concept": "Cloud+ Review - Day 7",
      "domain": "Cloud+",
      "icon": "☁️",
      "color": "#8b5cf6",
      "tagline": "CompTIA Cloud+ Core Principles",
      "slides": [
        "Welcome to the CompTIA Daily Sprint.",
        "Today we are reviewing core concepts for Cloud+.",
        "Review your flashcards, check the library modules, and prepare for the mini-quiz."
      ],
      "quiz": [
        {
          "q": "Are you ready to crush the Cloud+ exam?",
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
      "track": "cloudplus",
      "day": 11,
      "concept": "Cloud+ Review - Day 11",
      "domain": "Cloud+",
      "icon": "☁️",
      "color": "#8b5cf6",
      "tagline": "CompTIA Cloud+ Core Principles",
      "slides": [
        "Welcome to the CompTIA Daily Sprint.",
        "Today we are reviewing core concepts for Cloud+.",
        "Review your flashcards, check the library modules, and prepare for the mini-quiz."
      ],
      "quiz": [
        {
          "q": "Are you ready to crush the Cloud+ exam?",
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
      "title": "Level 7: Auto-Healing Cloud Infrastructure",
      "desc": "The primary database server panicked and the web instances are running out of memory. Design a cloud-native architecture that automatically scales compute horizontally and ensures database high availability.",
      "zones": [
        {
          "id": "edge",
          "name": "Network Edge",
          "accepts": [
            "alb",
            "waf"
          ]
        },
        {
          "id": "compute",
          "name": "Compute Tier",
          "accepts": [
            "asg",
            "stateless"
          ]
        },
        {
          "id": "data",
          "name": "Data Tier",
          "accepts": [
            "multiaz",
            "readrep"
          ]
        }
      ],
      "palette": [
        {
          "id": "alb",
          "label": "Application Load Balancer",
          "type": "resource"
        },
        {
          "id": "waf",
          "label": "Web App Firewall",
          "type": "policy"
        },
        {
          "id": "asg",
          "label": "Auto Scaling Group",
          "type": "policy"
        },
        {
          "id": "stateless",
          "label": "Stateless EC2 Instances",
          "type": "resource"
        },
        {
          "id": "multiaz",
          "label": "Multi-AZ RDS (Synchronous)",
          "type": "resource"
        },
        {
          "id": "readrep",
          "label": "RDS Read Replica (Asynchronous)",
          "type": "resource"
        }
      ],
      "dm": {
        "edge": [
          "alb",
          "waf"
        ],
        "compute": [
          "asg",
          "stateless"
        ],
        "data": [
          "multiaz",
          "readrep"
        ]
      },
      "wm": "Excellent. The ALB distributes traffic. Compute must be stateless so the Auto Scaling Group can kill/spawn instances without losing session data. Multi-AZ handles the automated failover, while the Read Replica offloads read-heavy queries to prevent DB exhaustion."
    }
  ],
  "sales": []
};
