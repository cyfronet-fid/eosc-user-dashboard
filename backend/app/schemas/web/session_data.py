from typing import Optional

from pydantic import BaseModel


class SessionData(BaseModel):
    id: str
    username: Optional[str]