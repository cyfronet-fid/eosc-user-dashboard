from pydantic import BaseModel


class LibraryWidgetResponse(BaseModel):
    id: int
    imageSrc: str
    label: str
