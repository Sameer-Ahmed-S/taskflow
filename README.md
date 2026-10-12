# TaskFlow (monorepo)

TaskFlow task management — **spec-driven development in a single repository**.
This is the monorepo variant of the multi-repo demo
([taskflow-spec](https://github.com/Sameer-Ahmed-S/taskflow-spec) +
[taskflow-db](https://github.com/Sameer-Ahmed-S/taskflow-db) +
[taskflow-backend](https://github.com/Sameer-Ahmed-S/taskflow-backend) +
[taskflow-frontend](https://github.com/Sameer-Ahmed-S/taskflow-frontend)).

## Layout

| Folder | Role |
|--------|------|
| [`spec/`](./spec) | **Single source of truth**: constitution, requirements, contracts, ADRs, per-feature specs (`spec/specs/00x-*`) |
| [`db/`](./db) | SQLite schema + migrations (ADR-005) |
| [`backend/`](./backend) | Express API implementing the contract |
| [`frontend/`](./frontend) | React SPA consuming the contract |

## SDD workflow here

Same pipeline as the multi-repo setup (see [`spec/SDD-WORKFLOW.md`](./spec/SDD-WORKFLOW.md)),
simplified by the monorepo:

1. `/speckit.specify` → `/speckit.clarify` → `/speckit.plan` → `/speckit.tasks` — artifacts land in `spec/specs/00x-*/`
2. **No spec syncing needed** — implementation folders read `spec/` directly
3. **One PR per feature** can span spec + db + backend + frontend (or split by folder if preferred)
4. Change order is still respected inside the PR: spec → db → backend → frontend (constitution Principle III)

## Run locally

```sh
cd backend  && npm install && npm run dev   # API on :4000 (auto-creates/migrates ../db/taskflow.db)
cd frontend && npm install && npm run dev   # UI on :5173
```

Note: the backend resolves the db path as `../taskflow-db/taskflow.db` by default.
In this monorepo, set `DATABASE_PATH=../db/taskflow.db` and `MIGRATIONS_DIR=../db/migrations`
(see `backend/.env.example`) or copy `.env.example` to `.env`.
