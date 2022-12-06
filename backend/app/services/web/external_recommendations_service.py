import datetime
import re
import uuid

from httpx import AsyncClient, ConnectError

from app.config import RECOMMENDER_ENDPOINT, RecommendationTypes
from app.schemas.web.recommender_error import ExternalRecommenderError
from app.schemas.web.session_data import SessionData
from app.schemas.web.solr_retrieve_error import SolrRetrieveError
from app.solr.operations import get

RE_INT = re.compile("^[0-9]+$")


class ExternalRecommendationsService:
    @staticmethod
    async def fetch(
        client: AsyncClient,
        session: SessionData | None,
        recommendations_types: RecommendationTypes,
    ):
        uuids = await ExternalRecommendationsService._get_recommended_uuids(
            client, session, recommendations_types
        )
        return await ExternalRecommendationsService._get_recommended_items(
            client, uuids
        )

    @staticmethod
    def _get_panel(panel_id: RecommendationTypes) -> list[str]:
        match panel_id:
            case "publication":
                return ["publications"]
            case "dataset":
                return ["datasets"]
            case "software":
                return ["software"]
            case "training":
                return ["trainings"]
        raise ValueError(f"{panel_id} is not valid {RecommendationTypes}")

    @staticmethod
    async def _get_recommended_uuids(
        client: AsyncClient, session: SessionData | None, panel_id: RecommendationTypes
    ):
        try:
            page_id = "/search/" + panel_id
            panels = ExternalRecommendationsService._get_panel(panel_id)

            if not panels:
                return []

            request_body = {
                "user_id": session.aai_id if session else None,
                "unique_id": session.session_uuid if session else str(uuid.uuid4()),
                "timestamp": datetime.datetime.utcnow().isoformat()[:-3] + "Z",
                "visit_id": str(uuid.uuid4()),
                "page_id": page_id,
                "panel_id": panels,
                "candidates": [],
                "search_data": {},
            }

            response = await client.post(
                RECOMMENDER_ENDPOINT,
                json=request_body,
            )

            if response.status_code != 200:
                raise ExternalRecommenderError(
                    http_status=response.status_code,
                    message="Status error",
                    data=response.json(),
                )

            recommendation_data = response.json()
            if len(recommendation_data) != 1:
                raise ExternalRecommenderError(message="No recommendations provided")

            recommendation_uuids = []

            for _id in recommendation_data[0]["recommendations"]:
                # This hack is required for trainings and other
                # resources with integer ids
                if RE_INT.match(_id):
                    _id = str(int(_id) + 1000000)
                recommendation_uuids.append(_id)

            return recommendation_uuids
        except ConnectError as e:
            raise ExternalRecommenderError(message="Connection error") from e

    @staticmethod
    async def _get_recommended_items(client: AsyncClient, uuids: list[str]):
        try:
            items = []
            for item_uuid in uuids:
                response = (await get(client, "all_collection", item_uuid)).json()
                item = response["doc"]
                if item is None:
                    continue
                items.append(item)

            return items
        except ConnectError as e:
            raise SolrRetrieveError("Connection Error") from e
