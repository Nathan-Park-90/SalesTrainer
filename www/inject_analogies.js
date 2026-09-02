const fs = require('fs');

let c = fs.readFileSync('data.js', 'utf8').replace('const DATA = ', 'var DATA=');
eval(c);

const analogies = [
  // Mod 1: VPC
  "A VPC is like buying a private island. You decide who gets to build a dock (Internet Gateway) and who has to live in the windowless bunker (Private Subnet).",
  "A Public Subnet is the lobby of your corporate office. Anyone can walk in off the street. The Private Subnet is the vault in the basement—you can only get there if you're already inside the building and have the right keycard.",
  // Mod 2: Compute
  "EC2 is renting a heavy-duty pickup truck by the hour. You can haul anything you want, but you pay for the truck whether it's moving or idling. It's raw, unmanaged capacity.",
  "Lambda is like calling an Uber instead of buying a car. You don't care about maintenance, gas, or parking. You just say 'take me to the airport' and you only pay for the exact milliseconds you were in the car.",
  // Mod 3: Storage
  "S3 is a massive warehouse where every box has a barcode. You can't open a box and edit a single page inside it; you have to replace the whole box. But the warehouse holds infinite boxes.",
  "EBS is the literal hard drive you slide into the side of a laptop. It's incredibly fast, but if the laptop catches fire (Availability Zone goes down), that hard drive is going with it unless you took a snapshot.",
  // Mod 4: Databases
  "RDS is a highly-organized Excel spreadsheet maintained by an obsessive accountant. Everything must be perfect before it gets written down. It's slow to reorganize, but you know the math is flawless.",
  "DynamoDB is a hyper-fast rolodex. You don't have complex relationships or massive reporting queries. You just need to instantly look up 'John Doe's High Score' 100,000 times a second without breaking a sweat.",
  // Mod 5: SE Career
  "Moving from SWE to SE is like moving from the kitchen line to the Maitre D' stand. You still know exactly how the steak is cooked, but your job is now convincing the critic that it's the best steak in the city.",
  "Your portfolio project is your highlight tape. No NFL scout cares that you can run a 40-yard dash in practice; they want to see you break a tackle in a real game. Build a project that solves a real business pain.",
  "The Demo Round is a hostage negotiation. They are going to throw curveballs to see if you panic. Your goal isn't to show every feature; it's to de-escalate their concerns and guide them safely to the 'buy' button.",
  // Mod 6: Networking
  "Route 53 is the air traffic controller at JFK. It doesn't just route planes (traffic) blindly; it checks if the runway is clear (Health Checks) and routes the plane to the fastest available tarmac (Latency Routing).",
  "CloudFront is storing your inventory in local fulfillment centers. Instead of shipping a book from New York to Tokyo every time someone orders it, you keep copies in Tokyo so it arrives in 2 hours.",
  "VPC Peering is running an extension cord directly between your house and your neighbor's house. Transit Gateway is building a neighborhood power grid where everyone plugs into the central station.",
  // Mod 7: Security
  "An Identity Policy is your driver's license (who you are). A Resource Policy is the VIP list at the club door (who is allowed in). You usually need both to get into the VIP section.",
  "Using AWS Managed KMS Keys is like keeping your money in a bank vault, but the bank manager has a copy of the key. Customer Managed Keys mean you swap the lock yourself, and if the auditor asks, you can prove no one else has access.",
  "AWS Shield is the concrete bollards outside a stadium stopping a truck from ramming the doors. WAF is the security guard checking your ticket to make sure you aren't carrying a weapon (SQL injection).",
  // Mod 8: Governance
  "CloudWatch is the speedometer on your dashboard (performance). CloudTrail is the dashcam recording exactly who was driving and where they turned (auditing). Config is the safety inspector checking if your tires are bald.",
  "An SCP (Service Control Policy) is the parental lock on the TV. It doesn't matter if you have the remote (IAM Admin access); if the parental lock says no R-rated movies, you aren't watching an R-rated movie.",
  "Kinesis is the catch-basin under a waterfall. When 100,000 IoT sensors are blasting data at you, your database will drown. Kinesis absorbs the blast, buffers the water, and lets your backend sip it through a straw.",
  // Mod 9: Containers
  "ECS is like managing a fleet of delivery vans yourself—you have to hire the drivers and change the oil (manage EC2s). Fargate is just paying FedEx to do it for you. You just hand them the package (container) and they handle the trucks.",
  "Elastic Beanstalk is the microwave dinner of cloud computing. You just put your code in, press 'Popcorn', and it automatically spins up the EC2 instances, load balancers, and scaling groups without you doing the math.",
  // Mod 10: DR
  "RPO is how much history you are willing to lose (e.g., losing yesterday's emails). RTO is how long you are willing to be paralyzed while you recover (e.g., waiting 4 hours for the system to boot back up).",
  "A Snowball Edge is literally a ruggedized suitcase full of hard drives. When you have 80 Terabytes of data, downloading it over the internet would take 3 months. It's faster to load it onto a truck and drive it down the highway.",
  "Storage Gateway is like having a magical filing cabinet in your office. It looks and acts like a normal cabinet, but the files you put inside actually teleport to an infinite warehouse (S3) to save local space.",
  // Mod 11: Sales Tech Stack
  "Salesforce is your trading journal. If a massive trade goes south and you didn't log the entry conditions, you can't learn from it, and your risk manager will fire you. Log the data.",
  "Gong is the post-fight tape analysis. You don't just celebrate the knockout; you watch the tape to see your opponent's tell, and you analyze why your parry was 100ms too slow.",
  // Mod 12: Zero Trust
  "Zero Trust is compartmentalization on a submarine. If there's a hull breach in the torpedo room, you seal the bulkhead doors. The ship survives because the breach is contained. That's what blocking lateral movement does for your network.",
  "Compliance is your entry ticket to the high-roller table. You can't walk into a VIP casino in flip-flops. SOC 2 Type II is the bespoke suit that proves you belong in the room with enterprise buyers.",
  // Mod 13: Hostile CTO
  "The Build vs Buy argument is a simple math problem masked as an ego trip. Yes, they can build it. But engineering time is the most expensive commodity on earth. Why spend $500k building a hammer when you can buy ours for $50k?",
  "Technical Judo means you don't block their strike; you use their momentum. When they attack a missing feature, pivot: 'Why is that workflow critical to your Q3 revenue goals?' Suddenly, you're talking business, not bits.",
  // Mod 14: Demo Art
  "Skipping Discovery is like a doctor prescribing chemotherapy before looking at the blood test. It's malpractice. Ask where it hurts before you offer the cure.",
  "Tell-Show-Tell is the magician's pledge, turn, and prestige. You set the expectation, you execute the trick flawlessly, and you remind them how impossible it seemed 10 minutes ago."
];

// Inject analogies
let analogyIndex = 0;
DATA.course.forEach(mod => {
    mod.topics.forEach(topic => {
        let text = analogies[analogyIndex] || "An analogy connects the abstract to the concrete.";
        let html = `
            <div class="lesson-analogy">
                <div class="lesson-analogy-header">
                    <svg viewBox="0 0 24 24"><path d="M12 2L12 22M9 5L15 5M7 19L17 19M12 22C7 22 4 17 4 12H7C7 15 9 19 12 19C15 19 17 15 17 12H20C20 17 17 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    The Anchor
                </div>
                <div class="lesson-analogy-body">
                    ${text}
                </div>
            </div>
        `;
        topic.prose = (topic.prose || "") + html;
        analogyIndex++;
    });
});

let output = 'const DATA = ' + JSON.stringify(DATA, null, 2) + ';\n\n';
output += 'const SK="commuter_v3",XP_R={hard:5,good:10,easy:20,arch:50,sales:30,demo:40};\n';
output += 'const XP_CYCLE=200,IV={hard:60000,good:600000,easy:86400000};\n';

fs.writeFileSync('data.js', output);
console.log(`Injected ${analogyIndex} analogies successfully.`);
