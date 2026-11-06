from unittest.mock import MagicMock

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.exc import OperationalError

from app.db.session import get_db
from app.main import create_app


def test_health_ok(client: TestClient) -> None:
    response = client.get("/api/health")

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert body["database"] == {"status": "ok", "detail": None}
    assert body["version"]


def test_health_reports_database_failure() -> None:
    broken_session = MagicMock()
    broken_session.execute.side_effect = OperationalError("SELECT 1", {}, Exception("connection refused"))
    app = create_app()
    app.dependency_overrides[get_db] = lambda: broken_session

    with TestClient(app) as client:
        response = client.get("/api/health")

    assert response.status_code == 503
    body = response.json()
    assert body["status"] == "degraded"
    assert body["database"]["status"] == "error"
    # Internal error details (hosts, credentials) must not leak to clients.
    assert "connection refused" not in response.text


def test_unknown_route_returns_structured_error(client: TestClient) -> None:
    response = client.get("/api/does-not-exist")

    assert response.status_code == 404
    assert response.json()["error"]["code"] == "http_404"


def test_openapi_docs_available(client: TestClient) -> None:
    assert client.get("/api/openapi.json").status_code == 200
    assert client.get("/api/docs").status_code == 200


def test_cors_allows_local_frontend(client: TestClient) -> None:
    response = client.options(
        "/api/health",
        headers={"Origin": "http://localhost:5173", "Access-Control-Request-Method": "GET"},
    )
    assert response.headers.get("access-control-allow-origin") == "http://localhost:5173"


@pytest.mark.integration
def test_health_against_configured_database() -> None:
    """Uses the real DATABASE_URL (PostgreSQL from docker-compose). Run: pytest -m integration."""
    with TestClient(create_app()) as client:
        response = client.get("/api/health")

    assert response.status_code == 200, response.text
    assert response.json()["database"]["status"] == "ok"
