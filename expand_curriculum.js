const fs = require('fs');

let c = fs.readFileSync('data.js', 'utf8').replace('const DATA =', 'var DATA=');
eval(c);

// =============================================================
// STEP 1: PURGE DUPLICATE SALES FLASHCARDS
// =============================================================
// Cards 6-20 (index 5-19) are all identical clones. Remove them,
// keeping only the first unique Sales scenario card.
const salesCards = DATA.flashcards.filter(f => f.cat === 'Sales');
const awsCards = DATA.flashcards.filter(f => f.cat !== 'Sales');

// Deduplicate by keeping only unique front text
const seenFronts = new Set();
const uniqueSalesCards = salesCards.filter(f => {
    const key = f.front.substring(0, 60);
    if (!seenFronts.has(key)) { seenFronts.add(key); return true; }
    return false;
});

console.log('Sales cards before purge:', salesCards.length);
console.log('Unique Sales cards kept:', uniqueSalesCards.length);

DATA.flashcards = [...awsCards, ...uniqueSalesCards];


// =============================================================
// STEP 2: INJECT NEW TOPICS INTO EXISTING MODULES
// =============================================================

// --- MODULE 3: VPC → Add VPC Endpoints (topic 3) ---
const vpcModule = DATA.course.find(m => m.title.includes('VPC') || m.title.includes('Networking Thunderdome'));
if (vpcModule) {
    vpcModule.topics.push({
        id: 3003,
        title: "VPC Endpoints (Gateway vs Interface)",
        prose: `
            <p>By default, when your EC2 instance or Lambda function calls an AWS service like S3 or DynamoDB, that traffic exits your VPC and travels over the public internet — even though both endpoints are owned by Amazon. This is both a security risk and a latency problem.</p>
            <p>A <strong>VPC Endpoint</strong> is a private, high-speed tunnel that connects your VPC directly to an AWS service without ever touching the public internet. You route the traffic privately within Amazon's backbone network.</p>
            <p><strong>Gateway Endpoint:</strong> Free. Only works with S3 and DynamoDB. You add a route in your Route Table pointing to the endpoint.</p>
            <p><strong>Interface Endpoint (PrivateLink):</strong> Creates an Elastic Network Interface (ENI) with a private IP inside your subnet. Works with almost all AWS services (SQS, SNS, SSM, KMS, API Gateway, etc.). There is an hourly cost.</p>
            <br><br><div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> VPC Endpoints are like a private underground tunnel between your office and the bank. Without it, your armored truck has to drive on the public highway (internet). With a Gateway Endpoint, Amazon built you a free direct ramp to S3 and DynamoDB. With a PrivateLink Interface Endpoint, you get a private dedicated tunnel to any AWS service — at a small toll.</div>
            <div class="lesson-alert"><strong>Exam Tip:</strong> The question "How do you allow a Lambda in a private subnet to access S3 without internet access?" always has one answer: <strong>Gateway Endpoint</strong>. This is one of the most commonly tested networking scenarios on the SAA-C03.</div>
        `,
        tags: ['networking', 'vpc', 'endpoints']
    });
    console.log('✅ VPC Endpoints topic added.');
}

// --- MODULE 4: COMPUTE → Add EC2 Cost Optimization (topic 3) ---
const computeModule = DATA.course.find(m => m.title.includes('Compute (EC2'));
if (computeModule) {
    computeModule.topics.push({
        id: 4003,
        title: "EC2 Cost Optimization: Reserved, Spot & Savings Plans",
        prose: `
            <p>Running On-Demand EC2 instances 24/7 is the most expensive way to use AWS. The SAA-C03 will test your ability to recommend the right pricing model for a given scenario.</p>
            <p><strong>On-Demand:</strong> Pay by the second. No commitment. Most expensive. Use for: unpredictable workloads, short-term projects, dev/test environments you'll kill quickly.</p>
            <p><strong>Reserved Instances (RIs):</strong> 1 or 3-year commitment. Up to 72% savings. Use for: steady-state, predictable workloads (production databases, web servers that run 24/7). Standard RIs lock you to one instance type. Convertible RIs allow you to change the instance type.</p>
            <p><strong>Savings Plans:</strong> A newer, more flexible commitment model. Instead of reserving specific instance types, you commit to a minimum dollar spend per hour (e.g., $5/hr). AWS automatically applies the discount to any EC2, Lambda, or Fargate usage. Simpler and more flexible than RIs.</p>
            <p><strong>Spot Instances:</strong> Bid on spare AWS capacity at up to 90% savings. The catch: AWS can terminate your instance with a 2-minute warning if they need the capacity back. Use for: fault-tolerant batch processing, big data workloads, ML training jobs. NEVER for production databases.</p>
            <br><br><div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> On-Demand is an Uber — premium price, zero commitment. Reserved Instances are a 3-year car lease — you save significantly but you're locked in. Savings Plans are a monthly gas budget — you commit to spend $200 on fuel and get a discount on whatever car you fill up. Spot Instances are standby airline tickets — dirt cheap, but the airline can bump you if a paying passenger shows up.</div>
            <div class="lesson-alert"><strong>Exam Tip:</strong> The SAA-C03 loves this question pattern: <em>"A company needs a web server that must be running 24/7 for the next 3 years. What is the most cost-effective option?"</em> The answer is <strong>Reserved Instances</strong>, not On-Demand or Spot.</div>
        `,
        tags: ['compute', 'ec2', 'cost', 'savings']
    });
    console.log('✅ EC2 Cost Optimization topic added.');
}

