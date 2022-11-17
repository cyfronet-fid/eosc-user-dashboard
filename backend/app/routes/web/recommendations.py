# pylint: disable=missing-function-docstring

""" Presentable items UI endpoint """
import logging
import httpx
from fastapi import APIRouter, HTTPException, Request

from app.config import RECOMMENDATION_TYPES
from app.schemas.bad_request import BadRequest
from app.schemas.web.recommender_error import ExternalRecommenderError
from app.schemas.web.solr_retrieve_error import SolrRetrieveError
from app.services.web.external_recommendations_service import ExternalRecommendationsService
from app.utils.cookie_validators import cookie, backend

router = APIRouter()

logger = logging.getLogger(__name__)


@router.get(
    "/{type}",
    responses={200: {"model": dict}, 500: {"model": BadRequest}},
)
async def get_recommendations(type: RECOMMENDATION_TYPES, request: Request):
    session_id = cookie(request)
    session = await backend.read(session_id)

    try:
        async with httpx.AsyncClient() as client:
            match type:
                case "all":
                    return [
                        *(await ExternalRecommendationsService.fetch(client, session, "training")),
                        *(await ExternalRecommendationsService.fetch(client, session, "software")),
                        *(await ExternalRecommendationsService.fetch(client, session, "dataset")),
                        *(await ExternalRecommendationsService.fetch(client, session, "publication")),
                    ]
                case "training":
                    return await ExternalRecommendationsService.fetch(client, session, type)
                case "software":
                    return await ExternalRecommendationsService.fetch(client, session, type)
                case "dataset":
                    return await ExternalRecommendationsService.fetch(client, session, type)
                case "publication":
                    return await ExternalRecommendationsService.fetch(client, session, type)
            raise ValueError(f"{type} is not valid {RECOMMENDATION_TYPES}")
    except (ExternalRecommenderError, SolrRetrieveError) as e:
        logger.error("%s. %s", str(e), e.data)
        raise HTTPException(status_code=500, detail=str(e)) from e
