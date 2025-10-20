# Git Branching and Review Conventions

## Branching Strategy
- **main**: Protected branch for production-ready code
- **feature/<NNN>-<slug>**: Each task develops on its own feature branch
- No direct pushes to main; all changes via PR review

## Commit Standards
Each commit includes:
- Commit message format: `[<NNN>] <short description>`
- Body with sections: "Why:", "What changed:", "How tested:"
- Signed-off if repository policy requires

## Pull Request Workflow
1. Create feature branch for task
2. Commit complete functional unit
3. Push to remote
4. Create PR: feature/<NNN>-<slug> → main
5. PR reviewed by review_agent
6. If APPROVED: merge and delete branch
7. If CHANGES_REQUESTED: fix on same branch, push updates

## Review Criteria
- Code functions correctly for task scope
- Adheres to API contracts defined in task
- Passes CI checks (build, lint, tests if present)
- Documentation updated and accurate
- No sensitive data or large binary files

## Merge Process
- Prefer squash merge for feature branches
- Merge commit title: `[<NNN>] <Title>`
- Delete feature branch post-merge (PRs only)

## Conflict Resolution
- Prefer rebase to maintainer
- If conflicts after retry: task marked FAILED

## Constraints
- Use GitHub MCP for PR creation (no CLI fallbacks)
- All PRs must pass basic CI before review
- Protected branch rules: require 1 review, no direct commits

## Failure Handling
If MCP unavailable:
- Set task state to FAILED
- Log error reason in task log
- Stop execution and require manual intervention
