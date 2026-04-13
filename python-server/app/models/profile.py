import uuid
from sqlalchemy import Column, String, Text, ForeignKey, DateTime, Enum, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db.database import Base

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    headline = Column(String, nullable=True)
    bio = Column(Text, nullable=True)
    city = Column(String, nullable=True)
    country = Column(String, server_default="BiH", default="BiH")
    profile_image_url = Column(String, nullable=True)
    
    looking_for = Column(
        Enum('client', 'job', 'partner', 'networking', name='looking_for_enum'),
        nullable=True
    )

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="profile")