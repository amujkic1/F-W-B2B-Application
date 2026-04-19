from uuid import UUID

from sqlalchemy.orm import Session

from models.unavailable_period import UnavailablePeriod
from schemas.unavailable_period import UnavailablePeriodCreate, UnavailablePeriodUpdate


def _validate_time_window(start_datetime, end_datetime) -> None:
    if start_datetime >= end_datetime:
        raise ValueError("start_datetime must be before end_datetime")


def create_unavailable_period(db: Session, unavailable_period_in: UnavailablePeriodCreate) -> UnavailablePeriod:
    _validate_time_window(unavailable_period_in.start_datetime, unavailable_period_in.end_datetime)

    db_unavailable_period = UnavailablePeriod(**unavailable_period_in.model_dump())
    db.add(db_unavailable_period)
    db.commit()
    db.refresh(db_unavailable_period)
    return db_unavailable_period


def get_unavailable_period_by_id(db: Session, unavailable_period_id: UUID) -> UnavailablePeriod | None:
    return db.query(UnavailablePeriod).filter(UnavailablePeriod.id == unavailable_period_id).first()


def list_unavailable_periods(db: Session, skip: int = 0, limit: int = 100) -> list[UnavailablePeriod]:
    return db.query(UnavailablePeriod).offset(skip).limit(limit).all()


def update_unavailable_period(
    db: Session,
    db_unavailable_period: UnavailablePeriod,
    unavailable_period_in: UnavailablePeriodUpdate,
) -> UnavailablePeriod:
    update_data = unavailable_period_in.model_dump(exclude_unset=True)

    start_datetime = update_data.get("start_datetime", db_unavailable_period.start_datetime)
    end_datetime = update_data.get("end_datetime", db_unavailable_period.end_datetime)
    _validate_time_window(start_datetime, end_datetime)

    for field, value in update_data.items():
        setattr(db_unavailable_period, field, value)

    db.commit()
    db.refresh(db_unavailable_period)
    return db_unavailable_period


def delete_unavailable_period(db: Session, db_unavailable_period: UnavailablePeriod) -> None:
    db.delete(db_unavailable_period)
    db.commit()
