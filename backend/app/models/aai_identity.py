from sqlalchemy import Column, String

from app.models import Base
target_metadata = [Base.metadata]


class AaiIdentity(Base):
    __tablename__ = "aai_identities"

    id = Column(String, primaryKey=True, unique=True, nullable=False)
