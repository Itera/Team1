# 🎉 HuMotivatoren

> Når du trenger inspirasjon og arbeidslyst — HuMotivatoren hjelper deg!

You tell it what you need to do. It responds with (ir)relevant facts, humor, visuals, and tips to get you fired up. Looks professional. Has personality.

---

## 🚀 Use Cases

- _"Jeg bør lese nyhetene og trenger inspirasjon"_
- _"Ragulan vil jeg skal spille fotball, jeg trenger inspirasjon"_
- _"Jeg er på hackathon med avdelingen og trenger inspirasjon"_

---

## 🏗️ Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Framework | Nuxt 3 (Vue 3 + Nitro)            |
| Frontend | Vue 3 + TypeScript + Tailwind CSS  |
| Backend  | Nitro server routes (built into Nuxt 3) |
| LLM      | OpenAI gpt-4o-mini                  |
| APIs     | Giphy, Quotable, Open Trivia DB     |

See [ARCHITECTURE.md](./ARCHITECTURE.md) for full details.

---

## 🔨 Current State

The **frontend shell** is in place — you can run the app and see the full UI (heading, character, task input, motivator picker). The backend API route (`POST /api/motivate`) is not yet implemented, so submitting a task will return an error until that work is done.

---

## ⚡ Getting Started

### Prerequisites
- Node.js v20+
- npm v10+

API keys are only needed once the backend is implemented:
- OpenAI API key — [platform.openai.com](https://platform.openai.com)
- Giphy API key — [developers.giphy.com](https://developers.giphy.com)

### 1. Clone the repo
```bash
git clone https://github.com/Itera/Team1.git
cd Team1
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables _(skip until backend is ready)_
```bash
cp .env.example .env
# Edit .env and fill in your API keys
```

### 4. Run locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
Frontend and backend run together — no separate terminals needed!

### 5. Adding a motivator

Open `config/motivators.ts` and add an entry to the `motivators` array:
```ts
{ id: 'new-person', name: 'New Person', description: 'Short tagline' }
```
That's it — the picker renders from this list automatically.

---

## 👥 Team

| Person | Area |
|--------|------|
| TBD    | Backend: OpenAI service + `/api/motivate` route |
| TBD    | Backend: Giphy, Quotable, Open Trivia integrations |
| TBD    | Frontend: Main motivator view + MotivatorCard |
| TBD    | Frontend: Settings panel + personality modes |
| TBD    | Tests + demo polish |

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the Git workflow and PR process.

---

## 🎯 Demo

The app is designed for a **2-minute demo on a large screen**:
1. Open the app full-screen
2. Type a task (e.g. "read the news")
3. Select a personality mode (try **Chaotic Gremlin 👹**)
4. Hit Motivate and enjoy

---

## 🏷️ Itera Values

All AI-generated content is governed by a system prompt that enforces Itera's values.
Content is filtered to be fun and inclusive — never harmful or offensive.
