from sqlalchemy import Column, ForeignKey, Integer, String

from app.database import Base
from app.db.utils import Json

target_metadata = [Base.metadata]


class Widget(Base):
    __tablename__ = "widget"

    id = Column(Integer, primary_key=True)
    libId = Column(Integer, ForeignKey("library_widget.id"))
    userId = Column(String, ForeignKey("user.aaiId"))

    config = Column(Json, nullable=False)
