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
from sqlalchemy.dialects import postgresql

revision = "43e1e787f914"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # User & User Data
    op.create_table(
        "user",
        sa.Column("aaiId", sa.String, primary_key=True),
        sa.Column("provider", sa.Boolean, default=False, nullable=False),
        sa.Column("admin", sa.Boolean, default=False, nullable=False),
        sa.Column("superAdmin", sa.Boolean, default=False, nullable=False),
    )
    op.create_table(
        "user_data",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("userId", sa.String, nullable=False),
        sa.Column("data", postgresql.JSON, nullable=False),
    )
    op.create_table(
        "provider_rights",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("providerId", sa.String, nullable=False),
        sa.Column("read", postgresql.ARRAY(sa.String), nullable=True),
        sa.Column("write", postgresql.ARRAY(sa.String), nullable=True),
    )
    op.create_foreign_key(
        "fk_user_data_user",
        "user_data",
        "user",
        ["userId"],
        ["aaiId"],
    )
    op.create_foreign_key(
        "fk_provider_rights_user",
        "provider_rights",
        "user",
        ["providerId"],
        ["aaiId"],
    )

    # Widgets
    op.create_table(
        "library_widget",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("imageSrc", sa.String(512), nullable=False),
        sa.Column("label", sa.String(255), nullable=False),
        sa.Column("config", postgresql.JSON, nullable=False),
    )
    op.create_table(
        "widget",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("libId", sa.Integer, nullable=False),
        sa.Column("userId", sa.String, nullable=False),
        sa.Column("config", postgresql.JSON, nullable=False),
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
                "imageSrc": "assets/feeds.svg",
                "label": "Latest news",
                "config": {
                    "label": "Latest news",
                    "config": {"cols": 2, "rows": 1, "minItemCols": 2},
                },
            },
            {
                "imageSrc": "assets/favourites.svg",
                "label": "Favourites",
                "config": {
                    "label": "Favourites",
                    "config": {"cols": 1, "rows": 2, "minItemCols": 1},
                },
            },
            {
                "imageSrc": "assets/favourites.svg",
                "label": "Service recommendations",
                "config": {
                    "label": "Service recommendations",
                    "config": {"cols": 1, "rows": 1, "minItemCols": 1},
                },
            },
            {
                "imageSrc": "assets/feeds.svg",
                "label": "Training recommendations",
                "config": {
                    "label": "Training recommendations",
                    "config": {"cols": 1, "rows": 1, "minItemCols": 2},
                },
            },
            {
                "imageSrc": "assets/favourites.svg",
                "label": "Publication recommendations",
                "config": {
                    "label": "Publication recommendations",
                    "config": {"cols": 1, "rows": 2, "minItemCols": 1},
                },
            },
            {
                "imageSrc": "assets/favourites.svg",
                "label": "Dataset recommendations",
                "config": {
                    "label": "Dataset recommendations",
                    "config": {"cols": 1, "rows": 1, "minItemCols": 1},
                },
            },
            {
                "imageSrc": "assets/favourites.svg",
                "label": "Software recommendations",
                "config": {
                    "label": "Software recommendations",
                    "config": {"cols": 1, "rows": 2, "minItemCols": 1},
                },
            },
        ],
    )
    pass


def downgrade() -> None:
    # User & User Data
    op.drop_table("user")
    op.drop_table("user_data")
    op.drop_table("user_data_rights")

    # Widgets
    op.drop_table("library_widget")
    op.drop_table("widget")
