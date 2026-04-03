from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', 'careers.in@genesysinfox.com')

app = FastAPI()
api_router = APIRouter(prefix="/api")


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    email: EmailStr
    message: str


@api_router.get("/")
async def root():
    return {"message": "Genesys Info X API - Engineering the Future"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks(skip: int = 0, limit: int = 100):
    # Explicit field projection for required fields only
    projection = {"_id": 0, "id": 1, "client_name": 1, "timestamp": 1}
    status_checks = await db.status_checks.find({}, projection).skip(skip).limit(min(limit, 100)).to_list(min(limit, 100))
    
    for check in status_checks:
        if isinstance(check.get('timestamp'), str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    contact_dict = input.model_dump()
    contact_obj = ContactMessage(**contact_dict)
    
    doc = contact_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.contact_messages.insert_one(doc)
    
    # Send email notification
    try:
        is_newsletter = "Newsletter subscribe:" in input.message
        
        if is_newsletter:
            subject = "New Newsletter Subscription - Genesys Info X"
            html_content = f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #39d98a;">New Newsletter Subscription</h2>
                <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 20px;">
                    <p><strong>Email:</strong> {input.email}</p>
                    <p><strong>Subscribed at:</strong> {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S')} UTC</p>
                </div>
                <p style="color: #666; margin-top: 20px; font-size: 12px;">
                    This notification was sent from Genesys Info X website.
                </p>
            </div>
            """
        else:
            subject = "New Contact Form Submission - Genesys Info X"
            html_content = f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #39d98a;">New Contact Form Submission</h2>
                <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 20px;">
                    <p><strong>From:</strong> {input.email}</p>
                    <p><strong>Message:</strong></p>
                    <p style="background: white; padding: 15px; border-radius: 4px; border-left: 3px solid #39d98a;">
                        {input.message}
                    </p>
                    <p><strong>Received at:</strong> {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S')} UTC</p>
                </div>
                <p style="color: #666; margin-top: 20px; font-size: 12px;">
                    This notification was sent from Genesys Info X website.
                </p>
            </div>
            """
        
        params = {
            "from": "Genesys Info X <onboarding@resend.dev>",
            "to": [NOTIFICATION_EMAIL],
            "subject": subject,
            "html": html_content,
            "reply_to": input.email
        }
        
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email notification sent to {NOTIFICATION_EMAIL} for {'newsletter' if is_newsletter else 'contact'} from {input.email}")
        
    except Exception as e:
        logger.error(f"Failed to send email notification: {str(e)}")
        # Don't fail the request if email fails, the data is already saved
    
    return contact_obj

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages(skip: int = 0, limit: int = 100):
    # Explicit field projection for required fields only
    projection = {"_id": 0, "id": 1, "email": 1, "message": 1, "timestamp": 1}
    messages = await db.contact_messages.find({}, projection).skip(skip).limit(min(limit, 100)).to_list(min(limit, 100))
    
    for msg in messages:
        if isinstance(msg.get('timestamp'), str):
            msg['timestamp'] = datetime.fromisoformat(msg['timestamp'])
    
    return messages


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()