from typing import Any

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.meeting_request import MeetingRequest
from app.schemas.meeting_request import MeetingRequestCreate, MeetingRequestUpdate
from .base import BaseService


class MeetingRequestService(BaseService[MeetingRequest, MeetingRequestCreate, MeetingRequestUpdate]):
    def _validate_meeting_window(self, start_at, end_at) -> None:
        if start_at >= end_at:
            raise ValueError("requested_start_at must be before requested_end_at")

    async def get_all(
        self,
        db: AsyncSession,
        skip: int = 0,
        limit: int = 100,
        options: list | None = None,
        **filters,
    ) -> dict[str, Any]:
        query = select(self.model).order_by(self.model.created_at.desc())

        if options:
            query = query.options(*options)

        active_filters = {
            key: value
            for key, value in filters.items()
            if value is not None and hasattr(self.model, key)
        }

        if active_filters:
            query = query.filter_by(**active_filters)

        count_query = select(func.count()).select_from(query.subquery())
        count_result = await db.execute(count_query)
        total = count_result.scalar() or 0

        items_result = await db.execute(query.offset(skip).limit(limit))

        return {
            "items": list(items_result.scalars().all()),
            "total": total,
            "skip": skip,
            "limit": limit,
        }

    async def create(self, db: AsyncSession, *, obj_in: MeetingRequestCreate) -> MeetingRequest:
        self._validate_meeting_window(obj_in.requested_start_at, obj_in.requested_end_at)
        return await super().create(db, obj_in=obj_in)

    async def update(
        self,
        db: AsyncSession,
        *,
        db_obj: MeetingRequest,
        obj_in: MeetingRequestUpdate | dict[str, Any],
    ) -> MeetingRequest:
        update_data = obj_in if isinstance(obj_in, dict) else obj_in.model_dump(exclude_unset=True)

        start_at = update_data.get("requested_start_at", db_obj.requested_start_at)
        end_at = update_data.get("requested_end_at", db_obj.requested_end_at)
        self._validate_meeting_window(start_at, end_at)

        return await super().update(db, db_obj=db_obj, obj_in=update_data)


meeting_request_service = MeetingRequestService(MeetingRequest)
