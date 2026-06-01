# Prime Sky International handover

## Project

- Project name: Prime Sky International
- VPS IP: 187.77.144.38
- Frontend domains: https://primeskyint.com and https://www.primeskyint.com
- API domain: https://api.primeskyint.com
- GitHub repository: https://github.com/digiwebdex/dhaka-venture-cms-d61139aa
- Branch: feature/vps-coolify-migration-primeskyint

## Runtime status

Final target runtime is Coolify/Docker. The legacy PM2 runtime must remain available until final verification is approved.

- Legacy PM2 process: primesky-api
- Legacy folder: /var/www/primeskyint
- Legacy API port: 3101 on 127.0.0.1
- Final frontend service: primeskyint-frontend
- Final API service: primeskyint-api
- Final database service: primeskyint-postgres

## Current Coolify container identifiers observed during migration

These names can change after redeploys, so verify with `docker ps` before manual Nginx proxy changes.

- Frontend container: ifxsoxwgisivqo63bqdo1fu5-103606548032
- API container: p8tlv1eqeohvh7f40uhwcknb-185838218847
- PostgreSQL container/host: eql97jbuc5wpjz7ybdwgg7vx

## Ports

- Public ports: 80, 443, secured SSH
- Frontend internal port: 80
- API internal port: 3101
- PostgreSQL internal port: 5432

## Folder structure

Dedicated project root:

```text
/srv/primeskyint/
├── app/
│   ├── frontend/
│   ├── backend/
│   ├── docker-compose.yml
│   └── README_DEPLOYMENT.md
├── data/
│   ├── postgres/
│   ├── uploads/
│   ├── logs/
│   └── temp/
├── backups/
│   ├── database/
│   ├── uploads/
│   ├── full-project/
│   └── restore-test/
├── scripts/
└── docs/
```

## Frontend

- Source path: /srv/primeskyint/app/frontend
- Build command: npm run build
- Dockerfile: app/frontend/Dockerfile
- Runtime: Nginx static container
- Environment variable: VITE_API_URL=https://api.primeskyint.com

## Backend

- Source path: /srv/primeskyint/app/backend
- Start command: node server.js
- Init database command: npm run init-db
- Dockerfile: app/backend/Dockerfile
- Health check: https://api.primeskyint.com/api/health

## Database

- Database: primeskyint_db
- User: primeskyint_user
- Internal Coolify host observed: eql97jbuc5wpjz7ybdwgg7vx
- Public database exposure: must stay disabled
- Connection style used by API: DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD or DATABASE_URL

## Persistent storage

- Upload host path: /srv/primeskyint/data/uploads
- Upload container path: /app/uploads
- Log host path: /srv/primeskyint/data/logs
- Log container path: /app/logs
- Backup path: /srv/primeskyint/backups

## Environment variables without secret values

Backend:

```env
NODE_ENV=production
PORT=3101
SERVICE_NAME=primeskyint-api
DB_HOST=eql97jbuc5wpjz7ybdwgg7vx
DB_PORT=5432
DB_NAME=primeskyint_db
DB_USER=primeskyint_user
DB_PASSWORD=REDACTED
JWT_SECRET=REDACTED
ADMIN_USER=admin
ADMIN_PASS=REDACTED
CORS_ORIGIN=https://primeskyint.com,https://www.primeskyint.com
UPLOAD_DIR=/app/uploads
PUBLIC_UPLOAD_URL=https://api.primeskyint.com/uploads
LOG_DIR=/app/logs
```

Frontend:

```env
VITE_API_URL=https://api.primeskyint.com
```

## API endpoints

Core endpoints include:

- GET /api/health
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me
- GET /api/settings
- PUT /api/settings
- GET /api/homepage-content
- PUT /api/homepage-content
- GET/POST/PUT/DELETE /api/pages
- GET/POST/PUT/DELETE /api/services
- GET/POST/PUT/DELETE /api/packages
- GET/POST/PUT/DELETE /api/visa-services
- GET/POST/PUT/DELETE /api/categories
- GET/POST/PUT/DELETE /api/bookings
- GET/POST/PUT/DELETE /api/inquiries
- GET/POST/PUT/DELETE /api/blogs
- GET/POST/PUT/DELETE /api/testimonials
- GET/POST/PUT/DELETE /api/team
- GET/POST/PUT/DELETE /api/offers
- GET/POST/PUT/DELETE /api/reviews
- GET /api/seo
- PUT /api/seo/:pageSlug
- POST /api/upload
- GET /uploads/:filename
- GET /api/dashboard/stats

## Admin user method

The current admin login is environment-based:

- ADMIN_USER controls the username.
- ADMIN_PASS controls the password.
- JWT_SECRET signs login tokens.

Rotate ADMIN_PASS and JWT_SECRET in Coolify if exposed or when handing over.

## Backup procedure

Database backup:

```bash
cd /srv/primeskyint
DATABASE_URL='postgres://USER:PASS@HOST:5432/primeskyint_db' ./scripts/backup-db.sh
```

Upload backup:

```bash
cd /srv/primeskyint
./scripts/backup-uploads.sh
```

## Restore procedure

Database restore:

```bash
cd /srv/primeskyint
DATABASE_URL='postgres://USER:PASS@HOST:5432/primeskyint_db' ./scripts/restore-db.sh /srv/primeskyint/backups/database/FILE.dump
```

Upload restore:

```bash
cd /srv/primeskyint
./scripts/restore-uploads.sh /srv/primeskyint/backups/uploads/FILE.tar.gz
```

## Deployment procedure

1. Push changes to GitHub branch `feature/vps-coolify-migration-primeskyint`.
2. Redeploy `primeskyint-api` and `primeskyint-frontend` in Coolify.
3. If the manual host Nginx proxy is used, verify container IPs after each redeploy and update `/etc/nginx/sites-available/primeskyint` if they change.
4. Run `nginx -t && systemctl reload nginx` after any Nginx change.
5. Test health, frontend, admin, forms, uploads, and persistence.

## Verification checklist

- Frontend opens at https://primeskyint.com
- Frontend opens at https://www.primeskyint.com
- API health works at https://api.primeskyint.com/api/health
- API health returns database connected
- Admin login works
- Admin-created data saves to PostgreSQL
- Public visitors can see admin-created data
- Booking/contact/inquiry forms save to PostgreSQL
- Uploads save to /srv/primeskyint/data/uploads
- Uploaded files load through https://api.primeskyint.com/uploads
- Database persists after redeploy
- Uploads persist after redeploy
- Backup scripts run successfully
- Restore test is completed
- PM2 process primesky-api is stopped only after final approval

## Notes

The live Nginx config was changed during migration to proxy frontend and API traffic to the current Coolify container IPs. Container IPs can change after redeploy, so this should be reviewed before future redeploys or replaced by Coolify-managed domain routing when the host proxy stack is standardized.
