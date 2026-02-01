---
title: "Publisher Management"
description: ""
---

## `GET` /admin-publishers

Returns a paginated list of publishers for administrative management, including alias aggregation and lock information.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `view-publishers`

<div class="h3">Query Parameters</div>

| Parameter | Type   | Required | Default                       | Description |
|-----------|--------|----------|-------------------------------|-------------|
| order     | string | No       | `name-asc`                    | Sorting order |
| limit     | number | No       | `Number.MAX_SAFE_INTEGER`     | Maximum number of results |
| offset    | number | No       | `0`                           | Pagination offset |
| search    | string | No       | `undefined`                   | Search term applied to publisher names and aliases |

<div class="h4">Enum Values</div>

**order**
- `name-asc`
- `name-desc`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when publishers are successfully retrieved.

```json
{
  "publishers": [
    {
      "id": "number",
      "name": "string",
      "slug": "string",
      "image": "string",
      "aliases": "Alias A;Alias B",
      "locked_by": {
        "id": "number",
        "username": "string"
      }
    }
  ],
  "max": 5,
  "from": 1,
  "to": 20
}
```
Models used
[Publisher Model](../../../model-reference/publisher-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when request parameters are invalid.

```json
{
  "data": "Required parameters missing",
  "code": 400
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-publishers/add

Creates a new publisher entry. A unique slug is automatically generated based on the publisher name.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `add-publishers`

<div class="h3">Request Body</div>

| Field | Type   | Required | Default | Description |
|-------|--------|----------|---------|-------------|
| name  | string | Yes      | —       | Publisher name |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the publisher was successfully created.

```json
{
  "data": "Publisher added successfully",
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

::: collapsible 409 Conflict
Returned when a publisher with the same name already exists.

```json
{
  "data": "Publisher with this Name exists already",
  "code": 409
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned if publisher creation fails unexpectedly.

```json
{
  "data": "Error adding publisher",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `GET` /admin-publishers/id/:id

Returns full publisher information for administrative usage, including descriptions, aliases, and relations.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `view-publishers`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | number | Yes      | Publisher ID |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the publisher exists and data was successfully retrieved.

```json
{
  "id": "number",
  "name": "string",
  "slug": "string",
  "image": "string | null",
  "website": "string | null",
  "headquarter": "string | null",
  "descriptions": [],
  "aliases": [],
  "relations": []
}
```
Models used
[Publisher Model](../../../model-reference/publisher-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when the ID parameter is missing.

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
Returned when the publisher does not exist.

```json
{
  "data": "Publisher not found",
  "code": 404
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-publishers/edit/:id

Updates an existing publisher, including metadata, aliases, descriptions, and relations. Slug regeneration happens automatically if the publisher name changes.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-publishers`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | number | Yes      | Publisher ID |

<div class="h3">Body Parameters</div>

| Parameter | Type | Required | Default | Description |
|------------|------|----------|---------|-------------|
| name | string | Yes | — | Publisher name |
| short_name | string | Yes | — | Short name or abbreviation |
| website | string | No | `null` | Official website URL |
| image_source | string | No | `null` | Image source attribution |
| headquarter | string | No | `null` | Publisher headquarters location |
| founding_date | string | No | `null` | Founding date |
| public | boolean | No | `false` | Whether publisher is public |
| added_aliases | array | No | `[]` | Aliases to add |
| removed_aliases | array | No | `[]` | Aliases to remove |
| added_descriptions | array | No | `[]` | Descriptions to add |
| removed_descriptions | array | No | `[]` | Descriptions to remove |
| modified_descriptions | array | No | `[]` | Descriptions to update |
| added_relations | array | No | `[]` | Relations to add |
| removed_relations | array | No | `[]` | Relations to remove |
| modified_relations | array | No | `[]` | Relations to update |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the publisher was successfully updated.

```json
{
  "data": "Publisher edited successfully",
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
Returned when the publisher does not exist.

```json
{
  "data": "Publisher not found",
  "code": 404
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 409 Conflict
Returned when a publisher with the specified name already exists.

```json
{
  "data": "Publisher with this Name exists already",
  "code": 409
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when updating the publisher fails.

```json
{
  "data": "Error editing publisher",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `DELETE` /admin-publishers/delete/:id

Deletes a publisher and all associated data, including aliases, descriptions, relations, editions, and publisher images. Associated publisher images are also removed from storage and the image service is notified.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `delete-publishers`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | number | Yes      | Publisher ID |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the publisher and all associated data were successfully deleted.

```json
{
  "data": "Publisher deleted successfully",
  "code": 200
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when the required ID parameter is missing.

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
Returned when the publisher does not exist.

```json
{
  "data": "Publisher not found",
  "code": 404
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when deletion fails.

```json
{
  "data": "Error deleting publisher",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-publishers/update-image/:id

Uploads or replaces the image of a publisher. If a previous image exists, it is removed along with its scaled version. The new image is stored, compressed, scaled, and the image service is notified of the change.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-publishers`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | number | Yes      | Publisher ID |

<div class="h3">Request Body</div>

| Field | Type   | Required | Description |
|-------|--------|----------|-------------|
| image | string | Yes      | Base64 encoded image including MIME prefix |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the image is successfully stored and assigned to the publisher.

```json
{
  "data": "Image updated successfully",
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
Returned when the publisher does not exist.

```json
{
  "data": "Publisher not found",
  "code": 404
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when image processing or storage fails.

```json
{
  "data": "Error updating image",
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

## `DELETE` /admin-publishers/delete-image/:id

Deletes the stored image of a publisher. If an image exists, both the original and scaled versions are removed, the publisher record is updated, and the image service is notified.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-publishers`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | number | Yes      | Publisher ID |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the publisher image is successfully deleted.

```json
{
  "data": "Image deleted",
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
Returned when the publisher does not exist.

```json
{
  "data": "Publisher not found",
  "code": 404
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when the publisher has no stored image to delete.

```json
{
  "data": "User has no profile image",
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