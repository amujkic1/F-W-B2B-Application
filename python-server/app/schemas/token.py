from pydantic import BaseModel
from datetime import datetime
from uuid import UUID
from typing import Optional

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class TokenData(BaseModel):
    sub: Optional[str] = None
    email: Optional[str] = None