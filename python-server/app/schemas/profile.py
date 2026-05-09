from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from app.schemas.company import CompanyRead

class ProfileBase(BaseModel):
    first_name: str
    last_name: str
    position: str
    avatar_url: str | None = None
    linkedin_url: str | None = None
    bio: str | None = None
    accepting_meetings: bool | None = True
    availability_note: str | None = None

class ProfileRead(BaseModel):
    id: UUID
    user_id: UUID
    first_name: str
    last_name: str
    position: str
    avatar_url: str | None = None
    linkedin_url: str | None = None
    bio: str | None = None
    company: CompanyRead | None = None 

    class Config:
        from_attributes = True

class UserProfileSummary(BaseModel):
    id: UUID
    first_name: str
    last_name: str
    avatar_url: str | None = None 
    position: str | None = None
    company: CompanyRead | None = None 

    class Config:
        from_attributes = True

class ProfileCreate(ProfileBase):
    user_id: UUID


class ProfileUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    position: str | None = None
    avatar_url: str | None = None
    linkedin_url: str | None = None
    bio: str | None = None
    accepting_meetings: bool | None = None
    availability_note: str | None = None

class ProfileFilter(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    position: str | None = None
    accepting_meetings: bool | None = None

ProfileRead.model_rebuild()
UserProfileSummary.model_rebuild()
