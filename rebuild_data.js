const fs = require('fs');

let c = fs.readFileSync('data.js', 'utf-8');
c = c.replace('const DATA=', 'var DATA=');
eval(c);

// We know course has 4 modules that are correct (1-4).
// Let's explicitly redefine course to have ALL 10 modules correctly.
let origCourse = DATA.course.slice(0, 4); // Keep 1-4

let mod5 = {
    moduleId: 5,
    title: "Module 5: SE Career Portfolio Guidance",
    icon: "🚀",
    topics: [
      {
        topicId: 501,
        title: "The SE Mindset Shift",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">From Builder to Trusted Advisor</h3>
            <p>A Software Engineer builds what they are told to build. A Solutions Engineer (SE) figures out what <em>should</em> be built to solve a business problem.</p>
            <p>Your goal is no longer just writing code. Your goal is <strong>Technical Translation</strong> — taking a complex product and explaining how it solves a CEO's top-line revenue problem, or a CTO's risk mitigation problem.</p>
            <h3 class="lesson-h3">The Portfolio You Need</h3>
            <p>To transition into an SE role, you need a portfolio that proves you can do both:</p>
            <ul>
              <li><strong>The Technical Chops:</strong> A working, deployed application (e.g., this exact study app).</li>
              <li><strong>The Business Acumen:</strong> Architecture diagrams, cost analysis, and "pitch" documents explaining <em>why</em> you built it this way.</li>
            </ul>
          </div>
        `
      },
      {
        topicId: 502,
        title: "Building the 'Hero' Project",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">What makes a good SE Portfolio Project?</h3>
            <p>A calculator app in React doesn't cut it. You need a project that demonstrates you understand <strong>systems</strong>.</p>
            <ul>
              <li><strong>Use a cloud provider:</strong> Host it on AWS. Use S3 for static assets, CloudFront for CDN, and Lambda for a backend API.</li>
              <li><strong>Implement Auth:</strong> Use Cognito or Auth0. Security is paramount in B2B sales.</li>
              <li><strong>Write a 'One-Pager':</strong> Create a PDF that pitches your project as if it were a B2B SaaS product. What is the value proposition? Who is the target buyer?</li>
            </ul>
          </div>
        `
      },
      {
        topicId: 503,
        title: "The SE Interview: The 'Demo' Round",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">The Final Boss</h3>
            <p>The most important part of an SE interview is the mock demo. They will ask you to present a product to a "customer".</p>
            <h3 class="lesson-h3">How to win:</h3>
            <ul>
              <li><strong>Discovery First:</strong> Never start by just showing features. Ask questions first.</li>
              <li><strong>Tell-Show-Tell:</strong> <em>Tell</em> them what you're going to show them. <em>Show</em> them the feature. <em>Tell</em> them how it solved their specific problem.</li>
              <li><strong>Handle Objections Gracefully:</strong> They will purposefully interrupt you. Don't get defensive. Pause, validate, and pivot.</li>
            </ul>
          </div>
        `
      }
    ]
};

let mod6 = {
    moduleId: 6,
    title: "Module 6: Advanced Networking & Content Delivery",
    icon: "🌍",
    topics: [
      {
        topicId: 601,
        title: "Route 53: Global Traffic Management",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">Beyond Simple DNS</h3>
            <p>Route 53 does more than just translate <code>mammothcapital.com</code> to an IP address. It is a highly available and scalable cloud Domain Name System (DNS) web service, but its real power is in <strong>Traffic Routing Policies</strong>.</p>
            <ul>
              <li><strong>Simple:</strong> One record, multiple IP addresses. Randomly chosen by the client. No intelligence.</li>
              <li><strong>Weighted:</strong> Route 80% to Region A, 20% to Region B. Perfect for A/B testing or canary deployments.</li>
              <li><strong>Latency:</strong> Route users to the AWS region that provides them the lowest latency.</li>
              <li><strong>Failover:</strong> Active-Passive disaster recovery. If the primary site health check fails, Route 53 automatically updates DNS to point to the secondary site.</li>
              <li><strong>Geolocation / Geoproximity:</strong> Route based on the actual physical location of the user (e.g., European users must hit European servers for GDPR).</li>
            </ul>
            <div class="lesson-alert">
              <strong>Exam Tip:</strong> If the scenario requires "Active-Passive" failover, choose Route 53 Failover Routing. If it requires "Active-Active" global load balancing, choose Route 53 Latency Routing or AWS Global Accelerator.
            </div>
          </div>
        `
      },
      {
        topicId: 602,
        title: "CloudFront vs. Global Accelerator",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">Solving the Speed of Light</h3>
            <p><strong>CloudFront</strong> is a Content Delivery Network (CDN). It caches static assets at Edge Locations globally. <em>Use case: Caching static content.</em></p>
            <p><strong>AWS Global Accelerator</strong> operates at the network layer (OSI Layer 4). It gives you two static Anycast IP addresses. Traffic from Tokyo enters the AWS global network at the Tokyo edge location, and is then routed over AWS's private, dedicated fiber backbone to your ALB in Virginia. <em>Use case: Accelerating dynamic, non-cacheable APIs or UDP traffic (like gaming or VoIP).</em></p>
          </div>
        `
      },
      {
        topicId: 603,
        title: "VPC Peering vs. Transit Gateway",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">Connecting the Moats</h3>
            <p>You have 10 VPCs. How do they talk to each other?</p>
            <p><strong>VPC Peering:</strong> A 1-to-1 connection between two VPCs. It is not transitive.</p>
            <p><strong>AWS Transit Gateway:</strong> A centralized hub-and-spoke router. You connect all 10 VPCs to the Transit Gateway. Any VPC can talk to any other VPC. You manage routing in one place.</p>
            <div class="lesson-alert">
              <strong>Analogy:</strong> VPC Peering is stringing a dedicated ethernet cable between every single server in your homelab. Transit Gateway is buying a Proxmox virtual switch and plugging everything into it.
            </div>
          </div>
        `
      }
    ]
};

