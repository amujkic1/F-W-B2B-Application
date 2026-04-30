from uuid import UUID

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.industry import Industry
from app.schemas.industry import IndustryCreate, IndustryUpdate


def _industry_name_exists(db: Session, name: str, excluded_id: UUID | None = None) -> bool:
    query = db.query(Industry).filter(func.lower(Industry.name) == name.lower())
    if excluded_id is not None:
        query = query.filter(Industry.id != excluded_id)
    return db.query(query.exists()).scalar()


def _industry_slug_exists(db: Session, slug: str, excluded_id: UUID | None = None) -> bool:
    query = db.query(Industry).filter(func.lower(Industry.slug) == slug.lower())
    if excluded_id is not None:
        query = query.filter(Industry.id != excluded_id)
    return db.query(query.exists()).scalar()


def create_industry(db: Session, industry_in: IndustryCreate) -> Industry:
    if _industry_name_exists(db, industry_in.name):
        raise ValueError("Industry name already exists")
    if _industry_slug_exists(db, industry_in.slug):
        raise ValueError("Industry slug already exists")

    db_industry = Industry(**industry_in.model_dump())
    db.add(db_industry)
    db.commit()
    db.refresh(db_industry)
    return db_industry


def get_industry_by_id(db: Session, industry_id: UUID) -> Industry | None:
    return db.query(Industry).filter(Industry.id == industry_id).first()


def list_industries(db: Session, skip: int = 0, limit: int = 100) -> list[Industry]:
    return db.query(Industry).offset(skip).limit(limit).all()


def update_industry(db: Session, db_industry: Industry, industry_in: IndustryUpdate) -> Industry:
    update_data = industry_in.model_dump(exclude_unset=True)

    if "name" in update_data and _industry_name_exists(db, update_data["name"], db_industry.id):
        raise ValueError("Industry name already exists")
    if "slug" in update_data and _industry_slug_exists(db, update_data["slug"], db_industry.id):
        raise ValueError("Industry slug already exists")

    for field, value in update_data.items():
        setattr(db_industry, field, value)

    db.commit()
    db.refresh(db_industry)
    return db_industry


def delete_industry(db: Session, db_industry: Industry) -> None:
    db.delete(db_industry)
    db.commit()
