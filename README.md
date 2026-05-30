# MindWellSpaces 🌿

A comprehensive mental wellness web application designed to support emotional well-being through journaling, mood tracking, guided breathing exercises, and AI-powered chat support.

---

## 🌟 Features

### 📔 Journal
Write and store personal journal entries to reflect on your thoughts and emotions. All entries are saved securely and tied to your account.

### 😊 Mood Tracker
Log your mood on a 1–5 scale with optional notes. Track your emotional patterns over time with visual charts.

### 🌬️ Breathing Exercises
Follow guided breathing patterns to reduce stress and anxiety. The app walks you through inhale, hold, and exhale cycles with animated visual cues.

### 🌸 Blossom 1.0
A templated emotional logging system that provides structured prompts to help you identify and articulate your feelings using pre-built response templates.

### 🤖 Blossom AI
An AI-powered chatbot companion for emotional support. Chat in real time with a supportive assistant designed to listen and respond with empathy.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** — UI framework
- **TypeScript** — Type-safe development
- **Vite** — Fast development build tool
- **Tailwind CSS** — Utility-first styling
- **shadcn/ui + Radix UI** — Accessible component library
- **TanStack Query (React Query v5)** — Server state management
- **React Hook Form + Zod** — Form validation
- **Wouter** — Client-side routing
- **Framer Motion** — Animations
- **Recharts** — Data visualisation
- **Lucide React** — Icons

### Backend
- **Node.js + Express** — REST API server
- **TypeScript (tsx)** — Server-side TypeScript execution
- **Passport.js** — Authentication (local strategy)
- **Express Session** — Session management
- **Drizzle ORM + Zod** — Schema definition and validation
- **In-memory storage** — No external database required

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)
- [VS Code](https://code.visualstudio.com/) (recommended)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jasperng68/MindWellSpaces.git
   cd MindWellSpaces
2. Install dependencies:
   npm install
   
3. Start the development server:
   npm run dev
   
5. Open in your browser:
   http://localhost:5000


Project Structure:
MindWellSpaces/
├── client/                  # React frontend
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── hooks/           # Custom React hooks
│       ├── lib/             # Utilities and query client
│       └── pages/           # Application pages
├── server/                  # Express backend
│   ├── auth.ts              # Authentication setup
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API route handlers
│   └── storage.ts           # In-memory data storage
├── shared/                  # Shared types and schemas
│   ├── schema.ts            # Drizzle ORM schema + Zod types
│   └── blossom-templates.ts # Blossom 1.0 response templates
├── package.json
├── tsconfig.json
└── vite.config.ts

🔐 Authentication
MindWellSpaces uses Passport.js with a local strategy. Passwords are securely hashed using Node's built-in crypto module with scrypt. Sessions are managed server-side using express-session.

📊 Data Models
Model	| Description
users	| Registered user accounts
moods	| Mood entries (1–5 scale) with optional notes
journals |	Personal journal entries
breathingExercises |	Completed breathing session logs
chatMessages |	Blossom AI conversation history


📄 License
This project is licensed under the MIT License.

👤 Author
Jasper Ng

GitHub: @jasperng68
   



