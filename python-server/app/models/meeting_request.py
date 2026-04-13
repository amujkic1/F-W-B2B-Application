import uuid
from sqlalchemy import Column, String, Text, ForeignKey, DateTime, Enum, func
from sqlalchemy.dialects.postgresql import UUID
from db.database import Base


class MeetingRequest(Base):
    __tablename__ = "meeting_requests"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    requester_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    recipient_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    meeting_type = Column(
        Enum('online', 'offline', name='meeting_type_enum'),
        nullable=False
    )
    location_text = Column(String, nullable=True)
    meeting_link = Column(String, nullable=True)
    requested_start_at = Column(DateTime, nullable=False)
    requested_end_at = Column(DateTime, nullable=False)
    status = Column(
        Enum('pending', 'accepted', 'rejected', 'cancelled', 'completed', name='meeting_request_status_enum'),
        nullable=False,
        default='pending',
        server_default='pending'
    )
    note_from_requester = Column(Text, nullable=True)
    note_from_recipient = Column(Text, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
