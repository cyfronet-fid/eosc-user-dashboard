from typing import Optional, List

from fastapi import APIRouter

from app.schemas.LatestInfoResponse import LatestInfoResponse
from app.utils.request_validators import valid_limit, valid_offset

router = APIRouter()


@router.get("")
async def get_latest_info(limit: Optional[int] = 3, offset: Optional[int] = 0) -> List[LatestInfoResponse]:
    valid_limit(limit)
    valid_offset(limit, offset)

    return [
        LatestInfoResponse(
            type="SEARCH",
            description="You have been looking for Cloud computing with additional 4 filters",
            url="https://test.pl"
        ),
        LatestInfoResponse(
            type="PROFILE",
            description="You have changed some information in your profile",
            url="https://test2.com"
        )
    ][offset:limit]
