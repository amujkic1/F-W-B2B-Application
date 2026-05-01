from typing import Any, Union
from sqlalchemy.orm import Session
from pydantic import BaseModel

class BaseService[Model, CreateSchema: BaseModel, UpdateSchema: BaseModel]:
    def __init__(self, model: type[Model]):
        self.model = model

    def get(self, db: Session, id: int) -> Model | None:
        return db.query(self.model).filter(self.model.id == id).first()

    def get_all(
        self, db: Session, skip: int = 0, limit: int = 10, **filters: object
    ) -> dict[str, Any]:
        query = db.query(self.model)
        
        if filters:
            active_filters = {k: v for k, v in filters.items() if v is not None}
            query = query.filter_by(**active_filters)
            
        total = query.count()
        items = query.offset(skip).limit(limit).all()
        
        return {
            "items": items,
            "total": total,
            "skip": skip,
            "limit": limit
        }

    def create(self, db: Session, *, obj_in: CreateSchema) -> Model:
        db_obj = self.model(**obj_in.model_dump())
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: Model, obj_in: Union[UpdateSchema, dict[str, Any]]
    ) -> Model:
        update_data = obj_in if isinstance(obj_in, dict) else obj_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, *, id: int) -> Model | None:
        obj = db.query(self.model).get(id)
        if obj:
            db.delete(obj)
            db.commit()
        return obj