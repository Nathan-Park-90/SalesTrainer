threats: [
 {id:1,
  title:"The Silent Exfiltration",
  scenario:"500,000 customer records were exfiltrated from an AWS RDS instance over 3 weeks. The breach was only discovered when a threat intelligence feed flagged the company's data on a dark web forum. The attacker used valid IAM credentials obtained via a phishing email.",
  question:"Which combination of AWS controls would have been MOST likely to detect this intrusion while it was active?",
  opts:["VPC Security Groups locked to specific IP ranges","AWS GuardDuty detecting unusual API call patterns + CloudTrail logging all data access","RDS Automated Backups running daily","S3 Cross-Region Replication for the database"],
  ans:1,
  exp:"GuardDuty uses ML to detect anomalous behavior — unusual IAM credential usage from a new IP, atypical data query volumes, or access at unusual hours. CloudTrail logs every API call including RDS data access. Together they would have surfaced the unusual query volume and foreign IP access within hours, not weeks. VPC Security Groups control network access but the attacker had valid credentials — network rules don't stop authenticated API calls. Backups and replication are recovery tools, not detection tools."},

 {id:2,
  title:"The Accidental Public Bucket",
  scenario:"A junior developer accidentally set an S3 bucket containing private client contracts to public access during a development test. The bucket remained public for 4 hours before a client called to report their contract was accessible via a Google search result.",
  question:"Which AWS control detects this misconfiguration in real time — before the client calls?",
  opts:["AWS CloudTrail logging the PutBucketAcl API call","AWS Config rule s3-bucket-public-read-prohibited triggering a non-compliant alert","Amazon Macie scanning for sensitive data in the bucket","AWS Shield Advanced protecting against data exposure"],
  ans:1,
  exp:"AWS Config continuously evaluates bucket configurations against compliance rules. The s3-bucket-public-read-prohibited rule triggers a non-compliant finding the moment a bucket's public access settings change — typically within minutes. An SNS alert can notify the security team immediately. CloudTrail records WHO made the change and WHEN, but does not continuously check current state. Macie detects sensitive data IN buckets but doesn't specifically alert on public access policy changes. Shield protects against DDoS, not misconfiguration."},

 {id:3,
  title:"The Insider Threat",
  scenario:"A departing DevOps engineer used their elevated IAM permissions to delete production DynamoDB tables and disable CloudTrail logging across the account — all within a 10-minute window — two days before their last day was discovered by HR.",
  question:"Which architecture would have PREVENTED this attack, regardless of the engineer's IAM permissions?",
  opts:["Multi-AZ deployment of all production services","AWS Organizations Service Control Policies preventing CloudTrail disable and DynamoDB DeleteTable in the production OU","AWS WAF rules blocking destructive API calls","GuardDuty anomaly detection alerting on the destructive actions"],
  ans:1,
  exp:"SCPs (Service Control Policies) in AWS Organizations are permission guardrails that cannot be overridden by ANY IAM policy — including the root user of the member account. An SCP denying cloudtrail:StopLogging and dynamodb:DeleteTable in the production OU means even a fully-privileged IAM user cannot execute those actions. GuardDuty detects the attack but cannot prevent it. WAF protects web applications, not IAM API calls. Multi-AZ provides resilience after the fact. SCPs are the only control that prevents the action entirely."}
]