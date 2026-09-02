
import re

v2_code = open(r'C:\Users\Nate\.gemini\antigravity\brain\8b93e753-88e2-4c26-8b52-9c2c2159a793\scratch\write_v2.py', encoding='utf-8').read()

start = v2_code.find('const DATA = {')
end = v2_code.find('};\n  const fcs')
if end == -1: end = v2_code.find('};\n')

data_str = v2_code[start:end+1]

# Make sure data_str is solid
if 'const DATA' not in data_str:
    print("FATAL ERROR: data_str is invalid")
    exit(1)

# Now inject the flashcards from inject_curriculum.py
curric_script = open('inject_curriculum.py', encoding='utf-8').read()
new_flashcards_match = re.search(r'new_flashcards = """(.*?)"""', curric_script, re.DOTALL)
if new_flashcards_match:
    new_flashcards = new_flashcards_match.group(1).strip()
    fc_end = data_str.find(']', data_str.find('flashcards:['))
    data_str = data_str[:fc_end] + ",\n" + new_flashcards + "\n" + data_str[fc_end:]

# Inject Lessons
lessons_str = """
,lessons: [
  {
    id: 1,
    title: "AWS Cert: Global Infrastructure & Networking Foundations",
    content: `
      <div class="lesson-prose">
        <h3 class="lesson-h3">Regions vs. Availability Zones</h3>
        <p>Before you deploy a single server, you must understand where it lives. AWS is divided into <strong>Regions</strong> (e.g., <em>us-east-1</em> in N. Virginia). Each Region consists of 2 or more isolated <strong>Availability Zones (AZs)</strong>.</p>
        <p>An AZ is a discrete data center with redundant power, networking, and connectivity. If a flood takes out an AZ, the other AZs in that region survive. This is why you must deploy databases in "Multi-AZ" mode to survive a hardware failure.</p>
        <h3 class="lesson-h3">The Virtual Private Cloud (VPC)</h3>
        <p>A VPC is your private, logically isolated network in the cloud. It spans an entire Region, but it is divided into <strong>Subnets</strong>, which are tied to specific AZs.</p>
        <ul>
          <li><strong>Public Subnet:</strong> Has a route to an Internet Gateway (IGW). Instances here (like web servers) can be reached from the outside world.</li>
          <li><strong>Private Subnet:</strong> Has no route to the IGW. Databases and internal application servers live here. They are completely invisible to the internet.</li>
        </ul>
      </div>
    `
  },
  {
    id: 2,
    title: "AWS Cert: Identity & Access Management (IAM)",
    content: `
      <div class="lesson-prose">
        <h3 class="lesson-h3">The Principle of Least Privilege</h3>
        <p>IAM is the absolute perimeter of AWS. Unlike traditional on-prem networks where firewalls define security, in the cloud, identity is the new firewall.</p>
        <h3 class="lesson-h3">Why Roles Matter for the Exam</h3>
        <p>The exam will frequently ask how to let an EC2 instance access an S3 bucket. <strong>The wrong answer is always:</strong> "Store access keys on the EC2 instance."</p>
        <p><strong>The correct answer:</strong> "Attach an IAM Role to the EC2 instance." The instance metadata service automatically provides temporary, rotating credentials to the application running on the server. There are no hardcoded secrets to leak.</p>
      </div>
    `
  },
  {
    id: 3,
    title: "AWS Cert: Storage Solutions (S3 vs EBS vs EFS)",
    content: `
      <div class="lesson-prose">
        <h3 class="lesson-h3">Block vs. Object vs. File Storage</h3>
        <p>AWS offers three distinct storage paradigms. Using the wrong one will result in catastrophic performance or massive over-billing.</p>
        <h3 class="lesson-h3">1. EBS (Elastic Block Store)</h3>
        <p>EBS is a network-attached hard drive for your EC2 instance. It provides single-digit millisecond latency block storage, which is mandatory for relational databases and operating systems.</p>
        <h3 class="lesson-h3">2. EFS (Elastic File System)</h3>
        <p>EFS is a managed NFS (Network File System). It can be mounted by hundreds of EC2 instances simultaneously across different AZs.</p>
        <h3 class="lesson-h3">3. S3 (Simple Storage Service)</h3>
        <p>S3 is object storage. It is infinitely scalable, extremely cheap, and serverless. You do not 'mount' S3; you access it via HTTP REST APIs.</p>
      </div>
    `
  },
  {
    id: 4,
    title: "AWS Cert: Compute & Scaling (EC2, ASG, ELB)",
    content: `
      <div class="lesson-prose">
        <h3 class="lesson-h3">The Compute Foundation: EC2</h3>
        <p>Amazon Elastic Compute Cloud (EC2) provides resizable compute capacity. Instead of buying physical servers, you rent virtual machines (Instances). You must choose:</p>
        <ul>
          <li><strong>Instance Type:</strong> The hardware profile. (e.g., Compute-optimized, Memory-optimized).</li>
          <li><strong>AMI (Amazon Machine Image):</strong> The template (OS and pre-installed software) used to launch the instance.</li>
          <li><strong>Purchase Option:</strong> On-Demand (flexible, expensive), Reserved (1-3 year commitment, massive discount), or Spot (bidding on spare capacity, can be terminated anytime).</li>
        </ul>

        <h3 class="lesson-h3">Elastic Load Balancing (ELB)</h3>
        <p>A single EC2 instance is a single point of failure. To achieve high availability, you deploy multiple instances across multiple Availability Zones and place a Load Balancer in front of them.</p>
        <p>The ELB automatically distributes incoming application traffic across your healthy instances. If an instance fails, the ELB stops sending traffic to it.</p>

        <h3 class="lesson-h3">Auto Scaling Groups (ASG)</h3>
        <p>Traffic is rarely constant. An ASG monitors your application load and automatically adds or removes EC2 instances based on demand.</p>
        <p><strong>The Golden Architecture:</strong> An ELB routing traffic to an ASG spanning multiple AZs. This gives you High Availability (Multi-AZ) and Elasticity (ASG).</p>

        <div class="lesson-alert">
          <strong>Exam Tip:</strong> If an application has unpredictable, spiky workloads, always recommend Auto Scaling with On-Demand instances. Use Spot instances ONLY for fault-tolerant, interruptible workloads like batch processing.
        </div>
      </div>
    `
  },
  {
    id: 5,
    title: "AWS Cert: Database Services (RDS, DynamoDB, Redshift)",
    content: `
      <div class="lesson-prose">
        <h3 class="lesson-h3">Relational vs. NoSQL</h3>
        <p>Choosing the right database is one of the most heavily tested concepts on the exam.</p>

        <h3 class="lesson-h3">Amazon RDS (Relational Database Service)</h3>
        <p>RDS is a managed SQL database service (MySQL, PostgreSQL, Oracle, SQL Server). It is designed for structured data with complex joins and transactions.</p>
        <ul>
          <li><strong>Multi-AZ:</strong> Synchronous replication to a standby instance in another AZ. For disaster recovery, not performance.</li>
          <li><strong>Read Replicas:</strong> Asynchronous replication to scale out READ performance. Not for high availability.</li>
        </ul>

        <h3 class="lesson-h3">Amazon DynamoDB</h3>
        <p>DynamoDB is a serverless, NoSQL, key-value database. It guarantees single-digit millisecond performance at any scale.</p>
        <p>Use it for session state, user profiles, shopping carts, or any application needing massive write throughput without complex joins.</p>

        <h3 class="lesson-h3">Amazon Redshift</h3>
        <p>Redshift is a Petabyte-scale Data Warehouse. It uses columnar storage and is designed for complex OLAP (Online Analytical Processing) queries, not transactional web applications.</p>

        <div class="lesson-alert">
          <strong>Exam Tip:</strong> If the prompt mentions "JSON documents", "flexible schema", or "single-digit millisecond latency at any scale", the answer is DynamoDB. If it mentions "Data warehousing" or "Business Intelligence queries", the answer is Redshift.
        </div>
      </div>
    `
  },
  {
    id: 6,
    title: "AWS Cert: Decoupling & Serverless (SQS, SNS, Lambda)",
    content: `
      <div class="lesson-prose">
        <h3 class="lesson-h3">The Danger of Tight Coupling</h3>
        <p>If App A directly calls App B, and App B crashes, App A crashes too. This is tight coupling. To build resilient cloud architectures, you must decouple components using messaging services.</p>

        <h3 class="lesson-h3">Amazon SQS (Simple Queue Service)</h3>
        <p>SQS is a fully managed message queue. App A sends a message to the queue. App B pulls the message from the queue when it is ready to process it. If App B goes down, the messages wait safely in SQS. This is called the <strong>Worker Pattern</strong>.</p>
        <ul>
          <li><strong>Standard Queue:</strong> Best effort ordering, at-least-once delivery.</li>
          <li><strong>FIFO Queue:</strong> Strict ordering, exactly-once delivery (max 300 messages per second).</li>
        </ul>

        <h3 class="lesson-h3">Amazon SNS (Simple Notification Service)</h3>
        <p>SNS is a Pub/Sub service. App A publishes one message to an SNS topic, and the topic immediately pushes that message to multiple subscribers simultaneously (e.g., multiple SQS queues, Lambda functions, or email addresses). This is the <strong>Fanout Pattern</strong>.</p>

        <h3 class="lesson-h3">AWS Lambda</h3>
        <p>Lambda is the ultimate serverless compute. You upload your code, and AWS runs it only when triggered by an event (like a file landing in S3, or a message in SQS). You pay only for the compute time you consume, down to the millisecond. There are no servers to manage.</p>

        <div class="lesson-alert">
          <strong>Exam Tip:</strong> If a system is overwhelmed by spikes in processing requests, the answer is to introduce an SQS queue to buffer the load. SQS ensures messages are not lost during traffic spikes.
        </div>
      </div>
    `
  }
]
"""

final_brace = data_str.rfind('}')
data_str = data_str[:final_brace] + lessons_str + "\n" + data_str[final_brace:]

open('data.js', 'w', encoding='utf-8').write(data_str + ";\n")
print("Perfectly rebuilt data.js!")
