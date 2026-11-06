"""Top-level API router. Feature modules are mounted here as they are implemented.

Planned modules (later steps): requests, quotations, products, customers, settings.
"""

from fastapi import APIRouter

from app.api.routes import health

api_router = APIRouter(prefix="/api")
api_router.include_router(health.router)
