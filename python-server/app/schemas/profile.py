from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class ProfileBase(BaseModel):
    first_name: str
    last_name: str
    position: str
    avatar_url: str | None = None
    linkedin_url: str | None = None
    bio: str | None = None
    accepting_meetings: bool | None = True
    availability_note: str | None = None

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

class ProfileRead(ProfileBase):
    id: UUID
    user_id: UUID
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True