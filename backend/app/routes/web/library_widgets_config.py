from fastapi import APIRouter, Depends

from app.schemas.web.library_widgets_section import LibraryWidgetsSection
from app.schemas.web.session_data import SessionData
from app.utils.cookie_validators import cookie, verifier

router = APIRouter()


@router.get("/library-widgets-sections", dependencies=[Depends(cookie)], response_model=list[LibraryWidgetsSection])
async def get(session_data: SessionData = Depends(verifier)):
    return [
        {
            "label": "Recommendations",
            "widgets": [
                {
                    "id": 1,
                    "imageSrc": "assets/error.png",
                    "label": "Projects",
                    "config": {
                        "label": "Recommendation",
                        "config": {
                            "cols": 2,
                            "rows": 1,
                            "minItemCols": 2
                        },
                        "type": "projects-recommendation"
                    }
                },
                {
                    "id": 2,
                    "imageSrc": "assets/error.png",
                    "label": "Services",
                    "config": {
                        "label": "Recommendation",
                        "config": {
                            "cols": 2,
                            "rows": 1,
                            "minItemCols": 2
                        },
                        "type": "services-recommendation"
                    }
                },
                {
                    "id": 3,
                    "imageSrc": "assets/error.png",
                    "label": "Feeds",
                    "config": {
                        "label": "Feeds",
                        "config": {
                            "cols": 2,
                            "rows": 1,
                            "minItemCols": 2
                        },
                        "type": "feeds"
                    }
                }
            ]
        }
    ]
