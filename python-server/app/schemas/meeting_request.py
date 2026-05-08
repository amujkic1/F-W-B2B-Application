from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Literal


class MeetingRequestBase(BaseModel):
    requester_user_id: UUID
    recipient_user_id: UUID
    title: str
    description: str | None = None
    meeting_type: Literal['online', 'offline']
    location_text: str | None = None
    meeting_link: str | None = None
    requested_start_at: datetime
    requested_end_at: datetime
    status: Literal['pending', 'accepted', 'rejected', 'cancelled', 'completed'] = 'pending'
    note_from_requester: str | None = None
    note_from_recipient: str | None = None


class MeetingRequestCreate(MeetingRequestBase):
    pass


class MeetingRequestUpdate(BaseModel):
    requester_user_id: UUID | None = None
    recipient_user_id: UUID | None = None
    title: str | None = None
    description: str | None = None
    meeting_type: Literal['online', 'offline'] | None = None
    location_text: str | None = None
    meeting_link: str | None = None
    requested_start_at: datetime | None = None
    requested_end_at: datetime | None = None
    status: Literal['pending', 'accepted', 'rejected', 'cancelled', 'completed'] | None = None
    note_from_requester: str | None = None
    note_from_recipient: str | None = None


class MeetingRequestRead(MeetingRequestBase):
    id: UUID
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True
