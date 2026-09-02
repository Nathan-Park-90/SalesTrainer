const fs = require('fs');

// ═══════════════════════════════════════════════════════════════════
// DAILY FLASH DATA — 13 AWS Core Days + 3 Advanced Days (16 total)
// Each day: 1 concept, 3 slides, 5 micro-quiz questions
// Cycles automatically via localStorage day counter
// ═══════════════════════════════════════════════════════════════════

const daily_lessons = [
  {
    day: 1,
    concept: "IAM — The Gatekeeper",
    domain: "Secure",
    icon: "🔐",
    tagline: "You shall not pass... without the right policy.",
    color: "#ef4444",
    slides: [
      {
        title: "What is IAM?",
        body: "AWS Identity and Access Management (IAM) is the system that controls WHO can do WHAT in your AWS account. Every single API call in AWS is authenticated and authorized by IAM before it executes. There is no bypassing it — it is the front door, the back door, and every window.",
        anchor: "🔑 One Account, One IAM. Every user, service, and application that touches AWS goes through IAM."
      },
      {
        title: "How It Works",
        body: "<strong>Users</strong> are for humans. <strong>Roles</strong> are for services (EC2 instances, Lambda functions). <strong>Groups</strong> bundle users together. <strong>Policies</strong> are JSON documents that say 'this entity can do THIS action on THAT resource.' The golden rule: <em>explicit deny always wins</em>. If any policy denies an action, no other policy can allow it.",
        anchor: "⚠️ Least Privilege: Grant only the exact permissions needed. Never use the root account for day-to-day tasks."
      },
      {
        title: "Real-World: Mammoth Capital",
        body: "Your Lambda function needs to read from an S3 bucket. A junior dev suggests putting the AWS access key in the Lambda environment variables. <strong>This is wrong.</strong> The correct answer: attach an IAM Role to the Lambda function with a policy that allows <code>s3:GetObject</code> on that specific bucket. No credentials stored anywhere. AWS rotates the temporary credentials automatically every 15 minutes.",
        anchor: "🎯 IAM Roles for services, IAM Users for humans. Never hard-code credentials."
      }
    ],
    quiz: [
      { q: "A Lambda function needs to write to DynamoDB. What is the correct way to grant this permission?", opts: ["Store AWS credentials in environment variables", "Attach an IAM Role with a DynamoDB write policy to the Lambda function", "Use root account credentials in the function code", "Create an IAM User and embed the access key in the code"], ans: 1, exp: "IAM Roles are designed for AWS services. The Lambda runtime automatically provides temporary credentials — no keys to rotate, no keys to leak." },
      { q: "You have 50 developers who all need read-only access to S3. What is the cleanest IAM approach?", opts: ["Create 50 individual policies, one per developer", "Attach the policy directly to each user", "Create an IAM Group called 'S3ReadOnly', attach the policy to the group, add all 50 users to it", "Use the root account to grant access"], ans: 2, exp: "IAM Groups let you manage permissions at scale. Attach the policy once to the group; all members inherit it instantly." },
      { q: "An IAM policy explicitly DENIES s3:DeleteObject. A second policy explicitly ALLOWS s3:DeleteObject. What happens when the user tries to delete an S3 object?", opts: ["The ALLOW wins because it's more permissive", "The DENY wins — explicit deny always overrides any ALLOW", "It depends on the order the policies were attached", "The user gets a prompt asking which policy to apply"], ans: 1, exp: "This is a critical exam concept: explicit DENY always wins, regardless of how many ALLOW policies exist. Deny is final." },
      { q: "What is the AWS best practice for the root account?", opts: ["Use it daily for admin tasks since it has full power", "Enable MFA and never use it for day-to-day operations", "Share the credentials with the entire ops team", "Disable it after creating IAM users"], ans: 1, exp: "The root account cannot be restricted by IAM policies. Enable MFA, lock it away, and create an admin IAM user for day-to-day work." },
      { q: "Which IAM entity is specifically designed for AWS services (like EC2 or Lambda) to make API calls?", opts: ["IAM User", "IAM Group", "IAM Role", "IAM Policy"], ans: 2, exp: "IAM Roles are designed for services. When you attach a Role to an EC2 instance, the instance can make AWS API calls automatically without any access keys." }
    ]
  },
  {
    day: 2,
    concept: "VPC — Your Private Data Center",
    domain: "Secure",
    icon: "🏗️",
    tagline: "The internet is a dangerous neighborhood. Build your own block.",
    color: "#f59e0b",
    slides: [
      {
        title: "What is a VPC?",
        body: "A Virtual Private Cloud (VPC) is your own logically isolated section of the AWS cloud. Think of it as building a private network inside AWS — you control the IP address ranges, subnets, routing tables, and gateways. Everything you deploy in AWS lives inside a VPC.",
        anchor: "🏠 VPC = Your datacenter. Subnets = Your VLANs. Route Tables = Your switch/router rules."
      },
      {
        title: "Public vs. Private Subnets",
        body: "<strong>Public Subnet:</strong> Has a route to an Internet Gateway (IGW). Resources here can be reached from the internet (e.g., Load Balancers, Bastion Hosts). <strong>Private Subnet:</strong> No direct route to the internet. Resources here are protected (e.g., RDS databases, application servers). A <strong>NAT Gateway</strong> lets private subnet resources initiate outbound internet connections (for updates) without accepting inbound traffic.",
        anchor: "🛡️ Rule of thumb: Web-facing load balancers go in PUBLIC subnets. Databases and app servers go in PRIVATE subnets."
      },
      {
        title: "Security Layers",
        body: "<strong>Security Groups</strong> are stateful firewalls at the instance level. If you allow inbound port 443, return traffic is automatically allowed — you only write one rule. <strong>Network ACLs (NACLs)</strong> are stateless firewalls at the subnet level. You must explicitly allow both inbound AND outbound for every flow. Security Groups are your first line of defense; NACLs are your blast-radius containment.",
        anchor: "⚔️ Security Groups = instance-level, stateful. NACLs = subnet-level, stateless. Use both for defense in depth."
      }
    ],
    quiz: [
      { q: "Which component allows EC2 instances in a PRIVATE subnet to download software updates from the internet without accepting inbound connections?", opts: ["Internet Gateway", "NAT Gateway", "VPC Peering", "Direct Connect"], ans: 1, exp: "A NAT Gateway (in a public subnet) allows private instances to initiate outbound internet connections. Inbound connections from the internet are not permitted — exactly like pfSense outbound NAT." },
      { q: "Your RDS database should be in which type of subnet?", opts: ["Public subnet with an Internet Gateway", "Private subnet with no internet route", "Any subnet — it doesn't matter", "A dedicated VPC with no subnets"], ans: 1, exp: "Databases should never be directly accessible from the internet. Private subnets have no route to an Internet Gateway, making them invisible to external attackers." },
      { q: "Security Groups are described as 'stateful.' What does this mean?", opts: ["They remember the history of all past connections", "If you allow inbound traffic, the return traffic is automatically allowed without a separate outbound rule", "They apply rules in sequence from top to bottom", "They require manual updates when traffic patterns change"], ans: 1, exp: "Stateful means the firewall tracks connection state. Allow inbound port 443, and the response packets are automatically allowed out — you only need one rule instead of two." },
      { q: "What is the purpose of an Internet Gateway (IGW)?", opts: ["It provides private connectivity from on-premises to AWS", "It allows instances in public subnets to communicate with the internet", "It connects two VPCs together", "It encrypts all traffic leaving the VPC"], ans: 1, exp: "An IGW is attached to a VPC and provides the route between public subnets and the internet. Without an IGW, a VPC is completely isolated." },
      { q: "You need to connect your on-premises datacenter to your VPC over a private, dedicated network connection (not the public internet). What service do you use?", opts: ["VPN Connection", "Internet Gateway", "AWS Direct Connect", "VPC Peering"], ans: 2, exp: "AWS Direct Connect provides a dedicated physical network connection from your datacenter to AWS. It bypasses the public internet entirely, providing lower latency and more predictable throughput." }
    ]
  },
  {
    day: 3,
    concept: "EC2 — Compute on Demand",
    domain: "Performance",
    icon: "⚡",
    tagline: "Virtual servers that spin up in seconds. Choose your weapon.",
    color: "#ff9900",
    slides: [
      {
        title: "What is EC2?",
        body: "Amazon Elastic Compute Cloud (EC2) gives you virtual servers in the cloud. You choose the CPU, RAM, and storage. It starts in seconds, scales in minutes, and you pay only for what you use. The exam loves EC2 pricing models — knowing when to use On-Demand, Reserved, Spot, or Savings Plans is worth a significant chunk of the 'Cost Optimization' domain.",
        anchor: "💡 EC2 is the workhorse. Nearly every AWS architecture starts here before optimizing toward serverless."
      },
      {
        title: "Pricing Models — The Critical Decision Matrix",
        body: "<strong>On-Demand:</strong> Pay by the second. No commitment. Most expensive per hour. Use for: unpredictable workloads, testing. <strong>Reserved (1 or 3-year):</strong> Up to 72% discount. Use for: steady, predictable baseline load. <strong>Spot:</strong> Up to 90% discount. Can be interrupted with 2-minute warning. Use for: fault-tolerant batch jobs, simulations. <strong>Savings Plans:</strong> Flexible discount (not instance-specific) for committing to $/hour usage.",
        anchor: "💰 Steady load → Reserved. Interruptible batch jobs → Spot. No commitment → On-Demand."
      },
      {
        title: "Real-World: Instance Sizing",
        body: "Choosing the wrong EC2 instance type is a classic CTO mistake. Mammoth Capital runs their main trading dashboard on an <code>m5.4xlarge</code> when a <code>c5.xlarge</code> with an RDS Read Replica would cost 60% less and perform better. The <strong>instance family</strong> matters: M = General Purpose, C = Compute Optimized, R = Memory Optimized, I = Storage Optimized, G = GPU. Read the description — the exam describes a workload and you must match the family.",
        anchor: "🎯 Read the workload description. Heavy CPU → C family. Heavy RAM/DB → R family. General → M family."
      }
    ],
    quiz: [
      { q: "Mammoth Capital runs a Monte Carlo risk simulation every night at 2 AM. It runs for 3 hours and CAN be interrupted and restarted. What pricing model saves the most money?", opts: ["On-Demand", "Reserved (1-year)", "Spot Instances", "Dedicated Hosts"], ans: 2, exp: "Spot Instances are perfect for fault-tolerant, interruptible batch workloads. They offer up to 90% savings over On-Demand, making the CFO very happy." },
      { q: "Your production web application has a stable baseline of 10 EC2 instances running 24/7 for the past 2 years. What pricing model should you use for this baseline?", opts: ["On-Demand (most flexibility)", "Spot Instances (cheapest)", "Reserved Instances (1 or 3-year term)", "Savings Plans only when needed"], ans: 2, exp: "Reserved Instances offer up to 72% discount over On-Demand for predictable, steady-state workloads. If you know those 10 instances will run 24/7, commit to a reserved term." },
      { q: "You need an EC2 instance for a high-performance in-memory database (Redis, Memcached). Which instance family is optimized for this?", opts: ["C family (Compute Optimized)", "M family (General Purpose)", "R family (Memory Optimized)", "I family (Storage Optimized)"], ans: 2, exp: "The R family (e.g., r5.2xlarge) is Memory Optimized, designed for workloads that require large amounts of RAM like in-memory caches and databases." },
      { q: "What happens to an EC2 Spot Instance when AWS needs the capacity back?", opts: ["It stops immediately with no warning", "You receive a 2-minute interruption notice, then it is terminated", "It migrates automatically to another Availability Zone", "AWS sends an email and waits 24 hours"], ans: 1, exp: "Spot Instances can be interrupted by AWS with a 2-minute warning. Your application must be designed to checkpoint work and handle graceful interruption." },
      { q: "Which EC2 instance family would you choose for a video encoding workload that requires maximum CPU performance?", opts: ["R family (Memory Optimized)", "C family (Compute Optimized)", "G family (GPU)", "M family (General Purpose)"], ans: 1, exp: "The C family (e.g., c5.4xlarge) is Compute Optimized, designed for CPU-intensive workloads like batch processing, media transcoding, and scientific modeling." }
    ]
  },
  {
    day: 4,
    concept: "High Availability — Never Go Down",
    domain: "Resilient",
    icon: "🛡️",
    tagline: "If it can fail, it will fail. Build for the failure, not against it.",
    color: "#10b981",
    slides: [
      {
        title: "The HA Trinity",
        body: "High Availability in AWS is built on three concepts working together: <strong>Auto Scaling Groups (ASG)</strong> — automatically adds or removes EC2 instances based on demand. <strong>Application Load Balancer (ALB)</strong> — distributes traffic across healthy instances. <strong>Multi-AZ Deployment</strong> — spans instances across multiple Availability Zones so a single datacenter failure cannot take you down.",
        anchor: "🔱 ALB + ASG + Multi-AZ = The HA Trinity. They always appear together in well-architected solutions."
      },
      {
        title: "Auto Scaling Deep Dive",
        body: "An ASG maintains a minimum, desired, and maximum fleet size. Scaling policies trigger based on CloudWatch metrics: <strong>Target Tracking</strong> (keep CPU at 70%), <strong>Step Scaling</strong> (add 2 instances if CPU > 80%, add 5 if CPU > 90%), <strong>Scheduled Scaling</strong> (scale up every Monday at 8 AM). The key exam concept: Auto Scaling is the answer for <em>handling traffic spikes</em>; Reserved Instances answer <em>cost for predictable baseline</em>.",
        anchor: "⚙️ ASG = elasticity. It scales OUT to handle load, and scales IN to cut costs when load drops."
      },
      {
        title: "Multi-AZ vs. Multi-Region",
        body: "<strong>Multi-AZ</strong> (High Availability): deploy across 2+ AZs in the same region. Protects against AZ failures (a datacenter going down). Automatic failover in seconds for RDS. This is the standard HA pattern. <strong>Multi-Region</strong> (Disaster Recovery): deploy across 2+ AWS regions. Protects against entire regional outages. Costs significantly more. Only use when RTO/RPO requirements demand it.",
        anchor: "🌍 Multi-AZ = High Availability. Multi-Region = Disaster Recovery. The exam distinguishes these carefully."
      }
    ],
    quiz: [
      { q: "Your EC2 application is running in a single Availability Zone. A fire in that AZ's datacenter takes it offline. What architectural change prevents this?", opts: ["Use a larger EC2 instance type", "Enable Termination Protection on the instance", "Deploy instances across multiple AZs with an Auto Scaling Group and ALB", "Use Elastic IP addresses"], ans: 2, exp: "Deploying across multiple AZs means no single datacenter failure can take your application offline. The ALB detects unhealthy AZs and routes traffic to healthy ones automatically." },
      { q: "An Auto Scaling Group is configured with Min=2, Desired=4, Max=10. Traffic spikes and CPU hits 90% on all instances. What happens?", opts: ["The existing instances upgrade to a larger type automatically", "The ASG launches new EC2 instances up to the Maximum of 10", "The ALB rejects new connections to protect existing users", "Nothing — you must manually add instances"], ans: 1, exp: "The ASG's scaling policy detects the CPU alarm (via CloudWatch) and launches additional instances, up to the configured Maximum of 10." },
      { q: "Amazon RDS Multi-AZ creates a synchronous standby replica in another AZ. What triggers automatic failover to the standby?", opts: ["Manual failover initiated by the administrator only", "Automatically during a primary instance failure, maintenance, or AZ outage", "When the primary RDS reaches 90% storage capacity", "Only during scheduled maintenance windows"], ans: 1, exp: "RDS Multi-AZ failover is fully automatic. AWS detects the failure and promotes the standby within 60-120 seconds, updating the DNS endpoint transparently." },
      { q: "What is the difference between an Application Load Balancer (ALB) and a Network Load Balancer (NLB)?", opts: ["ALB operates at Layer 4 (TCP), NLB operates at Layer 7 (HTTP)", "ALB operates at Layer 7 (HTTP/HTTPS), NLB operates at Layer 4 (TCP/UDP)", "ALB is for internal traffic only, NLB is for external traffic", "They are identical — different names for the same service"], ans: 1, exp: "ALB is content-aware (Layer 7) and can route based on URL path or HTTP headers. NLB operates at Layer 4 for extreme performance (millions of requests per second) and static IP requirements." },
      { q: "Which scaling policy keeps the average CPU utilization of your ASG at exactly 60%?", opts: ["Step Scaling", "Scheduled Scaling", "Target Tracking Scaling", "Manual Scaling"], ans: 2, exp: "Target Tracking Scaling works like a thermostat — you set a target metric value (e.g., CPU = 60%) and the ASG automatically adds or removes instances to maintain that target." }
    ]
  },
  {
    day: 5,
    concept: "S3 — Infinite Storage",
    domain: "Cost",
    icon: "🪣",
    tagline: "The most durable place to put anything. Seriously, 11 nines.",
    color: "#3b82f6",
    slides: [
      {
        title: "What is S3?",
        body: "Amazon Simple Storage Service (S3) is object storage — not a file system, not a database, just a flat bucket of objects (files). S3 is infinitely scalable, designed for 99.999999999% (11 nines) durability, and can be accessed from anywhere with an HTTP endpoint. Everything from backups to static websites to data lakes lives in S3.",
        anchor: "🪣 Buckets are global namespaces. Objects are files. Size per object: up to 5TB. Number of objects: unlimited."
      },
      {
        title: "Storage Classes — Cost vs. Access",
        body: "S3 has multiple storage tiers designed for different access patterns: <strong>Standard</strong> — frequent access, most expensive. <strong>Standard-IA</strong> — Infrequent Access, cheaper storage but retrieval fee. <strong>Intelligent-Tiering</strong> — auto-moves data between tiers based on access patterns. <strong>Glacier Instant</strong> — archive, millisecond retrieval. <strong>Glacier Deep Archive</strong> — cheapest, 12-hour retrieval. Match the class to the access pattern to slash storage bills.",
        anchor: "💰 The exam always describes an access pattern and asks you to pick the cheapest S3 class. Match frequency to class."
      },
      {
        title: "S3 Security & Access Control",
        body: "S3 buckets are <strong>private by default</strong>. Public access must be explicitly enabled and AWS will warn you loudly. Access is controlled via: <strong>Bucket Policies</strong> (resource-based, JSON policies on the bucket itself), <strong>IAM Policies</strong> (identity-based), and <strong>ACLs</strong> (legacy, avoid). For cross-account access, use Bucket Policies. Critical: <strong>S3 Block Public Access</strong> is an account-level safety net that overrides everything and should always be on for sensitive data.",
        anchor: "🔒 Private by default. If you see 'publicly accessible S3 bucket' in an exam question, that's the architectural flaw."
      }
    ],
    quiz: [
      { q: "Mammoth Capital needs to store 5 years of trade execution logs for regulatory compliance. The data is never accessed during that period but must be retrievable within 12 hours if auditors request it. What is the most cost-effective storage class?", opts: ["S3 Standard", "S3 Standard-IA", "S3 Glacier Instant Retrieval", "S3 Glacier Deep Archive"], ans: 3, exp: "S3 Glacier Deep Archive is the lowest-cost storage class, designed for data accessed less than once a year. 12-hour retrieval is well within its SLA and the cost savings vs. Standard are massive for 5 years of data." },
      { q: "You have a data set with unpredictable access patterns — sometimes accessed daily, sometimes not for months. Which S3 class automatically optimizes costs without retrieval fees?", opts: ["S3 Standard", "S3 Standard-IA", "S3 Intelligent-Tiering", "S3 Glacier"], ans: 2, exp: "S3 Intelligent-Tiering monitors access patterns and automatically moves objects between frequent and infrequent access tiers with no retrieval fees and no minimum storage duration for the frequent tier." },
      { q: "A developer accidentally made an S3 bucket public. What AWS feature provides an account-level override to prevent any bucket from being publicly accessible, regardless of individual bucket settings?", opts: ["S3 Bucket ACLs", "S3 Block Public Access (account level)", "IAM Deny policy", "S3 Bucket Versioning"], ans: 1, exp: "S3 Block Public Access at the account level is a master override. Even if a bucket policy tries to grant public access, this setting blocks it. It should be enabled on all accounts by default." },
      { q: "What is the durability of S3 Standard storage?", opts: ["99.9% (three nines)", "99.99% (four nines)", "99.999999999% (eleven nines)", "100% guaranteed"], ans: 2, exp: "Amazon S3 is designed for 99.999999999% (11 nines) durability by redundantly storing objects across multiple facilities and multiple devices within each facility. Losing an object in S3 is practically impossible." },
      { q: "You want to host a static website (HTML, CSS, JS) with zero server management and global low latency. What is the optimal architecture?", opts: ["EC2 instance with Apache", "Elastic Beanstalk with Node.js", "S3 static website hosting + CloudFront CDN", "ECS with Fargate"], ans: 2, exp: "S3 serves the static files and CloudFront caches them at 450+ edge locations globally. Zero servers to manage, infinite scale, and global low latency — at a fraction of the cost of running EC2." }
    ]
  },
  {
    day: 6,
    concept: "RDS & DynamoDB — Choose Your Database",
    domain: "Resilient",
    icon: "🗄️",
    tagline: "Relational vs. NoSQL. Choose wrong and you'll feel it at scale.",
    color: "#8b5cf6",
    slides: [
      {
        title: "RDS vs. DynamoDB — The Core Decision",
        body: "<strong>Amazon RDS</strong> is managed relational SQL (MySQL, PostgreSQL, Oracle, SQL Server, Aurora). It has schemas, joins, ACID transactions. Use when your data has complex relationships and you need SQL. <strong>Amazon DynamoDB</strong> is a fully serverless NoSQL key-value and document store. No schema, no joins, scales to millions of requests per second automatically. Use when you need massive scale with simple access patterns.",
        anchor: "🤔 Complex relational data with joins → RDS. Massive scale with simple key-value lookups → DynamoDB."
      },
      {
        title: "RDS: The HA Options",
        body: "<strong>Multi-AZ:</strong> synchronous standby in another AZ. Automatic failover. Used for high availability, NOT for read scaling. <strong>Read Replica:</strong> asynchronous copy used for read scaling (up to 5 replicas for RDS, 15 for Aurora). Reports and analytics hit the read replica; your primary only handles writes. <strong>Aurora:</strong> AWS's cloud-native relational DB. 5x faster than MySQL, auto-scales storage, supports up to 15 read replicas with under 100ms lag.",
        anchor: "⚠️ Multi-AZ = High Availability (standby). Read Replica = Performance (read scaling). They solve different problems."
      },
      {
        title: "DynamoDB: The Superpowers",
        body: "DynamoDB's killer features: <strong>Single-digit millisecond performance at any scale</strong> — no tuning, no connection pools, just fast. <strong>DynamoDB Streams</strong> captures item-level changes (great for triggering Lambda). <strong>DAX (DynamoDB Accelerator)</strong> is an in-memory cache that delivers microsecond read performance. <strong>Global Tables</strong> replicates your table across multiple AWS regions for global active-active access.",
        anchor: "⚡ DynamoDB is the right answer any time the exam mentions 'serverless', 'key-value', or 'millions of requests per second'."
      }
    ],
    quiz: [
      { q: "Mammoth Capital needs to store user session data. The access pattern is simple: get session by session ID, write session data. Traffic can spike to 5 million sessions per second. Which database is right?", opts: ["Amazon RDS MySQL", "Amazon Redshift", "Amazon DynamoDB", "Amazon Aurora PostgreSQL"], ans: 2, exp: "DynamoDB is the answer for simple key-value access patterns at massive scale. It delivers single-digit millisecond performance without any capacity planning at millions of requests per second." },
      { q: "Your RDS Primary database is overwhelmed with read traffic from 200 analysts running reports. Writes are only 5% of traffic. What is the quickest fix?", opts: ["Upgrade to a larger RDS instance", "Enable Multi-AZ deployment", "Create RDS Read Replicas and route read traffic to them", "Migrate to DynamoDB"], ans: 2, exp: "Read Replicas offload read-heavy traffic from the primary. The primary continues to handle writes; analysts hit the replica. This is faster and cheaper than vertical scaling the primary." },
      { q: "What is the key difference between RDS Multi-AZ and an RDS Read Replica?", opts: ["Multi-AZ is for reads; Read Replica is for failover", "Multi-AZ is for high availability/failover (synchronous standby); Read Replica is for read performance scaling (asynchronous copy)", "They are the same thing with different names", "Multi-AZ is cheaper than Read Replicas"], ans: 1, exp: "This distinction is a guaranteed exam question. Multi-AZ = HA (the standby is not readable). Read Replica = performance (readable copy, may lag slightly)." },
      { q: "Which AWS database service would you choose for a complex e-commerce application with orders, products, customers, and inventory all requiring JOIN queries?", opts: ["Amazon DynamoDB", "Amazon ElastiCache", "Amazon RDS (PostgreSQL or MySQL)", "Amazon Redshift"], ans: 2, exp: "Complex relational data with joins, foreign keys, and ACID transactions requires a relational database. RDS provides managed MySQL/PostgreSQL without the operational overhead of running your own DB servers." },
      { q: "DynamoDB Accelerator (DAX) improves DynamoDB read performance from milliseconds to what?", opts: ["Seconds (it reduces load on DynamoDB)", "Microseconds (in-memory caching layer)", "It does not improve read speed, only write speed", "It has no performance impact, only adds security"], ans: 1, exp: "DAX is an in-memory cache for DynamoDB that delivers microsecond-level read latency. It is fully API-compatible with DynamoDB — no application code changes required." }
    ]
  },
  {
    day: 7,
    concept: "Lambda & Serverless — No Servers, No Problem",
    domain: "Performance",
    icon: "λ",
    tagline: "The future of compute: you write code, AWS worries about the servers.",
    color: "#f97316",
    slides: [
      {
        title: "What is Serverless?",
        body: "Serverless doesn't mean no servers — it means <em>you don't manage the servers</em>. AWS Lambda is the core serverless compute service. You write a function, upload it, and Lambda runs it in response to events (HTTP request, S3 upload, DynamoDB change, SQS message). You pay per 100ms of execution time and per invocation. If no one calls your function, you pay nothing.",
        anchor: "⚡ Lambda = event-driven, auto-scaling, pay-per-use compute. Zero infrastructure to manage."
      },
      {
        title: "Lambda Limits & Cold Starts",
        body: "Lambda has hard limits you must know for the exam: <strong>15 minute maximum execution timeout.</strong> If your job takes longer, use ECS Fargate. <strong>Memory: 128MB to 10GB.</strong> <strong>Ephemeral storage: /tmp up to 10GB.</strong> <strong>Cold Starts:</strong> when Lambda spins up a new execution environment, there's an initialization delay (cold start). For latency-sensitive apps, use <strong>Provisioned Concurrency</strong> to keep containers warm.",
        anchor: "⏱️ 15-minute limit is the most tested Lambda constraint. Anything longer = ECS, EC2, or AWS Batch."
      },
      {
        title: "The Serverless Stack",
        body: "Lambda never runs in isolation on the exam. The canonical serverless pattern is: <strong>Route 53</strong> (DNS) → <strong>CloudFront</strong> (CDN) → <strong>API Gateway</strong> (HTTP endpoint management, auth, rate limiting) → <strong>Lambda</strong> (business logic) → <strong>DynamoDB</strong> (data) + <strong>S3</strong> (assets). This stack scales to millions of users with zero infrastructure management.",
        anchor: "🏗️ API Gateway + Lambda + DynamoDB is the serverless architecture the exam will always validate against."
      }
    ],
    quiz: [
      { q: "A Lambda function processes images uploaded to S3. The processing sometimes takes 20 minutes. What must you change?", opts: ["Increase Lambda memory to 10GB", "Enable Lambda Provisioned Concurrency", "Migrate the processing to ECS Fargate or AWS Batch — Lambda cannot run longer than 15 minutes", "Set the Lambda timeout to 30 minutes in the console"], ans: 2, exp: "Lambda's hard maximum execution timeout is 15 minutes. It cannot be extended. Any job exceeding 15 minutes must be moved to ECS Fargate, EC2, or AWS Batch." },
      { q: "What triggers a Lambda 'cold start'?", opts: ["When Lambda's memory limit is exceeded", "When a new execution environment is initialized for the first time or after inactivity", "When Lambda is deployed to a new region", "When the function code size exceeds 50MB"], ans: 1, exp: "Cold starts occur when Lambda must initialize a new container for your function. After warm-up, subsequent invocations reuse the container (warm). Provisioned Concurrency pre-warms containers to eliminate cold starts." },
      { q: "What is the primary purpose of Amazon API Gateway in a serverless architecture?", opts: ["It stores API response data in a database", "It provides a scalable HTTP endpoint that routes requests to Lambda, handles auth, rate limiting, and caching", "It replaces Lambda as the compute layer", "It only works with REST APIs, not HTTP or WebSocket"], ans: 1, exp: "API Gateway is the front door for serverless applications. It handles HTTPS termination, authentication (Cognito/API Keys), rate limiting, request validation, and routes traffic to Lambda functions." },
      { q: "How does Lambda pricing differ from EC2 pricing?", opts: ["Lambda is priced per hour like EC2", "Lambda is priced per invocation and per 100ms of execution time — you pay nothing when it's idle", "Lambda is always more expensive than EC2", "Lambda pricing is a flat monthly fee regardless of usage"], ans: 1, exp: "Lambda's pay-per-use model is its biggest cost advantage for sporadic workloads. An EC2 instance charges you 24/7 even when idle. Lambda charges you only when your code is actually running." },
      { q: "What AWS service provides a fully managed HTTP endpoint for Lambda functions without the full feature set of API Gateway?", opts: ["AWS AppSync", "Lambda Function URLs", "AWS Amplify", "AWS Step Functions"], ans: 1, exp: "Lambda Function URLs provide a dedicated HTTPS endpoint directly for a Lambda function with no additional service required. They're simpler than API Gateway but lack features like caching, auth, and rate limiting." }
    ]
  },
  {
    day: 8,
    concept: "SQS & SNS — The Decoupling Duo",
    domain: "Resilient",
    icon: "📨",
    tagline: "Tightly coupled systems fail together. Loosely coupled systems survive together.",
    color: "#14b8a6",
    slides: [
      {
        title: "Why Decoupling?",
        body: "In a monolithic architecture, if the order processor crashes, the web server crashes too. Decoupling separates services with a message bus so they can fail independently and scale independently. <strong>Amazon SQS</strong> is a message queue (one producer, one consumer). <strong>Amazon SNS</strong> is a notification service (one producer, many subscribers simultaneously — fanout). These two services appear constantly on the SAA-C03 exam.",
        anchor: "🔗 Tight coupling = house of cards. Loose coupling = if one falls, others keep running."
      },
      {
        title: "SQS vs. SNS — The Decision Matrix",
        body: "<strong>SQS</strong>: Messages sit in a queue until a consumer polls and processes them. Message retention up to 14 days. Use for: work queues, async task processing, rate limiting (consumer processes at its own pace). <strong>SQS FIFO:</strong> exactly-once, ordered delivery — critical for financial transactions. <strong>SNS</strong>: Push-based fanout. One message simultaneously goes to SQS queues, Lambda functions, email addresses, HTTP endpoints. <strong>SQS + SNS together</strong> (fanout pattern): SNS publishes, multiple SQS queues receive independently.",
        anchor: "📬 SQS = queue (pull). SNS = broadcast (push). FIFO SQS = ordered + exactly-once."
      },
      {
        title: "Amazon EventBridge — The Smart Router",
        body: "<strong>EventBridge</strong> is the next evolution of SNS for complex event-driven architectures. It uses content-based routing — you write rules that say 'if the event body has status=FAILED, route to the DLQ Lambda; if status=SUCCESS, route to the analytics stream.' It natively integrates with 200+ AWS services and SaaS providers (Salesforce, Stripe, etc.). Use EventBridge when you need intelligent routing based on event content rather than simple fanout.",
        anchor: "⚡ EventBridge = smart content-based routing. SNS = simple fanout broadcasting. EventBridge is the modern choice."
      }
    ],
    quiz: [
      { q: "You are processing trade orders. Each order must be processed in the exact sequence it was received, and must never be processed more than once. Which queue type is required?", opts: ["SQS Standard Queue", "SQS FIFO Queue", "SNS Topic", "EventBridge Rule"], ans: 1, exp: "SQS FIFO guarantees strict ordering (first-in, first-out) and exactly-once processing. Standard queues offer higher throughput but may deliver messages out of order or more than once." },
      { q: "When a new trade is executed, you need to simultaneously notify: a Lambda function (for real-time dashboards), an SQS queue (for batch reporting), and an email address (for alerts). What is the cleanest architecture?", opts: ["Create 3 separate SQS queues and process them independently", "Use SNS to fanout the message to Lambda, SQS, and email simultaneously", "Send 3 separate API calls from the trading engine to each destination", "Use EventBridge with 3 separate Lambda triggers"], ans: 1, exp: "SNS fanout is the canonical solution. The trading engine publishes one message to an SNS topic; SNS delivers it simultaneously to all three subscribers. Decoupled and scalable." },
      { q: "What happens to SQS messages that fail processing multiple times?", opts: ["They are deleted automatically after one failure", "They move to a Dead-Letter Queue (DLQ) after exceeding the maximum receive count", "They are resent indefinitely until successful", "They trigger an SNS notification to an admin email"], ans: 1, exp: "A Dead-Letter Queue (DLQ) is a separate SQS queue for messages that cannot be processed successfully after N attempts. This prevents poison-pill messages from blocking your queue forever." },
      { q: "What is the maximum message retention period for an SQS queue?", opts: ["24 hours", "7 days", "14 days", "30 days"], ans: 2, exp: "SQS retains messages for up to 14 days. After that, unprocessed messages are automatically deleted. If a consumer is down for more than 14 days, messages will be lost." },
      { q: "You need to route events to different targets based on the content of the event body (e.g., route 'error' events to a DLQ, 'success' events to a data lake). Which service provides content-based routing?", opts: ["Amazon SQS with a filter policy", "Amazon SNS with message filtering", "Amazon EventBridge with event rules", "Amazon Kinesis Data Streams"], ans: 2, exp: "EventBridge rules support content-based filtering using event patterns that match against the event body. This is more powerful than SNS message filtering for complex routing scenarios." }
    ]
  },
  {
    day: 9,
    concept: "Security Services — Your Defense Grid",
    domain: "Secure",
    icon: "🛡️",
    tagline: "CloudTrail is your camera. GuardDuty is your alarm. WAF is your bouncer.",
    color: "#ef4444",
    slides: [
      {
        title: "CloudTrail vs. CloudWatch vs. Config",
        body: "<strong>CloudTrail</strong>: WHO did WHAT and WHEN? It logs every API call in your account. Forensic investigation. 'Who deleted the S3 bucket?' <strong>CloudWatch</strong>: HOW is my infrastructure PERFORMING? Metrics, logs, alarms for CPU, memory, latency. 'Is my EC2 CPU above 90%?' <strong>AWS Config</strong>: IS my infrastructure COMPLIANT with my rules? Continuous compliance monitoring. 'Has this S3 bucket been public for 72 hours?'",
        anchor: "🔍 CloudTrail = audit log (who/what/when). CloudWatch = performance metrics. Config = compliance state."
      },
      {
        title: "GuardDuty, Macie & Inspector",
        body: "<strong>GuardDuty</strong>: AI-powered threat detection. Analyzes VPC Flow Logs, CloudTrail, and DNS logs to find malicious activity (cryptocurrency mining, brute force attacks, compromised instances). Enable it in every account — it's one click. <strong>Amazon Macie</strong>: uses ML to discover and protect sensitive data (PII, credit cards, financial data) in S3. Alerts you if your S3 buckets contain data you didn't know about. <strong>Amazon Inspector</strong>: automatically scans EC2 instances and containers for software vulnerabilities and network exposure.",
        anchor: "🤖 GuardDuty = threat detection (behavioral). Macie = sensitive data discovery (S3). Inspector = vulnerability scanning (EC2/containers)."
      },
      {
        title: "WAF & Shield — DDoS Protection",
        body: "<strong>AWS WAF</strong> (Web Application Firewall): operates at Layer 7 (HTTP). Blocks SQL injection, cross-site scripting, and custom IP blacklists. Attaches to ALBs, CloudFront, or API Gateway. <strong>AWS Shield Standard</strong>: free DDoS protection included for all AWS customers. Protects against the most common network/transport layer DDoS attacks. <strong>AWS Shield Advanced</strong>: paid (\$3,000/month). Unmetered protection against large-scale DDoS, 24/7 DDoS Response Team access, and financial protections against AWS bill spikes during an attack.",
        anchor: "⚔️ WAF = Layer 7 content filtering. Shield Standard = free L3/L4 DDoS. Shield Advanced = enterprise DDoS protection."
      }
    ],
    quiz: [
      { q: "The security team wants to know exactly which IAM user deleted a critical DynamoDB table and from what IP address. Which service provides this information?", opts: ["Amazon CloudWatch Logs", "AWS Config", "AWS CloudTrail", "Amazon GuardDuty"], ans: 2, exp: "CloudTrail logs every API call including the caller identity, time, source IP, and parameters. It is the definitive audit trail for 'who did what' investigations." },
      { q: "You want to protect your ALB from SQL injection and cross-site scripting attacks. Which service do you attach to the ALB?", opts: ["AWS Shield Advanced", "AWS WAF", "Amazon GuardDuty", "Amazon Inspector"], ans: 1, exp: "AWS WAF is a web application firewall that operates at Layer 7 and can inspect HTTP request content to block SQL injection, XSS, bad bots, and custom IP rules. It attaches directly to ALBs, CloudFront, or API Gateway." },
      { q: "Mammoth Capital must comply with PCI-DSS, which requires them to discover all credit card numbers stored in S3 buckets. Which service automates this?", opts: ["Amazon Inspector", "Amazon GuardDuty", "Amazon Macie", "AWS Config"], ans: 2, exp: "Amazon Macie uses machine learning to automatically discover, classify, and protect sensitive data in S3. It specifically identifies PII, financial data, and credentials — critical for PCI-DSS compliance." },
      { q: "AWS GuardDuty is enabled in your account and detects that an EC2 instance is making repeated DNS queries to known command-and-control domains (indicating malware). What type of finding is this?", opts: ["A CloudWatch metric alarm", "A GuardDuty threat finding indicating a potentially compromised instance", "An AWS Config rule violation", "A Shield Advanced DDoS alert"], ans: 1, exp: "GuardDuty analyzes DNS logs and network traffic patterns to detect behavioral anomalies. Repeated DNS queries to C2 domains is a classic indicator of compromised instance malware." },
      { q: "What is the difference between AWS Shield Standard and Shield Advanced?", opts: ["Shield Standard is paid; Shield Advanced is free", "Shield Standard is free and protects against common L3/L4 attacks; Shield Advanced is paid and adds large-scale DDoS protection with 24/7 DRT access", "Shield Standard only works with CloudFront; Shield Advanced works with all services", "They are identical products with different names"], ans: 1, exp: "Shield Standard is free and automatically protects all AWS customers from common DDoS attacks. Shield Advanced (\$3,000/month) provides higher protection levels, cost protection, and access to the AWS DDoS Response Team." }
    ]
  },
  {
    day: 10,
    concept: "Cost Optimization — Architect Like the CFO Is Watching",
    domain: "Cost",
    icon: "💰",
    tagline: "Cloud costs are not a surprise. They are a choice.",
    color: "#22c55e",
    slides: [
      {
        title: "The Well-Architected Cost Framework",
        body: "AWS's Cost Optimization pillar centers on: <strong>Right-sizing</strong> — don't run an m5.8xlarge when an m5.large will do. Use AWS Compute Optimizer to get ML-powered right-sizing recommendations. <strong>Pricing model selection</strong> — match the commitment level to the workload stability. <strong>Eliminating waste</strong> — unattached EBS volumes, idle EC2 instances, old snapshots. These are silent money drains.",
        anchor: "📊 Cost Optimization is a continuous discipline, not a one-time event. Tag everything, monitor everything."
      },
      {
        title: "The Pricing Model Hierarchy",
        body: "From most to least expensive per hour: <strong>On-Demand > Savings Plans > Reserved Instances > Spot</strong>. The exam will describe a workload and expect you to pick the right tier. Exam trap: don't pick Reserved Instances for unpredictable workloads — if you don't use the capacity, you're paying for nothing. Savings Plans are more flexible than Reserved (commit to $/hour spend, not specific instance types).",
        anchor: "🏆 Savings Plans > Reserved Instances in flexibility. Spot Instances for fault-tolerant batch. On-Demand for testing."
      },
      {
        title: "Cost Tooling",
        body: "<strong>AWS Cost Explorer</strong>: visualize spending trends, forecast future costs, identify the top cost drivers. <strong>AWS Budgets</strong>: set spending thresholds and get alerted when you're approaching or exceeding them (email/SNS). <strong>AWS Trusted Advisor</strong>: automated advisor that flags cost optimization opportunities (idle EC2, unattached EIPs, underutilized RDS). <strong>Compute Optimizer</strong>: ML-powered recommendations for optimal EC2 and Lambda sizing.",
        anchor: "🔧 Budgets = proactive alerts. Cost Explorer = reactive analysis. Trusted Advisor = automated recommendations."
      }
    ],
    quiz: [
      { q: "You want to get alerted via email when your AWS bill exceeds \$500 in a month. Which service configures this?", opts: ["AWS Cost Explorer", "AWS Trusted Advisor", "AWS Budgets", "Amazon CloudWatch Billing Alarm"], ans: 2, exp: "AWS Budgets lets you set custom cost thresholds and sends alerts via email or SNS when you're approaching or have exceeded the budget. It's the proactive cost control tool." },
      { q: "An analysis shows 30 EC2 instances are running at less than 5% average CPU utilization for the past month. Which AWS service provides ML-powered recommendations for right-sizing?", opts: ["AWS Trusted Advisor", "AWS Compute Optimizer", "AWS Cost Explorer", "Amazon Inspector"], ans: 1, exp: "AWS Compute Optimizer uses machine learning to analyze EC2 utilization metrics and recommends optimal instance types and sizes. It helps you eliminate over-provisioned resources." },
      { q: "A development team spins up 50 EC2 instances every Monday and tears them down every Friday. What pricing model is appropriate for these instances?", opts: ["Reserved Instances (1-year)", "Spot Instances", "On-Demand Instances", "Dedicated Hosts"], ans: 2, exp: "On-Demand is right for predictable but non-continuous workloads where you can't make a 1-year commitment. For this pattern, On-Demand billing by the second means you only pay Mon-Fri." },
      { q: "You have 20 EC2 instances running 24/7 in production with a steady, predictable workload. You want the maximum possible discount. Which option gives you the highest discount?", opts: ["Savings Plans (1-year, no upfront)", "Reserved Instances (3-year, all upfront)", "On-Demand with auto-scaling", "Spot Instances"], ans: 1, exp: "Reserved Instances with a 3-year term and all-upfront payment provide the maximum discount (up to 72%). The longer the commitment and the more upfront you pay, the higher the discount." },
      { q: "Which AWS tool visualizes your spending history, identifies top cost drivers by service, and lets you forecast future costs?", opts: ["AWS Budgets", "AWS Cost Explorer", "AWS Trusted Advisor", "Amazon CloudWatch"], ans: 1, exp: "AWS Cost Explorer is the visualization and analysis tool for your AWS spend. It shows historical trends, breakdowns by service/region/tag, and cost forecasts. Use it to diagnose what's driving your bill up." }
    ]
  },
  {
    day: 11,
    concept: "CloudFront & Route 53 — Global Delivery",
    domain: "Performance",
    icon: "🌍",
    tagline: "Speed is not a feature. It is the feature.",
    color: "#f59e0b",
    slides: [
      {
        title: "Amazon CloudFront — The Global CDN",
        body: "CloudFront is AWS's Content Delivery Network (CDN). It caches your content at 450+ edge locations globally, so users get content from a server close to them instead of routing all the way to your origin (S3, ALB, or EC2). The result: dramatically lower latency, reduced origin load, and lower data transfer costs. CloudFront also integrates with AWS WAF and Shield for security at the edge.",
        anchor: "⚡ CloudFront moves your content closer to users. Every millisecond of latency costs you conversions."
      },
      {
        title: "Amazon Route 53 — Intelligent DNS",
        body: "Route 53 is AWS's DNS service — it translates domain names into IP addresses. But it's far more than simple DNS. Its routing policies are critical exam topics: <strong>Simple</strong> (one target), <strong>Weighted</strong> (A/B testing, canary deploys), <strong>Latency</strong> (route to the region with lowest latency), <strong>Failover</strong> (active-passive DR), <strong>Geolocation</strong> (route EU users to EU servers), <strong>Geoproximity</strong> (bias routing toward specific regions), <strong>Multi-Value</strong> (returns up to 8 healthy IPs).",
        anchor: "🗺️ Exam pattern: they describe a routing requirement, you pick the Route 53 policy. Memorize all 6."
      },
      {
        title: "Global Accelerator vs. CloudFront",
        body: "This is a common exam trap. <strong>CloudFront</strong>: for HTTP/HTTPS content caching. Improves cacheable content (images, CSS, JS, videos). Uses edge cache. <strong>AWS Global Accelerator</strong>: for non-cacheable, real-time traffic (TCP/UDP). Routes traffic over the AWS global backbone network instead of the public internet — more stable, lower latency for live applications (gaming, trading, VoIP). CloudFront = cache. Global Accelerator = network path optimization.",
        anchor: "🎯 Exam trap: CloudFront for cacheable content. Global Accelerator for real-time/non-cacheable TCP apps."
      }
    ],
    quiz: [
      { q: "Users in Europe are experiencing slow load times for your web app hosted in us-east-1. What is the cheapest and fastest solution to reduce their latency?", opts: ["Migrate the entire application to eu-west-1", "Place a CloudFront distribution in front of your origin to cache content at European edge locations", "Deploy EC2 instances in Europe with Route 53 latency routing", "Increase the EC2 instance size in us-east-1"], ans: 1, exp: "CloudFront caches your content at edge locations close to European users. They get content from a nearby edge server instead of crossing the Atlantic to us-east-1. No infrastructure to move." },
      { q: "Mammoth Capital has a primary trading API in us-east-1. If that region fails, they want to automatically route traffic to ap-southeast-1 with zero manual intervention. Which Route 53 routing policy enables this?", opts: ["Weighted routing", "Geolocation routing", "Failover routing", "Latency routing"], ans: 2, exp: "Route 53 Failover routing monitors your primary endpoint with a health check. If the primary becomes unhealthy, Route 53 automatically updates DNS to point to the secondary endpoint." },
      { q: "You are deploying a new version of your trading API and want to send 5% of traffic to the new version while keeping 95% on the stable version. Which Route 53 routing policy handles this?", opts: ["Failover routing", "Geolocation routing", "Weighted routing", "Latency routing"], ans: 2, exp: "Weighted routing lets you assign weights to multiple records. Setting 95/5 sends 95% of traffic to v1 and 5% to v2 — a classic canary deployment pattern for safe rollouts." },
      { q: "Your mobile game requires real-time, low-latency UDP connections from players globally to your servers in multiple AWS regions. CloudFront won't help (it's HTTP/cacheable content only). What service routes players over the AWS global backbone?", opts: ["Amazon Route 53 Latency Routing", "AWS Global Accelerator", "AWS Direct Connect", "Amazon CloudFront with custom origins"], ans: 1, exp: "Global Accelerator routes TCP/UDP traffic over the AWS private global network backbone, bypassing the inconsistent public internet. It provides static IPs and consistently low latency for real-time applications." },
      { q: "Which Route 53 routing policy routes users to the AWS region that will give them the LOWEST network latency (not necessarily the geographically closest)?", opts: ["Geolocation routing", "Geoproximity routing", "Latency-based routing", "Weighted routing"], ans: 2, exp: "Latency-based routing measures actual network latency from the user to each region and routes to the lowest-latency option. This can differ from geographic proximity due to network topology differences." }
    ]
  },
  {
    day: 12,
    concept: "Containers & Serverless Compute — Beyond EC2",
    domain: "Performance",
    icon: "🐳",
    tagline: "EC2 is infrastructure. Containers are applications. Serverless is intent.",
    color: "#0ea5e9",
    slides: [
      {
        title: "ECS, EKS & Fargate",
        body: "<strong>Amazon ECS</strong> (Elastic Container Service): AWS's native container orchestrator. Runs Docker containers across a fleet. Two launch types: <strong>EC2</strong> (you manage the servers) or <strong>Fargate</strong> (AWS manages the servers). <strong>Amazon EKS</strong> (Elastic Kubernetes Service): managed Kubernetes. Use if your team is already Kubernetes-native and needs the full K8s ecosystem. <strong>Fargate</strong>: the serverless compute engine for both ECS and EKS — you define CPU/RAM per container task and pay per second of use.",
        anchor: "🐳 ECS = AWS-native containers. EKS = Kubernetes. Fargate = no servers to manage for either."
      },
      {
        title: "When to Use Containers vs. Lambda",
        body: "<strong>Choose Lambda when:</strong> event-driven, short-lived (under 15 min), variable traffic, simple dependencies. <strong>Choose Containers (ECS/Fargate) when:</strong> complex dependencies (multiple libraries), jobs over 15 minutes, need specific OS-level control, existing Dockerized workloads, consistent long-running processes. The exam will describe a workload and you must pick the right compute model.",
        anchor: "🎯 Lambda = short event-driven. Fargate = longer-running containerized workloads. EC2 = full control needed."
      },
      {
        title: "AWS Step Functions — Serverless Orchestration",
        body: "<strong>AWS Step Functions</strong> orchestrates multi-step workflows where each step is a Lambda function, ECS task, SNS publish, or other AWS service. It handles retries, error handling, parallel execution, and timeouts — all through a visual state machine. Use it any time the exam describes a multi-step process that currently uses a long-running EC2 instance to coordinate steps.",
        anchor: "⚙️ Step Functions = replace long-running EC2 'coordinator' scripts with a managed visual workflow engine."
      }
    ],
    quiz: [
      { q: "Your team has a Dockerized Node.js application. You want to run it on AWS without managing EC2 instances or Kubernetes clusters. What is the optimal solution?", opts: ["Amazon EC2 with Docker installed manually", "Amazon ECS with Fargate launch type", "Amazon EKS with self-managed nodes", "AWS Lambda running Docker containers"], ans: 1, exp: "ECS with Fargate is the 'serverless containers' option. You define your container, specify CPU/RAM, and Fargate runs it without you ever touching a server." },
      { q: "A job processes financial reports and takes 45 minutes to complete. It is containerized and runs daily. Which compute option is correct?", opts: ["AWS Lambda (increase timeout)", "Amazon EC2 Spot Instances", "Amazon ECS with Fargate (Fargate supports long-running tasks)", "AWS Glue ETL job"], ans: 2, exp: "Lambda has a 15-minute hard limit. Containerized workloads exceeding that must run on ECS/Fargate or EC2. Fargate handles this cleanly with no server management." },
      { q: "Which service is the managed Kubernetes offering on AWS, designed for teams already using Kubernetes in production?", opts: ["Amazon ECS", "AWS Fargate", "Amazon EKS", "AWS App Runner"], ans: 2, exp: "Amazon EKS (Elastic Kubernetes Service) is fully managed Kubernetes. AWS handles the control plane; you manage worker nodes (or use Fargate). Choose EKS if your team is Kubernetes-native." },
      { q: "You have a multi-step order processing workflow: validate → charge → fulfill → notify. Each step is a Lambda function. You need error handling, retries, and visibility into failures. What orchestrates this?", opts: ["Amazon SQS with 4 queues chained together", "AWS Step Functions", "Amazon SNS with Lambda triggers", "A long-running EC2 instance with a state machine script"], ans: 1, exp: "Step Functions orchestrates multi-step Lambda workflows with built-in error handling, retries, timeouts, and a visual state machine. It eliminates the need for a coordinator EC2 instance." },
      { q: "What is the difference between ECS EC2 launch type and ECS Fargate launch type?", opts: ["Fargate only supports Python; EC2 supports all languages", "EC2 launch type = you manage the underlying EC2 instances. Fargate = AWS manages the infrastructure; you only define container CPU/RAM.", "Fargate is cheaper than EC2 launch type in all scenarios", "They are identical — the launch type has no operational impact"], ans: 1, exp: "EC2 launch type requires you to provision, patch, and manage the EC2 cluster. Fargate is serverless — you define the task requirements and AWS handles everything else." }
    ]
  },
  {
    day: 13,
    concept: "Disaster Recovery — Survive the Worst",
    domain: "Resilient",
    icon: "🔥",
    tagline: "It's not if, it's when. Have a plan before you need one.",
    color: "#dc2626",
    slides: [
      {
        title: "RTO & RPO — The Two Metrics",
        body: "<strong>RTO (Recovery Time Objective)</strong>: the maximum acceptable downtime. 'We can be offline for at most 4 hours.' <strong>RPO (Recovery Point Objective)</strong>: the maximum acceptable data loss. 'We can lose at most 15 minutes of data.' These two metrics drive every DR architecture decision. A lower RTO/RPO = more expensive architecture. The exam describes business requirements in RTO/RPO terms — you must match the architecture.",
        anchor: "⏱️ RTO = how long can we be down? RPO = how much data can we lose? Lower both = spend more."
      },
      {
        title: "The 4 DR Strategies",
        body: "<strong>Backup & Restore</strong> (highest RTO/RPO, cheapest): backup data to S3, restore when needed. Hours of recovery time. <strong>Pilot Light</strong>: minimal core infrastructure (DB replication) always running, scale up compute when disaster strikes. Minutes. <strong>Warm Standby</strong>: scaled-down copy of production always running, scale to full size on failover. Minutes. <strong>Active-Active (Multi-Site)</strong>: two full production stacks always running, traffic split. Near-zero RTO/RPO. Most expensive.",
        anchor: "📊 Backup & Restore → Pilot Light → Warm Standby → Active-Active. More resilience = more cost."
      },
      {
        title: "AWS DR Tools",
        body: "<strong>AWS Backup</strong>: centralized backup across EC2, RDS, EFS, DynamoDB with a single policy. <strong>Cross-Region Replication</strong>: S3, RDS, DynamoDB Global Tables all support replicating data to another region automatically. <strong>Route 53 Failover Routing</strong>: health check the primary; automatically update DNS to the DR region on failure. <strong>EC2 AMI copies</strong>: copy AMIs to another region so you can launch your stack there instantly.",
        anchor: "🛠️ AWS Backup = centralized policy. Cross-region replication = data sync. Route 53 Failover = automatic DNS cutover."
      }
    ],
    quiz: [
      { q: "A hospital's patient record system has an RTO of 1 hour and an RPO of 5 minutes. Data is replicated continuously to a second region. A skeleton infrastructure always runs in the DR region. Which DR strategy is this?", opts: ["Backup & Restore", "Pilot Light", "Warm Standby", "Active-Active"], ans: 2, exp: "Warm Standby means a scaled-down but fully functional copy of production is always running in the DR region. On failure, you scale it up to full production capacity — typically achievable in under an hour." },
      { q: "Mammoth Capital requires zero data loss (RPO = 0) and zero downtime (RTO = 0). Which DR strategy achieves this?", opts: ["Backup & Restore", "Pilot Light", "Warm Standby", "Active-Active Multi-Site"], ans: 3, exp: "Active-Active Multi-Site runs two full production environments simultaneously in different regions, with live traffic split between them. If one region fails, the other immediately handles 100% of traffic — zero RTO, near-zero RPO." },
      { q: "What does RPO (Recovery Point Objective) measure?", opts: ["How quickly you can recover your infrastructure after a disaster", "The maximum amount of data loss acceptable, measured in time", "The cost of your disaster recovery architecture", "The geographic distance between your primary and DR regions"], ans: 1, exp: "RPO measures data loss tolerance. An RPO of 15 minutes means you can afford to lose at most 15 minutes of data. Achieving lower RPO requires more frequent replication or synchronous replication." },
      { q: "Which AWS service provides centralized backup management across EC2, RDS, EFS, and DynamoDB with a single policy?", opts: ["Amazon S3 Versioning", "AWS Backup", "AWS CloudFormation", "AWS Data Migration Service"], ans: 1, exp: "AWS Backup is a centralized backup service that lets you define backup policies (frequency, retention, cross-region copy) and apply them across multiple AWS services from a single console." },
      { q: "Your DR strategy keeps only your RDS database replicated to a secondary region with no other infrastructure running. On a disaster, you scale up compute from scratch. What strategy is this?", opts: ["Backup & Restore", "Pilot Light", "Warm Standby", "Active-Active"], ans: 1, exp: "Pilot Light keeps the absolute minimum running (core data replication). On disaster, you 'fan the pilot light' by launching EC2 instances, Load Balancers, and other compute from scratch. RTO is minutes to an hour." }
    ]
  }
];

// ═══════════════════════════════════════════════════════════════
// INJECT INTO DATA.JS
// ═══════════════════════════════════════════════════════════════
let content = fs.readFileSync('data.js', 'utf8');
let evalContent = content.replace('const DATA =', 'var DATA=');
eval(evalContent);

DATA.daily_lessons = daily_lessons;

fs.writeFileSync('data.js', 'const DATA = ' + JSON.stringify(DATA, null, 4) + ';', 'utf8');
console.log('Successfully injected', daily_lessons.length, 'daily lessons into data.js');
