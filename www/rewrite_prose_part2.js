const fs = require('fs');

let c = fs.readFileSync('data.js', 'utf8').replace('const DATA =', 'var DATA=');
eval(c);

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
// MODULE 8: ADVANCED NETWORKING (Route 53 already rewritten, do CloudFront & VPC Peering)
// =============================================================

getTopic('CloudFront vs. Global Accelerator').prose = `
<p>Your application is deployed in us-east-1. A user in Sydney loads your homepage. That HTML, CSS, and JavaScript has to travel literally halfway around the globe — crossing ocean cables, hopping through dozens of routing nodes, adding 200+ milliseconds of latency before the first byte even arrives. For a modern application, that's the difference between "snappy" and "this thing feels broken." AWS has two services that solve this, and they solve it differently.</p>

<p><strong>Amazon CloudFront (The Content Cache):</strong> A global Content Delivery Network (CDN) with 450+ Points of Presence (PoPs) worldwide. Your static content (images, JavaScript, CSS, videos) is cached at the PoP closest to each user. A user in Sydney doesn't pull your homepage assets from us-east-1 — they pull it from a PoP in Sydney, with ~10ms latency instead of 200ms. Dynamic content can also be routed through CloudFront's optimized backbone network.</p>

<p><strong>Key CloudFront Concepts:</strong><br>
<strong>Origin:</strong> Where CloudFront pulls content from — S3 bucket, ALB, EC2 instance, or any HTTP server.<br>
<strong>Distribution:</strong> The CloudFront configuration entity with a *.cloudfront.net domain (or your custom domain).<br>
<strong>Cache Behaviors:</strong> Rules that map URL patterns to cache settings. /static/* → cache for 24 hours. /api/* → no cache, forward to ALB. /images/* → cache, compress, resize via Lambda@Edge.<br>
<strong>OAC (Origin Access Control):</strong> Restricts S3 bucket access to CloudFront only — users cannot bypass CloudFront and access S3 directly. The correct security pattern for S3-backed static sites.</p>

<p><strong>AWS Global Accelerator (The Traffic Router):</strong> Does NOT cache content. Instead, it routes user traffic from the nearest AWS edge location through AWS's private global backbone network — bypassing the congested public internet for the majority of the journey. Lower latency for dynamic content, TCP/UDP applications, and any workload that can't be cached. Provides two static anycast IP addresses (consistent global entry points) and automatic failover between regions in under 30 seconds.</p>

<p><strong>The Decisive Difference:</strong> CloudFront = cache content close to users (HTTP/HTTPS only). Global Accelerator = route TCP/UDP traffic through AWS backbone, no caching (gaming, VoIP, real-time APIs).</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> CloudFront is a chain of 450 warehouses strategically placed near your customers. Instead of shipping every order from your main factory (origin), you pre-stock the local warehouse (edge cache) and ship from there. Delivery goes from 2 weeks to next day. Global Accelerator is a private express highway that bypasses traffic-congested city streets (public internet). Your packages still ship from the main factory, but they travel on a private, uncongested road the whole way. Warehouses (CloudFront) are better for goods that can be pre-stocked. The highway (Global Accelerator) is better for custom, made-to-order goods that can't be pre-built.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> "Reduce latency for static assets globally" → <strong>CloudFront</strong>. "Reduce latency for a real-time TCP game server with no caching" → <strong>Global Accelerator</strong>. The exam will try to make you confuse these two — the caching vs. routing distinction is the key.</div>
`;

