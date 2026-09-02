
const CC={Sales:'#a78bfa',Cloud:'#4f9eff',Demo:'#2dd4bf'};
const CG={Sales:'rgba(167,139,250,.2)',Cloud:'rgba(79,158,255,.2)',Demo:'rgba(45,212,191,.2)'};
const DATA={
 flashcards:[
  {id:1,cat:'Sales',
   front:"A CTO tells you their on-prem setup has '99% uptime.' Why is this number useless to you as an SE, and what is the exact follow-up question?",
   back:"99% uptime = 87.6 hours of downtime per year. Meaningless without financial context. Your follow-up: <em>\"What does one hour of unplanned downtime cost your business in lost transactions, SLA penalties, and engineering recovery time?\"</em> That dollar figure is your Metric. Without it you have no urgency, no ROI case, and no reason for the client to sign this quarter instead of next.",
   analogy:"Trading: A chart pattern with no volume context is noise. The CTO's 99% uptime is the same number detached from its dollar consequence. Get the position size before you trade the setup."},
  {id:2,cat:'Sales',
   front:"You've been engaged with a CTO for 3 months. Strong technical alignment. The deal keeps slipping. Which MEDDPICC letter explains the stall, and what do you do right now?",
   back:"You missed the E — Economic Buyer. The CTO is your champion, not your budget authority. CTOs rarely sign POs over $50k without CFO involvement. Ask your champion: <em>\"When a decision of this scope gets approved, who else controls releasing the budget?\"</em> Then get a joint call. If your champion won't facilitate that introduction, you have a fan, not a champion. Adjust your forecast.",
   analogy:"Kempo: You've been drilling with a training partner who has no authority to call the match. The dojo instructor is the decision-maker. You need to get in front of them."},
  {id:3,cat:'Sales',
   front:"You win the technical evaluation but lose the deal. Your architecture was objectively superior. What almost certainly happened?",
   back:"You won on technical merit but lost on unstated Decision Criteria — typically a vendor scoring rubric you never saw, a compliance requirement, or embedded switching costs with an incumbent. Prevention: early in the cycle ask <em>\"Are there formal evaluation criteria or a scoring matrix I should know about? Who owns that document?\"</em> Getting that RFP weighting early lets you shape your proposal around their stated priorities, not just your strengths.",
   analogy:"Trading: You had the best technical setup but missed the macro catalyst. Technical edge without contextual edge is incomplete information. Know the full scoring criteria before you size in."},
  {id:4,cat:'Sales',
   front:"A prospect says 'We'll have a decision by end of quarter.' Why is this statement operationally useless, and what 4 things do you actually need to know?",
   back:"'End of quarter' is a wish, not a process. What you need: <strong>1)</strong> Who signs — Legal, Procurement, or the EB directly? <strong>2)</strong> Is there a security review or pen test requirement? <strong>3)</strong> Does procurement require 3 competitive bids? <strong>4)</strong> What is the PO issuance timeline after contract signature? Map every step, assign durations, work backward from their go-live date. Most deals that slip a quarter never had a mapped Paper Process.",
   analogy:"Trading: 'I'll close this position by Friday' means nothing without a defined catalyst or stop. What are the actual exit conditions? A timeline without a process is just intention."},
  {id:5,cat:'Sales',
   front:"A prospect says 'We're looking to modernize our infrastructure.' Why is this not a qualified pain, and what do you probe for next?",
   back:"'Modernize' is a direction, not a pain. Unquantified pain has zero urgency. Probe for the bleeding wound: <em>\"What specifically triggered this conversation now?\"</em> Then quantify: <em>\"How much is the current state costing you per month in downtime, manual toil, compliance exposure, or lost deals because your system couldn't scale?\"</em> Pain with a dollar figure is a deal. Pain without one is a feature conversation that stalls.",
   analogy:"Kempo: Your opponent presented a stance. That tells you direction, not intent. You don't commit a technique until you probe for the real opening — not the presented one."},
  {id:6,cat:'Sales',
   front:"Your champion just got promoted to a different division 3 weeks before expected close. Rank your immediate actions.",
   back:"<strong>1)</strong> Congratulate genuinely — long-term relationship regardless of this deal. <strong>2)</strong> Ask: <em>\"Who is inheriting ownership of this initiative?\"</em> <strong>3)</strong> Request a warm introduction — do not cold-approach the new stakeholder. <strong>4)</strong> Re-run discovery with the new owner — they must qualify the decision from their perspective. <strong>5)</strong> Adjust your forecast. Champion disruption delays close 60-90 days on average. A deal without a current champion is a deal at risk.",
   analogy:"Trading: Your entry signal disappeared mid-position. The thesis hasn't been invalidated, but the catalyst changed. Don't panic-close, but don't hold blindly. Reassess with fresh eyes."},
  {id:7,cat:'Sales',
   front:"A prospect says 'We're not evaluating anyone else.' Name your actual competitive threats in order of danger.",
   back:"From most to least dangerous: <strong>1) Do Nothing</strong> — the status quo. Free, familiar, politically safe. Your primary competition in 90% of enterprise deals. <strong>2) Build vs. Buy</strong> — their internal team building custom. Especially dangerous at tech-forward companies. <strong>3) The incumbent vendor</strong> with embedded switching costs and existing relationships. <strong>4) A named competitor.</strong> When a prospect says they aren't looking elsewhere, ask: <em>\"If you chose no solution this year, what would you do instead?\"</em> That answer is your real competition.",
   analogy:"MSTR: Your competition isn't just short sellers. It's every allocator who holds cash instead of Bitcoin. The competition for a deal budget is always 'do nothing' first."},
  {id:8,cat:'Sales',
   front:"Deal is verbally agreed. Champion says 'We just need the paperwork.' Name 4 ways this deal can still die in the next 30 days.",
   back:"<strong>1) Legal markup war</strong> — they insist on their MSA; your legal team objects to indemnification clauses. Two weeks gone. <strong>2) Security questionnaire</strong> — InfoSec sends a 200-question SOC 2 assessment you've never completed. <strong>3) Procurement's 3-bid rule</strong> — they need 2 more competitive bids to satisfy policy, retroactively. <strong>4) CFO budget freeze</strong> — discretionary spend locked mid-quarter. Map every post-verbal step at the start of the deal, not after the handshake.",
   analogy:"Bread: You've done the mix and the proof. But you haven't baked it yet. The Paper Process is the bake — where everything soft and unformed gets tested under real heat. Check the oven before you celebrate."},
  {id:9,cat:'Sales',
   front:"You're on a call with a 150-person SaaS company. When is BANT actually the correct framework over MEDDPICC, and what does mismatching cost you?",
   back:"BANT (Budget, Authority, Need, Timeline) is for transactional, shorter-cycle SMB deals under ~$30k where speed is the value. If the deal closes in 2-3 calls, MEDDPICC creates friction — you look like an enterprise vendor over-engineering a $15k decision. Cost of mismatching: MEDDPICC on SMB = you lose velocity. BANT on enterprise = you close without EB access, no mapped Paper Process, and a champion who can't get you a PO. Scale the framework to deal complexity, not to your product.",
   analogy:"You don't run your full pre-market research routine for a 50-share scalp. You don't enter a multi-month MSTR swing without it. Scale the tool to the trade size."},
  {id:10,cat:'Sales',
   front:"You've just asked a discovery question. There are 45 seconds of silence. The prospect is thinking. What do you do, and why does this matter more than most SEs realize?",
   back:"You say nothing. You hold the silence. Filling silence is the most expensive habit in enterprise sales. Rush to fill it and you either answer your own question (killing the discovery) or reframe it (changing what you were about to learn). The discipline: ask, shut up, wait. A prospect who is thinking is engaging with their own pain. Let them arrive at the answer — they trust it more because it came from them. The silence after an Implication Question is where urgency gets built.",
   analogy:"Kempo: After you probe, you wait. You don't throw the follow-up technique until you've read the response to the probe. Silence is not a gap to fill — it is information arriving."},
  {id:11,cat:'Sales',
   front:"Translate the risk of running Mammoth Capital on your local Ryzen 7950X3D into a business value statement you'd use to sell cloud migration to a technical founder.",
   back:"<em>\"Right now, Mammoth Capital is a single-threaded risk. If that Ryzen box hits a hardware fault or loses power during a MSTR catalyst event, your strategies are offline when they need to be live. That is not an infrastructure problem — it is an unhedged core business position. AWS Multi-AZ deploys your application across physically separate data centers with automatic failover typically under 60 seconds. The question is not what cloud costs per month. The question is: what does one missed execution window during a 15% BTC move cost you?\"</em>",
   analogy:"This IS the Mammoth Capital analogy. You lived this exact risk. A founder will trust a peer who has felt the pain over a vendor who describes it."},
  {id:12,cat:'Sales',
   front:"CFO: 'We love the solution but budget is frozen until Q2.' You have 3 moves. Rank them weakest to strongest.",
   back:"<strong>Weakest:</strong> 'No problem, I'll follow up in Q2.' You deprioritized yourself and handed control to whatever competitor calls them in March. <strong>Bad:</strong> Offer a discount to pull budget forward. You've established that your price is negotiable under mild pressure — anchoring every future renewal. <strong>Strongest:</strong> Quantify the cost of delay. <em>\"What does this problem cost your business per month while you wait? If it's $60k/month, a 3-month wait costs more than the solution. Is there an OpEx mechanism, a pilot structure, or a single BU that falls within current authorization limits?\"</em>",
   analogy:"Don't cut your winner because the quarter is almost over. Recalculate the carry cost of waiting versus the expected value of holding. The budget freeze is a constraint to route around, not a verdict."},
  {id:13,cat:'Cloud',
   front:"Your Proxmox server costs the same at 5% CPU as at 95%. Translate EC2's elasticity model into a CFO-level financial argument against an on-prem defender.",
   back:"On-prem is CapEx: you buy for peak capacity and pay that cost 24/7. EC2 with Auto Scaling is variable OpEx: you pay for actual consumption. The CFO argument: <em>\"You are currently paying for your peak demand capacity at 2am on a Tuesday. EC2 eliminates that structural waste. For variable workloads, AWS customers typically see 40-60% infrastructure TCO reduction when you factor in hardware refresh cycles, data center overhead, and the engineering time maintaining physical hardware. That last line is the one CFOs never model.\"</em> Never lead with compute specs. Lead with the depreciation schedule they've been ignoring.",
   analogy:"You don't hold max position size at 2am in a low-volatility session. On-prem is max margin allocation 24/7 regardless of market conditions. EC2 is dynamic sizing — proportional to actual demand."},
  {id:14,cat:'Cloud',
   front:"A client asks whether batch analytics jobs should run on Lambda or EC2. Walk through the 3 decision criteria and the cost of choosing wrong.",
   back:"<strong>1) Duration:</strong> Lambda max is 15 minutes. Jobs longer than that need EC2, Fargate, or AWS Batch. <strong>2) Frequency:</strong> Jobs running every few seconds favor EC2 — Lambda cold-start overhead accumulates. Sparse jobs favor Lambda — zero idle cost. <strong>3) Concurrency burst:</strong> Lambda scales to thousands of concurrent executions in seconds, no pre-provisioning. EC2 needs ASG warm-up time. <strong>Wrong-choice costs:</strong> Lambda for a 2-hour batch = job silently times out at 15 min, partial results, data corruption. EC2 for sparse 30-second jobs = 24/7 billing for compute used 2% of the time.",
   analogy:"Mammoth Capital: Lambda for Pine Script alert webhooks (event-driven, sub-second execution, zero idle cost). EC2 for your persistent strategy engine maintaining state continuously. Same codebase, different execution profiles, different billing models."},
  {id:15,cat:'Cloud',
   front:"A CTO says 'We back up our database to a NAS in the same building as the primary server.' Name the architecture failure in one sentence, then build the S3 CRR business case.",
   back:"<strong>Failure:</strong> Correlated failure risk — one event (fire, flood, power failure) eliminates both primary and backup simultaneously. <strong>S3 CRR case:</strong> <em>\"S3 provides 11 nines of durability — 99.999999999% — by automatically replicating across 3+ Availability Zones. Cross-Region Replication then copies to a geographically separate AWS region asynchronously. For 1TB, that's ~$23/month. A single regulatory violation for unrecoverable financial records costs $50k to $5M depending on the industry. The cost of insurance is not comparable to the cost of the claim.\"</em>",
   analogy:"Your Proxmox box and the NAS in the same rack. If the rack goes, both go. The NAS is not a backup — it's a second copy in the same blast radius."},
  {id:16,cat:'Cloud',
   front:"A prospect says 'RDS Multi-AZ costs twice as much. Can't we start single-AZ?' What's the correct response, and what metric do you establish first?",
   back:"Don't argue cost — argue risk quantification. <em>\"Single-AZ RDS has no automatic failover. If the underlying host fails, recovery takes 3-7 minutes minimum. What is your revenue per minute during peak traffic?\"</em> If they say $8k/minute, Multi-AZ pays for itself after one incident. If this is a non-production database, single-AZ is defensible — document that in writing. Multi-AZ standby is a synchronous replica that promotes automatically on failure, typically sub-60 seconds. Your job is to get them to price the claim before they decide not to buy the insurance.",
   analogy:"RPO and RTO are your trading risk parameters. Max drawdown before you halt (RPO = max acceptable data loss). Time to restart after a halt (RTO = recovery time). Define these before the incident, not during it."},
  {id:17,cat:'Cloud',
   front:"A DevOps lead says 'We want full control' when evaluating ECS Fargate vs. self-managed containers on EC2. What's the hidden cost, and how do you quantify it?",
   back:"'Full control' on EC2 means full ownership of: OS patching, ECS agent updates, instance right-sizing, cluster capacity planning, host-level networking debug, and security hardening. Fargate abstracts all of that. To quantify: the DevOps lead's fully-loaded cost is ~$150-200/hr. Ask: <em>\"How many engineering hours per month go to cluster maintenance versus shipping product features?\"</em> If that's 20 hours, that's $3-4k/month in labor. Fargate runs 20-30% higher per compute unit but eliminates 60-80% of that overhead for teams under 20 engineers.",
   analogy:"Your Docker Compose on Proxmox gives full control and zero automation — fine for a homelab where your time is free. In production where your time costs $150+/hr and downtime has an SLA, 'full control' is a liability statement dressed as a preference."},
  {id:18,cat:'Cloud',
   front:"A client wants their public web app and internal financial processing in the same flat AWS network. Name the risk and design the corrective VPC architecture.",
   back:"The risk: lateral movement. A breach of the public web tier gives an attacker network-level access to financial processing systems with no additional barriers. <strong>Corrective 3-subnet VPC:</strong> <strong>Public Subnet</strong> (internet-facing; ALB only, no application logic). <strong>Private App Subnet</strong> (EC2/ECS; outbound via NAT Gateway only; traffic in only from the ALB). <strong>Private Data Subnet</strong> (RDS; no internet route; accessible only from App Subnet via Security Group rules). Each layer communicates only with the adjacent layer. Compromise blast radius is bounded.",
   analogy:"Your homelab VLANs. You wouldn't put your trading infrastructure on the same VLAN as your kids' game consoles. Flat networks in enterprise environments are exactly that — convenient until they aren't."},
  {id:19,cat:'Cloud',
   front:"Explain what an Application Load Balancer does using a trading order-routing analogy, then define when you'd recommend ALB vs. NLB to a technical buyer.",
   back:"ALB = a smart order router for HTTP/S traffic. It reads the content of each incoming request — path, headers, host — and routes to the appropriate backend target group, distributing across all healthy instances. NLB operates at Layer 4 (TCP/UDP): protocol-agnostic, handles millions of requests/second, microsecond latency, preserves source IP. <strong>Recommend ALB for:</strong> web apps, REST APIs, microservices, WebSocket. <strong>Recommend NLB for:</strong> real-time execution systems, IoT, financial data feeds, anything requiring sub-millisecond latency or non-HTTP protocols. For Mammoth Capital: NLB for the order execution websocket; ALB for the web dashboard.",
   analogy:"ALB = smart order router that reads the order type and routes accordingly. NLB = a pure high-speed execution venue that doesn't inspect the order — it just moves bits as fast as possible. Match the routing layer to the latency requirement."},
  {id:20,cat:'Cloud',
   front:"Explain Auto Scaling Group target tracking policy to a CTO using position-sizing logic from volatility trading.",
   back:"An ASG with target tracking is a volatility-adjusted position sizing model for compute. You define a target — say, 70% average CPU. When a MSTR catalyst event floods your dashboard with users, CPU climbs past 70% and the ASG launches new EC2 instances to bring utilization back to target. When volume subsides, instances terminate. Parameters: <strong>MinSize</strong> = base position, always hold this. <strong>MaxSize</strong> = risk limit, never exceed this. <strong>Desired</strong> = current position, dynamically adjusted. The scaling policy is your dynamic sizing algorithm. You are not statically sized for peak — you are sized for the current environment.",
   analogy:"You don't hold maximum MSTR size at 2am Sunday. You size to current volatility. The ASG does the same with compute — dynamically right-sizing to actual demand, not theoretical peak."},
  {id:21,cat:'Cloud',
   front:"Your Mammoth Capital Python bot authenticates to its DB using a root credential. Translate this into an IAM design failure and describe the correct AWS pattern.",
   back:"Root credential = the bot has permissions to execute trades, rebalance the portfolio, withdraw funds, close the account, and delete all records — when all it needs is read/write on the price data table. The IAM failure is over-provisioned scope. Correct pattern: an IAM Role with a minimum-scope policy. For a Lambda reading/writing DynamoDB: exactly <code>dynamodb:GetItem</code> and <code>dynamodb:PutItem</code> on the specific table ARN. Nothing else. The blast radius of a compromised credential is bounded by the permissions attached to it. Least Privilege is not a compliance checkbox — it is a risk containment architecture.",
   analogy:"Your Pine Script strategy has a defined entry condition, stop loss, and take profit. It doesn't also manage your entire portfolio or send withdrawals. Scope the bot's authority to exactly the task it performs."},
  {id:22,cat:'Cloud',
   front:"You run your Proxmox homelab without monitoring until something breaks. Translate that approach into an enterprise production argument for CloudWatch with structured alerting.",
   back:"Reactive monitoring in production is a post-mortem waiting to happen. CloudWatch provides: <strong>Metrics</strong> — CPU, latency, error rate on every AWS service. <strong>Logs</strong> — structured, searchable, queryable with Insights. <strong>Alarms</strong> — threshold triggers that page on-call engineers, trigger Auto Scaling actions, or invoke Lambda remediation runbooks automatically. The enterprise argument: <em>\"Without structured observability, your team finds out about customer-impacting failures when your customers tell you. MTTR is measured in hours. With CloudWatch alarms and automated runbooks, MTTR drops to minutes. In a SaaS business with enterprise SLA penalties, that delta is the difference between a minor incident and a contract conversation.\"</em>",
   analogy:"You would not day-trade MSTR without a price alert on your stop level. You're not watching the tape 24/7. CloudWatch is the alert system for your infrastructure positions. Without it, you find out you got stopped out when the statement arrives."},
  {id:23,cat:'Cloud',
   front:"A client's board requires 'minimal downtime and no data loss' in their DR policy. Why is this a legal liability, and what 2 precise numbers do you extract?",
   back:"'Minimal' and 'no' are not SLA-measurable terms. They invite interpretation disputes during incidents. You need two board-approved numbers: <strong>RPO (Recovery Point Objective)</strong> — maximum data loss acceptable in time. RPO = 15 minutes means you can lose up to 15 minutes of transactions. Drives backup frequency and replication lag tolerance. <strong>RTO (Recovery Time Objective)</strong> — maximum acceptable downtime. RTO = 2 hours means the system must be operational within 2 hours of declaring a disaster. These two numbers directly determine your architecture and cost. Get the board to sign off on numbers. Then design accordingly.",
   analogy:"RPO = max drawdown before you halt trading and assess. RTO = time to restart after a halt. Define these before the event. Defined during a crisis, they are always more expensive."},
  {id:24,cat:'Cloud',
   front:"A client says 'We need to be multi-region for high availability.' What's the first question you ask, and what is the correct recommendation for 90% of companies saying this?",
   back:"First question: <em>\"What is your RTO — how many minutes of downtime is acceptable if your primary region has a complete outage?\"</em> For most organizations, Multi-AZ is the correct answer. Multi-AZ protects against a single datacenter failure with automatic failover under 60 seconds — covers 99%+ of real-world failure scenarios, substantially cheaper. Multi-Region protects against a full AWS regional outage — historically rare, affecting all AZs simultaneously. Multi-Region adds: active-active or active-passive setup, Route 53 global load balancing, cross-region replication with consistency trade-offs, and 2x operational complexity. Recommend Multi-AZ with a documented DR runbook for most clients.",
   analogy:"Multi-AZ = two brokers with the same strategy. One platform down, you execute on the other. Multi-Region = two brokers in entirely different regulatory jurisdictions with real-time position sync. More complex, more expensive, for a risk that rarely materializes."},
  {id:25,cat:'Demo',
   front:"You have 4 unscheduled minutes with a CFO who walked into a CTO meeting. Name the 3-part pitch structure and the one thing you absolutely cannot lead with.",
   back:"Structure: <strong>1) Problem</strong> — specific, quantified pain relevant to their role. <strong>2) Quantified Impact</strong> — what it costs per month/quarter unresolved. <strong>3) Specific Solution Fit</strong> — one sentence on the mechanism, one on a comparable outcome. You cannot lead with the product. A CFO who arrived unintentionally doesn't care about your architecture. <em>\"We're working with [Company] on a challenge I suspect you're familiar with — [pain]. Companies in your space lose [metric] per [period] due to this. We help resolve that. Customers typically see [outcome] within [timeframe].\"</em> Then stop. The CFO's response tells you if this is a real conversation.",
   analogy:"Kempo: Don't open with your strongest technique against an opponent who doesn't know they\'re sparring. Start with a controlled probe that reveals whether they\'re engaged. The CFO's response is your stance read."},
  {id:26,cat:'Demo',
   front:"You're demoing to a panel: CTO (ex-Google SRE), VP Engineering, and CFO. How does your language change per audience, and what is the critical SE mistake in this scenario?",
   back:"<strong>CTO (ex-SRE):</strong> Speak in specifics — exact AWS services, scaling policy parameters, observability stack, failover architecture. Invite scrutiny. Have defensible answers for every design decision. <strong>VP Engineering:</strong> Developer experience, CI/CD integration, operational overhead per engineer, incident runbook simplicity. <strong>CFO:</strong> Revenue protected, cost eliminated, payback period. Do not say a single AWS service name. The critical mistake: pitching to the median of the room and losing all three. CTO thinks you're superficial. VP thinks you're vague. CFO tunes out when you say 'containerized microservices.'",
   analogy:"Mise en place: You prep three different plates for three different diners. Same ingredients, different presentation and emphasis per audience. The SE who serves the same plate to all three gets one star."},
  {id:27,cat:'Demo',
   front:"You're running a live demo for a prospect CTO and your local Docker environment crashes. What does this reveal, and what is the pre-demo checklist?",
   back:"It reveals your demo was not environment-hardened. A demo environment must be: <strong>1) Repeatable</strong> — scripted setup (Docker Compose with seed script or Terraform plan) that produces identical results every time. <strong>2) Isolated</strong> — never on your dev machine. A hot push mid-demo must be impossible. <strong>3) Rollback-ready</strong> — resets all demo data to known state in under 5 minutes. <strong>4) Cloud-hosted</strong> — even a t3.micro. Not local hardware that dies when your laptop closes. <strong>5) Crash-rehearsed</strong> — you have practiced the recovery. A crash is recoverable if your recovery is faster and smoother than the crash was jarring.",
   analogy:"You wouldn't test a new strategy on your live trading account during a volatile session. You wouldn't demo on your live dev environment during a client call. Same discipline."},
  {id:28,cat:'Demo',
   front:"You have a meeting with the CISO of a 2,000-person logistics company in 48 hours. Describe the exact AI-assisted research process to walk in with more context than their own team.",
   back:"<strong>Step 1 (15 min):</strong> Pull their 10-K or last 2 earnings calls from SEC EDGAR. Prompt to Claude/GPT: <em>\"Identify the top 3 operational risks and technology investments mentioned. Highlight any language around security, cloud, or infrastructure.\"</em> <strong>Step 2 (10 min):</strong> CISO's LinkedIn posts + conference talks, last 12 months. Prompt: <em>\"What themes does this person publicly advocate? What problems do they identify as priorities?\"</em> <strong>Step 3 (5 min):</strong> Search [Company] + 'breach OR outage OR ransomware' last 24 months. <strong>Step 4 (15 min):</strong> Build 1-page briefing: company context, CISO's stated priorities, 3 tailored discovery questions. Total AI time: 45 min. Manual: 4 hours. You walk in with a point of view on their business. That asymmetry is your edge in the first 10 minutes.",
   analogy:"Pre-market prep: You don't enter a MSTR trade without reviewing BTC chart, macro calendar, and overnight flow. The discovery call is the trade. This research is your pre-market routine. Entering blind is amateur hour."},
  {id:29,cat:'Demo',
   front:"Build the skeleton of a competitive battle card for a deal where the client mentions they\'re also evaluating CrowdStrike.",
   back:"<strong>Their Strength</strong> (acknowledge it): CrowdStrike Falcon has best-in-class threat intelligence and is the market leader in EDR with the deepest kernel-level telemetry. <strong>Their Weakness</strong> (specific): CrowdStrike is endpoint-first. Clients needing unified SIEM + SOAR + XDR in a single data lake face significant integration overhead and multi-vendor licensing cost. <strong>Your Strength:</strong> Native XDR correlating endpoint, identity, network, and cloud telemetry in one data lake — no integration tax. <strong>Trap Question</strong> (ask in discovery, not battle): <em>\"How many security tools is your team managing, and what percent of analyst time goes to triage versus active threat hunting?\"</em> 5+ tools and 50%+ triage time = your wedge.",
   analogy:"Know your competitor's strategy before entering the same trade. Where are they long? Where are their stops? The battle card is your competitive tape read — understanding how your opponent is positioned so you can find the uncovered angle."},
  {id:30,cat:'Demo',
   front:"You're 10 minutes into a demo. The CTO interrupts: 'Your competitor does the same thing for 30% less.' You have 60 seconds. What do you say and what do you not do?",
   back:"Don't defend your price. Don't attack the competitor. Reanchor to value: <em>\"That's worth exploring — I want to make sure we're comparing equivalent outcomes. Before we go there: you told me earlier that [specific pain] was costing you [their number] per [period]. If we can reliably solve that, what's the right investment level for that result?\"</em> Let them restate the value case. Then: <em>\"Our job is to determine whether the outcomes are actually equivalent — in my experience with [competitor], they typically diverge on [specific dimension]. Let me show you where.\"</em> Price objections in technical deals are almost always value articulation failures from earlier in discovery.",
   analogy:"When MSTR pulls back 8% intraday on no news, you don't panic-sell. You return to your thesis. Is the thesis still intact? If yes, the pullback is noise. The price objection is a pullback in the deal. Return to your fundamental case before reacting to the price action."}
   ,
  /* ── FOUNDATION REFRESH ── */
  {id:59,cat:'Foundation',
   front:"You know containers run on Docker. An enterprise client asks why Kubernetes is needed when Docker Compose already works. What's the real answer?",
   back:"Docker Compose is a single-host orchestrator. It tells Docker how to run your containers on <em>one machine</em>. The moment that machine goes down, everything is down — no self-healing, no rescheduling. Kubernetes is a cluster orchestrator: it manages containers across <em>multiple nodes</em>, automatically reschedules failed pods to healthy nodes, scales replicas up/down based on CPU/memory, rolls out updates with zero downtime, and manages load balancing across the cluster. At Mammoth Capital scale: Docker Compose for your homelab development environment. Kubernetes (or ECS Fargate) for production workloads that cannot tolerate single-host failure.",
   analogy:"Docker Compose = one chef running a kitchen. Kubernetes = a restaurant group manager who knows all the kitchens, reroutes orders if one kitchen goes offline, and opens more kitchens during peak hours automatically."},
  {id:60,cat:'Foundation',
   front:"A developer says 'REST API' and a CTO says 'GraphQL.' You need to explain the difference in a way that maps to an architectural cost decision. Go.",
   back:"REST (Representational State Transfer) = a set of conventions for HTTP APIs. Each resource has a URL. HTTP methods define the action: GET (read), POST (create), PUT/PATCH (update), DELETE (remove). Response returns fixed data shape — the server decides what you get. GraphQL = a query language for APIs. The client specifies exactly which fields it needs. One endpoint (/graphql), any data shape. REST advantage: simple, widely understood, excellent caching via HTTP. REST disadvantage: over-fetching (you get 50 fields, need 3) or under-fetching (multiple round-trips). GraphQL advantage: precise data fetching, single round-trip for complex nested data. GraphQL disadvantage: complex caching, higher server-side compute, learning curve. For Mammoth Capital's trading dashboard: REST for simple CRUD operations (orders, positions). GraphQL if the dashboard needs complex nested queries (position + trade history + market data in one request).",
   analogy:"REST = ordering from a fixed menu. You get the full plate. GraphQL = ordering à la carte. You specify exactly what goes on the plate and pay only for what you ordered."},
  {id:61,cat:'Foundation',
   front:"HTTP status codes come up in every API-driven architecture conversation. Categorize the 5 classes and name the 4 codes every SE must know cold.",
   back:"<strong>1xx (Informational):</strong> Request received, processing. Rarely seen in prod. <strong>2xx (Success):</strong> 200 OK, 201 Created, 204 No Content. <strong>3xx (Redirect):</strong> 301 Moved Permanently, 302 Temporary Redirect. <strong>4xx (Client Error):</strong> Client sent a bad request. <strong>5xx (Server Error):</strong> Server failed. <strong>4 codes every SE must know:</strong> <strong>200 OK</strong> — success, server returned what was requested. <strong>401 Unauthorized</strong> — no valid authentication credential provided (check your API key). <strong>403 Forbidden</strong> — authenticated but not authorized (IAM permissions issue in AWS context). <strong>500 Internal Server Error</strong> — the server crashed; look in CloudWatch Logs. In a sales context: when a prospect says 'the API is returning errors,' your first question is 'what status code?' 4xx = their problem (bad request, wrong credentials). 5xx = your product's problem.",
   analogy:"HTTP status codes are your trade confirmation codes. 200 = filled. 401 = you're not logged into the platform. 403 = you're logged in but don't have margin approval for this trade type. 500 = the broker's system crashed. Same logic, different domain."},
  {id:62,cat:'Foundation',
   front:"You know how VLANs segment your homelab network. Explain DNS resolution from browser to server in 6 steps — then explain why this matters for Route 53 in an enterprise architecture conversation.",
   back:"<strong>1.</strong> You type mammothcapital.com in Chrome. <strong>2.</strong> Browser checks local cache and OS hosts file. <strong>3.</strong> OS asks the configured Recursive Resolver (usually your ISP or 8.8.8.8). <strong>4.</strong> Recursive Resolver asks the Root Nameserver (13 root servers globally) — 'who handles .com?' <strong>5.</strong> Root returns TLD Nameserver for .com. Resolver asks .com TLD: 'who handles mammothcapital.com?' <strong>6.</strong> TLD returns the Authoritative Nameserver — Route 53 in AWS's case. Route 53 returns the A record (IP address). Browser connects. Why it matters: Route 53 is your Authoritative Nameserver for any domain pointing to AWS. When you configure Failover routing, Route 53 returns the secondary IP if the health check fails — changing the answer the world gets within seconds. DNS TTL controls how long clients cache the answer — lower TTL = faster failover, higher TTL = better performance.",
   analogy:"DNS is the internet's phone book lookup. Your homelab DNS server is the local receptionist. Route 53 is the global carrier-grade receptionist who answers for your company's number and reroutes calls to backup when the main office is down."},
  {id:63,cat:'Foundation',
   front:"Infrastructure as Code: a client's team deploys everything by clicking in the AWS Console. Name 3 specific business risks this creates and explain what Terraform solves.",
   back:"<strong>Risk 1 — Configuration drift:</strong> Two 'identical' environments (staging vs. prod) differ because one engineer added a security group rule manually 6 months ago. Nobody documented it. Prod incident. <strong>Risk 2 — No audit trail:</strong> Who added that S3 bucket with public access? The Console doesn't log intent — only that an IAM user made an API call. Terraform code commits show who changed what and why, with a PR review. <strong>Risk 3 — No repeatability:</strong> Recreating the environment (DR test, new region, new client) requires a team of engineers recreating clicks from memory. Terraform: infrastructure defined as code (HCL). <code>terraform plan</code> shows exactly what will change before you apply. <code>terraform apply</code> provisions idempotently — running it twice produces the same result. <code>terraform destroy</code> tears it all down cleanly. Enterprise impact: a new client environment is 'git clone + terraform apply' — hours, not weeks.",
   analogy:"Deploying by clicking in the Console is like configuring your Proxmox hypervisor via the web UI and having no backup if the drive fails. Terraform is the equivalent of scripting everything in Ansible — the configuration IS the documentation, and you can rebuild from scratch in minutes."},
  {id:64,cat:'Foundation',
   front:"CAP Theorem comes up every time you're designing a distributed database. Explain it in 2 sentences and tell a CTO what it means for their database choice.",
   back:"CAP Theorem: a distributed system can only guarantee 2 of 3 properties simultaneously — <strong>Consistency</strong> (every read returns the most recent write), <strong>Availability</strong> (every request receives a response, even if not the latest data), and <strong>Partition Tolerance</strong> (the system continues operating even if nodes can't communicate). In practice, network partitions are unavoidable — so you're always choosing between CP or AP. <strong>CP systems (e.g., RDS Multi-AZ):</strong> During a partition, they refuse to serve stale reads — you get an error rather than wrong data. Critical for financial transactions. <strong>AP systems (e.g., DynamoDB with eventual consistency):</strong> During a partition, they serve reads that may be slightly stale — but the system stays up. Acceptable for shopping carts, analytics, leaderboards. The CTO question: 'If two of your data centers can't talk to each other for 30 seconds, do you want your system to stop taking new orders (CP) or take orders that might be slightly inconsistent (AP)?'",
   analogy:"MSTR trading: CP = your order system refuses to execute if it can't confirm your current position (correct, no oversized trades). AP = your system executes even if the position data is 30 seconds stale (available, but you might double-size accidentally). The right choice depends on what failure mode is more expensive."},
  {id:65,cat:'Foundation',
   front:"SQL vs. NoSQL: beyond just 'RDS vs. DynamoDB,' give the 4 decision criteria that determine which database type a real enterprise should use.",
   back:"<strong>1) Data structure:</strong> If your data has a fixed, known schema (customer: first_name, last_name, email, account_balance) — SQL. If schema varies per record, changes frequently, or is deeply nested JSON — NoSQL. <strong>2) Query patterns:</strong> If you need complex multi-table JOINs, aggregations, and ad-hoc reporting — SQL. If you always query by a known key (userId, orderId) and JOIN is never needed — NoSQL wins on speed. <strong>3) Scale pattern:</strong> SQL scales vertically (bigger machine) or with Read Replicas. NoSQL (DynamoDB, MongoDB) scales horizontally across partitions — handles virtually unlimited throughput at consistent latency. <strong>4) Consistency requirement:</strong> Financial transactions requiring ACID guarantees (Atomic, Consistent, Isolated, Durable) — SQL. High-speed write workloads where eventual consistency is acceptable (clickstream, IoT telemetry, gaming leaderboards) — NoSQL. For Mammoth Capital: PostgreSQL/RDS for trade ledger (ACID required). DynamoDB for real-time market alert log (high write throughput, simple key-based access).",
   analogy:"SQL = a perfectly organized filing system with cross-references — powerful for complex lookups, slower to scale. NoSQL = a warehouse optimized for pallet-in/pallet-out by part number — extremely fast for the one use case it's built for, useless for complex queries."},
  {id:66,cat:'Foundation',
   front:"Microservices vs. Monolith: an engineering VP says 'We need to break apart our monolith.' What 3 questions tell you whether they actually should?",
   back:"Breaking up a monolith has real costs — distributed systems complexity, network latency between services, independent deployment pipelines, distributed tracing overhead. The 3 questions: <strong>1) Where is the actual bottleneck?</strong> If the whole app is slow because the reporting module is CPU-intensive, extract JUST that module. Don't boil the ocean. <strong>2) Do different components need to scale independently?</strong> If the payment processor gets 100x load on Black Friday but the admin dashboard gets 0 load, separation makes sense. If everything scales together, a monolith with horizontal scaling may be simpler. <strong>3) Do you have the team maturity to own distributed services?</strong> Microservices require: separate CI/CD pipelines, distributed tracing, inter-service authentication, API versioning contracts. Most teams under 50 engineers ship faster with a well-structured monolith. The honest answer: most startups that microservice too early spend a year debugging network failures that would never exist in a monolith.",
   analogy:"Your Proxmox homelab: you run everything on one hypervisor because the operational overhead of managing 6 separate physical servers isn't worth it at your scale. Microservices are those 6 servers. The complexity is worth it exactly when the single server's limits actually constrain you — not before."},
  {id:67,cat:'Foundation',
   front:"A CFO asks what SaaS metrics to watch to evaluate a cloud software vendor's health. Name the 6 standard SaaS metrics and the 2 that actually predict if a company is worth buying from long-term.",
   back:"The 6 standard SaaS metrics: <strong>ARR (Annual Recurring Revenue)</strong> — total annualized subscription revenue. <strong>MRR (Monthly Recurring Revenue)</strong> — ARR/12, used for monthly tracking. <strong>Churn Rate</strong> — % of customers or revenue lost per period. <strong>NRR/NDR (Net Revenue Retention)</strong> — revenue from existing customers including expansion and churn. <strong>CAC (Customer Acquisition Cost)</strong> — total sales+marketing spend / new customers. <strong>LTV (Lifetime Value)</strong> — average revenue per customer × average customer lifetime. The 2 that predict long-term viability: <strong>NRR > 100%</strong> means existing customers expand faster than they churn — the company grows even without new logos. Best-in-class SaaS: 120-130% NRR. <strong>CAC Payback Period < 18 months</strong> — how long until a new customer covers their acquisition cost. Over 24 months = the company needs large capital to grow. In your SE context: when a prospect mentions they're evaluating vendors, ask about NRR. A vendor with 85% NRR is losing customers — buying their product is a risk.",
   analogy:"ARR is your book value. NRR is your return on existing positions. 110% NRR means your portfolio grows 10% per year just from existing positions — before you add new ones. That's the compound growth metric. CAC payback is your capital efficiency — how long does each new position take to pay for itself?"},
  {id:68,cat:'Foundation',
   front:"TCP vs. UDP: why does an SE need to know the difference when recommending AWS load balancers and real-time application architectures?",
   back:"<strong>TCP (Transmission Control Protocol):</strong> Connection-oriented. Three-way handshake before data flows. Guaranteed delivery — packets are acknowledged, retransmitted if lost. Ordered delivery. Higher overhead. Used for: HTTPS, SSH, database connections, email — anything where data integrity is non-negotiable. <strong>UDP (User Datagram Protocol):</strong> Connectionless. Fire-and-forget. No guaranteed delivery, no ordering. Lower latency, lower overhead. Used for: DNS lookups, video streaming, online gaming, VoIP, real-time trading feeds — anywhere where speed matters more than perfect reliability. <strong>SE relevance for AWS:</strong> ALB (Application Load Balancer) = HTTP/HTTPS only (TCP layer 7). NLB (Network Load Balancer) = TCP, UDP, TLS. If a client says 'our trading platform sends UDP market data feeds,' you immediately know they need NLB, not ALB. The wrong recommendation means dropped market data packets on a live trading system.",
   analogy:"TCP = certified mail with return receipt. You know every piece arrived. UDP = dropping flyers from a plane — fast, cheap, some land in the trash, nobody tells you which ones. A trading order confirmation needs TCP. A real-time price tick feed that updates 1000x/second can afford to lose a few ticks with UDP."},
  {id:69,cat:'Foundation',
   front:"CI/CD pipelines come up in every DevOps and cloud modernization deal. Explain the full pipeline in 5 stages and name the AWS-native tool for each stage.",
   back:"A CI/CD pipeline automates the path from developer commit to production deployment. <strong>Stage 1 — Source:</strong> Code committed to a Git repository triggers the pipeline. AWS: CodeCommit (or GitHub/GitLab). <strong>Stage 2 — Build (CI):</strong> Code is compiled, dependencies installed, unit tests run. A failed test stops the pipeline here. AWS: CodeBuild. <strong>Stage 3 — Test:</strong> Integration tests, security scans, code quality checks. AWS: CodeBuild + third-party scanners (Snyk, Checkmarx). <strong>Stage 4 — Deploy to Staging:</strong> Artifact deployed to a staging environment identical to production. Automated smoke tests run. AWS: CodeDeploy or ECS rolling update. <strong>Stage 5 — Deploy to Production:</strong> Manual approval gate (optional) then production rollout — Blue/Green or Canary deployment. AWS: CodeDeploy with traffic shifting via ALB weighted target groups. The business case: without CI/CD, deployments happen weekly with a 4-hour maintenance window and a 3-person war room. With CI/CD, deployments happen 20x/day with automatic rollback if error rates spike.",
   analogy:"CI/CD is your mise en place pipeline for the restaurant. Prep → quality check → taste test → expediter approval → serve to table. Every order (commit) goes through the same stations. One bad prep doesn't poison the whole kitchen — it gets caught at quality check and sent back."},
  {id:70,cat:'Foundation',
   front:"The AWS Shared Responsibility Model is the first slide in every AWS security conversation. Explain it precisely and name the 2 common customer mistakes it causes.",
   back:"AWS manages security <strong>OF</strong> the cloud: physical data center security, hardware, hypervisor, managed service software (RDS OS patching, Lambda runtime). You manage security <strong>IN</strong> the cloud: your data, your application code, IAM policies, Security Group rules, encryption configuration, OS patching on EC2 instances. <strong>Mistake 1 — Assuming RDS is fully managed means fully secured:</strong> AWS patches the database engine. YOU are responsible for: who has IAM access to the RDS instance, network access (Security Group rules), encryption at rest (KMS), encryption in transit (SSL/TLS connection requirement). <strong>Mistake 2 — Assuming EC2 is patched by AWS:</strong> For EC2, you own the OS. AWS gives you a base AMI; from that point, patching, antivirus, and host-level security are your responsibility. In a sales conversation: when a CISO says 'We're moving to AWS so security is AWS's problem,' this is your opening. Walk them through the model and position your security tooling as the 'in-the-cloud' layer that AWS doesn't provide.",
   analogy:"AWS built and secures the apartment building: locks on the front door, security cameras in the lobby, maintenance of the HVAC system. You secure your apartment: your deadbolt, your valuables in a safe, your guest list. AWS being breached is like the building being broken into. Your S3 bucket being misconfigured is like leaving your apartment door open. Different problem, different owner."},
  {id:71,cat:'Foundation',
   front:"Identity federation: an enterprise says 'Our employees already log in with Okta/Azure AD. We don't want separate AWS logins.' Name the architecture and the exact protocols involved.",
   back:"This is Identity Federation — the employee's existing corporate identity (in Okta, Azure AD, or any SAML 2.0/OIDC provider) is trusted by AWS to grant access. Protocols: <strong>SAML 2.0 (Security Assertion Markup Language):</strong> Enterprise standard. The IdP (Okta, ADFS) sends a signed XML assertion to AWS that says 'this user is authenticated and belongs to these groups.' AWS maps the groups to IAM Roles. Used for: AWS Console access via SSO. <strong>OIDC (OpenID Connect):</strong> Modern, token-based (JWT). Used for: application-level authentication (Cognito), GitHub Actions assuming AWS roles. The architecture: Employee logs into Okta → Okta authenticates via corporate AD → Okta issues SAML assertion → AWS STS validates assertion and issues temporary credentials → Employee accesses AWS Console with permissions defined by their IAM Role. Result: no separate AWS usernames/passwords, MFA managed by Okta, access revoked instantly when employee is off-boarded in AD. This is a hard requirement for any enterprise customer with more than 50 AWS users.",
   analogy:"Your CDL license is issued by the state DMV (your IdP). Different employers (AWS accounts) trust the state's credential without issuing you their own license. They just map 'CDL Class A' to 'authorized to drive this vehicle' in their system. Same identity, multiple trusting parties."},
  {id:72,cat:'Foundation',
   front:"OSI model: a senior network engineer on a prospect's team asks which OSI layer your security product operates at. How do you answer without looking confused, and what are the 3 commercially relevant layers?",
   back:"The OSI model has 7 layers. The 3 that matter in every enterprise network conversation: <strong>Layer 3 (Network):</strong> IP addresses. Routing decisions. Firewalls that filter by IP address and subnet operate here. AWS: NACLs, VPC routing tables. <strong>Layer 4 (Transport):</strong> TCP/UDP, port numbers. Stateful firewalls that track connection state operate here. AWS: Security Groups (stateful), NLB. <strong>Layer 7 (Application):</strong> HTTP, HTTPS, DNS, SMTP. Application-aware routing and filtering — inspects the content of requests. AWS: ALB (path-based routing), AWS WAF (blocks specific HTTP patterns like SQL injection strings). If your security product says 'Layer 7 inspection,' it means it reads inside the HTTP request — not just the IP/port — to detect malicious patterns. If it operates at Layer 4, it's faster but blind to application-layer attacks. The selling insight: Layer 7 controls are more expensive to run but catch attacks that Layer 4 completely misses.",
   analogy:"Layer 3 = the postal system that reads addresses. Layer 4 = the customs inspector who checks the declared package weight and sender/receiver. Layer 7 = the inspector who opens the box and reads the contents. Each level catches different problems. Each level costs more."},
{id:31, cat:'AWS', domain:'Secure',
 front:"Your Mammoth Capital Lambda bot authenticates to DynamoDB. A colleague says to put credentials in environment variables. Why is this wrong, and what is the correct AWS pattern?",
 back:"Environment variables are visible in CloudWatch logs, Lambda console, and any CI/CD system with access to the function. Rotation requires redeployment. The correct pattern: attach an IAM Role to the Lambda function with exactly the permissions it needs — no credentials stored anywhere. The Lambda runtime automatically provides temporary credentials via the instance metadata service, rotated every 15 minutes. This is Least Privilege + zero-credential-storage. There is no secure way to hardcode credentials in a cloud function. There is only the IAM Role pattern.",
 analogy:"Your Pine Script strategy on TradingView does not store your brokerage password in the script. It uses an OAuth token scoped to read/write orders only — not withdraw funds, not close the account. IAM Roles are the cloud equivalent of that scoped OAuth token."},

{id:32, cat:'AWS', domain:'Secure',
 front:"Explain the difference between a Security Group and a Network ACL to a CTO in 3 sentences. Then give the 1-sentence business implication.",
 back:"Security Groups are stateful, instance-level firewalls: allow inbound port 443 and the return traffic is automatically permitted. NACLs are stateless, subnet-level rules: you must explicitly allow both inbound AND outbound for every traffic flow. Security Groups are your last line of defense; NACLs are blast-radius containment at the subnet layer. Business implication: if an EC2 instance is compromised and its Security Group gets manipulated, the NACL limits what the attacker can reach next — defense in depth requires both layers.",
 analogy:"Security Group = the lock on your server room door (per-device, stateful). NACL = the VLAN ACL on your Proxmox switch (per-subnet, stateless). Your homelab has both — you just call them by different names."},

{id:33, cat:'AWS', domain:'Secure',
 front:"A FinTech prospect says their compliance team requires 'encryption at rest for all data stores.' Walk through the AWS implementation and the one configuration mistake that creates a false sense of compliance.",
 back:"AWS offers encryption at rest for all major services: S3 (SSE-S3, SSE-KMS, SSE-C), RDS (KMS encryption enabled at creation), DynamoDB (KMS), EBS volumes (KMS). The implementation: enable KMS encryption on every data store at creation — you cannot encrypt an existing unencrypted RDS instance without a snapshot-restore cycle. The false-compliance mistake: using AWS-managed KMS keys (aws/rds, aws/s3) instead of Customer Managed Keys (CMKs). With AWS-managed keys, AWS controls key rotation and access — your compliance team cannot audit key usage or enforce key deletion policies. CMKs give you key policy ownership, rotation control, and CloudTrail logging of every decrypt operation. SOC 2 Type II auditors will ask which type of key.",
 analogy:"AWS-managed KMS keys are like using the bank's safety deposit key — the bank also has a copy. Customer Managed Keys are your own key that you control, audit, and can revoke. For financial data, the regulator wants to see YOUR key, not the bank's."},

{id:34, cat:'AWS', domain:'Secure',
 front:"What is the difference between AWS CloudTrail and AWS Config, and why does a CISO need both?",
 back:"CloudTrail answers WHO DID WHAT and WHEN: it logs every API call made in your AWS account — who called it, from where, at what time, with what parameters. It is your audit trail. AWS Config answers WHAT IS THE CURRENT STATE and HAS IT CHANGED: it continuously records the configuration of every AWS resource and tracks when it changes. CloudTrail alone tells you 'John disabled encryption on this S3 bucket at 2pm.' AWS Config tells you 'This S3 bucket has been publicly accessible for 72 hours and violates your compliance rule.' A CISO needs both: CloudTrail for forensic investigation and attribution, AWS Config for continuous compliance posture and drift detection.",
 analogy:"CloudTrail = your trade execution log. Every order, who placed it, at what price, at what time. AWS Config = your portfolio snapshot system, showing current positions and flagging when you've drifted outside your risk parameters. You need both — one for what happened, one for what's true right now."},

{id:35, cat:'AWS', domain:'Secure',
 front:"A developer stores database passwords in AWS Systems Manager Parameter Store (Standard tier, no encryption). A security auditor flags this. What's wrong and what's the correct architecture?",
 back:"Parameter Store Standard stores values as plaintext strings by default — any IAM entity with SSM:GetParameter access can read them in cleartext. The fix path: <strong>Option 1 (better):</strong> Parameter Store SecureString — values encrypted with KMS, access requires both SSM and KMS permissions. <strong>Option 2 (best for production credentials):</strong> AWS Secrets Manager — stores secrets encrypted with KMS, provides automatic rotation (for RDS, Redshift, DocumentDB natively), charges $0.40/secret/month. Secrets Manager also provides a versioning system so you can rotate without downtime. For Mammoth Capital's production RDS credentials: Secrets Manager with automatic 30-day rotation. The Lambda function calls GetSecretValue at runtime — no credential is ever stored in the function configuration.",
 analogy:"Storing an unencrypted password in Parameter Store is like writing your brokerage password in a shared Google Doc with view-only permissions set. Secrets Manager is an encrypted vault with automatic lock change every 30 days that your systems access via API — no human ever sees the current credential."},

{id:36, cat:'AWS', domain:'Resilient',
 front:"A system architect asks: 'Should I use SQS, SNS, or EventBridge for our notification system?' Give the decision matrix.",
 back:"<strong>SQS (Simple Queue Service):</strong> One producer, one consumer type. Messages are pulled by the consumer (polling). Guaranteed delivery, message persistence, exactly-once with FIFO queues. Use for: work queues, async task processing, decoupling components where the consumer sets its own pace. <strong>SNS (Simple Notification Service):</strong> One producer, multiple subscriber types simultaneously (fanout). Push-based. Use for: broadcasting the same event to SQS, Lambda, email, HTTP endpoints at once — the fanout pattern. <strong>EventBridge:</strong> Event routing with content-based filtering. Multiple producers, multiple consumers with rule-based routing. Use for: complex event-driven architectures, SaaS integrations (Stripe webhooks, Salesforce events), when you need to route different event types to different targets. For Mammoth Capital: SNS fanout for trade alerts (notify Lambda + SQS + email simultaneously). SQS for the order processing queue. EventBridge for routing different strategy signals to different handlers.",
 analogy:"SQS = a single order queue at a restaurant. One chef processes tickets in sequence. SNS = the expediter who announces 'order up' and every station (Lambda, email, SQS) hears it simultaneously. EventBridge = a smart router that reads the order type and sends it to the right station based on content rules."},

{id:37, cat:'AWS', domain:'Resilient',
 front:"A CTO asks 'We're on RDS MySQL. When is the cost premium of Aurora actually justified?' Give the 3 decision criteria.",
 back:"Aurora costs approximately 20-30% more than equivalent RDS. The cost premium is justified when: <strong>1) Read scale beyond 1-2 replicas:</strong> Aurora supports up to 15 low-latency read replicas vs. RDS's 5, with replica lag typically under 100ms vs. seconds for RDS. <strong>2) Storage scaling without planning:</strong> Aurora auto-scales storage from 10GB to 128TB in 10GB increments — no manual intervention, no downtime. RDS requires you to provision storage upfront and resize with a maintenance window. <strong>3) Failover speed:</strong> Aurora failover to a replica is typically under 30 seconds. RDS Multi-AZ failover is 60-120 seconds. For Mammoth Capital at scale: when the trading dashboard database exceeds 5 concurrent read replicas or storage growth is unpredictable, Aurora becomes cheaper than the operational overhead of RDS management.",
 analogy:"RDS is your Proxmox VM with a fixed-size disk you manually resize. Aurora is a networked storage system that grows automatically. The premium pays for itself the first time you avoid a 2am disk-full incident."},

{id:38, cat:'AWS', domain:'Resilient',
 front:"Your Mammoth Capital dashboard hits 10x read load during a MSTR earnings event. RDS CPU is at 95%. The cheapest fix that doesn't require application changes — what is it, and what are its limits?",
 back:"An RDS Read Replica. Promotes a read-only copy of the primary database that your application reads from — no schema or application code changes beyond updating the connection string to point reads at the replica endpoint. Cost: approximately the same as running a second RDS instance. Limits you must disclose: <strong>1) Replication lag:</strong> Read replicas are asynchronous — under load, replicas can lag 1-60+ seconds behind the primary. Reads from the replica may return stale data. <strong>2) Not a failover target:</strong> A standard Read Replica does not automatically promote on primary failure — that is Multi-AZ's job. <strong>3) Read-only:</strong> All writes still go to the primary. If write load is the bottleneck, a Read Replica doesn't help. For write-heavy bottlenecks, look at connection pooling (RDS Proxy) or database sharding.",
 analogy:"The Read Replica is like a Bloomberg terminal that mirrors real-time price data from the exchange feed. You can read market prices from your terminal (replica) without hitting the exchange (primary) for every query. But your terminal may be 500ms behind — acceptable for a dashboard, not for order execution."},

{id:39, cat:'AWS', domain:'Resilient',
 front:"Name all 5 Route 53 routing policies and give the one-sentence use case for each. Then identify which one you use for Active-Active multi-region failover.",
 back:"<strong>Simple:</strong> One record, one destination. No intelligence. <strong>Weighted:</strong> Route X% to endpoint A, Y% to endpoint B — canary deployments, A/B testing, traffic shifting during migration. <strong>Latency:</strong> Route users to the AWS region with lowest latency for their location — global app performance. <strong>Failover:</strong> Route to primary endpoint; switch to secondary when health check fails — Active-Passive DR. <strong>Geolocation:</strong> Route based on user's geographic location — data residency compliance, regional content. For Active-Active multi-region: <strong>Latency routing</strong> — each region serves traffic and Route 53 directs users to the lowest-latency region. Combine with health checks so traffic shifts away from an unhealthy region automatically.",
 analogy:"Route 53 routing policies are your order routing rules. Simple = always route to IBKR. Weighted = route 80% to IBKR, 20% to TD Ameritrade. Latency = route to whichever broker has the fastest execution right now. Failover = use IBKR; if IBKR is down, switch to TD Ameritrade automatically."},

{id:40, cat:'AWS', domain:'Resilient',
 front:"A client chains 5 Lambda functions together using direct invocations. Name 3 failure modes of this pattern and explain why Step Functions solves them.",
 back:"<strong>Failure mode 1 — No retry logic:</strong> If Lambda 3 fails, Lambda 1 and 2 already ran and cannot be undone. You have partial state with no recovery mechanism. <strong>Failure mode 2 — No visibility:</strong> If the chain breaks, you have no way to know which step failed without custom logging in every function. <strong>Failure mode 3 — Timeout cascade:</strong> Lambda max timeout is 15 minutes. A 5-step chain could need 75 minutes total — impossible with direct invocation. <strong>Step Functions solution:</strong> Each step is an explicit state with defined retry policies, error handlers, and timeouts. Failed states can wait and retry. The execution history shows exactly which state failed and why, with full input/output logging. For long-running workflows, Step Functions can pause and wait for an external event (Wait for Task Token pattern) without consuming Lambda runtime.",
 analogy:"Lambda chaining is like a relay race where if runner 3 drops the baton, runners 1 and 2 have no way to know and there's no rule for what happens next. Step Functions is a race coordinator with an explicit rulebook: if runner 3 drops it, retry twice, then alert the coach, then take the alternate route."},

{id:41, cat:'AWS', domain:'Performing',
 front:"Mammoth Capital serves a trading dashboard globally. US users get fast loads; European users (including Nate in Germany) experience 180ms latency. Name the solution and explain what CloudFront actually caches.",
 back:"CloudFront is a CDN with 450+ edge locations globally. It caches cacheable content at the edge nearest to the user — eliminating the round-trip to your origin (S3, EC2, ALB). What CloudFront caches: static assets (JS, CSS, images, fonts) with high cache-hit rates. What it does NOT cache by default: dynamic API responses, authenticated requests, anything with unique query strings. For Mammoth Capital's dashboard: static React/Vue bundle served from CloudFront edge in Frankfurt (5ms to Nate) instead of us-east-1 ALB (180ms). Dynamic trade data API calls still hit the ALB but the initial page load is near-instant. Cost: dramatically reduces origin bandwidth costs — CloudFront data transfer is cheaper than EC2/ALB data transfer out. Latency reduction for European users: 60-80% on static assets.",
 analogy:"CloudFront is like having a local copy of the most-used market data cached on your trading terminal instead of pulling it from the exchange on every refresh. The stale risk is managed by cache TTL settings — same concept as how often you'd refresh a candlestick chart."},

{id:42, cat:'AWS', domain:'Performing',
 front:"Your DynamoDB table handles 100k writes/second perfectly but reads on one specific item ID are degraded. Name the architectural failure and the fix.",
 back:"This is the hot partition problem. DynamoDB distributes data across partitions based on the partition key. If one partition key value (e.g., a single popular product ID, or 'MSTR' as the ticker) receives disproportionate traffic, that partition becomes a bottleneck while all other partitions sit idle. DynamoDB throttles requests on the hot partition regardless of your provisioned capacity. <strong>Fixes:</strong> <strong>1) Write sharding:</strong> Append a random suffix (1-10) to the partition key for writes, aggregate for reads. <strong>2) DAX (DynamoDB Accelerator):</strong> In-memory cache in front of DynamoDB — repeated reads on the same key hit DAX (microsecond latency) instead of DynamoDB (millisecond). <strong>3) Redesign partition key</strong> to use a higher-cardinality attribute that distributes traffic evenly.",
 analogy:"A hot partition is like every trader in Germany routing their MSTR orders through one specific market maker. That one maker gets overwhelmed while nine others sit idle. Write sharding is like distributing order flow across multiple venues — same final position, balanced execution load."},

{id:43, cat:'AWS', domain:'Performing',
 front:"Pine Script fires 500 simultaneous webhook alerts during a market open event. Your Lambda function is throttled. Explain why SQS as a buffer solves this without increasing Lambda concurrency limits.",
 back:"Lambda concurrency throttling occurs when too many invocations hit the function simultaneously — the default regional limit is 1,000 concurrent executions (shared across all functions). Without a buffer, 500 simultaneous webhook POSTs invoke 500 Lambda instances simultaneously, risking throttling and dropped events. With SQS as a buffer: the API Gateway writes all 500 events into an SQS queue (sub-millisecond, no throttle risk). Lambda polls the SQS queue at a controlled rate — you configure batch size (e.g., 10 messages per invocation) and maximum concurrency. Lambda processes the alerts at a sustained rate rather than a spike. No events are lost — they sit in SQS for up to 14 days if Lambda is temporarily unavailable. This is the decoupling pattern: the producer (Pine Script webhook) and consumer (Lambda) are now independent.",
 analogy:"Without SQS: 500 traders simultaneously calling one broker's order desk. The desk gets overwhelmed, calls get dropped. With SQS: all 500 orders go into an electronic queue. The desk processes at its own rate. No orders lost, no chaos — just a controlled backlog."},

{id:44, cat:'AWS', domain:'Performing',
 front:"A client's application servers need to share a common file system that all EC2 instances can read and write simultaneously. EBS or EFS — and what's the performance trade-off?",
 back:"EBS (Elastic Block Store) = block storage attached to a SINGLE EC2 instance at a time (except Multi-Attach for specific use cases). High IOPS (up to 256k IOPS for io2 Block Express), low latency (sub-millisecond). EFS (Elastic File System) = NFS-based shared file system that thousands of EC2 instances can mount simultaneously across multiple AZs. For shared access: EFS is the only option. Performance trade-off: EFS baseline throughput is lower than high-performance EBS volumes, and EFS adds 1-3ms latency vs. EBS sub-millisecond. EFS cost is 3x higher per GB than EBS gp3. For Mammoth Capital: EBS for the database volume (single-instance, high IOPS, low latency). EFS for shared ML model files that multiple inference containers need to read simultaneously.",
 analogy:"EBS = an NVMe drive bolted directly into your Proxmox hypervisor. Extremely fast, one machine. EFS = a NAS that every machine on your network can mount simultaneously. The NAS adds network latency but enables shared access. Same trade-off, same architecture decision."},

{id:45, cat:'AWS', domain:'Performing',
 front:"When should you use Kinesis Data Streams instead of SQS? Give the 3 specific criteria that make Kinesis the correct choice.",
 back:"Kinesis is the correct choice when: <strong>1) Real-time analytics on streaming data:</strong> Kinesis preserves data for 24 hours to 7 days and allows multiple independent consumers to read the same stream simultaneously at different positions. SQS messages are deleted after a consumer reads them — only one consumer type per queue (or fan-out to multiple SQS queues via SNS). <strong>2) Order preservation within a shard:</strong> Kinesis guarantees ordering within a shard. SQS Standard does not guarantee ordering (FIFO does, but at lower throughput). <strong>3) High-throughput streaming:</strong> Kinesis can ingest millions of records per second. For Mammoth Capital: Kinesis for real-time market data ingestion and analysis (multiple consumers: charting, alerting, ML model). SQS for the trade execution order queue (one consumer: the execution engine, ordering required, use FIFO).",
 analogy:"SQS is a task queue — you add a to-do, someone does it, it's removed. Kinesis is a market data ticker tape — every consumer (your charting terminal, your alert engine, your ML model) reads the same stream independently, and the tape is preserved for replay."},

{id:46, cat:'AWS', domain:'Cost',
 front:"A CFO asks: 'We're paying On-Demand EC2 prices. Our DevOps team mentioned Reserved Instances and Savings Plans. What's the difference and which should we buy?'",
 back:"<strong>Reserved Instances (RIs):</strong> A commitment to a specific instance type, size, and region (or OS) for 1 or 3 years. Discount: 40-60% vs. On-Demand. Least flexible — you're locked to that exact configuration. If you upgrade instance type mid-term, you forfeit unused RI value (or must sell on the RI Marketplace). <strong>Compute Savings Plans:</strong> A commitment to a dollar amount of compute spend per hour (e.g., $5/hr) for 1 or 3 years. Applies automatically to any EC2 instance type, size, OS, or region, plus Lambda and Fargate. Discount: 40-66% vs. On-Demand. More flexible — as your workload evolves, the Savings Plan adapts. <strong>Recommendation for most companies:</strong> Start with Compute Savings Plans. Use Cost Explorer's Savings Plan recommendations — it shows exactly how much to commit based on 30-day usage. Reserve 70% of baseline stable compute. Let spiky/experimental workloads run On-Demand. Never commit 100%.",
 analogy:"Reserved Instances = buying a specific MSTR position in a fixed size, locked for 12 months at a discount. Savings Plans = a commitment to spend $X on compute per hour, applied to whatever EC2 type you're running. The Savings Plan is the more flexible hedge — same discount, less concentration risk."},

{id:47, cat:'AWS', domain:'Cost',
 front:"A data science team wants the cheapest EC2 for their weekend batch training jobs. Spot Instances are suggested. Name the one architectural requirement and the one failure mode they must handle.",
 back:"<strong>Requirement: Fault tolerance.</strong> Spot Instances are spare EC2 capacity sold at 60-90% discount. AWS can reclaim them with a 2-minute warning when On-Demand demand spikes. Your workload must be able to handle interruption and resume — checkpointing to S3 periodically so that if a Spot instance is reclaimed, the next instance picks up from the last checkpoint rather than starting over. <strong>Failure mode to handle: The 2-minute interruption notice.</strong> AWS sends an instance metadata notification 2 minutes before reclamation. Your application must catch this signal and save state. Architectures that handle this well: batch ML training (checkpoint every N epochs), rendering farms, genome sequencing — anything that can be parallelized across many nodes and restarted cheaply. Architectures that do not work with Spot: databases, real-time APIs, anything requiring continuous availability.",
 analogy:"Spot Instances are like renting a hotel room at 80% off by agreeing to check out immediately with 2 hours notice if the hotel needs the room. Fine for a day trip where you can relocate quickly. Not fine for a 6-month residency requiring continuous access."},

{id:48, cat:'AWS', domain:'Cost',
 front:"Mammoth Capital's S3 bucket stores trade history going back 3 years. 90% of objects are never accessed after 30 days. Name the S3 storage class strategy and quantify the cost reduction.",
 back:"S3 Intelligent-Tiering or a Lifecycle Policy: <strong>Lifecycle Policy (deterministic):</strong> Move objects to S3 Standard-IA (Infrequent Access) after 30 days — 46% cheaper per GB, but charges per retrieval. Move to S3 Glacier Instant Retrieval after 90 days — 68% cheaper, millisecond retrieval. Move to S3 Glacier Deep Archive after 180 days — 95% cheaper, 12-hour retrieval. <strong>S3 Intelligent-Tiering (automated):</strong> AWS automatically moves objects between access tiers based on actual usage patterns. No retrieval fees. Small monthly monitoring charge per object. For Mammoth Capital's 3-year trade history: Standard for last 30 days (hot). Standard-IA for 30-90 days. Glacier Instant for 90 days-2 years. Deep Archive beyond 2 years. Cost reduction on 1TB dataset: from ~$23/month (all Standard) to ~$3-4/month.",
 analogy:"Your trading data has the same access pattern as a restaurant: today's orders are read constantly (Standard tier). Last month's are occasionally referenced for reconciliation (Standard-IA). Last year's are audited quarterly (Glacier). Five years ago lives in a box in storage (Deep Archive). You're paying peak warehouse space for all of it right now."},

{id:49, cat:'AWS', domain:'Cost',
 front:"A CFO wants a monthly cloud cost report. Walk through the 3 AWS native tools for FinOps and which one triggers the 'your bill just spiked' conversation.",
 back:"<strong>AWS Cost Explorer:</strong> Historical cost visualization. Breaks down spend by service, region, account, tag, linked account. Use it to identify which service caused a spike and on what date. This is your forensics tool. <strong>AWS Budgets:</strong> Proactive cost guardrails. Set a monthly budget threshold ($X) and get an email or SNS alert when you hit 80%, 100%, or projected-to-exceed. This triggers the 'your bill just spiked' conversation in real time rather than at month-end invoice. <strong>AWS Cost Anomaly Detection:</strong> ML-based anomaly detection that alerts on unusual spend patterns — catches a runaway Lambda invocation or a forgotten Fargate cluster before it becomes a major bill. Enterprise add-on: AWS Organizations with Cost Allocation Tags lets you attribute spend per team/product/environment. The CFO conversation: give them a Budget alert at 80% of monthly threshold — they never want to see a surprise on the invoice.",
 analogy:"Cost Explorer = your brokerage statement. Budgets = your stop-loss alert on total portfolio drawdown. Anomaly Detection = an ML engine that alerts when today's P&L behavior is outside normal variance — before you see the end-of-month damage."},

{id:50, cat:'AWS', domain:'Cost',
 front:"AWS Trusted Advisor shows a client has 8 underutilized EC2 instances and 3 unattached EBS volumes. Walk through the optimization conversation with the CTO, and name the 1 check that requires Business Support tier.",
 back:"Trusted Advisor is a free (partial) automated best-practices checker across 5 categories: Cost Optimization, Performance, Security, Fault Tolerance, Service Quotas. The optimization conversation: <strong>Underutilized EC2:</strong> Average CPU below 10% for 14 days = candidate for downsizing or Reserved Instance conversion. 'These 8 instances are costing you X/month for compute you're not using. Downsize to the next size down: saves Y/month immediately.' <strong>Unattached EBS volumes:</strong> These are paying for storage with no instance reading them. Delete or snapshot-and-delete: saves Z/month immediately. <strong>The check requiring Business Support:</strong> All Trusted Advisor checks (including high-value ones like MFA on root account, exposed access keys, service limit monitoring) require AWS Business Support or higher — $100/month minimum. The free tier gives you 6 core checks only. This is a selling point for managed service providers: the MSP's Business Support subscription covers all their customers' accounts.",
 analogy:"Trusted Advisor is like a portfolio analytics tool that flags: 8 positions with near-zero recent activity that are still paying fees, and 3 positions that show zero activity — you forgot these were even open. You're paying management fees on idle capital. The fix takes 30 minutes and saves real money."},
```

### Cyber Cards (8 new cards, cat:'Cyber')

```,
{id:51, cat:'Cyber',
 front:"A CISO says 'We're moving to Zero Trust.' A sales rep nods along. What does Zero Trust actually mean architecturally, and what's the one question that reveals whether the CISO is serious about it or just using buzzword budget?",
 back:"Zero Trust = 'Never trust, always verify.' The perimeter-based model (castle and moat — trust everything inside the VPN) fails when the attacker is already inside, when employees work remotely, and when SaaS apps sit outside the perimeter. Zero Trust architecture: every access request is authenticated, authorized, and encrypted regardless of source (internal or external). Identity is the new perimeter. Implementation pillars: strong identity verification (MFA, conditional access), micro-segmentation of networks, device health verification before access, least-privilege access policies, continuous monitoring and logging. The question that reveals if they're serious: 'Have you implemented microsegmentation at the workload level, or are you just running MFA on the VPN?' Most companies that say Zero Trust have implemented MFA. True Zero Trust microsegmentation is rare and expensive.",
 analogy:"Perimeter security = your homelab VLAN that trusts everything once it's on the right VLAN. Zero Trust = every service requires a valid certificate and explicit permission to talk to every other service, regardless of which VLAN it's on. Your Proxmox cluster still trusts the management VLAN. True Zero Trust would not."},

{id:52, cat:'Cyber',
 front:"A VP of Security says 'We need a SIEM.' You're an SE for a cloud security platform. What does a SIEM actually do, and what's the first question you ask before proposing a solution?",
 back:"SIEM (Security Information and Event Management) = centralized log aggregation + correlation + alerting. A SIEM ingests logs from every source (network devices, endpoints, cloud services, applications, identity providers), normalizes them into a common format, applies correlation rules to detect attack patterns across disparate log sources, and generates alerts for the SOC team. Without a SIEM: an attacker can fail authentication 500 times on separate systems and no one sees the pattern. With a SIEM: those 500 failures across 20 systems trigger a brute force alert in real time. Your first question: 'What are your top 3 use cases — compliance reporting, insider threat detection, or real-time threat detection?' The answer determines whether they need a full SIEM or whether a CSPM plus cloud-native logging (CloudTrail + GuardDuty) covers 80% of their actual use cases at 20% of the cost.",
 analogy:"A SIEM is like a trading platform that aggregates price feeds from 20 different exchanges, normalizes them, and fires an alert when a coordinated price manipulation pattern emerges across venues — something no single exchange would detect alone."},

{id:53, cat:'Cyber',
 front:"What is SOAR, how does it differ from SIEM, and what's the ROI argument you make to a CFO who balks at the cost?",
 back:"SOAR (Security Orchestration, Automation, and Response) = automated incident response workflows that execute without a human in the loop. SIEM detects the threat and creates an alert. SOAR responds to it. Example workflow: SIEM alerts on a compromised credential → SOAR automatically revokes the session token, forces MFA re-enrollment, isolates the endpoint from the network, creates a JIRA ticket, and pages the on-call analyst — all in under 60 seconds, with no human touching a keyboard. Without SOAR, that sequence takes an analyst 20-40 minutes. ROI argument to CFO: 'Your SOC team is responding to 200 alerts per day. At 20 minutes per alert, that's 66 analyst-hours daily. At $75/hr fully-loaded, that's $5k/day in alert triage labor. SOAR automates 70% of those responses. Payback period: typically under 6 months for teams over 5 analysts.'",
 analogy:"SIEM is the CloudWatch alarm that fires when your EC2 CPU spikes. SOAR is the Lambda function that automatically scales the ASG, notifies the on-call, and opens a ticket — before any human is awake. One detects. One responds."},

{id:54, cat:'Cyber',
 front:"A prospect uses the terms EDR, XDR, and MDR interchangeably. Correct them concisely, then explain which one a 200-person company likely needs.",
 back:"<strong>EDR (Endpoint Detection and Response):</strong> Detects and responds to threats on endpoints (laptops, servers). Monitors process execution, file changes, network connections. Examples: CrowdStrike Falcon, SentinelOne, Microsoft Defender for Endpoint. <strong>XDR (Extended Detection and Response):</strong> EDR extended across multiple telemetry sources — endpoint, identity, email, network, cloud. Correlates across all surfaces in a single platform. More complete coverage, less integration tax than a multi-vendor stack. Examples: Palo Alto Cortex XDR, Microsoft Defender XDR. <strong>MDR (Managed Detection and Response):</strong> Not a product — a service. A third-party SOC team that operates your EDR/XDR on your behalf, 24/7. For a 200-person company without a dedicated security team: MDR is almost always the correct answer. They cannot run a SOC themselves. They need expertise on retainer. The MDR provider brings the tooling and the analysts.",
 analogy:"EDR = a dashcam on your car (records events on your vehicle). XDR = a fleet management system that correlates dashcam, GPS, fuel, and engine data across your entire fleet. MDR = hiring a fleet operations center that monitors all of it 24/7 and calls you when something needs your attention."},

{id:55, cat:'Cyber',
 front:"An enterprise procurement team says 'We require SOC 2 Type II compliance from all our vendors.' What does SOC 2 Type II actually certify, and what's the one thing it does NOT guarantee?",
 back:"SOC 2 (System and Organization Controls 2) is an audit framework developed by the AICPA that evaluates a service organization's controls across up to 5 Trust Service Criteria: Security (required), Availability, Processing Integrity, Confidentiality, and Privacy. <strong>Type I:</strong> Point-in-time assessment — 'your controls exist as of this date.' <strong>Type II:</strong> Period-of-time assessment (typically 6-12 months) — 'your controls operated effectively throughout this period.' What Type II certifies: that the vendor's security controls (access management, encryption, logging, incident response, change management) functioned as designed over the audit period. What it does NOT guarantee: that the vendor has never been breached, that they have zero vulnerabilities, or that future controls will function perfectly. SOC 2 Type II is a process audit, not a penetration test. In an SE context: when a prospect says 'Do you have SOC 2 Type II?' the follow-up is 'Yes, and here's our report summary — which Trust Service Criteria matter most for your procurement team?'",
 analogy:"SOC 2 Type II is like a Michelin inspector visiting a restaurant every week for 6 months and certifying that their food safety processes (HACCP controls, temperature logs, supplier verification) operated correctly throughout. It doesn't certify the food is delicious or that a supplier won't have a bad batch next month."},

{id:56, cat:'Cyber',
 front:"A CISO asks 'We're on AWS. What's CSPM and do we already have it?' Give the honest answer.",
 back:"CSPM (Cloud Security Posture Management) = continuous detection and remediation of cloud infrastructure misconfigurations. It answers: 'Is anything in my AWS account set up wrong right now?' Examples of what CSPM catches: public S3 buckets, security groups open to 0.0.0.0/0 on port 22, unencrypted RDS instances, root account without MFA, CloudTrail logging disabled. <strong>What AWS provides natively (partial CSPM):</strong> AWS Config (configuration compliance rules), Security Hub (aggregated security findings), Trusted Advisor (best practices checks), GuardDuty (threat detection, not config). <strong>The honest answer:</strong> If the CISO has Security Hub + AWS Config enabled with managed rules, they have basic CSPM built in at low cost. If they need multi-cloud CSPM (AWS + Azure + GCP in one pane), continuous automated remediation, or compliance mapping to specific frameworks (CIS Benchmarks, NIST, PCI-DSS), they need a dedicated CSPM tool: Wiz, Orca, Lacework, or Prisma Cloud.",
 analogy:"AWS native security is like your Proxmox built-in monitoring — it tells you when a VM is using 95% CPU and if a network port is misconfigured. A CSPM platform is a dedicated security scanner that continuously checks every configuration decision against a compliance rulebook and auto-remediates violations."},

{id:57, cat:'Cyber',
 front:"A CISO mentions 'We map everything to MITRE ATT&CK.' You need to understand what they mean without asking a basic question. Explain MITRE ATT&CK and its relevance to a sales conversation.",
 back:"MITRE ATT&CK (Adversarial Tactics, Techniques, and Common Knowledge) is a publicly maintained knowledge base of adversary behavior, organized by tactics (what the attacker wants to achieve) and techniques (how they achieve it). The 14 tactics include: Reconnaissance, Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Lateral Movement, Collection, Exfiltration. Each technique has a code (e.g., T1078 = Valid Accounts, T1190 = Exploit Public-Facing Application). CISOs use ATT&CK to map their detections: 'We have coverage for 67% of techniques in the Initial Access tactic.' In a sales conversation: if your platform maps its detections to ATT&CK techniques, say so with specifics. 'We have out-of-the-box detection coverage for T1566 (Phishing), T1078 (Valid Accounts), and T1190 (Exploit Public-Facing Application) — the three most common initial access vectors in the 2024 DBIR.' That specificity is what separates a technical SE from a marketing brochure.",
 analogy:"MITRE ATT&CK is the options chain of attack patterns. Every technique is a specific play an adversary runs. CISOs want to know which plays your platform can detect and block — not in general terms, but by specific technique code. Speaking ATT&CK is like speaking Greeks — it shows you're trading at a different level."},

{id:58, cat:'Cyber',
 front:"A prospect's employees work remotely on a VPN. The CISO says 'Our VPN performance is terrible and we're evaluating ZTNA solutions.' Explain the architectural difference and the 3 specific improvements ZTNA delivers.",
 back:"<strong>Traditional VPN architecture:</strong> Remote user connects to a VPN concentrator, gets placed on the corporate network, and can now reach any resource on that network. Trust is granted at the network level — the 'castle and moat' model. If the VPN credential is compromised, the attacker is on the full corporate network. <strong>ZTNA (Zero Trust Network Access) architecture:</strong> The user authenticates to an identity-aware proxy. The proxy grants access to SPECIFIC applications only, not the entire network. The user never 'joins' the corporate network. <strong>3 improvements over VPN: 1) Performance:</strong> ZTNA routes traffic directly to the application (often via cloud edge) — not backhauled through a central VPN concentrator. Latency drops 30-60% for SaaS apps. <strong>2) Blast radius reduction:</strong> A compromised ZTNA credential grants access to one app, not the full network. <strong>3) Granular access policy:</strong> 'Marketing can access Salesforce but not the financial reporting server' — impossible with a VPN, trivial with ZTNA.",
 analogy:"VPN = giving every employee a key to the entire office building. ZTNA = giving each employee a key to only the rooms they need, verified by a smart lock that checks their identity and device health every time they open a door."}
],
exam: [
 {q:"Your app needs to send an event to both an SQS queue AND an email subscriber simultaneously when a trade executes. Which architecture is correct?",
  opts:["Two separate Lambda functions, one writing to SQS and one sending email","An SNS topic with SQS and Email subscriptions (fanout pattern)","An EventBridge rule routing to SQS and a separate rule routing to email","SQS with a dead-letter queue configured to forward to email"],
  ans:1,domain:"Resilient",
  exp:"SNS fanout: one message to SNS, delivered simultaneously to all subscribers (SQS queue, email endpoint, Lambda, HTTP). This is the standard decoupling pattern for multi-consumer event delivery."},

 {q:"An EC2 instance running your trading bot needs to read from DynamoDB. No credentials should exist in code or environment variables. What's the correct approach?",
  opts:["Store credentials in AWS Secrets Manager and have the code fetch them at startup","Use an IAM User with programmatic access keys stored in a config file","Attach an IAM Role to the EC2 instance with DynamoDB read permissions","Hardcode credentials in the Lambda environment variables with encryption enabled"],
  ans:2,domain:"Secure",
  exp:"IAM Roles attached to EC2 instances provide temporary credentials via the instance metadata service, rotated automatically every 15 minutes. No credentials stored anywhere. This is always the correct pattern over access keys for EC2 workloads."},

 {q:"Your RDS database needs to handle 50x the normal read load during quarterly reporting. You cannot modify the application code. What is the LOWEST COST solution?",
  opts:["Upgrade to a larger RDS instance class","Enable RDS Multi-AZ deployment","Create an RDS Read Replica and update the read connection string","Migrate from RDS to Aurora which handles higher throughput natively"],
  ans:2,domain:"Performing",
  exp:"A Read Replica offloads read traffic from the primary at approximately the cost of running a second instance. Multi-AZ adds a standby for failover, not read scaling. Upgrading instance class scales vertically but costs more than a same-sized read replica. Only requires updating the connection string — not application code."},

 {q:"A Lambda function currently processes jobs that run for 18 minutes each. What is the problem and what should you use instead?",
  opts:["Increase Lambda memory allocation to extend the timeout limit","Lambda has a 15-minute maximum timeout — use AWS Batch or Fargate for long-running jobs","Use Lambda SnapStart to reduce initialization time","Split the job into three 6-minute Lambda functions chained together"],
  ans:1,domain:"Resilient",
  exp:"Lambda has an absolute maximum timeout of 15 minutes. This is a hard limit — cannot be configured higher. Jobs exceeding 15 minutes need ECS Fargate, AWS Batch, or EC2. Chaining three 6-minute Lambdas creates the state management problem that Step Functions was built to solve."},

 {q:"Your S3 bucket stores private trading records. Which AWS service will AUTOMATICALLY detect and alert you if the bucket becomes publicly accessible?",
  opts:["AWS CloudTrail","AWS Shield","AWS Config with a managed rule for S3 public access","VPC Flow Logs"],
  ans:2,domain:"Secure",
  exp:"AWS Config's managed rule `s3-bucket-public-read-prohibited` continuously evaluates all S3 buckets and triggers a non-compliant finding if public access is enabled. CloudTrail records WHO made the bucket public but does not continuously check current state. Config answers 'what is the current configuration state.'"},

 {q:"Route 53 should route 90% of traffic to us-east-1 and 10% to eu-west-1 for canary testing of a new deployment. Which routing policy?",
  opts:["Failover routing","Geolocation routing","Weighted routing","Latency routing"],
  ans:2,domain:"Performing",
  exp:"Weighted routing distributes traffic in proportional weights across multiple records. Set us-east-1 weight to 90 and eu-west-1 weight to 10. Used for canary deployments, A/B testing, and gradual traffic migration. Failover is for primary/standby DR. Latency routes to the lowest-latency region, not a specific percentage."},

 {q:"Your startup runs batch ML training jobs on weekends. The jobs can be interrupted and restarted. What EC2 pricing model gives the highest discount?",
  opts:["1-year Reserved Instances (No Upfront)","Spot Instances","On-Demand Instances","Compute Savings Plans"],
  ans:1,domain:"Cost",
  exp:"Spot Instances provide 60-90% discount vs. On-Demand for spare EC2 capacity. They can be interrupted with a 2-minute warning — which is acceptable for fault-tolerant batch jobs that checkpoint to S3. Reserved Instances give 40-60% discount but require a 1-3 year commitment. Spot is the correct choice when interruption tolerance is acceptable."},

 {q:"Multiple EC2 instances need to share a common file system that all can read and write simultaneously. Which storage service handles this?",
  opts:["EBS gp3 volume with Multi-Attach enabled","Amazon S3 with concurrent access","Amazon EFS (Elastic File System)","Instance Store"],
  ans:2,domain:"Performing",
  exp:"EFS is a managed NFS file system that thousands of EC2 instances across multiple AZs can mount and access simultaneously with full read/write concurrency. EBS Multi-Attach has limited support (io1/io2 only, same AZ, up to 16 instances) and requires cluster-aware file systems. S3 is object storage, not a file system. Instance Store is local and non-shared."},

 {q:"A developer stores database credentials in AWS Systems Manager Parameter Store Standard tier with no encryption. A security auditor flags this. What is the recommended fix?",
  opts:["Move credentials to an encrypted S3 bucket with bucket policy restricting access","Use Parameter Store SecureString (KMS-encrypted) or migrate to AWS Secrets Manager for automatic rotation","Base64-encode the credentials before storing them in Parameter Store","Store credentials in AWS CloudFormation as a NoEcho parameter"],
  ans:1,domain:"Secure",
  exp:"Parameter Store SecureString encrypts values with KMS. AWS Secrets Manager adds automatic rotation for RDS, Redshift, and custom rotation Lambdas. Both are correct; Secrets Manager is preferred for production credentials that need automatic rotation. Base64 is encoding, not encryption. CloudFormation NoEcho only hides values in console output — they're still stored in plaintext in the stack."},

 {q:"CloudFront is serving stale content after you deployed updated JavaScript files to S3. Users are still seeing the old version. What is the correct fix?",
  opts:["Delete and recreate the CloudFront distribution","Update the S3 bucket policy to force CloudFront to re-fetch","Create a CloudFront cache invalidation for the affected paths","Change the CloudFront Origin to point to a new S3 bucket"],
  ans:2,domain:"Performing",
  exp:"CloudFront cache invalidation removes specific objects from edge caches before their TTL expires, forcing the next request to fetch fresh content from origin. Invalidating /* clears all cached objects. Alternative: use versioned file names (app.v2.js) so new deployments automatically bypass cache without invalidation costs. Invalidations are charged after the first 1,000 paths per month."}
],
threats: [
 {id:1,
  title:"The Silent Exfiltration",
  scenario:"500,000 customer records were exfiltrated from an AWS RDS instance over 3 weeks. The breach was only discovered when a threat intelligence feed flagged the company's data on a dark web forum. The attacker used valid IAM credentials obtained via a phishing email.",
  question:"Which combination of AWS controls would have been MOST likely to detect this intrusion while it was active?",
  opts:["VPC Security Groups locked to specific IP ranges","AWS GuardDuty detecting unusual API call patterns + CloudTrail logging all data access","RDS Automated Backups running daily","S3 Cross-Region Replication for the database"],
  ans:1,
  exp:"GuardDuty uses ML to detect anomalous behavior — unusual IAM credential usage from a new IP, atypical data query volumes, or access at unusual hours. CloudTrail logs every API call including RDS data access. Together they would have surfaced the unusual query volume and foreign IP access within hours, not weeks. VPC Security Groups control network access but the attacker had valid credentials — network rules don't stop authenticated API calls. Backups and replication are recovery tools, not detection tools."},

 {id:2,
  title:"The Accidental Public Bucket",
  scenario:"A junior developer accidentally set an S3 bucket containing private client contracts to public access during a development test. The bucket remained public for 4 hours before a client called to report their contract was accessible via a Google search result.",
  question:"Which AWS control detects this misconfiguration in real time — before the client calls?",
  opts:["AWS CloudTrail logging the PutBucketAcl API call","AWS Config rule s3-bucket-public-read-prohibited triggering a non-compliant alert","Amazon Macie scanning for sensitive data in the bucket","AWS Shield Advanced protecting against data exposure"],
  ans:1,
  exp:"AWS Config continuously evaluates bucket configurations against compliance rules. The s3-bucket-public-read-prohibited rule triggers a non-compliant finding the moment a bucket's public access settings change — typically within minutes. An SNS alert can notify the security team immediately. CloudTrail records WHO made the change and WHEN, but does not continuously check current state. Macie detects sensitive data IN buckets but doesn't specifically alert on public access policy changes. Shield protects against DDoS, not misconfiguration."},

 {id:3,
  title:"The Insider Threat",
  scenario:"A departing DevOps engineer used their elevated IAM permissions to delete production DynamoDB tables and disable CloudTrail logging across the account — all within a 10-minute window — two days before their last day was discovered by HR.",
  question:"Which architecture would have PREVENTED this attack, regardless of the engineer's IAM permissions?",
  opts:["Multi-AZ deployment of all production services","AWS Organizations Service Control Policies preventing CloudTrail disable and DynamoDB DeleteTable in the production OU","AWS WAF rules blocking destructive API calls","GuardDuty anomaly detection alerting on the destructive actions"],
  ans:1,
  exp:"SCPs (Service Control Policies) in AWS Organizations are permission guardrails that cannot be overridden by ANY IAM policy — including the root user of the member account. An SCP denying cloudtrail:StopLogging and dynamodb:DeleteTable in the production OU means even a fully-privileged IAM user cannot execute those actions. GuardDuty detects the attack but cannot prevent it. WAF protects web applications, not IAM API calls. Multi-AZ provides resilience after the fact. SCPs are the only control that prevents the action entirely."}
],
 arch:[
  {id:1,title:"HA Dashboard",brief:"Mammoth Capital's trading dashboard runs on a single EC2 instance. One hardware fault during a MSTR catalyst event = full outage. Architect for 99.99% uptime.",
   draggables:["Application Load Balancer","EC2 Instance (AZ-a)","EC2 Instance (AZ-b)","Local NAS Backup"],
   zones:[{id:0,name:"Public Ingress Layer",correct:["Application Load Balancer"]},{id:1,name:"Availability Zone A (us-east-1a)",correct:["EC2 Instance (AZ-a)"]},{id:2,name:"Availability Zone B (us-east-1b)",correct:["EC2 Instance (AZ-b)"]}],
   dm:{"Local NAS Backup":"&#9888; A NAS is not an AWS component. For cloud persistent storage: S3 (objects) or EBS (block volumes attached to EC2)."},
   wm:"&#10003; Correct. ALB in front of two EC2 instances across separate AZs eliminates the single-point-of-failure. AWS automatically routes traffic away from an unhealthy instance. Minimum viable HA pattern for any production application."},
  {id:2,title:"Three-Tier App",brief:"Mammoth Capital needs separated concerns: public web dashboard, trade execution API, and persistent trade history database. Design so a breach of the public tier cannot touch the data tier.",
   draggables:["Application Load Balancer","EC2 App Server","RDS Multi-AZ","Local SQLite File"],
   zones:[{id:0,name:"Public Tier (Internet-Facing)",correct:["Application Load Balancer"]},{id:1,name:"Application Tier (Private Subnet)",correct:["EC2 App Server"]},{id:2,name:"Data Tier (Isolated Subnet)",correct:["RDS Multi-AZ"]}],
   dm:{"Local SQLite File":"&#9888; SQLite is a file-based, single-connection DB. In a multi-instance Auto Scaling setup, each EC2 instance would have its own disconnected SQLite file — no shared state, no consistency. This is an architectural impossibility, not a bug."},
   wm:"&#10003; Correct. ALB (public) routes to EC2 (private app subnet) which queries RDS Multi-AZ (isolated data subnet). Each tier communicates only with the adjacent tier via Security Group rules. A public-tier compromise cannot reach the database directly."},
  {id:3,title:"Serverless Alert API",brief:"Mammoth Capital's Pine Script indicators fire webhooks when conditions trigger. Event-driven, variable frequency, short execution. Design a serverless architecture with zero idle cost.",
   draggables:["API Gateway","Lambda Function","DynamoDB Table","EC2 t3.medium"],
   zones:[{id:0,name:"Entry Point (HTTP Endpoint)",correct:["API Gateway"]},{id:1,name:"Compute Layer (Event-Driven)",correct:["Lambda Function"]},{id:2,name:"Persistence Layer (NoSQL)",correct:["DynamoDB Table"]}],
   dm:{"EC2 t3.medium":"&#9888; EC2 for an event-driven webhook handler means paying 24/7 for compute that executes for 200ms per alert. At 10,000 alerts/month, EC2 costs ~$15/month idle. Lambda costs ~$0.02 for the same workload — billed only for actual execution."},
   wm:"&#10003; Correct. API Gateway receives the webhook POST from TradingView/Pine Script. Lambda executes alert logic in milliseconds. DynamoDB stores the alert log with single-digit ms read/write latency. Total idle cost: $0. Cost at 10k alerts/month: under $1."},
  {id:4,title:"Disaster Recovery",brief:"Mammoth Capital trade history must survive a full AWS regional failure. Design DR meeting RPO = 15 minutes and RTO = 2 hours — fully automated, no human in the loop.",
   draggables:["S3 Cross-Region Replication","Route 53 Failover Policy","RDS Automated Backup","USB External Drive"],
   zones:[{id:0,name:"Backup Storage (eu-west-1)",correct:["S3 Cross-Region Replication"]},{id:1,name:"Data Recovery (Point-in-Time)",correct:["RDS Automated Backup"]},{id:2,name:"DNS Failover (Automated)",correct:["Route 53 Failover Policy"]}],
   dm:{"USB External Drive":"&#9888; A USB drive requires a human to physically plug it in at the recovery site. RTO = 2 hours with no human in the loop. USB-based recovery is a HIPAA-era DR strategy, not a cloud-native one."},
   wm:"&#10003; Correct. S3 CRR replicates to eu-west-1 asynchronously (typically &lt;1 min lag, meeting RPO=15min). RDS Automated Backup enables point-in-time recovery within 5 minutes. Route 53 health checks detect the primary failure and update DNS automatically — no human intervention required."}
 ],
 sales:[
  {id:1,persona:"CTO Objection — Logistics Company",
   scenario:"'Your proposal looks solid. But our servers are fully paid off and our DevOps team built the entire stack. Why would we spend money migrating to something we don't control?'",
   opts:[
    {text:"Walk through technical performance benchmarks — show how AWS infrastructure outperforms their hardware on compute, IOPS, and network throughput.",ok:false,
     fb:"Wrong move. This is feature-dumping at a decision-maker who just expressed sunk-cost comfort and a control preference. Benchmarks don't address his actual concern — which is financial and political, not technical. You've confirmed his suspicion that you're a vendor trying to sell him something."},
    {text:"Pivot to hidden operational costs: 'I hear you on the hardware. How many engineer-hours per month does your team spend maintaining that stack versus shipping new features? And what happens to your architecture when you need to scale 3x for peak season?'",ok:true,
     fb:"Correct. You shifted from sunk cost (a past decision they can't unmake) to ongoing hidden costs (a present problem they can quantify) and future scale risk (urgency). This is consultative discovery — you're not arguing against their decision; you're helping them see what that decision costs them today and tomorrow."},
    {text:"Offer a phased migration plan starting with non-critical workloads and a 15% first-year discount to make the transition financially palatable.",ok:false,
     fb:"Weak. You've dropped price before establishing value — setting a precedent that your pricing is negotiable under mild resistance. And proposing a phased plan without confirmed pain is a solution to a problem you haven't validated. This is reactive selling, not consultative."}
   ]},
  {id:2,persona:"CTO Objection — Enterprise SaaS (Existing Azure EA)",
   scenario:"'We standardized on Azure 18 months ago. Our CTO signed a 3-year Enterprise Agreement with Microsoft. We're not in a position to evaluate a different cloud vendor.'",
   opts:[
    {text:"Make the case that AWS is technically superior to Azure — better Lambda cold-start performance, more mature S3 ecosystem, stronger third-party integrations.",ok:false,
     fb:"Never trash the incumbent in the first conversation. You have no established credibility, and attacking their existing infrastructure investment puts them on the defensive. You're arguing against a 3-year contract that already exists. This is unwinnable."},
    {text:"Acknowledge the EA and pivot to white space: 'That makes sense — standardization has real value. I'm curious: is the EA covering 100% of your workloads? Most EAs have gaps around AI inference, edge computing, or analytics pipelines that weren't in scope at signing. Are any of those areas where you're feeling pressure?'",ok:true,
     fb:"Correct. You're not fighting the EA — you're looking for net-new initiatives the EA wasn't written to cover. A 3-year Azure EA doesn't prevent an AWS contract for a new AI workload. You win by not competing on their established ground."},
    {text:"Ask for a formal comparison evaluation — offer to run a POC benchmarking AWS against their current Azure setup on performance and cost.",ok:false,
     fb:"A POC request without established pain is a time-consuming distraction they have no incentive to pursue. You're asking them to re-evaluate a decision made 18 months ago with no pain established and no champion identified. They will say no."}
   ]},
  {id:3,persona:"VP Operations Objection — FinTech Scale-up",
   scenario:"'Things are actually working fine for us right now. We're not experiencing any major problems. I'm not sure what problem you think we're solving.'",
   opts:[
    {text:"Walk through your full feature set — capabilities, integration library, and case studies — to surface something that resonates with their current environment.",ok:false,
     fb:"Feature-dumping into a 'no pain' objection is the fastest way to confirm you have nothing to offer. You're presenting solutions to problems they haven't confirmed they have. This is a pitch, not a discovery. They will nod politely and not return your calls."},
    {text:"Agree things sound stable, then probe for latent risk: 'That's great — you're building from strength rather than reacting to a crisis. What would have to happen in the next 12 months for infrastructure modernization to become a board-level priority? And how would you know it was coming before it arrived?'",ok:true,
     fb:"Correct. This is a latent pain discovery question. You're not arguing they have a problem — you're asking them to describe conditions under which a problem would emerge. Most companies say 'things are fine' right before a scaling event, compliance audit, or competitive pressure exposes hidden technical debt. Your job is to make that future visible before it arrives."},
    {text:"Thank them for their time and suggest reconnecting in 6 months when they might have more need.",ok:false,
     fb:"Walkaway is sometimes correct — but not as a first move when you haven't completed discovery. 'Things are fine' is a surface objection, not a confirmed disqualification. You need to probe one or two layers deeper before leaving. This is a qualification failure disguised as a strategic decision."}
   ]},
  {id:4,persona:"Multi-Stakeholder Conflict — Enterprise Healthcare",
   scenario:"Your VP of Engineering champion calls: 'The CTO is fully on board. But our CFO is blocking the budget. She says it's not a priority this quarter.'",
   opts:[
    {text:"Ask the VP to set up a joint call with the CFO so you can present the full ROI model and address her concerns directly.",ok:true,
     fb:"Correct — and this should have happened 6 weeks ago. The CFO is the Economic Buyer. She hasn't seen your value case. This is not a budget objection — it's a value articulation failure built over 2 months of selling to a technical champion without EB access. Before the joint call: build a 1-page financial model showing current-state cost, solution cost, and payback period in months. Arm your champion with the exact language the CFO needs to hear."},
    {text:"Ask the VP of Engineering to make the case internally — he understands the technical need better than anyone.",ok:false,
     fb:"Your champion is an engineer, not a financial buyer. He speaks in uptime and architecture. The CFO speaks in ROI and risk. Asking a technical champion to translate your value case into CFO language without coaching or materials is how deals die in internal meetings you're not in."},
    {text:"Offer a reduced-scope pilot at a lower price to get something across the line this quarter, then expand in Q2.",ok:false,
     fb:"Reducing price and scope before the CFO has seen your value case is a tactical surrender. You don't know if budget is the real issue or a proxy for 'I don't see the ROI.' Find out before you discount. If you cut price now, you anchor every future expansion conversation at the pilot rate."}
   ]}
 ],
 demo:{
  pitcher:{
   items:[
    {id:'hook',label:'Company Context Hook',ico:'&#128269;',desc:'Open with a specific insight about their business — not your product.'},
    {id:'prob',label:'Quantified Problem',ico:'&#128308;',desc:'State the specific pain with a dollar figure attached.'},
    {id:'cost',label:'Cost of Inaction',ico:'&#9203;',desc:'What does waiting 3-6 months cost them in dollars or competitive risk?'},
    {id:'soln',label:'Solution Mechanism',ico:'&#9989;',desc:'One sentence on HOW you solve it — not a feature list.'},
    {id:'cta', label:'Specific Call to Action',ico:'&#128222;',desc:'A concrete next step — not "let me know if you have questions."'}
   ],
   correctOrder:['hook','prob','cost','soln','cta'],
   explanation:"Most SEs open with the Solution Mechanism — they go straight to the architecture diagram. The Economic Buyer tunes out before slide 3. The correct sequence builds urgency before presenting the answer: Hook (they recognize the context) &rarr; Problem (they feel the pain) &rarr; Cost of Inaction (the pain is now time-sensitive) &rarr; Solution (now they\'re ready to hear it) &rarr; CTA (momentum, not ambiguity)."
  },
  reframe:[
   {feature:"Our platform auto-scales to 10,000 concurrent users.",
    opts:["Our platform uses advanced elastic compute that dynamically provisions resources up to a 10,000 user threshold.","Your engineering team never has to manually provision servers for peak load events — eliminating the $30k emergency sprint your VP Engineering described in our last call.","We are among the industry leaders in scalability with enterprise-grade auto-scaling."],
    ci:1,
    exp:"The first option is a feature restatement with technical vocabulary. The third is a vague competitive claim. Only the second names a specific dollar figure tied to a problem they already confirmed — the only framing the CFO remembers after the meeting."},
   {feature:"We offer a 99.99% uptime SLA.",
    opts:["Our 99.99% SLA means less than 52 minutes of downtime per year — protecting you from the SLA breach penalties embedded in your enterprise client contracts that Legal flags every renewal.","We have one of the highest uptime guarantees in the industry, demonstrating our commitment to reliability and operational excellence.","99.99% uptime is achieved through multi-region, geo-redundant infrastructure with automatic failover."],
    ci:0,
    exp:"The second is a hollow competitive claim. The third is architecture narration — the CTO appreciates it, the CFO doesn't care. The first translates uptime into a downstream business consequence they've already confirmed: SLA breach penalties with their own enterprise clients. Always connect your SLA to their SLA."},
   {feature:"Our API response time is under 50ms.",
    opts:["Sub-50ms API latency is achieved through edge-optimized infrastructure and intelligent request routing algorithms.","50ms response time is best-in-class for this category and enables real-time data processing use cases.","Your traders acting on Mammoth Capital signals experience no perceptible lag — the difference between filling at the signal price and missing the move as the order queue processes."],
    ci:2,
    exp:"The first is architecture explanation. The second is a vague competitive claim. The third uses the prospect's own context to make the latency viscerally meaningful. 50ms in the abstract means nothing to a CFO. 50ms as the difference between a filled order and a missed trade is immediately understood by everyone in that room."}
  ]
 }
};
// ── STATE ──────────────────────────────────────────────────
const SK='commuter_v2',XP_R={hard:5,good:10,easy:20,arch:50,sales:30,demo:40};
const XP_CYCLE=200,IV={hard:60000,good:600000,easy:86400000},GATE=10;
function defS(){
  const fcs={};DATA.flashcards.forEach(c=>{fcs[c.id]={interval:0,nextDue:0,reps:0}});
  return{xp:0,level:1,seenOb:false,streak:0,fcs,doneArch:[],doneSales:[],doneDemo:[]};
}
function loadS(){try{const r=localStorage.getItem(SK);return r?JSON.parse(r):null}catch{return null}}
function save(){try{localStorage.setItem(SK,JSON.stringify(S))}catch{}}
let S=loadS()||defS();
DATA.flashcards.forEach(c=>{if(!S.fcs[c.id])S.fcs[c.id]={interval:0,nextDue:0,reps:0}});
if(!S.streak)S.streak=0;if(!S.doneDemo)S.doneDemo=[];
function eC(){return DATA.flashcards.filter(c=>S.fcs[c.id].interval>=IV.easy).length}
function due(){return DATA.flashcards.filter(c=>Date.now()>=S.fcs[c.id].nextDue)}
function nextMs(){const ts=DATA.flashcards.map(c=>S.fcs[c.id].nextDue).filter(t=>t>Date.now());return ts.length?Math.min(...ts):null}
function rateCard(id,r){
  const fc=S.fcs[id];fc.interval=IV[r];fc.nextDue=Date.now()+IV[r];fc.reps=(fc.reps||0)+1;
  if(r!=='hard')S.streak=(S.streak||0)+1;else S.streak=0;
  giveXP(XP_R[r]);recalcLvl();save();
}
function shuf(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function interleave(cards){
  const s=shuf(cards);
  for(let i=1;i<s.length;i++){if(s[i].cat===s[i-1].cat){for(let j=i+1;j<s.length;j++){if(s[j].cat!==s[i-1].cat){[s[i],s[j]]=[s[j],s[i]];break}}}}
  return s;
}
function giveXP(amt){
  S.xp+=amt;refreshH();
  const el=document.getElementById('txp');el.textContent='+'+amt+' XP';
  el.classList.remove('show');void el.offsetWidth;el.classList.add('show');
}
function refreshH(){
  document.getElementById('lvl-txt').textContent='Level '+S.level;
  document.getElementById('xpl').textContent=S.xp+' XP';
  document.getElementById('xpf').style.width=((S.xp%XP_CYCLE)/XP_CYCLE*100).toFixed(1)+'%';
}
function refreshLk(){
  const u=S.level>=2;
  ['arch','scene','demo'].forEach(t=>{
    const b=document.getElementById('nb-'+t),p=document.getElementById('lk-'+t);
    if(u){b.classList.remove('locked');if(p)p.style.display='none'}
    else{b.classList.add('locked');if(p)p.style.display=''}
  });
}
let _pl=S.level;
function recalcLvl(){
  if(eC()>=GATE&&S.level<2){
    S.level=2;save();
    if(_pl<2){_pl=2;document.getElementById('tl-msg').textContent='Level 2 Unlocked — Architecture, Scenarios & Demo Lab!';fireT('tl')}
  }
  refreshH();refreshLk();
}
function fireT(id){const el=document.getElementById(id);el.classList.remove('show');void el.offsetWidth;el.classList.add('show')}
// ── NAV ───────────────────────────────────────────────────
let curTab='flash';
function goTo(tab){
  curTab=tab;
  document.querySelectorAll('.nb').forEach(b=>b.classList.remove('active'));
  document.getElementById('nb-'+tab).classList.add('active');
  const section = document.getElementById('v-'+tab);
  const navHeight = document.getElementById('nav').offsetHeight + document.getElementById('hdr').offsetHeight;
  window.scrollTo({
    top: section.offsetTop - navHeight - 20,
    behavior: 'smooth'
  });
}
// ── FLASHCARDS ─────────────────────────────────────────────
function setCat(cat){
  const r=document.documentElement;
  r.style.setProperty('--cc',CC[cat]||'var(--blue)');
  r.style.setProperty('--cg',CG[cat]||'var(--gb)');
}
let fq=[],fi=0;
function renderFlash(){
  const el=document.getElementById('v-flash');
  fq=interleave(due());fi=0;el.innerHTML='';
  if(!fq.length){renderCU(el);return}
  buildCard(el);
}
function buildCard(el){
  if(fi>=fq.length){renderCU(el);return}
  const c=fq[fi];setCat(c.cat);
  const ico=c.cat==='Sales'
    ?'<svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1 8l2-3.5 1.5 1.5 2-3L8 5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    :c.cat==='Cloud'
    ?'<svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M6.5 6H3a2 2 0 110-4 2.5 2.5 0 014.9.8A1.5 1.5 0 016.5 6z" stroke="currentColor" stroke-width="1.1"/></svg>'
    :'<svg width="9" height="9" viewBox="0 0 9 9" fill="none"><circle cx="4.5" cy="4.5" r="3" stroke="currentColor" stroke-width="1.1"/><path d="M3 4.5l1.2 1.2 2.2-2.2" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const dots=fq.map((_,i)=>'<div class="dot'+(i<fi?' s':i===fi?' c':'')+'"></div>').join('');
  const stk=S.streak>=3?'<div class="sb on">&#128293; '+S.streak+' streak</div>':'<div class="sb"></div>';
  el.innerHTML='<div class="slbl">Active Recall</div>'
    +'<div class="dm"><span class="dc">Card '+(fi+1)+' / '+fq.length+'</span>'+stk+'</div>'
    +'<div class="dots">'+dots+'</div>'
    +'<div class="cscene"><div class="cinner" id="ci" style="min-height:300px;animation:cIn .34s ease both">'
    +'<div class="cface cf"><div class="ccat">'+ico+' '+c.cat+'</div>'
    +'<div class="cq">'+c.front+'</div>'
    +'<div class="ctap"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.2"/><path d="M6 4v3M6 8.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg> Tap to reveal</div></div>'
    +'<div class="cface cb"><div class="ccat">'+ico+' '+c.cat+'</div>'
    +'<div class="caw"><div class="ca">'+c.back+'</div>'
    +(c.analogy?'<div class="abox"><div class="albl"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1v1M5.5 9v1M1 5.5h1M9 5.5h1M2.3 2.3l.7.7M8 8l.7.7M2.3 8.7l.7-.7M8 3l.7-.7" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><circle cx="5.5" cy="5.5" r="2" stroke="currentColor" stroke-width="1.1"/></svg> Analogy</div><div class="atxt">'+c.analogy+'</div></div>':'')
    +'</div>'
    +'<div class="srr"><button class="srb srH" id="bH">&#128308; Hard<span class="srs">1 min</span></button>'
    +'<button class="srb srG" id="bG">&#128993; Good<span class="srs">10 min</span></button>'
    +'<button class="srb srE" id="bE">&#128994; Easy<span class="srs">1 day</span></button></div>'
    +'</div></div></div>'
    +'<p style="text-align:center;font-size:11px;color:var(--t3);margin-top:8px">'+fq.length+' due &bull; '+eC()+'/'+GATE+' mastered &bull; reach '+GATE+' to unlock Level 2</p>';
  document.getElementById('ci').addEventListener('click',e=>{if(e.target.closest('.srr'))return;document.getElementById('ci').classList.toggle('fl')});
  document.getElementById('bH').addEventListener('click',e=>{e.stopPropagation();doR(c.id,'hard')});
  document.getElementById('bG').addEventListener('click',e=>{e.stopPropagation();doR(c.id,'good')});
  document.getElementById('bE').addEventListener('click',e=>{e.stopPropagation();doR(c.id,'easy')});
}
function doR(id,r){rateCard(id,r);fi++;buildCard(document.getElementById('v-flash'))}
function renderCU(el){
  const ec=eC();
  const cats=['Sales','Cloud','Demo'];
  const rings=cats.map(cat=>{
    const tot=DATA.flashcards.filter(c=>c.cat===cat).length;
    const dn=DATA.flashcards.filter(c=>c.cat===cat&&S.fcs[c.id].interval>=IV.easy).length;
    const pct=tot>0?dn/tot:0,R=28,circ=2*Math.PI*R;
    const dash=circ*pct,gap=circ-dash,col=CC[cat];
    return'<div class="rw"><svg width="68" height="68" viewBox="0 0 68 68">'
      +'<circle cx="34" cy="34" r="'+R+'" fill="none" stroke="var(--b3)" stroke-width="6"/>'
      +'<circle cx="34" cy="34" r="'+R+'" fill="none" stroke="'+col+'" stroke-width="6"'
      +' stroke-dasharray="'+dash.toFixed(1)+' '+gap.toFixed(1)+'" stroke-linecap="round" transform="rotate(-90 34 34)"/>'
      +'<text x="34" y="39" text-anchor="middle" fill="'+col+'" font-size="12" font-weight="800">'+dn+'/'+tot+'</text>'
      +'</svg><div class="rl" style="color:'+col+'">'+cat+'</div></div>';
  }).join('');
  const nxt=nextMs();
  let cdH='';
  if(nxt){const d=nxt-Date.now(),h=Math.floor(d/3600000),m=Math.floor((d%3600000)/60000);cdH='<div class="cu-next"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" stroke-width="1.1"/><path d="M5.5 3v2.5l1.8 1.2" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>'+(h>0?h+'h ':'')+m+'m until next card</div>'}
  el.innerHTML='<div class="slbl">Active Recall</div><div class="cu">'
    +'<div class="cu-rings">'+rings+'</div>'
    +'<h2 class="cu-title">All caught up.</h2>'
    +'<p class="cu-sub">Your brain is consolidating. Reviewing before the timer fires is wasted effort — that is the science.</p>'
    +cdH
    +(ec<GATE?'<div class="l2p"><div class="l2h"><span>Progress to Level 2</span><span style="color:var(--blue);font-weight:800">'+ec+'/'+GATE+'</span></div><div class="l2t"><div class="l2f" style="width:'+Math.round(ec/GATE*100)+'%"></div></div></div>':'')
    +'</div>';
}
// ── ARCHITECTURE ───────────────────────────────────────────
let cAi=0,aP={};
const NM={
  "Application Load Balancer":{bg:'rgba(79,158,255,.12)',s:'<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="3.5" r="1.5" fill="#4f9eff"/><circle cx="3.5" cy="10.5" r="1.5" fill="#4f9eff"/><circle cx="10.5" cy="10.5" r="1.5" fill="#4f9eff"/><path d="M7 5v2M7 7L3.5 9M7 7l3.5 2" stroke="#4f9eff" stroke-width="1.2" stroke-linecap="round"/></svg>'},
  "EC2 Instance (AZ-a)":{bg:'rgba(255,153,0,.12)',s:'<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="#ff9900" stroke-width="1.2"/><path d="M4.5 7h5M7 4.5v5" stroke="#ff9900" stroke-width="1.2" stroke-linecap="round"/></svg>'},
  "EC2 Instance (AZ-b)":{bg:'rgba(255,153,0,.12)',s:'<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="#ff9900" stroke-width="1.2"/><path d="M4.5 7h5M7 4.5v5" stroke="#ff9900" stroke-width="1.2" stroke-linecap="round"/></svg>'},
  "Local NAS Backup":{bg:'rgba(248,113,113,.12)',s:'<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="3" width="11" height="8" rx="1.5" stroke="#f87171" stroke-width="1.2"/><circle cx="10.5" cy="7" r="1.2" fill="#f87171"/><path d="M2.5 6.5h5" stroke="#f87171" stroke-width="1.2" stroke-linecap="round"/></svg>'},
  "EC2 App Server":{bg:'rgba(255,153,0,.12)',s:'<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="#ff9900" stroke-width="1.2"/><path d="M4.5 7h5M7 4.5v5" stroke="#ff9900" stroke-width="1.2" stroke-linecap="round"/></svg>'},
  "RDS Multi-AZ":{bg:'rgba(52,211,153,.12)',s:'<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><ellipse cx="7" cy="4" rx="4.5" ry="1.8" stroke="#34d399" stroke-width="1.2"/><path d="M2.5 4v6c0 1 2 1.8 4.5 1.8s4.5-.8 4.5-1.8V4" stroke="#34d399" stroke-width="1.2"/><path d="M2.5 7c0 1 2 1.8 4.5 1.8s4.5-.8 4.5-1.8" stroke="#34d399" stroke-width="1.2"/></svg>'},
  "Local SQLite File":{bg:'rgba(248,113,113,.12)',s:'<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8 1.5H4a1 1 0 00-1 1v9a1 1 0 001 1h6a1 1 0 001-1V5.5L8 1.5z" stroke="#f87171" stroke-width="1.2" stroke-linejoin="round"/><path d="M8 1.5v4h4" stroke="#f87171" stroke-width="1.2" stroke-linecap="round"/></svg>'},
  "API Gateway":{bg:'rgba(167,139,250,.12)',s:'<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="4.5" width="5" height="5" rx="1" stroke="#a78bfa" stroke-width="1.2"/><rect x="8" y="4.5" width="5" height="5" rx="1" stroke="#a78bfa" stroke-width="1.2"/><path d="M6 7h2" stroke="#a78bfa" stroke-width="1.2" stroke-linecap="round"/></svg>'},
  "Lambda Function":{bg:'rgba(255,153,0,.12)',s:'<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 11.5l2.5-5 2 3.5 2-4 2 5.5" stroke="#ff9900" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'},
  "DynamoDB Table":{bg:'rgba(52,211,153,.12)',s:'<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><ellipse cx="7" cy="3.5" rx="4.5" ry="1.8" stroke="#34d399" stroke-width="1.2"/><path d="M2.5 3.5v3c0 1 2 1.8 4.5 1.8s4.5-.8 4.5-1.8v-3" stroke="#34d399" stroke-width="1.2"/><path d="M2.5 6.5v3c0 1 2 1.8 4.5 1.8s4.5-.8 4.5-1.8v-3" stroke="#34d399" stroke-width="1.2"/></svg>'},
  "EC2 t3.medium":{bg:'rgba(248,113,113,.12)',s:'<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="#f87171" stroke-width="1.2"/><path d="M5 5l4 4M9 5l-4 4" stroke="#f87171" stroke-width="1.2" stroke-linecap="round"/></svg>'},
  "S3 Cross-Region Replication":{bg:'rgba(52,211,153,.12)',s:'<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 9a5 5 0 015-5M12 5a5 5 0 01-5 5" stroke="#34d399" stroke-width="1.2" stroke-linecap="round"/><path d="M7 4l1.8-1.8L7 .4M7 10l-1.8 1.8 1.8 1.8" stroke="#34d399" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'},
  "Route 53 Failover Policy":{bg:'rgba(79,158,255,.12)',s:'<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7a4.5 4.5 0 109 0 4.5 4.5 0 00-9 0z" stroke="#4f9eff" stroke-width="1.2"/><path d="M7 4.5v2.5l1.8 1.5" stroke="#4f9eff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'},
  "RDS Automated Backup":{bg:'rgba(255,153,0,.12)',s:'<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v5M7 7L5 5M7 7l2-2" stroke="#ff9900" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.5 9.5h9" stroke="#ff9900" stroke-width="1.2" stroke-linecap="round"/><path d="M4.5 11.5h5" stroke="#ff9900" stroke-width="1.2" stroke-linecap="round"/></svg>'},
  "USB External Drive":{bg:'rgba(248,113,113,.12)',s:'<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="3.5" y="1.5" width="7" height="11" rx="1.5" stroke="#f87171" stroke-width="1.2"/><circle cx="7" cy="9" r="1.5" stroke="#f87171" stroke-width="1.1"/></svg>'}
};
function gNM(n){return NM[n]||{bg:'var(--b2)',s:''}}
function smallS(n){return(gNM(n).s||'').replace('width="14" height="14"','width="12" height="12"')}
function renderArch(){
  const el=document.getElementById('v-arch');
  const sc=DATA.arch[cAi];aP={};sc.zones.forEach((_,i)=>aP[i]=null);
  const tabs=DATA.arch.map((a,i)=>'<button class="atab'+(i===cAi?' active':'')+'" onclick="sA('+i+')">'+a.title+'</button>').join('');
  const nodes=sc.draggables.map((n,i)=>{const m=gNM(n);return'<div class="dn" id="dn-'+i+'" data-name="'+n+'" data-ni="'+i+'"><div class="di" style="background:'+m.bg+'">'+m.s+'</div><span>'+n+'</span></div>'}).join('');
  const zones=sc.zones.map((z,i)=>'<div class="dz" id="dz-'+i+'" data-zi="'+i+'"><div class="dzl">'+z.name+'</div><div class="dzc" id="dzc-'+i+'"><span class="dzh">Drop here</span></div></div>').join('');
  el.innerHTML='<div class="slbl">Architecture Builder</div>'
    +'<div class="anav">'+tabs+'</div>'
    +'<div class="abr"><div class="abrt"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1.5a5 5 0 110 10 5 5 0 010-10z" stroke="var(--blue)" stroke-width="1.2"/><path d="M6.5 5.5v3M6.5 4v.5" stroke="var(--blue)" stroke-width="1.3" stroke-linecap="round"/></svg> Scenario '+sc.id+' of '+DATA.arch.length+' — '+sc.title+'</div>'
    +'<div class="abrb">'+sc.brief+'</div></div>'
    +'<div class="bnk">Component Bank — drag to zones below</div>'
    +'<div class="bg">'+nodes+'</div>'
    +'<div class="zones">'+zones+'</div>'
    +'<div class="ar" id="ar"></div>'
    +'<button class="avb" onclick="valA()">Validate Architecture &#8594;</button>';
  iAD();
}
function sA(i){cAi=i;renderArch()}
function valA(){
  const sc=DATA.arch[cAi];let ok=true;const msgs=[];
  sc.zones.forEach((z,i)=>{
    const p=aP[i],el=document.getElementById('dz-'+i);
    el.classList.remove('ok','err');void el.offsetWidth;
    if(p&&sc.dm&&sc.dm[p]){msgs.push(sc.dm[p]);ok=false;el.classList.add('err');return}
    const g=p&&z.correct.includes(p);el.classList.add(g?'ok':'err');
    if(!g){ok=false;msgs.push('<strong>'+z.name+'</strong>: expected <em>'+z.correct.join(' or ')+'</em>, got <em>'+(p||'nothing')+'</em>.')}
  });
  const r=document.getElementById('ar');r.classList.remove('show','ok','err');void r.offsetWidth;
  if(ok){r.className='ar show ok';r.innerHTML=sc.wm;if(!S.doneArch.includes(sc.id)){S.doneArch.push(sc.id);giveXP(XP_R.arch);save()}}
  else{r.className='ar show err';r.innerHTML=msgs.join('<br><br>')}
  setTimeout(()=>r.scrollIntoView({behavior:'smooth',block:'nearest'}),80);
}
let dr={on:false,name:'',ni:-1,oX:0,oY:0,type:''};
function gXY(e){const t=e.touches?.[0]||e.changedTouches?.[0]||e;return{x:t.clientX,y:t.clientY}}
function iAD(){
  setTimeout(()=>{document.querySelectorAll('#v-arch .dn').forEach(el=>{el.addEventListener('mousedown',aDS);el.addEventListener('touchstart',aDS,{passive:false})})},60);
}
function aDS(e){
  const el=e.currentTarget;if(el.classList.contains('placed'))return;
  e.preventDefault();const{x,y}=gXY(e),r=el.getBoundingClientRect();
  dr={on:true,name:el.dataset.name,ni:parseInt(el.dataset.ni),oX:x-r.left,oY:y-r.top,type:'arch'};
  const g=document.getElementById('ghost');g.innerHTML=el.innerHTML;
  g.style.cssText='display:flex;left:'+r.left+'px;top:'+r.top+'px;width:'+r.width+'px;';
  el.classList.add('dsrc');
  document.addEventListener('mousemove',aDM);document.addEventListener('touchmove',aDM,{passive:false});
  document.addEventListener('mouseup',aDE);document.addEventListener('touchend',aDE);
}
function aDM(e){
  if(!dr.on||dr.type!=='arch')return;e.preventDefault();
  const{x,y}=gXY(e);
  const g=document.getElementById('ghost');g.style.left=(x-dr.oX)+'px';g.style.top=(y-dr.oY)+'px';
  document.querySelectorAll('#v-arch .dz').forEach(z=>{const r=z.getBoundingClientRect();z.classList.toggle('over',x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom)});
}
function aDE(e){
  if(!dr.on||dr.type!=='arch')return;
  document.removeEventListener('mousemove',aDM);document.removeEventListener('touchmove',aDM);
  document.removeEventListener('mouseup',aDE);document.removeEventListener('touchend',aDE);
  document.getElementById('ghost').style.display='none';
  document.querySelectorAll('.dsrc').forEach(el=>el.classList.remove('dsrc'));
  const{x,y}=gXY(e);let tgt=null;
  document.querySelectorAll('#v-arch .dz').forEach(z=>{z.classList.remove('over');const r=z.getBoundingClientRect();if(x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom)tgt=z});
  const name=dr.name,ni=dr.ni;dr.on=false;
  if(tgt)aDrop(name,ni,parseInt(tgt.dataset.zi));
}
function aDrop(name,ni,zi){
  if(aP[zi]){const prev=aP[zi];aP[zi]=null;document.querySelectorAll('#v-arch .dn').forEach(el=>{if(el.dataset.name===prev)el.classList.remove('placed')})}
  aP[zi]=name;document.getElementById('dn-'+ni).classList.add('placed');
  document.getElementById('dzc-'+zi).innerHTML='<div class="pc" onclick="aRet('+zi+','+ni+',\''+name.replace(/'/g,"\\'")+'\')">'+smallS(name)+' '+name+'<svg width="9" height="9" viewBox="0 0 9 9" fill="none" style="margin-left:6px;opacity:.4"><path d="M1.5 1.5l6 6M7.5 1.5l-6 6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></div>';
}
function aRet(zi,ni,name){
  aP[zi]=null;document.getElementById('dzc-'+zi).innerHTML='<span class="dzh">Drop here</span>';
  document.querySelectorAll('#v-arch .dn').forEach(el=>{if(el.dataset.name===name)el.classList.remove('placed')});
}
// ── SALES SCENARIOS ────────────────────────────────────────
let cSi=0;
function renderScene(){
  const el=document.getElementById('v-scene');
  const tabs=DATA.sales.map((s,i)=>'<button class="sct'+(i===cSi?' active':'')+'" onclick="sSc('+i+')">#'+(i+1)+(S.doneSales.includes(s.id)?'<span class="sdp"></span>':'')+'</button>').join('');
  const sc=DATA.sales[cSi];
  const opts=sc.opts.map((o,i)=>'<button class="sopt" id="so'+i+'" onclick="pSc('+i+')"><span class="ol">'+String.fromCharCode(65+i)+'</span>'+o.text+'</button>').join('');
  el.innerHTML='<div class="slbl">Sales Scenarios</div>'
    +'<div class="scnav">'+tabs+'</div>'
    +'<div class="scard"><div class="shdr">'
    +'<div class="sper"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="3.5" r="2" stroke="currentColor" stroke-width="1.2"/><path d="M1.5 9.5c0-2 1.6-3.5 3.5-3.5s3.5 1.5 3.5 3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>'+sc.persona+'</div>'
    +'<div class="sq">&#8220;'+sc.scenario+'&#8221;</div>'
    +'</div><div class="sbdy">'
    +'<div class="spmt">Select the strongest response:</div>'
    +'<div class="sopts">'+opts+'</div>'
    +'<div class="sfb" id="sfb"></div>'
    +'</div></div>';
}
function sSc(i){cSi=i;renderScene()}
function pSc(idx){
  const sc=DATA.sales[cSi],opt=sc.opts[idx];
  sc.opts.forEach((_,i)=>{const el=document.getElementById('so'+i);el.disabled=true;el.classList.add(sc.opts[i].ok?'ok':i===idx&&!opt.ok?'bad':'')});
  const fb=document.getElementById('sfb');fb.className='sfb show '+(opt.ok?'ok':'bad');
  fb.innerHTML='<div class="fbi">'+(opt.ok?'&#10003;':'&#10005;')+'</div>'+opt.fb;
  setTimeout(()=>fb.scrollIntoView({behavior:'smooth',block:'nearest'}),80);
  if(opt.ok&&!S.doneSales.includes(sc.id)){S.doneSales.push(sc.id);giveXP(XP_R.sales);save()}
  const tabs=DATA.sales.map((s,i)=>'<button class="sct'+(i===cSi?' active':'')+'" onclick="sSc('+i+')">#'+(i+1)+(S.doneSales.includes(s.id)?'<span class="sdp"></span>':'')+'</button>').join('');
  document.querySelector('.scnav').innerHTML=tabs;
}
// ── DEMO LAB ───────────────────────────────────────────────
let dTab='pitch',pSlots=[],pd2={on:false};
function renderDemo(){
  const el=document.getElementById('v-demo');
  el.innerHTML='<div class="slbl">Demo Lab</div>'
    +'<div class="dtabs"><button class="dtab'+(dTab==='pitch'?' active':'')+'" onclick="sDTab(\'pitch\')">&#127914; Pitch Builder</button>'
    +'<button class="dtab'+(dTab==='reframe'?' active':'')+'" onclick="sDTab(\'reframe\')">&#128260; Value Reframe</button></div>'
    +'<div id="dcontent"></div>';
  renderDC();
}
function sDTab(t){dTab=t;renderDemo()}
function renderDC(){if(dTab==='pitch')rPitch();else rReframe()}
function rPitch(){
  const d=DATA.demo.pitcher;pSlots=new Array(d.correctOrder.length).fill(null);
  const items=d.items.map((it,i)=>'<div class="pitem" id="pit'+i+'" data-id="'+it.id+'" data-pi="'+i+'"><div class="pico">'+it.ico+'</div><div><div style="font-size:13px;font-weight:600">'+it.label+'</div><div style="font-size:11px;color:var(--t3);margin-top:1px">'+it.desc+'</div></div></div>').join('');
  const slots=d.correctOrder.map((_,i)=>'<div class="pslot" id="pslot'+i+'" data-si="'+i+'"><span class="psn">'+(i+1)+'</span><span class="psh" id="psh'+i+'">Drop step '+(i+1)+' here</span></div>').join('');
  document.getElementById('dcontent').innerHTML='<div class="pbrf">Sequence a <strong>winning enterprise pitch</strong>. Drag each component into the correct order. A pitch that opens with the solution loses the economic buyer before slide 2.</div>'
    +'<div class="bnk">Pitch Components</div><div class="pbnk">'+items+'</div>'
    +'<div class="bnk">Correct Sequence (1 = First)</div><div class="pslots">'+slots+'</div>'
    +'<div class="dr" id="dr"></div>'
    +'<button class="dvb" onclick="valP()">Check Sequence &#8594;</button>';
  iPD();
}
function iPD(){
  setTimeout(()=>{document.querySelectorAll('.pitem').forEach(el=>{el.addEventListener('mousedown',pDS);el.addEventListener('touchstart',pDS,{passive:false})})},60);
}
function pDS(e){
  const el=e.currentTarget;if(el.classList.contains('placed'))return;
  e.preventDefault();const{x,y}=gXY(e),r=el.getBoundingClientRect();
  pd2={on:true,id:el.dataset.id,pi:parseInt(el.dataset.pi),oX:x-r.left,oY:y-r.top};
  const g=document.getElementById('ghost');
  const lbl=DATA.demo.pitcher.items.find(x=>x.id===el.dataset.id)?.label||el.dataset.id;
  g.innerHTML='<span style="font-size:13px;font-weight:600">'+lbl+'</span>';
  g.style.cssText='display:flex;left:'+r.left+'px;top:'+r.top+'px;min-width:160px;';
  el.classList.add('dsrc');
  document.addEventListener('mousemove',pDM);document.addEventListener('touchmove',pDM,{passive:false});
  document.addEventListener('mouseup',pDE);document.addEventListener('touchend',pDE);
}
function pDM(e){
  if(!pd2.on)return;e.preventDefault();const{x,y}=gXY(e);
  const g=document.getElementById('ghost');g.style.left=(x-pd2.oX)+'px';g.style.top=(y-pd2.oY)+'px';
  document.querySelectorAll('.pslot').forEach(z=>{const r=z.getBoundingClientRect();z.classList.toggle('over',x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom)});
}
function pDE(e){
  if(!pd2.on)return;
  document.removeEventListener('mousemove',pDM);document.removeEventListener('touchmove',pDM);
  document.removeEventListener('mouseup',pDE);document.removeEventListener('touchend',pDE);
  document.getElementById('ghost').style.display='none';
  document.querySelectorAll('.dsrc').forEach(el=>el.classList.remove('dsrc'));
  const{x,y}=gXY(e);let tgt=null;
  document.querySelectorAll('.pslot').forEach(z=>{z.classList.remove('over');const r=z.getBoundingClientRect();if(x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom)tgt=z});
  const id=pd2.id,pi=pd2.pi;pd2.on=false;
  if(tgt)pDrop(id,pi,parseInt(tgt.dataset.si));
}
function pDrop(id,pi,si){
  if(pSlots[si]){const prev=pSlots[si];pSlots[si]=null;document.querySelectorAll('.pitem').forEach(el=>{if(el.dataset.id===prev)el.classList.remove('placed')});document.getElementById('pslot'+si).innerHTML='<span class="psn">'+(si+1)+'</span><span class="psh">Drop step '+(si+1)+' here</span>'}
  pSlots[si]=id;document.getElementById('pit'+pi).classList.add('placed');
  const lbl=DATA.demo.pitcher.items.find(x=>x.id===id)?.label||id;
  document.getElementById('pslot'+si).innerHTML='<span class="psn">'+(si+1)+'</span><span style="font-size:13px;font-weight:600;cursor:pointer" onclick="pRet('+si+','+pi+',\''+id+'\')">'+lbl+' <span style="font-size:10px;opacity:.5">&#10005;</span></span>';
}
function pRet(si,pi,id){
  pSlots[si]=null;document.getElementById('pslot'+si).innerHTML='<span class="psn">'+(si+1)+'</span><span class="psh">Drop step '+(si+1)+' here</span>';
  document.querySelectorAll('.pitem').forEach(el=>{if(el.dataset.id===id)el.classList.remove('placed')});
}
function valP(){
  const cor=DATA.demo.pitcher.correctOrder;let ok=true;
  pSlots.forEach((id,i)=>{const s=document.getElementById('pslot'+i);s.classList.remove('ok','err');void s.offsetWidth;if(!id){ok=false;s.classList.add('err');return}if(id===cor[i])s.classList.add('ok');else{ok=false;s.classList.add('err')}});
  const r=document.getElementById('dr');r.classList.remove('show','ok','err');void r.offsetWidth;
  if(ok){r.className='dr show ok';r.innerHTML='&#10003; <strong>Correct sequence.</strong><br><br>'+DATA.demo.pitcher.explanation;if(!S.doneDemo.includes('pitch')){S.doneDemo.push('pitch');giveXP(XP_R.demo);save()}}
  else{r.className='dr show err';r.innerHTML='&#10005; Not quite. The Economic Buyer must feel the pain before they\'re ready to hear your solution. Sequence: Hook &rarr; Problem &rarr; Cost of Inaction &rarr; Solution &rarr; CTA.'}
  setTimeout(()=>r.scrollIntoView({behavior:'smooth',block:'nearest'}),80);
}
function rReframe(){
  const cards=DATA.demo.reframe.map((q,qi)=>{
    const opts=q.opts.map((o,oi)=>'<button class="rcopt" id="rc'+qi+'-'+oi+'" onclick="pRF('+qi+','+oi+')">'
      +'<span style="display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:5px;background:var(--b4);border:1px solid var(--br2);font-size:9px;font-weight:800;color:var(--t2);margin-right:8px;vertical-align:middle">'+String.fromCharCode(65+oi)+'</span>'
      +o+'</button>').join('');
    return'<div class="rcard"><div class="rchdr"><div class="rcn">Statement '+(qi+1)+' of '+DATA.demo.reframe.length+'</div>'
      +'<div class="rcf">'+q.feature+'</div></div>'
      +'<div class="rcbdy"><div class="rcpmt">Which reframe speaks to the Economic Buyer?</div>'
      +'<div class="rcopts">'+opts+'</div>'
      +'<div class="rfb" id="rfb'+qi+'"></div></div></div>';
  }).join('');
  document.getElementById('dcontent').innerHTML=cards;
}
function pRF(qi,oi){
  const q=DATA.demo.reframe[qi];const ok=oi===q.ci;
  q.opts.forEach((_,i)=>{const el=document.getElementById('rc'+qi+'-'+i);if(!el)return;el.disabled=true;if(i===q.ci)el.classList.add('ok');else if(i===oi&&!ok)el.classList.add('bad')});
  const fb=document.getElementById('rfb'+qi);fb.className='rfb show '+(ok?'ok':'bad');
  fb.innerHTML='<strong>'+(ok?'&#10003; Correct.':'&#10005; Wrong.')+'</strong> '+q.exp;
  setTimeout(()=>fb.scrollIntoView({behavior:'smooth',block:'nearest'}),80);
  if(ok){const k='rf'+qi;if(!S.doneDemo.includes(k)){S.doneDemo.push(k);giveXP(XP_R.demo);save()}}
}
// ── ONBOARDING ─────────────────────────────────────────────
function isFirst(){return!S.seenOb&&S.xp===0&&DATA.flashcards.every(c=>S.fcs[c.id]&&S.fcs[c.id].nextDue===0)}
function showOB(){
  const m=document.getElementById('ob');m.classList.remove('hidden');
  document.getElementById('ob-start').addEventListener('click',()=>{m.classList.add('hidden');S.seenOb=true;save()},{once:true});
}
// ── BOOT ───────────────────────────────────────────────────
function boot(){recalcLvl();refreshH();refreshLk();renderFlash();if(isFirst())setTimeout(showOB,500)}
boot();

// EXAM & THREATS LOGIC
let examState = { idx: 0, score: {}, active: false, timer: null };

function startExam() {
  examState = { idx: 0, score: {}, active: true, timer: null };
  renderExamQ();
}

function renderExamQ() {
  if (examState.idx >= DATA.exam.length) return finishExam();
  let q = DATA.exam[examState.idx];
  let h = `
    <div class="glass-panel p-6 mb-4">
      <div style="font-size: 0.875rem; color: #60a5fa; margin-bottom: 0.5rem;">Question ${examState.idx + 1} of ${DATA.exam.length}</div>
      <h3 style="font-size: 1.25rem; font-weight: bold; color: white; margin-bottom: 1rem;">${q.q}</h3>
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        ${q.opts.map((opt, i) => `
          <button class="exam-btn" style="text-align: left; padding: 1rem; border-radius: 0.75rem; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: #d1d5db; transition: all 0.2s; cursor: pointer;" onclick="ansExam(${i}, ${q.a === i})">
            ${opt}
          </button>
        `).join('')}
      </div>
      <div style="height: 0.5rem; width: 100%; background: rgba(255,255,255,0.1); margin-top: 1.5rem; border-radius: 999px; overflow: hidden;">
        <div id="exam-timer-bar" style="height: 100%; background: #3b82f6; transition: width 1s linear; width: 100%;"></div>
      </div>
    </div>
  `;
  document.getElementById('v-exam').innerHTML = h;
  startExamTimer();
}

function startExamTimer() {
  clearInterval(examState.timer);
  let left = 90;
  examState.timer = setInterval(() => {
    left--;
    let bar = document.getElementById('exam-timer-bar');
    if (bar) {
      bar.style.width = (left / 90 * 100) + '%';
      if (left <= 20) bar.style.background = '#ef4444'; // Red
    }
    if (left <= 0) {
      clearInterval(examState.timer);
      ansExam(-1, false);
    }
  }, 1000);
}

function ansExam(selected, isCorrect) {
  clearInterval(examState.timer);
  let btns = document.getElementById('v-exam').querySelectorAll('.exam-btn');
  let q = DATA.exam[examState.idx];
  
  // Highlight
  btns.forEach(b => b.style.pointerEvents = 'none');
  if (selected >= 0) {
      btns[selected].style.background = isCorrect ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)';
      btns[selected].style.borderColor = isCorrect ? '#22c55e' : '#ef4444';
  }
  if (!isCorrect && selected !== -1) {
      btns[q.a].style.background = 'rgba(34,197,94,0.2)';
      btns[q.a].style.borderColor = '#22c55e';
  }
  
  if (isCorrect) {
    let domain = q.domain || 'General';
    examState.score[domain] = (examState.score[domain] || 0) + 1;
  }
  
  // Append explanation
  let exp = document.createElement('div');
  exp.style.marginTop = '1rem';
  exp.style.padding = '1rem';
  exp.style.background = 'rgba(255,255,255,0.05)';
  exp.style.borderRadius = '0.75rem';
  exp.style.color = '#9ca3af';
  exp.style.fontSize = '0.875rem';
  exp.innerHTML = `<strong>Feedback:</strong> ${q.exp}`;
  document.getElementById('v-exam').firstElementChild.appendChild(exp);
  
  setTimeout(() => {
    examState.idx++;
    renderExamQ();
  }, 4000);
}

function finishExam() {
  let breakdown = Object.entries(examState.score).map(([k, v]) => `<div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;"><span style="color: #9ca3af;">${k}</span><span style="font-weight: bold; color: white;">${v}</span></div>`).join('');
  let h = `
    <div class="glass-panel p-6 text-center" style="max-width: 500px; margin: 0 auto;">
      <h2 style="font-size: 1.5rem; color: #60a5fa; margin-bottom: 1.5rem; font-weight: bold;">Exam Complete</h2>
      <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 0.75rem; padding: 1rem; margin-bottom: 1.5rem; text-align: left;">
        <h3 style="font-size: 0.875rem; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">Domain Performance</h3>
        ${breakdown || '<span style="color: #9ca3af;">No points scored.</span>'}
      </div>
      <button style="background: #2563eb; color: white; font-weight: bold; padding: 0.75rem 1.5rem; border-radius: 0.75rem; border: none; cursor: pointer; width: 100%; transition: background 0.2s;" onmouseover="this.style.background='#1d4ed8'" onmouseout="this.style.background='#2563eb'" onclick="startExam()">Retake Exam</button>
    </div>
  `;
  document.getElementById('v-exam').innerHTML = h;
}

// THREAT INTEL LOGIC
function renderThreats() {
  let h = `<div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 600px; margin: 0 auto;">`;
  DATA.threats.forEach((t, i) => {
    h += `
      <div class="glass-panel p-6" style="border-left: 4px solid #ef4444;">
        <div style="color: #f87171; font-size: 0.875rem; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">Threat Intel Scenario</div>
        <h3 style="font-size: 1.25rem; color: white; font-weight: bold; margin-bottom: 1rem;">${t.title}</h3>
        <p style="color: #d1d5db; line-height: 1.6; margin-bottom: 1.5rem;">${t.scenario}</p>
        <p style="color: white; font-weight: bold; margin-bottom: 1rem;">${t.question}</p>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;" id="threat-opts-${i}">
          ${t.opts.map((opt, optIdx) => `
            <button class="threat-btn-${i}" style="text-align: left; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: #9ca3af; cursor: pointer;" onclick="ansThreat(${i}, ${optIdx}, ${t.a === optIdx})">${opt}</button>
          `).join('')}
        </div>
        <div id="threat-exp-${i}" style="display: none; margin-top: 1rem; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 0.5rem; border: 1px solid rgba(255,255,255,0.1); color: #d1d5db; font-size: 0.875rem;">
          <strong>Analysis:</strong> ${t.exp}
        </div>
      </div>
    `;
  });
  h += `</div>`;
  document.getElementById('v-threats').innerHTML = h;
}

function ansThreat(tIdx, optIdx, isCorrect) {
  let btns = document.querySelectorAll(`.threat-btn-${tIdx}`);
  btns.forEach(b => b.style.pointerEvents = 'none');
  
  if (isCorrect) {
    btns[optIdx].style.background = 'rgba(34,197,94,0.2)';
    btns[optIdx].style.borderColor = '#22c55e';
    btns[optIdx].style.color = 'white';
  } else {
    btns[optIdx].style.background = 'rgba(239,68,68,0.2)';
    btns[optIdx].style.borderColor = '#ef4444';
    btns[optIdx].style.color = 'white';
    // Highlight correct
    let correctIdx = DATA.threats[tIdx].a;
    btns[correctIdx].style.background = 'rgba(34,197,94,0.2)';
    btns[correctIdx].style.borderColor = '#22c55e';
    btns[correctIdx].style.color = 'white';
  }
  
  document.getElementById(`threat-exp-${tIdx}`).style.display = 'block';
}

// Add hover effect style globally for exam buttons
const style = document.createElement('style');
style.innerHTML = `
  .exam-btn:hover { background: rgba(255,255,255,0.1) !important; }
  .threat-btn-0:hover, .threat-btn-1:hover, .threat-btn-2:hover { background: rgba(255,255,255,0.1) !important; color: white !important; }
`;
document.head.appendChild(style);


// Force Initialization
if(typeof renderFlash==='function') renderFlash();
if(typeof renderArch==='function') renderArch();
if(typeof renderScene==='function') renderScene();
if(typeof startExam==='function') startExam();
if(typeof renderThreats==='function') renderThreats();
