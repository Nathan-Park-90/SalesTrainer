const fs = require('fs');

let content = fs.readFileSync('data.js', 'utf8');
let evalContent = content.replace('const DATA =', 'var DATA=');
eval(evalContent);

if (!DATA.arch) DATA.arch = [];

// Avoid duplicates if script is run twice
DATA.arch = DATA.arch.filter(a => !a.title.includes('Final Boss'));

DATA.arch.push({
    title: "Level 4: The Final Boss (Global FinTech Platform)",
    desc: "Mammoth Capital wants a globally resilient trading platform. Web traffic comes in globally, computes serverlessly, stores state in a NoSQL database, and caches read-heavy data. Deploy the absolute best-in-class AWS services to each zone. (Beware of decoys!)",
    zones: [
        { id: "edge", label: "Global Edge & Routing", needed: ["Amazon Route 53", "Amazon CloudFront", "AWS WAF"] },
        { id: "compute", label: "Serverless Compute", needed: ["Amazon API Gateway", "AWS Lambda"] },
        { id: "data", label: "Data & Caching", needed: ["Amazon DynamoDB", "Amazon ElastiCache (Redis)"] }
    ],
    palette: [
        "Amazon Route 53", "Amazon CloudFront", "AWS WAF", 
        "Amazon API Gateway", "AWS Lambda", 
        "Amazon DynamoDB", "Amazon ElastiCache (Redis)",
        "Amazon EC2 (Decoy)", "Amazon RDS (Decoy)", "Application Load Balancer (Decoy)"
    ],
    dm: {
        "Amazon EC2 (Decoy)": "Fatal flaw: EC2 is not serverless! The prompt requested serverless compute.",
        "Amazon RDS (Decoy)": "Fatal flaw: RDS is a relational database. The prompt specified a NoSQL database (DynamoDB).",
        "Application Load Balancer (Decoy)": "Fatal flaw: ALBs are for routing to EC2/ECS. For Lambda serverless, use API Gateway."
    }
});

const output = 'const DATA = ' + JSON.stringify(DATA, null, 4) + ';';
fs.writeFileSync('data.js', output, 'utf8');
console.log('Successfully injected Final Boss architecture. Total arch scenarios: ' + DATA.arch.length);
