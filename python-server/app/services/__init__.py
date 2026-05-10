from .profile_service import ProfileService
from .company import CompanyService
from app.models.profile import Profile
from app.models.company import Company
from .industry import IndustryService
from app.models.industry import Industry
from .company_type import CompanyTypeService
from app.models.company_type import CompanyType
from .meeting_request_service import MeetingRequestService
from app.models.meeting_request import MeetingRequest

# Instantiate it here
profile_service = ProfileService(Profile)
company_service = CompanyService(Company)
industry_service = IndustryService(Industry)
company_type_service = CompanyTypeService(CompanyType)
meeting_request_service = MeetingRequestService(MeetingRequest)
