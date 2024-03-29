from typing import Optional

from pydantic import BaseModel as PydanticBaseModel
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.dialects import postgresql

from app.database import Base


class BaseModel(PydanticBaseModel):
    class Config:
        arbitrary_types_allowed = True


class ITag(BaseModel):
    label: str
    url: Optional[str]


class ISecondaryTag(BaseModel):
    values: list[ITag]
    iconPath: str
    additionalClass: Optional[str]
    url: Optional[str]


class ITertiaryTag(BaseModel):
    label: str
    values: list[ITag]


class FavouritesBase(BaseModel):
    title: str
    img: Optional[str]
    url: str
    type: str
    pubdate: str
    id: str
    visitid: str
    description: str
    tags: list[ITag] = []
    accesstags: list[ISecondaryTag] = []
    sectags: list[ISecondaryTag] = []
    terttags: list[ITertiaryTag] = []


class DislikesBase(BaseModel):
    title: str
    url: str


class Favourites(BaseModel):
    publications: list[FavouritesBase] = []
    datasets: list[FavouritesBase] = []
    software: list[FavouritesBase] = []
    services: list[FavouritesBase] = []
    datasources: list[FavouritesBase] = []
    trainings: list[FavouritesBase] = []
    other: list[FavouritesBase] = []
    othermisc: list[FavouritesBase] = []
    news: list[FavouritesBase] = []


class Dislikes(BaseModel):
    publications: list[DislikesBase] = []
    datasets: list[DislikesBase] = []
    software: list[DislikesBase] = []
    services: list[DislikesBase] = []
    datasources: list[DislikesBase] = []
    trainings: list[DislikesBase] = []
    other: list[DislikesBase] = []
    othermisc: list[DislikesBase] = []
    news: list[DislikesBase] = []


class UserDataProps(BaseModel):
    favorites: Favourites = Favourites()
    dislikes: Dislikes = Dislikes()


class UserData(Base):
    __tablename__ = "user_data"

    id = Column(Integer, primary_key=True)
    userId = Column(String, ForeignKey("user.aaiId"))

    data = Column(postgresql.JSON, nullable=False)
