from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime
from typing import Optional, Literal

class UserCreate(BaseModel):
    email: EmailStr
    password: str  
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