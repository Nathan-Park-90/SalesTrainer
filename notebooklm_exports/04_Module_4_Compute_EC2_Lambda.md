[SYSTEM NOTE FOR AUDIO OVERVIEW HOSTS]
You are acting as the official audio teachers for "SalesTrainer", an elite tech and sales training platform.
TARGET AUDIENCE: A professional studying to master AWS Solutions Architect (SAA-C03) and pass rigorous industry certifications.
TONE: Witty, punchy, real-world, and slightly edgy. Do NOT sound like a dry textbook or a corporate HR video. Sound like a highly competent senior engineer or sales director mentoring a junior over coffee.
ANALOGIES TO USE: The source text uses specific anchors—"Mammoth Capital" (a high-stakes FinTech firm), Proxmox homelabs, pfSense routers, algorithm trading, and real-world system failures. Lean heavily into these analogies when explaining concepts.
FORMAT: Treat this as an engaging, fast-paced masterclass. Focus on *why* things work and the real-world trade-offs, exactly as written in the module below. Never change the technical facts.
[END SYSTEM NOTE]

# Module 4: Compute (EC2 & Lambda)

## EC2: The Workhorse

If AWS were a construction company, EC2 would be the heavy machinery. Everything else might be fancier or more specialized, but EC2 is what gets the foundational work done. **Amazon Elastic Compute Cloud** gives you a resizable virtual machine in the cloud, launched in under 60 seconds, billed by the second. That's a revolution compared to the weeks it took to rack physical servers a decade ago.



Choosing an EC2 instance is like choosing a vehicle — you pick based on the job, not the brand name:


**General Purpose (t3, m6i):** Balanced CPU and memory. The Toyota Camry of cloud compute. Good for web servers, dev environments, small databases.


**Compute Optimized (c6i, c7g):** High CPU-to-memory ratio. For batch processing, high-performance web servers, machine learning inference.


**Memory Optimized (r6i, x2idn):** Massive RAM for large in-memory datasets. Real-time big data analytics, in-memory databases, SAP HANA.


**Storage Optimized (i4i, d3):** High sequential read/write access to local storage. Data warehousing, distributed file systems, Elasticsearch.


**Accelerated Computing (p4d, inf2):** GPUs and custom ML chips (Inferentia, Trainium). Deep learning training, graphics rendering, HPC.



The instance name tells you everything: **m6i.xlarge** — *m* (Memory-balanced family), *6* (6th generation), *i* (Intel processor), *xlarge* (4 vCPU, 16GB RAM).

**⚓ Anchor:** Choosing an EC2 instance type is identical to choosing a rental car. Going to a meeting across town? A compact (t3.micro) works fine. Moving furniture? You need a cargo van (r6i.8xlarge with massive RAM). Hauling 40 tons of concrete? That's a GPU instance (p4d.24xlarge) — wildly overpowered for normal work, but the only thing that'll do the job. You wouldn't show up to haul concrete in a compact car. Know your workload before you pick your instance.

**Exam Tip:** The SAA-C03 regularly presents scenarios like: *"An HPC workload requires intensive floating-point computations."* That's Compute Optimized (c-family). *"An in-memory analytics platform requires 512GB of RAM."* That's Memory Optimized (r or x-family). Map the workload to the family — don't guess.

---

## Lambda: The Sniper Rifle

EC2 is a 24/7 soldier. Lambda is a Navy SEAL sniper — deployed for one specific mission, executes flawlessly, and disappears the moment it's done. You pay for exactly 312 milliseconds of execution. Then: nothing. No idle instance burning budget. No OS to patch. No server to think about. The infrastructure simply ceases to exist the moment your code finishes.



**How Lambda Works:** You upload your code (Node.js, Python, Java, Go, Ruby, .NET). You define a **trigger** — the event that invokes your function. AWS manages everything else: hardware provisioning, OS maintenance, capacity planning, auto-scaling. Lambda can handle 1 request or 10,000 concurrent requests — it scales automatically with zero configuration.



