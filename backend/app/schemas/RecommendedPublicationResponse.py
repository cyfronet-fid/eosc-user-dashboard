from datetime import datetime
from typing import List

from pydantic import BaseModel


class RecommendedPublicationResponse(BaseModel):
    label: str
    publish_date: datetime
    tags: List[str]
