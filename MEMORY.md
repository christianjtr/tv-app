# TV App project memory

Keep this file concise: record verified facts, durable constraints, decisions with ADR links, and the current handoff. Update an existing entry when its status changes; keep the evidence for resolved findings. Do not include credentials, raw logs, or session transcripts.

## Baseline

- Source baseline: `master` at `609de49` (production-container remediation, 2026-11-26). React/Vite browses, searches, and displays movie and TV details. Express reads from TMDB and caches mapped results in process. `packages/shared-types` holds the shared models. There is no database or account system.
- The initial audit was primarily static; a read-only Compose check rejected the dev wrapper's `--env-file .`. The workspace scope verified clean install, shared-types build, app/server suites, and Cypress. Production images and SPA deep links were later verified locally with placeholder configuration.

## Open findings

| ID | Finding | Evidence |
|---|---|---|
| F06 | The server API failure test is now awaited. Some hook assertions remain unawaited, and Cypress search can pass against canned results that don't depend on the query. | [API test](server/__tests__/integration/movie.e2e.spec.ts), [hook test](app/__tests__/hooks/useFetchMovies.spec.ts), [browser test](app/cypress/e2e/SearchTVPrograms.cy.ts) |
| F07 | Search reads the URL query only on mount, and a slow detail response can overwrite a newer title. The document-level arrow handler can move focus out of text inputs or throw when no target exists. | [Search page](app/src/pages/Search.tsx), [detail hook](app/src/hooks/useFetchTVProgram.ts), [keyboard hook](app/src/hooks/useArrowNavigation.ts) |
| F08 | Seasons inherit the show's poster instead of using their own. A date-only value formatted in local time can display the previous month. | [TV mapper](server/src/entityMappers/tmdb/tvshow.entity.mapper.ts), [program card](app/src/components/TVProgamItem/TVProgramItem.tsx) |
| F09 | `npm ci` reports 26 dependency vulnerabilities (1 critical, 8 high, 16 moderate, 1 low); remediation is outside the workspace-consolidation scope. | Root `package-lock.json`; `npm ci` audit summary, 2026-11-26. |
| F10 | Workflow path filters skip docs-only changes; if the workflow check is required by branch protection, those PRs may remain pending and blocked. | [Workflow triggers](.github/workflows/deployment.yml); check repository branch-protection settings. |
| F11 | Client production builds warn that `@glidejs/glide/dist/css/glide.core.min.css` is missing and leave it unresolved; slider styling needs a separate check. | `npm run build:prod --workspace=tv-app-client`, 2026-11-26. |

## Resolved findings

| ID | Resolution | Evidence |
|---|---|---|
| F01 | The production env is no longer printed, image build/publish runs only on pushes to `master`, and root Docker context excludes env files except tracked `app/.env.local` to preserve existing build defaults. | Commit `bd8ab10`; [workflow](.github/workflows/deployment.yml), [Docker ignore](.dockerignore). |
| F02 | Node 26.13.1/npm 11.20.0 are pinned; app, server, and shared types use one root workspace lock; shared types are built explicitly and generated output is no longer tracked. Docker contexts exclude host `.tsbuildinfo` to prevent stale incremental state from skipping declaration output. | Commit `609de49`; [toolchain](.nvmrc), [workspace](package.json), [Docker ignore](.dockerignore), [workflow](.github/workflows/deployment.yml); clean installs, builds, and tests passed. |
| F03 | Dev Compose loads the tier env files and propagates command status. Production builds and runs the compiled API, injects client settings at build time, and uses Nginx SPA fallback. | Commit `609de49`; local `docker compose build`, API startup, and `/` plus `/movies/123` smoke tests passed with placeholder settings. |
| F04 | Movie and TV service cache keys have distinct resource namespaces for search, detail, and trending calls. | This branch; cache-isolation API regression passed. |
| F05 | Routes reject invalid query/ID/trending inputs; API errors use stable 400/502/500 JSON responses; TMDB status/JSON failures are normalized with a 10-second deadline. The browser validates the error envelope with Joi, lazy-loading its ~44 KB gzip chunk only on failures. | This branch; [TMDB client](server/src/apis/tmdb/httpClient.ts), [validation middleware](server/src/middlewares/validateRequest.ts), [browser parser](app/src/services/apis/tv-app/requestJson.ts); corresponding tests and client build passed. |

## Decisions and proposed targets

- [ADR 0001](docs/adr/0001-sequential-modernization.md) records the maintainer review gate and branch sequence. Keep the existing architecture; use the current in-memory cache and test tools during remediation.
- **Merged at `609de49`:** Node 26.13.1/npm 11.20.0, aligned with the official Docker image. The workstation npm shim was 11.11.1. **Still proposed:** TypeScript 6, ESLint 9 and typescript-eslint 8; Express 5 and Supertest 7; Vite 8 with React plugin 6, Jest 30, and Cypress 16; React 19 and React Router 7. Tailwind 4 and DaisyUI 5 depend on browser requirements.
- At planning time, the selected typescript-eslint and Jest adapter peer ranges excluded TypeScript 7, and the existing React, accessibility, and import lint plugins did not advertise ESLint 10 support. Recheck peer ranges and pin exact versions on the relevant branch.

## Handoff

- **Current:** `fix/catalog-api-contract`, cache isolation, request validation, and upstream failure handling.
- **Next, after approval and merge:** `fix/browser-catalog-flows`.
- **Open questions:** Which live and demo deployments should remain supported? Which browser versions or smart-TV devices need support? These affect production rollout and the styling upgrade, respectively.
