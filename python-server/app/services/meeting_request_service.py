from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.meeting_request import MeetingRequest
from app.schemas.meeting_request import MeetingRequestCreate, MeetingRequestUpdate


def _validate_meeting_window(start_at, end_at) -> None:
    if start_at >= end_at:
        raise ValueError("requested_start_at must be before requested_end_at")


async def create_meeting_request(db: AsyncSession, meeting_request_in: MeetingRequestCreate) -> MeetingRequest:
    _validate_meeting_window(meeting_request_in.requested_start_at, meeting_request_in.requested_end_at)

    db_meeting_request = MeetingRequest(**meeting_request_in.model_dump())
    db.add(db_meeting_request)
    await db.commit()
    await db.refresh(db_meeting_request)
    return db_meeting_request


async def get_meeting_request_by_id(db: AsyncSession, meeting_request_id: UUID) -> MeetingRequest | None:
    result = await db.execute(select(MeetingRequest).where(MeetingRequest.id == meeting_request_id))
    return result.scalars().first()


async def list_meeting_requests(db: AsyncSession, skip: int = 0, limit: int = 100) -> list[MeetingRequest]:
    result = await db.execute(select(MeetingRequest).offset(skip).limit(limit))
    return list(result.scalars().all())


async def update_meeting_request(
    db: AsyncSession,
    db_meeting_request: MeetingRequest,
    meeting_request_in: MeetingRequestUpdate,
) -> MeetingRequest:
    update_data = meeting_request_in.model_dump(exclude_unset=True)

    start_at = update_data.get("requested_start_at", db_meeting_request.requested_start_at)
    end_at = update_data.get("requested_end_at", db_meeting_request.requested_end_at)
    _validate_meeting_window(start_at, end_at)

    for field, value in update_data.items():
        setattr(db_meeting_request, field, value)

    db.add(db_meeting_request)
    await db.commit()
    await db.refresh(db_meeting_request)
    return db_meeting_request


async def delete_meeting_request(db: AsyncSession, db_meeting_request: MeetingRequest) -> None:
    await db.delete(db_meeting_request)
    await db.commit()
