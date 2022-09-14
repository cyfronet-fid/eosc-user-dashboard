from pydantic import BaseModel

from app.schemas.web.library_widget import LibraryWidgetResponse


class LibraryWidgetsSectionResponse(BaseModel):
    label: str
    widgets: list[LibraryWidgetResponse]
