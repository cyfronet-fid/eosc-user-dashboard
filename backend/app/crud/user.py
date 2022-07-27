from sqlalchemy.orm import Session

from app.models.user import User


def get_user(db: Session, aai_id: str) -> User:
    return db.query(User).filter(User.aaiId == aai_id).first()


def create_user(db: Session, aai_id: str) -> User:
    db_user = User(aaiId=aai_id)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
