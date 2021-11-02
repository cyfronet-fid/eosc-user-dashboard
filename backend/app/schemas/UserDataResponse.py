from typing import Dict, List

from pydantic.main import BaseModel

from app.schemas.UserDetailsRequest import UserDetailsRequest


class UserDataResponse(BaseModel):
    user: Dict[str, str]
    data: List[UserDetailsRequest]
