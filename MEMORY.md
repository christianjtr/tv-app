# TV App project memory

Keep this file concise: record verified facts, durable constraints, decisions with ADR links, and the current handoff. Update an existing entry when its status changes; keep the evidence for resolved findings. Do not include credentials, raw logs, or session transcripts.

## Baseline

- Source baseline: commit `8265cfd` (catalog API contract remediation, 2026-11-26). React/Vite browses, searches, and displays movie and TV details. Express reads from TMDB and caches mapped results in process. `packages/shared-types` holds the shared models. There is no database or account system.
- The initial audit was primarily static; a read-only Compose check rejected the dev wrapper's `--env-file .`. The workspace scope verified clean install, shared-types build, app/server suites, and Cypress. Production images and SPA deep links were later verified locally with placeholder configuration. This branch's browser flows passed against compiled Express with a fixture-backed TMDB stub.

## Open findings

| ID | Finding | Evidence |
|---|---|---|
| F06 | Some hook-test assertions remain unawaited; the Cypress search flow now verifies query-specific results against Express and the local TMDB stub. | [Hook test](app/__tests__/hooks/useFetchMovies.spec.ts), [browser test](app/cypress/e2e/SearchTVPrograms.cy.ts), [TMDB stub](scripts/mockTmdb.mjs); 6 Cypress tests passed on this branch. |
| F09 | Full `npm audit` reports 24 development-dependency findings (23 moderate, 1 low); `npm audit --omit=dev` reports 0 production vulnerabilities. GitHub's last default-branch push notice reported 10 findings from its separate scan; alert-level details require authenticated GitHub access. | Root `package-lock.json`; npm 11.20.0 audit after Stage 1 fixes, 2026-11-27. |
| F10 | Workflow path filters skip docs-only changes; if the workflow check is required by branch protection, those PRs may remain pending and blocked. | [Workflow triggers](.github/workflows/deployment.yml); check repository branch-protection settings. |
| F11 | Client production builds warn that `@glidejs/glide/dist/css/glide.core.min.css` is missing and leave it unresolved; slider styling needs a separate check. | `npm run build:prod --workspace=tv-app-client`, 2026-11-26. |
| F12 | ESLint 9.39.5 is marked unsupported by npm; retained for this migration per maintainer direction, with a future BiomeJS migration planned. | `npm install` deprecation warning; current React, JSX accessibility, and import plugins do not declare ESLint 10 support. |
| F13 | Cypress 16.4.0 passes the E2E suite but warns that Electron 150 is deprecated as a test browser and will be removed in a future Cypress release. | `npm run test:client:cy`, 2026-11-26. |

## Resolved findings

| ID | Resolution | Evidence |
|---|---|---|
| F01 | The production env is no longer printed, image build/publish runs only on pushes to the default branch, and root Docker context excludes env files except tracked `app/.env.local` to preserve existing build defaults. | Commit `bd8ab10`; [workflow](.github/workflows/deployment.yml), [Docker ignore](.dockerignore). |
| F02 | Node 26.13.1/npm 11.20.0 are pinned; app, server, and shared types use one root workspace lock; shared types are built explicitly and generated output is no longer tracked. Docker contexts exclude host `.tsbuildinfo` to prevent stale incremental state from skipping declaration output. | Commit `609de49`; [toolchain](.nvmrc), [workspace](package.json), [Docker ignore](.dockerignore), [workflow](.github/workflows/deployment.yml); clean installs, builds, and tests passed. |
| F03 | Dev Compose loads the tier env files and propagates command status. Production builds and runs the compiled API, injects client settings at build time, and uses Nginx SPA fallback. | Commit `609de49`; local `docker compose build`, API startup, and `/` plus `/movies/123` smoke tests passed with placeholder settings. |
| F04 | Movie and TV service cache keys have distinct resource namespaces for search, detail, and trending calls. | Commit `8265cfd`; cache-isolation API regression. |
| F05 | Routes reject invalid query/ID/trending inputs; API errors use stable 400/502/500 JSON responses; TMDB status/JSON failures are normalized with a 10-second deadline. The browser validates the error envelope with Joi, lazy-loading its ~44 KB gzip chunk only on failures. | Commit `8265cfd`; [TMDB client](server/src/apis/tmdb/httpClient.ts), [validation middleware](server/src/middlewares/validateRequest.ts), [browser parser](app/src/services/apis/tv-app/requestJson.ts); corresponding tests passed. |
| F07 | Search state follows URL query changes, detail requests ignore stale responses, and arrow navigation leaves editable inputs alone and handles empty target lists. | This branch; [Search](app/src/pages/Search.tsx), [detail hook](app/src/hooks/useFetchTVProgram.ts), [keyboard hook](app/src/hooks/useArrowNavigation.ts); client tests and Cypress passed. |
| F08 | Season artwork uses each season's poster, and date formatting explicitly uses UTC to avoid month shifts. | This branch; [TV mapper](server/src/entityMappers/tmdb/tvshow.entity.mapper.ts), [date helper](app/src/utils/formatReleaseDate.ts); mapper/date tests passed. |
| F14 | React Router 7's peer dependencies initially resolved React 18 alongside the app's React 19; root workspace pins now ensure one React runtime. | `npm ls react react-dom` shows only 19.3.1; client build, tests, and Cypress passed. |
| F15 | Stage 1 removed all production audit findings by replacing vulnerable `@hapi/joi`, moving/updating Nodemon as a development tool, removing unused `swagger-jsdoc`, and updating `concurrently`/`picomatch`. | `npm audit --omit=dev` reports 0; client/server tests, builds, lint, and Cypress passed. |

