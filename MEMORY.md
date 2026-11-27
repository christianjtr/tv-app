# TV App project memory

Keep this file concise: record verified facts, durable constraints, decisions with ADR links, and the current handoff. Update an existing entry when its status changes; keep the evidence for resolved findings. Do not include credentials, raw logs, or session transcripts.

## Baseline

- Source baseline: commit `8265cfd` (catalog API contract remediation, 2026-11-26). React/Vite browses, searches, and displays movie and TV details. Express reads from TMDB and caches mapped results in process. `packages/shared-types` holds the shared models. There is no database or account system.
- The initial audit was primarily static; a read-only Compose check rejected the dev wrapper's `--env-file .`. The workspace scope verified clean install, shared-types build, app/server suites, and Cypress. Production images and SPA deep links were later verified locally with placeholder configuration. This branch's browser flows passed against compiled Express with a fixture-backed TMDB stub.

## Open findings

| ID | Finding | Evidence |
|---|---|---|
| F17 | GitHub's separate security alert count/details remain unverified because the CLI session is unauthenticated; the prior default-branch push notice reported 10 findings. | `gh` authentication unavailable during the November 2026 audit. |

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
| F12 | ESLint and Prettier were removed from both workspaces in favor of Biome 2.6.9; app/server lint, builds, unit suites, and Cypress pass. Biome's unresolved-import rule is disabled because it misresolves existing module formats and asset declarations; TypeScript and bundler builds remain the resolution checks. | `package.json`, `app/package.json`, `server/package.json`, `biome.jsonc`; all listed checks passed on `build/biomejs-migration`. |
| F09 | Aligned Jest, Babel-Jest, Jest's jsdom environment, and Jest types on 29.x; removed unused or misplaced dependencies that pulled in vulnerable Jest 30/glob paths. Both full and production-only npm audits now report 0 vulnerabilities. | Root and workspace manifests plus `package-lock.json`; clean `npm ci`, Jest suites, and npm 11.20.0 audits passed on `fix/dev-audit-remediation`, 2026-11-27. |
| F16 | Replaced the server Rollup build with esbuild 0.28.2 while retaining an explicit TypeScript check and Node CommonJS bundle output. | Merged in PR #18 at `d940f9d`; server build/tests, Cypress, production Docker image build, and container `/api/docs/` smoke test passed. |
| F11 | The Glide core CSS path issue no longer applies because Glide was removed when the carousel moved to Embla. | Current branch: `app/package.json`, `app/src/main.tsx`; production build passes. |
| F06 | Hook tests now await async assertions and explicitly verify failed requests settle into error state instead of rejecting outside React. | `app/__tests__/hooks/useFetchMovies.spec.ts`; client tests passed, merged in PR #21 at `69a30d1`. |
| F18 | GitHub Pages direct visits and refreshes now load the SPA and restore the requested route. | PR #20 at `b6eda32`; Chrome loaded `/tv-app/search?query=Game%20of%20Thrones` after the 404 fallback redirected through the site root, 2026-11-27. |
| F19 | Active trending, search, and detail flows now retain request failures as state and show an accessible alert instead of misreporting an empty result or blank detail page. | Hook/component tests and Cypress search/detail failure scenarios passed, merged in PR #21 at `69a30d1`. |
| F20 | Detail page identifies TV programs from the route, not nonzero episode/season counts, so announced shows are not rendered as movies. | Cypress case for a TV show with zero seasons and episodes passes; merged in PR #22 at `a7e966c`. |
| F10 | Pull requests now run CI regardless of changed paths, including docs-only changes; the workflow validates syntax, lints both apps, builds both clients and server, and runs unit/E2E tests. | Merged in PR #23 at `af56141`; actionlint 1.7.12 and local CI-equivalent checks passed. |
| F13 | Cypress E2E now runs in installed Chrome instead of deprecated Electron. | Merged in PR #23 at `af56141`; 10 E2E tests passed in headless Chrome 158. |
| F22 | Cache TTL now defaults to a finite value, rejects invalid values, caps entries at 500, skips storage when full, and logs keys without response payloads. | Merged in PR #24 at `8c34c95`; cache tests, server build/tests, and Cypress passed. |
| F21 | Dependency and GitHub Action versions will be reviewed manually; no bot or immutable SHA pins for now. Revisit if update volume or security requirements change. | Maintainer-confirmed policy recorded in [ADR 0002](docs/adr/0002-toolchain-readiness-before-stage-3.md), 2026-11-27. |
| F23 | Arrow navigation moves spatially across the header, rails, and grids while skipping hidden/disabled items; poster rails now loop horizontally, with wrapping kept local to each rail. | PR #27 at `c355651` established spatial navigation; this branch adds rail-loop tests and a Home navigation E2E assertion. |

