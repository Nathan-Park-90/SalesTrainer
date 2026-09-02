const fs = require('fs');

let content = fs.readFileSync('data.js', 'utf8');
let evalContent = content.replace('const DATA =', 'var DATA=');
eval(evalContent);

// Add 5 new Modules for Scrum
const scrumModules = [
    {
        id: 19,
        title: 'Scrum Foundations & Values',
        icon: '&#9878;', // Scales
        topics: [
            {
                title: 'Empiricism: The 3 Pillars',
                tags: ['Scrum', 'Theory', 'PSM1'],
                prose: `
<p>Scrum is not a methodology; it is a lightweight framework based on empiricism and lean thinking. Empiricism asserts that knowledge comes from experience and making decisions based on what is observed. The 2020 Scrum Guide defines three critical pillars that uphold every empirical process:</p>
<p><strong>1. Transparency:</strong> The emergent process and work must be visible to those performing the work and those receiving the work. Without transparency, inspection is misleading.</p>
<p><strong>2. Inspection:</strong> Scrum artifacts and progress toward agreed goals must be inspected frequently and diligently to detect potentially undesirable variances.</p>
<p><strong>3. Adaptation:</strong> If any aspects of a process deviate outside acceptable limits or if the resulting product is unacceptable, the process or the material being processed must be adjusted immediately.</p>
<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> Empiricism is navigating a ship by looking at the stars (Inspection), updating the map (Transparency), and turning the wheel (Adaptation). Traditional waterfall is drawing a line on a map before leaving port and refusing to look out the window for the entire journey.</div>
<div class="lesson-alert"><strong>Exam Tip (PSM 1):</strong> The exam will test if you understand that Inspection without Adaptation is considered pointless in Scrum. Adaptation must happen <em>as soon as possible</em> to minimize further deviation.</div>
`
            },
            {
                title: 'The 5 Scrum Values',
                tags: ['Scrum', 'Values', 'PSM1'],
                prose: `
<p>The successful use of Scrum depends on people becoming more proficient in living five core values. Without these, the three pillars of empiricism crumble.</p>
<p><strong>1. Commitment:</strong> To achieving the goals of the Scrum Team and supporting each other.</p>
<p><strong>2. Focus:</strong> On the work of the Sprint and making the best possible progress toward these goals.</p>
<p><strong>3. Openness:</strong> About the work and the challenges.</p>
<p><strong>4. Respect:</strong> For each other to be capable, independent people.</p>
<p><strong>5. Courage:</strong> To do the right thing and work on tough problems.</p>
<div class="lesson-alert"><strong>Exam Tip (PSM 1):</strong> The Scrum Values give direction to the Scrum Team with regard to their work, actions, and behavior. The exam might ask what gives life to the empirical pillars: the answer is the Scrum Values.</div>
`
            }
        ]
    },
    {
        id: 20,
        title: 'Scrum Accountabilities',
        icon: '&#128101;', // People
        topics: [
            {
                title: 'The Scrum Master',
                tags: ['Scrum', 'ScrumMaster', 'CSM'],
                prose: `
<p>The Scrum Master is accountable for establishing Scrum as defined in the Scrum Guide. They do this by helping everyone understand Scrum theory and practice. The 2020 Guide made a crucial language update: the Scrum Master is no longer a "servant-leader", but a <strong>"true leader who serves"</strong> the Scrum Team and the larger organization.</p>
<p><strong>Accountabilities:</strong></p>
<p>- Coaching the team members in self-management and cross-functionality.<br>- Helping the Scrum Team focus on creating high-value Increments that meet the Definition of Done.<br>- Causing the removal of impediments to the Scrum Team’s progress.<br>- Ensuring that all Scrum events take place and are positive, productive, and kept within the timebox.</p>
<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> The Scrum Master is the team's mechanic. They don't drive the car (that's the Developers) and they don't pick the destination (that's the Product Owner). They ensure the engine is running perfectly, remove debris from the road, and make sure everyone is following the rules of the road.</div>
`
            },
            {
                title: 'The Product Owner',
                tags: ['Scrum', 'ProductOwner', 'PSM1'],
                prose: `
<p>The Product Owner (PO) is accountable for maximizing the value of the product resulting from the work of the Scrum Team. How this is done varies widely across organizations.</p>
<p><strong>Crucial PSM 1 Facts:</strong><br>- The PO is <strong>one person</strong>, not a committee. They may represent the needs of a committee, but those wanting to change the Product Backlog can do so only by trying to convince the PO.<br>- They are solely accountable for effective Product Backlog management (creating items, ordering items, ensuring it is transparent).<br>- Only the Product Owner has the authority to <strong>cancel a Sprint</strong>.</p>
<div class="lesson-alert"><strong>Exam Tip (PSM 1):</strong> If an exam question asks "Who can cancel a Sprint?", the answer is ALWAYS the Product Owner. If it asks "Who is responsible for the Product Goal?", it is the Product Owner. Never choose "Management" or "The Scrum Master".</div>
`
            },
            {
                title: 'The Developers',
                tags: ['Scrum', 'Developers', 'PSM1'],
                prose: `
<p>Developers are the people in the Scrum Team that are committed to creating any aspect of a usable Increment each Sprint. Note the 2020 update: the term "Development Team" was removed. It is now just "Developers" as an accountability within the cohesive Scrum Team to reduce "us vs. them" silos.</p>
<p><strong>Accountabilities:</strong><br>- Creating a plan for the Sprint (the Sprint Backlog).<br>- Instilling quality by adhering to a Definition of Done.<br>- Adapting their plan each day toward the Sprint Goal.<br>- Holding each other accountable as professionals.</p>
<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> "Developer" in Scrum doesn't just mean a software engineer. If you are building an ad campaign, the copywriter and designer are the "Developers." They are the ones doing the actual work of the Sprint.</div>
`
            }
        ]
    },
    {
        id: 21,
        title: 'Scrum Events',
        icon: '&#9201;', // Stopwatch
        topics: [
            {
                title: 'The Sprint',
                tags: ['Scrum', 'Events', 'PSM1'],
                prose: `
<p>Sprints are the heartbeat of Scrum. They are fixed length events of one month or less. <strong>A new Sprint starts immediately after the conclusion of the previous Sprint.</strong> There are no "Phase 1" or "Integration" sprints in Scrum.</p>
<p>During the Sprint:<br>- No changes are made that would endanger the Sprint Goal.<br>- Quality does not decrease.<br>- The Product Backlog is refined as needed.<br>- Scope may be clarified and renegotiated with the Product Owner as more is learned.</p>
<div class="lesson-alert"><strong>Exam Tip (PSM 1):</strong> Sprints are containers for all other events. An exam trap is asking if you can extend a Sprint to finish work. The answer is NEVER. A Sprint is a strict timebox. If the work isn't done, it goes back to the Product Backlog.</div>
`
            },
            {
                title: 'Sprint Planning',
                tags: ['Scrum', 'Events', 'PSM1'],
                prose: `
<p>Sprint Planning initiates the Sprint. It is timeboxed to a maximum of <strong>8 hours for a one-month Sprint</strong>. The 2020 Scrum Guide defines three topics that must be addressed during this event:</p>
<p><strong>Topic 1: Why is this Sprint valuable?</strong> The PO proposes how the product could increase its value. The whole team collaborates to define a <em>Sprint Goal</em>.<br><strong>Topic 2: What can be Done this Sprint?</strong> The Developers select items from the Product Backlog to include in the current Sprint.<br><strong>Topic 3: How will the chosen work get done?</strong> The Developers decompose the selected items into an actionable plan (usually 1-day tasks).</p>
<div class="lesson-alert"><strong>Exam Tip (PSM 1):</strong> Only the Developers can decide how many items they pull into a Sprint. The PO cannot force them to take more work than they believe they can complete.</div>
`
            },
            {
                title: 'Daily Scrum',
                tags: ['Scrum', 'Events', 'PSM1'],
                prose: `
<p>The purpose of the Daily Scrum is to inspect progress toward the Sprint Goal and adapt the Sprint Backlog as necessary. It is a <strong>15-minute event for the Developers</strong>. If the PO or Scrum Master are actively working on items in the Sprint Backlog, they participate as Developers.</p>
<p>The Scrum Master ensures the meeting happens, but the Developers are responsible for conducting it. It is not a status meeting for management; it is a planning meeting for the Developers.</p>
<div class="lesson-alert"><strong>Exam Tip (PSM 1):</strong> The Daily Scrum does not require the classic "Three Questions" (What did I do yesterday, what will I do today, what are my blockers). The 2020 Guide removed this mandate. Developers can structure it however they want, as long as it focuses on progress toward the Sprint Goal.</div>
`
            },
            {
                title: 'Sprint Review & Retrospective',
                tags: ['Scrum', 'Events', 'PSM1'],
                prose: `
<p><strong>Sprint Review:</strong> Purpose is to inspect the outcome of the Sprint and determine future adaptations. The Scrum Team presents the results of their work to key stakeholders and progress toward the Product Goal is discussed. Timeboxed to 4 hours for a one-month Sprint. It is a working session, not just a presentation.</p>
<p><strong>Sprint Retrospective:</strong> Purpose is to plan ways to increase quality and effectiveness. The Scrum Team inspects how the last Sprint went with regards to individuals, interactions, processes, tools, and their Definition of Done. Timeboxed to 3 hours for a one-month Sprint. It concludes the Sprint.</p>
`
            }
        ]
    },
    {
        id: 22,
        title: 'Artifacts & Commitments',
        icon: '&#128194;', // Folder
        topics: [
            {
                title: 'Product Backlog & Product Goal',
                tags: ['Scrum', 'Artifacts', 'PSM1'],
                prose: `
<p>Each Scrum artifact contains a commitment. For the Product Backlog, the commitment is the <strong>Product Goal</strong>.</p>
<p>The Product Backlog is an emergent, ordered list of what is needed to improve the product. It is the single source of work undertaken by the Scrum Team. The Product Goal describes a future state of the product which can serve as a target for the Scrum Team to plan against. The Product Goal is in the Product Backlog. The rest of the Product Backlog emerges to define "what" will fulfill the Product Goal.</p>
<div class="lesson-alert"><strong>Exam Tip (PSM 1):</strong> A Scrum Team must fulfill (or abandon) one Product Goal before taking on the next. They cannot have multiple active Product Goals.</div>
`
            },
            {
                title: 'Sprint Backlog & Sprint Goal',
                tags: ['Scrum', 'Artifacts', 'PSM1'],
                prose: `
<p>For the Sprint Backlog, the commitment is the <strong>Sprint Goal</strong>.</p>
<p>The Sprint Backlog is composed of the Sprint Goal (why), the set of Product Backlog items selected for the Sprint (what), and an actionable plan for delivering the Increment (how). The Sprint Backlog is a plan by and for the Developers. It is highly visible, real-time picture of the work that the Developers plan to accomplish during the Sprint.</p>
`
            },
            {
                title: 'The Increment & Definition of Done',
                tags: ['Scrum', 'Artifacts', 'PSM1'],
                prose: `
<p>For the Increment, the commitment is the <strong>Definition of Done (DoD)</strong>.</p>
<p>An Increment is a concrete stepping stone toward the Product Goal. Each Increment is additive to all prior Increments and thoroughly verified, ensuring that all Increments work together. The DoD is a formal description of the state of the Increment when it meets the quality measures required for the product.</p>
<p>The moment a Product Backlog item meets the Definition of Done, an Increment is born.</p>
<div class="lesson-alert"><strong>Exam Tip (PSM 1):</strong> If an item does not meet the Definition of Done, it cannot be released and cannot even be presented at the Sprint Review. It returns to the Product Backlog for future consideration. You cannot show "99% done" work in the Sprint Review.</div>
`
            }
        ]
    },
    {
        id: 23,
        title: 'CSM & Practical Facilitation',
        icon: '&#128221;', // Memo
        topics: [
            {
                title: 'Resolving Conflict & Impediments',
                tags: ['Scrum', 'Facilitation', 'CSM'],
                prose: `
<p>While the PSM 1 focuses strictly on rules, the CSM emphasizes your role as a facilitator. When the Developers are in conflict over architecture, your job is not to choose the architecture. Your job is to facilitate a structured decision-making process.</p>
<p><strong>Impediment Removal:</strong> A true Scrum Master doesn't just fix problems; they teach the team to fix their own problems. Only step in to resolve an impediment if the Developers cannot resolve it themselves. If the environment (management, tools, outside teams) is the blocker, that is when the Scrum Master escalates and shields the team.</p>
<div class="lesson-alert" style="border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);"><strong>⚓ Anchor:</strong> If the team is arguing over React vs. Angular, stay out of the technical weeds. Ask: "What are our objective criteria for this choice?" Make them build a matrix. You own the process of deciding, they own the decision.</div>
`
            },
            {
                title: 'Scaling Scrum (Briefly)',
                tags: ['Scrum', 'Scaling', 'CSM'],
                prose: `
<p>When one product requires more than 10 people, you don't grow the Scrum Team. You create multiple Scrum Teams that share the <strong>same Product Backlog</strong>, the <strong>same Product Owner</strong>, and the <strong>same Product Goal</strong>. Frameworks like Nexus or LeSS manage the integration between these teams.</p>
`
            }
        ]
    }
];

