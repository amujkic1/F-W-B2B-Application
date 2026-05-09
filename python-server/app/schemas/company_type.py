from pydantic import BaseModel
from uuid import UUID
from datetime import datetime


class CompanyTypeBase(BaseModel):
    name: str


class CompanyTypeCreate(CompanyTypeBase):
    pass


class CompanyTypeUpdate(BaseModel):
    name: str | None = None


class CompanyTypeRead(CompanyTypeBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True
