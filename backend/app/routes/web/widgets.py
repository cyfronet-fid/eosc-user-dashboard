from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.responses import RedirectResponse, JSONResponse

from app.config import UI_BASE_URL
from app.crud.library_widget import get_library_widget_by_id
from app.crud.widget import get_widgets_by_user, create_widget, delete_widget, update_widget
from app.database import get_db
from app.models.widget import Widget
from app.schemas.web.session_data import SessionData
from app.schemas.web.widget import WidgetPostRequest, WidgetResponse, WidgetPutRequest
from app.utils.cookie_validators import cookie, verifier

router = APIRouter()


@router.get("/widgets", dependencies=[Depends(cookie)], response_model=List[WidgetResponse])
async def get(session_data: SessionData = Depends(verifier), db: Session = Depends(get_db)):
    # TODO: optimize
    widgets = get_widgets_by_user(db, session_data.aai_id)
    return map(lambda widget: {
        **widget.__dict__,
        **get_library_widget_by_id(db, widget.libId)
    }, widgets)


@router.post("/widgets", dependencies=[Depends(cookie)], response_model=WidgetResponse)
async def post(request: WidgetPostRequest, session_data: SessionData = Depends(verifier),
               db: Session = Depends(get_db)) -> WidgetResponse | JSONResponse:
    library_widget = get_library_widget_by_id(db, request.libId)
    if not library_widget:
        return JSONResponse(status_code=400,
                            content={"message": f"Library widget with id: #{request.libId} doesn't exists"})

    new_widget = create_widget(db, request.libId, session_data.aai_id, request.config)
    return WidgetResponse(
        **new_widget.__dict__,
        **library_widget.config
    )


@router.delete("/widgets/{uid}", dependencies=[Depends(cookie)])
async def delete(uid: int, session_data: SessionData = Depends(verifier), db: Session = Depends(get_db)):
    delete_widget(db, uid, session_data.aai_id)
    return JSONResponse(status_code=200, content={"message": "Widget deleted successfully."})


@router.put("/widgets/{uid}", dependencies=[Depends(cookie)])
async def patch(uid: int, request: WidgetPutRequest, session_data: SessionData = Depends(verifier), db: Session = Depends(get_db)):
    updated_widget = update_widget(db, uid, session_data.aai_id, request.config)
    library_widget = get_library_widget_by_id(db, updated_widget.libId)
    return WidgetResponse(
        **updated_widget.__dict__,
        **library_widget.config
    )
