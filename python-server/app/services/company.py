from .base import BaseService
from app.schemas.company import CompanyCreate, CompanyUpdate
from app.models.company import Company

class CompanyService(BaseService[Company, CompanyCreate, CompanyUpdate]):
    pass

company_service = CompanyService(Company)
