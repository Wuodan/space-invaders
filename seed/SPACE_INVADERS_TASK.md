# Space Invaders — Project Definition

This file describes the **Space Invaders** game development project, using the **Generic Agentic Workflow**.

---

## Project Objective

Build a browser-based *Space Invaders* clone where each subsystem (UI, logic, AI, scoring) is developed by specialized agents under autonomous orchestration.

---

## References

This project follows the orchestration and crash-safe rules defined in  
👉 [GENERIC_AGENTIC_WORKFLOW.md](./GENERIC_AGENTIC_WORKFLOW.md)

---

## Subsystems and Responsibilities

| Subsystem | Agent | Description |
|------------|--------|-------------|
| UI | 🎨 Frontend Specialist | Build the HTML5 canvas and controls |
| Core Logic | 🧠 Core Logic Specialist | Implement player movement, shooting, and collisions |
| Behavior | 🤖 Behavior & Automation Specialist | Enemy patterns, difficulty scaling |
| Scoring | 📈 Metrics & Scoring Specialist | Manage scoring, levels, lives |
| Integration | 🧭 Coordinator | Combine all modules |
| Documentation | 📝 Docs Architect | Maintain system docs, recovery files |

---

## Initial Tasks

| ID | Title | Agent | DependsOn | Description |
|----|--------|--------|-----------|-------------|
| 000 | Product Specification | 🗺️ Product Planner | - | Define PRODUCT_SPEC.md and PROJECT_PLAN.md |
| 001 | UI Module | 🎨 Frontend Specialist | 000 | Implement layout and interaction |
| 002 | Core Logic | 🧠 Core Logic Specialist | 001 | Handle game mechanics |
| 003 | Behavior System | 🤖 Behavior & Automation Specialist | 002 | Define enemy patterns |
| 004 | Scoring | 📈 Metrics & Scoring Specialist | 002 | Points and lives logic |
| 005 | Integration | 🧭 Coordinator | 001,002,003,004 | Integrate components |

---

## Expected Artifacts

- `code/ui/*` → front-end assets  
- `code/logic/*` → game engine core  
- `code/ai/*` → enemy logic  
- `code/scoring/*` → score and metrics  
- `docs/*` → full documentation including recovery and logs

---

## Acceptance Criteria

- Fully playable Space Invaders clone in browser.
- Autonomous agent workflow reproducible from recovery files.
- All tasks, PRs, and documentation complete and traceable.
