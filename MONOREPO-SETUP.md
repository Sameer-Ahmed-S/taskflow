# TaskFlow Monorepo — From-Scratch Setup with GitHub spec-kit (VS Code)

Complete recipe to recreate this monorepo SDD setup yourself, using spec-kit from
VS Code Copilot Chat.

> **Convention used throughout:** each speckit step shows the slash command first.
> If it doesn't autocomplete, use the **fallback**: type the plain-English form
> *"Use the speckit-\<name\> skill to …"* in Agent mode. Details of how the
> fallback works are in Step 6 — the same pattern applies to every later step.

---

## Step 0 — Prerequisites (one-time)

```powershell
winget install --id Python.Python.3.13 --silent
# restart the terminal, then:
pip install specify-cli
specify version    # verify
```

Requires: VS Code + GitHub Copilot Chat extension (signed in), git, gh CLI, Node.js.

## Step 1 — Create the repo skeleton

```powershell
gh repo create <you>/taskflow --public
mkdir C:\dev\taskflow; cd C:\dev\taskflow
git init -b main
mkdir spec, db\migrations, backend\src, frontend\src
```

## Step 2 — Bootstrap spec-kit at the repo ROOT

```powershell
cd C:\dev\taskflow
specify init --here --force --non-interactive --integration copilot
```

Creates `.specify/` + `.github/skills/speckit-*` at root — **one copy only**.
Do NOT run it inside subfolders.

## Step 3 — Write the constitution

Create/edit `.specify/memory/constitution.md` with your project rules. Example
principles: spec-first (non-negotiable), contract-first (OpenAPI in
`spec/contracts/`), change order spec → db → backend → frontend, server-side
IDs/timestamps. Every speckit command reads this file.

## Step 4 — Commit the foundation

```powershell
git add -A
git commit -m "Bootstrap: spec-kit + constitution"
git remote add origin https://github.com/<you>/taskflow.git
git push -u origin main
```

## Step 5 — Open in VS Code

`File → Open Folder → C:\dev\taskflow` (the ROOT, not a subfolder), then open
Copilot Chat with **Ctrl+Alt+I** and switch to **Agent mode** (dropdown at the
bottom of the chat input). Agent mode is required — Ask mode cannot create
files or run scripts.

## Step 6 — Specify the first feature

In Copilot Chat:

```
/speckit.specify Core task management: users create, list, update, complete,
and delete tasks. Task = id, title, description, status (todo/in_progress/done),
timestamps. UI shows a 3-column status board.
```

### Fallback (no autocomplete) — detailed walkthrough

Skills are instruction files under `.github/skills/speckit-*/SKILL.md`; the agent
loads one when your message names it. To trigger `speckit-specify` without a
slash command:

1. Confirm you're in **Agent mode** (Step 5).
2. Type exactly:
   ```
   Use the speckit-specify skill to create a feature spec for: Core task
   management — users can create, list, update, complete, and delete tasks.
   A task has id, title, description, status (todo/in_progress/done), and
   timestamps. The UI shows a 3-column status board.
   ```
3. **Approve the permission prompts** as they appear:
   | Prompt | What it does | Action |
   |---|---|---|
   | Run `create-new-feature.ps1`? | spec-kit script creating branch `001-<name>` + folder `spec/specs/001-<name>/` | Allow |
   | Write `spec.md`? | Generates the spec from the template | Allow |

   (Dropdown on **Allow** → "Always allow" reduces prompts for the session.)
4. **Verify the output** in Explorer:
   ```
   spec/specs/001-core-tasks/
   └── spec.md
   ```
   `git status` should show a new branch + untracked spec files. If the agent
   only *described* a spec without creating files, reply:
   **"You haven't created the files — follow the skill's procedure and write them now."**

### Troubleshooting
- "No such skill" → check `.github/skills/speckit-specify/SKILL.md` exists at the
  repo root and you opened the ROOT folder.
- No prompts, nothing happens → you're in Ask mode; switch to Agent mode.
- Skills need a recent VS Code (1.105+) — check Help → About and update.

## Step 7 — Clarify → Plan → Tasks (same chat)

```
/speckit.clarify
```
Fallback: `Use the speckit-clarify skill to review the spec in spec/specs/001-core-tasks/`

```
/speckit.plan Monorepo: db/ = SQLite migrations, backend/ = Express API,
frontend/ = React+Vite. Contract-first via spec/contracts/tasks-api.yaml.
```
Fallback: `Use the speckit-plan skill to create the implementation plan. Monorepo: db/ = SQLite migrations, backend/ = Express API, frontend/ = React+Vite`

```
/speckit.tasks Tag tasks per folder: [db], [backend], [frontend]
```
Fallback: `Use the speckit-tasks skill to generate tasks tagged per folder: [db], [backend], [frontend]`

## Step 8 — Implement

Monorepo advantage: one agent sees all folders.

```
/speckit.implement
```
Fallback: `Use the speckit-implement skill to execute the tasks in spec/specs/001-core-tasks/tasks.md`

Or per folder, respecting change order: *"Execute only [db] tasks"*, then
`[backend]`, then `[frontend]`.

## Step 9 — Commit + PR

```powershell
git checkout -b feature/000-core-tasks   # (speckit may create the branch itself)
git add -A; git commit -m "Feature 000: core task management"
git push -u origin feature/000-core-tasks
gh pr create --title "Feature 000: core task management"
```

## Step 10 — Run it

```powershell
cd backend;  npm install; npm run dev    # API on :4000 (auto-migrates ../db)
cd frontend; npm install; npm run dev    # UI on :5173
```

Repeat Steps 6–9 for each new feature (`001`, `002`, …).

---

## Key differences from the multi-repo setup

| Aspect | Multi-repo | This monorepo |
|---|---|---|
| `specify init` | once per repo (4×) | once, at root |
| Spec sync step | copy snapshots per repo | not needed — all folders read `spec/` directly |
| PRs per feature | 4 (one per repo) | 1 spanning folders |
| Agent context | artifacts only | full codebase visible |
