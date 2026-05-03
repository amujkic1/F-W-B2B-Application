from pydantic import BaseModel, ConfigDict
from uuid import UUID
from typing import Literal, List, Optional

class CompanyBase(BaseModel):
    company_name: str
    tagline: Optional[str] = None 
    industry_id: Optional[UUID] = None
    company_type_id: Optional[UUID] = None # Added from model
    company_size: Literal['1-10', '11-50', '51-200', '201+']
    offering_tags: Optional[List[str]] = None
    seeking_tags: Optional[List[str]] = None
    
    city: Optional[str] = None
    country: Optional[str] = "BiH"
    website_url: Optional[str] = None
    logo_url: Optional[str] = None

class CompanyCreate(CompanyBase):
    profile_id: UUID

class CompanyUpdate(BaseModel):
    company_name: Optional[str] = None
    tagline: Optional[str] = None
    industry_id: Optional[UUID] = None
    company_type_id: Optional[UUID] = None
    company_size: Optional[Literal['1-10', '11-50', '51-200', '201+']] = None
    offering_tags: Optional[List[str]] = None
    seeking_tags: Optional[List[str]] = None
    city: Optional[str] = None
    country: Optional[str] = None
    website_url: Optional[str] = None
    logo_url: Optional[str] = None

class CompanyRead(CompanyBase):
    id: UUID
    profile_id: UUID
    
    model_config = ConfigDict(from_attributes=True)