from sqlalchemy import Column, Integer, String

from app.models import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    aai_id = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)

    def __repr__(self):
        return f"<User(name={self.name}, email={self.email})>"

    def as_json(self):
        return dict(name=self.name)
