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
                        *(
                            await ExternalRecommendationsService.fetch(
                                client, session, "training"
                            )
                        ),
                        *(
                            await ExternalRecommendationsService.fetch(
                                client, session, "software"
                            )
                        ),
                        *(
                            await ExternalRecommendationsService.fetch(
                                client, session, "dataset"
                            )
                        ),
                        *(
                            await ExternalRecommendationsService.fetch(
                                client, session, "publication"
                            )
                        ),
                    ]
                case "training":
                    return await ExternalRecommendationsService.fetch(
                        client, session, recommendation_type
                    )
                case "software":
                    return await ExternalRecommendationsService.fetch(
                        client, session, recommendation_type
                    )
                case "dataset":
                    return await ExternalRecommendationsService.fetch(
                        client, session, recommendation_type
                    )
                case "publication":
                    return await ExternalRecommendationsService.fetch(
                        client, session, recommendation_type
                    )
            return []
    except (ExternalRecommenderError, SolrRetrieveError) as e:
        logger.error("%s. %s", str(e), e.data)
        raise HTTPException(status_code=500, detail=str(e)) from e
