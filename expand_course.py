import codecs
import json

with codecs.open('data.js', 'r', 'utf-8') as f:
    content = f.read()

new_modules = """
  ,{
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
              <li><strong>Latency:</strong> Route users to the AWS region that provides them the lowest latency. If Nate is in Germany, route him to <code>eu-central-1</code>. If his CEO is in NY, route them to <code>us-east-1</code>.</li>
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
            <p><strong>CloudFront</strong> is a Content Delivery Network (CDN). It caches static assets (images, CSS, JS, videos) at Edge Locations globally. When a user in Tokyo requests your logo, they get it from the Tokyo edge, not your bucket in Virginia. <em>Use case: Caching static content.</em></p>
            <p><strong>AWS Global Accelerator</strong> operates at the network layer (OSI Layer 4). It gives you two static Anycast IP addresses. Traffic from Tokyo enters the AWS global network at the Tokyo edge location, and is then routed over AWS's private, dedicated fiber backbone to your ALB in Virginia. It avoids the jitter and packet loss of the public internet. <em>Use case: Accelerating dynamic, non-cacheable APIs or UDP traffic (like gaming or VoIP).</em></p>
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
            <p><strong>VPC Peering:</strong> A 1-to-1 connection between two VPCs. It is not transitive. If A peers with B, and B peers with C, A CANNOT talk to C. For 10 VPCs, you need 45 separate peering connections. It becomes an administrative nightmare.</p>
            <p><strong>AWS Transit Gateway:</strong> A centralized hub-and-spoke router. You connect all 10 VPCs to the Transit Gateway. Any VPC can talk to any other VPC. You manage routing in one place. It also connects to your on-premises data center via VPN or Direct Connect.</p>
            <div class="lesson-alert">
              <strong>Analogy:</strong> VPC Peering is stringing a dedicated ethernet cable between every single server in your homelab. Transit Gateway is buying a Proxmox virtual switch and plugging everything into it.
            </div>
          </div>
        `
      }
    ]
  },
  {
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
              <li><strong>Cognito Identity Pools:</strong> Exchange that JWT token for temporary AWS IAM credentials so the user can, for example, upload a profile picture directly to an S3 bucket without hitting your backend.</li>
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
              <li><strong>Customer Managed Keys (CMKs):</strong> You control the key policy, you can rotate them manually or automatically (every 1 year), and you pay $1/month per key. Required for strict compliance (SOC 2, HIPAA).</li>
            </ul>
            <p><strong>Envelope Encryption:</strong> KMS doesn't actually encrypt your 500GB database. It generates a Data Key. The Data Key encrypts the database. Then, KMS encrypts the Data Key. This is why you can instantly "destroy" a 500GB database by simply deleting the KMS Customer Master Key.</p>
          </div>
        `
      },
      {
        topicId: 703,
        title: "AWS WAF, Shield, & Macie",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">The Perimeter Defenses</h3>
            <p><strong>AWS Shield:</strong> Protects against DDoS attacks (Layer 3/4). Shield Standard is free and automatic for all customers. Shield Advanced costs $3,000/month and gives you a 24/7 response team and financial protection against scaling spikes caused by DDoS.</p>
            <p><strong>AWS WAF (Web Application Firewall):</strong> Protects against Layer 7 attacks (SQL Injection, Cross-Site Scripting). You attach it to an ALB, API Gateway, or CloudFront distribution. You write rules like "Block all traffic from this IP range" or "Rate limit requests to 100 per minute."</p>
            <p><strong>Amazon Macie:</strong> Uses machine learning to scan your S3 buckets and alert you if you left PII (credit cards, social security numbers) sitting in an unencrypted bucket.</p>
          </div>
        `
      }
    ]
  },
  {
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
              <li><strong>CloudWatch:</strong> Monitors <em>Performance</em>. CPU utilization, memory, network in/out. It is also where your application logs go (CloudWatch Logs). If an EC2 instance hits 90% CPU, CloudWatch triggers an Alarm to scale out.</li>
              <li><strong>CloudTrail:</strong> Monitors <em>API Calls (Auditing)</em>. "Who created this EC2 instance? Who deleted that database?" CloudTrail logs every single API call made in the account. It is your forensic evidence.</li>
              <li><strong>AWS Config:</strong> Monitors <em>Configuration State</em>. "Was this S3 bucket public yesterday? When did it change?" Config records the state of your resources and can automatically evaluate them against compliance rules (e.g., "All EBS volumes must be encrypted").</li>
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
            <div class="lesson-alert">
              <strong>Analogy:</strong> SCPs are the laws of physics in your AWS Organization. IAM policies are just company rules. You can't break the laws of physics.
            </div>
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
  },
  {
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
              <li><strong>EKS (Elastic Kubernetes Service):</strong> Managed Kubernetes. Use this if you are migrating from on-prem Kubernetes or need multi-cloud portability. It is much more complex than ECS.</li>
            </ul>
            <h3 class="lesson-h3">EC2 vs. Fargate (The Launch Type)</h3>
            <p>Whether you choose ECS or EKS, you must choose how the underlying servers are managed:</p>
            <ul>
              <li><strong>EC2 Launch Type:</strong> You provision and manage the EC2 instances. You install the ECS/EKS agent. You patch the OS. (Cheaper, but higher operational overhead).</li>
              <li><strong>Fargate Launch Type:</strong> Serverless compute for containers. You do not see or manage EC2 instances. You just tell AWS "Run this container with 2 vCPUs and 4GB RAM." AWS handles the infrastructure. (Slightly more expensive, zero operational overhead).</li>
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
            <p><strong>Elastic Beanstalk:</strong> A Platform as a Service (PaaS). A developer uploads a ZIP file containing their Java/Node/Python code, and Elastic Beanstalk automatically provisions the EC2 instances, Load Balancer, Auto Scaling Group, and RDS database. The developer focuses only on code. (Under the hood, it just creates standard AWS resources using CloudFormation).</p>
            <p><strong>AWS Batch:</strong> For running hundreds of thousands of batch computing jobs. It dynamically provisions the optimal quantity and type of compute resources (like Spot Instances) based on the volume and specific resource requirements of the batch jobs submitted.</p>
          </div>
        `
      }
    ]
  },
  {
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
              <li><strong>Pilot Light:</strong> Core services (like the database) run continuously in the DR region (minimal capacity). App servers are OFF. In a disaster, you turn on the app servers. Lower RTO.</li>
              <li><strong>Warm Standby:</strong> A scaled-down version of your full environment runs 24/7 in the DR region. In a disaster, you just scale it up to handle production load.</li>
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
              <li><strong>Snowcone:</strong> 8TB. Small, rugged, can be carried in a backpack. Can process data at the edge (IoT) before shipping back.</li>
              <li><strong>Snowball Edge:</strong> 80TB. A heavy suitcase. You plug it into your data center rack, transfer data locally, and UPS ships it back to AWS where they plug it directly into S3.</li>
              <li><strong>Snowmobile:</strong> 100 Petabytes. An actual 45-foot shipping container pulled by an 18-wheeler truck. Used for migrating entire massive data centers.</li>
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
            <p><strong>AWS DataSync:</strong> An agent you install on-prem that securely and rapidly automates moving data between on-prem storage (NFS/SMB) and AWS (S3, EFS, FSx). It optimizes network bandwidth and validates data integrity automatically.</p>
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
  }
"""

start_course = content.find('course: [')
if start_course != -1:
    end_course = content.rfind(']', start_course, content.rfind('}'))
    
    if end_course != -1:
        new_content = content[:end_course] + new_modules + '\n' + content[end_course:]
        with codecs.open('data.js', 'w', 'utf-8') as f:
            f.write(new_content)
        print("Successfully added Modules 6-10!")
    else:
        print("Could not find end of course array.")
else:
    print("Could not find course array.")
