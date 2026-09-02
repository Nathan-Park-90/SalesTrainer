
const fs = require('fs');

let c = fs.readFileSync('data.js', 'utf8').replace('const DATA =', 'var DATA=');
eval(c);

const newCards = [
    {
        id: 101,
        cat: 'AWS',
        domain: 'Foundation',
        front: "Explain the difference between Bare Metal, Virtual Machines, and Containers in one sentence each.",
        back: "Bare Metal is an entire physical server dedicated to one OS. A Virtual Machine slices that physical server into multiple isolated fake computers with their own OS. A Container is a lightweight package of code that shares the host's OS kernel, making it instantly bootable.",
        tags: ['compute', 'virtualization']
    },
    {
        id: 102,
        cat: 'AWS',
        domain: 'Foundation',
        front: "If a lightning strike destroys a data center, how does a Multi-AZ deployment prevent downtime?",
        back: "An Availability Zone (AZ) is a physically isolated data center with independent power and networking. A Region contains multiple AZs. If lightning destroys AZ-A, your application automatically shifts traffic to your redundant resources in AZ-B within the same Region.",
        tags: ['regions', 'ha']
    },
    {
        id: 103,
        cat: 'AWS',
        domain: 'Foundation',
        front: "A CTO asks why they shouldn't just buy a bigger server (Vertical Scaling) instead of managing multiple small servers (Horizontal Scaling).",
        back: "Vertical Scaling has a hard physical ceiling (you can only buy a server so big) and requires downtime to upgrade. Horizontal Scaling has virtually no ceiling and allows you to dynamically add/remove servers on the fly without interrupting traffic.",
        tags: ['compute', 'scaling', 'asg', 'ha']
    },
    {
        id: 104,
        cat: 'AWS',
        domain: 'Foundation',
        front: "Your e-commerce site gets a massive traffic spike on Black Friday. How do you survive it without paying for idle servers the rest of the year?",
        back: "Use an Auto Scaling Group (ASG). You set rules based on CPU load. When traffic spikes, the ASG automatically provisions new EC2 instances to handle the load. When the spike subsides, it automatically terminates them to stop the billing.",
        tags: ['compute', 'scaling', 'asg', 'ha']
    },
    {
        id: 105,
        cat: 'AWS',
        domain: 'Compute',
        front: "What is an EC2 instance, and what is its primary use case in a modern cloud architecture?",
        back: "EC2 (Elastic Compute Cloud) is a standard Virtual Machine in AWS. It is the workhorse of the cloud, used when you need full control over the operating system, need to run legacy applications, or require sustained, uninterrupted compute power for long periods.",
        tags: ['compute', 'ec2']
    },
    {
        id: 106,
        cat: 'AWS',
        domain: 'Compute',
        front: "Explain AWS Lambda's pricing model and why it is called 'Serverless'.",
        back: "Lambda executes code in response to events without you provisioning or managing any underlying servers (hence 'Serverless'). You are billed purely by the millisecond of execution time. If your code isn't running, you pay absolutely nothing.",
        tags: ['compute', 'lambda']
    },
    {
        id: 107,
        cat: 'AWS',
        domain: 'Security',
        front: "A developer wants to hardcode AWS credentials into their application to access S3. Why is this a fatal flaw, and what is the IAM solution?",
        back: "Hardcoded credentials can be leaked in source code or compromised. The correct solution is IAM Roles. You assign an IAM Role to the EC2 instance or Lambda function, which securely requests temporary, rotating credentials from AWS on the fly.",
        tags: ['security', 'iam']
    },
    {
        id: 108,
        cat: 'AWS',
        domain: 'Security',
        front: "Your compliance team mandates that all database backups must be 'Encrypted at Rest'. What AWS service manages this?",
        back: "AWS KMS (Key Management Service). KMS handles the creation, rotation, and usage logging of encryption keys. You simply check 'Enable Encryption' on RDS or S3, and AWS uses KMS to transparently encrypt the data before it hits the disk.",
        tags: ['security', 'kms']
    },
    {
        id: 109,
        cat: 'AWS',
        domain: 'Security',
        front: "A competitor launches a DDoS attack against your web application, flooding it with fake HTTP requests. Which service blocks this?",
        back: "AWS WAF (Web Application Firewall) inspects incoming HTTP/HTTPS traffic and blocks malicious payloads (like SQL injection) or rate-limits IPs. For volumetric DDoS attacks (Layer 3/4), AWS Shield automatically mitigates the flood.",
        tags: ['security', 'waf', 'shield']
    },
    {
        id: 110,
        cat: 'AWS',
        domain: 'Compute',
        front: "What is the difference between ECS, EKS, and Fargate?",
        back: "ECS is AWS's proprietary container orchestrator. EKS is managed Kubernetes. Fargate is the serverless compute engine for both—it allows you to run containers without managing the underlying EC2 instances.",
        tags: ['compute', 'ecs', 'eks', 'fargate']
    },
    {
        id: 111,
        cat: 'AWS',
        domain: 'Compute',
        front: "A data scientist needs to process 10,000 images overnight using a custom script. Which Compute service is optimized for this?",
        back: "AWS Batch. It dynamically provisions the exact quantity and type of compute resources (like GPU instances) needed to chew through a massive queue of batch computing jobs, then spins them down when the queue is empty.",
        tags: ['compute', 'batch', 'elastic beanstalk']
    }
];

DATA.flashcards.push(...newCards);

const serialized = 'const DATA = ' + JSON.stringify(DATA, null, 4) + ';';
fs.writeFileSync('data.js', serialized, 'utf8');

console.log('11 new flashcards injected successfully!');
