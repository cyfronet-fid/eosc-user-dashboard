from typing import Dict, List, Union

from pydantic import BaseModel
from pydantic.class_validators import validator


class UserDetailsRequest(BaseModel):
    details_provider: str
    user_details: Dict[str, Union[str, int, List[int], List[str]]]

    @validator("user_details")
    def user_details_should_have_values(self, value):
        if len(value) == 0:
            raise ValueError("must contain at least one value")
        return value
