from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.database import engine, Base
from app.models.user import User
from app.models.profile import Profile
from app.models.industry import Industry
from app.models.tag import Tag
from app.models.profile_tag import ProfileTag
from app.models.availability import Availability
from app.models.unavailable_period import UnavailablePeriod
from app.models.meeting_request import MeetingRequest
from app.models.company import Company
from app.models.company_type import CompanyType
from app.api.auth import router as auth_router
from app.api.meeting_request import router as meeting_request_router
from app.api.profile import router as profile_router
from app.api.company import router as company_router
from app.api.industry import router as industry_router
from app.api.company_type import router as company_type_router
from app.api.unavailable_period import router as unavailable_period_router
from app.api.deps import get_current_user

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
app.include_router(meeting_request_router, dependencies=[Depends(get_current_user)])
app.include_router(profile_router, dependencies=[Depends(get_current_user)])
app.include_router(industry_router)
app.include_router(unavailable_period_router, dependencies=[Depends(get_current_user)])
app.include_router(company_router, dependencies=[Depends(get_current_user)])
app.include_router(company_type_router)

@app.get("/info", dependencies=[Depends(get_current_user)])
def get_info():
    return {
        "app_name": settings.PROJECT_NAME,
        "database": "PostgreSQL (Connected)"
    }
