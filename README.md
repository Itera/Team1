# HuMotivatoren

> Nar du trenger inspirasjon og arbeidslyst - HuMotivatoren hjelper deg.

This repository is now initialized as a split frontend/backend monorepo. It currently contains only the application scaffold, with no product features, API integrations, or `/api/motivate` implementation yet.

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | Vue 3 + Vite + TypeScript + Tailwind CSS |
| Backend | Node.js + Express + TypeScript |
| Workspace | npm workspaces |

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the current repo layout.

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start both apps:
   ```bash
   npm run dev
   ```

Frontend runs on [http://localhost:5173](http://localhost:5173). The backend health endpoint runs on [http://localhost:4000/health](http://localhost:4000/health).

## Repo structure

```text
.
├── frontend/   # Vue app shell
├── backend/    # Express server shell
├── README.md
├── ARCHITECTURE.md
└── CONTRIBUTING.md
```

## Current status

- `frontend/` contains a thin Vue app shell and placeholder view.
- `backend/` contains server bootstrap and an empty API router.
- Shared root scripts can run or build both workspaces together.
