---
title: "Volume-Routes"
description: ""
---

## `GET` /volumes/toggle-collection/id/:id

Toggles the collection state of a volume for the authenticated user. If the volume is not yet in the user’s collection, it will be added. If it already exists, it will be removed.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description              |
|----------|--------|----------|--------------------------|
| id       | number | Yes      | Identifier of the volume |

<div class="h3">Query Parameters</div>

| Parameter | Type   | Required | Default | Description              |
|----------|--------|----------|---------|--------------------------|
| client   | number | Yes      | —       | Client identifier        |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the collection state is toggled successfully.

```json
{
  "data": "Collection Status updated",
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

::: collapsible 404 Not Found
Returned when the user or volume cannot be found.

```json
{
  "data": "Volume not found",
  "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when the collection state could not be updated due to an unexpected error.

```json
{
  "data": "Could not update collection status",
  "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `GET` /volumes/index/:id/:index

Returns the slug of a volume relative to the current volume position within a series. This endpoint is primarily used for **sequential navigation** (jump-to-index) across volumes while respecting language, edition, and special flags.

<div class="h3">Authentication</div>

No authentication is required for this endpoint.

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description |
|----------|--------|----------|-------------|
| id       | number | Yes      | Identifier of the current volume |
| index    | number | Yes      | Target index within the volume sequence |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the target index resolves to a valid volume.

```json
"volume-slug-string"
```
:::

::: collapsible 400 Bad Request
Returned when required parameters are missing or the index is out of bounds.

```json
{
  "data": "Index out of bounds",
  "code": 400
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 404 Not Found
Returned when the volume does not exist.

```json
{
  "data": "Volume not found",
  "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when attempting to jump to the current volume index.

```json
{
  "data": "Jumping to same volume",
  "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `GET` /volumes/latest-releases/:limit/:lang/:client

Returns the latest released volumes for a given language and client, ordered by release date (newest first). If the user is authenticated, the response additionally includes collection status information.

<div class="h3">Authentication</div>

Authentication is **optional**. When a valid refresh token is provided, collection state (`in_collection`) is resolved for the user.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | No       | Refresh token used to identify user |

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description |
|----------|--------|----------|-------------|
| limit    | number | Yes      | Maximum number of volumes to return |
| lang     | string | Yes      | Language of the volumes |
| client   | number | Yes      | Client identifier |

<div class="h4">Enum Values</div>

**lang**  
Must be one of the supported backend languages (`ALLOWED_LANGUAGES`).

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the latest releases are fetched successfully.

```json
[
  {
    "id": "number",
    "name": "string",
    "group_id": "number",
    "slug": "string",
    "language": "string",
    "pages": "number",
    "release_date": "string",
    "cover_path": "string",
    "nsfw": "number",
    "nsfw18": "number",
    "in_collection": "boolean"
  }
]
```
Models used
[Volume Model](../../model-reference/volume-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when required parameters are missing or invalid.

```json
{
  "data": "Invalid limit parameter OR Invalid lang parameter OR Required parameters missing",
  "code": 400
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 404 Not Found
Returned when an authenticated user cannot be resolved from the refresh token.

```json
{
  "data": "User not found",
  "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `GET` /volumes/recently-added/:limit/:lang/:client

Returns the most recently added volumes for a given language and client, ordered by creation (newest first). If the user is authenticated, the response also includes whether each volume is part of the user’s collection.

<div class="h3">Authentication</div>

Authentication is **optional**. When a valid refresh token is provided, collection state (`in_collection`) is resolved for the user.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | No       | Refresh token used to identify user |

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description |
|----------|--------|----------|-------------|
| limit    | number | Yes      | Maximum number of volumes to return |
| lang     | string | Yes      | Language of the volumes |
| client   | number | Yes      | Client identifier |

<div class="h4">Enum Values</div>

**lang**  
Must be one of the supported backend languages (`ALLOWED_LANGUAGES`).

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the recently added volumes are fetched successfully.

```json
[
  {
    "id": "number",
    "name": "string",
    "slug": "string",
    "language": "string",
    "pages": "number",
    "release_date": "string",
    "cover_path": "string",
    "aspect_ratio": "string",
    "nsfw": "number",
    "nsfw18": "number",
    "in_collection": "boolean"
  }
]
```
Models used
[Volume Model](../../model-reference/volume-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when required parameters are missing or invalid.

```json
{
  "data": "Invalid limit parameter OR Invalid lang parameter OR Required parameters missing",
  "code": 400
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 404 Not Found
Returned when an authenticated user cannot be resolved from the refresh token.

```json
{
  "data": "User not found",
  "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `GET` /volumes/slug/:slug

Returns detailed information about a single volume identified by its slug. The response includes navigation metadata (previous/next volume), gallery images, external links, and—if authenticated—the user’s collection status.

<div class="h3">Authentication</div>

Authentication is **optional**. When a valid refresh token is provided, the response includes whether the volume is in the user’s collection.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | No       | Refresh token used to identify user |

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description |
|----------|--------|----------|-------------|
| slug     | string | Yes      | Unique volume slug |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the volume is found.

```json
{
  "id": "number",
  "name": "string",
  "slug": "string",
  "language": "string",
  "pages": "number",
  "release_date": "string",
  "cover_path": "string",
  "back_cover_path": "string",
  "spine_cover_path": "string",
  "aspect_ratio": "string",
  "nsfw": "number",
  "nsfw18": "number",
  "special": "number",
  "special_name": "string | null",
  "edition_id": "number | null",
  "edition_name": "string | null",
  "in_collection": "boolean",
  "series": {
    "id": "number",
    "type": "string"
  },
  "images": [
    {
      "src": "string",
      "name": "string | null",
      "id": "number | null"
    }
  ],
  "links": [
    {
      "url": "string",
      "name": "string",
      "src": "string"
    }
  ],
  "navigation": {
    "count": "number",
    "index": "number",
    "prev": "string | null",
    "next": "string | null",
  }
}
```
Models used
[Volume Model](../../model-reference/volume-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when the slug parameter is missing.

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
Returned when no volume exists for the given slug.

```json
{
  "data": "Volume not found",
  "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::