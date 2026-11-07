#!/usr/bin/env bash
# Update the production deployment: pull the latest code from GitHub, rebuild and restart.
# Run on the server from the repository root:  ./deploy.sh
# Data (database, HTTPS certificates) lives in Docker volumes and is kept across updates.
#
# Which compose files are used is set by COMPOSE_FILE in .env:
#   docker-compose.prod.yml                             -> standalone, Caddy owns ports 80/443
#   docker-compose.prod.yml:docker-compose.traefik.yml  -> behind an existing Traefik proxy
set -euo pipefail

cd "$(dirname "$0")"

if [ ! -f .env ]; then
    echo "Missing .env - copy .env.prod.example to .env and fill it in first." >&2
    exit 1
fi

# Never fall back to the development docker-compose.yml.
if ! grep -q '^COMPOSE_FILE=' .env; then
    export COMPOSE_FILE=docker-compose.prod.yml
fi

echo "==> Pulling latest code"
git pull --ff-only

echo "==> Building and restarting containers"
docker compose up -d --build --remove-orphans

echo "==> Removing old, unused images"
docker image prune -f >/dev/null

echo "==> Status"
docker compose ps
