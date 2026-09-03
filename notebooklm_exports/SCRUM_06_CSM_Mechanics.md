[SYSTEM NOTE FOR AUDIO OVERVIEW HOSTS]
You are acting as the official audio teachers for "Mammoth Academy", an elite tech and sales certification training platform.
TARGET AUDIENCE: A professional studying to master Professional Scrum Master (PSM 1 / CSM Certification) and pass the real certification exam.
TONE: Witty, punchy, real-world, and slightly edgy. Do NOT sound like a dry textbook or a corporate HR video. Sound like a highly competent senior engineer or sales director mentoring a junior over coffee.
ANALOGIES TO USE: The source text uses specific recurring anchors — "Mammoth Capital" (a high-stakes FinTech trading firm), Proxmox homelabs, pfSense routers, algorithmic trading, and real-world system failures. Lean heavily into these analogies when explaining concepts.
ACCURACY: Treat every fact, number, port, percentage, and step order in the source below as fixed and correct — this is real certification exam content. Explain and riff on *why* things work, but never alter, round, invent, or "simplify away" a specific technical detail.
[END SYSTEM NOTE]

# Professional Scrum Master — Module 6: CSM Mechanics

## The Agile Manifesto

While the Scrum Guide provides the rules of the framework, the **Agile Manifesto** provides the philosophical foundation. It was written in 2001 by 17 software developers who wanted an alternative to documentation-driven, heavyweight software development processes.

**The 4 Values of the Agile Manifesto:**

- **Individuals and interactions** over processes and tools

- **Working software** over comprehensive documentation

- **Customer collaboration** over contract negotiation

- **Responding to change** over following a plan

**Exam Tip (CSM):** Notice the word "over". The things on the right still have value, but the things on the left are valued *more*. If an exam question says "Agile means no documentation," it is false.

---

## User Stories & Acceptance Criteria

The Scrum Guide mentions "Product Backlog items" but doesn't dictate how they should be written. In practice, most teams use **User Stories**.

A User Story follows the format: *"As a [user type], I want to [action] so that [benefit]."* This format ensures the team focuses on the **value** delivered to the user rather than technical implementation details.

**Acceptance Criteria** are the conditions that a software product must satisfy to be accepted by a user, customer, or other stakeholder. They define the boundaries of a user story and are used to confirm when a story is completed.

**⚓ Anchor:** A User Story is like a restaurant order ("As a customer, I want a steak so that I am no longer hungry"). The Acceptance Criteria are the details ("Medium rare, with a side of fries, served hot").

---

## Relative Estimation & Planning Poker

Humans are notoriously bad at estimating exactly how many hours a complex task will take. Agile teams overcome this using **Relative Estimation** (estimating the size of an item relative to another item) rather than absolute estimation (hours).

The most common technique is using **Story Points** and the Fibonacci sequence (1, 2, 3, 5, 8, 13...). A 5-point story is roughly five times bigger or more complex than a 1-point story.

**Planning Poker** is a consensus-based technique for estimating. All Developers reveal their estimates simultaneously. If there's a large discrepancy (e.g., someone says 2, another says 13), those team members discuss their reasoning until consensus is reached.

**Exam Tip (CSM):** Story points measure effort, complexity, and risk, *not* time. Only the people doing the work (the Developers) provide estimates.

---

## Velocity & Burn-down Charts

**Velocity** is the amount of work (usually measured in Story Points) that a Developers complete during a Sprint. By averaging the velocity of the last few Sprints, the Product Owner can forecast how much work the team can likely complete in future Sprints.

A **Sprint Burn-down Chart** tracks the remaining work in the Sprint Backlog across the days of the Sprint. It helps the Developers visualize if they are on track to meet the Sprint Goal.

**⚓ Anchor:** Velocity is your car's MPG. You use it to predict how far you can go on a tank of gas. But you wouldn't tell a team to "increase their MPG" by driving faster; velocity is an observation, not a target.
