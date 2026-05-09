from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.models.meeting_request import MeetingRequest
from app.schemas.paginated_response import PaginatedResponse
from app.schemas.meeting_request import MeetingRequestCreate, MeetingRequestRead, MeetingRequestUpdate
from app.services.meeting_request_service import (
    create_meeting_request,
    delete_meeting_request,
    get_meeting_request_by_id,
    list_meeting_requests,
    update_meeting_request,
)


router = APIRouter(prefix="/api/meeting-requests", tags=["meeting-requests"])


@router.post("/", response_model=MeetingRequestRead, status_code=status.HTTP_201_CREATED)
async def create_meeting_request_endpoint(
    meeting_request_in: MeetingRequestCreate,
    db: AsyncSession = Depends(get_db),
) -> MeetingRequestRead:
    try:
        return await create_meeting_request(db, meeting_request_in)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@router.get("/", response_model=PaginatedResponse[MeetingRequestRead])
async def list_meeting_requests_endpoint(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: AsyncSession = Depends(get_db),
) -> PaginatedResponse[MeetingRequestRead]:
    total_result = await db.execute(select(func.count()).select_from(MeetingRequest))
    meeting_requests = await list_meeting_requests(db, skip=skip, limit=limit)
    return PaginatedResponse(
        items=meeting_requests,
        total=total_result.scalar_one(),
        skip=skip,
        limit=limit,
    )


@router.get("/{meeting_request_id}", response_model=MeetingRequestRead)
async def get_meeting_request_endpoint(
    meeting_request_id: UUID,
    db: AsyncSession = Depends(get_db),
) -> MeetingRequestRead:
    db_meeting_request = await get_meeting_request_by_id(db, meeting_request_id)
    if db_meeting_request is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Meeting request not found")
    return db_meeting_request


@router.patch("/{meeting_request_id}", response_model=MeetingRequestRead)
async def update_meeting_request_endpoint(
    meeting_request_id: UUID,
    meeting_request_in: MeetingRequestUpdate,
    db: AsyncSession = Depends(get_db),
) -> MeetingRequestRead:
    db_meeting_request = await get_meeting_request_by_id(db, meeting_request_id)
    if db_meeting_request is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Meeting request not found")

    try:
        return await update_meeting_request(db, db_meeting_request, meeting_request_in)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@router.delete("/{meeting_request_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_meeting_request_endpoint(
    meeting_request_id: UUID,
    db: AsyncSession = Depends(get_db),
) -> Response:
    db_meeting_request = await get_meeting_request_by_id(db, meeting_request_id)
    if db_meeting_request is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Meeting request not found")

    await delete_meeting_request(db, db_meeting_request)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
