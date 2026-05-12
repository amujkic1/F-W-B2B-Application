from app.schemas.company_type import CompanyTypeCreate, CompanyTypeRead, CompanyTypeUpdate
from app.services import company_type_service
from app.api.deps import get_current_user
from .base import BaseRouter


# Initialize generic router for company types using the BaseRouter
company_type_router_container = BaseRouter(
    service=company_type_service,
    read_schema=CompanyTypeRead,
    create_schema=CompanyTypeCreate,
    update_schema=CompanyTypeUpdate,
    prefix="/api/company-types",
    tags=["company_types"],
    write_dependency=get_current_user,
)

router = company_type_router_container.router
