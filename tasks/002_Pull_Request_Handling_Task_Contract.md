# Task 002: Handle Pull Requests

## Identity
- AgentName: review-agent
- AgentRole: Handle pull requests for the Space Invaders game development project
- ParentAgent: coordinator
- NextAgent: coordinator
- DelegatedSubtasks: []

## Objective
Handle pull requests for the Space Invaders game development project. This includes reviewing, approving, and merging pull requests as specified in the `seed/GENERIC_AGENTIC_WORKFLOW.md`, `seed/GIT_PR_WORKFLOW.md`, and `docs/PRODUCT_SPEC.md` files.

## Inputs
- `seed/GENERIC_AGENTIC_WORKFLOW.md`
- `seed/GIT_PR_WORKFLOW.md`
- `docs/PRODUCT_SPEC.md`

## Outputs (Expected)
- Updated `PROJECT_LOG.md` and `PROJECT_STATUS.md` files
- Merged pull requests

## API / Contract
- ProvidedAPIs: []
- ConsumedAPIs: []

## Context Management
- EstimatedContextTokens: 50000
- ImplementationChunks: ["Review Pull Requests", "Approve Pull Requests", "Merge Pull Requests"]
- PredecessorArtifacts: ["seed/GENERIC_AGENTIC_WORKFLOW.md", "seed/GIT_PR_WORKFLOW.md", "docs/PRODUCT_SPEC.md"]
- ContextStrategy: "incremental"

## Git
- BaseBranch: main
- FeatureBranch: feature/002-Pull_Request_Handling
- CommitMessageConvention:
  - First line: "[002] Handle Pull Requests"
  - Body: "Why: Handle pull requests as per the specified workflow.\nWhat changed: Reviewed, approved, and merged pull requests.\nHow tested: Ensured all pull requests were properly handled."
- PR:
  - Title: "[002] Handle Pull Requests"
  - DescriptionFile: tasks/002_Pull_Request_Handling_Task_Contract.md
  - Labels: ["subtask", "review-agent"]
  - ReviewAgent: review-agent
  - Status: NOT_OPENED
  - Url: 

## Review Criteria
- Meets Objective and Acceptance Criteria
- Adheres to API contracts and documentation requirements
- CI checks pass with no secrets or large binaries
- Respects context window constraints and task sizing guidelines

## ErrorHandling
- RevertStrategy: Revert to the last successful commit on the main branch.
- RetryPolicy: "Retry once, then report failure"
- FailureReport: logs/002.log

## ExecutionLog
- LogFile: logs/002.log

## Status
- State: PENDING
- Attempt: 0
- Started: 
- Finished: 

## Results
- Summary: 
- Artifacts: 
- PR_Outcome: 
- MergeCommit: 
- FollowUps: 