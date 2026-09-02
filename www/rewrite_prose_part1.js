const fs = require('fs');

let c = fs.readFileSync('data.js', 'utf8').replace('const DATA =', 'var DATA=');
eval(c);

// Helper to find topic by title (partial match)
function getTopic(titleFragment) {
    for (const mod of DATA.course) {
        for (const topic of mod.topics) {
            if (topic.title.toLowerCase().includes(titleFragment.toLowerCase())) {
                return topic;
            }
        }
    }
    return null;
}

// =============================================================
// MODULE 1: CLOUD 101 — THE ABSOLUTE FOUNDATION
// =============================================================

getTopic('What is a Server').prose = `
<p>Let's start with something everyone gets wrong: <strong>the cloud is not magic.</strong> It's not some ethereal digital dimension where your data floats peacefully. The cloud is a physical building — concrete, steel, humming servers, and diesel generators. It's just someone else's building. Someone who happens to be very, very good at running buildings.</p>

<p>Before you can architect anything on AWS, you need to understand the three layers of computing that the industry has built on top of raw hardware:</p>

<p><strong>Bare Metal</strong> is the raw hardware itself — a physical machine with a CPU, RAM, and disks. You plug it into your data center, install an OS directly on it, and it runs exactly one thing. It's fast. It's dedicated. And it's wildly wasteful — most bare metal servers idle at 5-10% CPU utilization while the bill runs 24/7.</p>

<p><strong>Virtual Machines (VMs)</strong> were the first great revolution. A piece of software called a <em>Hypervisor</em> sits between the hardware and the OS. It tricks multiple operating systems into thinking each has dedicated hardware — carving one physical machine into 5, 10, or 20 isolated slices. AWS EC2 instances? VMs. Your Proxmox homelab? A hypervisor. Same concept, different scale.</p>

<p><strong>Containers</strong> are the modern revolution. Unlike a VM (which carries a full OS), a container packages just your application code and its exact dependencies. It shares the host machine's OS kernel, making it launch in milliseconds instead of minutes and use a fraction of the memory. Docker containers on ECS or EKS are the industry standard today.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Bare Metal is buying a 10-bedroom mansion and sleeping in one room — wasteful but all yours. A VM is converting that mansion into 10 apartments — everyone gets their own space, sharing only the plumbing. A Container is a backpacker hostel — guests bring only their sleeping bag (code) and share everything else. Efficient, lightweight, and 10x more people per square foot.</div>

<div class="lesson-alert"><strong>Sales Tip:</strong> When a prospect asks why they should migrate off bare metal, the answer isn't "because it's cheaper." It's because bare metal is <em>inflexible</em>. You can't spin up 50 bare metal servers in 60 seconds to survive Black Friday. You can spin up 50 EC2 instances. That agility is the real product.</div>
`;

getTopic('Physical Cloud').prose = `
<p>Here's a question that stumps more people than it should: <em>where does your data actually live?</em> Not philosophically — physically. When you upload a file to S3 or launch an EC2 instance in "the cloud," that data is sitting on magnetic or solid-state storage inside a real building, plugged into a real power grid, cooled by real air conditioning. AWS just happens to own 35 of these buildings scattered across 6 continents.</p>

<p>AWS organizes its infrastructure into a hierarchy you must memorize:</p>

<p><strong>Regions</strong> are geographic areas — "us-east-1" is Northern Virginia, "eu-central-1" is Frankfurt, "ap-southeast-1" is Singapore. Each Region is completely independent. Data you store in us-east-1 does not automatically replicate to eu-central-1. You choose a Region based on two things: <em>latency</em> (put it close to your users) and <em>compliance</em> (GDPR says EU user data must stay in the EU).</p>

<p><strong>Availability Zones (AZs)</strong> are the individual data centers within a Region. Every Region has at least 3 AZs, each physically separated by meaningful distance — different buildings, different power substations, different flood plains. The magic: they're connected by AWS's private, high-bandwidth, low-latency fiber. If lightning strikes AZ-A, AZ-B and AZ-C are completely unaffected.</p>

<p><strong>The Rule:</strong> Production workloads always span at least two AZs. Single-AZ is a single point of failure. The exam will test this relentlessly.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> A Region is a city — say, New York. An Availability Zone is a distinct power grid within that city — Manhattan, Brooklyn, Queens. They share the same area code (Region) but have independent electrical infrastructure. A blackout in Brooklyn doesn't kill Manhattan. Your architecture should always live in at least two AZs, just like a smart business keeps operations in multiple boroughs — if one goes dark, you're still running.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> The exam loves the phrase "highly available." The answer almost always involves deploying across <strong>multiple AZs</strong>. Single-AZ deployments are the most common architecture trap — they look fine until the one AZ they're in has a power event.</div>
`;

getTopic('CapEx vs OpEx').prose = `
<p>Here's the dirty secret of selling cloud: <strong>it's not a technology sale. It's a finance sale.</strong> The CFO cares exactly zero about Availability Zones and EC2 instance types. They care about one thing: what happens to the balance sheet.</p>

<p>Understanding the CapEx vs. OpEx distinction is the key that unlocks the CFO's office door.</p>

<p><strong>CapEx (Capital Expenditure)</strong> is the traditional IT model. You spend $2,000,000 upfront buying servers, storage arrays, and networking gear. That $2M hits your balance sheet as a depreciating asset. You own it. You maintain it. You replace it in 5 years. Worst of all — you had to <em>guess</em> your capacity needs 3 years in advance. Guess too low and your site crashes during your biggest sales event. Guess too high and you're paying for idle servers for years. Most companies guess too high.</p>

<p><strong>OpEx (Operational Expenditure)</strong> is the cloud model. Zero upfront hardware cost. You pay by the second for exactly what you consume. It flows through your income statement as an operational expense — not a capital asset. CFOs love this for three reasons: no large upfront approval needed, costs scale directly with revenue, and you stop paying for idle capacity the second you shut down unused resources.</p>

<p>The critical nuance: cloud is not always cheaper. It's <em>elastic</em>. The value proposition is that you trade a fixed, over-provisioned cost for a variable cost that scales with your actual business.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> CapEx is buying a printing press — $500,000 upfront, it sits in your building, and it depreciates whether you print or not. OpEx is using a print-on-demand service — you pay per page, only when you need printing, and you can print 10,000 pages on Monday and zero on Tuesday with no penalty. AWS is the print-on-demand service for servers.</div>

<div class="lesson-alert"><strong>Sales Tip:</strong> When a CFO hesitates on cloud spend, don't lead with "it's cheaper." Lead with <strong>"it eliminates capital expenditure and converts your largest IT cost into a variable operational expense that scales with your revenue."</strong> That sentence gets budget approved.</div>
`;

// =============================================================
// MODULE 2: HIGH AVAILABILITY & SCALING
// =============================================================

getTopic('Vertical vs Horizontal Scaling').prose = `
<p>Congratulations — your app just went viral. Traffic is spiking and your single server's CPU is pinned at 100%. Users are getting errors. You have minutes to fix this. <strong>What do you do?</strong></p>

<p>You have exactly two options. Most engineers reach for the wrong one first.</p>

<p><strong>Vertical Scaling (Scaling Up)</strong> is the intuitive answer: buy a bigger server. Upgrade from 4 cores to 32 cores, from 16GB RAM to 256GB RAM. It works — until it doesn't. Every piece of hardware has a physical ceiling. A 256-core server costs a fortune, requires downtime to switch to, and is still a single point of failure. You've also replaced one problem (capacity) with a worse one (cost and fragility).</p>

<p><strong>Horizontal Scaling (Scaling Out)</strong> is the cloud-native answer: add more identical servers. Keep your 4-core instance and add 9 more next to it. Spread the load across all 10. When traffic drops at 3 AM, terminate 8 of them and stop paying. There is no ceiling — you can run 10, 100, or 10,000 instances. And if one fails, the other 9 absorb the traffic. This is how Netflix, Amazon, and every major web property on Earth is architected.</p>

<p>The catch with horizontal scaling: your application must be <em>stateless</em>. User session data can't be stored on a single server's local memory — it needs to be in a shared database or cache (ElastiCache). This is an architecture constraint you'll encounter constantly.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Vertical scaling is buying a bigger delivery truck because you have more packages. Eventually you hit the legal highway size limit — and that one truck is still a single point of failure. A flat tire and everything stops. Horizontal scaling is hiring 10 more drivers with regular-sized trucks. One gets a flat — the other 9 keep delivering. And when the holiday rush ends, you lay off 8 of them and stop paying them.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> The words "highly available" and "fault tolerant" in an exam question always point to horizontal scaling across multiple AZs. Vertical scaling is never the answer to a high availability question — it doesn't eliminate single points of failure.</div>
`;

getTopic('Load Balancer').prose = `
<p>You've decided to scale horizontally — you've got 6 EC2 instances humming along, ready to share the load. Now answer this: how does a user in Tokyo know to connect to Instance #3 instead of Instance #6? You can't hand out 6 different IP addresses and hope users pick the least-busy one. That's insane. That's where the <strong>Load Balancer</strong> comes in.</p>

<p>A Load Balancer sits in front of your fleet of servers with a single, stable endpoint (one IP, one DNS name). All traffic arrives there. The Load Balancer inspects each incoming request and forwards it to the healthiest, least-loaded server behind it — invisible to the user.</p>

<p>AWS offers three flavors:</p>
<p><strong>Application Load Balancer (ALB)</strong> — Layer 7 (HTTP/HTTPS). The smart one. It can route traffic based on URL path (/api → API servers, /static → media servers), host headers, query strings, or even specific cookie values. The standard choice for web applications.</p>
<p><strong>Network Load Balancer (NLB)</strong> — Layer 4 (TCP/UDP). The fast one. No content inspection, just raw TCP forwarding. Handles millions of requests per second with ultra-low latency. Use for real-time trading systems, gaming, or any protocol that isn't HTTP.</p>
<p><strong>Gateway Load Balancer (GLB)</strong> — Forwards traffic through third-party virtual appliances (firewalls, IDS systems). Niche, but the exam will mention it.</p>

<p>The critical feature: <strong>Health Checks</strong>. Every few seconds, the Load Balancer pings each server and asks "are you alive?" If a server stops responding, it is immediately removed from rotation. Traffic never hits a dead server again.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> A Load Balancer is the maître d' at a Michelin-starred restaurant. One entrance, one person deciding where everyone sits. She checks which tables are available (health checks), which waiters have the fewest tables (load distribution), and routes each party accordingly. If a waiter calls in sick mid-service (server fails), she immediately stops seating people in his section without any guest ever noticing.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> ALB is the default answer for web traffic. The exam pattern is: <em>"route /api requests to one group of EC2 instances and /images to another"</em> — that's <strong>ALB path-based routing</strong>. NLB appears when the question involves TCP, UDP, extreme low latency, or static IP requirements.</div>
`;

