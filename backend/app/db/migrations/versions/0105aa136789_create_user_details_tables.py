"""create_user_details_tables
Revision ID: 0105aa136789
Revises: 
Create Date: 2021-11-03 08:31:32.301472
"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic
revision = "0105aa136789"
down_revision = None
branch_labels = None
depends_on = None


def create_user_table() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("aai_id", sa.Text, unique=True, nullable=False, index=True),
        sa.Column("name", sa.Text, nullable=False),
    )


def create_user_view_configurations() -> None:
    op.create_table(
        "users_view_configurations",
        sa.Column("user_id", sa.Integer, unique=True),
        sa.Column("configuration", sa.JSON, default={}),
    )


def create_details_providers() -> None:
    op.create_table(
        "details_providers",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("name", sa.Text, unique=True),
    )


def create_user_details() -> None:
    op.create_table(
        "users_details",
        sa.Column("user_id", sa.Integer, unique=True),
        sa.Column("details_provider_id", sa.Integer, unique=True),
        sa.Column("data", sa.JSON, default={}),
    )


def upgrade() -> None:
    create_user_table()
    create_user_view_configurations()
    create_details_providers()
    create_user_details()


def downgrade() -> None:
    op.drop_table("users")
    op.drop_table("users_view_configurations")
    op.drop_table("users_details")
    op.drop_table("details_providers")
