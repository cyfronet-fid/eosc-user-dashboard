from datetime import datetime

from pydantic import BaseModel


class PopularArticlesResponse(BaseModel):
    label: str
    description: str
    publish_date: datetime
