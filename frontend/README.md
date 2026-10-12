# taskflow-frontend

TaskFlow UI — React (Vite). **Consumes** the API contract only; never talks to the DB (ADR-001).

| Repo | Role |
|------|------|
| [taskflow-spec](https://github.com/Sameer-Ahmed-S/taskflow-spec) | **Single source of truth**: requirements, contracts, ADRs |
| [taskflow-db](https://github.com/Sameer-Ahmed-S/taskflow-db) | Postgres schema + migrations |
| [taskflow-backend](https://github.com/Sameer-Ahmed-S/taskflow-backend) | Express API implementing the contract |
| **taskflow-frontend** (this) | React SPA |

The contract this app implements against: [`contracts/tasks-api.yaml`](https://github.com/Sameer-Ahmed-S/taskflow-spec/blob/main/contracts/tasks-api.yaml) in [taskflow-spec](https://github.com/Sameer-Ahmed-S/taskflow-spec).

## Run locally

```sh
cp .env.example .env   # points at the backend on :4000
npm install
npm run dev            # http://localhost:5173
```

Requires `taskflow-db` and `taskflow-backend` running.

## Change process (SDD)

UI behavior derives from the spec. Contract changes land in the backend repo first (ADR-002); this repo only updates `src/api.js` and the affected components afterward.
