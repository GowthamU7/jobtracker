# Job Tracker — FastAPI + React

A full-stack job application tracker with JWT authentication, CRUD, analytics, and charts.

## Features
- User registration & login (JWT)
- Protected CRUD for job applications
- Update status (Applied/Interview/Offer/Rejected) + delete
- Analytics endpoint (/analytics/summary)
- React dashboard + charts (Recharts)
- PostgreSQL database (Docker)

## Tech Stack
- Backend: FastAPI, SQLAlchemy, Alembic (optional), JWT, PostgreSQL
- Frontend: React (Vite), Tailwind CSS, Axios, Recharts
- Infra: Docker Compose (Postgres)

---

## Local Demo (Recruiter-Friendly)

### 1) Start PostgreSQL (Docker)
From repo root:
```bash
docker compose up -d