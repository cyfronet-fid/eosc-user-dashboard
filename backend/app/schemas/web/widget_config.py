from typing import Optional

from pydantic import BaseModel


class WidgetConfigResponse(BaseModel):
    x: int = 0
    y: int = 0
    rows: int = 2
    cols: int = 4
    layerIndex: Optional[int]
    dragEnabled: bool = True
    resizeEnabled: bool = False
    compactEnabled: bool = False
    maxItemRows: int = 2
    minItemRows: int = 2
    maxItemCols: int = 4
    minItemCols: int = 4
    minItemArea: Optional[int]
    maxItemArea: Optional[int]
