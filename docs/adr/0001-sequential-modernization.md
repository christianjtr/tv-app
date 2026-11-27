# ADR 0001: Modernize in sequential, maintainer-reviewed branches

**Status:** Proposed for maintainer review  
**Date:** 2026-11-26

## Context

TV App has correctness and release gaps alongside an aging toolchain. Fixing behavior and upgrading the whole stack in one PR would make failures harder to isolate and rollbacks harder to choose. The maintainer wants to review and approve each effort before development continues.

## Decision

- Work on one branch and PR at a time, starting from the latest GitHub default branch. Agree on the scope and checks before editing.
- Create each task branch from the latest `origin/<default-branch>` before making changes. Do all task edits and commits on that branch; never commit task work directly to the default branch.
- Before starting, check whether the requested scope is already in `origin/<default-branch>`. If a commit lands directly on the default branch or the scope has already merged, stop and reconcile against the updated base; do not recreate or cherry-pick the same work onto another branch without maintainer direction.
- Name branches `<type>/<short-kebab-name>` and commits and PR titles `type(scope): summary`, using Conventional Commits. Separate dependency changes from behavior changes where possible.
- Hand off a focused diff with verification results and known gaps. Green CI supports review; it is not approval. The maintainer owns approval and merge. The next branch starts only after the preceding PR is approved and merged and the maintainer authorizes the next effort.
- After a topic branch is merged and confirmed in `origin/<default-branch>`, delete both its local and remote topic branches; retain the default branch and deployment branches such as `demo`.
- The repository's default branch is being renamed from `master` to `main`. During the transition, keep CI and deployment triggers working for both names. After this change is reviewed and merged, the maintainer changes the GitHub default-branch setting; then use `main` for new work and update local tracking with GitHub's branch-rename instructions. Remove the temporary `master` workflow compatibility after `main` deployments are verified.
  ```sh
  git branch -m master main
  git fetch origin
  git branch -u origin/main main
  git remote set-head origin -a
  ```
- Keep decisions in ADRs and verified findings, constraints, and handoff state in [`MEMORY.md`](../../MEMORY.md). Update the memory in the same PR that changes the facts. Keep personal agent skills local and out of Git.

## Agreed sequence for review

| # | Branch | Review scope |
|---|---|---|
| 0 | `docs/modernization-workflow` | Workflow agreement, project memory, and agent instructions only. |
| 1 | `fix/secure-release-pipeline` | Stop printing env contents; restrict image publishing to trusted pushes; exclude local secrets from the Docker build context. Credential review and rotation are separate operational work. |
| 2 | `build/reproducible-workspaces` | Align Node and npm, consolidate installs, and build shared types explicitly. |
| 3 | `fix/production-containers` | Fix Compose startup, boot the compiled API, and verify live versus demo builds and deep-link refreshes. |
| 4 | `fix/catalog-api-contract` | Isolate cache keys, validate requests, normalize upstream failures, and add API regressions. |
| 5 | `fix/browser-catalog-flows` | Fix history, stale results, keyboard navigation, dates, and artwork. Smoke-test the browser against Express with TMDB stubbed. |
| 6 | `build/typescript-and-lint` | Align TypeScript and move to ESLint flat config. |
| 7 | `build/express-runtime` | Upgrade Express and Supertest behind contract tests. Review native `fetch` separately from the Express change. |
| 8 | `build/vite-and-test-runners` | Upgrade Vite, Jest, and Cypress in separately reviewable commits. |
| 9 | `build/react-and-router` | Upgrade React and declarative routing without changing public URLs. |
| 10 | `build/tailwind-and-daisyui` | Upgrade styling tools together only after confirming browser support. |

The sequence is a plan, not authorization to start every branch. Revisit it with the maintainer if a prerequisite or production risk changes.

## Consequences

Sequential review takes longer than parallel implementation, but every change has a clear owner, verification step, and rollback boundary. No product expansion or architecture rewrite is part of this effort.
