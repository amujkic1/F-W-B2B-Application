from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from sqlalchemy.orm import Session

from db.database import get_db
from schemas.meeting_request import MeetingRequestCreate, MeetingRequestRead, MeetingRequestUpdate
from services.meeting_request_service import (
    create_meeting_request,
    delete_meeting_request,
    get_meeting_request_by_id,
    list_meeting_requests,
    update_meeting_request,
)


router = APIRouter(prefix="/api/meeting-requests", tags=["meeting-requests"])


@router.post("/", response_model=MeetingRequestRead, status_code=status.HTTP_201_CREATED)
def create_meeting_request_endpoint(
    meeting_request_in: MeetingRequestCreate,
    db: Session = Depends(get_db),
) -> MeetingRequestRead:
    try:
        return create_meeting_request(db, meeting_request_in)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@router.get("/", response_model=list[MeetingRequestRead])
def list_meeting_requests_endpoint(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db),
) -> list[MeetingRequestRead]:
    return list_meeting_requests(db, skip=skip, limit=limit)


@router.get("/{meeting_request_id}", response_model=MeetingRequestRead)
def get_meeting_request_endpoint(
    meeting_request_id: UUID,
    db: Session = Depends(get_db),
) -> MeetingRequestRead:
    db_meeting_request = get_meeting_request_by_id(db, meeting_request_id)
    if db_meeting_request is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Meeting request not found")
    return db_meeting_request


@router.patch("/{meeting_request_id}", response_model=MeetingRequestRead)
def update_meeting_request_endpoint(
    meeting_request_id: UUID,
    meeting_request_in: MeetingRequestUpdate,
    db: Session = Depends(get_db),
) -> MeetingRequestRead:
    db_meeting_request = get_meeting_request_by_id(db, meeting_request_id)
    if db_meeting_request is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Meeting request not found")

    try:
        return update_meeting_request(db, db_meeting_request, meeting_request_in)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@router.delete("/{meeting_request_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_meeting_request_endpoint(
    meeting_request_id: UUID,
    db: Session = Depends(get_db),
) -> Response:
    db_meeting_request = get_meeting_request_by_id(db, meeting_request_id)
    if db_meeting_request is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Meeting request not found")

    delete_meeting_request(db, db_meeting_request)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