// --- MODULE 5: STORAGE → Add S3 Lifecycle Policies (topic 3) + S3 Security (topic 4) ---
const storageModule = DATA.course.find(m => m.title.includes('Storage'));
if (storageModule) {
    storageModule.topics.push({
        id: 5003,
        title: "S3 Lifecycle Policies & Cost Optimization",
        prose: `
            <p>Storing everything in S3 Standard forever is wasteful. Most data follows a predictable lifecycle: it is accessed frequently when new, then barely ever accessed after 90 days. S3 Lifecycle Policies allow you to automate the movement of objects between storage tiers based on age.</p>
            <p><strong>S3 Standard:</strong> Frequently accessed. Most expensive per GB. Millisecond retrieval.</p>
            <p><strong>S3 Standard-IA (Infrequent Access):</strong> Same millisecond retrieval but a lower storage cost and a retrieval fee. Use for data accessed once a month or less.</p>
            <p><strong>S3 One Zone-IA:</strong> Same as Standard-IA but stored in only 1 AZ. 20% cheaper but no multi-AZ resilience. Good for easily reproducible data like thumbnail images.</p>
            <p><strong>S3 Glacier Instant Retrieval:</strong> Archive storage, millisecond retrieval. For data accessed once per quarter.</p>
            <p><strong>S3 Glacier Flexible Retrieval:</strong> Minutes to hours retrieval. Very cheap. Good for backups and disaster recovery data.</p>
            <p><strong>S3 Glacier Deep Archive:</strong> The cheapest option. Up to 12-hour retrieval. For long-term archival (7–10 year compliance requirements). Pennies per TB per month.</p>
            <p>A <strong>Lifecycle Policy</strong> automates all of this: "After 30 days, move to Standard-IA. After 90 days, move to Glacier Flexible. After 365 days, delete."</p>
            <br><br><div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Think of your email inbox. New emails sit in your inbox (S3 Standard — fast access). After a month, emails move to an archive folder (Glacier Instant). After a year, you export them to a zip file on a hard drive (Glacier Deep Archive — cheap, but takes time to find something). An S3 Lifecycle Policy is the automation rule that does all of this for you without any manual work.</div>
            <div class="lesson-alert"><strong>Exam Tip:</strong> <em>"What is the cheapest way to store compliance audit logs that must be retained for 7 years and will never be accessed unless there is a legal dispute?"</em> Answer: <strong>S3 Glacier Deep Archive</strong>.</div>
        `,
        tags: ['storage', 's3', 'cost', 'savings']
    });

    storageModule.topics.push({
        id: 5004,
        title: "S3 Security: Bucket Policies, ACLs & Pre-Signed URLs",
        prose: `
            <p>S3 security has multiple layers, and understanding their interaction is critical for both the exam and real-world architecture.</p>
            <p><strong>Block Public Access:</strong> A master override at the account or bucket level. If enabled, no bucket policy or ACL can make objects publicly accessible, regardless of what the policy says. Always enable this on buckets that should never be public. This is your first line of defense.</p>
            <p><strong>Bucket Policies:</strong> JSON-based resource policies attached directly to the bucket. They control who (IAM users, roles, other accounts, everyone) can access which objects and which actions (GetObject, PutObject, DeleteObject) they can perform. Use for cross-account access and public-read patterns.</p>
            <p><strong>ACLs (Access Control Lists):</strong> Legacy mechanism. AWS now recommends disabling ACLs and using Bucket Policies exclusively. If you see ACLs on the exam, they are usually the wrong answer for modern architectures.</p>
            <p><strong>Pre-Signed URLs:</strong> You generate a temporary URL that grants a specific user access to a specific object for a limited time (e.g., 1 hour). After expiry, the URL is dead. This is the correct pattern for sharing private objects with external users without making the bucket public.</p>
            <br><br><div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Block Public Access is the master building lockdown switch. Bucket Policies are the keycard access rules on each room. ACLs are the old paper visitor log — technically still work, but nobody uses them for modern security. A Pre-Signed URL is the temporary visitor badge the front desk prints for a contractor — it expires tonight and grants access to only one room.</div>
            <div class="lesson-alert"><strong>Exam Tip:</strong> <em>"A media company stores private video files in S3. Authenticated users should be able to stream videos for 24 hours. What is the correct approach?"</em> Answer: <strong>Generate Pre-Signed URLs with a 24-hour expiry.</strong></div>
        `,
        tags: ['storage', 's3', 'security']
    });
    console.log('✅ S3 Lifecycle and S3 Security topics added.');
}

