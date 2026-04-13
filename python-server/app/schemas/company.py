from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional, Literal


class CompanyBase(BaseModel):
    user_id: UUID
    company_name: str
    industry_id: Optional[UUID] = None
    description: Optional[str] = None
    city: Optional[str] = None
    country: str = "BiH"
    address: Optional[str] = None
    website_url: Optional[str] = None
    logo_url: Optional[str] = None
    company_size: Literal['1-10', '11-50', '51-200', '201+']
    looking_for: Optional[Literal['clients', 'partners', 'suppliers', 'talent', 'networking']] = None


class CompanyCreate(CompanyBase):
    pass


class CompanyRead(CompanyBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