getTopic('Auto Scaling Groups').prose = `
<p>A Load Balancer solves the distribution problem. An Auto Scaling Group solves the <em>capacity</em> problem. Together, they form the backbone of every serious cloud architecture.</p>

<p>Here's the nightmare scenario: it's Black Friday. Your 6 EC2 instances are at 100% CPU. The Load Balancer is faithfully distributing requests — to servers that are melting. Users are getting timeouts. You're losing $50,000 per minute. Your on-call engineer is scrambling to manually launch new instances, but by the time they spin up, the spike has started crashing users.</p>

<p>An <strong>Auto Scaling Group (ASG)</strong> solves this automatically, before the crisis starts. You define:</p>
<p><strong>Minimum capacity</strong> — the floor. Never run fewer than 2 instances, even at 3 AM on a Tuesday.</p>
<p><strong>Maximum capacity</strong> — the ceiling. Never spin up more than 20 instances, so you don't accidentally burn the budget.</p>
<p><strong>Scaling Policies</strong> — the trigger rules. "If average CPU across the fleet exceeds 70% for 3 consecutive minutes, launch 2 more instances." The ASG monitors CloudWatch metrics and acts on them automatically. New instances are bootstrapped with your AMI, registered with the Load Balancer, and absorbing traffic — usually in under 5 minutes.</p>

<p>When the spike passes, the ASG scales back in, terminating the extra instances and stopping the per-second billing. You pay for exactly what you needed, exactly when you needed it.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> An ASG is a smart thermostat wired directly to your AWS bill. It reads the room temperature (CPU load), automatically kicks on the AC (launches instances) when it gets hot, and turns it off when it cools down to save electricity (money). The genius is you set the rules once and never touch it again — the system manages itself at 2 AM while you sleep.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> The ultimate architecture for resilient, cost-efficient web applications is: <strong>ALB + ASG + Multi-AZ EC2 fleet</strong>. This triad appears in some form on almost every AWS exam. Know it cold.</div>
`;

// =============================================================
// MODULE 3: VPC
// =============================================================

getTopic('VPC: Your Private').prose = `
<p>Before you launch a single EC2 instance, before you create a database, before you deploy a Lambda — AWS forces you to think about one thing: <strong>where does this resource live?</strong> And the answer is always: inside a VPC.</p>

<p>A <strong>Virtual Private Cloud (VPC)</strong> is your own logically isolated slice of the AWS cloud. Think of it as the plot of land you own before you build anything on it. You define its boundaries with a <strong>CIDR block</strong> — a range of IP addresses (e.g., 10.0.0.0/16) that every resource inside your VPC will be addressed from.</p>

<p>Why does isolation matter? Consider the alternative: without a VPC, every EC2 instance and database in AWS would exist on one massive flat network. Any resource could reach any other resource. A compromised web server could directly query your production database. Your customer payment data would be one misconfigured security group away from the open internet. The VPC is your blast-radius containment unit.</p>

<p>Key components you'll configure inside every VPC:</p>
<p><strong>Internet Gateway (IGW):</strong> The door between your VPC and the public internet. Attach one IGW per VPC. Resources in public subnets use it to communicate outbound and receive inbound traffic.</p>
<p><strong>Route Tables:</strong> The traffic rulebook. Each subnet has a route table that defines where traffic goes. Public subnets have a route to the IGW. Private subnets do not.</p>
<p><strong>Security Groups:</strong> Stateful, instance-level firewalls. You define inbound and outbound rules per resource. Allow port 443 inbound — the return traffic is automatically allowed.</p>
<p><strong>NACLs (Network ACLs):</strong> Stateless, subnet-level firewall rules. An additional layer of defense at the subnet boundary. Unlike Security Groups, you must explicitly allow both inbound AND outbound for each traffic flow.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> A VPC is the walled compound your company owns. The Internet Gateway is the front gate — controlled, monitored, the only way in or out. Security Groups are the badge readers on each individual door inside the compound — only authorized people get into specific rooms. NACLs are the perimeter guard stationed at the compound entrance — a second, independent checkpoint. Your database lives in a building with no windows and only one internal door. No external gate access at all.</div>

<div class="lesson-alert"><strong>Sales Tip:</strong> When a CTO asks "Is AWS secure by default?" the honest and impressive answer is: <em>"AWS provides the VPC infrastructure, but security is a shared responsibility. You define the moat. I can show you how we architect subnets to guarantee your database never has a public IP address."</em></div>
`;

getTopic('Public vs Private Subnets').prose = `
<p>Here's the golden rule of cloud network architecture that most junior engineers get backwards: <strong>your database should never have a public IP address. Ever. Not even once. Not even for testing.</strong></p>

<p>Subnets are how you enforce this. A <strong>subnet</strong> is a subdivision of your VPC's IP address range — a neighborhood within your city. You control what can enter and exit each neighborhood with a single configuration: the Route Table.</p>

<p>The rule is beautifully simple:</p>
<p><strong>Public Subnet</strong> = a subnet whose Route Table has a default route (0.0.0.0/0) pointing to an Internet Gateway. Resources here can receive traffic from the internet. Put your web servers, Load Balancers, and NAT Gateways here.</p>
<p><strong>Private Subnet</strong> = a subnet whose Route Table has NO route to an Internet Gateway. Resources here are completely unreachable from the public internet. No public IP will help them — there's simply no path. Put your databases, application servers, and cache clusters here.</p>

<p><strong>But how does a private subnet reach the internet for updates?</strong> A <strong>NAT Gateway</strong> (Network Address Translation) — deployed in the public subnet — lets private resources initiate outbound connections to the internet (to download software updates, call external APIs) without ever being reachable from the internet inbound. It's a one-way valve.</p>

<p><strong>Bastion Host (Jump Box):</strong> The only sanctioned way to SSH into a private EC2 instance. A hardened EC2 instance in the public subnet acts as the single, tightly controlled entry point. You SSH to the Bastion, then hop from there to private instances. Audit everything on the Bastion.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Your VPC is a corporate office building. The public subnet is the lobby — anyone can walk in, there's a reception desk (Load Balancer), and you can see it from the street. The private subnet is the server room in the basement — no public elevator goes there, no street address, no windows. The NAT Gateway is the building's internal mail room: packages (internet requests) can be sent out, but no deliveries arrive unannounced. The Bastion Host is the one security guard with the basement key — and every swipe is logged.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> The #1 exam trap: <em>"An EC2 instance in a public subnet cannot connect to the internet."</em> The instance needs BOTH a route to the IGW AND a public IP address (Elastic IP or auto-assigned). Missing either one breaks connectivity.</div>
`;

getTopic('VPC Endpoints').prose = `
<p>Picture this: your EC2 instances live in a private subnet. No internet access. Maximum security. Your compliance team is happy. Now your application needs to call the S3 API to store a file. What happens?</p>

<p>Without a VPC Endpoint, your traffic exits your private subnet, goes through a NAT Gateway, hits the public internet, travels to s3.amazonaws.com's public IP address — and comes back the same way. You just sent sensitive data on a round-trip through the public internet. Your NAT Gateway is billing you for every gigabyte. And your compliance auditor is raising an eyebrow.</p>

<p>A <strong>VPC Endpoint</strong> cuts all of that out. It creates a private, direct tunnel from your VPC to the AWS service — entirely within Amazon's backbone network. The traffic never leaves AWS's infrastructure. No public internet. No NAT Gateway charges. No latency penalty.</p>

<p>Two types to know cold:</p>

<p><strong>Gateway Endpoint:</strong> Works with S3 and DynamoDB only. Free. You simply add a route in your Route Table pointing to the endpoint. Any traffic destined for S3 or DynamoDB automatically takes the private path. This is the most commonly tested endpoint type on the exam.</p>

<p><strong>Interface Endpoint (AWS PrivateLink):</strong> Works with almost every other AWS service — SQS, SNS, SSM, Secrets Manager, KMS, API Gateway, CloudWatch, and more. Creates an Elastic Network Interface (ENI) with a private IP address inside your subnet. Small hourly charge per endpoint, per AZ. Worth every penny for regulated workloads.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Without a VPC Endpoint, your Lambda is calling S3 like a person in a Manhattan office who has to leave the building, walk through Times Square, hail a cab, and take it to another building owned by the same company — to hand over an internal document. A Gateway Endpoint is the internal pneumatic tube system connecting the buildings through a private underground corridor. Never touches the street. Instant. Free. Much more professional.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> The question <em>"How can an EC2 instance in a private subnet access S3 without requiring a NAT Gateway or internet access?"</em> has one answer: <strong>VPC Gateway Endpoint</strong>. Memorize this. It appears on virtually every SAA-C03 practice exam.</div>
`;

// =============================================================
// MODULE 4: COMPUTE
// =============================================================

getTopic('EC2: The Workhorse').prose = `
<p>If AWS were a construction company, EC2 would be the heavy machinery. Everything else might be fancier or more specialized, but EC2 is what gets the foundational work done. <strong>Amazon Elastic Compute Cloud</strong> gives you a resizable virtual machine in the cloud, launched in under 60 seconds, billed by the second. That's a revolution compared to the weeks it took to rack physical servers a decade ago.</p>

<p>Choosing an EC2 instance is like choosing a vehicle — you pick based on the job, not the brand name:</p>
<p><strong>General Purpose (t3, m6i):</strong> Balanced CPU and memory. The Toyota Camry of cloud compute. Good for web servers, dev environments, small databases.</p>
<p><strong>Compute Optimized (c6i, c7g):</strong> High CPU-to-memory ratio. For batch processing, high-performance web servers, machine learning inference.</p>
<p><strong>Memory Optimized (r6i, x2idn):</strong> Massive RAM for large in-memory datasets. Real-time big data analytics, in-memory databases, SAP HANA.</p>
<p><strong>Storage Optimized (i4i, d3):</strong> High sequential read/write access to local storage. Data warehousing, distributed file systems, Elasticsearch.</p>
<p><strong>Accelerated Computing (p4d, inf2):</strong> GPUs and custom ML chips (Inferentia, Trainium). Deep learning training, graphics rendering, HPC.</p>

<p>The instance name tells you everything: <strong>m6i.xlarge</strong> — <em>m</em> (Memory-balanced family), <em>6</em> (6th generation), <em>i</em> (Intel processor), <em>xlarge</em> (4 vCPU, 16GB RAM).</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Choosing an EC2 instance type is identical to choosing a rental car. Going to a meeting across town? A compact (t3.micro) works fine. Moving furniture? You need a cargo van (r6i.8xlarge with massive RAM). Hauling 40 tons of concrete? That's a GPU instance (p4d.24xlarge) — wildly overpowered for normal work, but the only thing that'll do the job. You wouldn't show up to haul concrete in a compact car. Know your workload before you pick your instance.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> The SAA-C03 regularly presents scenarios like: <em>"An HPC workload requires intensive floating-point computations."</em> That's Compute Optimized (c-family). <em>"An in-memory analytics platform requires 512GB of RAM."</em> That's Memory Optimized (r or x-family). Map the workload to the family — don't guess.</div>
`;

