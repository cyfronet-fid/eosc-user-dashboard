from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.crud.web.library_widget import get_library_widgets_by_ids
from app.database import get_db
from app.routes.web.widgets_utils import widget_types
from app.schemas.web.library_widget import LibraryWidgetResponse
from app.schemas.web.library_widgets_section_response import (
    LibraryWidgetsSectionResponse,
)
from app.utils.cookie_validators import cookie, verifier

router = APIRouter()


@router.get(
    "/sections",
    dependencies=[Depends(cookie), Depends(verifier)],
    response_model=list[LibraryWidgetsSectionResponse],
)
async def get(db: Session = Depends(get_db)):
    return [
        LibraryWidgetsSectionResponse(
            **{
                "id": 1,
                "label": "Recommendations",
                "widgets": [
                    *map(
                        lambda library_widget: LibraryWidgetResponse(
                            **library_widget.__dict__
                        ),
                        get_library_widgets_by_ids(
                            db,
                            [
                                widget_types.SERVICES_RECOMMENDATIONS_WIDGET,
                                widget_types.TRAINING_RECOMMENDATIONS_WIDGET,
                                widget_types.PUBLICATION_RECOMMENDATIONS_WIDGET,
                                widget_types.DATASET_RECOMMENDATIONS_WIDGET,
                                widget_types.SOFTWARE_RECOMMENDATIONS_WIDGET,
                                widget_types.LATEST_NEWS_WIDGET,
                                widget_types.FAVOURITES_WIDGET,
                            ],
                        ),
                    )
                ],
            },
        ),
    ]