// --- MODULE 6: DATABASES → Add ElastiCache (topic 3) ---
const dbModule = DATA.course.find(m => m.title.includes('Databases'));
if (dbModule) {
    dbModule.topics.push({
        id: 6003,
        title: "ElastiCache: The Caching Layer (Redis vs Memcached)",
        prose: `
            <p>Your database is fast, but not fast enough when thousands of users simultaneously query the same product catalog or user profile data. Every query hits the disk. ElastiCache puts a blazing-fast, in-memory cache in front of your database so repeated queries return in microseconds — without ever touching the database.</p>
            <p><strong>Redis:</strong> Feature-rich. Supports persistence (data survives a restart), replication, pub/sub messaging, sorted sets, and Multi-AZ failover. Use Redis when you need cache + session storage + real-time leaderboards + pub/sub in the same service.</p>
            <p><strong>Memcached:</strong> Simple, fast, horizontally scalable cache. No persistence, no replication, no complex data types. Use Memcached when you need pure, dead-simple object caching and you can afford to lose the cache on restart (it just warms up again from the database).</p>
            <p><strong>The Lazy Loading Pattern:</strong> Application checks the cache first. Cache hit → return data instantly. Cache miss → query the database, store the result in cache, return data. Subsequent requests for the same data are served entirely from the cache.</p>
            <br><br><div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> ElastiCache is the RAM in your laptop compared to the hard drive (your database). Your CPU (application) checks RAM first because it is 100x faster. If the data isn't in RAM (cache miss), it pulls from the hard drive (database) and copies it to RAM for next time. Redis is like having RAM that also autosaves to disk — if you restart, your data is still there. Memcached is pure RAM — restart and it's gone, but it's simpler and slightly faster.</div>
            <div class="lesson-alert"><strong>Exam Tip:</strong> <em>"Your RDS database is under constant read pressure from users loading the same product pages. The cheapest fix without application changes?"</em> Answer: <strong>ElastiCache</strong>. Not a Read Replica (that costs more) — a cache layer is the first architectural recommendation for read-heavy workloads.</div>
        `,
        tags: ['database', 'elasticache', 'redis', 'cache', 'performance']
    });
    console.log('✅ ElastiCache topic added.');
}

// --- MODULE 7: ADVANCED NETWORKING → Expand Route 53 topic ---
const networkModule = DATA.course.find(m => m.title.includes('Advanced Networking'));
if (networkModule) {
    const r53Topic = networkModule.topics.find(t => t.title.includes('Route 53'));
    if (r53Topic) {
        r53Topic.prose = `
            <p>Route 53 is AWS's Domain Name System (DNS) and traffic routing service. DNS is the phonebook of the internet — it translates human-readable domain names (www.mammoth.com) into IP addresses (54.22.33.11) that computers can route to. Route 53 goes far beyond simple DNS with 5 distinct routing policies the exam will test you on.</p>
            <p><strong>1. Simple Routing:</strong> One record, one destination. No health checks. Your domain points to one IP. Use for single-server setups.</p>
            <p><strong>2. Weighted Routing:</strong> Distribute traffic across multiple resources by percentage. 80% to Server A, 20% to Server B. Use for: A/B testing new deployments, canary releases, gradual traffic migrations.</p>
            <p><strong>3. Latency-Based Routing:</strong> Route users to the AWS Region with the lowest latency for their geographic location. A user in Tokyo goes to ap-northeast-1; a user in London goes to eu-west-1. Use for: global applications where response speed is critical.</p>
            <p><strong>4. Failover Routing:</strong> Active-Passive disaster recovery. All traffic goes to the Primary endpoint. Route 53 runs health checks. If the Primary fails, traffic instantly fails over to the Secondary. Use for: DR architecture.</p>
            <p><strong>5. Geolocation Routing:</strong> Route based on the user's physical location, regardless of latency. Users in Germany go to the EU server. Users in the US go to the US server. Use for: regulatory compliance, regional content, data sovereignty requirements (GDPR).</p>
            <br><br><div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Simple = give everyone the same phone number. Weighted = route 80% of sales calls to your best rep, 20% to a new hire for training. Latency = route the call to whoever can answer fastest. Failover = if your main office is closed, forward to the backup office. Geolocation = calls from France go to the French-speaking team, regardless of who picks up fastest.</div>
            <div class="lesson-alert"><strong>Exam Tip:</strong> The exam will confuse Latency and Geolocation routing. Remember: <strong>Latency = performance optimization</strong> (closest server). <strong>Geolocation = compliance/legal</strong> (correct server by law). A French user might get better latency from a US server, but GDPR forces Geolocation routing to the EU server.</div>
        `;
        r53Topic.tags = ['networking', 'route53', 'dns', 'ha'];
        console.log('✅ Route 53 topic expanded to all 5 policies.');
    }
}

