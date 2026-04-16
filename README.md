# HuMotivatoren

HuMotivatoren is a motivation tool. Users describe a task they need to do, and the app responds with humor, facts, tips, a GIF, and a short motivational quote.

## Structure

The repository is split into two applications:

- `frontend/`: Nuxt 3, Vue 3, TypeScript, Tailwind CSS
- `backend/`: Node.js, Express, TypeScript

The repo root contains npm workspace scripts for running both sides together.

## Current State

The frontend is wired to the backend and the end-to-end flow works.

The backend currently returns a validated fallback motivation package so the app can be run and demoed without external API keys. OpenAI, Giphy, quote, and fact integrations can be added on top of this structure later.

## Getting Started

### Prerequisites

- Node.js v20+
- npm v10+

### Install dependencies

```bash
npm install
```

### Configure environment variables

```bash
cp backend/.env.example backend/.env
```

`backend/.env` is optional for the current fallback implementation, but this is where API keys belong once external integrations are added.

### Run locally

```bash
npm run dev
```

This starts:

- frontend on `http://localhost:3000`
- backend on `http://127.0.0.1:4000`

You can also run them separately:

```bash
npm run dev:frontend
npm run dev:backend
```

### Build

```bash
npm run build
```

## Testing

### Test setup

Install dependencies once at the repo root:

```bash
npm install
```

Tests run with Vitest from the root workspace.

### Run tests

Run all frontend and backend tests:

```bash
npm test
```

Run coverage (text output + HTML report):

```bash
npm run test:coverage
```

Coverage report output:

- terminal summary in the command output
- HTML report in `coverage/index.html`

### What is covered

- **Frontend**: page flow, composable state handling, and component rendering/interaction
- **Backend**: API route validation/default behavior and motivation service generation rules

See `/TEST_PLAN.md` for detailed test cases and coverage scope.

## Frontend Contract

The frontend sends:

```json
{
  "task": "read the news",
  "motivator": "oystein",
  "language": "no",
  "contentTypes": ["humor", "facts", "quotes"]
}
```

The backend responds with:

```json
{
  "motivationalMessage": "Du klarer dette.",
  "funFact": "...",
  "tip": "...",
  "quote": {
    "content": "...",
    "author": "HuMotivatoren"
  },
  "gifUrl": "https://..."
}
```

## Motivators

The current motivator list lives in `frontend/config/motivators.ts`.

To add a new motivator:

1. Add it to `frontend/config/motivators.ts`
2. Add the backend profile in `backend/src/config/motivators.ts`

## Development Notes

- Frontend-to-backend communication uses `NUXT_PUBLIC_API_BASE`, defaulting to `http://127.0.0.1:4000`
- Backend health check: `GET /health`
- Main API route: `POST /api/motivate`

See `ARCHITECTURE.md` for the project layout and API details.
