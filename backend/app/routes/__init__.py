from fastapi import APIRouter
from app.routes.user_data import router as user_data_router
from app.routes.auth import router as auth_router
from app.routes.user_activities import router as user_activities_router
from app.routes.latest_info import router as latest_info_router

router = APIRouter()
router.include_router(auth_router, prefix="/auth", tags=["auth"])
router.include_router(user_data_router, prefix="/user_data/current", tags=["user_data"])
router.include_router(user_activities_router, prefix="/user_activities", tags=["user_activities"])
router.include_router(latest_info_router, prefix="/latest_info", tags=["latest_info"])
