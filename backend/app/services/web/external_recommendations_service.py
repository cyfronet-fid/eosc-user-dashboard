import datetime
import random
import re
import uuid

from async_lru import alru_cache
from httpx import AsyncClient, ConnectError, ReadTimeout
from starlette.status import HTTP_200_OK

from app.config import RECOMMENDER_ENDPOINT, RecommendationTypes
from app.schemas.web.recommender_error import ExternalRecommenderError
from app.schemas.web.session_data import SessionData
from app.schemas.web.solr_retrieve_error import SolrRetrieveError
from app.solr.operations import get, search

RE_INT = re.compile("^[0-9]+$")


class ExternalRecommendationsService:
    @staticmethod
    async def fetch(
        client: AsyncClient,
        session: SessionData | None,
        recommendations_type: RecommendationTypes,
    ):
        try:
            (
                uuids,
                randomuuid,
            ) = await ExternalRecommendationsService._get_recommended_uuids(
                client, session, recommendations_type
            )
            items = await ExternalRecommendationsService._get_recommended_items(
                client, uuids, randomuuid
            )
            return {"recommendations": items, "isRand": False}
        except (ExternalRecommenderError, SolrRetrieveError, ReadTimeout) as e:
            (
                uuids,
                randomuuid,
            ) = await ExternalRecommendationsService._get_fixed_recommendations(
                client, recommendations_type
            )
            items = await ExternalRecommendationsService._get_recommended_items(
                client, uuids, randomuuid
            )
            return {
                "recommendations": items,
                "isRand": True,
                "message": str(e)
                or "Solr or external recommender service read timeout",
            }

    @staticmethod
    def _get_panel(panel_id: RecommendationTypes) -> str:
        match panel_id:
            case "publication":
                return "publications"
            case "dataset":
                return "datasets"
            case "training":
                return "trainings"
            case "other":
                return "other_research_product"
            case _:
                return panel_id

    @staticmethod
    async def _get_recommended_uuids(
        client: AsyncClient, session: SessionData | None, panel_id: RecommendationTypes
    ) -> tuple[list[str], str]:
        try:
            randomuid = str(uuid.uuid4())
            request_body = {
                "unique_id": session.session_uuid if session else randomuid,
                "timestamp": datetime.datetime.utcnow().isoformat()[:-3] + "Z",
                "visit_id": randomuid,
                "page_id": "/search/" + panel_id,
                "panel_id": ExternalRecommendationsService._get_panel(panel_id),
                "candidates": [],
                "search_data": {},
            }

            if session is not None:
                request_body["aai_uid"] = session.aai_id

            response = await client.post(
                RECOMMENDER_ENDPOINT,
                json=request_body,
            )

            if response.status_code != 200:
                raise ExternalRecommenderError(
                    http_status=response.status_code,
                    message=f"Recommender server status error: \n\n {response}",
                )

            recommendation_data = response.json()
            if (
                "recommendations" not in recommendation_data
                or len(recommendation_data["recommendations"]) < 3
            ):
                raise ExternalRecommenderError(message="No recommendations provided")

            return (recommendation_data["recommendations"][:3], randomuid)
        except ConnectError as e:
            raise ExternalRecommenderError(message="Connection error") from e

    @staticmethod
    @alru_cache(maxsize=512)
    async def _get_fixed_recommendations(
        client: AsyncClient, panel_id: RecommendationTypes, count: int = 3
    ) -> tuple[list[str], str]:
        rows = 100
        if panel_id == "data-source":
            panel_id = "data source"
        if panel_id == "all":
            panel_id = "publication"
        fq = [f'type:("{panel_id}")']
        response = await search(
            client,
            "all_collection",
            q="*",
            qf=["id"],
            fq=fq,
            sort=["id desc"],
            rows=rows,
        )
        if response.status_code != HTTP_200_OK:
            return []
        docs: list = response.json()["response"]["docs"]
        if len(docs) == 0:
            return []
        return (
            [doc["id"] for doc in random.sample(docs, k=min(count, len(docs)))],
            str(uuid.uuid4()),
        )

    @staticmethod
    async def _get_recommended_items(
        client: AsyncClient, uuids: list[str], visit_id: str
    ):
        try:
            items = []
            for item_uuid in uuids:
                response = (await get(client, "all_collection", item_uuid)).json()
                item = response["doc"]
                if item is None:
                    raise SolrRetrieveError(f"No item with id={item_uuid}")
                item["visit_id"] = visit_id
                items.append(item)

            return items
        except ConnectError as e:
            raise SolrRetrieveError("Connection Error") from e
