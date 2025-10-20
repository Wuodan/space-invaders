# Agentic Project Bootstrap Guide

This repository contains the structure for automated AI development projects.

---

## Starting a New Project

1. Copy `GENERIC_AGENTIC_WORKFLOW.md` into your `/seed` directory.
2. Create a project definition like `MYPROJECT_TASK.md` modeled after `SPACE_INVADERS_TASK.md`.
3. Initialize folder layout:
   ```bash
   mkdir -p tasks logs code docs/.github docs/APIs
   touch docs/PROJECT_PLAN.md docs/PROJECT_LOG.md docs/PROJECT_STATUS.md docs/CRASH_RECOVERY.md
   ```
4. Add the orchestration seed files to Git and commit.
5. Start the AI coordinator with:
   ```bash
   ai-coordinator --init ./MYPROJECT_TASK.md
   ```

---

## File Roles

| File | Purpose |
|------|----------|
| `GENERIC_AGENTIC_WORKFLOW.md` | Defines how agentic orchestration, tasks, PRs, and recovery work |
| `SPACE_INVADERS_TASK.md` | Example of a concrete project definition |
| `tasks/` | Holds all task contracts |
| `logs/` | Per-task logs |
| `docs/` | System and recovery documentation |

---

## Reuse

To start a new project, duplicate the `SPACE_INVADERS_TASK.md` file, rename it, and edit the objective and subsystem table.