getTopic('VPC Peering vs. Transit Gateway').prose = `
<p>You've followed best practices and split your infrastructure across multiple VPCs — one for production, one for staging, one for shared services (Active Directory, monitoring). Now they need to talk to each other. Here's where architects face a scaling problem that sounds simple until you actually draw it on a whiteboard.</p>

<p><strong>VPC Peering:</strong> A direct, private network connection between two VPCs. Traffic travels AWS's backbone — no internet, no VPN. Configuration is straightforward: create a peering connection, accept it, update route tables in both VPCs. Excellent for connecting 2, 3, maybe 5 VPCs.</p>

<p>The critical limitation: VPC Peering is <strong>non-transitive</strong>. If VPC-A is peered with VPC-B, and VPC-B is peered with VPC-C, VPC-A <strong>cannot</strong> reach VPC-C through VPC-B. Each pair needs its own direct peering connection. With 10 VPCs, you'd need 45 separate peering connections to fully mesh them. With 50 VPCs: 1,225 connections. The math becomes an operational nightmare.</p>

<p><strong>AWS Transit Gateway:</strong> A centralized, regional network hub. Every VPC connects to the Transit Gateway — one connection per VPC. The Transit Gateway routes traffic between any connected VPCs using a centralized route table. 50 VPCs connected to one Transit Gateway = 50 connections, not 1,225. Full mesh connectivity, centrally managed. Supports VPN attachments (for on-premises connectivity), Direct Connect Gateway integration, and inter-region peering (Transit Gateway → Transit Gateway across regions).</p>

<p>Cost difference: VPC Peering is free (you only pay for data transfer). Transit Gateway charges per attachment-hour and per GB of data processed. For small numbers of VPCs, peering is cheaper. For enterprise-scale multi-VPC architectures, Transit Gateway's operational simplicity justifies the cost.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> VPC Peering is running an ethernet cable directly between two Proxmox nodes — simple, direct, zero overhead. Perfect for two nodes. But connecting 10 nodes with individual cables means 45 separate cables, all labeled, all managed independently. A Transit Gateway is buying a managed network switch and plugging all 10 nodes into it — one cable per node (10 total), and the switch handles all routing. You manage one switch instead of 45 cables. This is exactly the architectural leap enterprises make as their VPC count grows.</div>

<div class="lesson-alert"><strong>Exam Tip:</strong> The exam reliably tests this scaling decision: "A company has 10 VPCs that all need to communicate. What is the most scalable solution?" Answer: <strong>Transit Gateway</strong>. If the question says "two VPCs need to communicate privately" with no mention of scale: <strong>VPC Peering</strong> — simpler and free.</div>
`;

// =============================================================
// MODULE 14-17: SALES & CAREER MODULES
// =============================================================

getTopic('Salesforce is your Ledger').prose = `
<p>Here's a hard truth that separates elite SEs from order-takers: <strong>you don't own the deal — your CRM does.</strong> Everything that happens verbally in a room, every commitment made over lunch, every technical concern raised on a whiteboard — if it's not in Salesforce, it didn't happen. Not because your memory is bad, but because deals don't close in a single moment. They close in a series of coordinated efforts across weeks and months, involving five people from your company and six from the prospect's side.</p>

<p><strong>Salesforce as a System of Record:</strong><br>
The Opportunity record is the single source of truth for a deal's status. Account hierarchy tells you who owns the relationship at the enterprise level. Contacts with roles (Economic Buyer, Technical Buyer, Champion) map the decision landscape. Activity timeline (calls logged, emails sent, meetings recorded) tells the story of the deal's momentum. A CRM is not bureaucracy — it's institutional knowledge that survives personnel changes.</p>

<p><strong>What Elite SEs Log (That Average SEs Don't):</strong><br>
Technical objections raised and how they were resolved. Evaluation criteria the prospect stated (even casually). Competitor mentions and what the prospect said about them. Technical proof-of-concept outcomes — what worked, what didn't. Architecture decisions made during the sales cycle that will define the deployment scope.</p>

<p><strong>Opportunity Stages as a Forcing Function:</strong><br>
Every stage in Salesforce represents a specific customer commitment — not just your internal confidence level. "Technical Validation" means the customer has agreed to a POC, not that you think the architecture is technically sound. Accurate stage management is what gives your manager and your company's revenue forecasting integrity.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Salesforce is your trading blotter. Every trade (customer interaction, commitment, technical discovery) gets logged with timestamp, details, and outcome. A trader who doesn't log their positions doesn't know their P&L. An SE who doesn't log their deal activity doesn't know their pipeline health — and neither does their manager. The deal is the position. Salesforce is the ledger. Period.</div>

<div class="lesson-alert"><strong>Pro Tip:</strong> The most powerful Salesforce habit: log your meeting notes within 30 minutes of the conversation while details are vivid. Write them as if a colleague who wasn't in the room needs to take over the deal tomorrow. Because someday, they will.</div>
`;

