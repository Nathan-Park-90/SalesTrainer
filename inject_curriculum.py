
import re

c = open('data.js', encoding='utf-8').read()

new_flashcards = """
  ,{id:101,cat:'AWS',domain:'Networking',front:"A client asks: 'Why can't I ping my RDS instance from my laptop?' Explain the fundamental AWS networking boundary and the required components to establish that connection securely.",back:"RDS instances should be placed in Private Subnets with no route to an Internet Gateway (IGW). To connect from a laptop, you must bridge the public internet to your private VPC. The secure pattern is an AWS Client VPN Endpoint, or a Bastion Host (EC2) in a Public Subnet (with IGW) that you SSH into, which then connects to the RDS instance in the Private Subnet. Never put a database in a public subnet.",analogy:"You cannot open the bank vault directly from the street. You must enter the lobby (Public Subnet), show ID to the guard (Bastion/VPN), and then the guard lets you into the vault room (Private Subnet)."},
  {id:102,cat:'AWS',domain:'Storage',front:"A developer wants to use EFS for their database storage because 'it automatically scales.' Why is this an architectural disaster?",back:"EFS (Elastic File System) is a network-attached shared file system designed for high throughput and multiple concurrent EC2 mounts. It has significantly higher latency than block storage. Databases (like MySQL or PostgreSQL) require low-latency block storage (EBS) for transactional consistency and high IOPS. Putting a relational database on EFS will result in catastrophic performance degradation and potential data corruption.",analogy:"EFS is a shared Google Drive for documents. EBS is the internal SSD soldered to your motherboard. You don't run an operating system off a Google Drive."},
  {id:103,cat:'Sales',domain:'MEDDPICC',front:"You are speaking to the Director of Engineering (your Champion). They say 'I have the budget to buy this.' What is the critical distinction you must make to determine if they are actually the Economic Buyer?",back:"Having a budget is not the same as having discretionary sign-off authority. You must ask: 'If you decide to move forward, who else needs to sign the final PO or approve the vendor onboarding?' Many Directors have a $100k budget but still require CFO or VP approval for net-new software contracts over $50k. If someone can veto their decision, they are NOT the Economic Buyer.",analogy:"Having a pre-approved credit card limit is not the same as being the account owner who can change the limit."},
  {id:104,cat:'Cyber',domain:'IAM',front:"What is a confused deputy attack in AWS, and how do you mitigate it using IAM condition keys?",back:"A confused deputy attack occurs when a malicious entity coerces a privileged service (like CloudFormation or Lambda) to act on its behalf to access resources it shouldn't. Mitigation: Use the `aws:SourceArn` and `aws:SourceAccount` condition keys in your IAM role trust policies. This restricts the assumption of the role only to the specific resource (e.g., a specific Lambda function ARN) in your specific account.",analogy:"A confused deputy is a valet who takes the keys from anyone who confidently points at your car. The mitigation is telling the valet to only accept keys from someone showing your specific driver's license."}
"""

new_arch = """
  ,{
    problem: "A client needs a globally available API. Reads must be single-digit milliseconds globally. Writes can be asynchronously replicated. Traffic is highly variable and unpredictable. Architect the optimal serverless data layer.",
    desc: "Global, serverless, low-latency reads.",
    draggables: ["DynamoDB Global Tables", "RDS Multi-AZ", "ElastiCache Redis", "API Gateway", "EC2 Auto Scaling"],
    correct: ["API Gateway", "DynamoDB Global Tables"]
  },
  {
    problem: "A media company needs to process thousands of uploaded video files. The processing job takes 10-20 minutes per file. If a job fails, it must be retried automatically. Architect the decoupling and processing layer.",
    desc: "Asynchronous processing, long-running tasks, decoupling.",
    draggables: ["S3", "SQS", "Lambda", "ECS Fargate", "EventBridge"],
    correct: ["S3", "SQS", "ECS Fargate"]
  }
"""

new_sales = """
  ,{
    type: "Pricing Objection",
    trigger: "Your competitor is offering the same feature set for 30% less.",
    bad: "We can look at applying a discount to match them.",
    good: "If we remove the price tag for a moment, which architecture actually solves your downtime issue? If theirs does, you should buy it. But our 30% premium covers the active-active failover that prevents the $100k/hour outages we mapped earlier."
  },
  {
    type: "Implementation Anxiety",
    trigger: "Our engineering team is completely underwater. We can't rip and replace right now.",
    bad: "Our implementation is really easy and fast.",
    good: "I hear that. A full rip and replace is reckless anyway. What if we start by migrating just the non-critical QA workloads this quarter to prove value, without touching production?"
  }
"""

new_threats = """
  ,{
    trigger: "S3 Bucket Ransomware (Data Deletion/Encryption)",
    impact: "Attacker gains access keys, deletes critical backups, and demands ransom.",
    defense: "S3 Object Lock (Compliance Mode) guarantees write-once-read-many (WORM). Even root users cannot delete or modify the object until the retention period expires."
  },
  {
    trigger: "Server-Side Request Forgery (SSRF) against EC2 Metadata",
    impact: "Attacker exploits a vulnerable web app to query `169.254.169.254` and extract the EC2 instance's temporary IAM credentials.",
    defense: "Enforce IMDSv2 (Instance Metadata Service Version 2) which requires a session token via PUT request, neutralizing simple GET-based SSRF attacks."
  }
"""

# Insert new flashcards
fc_end = c.find(']', c.find('flashcards:['))
c = c[:fc_end] + new_flashcards + c[fc_end:]

# Insert new arch
arch_end = c.find(']', c.find('arch:'))
if arch_end != -1:
    c = c[:arch_end] + new_arch + c[arch_end:]

# Insert new sales
sales_end = c.find(']', c.find('sales:'))
if sales_end != -1:
    c = c[:sales_end] + new_sales + c[sales_end:]

# Insert new threats
# Threats might not have an array if it was missing.
threats_start = c.find('threats:[')
if threats_start != -1:
    threats_end = c.find(']', threats_start)
    c = c[:threats_end] + new_threats + c[threats_end:]
else:
    # Append threats entirely
    c = c.replace('};', ',\nthreats: [' + new_threats.strip().strip(',') + ']\n};')

open('data.js', 'w', encoding='utf-8').write(c)
print("Data injected successfully.")
