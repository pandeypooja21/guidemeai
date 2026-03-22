# GuideMeAI 🧭

Your Personal AI Career Counselor — available in Hindi & English.

## What is this?

GuideMeAI is a conversational career counselor built for Indian students and professionals. It understands Hinglish (Hindi + English mix) and gives practical, personalized career advice based on your background and goals.

## Features

- 🎯 Personalized guidance based on your qualification and goals
- 🗣️ Responds in Hinglish — no formal English required
- ⚡ Instant advice — no appointments, no waiting
- 🛡️ Guardrails — only answers career-related questions
- 💬 Suggestion chips for quick navigation
- 🔄 Start Over anytime

## Tech Stack

- **Frontend:** Next.js 16, Tailwind CSS, shadcn/ui
- **AI:** Groq API (Llama 3.3 70B)
- **State Management:** Zustand
- **Deployment:** Vercel

## How it works

1. User lands on the homepage
2. Clicks "Get Started" → answers 3 onboarding questions (name, qualification, goal)
3. Enters personalized chat with AI career counselor
4. AI responds in Hinglish with actionable Indian job market advice

## Setup locally
```bash
git clone https://github.com/pandeypooja21/guidemeai.git
cd guidemeai
npm install
```

Create `.env.local`:
```
GROQ_API_KEY=your_groq_api_key
```
```bash
npm run dev
```

Open `http://localhost:3000`

## AI Usage

This project was built using:
- **v0.dev** — for UI generation and component design
- **Claude** — for debugging, API integration, and problem solving
- **Groq** — for fast LLM inference

## Why this topic?

India has millions of students who need career guidance but can't afford counselors. Most AI tools respond only in formal English — creating a barrier. GuideMeAI breaks that barrier by speaking in Hinglish and understanding the Indian job market context.
