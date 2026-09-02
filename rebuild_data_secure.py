
import re

# 1. Recover the v2 data object which has NO syntax errors
v2_code = open(r'C:\Users\Nate\.gemini\antigravity\brain\8b93e753-88e2-4c26-8b52-9c2c2159a793\scratch\write_v2.py', encoding='utf-8').read()

start = v2_code.find('const DATA = {')
# Find the exact end of the DATA object before the legacy fcs logic
end = v2_code.find('};\n  const fcs')
if end == -1: end = v2_code.find('};\n')

data_str = v2_code[start:end+1] # Includes the closing '}' of the DATA object

# 2. Re-inject the Curriculum Flashcards (AWS, Cyber, etc)
# Let's just grab them from inject_curriculum.py since it has them as strings.
curric_script = open('inject_curriculum.py', encoding='utf-8').read()
new_flashcards_match = re.search(r'new_flashcards = """(.*?)"""', curric_script, re.DOTALL)
if new_flashcards_match:
    new_flashcards = new_flashcards_match.group(1).strip()
    # Insert new flashcards at the end of the flashcards array
    fc_end = data_str.find(']', data_str.find('flashcards:['))
    data_str = data_str[:fc_end] + ",\n" + new_flashcards + "\n" + data_str[fc_end:]

# 3. Re-inject the Lessons
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
        <p>Amazon Elastic Compute Cloud (EC2) provides resizable compute capacity. Instead of buying physical servers, you rent virtual machines (Instances).</p>
      </div>
    `
  }
]
"""

# Insert lessons before the final closing brace of the DATA object
final_brace = data_str.rfind('}')
data_str = data_str[:final_brace] + lessons_str + "\n" + data_str[final_brace:]

# Write cleanly to data.js with semicolon
open('data.js', 'w', encoding='utf-8').write(data_str + ";\n")
print("Cleanly rebuilt data.js!")
