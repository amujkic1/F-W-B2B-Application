from app.schemas.industry import IndustryCreate, IndustryRead, IndustryUpdate
from app.services import industry_service
from app.api.deps import get_current_user
from .base import BaseRouter

# Initialize generic router for industries using the BaseRouter
industry_router_container = BaseRouter(
    service=industry_service,
    read_schema=IndustryRead,
    create_schema=IndustryCreate,
    update_schema=IndustryUpdate,
    prefix="/api/industries",
    tags=["industries"],
    write_dependency=get_current_user,
)

router = industry_router_container.router
