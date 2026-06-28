---
title: "Deployment"
description: "Deployment guide for frontend and backend services"
---

# Deployment

The system is split into two deployment targets:

- **Frontend** — Cloudflare Pages (SSR via Cloudflare Workers)
- **Backend** — Docker Compose on a virtual server

---

## Frontend Deployment (Cloudflare Pages)

The frontend is deployed via **Cloudflare Pages** with server-side rendering (SSR) powered by Cloudflare Workers.

### Zones

There are two Cloudflare Pages projects:

| Zone | Branch | Trigger |
|---|---|---|
| **prod-zone** | `main` | Push to `main` |
| **dev-zone** | `development` | Push to `development` |

Each zone automatically builds and deploys when a commit is pushed to its configured branch.

### Environment Variables

Set these in **Cloudflare Pages → Project Settings → Environment Variables** for each zone:

| Variable | Value | Notes |
|---|---|---|
| `NUXT_PUBLIC_API_BASE` | `https://api.manga-db.org` | |
| `NUXT_PUBLIC_FILE_BASE` | `https://io.manga-db.org` | |
| `NUXT_PUBLIC_CDN_BASE` | `https://cdn.manga-db.org` | |
| `NITRO_PRESET` | `cloudflare-pages` | Required for Cloudflare Workers SSR |
| `SITE_PASSWORD` | `<password>` | Optional — locks the entire site behind a password gate |
| `DISABLED_PAGES` | `e.g. /marketplace,/forum` | Optional — comma-separated frontend page paths to mark as "Coming Soon" |

> **Important:** Do not set `ENV=local` — this would override the API URLs to `localhost`.

> **Note:** `SITE_PASSWORD` is a server-only variable. When set, every page redirects to `/unlock` until the correct password is entered. Leave unset to disable the gate.

### Build Configuration

| Setting | Value |
|---|---|
| **Framework preset** | Nuxt.js |
| **Root directory** | `frontend/mangalib_4` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |

### Deployment Process

1. Push code to `development` (dev-zone) or `main` (prod-zone)
2. Cloudflare Pages automatically:
   - Pulls the latest commit
   - Installs dependencies
   - Builds the Nuxt app with `NITRO_PRESET=cloudflare-pages`
   - Deploys the SSR output to Cloudflare Workers
3. The site is live at `manga-db.org` (prod) with full server-side rendering

No manual build or upload is required.

---

## Backend Deployment (Docker)

All backend services run as Docker containers on the virtual server, managed by Docker Compose.

### Server

- **Provider:** Hetzner
- **OS:** Ubuntu/Debian
- **Attached volume:** `/mnt/HC_Volume_106163195` (157 GB) — stores MariaDB data and media files

### Services

| Container | Image | Role | Internal Port |
|---|---|---|---|
| `api` | `mangalib-backend` | REST API (instance 1) | 4545 |
| `api2` | `mangalib-backend` | REST API (instance 2) | 4545 |
| `io` | `mangalib-backend` | File upload/serving | 4546 |
| `cdn` | `mangalib-backend` | Image delivery + caching | 5555 |
| `mariadb` | `mariadb:10.4` | Database | 3306 |
| `phpmyadmin` | `phpmyadmin:latest` | DB admin UI | 80 |
| `nginx` | `nginx:alpine` | Reverse proxy + SSL | 80, 443 |

`api` and `api2` are load balanced by nginx via the `api_backend` upstream (round-robin). They share the same Docker image but run as independent containers.

### Server Directory Structure

```
/opt/deployment/
├── docker-compose.yml
├── .env                         # Secrets (not in git)
├── .dockerignore
├── docker/
│   ├── backend.Dockerfile
│   └── nginx/
│       ├── nginx.conf           # Read live at runtime (no rebuild needed)
│       └── certs/
│           ├── api.pem          # Cloudflare origin certificate
│           └── api.key          # Cloudflare origin key
└── backend + image-cdn + scraper/
    ├── server.js
    ├── image-cdn.js
    ├── package.json
    ├── package-lock.json
    └── src/
```

