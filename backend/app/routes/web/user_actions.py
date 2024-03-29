# pylint: disable=missing-module-docstring
import logging
import uuid

from fastapi import APIRouter, Depends, HTTPException, Request, Response

from app.dependencies.user_actions import (
    UserActionClient,
    send_user_action_bg_task,
    user_actions_client,
)
from app.schemas.web.session_data import SessionData
from app.utils.cookie_validators import backend, cookie, verifier

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post(
    "/useraction",
    name="web:euseractions-user-action",
)
async def useractions_user_action(
    request: Request,
    client: UserActionClient | None = Depends(user_actions_client),
):
    payload = await request.json()
    if payload["resource_type"] == "data-source":
        payload["resource_type"] = "data source"

    response = Response(status_code=200)

    try:
        cookie(request)
        session = await verifier(request)
    except HTTPException:
        session_id = uuid.uuid4()
        session = SessionData(
            username=None,
            aai_state=None,
            aai_id=payload["aai_uid"],
            fav=0,
            session_uuid=payload["visit_id"],
        )
        await backend.create(session_id, session)
        cookie.attach_to_response(response, session_id)

    if not client:
        logger.debug("No mqtt client, user action not sent")
        return response

    send_user_action_bg_task(
        client,
        session,
        payload["reason"],
        payload["suggestion"],
        payload["action"],
        payload["visit_id"],
        payload["resource_id"],
        payload["resource_type"],
    )
    return response
