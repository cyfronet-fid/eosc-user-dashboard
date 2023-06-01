# pylint: disable=missing-module-docstring
import json
import logging
import uuid

import jwt
import jwt.exceptions
from benedict import benedict
from fastapi import APIRouter, Depends, Header, HTTPException, Request, Response
from sqlalchemy.orm import Session

from app.config import OIDC_ISSUER
from app.crud.user import create_user, get_user
from app.database import get_db
from app.dependencies.user_recommendations import (
    UserActionRecommendationClient,
    send_user_action_bg_task,
    user_actions_client,
)
from app.models.api.user_data import UserDataProps
from app.models.user import User
from app.schemas.web.session_data import SessionData
from app.utils.cookie_validators import backend, cookie, verifier

router = APIRouter()
logger = logging.getLogger(__name__)


def get_proxied_user(
    x_client_token: str | None = Header(default=None), db: Session = Depends(get_db)
) -> User:
    decoded_token = jwt.decode(x_client_token, options={"verify_signature": False})
    assert decoded_token["iss"] == OIDC_ISSUER
    aai_id = decoded_token["sub"]
    user = get_user(db, aai_id)
    if user is None:
        user = create_user(db, aai_id)
    return user


@router.post(
    "/dislike/{types}",
    name="web:evaluate-recommendation-user-action",
)
async def evaluate_recommendation_user_action(
    request: Request,
    types: str,
    user: User = Depends(get_proxied_user),
    db: Session = Depends(get_db),
    client: UserActionRecommendationClient | None = Depends(user_actions_client),
):
    payload = await request.json()
    if payload["resource_type"] == "data-source":
        payload["resource_type"] = "data source"

    if types not in [
        "publications",
        "datasets",
        "software",
        "services",
        "datasources",
        "trainings",
        "other",
        "news",
        "othermisc",
    ]:
        raise HTTPException(
            status_code=400, detail="bad type when updating list object"
        )

    user_props = benedict(UserDataProps.parse_obj(user.data.data).dict())
    requested_data = user_props["dislikes"][types]

    notfound = True
    for elementin in requested_data:
        if (
            payload["url"] == elementin["url"]
            and payload["title"] == elementin["title"]
        ):
            notfound = False
    if notfound:
        requested_data.append({"title": payload["title"], "url": payload["url"]})
    user.data.data = json.loads(UserDataProps.parse_obj(user_props).json())
    db.add(user.data)
    db.commit()

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
