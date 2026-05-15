from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from app.core.config import settings

conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_STARTTLS=settings.MAIL_STARTTLS,
    MAIL_SSL_TLS=settings.MAIL_SSL_TLS,
    USE_CREDENTIALS=True
)

async def send_verification_email(email: str, token: str):
    if not settings.MAIL_SERVER:
        raise RuntimeError("Email is not configured. Set MAIL_SERVER and related MAIL_* variables.")

    backend_url = settings.BACKEND_URL.rstrip("/")
    verification_url = f"{backend_url}/api/auth/verify-email?token={token}"
    
    html = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                <h2 style="color: #333;">Potvrdite vašu registraciju</h2>
                <p>Hvala vam što ste se registrovali na našu platformu.</p>
                <p>Molimo kliknite na dugme ispod kako biste verifikovali vašu email adresu:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="{verification_url}" 
                       style="background-color: #007bff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                       Verifikuj Email
                    </a>
                </div>
                <p style="font-size: 0.8em; color: #777;">Ovaj link će biti važeći 24 sata.</p>
                <p style="font-size: 0.8em; color: #777;">Ako niste kreirali nalog, slobodno ignorišite ovaj email.</p>
            </div>
        </body>
    </html>
    """

    message = MessageSchema(
        subject="Verifikacija vašeg naloga",
        recipients=[email],  
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    await fm.send_message(message)
