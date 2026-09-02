import codecs
import json

# This python script writes a node.js script that will mutate data.js
node_script = """
const fs = require('fs');

let c = fs.readFileSync('data.js', 'utf8').replace('const DATA =', 'var DATA=');
eval(c);

const cloud101 = {
    id: 999, // temporary
    title: "Module 1: Cloud 101 (The Absolute Foundation)",
    topics: [
        {
            id: 9991,
            title: "What is a Server? (Bare Metal vs VM vs Container)",
            prose: `
                <p>Before we can architect the cloud, we need to understand what it actually is. The cloud is just someone else's computer. But how do we run applications on it?</p>
                <p><strong>Bare Metal:</strong> This is a physical piece of hardware. It has a CPU, RAM, and a hard drive. If you want to run an application, you install an operating system (like Linux) directly on it. It is powerful, but inflexible. If you need more power, you have to buy a bigger physical box.</p>
                <p><strong>Virtual Machines (VMs):</strong> This was the first revolution. We installed software called a "Hypervisor" on the Bare Metal. The Hypervisor lets us carve up the physical hardware into smaller, fake computers called Virtual Machines. An EC2 instance in AWS is just a Virtual Machine.</p>
                <p><strong>Containers:</strong> This is the modern revolution. A VM contains a full, heavy operating system. A Container just contains your application code and the exact libraries it needs to run. It shares the host's operating system kernel, making it incredibly lightweight and fast to boot.</p>
                <br><br><div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Think of Bare Metal as buying a single-family house. A Virtual Machine is like converting it into an apartment building (sharing the physical plot, but everyone gets their own walls and plumbing). A Container is like a hotel room—you just bring your suitcase (code) and share all the building's services.</div>
                <div class="lesson-alert"><strong>Sales Tip:</strong> Customers migrate from Bare Metal to VMs/Containers to increase hardware utilization. Don't pay for idle CPU cycles.</div>
            `,
            tags: ['compute', 'ec2', 'virtualization']
        },
        {
            id: 9992,
            title: "The Physical Cloud (Regions & AZs)",
            prose: `
                <p>When you deploy something to the "Cloud," it physically exists in a real building. AWS organizes these buildings into Regions and Availability Zones (AZs).</p>
                <p><strong>A Region</strong> is a geographical area, like "us-east-1" (Northern Virginia) or "eu-central-1" (Frankfurt). You choose a Region based on two factors: latency (how close it is to your users) and compliance (data sovereignty laws, like GDPR).</p>
                <p><strong>An Availability Zone (AZ)</strong> is one or more discrete data centers within a Region. They have redundant power, networking, and connectivity. If lightning strikes AZ-A and burns it down, AZ-B in the same Region is unaffected.</p>
                <br><br><div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> A Region is like a city (e.g., New York). An Availability Zone is like a specific power grid within that city (e.g., Manhattan vs. Brooklyn). If a blackout hits Brooklyn, Manhattan stays online.</div>
                <div class="lesson-alert"><strong>Sales Tip:</strong> Never let a customer deploy a production database in a single AZ. Always pitch Multi-AZ for high availability.</div>
            `,
            tags: ['networking', 'vpc', 'regions', 'ha']
        },
        {
            id: 9993,
            title: "The Financial Shift: CapEx vs OpEx",
            prose: `
                <p>Selling the cloud is rarely a technical discussion for the CFO. It is a financial one. Moving to the cloud shifts a company's spending model from CapEx to OpEx.</p>
                <p><strong>CapEx (Capital Expenditure):</strong> Buying physical servers. You spend $100,000 upfront. You have to guess your capacity needs 3 years in advance. If you guess wrong, you either overpaid for idle servers, or your website crashes during Black Friday.</p>
                <p><strong>OpEx (Operational Expenditure):</strong> Renting servers by the second (The Cloud). You pay zero upfront. You only pay for exactly what you consume. If traffic spikes, you instantly rent 10 more servers. When traffic drops, you return them.</p>
                <br><br><div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> CapEx is buying a car in cash—you pay upfront, and it deprecates whether you drive it or not. OpEx is taking an Uber—you only pay for the exact miles you travel, and you can request an SUV or a sedan depending on how many friends you have today.</div>
                <div class="lesson-alert"><strong>Sales Tip:</strong> Emphasize "Agility" over "Cost Savings." The cloud isn't always cheaper, but it allows businesses to experiment and pivot without sinking cash into hardware.</div>
            `,
            tags: ['sales', 'capex', 'opex']
        }
    ]
};

const scaleModule = {
    id: 998,
    title: "Module 2: High Availability & Scaling",
    topics: [
        {
            id: 9981,
            title: "Vertical vs Horizontal Scaling",
            prose: `
                <p>When your application gets popular and the server CPU hits 100%, it will crash. You have two ways to solve this: Scale Up or Scale Out.</p>
                <p><strong>Vertical Scaling (Scaling Up):</strong> You turn off your small server and replace it with a massive, expensive server with more CPU and RAM. The problem? There is a physical limit to how big a single machine can get. And during the upgrade, you suffer downtime.</p>
                <p><strong>Horizontal Scaling (Scaling Out):</strong> You keep your small server, but you add 5 more identical small servers next to it. They all share the load. There is virtually no limit to how many you can add.</p>
                <br><br><div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Vertical scaling is like buying a bigger delivery truck because you have more packages. Eventually, you can't buy a truck big enough for the highway. Horizontal scaling is just hiring 5 guys with Honda Civics to deliver the packages simultaneously.</div>
                <div class="lesson-alert"><strong>Sales Tip:</strong> Modern cloud architecture demands Horizontal Scaling. Databases are notoriously hard to scale horizontally, which is why AWS Aurora is such a powerful pitch.</div>
            `,
            tags: ['compute', 'ec2', 'scaling']
        },
        {
            id: 9982,
            title: "The Load Balancer (Traffic Cop)",
            prose: `
                <p>If you choose to scale horizontally (adding 5 identical servers), how do your users know which server to connect to? You cannot give your customers 5 different IP addresses.</p>
                <p>The solution is an <strong>Application Load Balancer (ALB)</strong>. You give your users a single URL (e.g., www.mammoth.com). That URL points to the Load Balancer. The Load Balancer acts as a traffic cop. When a request comes in, it checks which of your 5 servers has the least load, and silently forwards the request to it.</p>
                <p>Crucially, the Load Balancer performs <strong>Health Checks</strong>. If Server #3 crashes, the Load Balancer notices it stopped responding and immediately stops sending users to it.</p>
                <br><br><div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> A Load Balancer is the hostess at a restaurant. Customers don't walk into the kitchen and find their own chef. They talk to the hostess, who looks at which waiter has the fewest tables and assigns them there. If a waiter goes on break (fails a health check), she stops seating people in his section.</div>
                <div class="lesson-alert"><strong>Sales Tip:</strong> Load Balancers are the prerequisite for High Availability. You cannot survive an AZ failure without a Load Balancer shifting traffic to the healthy AZ.</div>
            `,
            tags: ['networking', 'alb', 'load balancer', 'ha']
        },
        {
            id: 9983,
            title: "Auto Scaling Groups (ASG)",
            prose: `
                <p>Load Balancers distribute traffic across your existing servers. But what if traffic spikes so high that ALL your servers are at 100% CPU? You need a system that automatically adds new servers without waking you up at 3 AM.</p>
                <p>An <strong>Auto Scaling Group (ASG)</strong> is a service that monitors your fleet. You give it rules: "If average CPU > 70%, launch 2 more servers." The ASG will automatically boot new EC2 instances and register them with the Load Balancer. When the traffic spike is over (e.g., Black Friday ends), the ASG terminates the extra servers so you stop paying for them.</p>
                <br><br><div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> An ASG is like a dynamic thermostat for servers. It constantly reads the temperature (CPU load). If it gets too hot, it automatically kicks on the AC (adds servers). When it cools down, it turns it off to save your electric bill.</div>
                <div class="lesson-alert"><strong>Sales Tip:</strong> ASGs are the ultimate realization of Cloud OpEx. This is exactly how Netflix survives 8 PM streaming spikes without going bankrupt paying for idle servers at 4 AM.</div>
            `,
            tags: ['compute', 'ec2', 'asg', 'scaling']
        }
    ]
};

// Prepend modules
DATA.course.unshift(scaleModule);
DATA.course.unshift(cloud101);

// Renumber everything
DATA.course.forEach((mod, idx) => {
    mod.title = mod.title.replace(/^Module \d+:/, `Module ${idx + 1}:`);
});

const serialized = 'const DATA = ' + JSON.stringify(DATA, null, 4) + ';';
fs.writeFileSync('data.js', serialized, 'utf8');

console.log('Foundational modules successfully injected and numbered!');
"""

with codecs.open('inject_foundations.js', 'w', 'utf-8') as f:
    f.write(node_script)

print("Node script created.")
