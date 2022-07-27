from typing import Any

from pydantic import BaseModel

from app.schemas.web.widget_config import WidgetConfigResponse


class WidgetPutRequest(BaseModel):
    config: WidgetConfigResponse


class WidgetPostRequest(BaseModel):
    libId: int
    config: WidgetConfigResponse


class WidgetResponse(BaseModel):
    id: int
    libId: int
    config: WidgetConfigResponse
    label: str
    data: Any
