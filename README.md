🚀 Job Tracker – Full Stack Application (FastAPI + React)

A full-stack job application tracking system built with FastAPI, PostgreSQL, and React.

This project demonstrates modern backend API development, JWT authentication, relational database modeling, analytics aggregation, and a responsive React dashboard with charts.

📌 Overview

Job Tracker is a web application that allows users to:

Register and log in securely

Track job applications

Update application statuses

View analytics (interview & offer rates)

Visualize data using charts

It is designed as a real-world SaaS-style application with proper authentication, database relationships, and frontend state management.

🏗️ Architecture
Frontend (React + Tailwind + Recharts)
        ↓
Axios API Calls (JWT Auth)
        ↓
Backend (FastAPI)
        ↓
PostgreSQL (Docker)
Backend

FastAPI

SQLAlchemy ORM

JWT Authentication

PostgreSQL

Alembic (optional migrations)

CORS configuration

RESTful API structure

Frontend

React (Vite)

Tailwind CSS

Axios

React Router

Recharts (analytics charts)

✨ Features
🔐 Authentication

User Registration

Login with JWT token

Protected API routes

Token stored in localStorage

/auth/me endpoint for session validation

📋 Job Application Management

Create application

View all applications

Update status (Applied / Interview / Offer / Rejected)

Delete application

Protected per-user data

📊 Analytics Dashboard

Total applications count

Interview rate calculation

Offer rate calculation

Status distribution (Pie chart)

Status distribution (Bar chart)

Real-time UI updates

🧠 Business Logic
Interview Rate
Interview Rate = Interviews / Total Applications
Offer Rate
Offer Rate = Offers / Total Applications

Analytics are calculated dynamically using SQL aggregation queries.

📁 Project Structure
job-tracker/
│
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── core/
│   │   └── db/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── api/
│   │   └── components/
│   └── package.json
│
├── docker-compose.yml
└── README.md
🛠️ Local Setup & Usage
🔹 1. Clone Repository
git clone https://github.com/<your-username>/job-tracker.git
cd job-tracker
🔹 2. Start PostgreSQL (Docker)

Make sure Docker Desktop is running.

docker compose up -d

This starts PostgreSQL in a container.

🔹 3. Start Backend (FastAPI)
cd backend
python -m venv venv
Windows
venv\Scripts\activate
macOS/Linux
source venv/bin/activate

Install dependencies:

pip install -r requirements.txt

Start backend:

uvicorn app.main:app --reload

Backend runs at:

http://127.0.0.1:8000

API documentation:

http://127.0.0.1:8000/docs
🔹 4. Start Frontend (React)

Open new terminal:

cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173
🧪 Demo Workflow (For Recruiters)

Register a new account

Login

Add job applications

Change status from Applied → Interview → Offer

Observe analytics update automatically

Delete an application

Demonstrates:

Secure authentication

RESTful API usage

State management

Data visualization

Real-time UI refresh

🔐 Environment Variables

Backend .env file:

DATABASE_URL=postgresql+psycopg2://jobtracker:jobtracker@localhost:5433/jobtracker
JWT_SECRET=YOUR_SECRET_KEY
JWT_ALG=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
🧩 API Endpoints
Authentication

POST /auth/register

POST /auth/login

GET /auth/me

Applications

POST /applications

GET /applications

PATCH /applications/{id}

DELETE /applications/{id}

Analytics

GET /analytics/summary

📈 What This Project Demonstrates

Backend API design

JWT authentication flow

Secure password hashing (bcrypt)

SQL aggregation queries

ORM modeling with relationships

React state management

Protected routes

API integration using Axios

Responsive UI design with Tailwind

Data visualization with Recharts

Full-stack integration

🚀 Future Improvements

Role-based access control

Pagination

Search & filters

Email notifications

Resume upload + parsing

Deployment (Render/AWS)

CI/CD pipeline

🧑‍💻 Author

Gowtham Sankar Sai Ullangula
Master’s in Computer Science
Full Stack & Backend Developer

📄 License

This project is for educational and portfolio purposes.


./fullapp.pdf