DATA.course.push(...scrumModules);

// Generate 40+ PSM 1 Specific Flashcards
const psmFlashcards = [
    { id: 101, cat:'Scrum', front:'Who has the authority to cancel a Sprint?', back:'Only the Product Owner.', tags:['Scrum', 'PSM1'] },
    { id: 102, cat:'Scrum', front:'Can a Sprint be extended by 2 days if the Developers just need a little more time to finish an item?', back:'No. Sprints are strict timeboxes. Unfinished items return to the Product Backlog.', tags:['Scrum', 'PSM1'] },
    { id: 103, cat:'Scrum', front:'What happens if an item is not "Done" by the end of the Sprint?', back:'It cannot be presented at the Sprint Review. It returns to the Product Backlog.', tags:['Scrum', 'PSM1'] },
    { id: 104, cat:'Scrum', front:'Who determines how many Product Backlog items are selected for a Sprint?', back:'Only the Developers.', tags:['Scrum', 'PSM1'] },
    { id: 105, cat:'Scrum', front:'What is the timebox for a Sprint Planning event based on a one-month Sprint?', back:'Maximum of 8 hours.', tags:['Scrum', 'PSM1'] },
    { id: 106, cat:'Scrum', front:'What is the timebox for a Daily Scrum?', back:'15 minutes for any length of Sprint.', tags:['Scrum', 'PSM1'] },
    { id: 107, cat:'Scrum', front:'Who must attend the Daily Scrum?', back:'The Developers. (PO and Scrum Master only attend if they are actively working on Sprint Backlog items).', tags:['Scrum', 'PSM1'] },
    { id: 108, cat:'Scrum', front:'What is the timebox for a Sprint Review based on a one-month Sprint?', back:'Maximum of 4 hours.', tags:['Scrum', 'PSM1'] },
    { id: 109, cat:'Scrum', front:'What is the timebox for a Sprint Retrospective based on a one-month Sprint?', back:'Maximum of 3 hours.', tags:['Scrum', 'PSM1'] },
    { id: 110, cat:'Scrum', front:'What is the commitment for the Product Backlog?', back:'The Product Goal.', tags:['Scrum', 'PSM1'] },
    { id: 111, cat:'Scrum', front:'What is the commitment for the Sprint Backlog?', back:'The Sprint Goal.', tags:['Scrum', 'PSM1'] },
    { id: 112, cat:'Scrum', front:'What is the commitment for the Increment?', back:'The Definition of Done.', tags:['Scrum', 'PSM1'] },
    { id: 113, cat:'Scrum', front:'Can a Scrum Team have multiple active Product Goals at the same time?', back:'No. They must fulfill or abandon one Product Goal before taking on the next.', tags:['Scrum', 'PSM1'] },
    { id: 114, cat:'Scrum', front:'Who creates the Definition of Done?', back:'If it is not an organizational standard, the Scrum Team must create a Definition of Done appropriate for the product.', tags:['Scrum', 'PSM1'] },
    { id: 115, cat:'Scrum', front:'What are the three pillars of Empiricism?', back:'Transparency, Inspection, and Adaptation.', tags:['Scrum', 'PSM1'] },
    { id: 116, cat:'Scrum', front:'What are the five Scrum Values?', back:'Commitment, Focus, Openness, Respect, Courage.', tags:['Scrum', 'PSM1'] },
    { id: 117, cat:'Scrum', front:'Who is accountable for maximizing the value of the product?', back:'The Product Owner.', tags:['Scrum', 'PSM1'] },
    { id: 118, cat:'Scrum', front:'Who is responsible for all estimates in the Product Backlog?', back:'The Developers. (The PO may influence them by helping them understand and select trade-offs, but the people who will do the work make the final estimate).', tags:['Scrum', 'PSM1'] },
    { id: 119, cat:'Scrum', front:'When is an Increment born?', back:'The moment a Product Backlog item meets the Definition of Done.', tags:['Scrum', 'PSM1'] },
    { id: 120, cat:'Scrum', front:'Who is accountable for instilling quality by adhering to a Definition of Done?', back:'The Developers.', tags:['Scrum', 'PSM1'] },
    { id: 121, cat:'Scrum', front:'What is the purpose of the Daily Scrum?', back:'To inspect progress toward the Sprint Goal and adapt the Sprint Backlog as necessary.', tags:['Scrum', 'PSM1'] },
    { id: 122, cat:'Scrum', front:'What happens between the end of one Sprint and the start of the next?', back:'Nothing. A new Sprint starts immediately after the conclusion of the previous Sprint.', tags:['Scrum', 'PSM1'] },
    { id: 123, cat:'Scrum', front:'Can the Sprint Goal be changed during the Sprint?', back:'No. During the Sprint, no changes are made that would endanger the Sprint Goal.', tags:['Scrum', 'PSM1'] },
    { id: 124, cat:'Scrum', front:'Who is accountable for establishing Scrum as defined in the Scrum Guide?', back:'The Scrum Master.', tags:['Scrum', 'PSM1'] },
    { id: 125, cat:'Scrum', front:'If multiple Scrum Teams are working on the same product, how many Product Backlogs and Product Owners should they have?', back:'One Product Backlog and One Product Owner.', tags:['Scrum', 'PSM1'] },
    { id: 126, cat:'Scrum', front:'What topics are discussed during Sprint Planning?', back:'Topic 1: Why is this Sprint valuable? Topic 2: What can be Done this Sprint? Topic 3: How will the chosen work get done?', tags:['Scrum', 'PSM1'] },
    { id: 127, cat:'Scrum', front:'Does the Scrum Master assign tasks to Developers during the Sprint?', back:'No. The Developers are self-managing and decide who does what, when, and how.', tags:['Scrum', 'PSM1'] },
    { id: 128, cat:'Scrum', front:'When does the Product Backlog refinement happen?', back:'It is an ongoing activity. The Scrum Team decides how and when refinement is done.', tags:['Scrum', 'PSM1'] },
    { id: 129, cat:'Scrum', front:'Is it mandatory for the Scrum Team to release an Increment to production at the end of every Sprint?', back:'No. An Increment must be usable and meet the DoD, but the Product Owner decides when to release it.', tags:['Scrum', 'PSM1'] },
    { id: 130, cat:'Scrum', front:'Who is a "true leader who serves"?', back:'The Scrum Master.', tags:['Scrum', 'PSM1'] },
    { id: 131, cat:'Scrum', front:'What is the recommended size of a Scrum Team?', back:'Small enough to remain nimble and large enough to complete significant work within a Sprint, typically 10 or fewer people.', tags:['Scrum', 'PSM1'] },
    { id: 132, cat:'Scrum', front:'Who comprises the Scrum Team?', back:'One Scrum Master, one Product Owner, and Developers.', tags:['Scrum', 'PSM1'] },
    { id: 133, cat:'Scrum', front:'True or False: The Scrum Master must be a technical expert in the product being built.', back:'False. Their expertise is in the Scrum framework and facilitation, though technical knowledge can be helpful.', tags:['Scrum', 'PSM1'] },
    { id: 134, cat:'Scrum', front:'What is the primary difference between the Sprint Review and the Sprint Retrospective?', back:'Review inspects the PRODUCT (what was built). Retrospective inspects the PROCESS (how it was built).', tags:['Scrum', 'PSM1'] },
    { id: 135, cat:'Scrum', front:'If an item in the Sprint Backlog cannot be finished, who must be informed?', back:'The Product Owner, so scope can be clarified and renegotiated without endangering the Sprint Goal.', tags:['Scrum', 'PSM1'] },
    { id: 136, cat:'Scrum', front:'Who manages the Sprint Backlog?', back:'Only the Developers.', tags:['Scrum', 'PSM1'] },
    { id: 137, cat:'Scrum', front:'What gives life to the three pillars of empiricism?', back:'The five Scrum Values.', tags:['Scrum', 'PSM1'] },
    { id: 138, cat:'Scrum', front:'Is there a "Sprint 0" in Scrum?', back:'No. Sprints begin with Sprint 1 and an Increment must be attempted.', tags:['Scrum', 'PSM1'] },
    { id: 139, cat:'Scrum', front:'True or False: A Scrum Team is cross-functional.', back:'True. The team members have all the skills necessary to create value each Sprint.', tags:['Scrum', 'PSM1'] },
    { id: 140, cat:'Scrum', front:'Can the Product Owner order the Product Backlog based on risk or dependencies?', back:'Yes. They can order it however they deem most appropriate to maximize value.', tags:['Scrum', 'PSM1'] }
];

DATA.flashcards.push(...psmFlashcards);

const output = 'const DATA = ' + JSON.stringify(DATA, null, 4) + ';';
fs.writeFileSync('data.js', output, 'utf8');

console.log('Successfully injected 5 Scrum Modules and 40 PSM 1 Flashcards into data.js');
