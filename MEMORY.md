# TV App project memory

Keep this file concise: record verified facts, durable constraints, decisions with ADR links, and the current handoff. Update an existing entry when its status changes; keep the evidence for resolved findings. Do not include credentials, raw logs, or session transcripts.

## Baseline

- Source baseline: `master` at `8265cfd` (catalog API contract remediation, 2026-11-26). React/Vite browses, searches, and displays movie and TV details. Express reads from TMDB and caches mapped results in process. `packages/shared-types` holds the shared models. There is no database or account system.
- The initial audit was primarily static; a read-only Compose check rejected the dev wrapper's `--env-file .`. The workspace scope verified clean install, shared-types build, app/server suites, and Cypress. Production images and SPA deep links were later verified locally with placeholder configuration. This branch's browser flows passed against compiled Express with a fixture-backed TMDB stub.

## Open findings

| ID | Finding | Evidence |
|---|---|---|
| F06 | Some hook-test assertions remain unawaited; the Cypress search flow now verifies query-specific results against Express and the local TMDB stub. | [Hook test](app/__tests__/hooks/useFetchMovies.spec.ts), [browser test](app/cypress/e2e/SearchTVPrograms.cy.ts), [TMDB stub](scripts/mockTmdb.mjs); 6 Cypress tests passed on this branch. |
| F09 | `npm install` reports 21 dependency vulnerabilities (1 critical, 8 high, 11 moderate, 1 low); remediation is outside the TypeScript/lint scope. | Root `package-lock.json`; npm 11.20.0 audit summary, 2026-11-26. |
| F10 | Workflow path filters skip docs-only changes; if the workflow check is required by branch protection, those PRs may remain pending and blocked. | [Workflow triggers](.github/workflows/deployment.yml); check repository branch-protection settings. |
| F11 | Client production builds warn that `@glidejs/glide/dist/css/glide.core.min.css` is missing and leave it unresolved; slider styling needs a separate check. | `npm run build:prod --workspace=tv-app-client`, 2026-11-26. |
| F12 | ESLint 9.39.5 is marked unsupported by npm; retained for this migration per maintainer direction, with a future BiomeJS migration planned. | `npm install` deprecation warning; current React, JSX accessibility, and import plugins do not declare ESLint 10 support. |

## Resolved findings

| ID | Resolution | Evidence |
|---|---|---|
| F01 | The production env is no longer printed, image build/publish runs only on pushes to `master`, and root Docker context excludes env files except tracked `app/.env.local` to preserve existing build defaults. | Commit `bd8ab10`; [workflow](.github/workflows/deployment.yml), [Docker ignore](.dockerignore). |
| F02 | Node 26.13.1/npm 11.20.0 are pinned; app, server, and shared types use one root workspace lock; shared types are built explicitly and generated output is no longer tracked. Docker contexts exclude host `.tsbuildinfo` to prevent stale incremental state from skipping declaration output. | Commit `609de49`; [toolchain](.nvmrc), [workspace](package.json), [Docker ignore](.dockerignore), [workflow](.github/workflows/deployment.yml); clean installs, builds, and tests passed. |
| F03 | Dev Compose loads the tier env files and propagates command status. Production builds and runs the compiled API, injects client settings at build time, and uses Nginx SPA fallback. | Commit `609de49`; local `docker compose build`, API startup, and `/` plus `/movies/123` smoke tests passed with placeholder settings. |
| F04 | Movie and TV service cache keys have distinct resource namespaces for search, detail, and trending calls. | Commit `8265cfd`; cache-isolation API regression. |
| F05 | Routes reject invalid query/ID/trending inputs; API errors use stable 400/502/500 JSON responses; TMDB status/JSON failures are normalized with a 10-second deadline. The browser validates the error envelope with Joi, lazy-loading its ~44 KB gzip chunk only on failures. | Commit `8265cfd`; [TMDB client](server/src/apis/tmdb/httpClient.ts), [validation middleware](server/src/middlewares/validateRequest.ts), [browser parser](app/src/services/apis/tv-app/requestJson.ts); corresponding tests passed. |
| F07 | Search state follows URL query changes, detail requests ignore stale responses, and arrow navigation leaves editable inputs alone and handles empty target lists. | This branch; [Search](app/src/pages/Search.tsx), [detail hook](app/src/hooks/useFetchTVProgram.ts), [keyboard hook](app/src/hooks/useArrowNavigation.ts); client tests and Cypress passed. |
| F08 | Season artwork uses each season's poster, and date formatting explicitly uses UTC to avoid month shifts. | This branch; [TV mapper](server/src/entityMappers/tmdb/tvshow.entity.mapper.ts), [date helper](app/src/utils/formatReleaseDate.ts); mapper/date tests passed. |

## Decisions and proposed targets

- [ADR 0001](docs/adr/0001-sequential-modernization.md) records the maintainer review gate and branch sequence. Keep the existing architecture; use the current in-memory cache and test tools during remediation.
- **Merged at `609de49`:** Node 26.13.1/npm 11.20.0, aligned with the official Docker image. The workstation npm shim was 11.11.1. **Selected in scope 7:** Express 5.3.0 and Supertest 7.3.2 with matching Express/Supertest types. **Still proposed:** Vite 8 with React plugin 6, Jest 30, and Cypress 16; React 19 and React Router 7. Tailwind 4 and DaisyUI 5 depend on browser requirements.
- At planning time, the selected typescript-eslint and Jest adapter peer ranges excluded TypeScript 7, and the existing React, accessibility, and import lint plugins did not advertise ESLint 10 support. Recheck peer ranges and pin exact versions on the relevant branch.
- **Maintainer direction for scope 6:** finish the ESLint 9 flat-config migration despite its unsupported status, then plan a separate migration to BiomeJS. BiomeJS is not part of scope 6.

## Handoff

- **Current:** `build/express-runtime`, based on scope 6 merged at `8f7b555`; Express 5.3.0/Supertest 7.3.2 are installed and server contract/unit tests, build, lint, and Cypress against compiled Express pass. Awaiting maintainer review.
- **Next, after approval and merge:** `build/vite-and-test-runners`.
- **Open questions:** Which live and demo deployments should remain supported? Which browser versions or smart-TV devices need support? These affect production rollout and the styling upgrade, respectively.
