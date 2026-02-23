from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.db.session import get_db
from app.routers.auth import get_current_user
from app.models.user import User
from app.models.application import Application

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/summary")
def summary(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    total = db.query(func.count(Application.id)).filter(Application.user_id == user.id).scalar() or 0

    rows = (
        db.query(Application.status, func.count(Application.id))
        .filter(Application.user_id == user.id)
        .group_by(Application.status)
        .all()
    )
    by_status = {status: count for status, count in rows}

    interview = by_status.get("Interview", 0)
    offer = by_status.get("Offer", 0)

    return {
        "total": total,
        "by_status": by_status,
        "rates": {
            "interview_rate": round((interview / total) if total else 0.0, 4),
            "offer_rate": round((offer / total) if total else 0.0, 4),
        },
    }