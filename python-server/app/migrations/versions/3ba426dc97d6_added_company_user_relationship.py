"""added company-user relationship

Revision ID: 3ba426dc97d6
Revises: 38efb8cafd7d
Create Date: 2026-05-12 11:03:44.630214

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = '3ba426dc97d6'
down_revision: Union[str, Sequence[str], None] = '38efb8cafd7d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    user_role_enum = postgresql.ENUM('admin', 'member', name='user_role_enum')
    user_role_enum.create(op.get_bind(), checkfirst=True)

    op.add_column('users', sa.Column('company_id', sa.UUID(), nullable=True))
    op.add_column('users', sa.Column('role', user_role_enum, nullable=True))
    op.create_foreign_key(
        'fk_users_company_id_companies',
        'users',
        'companies',
        ['company_id'],
        ['id'],
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint('fk_users_company_id_companies', 'users', type_='foreignkey')
    op.drop_column('users', 'role')
    op.drop_column('users', 'company_id')

    user_role_enum = postgresql.ENUM('admin', 'member', name='user_role_enum')
    user_role_enum.drop(op.get_bind(), checkfirst=True)
