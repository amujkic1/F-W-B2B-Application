from app.schemas.meeting_request import (
    MeetingRequestCreate,
    MeetingRequestFilter,
    MeetingRequestRead,
    MeetingRequestUpdate,
)
from app.services import meeting_request_service
from .base import BaseRouter


meeting_request_router_container = BaseRouter(
    service=meeting_request_service,
    read_schema=MeetingRequestRead,
    create_schema=MeetingRequestCreate,
    update_schema=MeetingRequestUpdate,
    filter_schema=MeetingRequestFilter,
    prefix="/api/meeting-requests",
    tags=["meeting-requests"],
)

router = meeting_request_router_container.router
