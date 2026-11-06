import os
from collections.abc import Iterator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

# Unit tests must not depend on a developer's .env; provide a harmless default.
# Integration tests (marker "integration") use the real DATABASE_URL from the environment / .env.
os.environ.setdefault("APP_ENV", "test")
if not os.path.exists(".env"):
    os.environ.setdefault("DATABASE_URL", "sqlite://")

from app.db.session import get_db  # noqa: E402
from app.main import create_app  # noqa: E402


@pytest.fixture
def sqlite_session() -> Iterator[Session]:
    engine = create_engine("sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool)
    session = sessionmaker(bind=engine)()
    try:
        yield session
    finally:
        session.close()
        engine.dispose()


@pytest.fixture
def client(sqlite_session: Session) -> Iterator[TestClient]:
    """Client whose database dependency points to an in-memory SQLite database."""
    app = create_app()
    app.dependency_overrides[get_db] = lambda: sqlite_session
    with TestClient(app) as test_client:
        yield test_client
