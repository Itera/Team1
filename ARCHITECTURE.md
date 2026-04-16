# Architecture — HuMotivatoren

## Overview

HuMotivatoren is a split full-stack application inside one npm workspace.

- `frontend/` contains the Nuxt 3 user interface
- `backend/` contains the Express API
- the repo root orchestrates both via npm workspace scripts

## Runtime Flow

```text
Browser
  -> frontend (Nuxt 3 on :3000)
  -> POST http://127.0.0.1:4000/api/motivate
  -> backend (Express on :4000)
  -> structured motivation response
  -> frontend renders MotivatorCard
```

## Folder Structure

```text
Team1/
├── frontend/
│   ├── app.vue
│   ├── assets/css/main.css
│   ├── components/
│   │   ├── MotivatorCard.vue
│   │   └── MotivatorPicker.vue
│   ├── composables/useMotivator.ts
│   ├── config/motivators.ts
│   ├── pages/index.vue
│   ├── public/face.svg
│   ├── nuxt.config.ts
│   ├── tsconfig.json
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── app.ts
│   │   ├── index.ts
│   │   ├── config/motivators.ts
│   │   ├── services/motivation.ts
│   │   └── types.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── package.json
├── README.md
├── ARCHITECTURE.md
└── CONTRIBUTING.md
```

## API Contract

### `POST /api/motivate`

Request body:

```json
{
  "task": "read the news",
  "motivator": "oystein",
  "language": "no",
  "contentTypes": ["humor", "facts", "quotes"]
}
```

| Field | Type | Values |
|-------|------|--------|
| `task` | string | Free text |
| `motivator` | string | `"oystein"` or `"jon"` |
| `language` | string | `"no"` or `"en"` |
| `contentTypes` | string[] | any of `"humor"`, `"facts"`, `"quotes"` |

Response body:

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

## Current Backend Behavior

The backend validates incoming requests and returns a local fallback motivation package. This keeps the frontend and backend integration runnable before external services are added.

Planned follow-up integrations:

- OpenAI for generated motivation text
- Giphy for dynamic GIF lookup
- Quotable for quotes
- Open Trivia DB for facts

## Motivator Personas

The frontend and backend both use motivator IDs.

Current supported motivators:

- `oystein`
- `jon`

When adding a new motivator, update both:

- `frontend/config/motivators.ts`
- `backend/src/config/motivators.ts`

## Environment Variables

Environment variables belong to the backend only.

Example file:

- `backend/.env.example`

Relevant variables today:

- `PORT`
- `FRONTEND_ORIGIN`
- `OPENAI_API_KEY`
- `GIPHY_API_KEY`
