const fs = require('fs');

let content = fs.readFileSync('data.js', 'utf8');
let evalContent = content.replace('const DATA =', 'var DATA=');
eval(evalContent);

// Add Module 24: CSM Mechanics
const csmModule = {
    id: 24,
    title: 'CSM Mechanics',
    icon: '&#128187;', // Computer
    topics: [
        {
            title: 'The Agile Manifesto',
            tags: ['Agile', 'CSM', 'Theory'],
            prose: `
<p>While the Scrum Guide provides the rules of the framework, the <strong>Agile Manifesto</strong> provides the philosophical foundation. It was written in 2001 by 17 software developers who wanted an alternative to documentation-driven, heavyweight software development processes.</p>
<p><strong>The 4 Values of the Agile Manifesto:</strong></p>
<ul>
<li><strong>Individuals and interactions</strong> over processes and tools</li>
<li><strong>Working software</strong> over comprehensive documentation</li>
<li><strong>Customer collaboration</strong> over contract negotiation</li>
<li><strong>Responding to change</strong> over following a plan</li>
</ul>
<div class="lesson-alert"><strong>Exam Tip (CSM):</strong> Notice the word "over". The things on the right still have value, but the things on the left are valued <em>more</em>. If an exam question says "Agile means no documentation," it is false.</div>
`
        },
        {
            title: 'User Stories & Acceptance Criteria',
            tags: ['Agile', 'CSM', 'Requirements'],
            prose: `
<p>The Scrum Guide mentions "Product Backlog items" but doesn't dictate how they should be written. In practice, most teams use <strong>User Stories</strong>.</p>
<p>A User Story follows the format: <em>"As a [user type], I want to [action] so that [benefit]."</em> This format ensures the team focuses on the <strong>value</strong> delivered to the user rather than technical implementation details.</p>
<p><strong>Acceptance Criteria</strong> are the conditions that a software product must satisfy to be accepted by a user, customer, or other stakeholder. They define the boundaries of a user story and are used to confirm when a story is completed.</p>
<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> A User Story is like a restaurant order ("As a customer, I want a steak so that I am no longer hungry"). The Acceptance Criteria are the details ("Medium rare, with a side of fries, served hot").</div>
`
        },
        {
            title: 'Relative Estimation & Planning Poker',
            tags: ['Agile', 'CSM', 'Estimation'],
            prose: `
<p>Humans are notoriously bad at estimating exactly how many hours a complex task will take. Agile teams overcome this using <strong>Relative Estimation</strong> (estimating the size of an item relative to another item) rather than absolute estimation (hours).</p>
<p>The most common technique is using <strong>Story Points</strong> and the Fibonacci sequence (1, 2, 3, 5, 8, 13...). A 5-point story is roughly five times bigger or more complex than a 1-point story.</p>
<p><strong>Planning Poker</strong> is a consensus-based technique for estimating. All Developers reveal their estimates simultaneously. If there's a large discrepancy (e.g., someone says 2, another says 13), those team members discuss their reasoning until consensus is reached.</p>
<div class="lesson-alert"><strong>Exam Tip (CSM):</strong> Story points measure effort, complexity, and risk, <em>not</em> time. Only the people doing the work (the Developers) provide estimates.</div>
`
        },
        {
            title: 'Velocity & Burn-down Charts',
            tags: ['Agile', 'CSM', 'Metrics'],
            prose: `
<p><strong>Velocity</strong> is the amount of work (usually measured in Story Points) that a Developers complete during a Sprint. By averaging the velocity of the last few Sprints, the Product Owner can forecast how much work the team can likely complete in future Sprints.</p>
<p>A <strong>Sprint Burn-down Chart</strong> tracks the remaining work in the Sprint Backlog across the days of the Sprint. It helps the Developers visualize if they are on track to meet the Sprint Goal.</p>
<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Velocity is your car's MPG. You use it to predict how far you can go on a tank of gas. But you wouldn't tell a team to "increase their MPG" by driving faster; velocity is an observation, not a target.</div>
`
        }
    ]
};

DATA.course.push(csmModule);

