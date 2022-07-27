"""create widgets and user

Revision ID: 43e1e787f914
Revises: 
Create Date: 2022-07-28 09:39:21.963817

"""
import json

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
from sqlalchemy import MetaData, Table

from app.db.utils import Json

revision = "43e1e787f914"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Tables
    op.create_table("user", sa.Column("aaiId", sa.String(512), primary_key=True))
    op.create_table(
        "library_widget",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("imageSrc", sa.String(512), nullable=False),
        sa.Column("label", sa.String(255), nullable=False),
        sa.Column("config", Json, nullable=False),
    )
    op.create_table(
        "widget",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("libId", sa.Integer, nullable=False),
        sa.Column("userId", sa.String, nullable=False),
        sa.Column("config", Json, nullable=False),
    )
    op.create_foreign_key(
        "fk_widget_library_widget",
        "widget",
        "library_widget",
        ["libId"],
        ["id"],
    )
    op.create_foreign_key(
        "fk_widget_user",
        "widget",
        "user",
        ["userId"],
        ["aaiId"],
    )

    # Initial data
    meta = MetaData(bind=op.get_bind())
    meta.reflect(only=("library_widget",))
    library_widget_table = Table("library_widget", meta)
    op.bulk_insert(
        library_widget_table,
        [
            {
                "imageSrc": "assets/error.png",
                "label": "Projects",
                "config": json.dumps(
                    {
                        "label": "Recommendation",
                        "config": {"cols": 2, "rows": 1, "minItemCols": 2},
                    }
                ),
            },
            {
                "imageSrc": "assets/error.png",
                "label": "Services",
                "config": json.dumps(
                    {
                        "label": "Recommendation",
                        "config": {"cols": 2, "rows": 1, "minItemCols": 2},
                    }
                ),
            },
            {
                "imageSrc": "assets/error.png",
                "label": "Feeds",
                "config": json.dumps(
                    {
                        "label": "Feeds",
                        "config": {"cols": 2, "rows": 1, "minItemCols": 2},
                    }
                ),
            },
        ],
    )
    pass


def downgrade() -> None:
    op.drop_table("user")
    op.drop_table("library_widget")
    op.drop_table("widget")
