from pydantic import BaseModel


class UserInfoResponse(BaseModel):
    username: str
