from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from services.email import send_verification_email
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from core.config import settings
from core.security import create_access_token, hash_password, verify_password, create_verification_token
from db.database import get_db
from models.user import User
from schemas.token import Token
from schemas.user import UserCreate, UserRead


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
    return Token(access_token=access_token, token_type="bearer")


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