from pydantic import BaseModel
from uuid import UUID
from datetime import datetime


class ProfileTagBase(BaseModel):
    user_id: UUID
    tag_id: UUID


class ProfileTagCreate(ProfileTagBase):
    pass


class ProfileTagRead(ProfileTagBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True
