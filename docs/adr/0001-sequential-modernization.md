# ADR 0001: Modernize in sequential, maintainer-reviewed branches

**Status:** Proposed for maintainer review  
**Date:** 2026-11-26

## Context

TV App has correctness and release gaps alongside an aging toolchain. Fixing behavior and upgrading the whole stack in one PR would make failures harder to isolate and rollbacks harder to choose. The maintainer wants to review and approve each effort before development continues.

## Decision

- Work on one branch and PR at a time, starting from the latest merged `master`. Agree on the scope and checks before editing.
- Name branches `<type>/<short-kebab-name>` and commits and PR titles `type(scope): summary`, using Conventional Commits. Separate dependency changes from behavior changes where possible.
- Hand off a focused diff with verification results and known gaps. Green CI supports review; it is not approval. The maintainer owns approval and merge. The next branch starts only after the preceding PR is approved and merged and the maintainer authorizes the next effort.
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