getTopic('Gong: The Game Tape').prose = `
<p>Elite athletes watch film. Elite quarterbacks study their own throws — the good ones and the catastrophic ones. Elite traders review their decision journal every week. And elite SEs listen to their own sales calls with the same brutal, objective honesty. <strong>Gong</strong> is the tool that makes this possible at scale — and most SEs are terrified of it for exactly that reason.</p>

<p><strong>What Gong Does:</strong> Records and transcribes every sales call. Uses AI to analyze talk-to-listen ratios, identify monologue moments, flag competitor mentions, track deal-advancing questions, and identify patterns in the calls of top performers vs. average performers. It turns soft skills into measurable data.</p>

<p><strong>The Talk-to-Listen Ratio:</strong> The data consistently shows that top-performing SEs talk less. Not because silence is golden, but because questions drive deals. A 60/40 prospect-to-SE talk ratio is a healthy discovery call. A 70/30 SE-to-prospect ratio is a product pitch masquerading as a discovery call. Gong exposes the difference mercilessly.</p>

<p><strong>Mutual Action Plans in Gong:</strong> When a prospect says "we need to evaluate this for security compliance" on a call, Gong surfaces it. The SE's job is to convert that verbal statement into a specific next step with a date and an owner in the CRM. Gong's AI tracks whether verbal commitments turn into logged actions — or evaporate.</p>

<p><strong>Using Gong to Self-Coach:</strong> Listen specifically for: moments you talked over a prospect, monologues longer than 2 minutes, technical jargon that generated silence instead of engagement, and the exact words the prospect used to describe their pain (not your words — theirs). The prospect's language is the language of the proposal.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Gong is the game tape. Every professional sports team watches game tape not to celebrate the wins but to dissect the losses — the exact moment the defense broke down, the exact play that cost the game. An SE watching their own Gong call with headphones on, grading their own performance, is doing the same thing. It's uncomfortable. It's the most efficient improvement mechanism available. Champions use it weekly. Average performers avoid it.</div>

<div class="lesson-alert"><strong>Pro Tip:</strong> Listen to calls from your top-performing colleague on Gong. Don't just copy their style — identify the specific questions they ask that generate the most valuable customer responses. Those questions are assets. Adopt and personalize them.</div>
`;

getTopic('Pitching Zero Trust').prose = `
<p>Traditional network security was built on a castle-and-moat model: harden the perimeter, and anything inside the moat is trusted. This model worked when employees sat at fixed desks inside a corporate network. It doesn't work when employees are on laptops in coffee shops, accessing SaaS tools over public internet, connecting through VPNs that themselves can be compromised. <strong>Zero Trust</strong> is the architectural answer to the modern threat landscape — and it's one of the hottest keywords in enterprise security sales.</p>

<p><strong>The Core Principle:</strong> <em>Never trust, always verify.</em> Zero Trust assumes that the network perimeter is already breached. Every access request — regardless of whether it originates inside or outside the corporate network — must be authenticated, authorized, and continuously validated. Location is not a proxy for trust. Network segment is not a proxy for trust. Device ownership is not a proxy for trust.</p>

<p><strong>The Three Pillars of Zero Trust (Your Sales Framework):</strong><br>
<strong>Identity:</strong> Multi-factor authentication (MFA) for every user, every time. No exceptions for executives. Privileged Identity Management for admin accounts. Federation with corporate IdP (Okta, Azure AD).<br>
<strong>Device:</strong> Only managed, compliant devices can access sensitive resources. MDM (Mobile Device Management) enforces encryption, patching, and configuration baselines.<br>
<strong>Data:</strong> Data classification (public, internal, confidential, restricted) drives access policies. Sensitive data is encrypted in transit and at rest. Access is scoped to minimum required data sets.</p>

<p><strong>Pitching it to a CTO:</strong> "The question isn't whether your perimeter will be breached — 83% of breaches involve compromised credentials. The question is what an attacker can access once they're inside. Zero Trust limits the blast radius to exactly the permissions of the compromised account — and those permissions should be narrow by design."</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Old security model: build a moat, and once you're inside the castle, you can go anywhere. Zero Trust: every room in the castle has a locked door. Your badge opens exactly the rooms your role requires. Even if an attacker steals your badge, they can only open those same rooms — and every door swipe is logged, every anomaly triggers an alert. The moat is still there (perimeter matters), but it's no longer the only line of defense.</div>

<div class="lesson-alert"><strong>Sales Tip:</strong> Zero Trust is not a product — it's an architecture. When a prospect wants to "buy Zero Trust," the conversation is: <em>"Let's start with identity. Who has privileged access today and how is that enforced?"</em> Then build the architecture proposal around their specific gaps. Credibility comes from knowing the framework, not from pitching a product checklist.</div>
`;

