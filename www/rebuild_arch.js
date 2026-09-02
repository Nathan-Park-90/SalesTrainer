const fs = require('fs');
let content = fs.readFileSync('data.js', 'utf8');
let evalContent = content.replace('const DATA =', 'var DATA=');
eval(evalContent);

// ═══════════════════════════════════════════════════════════
// REPLACE ALL ARCH SCENARIOS — proper structure throughout
// Engine uses: title, desc, zones[{id, label, needed[]}], palette[], dm{}, wm
// ═══════════════════════════════════════════════════════════
DATA.arch = [
    {
        title: "Level 1: High-Availability Web App",
        desc: "Mammoth Capital's trading dashboard serves 10,000 users. The CTO says: 'If this goes down during market hours, heads will roll.' Build a fault-tolerant, multi-AZ web architecture. Place each AWS service into the correct tier.",
        zones: [
            { id: "dns", label: "🌐 DNS & Routing", needed: ["Route 53"] },
            { id: "edge", label: "🛡️ Load Balancing", needed: ["Application Load Balancer"] },
            { id: "compute", label: "⚡ Compute (Multi-AZ)", needed: ["EC2 Auto Scaling Group"] },
            { id: "data", label: "🗄️ Database (Multi-AZ)", needed: ["Amazon RDS (Multi-AZ)"] }
        ],
        palette: [
            "Route 53",
            "Application Load Balancer",
            "EC2 Auto Scaling Group",
            "Amazon RDS (Multi-AZ)",
            "AWS Lambda (Decoy — serverless, not needed here)",
            "Amazon DynamoDB (Decoy — NoSQL, wrong for relational data)",
            "Single EC2 Instance (Decoy — single point of failure)"
        ],
        dm: {
            "AWS Lambda (Decoy — serverless, not needed here)": "⚠️ Lambda is serverless — great for event-driven tasks but not a drop-in for a stateful web application. Use EC2 with an ASG for this persistent web tier.",
            "Amazon DynamoDB (Decoy — NoSQL, wrong for relational data)": "⚠️ DynamoDB is NoSQL. The trading dashboard requires relational data with complex queries — that's RDS territory.",
            "Single EC2 Instance (Decoy — single point of failure)": "⚠️ A single EC2 instance is a single point of failure. The CTO would not approve. You need an Auto Scaling Group across multiple AZs."
        },
        wm: "🏆 Correct! Route 53 → ALB → EC2 ASG across 2+ AZs → RDS Multi-AZ. This is the canonical HA web architecture. The ALB distributes traffic across healthy AZs; the ASG replaces failed instances automatically; RDS Multi-AZ fails over in under 2 minutes."
    },
    {
        title: "Level 2: Secure Three-Tier Architecture",
        desc: "A FinTech client's compliance team has one rule: 'The database must NEVER be reachable from the internet. Not even for a millisecond.' Design a proper VPC-based three-tier architecture with strict network segmentation.",
        zones: [
            { id: "public", label: "🌐 Public Tier (internet-facing)", needed: ["Application Load Balancer", "NAT Gateway"] },
            { id: "private_app", label: "🔒 Private App Tier (no direct internet)", needed: ["EC2 (Private Subnet)"] },
            { id: "private_db", label: "🏦 Private Data Tier (database only)", needed: ["Amazon RDS (Private Subnet)"] },
            { id: "security", label: "🛡️ Security Controls", needed: ["Security Groups", "Network ACLs (NACLs)"] }
        ],
        palette: [
            "Application Load Balancer",
            "NAT Gateway",
            "EC2 (Private Subnet)",
            "Amazon RDS (Private Subnet)",
            "Security Groups",
            "Network ACLs (NACLs)",
            "EC2 (Public Subnet) (Decoy — app servers belong in private subnets)",
            "Internet Gateway on RDS (Decoy — databases must never be public)",
            "S3 as a Database (Decoy — S3 is object storage, not a relational DB)"
        ],
        dm: {
            "EC2 (Public Subnet) (Decoy — app servers belong in private subnets)": "⚠️ App servers in a public subnet are directly exposed to the internet. They must sit in a private subnet, accessible only via the ALB.",
            "Internet Gateway on RDS (Decoy — databases must never be public)": "⚠️ Fatal flaw! Attaching an Internet Gateway route to the RDS subnet would make the database internet-routable — an immediate compliance violation.",
            "S3 as a Database (Decoy — S3 is object storage, not a relational DB)": "⚠️ S3 is object storage — it stores files, not rows. You can't run SQL queries against S3 directly. That's what RDS is for."
        },
        wm: "🏆 Correct! Public tier: ALB (receives traffic) + NAT Gateway (lets private instances call out). Private App tier: EC2 in private subnets (never internet-facing). Private DB tier: RDS in isolated subnets. Security: SGs at the instance level + NACLs at the subnet level = defense in depth."
    },
    {
        title: "Level 2.5: Serverless Order Processing Pipeline",
        desc: "Mammoth Capital needs to process trade orders asynchronously. When a trade is executed, it must: (1) queue the order reliably, (2) trigger processing logic, (3) store the result, and (4) notify the analyst. Build the event-driven pipeline.",
        zones: [
            { id: "queue", label: "📬 Reliable Order Queue (strictly ordered)", needed: ["Amazon SQS FIFO Queue"] },
            { id: "compute", label: "⚡ Processing Logic (serverless)", needed: ["AWS Lambda"] },
            { id: "store", label: "🗄️ Result Store (high-speed key-value)", needed: ["Amazon DynamoDB"] },
            { id: "notify", label: "📣 Multi-Channel Notifications", needed: ["Amazon SNS"] }
        ],
        palette: [
            "Amazon SQS FIFO Queue",
            "AWS Lambda",
            "Amazon DynamoDB",
            "Amazon SNS",
            "Amazon SQS Standard Queue (Decoy — standard doesn't guarantee order)",
            "Amazon RDS (Decoy — too heavy for high-speed serverless lookups)",
            "Amazon EC2 (Decoy — EC2 needs 24/7 management, defeats the purpose)"
        ],
        dm: {
            "Amazon SQS Standard Queue (Decoy — standard doesn't guarantee order)": "⚠️ Standard SQS queues are 'at-least-once' delivery with best-effort ordering. For financial transactions, you MUST use FIFO queues to guarantee order and exactly-once processing.",
            "Amazon RDS (Decoy — too heavy for high-speed serverless lookups)": "⚠️ RDS requires connection management, which is a major challenge with Lambda at scale (connection pooling exhaustion). DynamoDB is serverless-native and scales to millions of operations per second.",
            "Amazon EC2 (Decoy — EC2 needs 24/7 management, defeats the purpose)": "⚠️ Using EC2 for this processing logic requires you to manage servers, patching, scaling groups — all the overhead Lambda was designed to eliminate."
        },
        wm: "🏆 Correct! SQS FIFO (guaranteed order) → Lambda (serverless processing) → DynamoDB (fast result storage) → SNS (fanout notifications to email, Slack, other queues simultaneously). This is the textbook event-driven serverless pipeline."
    },
    {
        title: "Level 3: Cost-Optimised Data Lake",
        desc: "Mammoth Capital runs 50TB of trade history. Hot data (last 30 days) is accessed daily by quants. Warm data (90 days) is accessed weekly. Cold data (5+ years) is almost never touched but must survive a regulatory audit. Optimize for cost without sacrificing access patterns.",
        zones: [
            { id: "hot", label: "🔥 Hot Data (daily access, fastest retrieval)", needed: ["S3 Standard"] },
            { id: "warm", label: "🌡️ Warm Data (weekly access)", needed: ["S3 Standard-IA"] },
            { id: "cold", label: "❄️ Cold Archive (rare access, 12hr retrieval OK)", needed: ["S3 Glacier Deep Archive"] },
            { id: "query", label: "🔎 Query Engine (SQL on S3 without moving data)", needed: ["Amazon Athena"] }
        ],
        palette: [
            "S3 Standard",
            "S3 Standard-IA",
            "S3 Glacier Deep Archive",
            "Amazon Athena",
            "S3 One Zone-IA (Decoy — single AZ, not suitable for compliance data)",
            "Amazon RDS (Decoy — too expensive and rigid for 50TB of unstructured logs)",
            "Amazon Redshift (Decoy — overkill for ad-hoc querying; Athena is cheaper)"
        ],
        dm: {
            "S3 One Zone-IA (Decoy — single AZ, not suitable for compliance data)": "⚠️ One Zone-IA stores data in a single Availability Zone. If that AZ fails, your compliance data is gone. Regulatory data must use Standard-IA or Glacier which are multi-AZ by design.",
            "Amazon RDS (Decoy — too expensive and rigid for 50TB of unstructured logs)": "⚠️ Storing 50TB of trade logs in RDS would cost a fortune and require complex schema management. S3 is the right foundation for a data lake at this scale.",
            "Amazon Redshift (Decoy — overkill for ad-hoc querying; Athena is cheaper)": "⚠️ Redshift is a managed data warehouse requiring cluster provisioning and ongoing costs. For ad-hoc SQL queries directly on S3 data, Athena (pay-per-query, serverless) is significantly cheaper."
        },
        wm: "🏆 Correct! S3 Standard (hot) → S3 Standard-IA (warm, 40% cheaper) → S3 Glacier Deep Archive (cold, 95% cheaper than Standard) + Athena to run SQL queries directly against S3 without loading data into a database. This is exactly how real-world data lakes are built at financial firms."
    },
    {
        title: "Level 4: The Final Boss — Global Active-Active Platform",
        desc: "Mammoth Capital is expanding globally. The system must: serve users worldwide with under 50ms latency, auto-scale serverlessly to handle 1M requests/second during market open, store data in a globally replicated NoSQL database, and block malicious traffic at the edge. No single point of failure. No servers to manage. Go.",
        zones: [
            { id: "edge", label: "🌍 Global Edge & Security", needed: ["Amazon CloudFront", "AWS WAF"] },
            { id: "dns", label: "🗺️ Intelligent DNS Routing", needed: ["Route 53 (Latency-Based)"] },
            { id: "compute", label: "⚡ Serverless Compute Layer", needed: ["Amazon API Gateway", "AWS Lambda"] },
            { id: "data", label: "🌐 Globally Replicated Data", needed: ["DynamoDB Global Tables"] }
        ],
        palette: [
            "Amazon CloudFront",
            "AWS WAF",
            "Route 53 (Latency-Based)",
            "Amazon API Gateway",
            "AWS Lambda",
            "DynamoDB Global Tables",
            "Application Load Balancer (Decoy — regional only, not global)",
            "Amazon RDS Multi-AZ (Decoy — single region, not globally replicated)",
            "Amazon EC2 Auto Scaling (Decoy — EC2 is not serverless)"
        ],
        dm: {
            "Application Load Balancer (Decoy — regional only, not global)": "⚠️ ALBs are regional resources. CloudFront is the global edge layer that routes users to the nearest regional origin — the ALB would sit behind CloudFront at the origin, not replace it.",
            "Amazon RDS Multi-AZ (Decoy — single region, not globally replicated)": "⚠️ RDS Multi-AZ provides high availability within a single region. For a globally active-active database, you need DynamoDB Global Tables which replicate across multiple AWS regions automatically.",
            "Amazon EC2 Auto Scaling (Decoy — EC2 is not serverless)": "⚠️ EC2 requires server management, patching, and capacity planning — none of which are 'serverless'. Lambda + API Gateway is the answer for the serverless compute tier."
        },
        wm: "🏆 FINAL BOSS CLEARED! CloudFront (global cache + DDoS layer) + WAF (Layer 7 security) → Route 53 Latency-Based (routes to closest region) → API Gateway + Lambda (serverless compute, scales to 1M req/s) → DynamoDB Global Tables (active-active replication across regions). Zero servers. Zero single points of failure. This is enterprise-grade cloud architecture."
    }
];

fs.writeFileSync('data.js', 'const DATA = ' + JSON.stringify(DATA, null, 4) + ';', 'utf8');
console.log('Rebuilt', DATA.arch.length, 'architecture scenarios with full data structure.');