getTopic('Lambda: The Sniper Rifle').prose = `
<p>EC2 is a 24/7 soldier. Lambda is a Navy SEAL sniper — deployed for one specific mission, executes flawlessly, and disappears the moment it's done. You pay for exactly 312 milliseconds of execution. Then: nothing. No idle instance burning budget. No OS to patch. No server to think about. The infrastructure simply ceases to exist the moment your code finishes.</p>

<p><strong>How Lambda Works:</strong> You upload your code (Node.js, Python, Java, Go, Ruby, .NET). You define a <strong>trigger</strong> — the event that invokes your function. AWS manages everything else: hardware provisioning, OS maintenance, capacity planning, auto-scaling. Lambda can handle 1 request or 10,000 concurrent requests — it scales automatically with zero configuration.</p>

<p><strong>Common Lambda Triggers:</strong>
API Gateway (HTTP request) → Lambda (handles request) → return response. The serverless API pattern.
S3 PUT event → Lambda (process the uploaded file) → store result in DynamoDB.
SQS message → Lambda (process the work item) → scale to drain the queue.
CloudWatch Events/EventBridge → Lambda (scheduled task, cron jobs).</p>

<p><strong>The Hard Limits You Must Know:</strong>
Max execution time: <strong>15 minutes</strong>. If your job takes 2 hours, Lambda is not the answer.
Max memory: <strong>10 GB</strong>.
Max deployment package: 50 MB zipped (250 MB unzipped), or use a container image up to 10 GB.
Concurrency: soft default of 1,000 concurrent executions per account per region (can be raised).</p>

<p><strong>Cold Starts:</strong> When Lambda hasn't been invoked recently, there's a brief startup delay (100ms–1s) as AWS initializes the execution environment. This is the trade-off for the serverless model. Solutions: provisioned concurrency (pre-warm the function, costs money) or keeping functions warm with scheduled pings.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Owning an EC2 instance is like owning a car — you pay for it whether you're driving or parked. Lambda is Uber — you pay only for the exact trip, by the mile, only when you need it. The car sitting in your driveway overnight costs you nothing with Uber. The catch: Uber takes 30 seconds to arrive (cold start) vs. your car being instantly ready. For anything needing instant response at all times, keep the car. For sporadic, event-driven work, Uber wins on economics every time.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> Lambda is the correct answer for: event-driven processing, lightweight API backends, scheduled tasks, and anything with spiky or unpredictable traffic. Lambda is the <em>wrong</em> answer for: long-running jobs (>15 min), workloads requiring persistent state on local disk, or anything requiring guaranteed sub-millisecond cold-start latency.</div>
`;

getTopic('EC2 Cost Optimization').prose = `
<p>Running EC2 On-Demand 24/7 is like booking a hotel room every single night instead of signing a lease. Comfortable. Flexible. Financially indefensible for predictable, long-running workloads. AWS has engineered a full spectrum of commitment-based discounts — and the SAA-C03 will absolutely test your ability to match the right pricing model to the right scenario.</p>

<p><strong>On-Demand: The Full-Price Ticket</strong><br>
Pay by the second. Zero commitment. Maximum flexibility. Maximum cost. Use for: short-term projects, unpredictable workloads, development and testing environments you'll terminate frequently. Never the right answer for production servers running 24/7.</p>

<p><strong>Reserved Instances (RIs): The 3-Year Lease</strong><br>
Commit to a 1 or 3-year term on a specific instance type, family, or region. Savings: up to 72% over On-Demand. Two flavors:
<em>Standard RIs</em>: deepest discount, locked to one specific instance type.
<em>Convertible RIs</em>: slightly smaller discount, but you can exchange for a different instance type or family. Right choice if you expect your needs to evolve.</p>

<p><strong>Savings Plans: The Modern Commitment Model</strong><br>
Instead of reserving a specific instance, you commit to a minimum dollar spend per hour (e.g., $5.00/hr). AWS applies the discount to your highest-cost EC2, Lambda, and Fargate usage automatically. More flexible than RIs, covers more services, and is now AWS's preferred commitment model.</p>

<p><strong>Spot Instances: The Standby Ticket — Up to 90% Off</strong><br>
AWS sells spare capacity at auction. You bid; if your price is met, you get the instance. If AWS needs that capacity back, they give you a 2-minute warning and terminate the instance. Non-negotiable. This makes Spot perfect for: batch processing, ML training, video rendering, CI/CD pipelines — any fault-tolerant, stateless, interruptible workload. Never use Spot for your production database.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> On-Demand is a hotel — maximum flexibility, maximum price. Reserved Instances are a 3-year apartment lease — locked in, but 70% cheaper. Savings Plans are a monthly coworking membership — you commit to spending $X per month and get discounted access to whatever desk you need that day. Spot is a last-minute standby flight — dirt cheap, but the airline can bump you the moment a paying passenger shows up. Know which one you're buying before you need the seat.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> Classic exam pattern: <em>"A company runs a web application 24/7/365. What is the most cost-effective purchasing option?"</em> Answer: <strong>Reserved Instances or Savings Plans</strong>. <em>"A genomics company needs to process 500TB of data over a weekend. The job can be interrupted."</em> Answer: <strong>Spot Instances</strong>. Map the commitment level to the workload predictability.</div>
`;

// =============================================================
// MODULE 5: STORAGE
// =============================================================

getTopic('S3: The Infinite Hard Drive').prose = `
<p><strong>Eleven nines.</strong> That's the durability rating of Amazon S3 — 99.999999999%. To give that number a visceral context: if you stored 10,000,000 objects in S3, you could expect to lose a single object once every 10,000 years. For reference, the pyramids are 4,500 years old. S3's durability makes them look fragile.</p>

<p>S3 is <em>object storage</em> — not a file system, not a database, not a block device. Objects (files) live in <strong>buckets</strong> (namespaced containers) and are addressed by a key (basically a path). You can store an object as small as 0 bytes or as large as 5 terabytes. There is no limit to how many objects a bucket can hold. The "infinite hard drive" moniker is not an exaggeration.</p>

<p><strong>What S3 Is Built For:</strong> Static website hosting, backup and archive, data lake storage, application asset storage (images, videos, documents), software distribution, disaster recovery backups. It integrates natively with virtually every other AWS service — the glue of the AWS ecosystem.</p>

<p><strong>What S3 Is Not:</strong> You cannot mount S3 as a file system on an EC2 instance (use EFS for that). You cannot install an operating system on S3. You cannot use S3 as a block device for a database. It is a flat, durable object store — magnificent at what it does, useless for what it doesn't.</p>

<p><strong>Durability vs. Availability:</strong> Durability (11 9s) means your data won't be lost or corrupted. Availability (99.99% for S3 Standard) means the service will be accessible when you request it. High durability + high availability = S3 Standard. High durability + lower availability = S3 Glacier. Both store your data safely; they differ in how fast you can get it back.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> S3 is a bank vault with unlimited capacity and eleven levels of redundant locks. You can store every document you've ever created and never worry about losing them. But it's not your desk drawer — you don't sit there and work directly from the vault. You retrieve a document, work with it (on EC2/EBS), and put it back. The vault is for persistence and scale. The desk (EBS) is for active work.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> S3 is eventually consistent for overwrite operations (though AWS has moved to strong consistency for most operations in recent years). More importantly: S3 stores objects — not blocks, not files in the traditional POSIX sense. If a question asks about a shared file system for multiple EC2 instances reading simultaneously, the answer is <strong>EFS, not S3</strong>.</div>
`;

getTopic('EBS: The Flash Drive').prose = `
<p>If S3 is your bank vault, EBS is the USB drive you plug into your laptop. <strong>Elastic Block Store</strong> is the persistent storage volume you attach to an EC2 instance. It is a virtual hard drive — the thing your operating system boots from, your application writes logs to, and your database stores its data files on.</p>

<p>The fundamental distinction from S3: EBS provides <strong>block storage</strong>. The OS sees it as a raw device and formats it with a file system (ext4, XFS, NTFS). Your database writes and reads individual blocks at microsecond speeds. This is the performance model databases require.</p>

<p><strong>Volume Types (The Exam Loves This):</strong></p>
<p><strong>gp3 (General Purpose SSD):</strong> The default choice. Up to 16,000 IOPS, 1,000 MB/s throughput, independently configurable. Cost-effective for most workloads. Boot volumes, dev/test, small to medium databases.</p>
<p><strong>io2 Block Express (Provisioned IOPS SSD):</strong> Up to 256,000 IOPS. The premium option for I/O-hungry production databases (Oracle RAC, SAP HANA). The exam will ask for this when a database "requires consistent, high IOPS."</p>
<p><strong>st1 (Throughput Optimized HDD):</strong> Cheap, high-throughput sequential reads. Big data, log processing, data warehouses — workloads that read large files sequentially, not randomly.</p>
<p><strong>sc1 (Cold HDD):</strong> The cheapest EBS option. Infrequent access, sequential workloads. Archive data you occasionally need on-instance.</p>

<p><strong>The AZ Prison:</strong> EBS volumes are locked to a single Availability Zone. If AZ-A goes down, your EBS volume goes with it. The protection mechanism: <strong>EBS Snapshots</strong>, which are stored redundantly in S3 (across AZs) and can be used to restore or replicate volumes to any AZ or Region.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> EBS is a USB drive surgically attached to one specific computer (EC2 instance in one AZ). The computer and drive live and die together in the same building. An EBS Snapshot is when you clone the drive's contents to S3 — now that clone lives redundantly across the entire city (multiple AZs). If the original building floods, you restore from the snapshot in a different building.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> By default, EBS can only be attached to <strong>one</strong> EC2 instance at a time. If the question asks about shared block storage across multiple instances, the answer is <strong>EBS Multi-Attach</strong> (io1/io2 volumes only, same AZ) or <strong>Amazon EFS</strong> (fully managed shared file system, works across AZs).</div>
`;

