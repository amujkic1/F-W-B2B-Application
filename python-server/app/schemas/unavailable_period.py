from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional


class UnavailablePeriodBase(BaseModel):
    user_id: UUID
    start_datetime: datetime
    end_datetime: datetime
    reason: Optional[str] = None


class UnavailablePeriodCreate(UnavailablePeriodBase):
    pass


class UnavailablePeriodRead(UnavailablePeriodBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True
