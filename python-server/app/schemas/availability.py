from pydantic import BaseModel
from uuid import UUID
from datetime import datetime, time


class AvailabilityBase(BaseModel):
    user_id: UUID
    day_of_week: int
    start_time: time
    end_time: time
    is_active: bool = True


class AvailabilityCreate(AvailabilityBase):
    pass


class AvailabilityRead(AvailabilityBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
