# Generic Agentic Workflow Specification — Crash-Safe Orchestration Framework

---

## Objective

Define a **file-based, crash-resilient orchestration system** for automated AI development projects.  
Each subsystem (for example: UI, logic, AI, backend, data, docs, etc.) is implemented by specialized agents.  
Agents communicate exclusively via structured files and Git branches.  
All tasks and subtasks persist state, logs, and results on disk to enable complete recovery after interruption.

---

## Folder Structure

```
project_root/
├─ tasks/                     # Numbered task contracts and states
│  ├─ 001_<slug>.md
│  ├─ 002_<slug>.md
│  └─ ...
├─ logs/                      # Append-only logs per task
│  ├─ 001.log
│  ├─ 002.log
│  └─ ...
├─ code/                      # Produced source files organized by subsystem
│  ├─ module1/
│  ├─ module2/
│  ├─ ai/
│  └─ tests/
├─ docs/
│  ├─ PROJECT_PLAN.md         # Agent-task mapping, DAG, policies
│  ├─ PROJECT_LOG.md          # Execution ledger
│  ├─ CRASH_RECOVERY.md       # Recovery state
│  ├─ SYSTEM_ARCHITECTURE.md  # System-level design, updated continuously
│  ├─ GIT_POLICY.md           # Branching, PR, and review conventions
│  ├─ PRODUCT_SPEC.md         # Final product requirements and acceptance criteria
│  ├─ RESEARCH_NOTES.md       # Brief research record supporting the spec
│  ├─ PROJECT_STATUS.md       # Live summary of all task states and completion
│  └─ APIs/
│     ├─ module1_api.md
│     ├─ module2_api.md
│     └─ ...
└─ .github/
   └─ PULL_REQUEST_TEMPLATE.md
```

### Numbering

- Tasks are numbered sequentially (`001`, `002`, …).  
- Parent tasks are numbered first; subtasks use the next available number.  
- Each task number corresponds to one log file (`logs/<NNN>.log`).

---

## Agents and Planning

### PROJECT_PLAN.md

Defines all active agents, their roles, and the global execution policy.

#### Example Structure

```
# Project Plan

## Agents
- coordinator: 🧭 Coordinator – orchestrates dependency-driven workflows and crash-safe execution.
- module_specialist: ⚙️ Module Specialist – implements a technical module.
- behavior_specialist: 🤖 Behavior Specialist – automation and behavior logic.
- metrics_specialist: 📈 Metrics & Scoring Specialist – handles metrics and telemetry.
- docs_architect: 📝 Docs Architect – maintains documentation and recovery files.
- review_agent: 🔎 Review Agent – performs structured reviews of PRs and artifacts.
- test_spec_author: 🧪 Test Spec Author – drafts formal test specifications.
- test_writer: 🧪 Test Writer – authors failing tests first.
- planner: 🗺️ Product Planner – produces PRODUCT_SPEC, RESEARCH_NOTES, and PROJECT_PLAN.

## Task Graph (DAG)
| ID | Title | Agent | DependsOn | Description | TargetBranch |
|----|--------|--------|-----------|-------------|---------------|
| 000 | Product Specification | planner | - | Research & draft PRODUCT_SPEC and PROJECT_PLAN | main |
| 001 | Module 1 | module_specialist | 000 | Implement primary subsystem | main |
| 002 | Module 2 | module_specialist | 001 | Implement dependent subsystem | main |
| 003 | Integration | coordinator | 001,002 | Combine subsystems | main |

## Global Policies
- File-based IPC
- Retry once on failure
- Append-only logging
- Git branching and PR workflow (see GIT_POLICY.md)
- True TDD enforcement: When TDD is used, produce **test specification first**, then **write failing tests**, only then **implement** code until green. Post-implementation tests are verification, not TDD.
- Planning gate: Implementation begins only after PRODUCT_SPEC.md exists and PROJECT_PLAN.md defines agents/DAG. The process is **non-interrupting**: proceed autonomously using documented assumptions without waiting for stakeholder approval.

```

---

## Task Contract Specification

Each file `tasks/<NNN>_<slug>.md` follows this schema:

```
# Task <NNN>: <Title>

## Identity
- AgentName: <string>
- AgentRole: <short description>
- ParentAgent: <string>
- NextAgent: <string>
- DelegatedSubtasks: [ list of task files ]

## Objective
<Concise description of the goal and scope>

## Inputs
- <list of file references>

## Outputs (Expected)
- <list of created or modified files>

## API / Contract
- ProvidedAPIs: [ list of doc paths ]
- ConsumedAPIs: [ list of doc paths ]

## Git
- BaseBranch: <main|develop>
- FeatureBranch: feature/<NNN>-<slug>
- CommitMessageConvention:
  - First line: "[<NNN>] <short summary>"
  - Body: "Why:", "What changed:", "How tested:"
- PR:
  - Title: "[<NNN>] <Title>"
  - DescriptionFile: tasks/<NNN>_<slug>.md
  - Labels: ["subtask", "<AgentName>"]
  - ReviewAgent: Review_Agent
  - Status: NOT_OPENED | OPEN | CHANGES_REQUESTED | APPROVED | MERGED
  - Url: <string>

## Review Criteria
- Meets Objective and Acceptance Criteria
- If TDD declared: verify presence and order of **test specification → failing tests → implementation**
- Adheres to API contracts and documentation requirements
- Includes or updates necessary tests
- CI checks pass with no secrets or large binaries

## ErrorHandling
- RevertStrategy: <steps to restore state>
- RetryPolicy: "Retry once, then report failure"
- FailureReport: <file path>

## ExecutionLog
- LogFile: logs/<NNN>.log

## Status
- State: PENDING | RUNNING | PR_OPEN | IN_REVIEW | CHANGES_REQUESTED | SUCCESS | FAILED | PARTIAL
- Attempt: <0|1|2>
- Started: <timestamp>
- Finished: <timestamp>

## Results
- Summary: <text>
- Artifacts: <paths>
- PR_Outcome: APPROVED | REJECTED | N/A
- MergeCommit: <SHA or N/A>
- FollowUps: <notes>
```

