from uuid import UUID

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.security import decode_access_token
from app.db.database import get_db
from app.models.user import User
from app.schemas.token import TokenData

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    """
    Dependency to require a valid Bearer token on protected routes.
    """

    credentials_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decode_access_token(token)
        token_data = TokenData(sub=payload.get("sub"))
        if token_data.sub is None:
            raise credentials_error
        user_id = UUID(token_data.sub)
    except (JWTError, ValueError):
        raise credentials_error from None

    query = (
        select(User)
        .options(selectinload(User.profile)) 
        .where(User.id == user_id)
    )
    
    result = await db.execute(query)
    user = result.scalars().first()

    if user is None:
        raise credentials_error

    return user