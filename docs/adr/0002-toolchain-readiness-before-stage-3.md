# ADR 0002: Complete toolchain readiness before Stage 3

**Status:** Proposed for maintainer review  
**Date:** 2026-11-27

## Context

The original modernization sequence in [ADR 0001](0001-sequential-modernization.md) and the production dependency mitigation are complete. Stage 3 is intended for product and user-experience features. The project still has toolchain maintenance to plan, so beginning feature work before that is reviewed could mix infrastructure risk with product changes.

The current toolchain already pins Node.js 26.13.1 and npm 11.20.0, and recently upgraded React, Vite, TypeScript, Jest, and Cypress. Remaining evidence includes ESLint 9 being unsupported, the deployment workflow referencing `actions/checkout@v3` and `actions/setup-node@v3`, no configured workflow lint or automated dependency-update workflow, a prior full audit with development-only findings, and Cypress' Electron deprecation warning. See [project memory](../../MEMORY.md) for findings and evidence.

## Proposed decision

- Finish and review the Stage 2 toolchain work before starting Stage 3 feature implementation.
- Keep each Stage 2 item on its own focused branch and PR. This ADR records the roadmap; it does not authorize every item for implementation.
- Treat **BiomeJS as the agreed first Stage 2 migration**. Inventory the current ESLint and Prettier behavior in both workspaces before removing either. Preserve important TypeScript, React, hooks, accessibility, import, and refresh checks unless equivalent coverage is verified. Avoid an unrelated repository-wide formatting diff.
- Evaluate these additional toolchain items as separate scopes:
  1. **CI and Actions maintenance:** update the workflow's `checkout` and `setup-node` references to supported releases; evaluate immutable action pinning or Dependabot action updates; add workflow validation (for example, `actionlint`); and run lint plus production builds on pull requests, not only on `master` deployment pushes.
  2. **Dependency maintenance:** refresh the full npm audit baseline, review the remaining development-dependency findings, and consider Dependabot version updates for npm workspaces and GitHub Actions. Do not add an update bot without deciding how its PR volume and grouping will be managed.
  3. **Test-runner maintenance:** review the Cypress/Electron deprecation warning and select a supported CI browser before it becomes a breaking upgrade.
  4. **Runtime pin review:** keep the existing Node/npm pins unless support, compatibility, or security evidence calls for a change; avoid blanket version bumps of recently modernized application libraries.
- Make a separate maintainer-reviewed Stage 3 scope only after the agreed Stage 2 work is complete. Stage 2 must not include product features or user-visible behavior changes.

## Stage 2 exit criteria

- Biome lint/format behavior is verified against the existing rules; any uncovered rules are explicitly retained or accepted by the maintainer.
- CI validates workflow syntax, lint, client/server builds, unit tests, and Cypress on the appropriate pull-request paths.
- Workflow action references and automated dependency-update policy are reviewed and documented.
- A fresh full and production-only dependency audit is recorded; unresolved development findings have an explicit disposition.
- The Cypress browser/runtime warning is resolved or has a documented, accepted limit.
- The completed work is merged before a separate Stage 3 feature scope is authorized.

## Consequences

The extra gate delays feature work, but keeps toolchain changes independently reviewable and reduces the chance that formatting, CI, or test-runner failures are mistaken for product regressions. Stage 2 remains a roadmap until each scope is approved.
