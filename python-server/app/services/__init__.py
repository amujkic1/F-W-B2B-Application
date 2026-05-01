from .profile_service import ProfileService
from app.models.profile import Profile

# Instantiate it here
profile_service = ProfileService(Profile)