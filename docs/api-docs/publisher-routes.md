---
title: "Publisher-Routes"
description: ""
---

## `GET` /publishers

Returns a list of publishers for a given client. The result can be filtered, searched, sorted, and paginated. Each publisher includes a count of how many series are associated with it.

<div class="h3">Authentication</div>

This endpoint does **not** require authentication.

<div class="h3">Query Parameters</div>

| Parameter | Type    | Required | Default                   | Description |
|----------|---------|----------|---------------------------|-------------|
| lang     | string  | No       | `English`                 | Language context (currently not used for filtering but kept for consistency) |
| order    | string  | No       | `undefined`               | Sorting order |
| search   | string  | No       | `undefined`               | Search term applied to publisher name |
| limit    | number  | No       | `Number.MAX_SAFE_INTEGER` | Maximum number of results |
| offset   | number  | No       | `0`                       | Pagination offset |
| client   | number  | Yes      | —                         | Client identifier |

<div class="h4">Enum Values</div>

**order**
- `name-asc`
- `name-desc`
- `added-asc`
- `added-desc`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the publishers are fetched successfully.

```json
[
  {
    "id": "number",
    "name": "string",
    "short-name": "string",
    "slug": "string",
    "country": "string",
    "website": "string",
    "headquarter": "string",
    "series_count": "number",
    "founding_date": "string",
    "image": "string",
    "image_source": "string",
    "client": "number"
  }
]
```
Models used
[Publisher Model](../../model-reference/publisher-model/index.html){.btn .btn-primary}
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

## `GET` /publisher/slug/:slug

Returns detailed information about a publisher identified by its slug. The response includes metadata such as aliases, descriptions, relations to other publishers, and derived domain information from the publisher website.

<div class="h3">Authentication</div>

This endpoint does **not** require authentication.

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description |
|----------|--------|----------|-------------|
| slug     | string | Yes      | Unique publisher slug |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the publisher is found.

```json
{
  "id": "number",
  "name": "string",
  "slug": "string",
  "image": "string",
  "website": "string",
  "domain": "string",
  "country": "string",
  "descriptions": [
    {
      "id": "number",
      "description": "string",
      "language": "string",
      "source": "string"
    }
  ],
  "aliases": [
    {
      "id": "number",
      "title": "string",
      "language": "string"
    }
  ],
  "relations": [
    {
      "id": "number",
      "relation_id": "number",
      "type": "string",
      "name": "string",
      "image": "string",
      "slug": "string"
    }
  ]
}
```
Models used
[Publisher Model](../../model-reference/publisher-model/index.html){.btn .btn-primary}
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
Returned when no publisher exists for the given slug.

```json
{
  "data": "Publisher not found",
  "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `GET` /publisher/random

Returns a random publisher slug for the given client. This endpoint is typically used for discovery features (e.g. “random publisher” navigation).

<div class="h3">Authentication</div>

This endpoint does **not** require authentication.

<div class="h3">Query Parameters</div>

| Parameter | Type   | Required | Default | Description |
|----------|--------|----------|---------|-------------|
| client   | number | Yes      | —       | Client identifier |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when a random publisher is successfully selected.

```json
"publisher-slug"
```
The response is a string representing the publisher slug.
:::

::: collapsible 400 Bad Request
Returned when the required client parameter is missing.

```json
{
  "data": "Required parameters missing",
  "code": 400
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `GET` /publisher/publications/:id

Returns a paginated list of series published by a specific publisher, including localized metadata, tags, and a preview volume.

<div class="h3">Authentication</div>

This endpoint does **not** require authentication.

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | number | Yes      | Publisher identifier |

<div class="h3">Query Parameters</div>

| Parameter | Type   | Required | Default | Description |
|-----------|--------|----------|---------|-------------|
| limit     | number | No       | `Number.MAX_SAFE_INTEGER` | Maximum number of results |
| offset    | number | No       | `0` | Pagination offset |
| search    | string | No       | `undefined` | Search term applied to series titles |
| order     | string | No       | `name-asc` | Sorting order |
| client    | number | Yes      | — | Client identifier |
| user_lang | string | No       | `English` | Language used for localized metadata |

<div class="h4">Enum Values</div>

**order**
- `name-asc`
- `name-desc`
- `added-asc`
- `added-desc`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when publications are successfully retrieved.

```json
{
  "publications": [
    {
      "id": "number",
      "name": "string",
      "slug": "string",
      "type": "string",
      "origin": "string",
      "alias": "string",
      "aliases": [],
      "description": "string",
      "tags": [],
      "volume": {
        "id": "number",
        "cover_path": "string",
        "aspect_ratio": "number",
        "nsfw": "number",
        "nsfw18": "number"
      }
    }
  ],
  "max": 5,
  "from": 1,
  "to": 20
}
```
Models used
[Series Model](../../model-reference/series-model/index.html){.btn .btn-primary}
[Volume Model](../../model-reference/volume-model/index.html){.btn .btn-primary}
[Tag Model](../../model-reference/tag-model/index.html){.btn .btn-primary}
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