> Status Sep 28, 2026: BUILT with changes (JSON export, Qwen3.8-27B, fixed 20:00 slot, reaction answers). See MEMORY.MD 'Study coach'.

# Mammoth Academy + FamilyOS: The "Study Nudge" Gameplan

## The Goal
To defeat inertia and "lazy downtime" by bringing the study material directly to you, rather than waiting for you to open the Mammoth Academy web app. We will use your existing local AI (FamilyOS running on Proxmox) as a "Micro Manager" that ambushes you with bite-sized questions in Discord, lowering the friction to start studying to near zero.

## 🏗️ Phase 1: The Content Bridge
First, FamilyOS needs to be able to read the Mammoth Academy course material.
*   **The Script:** We will build a new Python module in `FamilyOS/` (e.g., `mammoth_bridge.py`).
*   **The Data:** This script will securely access `C:\Users\Nate\Desktop\Code\Mammoth\MammothAcademy\www\courses\` (since both reside on your local network/machine).
*   **The Parser:** It will parse the raw JavaScript course files (`aws-saa-c03.js`, etc.) and extract the flashcards and exam questions into a format the LLM can easily read.

## 🤖 Phase 2: The Discord Ambush (Modifying FamilyOS)
We will augment `discord_micromanager.py` with a new proactive pipeline.
*   **The Trigger:** We will tie this into the existing `orchestrator_heartbeat` loop. We can configure a "Study Nudge" schedule (e.g., if there are no calendar events, and it is a weekend or evening, roll a 20% chance to drop a study nudge).
*   **The Ping:** `Qwen3-8B` will randomly select a flashcard or exam question from the active course via the content bridge.
*   **The Delivery:** It will ping you in Discord using its established persona: *"Hey man, I know you're relaxing, but let's do one quick rep. What's the main difference between an ALB and an NLB?"*

## 🧠 Phase 3: The Interactive Grading
When you reply in Discord, the LLM needs to handle it intelligently.
*   **Command Parsing:** We will add a new `study_answer` intent to the Pipeline C command parser.
*   **The Evaluation:** FamilyOS will compare your Discord reply against the correct answer from the course material.
*   **The Feedback:** It will reply natively in Discord. If you are right, it praises you. If you are wrong, it provides the correct technical explanation and logs that you struggled with that topic (using the existing `family_rag.sqlite` database).

## 🏆 Phase 4: Unifying the XP System (Optional but Recommended)
To make your Discord victories count toward your Mammoth Academy rank (Intern -> Principal Architect).
*   **The Challenge:** Mammoth Academy is a 100% offline PWA using `localStorage`. FamilyOS cannot write to your browser's local storage remotely.
*   **The Solution:** We can spin up a tiny, local SQLite + PHP/Python endpoint inside the Mammoth Academy project folder (or on the Proxmox server). 
*   **The Flow:** When you answer correctly in Discord, FamilyOS pings this local API to add +10 XP. When you eventually open the Mammoth Academy web app, it fetches from this API and syncs the new XP to your browser, triggering the visual level-up confetti.

---

### Next Steps
If this gameplan looks solid, hit **Proceed** or let me know, and I will begin executing **Phase 1** and **Phase 2** by modifying `discord_micromanager.py`.
