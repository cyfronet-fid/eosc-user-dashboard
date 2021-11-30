import logging

from fastapi import APIRouter

from starlette.responses import RedirectResponse
from fastapi import HTTPException

from app.core.config import OIDC_CONFIG
from app.services.rp_handler_service import RpHandlerService

router = APIRouter()
rp_handler = RpHandlerService().handler


# @router.get("/login")
# async def login():


@router.get("/checkin")
async def checkin():
    # Get user id if available and set in the beginning
    try:
        logging.getLogger().info("dupa")
        result = rp_handler.begin(
            issuer_id=OIDC_CONFIG['clients']['aai_provider']['issuer'],
            # user_id="",
            # req_args={"claims": {"id_token": {"acr": {"value": "https://refeds.org/profile/mfa"}}}}
        )
    except Exception as err:
        raise HTTPException(status_code=400, detail=f'Something went wrong:{err}')
    else:
        return RedirectResponse(status_code=303, url=result['url'])


@router.get("/logout")
async def logout():
    pass


@router.get("/user_info")
async def user_info():
    pass


