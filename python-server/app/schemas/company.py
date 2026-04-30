from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Literal


class CompanyBase(BaseModel):
    user_id: UUID
    company_name: str
    industry_id: UUID | None = None
    description: str | None = None
    city: str | None = None
    country: str = "BiH"
    address: str | None = None
    website_url: str | None = None
    logo_url: str | None = None
    company_size: Literal['1-10', '11-50', '51-200', '201+']
    looking_for: Literal['clients', 'partners', 'suppliers', 'talent', 'networking'] | None = None


class CompanyCreate(CompanyBase):
    pass


class CompanyRead(CompanyBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
