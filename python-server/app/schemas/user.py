from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from datetime import datetime

from app.schemas.company import CompanyBase
from app.schemas.profile import ProfileBase

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=72, description="Password must be between 8 and 72 characters")

class CompanyRegistrationCreate(UserCreate):
    profile: ProfileBase
    company: CompanyBase

class InvitationRegistrationCreate(UserCreate):
    invitation_token: str
    profile: ProfileBase

class CompanyInvitationCreate(BaseModel):
    email: EmailStr
    expires_in_days: int = Field(
        default=7,
        ge=1,
        le=30,
        description="Number of days before the invitation expires",
    )

class CompanyInvitationRead(BaseModel):
    id: UUID
    company_id: UUID
    email: EmailStr
    token: str
    status: str
    expires_at: datetime
    invited_by_user_id: UUID
    accepted_by_user_id: UUID | None = None
    created_at: datetime

    class Config:
        from_attributes = True

class UserRead(BaseModel):
    id: UUID
    email: EmailStr
    status: str
    company_id: UUID | None = None
    role: str | None = None
    created_at: datetime
    email_verified_at: datetime | None = None

    class Config:
        from_attributes = True

class UserProfileSummary(BaseModel):
    first_name: str
    last_name: str
    avatar_url: str | None = None 
    position: str | None = None

    class Config:
        from_attributes = True

class UserLoginData(BaseModel):
    id: UUID
    email: EmailStr
    company_id: UUID | None = None
    role: str | None = None
    profile: UserProfileSummary | None = None

    class Config:
        from_attributes = True
