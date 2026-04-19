from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from datetime import datetime
from typing import Optional, Literal

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=72, description="Password must be between 8 and 72 characters")
    account_type: Literal['individual', 'company']

class UserRead(BaseModel):
    id: UUID
    email: EmailStr
    account_type: str
    status: str
    created_at: datetime
    email_verified_at: Optional[datetime] = None

    class Config:
        from_attributes = True