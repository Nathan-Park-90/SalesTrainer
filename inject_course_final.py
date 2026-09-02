import re
import codecs

with codecs.open('data.js', 'r', 'utf-8') as f:
    c = f.read()

# The current data.js ends with `const XP_CYCLE=200,IV={hard:60000,good:600000,easy:86400000`
# We want to insert `course_json` before the end of DATA.
# The DATA object ends right before `// ── STATE` or `const SK=`.
# Let's search for `const SK=`.
idx_sk = c.find("const SK=")
if idx_sk != -1:
    # Find the closing brace of DATA which should be before `const SK=`
    # and before `// ── STATE` if it exists.
    brace_idx = c.rfind('}', 0, idx_sk)
    
    course_json = """
 ,course: [
  {
    moduleId: 1,
    title: "Module 1: The Networking Thunderdome (VPC & EC2)",
    icon: "🌐",
    topics: [
      {
        topicId: 101,
        title: "VPC: Your Private Cloud Moat",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">Welcome to the Thunderdome</h3>
            <p>Imagine building a bank, but forgetting to put a door on the vault, so the vault is just sitting in the middle of a busy highway. That’s what happens when you don't understand VPCs (Virtual Private Clouds).</p>
            <p>A <strong>VPC</strong> is your logically isolated slice of the AWS cloud. It is your network moat. If you don't configure this correctly, you will end up on the front page of HackerNews for leaking 10 million user records.</p>
            
            <h3 class="lesson-h3">Public vs Private Subnets</h3>
            <ul>
              <li><strong>Public Subnet:</strong> Has a route to the Internet Gateway (IGW). This is the club bouncer. Things here (like Load Balancers) can talk to the internet.</li>
              <li><strong>Private Subnet:</strong> Has NO route to the IGW. This is the VIP backroom. Your databases live here. They should never, ever, under any circumstances, have a public IP address.</li>
            </ul>

            <div class="lesson-alert">
              <strong>Exam & Reality Tip:</strong> If a developer asks to put a database in a public subnet so they can "ping it from their laptop easily," you politely confiscate their keyboard. Use a Bastion Host or AWS Systems Manager Session Manager instead!
            </div>
          </div>
        `
      },
      {
        topicId: 102,
        title: "EC2: Renting Computers by the Second",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">Elastic Compute Cloud (EC2)</h3>
            <p>EC2 is just a fancy term for "someone else's computer that you rent by the second." But unlike the beige Dell tower under your desk from 2004, these can be scaled dynamically.</p>
            
            <h3 class="lesson-h3">Pricing Models (Or: How not to bankrupt your startup)</h3>
            <ul>
              <li><strong>On-Demand:</strong> You pay by the second. Most expensive, but maximum flexibility. Use this when your boss says "we need a server right now and I don't know how long we'll need it."</li>
              <li><strong>Reserved Instances (RIs):</strong> You commit to 1 or 3 years. Massive discount. Use this for your steady-state baseline traffic. It's like signing a lease instead of living in a hotel.</li>
              <li><strong>Spot Instances:</strong> You bid on spare AWS capacity at a 90% discount. <em>Catch:</em> AWS can yank the server away with a 2-minute warning. Perfect for stateless workloads, batch processing, or rendering cat videos. Terrible for hosting a database.</li>
            </ul>

            <div class="lesson-alert">
              <strong>Scenario:</strong> You run a pharmaceutical batch rendering job that takes 4 hours and can be resumed if interrupted. Cost is the primary concern. What do you use?<br><br>
              <strong>Answer:</strong> Spot Instances. (If you said On-Demand, please hand over your corporate credit card).
            </div>
          </div>
        `
      }
    ]
  },
  {
    moduleId: 2,
    title: "Module 2: Storage Solutions (Or, Where did I put that file?)",
    icon: "💾",
    topics: [
      {
        topicId: 201,
        title: "S3: The Infinite Bucket",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">Simple Storage Service (S3)</h3>
            <p>S3 is object storage. It is arguably the greatest cloud service ever created. It provides infinite storage capacity, and you pay only for what you use.</p>
            <p><strong>Warning:</strong> S3 is NOT a file system. You cannot install Windows on an S3 bucket. You cannot run a database on an S3 bucket (unless you enjoy 5000ms latency and data corruption).</p>
            
            <h3 class="lesson-h3">The 11 Nines of Durability</h3>
            <p>S3 offers 99.999999999% durability. What does that mean? If you store 10,000,000 objects in S3, you can expect to lose a single object every 10,000 years. Basically, your data will outlive the human species.</p>

            <h3 class="lesson-h3">Storage Classes</h3>
            <ul>
              <li><strong>S3 Standard:</strong> For frequently accessed data. (e.g., website images).</li>
              <li><strong>S3 Standard-IA (Infrequent Access):</strong> Cheaper storage, but you pay a fee every time you retrieve data. Perfect for backups you hope to never use.</li>
              <li><strong>S3 Glacier Deep Archive:</strong> Pennies per terabyte. But it takes 12 hours to retrieve your files. Perfect for regulatory compliance archives ("Keep this for 7 years for the IRS").</li>
            </ul>
          </div>
        `
      },
      {
        topicId: 202,
        title: "EBS vs EFS: Block vs File",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">EBS (Elastic Block Store)</h3>
            <p>EBS is the USB hard drive you plug into your EC2 instance. It is <strong>Block Storage</strong>. It is blazing fast and low latency. You install operating systems and databases on EBS.</p>
            <p><em>Rule:</em> An EBS volume can only be attached to ONE EC2 instance at a time (multi-attach exists, but it's niche). It is tied to a specific Availability Zone.</p>

            <h3 class="lesson-h3">EFS (Elastic File System)</h3>
            <p>EFS is a network drive. It is <strong>File Storage</strong>. Hundreds of EC2 instances across multiple Availability Zones can read/write to EFS simultaneously.</p>
            
            <div class="lesson-alert">
              <strong>Exam Tip:</strong> If the question asks for "shared storage across multiple EC2 instances running Linux", the answer is EFS. If it asks for "sub-millisecond latency for a high-performance database", the answer is EBS Provisioned IOPS.
            </div>
          </div>
        `
      }
    ]
  },
  {
    moduleId: 3,
    title: "Module 3: Databases (Where state goes to live)",
    icon: "🗄️",
    topics: [
      {
        topicId: 301,
        title: "RDS: The Relational Workhorse",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">Relational Database Service (RDS)</h3>
            <p>RDS is for structured data (SQL). If you have strict schema requirements, complex JOINS, and need ACID compliance (like a banking ledger), use RDS.</p>
            
            <h3 class="lesson-h3">Multi-AZ vs Read Replicas (Crucial!)</h3>
            <p>People get this wrong constantly. Let's clear it up:</p>
            <ul>
              <li><strong>Multi-AZ (Disaster Recovery):</strong> AWS keeps a synchronized standby copy of your DB in another building. If the primary burns down, AWS automatically fails over to the standby. <em>You cannot read from the standby. It is strictly for High Availability (HA).</em></li>
              <li><strong>Read Replicas (Performance):</strong> An asynchronous copy of your database. If your database is melting because 10,000 users are running reporting queries, you route their reads to the Read Replica to save the primary. <em>This is for scaling read-heavy workloads.</em></li>
            </ul>
          </div>
        `
      },
      {
        topicId: 302,
        title: "DynamoDB: Serverless Speed",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">DynamoDB</h3>
            <p>DynamoDB is a NoSQL, serverless, key-value database. It is magical.</p>
            <p>Why magical? Because it delivers single-digit millisecond latency whether you have 10 rows of data or 10 billion rows of data. It simply does not care. It scales automatically.</p>
            <p><strong>When to use it:</strong> Shopping carts, session state, leaderboards, user profiles. Anything where you need blazing fast reads/writes by a primary key.</p>
            <p><strong>When NOT to use it:</strong> If you need to write a query like: <em>"Find all users who bought product X in the last 30 days and cross-reference them with demographic table Y."</em> DynamoDB will politely ask you to leave. That is a job for RDS or Redshift.</p>
          </div>
        `
      }
    ]
  },
  {
    moduleId: 4,
    title: "Module 4: Decoupling & Serverless",
    icon: "⚡",
    topics: [
      {
        topicId: 401,
        title: "SQS: Stop Crashing Your Apps",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">Simple Queue Service (SQS)</h3>
            <p>Imagine a Black Friday sale. 100,000 people click "Buy" at exactly 12:00 PM. Your order processing server can only handle 500 orders per second. If App A talks directly to App B (Tight Coupling), App B catches fire, crashes, and you lose 99,500 orders. The CFO fires you.</p>
            <p><strong>The Fix (Loose Coupling):</strong> App A dumps all 100,000 orders into an SQS Queue. SQS just holds them safely. App B reads from the queue at its own pace (500 per second). It takes a few minutes, but zero orders are lost. The CFO gives you a bonus.</p>
            <p>SQS is the ultimate buffer against traffic spikes.</p>
          </div>
        `
      },
      {
        topicId: 402,
        title: "Lambda: No Servers, Just Code",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">AWS Lambda</h3>
            <p>Lambda is Event-Driven Serverless Compute. You write a function (Python, Node, Go), paste it into AWS, and tell AWS: <em>"Run this code every time an image is uploaded to S3."</em></p>
            <p>You pay for the exact millisecond your code runs. If nobody uploads an image, you pay $0.00. No servers to patch, no OS to update, no idle costs.</p>
            
            <div class="lesson-alert">
              <strong>Limitations to memorize:</strong><br>
              1. Max execution time is 15 minutes.<br>
              2. Max memory is 10GB.<br>
              If your video rendering job takes 2 hours, you cannot use Lambda. Use AWS Batch or an EC2 instance.
            </div>
          </div>
        `
      }
    ]
  }
]
"""
    c = c[:brace_idx] + course_json + '\n' + c[brace_idx:]
    
    # Also, we need to ensure the end of data.js is well-formed since it currently ends with `easy:86400000` (missing closing brace and semicolon).
    if not c.strip().endswith(';'):
        if c.strip().endswith('easy:86400000'):
            c = c.strip() + '};\n'
        else:
            c = c.strip() + ';\n'
            
    with codecs.open('data.js', 'w', 'utf-8') as f:
        f.write(c)
    print("Course injected successfully.")
else:
    print("Could not find const SK=")
