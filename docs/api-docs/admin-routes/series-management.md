---
title: "Series Management"
description: ""
---

## `GET` /admin-series

Returns a paginated list of series for administrative management. This endpoint is intended for backend/admin tooling and includes additional metadata such as lock information.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `view-series`

<div class="h3">Query Parameters</div>

| Parameter | Type    | Required | Default                 | Description |
|----------|---------|----------|-------------------------|-------------|
| order    | string  | No       | `name-asc`              | Sorting order |
| limit    | number  | No       | `Number.MAX_SAFE_INTEGER`               | Maximum number of results |
| offset   | number  | No       | `0`                     | Pagination offset |
| search   | string  | No       | `undefined`                       | Search term applied to series name and aliases |
| client   | number  | Yes      | —                       | Client identifier |

<div class="h4">Enum Values</div>

**order**
- `name-asc`
- `name-desc`
- `added-asc`
- `added-desc`

<div class="h3">Responses</div>

::: collapsible 200 OK
```json
{
  "series": [
    {
      "id": "number",
      "name": "string",
      "type": "string",
      "slug": "string",
      "public": "number",
      "origin": "string",
      "aliases": ["Alias A", "Alias B"],
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
[Series Model](../../../model-reference/series-model/index.html){.btn .btn-primary}
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

## `GET` /admin-series/id/:id

Returns the full administrative representation of a series, including all editable metadata such as aliases, contributors, publishers, editions, tags, descriptions, relations, and relation diagrams. This endpoint is intended for **admin/editor tooling**.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-series`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description               |
|----------|--------|----------|---------------------------|
| id       | number | Yes      | Identifier of the series  |


<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the series is found and the admin has sufficient permissions.

```json
{
  "id": "number",
  "name": "string",
  "type": "string",
  "slug": "string",
  "public": "number",
  "origin": "string",
  "relation_diagram": {},
  "aliases": [],
  "contributors": [],
  "publishers": [],
  "publisher_editions": [],
  "tags": [],
  "descriptions": [],
  "relations": [],
  "volume": {}
}
```
Models used
[Series Model](../../../model-reference/series-model/index.html){.btn .btn-primary}
[Volume Model](../../../model-reference/volume-model/index.html){.btn .btn-primary}
[Publisher Model](../../../model-reference/publisher-model/index.html){.btn .btn-primary}
[Contributor Model](../../../model-reference/contributor-model/index.html){.btn .btn-primary}
[Tag Model](../../../model-reference/tag-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when the series ID is missing.

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
Returned when the series does not exist.

```json
{
  "data": "Series not found",
  "code": 404
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-series/regen-slug/:id

Regenerates the slug of an existing series based on its current name and type. This endpoint is intended for administrative use when a slug needs to be recalculated or corrected.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-series`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description              |
|----------|--------|----------|--------------------------|
| id       | number | Yes      | Identifier of the series |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the slug is regenerated successfully.

```json
{
  "data": "Slug regenerated successfully",
  "code": 200
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when the series ID is missing.

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
Returned when the series does not exist.

```json
{
  "data": "Series not found",
  "code": 404
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while regenerating the slug.

```json
{
  "data": "Internal server error",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-series/edit/:id

Updates an existing series and all of its related metadata. This endpoint is used by administrative tooling to fully manage a series, including aliases, descriptions, relations, publishers, editions, contributors, tags, visibility, and relation diagrams.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-series`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description              |
|----------|--------|----------|--------------------------|
| id       | number | Yes      | Identifier of the series |

<div class="h3">Request Body</div>

| Field                    | Type    | Required | Default | Description |
|--------------------------|---------|----------|---------|-------------|
| name                     | string  | Yes      | —       | Series name |
| type                     | string  | Yes      | —       | Series type |
| public                   | number  | No       | `0`     | Public visibility flag |
| relation_diagram         | object  | No       | `null`  | Relation diagram JSON |
| added_aliases            | array   | No       | `[]`    | Aliases to add |
| removed_aliases          | array   | No       | `[]`    | Aliases to remove |
| added_descriptions       | array   | No       | `[]`    | Descriptions to add |
| removed_descriptions     | array   | No       | `[]`    | Descriptions to remove |
| modified_descriptions    | array   | No       | `[]`    | Descriptions to update |
| added_relations          | array   | No       | `[]`    | Relations to add |
| removed_relations        | array   | No       | `[]`    | Relations to remove |
| modified_relations       | array   | No       | `[]`    | Relations to update |
| added_publishers         | array   | No       | `[]`    | Publishers to add |
| removed_publishers       | array   | No       | `[]`    | Publishers to remove |
| modified_publishers      | array   | No       | `[]`    | Publishers to update |
| added_editions           | array   | No       | `[]`    | Editions to add |
| removed_editions         | array   | No       | `[]`    | Editions to remove |
| modified_editions        | array   | No       | `[]`    | Editions to update |
| added_contributors       | array   | No       | `[]`    | Contributors to add |
| removed_contributors     | array   | No       | `[]`    | Contributors to remove |
| modified_contributors    | array   | No       | `[]`    | Contributors to update |
| added_tags               | array   | No       | `[]`    | Tags to add |
| removed_tags             | array   | No       | `[]`    | Tags to remove |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the series and all related entities are updated successfully.

```json
{
  "data": "Series edited successfully",
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
Returned when the series does not exist.

```json
{
  "data": "Series not found",
  "code": 404
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while editing the series.

```json
{
  "data": "Internal server error",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-series/move/:id

Moves an existing series to a different client. This endpoint is intended for administrative tooling when a series needs to be reassigned between clients.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-series`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description              |
|----------|--------|----------|--------------------------|
| id       | number | Yes      | Identifier of the series |

<div class="h3">Request Body</div>

| Field  | Type   | Required | Description                 |
|--------|--------|----------|-----------------------------|
| client | number | Yes      | Target client identifier    |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the series is moved to the new client successfully.

```json
{
  "data": "Series moved successfully",
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
Returned when the series does not exist.

```json
{
  "data": "Series not found",
  "code": 404
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while moving the series.

```json
{
  "data": "Internal server error",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-series/add

Creates a new series for a specific client. This endpoint is intended for administrative use and initializes the series with a generated slug and non-public visibility.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `add-series`

<div class="h3">Request Body</div>

| Field  | Type   | Required | Description                  |
|-------|--------|----------|------------------------------|
| name  | string | Yes      | Name of the series           |
| type  | string | Yes      | Type of the series           |
| client| number | Yes      | Client identifier            |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the series is created successfully.

```json
{
  "data": "Series added successfully",
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
Returned when a series with the same name and type already exists for the client.

```json
{
  "data": "Series with this Name and Type exists already.",
  "code": 409
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while creating the series.

```json
{
  "data": "Internal server error",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `DELETE` /admin-series/delete/:id

Deletes a series and all associated metadata from the system. This operation is destructive and intended strictly for administrative use. All related entities (aliases, descriptions, contributors, publishers, relations, reports, and click statistics) are removed, and volume groups are reassigned to the unassigned series.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `delete-series`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description              |
|----------|--------|----------|--------------------------|
| id       | number | Yes      | Identifier of the series |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the series and all related data are deleted successfully.

```json
{
  "data": "Series deleted successfully",
  "code": 200
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when the series ID is missing.

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
Returned when the series does not exist.

```json
{
  "data": "Series not found",
  "code": 404
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while deleting the series.

```json
{
  "data": "Internal server error",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::