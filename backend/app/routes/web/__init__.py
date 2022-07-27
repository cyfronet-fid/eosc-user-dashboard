from fastapi import APIRouter

from app.routes.web.auth import router as auth_router
from app.routes.web.library_widgets import router as library_widgets_router
from app.routes.web.widgets import router as widgets_router

web_api_router = APIRouter()
web_api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
web_api_router.include_router(widgets_router, prefix="/widgets", tags=["widgets"])
web_api_router.include_router(
    library_widgets_router, prefix="/library-widgets", tags=["library_widgets"]
)
