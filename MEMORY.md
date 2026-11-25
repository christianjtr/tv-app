# TV App project memory

Keep this file concise: record verified facts, durable constraints, decisions with ADR links, and the current handoff. Update an existing entry when its status changes; keep the evidence for resolved findings. Do not include credentials, raw logs, or session transcripts.

## Baseline

- Source baseline: `master` at `bd8ab10` (release-pipeline security remediation, 2026-11-26). React/Vite browses, searches, and displays movie and TV details. Express reads from TMDB and caches mapped results in process. `packages/shared-types` holds the shared models. There is no database or account system.
- The initial audit was primarily static; a read-only Compose check rejected the dev wrapper's `--env-file .`. This branch verifies a clean root install, shared-types build, app/server suites, and Cypress; production Docker images remain unbuilt because the local daemon is unavailable.

## Open findings

| ID | Finding | Evidence |
|---|---|---|
| F03 | The dev Compose wrapper points at a directory and does not propagate failures. Production starts Nodemon and supplies browser config after the Vite build; the live image has no app-route fallback. | [Compose wrapper](scripts/runDockerComposeBuildUpWithEnvs.mjs), [server image](server/Dockerfile.prod), [client image](app/Dockerfile.prod), [client defaults](app/.env.local) |
| F04 | Movie and TV search and detail share cache keys; the first cached result can be returned by the other resource. | [Movie service](server/src/services/movie.services.ts), [TV service](server/src/services/tvshow.services.ts) |
| F05 | Route validation results are not checked. The API and browser parse upstream error responses as data, and the TMDB client has no explicit request deadline. | [Movie routes](server/src/routes/movie.route.ts), [TV routes](server/src/routes/tvshow.route.ts), [TMDB client](server/src/apis/tmdb/httpClient.ts), [browser movie client](app/src/services/apis/tv-app/movie.api.services.ts) |
| F06 | The movie API failure test and some hook assertions aren't awaited. Cypress search can pass against canned results that don't depend on the query. | [API test](server/__tests__/integration/movie.e2e.spec.ts), [hook test](app/__tests__/hooks/useFetchMovies.spec.ts), [browser test](app/cypress/e2e/SearchTVPrograms.cy.ts) |
| F07 | Search reads the URL query only on mount, and a slow detail response can overwrite a newer title. The document-level arrow handler can move focus out of text inputs or throw when no target exists. | [Search page](app/src/pages/Search.tsx), [detail hook](app/src/hooks/useFetchTVProgram.ts), [keyboard hook](app/src/hooks/useArrowNavigation.ts) |
| F08 | Seasons inherit the show's poster instead of using their own. A date-only value formatted in local time can display the previous month. | [TV mapper](server/src/entityMappers/tmdb/tvshow.entity.mapper.ts), [program card](app/src/components/TVProgamItem/TVProgramItem.tsx) |
| F09 | `npm ci` reports 26 dependency vulnerabilities (1 critical, 8 high, 16 moderate, 1 low); remediation is outside the workspace-consolidation scope. | Root `package-lock.json`; `npm ci` audit summary, 2026-11-26. |

## Resolved findings

| ID | Resolution | Evidence |
|---|---|---|
| F01 | The production env is no longer printed, image build/publish runs only on pushes to `master`, and root Docker context excludes env files except tracked `app/.env.local` to preserve existing build defaults. | Commit `bd8ab10`; [workflow](.github/workflows/deployment.yml), [Docker ignore](.dockerignore). |
| F02 | Node 26.13.1/npm 11.11.1 are pinned; app, server, and shared types use one root workspace lock; shared types are built explicitly and generated output is no longer tracked. The server's explicit `typeRoots` now includes the workspace-root typings directory. | This branch; [toolchain](.nvmrc), [workspace](package.json), [workflow](.github/workflows/deployment.yml), [server TS config](server/tsconfig.json); clean install, builds, and tests pass. Docker images remain unbuilt because the local Docker daemon is unavailable. |

## Decisions and proposed targets

- [ADR 0001](docs/adr/0001-sequential-modernization.md) records the maintainer review gate and branch sequence. Keep the existing architecture; use the current in-memory cache and test tools during remediation.
- **In this branch, installed and tested together:** Node 26.13.1/npm 11.11.1. **Still proposed:** TypeScript 6, ESLint 9 and typescript-eslint 8; Express 5 and Supertest 7; Vite 8 with React plugin 6, Jest 30, and Cypress 16; React 19 and React Router 7. Tailwind 4 and DaisyUI 5 depend on browser requirements.
- At planning time, the selected typescript-eslint and Jest adapter peer ranges excluded TypeScript 7, and the existing React, accessibility, and import lint plugins did not advertise ESLint 10 support. Recheck peer ranges and pin exact versions on the relevant branch.

## Handoff

- **Current:** `build/reproducible-workspaces`, aligning Node/npm and making workspace installs reproducible.
- **Next, after approval and merge:** `fix/production-containers`.
- **Open questions:** Which live and demo deployments should remain supported? Which browser versions or smart-TV devices need support? These affect production rollout and the styling upgrade, respectively.
