from fastapi import APIRouter

from app.routes.auth import router as auth_router
from app.routes.latest_info import router as latest_info_router
from app.routes.popular_articles import router as popular_articles_router
from app.routes.recommended_publications import (
    router as recommended_publications_router,
)
from app.routes.recommended_resources import router as recommended_resources_router
from app.routes.user_activities import router as user_activities_router
from app.routes.user_data import router as user_data_router

router = APIRouter()
router.include_router(auth_router, prefix="/auth", tags=["auth"])
router.include_router(user_data_router, prefix="/user_data/current", tags=["user_data"])
router.include_router(
    user_activities_router, prefix="/user_activities", tags=["user_activities"]
)
router.include_router(latest_info_router, prefix="/latest_info", tags=["latest_info"])
router.include_router(
    popular_articles_router, prefix="/popular_articles", tags=["popular_articles"]
)
router.include_router(
    recommended_resources_router,
    prefix="/recommended_resources",
    tags=["recommended_resources"],
)
router.include_router(
    recommended_publications_router,
    prefix="/recommended_publications",
    tags=["recommended_publications"],
)
