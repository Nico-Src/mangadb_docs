---
title: "System Management"
description: ""
---

## --- Locks --- {.category-title data-category="Locks"}

## `POST` /admin/lock

Creates or validates a lock for a specific route and resource to prevent concurrent modifications.

<div class="h3">Authentication</div>

This endpoint requires authentication via the **refresh token** stored in cookies and the appropriate permission.

- **Required permission:** `manage-locks`

| Cookie Name   | Required | Description                         |
|---------------|----------|-------------------------------------|
| refreshToken  | Yes      | Refresh token used to identify user |

<div class="h3">Request Body</div>

The request body must be sent as JSON and include the following fields:

| Field | Type   | Required | Description                                   |
|------|--------|----------|------------------------------------------------|
| route | string | Yes      | Base route to lock (e.g. `volume`)            |
| id    | string | Yes      | Resource identifier to lock                   |

The full lock identifier is constructed internally using the provided `route` and `id`.

<div class="h4">Example</div>

```json
{
    "route": "volume",
    "id": "1234"
}
```
:::

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the lock is successfully created or already owned by the requesting user.

```json
{
    "data": "Success",
    "code": 200
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when required parameters are missing.

```json
{
    "data": "Missing parameters",
    "code": 400
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 404 Not Found
Returned when the authenticated user cannot be resolved.

```json
{
    "data": "Not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 409 Conflict
Returned when a lock already exists for the specified route and resource and is owned by another user.

```json
{
    "data": "Conflict",
    "code": 409
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when the lock could not be created due to an internal error.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `DELETE` /admin/remove-lock

Removes an existing lock from a specific resource. This endpoint is restricted to authenticated users with the appropriate permission and ensures that only the owner of a lock can remove it.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the required permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `manage-locks`

<div class="h3">Request Body</div>

| Field | Type   | Required | Description                                      |
|-------|--------|----------|--------------------------------------------------|
| route | string | Yes      | Base route of the locked resource                |
| id    | string | Yes      | Identifier of the locked resource                |

The full lock identifier is constructed internally using the provided `route` and `id`.

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the lock is successfully removed.

```json
{
    "data": "Success",
    "code": 200
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when required parameters are missing.

```json
{
    "data": "Missing parameters",
    "code": 400
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 403 Forbidden
Returned when the lock exists but does not belong to the authenticated user.

```json
{
    "data": "Forbidden",
    "code": 403
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 404 Not Found
Returned when the user or lock cannot be found.

```json
{
    "data": "Not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while removing the lock.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::