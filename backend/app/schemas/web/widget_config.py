from typing import Optional

from pydantic import BaseModel


class WidgetConfigResponse(BaseModel):
    x: int = 0
    y: int = 0
    rows: Optional[int]
    cols: Optional[int]
    layerIndex: Optional[int]
    dragEnabled: bool = True
    resizeEnabled: bool = True
    compactEnabled: bool = False
    maxItemRows: int = 2
    minItemRows: int = 1
    maxItemCols: int = 4
    minItemCols: int = 2
    minItemArea: Optional[int]
    maxItemArea: Optional[int]
