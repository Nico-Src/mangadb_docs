---
title: "Middleware"
description: ""
---

## Authentication Middleware (`requireAuth`)

The `requireAuth` middleware is used to protect API routes by validating JSON Web Tokens (JWT) and, optionally, enforcing permission-based access control. It ensures that only authenticated users — and, when required, users with specific permissions — can access protected endpoints.

<div class="h3">Purpose</div>

This middleware:
- Verifies the presence and validity of an access token
- Attaches the authenticated user context to the request
- Optionally enforces permission checks on a per-route basis

It is implemented as a **middleware factory**, allowing each route to define its own permission requirements.

<div class="h3">Usage</div>

```js
requireAuth()
```

Allows access to any authenticated user.

```js
requireAuth(['permission-name'])
```

Restricts access to authenticated users who possess all specified permissions.

<div class="h3">Authentication</div>

The middleware extracts the access token from the incoming request and validates it using the configured JWT secret.

If the token is valid, the decoded payload is attached to the request as `req.user` for use in downstream handlers.

<div class="h3">Permission Handling</div>

- If no permissions are specified, authentication alone is sufficient
- If permissions are provided, the middleware checks the user’s permission list
- Access is granted only if the user has all required permissions

<div class="h3">Failure Responses</div>

::: collapsible 401 Unauthorized
Returned when the access token is missing, invalid, or cannot be verified.

```json
{
    "data": "Unauthorized",
    "code": 401
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 403 Forbidden
Returned when the authenticated user lacks the required permissions.

```json
{
    "data": "Forbidden",
    "code": 403
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

<div class="h3">Notes</div>

- This middleware does not issue or refresh tokens; it only validates them
- Permission checks assume the JWT payload contains a permission array
- The attached `req.user` object should be treated as trusted only within protected routes