// --- MODULE 8: SECURITY → Add Secrets Manager vs Parameter Store (topic 4) ---
const secModule = DATA.course.find(m => m.title.includes('Security, Identity'));
if (secModule) {
    secModule.topics.push({
        id: 8004,
        title: "Secrets Manager vs Parameter Store & AWS STS",
        prose: `
            <p>Your application needs to connect to a database. The connection string contains a username and a password. Where do you store this secret? Not in your source code. Not in an environment variable. AWS provides two managed solutions, and the exam will test when to use each.</p>
            <p><strong>AWS Systems Manager Parameter Store:</strong> Free for Standard tier. Stores configuration strings and secrets as key-value pairs. SecureString parameters encrypt values using KMS. Best for: non-sensitive configuration values, feature flags, and simple secrets where you control rotation manually.</p>
            <p><strong>AWS Secrets Manager:</strong> Costs $0.40/secret/month. Key differentiator: <strong>automatic rotation</strong>. Secrets Manager can natively rotate credentials for RDS, Redshift, and DocumentDB on a schedule (e.g., every 30 days) without any downtime. Your Lambda calls GetSecretValue at runtime and gets the current, rotated password — no redeployment required. Best for: production database credentials, API keys, any secret that must rotate automatically for compliance (SOC 2, PCI-DSS, HIPAA).</p>
            <p><strong>AWS STS (Security Token Service):</strong> When an IAM Role is assumed (by a Lambda, EC2, or another account), STS is the service that vends the temporary security credentials (Access Key ID, Secret Access Key, Session Token). These temporary credentials auto-expire in minutes to hours. This is how cross-account access works: Account A assumes a role in Account B via STS, gets temporary credentials, and accesses Account B's resources without any long-term keys being stored anywhere.</p>
            <br><br><div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Parameter Store is a secure sticky note on the fridge — you write the password down and it's encrypted. Secrets Manager is a bank vault with an automated locksmith who changes the combination every 30 days and tells your systems the new combination automatically. STS is the security desk that issues temporary visitor badges — the badge works for your visit and self-destructs at 5 PM.</div>
            <div class="lesson-alert"><strong>Exam Tip:</strong> The decision rule is simple: <strong>If automatic rotation is required → Secrets Manager. If you just need encrypted config storage → Parameter Store SecureString (free).</strong> Any question mentioning RDS credential rotation will always point to Secrets Manager.</div>
        `,
        tags: ['security', 'secrets', 'sts', 'iam', 'credentials']
    });
    console.log('✅ Secrets Manager & STS topic added.');
}

// --- NEW MODULE: MESSAGING (SQS & SNS) ---
// Insert after Databases (Module 6 index) and before Advanced Networking
const dbModuleIdx = DATA.course.findIndex(m => m.title.includes('Databases'));
const messagingModule = {
    id: 7000,
    title: "Module X: Messaging & Decoupled Architecture",
    topics: [
        {
            id: 7001,
            title: "SQS: The Message Queue (Decoupling Services)",
            prose: `
                <p>What happens if your order processing service crashes while you have 10,000 pending orders? Without a queue, every one of those orders is lost. <strong>SQS (Simple Queue Service)</strong> is the answer to this problem. It is a fully managed message queue that acts as a buffer between services, completely decoupling them from each other.</p>
                <p>Producer services push messages onto the queue. Consumer services pull messages from the queue and process them at their own pace. If the consumer crashes, the messages stay safely in the queue and are reprocessed when it recovers.</p>
                <p><strong>Standard Queue:</strong> Unlimited throughput, at-least-once delivery (messages may be delivered twice), best-effort ordering. Use for most workloads.</p>
                <p><strong>FIFO Queue:</strong> First-In-First-Out ordering guaranteed, exactly-once processing. Limited to 3,000 messages/second. Use for: financial transactions, order processing where sequence and de-duplication matter.</p>
                <p><strong>Visibility Timeout:</strong> When a consumer picks up a message, that message becomes invisible to other consumers for a set period. If the consumer crashes before finishing, the timeout expires and the message reappears for another consumer to pick up. This is how SQS achieves fault tolerance.</p>
                <p><strong>Dead Letter Queue (DLQ):</strong> If a message fails processing more than N times, SQS moves it to a DLQ for investigation. This prevents a "poison pill" message from endlessly blocking the queue.</p>
                <br><br><div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> SQS is the order ticket rack in a restaurant kitchen. Waiters (producers) pin tickets to the rack as orders come in. Chefs (consumers) pull tickets at their own pace — they don't need to know how many waiters there are, and waiters don't need to know how many chefs are working. If the kitchen burns down (consumer crashes), the tickets are still on the rack when a new kitchen opens.</div>
                <div class="lesson-alert"><strong>Exam Tip:</strong> The word "decouple" in an exam question is almost always answered with <strong>SQS</strong>. The words "ordering" and "exactly-once" point to <strong>FIFO Queue</strong>. The phrase "failed messages" or "retry analysis" points to a <strong>Dead Letter Queue</strong>.</div>
            `,
            tags: ['messaging', 'sqs', 'decoupling', 'resilient']
        },
        {
            id: 7002,
            title: "SNS: The Notification Bus (Fan-Out Pattern)",
            prose: `
                <p>SQS is a point-to-point queue: one producer, one consumer type. But what if one event needs to trigger multiple different systems simultaneously? That is the problem <strong>SNS (Simple Notification Service)</strong> solves.</p>
                <p>SNS is a pub/sub (publish/subscribe) messaging service. You publish a message to an SNS Topic. Every subscriber to that topic receives an immediate copy of that message simultaneously. Subscribers can be: SQS queues, Lambda functions, HTTP endpoints, email addresses, or SMS numbers.</p>
                <p><strong>The Fan-Out Pattern:</strong> An S3 upload event publishes to an SNS Topic. That topic simultaneously triggers: a Lambda that creates a thumbnail, an SQS queue that feeds a video transcoder, and an email notification to the content team. One event, three simultaneous actions — no polling, no delays.</p>
                <p><strong>SNS vs SQS:</strong> SNS is push-based (it pushes to subscribers). SQS is pull-based (consumers poll the queue). SNS delivers once and forgets; SQS retains messages until a consumer processes them.</p>
                <br><br><div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> SQS is a work order handed to one specific department. SNS is a PA system announcement to the entire building — every department (Lambda, SQS, email) hears it simultaneously and acts on it independently. The Fan-Out pattern is when you use the PA system to broadcast to multiple SQS queues, letting each department process the announcement at their own pace.</div>
                <div class="lesson-alert"><strong>Exam Tip:</strong> The question <em>"An S3 event must trigger multiple Lambda functions simultaneously"</em> is answered with <strong>SNS Fan-Out → multiple Lambda subscriptions</strong>. If the question says "ensure each consumer processes the message independently at their own rate," combine SNS + SQS: <strong>SNS fans out to multiple SQS queues</strong>, each with their own consumer.</div>
            `,
            tags: ['messaging', 'sns', 'fanout', 'pubsub', 'resilient']
        }
    ]
};

