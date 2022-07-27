from fastapi import APIRouter, Depends

from app.schemas.web.session_data import SessionData
from app.utils.cookie_validators import cookie, verifier

router = APIRouter()


@router.get("/widgets", dependencies=[Depends(cookie)])
async def get(session_data: SessionData = Depends(verifier)):
    pass


@router.post("/widgets", dependencies=[Depends(cookie)])
async def post(session_data: SessionData = Depends(verifier)):
    pass


@router.delete("/widgets", dependencies=[Depends(cookie)])
async def delete(session_data: SessionData = Depends(verifier)):
    pass


@router.patch("/widgets", dependencies=[Depends(cookie)])
async def patch(session_data: SessionData = Depends(verifier)):
    pass
