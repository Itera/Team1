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
| Frontend | Vue 3 + Vite + TypeScript + Tailwind CSS |
| Backend  | Node.js + Express + TypeScript      |
| LLM      | OpenAI gpt-4o-mini                  |
| APIs     | Giphy, Quotable, Open Trivia DB     |

See [ARCHITECTURE.md](./ARCHITECTURE.md) for full details.

---

## ⚡ Getting Started

### Prerequisites
- Node.js v20+
- npm v9+
- OpenAI API key (get one at [platform.openai.com](https://platform.openai.com))
- Giphy API key (get one at [developers.giphy.com](https://developers.giphy.com))

### 1. Clone the repo
```bash
git clone https://github.com/Itera/Team1.git
cd Team1
```

### 2. Configure environment variables
```bash
cp .env.example backend/.env
# Edit backend/.env and fill in your API keys
```

### 3. Install dependencies
```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 4. Run locally
```bash
# In one terminal — start backend (runs on http://localhost:3001)
cd backend && npm run dev

# In another terminal — start frontend (runs on http://localhost:5173)
cd frontend && npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

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
