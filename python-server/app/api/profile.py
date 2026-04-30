from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from sqlalchemy.orm import Session

from db.database import get_db
from models.profile import Profile
from schemas.profile import ProfileCreate, ProfileRead, ProfileUpdate
from schemas.paginated_response import PaginatedResponse
from services.profile_service import (
    create_profile,
    delete_profile,
    get_profile_by_id,
    list_profiles,
    update_profile,
)


router = APIRouter(prefix="/api/profiles", tags=["profiles"])


@router.post("/", response_model=ProfileRead, status_code=status.HTTP_201_CREATED)
def create_profile_endpoint(profile_in: ProfileCreate, db: Session = Depends(get_db)) -> ProfileRead:
    try:
        return create_profile(db, profile_in)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@router.get("/", response_model=PaginatedResponse[ProfileRead])
def list_profiles_endpoint(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db),
) -> PaginatedResponse[ProfileRead]:
    total = db.query(Profile).count()
    profiles = list_profiles(db, skip=skip, limit=limit)
    return PaginatedResponse(items= profiles, total=total, skip=skip, limit=limit)
    


@router.get("/{profile_id}", response_model=ProfileRead)
def get_profile_endpoint(profile_id: UUID, db: Session = Depends(get_db)) -> ProfileRead:
    db_profile = get_profile_by_id(db, profile_id)
    if db_profile is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")
    return db_profile


@router.patch("/{profile_id}", response_model=ProfileRead)
def update_profile_endpoint(
    profile_id: UUID,
    profile_in: ProfileUpdate,
    db: Session = Depends(get_db),
) -> ProfileRead:
    db_profile = get_profile_by_id(db, profile_id)
    if db_profile is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")

    return update_profile(db, db_profile, profile_in)


@router.delete("/{profile_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_profile_endpoint(profile_id: UUID, db: Session = Depends(get_db)) -> Response:
    db_profile = get_profile_by_id(db, profile_id)
    if db_profile is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")

    delete_profile(db, db_profile)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
