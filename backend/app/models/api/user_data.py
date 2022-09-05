from pydantic import BaseModel
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.dialects import postgresql

from app.database import Base


class Favourites(BaseModel):
    services: set[str] = []
    publications: set[str] = []
    projects: set[str] = []
    trainings: set[str] = []


class UserDataProps(BaseModel):
    favorites: Favourites = Favourites()


class UserData(Base):
    __tablename__ = "user_data"

    id = Column(Integer, primary_key=True)
    userId = Column(String, ForeignKey("user.aaiId"))

    data = Column(postgresql.JSON, nullable=False)
