import uuid
from typing import Dict, Union

import faker

from fastapi import APIRouter

from app.models.DetailsProvider import DetailsProvider
from app.models.User import User
from app.schemas.UserDataResponse import UserDataResponse
from app.schemas.UserDetailsRequest import UserDetailsRequest
from app.schemas.UserDetailsResponse import UserDetailsResponse

router = APIRouter()


@router.get("")
async def get_current_user_data() -> UserDataResponse:
    # TODO: How should I collect User AAI token??
    # TODO: Based on aai token get user data

    return UserDataResponse(
        user=User(
            id=uuid.uuid4(),
            aai_id="dn389r3n7tr984r0dhadd",
            name=faker.Faker().unique.first_name() + " " + faker.Faker().unique.last_name(),
        ).as_json(),
        data=[
            UserDetailsResponse(
                details_provider=DetailsProvider(name="EOSC Providers").name,
                user_details=dict(
                    institution="test",
                    third_name=faker.Faker().unique.first_name(),
                    service_manager=True,
                    office_executive=True
                )
            )
        ]
    )


@router.post("")
async def create_current_user_data(user_details: UserDetailsRequest) -> Dict[str, Union[str, int]]:
    # TODO: How should I collect user details from AAI?
    # TODO: If details provider not created yet -> create
    return dict(id=faker.Faker().unique.random_int(), **user_details.user_details)


@router.put("")
async def update_current_user_data(user_details: UserDetailsRequest) -> Dict[str, Union[str, int]]:
    return dict(id=faker.Faker().unique.random_int(), **user_details.user_details)


@router.patch("")
async def patch_current_user_data(user_details: UserDetailsRequest) -> Dict[str, Union[str, int]]:
    return dict(id=faker.Faker().unique.random_int(), **user_details.user_details)
