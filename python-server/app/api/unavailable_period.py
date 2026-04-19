from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from sqlalchemy.orm import Session

from db.database import get_db
from schemas.unavailable_period import (
    UnavailablePeriodCreate,
    UnavailablePeriodRead,
    UnavailablePeriodUpdate,
)
from services.unavailable_period_service import (
    create_unavailable_period,
    delete_unavailable_period,
    get_unavailable_period_by_id,
    list_unavailable_periods,
    update_unavailable_period,
)


router = APIRouter(prefix="/api/unavailable-periods", tags=["unavailable-periods"])


@router.post("/", response_model=UnavailablePeriodRead, status_code=status.HTTP_201_CREATED)
def create_unavailable_period_endpoint(
    unavailable_period_in: UnavailablePeriodCreate,
    db: Session = Depends(get_db),
) -> UnavailablePeriodRead:
    try:
        return create_unavailable_period(db, unavailable_period_in)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@router.get("/", response_model=list[UnavailablePeriodRead])
def list_unavailable_periods_endpoint(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db),
) -> list[UnavailablePeriodRead]:
    return list_unavailable_periods(db, skip=skip, limit=limit)


@router.get("/{unavailable_period_id}", response_model=UnavailablePeriodRead)
def get_unavailable_period_endpoint(
    unavailable_period_id: UUID,
    db: Session = Depends(get_db),
) -> UnavailablePeriodRead:
    db_unavailable_period = get_unavailable_period_by_id(db, unavailable_period_id)
    if db_unavailable_period is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Unavailable period not found")
    return db_unavailable_period


@router.patch("/{unavailable_period_id}", response_model=UnavailablePeriodRead)
def update_unavailable_period_endpoint(
    unavailable_period_id: UUID,
    unavailable_period_in: UnavailablePeriodUpdate,
    db: Session = Depends(get_db),
) -> UnavailablePeriodRead:
    db_unavailable_period = get_unavailable_period_by_id(db, unavailable_period_id)
    if db_unavailable_period is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Unavailable period not found")

    try:
        return update_unavailable_period(db, db_unavailable_period, unavailable_period_in)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@router.delete("/{unavailable_period_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_unavailable_period_endpoint(
    unavailable_period_id: UUID,
    db: Session = Depends(get_db),
) -> Response:
    db_unavailable_period = get_unavailable_period_by_id(db, unavailable_period_id)
    if db_unavailable_period is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Unavailable period not found")

    delete_unavailable_period(db, db_unavailable_period)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
