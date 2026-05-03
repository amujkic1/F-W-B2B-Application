from pydantic import BaseModel, ConfigDict, HttpUrl
from uuid import UUID
from datetime import datetime
from typing import Literal

class CompanyBase(BaseModel):
    company_name: str
    industry_id: UUID | None
    description: str | None
    city: str | None
    country: str = "BiH"
    address: str | None
    website_url: str | None
    logo_url: str | None
    company_size: Literal['1-10', '11-50', '51-200', '201+']
    looking_for: Literal['clients', 'partners', 'suppliers', 'talent', 'networking'] | None

class CompanyCreate(CompanyBase):
    user_id: UUID

class CompanyUpdate(BaseModel):
    company_name: str | None
    industry_id: UUID | None
    description: str | None
    city: str | None
    country: str | None
    address: str | None
    website_url: str | None
    logo_url: str | None
    company_size: Literal['1-10', '11-50', '51-200', '201+'] | None
    looking_for: Literal['clients', 'partners', 'suppliers', 'talent', 'networking'] | None

class CompanyRead(CompanyBase):
    id: UUID
    user_id: UUID

    # Use the Pydantic V2 way of configuring (ConfigDict)
    model_config = ConfigDict(from_attributes=True)