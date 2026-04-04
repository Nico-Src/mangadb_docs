---
title: "OAuth Routes"
description: "OAuth authentication and account linking via Google, Discord, and GitHub."
---

## Overview

MangaDB supports OAuth 2.0 login and account linking for three providers: **Google**, **Discord**, and **GitHub**. Users can sign in with a provider (auto-registering on first use) or link a provider to an existing account.

All OAuth routes are prefixed with `/auth/oauth`.

<div class="h3">Rate Limiting</div>

All OAuth endpoints share a rate limiter: **20 requests per 15 minutes** per IP.

---

## Provider Setup

OAuth requires a **Client ID** and **Client Secret** for each provider, stored as environment variables in the backend `.env` file:

```env
OAUTH_GOOGLE_CLIENT_ID=
OAUTH_GOOGLE_CLIENT_SECRET=
OAUTH_DISCORD_CLIENT_ID=
OAUTH_DISCORD_CLIENT_SECRET=
OAUTH_GITHUB_CLIENT_ID=
OAUTH_GITHUB_CLIENT_SECRET=
```

### Google

1. Go to [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials)
2. Create an **OAuth 2.0 Client ID** (Web application)
3. Configure the **OAuth consent screen** (External, app name, authorized domain)
4. Set **Authorized JavaScript Origins** to your frontend URL
5. Set **Authorized Redirect URIs** (see table below)
6. Copy Client ID and Client Secret to `.env`

### Discord

