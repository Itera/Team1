# Architecture — HuMotivatoren

## Overview

HuMotivatoren is a full-stack web application with a React frontend and a Node.js/Express backend.
The backend orchestrates calls to OpenAI and open APIs, then returns a structured "motivation package"
to the frontend for display.

```
┌────────────────────────────────────────────────────────┐
│                     BROWSER                            │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │              React Frontend                      │  │
│  │  - Task input form                               │  │
│  │  - MotivatorCard (message, fact, tip, GIF, quote)│  │
│  │  - SettingsPanel (personality, language, content)│  │
│  └───────────────────┬──────────────────────────────┘  │
└──────────────────────┼─────────────────────────────────┘
                       │ POST /api/motivate
                       ▼
┌────────────────────────────────────────────────────────┐
│                   Node.js / Express                    │
│                                                        │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────┐ │
│  │ OpenAI     │  │ Giphy      │  │ Quotable +       │ │
│  │ Service    │  │ Service    │  │ Open Trivia DB   │ │
│  └─────┬──────┘  └─────┬──────┘  └────────┬─────────┘ │
└────────┼───────────────┼──────────────────┼────────────┘
         ▼               ▼                  ▼
    OpenAI API       Giphy API        Quotable API /
    (gpt-4o-mini)                     Open Trivia DB
```

---

## Folder Structure

```
Team1/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MotivatorCard.tsx     # Displays the full motivation package
│   │   │   └── SettingsPanel.tsx     # Personality, language, content settings
│   │   ├── views/
│   │   │   ├── MainView.tsx          # Task input + results
│   │   │   └── SettingsView.tsx      # Full settings page (optional)
│   │   ├── hooks/
│   │   │   └── useMotivator.ts       # API call hook
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── motivate.ts           # POST /api/motivate
│   │   ├── services/
│   │   │   ├── openai.ts             # LLM call + prompt engineering
│   │   │   ├── giphy.ts              # Fetch GIF by search term
│   │   │   ├── quotes.ts             # Fetch random quote (Quotable API)
│   │   │   └── facts.ts              # Fetch random fact (Open Trivia DB)
│   │   └── index.ts                  # Express app entrypoint
│   ├── .env                          # Local secrets (git-ignored)
│   └── package.json
│
├── .env.example                      # Documented env vars (committed)
├── .github/
│   ├── copilot-instructions.md       # Copilot workspace context
│   └── copilot-setup-steps.yml       # Copilot agent pre-install config
├── README.md
├── ARCHITECTURE.md
└── CONTRIBUTING.md
```

---

## API Contract

### `POST /api/motivate`

**Request body:**
```json
{
  "task": "read the news",
  "personality": "chaotic",
  "language": "no",
  "contentTypes": ["humor", "facts", "quotes"]
}
```

| Field          | Type     | Values                              |
|----------------|----------|-------------------------------------|
| `task`         | string   | Free text — what the user needs to do |
| `personality`  | string   | `"serious"` \| `"balanced"` \| `"chaotic"` |
| `language`     | string   | `"no"` (Norwegian) \| `"en"` (English) |
| `contentTypes` | string[] | Any of: `"humor"`, `"facts"`, `"quotes"` |

**Response body:**
```json
{
  "motivationalMessage": "Du er klar! Nyhetene frykter deg.",
  "funFact": "Visste du at gjennomsnittspersonen bruker 1 time om dagen på nyheter? Du er allerede foran.",
  "tip": "Sett en timer på 15 min. Du trenger ikke lese alt — du trenger bare å starte.",
  "quote": {
    "content": "The secret of getting ahead is getting started.",
    "author": "Mark Twain"
  },
  "gifUrl": "https://media.giphy.com/media/..."
}
```

---

## Key Design Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Frontend framework | React + Vite | Fast dev setup, team familiarity |
| Styling | Tailwind CSS | Quick big-screen-friendly UI |
| Backend runtime | Node.js + Express | Same language as frontend |
| LLM | OpenAI gpt-4o-mini | Fast, cheap, good enough for fun content |
| GIF source | Giphy | Large library, simple API |
| Quote source | Quotable API | Free, no key needed |
| Facts source | Open Trivia DB | Free, no key needed, can be filtered |

---

## Personality Modes

| Mode | Behaviour |
|------|-----------|
| 🧑‍💼 Serious | Professional, encouraging, minimal humor |
| ⚖️ Balanced | Mix of practical tips and light humor |
| 👹 Chaotic Gremlin | Absurd humor, (ir)relevant facts, unhinged tips |

The personality mode is passed to the OpenAI system prompt to shape tone and content style.

---

## Content Guardrail

All requests include a system prompt instruction:

> "You represent Itera, a Norwegian IT consultancy. Your content must be inclusive, respectful,
> and fun — never harmful, offensive, or inappropriate. Apply this regardless of user input."
