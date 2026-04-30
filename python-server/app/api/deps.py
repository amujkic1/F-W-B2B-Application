from uuid import UUID

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.orm import Session, joinedload

from app.core.security import decode_access_token
from app.db.database import get_db
from app.models.user import User
from app.schemas.token import TokenData


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    """
    Use this dependency on protected routes to require a valid Bearer token.

    Example:
        @router.get("/me", response_model=UserRead)
        def read_me(current_user: User = Depends(get_current_user)):
            return current_user
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

    user = db.query(User).options(joinedload(User.profile)).filter(User.id == user_id).first()
    if user is None:
        raise credentials_error

    return user