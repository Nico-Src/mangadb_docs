---
title: "Contributor Management"
description: ""
---

## `GET` /admin-contributors

Returns a paginated list of contributors for administrative management, including lock information when a contributor is currently being edited by another user.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `view-contributors`

<div class="h3">Query Parameters</div>

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| order | string | No | `name-asc` | Sorting order |
| limit | number | No | `Number.MAX_SAFE_INTEGER` | Maximum number of results |
| offset | number | No | `0` | Pagination offset |
| search | string | No | `undefined` | Search term applied to contributor names |
| client | number | Yes | — | Client identifier |

<div class="h4">Enum Values</div>

**order**
- `name-asc`
- `name-desc`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when contributors are successfully retrieved.

```json
{
  "contributors": [
    {
      "id": "number",
      "first_name": "string",
      "last_name": "string",
      "slug": "string",
      "image": "string",
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
[Contributor Model](../../../model-reference/contributor-model/index.html){.btn .btn-primary}
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

## `GET` /admin-contributors/id/:id

Returns detailed contributor information for administrative management, including aliases, descriptions, relations, and external links.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `view-contributors`

<div class="h3">Path Parameters</div>

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | Contributor identifier |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the contributor is found and the admin has sufficient permissions.

```json
{
  "id": "number",
  "first_name": "string",
  "last_name": "string",
  "slug": "string",
  "image": "string",
  "gender": "string",
  "links": [
    {
      "url": "string",
      "domain": "string"
    }
  ],
  "aliases": [],
  "descriptions": [],
  "relations": []
}
```
Models used
[Contributor Model](../../../model-reference/contributor-model/index.html){.btn .btn-primary}
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
Returned when the contributor does not exist.

```json
{
  "data": "Contributor not found",
  "code": 404
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-contributors/add

Creates a new contributor entry in the system.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `add-contributors`

<div class="h3">Request Body</div>

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| first_name | string | Yes | — | Contributor's first name |
| last_name | string / null | No | `null` | Contributor's last name |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the contributor was successfully created.

```json
{
  "data": "Contributor added successfully",
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
Returned when a contributor with the same name already exists.

```json
{
  "data": "Contributor with this Name exists already.",
  "code": 409
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when contributor creation fails unexpectedly.

```json
{
  "data": "An error occurred while adding the contributor",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-contributors/edit/:id

Updates an existing contributor and its related data such as aliases, descriptions, and relations.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-contributors`

<div class="h3">Path Parameters</div>

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | Contributor identifier |

<div class="h3">Request Body</div>

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| first_name | string | Yes | — | Contributor's first name |
| last_name | string \| null | No | `null` | Contributor's last name |
| gender | string \| null | No | `null` | Contributor gender |
| type | string \| null | No | `null` | Contributor type/role classification |
| links | string[] \| null | No | `null` | List of external links |
| public | boolean | No | `false` | Visibility flag |
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
Returned when the contributor was successfully updated.

```json
{
  "data": "Contributor updated successfully",
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
Returned when the contributor does not exist.

```json
{
  "data": "Contributor not found",
  "code": 404
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 409 Conflict
Returned when another contributor with the same name already exists.

```json
{
  "data": "Contributor with this Name exists already.",
  "code": 409
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when contributor update fails unexpectedly.

```json
{
  "data": "An error occurred while updating the contributor",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `DELETE` /admin-contributors/delete/:id

Deletes a contributor and all associated data, including aliases, descriptions, relations, series associations, and avatar image.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `delete-contributors`

<div class="h3">Path Parameters</div>

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | Contributor identifier |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the contributor was successfully deleted.

```json
{
  "data": "Contributor deleted successfully",
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
Returned when the contributor does not exist.

```json
{
  "data": "Contributor not found",
  "code": 404
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when deletion fails unexpectedly.

```json
{
  "data": "An error occurred while deleting the contributor",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-contributors/update-avatar/:id

Updates the avatar image of a contributor. The image is uploaded, compressed, scaled, and stored, while any previously stored avatar image is removed.

This endpoint is only available when the service is configured as a file service.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-contributors`

<div class="h3">Path Parameters</div>

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | Contributor identifier |

<div class="h3">Body Parameters</div>

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| image | string | Yes | Base64-encoded image including data URI prefix |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the contributor avatar was successfully updated.

```json
{
  "data": "Contributor avatar updated successfully",
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
Returned when the contributor does not exist.

```json
{
  "data": "Contributor not found",
  "code": 404
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when avatar processing or saving fails.

```json
{
  "data": "An error occurred while updating the contributor avatar",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 503 Service Unavailable
Returned when the current service instance does not handle file uploads.

```json
{
  "data": "This service is not handling file uploads.",
  "code": 503
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `DELETE` /admin-contributors/delete-avatar/:id

Deletes the avatar image of a contributor. The stored image and its scaled version are removed, and the contributor’s avatar reference is cleared.

This endpoint is only available when the service is configured as a file service.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-contributors`

<div class="h3">Path Parameters</div>

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | Contributor identifier |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the contributor avatar was successfully deleted.

```json
{
  "data": "Contributor avatar deleted successfully",
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
Returned when the contributor does not exist.

```json
{
  "data": "Contributor not found",
  "code": 404
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when avatar deletion fails or when no avatar exists to delete.

```json
{
  "data": "An error occurred while deleting the contributor avatar",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 503 Service Unavailable
Returned when the current service instance does not handle file uploads.

```json
{
  "data": "This service is not handling file uploads.",
  "code": 503
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::