if (dbModuleIdx !== -1) {
    DATA.course.splice(dbModuleIdx + 1, 0, messagingModule);
    console.log('✅ Messaging Module (SQS & SNS) inserted.');
}

// --- NEW MODULE: COST OPTIMIZATION ---
// Add near the end before Sales modules
const costModule = {
    id: 15000,
    title: "Module X: Cost Optimization (The CFO's Architecture)",
    topics: [
        {
            id: 15001,
            title: "AWS Cost Tools: Explorer, Budgets & Trusted Advisor",
            prose: `
                <p>Domain 4 of the SAA-C03 is entirely about Cost Optimization — 20% of your exam score. Beyond choosing the right pricing model for EC2, you need to know the AWS cost governance toolset.</p>
                <p><strong>AWS Cost Explorer:</strong> A visual analytics dashboard that shows you exactly how much you've spent, broken down by service, region, account, or tag. It shows historical spending and can forecast future costs. Use it to identify: which service is costing the most, where there are unexpected spikes, and trends over time.</p>
                <p><strong>AWS Budgets:</strong> A proactive alerting tool. You set a spending threshold (e.g., $500/month) and AWS sends you an email or triggers an action (like stopping an EC2 instance) when you're forecasted to exceed it. This is cost control, not just reporting.</p>
                <p><strong>AWS Trusted Advisor:</strong> An automated best-practice checklist across 5 categories: Cost Optimization, Security, Fault Tolerance, Performance, and Service Limits. In the Cost category, Trusted Advisor will flag: underutilized EC2 instances, idle Load Balancers, unassociated Elastic IPs, and Reserved Instances that are about to expire.</p>
                <p><strong>AWS Compute Optimizer:</strong> Uses machine learning to analyze your EC2 usage patterns and recommend right-sizing. If you provisioned a large instance type but your CPU averages 5%, it will recommend downsizing to a smaller, cheaper type.</p>
                <br><br><div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Cost Explorer is your monthly bank statement — it shows you what you spent and where. Budgets is the alert you set on your credit card for fraud protection — it warns you before you blow the limit. Trusted Advisor is your financial advisor doing a quarterly audit of your portfolio, flagging waste and risk. Compute Optimizer is the advisor telling you that you're driving a Ferrari to the grocery store — you'd save money with a Honda.</div>
                <div class="lesson-alert"><strong>Exam Tip:</strong> <em>"A company wants to receive an alert if their monthly AWS bill exceeds $1,000."</em> → <strong>AWS Budgets</strong>. <em>"A company wants to analyze which services drove a 30% cost increase last quarter."</em> → <strong>AWS Cost Explorer</strong>.</div>
            `,
            tags: ['cost', 'governance', 'budgets', 'trusted-advisor']
        },
        {
            id: 15002,
            title: "Right-Sizing & Savings Plans Architecture",
            prose: `
                <p>Cost optimization is not just picking the right pricing model upfront — it is an ongoing practice of right-sizing your architecture as your usage patterns become understood.</p>
                <p><strong>Right-Sizing:</strong> Many teams over-provision resources during launch ("let's use xl instances to be safe") and never revisit them. Right-sizing means analyzing actual CPU, memory, and network utilization (via CloudWatch and Compute Optimizer) and downgrading to the smallest instance type that still handles peak load with headroom.</p>
                <p><strong>Savings Plans (vs. Reserved Instances):</strong> Savings Plans are the modern evolution of Reserved Instances. Rather than committing to a specific instance type, family, and region, you commit to a minimum spend rate (e.g., $5/hour). AWS automatically applies the discount to your highest-cost EC2, Lambda, and Fargate usage, regardless of type or region. Compute Savings Plans offer more flexibility. EC2 Instance Savings Plans offer deeper discounts but lock you to a family and region.</p>
                <p><strong>S3 Cost Best Practices:</strong> Enable S3 Intelligent-Tiering for any data where you're unsure of access patterns — AWS automatically moves objects to cheaper tiers when they haven't been accessed. Use Lifecycle Policies to transition archival data to Glacier. Delete incomplete multipart uploads with a lifecycle rule.</p>
                <p><strong>Tagging Strategy:</strong> Every resource should have cost allocation tags (Project, Environment, Owner). This allows Cost Explorer to break down spending by team or feature, enabling accountability and identifying waste at the team level.</p>
                <br><br><div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Right-sizing is like checking your phone plan after 6 months and realizing you're paying for unlimited data but only using 2GB. Savings Plans are a monthly gym membership — you commit to paying whether you go or not, but you pay far less per visit than if you paid drop-in rates. S3 Intelligent-Tiering is a smart filing cabinet that automatically moves old files to a cheaper, slower drawer — you never need to think about it.</div>
                <div class="lesson-alert"><strong>Exam Tip:</strong> <em>"A company wants to reduce costs without changing their application architecture. What is the first action?"</em> The answer is always <strong>Compute Optimizer / right-sizing</strong> first, then consider Reserved Instances or Savings Plans for the correctly-sized fleet.</div>
            `,
            tags: ['cost', 'savings', 'rightsizing', 'compute']
        }
    ]
};

