import json

from sqlalchemy import JSON, Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from app.models import Base


class UserViewConfiguration(Base):
    __tablename__ = "users_view_configurations"

    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    configuration = Column(JSON, default={})

    user = relationship("User", uselist=False)

    def __repr__(self):
        return "<UserViewConfiguration(configuration='%s', user='%s')>" \
               % (json.dumps(self.configuration), json.dumps(self.user))

    def as_json(self):
        return self.configuration
