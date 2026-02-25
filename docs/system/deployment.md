---
title: "Deployment"
description: "Deployment guide for frontend and backend services"
---

# Deployment

This guide describes the deployment process for both the **frontend** and **backend** services.

## Frontend Deployment

The frontend is deployed via Cloudflare Workers using a statically generated build.

### Step 1 — Generate Production Build

Run the generate command:

```bash
npm run generate
````

⚠️ **Important:**
Ensure the `.env` variable `ENV` is **not set to `local`**, otherwise the generated build will use local backend URLs.

Example:

```env
ENV=production
```

### Step 2 — Upload Build to Cloudflare

Upload the contents of the generated output folder to your Cloudflare Worker deployment.

Typically this is the `.output/public` or `dist` folder, depending on your project configuration.

## Frontend Deployment

The frontend is deployed via **Cloudflare Pages** using an automatically triggered build.

Deployments run automatically whenever a commit is pushed to the **`dev` branch**.

---

### Step 1 — Configure Environment Variables

Make sure the `.env` variable `ENV` is **not set to `local`**, otherwise the build will use local backend URLs.

Example:

```env
ENV=production
```

Set this environment variable inside **Cloudflare Pages → Project Settings → Environment Variables**.

### Step 2 — Nuxt Configuration Requirements

Before deploying, verify your Nuxt configuration:

* `baseURL` must be **removed** from `nuxt.config.ts` (do not set it for production deployments on Cloudflare Pages).
* The app must use the default root path (`/`).

Example (correct):

```ts
app: {
  head: {
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  }
}
```

### Step 3 — Automatic Deployment

Cloudflare Pages automatically:

1. Pulls the latest commit from the `dev` branch
2. Installs dependencies
3. Builds the project
4. Deploys the generated output

No manual upload is required.

### Manual Static Deployment

.htaccess is needed for dynamic pages like series detail or volume detail paste this into it:

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  RewriteRule ^index\.html$ - [L]

  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d

  RewriteRule . /index.html [L]
</IfModule>
```

### Build Output

Cloudflare Pages will automatically use the generated static output (`.output/public` or `dist`, depending on your Nuxt setup). No manual handling is necessary.

## Backend Deployment

The backend runs on the server and is managed using **PM2**.

### Step 1 — Upload Updated Files

Using **FileZilla** (or another SFTP client), upload all updated backend files **except**:

* `.env`
* `node_modules`
* `media` directory

These should remain unchanged on the server.

### Step 2 — Install New Dependencies (if needed)

If new dependencies were added, run:

```bash
npm install
```

on the server.

### Step 3 — Restart Backend Services

Restart backend processes using PM2:

```bash
pm2 restart all
```

or restart a specific service if required:

```bash
pm2 restart <service-name>
```

## Deployment Checklist

Before finishing deployment, verify:

* Frontend loads correctly
* API endpoints respond
* Backend services are running
* No errors appear in PM2 logs

View logs with:

```bash
pm2 logs
```