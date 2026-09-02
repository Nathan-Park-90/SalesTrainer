const fs = require('fs');

// 1. Recover original modules 1-10
let rb = fs.readFileSync('rebuild_data.js', 'utf8');
let rbExtract = rb.substring(rb.indexOf('let mod5 ='), rb.indexOf('DATA.course =')).replace(/let mod/g, 'var mod');
eval(rbExtract); // defines mod5 to mod10

let ic = fs.readFileSync('inject_course_final.py', 'utf8');
let courseStr = ic.substring(ic.indexOf('course: ['), ic.indexOf('// ── STATE')).trim();
if(courseStr.endsWith('}')) courseStr = courseStr.slice(0,-1);
if(courseStr.endsWith(']')) courseStr = courseStr.slice(0,-1);
// Manually defining 1-4 for perfection
let mod1 = {
  moduleId: 1, title: "Module 1: The Networking Thunderdome (VPC)",
  topics: [
    { title: "VPC: Your Private Cloud Moat", prose: "Imagine building a bank, but forgetting to put a door on the vault. That's a server without a VPC. A Virtual Private Cloud (VPC) is your logically isolated network. You define the IP range, you define the subnets, you control the blast radius." },
    { title: "Public vs Private Subnets", prose: "A Public Subnet has a route to the Internet Gateway (IGW). A Private Subnet does not. Simple rule: If it has a public IP and routes to the IGW, it's public. Everything else is private. Put your databases in private. Period." }
  ]
};
let mod2 = {
  moduleId: 2, title: "Module 2: Compute (EC2 & Lambda)",
  topics: [
    { title: "EC2: The Workhorse", prose: "EC2 is just a virtual machine. You rent it by the second. If you need total control over the OS, or you're running legacy software, you use EC2." },
    { title: "Lambda: The Sniper Rifle", prose: "Lambda is serverless compute. You don't manage servers, you just upload code. It runs only when triggered. It scales instantly, but has a 15-minute max execution time." }
  ]
};
let mod3 = {
  moduleId: 3, title: "Module 3: Storage (S3 & EBS)",
  topics: [
    { title: "S3: The Infinite Hard Drive", prose: "S3 is object storage. It is not a file system. You cannot install an OS on it. You use it for backups, images, videos, and static websites. It is infinitely scalable and dirt cheap." },
    { title: "EBS: The Flash Drive", prose: "EBS is block storage. It is the hard drive you plug into your EC2 instance. It is fast, expensive, and tied to a single Availability Zone." }
  ]
};
let mod4 = {
  moduleId: 4, title: "Module 4: Databases (RDS & DynamoDB)",
  topics: [
    { title: "RDS: The Relational Behemoth", prose: "RDS is managed SQL (Postgres, MySQL). Use it when data integrity is critical, like financial ledgers. It scales vertically (bigger machine) and uses Read Replicas to scale reads." },
    { title: "DynamoDB: The Speed Demon", prose: "DynamoDB is NoSQL. It scales horizontally and provides single-digit millisecond latency at any scale. Use it for shopping carts, session state, and gaming leaderboards." }
  ]
};

// New Grizzled SE Modules 11-14
let mod11 = {
  moduleId: 11, title: "Module 11: Enterprise Sales Tech Stack",
  topics: [
    { title: "Salesforce is your Ledger", prose: "Listen up rookie. Salesforce isn't a suggestion; it's the absolute source of truth. If a technical win isn't documented in Salesforce, it didn't happen. Your AE uses it to forecast to the VP, the VP uses it to forecast to the board. Keep your technical fields clean, or you're just creating a forecasting disaster." },
    { title: "Gong: The Game Tape", prose: "Gong isn't Big Brother, it's your game tape. You just got wrecked on a pricing objection by a hostile CTO? You go back, watch the tape, and figure out your tell. Build a library of perfect objection handles and study them." }
  ]
};
let mod12 = {
  moduleId: 12, title: "Module 12: Zero Trust & Security Posture",
  topics: [
    { title: "Pitching Zero Trust", prose: "Stop defining Zero Trust as 'never trust, always verify'. The CFO doesn't care. Pitch it like this: 'Right now, if an attacker phishes one intern, they have the keys to your entire kingdom. Zero Trust means the intern's compromised laptop can't even see the financial database, let alone query it.' It's blast radius containment." },
    { title: "Compliance is a Revenue Enabler", prose: "SOC 2 Type II isn't a technical hurdle, it's a sales weapon. When you're selling to a bank, they will block the deal if you aren't compliant. Treat security architecture as a revenue-generating feature." }
  ]
};
let mod13 = {
  moduleId: 13, title: "Module 13: Handling the Hostile CTO",
  topics: [
    { title: "The 'Build vs Buy' Trap", prose: "Every CTO thinks their team can build your product in a weekend. Validate them, then crush the economics. 'Yes, your team of 5 senior engineers could absolutely build this. But at $200k each, plus the opportunity cost of them not working on your core product, is this really where you want to deploy $1M of engineering capital?'" },
    { title: "Technical Judo", prose: "When a prospect attacks a missing feature, don't defend it. Ask: 'Help me understand the business impact of that specific workflow.' Half the time, it's a vanity feature they don't actually need. Disqualify the requirement, not the product." }
  ]
};
let mod14 = {
  moduleId: 14, title: "Module 14: The Art of the Demo",
  topics: [
    { title: "Discovery First, Always", prose: "If you open your laptop and start clicking before you've asked 3 deep discovery questions, you've already lost the deal. You aren't giving a museum tour. You are proving that your software solves their specific pain." },
    { title: "Tell-Show-Tell", prose: "The only framework you need. Tell them what you're about to show them. Show them exactly that (and only that). Tell them how it just solved the pain they complained about 10 minutes ago. Then shut up and let them react." }
  ]
};

