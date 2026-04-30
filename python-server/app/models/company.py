import uuid
from sqlalchemy import String, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.database import Base

class Company(Base):
    __tablename__ = "companies"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    profile_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("profiles.id"),
        unique=True,
        nullable=False,
    )

    company_name: Mapped[str] = mapped_column(String, nullable=False)
    tagline: Mapped[str | None] = mapped_column(String(255), nullable=True)

    industry_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("industries.id"),
        nullable=True,
    )
    company_type_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("company_types.id"),
        nullable=True,
    )

    offering_tags: Mapped[list[str] | None] = mapped_column(ARRAY(String), nullable=True)
    seeking_tags: Mapped[list[str] | None] = mapped_column(ARRAY(String), nullable=True)

    company_size: Mapped[str] = mapped_column(
        Enum('1-10', '11-50', '51-200', '201+', name='company_size_enum'),
        nullable=False,
    )

    city: Mapped[str | None] = mapped_column(String, nullable=True)
    country: Mapped[str | None] = mapped_column(String, default="BiH", nullable=True)
    website_url: Mapped[str | None] = mapped_column(String, nullable=True)
    logo_url: Mapped[str | None] = mapped_column(String, nullable=True)

    profile: Mapped["Profile"] = relationship("Profile", back_populates="company")
    company_type: Mapped["CompanyType | None"] = relationship("CompanyType", back_populates="companies")