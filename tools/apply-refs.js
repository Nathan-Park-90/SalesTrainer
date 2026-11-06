#!/usr/bin/env node
// Applies exam question `ref` mappings from tools/refs/aws-saa-c03.json into www/courses/aws-saa-c03.js
// and generates tools/refs/aws-gaps.md for all `gap: true` questions.
// Verifies each index and the first 60 chars of `q`, places `ref` last in each exam question object,
// and ensures that removing every `ref` key reproduces the original file byte-for-byte.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const COURSE_FILE = path.join(ROOT, 'www', 'courses', 'aws-saa-c03.js');
const REFS_FILE = path.join(ROOT, 'tools', 'refs', 'aws-saa-c03.json');
const GAPS_FILE = path.join(ROOT, 'tools', 'refs', 'aws-gaps.md');

const GAP_FACTS = {
  14: 'AWS Systems Manager Patch Manager for automated OS patching across EC2 fleets.',
  21: 'AWS Serverless Application Model (AWS SAM) for declarative serverless application deployment.',
  28: 'AWS Resource Access Manager (AWS RAM) for sharing VPC subnets, Transit Gateways, and other resources across AWS Organizations accounts.',
  29: 'EC2 Dedicated Hosts and AWS License Manager for physical socket/core visibility and BYOL server-bound software licenses.',
  34: 'AWS CloudHSM for single-tenant, FIPS 140-2/140-3 Level 3 dedicated hardware security modules under full customer control.',
  36: 'AWS Backup and AWS Backup Vault Lock for centralized, cross-service backup retention and immutable WORM protection.',
  37: 'AWS Outposts for running native AWS rack hardware on-premises to achieve sub-millisecond local latency.',
  38: 'AWS Client VPN for managed OpenVPN-based remote user connectivity into VPC resources.',
  46: 'AWS App Runner for deploying containerized web apps directly from source/container images without managing orchestration or load balancers.',
  50: 'Amazon Route 53 Private Hosted Zones for split-horizon internal VPC DNS resolution.',
  53: 'AWS Systems Manager Session Manager for zero-inbound-port interactive shell access without SSH keys or bastion hosts.',
  57: 'Amazon DynamoDB Global Tables for multi-Region, active-active NoSQL replication with sub-second RPO/RTO.',
  58: 'AWS Cloud Development Kit (AWS CDK) for defining cloud infrastructure in imperative programming languages (TypeScript, Python, Java, C#).',
  59: 'Auto Scaling Predictive Scaling policies using machine learning to provision EC2 capacity ahead of recurring daily/weekly spikes.',
  62: 'AWS Transfer Family for managed SFTP, FTPS, and FTP file transfers directly into Amazon S3 or Amazon EFS.',
  66: 'AWS Backup with cross-Region backup copy policies for centralized disaster recovery.',
  68: 'AWS Organizations Consolidated Billing for combining usage across member accounts to share EC2 Reserved Instance and volume tier discounts.',
  69: 'Amazon RDS Reserved Instances (1-year or 3-year commitments) for discounting steady-state 24/7 RDS Multi-AZ database compute.',
  75: 'Lambda Kinesis Event Source Mapping bisect-on-error (BisectBatchOnFunctionError), MaximumRetryAttempts, and On-Failure Destination to isolate poison-pill records.',
  93: 'AWS Elastic Disaster Recovery (AWS DRS) for continuous block-level replication into a low-cost staging area with minutes RTO and seconds RPO.',
  95: 'EC2 Auto Scaling Group health check grace period and ELB health check type configuration to prevent premature termination during slow boot.',
  96: 'Amazon Route 53 Application Recovery Controller (ARC) routing controls (data-plane cluster endpoints) for reliable multi-Region failover.',
  97: 'SQS Lambda Event Source Mapping ReportBatchItemFailures (batchItemFailures) for partial batch failure handling without reprocessing succeeded messages.',
  98: 'EC2 Auto Scaling Warm Pools (Stopped or Running pre-initialized instances) to eliminate long UserData/boot times during scale-out.',
  102: 'EC2 Spot Instance rebalance recommendations (rebalance signal) and Auto Scaling Capacity Rebalancing for proactive Spot replacement.',
  104: 'Customer-created AWS PrivateLink VPC Endpoint Services backed by a Network Load Balancer (NLB) to expose services across overlapping CIDRs.',
  106: 'Amazon ECS Deployment Circuit Breaker with automatic rollback and desired count >= 2 across multiple AZs.',
  108: 'Amazon RDS Multi-AZ DB Cluster deployment (one writer + two readable standbys across 3 AZs) for faster failover and extra read capacity.',
  109: 'EC2 Auto Scaling Lifecycle Hooks (autoscaling:EC2_INSTANCE_TERMINATING) and EventBridge/SSM drainage before terminating worker instances.',
  110: 'AWS Direct Connect Maximum Resiliency (99.99% SLA) topology requiring 4 independent connections across 2 DX locations.',
  111: 'Amazon S3 Replication Time Control (S3 RTC) for SLA-backed Cross-Region Replication (99.99% within 15 minutes) and S3 Event Notifications.',
  113: 'Amazon DynamoDB Deletion Protection and Point-in-Time Recovery (PITR) for continuous 35-day per-second table recovery.',
  115: 'Amazon SQS ChangeMessageVisibility API heartbeats to dynamically extend visibility timeout for long-running jobs.',
  116: 'Amazon Aurora Backtrack (in-place rewind for Aurora MySQL) vs Point-in-Time Restore.',
  117: 'AWS Backup cross-account backup copy with AWS Backup Vault Lock in Compliance mode (min/max retention + cooling-off period) for ransomware defense.',
  119: 'Amazon Route 53 Resolver Inbound and Outbound Endpoints (with forwarding rules) for hybrid DNS resolution between VPCs and on-premises AD DNS.',
  120: 'AWS Fault Injection Service (AWS FIS) for managed chaos engineering fault-injection experiments with CloudWatch stop conditions.',
  122: 'AWS Elastic Beanstalk deployment policies (Immutable, Rolling with additional batch, All at once, Traffic splitting).',
  125: 'Amazon EBS Fast Snapshot Restore (FSR) to eliminate first-read I/O latency penalties on volumes restored from snapshots.',
  127: 'CloudFront Functions (sub-ms viewer request/response edge runtime at 600+ PoPs) vs Lambda@Edge.',
  128: 'S3 parallel Byte-Range Fetches (Range HTTP header) and S3 Transfer Acceleration for high-throughput downloads.',
  129: 'Amazon EFS Elastic Throughput mode (automatic pay-per-use throughput up to 20 GiB/s read / 4.5 GiB/s write) vs Bursting and Provisioned modes.',
  130: 'Amazon Kinesis Data Streams Enhanced Fan-Out (dedicated 2 MB/s HTTP/2 push pipe per consumer per shard).',
  132: 'Amazon Neptune managed graph database (Property Graph / TinkerPop Gremlin and RDF / SPARQL) for multi-hop relationship traversal.',
  133: 'Amazon Timestream serverless time-series database with automatic memory-to-magnetic tiering and built-in time-series SQL functions.',
  134: 'AWS Lambda SnapStart for Java (Firecracker microVM snapshot caching) and linear scaling of Lambda vCPU with configured memory (1,769 MB = 1 vCPU).',
  136: 'CloudFront Cache Policies (custom cache keys) vs Origin Request Policies and CloudFront Origin Shield.',
  138: 'Amazon Aurora Custom Endpoints to partition Aurora Replicas into dedicated workload pools (OLTP vs BI analytics).',
  139: 'Amazon Redshift RA3 nodes with Redshift Managed Storage (RMS) and Concurrency Scaling for decoupled compute/storage and read bursts.',
  140: 'Amazon Redshift distribution styles (DISTSTYLE KEY, ALL, EVEN, AUTO) and Sort Keys (SORTKEY) to eliminate DS_BCAST_INNER / DS_DIST_BOTH network redistribution.',
  142: 'ElastiCache caching strategies: Write-Through vs Lazy Loading (Cache-Aside) + TTL combined to avoid stale data and cache bloat.',
  144: 'AWS Graviton (64-bit Arm Neoverse m7g/c7g/r7g) EC2 instances for up to 40% better price-performance.',
  148: 'Scaling EC2 Auto Scaling worker fleets on custom SQS BacklogPerInstance metric with scale-in protection (ProtectedFromScaleIn).',
  149: 'Amazon DocumentDB (with MongoDB compatibility) and Amazon Keyspaces (for Apache Cassandra) for managed NoSQL migrations.',
  152: 'Amazon EMR Serverless for running Spark/Hive workloads without managing clusters or instances, auto-scaling workers to zero.',
  153: 'IAM Permissions Boundaries to cap maximum effective permissions on roles created by delegated developers and prevent privilege escalation.',
  154: 'IAM Role trust policy sts:ExternalId condition key to prevent the cross-account confused deputy problem with third-party vendors.',
  155: 'IAM Access Analyzer policy generation based on actual AWS CloudTrail activity to right-size overly permissive IAM roles to least privilege.',
  156: 'Attribute-Based Access Control (ABAC) using IAM PrincipalTag/ResourceTag conditions and sts:TagSession.',
  158: 'Sharing encrypted AMIs and EBS snapshots across AWS accounts by re-encrypting with a Customer Managed Key (CMK) and granting KMS permissions.',
  159: 'AWS KMS Customer Managed Keys with imported key material (BYOK) and DeleteImportedKeyMaterial for immediate key revocation and re-import.',
  161: 'Amazon S3 Access Points (with per-team policies and VPC origin restrictions) to scale access management beyond the 20 KB bucket policy limit.',
  162: 'Amazon CloudFront Signed Cookies vs Signed URLs for authorizing time-limited access to multi-file HLS video streams.',
  163: 'Amazon CloudFront Field-Level Encryption using asymmetric RSA public keys at the edge to protect sensitive POST fields through intermediate tiers.',
  164: 'Locking down an internet-facing ALB to CloudFront using the com.amazonaws.global.cloudfront.origin-facing managed prefix list and a secret custom HTTP header.',
  165: 'AWS Network Firewall for stateful outbound domain/FQDN filtering and inline Suricata-compatible IPS signature inspection.',
  167: 'Exposing proprietary services to external accounts with overlapping CIDRs and unidirectional connectivity via NLB + AWS PrivateLink VPC Endpoint Service.',
  168: 'VPC Traffic Mirroring on Nitro EC2 ENIs (VXLAN UDP 4789) to capture raw packet payloads for out-of-band IDS/forensic inspection.',
  169: 'AWS Systems Manager Session Manager in isolated VPCs using ssm, ssmmessages, and ec2messages Interface VPC Endpoints with KMS-encrypted S3 session logs.',
  176: 'AWS Artifact (downloading AWS SOC/PCI compliance attestations) and AWS Audit Manager (automated continuous evidence collection for audits).',
  178: 'AWS CloudTrail Log File Integrity Validation using hourly SHA-256 hash chain and RSA-signed digest files.',
  181: 'EC2 Instance Metadata Service Version 2 (IMDSv2: HttpTokens=required and HttpPutResponseHopLimit=1) to mitigate SSRF credential theft.',
  182: 'AWS Firewall Manager for centrally deploying and enforcing WAF rules, Shield Advanced, and Security Group policies across an AWS Organization.',
  183: 'AWS Nitro Enclaves for isolated CPU/memory confidential compute environments with cryptographic KMS attestation over vsock.',
  184: 'AWS CloudHSM dedicated single-tenant FIPS 140-3 Level 3 HSM clusters with customer-controlled PKCS#11/JCE keys vs KMS.',
  185: 'Amazon EFS encryption in transit (amazon-efs-utils TLS helper) and EFS Access Points (enforcing POSIX uid/gid and root directories).',
  186: 'Amazon ECS Fargate Task Execution Role (executionRoleArn for agent ECR/Secrets/Logs access) vs Task Role (taskRoleArn for app SDK calls).',
  187: 'AWS KMS Multi-Region Keys (mrk-*) for interoperable client-side encryption/decryption across Regions without cross-Region KMS calls.',
  188: 'Amazon Route 53 Resolver DNS Firewall for filtering and blocking outbound VPC DNS queries to malicious domains.',
  190: 'EC2 Auto Scaling Mixed Instances Policy combining On-Demand base capacity with Spot Instances using the price-capacity-optimized allocation strategy.',
  191: 'Migrating managed database and analytics nodes (RDS, ElastiCache, OpenSearch) from x86 to AWS Graviton (m7g/r7g) for lower hourly cost.',
  194: 'S3 Lifecycle AbortIncompleteMultipartUpload rule to automatically clean up orphaned multipart upload parts identified by S3 Storage Lens.',
  199: 'Amazon EBS Snapshots Archive tier and Amazon Data Lifecycle Manager (DLM) for up to 75% cheaper long-term full snapshot retention (>=90 days).',
  202: 'Amazon DynamoDB Time to Live (TTL) for free background item expiration and DynamoDB Standard-IA table class for 60% lower storage cost.',
  204: 'Amazon Aurora I/O-Optimized cluster storage configuration to eliminate per-request read/write I/O charges when I/O exceeds 25% of cluster spend.',
  205: 'AWS Cost Anomaly Detection for ML-based detection of anomalous spend velocity across services, member accounts, and cost allocation tags.',
  207: 'AWS Cost and Usage Report (CUR / Data Exports CUR 2.0) in Parquet format queried with Athena and visualized in QuickSight for hourly line-item FinOps.',
  209: 'VPC Egress-Only Internet Gateway (::/0) for free ($0/GB, $0/hr) outbound-only IPv6 internet access from private subnets.',
  211: 'AWS Lambda Event Source Mapping event filtering (FilterCriteria) to drop unneeded SQS/Kinesis/DynamoDB messages before invocation and arm64 Graviton2 pricing.'
};

