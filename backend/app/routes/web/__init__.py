from fastapi import APIRouter

from app.routes.web.auth import router as auth_router

web_api_router = APIRouter()
web_api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
