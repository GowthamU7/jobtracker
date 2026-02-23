from fastapi import FastAPI
from app.db.session import Base, engine
from app.routers.auth import router as auth_router
from app.routers.applications import router as applications_router
from app.routers.analytics import router as analytics_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Job Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# For week-1 build: auto-create tables (we’ll switch to Alembic migrations next)
Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(applications_router)
app.include_router(analytics_router)

@app.get("/")
def root():
    return {"status": "ok", "message": "Job Tracker API running"}