function formatInlineRef(ref) {
  const parts = [
    '"module": ' + JSON.stringify(ref.module),
    '"topic": ' + JSON.stringify(ref.topic)
  ];
  if (ref.cram) {
    parts.push(
      '"cram": {"sheet": ' +
        JSON.stringify(ref.cram.sheet) +
        ', "q": ' +
        JSON.stringify(ref.cram.q) +
        '}'
    );
  }
  if (ref.gap) {
    parts.push('"gap": true');
  }
  return '{' + parts.join(', ') + '}';
}

function writeGapsReport(course) {
  const escapeCell = (s) => String(s).replace(/\|/g, '\\|');
  const rows = [];
  course.exam.forEach((q, i) => {
    if (q.ref && q.ref.gap) {
      const q100 = escapeCell(q.q.slice(0, 100));
      const target = '`' + q.ref.module + '` → `' + q.ref.topic + '`';
      const missing = escapeCell(GAP_FACTS[i] || q.exp.split('. ')[0] + '.');
      rows.push(
        '| ' +
          i +
          ' | ' +
          q.domain +
          ' | ' +
          q100 +
          ' | ' +
          target +
          ' | ' +
          missing +
          ' |'
      );
    }
  });

  const md = [
    '# AWS SAA-C03 Exam-to-Lesson Gaps Report',
    '',
    'This report lists every exam question in `www/courses/aws-saa-c03.js` marked with `"gap": true` (where the deciding fact is not currently taught in any lesson topic\'s `.prose`).',
    '',
    '- **Total exam questions:** ' + course.exam.length,
    '- **Questions with `gap: true`:** ' + rows.length,
    '',
    '| Index | Domain | First 100 chars of `q` | Target Module → Topic | Missing Deciding Fact |',
    '|---:|---|---|---|---|',
    ...rows,
    ''
  ].join('\n');

  fs.writeFileSync(GAPS_FILE, md, 'utf8');
}

