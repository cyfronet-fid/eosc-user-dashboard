from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.dialects import postgresql

from app.database import Base


class UserData(Base):
    __tablename__ = "user_data"

    id = Column(Integer, primary_key=True)
    userId = Column(String, ForeignKey("user.aaiId"))

    data = Column(postgresql.JSON, nullable=False)
