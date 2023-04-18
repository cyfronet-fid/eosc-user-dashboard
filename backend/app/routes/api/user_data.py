import json
from typing import Any, Dict

from benedict import benedict
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.crud.user import create_user, get_user
from app.database import get_db
from app.models.api.user_data import UserDataProps
from app.models.user import User
from app.schemas.web.session_data import SessionData
from app.utils.cookie_validators import cookie, verifier

router = APIRouter()


def get_proxied_user(
    session_data: SessionData = Depends(verifier), db: Session = Depends(get_db)
) -> User:
    aai_id = (session_data.aai_id,)
    user = get_user(db, aai_id)
    if user is None:
        user = create_user(db, aai_id)
    return user


@router.get("/fav", dependencies=[Depends(cookie)], response_model=UserDataProps)
async def user_data(user: User = Depends(get_proxied_user)):
    """
    Get user data. This is API for EOSC service providers who
    want to integrate with the common user data store.

    To get user's data authorization via `Authorization` header is required, together with user with
    provider's priviledges. Additionally `X-Client-Token` should be set to the user's JWT token
    which it obtains during signing in via AAI.
    """

    return UserDataProps.parse_obj(user.data.data)
    # return UserDataProps.parse_obj(
    #    truncate_dict(
    #        user.data.data, [*provider.provider_rights.read, *GLOBAL_ACCESS_FIELDS]
    #    )
    # )


@router.post("/fav/{types}", status_code=204, dependencies=[Depends(cookie)])
async def add_user_data(
    types: str,
    data: Dict[str, Any] | list[Any],
    user: User = Depends(get_proxied_user),
    db: Session = Depends(get_db),
):
    if types not in [
        "publications",
        "datasets",
        "software",
        "services",
        "datasources",
        "trainings",
        "other",
        "news",
        "othermisc",
    ]:
        raise HTTPException(
            status_code=400, detail="bad type when updating list object"
        )

    user_props = benedict(UserDataProps.parse_obj(user.data.data).dict())
    requested_data = user_props["favorites"][types]

    if not isinstance(data, list):
        raise HTTPException(
            status_code=400, detail="list required when updating list object"
        )

    if isinstance(requested_data, list):
        for element in data:
            notfound = True
            for elementin in requested_data:
                if (
                    element["url"] == elementin["url"]
                    and element["title"] == elementin["title"]
                ):
                    notfound = False
            if notfound:
                requested_data.append(element)
        user.data.data = json.loads(UserDataProps.parse_obj(user_props).json())
        db.add(user.data)
        db.commit()


@router.delete("/fav/{types}", status_code=204, dependencies=[Depends(cookie)])
async def delete_user_data(
    types: str,
    data: Dict[str, Any] | list[Any],
    user: User = Depends(get_proxied_user),
    db: Session = Depends(get_db),
) -> None:
    if types not in [
        "publications",
        "datasets",
        "software",
        "services",
        "datasources",
        "trainings",
        "other",
        "news",
        "othermisc",
    ]:
        raise HTTPException(
            status_code=400, detail="bad type when updating list object"
        )

    user_props = benedict(UserDataProps.parse_obj(user.data.data).dict())
    requested_data = user_props["favorites"][types]

    if not isinstance(data, list):
        raise HTTPException(
            status_code=400, detail="list required when updating list object"
        )

    if isinstance(requested_data, list):
        for element in data:
            for elementin in requested_data:
                if (
                    element["url"] == elementin["url"]
                    and element["title"] == elementin["title"]
                ):
                    print("Removing element.." + elementin["title"])
                    requested_data.remove(elementin)

        user.data.data = json.loads(UserDataProps.parse_obj(user_props).json())
        db.add(user.data)
        db.commit()
