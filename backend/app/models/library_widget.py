from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base
from app.db.utils import Json

target_metadata = [Base.metadata]


class LibraryWidget(Base):
    __tablename__ = "library_widget"

    id = Column(Integer, primary_key=True)
    imageSrc = Column(String, nullable=False)
    label = Column(String, nullable=False)

    # Partial widget response
    config = Column(Json, nullable=False)
    widgets = relationship("Widget")
