import uuid
from typing import Dict, Union

import faker
from fastapi import APIRouter

from app.models.details_provider import DetailsProvider
from app.models.user import User
from app.schemas.user_data_response import UserDataResponse
from app.schemas.user_details_request import UserDetailsRequest
from app.schemas.user_details_response import UserDetailsResponse

router = APIRouter()


@router.get("")
async def get_current_user_data() -> UserDataResponse:
    return UserDataResponse(
        user=User(
            id=uuid.uuid4(),
            aai_id="dn389r3n7tr984r0dhadd",
            name=faker.Faker().unique.first_name()
            + " "
            + faker.Faker().unique.last_name(),
        ).as_json(),
        data=[
            UserDetailsResponse(
                details_provider=DetailsProvider(name="EOSC Providers").name,
                user_details=dict(
                    institution="test",
                    third_name=faker.Faker().unique.first_name(),
                    service_manager=True,
                    office_executive=True,
                ),
            )
        ],
    )


@router.post("")
async def create_current_user_data(
    user_details: UserDetailsRequest,
) -> Dict[str, Union[str, int]]:
    return dict(id=faker.Faker().unique.random_int(), **user_details.user_details)


@router.put("")
async def update_current_user_data(
    user_details: UserDetailsRequest,
) -> Dict[str, Union[str, int]]:
    return dict(id=faker.Faker().unique.random_int(), **user_details.user_details)


@router.patch("")
async def patch_current_user_data(
    user_details: UserDetailsRequest,
) -> Dict[str, Union[str, int]]:
    return dict(id=faker.Faker().unique.random_int(), **user_details.user_details)
