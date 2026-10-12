# taskflow-db

TaskFlow database repo — owns the **data model** (ADR-001). Part of a spec-driven, multi-repo demo:

| Repo | Role |
|------|------|
| [taskflow-spec](https://github.com/Sameer-Ahmed-S/taskflow-spec) | **Single source of truth**: requirements, contracts, ADRs |
| **taskflow-db** (this) | SQLite schema + migrations (ADR-005) |
| [taskflow-backend](https://github.com/Sameer-Ahmed-S/taskflow-backend) | Express API implementing the contract |
| [taskflow-frontend](https://github.com/Sameer-Ahmed-S/taskflow-frontend) | React SPA |

## Run locally

Nothing to run here — the database is an embedded SQLite file (`taskflow.db`) that the
**backend creates and migrates automatically at startup** from `migrations/` (ADR-005).
Just start the backend (`npm run dev` in `taskflow-backend`).

## Change process (SDD)

Schema changes start in the **spec** ([taskflow-spec](https://github.com/Sameer-Ahmed-S/taskflow-spec)), then land here as a new numbered migration (ADR-002). Never edit an applied migration — add a new one.
