from typing import Optional, List

from fastapi import APIRouter

from app.schemas.PopularArticleResponse import PopularArticlesResponse
from app.utils.request_validators import valid_limit, valid_offset

router = APIRouter()


@router.get("")
async def get_popular_articles(
        limit: Optional[int] = 3,
        offset: Optional[int] = 0
) -> List[PopularArticlesResponse]:
    valid_limit(limit)
    valid_offset(limit, offset)

    return [
        PopularArticlesResponse(
            label="EOSC Association looks for staff",
            description="dadadadadadadadad daa da",
            publish_date="2001-10-02T02:48:59Z"
        ),
        PopularArticlesResponse(
            label="EOSC Association looks for staff",
            description="dadadadadadadadad daa da",
            publish_date="2001-10-02T02:48:59Z"
        )
    ][offset:limit]
