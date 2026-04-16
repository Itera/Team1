# Architecture — HuMotivatoren

## Overview

HuMotivatoren currently uses a split monorepo structure:

- `frontend/` holds the Vue 3 application shell.
- `backend/` holds the Express server shell.
- The repo root coordinates both workspaces through npm scripts.

This pass intentionally stops at infrastructure. No business routes, external service integrations, or feature UI flows have been implemented yet.

## Current runtime

```text
Browser
  |
  v
frontend/ (Vite + Vue 3)

backend/ (Express + TypeScript)
  └── GET /health
```

The frontend is a placeholder screen only. The backend exposes a health endpoint and an empty `/api` router so future feature work has a clean starting point.

## Folder structure

```text
.
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── views/
│   │   │   └── HomeView.vue
│   │   ├── App.vue
│   │   └── main.ts
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── index.ts
│   │   ├── services/
│   │   ├── app.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── .env.example
├── package.json
├── README.md
└── CONTRIBUTING.md
```

## Decisions in this scaffold

| Decision | Choice | Reason |
| --- | --- | --- |
| Frontend | Vue 3 + Vite + TypeScript | Fast setup with Composition API defaults |
| Styling | Tailwind CSS | Ready for utility-first UI work without extra setup later |
| Backend | Express + TypeScript | Simple HTTP shell for upcoming API routes |
| Workspace | npm workspaces | One install and shared root scripts |

## Deliberately not implemented

- `POST /api/motivate`
- OpenAI, Giphy, quote, or trivia integrations
- Feature-specific components, forms, or composables
- Persistence, auth, or deployment setup
