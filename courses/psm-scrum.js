/* Mammoth Academy — Course Pack */
/* Auto-loaded by course-loader.js */

const COURSE_PSM_SCRUM = {
  "meta": {
    "id": "psm-scrum",
    "name": "Professional Scrum Master",
    "subtitle": "PSM 1 / CSM Certification",
    "icon": "🏃",
    "color": "#8b5cf6",
    "examKey": "psm",
    "version": "1.0.0"
  },
  "modules": [
    {
      "id": 19,
      "title": "Scrum Foundations & Values",
      "icon": "&#9878;",
      "topics": [
        {
          "title": "Empiricism: The 3 Pillars",
          "tags": [
            "Scrum",
            "Theory",
            "PSM1"
          ],
          "prose": "\n<p>Scrum is not a methodology; it is a lightweight framework based on empiricism and lean thinking. Empiricism asserts that knowledge comes from experience and making decisions based on what is observed. The 2020 Scrum Guide defines three critical pillars that uphold every empirical process:</p>\n<p><strong>1. Transparency:</strong> The emergent process and work must be visible to those performing the work and those receiving the work. Without transparency, inspection is misleading.</p>\n<p><strong>2. Inspection:</strong> Scrum artifacts and progress toward agreed goals must be inspected frequently and diligently to detect potentially undesirable variances.</p>\n<p><strong>3. Adaptation:</strong> If any aspects of a process deviate outside acceptable limits or if the resulting product is unacceptable, the process or the material being processed must be adjusted immediately.</p>\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> Empiricism is navigating a ship by looking at the stars (Inspection), updating the map (Transparency), and turning the wheel (Adaptation). Traditional waterfall is drawing a line on a map before leaving port and refusing to look out the window for the entire journey.</div>\n<div class=\"lesson-alert\"><strong>Exam Tip (PSM 1):</strong> The exam will test if you understand that Inspection without Adaptation is considered pointless in Scrum. Adaptation must happen <em>as soon as possible</em> to minimize further deviation.</div>\n",
          "quiz": [
            {
              "q": "In Scrum, empiricism asserts that knowledge comes from:",
              "opts": [
                "Detailed upfront planning",
                "Experience and making decisions based on what is observed",
                "The Scrum Master's expertise",
                "Following the Scrum Guide perfectly"
              ],
              "ans": 1,
              "exp": "Empiricism (the foundation of Scrum) asserts that knowledge comes from experience and making decisions based on what is observed. The three pillars are inspection, adaptation, and transparency."
            },
            {
              "q": "Which of the following is NOT one of the three pillars of empirical process control in Scrum?",
              "opts": [
                "Transparency",
                "Inspection",
                "Adaptation",
                "Predictability"
              ],
              "ans": 3,
              "exp": "The three pillars are Transparency, Inspection, and Adaptation. While Scrum aims to improve predictability, it is not a foundational pillar itself."
            },
            {
              "q": "Scrum is best described as a:",
              "opts": [
                "Methodology",
                "Framework",
                "Process",
                "Standard"
              ],
              "ans": 1,
              "exp": "Scrum is a lightweight framework that helps people, teams and organizations generate value through adaptive solutions for complex problems. It is not a rigid methodology or process."
            }
          ]
        },
        {
          "title": "The 5 Scrum Values",
          "tags": [
            "Scrum",
            "Values",
            "PSM1"
          ],
          "prose": "\n<p>The successful use of Scrum depends on people becoming more proficient in living five core values. Without these, the three pillars of empiricism crumble.</p>\n<p><strong>1. Commitment:</strong> To achieving the goals of the Scrum Team and supporting each other.</p>\n<p><strong>2. Focus:</strong> On the work of the Sprint and making the best possible progress toward these goals.</p>\n<p><strong>3. Openness:</strong> About the work and the challenges.</p>\n<p><strong>4. Respect:</strong> For each other to be capable, independent people.</p>\n<p><strong>5. Courage:</strong> To do the right thing and work on tough problems.</p>\n<div class=\"lesson-alert\"><strong>Exam Tip (PSM 1):</strong> The Scrum Values give direction to the Scrum Team with regard to their work, actions, and behavior. The exam might ask what gives life to the empirical pillars: the answer is the Scrum Values.</div>\n"
        }
      ],
      "related": [
        19,
        20
      ]
    },
    {
      "id": 20,
      "title": "Scrum Accountabilities",
      "icon": "&#128101;",
      "topics": [
        {
          "title": "The Scrum Master",
          "tags": [
            "Scrum",
            "ScrumMaster",
            "CSM"
          ],
          "prose": "\n<p>The Scrum Master is accountable for establishing Scrum as defined in the Scrum Guide. They do this by helping everyone understand Scrum theory and practice. The 2020 Guide made a crucial language update: the Scrum Master is no longer a \"servant-leader\", but a <strong>\"true leader who serves\"</strong> the Scrum Team and the larger organization.</p>\n<p><strong>Accountabilities:</strong></p>\n<p>- Coaching the team members in self-management and cross-functionality.<br>- Helping the Scrum Team focus on creating high-value Increments that meet the Definition of Done.<br>- Causing the removal of impediments to the Scrum Team’s progress.<br>- Ensuring that all Scrum events take place and are positive, productive, and kept within the timebox.</p>\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> The Scrum Master is the team's mechanic. They don't drive the car (that's the Developers) and they don't pick the destination (that's the Product Owner). They ensure the engine is running perfectly, remove debris from the road, and make sure everyone is following the rules of the road.</div>\n",
          "quiz": [
            {
              "q": "Who is responsible for maximizing the value of the product resulting from the work of the Scrum Team?",
              "opts": [
                "The Scrum Master",
                "The Developers",
                "The Product Owner",
                "The Stakeholders"
              ],
              "ans": 2,
              "exp": "The Product Owner is accountable for maximizing the value of the product resulting from the work of the Scrum Team, primarily by managing the Product Backlog."
            },
            {
              "q": "What is the primary responsibility of the Scrum Master?",
              "opts": [
                "Managing the Developers",
                "Assigning tasks to the team",
                "Establishing Scrum as defined in the Scrum Guide and coaching the team",
                "Updating the project plan"
              ],
              "ans": 2,
              "exp": "The Scrum Master is accountable for establishing Scrum as defined in the Scrum Guide. They do this by helping everyone understand Scrum theory and practice, acting as a true leader who serves the Scrum Team."
            },
            {
              "q": "Who is responsible for creating the Sprint Backlog?",
              "opts": [
                "The Product Owner",
                "The Scrum Master",
                "The Developers",
                "The entire Scrum Team"
              ],
              "ans": 2,
              "exp": "The Developers are always accountable for creating a plan for the Sprint (the Sprint Backlog), instilling quality, and adapting their plan each day toward the Sprint Goal."
            }
          ]
        },
        {
          "title": "The Product Owner",
          "tags": [
            "Scrum",
            "ProductOwner",
            "PSM1"
          ],
          "prose": "\n<p>The Product Owner (PO) is accountable for maximizing the value of the product resulting from the work of the Scrum Team. How this is done varies widely across organizations.</p>\n<p><strong>Crucial PSM 1 Facts:</strong><br>- The PO is <strong>one person</strong>, not a committee. They may represent the needs of a committee, but those wanting to change the Product Backlog can do so only by trying to convince the PO.<br>- They are solely accountable for effective Product Backlog management (creating items, ordering items, ensuring it is transparent).<br>- Only the Product Owner has the authority to <strong>cancel a Sprint</strong>.</p>\n<div class=\"lesson-alert\"><strong>Exam Tip (PSM 1):</strong> If an exam question asks \"Who can cancel a Sprint—\", the answer is ALWAYS the Product Owner. If it asks \"Who is responsible for the Product Goal—\", it is the Product Owner. Never choose \"Management\" or \"The Scrum Master\".</div>\n"
        },
        {
          "title": "The Developers",
          "tags": [
            "Scrum",
            "Developers",
            "PSM1"
          ],
          "prose": "\n<p>Developers are the people in the Scrum Team that are committed to creating any aspect of a usable Increment each Sprint. Note the 2020 update: the term \"Development Team\" was removed. It is now just \"Developers\" as an accountability within the cohesive Scrum Team to reduce \"us vs. them\" silos.</p>\n<p><strong>Accountabilities:</strong><br>- Creating a plan for the Sprint (the Sprint Backlog).<br>- Instilling quality by adhering to a Definition of Done.<br>- Adapting their plan each day toward the Sprint Goal.<br>- Holding each other accountable as professionals.</p>\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> \"Developer\" in Scrum doesn't just mean a software engineer. If you are building an ad campaign, the copywriter and designer are the \"Developers.\" They are the ones doing the actual work of the Sprint.</div>\n"
        }
      ],
      "related": [
        18,
        21
      ]
    },
    {
      "id": 21,
      "title": "Scrum Events",
      "icon": "&#9201;",
      "topics": [
        {
          "title": "The Sprint",
          "tags": [
            "Scrum",
            "Events",
            "PSM1"
          ],
          "prose": "\n<p>Sprints are the heartbeat of Scrum. They are fixed length events of one month or less. <strong>A new Sprint starts immediately after the conclusion of the previous Sprint.</strong> There are no \"Phase 1\" or \"Integration\" sprints in Scrum.</p>\n<p>During the Sprint:<br>- No changes are made that would endanger the Sprint Goal.<br>- Quality does not decrease.<br>- The Product Backlog is refined as needed.<br>- Scope may be clarified and renegotiated with the Product Owner as more is learned.</p>\n<div class=\"lesson-alert\"><strong>Exam Tip (PSM 1):</strong> Sprints are containers for all other events. An exam trap is asking if you can extend a Sprint to finish work. The answer is NEVER. A Sprint is a strict timebox. If the work isn't done, it goes back to the Product Backlog.</div>\n",
          "quiz": [
            {
              "q": "What is the timebox for a Daily Scrum?",
              "opts": [
                "15 minutes",
                "30 minutes",
                "1 hour",
                "Timeboxed to 15 minutes for a one-month Sprint"
              ],
              "ans": 0,
              "exp": "The Daily Scrum is a 15-minute event for the Developers of the Scrum Team, regardless of the Sprint length."
            },
            {
              "q": "What is the purpose of the Sprint Review?",
              "opts": [
                "To demo the product to the Product Owner for approval",
                "To inspect the outcome of the Sprint and determine future adaptations",
                "To review the team's performance and process",
                "To update the release schedule"
              ],
              "ans": 1,
              "exp": "The purpose of the Sprint Review is to inspect the outcome of the Sprint and determine future adaptations. The Scrum Team presents the results of their work to key stakeholders and progress toward the Product Goal is discussed."
            },
            {
              "q": "When does a Sprint end?",
              "opts": [
                "When all Sprint Backlog items are completed",
                "When the Sprint Retrospective concludes",
                "When the timebox expires",
                "When the Product Owner accepts the increment"
              ],
              "ans": 2,
              "exp": "Sprints are fixed length events of one month or less. A new Sprint starts immediately after the conclusion of the previous Sprint (which ends when its timebox expires)."
            }
          ]
        },
        {
          "title": "Sprint Planning",
          "tags": [
            "Scrum",
            "Events",
            "PSM1"
          ],
          "prose": "\n<p>Sprint Planning initiates the Sprint. It is timeboxed to a maximum of <strong>8 hours for a one-month Sprint</strong>. The 2020 Scrum Guide defines three topics that must be addressed during this event:</p>\n<p><strong>Topic 1: Why is this Sprint valuable—</strong> The PO proposes how the product could increase its value. The whole team collaborates to define a <em>Sprint Goal</em>.<br><strong>Topic 2: What can be Done this Sprint—</strong> The Developers select items from the Product Backlog to include in the current Sprint.<br><strong>Topic 3: How will the chosen work get done—</strong> The Developers decompose the selected items into an actionable plan (usually 1-day tasks).</p>\n<div class=\"lesson-alert\"><strong>Exam Tip (PSM 1):</strong> Only the Developers can decide how many items they pull into a Sprint. The PO cannot force them to take more work than they believe they can complete.</div>\n"
        },
        {
          "title": "Daily Scrum",
          "tags": [
            "Scrum",
            "Events",
            "PSM1"
          ],
          "prose": "\n<p>The purpose of the Daily Scrum is to inspect progress toward the Sprint Goal and adapt the Sprint Backlog as necessary. It is a <strong>15-minute event for the Developers</strong>. If the PO or Scrum Master are actively working on items in the Sprint Backlog, they participate as Developers.</p>\n<p>The Scrum Master ensures the meeting happens, but the Developers are responsible for conducting it. It is not a status meeting for management; it is a planning meeting for the Developers.</p>\n<div class=\"lesson-alert\"><strong>Exam Tip (PSM 1):</strong> The Daily Scrum does not require the classic \"Three Questions\" (What did I do yesterday, what will I do today, what are my blockers). The 2020 Guide removed this mandate. Developers can structure it however they want, as long as it focuses on progress toward the Sprint Goal.</div>\n"
        },
        {
          "title": "Sprint Review & Retrospective",
          "tags": [
            "Scrum",
            "Events",
            "PSM1"
          ],
          "prose": "\n<p><strong>Sprint Review:</strong> Purpose is to inspect the outcome of the Sprint and determine future adaptations. The Scrum Team presents the results of their work to key stakeholders and progress toward the Product Goal is discussed. Timeboxed to 4 hours for a one-month Sprint. It is a working session, not just a presentation.</p>\n<p><strong>Sprint Retrospective:</strong> Purpose is to plan ways to increase quality and effectiveness. The Scrum Team inspects how the last Sprint went with regards to individuals, interactions, processes, tools, and their Definition of Done. Timeboxed to 3 hours for a one-month Sprint. It concludes the Sprint.</p>\n"
        }
      ],
      "related": [
        19,
        21
      ]
    },
    {
      "id": 22,
      "title": "Artifacts & Commitments",
      "icon": "&#128194;",
      "topics": [
        {
          "title": "Product Backlog & Product Goal",
          "tags": [
            "Scrum",
            "Artifacts",
            "PSM1"
          ],
          "prose": "\n<p>Each Scrum artifact contains a commitment. For the Product Backlog, the commitment is the <strong>Product Goal</strong>.</p>\n<p>The Product Backlog is an emergent, ordered list of what is needed to improve the product. It is the single source of work undertaken by the Scrum Team. The Product Goal describes a future state of the product which can serve as a target for the Scrum Team to plan against. The Product Goal is in the Product Backlog. The rest of the Product Backlog emerges to define \"what\" will fulfill the Product Goal.</p>\n<div class=\"lesson-alert\"><strong>Exam Tip (PSM 1):</strong> A Scrum Team must fulfill (or abandon) one Product Goal before taking on the next. They cannot have multiple active Product Goals.</div>\n",
          "quiz": [
            {
              "q": "What is the commitment for the Product Backlog?",
              "opts": [
                "The Definition of Done",
                "The Sprint Goal",
                "The Product Goal",
                "The Release Plan"
              ],
              "ans": 2,
              "exp": "Each artifact contains a commitment. For the Product Backlog, the commitment is the Product Goal."
            },
            {
              "q": "What is the commitment for the Sprint Backlog?",
              "opts": [
                "The Definition of Done",
                "The Sprint Goal",
                "The Product Goal",
                "The Daily Plan"
              ],
              "ans": 1,
              "exp": "The commitment for the Sprint Backlog is the Sprint Goal, which provides a single objective for the Sprint."
            },
            {
              "q": "Which artifact represents a concrete stepping stone toward the Product Goal?",
              "opts": [
                "The Sprint Backlog",
                "The Increment",
                "The Definition of Done",
                "The Product Backlog"
              ],
              "ans": 1,
              "exp": "An Increment is a concrete stepping stone toward the Product Goal. Each Increment is additive to all prior Increments and thoroughly verified."
            }
          ]
        },
        {
          "title": "Sprint Backlog & Sprint Goal",
          "tags": [
            "Scrum",
            "Artifacts",
            "PSM1"
          ],
          "prose": "\n<p>For the Sprint Backlog, the commitment is the <strong>Sprint Goal</strong>.</p>\n<p>The Sprint Backlog is composed of the Sprint Goal (why), the set of Product Backlog items selected for the Sprint (what), and an actionable plan for delivering the Increment (how). The Sprint Backlog is a plan by and for the Developers. It is highly visible, real-time picture of the work that the Developers plan to accomplish during the Sprint.</p>\n"
        },
        {
          "title": "The Increment & Definition of Done",
          "tags": [
            "Scrum",
            "Artifacts",
            "PSM1"
          ],
          "prose": "\n<p>For the Increment, the commitment is the <strong>Definition of Done (DoD)</strong>.</p>\n<p>An Increment is a concrete stepping stone toward the Product Goal. Each Increment is additive to all prior Increments and thoroughly verified, ensuring that all Increments work together. The DoD is a formal description of the state of the Increment when it meets the quality measures required for the product.</p>\n<p>The moment a Product Backlog item meets the Definition of Done, an Increment is born.</p>\n<div class=\"lesson-alert\"><strong>Exam Tip (PSM 1):</strong> If an item does not meet the Definition of Done, it cannot be released and cannot even be presented at the Sprint Review. It returns to the Product Backlog for future consideration. You cannot show \"99% done\" work in the Sprint Review.</div>\n"
        }
      ],
      "related": [
        20,
        22
      ]
    },
    {
      "id": 23,
      "title": "CSM & Practical Facilitation",
      "icon": "&#128221;",
      "topics": [
        {
          "title": "Resolving Conflict & Impediments",
          "tags": [
            "Scrum",
            "Facilitation",
            "CSM"
          ],
          "prose": "\n<p>While the PSM 1 focuses strictly on rules, the CSM emphasizes your role as a facilitator. When the Developers are in conflict over architecture, your job is not to choose the architecture. Your job is to facilitate a structured decision-making process.</p>\n<p><strong>Impediment Removal:</strong> A true Scrum Master doesn't just fix problems; they teach the team to fix their own problems. Only step in to resolve an impediment if the Developers cannot resolve it themselves. If the environment (management, tools, outside teams) is the blocker, that is when the Scrum Master escalates and shields the team.</p>\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> If the team is arguing over React vs. Angular, stay out of the technical weeds. Ask: \"What are our objective criteria for this choice—\" Make them build a matrix. You own the process of deciding, they own the decision.</div>\n",
          "quiz": [
            {
              "q": "When multiple Scrum Teams are working on the same product, how many Product Backlogs should they have?",
              "opts": [
                "One for each team",
                "One consolidated Product Backlog",
                "One for each feature area",
                "It depends on the framework (Nexus vs SAFe)"
              ],
              "ans": 1,
              "exp": "Regardless of the scaling framework, if multiple teams are working on the same product, there is only ONE Product Backlog and ONE Product Owner to ensure a unified vision and prioritization."
            },
            {
              "q": "In the Nexus framework, what is the purpose of the Nexus Integration Team?",
              "opts": [
                "To manage all the Developers",
                "To do the integration work for the teams",
                "To ensure that a 'Done' Integrated Increment is produced at least every Sprint",
                "To act as a project management office (PMO)"
              ],
              "ans": 2,
              "exp": "The Nexus Integration Team is accountable for ensuring that a 'Done' Integrated Increment (the combined work of all Scrum Teams) is produced at least once a Sprint."
            },
            {
              "q": "When scaling Scrum, what is typically the biggest challenge teams face?",
              "opts": [
                "Writing user stories correctly",
                "Managing dependencies and integration",
                "Running the Daily Scrum",
                "Choosing a Jira workflow"
              ],
              "ans": 1,
              "exp": "Managing dependencies between teams and ensuring frequent, successful integration of their code is universally the hardest part of scaling agile development."
            }
          ]
        },
        {
          "title": "Scaling Scrum (Briefly)",
          "tags": [
            "Scrum",
            "Scaling",
            "CSM"
          ],
          "prose": "\n<p>When one product requires more than 10 people, you don't grow the Scrum Team. You create multiple Scrum Teams that share the <strong>same Product Backlog</strong>, the <strong>same Product Owner</strong>, and the <strong>same Product Goal</strong>. Frameworks like Nexus or LeSS manage the integration between these teams.</p>\n"
        }
      ],
      "related": [
        18,
        23
      ]
    },
    {
      "id": 24,
      "title": "CSM Mechanics",
      "icon": "&#128187;",
      "topics": [
        {
          "title": "The Agile Manifesto",
          "tags": [
            "Agile",
            "CSM",
            "Theory"
          ],
          "prose": "\n<p>While the Scrum Guide provides the rules of the framework, the <strong>Agile Manifesto</strong> provides the philosophical foundation. It was written in 2001 by 17 software developers who wanted an alternative to documentation-driven, heavyweight software development processes.</p>\n<p><strong>The 4 Values of the Agile Manifesto:</strong></p>\n<ul>\n<li><strong>Individuals and interactions</strong> over processes and tools</li>\n<li><strong>Working software</strong> over comprehensive documentation</li>\n<li><strong>Customer collaboration</strong> over contract negotiation</li>\n<li><strong>Responding to change</strong> over following a plan</li>\n</ul>\n<div class=\"lesson-alert\"><strong>Exam Tip (CSM):</strong> Notice the word \"over\". The things on the right still have value, but the things on the left are valued <em>more</em>. If an exam question says \"Agile means no documentation,\" it is false.</div>\n",
          "quiz": [
            {
              "q": "Which of the following is a core practice of Kanban but NOT a mandated rule in Scrum?",
              "opts": [
                "Having a Daily meeting",
                "Working in timeboxed Sprints",
                "Limiting Work in Progress (WIP)",
                "Having a Product Owner"
              ],
              "ans": 2,
              "exp": "Kanban relies heavily on explicitly limiting Work in Progress (WIP) to improve flow. Scrum limits WIP implicitly via the Sprint timebox, but does not explicitly require WIP limits on the board."
            },
            {
              "q": "A team using 'Scrumban' typically adopts which Kanban element to improve their Scrum flow?",
              "opts": [
                "Removing the Product Owner role",
                "Abandoning Sprints entirely",
                "Visualizing flow and applying WIP limits to the Sprint Backlog",
                "Stopping all Retrospectives"
              ],
              "ans": 2,
              "exp": "Scrumban teams keep the Scrum framework (roles, events, artifacts) but apply Kanban practices like visualizing the workflow states (beyond just To Do, Doing, Done) and applying WIP limits to columns."
            },
            {
              "q": "In Kanban, what does lead time measure?",
              "opts": [
                "The time it takes to write a user story",
                "The time from when a request is made until it is delivered to the customer",
                "The time it takes a developer to code a feature once started",
                "The length of the Sprint"
              ],
              "ans": 1,
              "exp": "Lead time is a key Kanban metric measuring the total time from the customer request to delivery. Cycle time measures the time work is actively being worked on."
            }
          ]
        },
        {
          "title": "User Stories & Acceptance Criteria",
          "tags": [
            "Agile",
            "CSM",
            "Requirements"
          ],
          "prose": "\n<p>The Scrum Guide mentions \"Product Backlog items\" but doesn't dictate how they should be written. In practice, most teams use <strong>User Stories</strong>.</p>\n<p>A User Story follows the format: <em>\"As a [user type], I want to [action] so that [benefit].\"</em> This format ensures the team focuses on the <strong>value</strong> delivered to the user rather than technical implementation details.</p>\n<p><strong>Acceptance Criteria</strong> are the conditions that a software product must satisfy to be accepted by a user, customer, or other stakeholder. They define the boundaries of a user story and are used to confirm when a story is completed.</p>\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> A User Story is like a restaurant order (\"As a customer, I want a steak so that I am no longer hungry\"). The Acceptance Criteria are the details (\"Medium rare, with a side of fries, served hot\").</div>\n"
        },
        {
          "title": "Relative Estimation & Planning Poker",
          "tags": [
            "Agile",
            "CSM",
            "Estimation"
          ],
          "prose": "\n<p>Humans are notoriously bad at estimating exactly how many hours a complex task will take. Agile teams overcome this using <strong>Relative Estimation</strong> (estimating the size of an item relative to another item) rather than absolute estimation (hours).</p>\n<p>The most common technique is using <strong>Story Points</strong> and the Fibonacci sequence (1, 2, 3, 5, 8, 13...). A 5-point story is roughly five times bigger or more complex than a 1-point story.</p>\n<p><strong>Planning Poker</strong> is a consensus-based technique for estimating. All Developers reveal their estimates simultaneously. If there's a large discrepancy (e.g., someone says 2, another says 13), those team members discuss their reasoning until consensus is reached.</p>\n<div class=\"lesson-alert\"><strong>Exam Tip (CSM):</strong> Story points measure effort, complexity, and risk, <em>not</em> time. Only the people doing the work (the Developers) provide estimates.</div>\n"
        },
        {
          "title": "Velocity & Burn-down Charts",
          "tags": [
            "Agile",
            "CSM",
            "Metrics"
          ],
          "prose": "\n<p><strong>Velocity</strong> is the amount of work (usually measured in Story Points) that a Developers complete during a Sprint. By averaging the velocity of the last few Sprints, the Product Owner can forecast how much work the team can likely complete in future Sprints.</p>\n<p>A <strong>Sprint Burn-down Chart</strong> tracks the remaining work in the Sprint Backlog across the days of the Sprint. It helps the Developers visualize if they are on track to meet the Sprint Goal.</p>\n<div class=\"lesson-alert\" style=\"border-left-color: var(--accent-warning); background: rgba(245, 158, 11, 0.05);\"><strong>⚓ Anchor:</strong> Velocity is your car's MPG. You use it to predict how far you can go on a tank of gas. But you wouldn't tell a team to \"increase their MPG\" by driving faster; velocity is an observation, not a target.</div>\n"
        }
      ],
      "related": [
        18,
        22
      ]
    }
  ],
  "flashcards": [
    {
      "id": 101,
      "cat": "Scrum",
      "front": "Who has the authority to cancel a Sprint?",
      "back": "Only the Product Owner.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "The Product Owner is the investor who funded the sprint. If market conditions change drastically mid-trade, only the investor can pull the capital — not the traders doing the work."
    },
    {
      "id": 102,
      "cat": "Scrum",
      "front": "Can a Sprint be extended by 2 days if the Developers just need a little more time to finish an item?",
      "back": "No. Sprints are strict timeboxes. Unfinished items return to the Product Backlog.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "A Sprint is a sacred timeboxing contract — like a trading window. When the market closes, it closes. Extending the Sprint would corrupt the empirical cadence Scrum depends on."
    },
    {
      "id": 103,
      "cat": "Scrum",
      "front": "What happens if an item is not \"Done\" by the end of the Sprint?",
      "back": "It cannot be presented at the Sprint Review. It returns to the Product Backlog.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "Undone work returns to the Product Backlog like a trade order that expired — it doesn't auto-carry over. The Product Owner re-evaluates its priority for the next Sprint based on current conditions."
    },
    {
      "id": 104,
      "cat": "Scrum",
      "front": "Who determines how many Product Backlog items are selected for a Sprint?",
      "back": "Only the Developers.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "Developers are the engineers who know how much they can actually build. Letting the PO or SM dictate capacity is like having the investor tell the quant how many models he can backtest — completely backwards."
    },
    {
      "id": 105,
      "cat": "Scrum",
      "front": "What is the timebox for a Sprint Planning event based on a one-month Sprint?",
      "back": "Maximum of 8 hours.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "Sprint Planning's 8-hour cap enforces discipline — not every detail can be planned upfront. Scrum bets on adaptation over exhaustive upfront planning. Overly long planning sessions signal waterfall thinking."
    },
    {
      "id": 106,
      "cat": "Scrum",
      "front": "What is the timebox for a Daily Scrum?",
      "back": "15 minutes for any length of Sprint.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "15 minutes is the Daily Scrum's enforced discipline — it's a sync, not a strategy session. Like a market open briefing: what's the position, what's the risk, what's blocking the trade."
    },
    {
      "id": 107,
      "cat": "Scrum",
      "front": "Who must attend the Daily Scrum?",
      "back": "The Developers. (PO and Scrum Master only attend if they are actively working on Sprint Backlog items).",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "The Daily Scrum belongs to the Developers — the people doing the work. The Scrum Master and Product Owner are welcome but not required unless they're also contributing to the Sprint Goal."
    },
    {
      "id": 108,
      "cat": "Scrum",
      "front": "What is the timebox for a Sprint Review based on a one-month Sprint?",
      "back": "Maximum of 4 hours.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "Sprint Review gets 4 hours for a one-month Sprint. It's the investor presentation at the end of a fund cycle — show what was built, get feedback, adjust the roadmap based on reality."
    },
    {
      "id": 109,
      "cat": "Scrum",
      "front": "What is the timebox for a Sprint Retrospective based on a one-month Sprint?",
      "back": "Maximum of 3 hours.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "The Retrospective (3 hrs/month) is the post-trade analysis — what worked, what didn't, what process change would improve the next Sprint's returns. Teams who skip it repeat the same mistakes."
    },
    {
      "id": 110,
      "cat": "Scrum",
      "front": "What is the commitment for the Product Backlog?",
      "back": "The Product Goal.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "The Product Goal is the product's north star — like a fund's investment thesis. Every item in the backlog should trace back to it. It focuses the team on what actually matters."
    },
    {
      "id": 111,
      "cat": "Scrum",
      "front": "What is the commitment for the Sprint Backlog?",
      "back": "The Sprint Goal.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "The Sprint Goal is the tactical objective for this Sprint — like targeting a specific sector for the quarter. It gives the Developers latitude to adapt HOW they achieve it while keeping the outcome fixed."
    },
    {
      "id": 112,
      "cat": "Scrum",
      "front": "What is the commitment for the Increment?",
      "back": "The Definition of Done.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "The Definition of Done is the quality floor — the minimum bar an Increment must clear before it can be shipped. Like a trade that must clear compliance review before it executes."
    },
    {
      "id": 113,
      "cat": "Scrum",
      "front": "Can a Scrum Team have multiple active Product Goals at the same time?",
      "back": "No. They must fulfill or abandon one Product Goal before taking on the next.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "No — multiple Product Goals simultaneously would be like a fund trying to execute two conflicting investment theses at once. Focus is the entire point of the Product Goal commitment."
    },
    {
      "id": 114,
      "cat": "Scrum",
      "front": "Who creates the Definition of Done?",
      "back": "If it is not an organizational standard, the Scrum Team must create a Definition of Done appropriate for the product.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "If no org-wide standard exists, the Scrum Team defines their own DoD. It's their quality contract with themselves — and with the stakeholders who rely on 'Done' meaning something real."
    },
    {
      "id": 115,
      "cat": "Scrum",
      "front": "What are the three pillars of Empiricism?",
      "back": "Transparency, Inspection, and Adaptation.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "Transparency + Inspection + Adaptation = the scientific method applied to product development. You can't inspect what's hidden; you can't adapt if you don't inspect. All three must exist together."
    },
    {
      "id": 116,
      "cat": "Scrum",
      "front": "What are the five Scrum Values?",
      "back": "Commitment, Focus, Openness, Respect, Courage.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "Commitment, Focus, Openness, Respect, Courage — the team culture that makes empiricism safe. Without courage to surface bad news, transparency breaks down. Without respect, no one speaks up."
    },
    {
      "id": 117,
      "cat": "Scrum",
      "front": "Who is accountable for maximizing the value of the product?",
      "back": "The Product Owner.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "The Product Owner is the fund manager — maximizing ROI on the development investment. They order the backlog by value, not by stakeholder politics."
    },
    {
      "id": 118,
      "cat": "Scrum",
      "front": "Who is responsible for all estimates in the Product Backlog?",
      "back": "The Developers. (The PO may influence them by helping them understand and select trade-offs, but the people who will do the work make the final estimate).",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "Developers own estimates because they're the ones doing the work. PO setting estimates without developer input would be like a CFO estimating engineering effort — a recipe for missed deadlines."
    },
    {
      "id": 119,
      "cat": "Scrum",
      "front": "When is an Increment born?",
      "back": "The moment a Product Backlog item meets the Definition of Done.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "An Increment is born the moment any Product Backlog item meets the Definition of Done — even mid-Sprint. Increments can be delivered to users at any time; the Sprint Review is just a formal inspection moment."
    },
    {
      "id": 120,
      "cat": "Scrum",
      "front": "Who is accountable for instilling quality by adhering to a Definition of Done?",
      "back": "The Developers.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "Developers own quality — not QA, not the SM. Scrum has no QA team by design. The Definition of Done is the quality gate that every Developer is accountable to."
    },
    {
      "id": 121,
      "cat": "Scrum",
      "front": "What is the purpose of the Daily Scrum?",
      "back": "To inspect progress toward the Sprint Goal and adapt the Sprint Backlog as necessary.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "The Daily Scrum is a 15-minute tactical huddle to inspect progress toward the Sprint Goal and adapt the plan. It is NOT a status meeting for the Scrum Master or PO — it's the Developers' planning tool."
    },
    {
      "id": 122,
      "cat": "Scrum",
      "front": "What happens between the end of one Sprint and the start of the next?",
      "back": "Nothing. A new Sprint starts immediately after the conclusion of the previous Sprint.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "Nothing happens between Sprints — a new Sprint starts immediately on the day the previous one ends. There's no 'Sprint 0' or buffer period. The cadence is continuous and relentless."
    },
    {
      "id": 123,
      "cat": "Scrum",
      "front": "Can the Sprint Goal be changed during the Sprint?",
      "back": "No. During the Sprint, no changes are made that would endanger the Sprint Goal.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "The Sprint Goal is sacred during the Sprint. Changing it would negate the point of the timebox. If the Sprint Goal becomes obsolete, only the Product Owner can cancel the Sprint."
    },
    {
      "id": 124,
      "cat": "Scrum",
      "front": "Who is accountable for establishing Scrum as defined in the Scrum Guide?",
      "back": "The Scrum Master.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "The Scrum Master is accountable for Scrum being understood and enacted correctly — they're the process guardian, not the project manager. Their job is to remove the obstacles that prevent the team from being effective."
    },
    {
      "id": 125,
      "cat": "Scrum",
      "front": "If multiple Scrum Teams are working on the same product, how many Product Backlogs and Product Owners should they have?",
      "back": "One Product Backlog and One Product Owner.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "One Product Backlog, one Product Owner, one Product Goal for multiple teams — like multiple trading desks within one fund all working the same strategy. Each team selects from the same ordered list of priorities."
    },
    {
      "id": 126,
      "cat": "Scrum",
      "front": "What topics are discussed during Sprint Planning?",
      "back": "Topic 1: Why is this Sprint valuable? Topic 2: What can be Done this Sprint? Topic 3: How will the chosen work get done?",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "Sprint Planning covers: Why (the Sprint Goal), What (selected PBIs), and How (the plan). Teams that skip 'Why' often build the right features for the wrong reason."
    },
    {
      "id": 127,
      "cat": "Scrum",
      "front": "Does the Scrum Master assign tasks to Developers during the Sprint?",
      "back": "No. The Developers are self-managing and decide who does what, when, and how.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "Scrum Masters don't assign work — Developers self-organize and pull tasks. A SM who assigns work has become a project manager, which undermines the team's ownership and accountability."
    },
    {
      "id": 128,
      "cat": "Scrum",
      "front": "When does the Product Backlog refinement happen?",
      "back": "It is an ongoing activity. The Scrum Team decides how and when refinement is done.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "Refinement is ongoing throughout the Sprint — it's not a single meeting. Think of it as continuous pre-trade research: the team is always sharpening the next set of opportunities."
    },
    {
      "id": 129,
      "cat": "Scrum",
      "front": "Is it mandatory for the Scrum Team to release an Increment to production at the end of every Sprint?",
      "back": "No. An Increment must be usable and meet the DoD, but the Product Owner decides when to release it.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "Releasing is a business decision (PO), not a Scrum requirement. Scrum only requires that the Increment meets DoD and is potentially releasable. Whether to ship is separate from whether it's Done."
    },
    {
      "id": 130,
      "cat": "Scrum",
      "front": "Who is a \"true leader who serves\"—",
      "back": "The Scrum Master.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "The Scrum Master is a servant-leader — they lead by removing friction, not by directing work. They serve the team, the PO, and the organization by making Scrum effective."
    },
    {
      "id": 131,
      "cat": "Scrum",
      "front": "What is the recommended size of a Scrum Team?",
      "back": "Small enough to remain nimble and large enough to complete significant work within a Sprint, typically 10 or fewer people.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "10 or fewer is the magic number — small enough to communicate without a meeting, large enough to get real work done. Larger teams create coordination overhead that kills velocity."
    },
    {
      "id": 132,
      "cat": "Scrum",
      "front": "Who comprises the Scrum Team?",
      "back": "One Scrum Master, one Product Owner, and Developers.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "Scrum Team = Developers + Product Owner + Scrum Master. No 'QA team', no 'architects', no 'project managers' — Scrum deliberately collapses those silos into one accountable unit."
    },
    {
      "id": 133,
      "cat": "Scrum",
      "front": "True or False: The Scrum Master must be a technical expert in the product being built.",
      "back": "False. Their expertise is in the Scrum framework and facilitation, though technical knowledge can be helpful.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "False. The Scrum Master masters the Scrum process, not the technology. They help the team remove process obstacles, not debug code. A great SM can serve a hardware team as well as a software team."
    },
    {
      "id": 134,
      "cat": "Scrum",
      "front": "What is the primary difference between the Sprint Review and the Sprint Retrospective?",
      "back": "Review inspects the PRODUCT (what was built). Retrospective inspects the PROCESS (how it was built).",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "Sprint Review = inspect the product with stakeholders (external focus). Sprint Retrospective = inspect the process with the team (internal focus). One faces outward, one faces inward."
    },
    {
      "id": 135,
      "cat": "Scrum",
      "front": "If an item in the Sprint Backlog cannot be finished, who must be informed?",
      "back": "The Product Owner, so scope can be clarified and renegotiated without endangering the Sprint Goal.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "Developers own this conversation. They must immediately raise it in the Daily Scrum so the team can adapt — drop scope, renegotiate with PO, or swarm the item. No surprises at the end of the Sprint."
    },
    {
      "id": 136,
      "cat": "Scrum",
      "front": "Who manages the Sprint Backlog?",
      "back": "Only the Developers.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "Developers own and manage the Sprint Backlog. It's their tactical plan, not the SM's task list. The PO can clarify but cannot direct how items are ordered within the Sprint."
    },
    {
      "id": 137,
      "cat": "Scrum",
      "front": "What gives life to the three pillars of empiricism?",
      "back": "The five Scrum Values.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "The five Scrum Values (Commitment, Focus, Openness, Respect, Courage) create the team culture that makes transparency, inspection, and adaptation real. Values without pillars are platitudes; pillars without values are empty process."
    },
    {
      "id": 138,
      "cat": "Scrum",
      "front": "Is there a \"Sprint 0\" in Scrum?",
      "back": "No. Sprints begin with Sprint 1 and an Increment must be attempted.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "Sprint 0 is a waterfall concept smuggled into Scrum disguise — like calling your pre-trade research session a 'Trade 0'. Scrum starts with Sprint 1. If setup is needed, it's work — put it in the backlog and timebox it like any other Sprint."
    },
    {
      "id": 139,
      "cat": "Scrum",
      "front": "True or False: A Scrum Team is cross-functional.",
      "back": "True. The team members have all the skills necessary to create value each Sprint.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "True. The Scrum Team must collectively have all the skills needed to create a potentially releasable Increment every Sprint — no external dependencies on a 'DBA team' or 'network team' to get work Done."
    },
    {
      "id": 140,
      "cat": "Scrum",
      "front": "Can the Product Owner order the Product Backlog based on risk or dependencies?",
      "back": "Yes. They can order it however they deem most appropriate to maximize value.",
      "tags": [
        "Scrum",
        "PSM1"
      ],
      "analogy": "Yes. The PO has complete authority over Product Backlog ordering — by value, risk, learning, dependencies, or any other factor. They are the sole authority on what the team works on next."
    }
  ],
  "exam": [
    {
      "q": "Who has the authority to cancel a Sprint?",
      "opts": [
        "The Scrum Master, if there are too many impediments.",
        "The Developers, if they cannot meet the Sprint Goal.",
        "The Product Owner, if the Sprint Goal becomes obsolete.",
        "Any member of the Scrum Team."
      ],
      "ans": 2,
      "explanation": "Only the Product Owner has the authority to cancel the Sprint, although they may do so under influence from the stakeholders, the Developers, or the Scrum Master."
    },
    {
      "q": "What is the timebox for a Sprint Planning event based on a one-month Sprint?",
      "opts": [
        "4 hours",
        "8 hours",
        "Timeboxed based on how much work is in the Product Backlog",
        "Until all developers agree on the plan"
      ],
      "ans": 1,
      "explanation": "Sprint Planning is timeboxed to a maximum of eight hours for a one-month Sprint. For shorter Sprints, the event is usually shorter."
    },
    {
      "q": "Which of the following is NOT an official Scrum Artifact?",
      "opts": [
        "Product Backlog",
        "Sprint Goal",
        "Sprint Backlog",
        "Increment"
      ],
      "ans": 1,
      "explanation": "The three artifacts are the Product Backlog, Sprint Backlog, and Increment. The Sprint Goal is a *commitment* contained within the Sprint Backlog, not a standalone artifact."
    },
    {
      "q": "Who creates the Definition of Done?",
      "opts": [
        "The Scrum Master, to ensure quality.",
        "The Product Owner, based on stakeholder requirements.",
        "If it is not an organizational standard, the Scrum Team must create a Definition of Done appropriate for the product.",
        "The Developers, because they do the work."
      ],
      "ans": 2,
      "explanation": "If the Definition of Done for an increment is part of the standards of the organization, all Scrum Teams must follow it as a minimum. If it is not an organizational standard, the Scrum Team must create a Definition of Done appropriate for the product."
    },
    {
      "q": "What happens if an item in the Sprint Backlog cannot be finished by the end of the Sprint?",
      "opts": [
        "The Sprint is extended to allow the Developers to finish the work.",
        "It is presented at the Sprint Review as a 'work in progress'.",
        "It is moved to the next Sprint automatically.",
        "It returns to the Product Backlog."
      ],
      "ans": 3,
      "explanation": "If a Product Backlog item does not meet the Definition of Done, it cannot be released or even presented at the Sprint Review. It returns to the Product Backlog for future consideration."
    },
    {
      "q": "During a Sprint, a stakeholder approaches a Developer and asks them to add an urgent, small feature. What should the Developer do?",
      "opts": [
        "Add it to the Sprint Backlog and work on it, as Scrum requires agility.",
        "Tell the stakeholder to talk to the Product Owner.",
        "Ask the Scrum Master to block the stakeholder from talking to them.",
        "Complete the work but don't mention it in the Daily Scrum to avoid distracting the team."
      ],
      "ans": 1,
      "explanation": "Those wanting to change the Product Backlog can do so only by trying to convince the Product Owner. The Product Owner is accountable for maximizing the value of the product."
    },
    {
      "q": "What is the primary difference between the Sprint Review and the Sprint Retrospective?",
      "opts": [
        "The Review inspects the process; the Retrospective inspects the product.",
        "The Review inspects the product; the Retrospective inspects the process (individuals, interactions, tools).",
        "The Review is for management; the Retrospective is for the Scrum Team.",
        "There is no difference; they are two names for the same event."
      ],
      "ans": 1,
      "explanation": "The Sprint Review is to inspect the outcome of the Sprint (the Increment) and determine future adaptations. The Sprint Retrospective is to plan ways to increase quality and effectiveness (process)."
    },
    {
      "q": "How many Product Owners should there be for a product being built by three separate Scrum Teams?",
      "opts": [
        "Three Product Owners, one for each team.",
        "One Product Owner, but they can delegate their responsibilities to a Chief Product Owner.",
        "One Product Owner.",
        "As many as the teams need to ensure fast decision making."
      ],
      "ans": 2,
      "explanation": "One Product, One Product Backlog, One Product Owner. This remains true regardless of the number of Scrum Teams working on the product."
    },
    {
      "q": "Which Scrum Value is demonstrated when a Developer admits they made a mistake that caused the build to fail?",
      "opts": [
        "Commitment",
        "Focus",
        "Openness",
        "Respect"
      ],
      "ans": 2,
      "explanation": "Openness: The Scrum Team and its stakeholders agree to be open about all the work and the challenges with performing the work."
    },
    {
      "q": "Who determines how work gets done during the Sprint?",
      "opts": [
        "The Scrum Master",
        "The Product Owner",
        "The Project Manager",
        "The Developers"
      ],
      "ans": 3,
      "explanation": "The Developers are always accountable for creating a plan for the Sprint, the Sprint Backlog. How they turn Product Backlog items into an Increment of value is solely up to them."
    },
    {
      "q": "What is the main reason for the Scrum Master to be at the Daily Scrum?",
      "opts": [
        "To gather status and progress information.",
        "To write down any changes to the Sprint Backlog.",
        "They do not have to be there; they only need to ensure the Developers have the event.",
        "To make sure every team member answers the three questions."
      ],
      "ans": 2,
      "explanation": "The Scrum Master enforces the rule that only Developers participate in the Daily Scrum. They do not have to attend unless they are actively working on items in the Sprint Backlog."
    },
    {
      "q": "When many Scrum Teams are working on a single product, what should best describe the Definition of Done?",
      "opts": [
        "Each Scrum Team must have a separate Definition of Done.",
        "All Scrum Teams must have a mutually defining Definition of Done that makes their combined work potentially releasable.",
        "It depends on the architecture.",
        "The Scrum Masters define it."
      ],
      "ans": 1,
      "explanation": "If there are multiple Scrum Teams working together on a product, they must mutually define and comply with the same Definition of Done."
    },
    {
      "q": "Which of the following is true regarding the Product Backlog?",
      "opts": [
        "It is managed by the Scrum Master.",
        "It is never complete.",
        "It only contains bugs and technical debt.",
        "It is finalized before the first Sprint."
      ],
      "ans": 1,
      "explanation": "The Product Backlog is never complete. The earliest development of it lays out the initially known and best-understood requirements, but it evolves as the product and the environment in which it will be used evolves."
    },
    {
      "q": "Who is responsible for managing the progress of work during a Sprint?",
      "opts": [
        "The Product Owner",
        "The Scrum Master",
        "The Developers",
        "The Project Manager"
      ],
      "ans": 2,
      "explanation": "The Developers are always accountable for creating a plan for the Sprint (Sprint Backlog), instilling quality, and adapting their plan each day toward the Sprint Goal."
    },
    {
      "q": "A Scrum Team is working on a 4-week Sprint. How long should their Sprint Review be?",
      "opts": [
        "1 hour",
        "2 hours",
        "4 hours maximum",
        "As long as it takes to show all the work"
      ],
      "ans": 2,
      "explanation": "The Sprint Review is timeboxed to a maximum of four hours for a one-month Sprint. For shorter Sprints, the event is usually shorter."
    },
    {
      "q": "What is the result of the Sprint Review?",
      "opts": [
        "A revised Product Backlog that defines the probable Product Backlog items for the next Sprint.",
        "A PowerPoint presentation for stakeholders.",
        "A finalized design for the next Sprint.",
        "A new Sprint Goal."
      ],
      "ans": 0,
      "explanation": "The Sprint Review includes a discussion of what to do next, so the Product Backlog may also be adjusted to meet new opportunities. The result of the Sprint Review is a revised Product Backlog."
    },
    {
      "q": "True or False: The Scrum Master can order the Product Backlog if the Product Owner is too busy.",
      "opts": [
        "True",
        "False"
      ],
      "ans": 1,
      "explanation": "False. The Product Owner may delegate the work of managing the Product Backlog, but they remain accountable. The Scrum Master cannot arbitrarily take over this accountability."
    },
    {
      "q": "When can a Sprint be cancelled?",
      "opts": [
        "When the Developers feel they cannot finish the work.",
        "When the Scrum Master identifies too many impediments.",
        "If the Sprint Goal becomes obsolete.",
        "A Sprint can never be cancelled."
      ],
      "ans": 2,
      "explanation": "A Sprint could be cancelled if the Sprint Goal becomes obsolete. Only the Product Owner has the authority to cancel the Sprint."
    },
    {
      "q": "Which two things does the Scrum framework use to optimize predictability and control risk?",
      "opts": [
        "Agile mindset and lean thinking",
        "Transparency and detailed planning",
        "Empiricism and iterative, incremental development",
        "Story points and velocity"
      ],
      "ans": 2,
      "explanation": "Scrum employs an iterative, incremental approach to optimize predictability and to control risk. It is founded on empiricism and lean thinking."
    },
    {
      "q": "What does it mean for a Scrum Team to be cross-functional?",
      "opts": [
        "Every member of the team must have the same skills.",
        "The team members have all the skills necessary to create value each Sprint.",
        "They can work across different projects simultaneously.",
        "They speak multiple languages."
      ],
      "ans": 1,
      "explanation": "Cross-functional teams have all competencies needed to accomplish the work without depending on others not part of the team."
    },
    {
      "q": "During Sprint Planning, the Developers realize they have taken on too much work. What should they do?",
      "opts": [
        "Work overtime to finish everything.",
        "Collaborate with the Product Owner to remove or change items.",
        "Extend the Sprint duration.",
        "Cancel the Sprint."
      ],
      "ans": 1,
      "explanation": "If the Developers determine they have too much or too little work, they may renegotiate the selected Product Backlog items with the Product Owner."
    },
    {
      "q": "What is the primary way a Scrum Master keeps a Developers working at its highest level of productivity?",
      "opts": [
        "By ensuring the meetings start and end at the proper time.",
        "By facilitating Developer decisions and removing impediments.",
        "By keeping track of task hours.",
        "By managing the team's velocity."
      ],
      "ans": 1,
      "explanation": "The Scrum Master serves the Scrum Team in several ways, including causing the removal of impediments to the Scrum Team's progress and coaching the team members in self-management and cross-functionality."
    },
    {
      "q": "Who is responsible for engaging the stakeholders?",
      "opts": [
        "The Developers",
        "The Product Owner",
        "The Scrum Master",
        "The Project Manager"
      ],
      "ans": 1,
      "explanation": "The Product Owner is accountable for maximizing the value of the product, which includes representing the desires of the stakeholders to the Scrum Team."
    },
    {
      "q": "Which statement best describes the Sprint Backlog as an artifact?",
      "opts": [
        "It is the Product Owner's plan for the Sprint.",
        "It is a highly visible, real-time picture of the work that the Developers plan to accomplish during the Sprint.",
        "It is a list of tasks that must be completed.",
        "It is a fixed commitment that cannot change."
      ],
      "ans": 1,
      "explanation": "The Sprint Backlog is a plan by and for the Developers. It is a highly visible, real-time picture of the work that the Developers plan to accomplish during the Sprint in order to achieve the Sprint Goal."
    },
    {
      "q": "When must the Definition of Done be created?",
      "opts": [
        "Before the first Sprint begins.",
        "During the first Sprint Planning.",
        "Before an Increment can be considered Done.",
        "By the end of the first Sprint."
      ],
      "ans": 2,
      "explanation": "If it is not an organizational standard, the Scrum Team must create a Definition of Done appropriate for the product before any Increment can be considered Done."
    },
    {
      "q": "True or False: The Scrum Team must choose at least one high priority process improvement item from the Sprint Retrospective and place it in the Sprint Backlog for the next Sprint.",
      "opts": [
        "True",
        "False"
      ],
      "ans": 1,
      "explanation": "False. This was a rule in the 2017 Scrum Guide, but it was removed in the 2020 Scrum Guide to make the framework less prescriptive. It is a good practice, but not mandatory."
    },
    {
      "q": "What is the purpose of a Sprint?",
      "opts": [
        "To release a new feature to customers.",
        "To produce a Done Increment that meets the Sprint Goal.",
        "To complete all items in the Sprint Backlog.",
        "To update the burn-down chart."
      ],
      "ans": 1,
      "explanation": "The heart of Scrum is a Sprint, a timebox of one month or less during which a \"Done\", useable, and potentially releasable product Increment is created."
    },
    {
      "q": "Who is accountable for the creation of the Definition of Done?",
      "opts": [
        "The Scrum Master",
        "The Product Owner",
        "The Developers",
        "The Scrum Team (or the Organization)"
      ],
      "ans": 3,
      "explanation": "If the Definition of Done for an increment is part of the standards of the organization, all Scrum Teams must follow it. If it is not an organizational standard, the Scrum Team must create a Definition of Done appropriate for the product."
    },
    {
      "q": "Which of the following is an accountability of the Scrum Master?",
      "opts": [
        "Ordering the Product Backlog.",
        "Helping the Scrum Team understand the need for clear and concise Product Backlog items.",
        "Assigning tasks to Developers.",
        "Estimating the effort of Product Backlog items."
      ],
      "ans": 1,
      "explanation": "The Scrum Master serves the Product Owner by helping find techniques for effective Product Goal definition and Product Backlog management, and helping the Scrum Team understand the need for clear and concise Product Backlog items."
    },
    {
      "q": "When is the Sprint Retrospective held?",
      "opts": [
        "Before Sprint Planning.",
        "After the Sprint Review and prior to the next Sprint Planning.",
        "In the middle of the Sprint.",
        "Whenever the team feels they need to improve."
      ],
      "ans": 1,
      "explanation": "The Sprint Retrospective concludes the Sprint. It is held after the Sprint Review and prior to the next Sprint Planning."
    },
    {
      "q": "What does the Scrum Master do if the Developers do not have all the skills necessary to complete the Sprint Backlog?",
      "opts": [
        "Cancel the Sprint.",
        "Do the missing work themselves.",
        "Facilitate the team in finding a solution (e.g., learning, bringing in an expert temporarily).",
        "Tell the Product Owner to remove the items."
      ],
      "ans": 2,
      "explanation": "The Scrum Master is a coach and facilitator. They help the team self-manage to solve their own problems, such as skill gaps."
    },
    {
      "q": "How much time should the Scrum Team allocate to Product Backlog refinement?",
      "opts": [
        "10% of the Sprint.",
        "20% of the Sprint.",
        "As much time as is needed.",
        "It must only happen during Sprint Planning."
      ],
      "ans": 2,
      "explanation": "The 2017 Guide suggested 10%, but the 2020 Guide removed this. Refinement is an ongoing activity to add details, such as a description, order, and size. The Scrum Team decides how and when refinement is done."
    },
    {
      "q": "Which Scrum Value is demonstrated by a Developer asking for help when they are stuck?",
      "opts": [
        "Courage",
        "Focus",
        "Commitment",
        "Openness"
      ],
      "ans": 3,
      "explanation": "Openness. The Scrum Team and its stakeholders agree to be open about all the work and the challenges with performing the work."
    },
    {
      "q": "What is the maximum length of a Sprint?",
      "opts": [
        "2 weeks",
        "30 days",
        "One calendar month",
        "There is no maximum"
      ],
      "ans": 2,
      "explanation": "Sprints are fixed length events of one month or less to create consistency."
    },
    {
      "q": "Who is permitted to change the Sprint Backlog during a Sprint?",
      "opts": [
        "The Product Owner",
        "The Scrum Master",
        "The Developers",
        "Management"
      ],
      "ans": 2,
      "explanation": "The Sprint Backlog is a plan by and for the Developers. Only the Developers can change its contents during a Sprint as they learn more about the work needed to achieve the Sprint Goal."
    },
    {
      "q": "If an organization wants to scale Scrum to 3 teams working on one product, how many Definition of Dones should they have?",
      "opts": [
        "Three",
        "One",
        "None",
        "One per feature"
      ],
      "ans": 1,
      "explanation": "If there are multiple Scrum Teams working together on a product, they must mutually define and comply with the same Definition of Done."
    },
    {
      "q": "Who is responsible for sizing (estimating) Product Backlog items?",
      "opts": [
        "The Scrum Master",
        "The Product Owner",
        "The Developers",
        "The whole Scrum Team"
      ],
      "ans": 2,
      "explanation": "The Developers who will be doing the work are responsible for the sizing. The Product Owner may influence the Developers by helping them understand and select trade-offs."
    },
    {
      "q": "Which event provides an opportunity to inspect the Increment and adapt the Product Backlog?",
      "opts": [
        "Sprint Planning",
        "Daily Scrum",
        "Sprint Review",
        "Sprint Retrospective"
      ],
      "ans": 2,
      "explanation": "The purpose of the Sprint Review is to inspect the outcome of the Sprint and determine future adaptations. The Scrum Team presents the results of their work to key stakeholders."
    },
    {
      "q": "What is the role of Management in Scrum?",
      "opts": [
        "To assign tasks to Developers.",
        "To support the Product Owner with insights and information into high value product and system capabilities, and to support the Scrum Master in causing organizational change.",
        "To run the Daily Scrum.",
        "Management has no role in Scrum."
      ],
      "ans": 1,
      "explanation": "Management supports the Scrum Team by providing resources, strategic direction, and helping remove organizational impediments."
    },
    {
      "q": "What does the Agile Manifesto say about 'Responding to change'—",
      "opts": [
        "Responding to change over following a plan.",
        "Responding to change over comprehensive documentation.",
        "Responding to change over contract negotiation.",
        "Responding to change over individuals and interactions."
      ],
      "ans": 0,
      "explanation": "The Agile Manifesto values 'Responding to change over following a plan'."
    }
  ],
  "daily": [
    {
      "day": 14,
      "track": "scrum",
      "concept": "The Sprint",
      "domain": "Scrum Events",
      "icon": "🏃",
      "color": "#8b5cf6",
      "tagline": "The heartbeat of Scrum",
      "slides": [
        {
          "title": "What Is It?",
          "body": "The Sprint is a fixed-length event of one month or less where a team builds a consistent, usable Increment. It is the container for all other Scrum events. Sprints run consecutively—the next one starts immediately after the previous one finishes.",
          "anchor": "Core definition, punchy, 3-4 sentences"
        },
        {
          "title": "How It Works",
          "body": "During the Sprint, no changes are made that would endanger the Sprint Goal. Quality doesn't decrease, and the Product Backlog gets refined as needed. The scope can be clarified and renegotiated with the Product Owner as more is learned.",
          "anchor": "Mechanics, real-world example"
        },
        {
          "title": "Real World",
          "body": "At Mammoth Capital, the algo team runs 2-week Sprints. They lock in a Sprint Goal to optimize trade execution latency. Mid-Sprint, the CEO asks for a new reporting dashboard. Because the Sprint is immutable, the PO pushes the request to the Product Backlog for the next Sprint.",
          "anchor": "Mammoth Capital / FinTech Scrum team angle"
        }
      ],
      "quiz": [
        {
          "q": "What happens if a Sprint Goal becomes obsolete mid-Sprint?",
          "opts": [
            "The Developers drop the goal and pick a new one",
            "The Product Owner cancels the Sprint",
            "The Scrum Master pauses the Sprint",
            "The team ignores the goal and finishes the tasks"
          ],
          "ans": 1,
          "exp": "Only the Product Owner has the authority to cancel a Sprint, and this typically happens only if the Sprint Goal becomes obsolete."
        },
        {
          "q": "Who has the authority to cancel a Sprint?",
          "opts": [
            "The Developers",
            "The Scrum Master",
            "The Product Owner",
            "The Stakeholders"
          ],
          "ans": 2,
          "exp": "Only the Product Owner has the authority to cancel a Sprint."
        },
        {
          "q": "During a Sprint, what is true about quality?",
          "opts": [
            "Quality can decrease to meet the Sprint Goal",
            "Quality decreases only if approved by the PO",
            "Quality does not decrease",
            "Quality is managed by the QA team"
          ],
          "ans": 2,
          "exp": "According to the Scrum Guide, during a Sprint, quality does not decrease."
        },
        {
          "q": "When does a new Sprint start?",
          "opts": [
            "Every Monday",
            "Immediately after the conclusion of the previous Sprint",
            "When the Product Owner approves the Backlog",
            "After the Sprint Planning event"
          ],
          "ans": 1,
          "exp": "A new Sprint starts immediately after the conclusion of the previous Sprint."
        },
        {
          "q": "What is the maximum recommended length of a Sprint?",
          "opts": [
            "One week",
            "Two weeks",
            "One month",
            "Three months"
          ],
          "ans": 2,
          "exp": "Sprints are fixed length events of one month or less to create consistency."
        }
      ]
    },
    {
      "day": 15,
      "track": "scrum",
      "concept": "Sprint Planning",
      "domain": "Scrum Events",
      "icon": "🎯",
      "color": "#8b5cf6",
      "tagline": "Setting the stage for execution",
      "slides": [
        {
          "title": "What Is It?",
          "body": "Sprint Planning initiates the Sprint by laying out the work to be performed. The entire Scrum Team collaborates to define the Sprint Goal, select items from the Product Backlog, and create a plan for delivering them.",
          "anchor": "Core definition, punchy, 3-4 sentences"
        },
        {
          "title": "How It Works",
          "body": "The team answers three questions: Why is this Sprint valuable? (Sprint Goal). What can be Done this Sprint? (Selecting PBIs). How will the chosen work get done? (Creating actionable tasks).",
          "anchor": "Mechanics, real-world example"
        },
        {
          "title": "Real World",
          "body": "Mammoth's DevOps team pulls the highest priority item: migrating the risk engine to AWS Fargate. They agree on a Sprint Goal to reduce operational overhead. The Developers break the migration into small, manageable daily tasks.",
          "anchor": "Mammoth Capital / FinTech Scrum team angle"
        }
      ],
      "quiz": [
        {
          "q": "Who defines the Sprint Goal during Sprint Planning?",
          "opts": [
            "The Product Owner",
            "The Scrum Master",
            "The Developers",
            "The entire Scrum Team"
          ],
          "ans": 3,
          "exp": "The entire Scrum Team collaboratively defines the Sprint Goal."
        },
        {
          "q": "Who decides how much work can be accomplished in a Sprint?",
          "opts": [
            "The Product Owner",
            "The Scrum Master",
            "The Developers",
            "Management"
          ],
          "ans": 2,
          "exp": "Only the Developers can assess what they can accomplish over the upcoming Sprint."
        },
        {
          "q": "What is the timebox for Sprint Planning based on a one-month Sprint?",
          "opts": [
            "2 hours",
            "4 hours",
            "8 hours",
            "12 hours"
          ],
          "ans": 2,
          "exp": "Sprint Planning is timeboxed to a maximum of eight hours for a one-month Sprint."
        },
        {
          "q": "The Sprint Backlog consists of the Sprint Goal, the selected Product Backlog items, and...",
          "opts": [
            "The Definition of Done",
            "An actionable plan for delivering the Increment",
            "The burndown chart",
            "The budget plan"
          ],
          "ans": 1,
          "exp": "The Sprint Backlog includes the Sprint Goal, selected PBIs, and an actionable plan for delivering the Increment."
        },
        {
          "q": "Can Sprint Planning be skipped if the team knows what to do?",
          "opts": [
            "Yes, if velocity is stable",
            "Yes, if the PO agrees",
            "No, it is a required Scrum event",
            "No, unless the Scrum Master cancels it"
          ],
          "ans": 2,
          "exp": "Sprint Planning is a required event in Scrum that initiates every Sprint."
        }
      ]
    },
    {
      "day": 16,
      "track": "scrum",
      "concept": "Daily Scrum",
      "domain": "Scrum Events",
      "icon": "☕",
      "color": "#8b5cf6",
      "tagline": "Sync, inspect, adapt",
      "slides": [
        {
          "title": "What Is It?",
          "body": "A 15-minute daily event for the Developers to inspect progress toward the Sprint Goal and adapt the Sprint Backlog as necessary, adjusting the upcoming planned work.",
          "anchor": "Core definition, punchy, 3-4 sentences"
        },
        {
          "title": "How It Works",
          "body": "Held at the same time and place every working day. The Developers select whatever structure and techniques they want, as long as it focuses on progress toward the Sprint Goal.",
          "anchor": "Mechanics, real-world example"
        },
        {
          "title": "Real World",
          "body": "At 9 AM, Mammoth's data engineering team huddles. Dev A says they hit a snag with the DynamoDB schema. Dev B offers to pair program after the Daily Scrum. They adapt their plan to ensure the data pipeline feature still hits the Sprint Goal.",
          "anchor": "Mammoth Capital / FinTech Scrum team angle"
        }
      ],
      "quiz": [
        {
          "q": "Who is required to attend the Daily Scrum?",
          "opts": [
            "The Scrum Master",
            "The Product Owner",
            "The Developers",
            "The entire Scrum Team"
          ],
          "ans": 2,
          "exp": "The Daily Scrum is a 15-minute event for the Developers of the Scrum Team."
        },
        {
          "q": "What is the primary focus of the Daily Scrum?",
          "opts": [
            "Updating Jira tickets",
            "Reporting status to the Scrum Master",
            "Inspecting progress toward the Sprint Goal and adapting the plan",
            "Discussing detailed technical solutions"
          ],
          "ans": 2,
          "exp": "The purpose is to inspect progress toward the Sprint Goal and adapt the Sprint Backlog as necessary."
        },
        {
          "q": "If the Product Owner is actively working on items in the Sprint Backlog, do they attend the Daily Scrum?",
          "opts": [
            "No, it is only for Developers",
            "Yes, they participate as a Developer",
            "Yes, but only to listen",
            "Yes, to manage the Developers"
          ],
          "ans": 1,
          "exp": "If the Product Owner or Scrum Master are actively working on items in the Sprint Backlog, they participate as Developers."
        },
        {
          "q": "Why is the Daily Scrum held at the same time and place every day?",
          "opts": [
            "To ensure the Scrum Master can track attendance",
            "To reduce complexity",
            "Because the Scrum Guide mandates specific locations",
            "To fit management schedules"
          ],
          "ans": 1,
          "exp": "It is held at the same time and place every working day of the Sprint to reduce complexity."
        },
        {
          "q": "When are detailed discussions or problem-solving meetings typically held?",
          "opts": [
            "During the Daily Scrum",
            "Immediately after the Daily Scrum",
            "During Sprint Planning",
            "During the Sprint Retrospective"
          ],
          "ans": 1,
          "exp": "The Daily Scrum focuses on the plan. Detailed discussions, adaptations, or replanning often happen immediately after."
        }
      ]
    },
    {
      "day": 17,
      "track": "scrum",
      "concept": "Sprint Review",
      "domain": "Scrum Events",
      "icon": "🎉",
      "color": "#8b5cf6",
      "tagline": "Show the value, get feedback",
      "slides": [
        {
          "title": "What Is It?",
          "body": "The Sprint Review is held at the end of the Sprint to inspect the outcome and determine future adaptations. The Scrum Team presents the results of their work to key stakeholders.",
          "anchor": "Core definition, punchy, 3-4 sentences"
        },
        {
          "title": "How It Works",
          "body": "It's a working session, not a formal presentation. The team discusses what was accomplished (the Increment), what challenges they faced, and what to do next based on market changes or stakeholder feedback.",
          "anchor": "Mechanics, real-world example"
        },
        {
          "title": "Real World",
          "body": "Mammoth's web team demos the new institutional trading portal to the VP of Sales. The VP loves the real-time pricing but asks for a darker color scheme. The PO adds this feedback to the Product Backlog.",
          "anchor": "Mammoth Capital / FinTech Scrum team angle"
        }
      ],
      "quiz": [
        {
          "q": "Who should be invited to the Sprint Review?",
          "opts": [
            "Only the Scrum Team",
            "The Scrum Team and key stakeholders invited by the Product Owner",
            "Everyone in the company",
            "Only management"
          ],
          "ans": 1,
          "exp": "The Scrum Team presents the results of their work to key stakeholders, usually invited by the Product Owner."
        },
        {
          "q": "What is the primary purpose of the Sprint Review?",
          "opts": [
            "To get the Product Owner's approval on the work",
            "To demonstrate the software to get a sign-off",
            "To inspect the outcome of the Sprint and determine future adaptations",
            "To review the team's internal processes"
          ],
          "ans": 2,
          "exp": "The purpose is to inspect the outcome of the Sprint and determine future adaptations."
        },
        {
          "q": "Is the Sprint Review primarily a presentation or a working session?",
          "opts": [
            "A formal presentation",
            "A working session",
            "A status report meeting",
            "A technical code review"
          ],
          "ans": 1,
          "exp": "The Scrum Guide emphasizes that the Sprint Review is a working session, not just a presentation."
        },
        {
          "q": "What might change as a result of the Sprint Review?",
          "opts": [
            "The Definition of Done",
            "The Sprint Goal",
            "The Product Backlog",
            "The Scrum Master"
          ],
          "ans": 2,
          "exp": "Based on the discussion and feedback, the Product Backlog may be adjusted to meet new opportunities."
        },
        {
          "q": "What is the timebox for a Sprint Review for a one-month Sprint?",
          "opts": [
            "2 hours",
            "4 hours",
            "6 hours",
            "8 hours"
          ],
          "ans": 1,
          "exp": "The Sprint Review is timeboxed to a maximum of four hours for a one-month Sprint."
        }
      ]
    },
    {
      "day": 18,
      "track": "scrum",
      "concept": "Sprint Retrospective",
      "domain": "Scrum Events",
      "icon": "🔄",
      "color": "#8b5cf6",
      "tagline": "Inspect and adapt the team process",
      "slides": [
        {
          "title": "What Is It?",
          "body": "The Sprint Retrospective concludes the Sprint. It is an opportunity for the Scrum Team to inspect itself and plan improvements to increase quality and effectiveness for the next Sprint.",
          "anchor": "Core definition, punchy, 3-4 sentences"
        },
        {
          "title": "How It Works",
          "body": "The team discusses what went well, what problems it encountered, and how those problems were (or were not) solved. They identify the most helpful changes to improve their effectiveness.",
          "anchor": "Mechanics, real-world example"
        },
        {
          "title": "Real World",
          "body": "Mammoth's infrastructure team notes that their AWS deployments failed three times due to manual configuration errors. They decide to mandate Terraform for all future deployments. This action item goes into the next Sprint Backlog.",
          "anchor": "Mammoth Capital / FinTech Scrum team angle"
        }
      ],
      "quiz": [
        {
          "q": "When does the Sprint Retrospective occur?",
          "opts": [
            "Before the Sprint Review",
            "After the Sprint Review and prior to the next Sprint Planning",
            "In the middle of the Sprint",
            "Only when the team encounters a problem"
          ],
          "ans": 1,
          "exp": "It occurs after the Sprint Review and prior to the next Sprint Planning."
        },
        {
          "q": "Who participates in the Sprint Retrospective?",
          "opts": [
            "Only the Developers",
            "The Developers and Scrum Master",
            "The entire Scrum Team",
            "The Scrum Team and Stakeholders"
          ],
          "ans": 2,
          "exp": "The entire Scrum Team (Developers, Product Owner, Scrum Master) participates."
        },
        {
          "q": "What is the primary focus of the Sprint Retrospective?",
          "opts": [
            "The product increment",
            "The team's interactions, processes, and tools",
            "The Product Backlog",
            "The budget"
          ],
          "ans": 1,
          "exp": "The team inspects how the last Sprint went with regards to individuals, interactions, processes, tools, and their Definition of Done."
        },
        {
          "q": "What should the Scrum Team do with actionable improvements identified in the Retrospective?",
          "opts": [
            "Email them to management",
            "Address them as soon as possible, potentially adding them to the next Sprint Backlog",
            "Wait until the next quarter to implement",
            "Ignore them if they impact velocity"
          ],
          "ans": 1,
          "exp": "The most impactful improvements are addressed as soon as possible and may even be added to the Sprint Backlog for the next Sprint."
        },
        {
          "q": "What is the timebox for the Sprint Retrospective for a one-month Sprint?",
          "opts": [
            "1 hour",
            "2 hours",
            "3 hours",
            "4 hours"
          ],
          "ans": 2,
          "exp": "The Sprint Retrospective is timeboxed to a maximum of three hours for a one-month Sprint."
        }
      ]
    },
    {
      "day": 19,
      "track": "scrum",
      "concept": "The Product Backlog",
      "domain": "Scrum Artifacts",
      "icon": "📋",
      "color": "#8b5cf6",
      "tagline": "The single source of work",
      "slides": [
        {
          "title": "What Is It?",
          "body": "An emergent, ordered list of what is needed to improve the product. It is the single source of work undertaken by the Scrum Team.",
          "anchor": "Core definition, punchy, 3-4 sentences"
        },
        {
          "title": "How It Works",
          "body": "The Product Owner is accountable for the backlog, ensuring it's visible, transparent, and clearly understood. Items at the top are more detailed and smaller; items at the bottom are larger and less defined.",
          "anchor": "Mechanics, real-world example"
        },
        {
          "title": "Real World",
          "body": "Mammoth's PO orders the backlog for the trading app. 'Add biometric login' is at the top, fully refined and ready for the next Sprint. 'Integrate with obscure crypto exchange' is at the bottom, just a vague idea.",
          "anchor": "Mammoth Capital / FinTech Scrum team angle"
        }
      ],
      "quiz": [
        {
          "q": "Who is accountable for the Product Backlog?",
          "opts": [
            "The Scrum Master",
            "The Developers",
            "The Product Owner",
            "The Stakeholders"
          ],
          "ans": 2,
          "exp": "The Product Owner is accountable for effective Product Backlog management."
        },
        {
          "q": "What does it mean that the Product Backlog is 'emergent'?",
          "opts": [
            "It is created once at the beginning of the project",
            "It constantly changes as more is learned about the product and environment",
            "It only contains bugs and technical debt",
            "It must be approved by management every Sprint"
          ],
          "ans": 1,
          "exp": "The Product Backlog is never complete; it evolves as the product and its environment evolve."
        },
        {
          "q": "What is Product Backlog refinement?",
          "opts": [
            "A formal meeting held once a week",
            "The act of breaking down and further defining Product Backlog items",
            "The process of assigning tasks to Developers",
            "Estimating the entire project budget"
          ],
          "ans": 1,
          "exp": "Product Backlog refinement is the act of breaking down and further defining Product Backlog items into smaller more precise items."
        },
        {
          "q": "Who provides the size estimates for Product Backlog items?",
          "opts": [
            "The Product Owner",
            "The Scrum Master",
            "The Developers",
            "The Agile Coach"
          ],
          "ans": 2,
          "exp": "The Developers who will be doing the work are responsible for the sizing."
        },
        {
          "q": "What is the commitment associated with the Product Backlog?",
          "opts": [
            "The Sprint Goal",
            "The Definition of Done",
            "The Product Goal",
            "The Release Plan"
          ],
          "ans": 2,
          "exp": "The commitment for the Product Backlog is the Product Goal, describing a future state of the product."
        }
      ]
    },
    {
      "day": 20,
      "track": "scrum",
      "concept": "Definition of Done",
      "domain": "Scrum Artifacts",
      "icon": "✅",
      "color": "#8b5cf6",
      "tagline": "The standard for quality",
      "slides": [
        {
          "title": "What Is It?",
          "body": "A formal description of the state of the Increment when it meets the quality measures required for the product. It creates transparency by providing a shared understanding of what work was completed.",
          "anchor": "Core definition, punchy, 3-4 sentences"
        },
        {
          "title": "How It Works",
          "body": "When a Product Backlog item meets the Definition of Done, an Increment is born. If an item doesn't meet the DoD, it cannot be released or even presented at the Sprint Review.",
          "anchor": "Mechanics, real-world example"
        },
        {
          "title": "Real World",
          "body": "Mammoth's DoD mandates 90% unit test coverage, a passed SonarQube scan, and peer review. A developer finishes a new risk model but skips the tests. It is NOT Done, cannot be demoed, and goes back to the backlog.",
          "anchor": "Mammoth Capital / FinTech Scrum team angle"
        }
      ],
      "quiz": [
        {
          "q": "What happens when a Product Backlog item meets the Definition of Done?",
          "opts": [
            "The Sprint ends",
            "An Increment is born",
            "The Product Owner is notified via email",
            "The item is automatically deployed to production"
          ],
          "ans": 1,
          "exp": "The moment a Product Backlog item meets the Definition of Done, an Increment is born."
        },
        {
          "q": "What happens if a Product Backlog item does not meet the Definition of Done by the end of the Sprint?",
          "opts": [
            "It is demonstrated at the Sprint Review for partial credit",
            "It is returned to the Product Backlog for future consideration",
            "The Sprint is extended until it is done",
            "It is deployed anyway if the PO accepts it"
          ],
          "ans": 1,
          "exp": "If a PBI does not meet the Definition of Done, it cannot be released or even presented at the Sprint Review. Instead, it returns to the Product Backlog."
        },
        {
          "q": "If multiple Scrum Teams are working on a single product, what applies regarding the Definition of Done?",
          "opts": [
            "Each team must have a completely different DoD",
            "They must mutually define and comply with the same Definition of Done",
            "The Scrum Master defines the DoD for all teams",
            "The DoD is optional"
          ],
          "ans": 1,
          "exp": "If there are multiple Scrum Teams working together on a product, they must mutually define and comply with the same Definition of Done."
        },
        {
          "q": "Who creates the Definition of Done if it is not an organizational standard?",
          "opts": [
            "The Scrum Master",
            "The Product Owner",
            "The Scrum Team",
            "The QA Team"
          ],
          "ans": 2,
          "exp": "If the Definition of Done for an increment is not an organizational standard, the Scrum Team must create a Definition of Done appropriate for the product."
        },
        {
          "q": "What is the primary purpose of the Definition of Done?",
          "opts": [
            "To track velocity",
            "To create transparency and a shared understanding of what work was completed",
            "To micro-manage the Developers",
            "To replace user story acceptance criteria"
          ],
          "ans": 1,
          "exp": "The DoD creates transparency by providing everyone a shared understanding of what work was completed as part of the Increment."
        }
      ]
    }
  ]
};