# Triage

![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-llama--3.3--70b-F55036?style=flat&logo=groq&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

**AI-powered support ticket routing for small to mid-size SaaS teams.**

---

## 📖 Overview

Triage is an intelligent support ticket management system that uses AI to classify, score, and route incoming tickets to the right queue — automatically. It is built for SaaS teams that need reliable ticket triage without the overhead of enterprise tools like Zendesk. Agents get contextual reply suggestions; admins get real-time analytics and full control over routing rules, roles, and team structure.

---

## 🔗 Live Demo

**[https://triage-lilac.vercel.app](https://triage-lilac.vercel.app)**

---

## ✨ Features

- **AI Classification** — Every incoming ticket is classified by category and intent using Groq's `llama-3.3-70b-versatile` model, with a confidence score attached to each result.
- **Automatic Routing** — Tickets are routed to the appropriate queue with a human-readable reasoning explanation generated alongside the classification.
- **Needs-Review Flagging** — Low-confidence tickets are automatically flagged for manual agent review before routing is finalized.
- **AI Reply Suggestions** — Agents receive AI-generated draft replies tailored to the ticket context, reducing response time and effort.
- **Role-Based Access Control (RBAC)** — Three roles: `admin`, `agent`, and `user`, each with distinct permissions and interface access.
- **Separate Interfaces** — Dedicated portal for agents and admins (`/admin`) and a self-service interface for customers (`/user`).
- **Multi-Tenant Architecture** — Full data isolation between tenants, with each organization operating in a sandboxed environment.
- **Real-Time Analytics** — Dashboard with ticket volume, resolution rates, classification distribution, and agent performance metrics.
- **Session Management** — Automatic session expiry with in-app toast notifications to guide users through re-authentication without data loss.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS v4 |
| **Backend** | FastAPI, SQLAlchemy, Pydantic |
| **Database** | PostgreSQL via Supabase |
| **AI** | Groq API (`llama-3.3-70b-versatile`) |
| **Infrastructure** | Render (backend), Vercel (frontend), Supabase (database) |

---

## 🏗 Architecture Overview

```
User submits ticket (React frontend)
        │
        ▼
FastAPI receives and validates the request
        │
        ▼
Groq API classifies ticket (category, intent, priority)
        │
        ▼
Confidence score computed for the classification
        │
        ├── High confidence → Routed automatically to correct queue
        │
        └── Low confidence  → Flagged as "needs review" for agent inspection
                                      │
                                      ▼
                             Agent notified; AI reply suggestion generated
```

Each step produces structured, auditable output stored in PostgreSQL. The frontend polls or reacts to state changes through the REST API.

---

## 🚀 Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- A running PostgreSQL instance (or a Supabase project)
- A [Groq API key](https://console.groq.com/)

---

### Backend

```bash
# 1. Clone the repository
git clone https://github.com/nisarg-gandhi/triage-app.git
cd triage-app

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Configure environment variables
cp .env.example .env
# Edit .env with your values (see Environment Variables section below)

# 5. Run database migrations
alembic upgrade head

# 6. Start the development server
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`. Interactive docs are at `http://localhost:8000/docs`.

---

### Frontend

```bash
# From the repository root
cd frontend

# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env
# Edit .env with your values (see Environment Variables section below)

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔐 Environment Variables

### Backend (`.env`)

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/dbname` |
| `SECRET_KEY` | Secret key used to sign JWT tokens | `your-secret-key-here` |
| `ALGORITHM` | JWT signing algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token lifetime in minutes | `60` |
| `GROQ_API_KEY` | API key for the Groq inference endpoint | `gsk_...` |
| `CORS_ORIGINS` | Comma-separated list of allowed origins | `http://localhost:5173,https://triage-lilac.vercel.app` |

### Frontend (`.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Base URL of the FastAPI backend | `https://your-backend.onrender.com` |

---

## 📦 Deployment

### Render (Backend)

1. Create a new **Web Service** in Render and connect your repository.
2. Set the **Start Command** to `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
3. Add all backend environment variables under **Environment → Environment Variables**.
4. Render automatically provisions a public URL — use this as `VITE_API_URL` in your frontend deployment.

### Vercel (Frontend)

1. Import the repository in Vercel and set the **Root Directory** to `frontend`.
2. Vercel auto-detects Vite. Set the **Build Command** to `npm run build` and **Output Directory** to `dist`.
3. Add `VITE_API_URL` under **Settings → Environment Variables**.

### Supabase (Database)

1. Create a new Supabase project and copy the **Connection String** (Session mode) from **Settings → Database**.
2. Use this as the `DATABASE_URL` in your backend environment.
3. Run `alembic upgrade head` once after the first deploy to initialize the schema.

---

## 🗺 Roadmap

- [ ] Full ticket lifecycle management (open → in-progress → resolved → closed)
- [ ] Agent assignment and workload balancing
- [ ] Email ingestion pipeline (IMAP / SendGrid inbound)
- [ ] SLA tracking with breach alerts
- [ ] Real-time notifications via WebSockets
- [ ] AI provider abstraction layer (swap Groq for OpenAI, Anthropic, etc.)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
