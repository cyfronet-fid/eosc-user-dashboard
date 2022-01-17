from typing import Optional, List

from fastapi import APIRouter, Depends

from app.schemas.RecommendedPublicationResponse import RecommendedPublicationResponse
from app.schemas.SessionData import SessionData
from app.utils.cookie_validators import cookie, verifier
from app.utils.request_validators import valid_limit, valid_offset

router = APIRouter()


@router.get("", dependencies=[Depends(cookie)], )
async def get_recommended_publications(
        limit: Optional[int] = 3,
        offset: Optional[int] = 0,
        session_data: SessionData = Depends(verifier)
) -> List[RecommendedPublicationResponse]:
    valid_limit(limit)
    valid_offset(limit, offset)

    return [
               RecommendedPublicationResponse(
                   label="Evaluation der dadadadad",
                   publish_date="2004-10-01T05:45:09Z",
                   tags=["open access", "German"]
               ),
               RecommendedPublicationResponse(
                   label="Evaluation der dadadadad",
                   publish_date="2004-10-01T05:45:09Z",
                   tags=["open access", "German"]
               )
           ][offset:limit]
