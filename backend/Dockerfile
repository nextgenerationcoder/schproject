# Production image for the FastAPI backend.
FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY alembic.ini .
COPY alembic ./alembic
COPY app ./app
COPY docker-entrypoint.sh .

RUN useradd --system --uid 10001 --no-create-home appuser \
    && chmod +x docker-entrypoint.sh
USER appuser

EXPOSE 8000
ENTRYPOINT ["./docker-entrypoint.sh"]
