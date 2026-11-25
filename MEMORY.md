# TV App project memory

Keep this file concise: record verified facts, durable constraints, decisions with ADR links, and the current handoff. Update an existing entry when its status changes; keep the evidence for resolved findings. Do not include credentials, raw logs, or session transcripts.

## Baseline

- Source baseline: `master` at `44386c0` (`Fix responsiveness`, 2024-04-02). React/Vite browses, searches, and displays movie and TV details. Express reads from TMDB and caches mapped results in process. `packages/shared-types` holds the shared models. There is no database or account system.
- The audit was primarily static. A read-only Compose check rejected the dev wrapper's `--env-file .`; production Compose configuration parsed with placeholder values. No dependency install, test suite, production image build, or live deployment was verified.

## Open findings

| ID | Finding | Evidence |
|---|---|---|
| F01 | The publish job prints the generated production env file, is not restricted to trusted pushes, and uses a root Docker context without a root ignore file. No credential exposure has been established. | [Workflow](.github/workflows/deployment.yml), [production Compose](docker-compose.prod.yml) |
| F02 | CI and Docker pin Node 16, but the locked Vite 5.1.5 requires Node 18 or 20+. The root install invokes separate nested installs, and shared build output is tracked. | [Workflow](.github/workflows/deployment.yml), [root package](package.json), [app lockfile](app/package-lock.json) |
| F03 | The dev Compose wrapper points at a directory and does not propagate failures. Production starts Nodemon and supplies browser config after the Vite build; the live image has no app-route fallback. | [Compose wrapper](scripts/runDockerComposeBuildUpWithEnvs.mjs), [server image](server/Dockerfile.prod), [client image](app/Dockerfile.prod), [client defaults](app/.env.local) |
| F04 | Movie and TV search and detail share cache keys; the first cached result can be returned by the other resource. | [Movie service](server/src/services/movie.services.ts), [TV service](server/src/services/tvshow.services.ts) |
| F05 | Route validation results are not checked. The API and browser parse upstream error responses as data, and the TMDB client has no explicit request deadline. | [Movie routes](server/src/routes/movie.route.ts), [TV routes](server/src/routes/tvshow.route.ts), [TMDB client](server/src/apis/tmdb/httpClient.ts), [browser movie client](app/src/services/apis/tv-app/movie.api.services.ts) |
| F06 | The movie API failure test and some hook assertions aren't awaited. Cypress search can pass against canned results that don't depend on the query. | [API test](server/__tests__/integration/movie.e2e.spec.ts), [hook test](app/__tests__/hooks/useFetchMovies.spec.ts), [browser test](app/cypress/e2e/SearchTVPrograms.cy.ts) |
| F07 | Search reads the URL query only on mount, and a slow detail response can overwrite a newer title. The document-level arrow handler can move focus out of text inputs or throw when no target exists. | [Search page](app/src/pages/Search.tsx), [detail hook](app/src/hooks/useFetchTVProgram.ts), [keyboard hook](app/src/hooks/useArrowNavigation.ts) |
| F08 | Seasons inherit the show's poster instead of using their own. A date-only value formatted in local time can display the previous month. | [TV mapper](server/src/entityMappers/tmdb/tvshow.entity.mapper.ts), [program card](app/src/components/TVProgamItem/TVProgramItem.tsx) |

## Decisions and proposed targets

- [ADR 0001](docs/adr/0001-sequential-modernization.md) records the maintainer review gate and branch sequence. Keep the existing architecture; use the current in-memory cache and test tools during remediation.
- **Proposed, not installed or tested together:** Node 26 LTS with pinned npm 11; TypeScript 6, ESLint 9 and typescript-eslint 8; Express 5 and Supertest 7; Vite 8 with React plugin 6, Jest 30, and Cypress 16; React 19 and React Router 7. Tailwind 4 and DaisyUI 5 depend on browser requirements.
- At planning time, the selected typescript-eslint and Jest adapter peer ranges excluded TypeScript 7, and the existing React, accessibility, and import lint plugins did not advertise ESLint 10 support. Recheck peer ranges and pin exact versions on the relevant branch.

## Handoff

- **Current:** `docs/modernization-workflow`, documentation only, awaiting maintainer review.
- **Next, after approval and merge:** `fix/secure-release-pipeline`, pending maintainer authorization.
- **Open questions:** Which live and demo deployments should remain supported? Which browser versions or smart-TV devices need support? These affect production rollout and the styling upgrade, respectively.
