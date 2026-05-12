import uuid
from datetime import datetime
from sqlalchemy import String, DateTime, Enum, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.database import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True,
    )

    email: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String, nullable=False)

    status: Mapped[str] = mapped_column(
        Enum('active', 'inactive', 'blocked', name='user_status_enum'), 
        default='inactive', 
        nullable=False,
    )
    is_verified: Mapped[bool | None] = mapped_column(Boolean, default=False, nullable=True)
    email_verified_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    company_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("companies.id"),
        nullable=True,
    )
    role: Mapped[str | None] = mapped_column(
        Enum('admin', 'member', name='user_role_enum'),
        default='member',
        nullable=True,
    )

    # Relacije (1:1 prema Profile)
    profile: Mapped["Profile | None"] = relationship(
        "Profile",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan",
    )
    company: Mapped["Company | None"] = relationship("Company", back_populates="users")
