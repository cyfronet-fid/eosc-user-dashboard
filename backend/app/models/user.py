from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from app.database import Base

target_metadata = [Base.metadata]


class User(Base):
    __tablename__ = "user"

    aaiId = Column(String, primary_key=True, unique=True, nullable=False)

    widgets = relationship("Widget")
