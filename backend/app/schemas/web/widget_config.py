from typing import Optional

from pydantic import BaseModel


class WidgetConfig(BaseModel):
    x: int
    y: int
    rows: int
    cols: int
    layerIndex: Optional[int]
    dragEnabled: Optional[bool]
    resizeEnabled: Optional[bool]
    compactEnabled: Optional[bool]
    maxItemRows: Optional[int]
    minItemRows: Optional[int]
    maxItemCols: Optional[int]
    minItemCols: Optional[int]
    minItemArea: Optional[int]
    maxItemArea: Optional[int]
