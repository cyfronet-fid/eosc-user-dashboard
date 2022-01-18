from pydantic import BaseModel


class LogoutResponse(BaseModel):
    msg: str
