const fs = require('fs');
let content = fs.readFileSync('data.js', 'utf8');
let evalContent = content.replace('const DATA =', 'var DATA=');
eval(evalContent);

const newCostQs = [
    {
        q: "Mammoth Capital runs a financial modeling job every night from 11 PM to 3 AM. The job uses 20 EC2 r6i.2xlarge instances. These instances sit idle the other 20 hours of the day. What is the most cost-effective purchasing option?",
        opts: ["On-Demand Instances", "Reserved Instances (1-year, all upfront)", "Scheduled Reserved Instances", "EC2 Spot Instances"],
        ans: 3,
        exp: "Spot Instances are ideal here. The batch job runs on a predictable schedule, is fault-tolerant (can checkpoint and restart), and runs during off-peak hours when Spot capacity is plentiful. Spot can save 70-90% over On-Demand. Reserved Instances would be wasteful — you'd pay for 24/7 capacity but only use 4 hours. On-Demand is the most expensive option for predictable workloads.",
        domain: "Cost"
    },
    {
        q: "A company has 50 EC2 instances spread across 4 AWS accounts. AWS Cost Explorer shows the total bill is $180,000/month. The CFO wants a single consolidated bill and volume discount. What is the correct AWS feature to implement?",
        opts: ["AWS Cost Explorer with linked accounts", "AWS Organizations with Consolidated Billing", "AWS Budgets with cross-account alerts", "AWS Control Tower with a Landing Zone"],
        ans: 1,
        exp: "AWS Organizations with Consolidated Billing combines usage from all member accounts into a single payer account. This unlocks volume pricing tiers (e.g., S3 charges drop at higher usage tiers) and provides one consolidated bill. Cost Explorer and Budgets help you analyse and alert on spend, but they don't create consolidated billing. Control Tower sets up multi-account governance, not billing consolidation.",
        domain: "Cost"
    },
    {
        q: "An RDS PostgreSQL database (db.r5.2xlarge, Multi-AZ) runs 24/7 for a production application. It has been running On-Demand for 14 months and the workload is stable. AWS Cost Explorer shows it costs $4,200/month. What should you do?",
        opts: ["Migrate to DynamoDB to eliminate the RDS cost", "Purchase a 1-year Reserved Instance for the RDS instance", "Switch to Aurora Serverless to only pay when the DB is active", "Downsize to db.r5.xlarge and monitor performance"],
        ans: 1,
        exp: "A stable, predictable, 24/7 production database is a textbook case for RDS Reserved Instances. 1-year All-Upfront reservation saves approximately 40% ($4,200 → ~$2,520/month). Aurora Serverless is designed for variable workloads — a stable production database would pay more with Serverless than with a Reserved Instance. Migrating to DynamoDB would require a full application rewrite for minimal guaranteed cost benefit.",
        domain: "Cost"
    },
    {
        q: "A startup stores 500TB of user-generated videos on S3 Standard. Analysis shows 90% of videos are never watched after 30 days. The CTO asks how to cut the $11,500/month S3 bill. What is the correct solution?",
        opts: ["Enable S3 Transfer Acceleration to reduce upload costs", "Configure S3 Intelligent-Tiering or a Lifecycle policy to move objects to S3 Standard-IA after 30 days and Glacier after 90 days", "Compress all videos to reduce storage size", "Move all videos to a single-AZ storage class"],
        ans: 1,
        exp: "S3 Lifecycle policies are the correct tool. After 30 days: move to S3 Standard-IA (40% cheaper). After 90 days: move to S3 Glacier Instant Retrieval (68% cheaper) or Glacier Flexible Retrieval (85% cheaper). S3 Intelligent-Tiering automatically moves objects between access tiers with no retrieval fees. This can reduce the bill from $11,500 to under $2,000/month. Single-AZ reduces availability — inappropriate for user data at this scale.",
        domain: "Cost"
    },
    {
        q: "AWS Trusted Advisor flags 12 EC2 instances with CPU utilization under 5% over the last 30 days. These are production application servers. What is the recommended cost-optimization action?",
        opts: ["Terminate all 12 instances immediately", "Rightsize the instances to a smaller instance type after validating with CloudWatch metrics", "Convert the instances to Spot Instances", "Purchase Reserved Instances to reduce hourly cost"],
        ans: 1,
        exp: "Rightsizing is the correct answer. First, validate with CloudWatch: check CPU, memory (via CloudWatch Agent), and network metrics across peak and off-peak periods. Then move to a smaller instance type (e.g., m5.xlarge → m5.large). Terminating production instances without analysis is reckless. Converting to Spot is inappropriate for production servers — they can be interrupted. Buying Reserved Instances for oversized instances locks in waste at a discount.",
        domain: "Cost"
    },
    {
        q: "A data analytics team spins up 30 large EC2 instances every morning, runs analysis jobs for 6 hours, and terminates them. They do this 5 days a week. Each instance costs $0.96/hour On-Demand. What purchasing model saves the most money for this exact pattern?",
        opts: ["1-year Standard Reserved Instances (all upfront)", "EC2 Spot Instances with a Spot Fleet and diversified instance pools", "Savings Plans (Compute, 1-year)", "On-Demand with Auto Scaling"],
        ans: 1,
        exp: "Spot Instances via a diversified Spot Fleet save the most — typically 70-90% off On-Demand ($0.96 → ~$0.10-$0.28/hr). The workload is batch, fault-tolerant (can checkpoint jobs), and runs during business hours when spot availability is high. Using a diversified Spot Fleet across multiple instance types and AZs minimizes interruption risk. Reserved Instances would cover 24/7 usage — but these instances only run 30 hours/week, making RIs wasteful. Savings Plans offer less discount than Spot for batch workloads.",
        domain: "Cost"
    },
    {
        q: "A company is designing a new microservices application. The architects are choosing between running services on EC2 (always-on), ECS on Fargate, or AWS Lambda. Each service handles unpredictable traffic bursts — quiet for hours then 10,000 requests in 5 minutes. Which option minimizes cost for this traffic pattern?",
        opts: ["EC2 Reserved Instances — cheapest per compute-hour", "ECS on Fargate — pay per task runtime, no idle cost", "AWS Lambda — pay per 100ms of execution, perfect for burst traffic", "EC2 Spot Instances — 70% discount with interruption tolerance"],
        ans: 2,
        exp: "Lambda is the most cost-effective for unpredictable burst traffic. You pay only for actual execution time (100ms increments) and the first 1 million requests/month are free. During quiet periods, Lambda costs $0. EC2 and Fargate charge whether the service is handling requests or sitting idle. For a service that's quiet for hours then spikes to 10,000 requests, Lambda costs a tiny fraction of always-on EC2. The trade-off: Lambda has a 15-minute execution limit and cold start considerations.",
        domain: "Cost"
    }
];

// Add to exam_aws
DATA.exam_aws.push(...newCostQs);

// Verify domain counts
const domains = {};
DATA.exam_aws.forEach(q => { domains[q.domain] = (domains[q.domain]||0)+1; });
const total = DATA.exam_aws.length;

fs.writeFileSync('data.js', 'const DATA = ' + JSON.stringify(DATA, null, 4) + ';', 'utf8');

console.log('Added', newCostQs.length, 'Cost Optimization questions');
console.log('New total:', total);
console.log('\nDomain distribution:');
Object.entries(domains).forEach(([d,n]) => console.log(`  ${d}: ${n} (${Math.round(n/total*100)}%)`));
console.log('\nReal SAA-C03 target: Secure 30%, Resilient 26%, Performance 24%, Cost 20%');
