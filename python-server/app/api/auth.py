from datetime import timedelta, datetime, timezone
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks, Query
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from jose import JWTError, jwt

from app.services.email import send_verification_email
from app.core.config import settings
from app.core.security import (
    create_access_token, 
    hash_password, 
    verify_password, 
    create_verification_token,
    create_refresh_token,
    verify_refresh_token
)
from app.db.database import get_db
from app.models.user import User
from app.models.user_refresh_tokens import UserRefreshToken
from app.schemas.token import Token
from app.schemas.user import UserCreate, UserRead

router = APIRouter(prefix="/api/auth", tags=["authentication"])

@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def register(
    user_in: UserCreate, 
    background_tasks: BackgroundTasks, 
    db: AsyncSession = Depends(get_db)
) -> Any:
    # Use await and select()
    result = await db.execute(select(User).where(User.email == user_in.email))
    existing_user = result.scalars().first()
    
    if existing_user is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already registered",
        )

    user = User(
        email=user_in.email,
        password_hash=hash_password(user_in.password),
    )
    
    db.add(user)
    await db.commit()
    await db.refresh(user)

    token = create_verification_token(user.email)
    background_tasks.add_task(send_verification_email, user.email, token)

    return user

@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db),
) -> Any:
    # Eager loading with selectinload is often safer in async than joinedload, 
    # but joinedload works here for a 1-to-1 profile
    query = select(User).options(joinedload(User.profile)).where(User.email == form_data.username)
    result = await db.execute(query)
    user = result.scalars().first()
    
    if user is None or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    refresh_token = create_refresh_token(str(user.id))
    
    expires_at = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    
    db_refresh_token = UserRefreshToken(
        user_id=user.id,
        token=refresh_token,
        expires_at=expires_at,
        is_revoked=False
    )
    db.add(db_refresh_token)
    await db.commit()
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": user 
    }

@router.get("/verify-email")
async def verify_email(token: str, db: AsyncSession = Depends(get_db)):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email = payload.get("sub")
        
        if payload.get("type") != "verification":
            raise HTTPException(status_code=400, detail="Invalid token type")
            
        result = await db.execute(select(User).where(User.email == email))
        user = result.scalars().first()
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        if user.is_verified:
            return {"msg": "Email je već ranije verifikovan."}

        user.is_verified = True
        await db.commit()
        
        return {"msg": "Uspješno ste verifikovali email! Sada se možete ulogovati."}
        
    except JWTError:
        raise HTTPException(status_code=400, detail="Link je neispravan ili je istekao.")

@router.post("/refresh", response_model=Token)
async def refresh(
    refresh_token: str = Query(..., description="Refresh token"), 
    db: AsyncSession = Depends(get_db)
):
    user_id = verify_refresh_token(refresh_token)
    
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    query = select(UserRefreshToken).where(
        UserRefreshToken.token == refresh_token,
        UserRefreshToken.is_revoked == False
    )
    result = await db.execute(query)
    db_token = result.scalars().first()
    
    if not db_token or db_token.expires_at < datetime.now(timezone.utc):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token has expired or been revoked"
        )
    
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()
    
    if not user or user.status != "active":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User is not active"
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    new_access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    
    return Token(
        access_token=new_access_token, 
        refresh_token=refresh_token, 
        token_type="bearer"
    )

@router.post("/logout")
async def logout(
    refresh_token: str = Query(..., description="Refresh token"), 
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(UserRefreshToken).where(UserRefreshToken.token == refresh_token))
    db_token = result.scalars().first()
    
    if not db_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
    
    db_token.is_revoked = True
    await db.commit()
    
    return {"msg": "Successfully logged out"}