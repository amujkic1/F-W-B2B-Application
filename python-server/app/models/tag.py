import uuid
from sqlalchemy import Column, String, DateTime, Enum, func
from sqlalchemy.dialects.postgresql import UUID
from db.database import Base


class Tag(Base):
    __tablename__ = "tags"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, unique=True, nullable=False)
    slug = Column(String, unique=True, nullable=False)
    type = Column(
        Enum('skill', 'service', 'interest', name='tag_type_enum'),
        nullable=False
    )
    created_at = Column(DateTime, server_default=func.now())
