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
from models.company_type import CompanyType
from api.auth import router as auth_router
from api.meeting_request import router as meeting_request_router
from api.profile import router as profile_router
from api.industry import router as industry_router
from api.unavailable_period import router as unavailable_period_router

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
app.include_router(meeting_request_router)
app.include_router(profile_router)
app.include_router(industry_router)
app.include_router(unavailable_period_router)

@app.get("/info")
def get_info():
    return {
        "app_name": settings.PROJECT_NAME,
        "database": "PostgreSQL (Connected)"
    }