from uuid import UUID

from sqlalchemy.orm import Session, selectinload

from models.profile import Profile
from schemas.profile import ProfileCreate, ProfileUpdate


def create_profile(db: Session, profile_in: ProfileCreate) -> Profile:
    existing_profile = db.query(Profile).filter(Profile.user_id == profile_in.user_id).first()
    if existing_profile is not None:
        raise ValueError("Profile for this user already exists")

    db_profile = Profile(**profile_in.model_dump())
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile


def get_profile_by_id(db: Session, profile_id: UUID) -> Profile | None:
    return db.query(Profile).filter(Profile.id == profile_id).first()


def list_profiles(db: Session, skip: int = 0, limit: int = 100) -> list[Profile]:
    return db.query(Profile).options(selectinload(Profile.company)).offset(skip).limit(limit).all()


def update_profile(db: Session, db_profile: Profile, profile_in: ProfileUpdate) -> Profile:
    update_data = profile_in.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(db_profile, field, value)

    db.commit()
    db.refresh(db_profile)
    return db_profile


def delete_profile(db: Session, db_profile: Profile) -> None:
    db.delete(db_profile)
    db.commit()
