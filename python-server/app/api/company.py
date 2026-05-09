from app.schemas.company import CompanyBase, CompanyRead, CompanyCreate, CompanyUpdate
from app.services import company_service
from .base import BaseRouter

# We initialize the generic router with the profile service and schemas
company_router_container = BaseRouter(
    service=company_service,
    read_schema=CompanyRead,
    create_schema=CompanyCreate,
    update_schema=CompanyUpdate,
    prefix="/api/company",
    tags=["company"]
)

# Export this for inclusion in your main FastAPI app
router = company_router_container.router