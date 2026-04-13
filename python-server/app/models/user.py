import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Enum, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    
    account_type = Column(
        Enum('individual', 'company', name='account_type_enum'), 
        nullable=False
    )
    status = Column(
        Enum('active', 'inactive', 'blocked', name='user_status_enum'), 
        default='inactive', 
        nullable=False
    )
    
    email_verified_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=func.now(), server_default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    profile = relationship("Profile", back_populates="user", uselist=False)