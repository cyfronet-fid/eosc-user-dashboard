from fastapi import APIRouter, Depends

from starlette.responses import RedirectResponse
from fastapi import HTTPException

from app.core.config import OIDC_ISSUER
from app.services.rp_handler_service import RpHandlerService

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
def checkin(code: str, state: str, rph_service=Depends(RpHandlerService)):
    # TODO: set state in session
    if not state:
        # TODO return to front end page (add URL to consts)
        return RedirectResponse(status_code=400, url="http://localhost:4200")

    response = rph_service.handler.finalize(OIDC_ISSUER, dict(code=code, state=state))
    user_info = response["userinfo"]
    token = response["token"]
    # https://github.com/tiangolo/fastapi/issues/796
    # response = starlette.responses.JSONResponse(
    # content=fastapi.encoders.jsonable_encoder({"access_token": access_token, "token_type": "bearer"}),
    # status_code=starlette.status.HTTP_200_OK,
    # )
    # response.set_cookie(
    #     key="Authorization",
    #     value="Bearer {}".format(fastapi.encoders.jsonable_encoder(access_token)),
    #     httponly=True,
    #     max_age=60 * 60,
    #     expires=60 * 60,
    #     domain="glass.ip-spotlight.xxx.xxx",
    # )
    # return response
    pass


@router.get("/user_info")
def user_info(rph_service=Depends(RpHandlerService)):
    pass


@router.get("/logout")
async def logout():
    pass


@router.get("/user_info")
async def user_info():
    pass
