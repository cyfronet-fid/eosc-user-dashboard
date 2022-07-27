from typing import List

from pydantic import BaseModel

from app.schemas.web.library_widget import LibraryWidget


class LibraryWidgetsSection(BaseModel):
    label: str
    widgets: List[LibraryWidget]