let mod7 = {
    moduleId: 7,
    title: "Module 7: Security, Identity, & Compliance",
    icon: "🔒",
    topics: [
      {
        topicId: 701,
        title: "IAM Deep Dive: Policies & Federation",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">Identity-Based vs. Resource-Based Policies</h3>
            <p>An <strong>Identity-based policy</strong> is attached to a User, Group, or Role. It says "Nate is allowed to read from S3."</p>
            <p>A <strong>Resource-based policy</strong> is attached directly to the resource itself (like an S3 Bucket Policy). It says "This bucket allows Nate to read from it."</p>
            <p><em>To access a resource in the same account, an explicit ALLOW in EITHER policy grants access. To access a resource in a cross-account scenario, BOTH policies must explicitly allow it.</em></p>
            <h3 class="lesson-h3">Federation & Cognito</h3>
            <p>You don't want to create IAM users for 10,000 customers of your SaaS app. You use <strong>Amazon Cognito</strong>.</p>
            <ul>
              <li><strong>Cognito User Pools:</strong> Handle sign-up, sign-in, and authentication (like Auth0). Users get a JWT token.</li>
              <li><strong>Cognito Identity Pools:</strong> Exchange that JWT token for temporary AWS IAM credentials so the user can directly access AWS resources (like S3 uploads).</li>
            </ul>
          </div>
        `
      },
      {
        topicId: 702,
        title: "AWS KMS & Encryption at Rest",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">Key Management Service (KMS)</h3>
            <p>KMS is how you manage encryption keys in AWS. It is seamlessly integrated with EBS, S3, RDS, DynamoDB, etc.</p>
            <ul>
              <li><strong>AWS Managed Keys:</strong> AWS controls the rotation. Free, but you can't enforce strict compliance rules on them.</li>
              <li><strong>Customer Managed Keys (CMKs):</strong> You control the key policy, you can rotate them manually or automatically (every 1 year), and you pay per key. Required for strict compliance (SOC 2, HIPAA).</li>
            </ul>
          </div>
        `
      },
      {
        topicId: 703,
        title: "AWS WAF, Shield, & Macie",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">The Perimeter Defenses</h3>
            <p><strong>AWS Shield:</strong> Protects against DDoS attacks (Layer 3/4). Shield Standard is free and automatic for all customers.</p>
            <p><strong>AWS WAF (Web Application Firewall):</strong> Protects against Layer 7 attacks (SQL Injection, Cross-Site Scripting). You attach it to an ALB, API Gateway, or CloudFront distribution.</p>
            <p><strong>Amazon Macie:</strong> Uses machine learning to scan your S3 buckets and alert you if you left PII (credit cards, social security numbers) sitting in an unencrypted bucket.</p>
          </div>
        `
      }
    ]
};

let mod8 = {
    moduleId: 8,
    title: "Module 8: Management, Governance, & Analytics",
    icon: "📊",
    topics: [
      {
        topicId: 801,
        title: "CloudWatch vs. CloudTrail vs. Config",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">The Holy Trinity of Visibility</h3>
            <p>Do not confuse these three services. The exam will try to trick you.</p>
            <ul>
              <li><strong>CloudWatch:</strong> Monitors <em>Performance</em>. CPU utilization, memory, network in/out.</li>
              <li><strong>CloudTrail:</strong> Monitors <em>API Calls (Auditing)</em>. "Who created this EC2 instance? Who deleted that database?" CloudTrail logs every single API call made in the account.</li>
              <li><strong>AWS Config:</strong> Monitors <em>Configuration State</em>. "Was this S3 bucket public yesterday? When did it change?" Config records the state of your resources and can automatically evaluate them against compliance rules.</li>
            </ul>
          </div>
        `
      },
      {
        topicId: 802,
        title: "AWS Organizations & SCPs",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">Multi-Account Strategy</h3>
            <p>Enterprises do not use one AWS account. They use hundreds. <strong>AWS Organizations</strong> allows you to centrally manage billing and compliance across all of them.</p>
            <p><strong>Service Control Policies (SCPs):</strong> These are the ultimate guardrails. An SCP attached to an Organization Unit (OU) overrides EVERYTHING. If an SCP says "Deny all actions unless the region is us-east-1", then even the root user of a member account cannot launch an EC2 instance in eu-central-1. Period.</p>
          </div>
        `
      },
      {
        topicId: 803,
        title: "Kinesis & Big Data",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">Ingesting the Firehose</h3>
            <p>When millions of IoT devices or trading algorithms are sending data continuously, you cannot write it directly to a database. It will melt.</p>
            <p><strong>Kinesis Data Streams:</strong> A real-time streaming service. It ingests massive amounts of data and holds it for 1-365 days. Multiple consumers (like Lambda) can read the stream at their own pace.</p>
            <p><strong>Kinesis Data Firehose:</strong> A fully managed service that takes streaming data, batches it, and dumps it directly into S3, Redshift, or OpenSearch without you writing any custom code.</p>
            <p><strong>Amazon Athena:</strong> Serverless interactive query service. You can write SQL queries directly against CSV or JSON files sitting in an S3 bucket without loading them into a database first. You pay per TB of data scanned.</p>
          </div>
        `
      }
    ]
};

