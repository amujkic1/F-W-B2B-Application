import uuid
from sqlalchemy import Column, ForeignKey, DateTime, Time, Integer, Boolean, func
from sqlalchemy.dialects.postgresql import UUID
from db.database import Base


class Availability(Base):
    __tablename__ = "availabilities"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    day_of_week = Column(Integer, nullable=False)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True, server_default='true')
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
