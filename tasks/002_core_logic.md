# Task 002: Core Logic

## Identity
- AgentName: core_logic_specialist
- AgentRole: Implements game mechanics and physics
- ParentAgent: frontend_specialist
- NextAgent: behavior_specialist
- DelegatedSubtasks: []

## Objective
Implement core game mechanics including entity management, collision detection, player movement, and shooting system.

## Inputs
- docs/PRODUCT_SPEC.md
- docs/SYSTEM_ARCHITECTURE.md
- tasks/001_ui_module.md
- docs/APIs/ui_api.md

## Outputs (Expected)
- code/logic/entity.js (Game entity manager)
- code/logic/collision.js (Collision detection system)
- code/logic/game.js (Main game logic orchestrator)
- code/logic/player.js (Player movement and shooting)
- docs/APIs/core_logic_api.md (API documentation)

## API / Contract
- ProvidedAPIs: [docs/APIs/core_logic_api.md]
- ConsumedAPIs: [docs/APIs/ui_api.md]

## Context Management
- EstimatedContextTokens: 25000
- ImplementationChunks: [entity system, collision detection, player mechanics, bullet physics]
- PredecessorArtifacts: docs/PRODUCT_SPEC.md, docs/APIs/ui_api.md
- ContextStrategy: "incremental"

## Git
- BaseBranch: main
- FeatureBranch: feature/002-core-logic
- CommitMessageConvention:
  - First line: "[002] Core game logic implementation"
  - Body: "Why: Establish game mechanics and physics engine", "What changed: Game entity management, collision detection, player movement", "How tested: Integration testing with UI module"
- PR:
  - Title: "[002] Core Logic"
  - DescriptionFile: tasks/002_core_logic.md
  - Labels: ["subtask", "core_logic_specialist"]
  - ReviewAgent: review_agent
  - Status: NOT_OPENED
  - Url:

## Review Criteria
- Entity management system functional
- Collision detection accurate for all game objects
- Player movement and firing mechanics work
- Game loop updates physics correctly
- API contracts defined and compatible with UI module
- No logical errors in game state management

## ErrorHandling
- RevertStrategy: Delete created files and revert branch
- RetryPolicy: "Retry once, then report failure"
- FailureReport: logs/002.log

## ExecutionLog
- LogFile: logs/002.log

## Status
- State: RUNNING
- Attempt: 1
- Started: 2025-10-21T01:16:00+02:00
- Finished:

## Results
- Summary:
- Artifacts:
- PR_Outcome: N/A
- MergeCommit: N/A
- FollowUps: Proceed to Task 003: Behavior System