let mod9 = {
    moduleId: 9,
    title: "Module 9: Advanced Compute & Containers",
    icon: "🐳",
    topics: [
      {
        topicId: 901,
        title: "ECS vs. EKS vs. Fargate",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">The Container Wars</h3>
            <p>You have a Docker container. How do you run it on AWS?</p>
            <ul>
              <li><strong>ECS (Elastic Container Service):</strong> AWS's native container orchestrator. Simpler to use, deeply integrated with IAM and ALBs.</li>
              <li><strong>EKS (Elastic Kubernetes Service):</strong> Managed Kubernetes. Use this if you are migrating from on-prem Kubernetes or need multi-cloud portability.</li>
            </ul>
            <h3 class="lesson-h3">EC2 vs. Fargate (The Launch Type)</h3>
            <ul>
              <li><strong>EC2 Launch Type:</strong> You provision and manage the EC2 instances. You install the ECS/EKS agent. You patch the OS. (Cheaper, but higher operational overhead).</li>
              <li><strong>Fargate Launch Type:</strong> Serverless compute for containers. You do not see or manage EC2 instances. You just tell AWS "Run this container with 2 vCPUs and 4GB RAM." AWS handles the infrastructure.</li>
            </ul>
          </div>
        `
      },
      {
        topicId: 902,
        title: "AWS Batch & Elastic Beanstalk",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">PaaS and Batch Processing</h3>
            <p><strong>Elastic Beanstalk:</strong> A Platform as a Service (PaaS). A developer uploads a ZIP file containing their code, and Elastic Beanstalk automatically provisions the EC2 instances, Load Balancer, Auto Scaling Group, and RDS database.</p>
            <p><strong>AWS Batch:</strong> For running hundreds of thousands of batch computing jobs. It dynamically provisions the optimal quantity and type of compute resources (like Spot Instances) based on the volume and specific resource requirements of the batch jobs submitted.</p>
          </div>
        `
      }
    ]
};

