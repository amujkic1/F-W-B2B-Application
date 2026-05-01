from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel  
from app.services.base import BaseService
from app.schemas.paginated_response import PaginatedResponse 
from app.db.database import get_db

class BaseRouter[Model, ReadSchema, CreateSchema: BaseModel, UpdateSchema: BaseModel]:
    def __init__(
        self, 
        service: BaseService[Model, CreateSchema, UpdateSchema],
        read_schema: type[ReadSchema],
        create_schema: type[CreateSchema],
        update_schema: type[UpdateSchema],
        prefix: str,
        tags: list[str]
    ):
        self.router = APIRouter(prefix=prefix, tags=tags)
        self.service = service
        self.read_schema = read_schema
        self.create_schema = create_schema
        self.update_schema = update_schema
        self._setup_routes()

    def _setup_routes(self):
        @self.router.get("/", response_model=PaginatedResponse[self.read_schema])
        async def read_all(
            skip: int = 0,
            limit: int = 10,
            username: str | None = None, 
            db: AsyncSession = Depends(get_db) # Switch to AsyncSession
        ):
            # Await the service call
            return await self.service.get_all(db, skip=skip, limit=limit, username=username)

        @self.router.get("/{id}", response_model=self.read_schema)
        async def read_by_id(id: int, db: AsyncSession = Depends(get_db)):
            item = await self.service.get(db, id=id)
            if not item:
                raise HTTPException(status_code=404, detail="Resource not found")
            return item

        @self.router.post("/", response_model=self.read_schema, status_code=201)
        async def create(obj_in: self.create_schema, db: AsyncSession = Depends(get_db)):
            return await self.service.create(db, obj_in=obj_in)

        @self.router.put("/{id}", response_model=self.read_schema)
        async def update(id: int, obj_in: self.update_schema, db: AsyncSession = Depends(get_db)):
            item = await self.service.get(db, id=id)
            if not item:
                raise HTTPException(status_code=404, detail="Resource not found")
            return await self.service.update(db, db_obj=item, obj_in=obj_in)

        @self.router.delete("/{id}", status_code=204)
        async def delete(id: int, db: AsyncSession = Depends(get_db)):
            success = await self.service.remove(db, id=id)
            if not success:
                raise HTTPException(status_code=404, detail="Resource not found")
            return None