from typing import Dict, List

from pydantic.main import BaseModel

from app.schemas.user_details_request import UserDetailsRequest


class UserDataResponse(BaseModel):
    user: Dict[str, str]
    data: List[UserDetailsRequest]
