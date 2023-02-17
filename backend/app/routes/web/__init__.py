from fastapi import APIRouter

from app.routes.web.auth import router as auth_router
from app.routes.web.events import router as events_router
from app.routes.web.recommendations import router as recommendations_router
from app.routes.web.videos import router as videos_router
from app.routes.web.numbers import router as numbers_router

web_api_router = APIRouter()
web_api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
web_api_router.include_router(
    recommendations_router, prefix="/recommendations", tags=["recommendations"]
)
web_api_router.include_router(events_router, prefix="/events", tags=["events"])
web_api_router.include_router(videos_router, prefix="/videos", tags=["videos"])
web_api_router.include_router(numbers_router, prefix="/numbers", tags=["numbers"])
