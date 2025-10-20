# Git Pull Request Workflow (Automated, Crash‑Safe)

This document defines how Pull Requests are created, reviewed, and merged by agents in an automated project.
It supports GitHub via MCP (mandatory), CLI fallback, and local simulation when no remote is available.

## Workflow Overview

1. Branch creation per task (`feature/<NNN>-<slug>`).
2. Commit work incrementally; push to remote.
3. Open PR via MCP `pull_requests.create` (preferred) or CLI (`gh pr create`).
4. Review performed by `review_agent`.
5. If CHANGES_REQUESTED → agent fixes branch and re-pushes.
6. When APPROVED → merge via MCP `pull_requests.merge` (squash).
7. Coordinator updates `PROJECT_LOG.md`, `PROJECT_STATUS.md`, and task file.
8. On crash: rehydrate PR state from MCP, else local files.

## Environment Variables

```
GITHUB_TOKEN=<your PAT>
GITHUB_TOOLSETS="repos,pull_requests,issues"
GIT_REMOTE_URL=<https-url-to-repo>
GIT_AUTHOR_NAME=<agent name>
GIT_AUTHOR_EMAIL=<agent@example.com>
```

## Crash-Safe Fields

Persist in each task:
```
PR:
  Number: <int>
  Url: <string>
  Status: OPEN | CHANGES_REQUESTED | APPROVED | MERGED
MergeCommit: <sha or N/A>
```


## Failure Handling (MCP errors)
- On MCP auth, permission, or network errors: set task `State: FAILED`, include error details and failing MCP call in `logs/<NNN>.log`, and stop.
- Do not attempt alternative tools or local simulations in this project.


## CI / Branch Protections
CI_Gates:
  - All PRs must pass CI: build, tests, lint
  - Base branch protection: squash-merge only; require 1 review by `review_agent`
  - No direct pushes to base branches


## Retry / Backoff & Timestamps
- Retry once on transient errors with a fixed 30s backoff.
- Log all events with ISO-8601 `Z` timestamps.


## Status Vocabulary
- Allowed states: `OPEN`, `PR_OPEN`, `IN_REVIEW`, `MERGED`, `FAILED`, `ABANDONED`.
- Use these exact values across task files and logs.
