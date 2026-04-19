from datetime import timedelta, datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks, Query
from services.email import send_verification_email
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from core.config import settings
from core.security import (
    create_access_token, 
    hash_password, 
    verify_password, 
    create_verification_token,
    create_refresh_token,
    verify_refresh_token
)
from db.database import get_db
from models.user import User
from models.user_refresh_tokens import UserRefreshToken
from schemas.token import Token
from schemas.user import UserCreate, UserRead
from jose import JWTError, jwt


router = APIRouter(prefix="/api/auth", tags=["authentication"])


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)) -> UserRead:
    existing_user = db.query(User).filter(User.email == user_in.email).first()
    if existing_user is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already registered",
        )

    user = User(
        email=user_in.email,
        password_hash=hash_password(user_in.password),
        account_type=user_in.account_type,
    )
    print(user)
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_verification_token(user.email)

    background_tasks.add_task(send_verification_email, user.email, token)

    return user


@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
) -> Token:
    user = db.query(User).filter(User.email == form_data.username).first()
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
    
    # Spremi refresh token u bazu
    expires_at = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    db_refresh_token = UserRefreshToken(
        user_id=user.id,
        token=refresh_token,
        expires_at=expires_at
    )
    db.add(db_refresh_token)
    db.commit()
    
    return Token(access_token=access_token, refresh_token=refresh_token, token_type="bearer")


@router.get("/verify-email")
def verify_email(token: str, db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email = payload.get("sub")
        
        if payload.get("type") != "verification":
            raise HTTPException(status_code=400, detail="Invalid token type")
            
        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        if user.is_verified:
            return {"msg": "Email je već ranije verifikovan."}

        user.is_verified = True
        db.commit()
        
        return {"msg": "Uspješno ste verifikovali email! Sada se možete ulogovati."}
        
    except JWTError:
        raise HTTPException(status_code=400, detail="Link je neispravan ili je istekao.")


@router.post("/refresh", response_model=Token)
def refresh(refresh_token: str = Query(..., description="Refresh token"), db: Session = Depends(get_db)):
    """
    Generiše novi access token koristeći refresh token
    """
    user_id = verify_refresh_token(refresh_token)
    
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Provjeri da li je refresh token u bazi i nije revoked
    db_token = db.query(UserRefreshToken).filter(
        UserRefreshToken.token == refresh_token,
        UserRefreshToken.is_revoked == False
    ).first()
    
    if not db_token or db_token.expires_at < datetime.now(timezone.utc):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token has expired or been revoked"
        )
    
    # Provjeri da li korisnik postoji i je aktivan
    user = db.query(User).filter(User.id == user_id).first()
    if not user or user.status != "active":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User is not active"
        )
    
    # Generiši novi access token
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
def logout(refresh_token: str = Query(..., description="Refresh token"), db: Session = Depends(get_db)):
    """
    Revokira refresh token (logout korisnika)
    """
    db_token = db.query(UserRefreshToken).filter(
        UserRefreshToken.token == refresh_token
    ).first()
    
    if not db_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
    
    db_token.is_revoked = True
    db.commit()
    
    return {"msg": "Successfully logged out"}