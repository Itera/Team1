# Contributing — HuMotivatoren

Welcome! This project is built by a team of 5 during a hackathon. Everyone should open
**at least one PR** with something they've developed (ideally with AI assistance 🤖).

---

## Git Workflow

### Branch Naming

```
<type>/<short-description>
```

| Type       | When to use                                      |
|------------|--------------------------------------------------|
| `feat/`    | New feature (e.g. `feat/giphy-integration`)      |
| `fix/`     | Bug fix (e.g. `fix/openai-timeout`)              |
| `docs/`    | Documentation only (e.g. `docs/project-plan`)   |
| `test/`    | Tests only (e.g. `test/motivate-route`)         |
| `chore/`   | Config, tooling, dependencies                    |

### Commit Messages

Keep them short and descriptive. Use imperative mood:

```
Add Giphy service with search term support
Fix OpenAI timeout handling
Update README with local run instructions
```

### PR Process

1. Create your branch from `main`
2. Make your changes
3. Run the relevant local checks before pushing: `npm run build` and any workspace tests that exist
4. Open a PR with a short description of what you did and why
5. Request review from at least one teammate
6. Merge after approval — use **Squash and merge** to keep history clean

---

## Environment variables

No third-party API keys are required for the current scaffold.

### Configure locally
```bash
cp .env.example .env
# Adjust values if the backend needs local configuration
```

> ⚠️ **Never commit your `.env` file.** It is in `.gitignore`. Only `.env.example` is committed.

---

## PR Checklist

Before opening your PR, make sure:

- [ ] Code runs locally without errors
- [ ] `npm run build` passes
- [ ] Any relevant tests pass
- [ ] No secrets or API keys are committed
- [ ] The PR description explains what was built and how to test it
- [ ] If you added a new env var, update `.env.example`

---

## Suggested Work Areas

Each person should own one of these areas:

| Area | Branch name suggestion |
|------|------------------------|
| Backend: API routes and request handling | `feat/backend-routes` |
| Backend: external service integrations | `feat/backend-services` |
| Frontend: app shell and views | `feat/frontend-shell` |
| Frontend: reusable components and composables | `feat/frontend-components` |
| Tests, QA, and demo polish | `feat/tests-and-polish` |

---

## Tips

- Use **GitHub Copilot** to generate code — that's the point! 🎯
- If you're stuck, ask a teammate or ask Copilot to explain the codebase
- Focus on getting *something* working and demonstrable — perfection is not the goal
- The `.github/copilot-instructions.md` file gives Copilot context about the project
