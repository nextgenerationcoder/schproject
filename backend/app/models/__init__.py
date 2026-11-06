"""SQLAlchemy ORM models.

The quotation domain schema (customers, requests, products, quotations, ...) is
introduced in Step 2. Every model module must be imported here so that Alembic
autogenerate can discover it via ``Base.metadata``.
"""

from app.db.base import Base

__all__ = ["Base"]
