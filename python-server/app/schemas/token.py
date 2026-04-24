from pydantic import BaseModel
from datetime import datetime
from uuid import UUID

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class TokenData(BaseModel):
    sub: str | None = None
    email: str | None = None