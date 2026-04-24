from pydantic import BaseModel
from uuid import UUID
from datetime import datetime


class UnavailablePeriodBase(BaseModel):
    user_id: UUID
    start_datetime: datetime
    end_datetime: datetime
    reason: str | None = None


class UnavailablePeriodCreate(UnavailablePeriodBase):
    pass


class UnavailablePeriodUpdate(BaseModel):
    user_id: UUID | None = None
    start_datetime: datetime | None = None
    end_datetime: datetime | None = None
    reason: str | None = None


class UnavailablePeriodRead(UnavailablePeriodBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True
