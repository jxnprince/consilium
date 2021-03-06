"""Added tracks versions table, fixed relationships on old tables

Revision ID: 944ed07da528
Revises: ba110663d486
Create Date: 2021-05-05 13:46:25.561380

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '944ed07da528'
down_revision = 'ba110663d486'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('versions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=255), nullable=False),
    sa.Column('length', sa.Integer(), nullable=True),
    sa.Column('trackId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['trackId'], ['tracks.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('versions')
    # ### end Alembic commands ###
