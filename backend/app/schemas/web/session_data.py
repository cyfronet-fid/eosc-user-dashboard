from typing import Optional

from pydantic import BaseModel


class SessionData(BaseModel):
    aai_id: str
    username: Optional[str]