---

## Git Policy

For detailed automated Pull Request handling, see `/seed/GIT_PR_WORKFLOW.md`.

**Mandatory integration:** GitHub MCP server (toolsets: `repos,pull_requests,issues`; add `actions` if CI gating is required). If MCP becomes unavailable or misconfigured, mark the active task as `FAILED`, write the reason to `logs/<NNN>.log`, and stop execution. No CLI or local fallback mechanisms are allowed.

### Branching
- Each task runs in its own branch: `feature/<NNN>-<slug>`.
- All changes must be isolated to that branch.

### Commits
- Each commit starts with `[<NNN>]` prefix.
- Commit body explains purpose, change, and testing.
- Sign-offs as required by repository policy.

### Pull Requests
- PR source: `feature/<NNN>-<slug>` → target: `BaseBranch`.
- Body links to `tasks/<NNN>_<slug>.md`.
- Include test specification artifact if TDD.
- Labels: `subtask`, `agent name`.
- CI must pass before review.

### Reviews
- Assigned to `Review_Agent`.
- Review compares code and documentation with task objectives.
- Outcomes:
  - `APPROVED`: merge permitted.
  - `CHANGES_REQUESTED`: feedback returned to implementing agent.
- Implementing agent must address feedback and update same branch.

### Merge
- Performed after approval and green CI.
- Prefer squash merge with title `[<NNN>] <Title>`.
- Record resulting commit SHA in the task’s `MergeCommit` field.
- Delete feature branch post-merge.

### Conflict Resolution
- Rebase or merge as needed.
- If unresolved after one retry, mark FAILED.

---

## Logging

### Per-Task Logs
Each task appends human-readable operational data to `logs/<NNN>.log`.

### Project Ledger
All task transitions are recorded in `docs/PROJECT_LOG.md` with timestamp, ID, agent, new status, and next step.

### Live Project Status Tracking

A continuously updated summary of all tasks and overall progress is stored in `docs/PROJECT_STATUS.md`.

```
# Project Status

LastUpdate: <timestamp>
OverallState: <RUNNING | PAUSED | FAILED | COMPLETED>
Completion: <percent>

| ID | Title | Agent | State | Attempt | LastUpdated | Notes |
|----|--------|--------|--------|----------|--------------|-------|
| 000 | Product Specification | planner | SUCCESS | 1 | 2025-10-20 | Spec approved |
| 001 | Module 1 | module_specialist | RUNNING | 1 | 2025-10-20 | Implementation |
...
```

Update Rules:
- Updated by Coordinator after every task `Status` change.
- Completion = percentage of tasks marked SUCCESS.
- Always overwrite; `PROJECT_LOG.md` is the append-only audit trail.

---

## Crash Recovery

### CRASH_RECOVERY.md Schema

```
# Crash Recovery

LastUpdate: <timestamp>
CoordinatorState: <IDLE | RUNNING_TASK | WAITING_SUBTASK | FINALIZING>
ActiveTask: <NNN or none>
ActiveAgent: <AgentName or none>
ActiveAttempt: <0|1|2>
GitRemote: <origin or other>
BaseBranch: <main|develop>
ActiveFeatureBranch: <feature/<NNN>-<slug> or none>
ActivePR:
  Number: <integer or none>
  Url: <string or none>
  Status: NOT_OPENED | OPEN | CHANGES_REQUESTED | APPROVED | MERGED
PendingQueue: [ list of remaining NNNs ]
LastSuccessTask: <NNN or none>
LastFailureTask: <NNN or none>
Hints: <instructions or summary>
StatusFile: docs/PROJECT_STATUS.md
```

### Recovery Algorithm

1. If `ActiveTask` RUNNING and not completed, re-run if `Attempt < 2`.
2. If PR `CHANGES_REQUESTED`, return control to implementing agent.
3. If PR `OPEN` but CI fails, log and retry.
4. If PR `APPROVED`, merge and proceed.
5. If no active task, select next dependency-ready task.
6. Append all actions to `PROJECT_LOG.md` and `logs/<NNN>.log`.

---

## Execution Behavior

- Coordinator executes tasks sequentially by dependency order.  
- Initialization requires `PRODUCT_SPEC.md` and `PROJECT_PLAN.md`.  
- Operation is **non-interrupting**.  
- Lifecycle: branch → implement → commit/push → PR → review → merge → log → proceed.

---

## Completion Criteria

- All tasks marked SUCCESS and PRs merged.  
- `CRASH_RECOVERY.md` shows no remaining `PendingQueue`.  
- `PROJECT_LOG.md` and `SYSTEM_ARCHITECTURE.md` reflect final state.