let mod10 = {
    moduleId: 10,
    title: "Module 10: Migration & Disaster Recovery",
    icon: "🌋",
    topics: [
      {
        topicId: 1001,
        title: "Disaster Recovery Strategies (RTO & RPO)",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">The Metrics of Failure</h3>
            <p><strong>RPO (Recovery Point Objective):</strong> How much data can you afford to lose? If you backup every 24 hours, your RPO is 24 hours.</p>
            <p><strong>RTO (Recovery Time Objective):</strong> How long can the system be down before the business fails? If it takes 4 hours to restore from a backup, your RTO is 4 hours.</p>
            <h3 class="lesson-h3">The 4 DR Strategies (from cheapest to most expensive)</h3>
            <ol>
              <li><strong>Backup & Restore:</strong> Data is backed up to S3. In a disaster, you provision infrastructure and restore data. High RTO/RPO. Cheap.</li>
              <li><strong>Pilot Light:</strong> Core services (like the database) run continuously in the DR region. App servers are OFF. In a disaster, you turn on the app servers.</li>
              <li><strong>Warm Standby:</strong> A scaled-down version of your full environment runs 24/7 in the DR region. In a disaster, you just scale it up.</li>
              <li><strong>Multi-Site Active/Active:</strong> Full production environments run in both regions simultaneously. Route 53 routes traffic to both. Zero downtime. Exceptionally expensive.</li>
            </ol>
          </div>
        `
      },
      {
        topicId: 1002,
        title: "The AWS Snow Family",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">Never Underestimate a Station Wagon Full of Tapes</h3>
            <p>If you have 50 Terabytes of data, it will take months to upload over a 1Gbps internet connection. AWS provides physical devices to solve this.</p>
            <ul>
              <li><strong>Snowcone:</strong> 8TB. Small, rugged, can be carried in a backpack.</li>
              <li><strong>Snowball Edge:</strong> 80TB. A heavy suitcase. You plug it into your data center rack, transfer data locally, and UPS ships it back to AWS.</li>
              <li><strong>Snowmobile:</strong> 100 Petabytes. An actual 45-foot shipping container pulled by an 18-wheeler truck.</li>
            </ul>
          </div>
        `
      },
      {
        topicId: 1003,
        title: "AWS DataSync & Storage Gateway",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">Hybrid Cloud Data Transfer</h3>
            <p><strong>AWS DataSync:</strong> An agent you install on-prem that securely and rapidly automates moving data between on-prem storage (NFS/SMB) and AWS (S3, EFS, FSx).</p>
            <p><strong>AWS Storage Gateway:</strong> A hybrid cloud storage service that gives your on-prem applications seamless access to virtually unlimited cloud storage.</p>
            <ul>
              <li><strong>File Gateway:</strong> Presents an NFS/SMB interface on-prem, but stores the actual files as objects in S3.</li>
              <li><strong>Volume Gateway:</strong> Presents block storage (iSCSI) to on-prem servers. Caches frequent data locally but backs up all blocks to EBS snapshots in the cloud.</li>
              <li><strong>Tape Gateway:</strong> Replaces physical tape libraries with virtual tapes stored in S3 Glacier.</li>
            </ul>
          </div>
        `
      }
    ]
};

DATA.course = [...origCourse, mod5, mod6, mod7, mod8, mod9, mod10];

// The exam questions are already correct in DATA.exam, but we'll ensure they are clean.
let finalExam = [];
if(DATA.exam) {
    // filter out any weird stuff
    finalExam = DATA.exam.filter(e => e.q && e.opts);
}
DATA.exam = finalExam;

let newJS = 'const DATA = ' + JSON.stringify(DATA, null, 2) + ';\n\n';
newJS += `// ── STATE ──────────────────────────────────────────────────
const SK='commuter_v2',XP_R={hard:5,good:10,easy:20,arch:50,sales:30,demo:40};
const XP_CYCLE=200,IV={hard:60000,good:600000,easy:86400000};
`;

fs.writeFileSync('data.js', newJS, 'utf-8');
console.log('Rebuilt data.js completely with ALL modules securely inside DATA.course and exam inside DATA.exam.');
