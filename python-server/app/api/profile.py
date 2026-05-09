from app.schemas.profile import ProfileCreate, ProfileRead, ProfileUpdate, ProfileFilter
from app.services import profile_service
from .base import BaseRouter

# We initialize the generic router with the profile service and schemas
profile_router_container = BaseRouter(
    service=profile_service,
    read_schema=ProfileRead,
    create_schema=ProfileCreate,
    update_schema=ProfileUpdate,
    filter_schema=ProfileFilter,
    prefix="/api/profiles",
    tags=["profiles"]
)

# Export this for inclusion in your main FastAPI app
router = profile_router_container.router