exam: [
 {q:"Your app needs to send an event to both an SQS queue AND an email subscriber simultaneously when a trade executes. Which architecture is correct?",
  opts:["Two separate Lambda functions, one writing to SQS and one sending email","An SNS topic with SQS and Email subscriptions (fanout pattern)","An EventBridge rule routing to SQS and a separate rule routing to email","SQS with a dead-letter queue configured to forward to email"],
  ans:1,domain:"Resilient",
  exp:"SNS fanout: one message to SNS, delivered simultaneously to all subscribers (SQS queue, email endpoint, Lambda, HTTP). This is the standard decoupling pattern for multi-consumer event delivery."},

 {q:"An EC2 instance running your trading bot needs to read from DynamoDB. No credentials should exist in code or environment variables. What's the correct approach?",
  opts:["Store credentials in AWS Secrets Manager and have the code fetch them at startup","Use an IAM User with programmatic access keys stored in a config file","Attach an IAM Role to the EC2 instance with DynamoDB read permissions","Hardcode credentials in the Lambda environment variables with encryption enabled"],
  ans:2,domain:"Secure",
  exp:"IAM Roles attached to EC2 instances provide temporary credentials via the instance metadata service, rotated automatically every 15 minutes. No credentials stored anywhere. This is always the correct pattern over access keys for EC2 workloads."},

 {q:"Your RDS database needs to handle 50x the normal read load during quarterly reporting. You cannot modify the application code. What is the LOWEST COST solution?",
  opts:["Upgrade to a larger RDS instance class","Enable RDS Multi-AZ deployment","Create an RDS Read Replica and update the read connection string","Migrate from RDS to Aurora which handles higher throughput natively"],
  ans:2,domain:"Performing",
  exp:"A Read Replica offloads read traffic from the primary at approximately the cost of running a second instance. Multi-AZ adds a standby for failover, not read scaling. Upgrading instance class scales vertically but costs more than a same-sized read replica. Only requires updating the connection string — not application code."},

 {q:"A Lambda function currently processes jobs that run for 18 minutes each. What is the problem and what should you use instead?",
  opts:["Increase Lambda memory allocation to extend the timeout limit","Lambda has a 15-minute maximum timeout — use AWS Batch or Fargate for long-running jobs","Use Lambda SnapStart to reduce initialization time","Split the job into three 6-minute Lambda functions chained together"],
  ans:1,domain:"Resilient",
  exp:"Lambda has an absolute maximum timeout of 15 minutes. This is a hard limit — cannot be configured higher. Jobs exceeding 15 minutes need ECS Fargate, AWS Batch, or EC2. Chaining three 6-minute Lambdas creates the state management problem that Step Functions was built to solve."},

 {q:"Your S3 bucket stores private trading records. Which AWS service will AUTOMATICALLY detect and alert you if the bucket becomes publicly accessible?",
  opts:["AWS CloudTrail","AWS Shield","AWS Config with a managed rule for S3 public access","VPC Flow Logs"],
  ans:2,domain:"Secure",
  exp:"AWS Config's managed rule `s3-bucket-public-read-prohibited` continuously evaluates all S3 buckets and triggers a non-compliant finding if public access is enabled. CloudTrail records WHO made the bucket public but does not continuously check current state. Config answers 'what is the current configuration state.'"},

 {q:"Route 53 should route 90% of traffic to us-east-1 and 10% to eu-west-1 for canary testing of a new deployment. Which routing policy?",
  opts:["Failover routing","Geolocation routing","Weighted routing","Latency routing"],
  ans:2,domain:"Performing",
  exp:"Weighted routing distributes traffic in proportional weights across multiple records. Set us-east-1 weight to 90 and eu-west-1 weight to 10. Used for canary deployments, A/B testing, and gradual traffic migration. Failover is for primary/standby DR. Latency routes to the lowest-latency region, not a specific percentage."},

 {q:"Your startup runs batch ML training jobs on weekends. The jobs can be interrupted and restarted. What EC2 pricing model gives the highest discount?",
  opts:["1-year Reserved Instances (No Upfront)","Spot Instances","On-Demand Instances","Compute Savings Plans"],
  ans:1,domain:"Cost",
  exp:"Spot Instances provide 60-90% discount vs. On-Demand for spare EC2 capacity. They can be interrupted with a 2-minute warning — which is acceptable for fault-tolerant batch jobs that checkpoint to S3. Reserved Instances give 40-60% discount but require a 1-3 year commitment. Spot is the correct choice when interruption tolerance is acceptable."},

 {q:"Multiple EC2 instances need to share a common file system that all can read and write simultaneously. Which storage service handles this?",
  opts:["EBS gp3 volume with Multi-Attach enabled","Amazon S3 with concurrent access","Amazon EFS (Elastic File System)","Instance Store"],
  ans:2,domain:"Performing",
  exp:"EFS is a managed NFS file system that thousands of EC2 instances across multiple AZs can mount and access simultaneously with full read/write concurrency. EBS Multi-Attach has limited support (io1/io2 only, same AZ, up to 16 instances) and requires cluster-aware file systems. S3 is object storage, not a file system. Instance Store is local and non-shared."},

 {q:"A developer stores database credentials in AWS Systems Manager Parameter Store Standard tier with no encryption. A security auditor flags this. What is the recommended fix?",
  opts:["Move credentials to an encrypted S3 bucket with bucket policy restricting access","Use Parameter Store SecureString (KMS-encrypted) or migrate to AWS Secrets Manager for automatic rotation","Base64-encode the credentials before storing them in Parameter Store","Store credentials in AWS CloudFormation as a NoEcho parameter"],
  ans:1,domain:"Secure",
  exp:"Parameter Store SecureString encrypts values with KMS. AWS Secrets Manager adds automatic rotation for RDS, Redshift, and custom rotation Lambdas. Both are correct; Secrets Manager is preferred for production credentials that need automatic rotation. Base64 is encoding, not encryption. CloudFormation NoEcho only hides values in console output — they're still stored in plaintext in the stack."},

 {q:"CloudFront is serving stale content after you deployed updated JavaScript files to S3. Users are still seeing the old version. What is the correct fix?",
  opts:["Delete and recreate the CloudFront distribution","Update the S3 bucket policy to force CloudFront to re-fetch","Create a CloudFront cache invalidation for the affected paths","Change the CloudFront Origin to point to a new S3 bucket"],
  ans:2,domain:"Performing",
  exp:"CloudFront cache invalidation removes specific objects from edge caches before their TTL expires, forcing the next request to fetch fresh content from origin. Invalidating /* clears all cached objects. Alternative: use versioned file names (app.v2.js) so new deployments automatically bypass cache without invalidation costs. Invalidations are charged after the first 1,000 paths per month."}
]