// Add 30 more exam questions to DATA.exam_psm
const newExamQuestions = [
    {
        q: "What is the main reason for the Scrum Master to be at the Daily Scrum?",
        opts: [
            "To gather status and progress information.",
            "To write down any changes to the Sprint Backlog.",
            "They do not have to be there; they only need to ensure the Developers have the event.",
            "To make sure every team member answers the three questions."
        ],
        ans: 2,
        explanation: "The Scrum Master enforces the rule that only Developers participate in the Daily Scrum. They do not have to attend unless they are actively working on items in the Sprint Backlog."
    },
    {
        q: "When many Scrum Teams are working on a single product, what should best describe the Definition of Done?",
        opts: [
            "Each Scrum Team must have a separate Definition of Done.",
            "All Scrum Teams must have a mutually defining Definition of Done that makes their combined work potentially releasable.",
            "It depends on the architecture.",
            "The Scrum Masters define it."
        ],
        ans: 1,
        explanation: "If there are multiple Scrum Teams working together on a product, they must mutually define and comply with the same Definition of Done."
    },
    {
        q: "Which of the following is true regarding the Product Backlog?",
        opts: [
            "It is managed by the Scrum Master.",
            "It is never complete.",
            "It only contains bugs and technical debt.",
            "It is finalized before the first Sprint."
        ],
        ans: 1,
        explanation: "The Product Backlog is never complete. The earliest development of it lays out the initially known and best-understood requirements, but it evolves as the product and the environment in which it will be used evolves."
    },
    {
        q: "Who is responsible for managing the progress of work during a Sprint?",
        opts: [
            "The Product Owner",
            "The Scrum Master",
            "The Developers",
            "The Project Manager"
        ],
        ans: 2,
        explanation: "The Developers are always accountable for creating a plan for the Sprint (Sprint Backlog), instilling quality, and adapting their plan each day toward the Sprint Goal."
    },
    {
        q: "A Scrum Team is working on a 4-week Sprint. How long should their Sprint Review be?",
        opts: [
            "1 hour",
            "2 hours",
            "4 hours maximum",
            "As long as it takes to show all the work"
        ],
        ans: 2,
        explanation: "The Sprint Review is timeboxed to a maximum of four hours for a one-month Sprint. For shorter Sprints, the event is usually shorter."
    },
    {
        q: "What is the result of the Sprint Review?",
        opts: [
            "A revised Product Backlog that defines the probable Product Backlog items for the next Sprint.",
            "A PowerPoint presentation for stakeholders.",
            "A finalized design for the next Sprint.",
            "A new Sprint Goal."
        ],
        ans: 0,
        explanation: "The Sprint Review includes a discussion of what to do next, so the Product Backlog may also be adjusted to meet new opportunities. The result of the Sprint Review is a revised Product Backlog."
    },
    {
        q: "True or False: The Scrum Master can order the Product Backlog if the Product Owner is too busy.",
        opts: [
            "True",
            "False"
        ],
        ans: 1,
        explanation: "False. The Product Owner may delegate the work of managing the Product Backlog, but they remain accountable. The Scrum Master cannot arbitrarily take over this accountability."
    },
    {
        q: "When can a Sprint be cancelled?",
        opts: [
            "When the Developers feel they cannot finish the work.",
            "When the Scrum Master identifies too many impediments.",
            "If the Sprint Goal becomes obsolete.",
            "A Sprint can never be cancelled."
        ],
        ans: 2,
        explanation: "A Sprint could be cancelled if the Sprint Goal becomes obsolete. Only the Product Owner has the authority to cancel the Sprint."
    },
    {
        q: "Which two things does the Scrum framework use to optimize predictability and control risk?",
        opts: [
            "Agile mindset and lean thinking",
            "Transparency and detailed planning",
            "Empiricism and iterative, incremental development",
            "Story points and velocity"
        ],
        ans: 2,
        explanation: "Scrum employs an iterative, incremental approach to optimize predictability and to control risk. It is founded on empiricism and lean thinking."
    },
    {
        q: "What does it mean for a Scrum Team to be cross-functional?",
        opts: [
            "Every member of the team must have the same skills.",
            "The team members have all the skills necessary to create value each Sprint.",
            "They can work across different projects simultaneously.",
            "They speak multiple languages."
        ],
        ans: 1,
        explanation: "Cross-functional teams have all competencies needed to accomplish the work without depending on others not part of the team."
    },
    {
        q: "During Sprint Planning, the Developers realize they have taken on too much work. What should they do?",
        opts: [
            "Work overtime to finish everything.",
            "Collaborate with the Product Owner to remove or change items.",
            "Extend the Sprint duration.",
            "Cancel the Sprint."
        ],
        ans: 1,
        explanation: "If the Developers determine they have too much or too little work, they may renegotiate the selected Product Backlog items with the Product Owner."
    },
    {
        q: "What is the primary way a Scrum Master keeps a Developers working at its highest level of productivity?",
        opts: [
            "By ensuring the meetings start and end at the proper time.",
            "By facilitating Developer decisions and removing impediments.",
            "By keeping track of task hours.",
            "By managing the team's velocity."
        ],
        ans: 1,
        explanation: "The Scrum Master serves the Scrum Team in several ways, including causing the removal of impediments to the Scrum Team's progress and coaching the team members in self-management and cross-functionality."
    },
    {
        q: "Who is responsible for engaging the stakeholders?",
        opts: [
            "The Developers",
            "The Product Owner",
            "The Scrum Master",
            "The Project Manager"
        ],
        ans: 1,
        explanation: "The Product Owner is accountable for maximizing the value of the product, which includes representing the desires of the stakeholders to the Scrum Team."
    },
    {
        q: "Which statement best describes the Sprint Backlog as an artifact?",
        opts: [
            "It is the Product Owner's plan for the Sprint.",
            "It is a highly visible, real-time picture of the work that the Developers plan to accomplish during the Sprint.",
            "It is a list of tasks that must be completed.",
            "It is a fixed commitment that cannot change."
        ],
        ans: 1,
        explanation: "The Sprint Backlog is a plan by and for the Developers. It is a highly visible, real-time picture of the work that the Developers plan to accomplish during the Sprint in order to achieve the Sprint Goal."
    },
    {
        q: "When must the Definition of Done be created?",
        opts: [
            "Before the first Sprint begins.",
            "During the first Sprint Planning.",
            "Before an Increment can be considered Done.",
            "By the end of the first Sprint."
        ],
        ans: 2,
        explanation: "If it is not an organizational standard, the Scrum Team must create a Definition of Done appropriate for the product before any Increment can be considered Done."
    },
    {
        q: "True or False: The Scrum Team must choose at least one high priority process improvement item from the Sprint Retrospective and place it in the Sprint Backlog for the next Sprint.",
        opts: [
            "True",
            "False"
        ],
        ans: 1,
        explanation: "False. This was a rule in the 2017 Scrum Guide, but it was removed in the 2020 Scrum Guide to make the framework less prescriptive. It is a good practice, but not mandatory."
    },
    {
        q: "What is the purpose of a Sprint?",
        opts: [
            "To release a new feature to customers.",
            "To produce a Done Increment that meets the Sprint Goal.",
            "To complete all items in the Sprint Backlog.",
            "To update the burn-down chart."
        ],
        ans: 1,
        explanation: "The heart of Scrum is a Sprint, a timebox of one month or less during which a \"Done\", useable, and potentially releasable product Increment is created."
    },
    {
        q: "Who is accountable for the creation of the Definition of Done?",
        opts: [
            "The Scrum Master",
            "The Product Owner",
            "The Developers",
            "The Scrum Team (or the Organization)"
        ],
        ans: 3,
        explanation: "If the Definition of Done for an increment is part of the standards of the organization, all Scrum Teams must follow it. If it is not an organizational standard, the Scrum Team must create a Definition of Done appropriate for the product."
    },
    {
        q: "Which of the following is an accountability of the Scrum Master?",
        opts: [
            "Ordering the Product Backlog.",
            "Helping the Scrum Team understand the need for clear and concise Product Backlog items.",
            "Assigning tasks to Developers.",
            "Estimating the effort of Product Backlog items."
        ],
        ans: 1,
        explanation: "The Scrum Master serves the Product Owner by helping find techniques for effective Product Goal definition and Product Backlog management, and helping the Scrum Team understand the need for clear and concise Product Backlog items."
    },
    {
        q: "When is the Sprint Retrospective held?",
        opts: [
            "Before Sprint Planning.",
            "After the Sprint Review and prior to the next Sprint Planning.",
            "In the middle of the Sprint.",
            "Whenever the team feels they need to improve."
        ],
        ans: 1,
        explanation: "The Sprint Retrospective concludes the Sprint. It is held after the Sprint Review and prior to the next Sprint Planning."
    },
    {
        q: "What does the Scrum Master do if the Developers do not have all the skills necessary to complete the Sprint Backlog?",
        opts: [
            "Cancel the Sprint.",
            "Do the missing work themselves.",
            "Facilitate the team in finding a solution (e.g., learning, bringing in an expert temporarily).",
            "Tell the Product Owner to remove the items."
        ],
        ans: 2,
        explanation: "The Scrum Master is a coach and facilitator. They help the team self-manage to solve their own problems, such as skill gaps."
    },
    {
        q: "How much time should the Scrum Team allocate to Product Backlog refinement?",
        opts: [
            "10% of the Sprint.",
            "20% of the Sprint.",
            "As much time as is needed.",
            "It must only happen during Sprint Planning."
        ],
        ans: 2,
        explanation: "The 2017 Guide suggested 10%, but the 2020 Guide removed this. Refinement is an ongoing activity to add details, such as a description, order, and size. The Scrum Team decides how and when refinement is done."
    },
    {
        q: "Which Scrum Value is demonstrated by a Developer asking for help when they are stuck?",
        opts: [
            "Courage",
            "Focus",
            "Commitment",
            "Openness"
        ],
        ans: 3,
        explanation: "Openness. The Scrum Team and its stakeholders agree to be open about all the work and the challenges with performing the work."
    },
    {
        q: "What is the maximum length of a Sprint?",
        opts: [
            "2 weeks",
            "30 days",
            "One calendar month",
            "There is no maximum"
        ],
        ans: 2,
        explanation: "Sprints are fixed length events of one month or less to create consistency."
    },
    {
        q: "Who is permitted to change the Sprint Backlog during a Sprint?",
        opts: [
            "The Product Owner",
            "The Scrum Master",
            "The Developers",
            "Management"
        ],
        ans: 2,
        explanation: "The Sprint Backlog is a plan by and for the Developers. Only the Developers can change its contents during a Sprint as they learn more about the work needed to achieve the Sprint Goal."
    },
    {
        q: "If an organization wants to scale Scrum to 3 teams working on one product, how many Definition of Dones should they have?",
        opts: [
            "Three",
            "One",
            "None",
            "One per feature"
        ],
        ans: 1,
        explanation: "If there are multiple Scrum Teams working together on a product, they must mutually define and comply with the same Definition of Done."
    },
    {
        q: "Who is responsible for sizing (estimating) Product Backlog items?",
        opts: [
            "The Scrum Master",
            "The Product Owner",
            "The Developers",
            "The whole Scrum Team"
        ],
        ans: 2,
        explanation: "The Developers who will be doing the work are responsible for the sizing. The Product Owner may influence the Developers by helping them understand and select trade-offs."
    },
    {
        q: "Which event provides an opportunity to inspect the Increment and adapt the Product Backlog?",
        opts: [
            "Sprint Planning",
            "Daily Scrum",
            "Sprint Review",
            "Sprint Retrospective"
        ],
        ans: 2,
        explanation: "The purpose of the Sprint Review is to inspect the outcome of the Sprint and determine future adaptations. The Scrum Team presents the results of their work to key stakeholders."
    },
    {
        q: "What is the role of Management in Scrum?",
        opts: [
            "To assign tasks to Developers.",
            "To support the Product Owner with insights and information into high value product and system capabilities, and to support the Scrum Master in causing organizational change.",
            "To run the Daily Scrum.",
            "Management has no role in Scrum."
        ],
        ans: 1,
        explanation: "Management supports the Scrum Team by providing resources, strategic direction, and helping remove organizational impediments."
    },
    {
        q: "What does the Agile Manifesto say about 'Responding to change'?",
        opts: [
            "Responding to change over following a plan.",
            "Responding to change over comprehensive documentation.",
            "Responding to change over contract negotiation.",
            "Responding to change over individuals and interactions."
        ],
        ans: 0,
        explanation: "The Agile Manifesto values 'Responding to change over following a plan'."
    }
];

if (!DATA.exam_psm) DATA.exam_psm = [];
DATA.exam_psm.push(...newExamQuestions);

const output = 'const DATA = ' + JSON.stringify(DATA, null, 4) + ';';
fs.writeFileSync('data.js', output, 'utf8');

console.log('Successfully injected CSM Module and 30 new PSM/CSM questions.');
