from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Literal


class TagBase(BaseModel):
    name: str
    slug: str
    type: Literal['skill', 'service', 'interest']


class TagCreate(TagBase):
    pass


class TagRead(TagBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True
