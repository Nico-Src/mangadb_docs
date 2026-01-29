---
title: "CDN-Routes"
description: ""
---

## CDN Service

The CDN service is responsible for serving user-facing media assets efficiently and managing cache invalidation when assets change. It acts as a lightweight file delivery layer, ensuring profile images are cached and served with minimal latency while remaining up to date when users update or remove their avatars.

Profile image routes within this service handle both cache invalidation and image delivery at different resolutions.

---

## `POST` /user/avatar/change/:id

Invalidates cached profile image entries for a specific user. This endpoint is typically called by internal services after a user updates or deletes their profile image.

<div class="h3">Authentication</div>

This endpoint is intended for **internal service use** and does not require user authentication.

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description            |
|-----------|--------|----------|------------------------|
| id        | string | Yes      | Identifier of the user |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when cache invalidation completes successfully.

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
    "data": "Required parameters missing",
    "code": 400
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `GET` /user/avatar/:id/:res

Returns a user’s profile image at the requested resolution. If no custom profile image exists, a default image is returned.

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description            |
|-----------|--------|----------|------------------------|
| id        | string | Yes      | Identifier of the user |
| res       | string | No       | Requested image resolution (scaled or high) |

If no resolution is provided, scaled is used by default.

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the profile image is served successfully.

The response is a binary image file.
:::

::: collapsible 400 Bad Request
Returned when required parameters are missing.

```json
{
    "data": "Required parameters missing",
    "code": 400
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 404 Not Found
Returned when the specified user does not exist.

```json
{
    "data": "User not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

<div class="h3">Notes</div>

- Profile images are cached by user ID and resolution
- Cache entries are automatically invalidated via the change endpoint
- Default images are returned for users without a custom profile image
- This endpoint serves files directly from disk for maximum performance