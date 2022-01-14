from uuid import uuid4

from fastapi import APIRouter, Depends
from starlette import status

from starlette.responses import RedirectResponse
from fastapi import HTTPException

from app.core.config import OIDC_ISSUER
from app.schemas.SessionData import SessionData
from app.services.rp_handler_service import RpHandlerService

from app.utils.cookie_validators import backend, cookie, verifier

router = APIRouter()


@router.get("/request")
async def request(rph_service=Depends(RpHandlerService)):
    try:
        # TODO: Get user id if available and set in the beginning
        result = rph_service.handler.begin(issuer_id=OIDC_ISSUER)
    except Exception as err:
        raise HTTPException(status_code=400, detail=f'Something went wrong: {err} {repr(err)}')
    else:
        return RedirectResponse(status_code=303, url=result['url'])


@router.get("/checkin")
async def checkin(code: str, state: str, rph_service=Depends(RpHandlerService)):
    # TODO: set state in session
    if not state:
        # TODO return to front end page (add URL to consts)
        return RedirectResponse(status_code=400, url="http://localhost:4200")

    try:
        aai_response = rph_service.handler.finalize(OIDC_ISSUER, dict(code=code, state=state))
        username = aai_response["user_info"]["username"]
        jwt = aai_response["id_token"]["jwt"]

        session_id = uuid4()
        session_data = SessionData(username=username, jwt=jwt)
        await backend.create(session_id, session_data)
        auth_response = RedirectResponse(status_code=303, url="http://localhost:4200")
        cookie.attach_to_response(auth_response, session_id)
        return auth_response
    except:
        return RedirectResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            url="http://localhost:4200",
            headers={"WWW-Authenticate": "Bearer"}
        )


@router.get("/user_info", dependencies=[Depends(cookie)])
def user_info(session_data: SessionData = Depends(verifier)):
    return session_data


@router.get("/logout")
async def logout():
    pass


@router.get("/user_info")
async def user_info():
    pass
