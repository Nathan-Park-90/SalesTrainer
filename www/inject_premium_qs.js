const fs = require('fs');

let content = fs.readFileSync('data.js', 'utf8');
let evalContent = content.replace('const DATA =', 'var DATA=');
eval(evalContent);

// Keep only the first 24 questions (the original 20 + the 4 good ones I added)
if (DATA.exam_aws && DATA.exam_aws.length > 24) {
    DATA.exam_aws = DATA.exam_aws.slice(0, 24);
}

const eliteQs = [
    {
        q: "Mammoth Capital's quant team wants to run a Monte Carlo simulation overnight. They need 5,000 EC2 instances for exactly 4 hours. The job can be interrupted and resumed if needed, but the CFO will literally faint if this costs more than $200. What's the play?",
        opts: [
            "Reserved Instances (1-year term)",
            "Spot Instances with an Auto Scaling Group",
            "On-Demand Instances",
            "AWS Lambda functions chained together"
        ],
        ans: 1,
        domain: "Cost",
        exp: "Spot Instances offer up to a 90% discount compared to On-Demand. Since the Monte Carlo simulation is fault-tolerant and can be interrupted, Spot is the only way to keep the CFO conscious."
    },
    {
        q: "You are explaining AWS Networking to a Junior Dev. 'Think of it like our Proxmox homelab,' you say. 'The VPC is the datacenter. The Subnet is the VLAN. What is the AWS equivalent of our pfSense router that allows our private VMs to reach the internet for updates without exposing them to inbound traffic?'",
        opts: [
            "Internet Gateway (IGW)",
            "NAT Gateway",
            "Egress-Only Internet Gateway",
            "AWS Transit Gateway"
        ],
        ans: 1,
        domain: "Secure",
        exp: "A NAT Gateway (Network Address Translation) sits in a public subnet and allows instances in a private subnet to initiate outbound IPv4 traffic to the internet, but prevents the internet from initiating a connection back. It is exactly like your pfSense outbound NAT rule."
    },
    {
        q: "The Mammoth Capital trading dashboard is crashing. The backend RDS PostgreSQL database is hitting 100% CPU because 500 analysts are running complex read-heavy reports at the same time. The active trading engine (which writes to the DB) is starving. What is the fastest architectural fix?",
        opts: [
            "Migrate from RDS to DynamoDB.",
            "Increase the RDS instance size (Vertical Scaling) immediately.",
            "Create an RDS Read Replica and route the analysts' reporting queries to it.",
            "Put Amazon ElastiCache in front of the database."
        ],
        ans: 2,
        domain: "Performance",
        exp: "An RDS Read Replica offloads read traffic from the primary database. By pointing the analysts' heavy reports to the Read Replica, the primary database's CPU drops, allowing the trading engine to write without latency."
    },
    {
        q: "Your web application stores user session state on the local disk of its EC2 instances. During a traffic spike, the Auto Scaling Group adds 3 new instances. Suddenly, users are getting randomly logged out when they click links. Why?",
        opts: [
            "The Application Load Balancer (ALB) is using Round Robin without Sticky Sessions, and state isn't shared.",
            "The Auto Scaling Group is terminating the old instances.",
            "The new EC2 instances are in a different Availability Zone.",
            "The session state is encrypted with a KMS key that the new instances can't read."
        ],
        ans: 0,
        domain: "Resilient",
        exp: "If session state is stored locally, the load balancer must route the user back to the exact same instance every time (Sticky Sessions). The better, stateless architectural fix is to store sessions in ElastiCache (Redis) or DynamoDB so any instance can serve any user."
    },
    {
        q: "The Head of Security at Mammoth Capital drops a requirement on your desk: 'I need to know exactly who deleted the production S3 bucket, from what IP address, and at what time.' Which AWS service answers this question?",
        opts: [
            "Amazon CloudWatch",
            "AWS Config",
            "AWS CloudTrail",
            "Amazon GuardDuty"
        ],
        ans: 2,
        domain: "Secure",
        exp: "AWS CloudTrail records all API calls made in your account (who, what, when, where). CloudWatch is for metrics/logs. Config is for state changes. CloudTrail is the auditor's best friend."
    },
    {
        q: "You are building a decoupled order processing system. The web tier places trade orders into a queue, and a worker tier processes them. The order must be processed EXACTLY ONCE, and strictly IN THE ORDER it was received. What service do you use?",
        opts: [
            "Amazon SQS Standard Queue",
            "Amazon SQS FIFO Queue",
            "Amazon SNS",
            "Amazon Kinesis Data Streams"
        ],
        ans: 1,
        domain: "Resilient",
        exp: "SQS FIFO (First-In-First-Out) queues guarantee strictly ordered delivery and exactly-once processing, which is critical for financial transactions where processing out of order could cause massive losses."
    },
    {
        q: "Your company has a massive 50TB on-premises NAS full of video archives. They want to move it to AWS. Uploading it over the corporate 100Mbps internet connection will take roughly 46 days. What is the AWS-native solution?",
        opts: [
            "AWS Direct Connect",
            "AWS Storage Gateway",
            "AWS Snowball",
            "AWS DataSync"
        ],
        ans: 2,
        domain: "Performance",
        exp: "AWS Snowball is a physical device AWS ships to your datacenter. You plug it in, load the 50TB at local LAN speeds, and ship it back to AWS where they plug it directly into S3. It bypasses the internet bottleneck entirely."
    },
    {
        q: "A developer accidentally hardcoded their AWS Access Key and Secret Key into a Python script and pushed it to a public GitHub repository. Within 5 minutes, bitcoin miners are spinning up 100 expensive EC2 instances in your account. What is the FIRST step you must take?",
        opts: [
            "Delete the GitHub repository.",
            "Stop all the EC2 instances.",
            "Delete or deactivate the compromised Access Key in IAM.",
            "Change the root password of the AWS account."
        ],
        ans: 2,
        domain: "Secure",
        exp: "You must immediately kill the compromised credential in IAM (deactivate/delete the access key). Stopping the instances first is useless because the attacker's automated script will just spin them right back up using the active key."
    },
    {
        q: "Which AWS service is conceptually identical to running a Docker container on your Synology NAS, but without having to manage the underlying server OS or cluster capacity?",
        opts: [
            "Amazon ECS with EC2 launch type",
            "AWS Fargate",
            "AWS Elastic Beanstalk",
            "AWS Lambda"
        ],
        ans: 1,
        domain: "Performance",
        exp: "AWS Fargate is the serverless compute engine for containers. You just package your Docker container and say 'Run this', and AWS handles the underlying infrastructure. No EC2 instances to patch or manage."
    },
    {
        q: "You have a fleet of 50 EC2 instances. You want them to automatically download and install the latest security patches every Tuesday at 3 AM. What service orchestrates this?",
        opts: [
            "AWS Systems Manager (SSM) Patch Manager",
            "AWS CodeDeploy",
            "AWS Auto Scaling",
            "Amazon EventBridge"
        ],
        ans: 0,
        domain: "Secure",
        exp: "AWS Systems Manager (SSM) Patch Manager automates the process of patching managed instances with both security related and other types of updates across your entire fleet."
    },
    {
        q: "Mammoth Capital's architecture uses Amazon API Gateway triggering AWS Lambda. Traffic is usually 10 requests per second, but during a market crash, it spikes to 10,000 requests per second instantly. What happens?",
        opts: [
            "API Gateway crashes because it must be pre-warmed.",
            "Lambda instantly scales to handle 10,000 concurrent executions (assuming account limits allow it).",
            "The requests are queued in SQS automatically.",
            "The traffic is routed to an EC2 Auto Scaling Group."
        ],
        ans: 1,
        domain: "Performance",
        exp: "Both API Gateway and Lambda are fully managed serverless services that automatically and instantly scale to accommodate massive traffic spikes without any manual provisioning."
    },
    {
        q: "You are hosting a static website for a marketing campaign. You want the absolute lowest latency for users globally, and the files are just HTML, CSS, and images. What is the optimal architecture?",
        opts: [
            "EC2 instances in an Auto Scaling Group behind an ALB.",
            "Amazon S3 bucket configured for static website hosting.",
            "Amazon S3 bucket fronted by Amazon CloudFront.",
            "AWS Elastic Beanstalk."
        ],
        ans: 2,
        domain: "Performance",
        exp: "While S3 can host a static website, putting Amazon CloudFront (a CDN) in front of S3 caches the files at edge locations worldwide, drastically reducing latency for global users."
    }
];

DATA.exam_aws.push(...eliteQs);

const output = 'const DATA = ' + JSON.stringify(DATA, null, 4) + ';';
fs.writeFileSync('data.js', output, 'utf8');
console.log('Successfully injected premium witty questions. Total AWS Exam questions: ' + DATA.exam_aws.length);
