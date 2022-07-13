from typing import List, Optional

from fastapi import APIRouter

from app.schemas.latest_info_response import LatestInfoResponse
from app.utils.request_validators import valid_limit, valid_offset

router = APIRouter()


@router.get("")
async def get_latest_info(
    limit: Optional[int] = 4, offset: Optional[int] = 0
) -> List[LatestInfoResponse]:
    valid_limit(limit)
    valid_offset(limit, offset)

    return [
        LatestInfoResponse(
            type="SEARCH",
            description=(
                "You have been looking for Cloud computing with additional 4 filters"
            ),
            url="https://google.com",
        ),
        LatestInfoResponse(
            type="STATUS CHANGE",
            description="Your resource “Sample resource” status: under review",
            url="https://google.com",
        ),
        LatestInfoResponse(
            type="PROFILE",
            description="You have changed some information in your profile",
            url="https://google.com",
        ),
        LatestInfoResponse(
            type="STATUS CHANGE",
            description="Your resource “Sample resource” status: under review",
            url="https://google.com",
        ),
    ][offset:limit]
