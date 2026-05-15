"""seed industry and company type lookups

Revision ID: 9f4c2d8a1b37
Revises: 14362c2840a7
Create Date: 2026-05-15 19:10:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "9f4c2d8a1b37"
down_revision: Union[str, Sequence[str], None] = "14362c2840a7"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


COMPANY_TYPES = [
    {"id": "0c8bff11-55e8-4db2-8b90-6f9fe94cb3d1", "name": "Startup"},
    {"id": "215e55fc-6203-4b7d-a070-f08ee94037d5", "name": "Small Business"},
    {"id": "49c4ac11-f78c-4693-9ba7-6a2e85f02fa2", "name": "SME"},
    {"id": "bb26e763-e1c7-474c-a355-eea70fa4abdc", "name": "Enterprise"},
    {"id": "31b5a8c1-b913-4e7b-8894-532f34ae1ecd", "name": "Corporation"},
    {"id": "5dbf98f9-d66c-4562-8bb7-98a81cfd071d", "name": "Nonprofit"},
    {"id": "ba4efe85-0c9a-4f5c-b824-565480265e3e", "name": "Government"},
    {"id": "1170b538-0fef-476a-9707-9f859ae7ce74", "name": "Educational Institution"},
    {"id": "dbca863b-6d0e-4d77-bb8b-93cb544e32b2", "name": "Freelancer / Solo"},
    {"id": "6f73c3f3-880e-4a87-bff4-495d36b0401e", "name": "Agency"},
    {"id": "5e0c9a66-c7ff-4200-8161-59ca71470818", "name": "Investor / VC"},
    {"id": "dc8e563b-57e1-44a2-b365-fcd0f651e6e2", "name": "Accelerator / Incubator"},
]


INDUSTRIES = [
    {"id": "448607c2-9eeb-4c18-a57e-a74153c2bf3c", "name": "Information Technology", "slug": "information-technology"},
    {"id": "d0fd532e-6151-472b-9188-65a9d4ee58e1", "name": "Software Development", "slug": "software-development"},
    {"id": "e3f59858-7fec-46fc-a6d3-9733a49a0833", "name": "FinTech", "slug": "fintech"},
    {"id": "55eab812-35a3-4b76-a706-4e4f73aa7702", "name": "Healthcare", "slug": "healthcare"},
    {"id": "f790266f-d8cf-41ef-9aeb-7d78b85de2b0", "name": "Education", "slug": "education"},
    {"id": "92141d63-7db0-49a9-93f7-e452dbefcbb6", "name": "Manufacturing", "slug": "manufacturing"},
    {"id": "d0aad5ac-366b-425a-b134-8341d3e3b390", "name": "Construction", "slug": "construction"},
    {"id": "da4b9a54-44cd-4b3c-9995-bc68b2425d39", "name": "Real Estate", "slug": "real-estate"},
    {"id": "e333bc9c-9bf4-493b-97b5-ad154c6a4efd", "name": "Retail", "slug": "retail"},
    {"id": "5e70bd7d-068a-4c1b-b6c2-6b6e4f0a3b22", "name": "E-commerce", "slug": "e-commerce"},
    {"id": "b81b8ecd-2691-49f8-bd13-b17e3d26905f", "name": "Marketing & Advertising", "slug": "marketing-advertising"},
    {"id": "c528783b-088d-4d4a-b701-783b9aa124bf", "name": "Consulting", "slug": "consulting"},
    {"id": "8459499b-0161-4031-ac35-6a8f6f8cf4e2", "name": "Finance & Banking", "slug": "finance-banking"},
    {"id": "ee2a8bdb-4b6e-4fb6-bba4-0060c20844dd", "name": "Insurance", "slug": "insurance"},
    {"id": "ab57fe77-1860-4686-a6ba-6f5a1ff97ee9", "name": "Telecommunications", "slug": "telecommunications"},
    {"id": "589f5f11-77c1-4c64-8483-4437f014d731", "name": "Logistics & Transportation", "slug": "logistics-transportation"},
    {"id": "b9d95b2a-708d-4572-a8d5-679d08af15f3", "name": "Energy & Utilities", "slug": "energy-utilities"},
    {"id": "7bfb407c-5893-47bb-ae64-f30b77cf8b6a", "name": "Agriculture", "slug": "agriculture"},
    {"id": "a13c68ef-9b70-4e38-8054-5ba424a57bbe", "name": "Food & Beverage", "slug": "food-beverage"},
    {"id": "8ae1f4fa-2cc9-4241-9231-08f0aa76f112", "name": "Tourism & Hospitality", "slug": "tourism-hospitality"},
    {"id": "d36e290d-30a1-4e58-af4b-0149792c6d98", "name": "Media & Entertainment", "slug": "media-entertainment"},
    {"id": "b56be87d-210a-43a4-8b2d-3d06778a9252", "name": "Legal Services", "slug": "legal-services"},
    {"id": "7941c217-078d-4181-81e3-bf843fb7aeff", "name": "Human Resources", "slug": "human-resources"},
    {"id": "76a10b7b-db11-42bc-b13f-7365ddfd7ed5", "name": "Automotive", "slug": "automotive"},
    {"id": "e51bbf90-0092-4b17-b054-043ae3c74038", "name": "Nonprofit & Social Impact", "slug": "nonprofit-social-impact"},
]


def upgrade() -> None:
    bind = op.get_bind()

    bind.execute(
        sa.text(
            """
            INSERT INTO company_types (id, name, created_at)
            VALUES (:id, :name, now())
            ON CONFLICT (name) DO NOTHING
            """
        ),
        COMPANY_TYPES,
    )

    bind.execute(
        sa.text(
            """
            INSERT INTO industries (id, name, slug, created_at)
            VALUES (:id, :name, :slug, now())
            ON CONFLICT (slug) DO NOTHING
            """
        ),
        INDUSTRIES,
    )


def downgrade() -> None:
    bind = op.get_bind()

    bind.execute(
        sa.text("DELETE FROM industries WHERE slug = ANY(:slugs)"),
        {"slugs": [industry["slug"] for industry in INDUSTRIES]},
    )
    bind.execute(
        sa.text("DELETE FROM company_types WHERE name = ANY(:names)"),
        {"names": [company_type["name"] for company_type in COMPANY_TYPES]},
    )
