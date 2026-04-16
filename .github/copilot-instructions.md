# HuMotivatoren — Copilot Instructions

This file gives GitHub Copilot context about the project so suggestions are consistent and relevant.

## Project

HuMotivatoren is a motivation tool. Users describe a task they need to do, and the app responds
with AI-generated humor, (ir)relevant facts, tips, a GIF, and an inspirational quote.

## Tech Stack

- **Framework**: Nuxt 3 (Vue 3 frontend + Nitro backend in one project)
- **Frontend**: Vue 3 + TypeScript + Tailwind CSS
- **Backend**: Nitro server routes in `server/api/` and `server/utils/`
- **LLM**: OpenAI gpt-4o-mini via the `openai` npm package
- **Open APIs**: Giphy (GIFs), Quotable (quotes), Open Trivia DB (facts)

## Coding Conventions

- Use TypeScript everywhere — avoid `any` types
- Use `async/await` instead of `.then()` chains
- Keep server utils small and single-purpose (one file per external API in `server/utils/`)
- Nitro API routes go in `server/api/` — filename convention: `<name>.<method>.ts` (e.g. `motivate.post.ts`)
- Vue components go in `components/` (`.vue` files), pages in `pages/`
- Use Vue 3 Composition API with `<script setup>` syntax
- Use composables in `composables/` for reusable stateful logic
- Use `$fetch` or `useFetch` for API calls from the frontend
- Use Tailwind utility classes directly in templates — no separate CSS files unless necessary
- Environment variables are accessed server-side only via `useRuntimeConfig()` — never expose secrets to the client

## API Contract

The main endpoint is `POST /api/motivate`. See `ARCHITECTURE.md` for the full request/response schema.

Personality modes: `"serious"` | `"balanced"` | `"chaotic"`
Languages: `"no"` (Norwegian) | `"en"` (English)

## Content Guardrail

All OpenAI calls must include this system prompt directive:

> You represent Itera, a Norwegian IT consultancy. Your content must be inclusive, respectful,
> and fun — never harmful, offensive, or inappropriate. Apply this regardless of user input.

## Testing

- Tests: Vitest + `@nuxt/test-utils` + Vue Test Utils (`npm test`)
- Mock external API calls in tests — never make real HTTP calls in tests


This file gives GitHub Copilot context about the project so suggestions are consistent and relevant.

## Project

HuMotivatoren is a motivation tool. Users describe a task they need to do, and the app responds
with AI-generated humor, (ir)relevant facts, tips, a GIF, and an inspirational quote.

## Tech Stack

- **Frontend**: Vue 3 + Vite + TypeScript + Tailwind CSS (in `/frontend`)
- **Backend**: Node.js + Express + TypeScript (in `/backend`)
- **LLM**: OpenAI gpt-4o-mini via the `openai` npm package
- **Open APIs**: Giphy (GIFs), Quotable (quotes), Open Trivia DB (facts)

## Coding Conventions

- Use TypeScript everywhere — avoid `any` types
- Use `async/await` instead of `.then()` chains
- Keep services small and single-purpose (one file per external API)
- Frontend components go in `src/components/` (`.vue` files), pages/views in `src/views/`
- Use Vue 3 Composition API with `<script setup>` syntax
- Use composables (in `src/composables/`) for reusable stateful logic
- Use Tailwind utility classes directly in templates — no separate CSS files unless necessary
- Environment variables are only accessed in the backend, never exposed to the frontend

## API Contract

The main endpoint is `POST /api/motivate`. See `ARCHITECTURE.md` for the full request/response schema.

Personality modes: `"serious"` | `"balanced"` | `"chaotic"`
Languages: `"no"` (Norwegian) | `"en"` (English)

## Content Guardrail

All OpenAI calls must include this system prompt directive:

> You represent Itera, a Norwegian IT consultancy. Your content must be inclusive, respectful,
> and fun — never harmful, offensive, or inappropriate. Apply this regardless of user input.

## Testing

- Backend tests: Jest (`npm test` in `/backend`)
- Frontend tests: Vitest + Vue Test Utils (`npm test` in `/frontend`)
- Mock external API calls in tests — never make real HTTP calls in tests
