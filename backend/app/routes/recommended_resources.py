from typing import Optional, List

from fastapi import APIRouter

from app.schemas.RecommendedResourceResponse import RecommendedResourceResponse
from app.utils.request_validators import valid_limit, valid_offset

router = APIRouter()


@router.get("")
async def get_recommended_resources(
        limit: Optional[int] = 3,
        offset: Optional[int] = 0
) -> List[RecommendedResourceResponse]:
    valid_limit(limit)
    valid_offset(limit, offset)

    return [
        RecommendedResourceResponse(
            label="Ads",
            rating=5,
            description="A Comprehensive and collaborative environment to collect, harmonize and analyse fisheries "
                        "and stock data. ",
            organisation="BlueBRIDGE"
        ),
        RecommendedResourceResponse(
            label="Ads",
            rating=5,
            description="A Comprehensive and collaborative environment to collect, harmonize and analyse fisheries "
                        "and stock data. ",
            organisation="BlueBRIDGE"
        )
    ][offset:limit]