getTopic('S3 Lifecycle Policies').prose = `
<p>Here's a universal truth about data: it starts hot and cools down over time. Your server logs from this morning are critical — you're actively debugging with them. Your server logs from 6 months ago? You'll probably never look at them again, but compliance says you must keep them for 7 years. Storing both in the same high-performance tier is the cloud equivalent of keeping your tax returns from 2015 on your desk. Expensive and unnecessary.</p>

<p><strong>S3 Storage Classes</strong> are AWS's solution — a tiered pricing model where you pay less for data you access less, with automatic or manual movement between tiers:</p>

<p><strong>S3 Standard:</strong> Millisecond retrieval, 99.99% availability. For actively accessed data. Most expensive per GB stored. The default.</p>
<p><strong>S3 Standard-IA (Infrequent Access):</strong> Same millisecond retrieval speed, ~45% cheaper storage. But there's a per-GB retrieval fee. Best for data accessed once a month or less.</p>
<p><strong>S3 One Zone-IA:</strong> Like Standard-IA but stored in one AZ only. 20% cheaper. The trade-off: if that AZ has a problem, your data is temporarily unavailable. Fine for reproducible data (thumbnails, re-creatable outputs). Not for anything irreplaceable.</p>
<p><strong>S3 Glacier Instant Retrieval:</strong> Archive-level pricing, but still millisecond retrieval. For data accessed once per quarter. An elegant middle ground.</p>
<p><strong>S3 Glacier Flexible Retrieval:</strong> 1 minute to 12 hours to retrieve. Very cheap. Excellent for backups and DR data you hope you never need.</p>
<p><strong>S3 Glacier Deep Archive:</strong> 12-hour retrieval. The cheapest storage in the public cloud. Pennies per TB per month. For 7-10 year compliance archives that exist only for legal or regulatory reasons.</p>

<p><strong>S3 Lifecycle Policies</strong> automate the transitions: "At 30 days, move to Standard-IA. At 90 days, move to Glacier Flexible. At 2,555 days (7 years), delete." Set it once, forget it. Your compliance is maintained. Your bill shrinks continuously as data ages.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Your data has the same lifecycle as a newspaper. Today's edition sits on the coffee table (S3 Standard — fast access, high value). Last month's goes to the magazine rack (Standard-IA — still accessible, less often touched). Last year's issues move to the storage room (Glacier — you'd need to dig for it). A newspaper from 1985? It's in a sealed box in a climate-controlled archive (Glacier Deep Archive — it exists for legal and historical reasons, and finding it takes half a day). A Lifecycle Policy is the personal assistant who moves every newspaper to the right location automatically.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> <em>"A company must retain compliance logs for 7 years. The logs will only be accessed in the event of a legal audit, which occurs once every few years. What is the most cost-effective storage solution?"</em> The answer is always <strong>S3 Glacier Deep Archive</strong>. Cheapest storage, long retrieval time, perfect for "rarely accessed, must be retained" scenarios.</div>
`;

getTopic('S3 Security: Bucket Policies').prose = `
<p>S3's default state is: completely private. Every object you upload is inaccessible to anyone on the internet. No exceptions. This is the right default. The disasters happen when people override it carelessly — and they happen regularly enough that AWS built multiple safeguards to stop it.</p>

<p><strong>The S3 Security Stack (in order of priority):</strong></p>

<p><strong>1. Block Public Access (The Nuclear Override)</strong><br>
This is the master switch at the account or bucket level. When enabled, it overrides all bucket policies, ACLs, and individual object permissions that would otherwise make data public. It doesn't matter if a bucket policy explicitly says "Allow public read" — Block Public Access overrides it. Enable this on every bucket that shouldn't be public. Enable it at the account level and override it only for specifically intended public buckets.</p>

<p><strong>2. Bucket Policies (The Access Rulebook)</strong><br>
JSON-based resource policies attached directly to the bucket. They define who (IAM users, roles, other AWS accounts, the entire internet) can perform which actions (s3:GetObject, s3:PutObject, s3:DeleteObject) on which objects. Bucket policies are the right tool for: allowing a CloudFront distribution to read objects, granting cross-account access, and making specific paths of a bucket publicly readable (e.g., for a static website).</p>

<p><strong>3. IAM Policies (The Identity Rulebook)</strong><br>
Applied to the IAM user or role. For same-account access, either an IAM policy OR a bucket policy granting access is sufficient. For cross-account access, BOTH must allow the action.</p>

<p><strong>4. ACLs (The Legacy Approach)</strong><br>
Object-level access control lists. AWS now recommends disabling ACLs entirely and using Bucket Policies instead. On the exam, ACLs are almost never the correct answer for modern architecture questions.</p>

<p><strong>5. Pre-Signed URLs (The Temporary Pass)</strong><br>
Your backend generates a time-limited URL (1 minute, 1 hour, 1 week) that grants access to a specific object to whoever holds the URL. After expiry, the URL is dead. This is the standard pattern for sharing private content with external users — a video stream, a generated PDF report, a file download — without making the bucket public or creating IAM users for external parties.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Block Public Access is the building-wide lockdown override — security throws the master switch and no individual door code works until they release it. Bucket Policies are the keycard rules defining who gets into which room. IAM Policies are the employee access levels on their badge. ACLs are the old paper visitor log — technically works but nobody serious uses it anymore. A Pre-Signed URL is a one-day visitor badge that the front desk prints for a contractor: specific room access, specific person, expires tonight.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> <em>"A company needs to allow users to download their personal invoice PDF from S3 for 24 hours after it is generated. The bucket must remain private."</em> → <strong>Pre-Signed URL with 24-hour TTL</strong>. This is the canonical Pre-Signed URL scenario and appears constantly.</div>
`;

// =============================================================
// MODULE 6: DATABASES
// =============================================================

getTopic('RDS: The Relational Behemoth').prose = `
<p>SQL didn't die when NoSQL arrived. It just got managed. <strong>Amazon RDS (Relational Database Service)</strong> takes the operational nightmare of running a production database — hardware provisioning, OS patching, backup windows, failover configuration — and hands it to AWS. You get a fully functional PostgreSQL, MySQL, MariaDB, Oracle, or SQL Server database without touching a single server.</p>

<p>What RDS handles for you: automated backups (up to 35 days retention), minor version patching, storage auto-scaling, Multi-AZ failover, read replica creation, and point-in-time recovery. What you still manage: schema design, query optimization, index strategy, and connection pooling.</p>

<p><strong>Scaling RDS — The Honest Assessment:</strong><br>
Relational databases are the hardest thing to scale in cloud architecture. Unlike stateless web servers, you can't just clone a database and load-balance between them (writes would conflict).</p>

<p><strong>Read Replicas:</strong> Create up to 15 read-only copies of your database. Your application reads from replicas, writes go only to the primary. Reduces primary load. Caveat: replication is asynchronous — replicas can lag the primary by milliseconds to seconds under heavy write load. Never read from a replica if your use case requires the most current data.</p>

<p><strong>Multi-AZ:</strong> A synchronous standby replica in a different AZ. Not for scaling reads — it serves no traffic. It exists purely for automatic failover. If the primary fails, AWS automatically promotes the standby within 60-120 seconds. Zero data loss, automatic DNS flip, minimal downtime.</p>

<p><strong>Aurora:</strong> AWS's reimagining of RDS. Up to 5x faster than standard MySQL. 15 low-latency read replicas (vs. 5 for standard RDS). Auto-scaling storage from 10GB to 128TB. Failover in under 30 seconds. 20-30% premium — worth it at scale.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Multi-AZ is a stunt double for your database — they look identical, they're perfectly in sync, but the stunt double never appears on camera unless the lead actor breaks a leg. Read Replicas are the photocopying team — they make identical copies of every document the moment it's created, and you send all your "I need to read this document" requests to them, keeping the lead actor (primary) free for the serious work (writes). Two completely different purposes. Never confuse them.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> The exam consistently confuses Multi-AZ and Read Replicas. <strong>Multi-AZ = Disaster Recovery, automatic failover, synchronous replication, no reads from standby.</strong> <strong>Read Replicas = Performance scaling, manual promotion, asynchronous replication, reads allowed.</strong> If the scenario mentions "high availability" or "automatic failover" → Multi-AZ. If it mentions "read-heavy" or "reduce primary load" → Read Replicas.</div>
`;

getTopic('DynamoDB: The Speed Demon').prose = `
<p>What if I told you there's a database that delivers <strong>single-digit millisecond response times</strong> whether your table has 1 megabyte or 1 petabyte of data? No connection pooling. No query optimizer. No schema migrations. No maintenance windows. It's not magic — it's a completely different philosophy of data storage.</p>

<p><strong>DynamoDB</strong> is a fully managed, serverless, key-value and document NoSQL database. It is the backbone of Amazon.com's shopping cart, serving millions of writes per second during Prime Day. The secret to its speed: it doesn't run complex joins or table scans. Every read is a direct key lookup — like opening a filing cabinet to the exact drawer, folder, and document without searching.</p>

<p><strong>The Core Concepts:</strong><br>
<strong>Table:</strong> A collection of items (equivalent to rows in SQL).<br>
<strong>Item:</strong> A JSON document. Unlike SQL, items in the same table don't need to have the same attributes.<br>
<strong>Primary Key:</strong> Every item must have one. Either a Partition Key alone (simple key) or a Partition Key + Sort Key (composite key). Design this correctly and your performance is guaranteed. Design it poorly and you create "hot partition" bottlenecks.<br>
<strong>Throughput:</strong> Provisioned mode (you specify read/write capacity units, you pay for what you provision) or On-Demand mode (AWS scales automatically, you pay per request). On-Demand is perfect for unpredictable or spiky traffic.</p>

<p><strong>DynamoDB Accelerator (DAX):</strong> An in-memory cache that sits in front of DynamoDB, reducing read latency from milliseconds to <em>microseconds</em>. For read-heavy workloads requiring sub-millisecond performance.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> DynamoDB is a hyper-organized filing cabinet with billions of identically labeled drawers. Looking up an item by its key is like knowing exactly which drawer to open — instantaneous, regardless of how many drawers there are. SQL is a library with interconnected card catalogs that require cross-referencing multiple filing systems (JOINs). Incredible for complex queries. Catastrophically slow at scale for simple key lookups. DynamoDB throws away the complexity and keeps only the speed.</div>

<div class="lesson-alert"><strong>Sales Tip:</strong> When a prospect describes "database connection pool exhaustion" or "we can't scale writes past X transactions per second," pitch DynamoDB. It scales via HTTP APIs — no persistent connections, no connection limits, no bottlenecks. It handles the write spikes that kill traditional RDS instances.</div>
`;