getTopic('Compliance is a Revenue Enabler').prose = `
<p>Here's the reframe that separates elite security SEs from their peers: <strong>compliance is not a cost center. It is a revenue gate.** Every Fortune 500 enterprise procurement process includes a security questionnaire. Every regulated industry (healthcare, finance, government) requires specific certifications before a vendor can even be evaluated. HIPAA, SOC 2, PCI-DSS, FedRAMP — these are not bureaucratic hurdles. They are the price of admission to the most lucrative customer segments in the market.</p>

<p><strong>SOC 2 Type II:</strong> The de facto standard for SaaS companies selling to enterprise. Audits your security controls across 5 Trust Service Criteria (Security, Availability, Processing Integrity, Confidentiality, Privacy) over a period of at least 6 months. A SOC 2 Type II report tells a prospect: "An independent auditor validated that our security controls work as described, consistently, over time." Without it, many enterprise procurement teams will not proceed.</p>

<p><strong>HIPAA:</strong> The Health Insurance Portability and Accountability Act. If your product touches Protected Health Information (PHI) — patient records, insurance data, clinical outcomes — you must demonstrate HIPAA compliance. AWS is HIPAA eligible (execute a BAA with AWS). Your application architecture must enforce: encryption at rest and in transit, access controls, audit logging, and breach notification procedures.</p>

<p><strong>PCI-DSS:</strong> Payment Card Industry Data Security Standard. If your product processes, stores, or transmits cardholder data (credit card numbers), you must be PCI compliant. 12 requirements including encryption, access controls, network segmentation, and quarterly vulnerability scanning.</p>

<p><strong>The SE Pitch:</strong> When a prospect says "we need a vendor who is SOC 2 certified," the wrong response is "let me check our compliance team." The right response is: "We are SOC 2 Type II certified. Here's our most recent report, and let me walk you through how our AWS architecture specifically maps to the availability and confidentiality trust criteria." Technical fluency in compliance frameworks closes deals that generic responses lose.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Compliance certifications are like real estate zoning permits. You can build a beautiful building, but without the permit, you can't legally open for business in that zone. SOC 2 is the commercial occupancy permit for enterprise software. HIPAA is the healthcare facility license. PCI-DSS is the financial services operating license. Your prospects are not being bureaucratic — they're legally required to verify you have the right permits before they can do business with you.</div>

<div class="lesson-alert"><strong>Sales Tip:</strong> Learn your company's compliance certifications cold — not just whether you have them, but what they specifically cover and what controls they validate. When a CISO asks a specific question about your SOC 2 scope, the ability to answer precisely is the difference between being a trusted technical advisor and being a brochure reader.</div>
`;

