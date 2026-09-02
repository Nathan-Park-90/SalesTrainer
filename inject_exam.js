const fs = require('fs');

let content = fs.readFileSync('data.js', 'utf8');
let evalContent = content.replace('const DATA =', 'var DATA=');
eval(evalContent);

// Add the PSM 1 Exam Simulator Questions
DATA.exam_psm = [
    {
        q: "Who has the authority to cancel a Sprint?",
        opts: [
            "The Scrum Master, if there are too many impediments.",
            "The Developers, if they cannot meet the Sprint Goal.",
            "The Product Owner, if the Sprint Goal becomes obsolete.",
            "Any member of the Scrum Team."
        ],
        ans: 2,
        explanation: "Only the Product Owner has the authority to cancel the Sprint, although they may do so under influence from the stakeholders, the Developers, or the Scrum Master."
    },
    {
        q: "What is the timebox for a Sprint Planning event based on a one-month Sprint?",
        opts: [
            "4 hours",
            "8 hours",
            "Timeboxed based on how much work is in the Product Backlog",
            "Until all developers agree on the plan"
        ],
        ans: 1,
        explanation: "Sprint Planning is timeboxed to a maximum of eight hours for a one-month Sprint. For shorter Sprints, the event is usually shorter."
    },
    {
        q: "Which of the following is NOT an official Scrum Artifact?",
        opts: [
            "Product Backlog",
            "Sprint Goal",
            "Sprint Backlog",
            "Increment"
        ],
        ans: 1,
        explanation: "The three artifacts are the Product Backlog, Sprint Backlog, and Increment. The Sprint Goal is a *commitment* contained within the Sprint Backlog, not a standalone artifact."
    },
    {
        q: "Who creates the Definition of Done?",
        opts: [
            "The Scrum Master, to ensure quality.",
            "The Product Owner, based on stakeholder requirements.",
            "If it is not an organizational standard, the Scrum Team must create a Definition of Done appropriate for the product.",
            "The Developers, because they do the work."
        ],
        ans: 2,
        explanation: "If the Definition of Done for an increment is part of the standards of the organization, all Scrum Teams must follow it as a minimum. If it is not an organizational standard, the Scrum Team must create a Definition of Done appropriate for the product."
    },
    {
        q: "What happens if an item in the Sprint Backlog cannot be finished by the end of the Sprint?",
        opts: [
            "The Sprint is extended to allow the Developers to finish the work.",
            "It is presented at the Sprint Review as a 'work in progress'.",
            "It is moved to the next Sprint automatically.",
            "It returns to the Product Backlog."
        ],
        ans: 3,
        explanation: "If a Product Backlog item does not meet the Definition of Done, it cannot be released or even presented at the Sprint Review. It returns to the Product Backlog for future consideration."
    },
    {
        q: "During a Sprint, a stakeholder approaches a Developer and asks them to add an urgent, small feature. What should the Developer do?",
        opts: [
            "Add it to the Sprint Backlog and work on it, as Scrum requires agility.",
            "Tell the stakeholder to talk to the Product Owner.",
            "Ask the Scrum Master to block the stakeholder from talking to them.",
            "Complete the work but don't mention it in the Daily Scrum to avoid distracting the team."
        ],
        ans: 1,
        explanation: "Those wanting to change the Product Backlog can do so only by trying to convince the Product Owner. The Product Owner is accountable for maximizing the value of the product."
    },
    {
        q: "What is the primary difference between the Sprint Review and the Sprint Retrospective?",
        opts: [
            "The Review inspects the process; the Retrospective inspects the product.",
            "The Review inspects the product; the Retrospective inspects the process (individuals, interactions, tools).",
            "The Review is for management; the Retrospective is for the Scrum Team.",
            "There is no difference; they are two names for the same event."
        ],
        ans: 1,
        explanation: "The Sprint Review is to inspect the outcome of the Sprint (the Increment) and determine future adaptations. The Sprint Retrospective is to plan ways to increase quality and effectiveness (process)."
    },
    {
        q: "How many Product Owners should there be for a product being built by three separate Scrum Teams?",
        opts: [
            "Three Product Owners, one for each team.",
            "One Product Owner, but they can delegate their responsibilities to a Chief Product Owner.",
            "One Product Owner.",
            "As many as the teams need to ensure fast decision making."
        ],
        ans: 2,
        explanation: "One Product, One Product Backlog, One Product Owner. This remains true regardless of the number of Scrum Teams working on the product."
    },
    {
        q: "Which Scrum Value is demonstrated when a Developer admits they made a mistake that caused the build to fail?",
        opts: [
            "Commitment",
            "Focus",
            "Openness",
            "Respect"
        ],
        ans: 2,
        explanation: "Openness: The Scrum Team and its stakeholders agree to be open about all the work and the challenges with performing the work."
    },
    {
        q: "Who determines how work gets done during the Sprint?",
        opts: [
            "The Scrum Master",
            "The Product Owner",
            "The Project Manager",
            "The Developers"
        ],
        ans: 3,
        explanation: "The Developers are always accountable for creating a plan for the Sprint, the Sprint Backlog. How they turn Product Backlog items into an Increment of value is solely up to them."
    }
];

// Ensure DATA.exam is renamed to DATA.exam_aws if not already
if (DATA.exam && !DATA.exam_aws) {
    DATA.exam_aws = DATA.exam;
}

const output = 'const DATA = ' + JSON.stringify(DATA, null, 4) + ';';
fs.writeFileSync('data.js', output, 'utf8');

console.log('Successfully injected PSM 1 Exam Simulator into data.js');
