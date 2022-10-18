import json
import types
from typing import Any

from sqlalchemy.orm import Session

from app.crud.web.library_widget import get_library_widget_by_id
from app.models.web.widget import Widget
from app.schemas.web.widget import WidgetResponse
from app.services.web.favourites_service import FavouritesService
from app.services.web.latest_news_service import LatestNewsService
from app.services.web.recommendiations_service import (
    RecommendationsService,
    recommendation_types,
)

widget_types = types.SimpleNamespace()
widget_types.LATEST_NEWS_WIDGET: int = 1
widget_types.FAVOURITES_WIDGET: int = 2
widget_types.SERVICES_RECOMMENDATIONS_WIDGET: int = 3
widget_types.TRAINING_RECOMMENDATIONS_WIDGET: int = 4
widget_types.PUBLICATION_RECOMMENDATIONS_WIDGET: int = 5
widget_types.DATASET_RECOMMENDATIONS_WIDGET: int = 6
widget_types.SOFTWARE_RECOMMENDATIONS_WIDGET: int = 7


async def fetch_data_by(lib: int) -> Any | list[Any] | None:
    match lib:
        case widget_types.LATEST_NEWS_WIDGET:
            response = await LatestNewsService.fetch()
        case widget_types.FAVOURITES_WIDGET:
            response = await FavouritesService.fetch()
        case widget_types.SERVICES_RECOMMENDATIONS_WIDGET:
            response = await RecommendationsService.fetch(
                recommendation_types.SERVICES_WIDGET
            )
        case widget_types.TRAINING_RECOMMENDATIONS_WIDGET:
            response = await RecommendationsService.fetch(
                recommendation_types.TRAINING_WIDGET
            )
        case widget_types.PUBLICATION_RECOMMENDATIONS_WIDGET:
            response = await RecommendationsService.fetch(
                recommendation_types.PUBLICATION_WIDGET
            )
        case widget_types.DATASET_RECOMMENDATIONS_WIDGET:
            response = await RecommendationsService.fetch(
                recommendation_types.DATASET_WIDGET
            )
        case widget_types.SOFTWARE_RECOMMENDATIONS_WIDGET:
            response = await RecommendationsService.fetch(
                recommendation_types.SOFTWARE_WIDGET
            )
        case _:
            response = None
    return response


async def get_widget_with_data(db: Session, widget: Widget):
    widget_fields = widget.__dict__
    widget_config = widget_fields.pop("config")
    library_widget = get_library_widget_by_id(db, widget_fields["libId"])
    stringified = json.dumps(library_widget.config)
    library_widget_config = json.loads(stringified)
    widget_response = WidgetResponse(
        **widget_fields,
        label=library_widget.label,
        config={**widget_config, **library_widget_config},
        data=await fetch_data_by(widget.libId)
    )
    return widget_response
