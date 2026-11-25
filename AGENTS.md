# Working in TV App

- Before editing, read [MEMORY.md](MEMORY.md) and [ADR 0001](docs/adr/0001-sequential-modernization.md). Check the current branch, working tree, and approved scope. If approval or merge status is unclear, ask rather than starting the next branch.
- Work on one approved scope at a time. Keep unrelated fixes out of the diff. If a discovery changes the agreed scope, version target, or compatibility requirements, surface it to the maintainer before proceeding.
- In the same PR, update `MEMORY.md` when a verified finding, constraint, decision, or handoff changes. Update the existing entry rather than duplicating it. Mark resolved findings with evidence (a test, commit, or PR). Link to ADRs for decisions; don't copy them into memory. State explicitly when no durable knowledge changed.
- At handoff, report the branch, scope, checks run and their results, checks skipped, and remaining risks. Stop for maintainer review. Do not approve, merge, or manually deploy on the maintainer's behalf. Start the next branch only after the current PR is approved and merged and the maintainer authorizes the next effort.