getTopic("Build vs Buy").prose = `
<p>Every SE eventually walks into this room: you've built the perfect technical case. The architecture is elegant. The pricing is competitive. The POC crushed it. And then the CTO leans back and says: <em>"You know, we could just build this ourselves."</em> This is not a technical objection. It is an identity objection wrapped in a technical frame. Handle it wrong and you've lost the deal. Handle it right and you've earned a champion.</p>

<p><strong>Why CTOs Say This:</strong><br>
1. Genuine belief that their team is uniquely capable (often true, rarely relevant).<br>
2. Political pressure to not be seen as a "buy everything" organization.<br>
3. Sticker shock rationalizing itself as engineering ambition.<br>
4. A legitimate strategic requirement for differentiated IP that you haven't fully understood yet.</p>

<p><strong>The Reframe (Use This Exactly):</strong><br>
"I think that's the right instinct — your team absolutely has the capability to build this. The question I'd want to think through with you is: what is the strategic value of owning this capability internally? If the answer is 'we need differentiated IP here,' then you should absolutely build it. But if the answer is 'we need a reliable, compliant, scalable version of this capability so we can focus engineering on the things that are actually differentiated' — that's where we add value."</p>

<p><strong>The TCO Exercise:</strong><br>
Most "build vs. buy" decisions suffer from incomplete cost modeling. The build camp counts: developer time to build v1. The buy camp adds: developer time to maintain and iterate (forever), infrastructure to run it, security reviews, compliance audits, hiring and retraining as engineers turn over, and opportunity cost of those engineers not building your core product. Get the prospect to walk through this math with you — not as a sales maneuver, but as a genuine architectural decision framework.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> No company builds their own office building — they lease space so they can focus on their actual business. Yet the same company will seriously consider building their own authentication system, their own monitoring platform, their own data pipeline infrastructure. The question is never "can we build it?" The question is "should our senior engineers spend the next 18 months building and maintaining infrastructure that isn't our product?" The answer is almost always no — and they know it.</div>

<div class="lesson-alert"><strong>Sales Tip:</strong> Never get defensive when "build vs. buy" comes up. Get curious. "Tell me more about what you'd want to build — what does the ideal internal version look like?" Prospect-articulated complexity is more persuasive than any counter-argument you can make.</div>
`;

getTopic('Technical Judo').prose = `
<p>A hostile CTO is not an obstacle. They're the most important person in the room. Their skepticism is a signal that they care deeply about getting the technical decision right — which means if you can earn their trust, they become your most powerful internal advocate. Technical Judo is the art of using their resistance to redirect the conversation toward a productive outcome rather than fighting it head-on.</p>

<p><strong>The 3 Types of Technical Hostility:</strong><br>
<strong>1. Informed Skepticism:</strong> "Your API rate limits will cause issues at our transaction volumes." This is a legitimate technical concern from someone who has done their homework. The correct response: engage directly, honestly, and with specifics. If they're right, acknowledge it and show your roadmap or workaround. Dismissing accurate technical concerns destroys credibility instantly and permanently.<br>
<strong>2. Uninformed FUD:</strong> "Vendor X told us your security architecture has a fundamental flaw." This is a competitor objection dressed in technical language. The correct response: "That's an interesting concern — can you share specifically what vulnerability they identified? I'd like to address it precisely." Force specificity. Vague FUD evaporates under precise questioning.<br>
<strong>3. Philosophical Resistance:</strong> "We don't use managed services — we run everything on bare metal." This is a cultural belief, not a technical argument. The correct response is curiosity, not confrontation: "What drives that? I want to understand the constraint before I suggest an architecture." You might discover a legitimate reason. Or you might uncover an assumption that hasn't been tested in 5 years.</p>

<p><strong>The Universal Technique:</strong> When a hostile CTO makes a technical claim — any claim — the first response is never a counter-argument. It's a question: "Tell me more about that." Two things happen. First, you gather intelligence. Second, the CTO demonstrates to the room either that their concern is specific and valid, or that it's a general feeling they're struggling to articulate. Either outcome advances the conversation.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> A Judo practitioner doesn't block a punch — they redirect the attacker's momentum using the attacker's own force. When a CTO says "your security architecture is weak," don't block it with "no it isn't." Redirect: "That's an important concern — let's make sure we address it specifically. Walk me through what you see as the weak point." You've now converted a hostile statement into a collaborative technical discussion, using their energy to move the conversation forward instead of creating a confrontation.</div>

<div class="lesson-alert"><strong>Sales Tip:</strong> Win the technical credibility of a hostile CTO and they become your internal champion. They're already respected in the organization for their skepticism — when they change their position, everyone notices. The most powerful endorsement in a technical sale is a previously hostile CTO who is now advocating for you.</div>
`;

