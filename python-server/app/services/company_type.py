from typing import Any
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from .base import BaseService
from app.schemas.company_type import CompanyTypeCreate, CompanyTypeUpdate
from app.models.company_type import CompanyType


class CompanyTypeService(BaseService[CompanyType, CompanyTypeCreate, CompanyTypeUpdate]):
    async def _name_exists(self, db: AsyncSession, name: str, excluded_id: Any | None = None) -> bool:
        query = select(CompanyType).filter(func.lower(CompanyType.name) == name.lower())
        if excluded_id is not None:
            query = query.filter(CompanyType.id != excluded_id)
        result = await db.execute(select(func.count()).select_from(query.subquery()))
        return bool(result.scalar())

    async def create(self, db: AsyncSession, *, obj_in: CompanyTypeCreate) -> CompanyType:
        if await self._name_exists(db, obj_in.name):
            raise ValueError("Company type name already exists")
        return await super().create(db, obj_in=obj_in)

    async def update(self, db: AsyncSession, *, db_obj: CompanyType, obj_in: CompanyTypeUpdate | dict[str, Any]) -> CompanyType:
        update_data = obj_in if isinstance(obj_in, dict) else obj_in.model_dump(exclude_unset=True)
        if "name" in update_data and await self._name_exists(db, update_data["name"], excluded_id=db_obj.id):
            raise ValueError("Company type name already exists")
        return await super().update(db, db_obj=db_obj, obj_in=update_data)


company_type_service = CompanyTypeService(CompanyType)