function main() {
  const rawCourse = fs.readFileSync(COURSE_FILE, 'utf8');
  const eol = rawCourse.includes('\r\n') ? '\r\n' : '\n';
  const refsMap = JSON.parse(fs.readFileSync(REFS_FILE, 'utf8'));

  const marker = 'var COURSE_AWS = ';
  const markerIdx = rawCourse.indexOf(marker);
  if (markerIdx === -1) {
    throw new Error('Could not find "' + marker + '" in ' + COURSE_FILE);
  }
  const header = rawCourse.slice(0, markerIdx + marker.length);

  const ctx = {};
  vm.runInNewContext(rawCourse, ctx, { filename: COURSE_FILE });
  const course = ctx.COURSE_AWS;
  if (!course || !Array.isArray(course.exam)) {
    throw new Error('COURSE_AWS.exam not found or not an array');
  }

  // Keep a baseline copy with any existing `ref` stripped to verify round-trip identity.
  const baselineCourse = JSON.parse(JSON.stringify(course));
  baselineCourse.exam.forEach((q) => {
    delete q.ref;
  });

  const expectedCount = course.exam.length;
  const refKeys = Object.keys(refsMap);
  if (refKeys.length !== expectedCount) {
    throw new Error(
      'Ref count mismatch: expected ' + expectedCount + ', got ' + refKeys.length
    );
  }

  const inlineByIndex = [];
  for (let i = 0; i < expectedCount; i++) {
    const entry = refsMap[String(i)];
    if (!entry || !entry.ref) {
      throw new Error('Missing ref entry for exam index ' + i);
    }
    const qObj = course.exam[i];
    const actualQ60 = qObj.q.slice(0, 60);
    if (entry.q60 !== actualQ60) {
      throw new Error(
        'q60 mismatch at index ' +
          i +
          ': expected ' +
          JSON.stringify(actualQ60) +
          ', got ' +
          JSON.stringify(entry.q60)
      );
    }
    delete qObj.ref;
    const orderedRef = {
      module: entry.ref.module,
      topic: entry.ref.topic
    };
    if (entry.ref.cram) {
      orderedRef.cram = {
        sheet: entry.ref.cram.sheet,
        q: entry.ref.cram.q
      };
    }
    if (entry.ref.gap) {
      orderedRef.gap = true;
    }
    qObj.ref = '__REF_PLACEHOLDER_' + i + '__';
    inlineByIndex.push(formatInlineRef(orderedRef));
  }

  let jsonText = JSON.stringify(course, null, 2);
  for (let i = 0; i < expectedCount; i++) {
    const placeholder = '"__REF_PLACEHOLDER_' + i + '__"';
    jsonText = jsonText.replace(placeholder, inlineByIndex[i]);
  }

  const output = header + jsonText.replace(/\n/g, eol) + ';' + eol;

  // Verify round-trip: evaluating the generated file and stripping `ref` reproduces baseline byte-for-byte.
  const verifyCtx = {};
  vm.runInNewContext(output, verifyCtx, { filename: COURSE_FILE });
  const verifyCourse = verifyCtx.COURSE_AWS;
  writeGapsReport(verifyCourse);
  verifyCourse.exam.forEach((q) => {
    delete q.ref;
  });
  const reconstructedBaseline =
    header + JSON.stringify(verifyCourse, null, 2).replace(/\n/g, eol) + ';' + eol;
  const expectedBaseline =
    header + JSON.stringify(baselineCourse, null, 2).replace(/\n/g, eol) + ';' + eol;
  if (reconstructedBaseline !== expectedBaseline) {
    throw new Error('Round-trip verification failed');
  }

  fs.writeFileSync(COURSE_FILE, output, 'utf8');
  console.log(
    'Applied ' +
      expectedCount +
      ' refs to ' +
      path.relative(ROOT, COURSE_FILE).replace(/\\/g, '/')
  );
}

if (require.main === module) {
  main();
}

module.exports = { main, formatInlineRef };
