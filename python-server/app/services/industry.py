from typing import Any
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from .base import BaseService
from app.schemas.industry import IndustryCreate, IndustryUpdate
from app.models.industry import Industry


class IndustryService(BaseService[Industry, IndustryCreate, IndustryUpdate]):
    async def _name_exists(self, db: AsyncSession, name: str, excluded_id: Any | None = None) -> bool:
        query = select(Industry).filter(func.lower(Industry.name) == name.lower())
        if excluded_id is not None:
            query = query.filter(Industry.id != excluded_id)
        result = await db.execute(select(func.count()).select_from(query.subquery()))
        return bool(result.scalar())

    async def _slug_exists(self, db: AsyncSession, slug: str, excluded_id: Any | None = None) -> bool:
        query = select(Industry).filter(func.lower(Industry.slug) == slug.lower())
        if excluded_id is not None:
            query = query.filter(Industry.id != excluded_id)
        result = await db.execute(select(func.count()).select_from(query.subquery()))
        return bool(result.scalar())

    async def create(self, db: AsyncSession, *, obj_in: IndustryCreate) -> Industry:
        if await self._name_exists(db, obj_in.name):
            raise ValueError("Industry name already exists")
        if await self._slug_exists(db, obj_in.slug):
            raise ValueError("Industry slug already exists")

        return await super().create(db, obj_in=obj_in)

    async def update(self, db: AsyncSession, *, db_obj: Industry, obj_in: IndustryUpdate | dict[str, Any]) -> Industry:
        update_data = obj_in if isinstance(obj_in, dict) else obj_in.model_dump(exclude_unset=True)

        if "name" in update_data and await self._name_exists(db, update_data["name"], excluded_id=db_obj.id):
            raise ValueError("Industry name already exists")
        if "slug" in update_data and await self._slug_exists(db, update_data["slug"], excluded_id=db_obj.id):
            raise ValueError("Industry slug already exists")

        return await super().update(db, db_obj=db_obj, obj_in=update_data)


industry_service = IndustryService(Industry)
