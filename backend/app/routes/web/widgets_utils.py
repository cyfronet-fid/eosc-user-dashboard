from typing import Any, List

from sqlalchemy.orm import Session

from app.crud.library_widget import get_library_widget_by_id
from app.models.widget import Widget
from app.schemas.web.widget import WidgetResponse
from app.services.latest_news_service import LatestNewsService

LATEST_NEWS_WIDGET: int = 1


async def fetch_data_by(lib: int) -> Any | List[Any] | None:
    if lib == LATEST_NEWS_WIDGET:
        return await LatestNewsService.fetch()

    return None


async def get_widget_with_data(db: Session, widget: Widget):
    widget_fields = widget.__dict__
    widget_config = widget_fields.pop("config")
    library_widget = get_library_widget_by_id(db, widget_fields["libId"])
    widget_response = WidgetResponse(
        **widget_fields,
        label=library_widget.label,
        config={**widget_config, **library_widget.config},
        data=await fetch_data_by(widget.libId)
    )
    return widget_response
