import json

from sqlalchemy import Column, Integer, String

from app.models import Base


class DetailsProvider(Base):
    __tablename__ = "details_providers"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)

    def __repr__(self):
        return (
            f"<DetailsProvider(name={self.name},"
            f" user_details={json.dumps(self.users_details)}>"
        )

    def as_json(self):
        return dict(name=self.name)
