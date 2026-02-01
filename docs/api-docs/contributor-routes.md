---
title: "Contributor-Routes"
description: ""
---

## `GET` /contributors

Returns a paginated list of contributors (authors, artists, etc.) including how many series they are associated with. If available, one random related series is also returned per contributor for preview purposes.

<div class="h3">Query Parameters</div>

| Parameter | Type   | Required | Default | Description |
|-----------|--------|----------|---------|-------------|
| lang      | string | No | `English` | Language preference (currently unused in sorting but reserved for future behavior) |
| order     | string | No | `name-asc` | Sorting order |
| search    | string | No | `undefined` | Search term applied to contributor names |
| limit     | number | No | `Number.MAX_SAFE_INTEGER` | Maximum number of results |
| offset    | number | No | `0` | Pagination offset |
| client    | number | Yes | — | Client identifier |

<div class="h4">Enum Values</div>

**order**
- `name-asc`
- `name-desc`
- `added-asc`
- `added-desc`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when contributors are successfully fetched.

```json
{
  "contributors": [
    {
      "id": "number",
      "first_name": "string",
      "last_name": "string",
      "image": "string|null",
      "gender": "string|null",
      "series_count": 5,
      "random_series": {
        "name": "string",
        "slug": "string"
      }
    }
  ],
  "max": 5,
  "from": 1,
  "to": 20
}
```
Models used
[Contributor Model](../../model-reference/contributor-model/index.html){.btn .btn-primary}
[Series Model](../../model-reference/series-model/index.html){.btn .btn-primary}
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

## `GET` /contributor/slug/:slug

Returns detailed public information about a contributor, including aliases, descriptions, relations, and normalized external links.

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| slug | string | Yes | Contributor slug identifier |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the contributor is successfully found.

```json
{
  "id": "number",
  "first_name": "string",
  "last_name": "string",
  "slug": "string",
  "image": "string|null",
  "gender": "string|null",
  "links": [
    {
      "url": "string",
      "domain": "string"
    }
  ],
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
      "name": "string"
    }
  ],
  "relations": [
    {
      "id": "number",
      "relation_id": "number",
      "relation_type": "string",
      "name": "string",
      "first_name": "string",
      "last_name": "string",
      "slug": "string"
    }
  ]
}
```
Models used
[Contributor Model](../../model-reference/contributor-model/index.html){.btn .btn-primary}
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
Returned when no contributor matches the provided slug.

```json
{
  "data": "Contributor not found",
  "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `GET` /contributor/random

Returns the slug of a random contributor for the specified client.

<div class="h3">Query Parameters</div>

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| client | number | Yes | — | Client identifier used to filter contributors |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when a random contributor is successfully selected.

```json
"contributor-slug"
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
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

::: collapsible 404 Not Found
Returned when no contributors exist for the specified client.

```json
{
  "data": "No contributors found",
  "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `GET` /contributor/works/:id

Returns a paginated list of works (series) associated with a contributor.

Each work is enriched with origin, localized description, tags, alias, and a representative volume.

<div class="h3">Path Parameters</div>

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | Contributor identifier |

<div class="h3">Query Parameters</div>

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| limit | number | No | `Number.MAX_SAFE_INTEGER` | Maximum number of works to return |
| offset | number | No | `0` | Pagination offset |
| search | string | No | `undefined` | Filters works by name |
| order | string | No | `name-asc` | Sorting order |
| user_lang | string | No | `English` | Language used for localized alias and description |
| client | number | Yes | — | Client identifier |

<div class="h4">Enum Values</div>

**order**
- `name-asc`
- `name-desc`
- `added-asc`
- `added-desc`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when works are successfully retrieved.

```json
{
  "works": [
    {
      "id": "number",
      "name": "string",
      "slug": "string",
      "type": "string",
      "origin": "string",
      "alias": "string",
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