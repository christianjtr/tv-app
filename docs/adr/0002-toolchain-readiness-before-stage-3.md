# ADR 0002: Complete toolchain readiness before Stage 3

**Status:** Accepted
**Date:** 2026-11-27

## Context

The original modernization sequence in [ADR 0001](0001-sequential-modernization.md) and production dependency mitigation are complete. Stage 3 is intended for product and user-experience features, so toolchain readiness should be reviewed first.

The current toolchain pins Node.js 26.13.1 and npm 11.20.0. PR #23 updated the workflow actions, added `actionlint`, PR lint/build checks, and Chrome-based Cypress. The full and production dependency audits are clean. The maintainer selected manual dependency and action updates, with major-version action tags and no update bot for now. See [project memory](../../MEMORY.md) for evidence.

## Decision

- Finish and review the Stage 2 toolchain work before starting Stage 3 feature implementation.
- Keep each Stage 2 item on its own focused branch and PR. This ADR records the roadmap; it does not authorize every item for implementation.
- Treat **BiomeJS as the agreed first Stage 2 migration**. Inventory the current ESLint and Prettier behavior in both workspaces before removing either. Preserve important TypeScript, React, hooks, accessibility, import, and refresh checks unless equivalent coverage is verified. Avoid an unrelated repository-wide formatting diff.
- Keep each Stage 2 item in a separate focused branch and PR.
- **CI and Actions maintenance — implemented in PR #23:** `checkout@v7`, `setup-node@v7`, `actionlint`, PR lint/build/tests, and Chrome-based Cypress.
- **Dependency maintenance — audit complete in PR #19:** full and production npm audits report zero vulnerabilities. Keep npm and Action updates manual; do not add Dependabot until PR volume and grouping are reconsidered.
- **Action pinning:** retain major-version tags; revisit immutable commit-SHA pins if the maintenance process changes.
- **Test-runner maintenance — implemented in PR #23:** Cypress runs in Chrome rather than deprecated Electron.
- **Server bundler migration — implemented in PR #18:** esbuild replaces Rollup while retaining `tsc --noEmit`, Node CommonJS output, path aliases, and external runtime packages.
- **Runtime pin review:** keep the Node/npm pins unless support, compatibility, or security evidence calls for a change; avoid blanket version bumps of recently modernized libraries.
- Make a separate maintainer-reviewed Stage 3 scope only after the agreed Stage 2 work is complete. Stage 2 must not include product features or user-visible behavior changes.

## Stage 2 exit criteria

- Biome lint/format behavior is verified against the existing rules; any uncovered rules are explicitly retained or accepted by the maintainer.
- CI validates workflow syntax, lint, client/server builds, unit tests, and Cypress on the appropriate pull-request paths.
- Workflow action references and automated dependency-update policy are reviewed and documented.
- A fresh full and production-only dependency audit is recorded; unresolved development findings have an explicit disposition.
- The Cypress browser/runtime warning is resolved or has a documented, accepted limit.
- The completed work is merged before a separate Stage 3 feature scope is authorized.

The CI, audit, browser, bundler, and dependency-update policy criteria are complete. Stage 2 is ready for a separate Stage 3 scope.

## Consequences

The extra gate delays feature work, but keeps toolchain changes independently reviewable and reduces the chance that formatting, CI, or test-runner failures are mistaken for product regressions. Stage 2 remains a roadmap until each scope is approved.
