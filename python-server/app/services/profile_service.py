from sqlalchemy.orm import Session, joinedload
from typing import Any
from .base import BaseService
from app.schemas.profile import ProfileCreate, ProfileUpdate
from app.models.profile import Profile

class ProfileService(BaseService[Profile, ProfileCreate, ProfileUpdate]):
    
    # We only override this if we need relationships like 'company'
    def list_profiles(self, db: Session, skip: int = 0, limit: int = 10, **filters: object) -> dict[str, Any]:
        # We start the query with joinedload
        query = db.query(self.model).options(joinedload(Profile.company))
        
        # Now we just do exactly what the base does, or better yet,
        # refactor the base to have a '_apply_filters' method so you 
        # truly never repeat yourself.
        return super().get_all(db, skip=skip, limit=limit, **filters)

profile_service = ProfileService(Profile)