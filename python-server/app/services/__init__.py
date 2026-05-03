from .profile_service import ProfileService
from .company import CompanyService
from app.models.profile import Profile
from app.models.company import Company

# Instantiate it here
profile_service = ProfileService(Profile)
company_service = CompanyService(Company)