## Decisions and proposed targets

- [ADR 0001](docs/adr/0001-sequential-modernization.md) records the maintainer review gate and branch sequence, including creating every task branch from the latest `origin/main`, keeping task commits off `main`, reconciling accidental direct commits before proceeding, and deleting merged local/remote topic branches.
- [ADR 0002](docs/adr/0002-toolchain-readiness-before-stage-3.md) records the accepted Stage 2 gate; the required toolchain work is complete, and Stage 3 UX work may now proceed one reviewed scope at a time.
- **Carousel prototype (maintainer-authorized on the home redesign branch):** replace Glide with Embla 8.6.0; the hero uses Fade and 10-second Autoplay, and poster rails use looped spring scrolling. Swiper is excluded. Motion/autoplay are disabled for reduced-motion preference. Final adoption awaits review.
- **Deployment direction:** on trusted default-branch pushes, build the live frontend for `/tv-app` against `https://tv-app-nodejs-latest.onrender.com/api` and publish only its static output to `demo`; build and push only the backend Docker image to Docker Hub.
- **Merged at `609de49`:** Node 26.13.1/npm 11.20.0, aligned with the official Docker image. The workstation npm shim was 11.11.1. **Selected:** scope 7 uses Express 5.3.0/Supertest 7.3.2; scope 8 uses Vite 8.4.0/plugin-react 6.3.0, Jest 30.5.2, and Cypress 16.4.0 in separate commits; scope 9 uses React/ReactDOM 19.3.1 and React Router 7.18.7; scope 10 uses Tailwind 4.3.5, DaisyUI 5.8.3, and @tailwindcss/vite 4.3.5.
- **Maintainer-confirmed browser baseline for scope 10:** Chrome 111+, Safari 16.4+, Firefox 128+. Older browsers and smart-TV browser compatibility are not promised by this upgrade.
- **Post-sequence stages:** Stage 1 dependency vulnerability mitigation and Stage 2 toolchain readiness are complete. Stage 3 product experience improvements proceed one reviewed branch at a time.
- At planning time, the selected typescript-eslint and Jest adapter peer ranges excluded TypeScript 7, and the existing React, accessibility, and import lint plugins did not advertise ESLint 10 support. Recheck peer ranges and pin exact versions on the relevant branch.
- **Maintainer direction for scope 6:** finish the ESLint 9 flat-config migration despite its unsupported status; BiomeJS was explicitly a separate Stage 2 effort.

## Handoff

- **Current:** `feat/home-experience-redesign`, based on `origin/main` at `c355651`; refreshes the shared header, Home/Search scenes, poster rails, and TV season cards. Embla rails loop smoothly with the focused poster image emphasized at the first slot; no floating focus border. Card overlays remain title-only. Hero/Detail imagery stays edge-to-edge with blurred/inset shadows.
- **Checks:** app lint, 10 unit suites/30 tests, production build, desktop/mobile previews, rail-transition/wrap and D-pad focus spot-checks, title-only card tests, and Lighthouse Accessibility 100 for Home, Search, and Detail passed. Chrome Cypress has not passed after the dependency change: the existing Vite server on port 3000 reports `504 Outdated Optimize Dep`.
- **Next:** rerun Chrome Cypress with a clean Vite server, then maintainer review of the expanded Home/Search/Detail experience.
- **Open questions:** What product goals and user journeys should guide Stage 3 experience work?