## Decisions and proposed targets

- [ADR 0001](docs/adr/0001-sequential-modernization.md) records the maintainer review gate and branch sequence, including creating every task branch from the latest `origin/main`, keeping task commits off `main`, reconciling accidental direct commits before proceeding, and deleting merged local/remote topic branches.
- [ADR 0002](docs/adr/0002-toolchain-readiness-before-stage-3.md) records the proposed Stage 2 toolchain work and exit gate before Stage 3 feature development.
- **Deployment direction:** on trusted default-branch pushes, build the live frontend for `/tv-app` against `https://tv-app-nodejs-latest.onrender.com/api` and publish only its static output to `demo`; build and push only the backend Docker image to Docker Hub.
- **Merged at `609de49`:** Node 26.13.1/npm 11.20.0, aligned with the official Docker image. The workstation npm shim was 11.11.1. **Selected:** scope 7 uses Express 5.3.0/Supertest 7.3.2; scope 8 uses Vite 8.4.0/plugin-react 6.3.0, Jest 30.5.2, and Cypress 16.4.0 in separate commits; scope 9 uses React/ReactDOM 19.3.1 and React Router 7.18.7; scope 10 uses Tailwind 4.3.5, DaisyUI 5.8.3, and @tailwindcss/vite 4.3.5.
- **Maintainer-confirmed browser baseline for scope 10:** Chrome 111+, Safari 16.4+, Firefox 128+. Older browsers and smart-TV browser compatibility are not promised by this upgrade.
- **Post-sequence stages requested:** Stage 1 dependency vulnerability mitigation (prioritize production critical/high); Stage 2 toolchain/library modernization, including the planned BiomeJS migration; Stage 3 product experience improvements. Continue one reviewed branch at a time.
- At planning time, the selected typescript-eslint and Jest adapter peer ranges excluded TypeScript 7, and the existing React, accessibility, and import lint plugins did not advertise ESLint 10 support. Recheck peer ranges and pin exact versions on the relevant branch.
- **Maintainer direction for scope 6:** finish the ESLint 9 flat-config migration despite its unsupported status, then plan a separate migration to BiomeJS. BiomeJS is not part of scope 6.

## Handoff

- **Current:** `chore/complete-main-branch-cleanup`, based on `origin/main` at `8f257e9`; workflow and guidance now use `main`, the obsolete remote ref was deleted, and `origin/HEAD` points to `main`. Only the active cleanup branch and local `main` remain.
- **Next, after this cleanup is merged:** start the BiomeJS scope from `origin/main`; keep Stage 3 feature work gated on the Stage 2 exit criteria.
- **Open questions:** What product goals and user journeys should guide Stage 3 experience work?