1. Go to [Discord Developer Portal → Applications](https://discord.com/developers/applications)
2. Create a new application
3. Navigate to **OAuth2**, copy Client ID and reset/copy Client Secret
4. Add **Redirect URLs** (see table below)
5. Copy values to `.env`

### GitHub

1. Go to [GitHub → Settings → Developer Settings → OAuth Apps](https://github.com/settings/developers)
2. Create a **New OAuth App**
3. Set the homepage URL to your frontend URL
4. Set the **Authorization callback URL** (see table below)
5. Copy Client ID and generate/copy Client Secret to `.env`

> **Note:** GitHub only allows one callback URL per OAuth app. You may need separate apps for development and production.

### Redirect URIs

Each provider needs two callback URLs registered — one for login and one for account linking. The URLs are constructed from the API base URL defined in `oauth-config.js`.

| Provider | Login Callback | Link Callback |
|----------|---------------|---------------|
| Google   | `{apiBase}/auth/oauth/google/callback` | `{apiBase}/auth/oauth/link/google/callback` |
| Discord  | `{apiBase}/auth/oauth/discord/callback` | `{apiBase}/auth/oauth/link/discord/callback` |
| GitHub   | `{apiBase}/auth/oauth/github/callback` | `{apiBase}/auth/oauth/link/github/callback` |

**Development** (`apiBase` = `http://localhost:4545`):
- `http://localhost:4545/auth/oauth/{provider}/callback`
- `http://localhost:4545/auth/oauth/link/{provider}/callback`

**Production** (`apiBase` = `https://api.manga-db.org`):
- `https://api.manga-db.org/auth/oauth/{provider}/callback`
- `https://api.manga-db.org/auth/oauth/link/{provider}/callback`

### Changing the Domain

If the API domain changes (e.g. moving from `api.manga-db.org` to a different domain):

1. Update `backend-config.js` port / domain as needed
2. The redirect URIs in `oauth-config.js` auto-derive from `DB_ENV` and the backend port — no manual URI changes needed
3. Update the redirect URIs in each provider's developer console to match the new domain
4. Update CORS origins in `server.js` to include the new frontend domain

---

## Login / Register Flow

### `GET` /auth/oauth/:provider

Redirects the user to the provider's consent screen to begin the OAuth flow.

<div class="h3">Authentication</div>

No authentication required.

<div class="h3">Parameters</div>

| Parameter | Type   | Location | Description |
|-----------|--------|----------|-------------|
| provider  | string | URL path | `google`, `discord`, or `github` |

<div class="h3">Behavior</div>

1. Generates a cryptographic `state` token (stored server-side, 10 min expiry)
2. Redirects to the provider's authorization URL with the configured scopes
3. After consent, the provider redirects to the callback URL

<div class="h3">Responses</div>

::: collapsible 302 Redirect
Redirects to the provider's consent page.
:::

::: collapsible 400 Bad Request
Returned if the provider is not supported.
:::

---

### `GET` /auth/oauth/:provider/callback

Handles the OAuth callback after the user authorizes with the provider.

<div class="h3">Authentication</div>

No authentication required. The `state` parameter is validated against the server-side store.

<div class="h3">Parameters</div>

| Parameter | Type   | Location    | Description |
|-----------|--------|-------------|-------------|
| provider  | string | URL path    | `google`, `discord`, or `github` |
| code      | string | Query param | Authorization code from provider |
| state     | string | Query param | State token for CSRF validation |

<div class="h3">Behavior</div>

1. Validates the `state` token
2. Exchanges the authorization `code` for an access token
3. Fetches the user's profile from the provider
4. If the provider account is already linked to a user → logs that user in
5. If not → creates a new user account (auto-generates username from provider profile) and links the provider
6. Issues JWT tokens and sets the `refreshToken` cookie
7. Redirects to the frontend with `?oauth_success=1`

On error, redirects to the frontend with `?oauth_error={reason}` (e.g. `access_denied`, `invalid_state`, `exchange_failed`).

<div class="h3">Responses</div>

::: collapsible 302 Redirect
Redirects to the frontend URL:
- Success: `{frontendUrl}/login?oauth_success=1`
- Error: `{frontendUrl}/login?oauth_error={reason}`
:::

---

## Account Linking

These endpoints allow authenticated users to connect or disconnect OAuth providers to their existing account.

### `GET` /auth/oauth/link/:provider

Starts the account linking flow for an authenticated user.

<div class="h3">Authentication</div>

Requires a valid `refreshToken` cookie.

<div class="h3">Parameters</div>

| Parameter | Type   | Location | Description |
|-----------|--------|----------|-------------|
| provider  | string | URL path | `google`, `discord`, or `github` |

<div class="h3">Behavior</div>

1. Validates the refresh token
2. Generates a `state` token bound to the user
3. Redirects to the provider's consent screen

<div class="h3">Responses</div>

::: collapsible 302 Redirect
Redirects to the provider's consent page.
:::

::: collapsible 401 Unauthorized
Returned if the refresh token is missing or invalid.
:::

---

### `GET` /auth/oauth/link/:provider/callback

Handles the callback for account linking.

<div class="h3">Authentication</div>

Requires a valid `refreshToken` cookie. The `state` parameter is validated.

<div class="h3">Parameters</div>

| Parameter | Type   | Location    | Description |
|-----------|--------|-------------|-------------|
| provider  | string | URL path    | `google`, `discord`, or `github` |
| code      | string | Query param | Authorization code from provider |
| state     | string | Query param | State token for CSRF validation |

<div class="h3">Behavior</div>

1. Validates `state` and refresh token
2. Exchanges the code for an access token and fetches the provider profile
3. Checks that the provider account isn't already linked to another user
4. Links the provider to the authenticated user's account
5. Redirects to the frontend settings page

<div class="h3">Responses</div>

::: collapsible 302 Redirect
Redirects to the frontend:
- Success: `{frontendUrl}/settings?link_success={provider}`
- Error: `{frontendUrl}/settings?link_error={reason}` (e.g. `already_linked`, `provider_in_use`, `access_denied`)
:::

---

### `GET` /auth/oauth/connections

Returns the list of OAuth providers linked to the authenticated user's account.

<div class="h3">Authentication</div>

Requires a valid `refreshToken` cookie.

<div class="h3">Responses</div>

::: collapsible 200 OK
```json
[
    {
        "provider": "google",
        "provider_username": "John Doe",
        "provider_email": "john@gmail.com",
        "linked_at": "2026-01-15T10:30:00.000Z"
    },
    {
        "provider": "discord",
        "provider_username": "john#1234",
        "provider_email": "john@example.com",
        "linked_at": "2026-02-20T14:15:00.000Z"
    }
]
```
:::

::: collapsible 401 Unauthorized
Returned if the refresh token is missing or invalid.
:::

---

### `DELETE` /auth/oauth/unlink/:provider

Unlinks an OAuth provider from the authenticated user's account.

<div class="h3">Authentication</div>

Requires a valid `refreshToken` cookie.

<div class="h3">Parameters</div>

| Parameter | Type   | Location | Description |
|-----------|--------|----------|-------------|
| provider  | string | URL path | `google`, `discord`, or `github` |

<div class="h3">Behavior</div>

Validates that the user has an alternative login method before allowing the unlink:
- If the user has a password set → unlink is allowed
- If the user has no password and this is their only linked provider → unlink is **rejected** (would lock them out)

<div class="h3">Responses</div>

::: collapsible 200 OK
Provider successfully unlinked.
:::

::: collapsible 400 Bad Request
Returned if unlinking would leave the user with no way to log in.
:::

::: collapsible 401 Unauthorized
Returned if the refresh token is missing or invalid.
:::

::: collapsible 404 Not Found
Returned if the provider is not linked to this account.
:::

---

## Configuration Reference

All OAuth settings live in `src/config/oauth-config.js`. The redirect URIs are auto-generated based on environment:

| Environment Variable | Local Value | Production Value |
|---------------------|-------------|-----------------|
| `DB_ENV` | `local` | anything else |
| API Base URL | `http://localhost:{port}` | `https://api.manga-db.org` |
| Frontend URL | `http://localhost:3000` | `https://manga-db.org` |

### Provider Scopes

| Provider | Scopes |
|----------|--------|
| Google   | `openid`, `profile`, `email` |
| Discord  | `identify`, `email` |
| GitHub   | `read:user`, `user:email` |

### Database Table

OAuth connections are stored in the `oauth_account` table:

| Column | Type | Description |
|--------|------|-------------|
| id | int | Auto-increment primary key |
| user_id | varchar | Foreign key to `user.id` |
| provider | varchar | Provider name (`google`, `discord`, `github`) |
| provider_user_id | varchar | User's ID on the provider |
| provider_username | varchar | Display name from the provider |
| provider_email | varchar | Email from the provider (nullable) |
| provider_avatar | varchar | Avatar URL from the provider (nullable) |
| linked_at | datetime | Timestamp when the account was linked |
