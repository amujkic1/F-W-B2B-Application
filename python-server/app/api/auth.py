import secrets
from datetime import timedelta, datetime, timezone
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status, Query
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from jose import JWTError, jwt

from app.core.config import settings
from app.core.security import (
    create_access_token, 
    hash_password, 
    verify_password, 
    create_refresh_token,
    verify_refresh_token
)
from app.api.deps import get_current_user
from app.db.database import get_db
from app.models.company import Company
from app.models.company_invitation import CompanyInvitation
from app.models.company_type import CompanyType
from app.models.industry import Industry
from app.models.profile import Profile
from app.models.user import User
from app.models.user_refresh_tokens import UserRefreshToken
from app.schemas.token import Token
from app.schemas.user import (
    CompanyInvitationCreate,
    CompanyInvitationRead,
    CompanyRegistrationCreate,
    InvitationRegistrationCreate,
    UserCreate,
    UserRead,
)
from app.utils.slack import notify_slack

router = APIRouter(prefix="/api/auth", tags=["authentication"])

async def ensure_email_available(email: str, db: AsyncSession) -> None:
    result = await db.execute(select(User).where(User.email == email))
    existing_user = result.scalars().first()

    if existing_user is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already registered",
        )

async def ensure_company_references_exist(user_in: CompanyRegistrationCreate, db: AsyncSession) -> None:
    if user_in.company.industry_id is not None:
        result = await db.execute(select(Industry.id).where(Industry.id == user_in.company.industry_id))
        if result.scalar_one_or_none() is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Industry does not exist",
            )

    if user_in.company.company_type_id is not None:
        result = await db.execute(select(CompanyType.id).where(CompanyType.id == user_in.company.company_type_id))
        if result.scalar_one_or_none() is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Company type does not exist",
            )

async def generate_unique_invitation_token(db: AsyncSession) -> str:
    while True:
        token = secrets.token_urlsafe(32)
        result = await db.execute(
            select(CompanyInvitation.id).where(CompanyInvitation.token == token)
        )
        if result.scalar_one_or_none() is None:
            return token

@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def register(
    user_in: UserCreate, 
    db: AsyncSession = Depends(get_db)
) -> Any:
    await ensure_email_available(user_in.email, db)

    user = User(
        email=user_in.email,
        password_hash=hash_password(user_in.password),
    )
    
    db.add(user)
    await db.commit()
    await db.refresh(user)

    await notify_slack(f"🚀 *New User Registered*: {user.email}")

    return user

@router.post("/register/company", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def register_company(
    user_in: CompanyRegistrationCreate,
    db: AsyncSession = Depends(get_db),
) -> Any:
    await ensure_email_available(user_in.email, db)
    await ensure_company_references_exist(user_in, db)

    user = User(
        email=user_in.email,
        password_hash=hash_password(user_in.password),
        role="admin",
    )
    db.add(user)
    await db.flush()

    profile = Profile(
        **user_in.profile.model_dump(),
        user_id=user.id,
    )
    db.add(profile)
    await db.flush()

    company = Company(
        **user_in.company.model_dump(),
        profile_id=profile.id,
    )
    db.add(company)
    await db.flush()

    user.company_id = company.id
    await db.commit()
    await db.refresh(user)

    return user

@router.post("/invitations", response_model=CompanyInvitationRead, status_code=status.HTTP_201_CREATED)
async def create_company_invitation(
    invitation_in: CompanyInvitationCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    if current_user.company_id is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You must belong to a company to invite users",
        )

    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only company admins can invite users",
        )

    await ensure_email_available(invitation_in.email, db)

    email = invitation_in.email.lower()
    now = datetime.now(timezone.utc)

    result = await db.execute(
        select(CompanyInvitation).where(
            CompanyInvitation.company_id == current_user.company_id,
            func.lower(CompanyInvitation.email) == email,
            CompanyInvitation.status == "pending",
        )
    )
    existing_invitation = result.scalars().first()

    if existing_invitation is not None:
        expires_at = existing_invitation.expires_at
        if expires_at.tzinfo is None:
            expires_at = expires_at.replace(tzinfo=timezone.utc)

        if expires_at >= now:
            return existing_invitation

        existing_invitation.status = "expired"

    invitation = CompanyInvitation(
        company_id=current_user.company_id,
        email=email,
        token=await generate_unique_invitation_token(db),
        expires_at=now + timedelta(days=invitation_in.expires_in_days),
        invited_by_user_id=current_user.id,
    )

    db.add(invitation)
    await db.commit()
    await db.refresh(invitation)

    return invitation

@router.post("/register/invitation", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def register_with_invitation(
    user_in: InvitationRegistrationCreate,
    db: AsyncSession = Depends(get_db),
) -> Any:
    await ensure_email_available(user_in.email, db)

    result = await db.execute(
        select(CompanyInvitation).where(CompanyInvitation.token == user_in.invitation_token)
    )
    invitation = result.scalars().first()

    if invitation is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid invitation token",
        )

    if invitation.status != "pending":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invitation is not pending",
        )

    expires_at = invitation.expires_at
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)

    if expires_at < datetime.now(timezone.utc):
        invitation.status = "expired"
        await db.commit()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invitation has expired",
        )

    if invitation.email.lower() != user_in.email.lower():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invitation email does not match registration email",
        )

    user = User(
        email=user_in.email,
        password_hash=hash_password(user_in.password),
        company_id=invitation.company_id,
        role="member",
    )
    db.add(user)
    await db.flush()

    profile = Profile(
        **user_in.profile.model_dump(),
        user_id=user.id,
    )
    db.add(profile)

    invitation.status = "accepted"
    invitation.accepted_by_user_id = user.id

    await db.commit()
    await db.refresh(user)

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

    if not db_token or db_token.expires_at.replace(tzinfo=None) < datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token has expired or been revoked"
        )
    
    result = await db.execute(select(User).options(joinedload(User.profile)).where(User.id == user_id))
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
        token_type="bearer",
        user=user
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
