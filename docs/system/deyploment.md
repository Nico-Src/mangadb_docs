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