getTopic('ElastiCache: The Caching Layer').prose = `
<p>Your database is fast. But it's not "answer 50,000 simultaneous requests for the same product page" fast. Every one of those requests hits the same rows, runs the same query, and returns the same result — burning database CPU for data that hasn't changed in the last 30 seconds. This is the most common and most preventable performance problem in cloud architecture.</p>

<p>The fix is a <strong>caching layer</strong>. You put an in-memory store in front of your database. The first request runs the expensive query. The result is stored in cache. The next 49,999 requests get the answer directly from memory — in <em>microseconds</em>, without touching the database at all. Your database load drops 90%. Your response times drop 100x.</p>

<p><strong>Amazon ElastiCache</strong> provides two caching engines:</p>

<p><strong>Redis:</strong> The Swiss Army knife. Supports persistence (data survives a restart), Multi-AZ replication, automatic failover, pub/sub messaging, sorted sets (leaderboards), geospatial indexing, and Lua scripting. Redis is the right choice when you need caching PLUS session storage PLUS real-time features PLUS durability. The industry default for production workloads.</p>

<p><strong>Memcached:</strong> The razor-sharp specialist. Pure, simple, blazing-fast object cache. No persistence. No replication. No complex data types. Multi-threaded for maximum CPU utilization. Choose Memcached when you need maximum raw caching throughput and can tolerate losing the cache on restart (it simply re-warms from the database).</p>

<p><strong>The Lazy Loading Pattern:</strong> App checks cache. If the key exists (cache hit) → return instantly. If not (cache miss) → query database, store result in cache with a TTL (time-to-live), return result. Subsequent requests hit the cache until TTL expires.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Your database is a library. Every query is sending a librarian to find a book, photocopy it, and hand it to you. ElastiCache is a personal bookshelf next to your desk — you keep the most frequently needed books there. First time you need a book, the librarian gets it (cache miss). After that, you grab it off your desk in 2 seconds (cache hit). Redis is a bookshelf that also locks the books so they survive a power outage. Memcached is a magnetic whiteboard — fast and simple, but gets erased every time you turn off the lights.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> <em>"Your RDS database CPU is at 90% due to identical read queries. What is the first recommendation?"</em> Answer: <strong>ElastiCache</strong>. Not a Read Replica. A Read Replica still runs queries — it just distributes them. ElastiCache eliminates the queries entirely for repeated data access.</div>
`;

// =============================================================
// MODULE 7: MESSAGING
// =============================================================

getTopic('SQS: The Message Queue').prose = `
<p>Imagine your order processing service receives 10,000 orders in 10 minutes during a flash sale. Your processing service can only handle 500 orders per minute. Without a queue, 9,500 orders simply crash the system or get dropped entirely. This is the <strong>thundering herd problem</strong> — and it has destroyed startups on their best days.</p>

<p><strong>Amazon SQS (Simple Queue Service)</strong> is the solution. It's a fully managed message queue that acts as a shock absorber between your producers (services that generate work) and consumers (services that process work). Orders flow into the queue at any rate. Processors drain the queue at their maximum comfortable speed. The queue holds the excess safely, durably, for up to 14 days.</p>

<p><strong>Standard Queue:</strong> Virtually unlimited throughput. Messages are delivered at-least-once (rare duplicates possible) with best-effort ordering. Use for: email notifications, log processing, image upload handling, and any workload that can handle occasional duplicate messages with idempotent processing.</p>

<p><strong>FIFO Queue:</strong> First-In-First-Out — guaranteed ordering, exactly-once processing, and built-in deduplication. Throughput is capped at 3,000 messages/second with batching. Use for: financial transactions, inventory updates, order processing sequences where order and uniqueness are non-negotiable.</p>

<p><strong>Visibility Timeout:</strong> When a consumer picks up a message, it becomes invisible to other consumers for a configurable window (default 30 seconds). If the consumer crashes mid-processing, the timeout expires and the message reappears for another consumer to retry. This is how SQS achieves fault tolerance without coordination.</p>

<p><strong>Dead Letter Queue (DLQ):</strong> After a message fails processing N times (your maxReceiveCount setting), SQS routes it to a designated DLQ. This isolates poison-pill messages — malformed data that would crash your consumer forever — without blocking the healthy queue.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> SQS is the order ticket rack that separates the dining room from the kitchen. Waiters (producers) pin tickets as fast as customers order — 300 tables ordering simultaneously. Chefs (consumers) pull tickets at their own sustainable pace — 50 plates per hour. If a chef gets sick (consumer crashes), the ticket stays on the rack. A new chef picks it up. The DLQ is the "problem orders" bin — the ticket for a dish nobody can make gets pulled out and flagged for investigation instead of sitting on the rack eternally, confusing every chef.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> <strong>"Decouple"</strong> in an exam question = SQS. <strong>"Exactly-once"</strong> or <strong>"ordered"</strong> = FIFO Queue. <strong>"Failed messages"</strong> or <strong>"retry analysis"</strong> = Dead Letter Queue. The exam loves all three of these pattern-matching moments.</div>
`;

getTopic('SNS: The Notification Bus').prose = `
<p>SQS solves the one-producer-one-consumer problem brilliantly. But what if a single event needs to trigger five different systems simultaneously? What if a new user signing up needs to: send a welcome email, trigger an onboarding Lambda, push a record to your analytics SQS queue, update your CRM via an HTTP webhook, and SMS your sales team? Five consumers. One event. Zero tolerance for "one of them didn't get it."</p>

<p><strong>Amazon SNS (Simple Notification Service)</strong> is a fully managed pub/sub messaging service. You publish one message to an SNS Topic. Every subscriber to that topic receives a copy of that message instantly and simultaneously. Subscribers can be: SQS queues, Lambda functions, HTTP/HTTPS endpoints, email addresses, SMS phone numbers, or mobile push notifications.</p>

<p><strong>The Fan-Out Pattern</strong> is the killer application of SNS. An S3 upload event publishes to an SNS Topic. That topic fans out to three SQS queues: one for thumbnail generation, one for content moderation, one for search indexing. Each SQS queue is consumed by its own dedicated service at its own pace. One upload event, three parallel processing pipelines — fully decoupled, independently scalable, failure-isolated.</p>

<p><strong>SNS vs SQS — The Critical Distinction:</strong><br>
SNS is <em>push-based</em>: it actively delivers messages to subscribers the moment they're published. If a subscriber is offline, the message is lost (unless the subscriber is an SQS queue, which durably retains it).
SQS is <em>pull-based</em>: consumers actively poll the queue. Messages wait patiently for up to 14 days. Nothing is lost if consumers are temporarily down.</p>

<p>The canonical resilient pattern: <strong>SNS → multiple SQS queues</strong>. SNS guarantees fan-out delivery. SQS guarantees durable retention. Together they're unbeatable.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> SQS is a single department's inbox — work goes in, one team processes it. SNS is the company PA system — one announcement reaches every department simultaneously. The Fan-Out pattern is using the PA system to announce to multiple departments who each have their own inbox (SQS queues): "New shipment arrived." Warehouse, billing, and customer service all hear it at once and process it at their own pace. You announced once. Everyone got it. Nobody blocked anyone else.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> The phrase <em>"send a notification to multiple endpoints simultaneously"</em> = <strong>SNS</strong>. The phrase <em>"ensure each subscriber processes the message independently at their own rate with no message loss"</em> = <strong>SNS → SQS Fan-Out</strong>. Know the difference cold — the exam tests this combination pattern regularly.</div>
`;

// =============================================================
// MODULE 9: SECURITY
// =============================================================

getTopic('IAM Deep Dive').prose = `
<p>The most common attack vector in cloud environments isn't a sophisticated zero-day exploit. It's a misconfigured IAM policy. An overprivileged role. A developer who gave themselves AdministratorAccess "just for testing" and forgot to remove it. <strong>Identity and Access Management (IAM)</strong> is the first, most important, and most nuanced security layer in AWS — and the SAA-C03's highest-weighted domain.</p>

<p><strong>The Core IAM Objects:</strong><br>
<strong>Users:</strong> Individual identities with long-term credentials (username/password, access keys). AWS recommends minimizing IAM Users in favor of roles and federation.<br>
<strong>Groups:</strong> Collections of users that share a permission set. Attach policies to Groups, not individual Users.<br>
<strong>Roles:</strong> Identities without long-term credentials. Assumed temporarily by AWS services (EC2, Lambda), other accounts, or federated users. Roles are the correct answer for machine-to-machine authentication.<br>
<strong>Policies:</strong> JSON documents that define permissions. Attached to users, groups, or roles.</p>

<p><strong>Identity-Based vs Resource-Based Policies:</strong><br>
An <em>identity-based policy</em> is attached to a principal (user, group, role): "Nate can read from S3."<br>
A <em>resource-based policy</em> is attached to the resource itself (S3 bucket, SQS queue, KMS key): "This S3 bucket allows Nate to read from it."<br>
Same-account access: EITHER grants access. Cross-account: BOTH must explicitly allow.</p>

<p><strong>Federation and Cognito:</strong> You don't create IAM Users for 10,000 customers. You use identity federation. Amazon Cognito handles user authentication for consumer-facing applications, integrating with social providers (Google, Facebook) or corporate SAML/OIDC providers. It vends short-lived AWS credentials via the STS AssumeRole operation.</p>

<p><strong>The Principle of Least Privilege:</strong> Every user, role, and service gets exactly the permissions they need to do their job — no more. An EC2 instance serving a read-only API should have a role that allows only s3:GetObject on one specific bucket. Not s3:* on all buckets. Every excess permission is a loaded weapon left on the floor.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> IAM is the company's access control system. Users are employees. Groups are departments — the Finance group gets access to billing systems; the Engineering group gets access to the code repository. Roles are the temporary security clearances issued to contractors for a specific project — they can access exactly what they need for exactly as long as the project runs, then the clearance expires. The least-privilege principle is the rule that nobody gets a master key just because they're senior. Even the CEO can only access the rooms relevant to their work.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> The exam will present a scenario where an EC2 instance needs to access S3. The correct answer is always: <strong>create an IAM Role with the required permissions and attach it to the EC2 instance</strong>. Never store access keys in application code, environment variables, or EC2 user data. Never. That's not an architecture answer — that's a security incident waiting to happen.</div>
`;

