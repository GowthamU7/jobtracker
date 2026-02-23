from datetime import date
from pydantic import BaseModel


class ApplicationCreate(BaseModel):
    company: str
    role: str
    status: str = "Applied"
    applied_date: date | None = None
    notes: str | None = None
    job_url: str | None = None


class ApplicationUpdate(BaseModel):
    company: str | None = None
    role: str | None = None
    status: str | None = None
    applied_date: date | None = None
    notes: str | None = None
    job_url: str | None = None


class ApplicationOut(BaseModel):
    id: int
    user_id: int
    company: str
    role: str
    status: str
    applied_date: date | None
    notes: str | None
    job_url: str | None

    class Config:
        from_attributes = True