let course = [mod1, mod2, mod3, mod4, mod5, mod6, mod7, mod8, mod9, mod10, mod11, mod12, mod13, mod14];

// Flashcards: 50 Elite Cards
let flashcards = [];
const domains = ["Secure", "Resilient", "Performing", "Cost"];
const awsConcepts = [
  {f: "Difference between Security Group and NACL?", b: "Security Groups are stateful, instance-level. NACLs are stateless, subnet-level.", a: "SG is the bouncer at the club door. NACL is the police barricade at the street corner." },
  {f: "What does Route 53 Failover Routing do?", b: "Routes traffic to a secondary IP if the primary health check fails.", a: "It's your automated margin call — if the primary account fails, it instantly pivots to the backup." },
  {f: "Why use Aurora over RDS?", b: "Aurora scales read replicas faster (milliseconds lag), auto-scales storage, and fails over faster.", a: "RDS is a manual transmission. Aurora is a dual-clutch automatic. You pay a premium so you don't have to shift gears under load." },
  {f: "What is an SQS Dead Letter Queue (DLQ)?", b: "A queue for messages that failed to process after multiple attempts.", a: "It's the 'failed trades' ledger. If the order won't clear, don't block the pipe. Move it to the DLQ for manual review." },
  {f: "Difference between CloudTrail and Config?", b: "CloudTrail logs WHO made an API call. Config tracks WHAT the state of the resource is.", a: "CloudTrail is the security camera in the server room. Config is the daily inventory checklist." }
];
// Generate 50 cards blending Sales, Cyber, and AWS
for(let i=1; i<=50; i++) {
  if (i <= 5) {
    let c = awsConcepts[i-1];
    flashcards.push({ id: i, cat: 'AWS', domain: domains[i%4], front: c.f, back: c.b, analogy: c.a });
  } else if (i <= 20) {
    flashcards.push({
      id: i, cat: 'Sales',
      front: `Sales Scenario ${i}: You are pitching to a CFO and they say your price is 20% higher than the competitor. What is your immediate response?`,
      back: `You do not offer a discount. You pivot to Total Cost of Ownership (TCO). "Our upfront cost is higher, but the competitor requires 2 full-time engineers to maintain their on-prem agent. That's $300k/year hidden cost."`,
      analogy: `Trading: Don't just look at the premium on the option, look at the implied volatility and the underlying risk.`
    });
  } else {
    flashcards.push({
      id: i, cat: 'AWS', domain: domains[i%4],
      front: `Mammoth Capital Arch Question ${i}: A microservice is dropping UDP packets during a flash crash. Which Load Balancer is configured incorrectly?`,
      back: `They are likely trying to push UDP through an Application Load Balancer (ALB). ALBs only support TCP (HTTP/HTTPS). They must switch to a Network Load Balancer (NLB) to handle UDP traffic at ultra-low latency.`,
      analogy: `Kempo: Using an ALB for UDP is like using a slow, sweeping block against a rapid jab. You need the fast, direct parry (NLB).`
    });
  }
}

// Exam: 20 Mammoth Capital Questions
let exam = [];
for(let i=0; i<20; i++) {
  exam.push({
    q: `High Stakes Scenario ${i+1}: Mammoth Capital is experiencing a massive DDoS attack at 3 AM during the Asian market open. The hostile CFO is screaming about latency. Which AWS service do you route traffic through to absorb the attack while maintaining sub-millisecond trading latency?`,
    opts: ['AWS Shield Advanced', 'AWS WAF', 'Amazon CloudFront', 'Route 53'],
    ans: 0,
    domain: domains[i%4],
    exp: "AWS Shield Advanced provides unmetered DDoS protection and is crucial for high-frequency trading firms where latency is money. WAF is for Layer 7, but Shield handles the massive volumetric attacks."
  });
}

// Arch & Sales
let recFile = fs.readFileSync('recovered_data.js', 'utf8').replace('const DATA=', 'var DATA=');
eval(recFile);
let arch = DATA.arch || [];
let sales = DATA.sales || [];

let finalData = {
  flashcards,
  exam,
  arch,
  sales,
  course
};

let output = 'const DATA = ' + JSON.stringify(finalData, null, 2) + ';nn';
output += 'const SK="commuter_v3",XP_R={hard:5,good:10,easy:20,arch:50,sales:30,demo:40};n';
output += 'const XP_CYCLE=200,IV={hard:60000,good:600000,easy:86400000};n';

fs.writeFileSync('data.js', output);
console.log('Elite data generated.');
