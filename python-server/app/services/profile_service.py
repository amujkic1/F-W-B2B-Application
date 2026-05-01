from .base import BaseService
from app.schemas.profile import ProfileCreate, ProfileUpdate
from app.models.profile import Profile

class ProfileService(BaseService[Profile, ProfileCreate, ProfileUpdate]):
    """
    Since lazy="selectin" is set on the Profile model, 
    this service inherits all async logic from BaseService 
    and automatically includes the Company relationship.
    """
    pass

profile_service = ProfileService(Profile)