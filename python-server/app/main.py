from fastapi import FastAPI
from core.config import settings
from db.database import engine, Base
from models.user import User
from models.profile import Profile
from models.industry import Industry
from models.tag import Tag
from models.profile_tag import ProfileTag
from models.availability import Availability
from models.unavailable_period import UnavailablePeriod
from models.meeting_request import MeetingRequest
from models.company import Company

Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

@app.get("/info")
def get_info():
    return {
        "app_name": settings.PROJECT_NAME,
        "database": "PostgreSQL (Connected)"
    }