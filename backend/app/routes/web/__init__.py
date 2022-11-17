from fastapi import APIRouter

from app.routes.web.auth import router as auth_router
from app.routes.web.recommendations import router as recommendations_router

web_api_router = APIRouter()
web_api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
web_api_router.include_router(recommendations_router, prefix='/recommendations', tags=['recommendations'])
