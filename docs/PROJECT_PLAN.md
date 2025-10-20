# Project Plan

## Project Overview
Space Invaders Clone - Browser-based implementation of the classic arcade game using autonomous agent workflow.

## Agents

- **planner**: 🗺️ Product Planner – produces PRODUCT_SPEC.md, RESEARCH_NOTES.md, and PROJECT_PLAN.md
- **coordinator**: 🧭 Coordinator – orchestrates dependency-driven workflows and crash-safe execution
- **frontend_specialist**: 🎨 Frontend Specialist – implements UI, canvas rendering, and user controls
- **core_logic_specialist**: 🧠 Core Logic Specialist – implements game mechanics, collision detection, and physics
- **behavior_specialist**: 🤖 Behavior & Automation Specialist – enemy patterns, difficulty scaling, and AI behavior
- **metrics_scoring_specialist**: 📈 Metrics & Scoring Specialist – scoring logic, lives system, and game state management
- **docs_architect**: 📝 Docs Architect – maintains documentation, APIs, and recovery files
- **review_agent**: 🔎 Review Agent – performs structured reviews of PRs and artifacts
- **test_spec_author**: 🧪 Test Spec Author – drafts formal test specifications (if TDD implemented)

## Task Graph (DAG)

| ID | Title | Agent | DependsOn | Description |
|----|--------|--------|-----------|-------------|
| 000 | Product Specification | planner | - | Define PRODUCT_SPEC.md and PROJECT_PLAN.md |
| 001 | UI Module | frontend_specialist | 000 | Implement HTML5 canvas, controls, and game screens |
| 002 | Core Logic | core_logic_specialist | 001 | Handle player movement, shooting, and collisions |
| 003 | Behavior System | behavior_specialist | 002 | Define enemy movement patterns and difficulty scaling |
| 004 | Scoring | metrics_scoring_specialist | 002 | Points and lives logic, game state management |
| 005 | Integration | coordinator | 003,004 | Combine all modules into functional game |
| 006 | Documentation | docs_architect | 005 | Complete system documentation and recovery files |
| 007 | Testing & Verification | test_spec_author | 005 | Test specifications and verification (if needed) |

## Agent Coordination Patterns
- **Specialist Agents**: Implement complete functional units within API boundaries
- **Coordinator**: Manages dependencies, assigns tasks, updates status
- **Docs Architect**: Updates documentation continuously after each task
- **Review Agent**: Reviews all PRs before merge
- **Non-interrupting**: Process proceeds autonomously without waiting for external approval

## Global Policies
- **File-based IPC**: All agent communication through Git and structured files
- **Crash-safe**: State persists in task files and logs for recovery
- **Git branching**: Feature branches per task, PR review required
- **Self-documenting**: Code includes clear documentation and comments
- **Functional completeness**: Each task delivers working, testable increments
- **Context management**: Keep implementation under 50K tokens per task
- **Append-only logs**: PROJECT_LOG.md tracks all operations
- **Status tracking**: PROJECT_STATUS.md shows real-time progress

## Execution Flow
1. Planner creates initial specs
2. Coordinator assigns tasks by dependency order
3. Each specialist implements on feature branch
4. PR created, reviewed, and merged
5. Coordinator updates docs and proceeds to next task
6. Process continues until completion

## Development Environment
- **Framework**: Vanilla JavaScript, HTML5 Canvas, no external libraries
- **Build**: Browser-direct, no build process required
- **Testing**: Manual testing with PR review verification
- **CI/CD**: GitHub Actions for basic checks (if configured)

## Quality Gates
- All tasks approved by review_agent
- Code meets module API contracts
- No JavaScript console errors
- Game runs in targeted browsers
- Documentation complete and accurate

## Risk Management
- Retry once on task failure
- Multiple agents can parallelize independent tasks
- Recovery state maintained in CRASH_RECOVERY.md
- Coordinator handles task reassignment if needed
