from pydantic import BaseModel, HttpUrl
from uuid import UUID
from datetime import datetime
from typing import Literal

class ProfileBase(BaseModel):
    first_name: str
    last_name: str
    headline: str | None = None
    bio: str | None = None
    city: str | None = None
    country: str = "BiH"
    looking_for: Literal['client', 'job', 'partner', 'networking'] | None = None

class ProfileCreate(ProfileBase):
    user_id: UUID


class ProfileUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    headline: str | None = None
    bio: str | None = None
    city: str | None = None
    country: str | None = None
    looking_for: Literal['client', 'job', 'partner', 'networking'] | None = None
    profile_image_url: str | None = None

class ProfileRead(ProfileBase):
    id: UUID
    user_id: UUID
    profile_image_url: str | None = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True