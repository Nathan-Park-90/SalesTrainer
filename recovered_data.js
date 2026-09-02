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
   analogy:"Kempo: Don't open with your strongest technique against an opponent who doesn't know they're sparring. Start with a controlled probe that reveals whether they're engaged. The CFO's response is your stance read."},
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
   front:"Build the skeleton of a competitive battle card for a deal where the client mentions they're also evaluating CrowdStrike.",
   back:"<strong>Their Strength</strong> (acknowledge it): CrowdStrike Falcon has best-in-class threat intelligence and is the market leader in EDR with the deepest kernel-level telemetry. <strong>Their Weakness</strong> (specific): CrowdStrike is endpoint-first. Clients needing unified SIEM + SOAR + XDR in a single data lake face significant integration overhead and multi-vendor licensing cost. <strong>Your Strength:</strong> Native XDR correlating endpoint, identity, network, and cloud telemetry in one data lake — no integration tax. <strong>Trap Question</strong> (ask in discovery, not battle): <em>\"How many security tools is your team managing, and what percent of analyst time goes to triage versus active threat hunting?\"</em> 5+ tools and 50%+ triage time = your wedge.",
   analogy:"Know your competitor's strategy before entering the same trade. Where are they long? Where are their stops? The battle card is your competitive tape read — understanding how your opponent is positioned so you can find the uncovered angle."},
  {id:30,cat:'Demo',
   front:"You're 10 minutes into a demo. The CTO interrupts: 'Your competitor does the same thing for 30% less.' You have 60 seconds. What do you say and what do you not do?",
   back:"Don't defend your price. Don't attack the competitor. Reanchor to value: <em>\"That's worth exploring — I want to make sure we're comparing equivalent outcomes. Before we go there: you told me earlier that [specific pain] was costing you [their number] per [period]. If we can reliably solve that, what's the right investment level for that result?\"</em> Let them restate the value case. Then: <em>\"Our job is to determine whether the outcomes are actually equivalent — in my experience with [competitor], they typically diverge on [specific dimension]. Let me show you where.\"</em> Price objections in technical deals are almost always value articulation failures from earlier in discovery.",
   analogy:"When MSTR pulls back 8% intraday on no news, you don't panic-sell. You return to your thesis. Is the thesis still intact? If yes, the pullback is noise. The price objection is a pullback in the deal. Return to your fundamental case before reacting to the price action."}
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
   explanation:"Most SEs open with the Solution Mechanism — they go straight to the architecture diagram. The Economic Buyer tunes out before slide 3. The correct sequence builds urgency before presenting the answer: Hook (they recognize the context) &rarr; Problem (they feel the pain) &rarr; Cost of Inaction (the pain is now time-sensitive) &rarr; Solution (now they're ready to hear it) &rarr; CTA (momentum, not ambiguity)."
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