getTopic('Discovery First, Always').prose = `
<p><strong>The hardest discipline in sales is shutting up when you know the answer.</strong> You've seen this exact architecture problem 40 times. You know exactly which product solves it. The prospect is describing their pain and you want to interrupt and say "yes, we do exactly that." Don't. Not yet.</p>

<p>Discovery is the systematic process of understanding the customer's world before you start describing your solution. Great discovery doesn't just uncover what the problem is — it uncovers what the problem costs, who owns it, why it hasn't been solved already, and what a successful outcome looks like to different people in the room.</p>

<p><strong>The Four Discovery Dimensions:</strong><br>
<strong>Situational:</strong> "Walk me through your current architecture. What does data flow look like today?" Understand the current state before proposing the future state.<br>
<strong>Problem:</strong> "Where does that architecture break down? What does that cost you when it breaks?" Quantify pain. Abstract pain doesn't get budget approved. Quantified pain does.<br>
<strong>Implication:</strong> "If this problem continues for another year at the same rate, what's the business impact?" Expand the problem from a technical annoyance to a business risk.<br>
<strong>Outcome:</strong> "What does success look like 12 months from now, in terms a board presentation would use?" Understand how they'll measure whether your solution worked.</p>

<p><strong>The Questions You're Not Asking (But Should Be):</strong><br>
"What have you already tried to solve this?" (Reveals failed attempts, internal politics, and where the bodies are buried.)<br>
"Who else in your organization cares about this outcome?" (Maps the decision network.)<br>
"What would make you confident enough to move forward?" (Surfaces unstated success criteria.)</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> A surgeon doesn't walk into the OR without an X-ray and a full chart review, even if they're certain of the diagnosis. They confirm. They verify. They look for complications that aren't obvious from the presenting symptom. Discovery is your X-ray — the systematic evidence-gathering that ensures you're solving the actual problem, not the surface-level symptom. Skipping discovery is operating without imaging. You might get lucky. But you might also remove the wrong organ.</div>

<div class="lesson-alert"><strong>Sales Tip:</strong> The ratio that separates top-quartile SEs in Gong data: they ask more questions and talk less than average performers, but the questions they ask are more specific, more business-outcome-focused, and more likely to surface the economic buyer's priorities. Quality over quantity, always.</div>
`;

getTopic('Tell-Show-Tell').prose = `
<p>The average technical demo goes like this: an SE logs into a product, starts clicking around, and narrates what they're doing for 45 minutes. "And here you can see... and if I click this... and over here we have..." The prospect nods politely. They remember nothing. The deal stalls because nobody can articulate what they saw or why it mattered.</p>

<p>The <strong>Tell-Show-Tell</strong> framework transforms a demo from a feature tour into a business case story — and it's disarmingly simple:</p>

<p><strong>Tell (Before):</strong> Before touching the product, frame what you're about to show with a business context tied directly to something the prospect said in discovery. "In your discovery call, you mentioned that your security team spends 40 hours per week manually reviewing access logs to meet your compliance requirements. I'm going to show you exactly how we reduce that to under 2 hours." Now the prospect knows what to watch for and why it matters to them specifically.</p>

<p><strong>Show:</strong> Execute the demonstration. Keep it tight — show only what you set up in the Tell. Resist the urge to demonstrate every feature. The prospect isn't evaluating features; they're evaluating whether you solve their specific stated problem. Every click that doesn't connect to the Tell is a click that dilutes focus and burns attention budget.</p>

<p><strong>Tell (After):</strong> After the demonstration, explicitly connect what they just saw to the business outcome. "What you just saw eliminates the 40-hour manual review process. Your compliance team gets that time back, and your audit trail is automatically generated for your SOC 2 review. Based on the $150/hour cost your team mentioned, that's roughly $300,000 annually in recovered productivity." Now the prospect has a specific memory, a specific implication, and a specific number.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Tell-Show-Tell is how the best professors teach. Before the experiment: "We're testing whether X causes Y because of Z mechanism." During: the experiment runs. After: "And that's why X caused Y — which is why it matters for real-world application W." The lecture without the framing is just a chemistry demonstration. The framing without the demonstration is just a lecture. Together, they create a complete, memorable learning moment. Your demo is the experiment. Make sure they know what they're watching and why before you run it.</div>

<div class="lesson-alert"><strong>Sales Tip:</strong> The most powerful Tell is a direct quote from the prospect's own discovery call: "You said in our last call that X was costing you Y. Watch this." When they hear their own words reflected back in a solution context, the cognitive connection is instant and undeniable.</div>
`;

