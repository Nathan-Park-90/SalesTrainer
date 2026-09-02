const fs = require('fs');

let content = fs.readFileSync('data.js', 'utf8');
let evalContent = content.replace('const DATA =', 'var DATA=');
eval(evalContent);

// ═══════════════════════════════════════════════
// FIX 1: Normalize "Performing" → "Performance"
// ═══════════════════════════════════════════════
DATA.exam_aws = DATA.exam_aws.map(q => ({
    ...q,
    domain: q.domain === 'Performing' ? 'Performance' : q.domain
}));
console.log('✅ Fixed domain naming consistency');

// ═══════════════════════════════════════════════
// FIX 2: Add real-world analogies to flashcards missing them
// ═══════════════════════════════════════════════
const analogyMap = {
    "Explain the difference between Bare Metal, Virtual Machines,": "Bare Metal = you bought a house and live in it alone. VMs = you rent an apartment — shared building, private walls. Containers = shared apartment with thin walls, all tenants use the same stairwell (OS kernel).",
    "If a lightning strike destroys a data center, how does a Mul": "Multi-AZ is like storing your MSTR trade journal in both Dropbox and a local NAS simultaneously. One burns down, you lose nothing.",
    "A CTO asks why they shouldn't just buy a bigger server (Vert": "Vertical scaling is buying a faster race car for the same single driver. Horizontal scaling is adding more race cars and more drivers. At some point no single car goes fast enough — you need a fleet.",
    "Your e-commerce site gets a massive traffic spike on Black F": "Black Friday traffic is your MSTR earnings call spike. ASG is your trading bot that auto-adds compute when volatility spikes and scales down when it's quiet — you pay for exactly what you used.",
    "What is an EC2 instance, and what is its primary use case in": "EC2 is a virtual machine you rent by the second. Think of it like your Proxmox homelab VM, but running in AWS's datacenter instead of your basement. Same concept — CPU, RAM, disk — just someone else manages the hardware.",
    "Explain AWS Lambda's pricing model and why it is called 'Ser": "Lambda is the vending machine of compute. The machine sits idle (free). When you insert a coin (event), it runs and charges you only for those seconds. Your Proxmox VM charges you 24/7 whether you touch it or not.",
    "A developer wants to hardcode AWS credentials into their app": "Hardcoding credentials is like tattooing your brokerage password on your arm. IAM Roles are the OAuth token scoped only to what that app needs — no permanent credential, no tattoo to regret.",
    "Your compliance team mandates that all database backups must": "Compliance encryption is like sealing your trade records in a fireproof safe only you have the key to. AWS KMS is that key management system — CMK means you own the key, not AWS.",
    "A competitor launches a DDoS attack against your web applica": "DDoS is someone jamming your phone lines so no real customers can get through. Shield Advanced is your enterprise PBX that absorbs the junk calls and keeps legitimate callers connected.",
    "What is the difference between ECS, EKS, and Fargate?": "ECS is AWS's own container orchestrator — like using pfSense directly. EKS is managed Kubernetes — like running pfSense with a commercial support contract. Fargate strips away the servers entirely — you just describe what you want to run and AWS makes it happen.",
    "A data scientist needs to process 10,000 images overnight us": "Spot Instances for batch jobs are like buying standby plane tickets at 90% off. If the plane fills up (AWS needs capacity back), you get bumped — but for overnight batch work, that's a fine tradeoff.",
    "Your Lambda function is in a private subnet with no internet": "A VPC endpoint is a private back-door from your house directly into the AWS service building. No need to go out the front door onto the public internet just to check your mailbox.",
    "What is the difference between a VPC Gateway Endpoint and a": "Gateway Endpoint = a free special on-ramp to the S3 and DynamoDB highways, built directly into your VPC's routing table. Interface Endpoint = a private tunnel using AWS PrivateLink, works with 100+ services but costs per hour.",
    "A company runs a batch processing workload that is fault-tol": "Fault-tolerant batch jobs on Spot are like running a long render job on your homelab overnight. If a VM crashes, you restart the chunk. You pay 10% of On-Demand because you accepted the interruption risk.",
    "A company needs production web servers running 24/7 for 3 ye": "Committing to Reserved Instances for steady workloads is like signing a 3-year office lease instead of paying hotel rates nightly. You get up to 72% off because you gave AWS the certainty they love.",
    "What is the cheapest S3 storage class for compliance audit l": "Glacier Deep Archive is the offsite safety deposit box for data you'll never look at but legally must keep. You pay almost nothing per GB because the retrieval SLA is 12 hours — fine for a regulator's annual audit.",
    "A media company stores private videos in S3. Authenticated u": "CloudFront Signed URLs are like temporary VIP wristbands. The S3 bucket stays locked (no public access). When a user pays and authenticates, your server generates a signed URL that works for 24 hours then expires automatically.",
    "Your RDS database is being hammered by the same read queries": "ElastiCache is RAM on steroids sitting in front of your database. The hot queries hit the cache (microseconds); only cache misses hit RDS. Like your browser cache — why reload a page you've already downloaded?",
    "When would you choose Redis over Memcached for ElastiCache?": "Memcached = a simple whiteboard you erase and rewrite. Redis = a whiteboard with undo history, pub/sub messaging, and the ability to sort lists. Pick Redis whenever you need more than a dumb key-value store.",
    "An order processing system must process orders in the exact": "SQS FIFO is the velvet rope outside an exclusive club. First in line, first inside. No cutting, no duplicates. Critical for financial transactions where processing a sell order before its corresponding buy would be catastrophic.",
    "A message in your SQS queue keeps failing processing and cra": "A Dead-Letter Queue is the email 'bounce' folder. Instead of the failed message re-trying forever and jamming your queue, it gets quarantined after N failures so you can inspect it without disrupting live traffic.",
    "An S3 image upload event needs to simultaneously trigger a t": "SNS fanout is the expediter in a restaurant kitchen — one ticket comes in, they shout the order to every station simultaneously. Lambda, SQS queue, and email all get the notification in parallel, not sequence.",
    "What is the key difference between SNS and SQS delivery mode": "SQS = a queue where your worker polls (checks the mailbox). SNS = a push service that calls you (your phone rings). SQS workers set their own pace; SNS subscribers get notified instantly the moment a message arrives.",
    "Your Lambda must connect to RDS. The password must automatic": "Secrets Manager with automatic rotation is like having your company's locks changed every 30 days automatically. The security team handles it; the Lambda just calls GetSecretValue at runtime and gets today's current key.",
    "What is the decision rule between Parameter Store SecureStri": "Parameter Store SecureString = a combination-locked filing cabinet (you manage the combo). Secrets Manager = a bank vault with an automatic timelock that rotates the combination every month. Use the vault for production credentials.",
    "A company has EU users that must be routed to EU servers for": "Route 53 Geolocation routing is the digital equivalent of regional offices — European calls route to the Frankfurt office, US calls to New York. Not based on latency, but on legal/compliance geographic requirements.",
    "A team wants to deploy a new version to 10% of users first,": "Weighted routing for canary deploys is like introducing a new trading strategy with 10% of your capital first. If it performs as expected, you gradually increase the allocation. Protects you from deploying a disaster to 100% of users.",
    "A company wants to be alerted before their monthly AWS bill": "AWS Budgets are your financial circuit breaker. Like a stop-loss order on a trade — you define the threshold and get alerted before it's too late to course-correct.",
    "A solutions architect reviews the account and finds EC2 inst": "Idle EC2 instances burning money are like leaving all the lights on in a building you're not using. Trusted Advisor is the automated janitor that walks the building and says 'these lights have been on for 30 days and nobody's home.'"
};

