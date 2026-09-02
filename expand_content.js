const fs = require('fs');

let c = fs.readFileSync('data.js', 'utf8').replace('const DATA = ', 'var DATA=');
eval(c);

const expansions = {
    // Module 1: VPC
    "VPC: Your Private Cloud Moat": `
        <h3 class="lesson-h3">The Foundation of Cloud Security</h3>
        <p>Before you ever launch a server, you must build the network it lives in. A Virtual Private Cloud (VPC) is your logically isolated slice of the AWS cloud. It acts as the ultimate blast-radius containment.</p>
        <p>Without a VPC, your database and your public web servers would be sitting on the exact same flat network, vulnerable to anyone who scans your IP address.</p>
        <div class="lesson-alert">
            <strong>Sales Tip:</strong> When a CTO asks "Is AWS secure?", your first response should be: "AWS provides the VPC, but you build the moat. Let me show you how we architect our subnets to guarantee isolation."
        </div>
        <h3 class="lesson-h3">CIDR Blocks and Addressing</h3>
        <p>When you create a VPC, you assign it an IPv4 CIDR block (e.g., <code>10.0.0.0/16</code>). This gives you 65,536 private IP addresses to distribute across your subnets.</p>
    `,
    "Public vs Private Subnets": `
        <h3 class="lesson-h3">The Golden Rule of Subnets</h3>
        <p>The only difference between a Public and Private subnet is the Route Table. If the Route Table has a default route (<code>0.0.0.0/0</code>) pointing to an <strong>Internet Gateway (IGW)</strong>, it is a Public Subnet.</p>
        <p>If it points to a <strong>NAT Gateway</strong> (or nothing at all), it is a Private Subnet.</p>
        <ul>
            <li><strong>Public Subnet:</strong> Web servers, Load Balancers, Bastion Hosts.</li>
            <li><strong>Private Subnet:</strong> Databases, Application APIs, Cache clusters.</li>
        </ul>
        <div class="lesson-alert">
            <strong>Exam Tip:</strong> An EC2 instance in a public subnet still needs a Public IP address to talk to the internet, even if the IGW is attached!
        </div>
    `,
    
    // Module 2: Compute
    "EC2: The Workhorse": `
        <h3 class="lesson-h3">Raw Compute Power</h3>
        <p>Amazon Elastic Compute Cloud (EC2) provides resizable compute capacity. It is the virtual machine that runs the modern internet. You choose the OS (Linux, Windows), the instance family (Compute optimized, Memory optimized), and the EBS volume.</p>
        <p>The billing model is per-second. If you leave a massive <code>p4d.24xlarge</code> instance running over the weekend, it will burn through your startup's runway.</p>
        <h3 class="lesson-h3">Instance Purchasing Options</h3>
        <ul>
            <li><strong>On-Demand:</strong> Pay by the second. No long-term commitment.</li>
            <li><strong>Reserved Instances:</strong> 1 or 3-year commitment for a massive discount (up to 72%).</li>
            <li><strong>Spot Instances:</strong> Bid on spare AWS capacity for up to 90% off, but AWS can terminate it with a 2-minute warning.</li>
        </ul>
    `,
    "Lambda: The Sniper Rifle": `
        <h3 class="lesson-h3">Serverless Execution</h3>
        <p>AWS Lambda is the ultimate event-driven compute engine. You upload your Node.js or Python code, and AWS handles everything else. There are no servers to provision, no OS to patch, and no idle costs.</p>
        <p>It scales from 0 to 1,000 concurrent executions instantly in response to triggers (like an S3 upload or an API Gateway request).</p>
        <div class="lesson-alert">
            <strong>Limitations to Memorize:</strong><br>
            1. Max execution time is 15 minutes.<br>
            2. Max memory is 10GB.<br>
            If your video rendering job takes 2 hours, you cannot use Lambda. Use AWS Batch or EC2.
        </div>
    `,

    // Module 3: Storage
    "S3: The Infinite Hard Drive": `
        <h3 class="lesson-h3">Object Storage 101</h3>
        <p>Amazon S3 is object storage built to store and retrieve any amount of data from anywhere. It is designed for 99.999999999% (11 9's) of durability. This means if you store 10,000,000 objects in S3, you can expect to lose a single object once every 10,000 years.</p>
        <p>You cannot install an operating system on S3. It is a flat namespace where files (objects) are stored in buckets.</p>
        <h3 class="lesson-h3">Storage Classes</h3>
        <ul>
            <li><strong>S3 Standard:</strong> For frequently accessed data.</li>
            <li><strong>S3 Intelligent-Tiering:</strong> Automatically moves data to the most cost-effective tier based on access patterns.</li>
            <li><strong>S3 Glacier Deep Archive:</strong> The cheapest storage on earth, but retrieval takes 12 hours.</li>
        </ul>
    `,
    "EBS: The Flash Drive": `
        <h3 class="lesson-h3">Block Storage for EC2</h3>
        <p>Amazon Elastic Block Store (EBS) provides block-level storage volumes for use with EC2 instances. It is the virtual hard drive you attach to your server.</p>
        <p>EBS volumes are highly available, but they are locked to a single Availability Zone (AZ). If the AZ goes down, the volume goes down. To protect data, you must take EBS Snapshots, which are automatically stored in S3 across multiple AZs.</p>
        <div class="lesson-alert">
            <strong>Exam Tip:</strong> By default, an EBS volume cannot be attached to multiple EC2 instances simultaneously. For that, you need EBS Multi-Attach (only on Provisioned IOPS io1/io2) or EFS (Elastic File System).
        </div>
    `,

    // Module 4: Databases
    "RDS: The Relational Behemoth": `
        <h3 class="lesson-h3">Managed SQL at Scale</h3>
        <p>Amazon Relational Database Service (RDS) takes the heavy lifting out of running SQL databases (PostgreSQL, MySQL, Oracle, SQL Server). AWS handles the automated backups, patching, and OS maintenance.</p>
        <h3 class="lesson-h3">Scaling RDS</h3>
        <p>Relational databases are notoriously difficult to scale horizontally. To handle massive traffic:</p>
        <ul>
            <li><strong>Vertical Scaling:</strong> Upgrade the instance type (requires downtime).</li>
            <li><strong>Read Replicas:</strong> Offload read queries to up to 15 read-only copies of the database (scales reads, not writes).</li>
            <li><strong>Multi-AZ:</strong> Synchronous replication to a standby instance in another AZ for Disaster Recovery (does NOT scale performance, only availability).</li>
        </ul>
    `,
    "DynamoDB: The Speed Demon": `
        <h3 class="lesson-h3">Serverless NoSQL</h3>
        <p>Amazon DynamoDB is a fully managed, serverless, key-value NoSQL database designed to run high-performance applications at any scale. It guarantees single-digit millisecond latency whether your table is 1 Megabyte or 100 Terabytes.</p>
        <p>It is the backbone of Amazon.com's shopping cart. There are no limits to throughput or storage.</p>
        <div class="lesson-alert">
            <strong>Sales Tip:</strong> When a prospect complains about "database locking" or "connection pool exhaustion" under heavy load, pitch them DynamoDB. It scales via HTTP APIs, eliminating connection bottlenecks entirely.
        </div>
    `,

    // Module 11: Enterprise Sales Tech Stack
    "Salesforce is your Ledger": `
        <h3 class="lesson-h3">The Source of Truth</h3>
        <p>Listen up rookie. Salesforce isn't a suggestion; it's the absolute source of truth. If a technical win isn't documented in Salesforce, it didn't happen.</p>
        <p>Your Account Executive (AE) uses it to forecast to the VP, and the VP uses it to forecast to the board. If your technical fields (like 'Security Review Status' or 'POC Success Criteria') are empty, you are creating a forecasting disaster.</p>
        <h3 class="lesson-h3">Hygiene is Discipline</h3>
        <p>Enterprise buyers respect discipline. If you run a tight ship internally (clean CRM data, crisp follow-ups), they trust you will run a tight ship with their data. Keep your Salesforce fields updated.</p>
    `,
    "Gong: The Game Tape": `
        <h3 class="lesson-h3">Analyze the Tape</h3>
        <p>Gong isn't Big Brother, it's your game tape. You just got wrecked on a pricing objection by a hostile CTO? You don't just sulk. You go back, watch the tape, and figure out your tell.</p>
        <p>Great Sales Engineers use Gong to build a library of perfect objection handles. When someone asks a brutal question about latency, you find the recording of the senior SE absolutely crushing that question, and you memorize their cadence.</p>
        <div class="lesson-alert">
            <strong>Pro Tip:</strong> Search your Gong library for competitor names. Listen to how prospects describe the competitor's weaknesses in their own words. Use those exact words in your next pitch.
        </div>
    `,

    // Module 12: Zero Trust
    "Pitching Zero Trust": `
        <h3 class="lesson-h3">Stop Defining, Start Pitching</h3>
        <p>Stop defining Zero Trust as 'never trust, always verify'. The CFO doesn't care about network topologies. Pitch the business impact.</p>
        <p>Pitch it like this: "Right now, if an attacker phishes one intern, they have the keys to your entire kingdom. Zero Trust means the intern's compromised laptop can't even see the financial database, let alone query it."</p>
        <h3 class="lesson-h3">Blast Radius</h3>
        <p>You are selling blast radius containment. You are selling the ability for the CTO to sleep through the night because they know a single breached endpoint won't end up on the front page of the Wall Street Journal.</p>
    `,
    "Compliance is a Revenue Enabler": `
        <h3 class="lesson-h3">The Ticket to the High-Roller Table</h3>
        <p>SOC 2 Type II, ISO 27001, and HIPAA aren't technical hurdles—they are sales weapons. When you're selling to a Tier-1 bank, they will block the deal if you aren't compliant. Period.</p>
        <p>When you talk to a prospect's security team, treat compliance as a revenue-generating feature. Emphasize that your architecture was built from the ground up to sail through audits, saving them months of vendor risk assessments.</p>
    `,

    // Module 13: Hostile CTO
    "The 'Build vs Buy' Trap": `
        <h3 class="lesson-h3">The Ego Math Problem</h3>
        <p>Every CTO thinks their team can build your product in a weekend. Do not attack their engineering capability. Validate them, then crush the economics.</p>
        <p>"Yes, your team of 5 senior engineers could absolutely build this. But at $200k each, plus the opportunity cost of them not working on your core product, is this really where you want to deploy $1M of engineering capital?"</p>
        <div class="lesson-alert">
            <strong>Sales Tip:</strong> Point out the maintenance tail. Building it takes a weekend; maintaining it, patching it, and scaling it takes a dedicated engineer forever. We spread that cost across 1,000 customers. They can't.
        </div>
    `,
    "Technical Judo": `
        <h3 class="lesson-h3">Pivot the Attack</h3>
        <p>When a prospect attacks a missing feature, don't get defensive. Ask: "Help me understand the business impact of that specific workflow."</p>
        <p>Half the time, it's a vanity feature they read about in a blog post and don't actually need. Disqualify the requirement, not the product. If you understand the core business pain, you can almost always map it to an existing feature.</p>
    `,

    // Module 14: Demo Art
    "Discovery First, Always": `
        <h3 class="lesson-h3">You Are Not a Museum Guide</h3>
        <p>If you open your laptop and start clicking through screens before you've asked 3 deep discovery questions, you've already lost the deal.</p>
        <p>You aren't giving a museum tour. You are proving that your software solves their specific pain. If you don't know the pain, you can't present the cure.</p>
        <ul>
            <li>What happens if you do nothing?</li>
            <li>Who gets fired if this project fails?</li>
            <li>How are you measuring success?</li>
        </ul>
    `,
    "Tell-Show-Tell": `
        <h3 class="lesson-h3">The Magician's Framework</h3>
        <p>This is the only framework you need for a demo:</p>
        <ol>
            <li><strong>Tell:</strong> Set the expectation. "I'm going to show you how a developer deploys a cluster in 3 clicks without calling IT."</li>
            <li><strong>Show:</strong> Execute the trick flawlessly. Do exactly what you promised, nothing more.</li>
            <li><strong>Tell:</strong> The prestige. "Notice how we just completely bypassed the ticketing queue you complained about earlier? How much time does that save per week?"</li>
        </ol>
        <p>Then shut up and let them react.</p>
    `
};

