# pylint: disable=missing-function-docstring

""" Presentable items UI endpoint """
import logging

import httpx
from fastapi import APIRouter, HTTPException, Request

from app.config import RecommendationTypes
from app.schemas.bad_request import BadRequest
from app.schemas.web.recommender_error import ExternalRecommenderError
from app.schemas.web.solr_retrieve_error import SolrRetrieveError
from app.services.web.external_recommendations_service import (
    ExternalRecommendationsService,
)
from app.services.web.stories_service import fetch_news_recommendations
from app.utils.cookie_validators import backend, cookie

router = APIRouter()

logger = logging.getLogger(__name__)


@router.get(
    "/{recommendation_type}",
    responses={200: {"model": dict}, 500: {"model": BadRequest}},
)
async def get_recommendations(
    recommendation_type: RecommendationTypes, request: Request
):
    session_id = cookie(request)
    session = await backend.read(session_id)

    try:
        async with httpx.AsyncClient() as client:
            match recommendation_type:
                case "all":
                    return [
                        await ExternalRecommendationsService.fetch(
                            client, session, "training"
                        ),
                        await ExternalRecommendationsService.fetch(
                            client, session, "software"
                        ),
                        await ExternalRecommendationsService.fetch(
                            client, session, "dataset"
                        ),
                        await ExternalRecommendationsService.fetch(
                            client, session, "publication"
                        ),
                        await ExternalRecommendationsService.fetch(
                            client, session, "other"
                        ),
                        await ExternalRecommendationsService.fetch(
                            client, session, "service"
                        ),
                        await ExternalRecommendationsService.fetch(
                            client, session, "data-source"
                        ),
                        #await fetch_news_recommendations(),
                    ]
                case "news":
                    return [await fetch_news_recommendations()]
                case _:
                    return [
                        await ExternalRecommendationsService.fetch(
                            client, session, recommendation_type
                        )
                    ]
    except (ExternalRecommenderError, SolrRetrieveError) as e:
        logger.error("%s. %s", str(e), e.data)
        raise HTTPException(status_code=500, detail=str(e)) from e
