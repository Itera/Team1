# Test Plan — HuMotivatoren

## Scope

This plan covers automated tests for both applications in this repository:

- `frontend/` (Nuxt/Vue UI and composables)
- `backend/` (Express API and motivation service logic)

## Test setup

- Test runner: `vitest` from repository root
- Command: `npm test`
- Coverage command: `npm run test:coverage`
- Coverage report: terminal summary + `coverage/index.html`

## Frontend test cases

### Composable: `useMotivator`

1. **Submit availability**
   - `canSubmit` is `false` when task is empty
   - `canSubmit` is `false` when motivator is missing
   - `canSubmit` is `true` when task and motivator are set
2. **Successful submit flow**
   - Loading state is enabled during request
   - API response is stored in `result`
   - Loading state resets after completion
3. **Failure flow**
   - API errors reset loading
   - Error message is set from thrown `Error`
   - Non-`Error` failures fall back to default message
   - Guard clause prevents submit when input is invalid

### Components

4. **`MotivatorPicker`**
   - Emits selected motivator on click
   - Applies selected state styling only to active motivator
5. **`MotivatorCard`**
   - Always renders `motivationalMessage`
   - Renders all optional sections when data exists
   - Hides optional sections when data is missing

### Page: `pages/index.vue`

6. **Main flow behavior**
   - Submit button disabled/enabled based on `canSubmit`
   - Button label changes in loading state
   - Result card hidden when no result exists
   - Result card rendered after successful result

## Backend test cases

### API routes: `backend/src/app.ts`

7. **Health check**
   - `GET /health` returns `200` with `{ status: "ok" }`
8. **Request validation**
   - `POST /api/motivate` returns `400` for invalid body
9. **Defaulting behavior**
   - Missing `language` and `contentTypes` use schema defaults
10. **Unknown motivator handling**
    - Returns `400` when motivator is unsupported

### Service: `backend/src/services/motivation.ts`

11. **Valid motivation generation**
    - Returns expected structure for valid input
12. **Content filtering**
    - Omits optional fields when their content types are not requested
13. **Unknown motivator failure**
    - Throws expected error for invalid motivator ID

## Non-goals for this test plan

- E2E browser testing
- External API integration tests (OpenAI/Giphy/Quote/Trivia)
- Performance/load testing
