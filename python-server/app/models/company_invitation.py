import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class CompanyInvitation(Base):
    __tablename__ = "company_invitations"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    company_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("companies.id"),
        nullable=False,
        index=True,
    )
    email: Mapped[str] = mapped_column(String, nullable=False, index=True)
    token: Mapped[str] = mapped_column(String, unique=True, nullable=False, index=True)
    status: Mapped[str] = mapped_column(
        Enum('pending', 'accepted', 'expired', 'revoked', name='company_invitation_status_enum'),
        default='pending',
        nullable=False,
    )
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    invited_by_user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False,
    )
    accepted_by_user_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=True,
    )

    company: Mapped["Company"] = relationship("Company", back_populates="invitations")
    invited_by_user: Mapped["User"] = relationship(
        "User",
        foreign_keys=[invited_by_user_id],
        back_populates="sent_company_invitations",
    )
    accepted_by_user: Mapped["User | None"] = relationship(
        "User",
        foreign_keys=[accepted_by_user_id],
        back_populates="accepted_company_invitations",
    )
