# Prime Sky International deployment

Production target: VPS-only Coolify/Docker deployment.

## Services

- `primeskyint-frontend` — React/Vite static frontend, internal port `80`
- `primeskyint-api` — Node.js/Express API, internal port `3101`
- `primeskyint-postgres` — PostgreSQL database, internal port `5432`

## Required domains

- Frontend: `https://primeskyint.com`
- Frontend alias: `https://www.primeskyint.com`
- API: `https://api.primeskyint.com`

## Coolify API resource

Use repository branch:

```text
feature/vps-coolify-migration-primeskyint
```

Backend settings:

```text
Base directory: app/backend
Dockerfile: Dockerfile
Internal port: 3101
Domain: https://api.primeskyint.com
```

Environment variables:

```env
NODE_ENV=production
PORT=3101
SERVICE_NAME=primeskyint-api
DATABASE_URL=postgres://primeskyint_user:REDACTED@COOLIFY_DB_HOST:5432/primeskyint_db
JWT_SECRET=REDACTED
ADMIN_USER=admin
ADMIN_PASS=REDACTED
CORS_ORIGIN=https://primeskyint.com,https://www.primeskyint.com
UPLOAD_DIR=/app/uploads
PUBLIC_UPLOAD_URL=https://api.primeskyint.com/uploads
LOG_DIR=/app/logs
```

Persistent storage:

```text
/srv/primeskyint/data/uploads -> /app/uploads
/srv/primeskyint/data/logs -> /app/logs
```

After first API deployment, run:

```bash
npm run init-db
```

inside the API container/terminal to apply `schema.sql`.

## Coolify frontend resource

Frontend settings:

```text
Base directory: app/frontend
Dockerfile: Dockerfile
Internal port: 80
Domain: https://primeskyint.com
Alias/domain: https://www.primeskyint.com
```

Environment variables:

```env
VITE_API_URL=https://api.primeskyint.com
```

## Do not stop legacy runtime until verified

Legacy runtime:

```text
PM2 process: primesky-api
Legacy path: /var/www/primeskyint
Legacy API: 127.0.0.1:3101
```

Keep it running until Coolify API, frontend, database, uploads, backups, and restore are tested.
