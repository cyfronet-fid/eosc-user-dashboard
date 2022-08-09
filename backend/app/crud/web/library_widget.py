from typing import List

from sqlalchemy.orm import Session

from app.models.web.library_widget import LibraryWidget


def get_library_widgets_by_ids(db: Session, uids: List[int]) -> List[LibraryWidget]:
    return db.query(LibraryWidget).filter(LibraryWidget.id.in_(uids)).all()


def get_library_widget_by_id(db: Session, uid: int) -> LibraryWidget:
    return db.query(LibraryWidget).get(uid)