// Scrum flashcards don't need Mammoth analogies but should have real-world hooks
const scrumAnalogyMap = {
    "Who has the authority to cancel a Sprint?": "The Product Owner is the investor who funded the sprint. If market conditions change drastically mid-trade, only the investor can pull the capital — not the traders doing the work.",
    "Can a Sprint be extended by 2 days if the Developers just ne": "A Sprint is a sacred timeboxing contract — like a trading window. When the market closes, it closes. Extending the Sprint would corrupt the empirical cadence Scrum depends on.",
    "What happens if an item is not \"Done\" by the end of the Spri": "Undone work returns to the Product Backlog like a trade order that expired — it doesn't auto-carry over. The Product Owner re-evaluates its priority for the next Sprint based on current conditions.",
    "Who determines how many Product Backlog items are selected f": "Developers are the engineers who know how much they can actually build. Letting the PO or SM dictate capacity is like having the investor tell the quant how many models he can backtest — completely backwards.",
    "What is the timebox for a Sprint Planning event based on a o": "Sprint Planning's 8-hour cap enforces discipline — not every detail can be planned upfront. Scrum bets on adaptation over exhaustive upfront planning. Overly long planning sessions signal waterfall thinking.",
    "What is the timebox for a Daily Scrum?": "15 minutes is the Daily Scrum's enforced discipline — it's a sync, not a strategy session. Like a market open briefing: what's the position, what's the risk, what's blocking the trade.",
    "Who must attend the Daily Scrum?": "The Daily Scrum belongs to the Developers — the people doing the work. The Scrum Master and Product Owner are welcome but not required unless they're also contributing to the Sprint Goal.",
    "What is the timebox for a Sprint Review based on a one-month": "Sprint Review gets 4 hours for a one-month Sprint. It's the investor presentation at the end of a fund cycle — show what was built, get feedback, adjust the roadmap based on reality.",
    "What is the timebox for a Sprint Retrospective based on a on": "The Retrospective (3 hrs/month) is the post-trade analysis — what worked, what didn't, what process change would improve the next Sprint's returns. Teams who skip it repeat the same mistakes.",
    "What is the commitment for the Product Backlog?": "The Product Goal is the product's north star — like a fund's investment thesis. Every item in the backlog should trace back to it. It focuses the team on what actually matters.",
    "What is the commitment for the Sprint Backlog?": "The Sprint Goal is the tactical objective for this Sprint — like targeting a specific sector for the quarter. It gives the Developers latitude to adapt HOW they achieve it while keeping the outcome fixed.",
    "What is the commitment for the Increment?": "The Definition of Done is the quality floor — the minimum bar an Increment must clear before it can be shipped. Like a trade that must clear compliance review before it executes.",
    "Can a Scrum Team have multiple active Product Goals at the s": "No — multiple Product Goals simultaneously would be like a fund trying to execute two conflicting investment theses at once. Focus is the entire point of the Product Goal commitment.",
    "Who creates the Definition of Done?": "If no org-wide standard exists, the Scrum Team defines their own DoD. It's their quality contract with themselves — and with the stakeholders who rely on 'Done' meaning something real.",
    "What are the three pillars of Empiricism?": "Transparency + Inspection + Adaptation = the scientific method applied to product development. You can't inspect what's hidden; you can't adapt if you don't inspect. All three must exist together.",
    "What are the five Scrum Values?": "Commitment, Focus, Openness, Respect, Courage — the team culture that makes empiricism safe. Without courage to surface bad news, transparency breaks down. Without respect, no one speaks up.",
    "Who is accountable for maximizing the value of the product?": "The Product Owner is the fund manager — maximizing ROI on the development investment. They order the backlog by value, not by stakeholder politics.",
    "Who is responsible for all estimates in the Product Backlog?": "Developers own estimates because they're the ones doing the work. PO setting estimates without developer input would be like a CFO estimating engineering effort — a recipe for missed deadlines.",
    "When is an Increment born?": "An Increment is born the moment any Product Backlog item meets the Definition of Done — even mid-Sprint. Increments can be delivered to users at any time; the Sprint Review is just a formal inspection moment.",
    "Who is accountable for instilling quality by adhering to a D": "Developers own quality — not QA, not the SM. Scrum has no QA team by design. The Definition of Done is the quality gate that every Developer is accountable to.",
    "What is the purpose of the Daily Scrum?": "The Daily Scrum is a 15-minute tactical huddle to inspect progress toward the Sprint Goal and adapt the plan. It is NOT a status meeting for the Scrum Master or PO — it's the Developers' planning tool.",
    "What happens between the end of one Sprint and the start of": "Nothing happens between Sprints — a new Sprint starts immediately on the day the previous one ends. There's no 'Sprint 0' or buffer period. The cadence is continuous and relentless.",
    "Can the Sprint Goal be changed during the Sprint?": "The Sprint Goal is sacred during the Sprint. Changing it would negate the point of the timebox. If the Sprint Goal becomes obsolete, only the Product Owner can cancel the Sprint.",
    "Who is accountable for establishing Scrum as defined in the": "The Scrum Master is accountable for Scrum being understood and enacted correctly — they're the process guardian, not the project manager. Their job is to remove the obstacles that prevent the team from being effective.",
    "If multiple Scrum Teams are working on the same product, how": "One Product Backlog, one Product Owner, one Product Goal for multiple teams — like multiple trading desks within one fund all working the same strategy. Each team selects from the same ordered list of priorities.",
    "What topics are discussed during Sprint Planning?": "Sprint Planning covers: Why (the Sprint Goal), What (selected PBIs), and How (the plan). Teams that skip 'Why' often build the right features for the wrong reason.",
    "Does the Scrum Master assign tasks to Developers during the": "Scrum Masters don't assign work — Developers self-organize and pull tasks. A SM who assigns work has become a project manager, which undermines the team's ownership and accountability.",
    "When does the Product Backlog refinement happen?": "Refinement is ongoing throughout the Sprint — it's not a single meeting. Think of it as continuous pre-trade research: the team is always sharpening the next set of opportunities.",
    "Is it mandatory for the Scrum Team to release an Increment t": "Releasing is a business decision (PO), not a Scrum requirement. Scrum only requires that the Increment meets DoD and is potentially releasable. Whether to ship is separate from whether it's Done.",
    "Who is a \"true leader who serves\"?": "The Scrum Master is a servant-leader — they lead by removing friction, not by directing work. They serve the team, the PO, and the organization by making Scrum effective.",
    "What is the recommended size of a Scrum Team?": "10 or fewer is the magic number — small enough to communicate without a meeting, large enough to get real work done. Larger teams create coordination overhead that kills velocity.",
    "Who comprises the Scrum Team?": "Scrum Team = Developers + Product Owner + Scrum Master. No 'QA team', no 'architects', no 'project managers' — Scrum deliberately collapses those silos into one accountable unit.",
    "True or False: The Scrum Master must be a technical expert i": "False. The Scrum Master masters the Scrum process, not the technology. They help the team remove process obstacles, not debug code. A great SM can serve a hardware team as well as a software team.",
    "What is the primary difference between the Sprint Review and": "Sprint Review = inspect the product with stakeholders (external focus). Sprint Retrospective = inspect the process with the team (internal focus). One faces outward, one faces inward.",
    "If an item in the Sprint Backlog cannot be finished, who mus": "Developers own this conversation. They must immediately raise it in the Daily Scrum so the team can adapt — drop scope, renegotiate with PO, or swarm the item. No surprises at the end of the Sprint.",
    "Who manages the Sprint Backlog?": "Developers own and manage the Sprint Backlog. It's their tactical plan, not the SM's task list. The PO can clarify but cannot direct how items are ordered within the Sprint.",
    "What gives life to the three pillars of empiricism?": "The five Scrum Values (Commitment, Focus, Openness, Respect, Courage) create the team culture that makes transparency, inspection, and adaptation real. Values without pillars are platitudes; pillars without values are empty process.",
    "Is there a 'Sprint 0' in Scrum?": "No. 'Sprint 0' is a waterfall concept smuggled into Scrum to justify upfront architecture phases. Scrum starts with Sprint 1. If setup is needed, it's work — put it in the backlog and time-box it like any other Sprint.",
    "True or False: A Scrum Team is cross-functional.": "True. The Scrum Team must collectively have all the skills needed to create a potentially releasable Increment every Sprint — no external dependencies on a 'DBA team' or 'network team' to get work Done.",
    "Can the Product Owner order the Product Backlog based on ris": "Yes. The PO has complete authority over Product Backlog ordering — by value, risk, learning, dependencies, or any other factor. They are the sole authority on what the team works on next."
};

let analogiesAdded = 0;
DATA.flashcards = DATA.flashcards.map(card => {
    if (!card.analogy) {
        // Try to find a match in our map
        const key = Object.keys(analogyMap).find(k => card.front.startsWith(k));
        const scrumKey = Object.keys(scrumAnalogyMap).find(k => card.front.startsWith(k));
        
        if (key) {
            analogiesAdded++;
            return { ...card, analogy: analogyMap[key] };
        } else if (scrumKey) {
            analogiesAdded++;
            return { ...card, analogy: scrumAnalogyMap[scrumKey] };
        }
    }
    return card;
});

console.log(`✅ Added analogies to ${analogiesAdded} flashcards`);

// ═══════════════════════════════════════════════
// Write back
// ═══════════════════════════════════════════════
fs.writeFileSync('data.js', 'const DATA = ' + JSON.stringify(DATA, null, 4) + ';', 'utf8');
console.log('\n✅ All fixes written to data.js');
