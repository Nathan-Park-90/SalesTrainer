const fs = require('fs');

// 1. Read data.js
let rawData = fs.readFileSync('data.js', 'utf-8');

// 2. Convert to module
let moduleStr = rawData.replace('const DATA = ', 'module.exports = ');
fs.writeFileSync('temp_data.js', moduleStr);

// 3. Require it
const DATA = require('./temp_data.js');

// 4. Update Exam Explanations
const explanations = [
    "AWS highly recommends storing database credentials in AWS Secrets Manager, which provides automatic rotation, KMS encryption, and fine-grained IAM access control. Parameter Store SecureString is an alternative but lacks automatic RDS rotation.",
    "Network ACLs (NACLs) are stateless and operate at the subnet level. Security Groups are stateful and operate at the instance level. You need both for defense in depth.",
    "You must use Customer Managed Keys (CMKs) in KMS to retain control over key rotation and to generate CloudTrail logs of all decrypt operations for compliance auditing.",
    "CloudTrail logs API activity (who did what). AWS Config tracks resource configuration changes (what changed and when). You need both for a complete audit posture.",
    "Secrets Manager natively integrates with RDS for automatic password rotation. Parameter Store does not have built-in rotation.",
    "SQS is for point-to-point guaranteed delivery. SNS is for fanout (one-to-many). EventBridge is for content-based routing.",
    "Aurora's premium is justified when you need more than 5 read replicas, auto-scaling storage up to 128TB, and sub-30-second failover.",
    "Read Replicas are asynchronous, meaning they can have replication lag. They are for scaling read traffic, not for synchronous failover.",
    "Latency routing policy directs users to the region with the lowest latency, making it ideal for active-active multi-region deployments.",
    "Step Functions provides state management, retry logic, error handling, and visual execution history for long-running workflows that direct Lambda chaining lacks."
];

// Add default explanations to all questions (if they don't have one)
if (DATA.exam) {
    DATA.exam.forEach((q, i) => {
        if (i < explanations.length) {
            q.explanation = explanations[i];
        } else {
            q.explanation = "Review the corresponding Core Knowledge flashcards for a deep dive into this topic.";
        }
    });
}

// 5. Append New Course Modules
if (!DATA.course) {
    DATA.course = [];
}

const newModules = [
    {
        title: "Module 11: Sales Tech Stack",
        desc: "Mastering the tools of the modern Enterprise SE.",
        topics: [
            {
                title: "Salesforce CRM",
                prose: "Salesforce is the source of truth. As an SE, you are responsible for updating technical fields, logging demo outcomes, and ensuring your forecast alignment matches the AE's."
            },
            {
                title: "Gong & Conversational AI",
                prose: "Gong records calls. Use it to build a library of perfect objection handles, analyze competitor mentions, and review your own talk track for 'feature dumping'."
            }
        ]
    },
    {
        title: "Module 12: Cybersecurity Basics",
        desc: "The fastest growing SE market segment.",
        topics: [
            {
                title: "Zero Trust Architecture",
                prose: "Never trust, always verify. Identity is the new perimeter. Every request must be authenticated and authorized, regardless of network location."
            },
            {
                title: "SIEM and SOC 2",
                prose: "A SIEM aggregates logs. SOC 2 Type II is an audit of your security controls over a period of time. You cannot sell SaaS to an enterprise without a SOC 2."
            }
        ]
    },
    {
        title: "Module 13: SE Interview Prep",
        desc: "Clearing the technical and presentation hurdles.",
        topics: [
            {
                title: "The Whiteboard Challenge",
                prose: "The goal is not to draw a perfect diagram. The goal is to discover the business constraints *while* drawing. Ask questions before you draw."
            },
            {
                title: "The Technical Demo",
                prose: "Structure: 1) State the pain. 2) Show the workflow that solves it. 3) Summarize the value. Never just click through menus."
            }
        ]
    },
    {
        title: "Module 14: AI & Agentic Workflows",
        desc: "Using AI to generate leverage.",
        topics: [
            {
                title: "Automated Account Research",
                prose: "Use Claude or ChatGPT to summarize 10-K filings. Prompt: 'Identify the top 3 strategic initiatives from this 10-K and map them to cloud infrastructure needs.'"
            },
            {
                title: "Dynamic Battle Cards",
                prose: "Feed a competitor's release notes into an LLM to automatically generate counter-narratives for your next discovery call."
            }
        ]
    }
];

DATA.course.push(...newModules);

// 6. Write back to data.js
const finalStr = 'const DATA = ' + JSON.stringify(DATA, null, 2) + ';\n';
fs.writeFileSync('data.js', finalStr);

// Cleanup
fs.unlinkSync('temp_data.js');
console.log('Successfully updated data.js with Explanations and Modules 11-14.');
