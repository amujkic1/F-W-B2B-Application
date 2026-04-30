from uuid import UUID

from sqlalchemy.orm import Session

from models.meeting_request import MeetingRequest
from schemas.meeting_request import MeetingRequestCreate, MeetingRequestUpdate


def _validate_meeting_window(start_at, end_at) -> None:
    if start_at >= end_at:
        raise ValueError("requested_start_at must be before requested_end_at")


def create_meeting_request(db: Session, meeting_request_in: MeetingRequestCreate) -> MeetingRequest:
    _validate_meeting_window(meeting_request_in.requested_start_at, meeting_request_in.requested_end_at)

    db_meeting_request = MeetingRequest(**meeting_request_in.model_dump())
    db.add(db_meeting_request)
    db.commit()
    db.refresh(db_meeting_request)
    return db_meeting_request


def get_meeting_request_by_id(db: Session, meeting_request_id: UUID) -> MeetingRequest | None:
    return db.query(MeetingRequest).filter(MeetingRequest.id == meeting_request_id).first()


def list_meeting_requests(db: Session, skip: int = 0, limit: int = 100) -> list[MeetingRequest]:
    return db.query(MeetingRequest).offset(skip).limit(limit).all()


def update_meeting_request(
    db: Session,
    db_meeting_request: MeetingRequest,
    meeting_request_in: MeetingRequestUpdate,
) -> MeetingRequest:
    update_data = meeting_request_in.model_dump(exclude_unset=True)

    start_at = update_data.get("requested_start_at", db_meeting_request.requested_start_at)
    end_at = update_data.get("requested_end_at", db_meeting_request.requested_end_at)
    _validate_meeting_window(start_at, end_at)

    for field, value in update_data.items():
        setattr(db_meeting_request, field, value)

    db.commit()
    db.refresh(db_meeting_request)
    return db_meeting_request


def delete_meeting_request(db: Session, db_meeting_request: MeetingRequest) -> None:
    db.delete(db_meeting_request)
    db.commit()