// Insert before the Sales modules (Modules 12+)
const firstSalesModuleIdx = DATA.course.findIndex(m =>
    m.title.includes('Enterprise Sales') || m.title.includes('Zero Trust') || m.title.includes('Hostile')
);
if (firstSalesModuleIdx !== -1) {
    DATA.course.splice(firstSalesModuleIdx, 0, costModule);
    console.log('✅ Cost Optimization Module inserted.');
} else {
    DATA.course.push(costModule);
    console.log('✅ Cost Optimization Module appended.');
}

// =============================================================
// STEP 3: RENUMBER ALL MODULES
// =============================================================
DATA.course.forEach((mod, idx) => {
    mod.title = mod.title.replace(/^Module (\d+|X):/, `Module ${idx + 1}:`);
});
console.log('✅ All modules renumbered.');

// =============================================================
// STEP 4: INJECT ALL NEW FLASHCARDS
// =============================================================
const newFlashcards = [
    // VPC Endpoints
    {
        id: 201,
        cat: 'AWS',
        domain: 'Secure',
        front: "Your Lambda function is in a private subnet with no internet access. It needs to read objects from S3. What do you create, and what does it cost?",
        back: "A VPC Gateway Endpoint for S3. It creates a private route inside Amazon's network from your VPC directly to S3, with no internet traversal required. Gateway Endpoints for S3 and DynamoDB are free of charge.",
        tags: ['networking', 'vpc', 'endpoints']
    },
    {
        id: 202,
        cat: 'AWS',
        domain: 'Secure',
        front: "What is the difference between a VPC Gateway Endpoint and a VPC Interface Endpoint (PrivateLink)?",
        back: "Gateway Endpoints are free, route-table-based, and only work with S3 and DynamoDB. Interface Endpoints (PrivateLink) create an ENI with a private IP in your subnet and work with almost all AWS services (SQS, SNS, KMS, etc.) but have an hourly cost.",
        tags: ['networking', 'vpc', 'endpoints']
    },
    // EC2 Cost
    {
        id: 203,
        cat: 'AWS',
        domain: 'Cost',
        front: "A company runs a batch processing workload that is fault-tolerant and can be interrupted. What EC2 pricing model gives up to 90% savings?",
        back: "EC2 Spot Instances. AWS sells spare capacity at up to 90% discount. The trade-off: AWS can terminate your instance with a 2-minute warning when they need the capacity back. Only use for fault-tolerant, stateless workloads like data processing, ML training, or rendering.",
        tags: ['compute', 'ec2', 'cost', 'savings']
    },
    {
        id: 204,
        cat: 'AWS',
        domain: 'Cost',
        front: "A company needs production web servers running 24/7 for 3 years. What is the most cost-effective EC2 commitment model?",
        back: "Reserved Instances (1 or 3-year term) — up to 72% savings over On-Demand. For flexibility across instance types or regions, Compute Savings Plans offer similar savings without being locked to a specific instance type.",
        tags: ['compute', 'ec2', 'cost', 'savings']
    },
    // S3 Lifecycle
    {
        id: 205,
        cat: 'AWS',
        domain: 'Cost',
        front: "What is the cheapest S3 storage class for compliance audit logs that must be retained for 7 years and will almost never be accessed?",
        back: "S3 Glacier Deep Archive. It offers the lowest storage cost (pennies per TB/month) with retrieval times of up to 12 hours. Use Lifecycle Policies to automatically transition objects there after 90 days.",
        tags: ['storage', 's3', 'cost', 'savings']
    },
    {
        id: 206,
        cat: 'AWS',
        domain: 'Secure',
        front: "A media company stores private videos in S3. Authenticated users need temporary access to stream a specific video. What is the correct pattern?",
        back: "Generate a Pre-Signed URL using the AWS SDK with a time-limited expiry (e.g., 1 or 24 hours). The URL grants access to exactly one object and self-destructs after the expiry time. The bucket itself remains private at all times.",
        tags: ['storage', 's3', 'security']
    },
    // ElastiCache
    {
        id: 207,
        cat: 'AWS',
        domain: 'Performance',
        front: "Your RDS database is being hammered by the same read queries from thousands of users. What is the first architectural recommendation to improve performance without a schema change?",
        back: "Add an ElastiCache layer (Redis or Memcached) in front of the database. Cache frequently-accessed query results in memory. Cache hits return in microseconds without touching the database. This is the Lazy Loading pattern.",
        tags: ['database', 'elasticache', 'redis', 'cache', 'performance']
    },
    {
        id: 208,
        cat: 'AWS',
        domain: 'Performance',
        front: "When would you choose Redis over Memcached for ElastiCache?",
        back: "Choose Redis when you need: data persistence (cache survives restarts), replication and Multi-AZ failover, complex data types (sorted sets for leaderboards), or pub/sub messaging. Choose Memcached for pure, simple object caching with no persistence requirements.",
        tags: ['database', 'elasticache', 'redis', 'cache']
    },
    // SQS
    {
        id: 209,
        cat: 'AWS',
        domain: 'Resilient',
        front: "An order processing system must process orders in the exact sequence they were received, with no duplicates. Which SQS queue type do you use?",
        back: "SQS FIFO (First-In-First-Out) Queue. FIFO queues guarantee ordering and exactly-once processing. Note the throughput limit: up to 3,000 messages/second with batching. Standard Queues offer unlimited throughput but only best-effort ordering and at-least-once delivery.",
        tags: ['messaging', 'sqs', 'decoupling', 'resilient']
    },
    {
        id: 210,
        cat: 'AWS',
        domain: 'Resilient',
        front: "A message in your SQS queue keeps failing processing and crashing the consumer. How do you prevent this from blocking the rest of the queue?",
        back: "Configure a Dead Letter Queue (DLQ). After a message fails processing N times (your configured maxReceiveCount), SQS automatically routes it to the DLQ. This isolates the 'poison pill' message and allows the rest of the queue to continue processing. You then investigate and replay the DLQ messages after fixing the bug.",
        tags: ['messaging', 'sqs', 'decoupling', 'resilient']
    },
    // SNS
    {
        id: 211,
        cat: 'AWS',
        domain: 'Resilient',
        front: "An S3 image upload event needs to simultaneously trigger a thumbnail Lambda, a moderation Lambda, and push a message to an SQS processing queue. What is the architecture?",
        back: "SNS Fan-Out pattern. S3 publishes to an SNS Topic on upload. The SNS Topic has three subscribers: the thumbnail Lambda, the moderation Lambda, and the SQS queue. All three receive the event simultaneously. This is the canonical Fan-Out pattern.",
        tags: ['messaging', 'sns', 'fanout', 'pubsub', 'resilient']
    },
    {
        id: 212,
        cat: 'AWS',
        domain: 'Resilient',
        front: "What is the key difference between SNS and SQS delivery models?",
        back: "SNS is push-based (publish once, push to all subscribers simultaneously). SQS is pull-based (consumers poll the queue and process messages at their own pace). SNS does not retain messages — if no subscriber is online, the message is lost. SQS retains messages for up to 14 days.",
        tags: ['messaging', 'sns', 'sqs', 'resilient']
    },
    // Secrets Manager
    {
        id: 213,
        cat: 'AWS',
        domain: 'Secure',
        front: "Your Lambda must connect to RDS. The password must automatically rotate every 30 days without redeployment. Which service do you use?",
        back: "AWS Secrets Manager. It natively integrates with RDS, Redshift, and DocumentDB to automatically rotate credentials on a schedule. Your Lambda calls GetSecretValue at runtime — it always receives the current password without any code changes when rotation occurs.",
        tags: ['security', 'secrets', 'iam', 'credentials']
    },
    {
        id: 214,
        cat: 'AWS',
        domain: 'Secure',
        front: "What is the decision rule between Parameter Store SecureString and Secrets Manager?",
        back: "Use Parameter Store SecureString for: encrypted configuration values, feature flags, and non-rotating secrets where free tier matters. Use Secrets Manager ($0.40/secret/month) when automatic credential rotation is required — especially for RDS passwords under compliance mandates (SOC 2, HIPAA, PCI-DSS).",
        tags: ['security', 'secrets', 'credentials']
    },
    // Route 53
    {
        id: 215,
        cat: 'AWS',
        domain: 'Resilient',
        front: "A company has EU users that must be routed to EU servers for GDPR compliance, even if a US server has lower latency. Which Route 53 policy applies?",
        back: "Geolocation Routing. It routes based on the user's geographic location regardless of latency, making it the correct choice for data sovereignty, GDPR, and regional compliance requirements. Latency-Based routing would route to the fastest server, which might violate data residency laws.",
        tags: ['networking', 'route53', 'dns', 'ha']
    },
    {
        id: 216,
        cat: 'AWS',
        domain: 'Resilient',
        front: "A team wants to deploy a new version to 10% of users first, monitoring for errors before a full rollout. Which Route 53 policy enables this?",
        back: "Weighted Routing. Set the new version record to weight 10 and the existing version to weight 90. Route 53 will send 10% of traffic to the new version. This is the canonical canary deployment / traffic shifting pattern using DNS.",
        tags: ['networking', 'route53', 'dns', 'ha']
    },
    // Cost Tools
    {
        id: 217,
        cat: 'AWS',
        domain: 'Cost',
        front: "A company wants to be alerted before their monthly AWS bill exceeds $500. Which service do you configure?",
        back: "AWS Budgets. You create a budget with a $500 monthly threshold. AWS sends SNS alerts (email/SMS) when actual or forecasted spend reaches 80%, 90%, and 100% of the budget. Budgets can also trigger automated actions like stopping EC2 instances.",
        tags: ['cost', 'governance', 'budgets']
    },
    {
        id: 218,
        cat: 'AWS',
        domain: 'Cost',
        front: "A solutions architect reviews the account and finds EC2 instances averaging 3% CPU utilization. What AWS tool recommends the correct right-sized instance type?",
        back: "AWS Compute Optimizer. It analyzes historical CloudWatch metrics and uses machine learning to recommend the optimal instance type and size. It also analyzes Lambda memory and ECS task CPU/memory to reduce waste.",
        tags: ['cost', 'governance', 'trusted-advisor']
    }
];

