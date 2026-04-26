from pydantic import BaseModel
from datetime import datetime
from uuid import UUID
from .user import UserLoginData

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    user: UserLoginData

class TokenData(BaseModel):
    sub: str | None = None
    email: str | None = None