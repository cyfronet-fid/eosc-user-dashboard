from pydantic import BaseModel

from app.schemas.web.widget import PartialWidget


class LibraryWidget(BaseModel):
    id: int
    imageSrc: str
    label: str
    config: PartialWidget
