from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.crud.library_widget import get_library_widgets_by_ids
from app.database import get_db
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
                        get_library_widgets_by_ids(db, [1, 2, 3]),
                    )
                ],
            }
        )
    ]
