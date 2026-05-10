from typing import Any, Union
from sqlalchemy import select, func, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel

class BaseService[Model, CreateSchema: BaseModel, UpdateSchema: BaseModel]:
    def __init__(self, model: type[Model]):
        self.model = model

    async def get(self, db: AsyncSession, id: Any) -> Model | None:
        result = await db.execute(select(self.model).where(self.model.id == id))
        return result.scalars().first()

    async def get_all(
        self, db: AsyncSession, skip: int = 0, limit: int = 10, options: list = None, **filters
    ) -> dict[str, Any]:
        query = select(self.model)

        if options:
            query = query.options(*options)
        
        if filters:
            active_filters = {
                k: v for k, v in filters.items() 
                if v is not None and hasattr(self.model, k)
            }
            if active_filters:
                query = query.filter_by(**active_filters)
                
        count_query = select(func.count()).select_from(query.subquery())
        count_result = await db.execute(count_query)
        total = count_result.scalar() or 0
        
        items_result = await db.execute(query.offset(skip).limit(limit))
        items = items_result.scalars().all()
        
        return {
            "items": items,
            "total": total,
            "skip": skip,
            "limit": limit
        }

    async def create(self, db: AsyncSession, *, obj_in: CreateSchema) -> Model:
        db_obj = self.model(**obj_in.model_dump())
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def update(
        self, db: AsyncSession, *, db_obj: Model, obj_in: Union[UpdateSchema, dict[str, Any]]
    ) -> Model:
        update_data = obj_in if isinstance(obj_in, dict) else obj_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def remove(self, db: AsyncSession, *, id: Any) -> Model | None:
        result = await db.execute(select(self.model).where(self.model.id == id))
        obj = result.scalars().first()
        
        if obj:
            await db.delete(obj)
            await db.commit()
        return obj
