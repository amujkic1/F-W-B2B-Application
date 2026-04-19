from pydantic import BaseModel, HttpUrl
from uuid import UUID
from datetime import datetime
from typing import Optional, Literal

class ProfileBase(BaseModel):
    first_name: str
    last_name: str
    headline: Optional[str] = None
    bio: Optional[str] = None
    city: Optional[str] = None
    country: str = "BiH"
    looking_for: Optional[Literal['client', 'job', 'partner', 'networking']] = None

class ProfileCreate(ProfileBase):
    user_id: UUID


class ProfileUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    headline: Optional[str] = None
    bio: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    looking_for: Optional[Literal['client', 'job', 'partner', 'networking']] = None
    profile_image_url: Optional[str] = None

class ProfileRead(ProfileBase):
    id: UUID
    user_id: UUID
    profile_image_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True