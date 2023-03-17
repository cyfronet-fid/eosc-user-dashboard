# pylint: disable=broad-except

import uuid
from uuid import UUID, uuid4

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from starlette import status
from starlette.responses import RedirectResponse

from app.config import OIDC_ISSUER, UI_BASE_URL
from app.crud.user import create_user, get_user
from app.database import get_db
from app.schemas.web.session_data import SessionData
from app.schemas.web.user_info_response import UserInfoResponse
from app.utils.cookie_validators import backend, cookie, verifier
from app.utils.rp_handler import rp_handler

router = APIRouter()


@router.get("/request")
async def auth_request():
    # pylint: disable=R1720
    try:
        result = rp_handler.begin(issuer_id=OIDC_ISSUER)
    except Exception as err:
        raise HTTPException(
            status_code=400, detail=f"Something went wrong: {err} {repr(err)}"
        ) from err
    else:
        return RedirectResponse(status_code=303, url=result["url"])


@router.get("/checkin")
async def auth_checkin(code: str, state: str, db: Session = Depends(get_db)):
    if not state:
        return RedirectResponse(status_code=400, url=UI_BASE_URL)

    try:
        # pylint: disable=R1735
        aai_response = rp_handler.finalize(OIDC_ISSUER, dict(code=code, state=state))

        session_id = uuid4()
        username = aai_response["userinfo"]["name"]
        email = aai_response["userinfo"]["email"]
        aai_id = aai_response["userinfo"]["sub"]
        edit_link = aai_response["id_token"]["iss"]
        fav = 0  # fixed for now..

        if not get_user(db, aai_id):
            create_user(db, aai_id)

        session_data = SessionData(
            username=username,
            email=email,
            aai_state=state,
            aai_id=aai_id,
            edit_link=edit_link,
            fav=fav,
            session_uuid=str(uuid.uuid4()),
        )
        await backend.create(session_id, session_data)
        auth_response = RedirectResponse(status_code=303, url=UI_BASE_URL)
        cookie.attach_to_response(auth_response, session_id)
        return auth_response
    except Exception:
        return RedirectResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            url=UI_BASE_URL,
            headers={"WWW-Authenticate": "Bearer"},
        )


@router.get(
    "/userinfo", dependencies=[Depends(cookie)], response_model=UserInfoResponse
)
async def user_info(session_data: SessionData = Depends(verifier)) -> UserInfoResponse:
    return UserInfoResponse(
        username=session_data.username,
        email=session_data.email,
        aai_id=session_data.aai_id,
        edit_link=session_data.edit_link,
        fav=session_data.fav,
    )


@router.get("/logout")
async def logout(response: Response, session_id: UUID = Depends(cookie)):
    try:
        await backend.delete(session_id)
    except KeyError:
        pass

    cookie.delete_from_response(response)
    return RedirectResponse(status_code=303, url=UI_BASE_URL)
