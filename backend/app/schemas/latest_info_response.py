from pydantic import BaseModel
from pydantic.networks import HttpUrl


class LatestInfoResponse(BaseModel):
    type: str
    description: str
    url: HttpUrl
