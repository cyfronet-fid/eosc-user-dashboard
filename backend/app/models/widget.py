from sqlalchemy import Column, Integer, ForeignKey, String

from app.database import Base
from app.db.utils import Json

target_metadata = [Base.metadata]


class Widget(Base):
    __tablename__ = "widget"

    id = Column(Integer, primary_key=True)
    libId = Column(Integer, ForeignKey("library_widget.id"))
    userId = Column(String, ForeignKey("user.aai_id"))

    config = Column(Json, nullable=False)

