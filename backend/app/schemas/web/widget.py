from typing import Any, Optional

from pydantic import BaseModel

from app.schemas.web.widget_config import WidgetConfig


class PartialWidget(BaseModel):
    id: Optional[int]
    libId: Optional[int]
    config: Optional[WidgetConfig]
    label: Optional[str]
    data: Optional[Any]


class Widget(BaseModel):
    id: int
    libId: int
    config: WidgetConfig
    label: str
    data: Any
    type: str
