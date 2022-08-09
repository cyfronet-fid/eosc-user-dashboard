from typing import Any, Dict

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config import GLOBAL_ACCESS_FIELDS
from app.crud.api.user_data import update_user_data
from app.crud.user import create_user, get_user
from app.database import get_db
from app.models.user import User
from app.utils.dict_utils import dict_to_keys, new_keys_of, truncate_dict
from app.utils.jwt_validators import get_current_provider

router = APIRouter()


@router.get("/{user_aai_id}")
async def user_data(
    user_aai_id: str,
    db: Session = Depends(get_db),
    provider: User = Depends(get_current_provider),
):
    user = get_user(db, user_aai_id)
    if not user:
        raise HTTPException(
            status_code=400,
            detail=f"The user with AAI ID {user_aai_id} doesn't exist.",
        )

    return truncate_dict(
        user.data.data, [*provider.provider_rights.read, *GLOBAL_ACCESS_FIELDS]
    )


@router.post("/{user_aai_id}")
async def extend_user_data(
    user_aai_id: str,
    request: Dict[str, Any],
    db: Session = Depends(get_db),
    provider: User = Depends(get_current_provider),
):
    user = get_user(db, user_aai_id)
    if not user:
        user = create_user(db, user_aai_id)

    not_permitted_keys = new_keys_of(
        dict_to_keys(request), [*provider.provider_rights.write, *GLOBAL_ACCESS_FIELDS]
    )
    if len(not_permitted_keys) > 0:
        raise HTTPException(
            status_code=400,
            detail=(
                f"You have no write access to fields: {not_permitted_keys}. If you want"
                " to extend fields access submit a new ticket at:"
                " https://xyz.com/issues/"
            ),
            headers={"WWW-Authenticate": "Bearer"},
        )

    updated_user_data = update_user_data(db, user, request)
    return truncate_dict(
        updated_user_data.data, [*provider.provider_rights.read, *GLOBAL_ACCESS_FIELDS]
    )
