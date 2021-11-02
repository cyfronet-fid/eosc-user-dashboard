from sqlalchemy import Column, Integer, String

from app.models import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    aai_id = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)

    def __repr__(self):
        return "<User(name='%s', email='%s')>" \
               % (self.name, self.email)

    def as_json(self):
        return dict(name=self.name)