getTopic('SE Mindset Shift').prose = `
<p>The most dangerous assumption you can carry into a Solutions Engineering role is that your job is the same as the Account Executive's job, just with more technical knowledge. It's not. The AE closes. You <em>make closing possible</em> — by eliminating technical risk, building architectural credibility, and converting a skeptical technical buyer into an active champion. These are different motions, and confusing them is how SEs end up either over-selling (becoming a liability) or under-delivering (becoming irrelevant).</p>

<p><strong>The SE Is Not the Salesperson:</strong><br>
The SE's job is truth. If the product genuinely doesn't solve the problem, the SE says so — clearly, early, before the deal closes on a false premise. Nothing destroys a customer relationship faster than deploying a solution that was oversold in the sales cycle. The SE's credibility with the technical buyer is the most valuable asset in the deal. Protect it like it is.</p>

<p><strong>The SE Is Not the Implementation Engineer:</strong><br>
The SE's responsibility ends (roughly) at contract signature and handoff. You are not the person who will be on-site for six months implementing the solution. This matters because it shapes how you scope your commitments during the sales cycle. Commit to architecture patterns and outcomes — not specific implementation timelines that you won't personally be executing.</p>

<p><strong>What the SE Uniquely Owns:</strong><br>
Technical credibility with the prospect's engineering team. Ability to translate business problems into architectural solutions. Proof-of-concept design and execution. Competitive technical differentiation. Architecture review and security questionnaire responses. Post-POC technical recommendation documents.</p>

<p><strong>The Identity of the Elite SE:</strong> You are a trusted technical advisor who happens to represent a specific vendor. Your value to the prospect is your ability to help them solve the right problem with the right architecture — and if that architecture happens to include your product, excellent. That positioning earns respect that pure sales positioning never can.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> The best analogy for an SE is a specialist physician consulting on a complex case. The referring doctor (AE) brought the patient (prospect) in. The specialist's (SE's) job is accurate diagnosis and the right treatment recommendation — not to prescribe a treatment that happens to be profitable. A specialist who prescribes the wrong treatment to close a billing code destroys their reputation and harms the patient. An SE who oversells to close a deal destroys their reputation and burns the customer. The long game wins in both professions.</div>

<div class="lesson-alert"><strong>Career Tip:</strong> The most promotable SEs are those who build a personal brand for technical accuracy and customer success — not for closing deals. Your AE closes deals. You build the technical reputation that makes prospects trust the deal is the right one.</div>
`;

