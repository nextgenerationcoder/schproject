# Angebotsassistent Verkaufsinnendienst

AI-assisted quotation system for the Inside Sales department (Verkaufsinnendienst) of a bakery company with about 66 branches.

The finished system will read customer requests from email, use an LLM to extract the requirements, price them with a deterministic Python engine, and prepare German quotations as email drafts. An employee must approve every quotation. Nothing is sent automatically.

> **Current state: Step 1, the project setup.** The repository has the backend and frontend skeleton, the database connection, the migration setup and a dashboard filled with fictional demonstration data. No quotation business logic exists yet.

## Project structure

```
.
├── docker-compose.yml          # PostgreSQL for local development
├── backend/                    # Python / FastAPI
│   ├── app/
│   │   ├── main.py             # App factory: CORS, error handlers, routers
│   │   ├── api/
│   │   │   ├── router.py       # /api root router (feature modules are mounted here)
│   │   │   └── routes/health.py
│   │   ├── core/
│   │   │   ├── config.py       # Pydantic Settings (environment / .env)
│   │   │   └── errors.py       # Structured JSON error responses
│   │   ├── db/
│   │   │   ├── base.py         # Declarative base and constraint naming convention
│   │   │   └── session.py      # Engine, session dependency, connectivity check
│   │   ├── models/             # ORM models (domain schema arrives in Step 2)
│   │   ├── schemas/            # Pydantic API schemas
│   │   └── services/           # Business services (later steps)
│   ├── alembic/                # Migrations (baseline revision only)
│   ├── alembic.ini
│   ├── tests/
│   ├── requirements.txt / requirements-dev.txt
│   └── .env.example
└── frontend/                   # React + TypeScript + Vite + Tailwind CSS
    └── src/
        ├── components/         # Layout, sidebar, top bar, cards, tables
        ├── pages/              # Dashboard and placeholder pages
        ├── hooks/              # useBackendHealth
        ├── services/api.ts     # REST client
        ├── types/              # Shared TypeScript types
        └── data/demoData.ts    # Fictional demonstration data (marked as such)
```

## Prerequisites

- Python 3.12 or newer
- Node.js 20 or newer, with npm
- Docker with Docker Compose

## 1. Start PostgreSQL

```bash
docker compose up -d
```

This starts PostgreSQL 16 on `localhost:5432` with placeholder credentials meant only for local development. You can override them with the `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` and `POSTGRES_PORT` environment variables. If you do, update `DATABASE_URL` in `backend/.env` to match.

## 2. Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements-dev.txt
cp .env.example .env               # then adjust if needed
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

- Health check: http://localhost:8000/api/health. It returns `200` with `"database": {"status": "ok"}`, or `503` when the database cannot be reached.
- Interactive API docs (Swagger UI): http://localhost:8000/api/docs
- ReDoc: http://localhost:8000/api/redoc

### Tests

```bash
cd backend
pytest                 # unit tests (in-memory SQLite, no external services needed)
pytest -m integration  # tests against the PostgreSQL configured in DATABASE_URL
```

## 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 to see the dashboard. The Vite dev server forwards `/api` to `http://localhost:8000`. To point it at another backend, set `VITE_BACKEND_URL`; for a deployed frontend, set `VITE_API_BASE_URL`.

Other commands:

```bash
npm run build   # TypeScript strict type check and production build
npm run lint
```

## Production deployment (VPS)

`docker-compose.prod.yml` runs three containers:

- **PostgreSQL**, reachable only inside the Docker network.
- **The backend**, which applies database migrations automatically when it starts.
- **Caddy**, which serves the built frontend, forwards `/api` to the backend, gets HTTPS certificates from Let's Encrypt automatically, and puts a password prompt in front of the whole site. The prompt stays until real user login exists.

Server requirements: Docker with the Compose plugin, ports 80 and 443 open, and a DNS A record that points the domain at the server.

### First-time setup (on the server)

```bash
git clone -b claude/fervent-curie-ssijul https://github.com/nextgenerationcoder/schproject.git
cd schproject
cp .env.prod.example .env
nano .env       # set DOMAIN, ACME_EMAIL, POSTGRES_PASSWORD, BASIC_AUTH_USER, BASIC_AUTH_HASH
./deploy.sh
```

Generate the two secrets for `.env`:

```bash
openssl rand -hex 24                                                                          # POSTGRES_PASSWORD
docker run --rm caddy:2-alpine caddy hash-password --plaintext 'YOUR-PASSWORD' | sed 's/\$/$$/g'   # BASIC_AUTH_HASH
```

### Updating to the latest code

```bash
cd schproject && ./deploy.sh
```

`deploy.sh` pulls the latest commits, rebuilds the images that changed and restarts them. The database and certificates live in Docker volumes and are kept across updates.

Useful commands:

```bash
docker compose -f docker-compose.prod.yml ps                 # status
docker compose -f docker-compose.prod.yml logs -f backend    # backend logs
docker compose -f docker-compose.prod.yml logs -f web        # Caddy / HTTPS logs
```

## Configuration

All configuration comes from environment variables. See `backend/.env.example`.

| Variable       | Purpose                                             |
| -------------- | --------------------------------------------------- |
| `APP_ENV`      | `development`, `test` or `production`               |
| `DATABASE_URL` | SQLAlchemy URL, e.g. `postgresql+psycopg://…`        |
| `CORS_ORIGINS` | Comma-separated list of allowed frontend origins    |
| `LOG_LEVEL`    | Python log level                                    |

Never commit real credentials or API keys. `.env` files are ignored by git.

## Conventions

- Employee-facing UI text is in German. Source code identifiers and technical documentation are in English.
- Every API error has the same JSON shape: `{"error": {"code", "message", "details"}}`.
- Demonstration data is always labelled as fictional in the UI ("Demo" badges and a notice).
- Pages that don't work yet say so plainly ("Folgt in einem späteren Entwicklungsschritt").

## Roadmap

1. **Project setup and basic dashboard.** ✅ Done.
2. Database schema for the quotation domain, plus fictional sample data.
3. LLM email understanding, with structured extraction and validation.
4. Deterministic pricing engine (products, services, delivery per km, discounts, VAT).
5. Quotation generation and email drafts (mock provider first).
6. Employee review and approval workflow, with an audit trail.
7. Production preparation: authentication and roles, background jobs, deployment.
