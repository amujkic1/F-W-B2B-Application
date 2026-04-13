import uuid
from sqlalchemy import Column, String, Text, ForeignKey, DateTime, Enum, func
from sqlalchemy.dialects.postgresql import UUID
from db.database import Base


class Company(Base):
    __tablename__ = "companies"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    company_name = Column(String, nullable=False)
    industry_id = Column(UUID(as_uuid=True), ForeignKey("industries.id"), nullable=True)
    description = Column(Text, nullable=True)
    city = Column(String, nullable=True)
    country = Column(String, nullable=False, default="BiH", server_default="BiH")
    address = Column(String, nullable=True)
    website_url = Column(String, nullable=True)
    logo_url = Column(String, nullable=True)
    company_size = Column(
        Enum('1-10', '11-50', '51-200', '201+', name='company_size_enum'),
        nullable=False
    )
    looking_for = Column(
        Enum('clients', 'partners', 'suppliers', 'talent', 'networking', name='company_looking_for_enum'),
        nullable=True
    )
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
