import json
from typing import Any, Dict

import jwt
import jwt.exceptions
from benedict import benedict
from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from app.config import GLOBAL_ACCESS_FIELDS, OIDC_HOST
from app.crud.user import create_user, get_user
from app.database import get_db
from app.models.api.user_data import UserDataProps
from app.models.user import User
from app.utils.dict_utils import truncate_dict
from app.utils.jwt_validators import get_current_provider

router = APIRouter()


def get_proxied_user(
    x_client_token: str | None = Header(default=None), db: Session = Depends(get_db)
) -> User:
    decoded_token = jwt.decode(x_client_token, options={"verify_signature": False})
    assert decoded_token["iss"] == OIDC_HOST + "/auth/realms/core/"
    aai_id = decoded_token["sub"]
    user = get_user(db, aai_id)
    if user is None:
        user = create_user(db, aai_id)
    return user


@router.get("", response_model=UserDataProps)
async def user_data(
    user: User = Depends(get_proxied_user),
    provider: User = Depends(get_current_provider),
):
    """
    Get user data. This is API for EOSC service providers who
    want to integrate with the common user data store.

    To get user's data authorization via `Authorization` header is required, together with user with
    provider's priviledges. Additionally `X-Client-Token` should be set to the user's JWT token
    which it obtains during signing in via AAI.
    """
    return UserDataProps.parse_obj(
        truncate_dict(
            user.data.data, [*provider.provider_rights.read, *GLOBAL_ACCESS_FIELDS]
        )
    )


@router.patch(
    "/{resource_path}", status_code=204, dependencies=[Depends(get_current_provider)]
)
async def patch_user_data(
    resource_path: str,
    data: Dict[str, Any] | list[Any],
    user: User = Depends(get_proxied_user),
    db: Session = Depends(get_db),
):
    user_props = benedict(UserDataProps.parse_obj(user.data.data).dict())
    requested_data = user_props[resource_path]
    if isinstance(requested_data, tuple([list, set])):
        if not isinstance(data, list):
            raise HTTPException(
                status_code=400, detail="list required when updating list object"
            )
        if isinstance(requested_data, set):
            for element in data:
                requested_data.add(element)
        elif isinstance(requested_data, list):
            requested_data += data

    user.data.data = json.loads(UserDataProps.parse_obj(user_props).json())
    db.add(user.data)
    db.commit()


@router.delete(
    "/{resource_path}", status_code=204, dependencies=[Depends(get_current_provider)]
)
async def delete_user_data(
    resource_path: str,
    data: list[str],
    user: User = Depends(get_proxied_user),
    db: Session = Depends(get_db),
) -> None:
    user_props = benedict(UserDataProps.parse_obj(user.data.data).dict())
    requested_data = user_props[resource_path]
    if isinstance(requested_data, tuple([list, set])):
        if not isinstance(data, list):
            raise HTTPException(
                status_code=400, detail="list required when updating list object"
            )
        for key in data:
            try:
                requested_data.remove(key)
            except KeyError:
                pass

    user.data.data = json.loads(UserDataProps.parse_obj(user_props).json())
    db.add(user.data)
    db.commit()
