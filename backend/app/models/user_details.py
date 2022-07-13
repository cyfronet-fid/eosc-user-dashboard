import json

from sqlalchemy import JSON, Column, ForeignKey, Integer, PrimaryKeyConstraint
from sqlalchemy.orm import relationship

from app.models import Base


class UserDetails(Base):
    __tablename__ = "users_details"

    user_id = Column(Integer, ForeignKey("users.id"))
    details_provider_id = Column(Integer, ForeignKey("details_providers.id"))
    data = Column(JSON, default={})
    __table_args__ = (
        PrimaryKeyConstraint(user_id, details_provider_id),
        {},
    )

    user = relationship("User", uselist=False)
    details_provider = relationship("DetailsProvider", uselist=False)

    def __repr__(self):
        return (
            "<UserDetails("
            f"user={json.dumps(self.user)}, "
            f"details_provider={json.dumps(self.details_provider)} "
            f"data={json.dumps(self.data)})"
            ">"
        )

    def as_json(self):
        return dict(provider=self.details_provider.name, data=self.data)
