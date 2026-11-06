#!/usr/bin/env bash
# Update the production deployment: pull the latest code from GitHub, rebuild and restart.
# Run on the server from the repository root:  ./deploy.sh
# Data (database, HTTPS certificates) lives in Docker volumes and is kept across updates.
set -euo pipefail

cd "$(dirname "$0")"

if [ ! -f .env ]; then
    echo "Missing .env - copy .env.prod.example to .env and fill it in first." >&2
    exit 1
fi

echo "==> Pulling latest code"
git pull --ff-only

echo "==> Building and restarting containers"
docker compose -f docker-compose.prod.yml up -d --build --remove-orphans

echo "==> Removing old, unused images"
docker image prune -f >/dev/null

echo "==> Status"
docker compose -f docker-compose.prod.yml ps