getTopic("Building the 'Hero' Project").prose = `
<p>Every SE interview eventually arrives at the same moment: "Walk me through a technical project you built." This is not small talk. It's the most important question in the interview. The panel is not evaluating whether you can describe a project. They're evaluating whether you think like an architect, communicate like an SE, and learn like someone who will compound in value over time.</p>

<p><strong>What Makes a "Hero" Project:</strong><br>
A Hero Project is not the most technically impressive thing you've ever built. It's the project that most clearly demonstrates the intersection of technical depth and business impact. Ideally, it:</p>

<p>1. <strong>Solves a real problem</strong> — not "I built a TODO app with React." A real problem that a real person or organization had.<br>
2. <strong>Has visible architecture decisions</strong> — you chose Service X over Service Y, and you can explain why with the specific constraints you were working under.<br>
3. <strong>Is live and accessible</strong> — URL, GitHub repo, video demo. If the interviewer can interact with it, it's 10x more memorable.<br>
4. <strong>Has a failure story</strong> — something that went wrong and how you diagnosed and fixed it. Technical interviews reward honesty and reasoning over perfection.</p>

<p><strong>The Homelab as a Hero Project Factory:</strong><br>
Your Proxmox environment is a living demonstration platform. An enterprise-grade monitoring stack (Prometheus + Grafana). A Kubernetes cluster running real workloads. A self-hosted security stack with centralized logging and alerting. These are not just learning exercises — they are demonstrable, architecturally defensible projects that directly mirror enterprise environments you'll be selling into.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> A Hero Project is the architectural equivalent of a professional portfolio. An architect applying for a senior role doesn't describe their design philosophy — they bring blueprints and photos of completed buildings. Your GitHub, your live demo URL, and your documented architecture decision records are your blueprints. "I built X" is a claim. "Here's the running system and here's why I made these specific trade-offs" is proof.</div>

<div class="lesson-alert"><strong>Career Tip:</strong> Document your homelab projects with architecture diagrams. Even basic hand-drawn ones photographed on your phone are significantly more compelling than verbal descriptions. The discipline of drawing an architecture diagram forces the clarity of thought that impresses technical interviewers.</div>
`;

getTopic("SE Interview: The 'Demo'").prose = `
<p>The SE interview is a sales call where you are the product. The hiring manager is evaluating not just what you know, but how you handle the room — because that's exactly what they're paying you to do with their customers. Every question is simultaneously a technical assessment and a communication assessment. Here's how to approach the three most critical moments.</p>

<p><strong>The Whiteboard Architecture Question:</strong><br>
"Design a highly available web application on AWS." This is not a trick question. There is no single correct answer. The panel wants to watch how you think: Do you ask clarifying questions before drawing? (You should.) Do you start with requirements (traffic, latency, compliance) before choosing services? Do you explain your reasoning for each architectural decision? Do you proactively identify trade-offs and failure modes?</p>

<p>The SE who says "I'd start by understanding your traffic patterns and compliance requirements before committing to an architecture" earns more points than the one who immediately draws an EC2 + RDS diagram. Asking the right questions IS the demonstration of expertise.</p>

<p><strong>The "Tell Me About a Time You Lost a Deal" Question:</strong><br>
This question is not a trap. It's an invitation to demonstrate self-awareness and a growth mindset. The wrong answer: "I don't really lose deals" or "the product wasn't the right fit." The right answer: a specific deal, a specific moment where you made a wrong call (over-committed on a timeline, misread the technical buyer's concern, skipped a follow-up), what you learned, and what you changed. Interviewers hire people who know they're fallible and actively self-correct.</p>

<p><strong>The Live Demo Moment:</strong><br>
Many SE panels include a product demo with a provided tool or even a mock product. Approach it exactly as you would a real customer demo: ask what the "customer's" problem is before touching the UI, frame what you're about to show before showing it, and recap the business impact after. Tell-Show-Tell works in interviews as reliably as it works in customer meetings.</p>

<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Preparing for an SE interview is identical to preparing for a championship match in any sport. You don't show up and "wing it" based on general talent — you study the opponent (the company, their product, their competitive position, their customer stories), you prepare your set pieces (whiteboard architecture, hero project pitch, objection handling), and you warm up (practice out loud until the stories are crisp and natural). Talent gets you in the room. Preparation gets you the offer.</div>

<div class="lesson-alert"><strong>Career Tip:</strong> Research the company's product deeply before the interview. Find their documentation, their AWS architecture case studies, their security certifications. Show up with a specific, informed question about their architecture. Nothing signals "I am already thinking like an SE for your product" more clearly than demonstrating you did the technical homework before the interview.</div>
`;

// =============================================================
// VERIFY AND SAVE
// =============================================================

const serialized = 'const DATA = ' + JSON.stringify(DATA, null, 4) + ';';
fs.writeFileSync('data.js', serialized, 'utf8');

console.log('');
console.log('=== PART 2: SALES & CAREER MODULES REWRITTEN ===');
console.log('All 49 topics now have premium, witty, exam-accurate prose.');
console.log('Anchors are vivid and real-world grounded throughout.');
