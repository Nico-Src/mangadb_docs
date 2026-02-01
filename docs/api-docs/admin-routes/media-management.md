---
title: "Media Management"
description: ""
---

## `GET` /media

Returns a paginated list of media items available in the system. This endpoint is primarily used by administrative tools to browse and manage uploaded media assets.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `view-media`

<div class="h3">Query Parameters</div>

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| order | string | No | `added-desc` | Sorting order |
| limit | number | No | `Number.MAX_SAFE_INTEGER` | Maximum number of results returned |
| offset | number | No | `0` | Pagination offset |
| search | string | No | `undefined` | Search term used to filter media entries |

<div class="h4">Enum Values</div>

**order**
- `added-asc`
- `added-desc`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when media items are successfully retrieved.

```json
{
  "media": [
    {
      "id": "number",
      "name": "string",
      "path": "string",
      "timestamp": "string",
      "tags": []
    }
  ],
  "max": 5,
  "from": 1,
  "to": 20
}
```
Models used
[Media Model](../../../model-reference/media-model/index.html){.btn .btn-primary}
:::

## `POST` /media/edit/:id

Updates the metadata of an existing media item, including its display name and tags.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-media`

<div class="h3">Path Parameters</div>

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | ID of the media item to update |

<div class="h3">Request Body</div>

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| name | string | Yes | — | Updated media name |
| tags | string / array | Yes | — | Tags associated with the media item |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the media item is successfully updated.

```json
{
  "data": "Media updated successfully",
  "code": 200
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
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
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned if the update operation fails.

```json
{
  "data": "Error updating media",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /media/add

Uploads a new media image and creates a media entry with a name and tags. This endpoint is only available when the service is configured to handle file uploads.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `add-media`

<div class="h3">Request Body</div>

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Name of the media item |
| tags | string / array | Yes | Tags assigned to the media item |
| image | string (base64) | Yes | Base64-encoded image data |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the media item is successfully created.

```json
{
  "data": "Media added successfully",
  "code": 200
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
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
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned if media creation or image processing fails.

```json
{
  "data": "Error adding media",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 503 Service Unavailable
Returned when the current service instance is not configured to handle file uploads.

```json
{
  "data": "This service is not handling file uploads.",
  "code": 503
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `DELETE` /media/delete/:id

Deletes a media entry and its associated image files. This endpoint is only available when the service is configured to handle file uploads.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `delete-media`

<div class="h3">Path Parameters</div>

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | ID of the media entry to delete |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the media entry and associated files are successfully deleted.

```json
{
  "data": "Media deleted successfully",
  "code": 200
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
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
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 404 Not Found
Returned when the specified media entry does not exist.

```json
{
  "data": "Media not found",
  "code": 404
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned if deletion fails due to an internal error.

```json
{
  "data": "Error deleting media",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 503 Service Unavailable
Returned when the current service instance is not configured to handle file uploads.

```json
{
  "data": "This service is not handling file uploads.",
  "code": 503
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::