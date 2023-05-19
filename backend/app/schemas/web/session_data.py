from typing import Any, Optional

from pydantic import BaseModel


class SessionData(BaseModel):
    username: Optional[str]
    email: Optional[str]
    aai_state: Optional[str]
    aai_id: Optional[str]
    edit_link: Optional[str]
    fav: int
    jwttoken: str
    rp_handler: Any
    session_uuid: str
