
c = open('data.js', encoding='utf-8').read()

new_lessons = """
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

        <h3 class="lesson-h3">NAT Gateways and Bastion Hosts</h3>
        <p>If a database in a Private Subnet needs to download a patch from the internet, how does it do so without being exposed? You use a <strong>NAT Gateway</strong> placed in the Public Subnet. The private instance routes its outbound request through the NAT, which fetches the file and returns it, blocking any inbound connections.</p>
        <p>If <em>you</em> need to SSH into that private database, you use a <strong>Bastion Host</strong> (a jump box) in the Public Subnet. You SSH into the Bastion, and from the Bastion, you SSH into the private instance.</p>
        
        <div class="lesson-alert">
          <strong>Exam Tip:</strong> Never put RDS instances in a public subnet. Always use Multi-AZ for high availability, not Multi-Region, unless disaster recovery across continents is strictly required.
        </div>
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
        
        <h3 class="lesson-h3">Users, Groups, and Roles</h3>
        <ul>
          <li><strong>Users:</strong> Long-term credentials (passwords, access keys) mapped to a specific person.</li>
          <li><strong>Groups:</strong> Collections of users. Always attach policies to groups, never directly to users.</li>
          <li><strong>Roles:</strong> Temporary, assumable credentials. Roles are meant to be assumed by AWS services (like an EC2 instance or a Lambda function) or federated users (like someone logging in via Okta).</li>
        </ul>

        <h3 class="lesson-h3">Why Roles Matter for the Exam</h3>
        <p>The exam will frequently ask how to let an EC2 instance access an S3 bucket. <strong>The wrong answer is always:</strong> "Store access keys on the EC2 instance."</p>
        <p><strong>The correct answer:</strong> "Attach an IAM Role to the EC2 instance." The instance metadata service automatically provides temporary, rotating credentials to the application running on the server. There are no hardcoded secrets to leak.</p>

        <div class="lesson-alert">
          <strong>Exam Tip:</strong> Remember the Confused Deputy problem. Always use <code>aws:SourceArn</code> and <code>aws:SourceAccount</code> in your role trust policies to prevent cross-account exploitation.
        </div>
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
        <p><strong>Constraint:</strong> By default, an EBS volume can only be mounted to <em>one</em> EC2 instance at a time, and it must be in the exact same AZ as the instance.</p>

        <h3 class="lesson-h3">2. EFS (Elastic File System)</h3>
        <p>EFS is a managed NFS (Network File System). It can be mounted by hundreds of EC2 instances simultaneously across different AZs.</p>
        <p><strong>Constraint:</strong> It has higher latency than EBS. Never run a database on EFS. Use it for shared CMS files like WordPress uploads.</p>

        <h3 class="lesson-h3">3. S3 (Simple Storage Service)</h3>
        <p>S3 is object storage. It is infinitely scalable, extremely cheap, and serverless. You do not 'mount' S3; you access it via HTTP REST APIs.</p>
        <p><strong>Constraint:</strong> You cannot run an operating system or a database on S3. It is meant for backups, static assets (images, videos), and data lakes.</p>

        <div class="lesson-alert">
          <strong>Exam Tip:</strong> If the question mentions "shared storage across multiple AZs", the answer is EFS. If it mentions "durability for backups", the answer is S3. If it mentions "high IOPS for a database", the answer is EBS Provisioned IOPS.
        </div>
      </div>
    `
  }
]
"""

# Insert the lessons array before the final closing brace
end_idx = c.rfind('}')
c = c[:end_idx] + new_lessons + c[end_idx:]

open('data.js', 'w', encoding='utf-8').write(c)
print("Lessons injected successfully.")