getTopic('AWS KMS').prose = `
<p>Encryption is table stakes for any regulated workload — HIPAA, PCI-DSS, SOC 2, GDPR. All of them require it. The question isn't whether to encrypt; it's <em>who controls the keys</em>. And that distinction separates a security checkbox from actual security.</p>

<p><strong>AWS KMS (Key Management Service)</strong> is the centralized key management system that integrates natively with virtually every AWS service. Enable encryption on an S3 bucket, RDS database, EBS volume, or DynamoDB table, and KMS handles the key generation, storage, rotation, and audit logging invisibly.</p>

<p><strong>AWS Managed Keys (aws/s3, aws/rds):</strong> AWS creates and controls these keys automatically. They're free. They rotate every year automatically. The catch: AWS has administrative access. Your compliance auditor cannot see the key policy, cannot enforce custom rotation schedules, and cannot guarantee that key usage logs cover their specific audit requirements. For basic compliance, fine. For strict PCI-DSS or HIPAA, not enough.</p>

<p><strong>Customer Managed Keys (CMKs):</strong> You create these. You own the key policy. You control who can use the key, under what conditions, and from which services. You can enable automatic rotation on your schedule. You get detailed CloudTrail logs of every Encrypt and Decrypt operation — who called it, from where, at what time. You pay ~$1/month per key plus $0.03 per 10,000 API calls. For any regulated environment that needs to demonstrate key ownership to an auditor: CMKs are non-negotiable.</p>

<p><strong>Envelope Encryption:</strong> KMS doesn't directly encrypt your 5GB S3 object. That would be slow and expensive. Instead, KMS generates a Data Key. The data key encrypts your object (locally, fast). The data key itself is then encrypted by your CMK (stored securely). Your object is never transmitted to KMS — only the tiny data key is. This is envelope encryption, and it's how AWS achieves both security and performance at scale.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> AWS Managed Keys are the bank's safe deposit box — your valuables are inside, but the bank has a master key. Useful and secure, but you're trusting the bank. Customer Managed Keys are a private safe in your office — you own the only key, you decide who can use it, and you have a full audit log of every time it was opened. Your compliance auditor wants to see YOUR safe with YOUR key. The bank's master key doesn't satisfy that requirement.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> When a question mentions "compliance requirements mandate that the customer controls the encryption keys," the answer is always <strong>Customer Managed Keys (CMK)</strong>. AWS Managed Keys fail this requirement because AWS maintains administrative access to them.</div>
`;

getTopic('AWS WAF, Shield').prose = `
<p>Your application is live and profitable. Congratulations — you've just made yourself a target. DDoS attacks are not theoretical. They're a service industry. For a few hundred dollars, a competitor or extortionist can rent a botnet and flood your application with enough traffic to take it offline within minutes. Knowing your perimeter defenses is not optional.</p>

<p><strong>AWS Shield Standard:</strong> Free. Automatic. Applied to every AWS customer without any configuration. Protects against the most common Layer 3 and Layer 4 DDoS attacks — UDP floods, SYN floods, reflection attacks. AWS's infrastructure absorbs these before they even reach your resources. For the vast majority of applications, Shield Standard is sufficient.</p>

<p><strong>AWS Shield Advanced:</strong> $3,000/month per organization. Provides protection against more sophisticated, larger-scale DDoS attacks. Includes 24/7 access to the AWS DDoS Response Team (DRT), real-time attack visibility in CloudWatch, and financial protection against cost spikes from DDoS-induced scaling events. For financial institutions, gaming platforms, or any application where a 10-minute outage is catastrophic.</p>

<p><strong>AWS WAF (Web Application Firewall):</strong> Operates at Layer 7 (application layer), inspecting the actual content of HTTP/HTTPS requests. You define rules to: block known malicious IPs, rate-limit requests from a single IP (stopping credential stuffing attacks), filter requests containing SQL injection patterns, block requests with Cross-Site Scripting (XSS) payloads, or geo-block requests from entire countries. Attach WAF to an ALB, API Gateway, or CloudFront distribution.</p>

<p><strong>Amazon Macie:</strong> A separate service that uses machine learning to scan your S3 buckets and automatically detect sensitive data — credit card numbers, social security numbers, passport details, API keys — sitting in unencrypted or publicly accessible buckets. The "you accidentally uploaded the customer database as a CSV" detector.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Shield Standard is the concrete bollards outside a stadium — they passively stop vehicles from ramming the doors (volumetric DDoS). Shield Advanced adds an armed security detail with direct communication to the National Guard (DRT). WAF is the elite team at the door reading every ID, checking for weapons, and turning away anyone on the no-fly list (SQL injection, known bad IPs). Macie is the internal auditor who periodically walks through the building checking if anyone left sensitive documents on a public bulletin board.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> Shield = DDoS protection (Layers 3/4, volumetric attacks). WAF = Application layer protection (Layer 7, SQL injection, XSS, rate limiting). They solve different problems and are often deployed together. Macie = S3 PII detection. Don't confuse them.</div>
`;

getTopic('Secrets Manager vs Parameter Store').prose = `
<p>Every application has secrets: database passwords, API keys, OAuth tokens, encryption keys. The question isn't whether you have them — it's where you put them. And the wrong answer kills companies. Secrets found in GitHub repositories, hard-coded into EC2 user data, stored in plaintext config files — these are the actual attack vectors that produce actual breaches. AWS provides the right answer, and the exam will test whether you know when to use which.</p>

<p><strong>SSM Parameter Store (the free option):</strong><br>
AWS Systems Manager Parameter Store stores configuration values and secrets as key-value pairs. Standard tier parameters are free. <em>SecureString</em> parameters encrypt values at rest using KMS — the value is automatically decrypted when retrieved by an authorized IAM entity. Excellent for: feature flags, configuration values, environment-specific settings (dev vs. prod database endpoints), and secrets that don't need automated rotation.</p>

<p><strong>AWS Secrets Manager (the managed rotation option):</strong><br>
Costs $0.40/secret/month. The key differentiator: <strong>automatic rotation</strong>. Secrets Manager integrates natively with RDS, Redshift, DocumentDB, and other services to automatically rotate credentials on a configurable schedule (e.g., every 30 days) — with zero application downtime. Your Lambda calls <code>GetSecretValue</code> at runtime and always receives the current, rotated password. No redeployment. No downtime. No manual process. For compliance mandates requiring periodic credential rotation (PCI-DSS, HIPAA, SOC 2 Type II), Secrets Manager is the only acceptable answer.</p>

<p><strong>AWS STS (Security Token Service):</strong><br>
The engine behind IAM Roles. When a Lambda assumes a role, EC2 assumes an instance profile, or Account A accesses Account B's resources — STS is the service vending temporary security credentials (Access Key ID + Secret Key + Session Token) with automatic expiry. No permanent credentials stored anywhere. This is how cross-account access works, how federated identity works, and how the entire IAM Role ecosystem operates under the hood.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Parameter Store SecureString is a locked filing cabinet — your secret is in there, encrypted, and only the right people can open it. Secrets Manager is a high-security vault with an automated locksmith who changes the combination every 30 days and simultaneously tells all your authorized systems the new combination — with no downtime. STS is the security desk that prints temporary visitor badges — valid for a specific purpose, self-destructing at end of day, never duplicated.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> Decision rule is clean: <strong>Automatic rotation required → Secrets Manager.</strong> <strong>Simple encrypted config storage → Parameter Store SecureString (free).</strong> Any scenario mentioning RDS credential rotation, PCI-DSS, or HIPAA compliance for credentials will always answer Secrets Manager.</div>
`;

// =============================================================
// MODULE 10: MANAGEMENT
// =============================================================

getTopic('CloudWatch vs. CloudTrail vs. Config').prose = `
<p>AWS gives you three distinct monitoring and governance services that are specifically designed to be confused with each other on the exam. The titles rhyme. The purposes don't. Burn these three sentences into your brain:</p>

<p><strong>CloudWatch monitors performance.</strong> CPU. Memory. Network. Error rates. Response times. It is the realtime dashboard and alerting system for your infrastructure's health metrics. When your CPU spikes to 98%, CloudWatch fires an alarm that can trigger an Auto Scaling Group to launch more instances, send an SNS notification to your on-call engineer, or execute a Lambda function. No API call logging. No configuration state. Just metrics, logs, and alarms.</p>

<p><strong>CloudTrail monitors API calls.</strong> Every single action taken in your AWS account — by a human, by an automated process, by an AWS service — is an API call, and CloudTrail logs them all. Who created that EC2 instance? Who deleted that S3 bucket? Who changed that Security Group rule at 2:47 AM? CloudTrail answers these forensic questions with a complete, immutable audit trail. It is the CISO's best friend and the attacker's worst nightmare. Enabled by default for 90 days; configure a Trail to send logs to S3 for long-term retention.</p>

<p><strong>AWS Config monitors configuration state.</strong> Not who changed it — what the current state is and whether it has changed. Config continuously records the configuration of every AWS resource and evaluates it against compliance rules. "Was this S3 bucket publicly accessible at any point in the last 30 days?" "Does this Security Group allow unrestricted inbound SSH?" "Are all EBS volumes encrypted?" Config answers these questions continuously and can automatically remediate violations (close the open port, enable encryption).</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> CloudWatch is your car's dashboard — speedometer, fuel gauge, temperature warning light. It tells you how the machine is performing right now. CloudTrail is the GPS trip history — every turn you made, every road you traveled, a complete, timestamped record of where the car has been. AWS Config is the annual vehicle inspection — it checks whether the car currently meets safety standards, flags violations, and can fail the vehicle if it doesn't comply.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> The exam patterns are predictable: "Who made this change?" → <strong>CloudTrail</strong>. "CPU is spiking, send an alert" → <strong>CloudWatch</strong>. "Continuously check that S3 buckets aren't public and remediate automatically" → <strong>AWS Config</strong>. The answer maps directly to the three keywords: performance, API calls, configuration state.</div>
`;

getTopic('AWS Organizations').prose = `
<p>Enterprise AWS deployments don't use one account. A mature organization might run 50-200 AWS accounts — separate accounts for production, staging, development, security, logging, network, and individual business units. This is deliberate. Account-level isolation is the strongest blast-radius containment available. A security incident in the Dev account cannot affect Production. A cost overrun in one team's account doesn't touch another's.</p>

<p><strong>AWS Organizations</strong> is the centralized management layer for this multi-account strategy. You create an Organization with a management (root) account and add member accounts either by creating them or inviting existing accounts. Accounts can be organized into <strong>Organizational Units (OUs)</strong> — logical groupings like "Production," "Development," or by business unit.</p>

<p><strong>Service Control Policies (SCPs) — The Ultimate Guardrail:</strong><br>
SCPs are the most powerful access control mechanism in AWS. They are applied at the Organization or OU level and act as permission boundaries — they define the <em>maximum</em> permissions any IAM entity in that account can have. SCPs don't grant access; they restrict it.</p>

<p>Critical behavior: <strong>An SCP overrides everything</strong>. If an SCP attached to an OU says "Deny all actions unless the region is us-east-1," then even the root user of a member account cannot launch an EC2 instance in eu-central-1. Period. No IAM Administrator policy overrides an SCP denial. This is how enterprises enforce data residency, region restrictions, and compliance requirements at scale — one policy, enforced across 200 accounts.</p>

<p><strong>AWS Control Tower:</strong> A higher-level service that automates the setup and governance of a multi-account AWS environment. Pre-configured guardrails (SCPs), centralized logging to a dedicated Log Archive account, automated CloudTrail across all accounts. The turnkey version of Organizations for enterprises who want the multi-account best practice without building it themselves.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> AWS Organizations is corporate structure. The CEO (management account) sits at the top. Business units are Organizational Units. Each subsidiary (member account) operates independently with its own budget and teams. SCPs are the global corporate policy that every subsidiary must follow regardless of their local HR rules — "no subsidiary may operate in these countries" is enforced from headquarters and cannot be overridden by any local manager, no matter how senior.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> SCPs do NOT grant permissions — they define the maximum boundary. A Deny in an SCP overrides any Allow in IAM, even for the account root user. This is the most important SCP nuance on the exam.</div>
`;

