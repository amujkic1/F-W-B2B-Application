from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional, Literal


class MeetingRequestBase(BaseModel):
    requester_user_id: UUID
    recipient_user_id: UUID
    title: str
    description: Optional[str] = None
    meeting_type: Literal['online', 'offline']
    location_text: Optional[str] = None
    meeting_link: Optional[str] = None
    requested_start_at: datetime
    requested_end_at: datetime
    status: Literal['pending', 'accepted', 'rejected', 'cancelled', 'completed'] = 'pending'
    note_from_requester: Optional[str] = None
    note_from_recipient: Optional[str] = None


class MeetingRequestCreate(MeetingRequestBase):
    pass


class MeetingRequestRead(MeetingRequestBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
