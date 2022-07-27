from sqlalchemy.orm import Session

from app.models.widget import Widget
from app.schemas.web.widget_config import WidgetConfigResponse


def get_widgets_by_user(db: Session, user_id: str) -> Widget:
    return db.query(Widget).filter_by(userId=user_id).all()


def create_widget(
    db: Session, lib_id: int, user_id: str, config: WidgetConfigResponse
) -> Widget:
    new_widget = Widget(libId=lib_id, userId=user_id, config=config)
    db.add(new_widget)
    db.commit()
    db.refresh(new_widget)
    return new_widget


def update_widget(
    db: Session, uid: int, user_id: str, config: WidgetConfigResponse
) -> Widget:
    widget = db.query(Widget).filter_by(id=uid, userId=user_id).first()
    widget.config = config
    db.commit()
    return widget


def delete_widget(db: Session, uid: int, user_id: str) -> None:
    widget = db.query(Widget).filter_by(id=uid, userId=user_id).first()
    db.delete(widget)
    db.commit()