getTopic('Kinesis').prose = `
<p>Your IoT sensors are generating 1 million events per second. Your trading algorithms are producing 50,000 price ticks per minute. Your application logs are streaming at 10GB per hour. You cannot write this volume of data directly to a database — it will saturate the write capacity, spike costs, and crash the service before you've processed a fraction of it. You need a highway, not a parking lot.</p>

<p><strong>Amazon Kinesis</strong> is that highway — a family of services for ingesting, processing, and analyzing real-time streaming data at any scale.</p>

<p><strong>Kinesis Data Streams:</strong> The core ingestion layer. Producers push records to a Stream, which is divided into Shards (parallel processing lanes). Multiple consumers (Lambda, EC2 applications, Kinesis Data Analytics) can read from the same stream simultaneously — each at their own position. Records are retained for 24 hours by default (up to 365 days). Use when you need custom processing logic, multiple independent consumers, or replay capability.</p>

<p><strong>Kinesis Data Firehose:</strong> The fully managed "I just want to get data into S3/Redshift/OpenSearch" service. Zero code required for the delivery pipeline. Firehose automatically buffers, batches, compresses, and optionally transforms records (via a Lambda) before loading them into the destination. Near-real-time (60-second buffer minimum). Use when you don't need custom processing — just reliable, cheap bulk ingestion into a data store.</p>

<p><strong>Amazon Athena:</strong> Serverless SQL query engine for data sitting in S3. Your Firehose has been dumping JSON log files into S3 for a year. Athena lets you write standard SQL against that data without loading it into a database. You pay per TB scanned. For ad-hoc analytics on large datasets in S3, this is dramatically cheaper than loading into Redshift.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Kinesis Data Streams is the interstate highway system — high-speed lanes (shards) carrying massive traffic (data) between producers and multiple independent consumers, all at once. Kinesis Firehose is a conveyor belt from the highway exit directly to the warehouse loading dock (S3/Redshift) — fully automated, no driver needed, loads it neatly in batches. Athena is the inventory auditor who can search any warehouse shelf by description without physically moving a single item.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> "Real-time data" + "custom processing" + "multiple consumers" = <strong>Kinesis Data Streams</strong>. "Stream data to S3/Redshift with no custom code" = <strong>Kinesis Firehose</strong>. The exam distinguishes these two consistently — don't conflate them.</div>
`;

// =============================================================
// MODULE 11: CONTAINERS
// =============================================================

getTopic('ECS vs. EKS vs. Fargate').prose = `
<p>You've got a Docker container. Twelve lines of Dockerfile, tested locally, running perfectly. Now you need to run it in production, scale it to hundreds of instances, update it without downtime, and monitor it. The container itself is the easy part. <em>Orchestrating</em> containers — that's where the complexity lives. AWS offers three answers, each solving a different version of the problem.</p>

<p><strong>ECS (Elastic Container Service):</strong> AWS's proprietary container orchestration platform. You define Task Definitions (what container to run, CPU/memory limits, environment variables, port mappings) and Services (how many copies to run, deployment strategy, Load Balancer integration). ECS handles scheduling, placement, health checks, and rolling deployments. Deeply integrated with IAM, ALB, CloudWatch, and ECR (the container registry). Lower operational overhead than Kubernetes. The right choice if you're AWS-native and don't need Kubernetes portability.</p>

<p><strong>EKS (Elastic Kubernetes Service):</strong> Managed Kubernetes. AWS handles the control plane (etcd, API server, scheduler) — you manage the worker nodes. Choose EKS when: you're migrating from an on-premises Kubernetes cluster, your team has deep Kubernetes expertise, you need multi-cloud portability, or your workload uses Kubernetes-specific features (custom operators, service mesh, etc.). Higher operational complexity than ECS, but the global standard for enterprise container orchestration.</p>

<p><strong>Fargate (The Serverless Compute Engine):</strong> Not an orchestrator — a compute model. Instead of managing the underlying EC2 instances that run your containers, Fargate abstracts them entirely. You define the task (CPU, memory, container image), and AWS provisions the exact right amount of compute behind the scenes. You never see, patch, or manage EC2 instances. Works with both ECS and EKS. Higher per-vCPU cost than raw EC2, but eliminates EC2 fleet management overhead. The correct choice for teams who want containers without infrastructure management.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> ECS is a proprietary delivery fleet management system — well-designed, AWS-native, purpose-built for the job. EKS is the global shipping industry standard (Kubernetes) — more complex, but your drivers, routes, and processes work anywhere in the world. Fargate is the difference between owning trucks versus calling a freight company: Fargate says "move this container, I don't care which truck you use, just bill me per mile." You never manage the truck — only the cargo.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> The exam pattern: "A company wants to run containers without managing EC2 instances" → <strong>Fargate</strong>. "A company is migrating from on-premises Kubernetes" → <strong>EKS</strong>. "A company wants simple AWS-native container orchestration" → <strong>ECS</strong>. Know all three and the decision criteria for each.</div>
`;

getTopic('AWS Batch').prose = `
<p>Not everything needs to run in real time. Genomic sequencing. Financial risk modeling. Video rendering. Machine learning training runs. Log analysis across petabytes. These are batch workloads — discrete, bounded jobs that need to run on massive compute for a defined period and then finish. They don't need millisecond response times. They need raw horsepower, on demand, at minimum cost.</p>

<p><strong>AWS Batch</strong> is built for exactly this. You submit batch jobs to a managed job queue. Batch evaluates the resource requirements of each job and automatically provisions the right EC2 instances (including Spot Instances for maximum savings) to execute them. When the queue is drained, instances terminate and billing stops. You pay only for the compute consumed during job execution.</p>

<p><strong>AWS Elastic Beanstalk:</strong> The opposite philosophy from Batch. Beanstalk is a Platform-as-a-Service (PaaS) for web applications. A developer uploads a ZIP of their application code (Node.js, Python, Java, PHP, Ruby, .NET, Go) and Beanstalk automatically provisions and manages the underlying infrastructure: EC2 instances, Load Balancer, Auto Scaling Group, RDS (optionally), CloudWatch monitoring. The developer focuses entirely on code. AWS handles the infrastructure. The catch: you sacrifice control for convenience. Configuration is possible, but Beanstalk abstracts the details.</p>

<p><strong>When to use which:</strong><br>
Batch = scientific computing, overnight data processing, ML training jobs, anything that's a queue of discrete jobs with defined start and end.<br>
Beanstalk = web application deployment where you want AWS to handle the operational setup without doing it manually via CloudFormation or the console.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> AWS Batch is a fulfillment warehouse: pallets of work (jobs) arrive on the loading dock, the warehouse dynamically brings in as many workers (EC2 instances, often Spot) as needed to process the load, then sends them home when the shift ends. Elastic Beanstalk is a franchise restaurant kit — everything you need to open a restaurant arrives in one box. You just add the ingredients (code) and open the doors. You don't architect the kitchen, hire the construction crew, or wire the electrical. Beanstalk did it.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> <em>"A research team needs to process 100,000 genomic samples as efficiently as possible using Spot Instances."</em> → <strong>AWS Batch</strong>. <em>"A startup developer wants to deploy a Python web app without managing infrastructure."</em> → <strong>Elastic Beanstalk</strong>. These are the canonical use cases for each service.</div>
`;

// =============================================================
// MODULE 12: DISASTER RECOVERY
// =============================================================

getTopic('Disaster Recovery Strategies').prose = `
<p>At some point, something will fail. A region will have an outage. A database will be corrupted. A ransomware attack will encrypt your production systems. The question isn't if — it's whether you're prepared when it happens. Disaster Recovery is the discipline of answering: <em>how much data can we afford to lose, and how long can we afford to be down?</em> The exam makes these concepts mathematically precise with two metrics.</p>

<p><strong>RPO (Recovery Point Objective):</strong> The maximum age of data you can recover. How much data loss is acceptable? If you backup every 4 hours and disaster strikes 3.5 hours after the last backup, you lose 3.5 hours of data. That's your RPO. A bank might have an RPO of zero seconds (no data loss tolerated). A small blog might have an RPO of 24 hours (daily backups are fine).</p>

<p><strong>RTO (Recovery Time Objective):</strong> The maximum acceptable downtime. How long can the system be offline before the business critically fails? An e-commerce site on Black Friday might have an RTO of 30 seconds. An internal analytics dashboard might have an RTO of 4 hours.</p>

<p><strong>The Four DR Strategies (cheapest to fastest recovery):</strong></p>

<p><strong>1. Backup & Restore (High RTO/RPO, Lowest Cost):</strong> Back up data to S3. In a disaster, provision infrastructure from scratch and restore from backup. Hours to recover. Suitable for non-critical systems or extremely tight budgets.</p>

<p><strong>2. Pilot Light (Medium RTO/RPO, Low Cost):</strong> Core components (just the database, the critical data source) run continuously in the DR region. Application servers are off. In a disaster, quickly boot the app tier (pre-configured AMIs ready) and point it at the running database. Recovery: 10-30 minutes.</p>

<p><strong>3. Warm Standby (Low RTO/RPO, Medium Cost):</strong> A fully functional, scaled-down version of production runs continuously in the DR region. In a disaster, scale it up to production capacity. Recovery: minutes. Carries ongoing cost for the running mini-environment.</p>

<p><strong>4. Multi-Site Active-Active (Near-Zero RTO/RPO, Highest Cost):</strong> Full production environments running simultaneously in multiple regions. Traffic is distributed (Route 53 latency routing). Failover is near-instantaneous — Route 53 simply stops sending traffic to the failed region. Zero data loss. Maximum cost. Required for systems where any downtime is unacceptable.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Backup & Restore is keeping a spare tire in the trunk — you're not going anywhere quickly after a blowout, but at least you're not calling a tow truck. Pilot Light is having a generator wired but unplugged — you'll have power in minutes once you flip the switch. Warm Standby is a second office already set up with desks, computers, and a skeleton crew — ready to scale up the moment the main office floods. Multi-Site Active is having two full offices already running — if one building loses power, every employee is already working from the other one. The price differential between these four options is as dramatic as the recovery time difference.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> The exam describes a business scenario and asks which DR strategy meets the RTO/RPO requirements at the lowest cost. Always match cost to requirements — don't recommend Active-Active for a non-critical internal tool. The principle is: use the cheapest strategy that meets the RTO/RPO. Over-engineering DR is as wrong an answer as under-engineering it.</div>
`;

