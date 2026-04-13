import uuid
from sqlalchemy import Column, ForeignKey, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from db.database import Base


class ProfileTag(Base):
    __tablename__ = "profile_tags"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    tag_id = Column(UUID(as_uuid=True), ForeignKey("tags.id"), nullable=False)
    created_at = Column(DateTime, server_default=func.now())
