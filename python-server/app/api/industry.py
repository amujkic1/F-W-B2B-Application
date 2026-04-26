from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from sqlalchemy.orm import Session

from db.database import get_db
from models.industry import Industry
from schemas.paginated_response import PaginatedResponse
from schemas.industry import IndustryCreate, IndustryRead, IndustryUpdate
from services.industry_service import (
    create_industry,
    delete_industry,
    get_industry_by_id,
    list_industries,
    update_industry,
)


router = APIRouter(prefix="/api/industries", tags=["industries"])


@router.post("/", response_model=IndustryRead, status_code=status.HTTP_201_CREATED)
def create_industry_endpoint(industry_in: IndustryCreate, db: Session = Depends(get_db)) -> IndustryRead:
    try:
        return create_industry(db, industry_in)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@router.get("/", response_model=PaginatedResponse[IndustryRead])
def list_industries_endpoint(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db),
) -> PaginatedResponse[IndustryRead]:
    total = db.query(Industry).count()
    industries = list_industries(db, skip=skip, limit=limit)
    return PaginatedResponse(items=industries, total=total, skip=skip, limit=limit)


@router.get("/{industry_id}", response_model=IndustryRead)
def get_industry_endpoint(industry_id: UUID, db: Session = Depends(get_db)) -> IndustryRead:
    db_industry = get_industry_by_id(db, industry_id)
    if db_industry is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Industry not found")
    return db_industry


@router.patch("/{industry_id}", response_model=IndustryRead)
def update_industry_endpoint(
    industry_id: UUID,
    industry_in: IndustryUpdate,
    db: Session = Depends(get_db),
) -> IndustryRead:
    db_industry = get_industry_by_id(db, industry_id)
    if db_industry is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Industry not found")

    try:
        return update_industry(db, db_industry, industry_in)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@router.delete("/{industry_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_industry_endpoint(industry_id: UUID, db: Session = Depends(get_db)) -> Response:
    db_industry = get_industry_by_id(db, industry_id)
    if db_industry is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Industry not found")

    delete_industry(db, db_industry)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
