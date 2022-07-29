from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.crud.library_widget import get_library_widgets_by_ids
from app.database import get_db
from app.schemas.web.library_widgets_section_response import LibraryWidgetsSectionResponse
from app.schemas.web.session_data import SessionData
from app.utils.cookie_validators import cookie, verifier

router = APIRouter()


@router.get(
    "/library-widgets-sections",
    dependencies=[Depends(cookie)],
    response_model=list[LibraryWidgetsSectionResponse]
)
async def get(session_data: SessionData = Depends(verifier), db: Session = Depends(get_db)):
    return [
        {
            "label": "Recommendations",
            "widgets": get_library_widgets_by_ids(db, [1, 2, 3])
        }
    ]
