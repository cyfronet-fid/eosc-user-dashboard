from fastapi import APIRouter

from app.routes.api.user_data import router as user_data_router

api_router = APIRouter()

api_router.include_router(user_data_router, prefix="/user-data", tags=["user-data"])
