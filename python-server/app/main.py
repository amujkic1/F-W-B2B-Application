from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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
from api.auth import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

@app.get("/info")
def get_info():
    return {
        "app_name": settings.PROJECT_NAME,
        "database": "PostgreSQL (Connected)"
    }