// Process all modules
let updatedTopics = 0;
let fixedLegacyContent = 0;

DATA.course.forEach(mod => {
    mod.topics.forEach(topic => {
        let currentProse = topic.prose || "";
        
        // Fix for Modules 5-10: if topic.content exists and isn't merged, merge it!
        // The bug was: topic.content existed, but topic.prose only contained the analogy HTML.
        // We know it's a bug if currentProse starts with '<div class="lesson-analogy">' 
        // and topic.content has the real stuff.
        if (topic.content && currentProse.startsWith('<div class="lesson-analogy">')) {
            // Put content BEFORE the analogy
            topic.prose = topic.content + currentProse;
            fixedLegacyContent++;
        }
        
        // Expand Modules 1-4, 11-14
        if (expansions[topic.title]) {
            // Extract the analogy HTML from the current prose
            let analogyIdx = currentProse.indexOf('<div class="lesson-analogy">');
            let analogyHtml = "";
            if (analogyIdx !== -1) {
                analogyHtml = currentProse.substring(analogyIdx);
            } else {
                analogyHtml = '<div class="lesson-analogy">Analogy missing.</div>';
            }
            
            // Replace prose with Long-Form Expansion + Analogy
            topic.prose = expansions[topic.title] + analogyHtml;
            updatedTopics++;
        }
    });
});

let output = 'const DATA = ' + JSON.stringify(DATA, null, 2) + ';\n\n';
output += 'const SK="commuter_v3",XP_R={hard:5,good:10,easy:20,arch:50,sales:30,demo:40};\n';
output += 'const XP_CYCLE=200,IV={hard:60000,good:600000,easy:86400000};\n';

fs.writeFileSync('data.js', output);
console.log(`Successfully expanded ${updatedTopics} topics and fixed ${fixedLegacyContent} legacy content bugs.`);
