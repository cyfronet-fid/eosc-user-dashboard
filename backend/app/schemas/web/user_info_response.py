from pydantic import BaseModel


class UserInfoResponse(BaseModel):
    username: str
    email: str
    aai_id: str
    edit_link: str
    fav: int
