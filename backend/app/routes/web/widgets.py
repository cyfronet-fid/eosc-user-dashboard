from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse

from app.crud.library_widget import get_library_widget_by_id
from app.crud.widget import (
    create_widget,
    delete_widget,
    get_widgets_by_user,
    update_widget,
)
from app.database import get_db
from app.schemas.message import Message
from app.schemas.web.session_data import SessionData
from app.schemas.web.widget import WidgetPostRequest, WidgetPutRequest, WidgetResponse
from app.utils.cookie_validators import cookie, verifier

router = APIRouter()


@router.get("", dependencies=[Depends(cookie)], response_model=List[WidgetResponse])
async def get(
    session_data: SessionData = Depends(verifier), db: Session = Depends(get_db)
):
    # TODO: optimize
    widgets = get_widgets_by_user(db, session_data.aai_id)
    return [
        *map(
            lambda widget: {
                **widget.__dict__,
                **get_library_widget_by_id(db, widget.libId).config,
            },
            widgets,
        )
    ]


@router.post(
    "",
    dependencies=[Depends(cookie)],
    response_model=WidgetResponse,
    responses={400: {"model": Message}},
)
async def post(
    request: WidgetPostRequest,
    session_data: SessionData = Depends(verifier),
    db: Session = Depends(get_db),
) -> WidgetResponse | JSONResponse:
    library_widget = get_library_widget_by_id(db, request.libId)
    new_widget = create_widget(
        db, request.libId, session_data.aai_id, request.config.__dict__
    )
    widget_fields = new_widget.__dict__
    widget_config = widget_fields.pop("config")
    return WidgetResponse(
        **widget_fields,
        label=library_widget.label,
        config={**widget_config, **library_widget.config}
    )


@router.delete("/{uid}", dependencies=[Depends(cookie)], response_model=Message)
async def delete(
    uid: int,
    session_data: SessionData = Depends(verifier),
    db: Session = Depends(get_db),
):
    delete_widget(db, uid, session_data.aai_id)
    return JSONResponse(
        status_code=200, content={"message": "Widget deleted successfully."}
    )


@router.put("/{uid}", dependencies=[Depends(cookie)], response_model=WidgetResponse)
async def patch(
    uid: int,
    request: WidgetPutRequest,
    session_data: SessionData = Depends(verifier),
    db: Session = Depends(get_db),
):
    updated_widget = update_widget(db, uid, session_data.aai_id, request.config)
    library_widget = get_library_widget_by_id(db, updated_widget.libId)
    widget_fields = updated_widget.__dict__
    widget_config = widget_fields.pop("config")
    return WidgetResponse(
        **widget_fields,
        label=library_widget.label,
        config={**widget_config, **library_widget.config}
    )
