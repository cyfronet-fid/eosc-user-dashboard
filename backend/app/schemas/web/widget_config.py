from typing import Optional

from pydantic import BaseModel


class WidgetConfigResponse(BaseModel):
    x: int = 0
    y: int = 0
    rows: int = 2
    cols: int = 5
    layerIndex: Optional[int]
    dragEnabled: bool = True
    resizeEnabled: bool = True
    compactEnabled: bool = False
    maxItemRows: int = 30
    minItemRows: int = 1
    maxItemCols: int = 15
    minItemCols: int = 1
    minItemArea: Optional[int]
    maxItemArea: Optional[int]
