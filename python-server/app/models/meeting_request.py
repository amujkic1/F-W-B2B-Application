import uuid
from datetime import datetime
from sqlalchemy import String, Text, ForeignKey, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from db.database import Base


class MeetingRequest(Base):
    __tablename__ = "meeting_requests"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True,
    )
    requester_user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False,
    )
    recipient_user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False,
    )
    title: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    meeting_type: Mapped[str] = mapped_column(
        Enum('online', 'offline', name='meeting_type_enum'),
        nullable=False,
    )
    location_text: Mapped[str | None] = mapped_column(String, nullable=True)
    meeting_link: Mapped[str | None] = mapped_column(String, nullable=True)
    requested_start_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    requested_end_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    status: Mapped[str] = mapped_column(
        Enum('pending', 'accepted', 'rejected', 'cancelled', 'completed', name='meeting_request_status_enum'),
        nullable=False,
        default='pending',
        server_default='pending',
    )
    note_from_requester: Mapped[str | None] = mapped_column(Text, nullable=True)
    note_from_recipient: Mapped[str | None] = mapped_column(Text, nullable=True)
