from collections.abc import Callable

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel  
from app.services.base import BaseService
from app.schemas.paginated_response import PaginatedResponse 
from app.db.database import get_db
from uuid import UUID

class BaseRouter[Model, ReadSchema, CreateSchema: BaseModel, UpdateSchema: BaseModel, FilterSchema: BaseModel]:
    def __init__(
        self, 
        service: BaseService[Model, CreateSchema, UpdateSchema],
        read_schema: type[ReadSchema],
        create_schema: type[CreateSchema],
        update_schema: type[UpdateSchema],
        prefix: str,
        tags: list[str],
        filter_schema: type[FilterSchema] | None = None,
        write_dependency: Callable | None = None,
    ):
        self.router = APIRouter(prefix=prefix, tags=tags)
        self.service = service
        self.read_schema = read_schema
        self.create_schema = create_schema
        self.update_schema = update_schema
        self.filter_schema = filter_schema
        self.write_dependencies = [Depends(write_dependency)] if write_dependency else []
        self._setup_routes()

    def _setup_routes(self):
        if self.filter_schema:
            FilterDep = self.filter_schema

            @self.router.get("/", response_model=PaginatedResponse[self.read_schema])
            async def read_all(
                skip: int = 0,
                limit: int = 10,
                db: AsyncSession = Depends(get_db),
                filters: FilterDep = Depends()
            ):
                filter_data = filters.model_dump(exclude_none=True)
                return await self.service.get_all(db, skip=skip, limit=limit, **filter_data)
        else:
            @self.router.get("/", response_model=PaginatedResponse[self.read_schema])
            async def read_all(
                skip: int = 0,
                limit: int = 10,
                db: AsyncSession = Depends(get_db),
            ):
                return await self.service.get_all(db, skip=skip, limit=limit)

        @self.router.get("/{id}", response_model=self.read_schema)
        async def read_by_id(id: UUID, db: AsyncSession = Depends(get_db)): # UUID ispravka
            item = await self.service.get(db, id=id)
            if not item:
                raise HTTPException(status_code=404, detail="Resource not found")
            return item

        @self.router.post(
            "/",
            response_model=self.read_schema,
            status_code=201,
            dependencies=self.write_dependencies,
        )
        async def create(obj_in: self.create_schema, db: AsyncSession = Depends(get_db)):
            try:
                return await self.service.create(db, obj_in=obj_in)
            except ValueError as exc:
                raise HTTPException(status_code=400, detail=str(exc)) from exc

        @self.router.put(
            "/{id}",
            response_model=self.read_schema,
            dependencies=self.write_dependencies,
        )
        @self.router.patch(
            "/{id}",
            response_model=self.read_schema,
            dependencies=self.write_dependencies,
        )
        async def update(id: UUID, obj_in: self.update_schema, db: AsyncSession = Depends(get_db)):
            item = await self.service.get(db, id=id)
            if not item:
                raise HTTPException(status_code=404, detail="Resource not found")
            try:
                return await self.service.update(db, db_obj=item, obj_in=obj_in)
            except ValueError as exc:
                raise HTTPException(status_code=400, detail=str(exc)) from exc

        @self.router.delete(
            "/{id}",
            status_code=204,
            dependencies=self.write_dependencies,
        )
        async def delete(id: UUID, db: AsyncSession = Depends(get_db)):
            success = await self.service.remove(db, id=id)
            if not success:
                raise HTTPException(status_code=404, detail="Resource not found")
            return None