### Attached Volume Layout

```
/mnt/HC_Volume_106163195/
├── mariadb/     # MariaDB data files (bind-mounted into container)
└── media/       # Uploaded images, covers, avatars etc.
```

### Environment Variables

The `.env` file at `/root/deployment/.env` (not committed to git):

```env
DB_ROOT_PASSWORD=<MariaDB root password>
DB_PASS=<MariaDB mangadb user password>
DB_DATA_PATH=/mnt/HC_Volume_106163195/mariadb
MEDIA_PATH=/mnt/HC_Volume_106163195/media
HEALTH_SECRET=<secret for /health dashboard>
MARIADB_ROOT_PASSWORD=<MariaDB root password>   # used by backup script
DISABLED_ROUTES=                                 # optional: comma-separated API routes to disable, e.g. auth/login,auth/register
```

> **Note:** Windows line endings (`\r\n`) in `.env` will cause `source` errors on Linux. If editing on Windows, run `sed -i $'s/\r//' /root/deployment/.env` after uploading.

### SSL Certificates

Cloudflare origin certificates are stored in `docker/nginx/certs/` and bind-mounted read-only into nginx at runtime. No rebuild is needed to update them — just replace the files and restart nginx.

```
docker/nginx/certs/api.pem
docker/nginx/certs/api.key
```

### First-time Deployment

```bash
# 1. Install Docker
curl -fsSL https://get.docker.com | sh
apt install -y docker-compose-plugin

# 2. Prepare volume directories
mkdir -p /mnt/HC_Volume_106163195/mariadb
mkdir -p /mnt/HC_Volume_106163195/media

# 3. Copy project files to /opt/deployment/ via SFTP/SCP

# 4. Set up firewall
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable

# 5. Start only MariaDB and import schema/data
docker compose up -d mariadb
docker compose exec -i mariadb mysql -u mangadb -p mangadb < /path/to/dump.sql

# 6. Build and start everything
docker compose build
docker compose up -d

# 7. Update DNS A records in Cloudflare:
#    api.manga-db.org → server IP
#    io.manga-db.org  → server IP
#    cdn.manga-db.org → server IP
#    db.manga-db.org  → server IP (DNS only, no proxy)
```

### Deploying Code Changes

After pushing backend changes to the server:

```bash
cd /root/deployment
git pull
docker compose up -d --build api api2
# or for other services:
docker compose up -d --build cdn io
```

`--build` rebuilds the Docker image. If only `.js` files changed, Docker layer caching skips the `npm ci` step making it fast. Only rebuilds `node_modules` when `package.json` / `package-lock.json` changed.

To update nginx config only (no rebuild needed):
```bash
# Edit docker/nginx/nginx.conf, then:
docker compose restart nginx
```

### Disabled API Routes

To temporarily disable specific API endpoints (e.g. login or registration) without redeploying:

1. Set `DISABLED_ROUTES=auth/login,auth/register` in `/root/deployment/.env`
2. Restart the API containers:
   ```bash
   docker compose restart api api2
   ```

Disabled routes return `503 { disabled: true }`. The frontend shows a toast message informing the user the feature is currently disabled.

### Media Sync

**Server → local (WSL):**
```bash
rsync -avz --progress user@server-ip:/mnt/HC_Volume_106163195/media/ \
  "/mnt/e/Projects/MangaLib/backend + image-cdn + scraper/media/"
```

**Local → server (WSL):**
```bash
rsync -avz --progress \
  "/mnt/e/Projects/MangaLib/backend + image-cdn + scraper/media/" \
  user@server-ip:/mnt/HC_Volume_106163195/media/
```

Run inside a `tmux` session for large transfers:
```bash
tmux new -s media-sync
# run rsync inside, detach with Ctrl+B then D
# reattach with: tmux attach -t media-sync
```

### Nginx Reverse Proxy

Nginx handles SSL termination and load balances traffic:

| Subdomain | Target | Notes |
|---|---|---|
| `api.manga-db.org` | `upstream api_backend` (api + api2, round-robin) | HTTPS |
| `io.manga-db.org` | `io:4546` | HTTPS |
| `cdn.manga-db.org` | `cdn:5555` | HTTP + HTTPS |
| `db.manga-db.org` | `phpmyadmin:80` | HTTPS, DNS-only (no Cloudflare proxy) |

### Volumes

| Volume / Mount | Purpose | Persists |
|---|---|---|
| `/mnt/HC_Volume_106163195/mariadb` | MariaDB data (bind mount) | Yes — attached volume |
| `/mnt/HC_Volume_106163195/media` | Uploaded media files (bind mount) | Yes — attached volume |
| `backend_logs` | Backend log files (named volume) | Yes |
| `nginx_cache` | Nginx cache (named volume) | Yes |

> **Warning:** `docker compose down -v` deletes named volumes. Never use `-v` unless intentional. The attached volume data (`mariadb/`, `media/`) is safe as it is a bind mount, not a named volume.

---

## Database Backups

Automated daily backups run at 04:00 via cron, storing compressed `.sql.gz` dumps on the attached volume. The last 7 days are kept.

### Backup Script

Located at `/root/deployment/backup-db.sh`:

```bash
#!/bin/bash
set -e

BACKUP_DIR="/mnt/HC_Volume_106163195/backups"
DATE=$(date +%Y%m%d_%H%M%S)
FILE="$BACKUP_DIR/mangadb_$DATE.sql.gz"

MARIADB_ROOT_PASSWORD=$(grep '^MARIADB_ROOT_PASSWORD=' /root/deployment/.env | cut -d '=' -f2- | tr -d '\r')

docker exec <mariadb-container-name> mysqldump \
    -u root --password="$MARIADB_ROOT_PASSWORD" \
    --single-transaction --quick \
    mangadb | gzip > "$FILE"

find "$BACKUP_DIR" -name "mangadb_*.sql.gz" -mtime +7 -delete

echo "Backup completed: $FILE"
```

### Cron Job

```bash
crontab -e
```

Add:
```
0 4 * * * /root/deployment/backup-db.sh >> /var/log/mangadb-backup.log 2>&1
```

### Manual Backup

```bash
/root/deployment/backup-db.sh
```

### List Backups

```bash
# With file sizes (compressed)
ls -lh /mnt/HC_Volume_106163195/backups/

# With uncompressed sizes
gzip -l /mnt/HC_Volume_106163195/backups/*.sql.gz
```

### Restore from Backup

```bash
gunzip -c /mnt/HC_Volume_106163195/backups/mangadb_YYYYMMDD_HHMMSS.sql.gz | \
  docker exec -i <mariadb-container-name> mysql -u root --password="<password>" mangadb
```

---

## Useful Commands

```bash
# View logs (all services)
docker compose logs -f

# View logs (single service)
docker compose logs -f api

# Check running containers and health
docker compose ps

# Restart a single service
docker compose restart api

# Rebuild and restart after code changes
cd /root/deployment
git pull
docker compose up -d --build api api2

# Force full rebuild (no cache)
docker compose build --no-cache
docker compose up -d

# Stop all services (data preserved)
docker compose down

# Fix Windows line endings in .env
sed -i $'s/\r//' /root/deployment/.env

# Find MariaDB container name
docker ps --format "{{.Names}}"

# Check backup log
cat /var/log/mangadb-backup.log
```

---

## Deployment Checklist

After deploying, verify:

- [ ] API responds: `https://api.manga-db.org/health/stats?token=<HEALTH_SECRET>`
- [ ] Both API instances handling traffic: `docker compose logs api` and `docker compose logs api2`
- [ ] File service responds at `https://io.manga-db.org`
- [ ] CDN serves images at `https://cdn.manga-db.org`
- [ ] phpMyAdmin loads at `https://db.manga-db.org`
- [ ] Frontend loads at `https://manga-db.org`
- [ ] No errors in `docker compose logs`
- [ ] Backup script runs without error: `/root/deployment/backup-db.sh`
- [ ] Cron job registered: `crontab -l`