getTopic('AWS Snow Family').prose = `
<p>Here's an uncomfortable math problem: you have 100 terabytes of on-premises data to migrate to AWS. Your internet connection is 1 Gbps. At theoretical maximum transfer speed, 24 hours a day, 7 days a week, it will take you <strong>over 9 days</strong> to transfer that data — and that's before accounting for real-world network congestion, errors, and retries. At 100 Mbps, you're looking at months. AWS had a better idea: <em>put the data on a truck.</em></p>

<p>The AWS Snow Family is a suite of physical data migration devices — ruggedized hardware that AWS ships to your data center. You load your data locally at full disk speeds (no internet bottleneck), then ship the device back to AWS, where they ingest it directly into S3. Network latency: zero. Transfer speed: limited only by your local disk I/O.</p>

<p><strong>Snowcone:</strong> 8TB usable storage. Small enough to fit in a backpack. Rugged, battery-operated, can be deployed in harsh environments — oil fields, military operations, disaster zones. The "edge computing + data collection" device.</p>

<p><strong>Snowball Edge Storage Optimized:</strong> 80TB usable storage. The size of a large suitcase. Rack-mountable in your data center. You plug it into your network, run the data transfer client, and when it's full, UPS ships it back to AWS in a tamper-evident, encrypted container. The bread-and-butter migration device for data centers.</p>

<p><strong>Snowball Edge Compute Optimized:</strong> 42TB storage + powerful GPU. Designed for edge computing scenarios where you need to process data before transferring it — ML inference on video feeds in locations with no internet connectivity.</p>

<p><strong>AWS Snowmobile:</strong> An actual 45-foot shipping container pulled by a 18-wheeler truck. Holds up to 100 petabytes. AWS drives it to your campus, you connect via a high-speed fiber connection, fill it with exabytes of data, and they drive it to an AWS data center. Reserved for companies migrating entire data centers — video archives, scientific research datasets, government records at national scale.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Andrew Tanenbaum, the computer scientist, said it best in 1981: "Never underestimate the bandwidth of a station wagon full of tapes hurtling down the highway." The Snow family is AWS's acknowledgment that sometimes physics wins — when your dataset is large enough, shipping atoms is faster than transmitting bits. A Snowball driving 70 mph on an interstate with 80TB of data delivers more effective bandwidth than most enterprise internet connections.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> The trigger phrase for Snow Family questions: <em>"limited bandwidth," "large dataset migration," "unreliable connectivity," or "edge location with no internet."</em> The decision: Snowcone = tiny, portable, harsh environments. Snowball Edge = standard data center migrations. Snowmobile = petabyte-scale, entire data center migrations.</div>
`;

getTopic('AWS DataSync').prose = `
<p>The Snow Family solves the one-time, massive migration problem. But what about the ongoing reality of hybrid cloud — where you have on-premises systems that will continue generating data for years, and you need a continuous, automated, reliable way to move that data to AWS?</p>

<p><strong>AWS DataSync</strong> is an agent-based data transfer service. You install a lightweight DataSync agent on your on-premises servers or in your VMware environment. The agent securely transfers files and objects between your local NFS/SMB/HDFS storage and AWS (S3, EFS, FSx) at up to 10x faster than open-source tools. DataSync handles scheduling, monitoring, encryption in transit, data integrity verification, and automatic retries — without you writing any custom transfer scripts.</p>

<p><strong>AWS Storage Gateway</strong> is the complement to DataSync — it's not about migration, it's about <em>extending</em> your on-premises storage with cloud capacity while your applications think they're talking to local storage:</p>

<p><strong>File Gateway:</strong> Presents an NFS or SMB share to your on-premises applications. Files written to this share are transparently stored as objects in S3. Applications never know their files live in the cloud — they just see a network drive.</p>

<p><strong>Volume Gateway:</strong> Presents block storage (iSCSI interface) to on-premises servers. Frequently accessed data is cached locally for fast access; all data is backed up as EBS snapshots in the cloud. Disaster recovery: restore the volume anywhere from the EBS snapshot.</p>

<p><strong>Tape Gateway:</strong> Emulates a physical tape library for backup software that still writes to tape (more common than you'd think in enterprises). Your backup application talks to a virtual tape library that automatically archives tapes to S3 and Glacier. Eliminates physical tape management without changing the backup workflow.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> DataSync is an automated moving company — it schedules regular runs between your old house (on-premises) and your new apartment (S3/EFS), handles the heavy lifting, verifies nothing was broken in transit, and retries if something went wrong. Storage Gateway is a teleportation door — your applications open the door and see a local filing cabinet, but every document they put in it silently appears in an S3 vault 500 miles away. The door looks local. The storage is cloud.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> DataSync = scheduled, automated file transfer between on-premises and AWS. Storage Gateway = make AWS storage appear as local storage to on-premises applications. The key difference: DataSync moves data. Storage Gateway extends storage transparently.</div>
`;

// =============================================================
// MODULE 13: COST OPTIMIZATION
// =============================================================

getTopic('AWS Cost Tools').prose = `
<p>Domain 4 of the SAA-C03 — Cost Optimization — represents 20% of your exam score. It's also the domain that reveals whether you're an architect or just a developer who can click buttons. Anyone can build a system that works. The mark of a senior architect is building a system that works AND doesn't set the budget on fire. AWS provides a full suite of tools for cost visibility, control, and optimization.</p>

<p><strong>AWS Cost Explorer:</strong> Your financial analytics dashboard. It visualizes historical spend broken down by service, region, linked account, resource tag, or instance type. It shows monthly and daily granularity, surfaces cost anomalies, and generates 12-month forecasts based on your usage patterns. The answer to "why did our bill go up 40% this month?" starts here.</p>

<p><strong>AWS Budgets:</strong> Proactive alerting before the damage is done. You define a budget (monthly cost, usage amount, or RI/Savings Plan coverage) and configure alerts at percentage thresholds (80%, 90%, 100% of budget). Alerts fire via email, SMS, or SNS. Budgets can also trigger automated actions: stop EC2 instances, apply an SCP, or notify an SNS topic that triggers a Lambda to kill runaway resources. The difference between Cost Explorer and Budgets: Explorer shows you what happened, Budgets warns you before it happens.</p>

<p><strong>AWS Trusted Advisor:</strong> An automated best-practice audit across five categories: Cost Optimization, Security, Fault Tolerance, Performance, and Service Limits. In the Cost category, Trusted Advisor flags: EC2 instances with low utilization (< 10% CPU), idle Load Balancers, unattached EBS volumes, Elastic IPs not associated with a running instance, and Reserved Instances expiring within 30 days. Business and Enterprise support plans unlock all Trusted Advisor checks — the free tier only provides 7 basic checks.</p>

<p><strong>AWS Compute Optimizer:</strong> Machine learning-based right-sizing recommendations. It analyzes 14 days of CloudWatch metrics and recommends optimal instance types for EC2, Lambda (memory), and ECS task size. The difference between what you're running and what Optimizer recommends is often significant — teams routinely discover they're paying 40% more than necessary.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Cost Explorer is your monthly bank statement — it shows where the money went after the fact. Budgets is the spending alert on your credit card — it warns you before you're overdrawn. Trusted Advisor is your financial advisor doing a quarterly portfolio review — flagging waste, risk, and missed optimization opportunities. Compute Optimizer is the advisor specifically reviewing your car payments and saying "you're driving a Ferrari to commute 2 miles each day — here's a more economical option that covers the same distance."</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> "Alert when monthly spend exceeds $500" → <strong>AWS Budgets</strong>. "Identify which service caused a 30% cost increase" → <strong>Cost Explorer</strong>. "Find underutilized EC2 instances and idle Load Balancers" → <strong>Trusted Advisor</strong>. "Recommend the right EC2 instance size based on actual usage" → <strong>Compute Optimizer</strong>.</div>
`;

getTopic('Right-Sizing').prose = `
<p>The most expensive mistake in cloud architecture isn't making a wrong technical choice. It's making the right technical choice and never revisiting it. Most teams over-provision resources at launch ("let's use xlarge to be safe") and never look back. Three months later, CloudWatch shows 4% average CPU utilization on those xl instances. You're paying 10x what you need. This is the right-sizing opportunity — and it's more common than anyone admits.</p>

<p><strong>Right-Sizing in Practice:</strong> Use AWS Compute Optimizer or CloudWatch metrics to identify resources where actual utilization is a fraction of provisioned capacity. Downsizing from m5.2xlarge to m5.large (if actual usage supports it) cuts that instance cost by 75%. Done across a fleet of 200 instances, the savings are significant.</p>

<p><strong>Savings Plans vs. Reserved Instances — The Modern Framework:</strong><br>
Before committing to either, right-size your fleet. Committing to a 3-year Reserved Instance for an oversized instance type is doubly expensive — you're paying the RI price for capacity you don't need, locked in for 3 years.</p>

<p>Once your fleet is right-sized, the commit decision:<br>
<strong>EC2 Instance Savings Plans:</strong> Commit to a specific instance family and region. Deepest discount (similar to Standard RIs, up to 72%). No flexibility on family or region.<br>
<strong>Compute Savings Plans:</strong> Commit to a minimum spend rate in $/hour. Applies to any EC2 instance type, any region, any OS — plus Lambda and Fargate. Smaller discount than EC2 Savings Plans but dramatically more flexible. The recommended commitment model for most organizations.</p>

<p><strong>S3 Cost Best Practices:</strong> Enable S3 Intelligent-Tiering on any bucket where access patterns are uncertain — AWS automatically moves objects between Standard and IA tiers based on access patterns, without retrieval fees. Use Lifecycle Policies for known patterns. Enable S3 Storage Lens for organization-wide bucket analytics.</p>

<p><strong>Cost Allocation Tags:</strong> Every resource should be tagged with at minimum: Project, Environment (prod/staging/dev), and Owner (team or individual). Cost Explorer uses these tags to break down spending by team, enabling cost accountability and revealing which projects are the biggest consumers.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Right-sizing is the corporate real estate review — "we're paying for 10,000 sq ft of office space but only 40 people work here." Savings Plans are the difference between signing a monthly gym membership vs. a 3-year membership — you get a massive discount for committing, but you should be sure you'll actually use it before you sign. Compute Savings Plans are the flexible gym membership that works at any location in the chain, not just the one near your house. Cost allocation tags are the expense report categories that tell you exactly which project or team ran up which tab on the company card.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> The exam often asks: "What should a company do FIRST before purchasing Reserved Instances?" The answer is always: <strong>analyze usage patterns and right-size instances</strong>. Committing to the wrong size defeats the purpose of the commitment discount.</div>
`;

// Save to data.js
const serialized = 'const DATA = ' + JSON.stringify(DATA, null, 4) + ';';
fs.writeFileSync('data.js', serialized, 'utf8');

console.log('');
console.log('=== PART 1: CORE AWS MODULES REWRITTEN ===');
console.log('Modules 1-13 prose updated with premium, exam-focused content.');
