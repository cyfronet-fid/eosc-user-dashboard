from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse

from app.crud.widget import (
    create_widget,
    delete_widget,
    get_widgets_by_user,
    update_widget,
)
from app.database import get_db
from app.routes.web.widgets_utils import get_widget_with_data
from app.schemas.message import Message
from app.schemas.web.session_data import SessionData
from app.schemas.web.widget import WidgetPostRequest, WidgetPutRequest, WidgetResponse
from app.schemas.web.widget_config import WidgetConfigResponse
from app.utils.cookie_validators import cookie, verifier

router = APIRouter()


@router.get("", dependencies=[Depends(cookie)], response_model=List[WidgetResponse])
async def get(
        session_data: SessionData = Depends(verifier), db: Session = Depends(get_db)
):
    # TODO: optimize
    widgets = get_widgets_by_user(db, session_data.aai_id)
    return [await get_widget_with_data(db, widget) for widget in widgets]


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
    new_widget = create_widget(
        db, request.libId, session_data.aai_id, WidgetConfigResponse(**request.config.__dict__)
    )
    return await get_widget_with_data(db, new_widget)


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
async def put(
        uid: int,
        request: WidgetPutRequest,
        session_data: SessionData = Depends(verifier),
        db: Session = Depends(get_db),
):
    updated_widget = update_widget(db, uid, session_data.aai_id, request.config)
    return await get_widget_with_data(db, updated_widget)
