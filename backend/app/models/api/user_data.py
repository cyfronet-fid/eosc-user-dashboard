from pydantic import BaseModel
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.dialects import postgresql

from app.database import Base


class FavouritesBase(BaseModel):
    title: str
    img: str
    url: str
    type: str
    pubdate: str
    id: str
    visitid: str
    description: str
    tags: set[str] = []
    accesstags: set[str] = []
    sectags: set[str] = []
    terttags: set[str] = []


class Favourites(BaseModel):
    publications: list[FavouritesBase] = []
    datasets: list[FavouritesBase] = []
    software: list[FavouritesBase] = []
    services: list[FavouritesBase] = []
    datasources: list[FavouritesBase] = []
    trainings: list[FavouritesBase] = []
    other: list[FavouritesBase] = []
    othermisc: list[FavouritesBase] = []


class UserDataProps(BaseModel):
    favorites: Favourites = Favourites()


class UserData(Base):
    __tablename__ = "user_data"

    id = Column(Integer, primary_key=True)
    userId = Column(String, ForeignKey("user.aaiId"))

    data = Column(postgresql.JSON, nullable=False)
