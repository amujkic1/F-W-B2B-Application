from pydantic import BaseModel
from uuid import UUID
from datetime import datetime


class IndustryBase(BaseModel):
    name: str
    slug: str


class IndustryCreate(IndustryBase):
    pass


class IndustryRead(IndustryBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True