DATA.flashcards.push(...newFlashcards);
console.log('✅ ' + newFlashcards.length + ' new flashcards injected.');

// =============================================================
// STEP 5: RETAG ALL TOPICS
// =============================================================
DATA.course.forEach(mod => {
    mod.topics.forEach(topic => {
        if (!topic.tags || topic.tags.length === 0) {
            topic.tags = [];
            const tLower = topic.title.toLowerCase();
            if (tLower.includes('server') || tLower.includes('vm') || tLower.includes('container')) topic.tags.push('compute', 'virtualization');
            if (tLower.includes('region') || tLower.includes('availability')) topic.tags.push('regions', 'ha');
            if (tLower.includes('capex') || tLower.includes('opex')) topic.tags.push('sales', 'capex', 'opex');
            if (tLower.includes('scaling') && !tLower.includes('auto')) topic.tags.push('compute', 'scaling', 'ha');
            if (tLower.includes('auto scaling') || tLower.includes('asg')) topic.tags.push('compute', 'scaling', 'asg', 'ha');
            if (tLower.includes('load balancer') || tLower.includes('alb')) topic.tags.push('networking', 'load balancer', 'alb', 'ha');
            if (tLower.includes('vpc endpoint')) topic.tags.push('networking', 'vpc', 'endpoints');
            if (tLower.includes('vpc') || tLower.includes('subnet')) topic.tags.push('networking', 'vpc');
            if (tLower.includes('route 53')) topic.tags.push('networking', 'route53', 'dns', 'ha');
            if (tLower.includes('ec2') && tLower.includes('cost')) topic.tags.push('compute', 'ec2', 'cost', 'savings');
            if (tLower.includes('ec2')) topic.tags.push('compute', 'ec2');
            if (tLower.includes('lambda')) topic.tags.push('compute', 'lambda');
            if (tLower.includes('s3') && tLower.includes('lifecycle')) topic.tags.push('storage', 's3', 'cost', 'savings');
            if (tLower.includes('s3') && tLower.includes('security')) topic.tags.push('storage', 's3', 'security');
            if (tLower.includes('s3')) topic.tags.push('storage', 's3');
            if (tLower.includes('ebs')) topic.tags.push('storage', 'ebs');
            if (tLower.includes('rds')) topic.tags.push('database', 'rds');
            if (tLower.includes('dynamodb')) topic.tags.push('database', 'dynamodb');
            if (tLower.includes('elasticache') || tLower.includes('redis') || tLower.includes('cache')) topic.tags.push('database', 'elasticache', 'redis', 'cache', 'performance');
            if (tLower.includes('sqs')) topic.tags.push('messaging', 'sqs', 'decoupling', 'resilient');
            if (tLower.includes('sns')) topic.tags.push('messaging', 'sns', 'fanout', 'pubsub', 'resilient');
            if (tLower.includes('iam')) topic.tags.push('security', 'iam');
            if (tLower.includes('kms')) topic.tags.push('security', 'kms');
            if (tLower.includes('waf') || tLower.includes('shield')) topic.tags.push('security', 'waf', 'shield');
            if (tLower.includes('secrets') || tLower.includes('sts')) topic.tags.push('security', 'secrets', 'iam', 'credentials');
            if (tLower.includes('cloudwatch') || tLower.includes('cloudtrail')) topic.tags.push('management', 'dr');
            if (tLower.includes('cost') && (tLower.includes('tool') || tLower.includes('explorer') || tLower.includes('budget'))) topic.tags.push('cost', 'governance', 'budgets', 'trusted-advisor');
            if (tLower.includes('right-siz') || tLower.includes('savings plan')) topic.tags.push('cost', 'savings', 'compute');
            if (tLower.includes('sales') || tLower.includes('gong')) topic.tags.push('sales');
            if (tLower.includes('career') || tLower.includes('portfolio')) topic.tags.push('career');
            if (topic.tags.length === 0) topic.tags.push('aws_core');
        }
    });
});
console.log('✅ All topics re-tagged.');

// =============================================================
// STEP 6: SERIALIZE AND SAVE
// =============================================================
const serialized = 'const DATA = ' + JSON.stringify(DATA, null, 4) + ';';
fs.writeFileSync('data.js', serialized, 'utf8');
console.log('');
console.log('=== EXPANSION COMPLETE ===');
console.log('Total Modules:', DATA.course.length);
console.log('Total Topics:', DATA.course.reduce((a, m) => a + m.topics.length, 0));
console.log('Total Flashcards:', DATA.flashcards.length);