**Common Lambda Triggers:**
API Gateway (HTTP request) → Lambda (handles request) → return response. The serverless API pattern.
S3 PUT event → Lambda (process the uploaded file) → store result in DynamoDB.
SQS message → Lambda (process the work item) → scale to drain the queue.
CloudWatch Events/EventBridge → Lambda (scheduled task, cron jobs).



**The Hard Limits You Must Know:**
Max execution time: **15 minutes**. If your job takes 2 hours, Lambda is not the answer.
Max memory: **10 GB**.
Max deployment package: 50 MB zipped (250 MB unzipped), or use a container image up to 10 GB.
Concurrency: soft default of 1,000 concurrent executions per account per region (can be raised).



**Cold Starts:** When Lambda hasn't been invoked recently, there's a brief startup delay (100ms–1s) as AWS initializes the execution environment. This is the trade-off for the serverless model. Solutions: provisioned concurrency (pre-warm the function, costs money) or keeping functions warm with scheduled pings.

**⚓ Anchor:** Owning an EC2 instance is like owning a car — you pay for it whether you're driving or parked. Lambda is Uber — you pay only for the exact trip, by the mile, only when you need it. The car sitting in your driveway overnight costs you nothing with Uber. The catch: Uber takes 30 seconds to arrive (cold start) vs. your car being instantly ready. For anything needing instant response at all times, keep the car. For sporadic, event-driven work, Uber wins on economics every time.

**Exam Tip:** Lambda is the correct answer for: event-driven processing, lightweight API backends, scheduled tasks, and anything with spiky or unpredictable traffic. Lambda is the *wrong* answer for: long-running jobs (>15 min), workloads requiring persistent state on local disk, or anything requiring guaranteed sub-millisecond cold-start latency.

---

## EC2 Cost Optimization: Reserved, Spot & Savings Plans

Running EC2 On-Demand 24/7 is like booking a hotel room every single night instead of signing a lease. Comfortable. Flexible. Financially indefensible for predictable, long-running workloads. AWS has engineered a full spectrum of commitment-based discounts — and the SAA-C03 will absolutely test your ability to match the right pricing model to the right scenario.



**On-Demand: The Full-Price Ticket**

Pay by the second. Zero commitment. Maximum flexibility. Maximum cost. Use for: short-term projects, unpredictable workloads, development and testing environments you'll terminate frequently. Never the right answer for production servers running 24/7.



**Reserved Instances (RIs): The 3-Year Lease**

Commit to a 1 or 3-year term on a specific instance type, family, or region. Savings: up to 72% over On-Demand. Two flavors:
*Standard RIs*: deepest discount, locked to one specific instance type.
*Convertible RIs*: slightly smaller discount, but you can exchange for a different instance type or family. Right choice if you expect your needs to evolve.



**Savings Plans: The Modern Commitment Model**

Instead of reserving a specific instance, you commit to a minimum dollar spend per hour (e.g., $5.00/hr). AWS applies the discount to your highest-cost EC2, Lambda, and Fargate usage automatically. More flexible than RIs, covers more services, and is now AWS's preferred commitment model.



**Spot Instances: The Standby Ticket — Up to 90% Off**

AWS sells spare capacity at auction. You bid; if your price is met, you get the instance. If AWS needs that capacity back, they give you a 2-minute warning and terminate the instance. Non-negotiable. This makes Spot perfect for: batch processing, ML training, video rendering, CI/CD pipelines — any fault-tolerant, stateless, interruptible workload. Never use Spot for your production database.

**⚓ Anchor:** On-Demand is a hotel — maximum flexibility, maximum price. Reserved Instances are a 3-year apartment lease — locked in, but 70% cheaper. Savings Plans are a monthly coworking membership — you commit to spending $X per month and get discounted access to whatever desk you need that day. Spot is a last-minute standby flight — dirt cheap, but the airline can bump you the moment a paying passenger shows up. Know which one you're buying before you need the seat.

**Exam Tip:** Classic exam pattern: *"A company runs a web application 24/7/365. What is the most cost-effective purchasing option—"* Answer: **Reserved Instances or Savings Plans**. *"A genomics company needs to process 500TB of data over a weekend. The job can be interrupted."* Answer: **Spot Instances**. Map the commitment level to the workload predictability.

---

