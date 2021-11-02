from typing import Optional

from pydantic import BaseModel
from pydantic.networks import HttpUrl


class UserActivityResponse(BaseModel):
    type: str
    description: str
    url: Optional[HttpUrl]
