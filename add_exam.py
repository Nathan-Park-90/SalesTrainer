import codecs
import json

with codecs.open('data.js', 'r', 'utf-8') as f:
    content = f.read()

exam_json = """
  ,exam: [
    {
      q: "A company has a multi-tier web application running on EC2 instances behind an Application Load Balancer. The database is Amazon RDS for MySQL. The company wants to prevent SQL injection and cross-site scripting (XSS) attacks. What is the MOST operationally efficient way to achieve this?",
      opts: [
        "Install a third-party IPS/IDS agent on all EC2 instances.",
        "Configure AWS WAF on the Application Load Balancer.",
        "Use AWS Shield Advanced on the Application Load Balancer.",
        "Modify the Security Groups to block malicious IP addresses."
      ],
      ans: 1,
      exp: "AWS WAF (Web Application Firewall) natively integrates with ALBs to block Layer 7 attacks like SQL injection and XSS without managing third-party agents."
    },
    {
      q: "A financial services company needs to store data for 7 years for regulatory compliance. The data is rarely accessed, but when it is, it must be retrieved within 12 hours. The solution must be as cost-effective as possible. Which S3 storage class should they use?",
      opts: [
        "S3 Standard-Infrequent Access (S3 Standard-IA)",
        "S3 One Zone-Infrequent Access (S3 One Zone-IA)",
        "S3 Glacier Flexible Retrieval",
        "S3 Glacier Deep Archive"
      ],
      ans: 3,
      exp: "S3 Glacier Deep Archive is the cheapest storage class and supports retrieval times within 12 hours. Perfect for 7-year compliance archives."
    },
    {
      q: "You are designing an architecture for a new mobile game that uses a serverless backend. The game requires a database that provides single-digit millisecond latency at any scale. The schema is highly flexible and will change frequently. Which database service should you choose?",
      opts: [
        "Amazon RDS for PostgreSQL",
        "Amazon Aurora Serverless",
        "Amazon DynamoDB",
        "Amazon Redshift"
      ],
      ans: 2,
      exp: "DynamoDB is a serverless, NoSQL database (flexible schema) that guarantees single-digit millisecond latency at any scale."
    },
    {
      q: "A company’s on-premises application uses a proprietary file system (NFS) to share data across multiple Linux servers. They are migrating to AWS and need a fully managed shared file system that can be mounted by hundreds of EC2 instances across multiple Availability Zones. Which service should they use?",
      opts: [
        "Amazon EBS Multi-Attach",
        "Amazon EFS",
        "Amazon S3",
        "Amazon FSx for Windows File Server"
      ],
      ans: 1,
      exp: "Amazon Elastic File System (EFS) provides managed NFS shared storage for Linux instances across multiple AZs."
    },
    {
      q: "An application processes orders asynchronously. A web server sends order details to a queue. A fleet of worker EC2 instances pulls the orders from the queue and processes them. During a flash sale, the queue backs up and orders are delayed. How should you scale the worker instances to handle the load?",
      opts: [
        "Configure Auto Scaling based on CPU Utilization of the worker instances.",
        "Configure Auto Scaling based on the SQS queue depth (ApproximateNumberOfMessagesVisible).",
        "Change the EC2 instance type of the workers to a compute-optimized instance.",
        "Replace the SQS queue with Amazon SNS."
      ],
      ans: 1,
      exp: "For queue-based workloads, scaling based on CPU is too slow and inaccurate. Scaling based on the SQS queue depth ensures workers scale up precisely when the backlog grows."
    },
    {
      q: "A company wants to build a disaster recovery environment in a secondary AWS Region. They want to keep costs to an absolute minimum, but they require their core database to be continuously replicated to the secondary region. Application servers in the secondary region will remain shut down until a disaster occurs. Which DR strategy is this?",
      opts: [
        "Backup and Restore",
        "Pilot Light",
        "Warm Standby",
        "Multi-Site Active/Active"
      ],
      ans: 1,
      exp: "Pilot Light keeps only the core data replicated and running (like a pilot light on a gas heater). The rest of the infrastructure is provisioned or turned on only during a disaster."
    },
    {
      q: "You have a VPC with a public subnet and a private subnet. An EC2 instance in the private subnet needs to download software updates from the internet. It must not be accessible from the internet. How should you design this?",
      opts: [
        "Attach an Elastic IP to the private EC2 instance.",
        "Create a NAT Gateway in the public subnet and update the private subnet's route table to point to it.",
        "Create an Internet Gateway and attach it to the private subnet.",
        "Create a VPC Endpoint for the software repository."
      ],
      ans: 1,
      exp: "A NAT Gateway allows instances in a private subnet to initiate outbound IPv4 traffic to the internet while blocking inbound traffic."
    },
    {
      q: "A company is using AWS Organizations to manage multiple AWS accounts. The CISO wants to ensure that NO account in the organization can provision resources outside of the eu-central-1 region. What is the most efficient way to enforce this?",
      opts: [
        "Attach an IAM policy to every user in every account.",
        "Use AWS Config rules to terminate resources outside eu-central-1.",
        "Apply a Service Control Policy (SCP) to the Organization root.",
        "Create a VPC Endpoint Policy blocking cross-region traffic."
      ],
      ans: 2,
      exp: "Service Control Policies (SCPs) apply across the entire Organization (or specific OUs) and can explicitly deny actions (like launching EC2 instances) globally, overriding all IAM policies."
    },
    {
      q: "An application requires high availability and runs on EC2 instances. The instances must access a database that requires strong consistency and complex JOIN operations. Which database solution meets these requirements?",
      opts: [
        "Amazon DynamoDB with DAX",
        "Amazon RDS in a Multi-AZ deployment",
        "Amazon Redshift",
        "Amazon ElastiCache for Redis"
      ],
      ans: 1,
      exp: "Complex JOINs and strong consistency require a relational database. RDS in Multi-AZ provides the required high availability."
    },
    {
      q: "A global application serves users in the US and Europe. Users are complaining about high latency when accessing the dynamic API endpoints hosted in us-east-1. Which service will route user traffic over the AWS global network to improve performance?",
      opts: [
        "Amazon CloudFront",
        "AWS Global Accelerator",
        "AWS Direct Connect",
        "Amazon Route 53 Geolocation Routing"
      ],
      ans: 1,
      exp: "AWS Global Accelerator uses Anycast IPs and routes traffic over the AWS global backbone, significantly reducing latency and jitter for dynamic, non-cacheable API traffic."
    },
    {
      q: "A company needs to decouple their microservices. They want a publisher to send a single message that is instantly distributed to an SQS queue, a Lambda function, and an HTTP endpoint simultaneously. Which service should they use?",
      opts: [
        "Amazon SQS",
        "Amazon SNS",
        "AWS EventBridge",
        "AWS Step Functions"
      ],
      ans: 1,
      exp: "Amazon SNS (Simple Notification Service) provides the 'fanout' pattern, allowing a single published message to be pushed to multiple subscribers simultaneously."
    },
    {
      q: "A data engineering team needs to run complex SQL queries against petabytes of structured and semi-structured data stored in Amazon S3. They do not want to provision or manage any infrastructure. Which service should they use?",
      opts: [
        "Amazon Redshift",
        "Amazon Athena",
        "Amazon EMR",
        "Amazon RDS"
      ],
      ans: 1,
      exp: "Amazon Athena is a serverless interactive query service that allows you to analyze data directly in Amazon S3 using standard SQL."
    },
    {
      q: "An application is hosted on EC2 instances behind an ALB. The instances are in an Auto Scaling Group. To pass an upcoming compliance audit, all data at rest on the EC2 instances must be encrypted. How can this be achieved?",
      opts: [
        "Enable encryption on the ALB.",
        "Create a new encrypted EBS volume, copy data, and update the AMI.",
        "Enable EBS encryption by default in the AWS region.",
        "Install a third-party encryption agent on the EC2 instances."
      ],
      ans: 2,
      exp: "EBS volumes cannot be encrypted after creation. You must enable default encryption for future volumes, but for existing ones, you must snapshot, copy to an encrypted snapshot, create a volume, and update the AMI."
    },
    {
      q: "A company has a strict requirement that all cryptographic keys used to encrypt their S3 buckets must have their usage logged and the company must control the key rotation schedule. Which encryption method should they use?",
      opts: [
        "SSE-S3 (S3 Managed Keys)",
        "SSE-KMS with AWS Managed Keys",
        "SSE-KMS with Customer Managed Keys (CMKs)",
        "SSE-C (Customer-Provided Keys)"
      ],
      ans: 2,
      exp: "Customer Managed Keys (CMKs) in KMS give you full control over rotation schedules and log all key usage to CloudTrail."
    },
    {
      q: "You are designing an architecture for a highly available, fault-tolerant web application. Which of the following setups provides the highest level of fault tolerance?",
      opts: [
        "An Auto Scaling Group across multiple subnets in a single Availability Zone.",
        "An Auto Scaling Group across multiple Availability Zones behind an ALB.",
        "A single EC2 instance with an Elastic IP in a public subnet.",
        "Multiple EC2 instances in a Placement Group."
      ],
      ans: 1,
      exp: "Spanning an Auto Scaling Group across multiple Availability Zones behind an ALB ensures that if an entire data center (AZ) fails, the application remains available."
    },
    {
      q: "A machine learning team needs to process a massive dataset. The processing job can be interrupted and resumed without any issues. They want to minimize compute costs. Which EC2 purchasing option should they choose?",
      opts: [
        "On-Demand Instances",
        "Reserved Instances",
        "Spot Instances",
        "Dedicated Hosts"
      ],
      ans: 2,
      exp: "Spot Instances offer up to a 90% discount for spare capacity. They can be interrupted with a 2-minute warning, making them perfect for fault-tolerant batch processing."
    },
    {
      q: "A company wants to store application secrets (like database passwords) securely. They need the service to automatically rotate the RDS database password every 30 days without modifying the application code. Which service is designed for this?",
      opts: [
        "AWS Systems Manager Parameter Store",
        "AWS KMS",
        "AWS Secrets Manager",
        "AWS Certificate Manager"
      ],
      ans: 2,
      exp: "AWS Secrets Manager supports automatic rotation of credentials for supported AWS services like RDS, whereas Parameter Store does not have built-in rotation logic."
    },
    {
      q: "A media company needs to transfer 50 Terabytes of video archives from their on-premises data center to Amazon S3. Their internet connection is only 100 Mbps. Which AWS service is the MOST efficient way to transfer this data?",
      opts: [
        "AWS DataSync",
        "AWS Storage Gateway",
        "AWS Snowball Edge",
        "AWS Direct Connect"
      ],
      ans: 2,
      exp: "Transferring 50TB over 100Mbps would take months. AWS Snowball Edge is a physical device shipped to your data center to transfer terabytes or petabytes of data securely."
    },
    {
      q: "An application requires an in-memory datastore for sub-millisecond response times to cache frequently accessed database queries. The cache must support complex data structures and high availability with automatic failover. Which service should you choose?",
      opts: [
        "Amazon ElastiCache for Memcached",
        "Amazon ElastiCache for Redis",
        "Amazon DynamoDB Accelerator (DAX)",
        "Amazon RDS"
      ],
      ans: 1,
      exp: "Redis supports complex data structures (lists, sets) and High Availability (Multi-AZ with auto-failover). Memcached is simpler and does not support Multi-AZ failover."
    },
    {
      q: "A company's AWS account has been compromised. The attacker launched several expensive EC2 instances. The security team needs to determine exactly which IAM user launched the instances and from what IP address. Which service provides this information?",
      opts: [
        "Amazon CloudWatch",
        "AWS CloudTrail",
        "AWS Config",
        "AWS IAM Access Analyzer"
      ],
      ans: 1,
      exp: "AWS CloudTrail logs all API calls made in the account, including the identity of the caller, the time, and the source IP address."
    }
  ]
"""

# Find the end of the DATA object
start_sk = content.find('const SK=')
if start_sk != -1:
    end_data = content.rfind('}', 0, start_sk)
    
    if end_data != -1:
        new_content = content[:end_data] + exam_json + '\n' + content[end_data:]
        with codecs.open('data.js', 'w', 'utf-8') as f:
            f.write(new_content)
        print("Successfully added 20 Exam Questions to DATA!")
    else:
        print("Could not find end of DATA.")
else:
    print("Could not find SK.")
