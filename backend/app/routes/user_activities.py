from typing import List, Optional

from fastapi import APIRouter

from app.schemas.user_activity_response import UserActivityResponse
from app.utils.request_validators import valid_limit, valid_offset

router = APIRouter()


@router.get("")
async def get_user_activities(
    limit: Optional[int] = 4, offset: Optional[int] = 0
) -> List[UserActivityResponse]:
    valid_limit(limit)
    valid_offset(limit, offset)

    return [
        UserActivityResponse(
            type="SEARCH",
            description=(
                "You have been looking for Cloud computing with additional 4 filters"
            ),
            url="https://google.com",
        ),
        UserActivityResponse(
            type="SEARCH",
            description=(
                "You have been looking for Cloud computing with additional 4 filters"
            ),
            url="https://google.com",
        ),
        UserActivityResponse(
            type="SEARCH",
            description=(
                "You have been looking for Cloud computing with additional 4 filters"
            ),
            url="https://google.com",
        ),
        UserActivityResponse(
            type="PROFILE",
            description="You have changed some information in your profile",
        ),
    ][offset:limit]
