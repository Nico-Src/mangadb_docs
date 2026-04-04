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

| Variable | Value |
|---|---|
| `NUXT_PUBLIC_API_BASE` | `https://api.manga-db.org` |
| `NUXT_PUBLIC_FILE_BASE` | `https://io.manga-db.org` |
| `NUXT_PUBLIC_CDN_BASE` | `https://cdn.manga-db.org` |
| `NITRO_PRESET` | `cloudflare-pages` |

> **Important:** Do not set `ENV=local` — this would override the API URLs to `localhost`.

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

### Services

| Container | Image | Role | Internal Port |
|---|---|---|---|
| `api` | `mangalib-backend` | REST API | 4545 |
| `io` | `mangalib-backend` | File upload/serving | 4546 |
| `cdn` | `mangalib-backend` | Image delivery + caching | 5555 |
| `mariadb` | `mariadb:10.4` | Database | 3306 |
| `phpmyadmin` | `phpmyadmin:latest` | DB admin UI | 80 |
| `nginx` | `nginx:alpine` | Reverse proxy + SSL | 80, 443 |

The `api`, `io`, and `cdn` containers share the same Docker image (`mangalib-backend`) but run with different commands.

### Server Directory Structure

```
/root/mangadb/
├── docker-compose.yml
├── .env                         # Secrets (not in git)
├── .dockerignore
├── docker/
│   ├── backend.Dockerfile
│   ├── frontend.Dockerfile      # Kept for reference (not used in compose)
│   └── nginx/
│       ├── nginx.conf
│       └── certs/
│           ├── api.pem          # Cloudflare origin certificate
│           └── api.key          # Cloudflare origin key
├── backend + image-cdn + scraper/
└── frontend/
    └── mangalib_4/              # Only needed if building frontend locally
```

### Environment Variables

The `.env` file at the project root (not committed to git):

```env
DB_ROOT_PASSWORD=<MariaDB root password>
DB_PASS=<MariaDB mangadb user password>
MEDIA_PATH=/root/mangadb_api/media
```

### SSL Certificates

Cloudflare origin certificates are stored in `docker/nginx/certs/`:

```
docker/nginx/certs/api.pem
docker/nginx/certs/api.key
```

Copy from the server's existing location:

```bash
cp /etc/ssl/cloudflare/api.pem /root/mangadb/docker/nginx/certs/api.pem
cp /etc/ssl/cloudflare/api.key /root/mangadb/docker/nginx/certs/api.key
```

### Deploying Code Changes

After pushing updated backend code to the server:

```bash
cd /root/mangadb
docker compose up --build -d
```

This rebuilds only changed images and restarts affected containers. Data volumes (database, media, logs) are preserved.

To update a single service without rebuilding:

```bash
docker compose restart api
```

### Nginx Reverse Proxy

Nginx handles SSL termination and routes traffic to the correct container:

| Subdomain | Target |
|---|---|
| `api.manga-db.org` | `api:4545` (HTTPS) |
| `io.manga-db.org` | `io:4546` (HTTPS) |
| `cdn.manga-db.org` | `cdn:5555` (HTTP) |
| `db.manga-db.org` | `phpmyadmin:80` (HTTPS) |

`manga-db.org` is handled directly by Cloudflare Pages — no nginx proxy needed.

### Volumes

| Volume | Purpose | Persists across restarts |
|---|---|---|
| `db_data` | MariaDB database files | Yes |
| `backend_logs` | Backend log files | Yes |
| `MEDIA_PATH` (bind mount) | Uploaded images, covers, etc. | Yes (host filesystem) |

> **Warning:** `docker compose down -v` deletes named volumes (`db_data`, `backend_logs`). Never use the `-v` flag unless you intend to destroy data.

---

## Useful Commands

```bash
# View logs (all services)
docker compose logs -f

# View logs (single service)
docker compose logs -f api

# Restart a single service
docker compose restart api

# Rebuild and restart after code changes
docker compose up --build -d

# Force full rebuild (no cache) — required after base image or dependency changes
docker compose build --no-cache
docker compose up -d

# Stop all services (data preserved)
docker compose down

# Check running containers
docker compose ps
```

---

## Deployment Checklist

After deploying, verify:

- [ ] Frontend loads at `https://manga-db.org` (check view-source for SSR HTML)
- [ ] API responds at `https://api.manga-db.org/api/series?page=1`
- [ ] File service responds at `https://io.manga-db.org`
- [ ] CDN serves images at `http://cdn.manga-db.org`
- [ ] phpMyAdmin loads at `https://db.manga-db.org`
- [ ] No errors in `docker compose logs`