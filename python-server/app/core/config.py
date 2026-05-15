import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    PROJECT_NAME: str = "B2B App"
    ENVIRONMENT: str = "development"
    BACKEND_URL: str = "http://localhost:8000"
    FRONTEND_URL: str = "https://b2bhub-fe.onrender.com/"
    CORS_ORIGINS: str = ""
    MAIL_USERNAME: str = ""
    MAIL_PASSWORD: str = ""
    MAIL_FROM: str = ""
    MAIL_PORT: int = 587
    MAIL_SERVER: str = ""
    MAIL_STARTTLS: bool = True
    MAIL_SSL_TLS: bool = False

    @property
    def allowed_origins(self) -> list[str]:
        configured_origins = [
            origin.strip().rstrip("/")
            for origin in self.CORS_ORIGINS.split(",")
            if origin.strip()
        ]
        default_origins = [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            self.FRONTEND_URL,
        ]

        return list(
            dict.fromkeys(
                origin.rstrip("/")
                for origin in [*default_origins, *configured_origins]
                if origin
            )
        )

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(__file__), "../../.env"), 
        env_file_encoding="utf-8",
        extra="ignore"  
    )

settings = Settings()
