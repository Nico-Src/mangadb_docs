---
title: "Series-Routes"
description: ""
---

## `GET` /series

Returns a paginated list of series with localized metadata, tags, preview volume data, and aggregated ratings. This endpoint is publicly accessible and supports searching, filtering, and sorting.

<div class="h3">Authentication</div>

This endpoint does **not** require authentication.

<div class="h3">Query Parameters</div>

| Parameter | Type   | Required | Default     | Description                                                     |
|-----------|--------|----------|-------------|-----------------------------------------------------------------|
| client    | number | Yes      | —           | Client identifier                                               |
| lang      | string | No       | `English`  | Language used for aliases and descriptions                      |
| order     | string | No       | `name-asc` | Sorting order                                                   |
| search    | string | No       | `undefined`| Search term applied to series name and aliases                  |
| limit     | number | No       | `20`        | Maximum number of series to return                              |
| offset    | number | No       | `0`         | Number of series to skip (pagination)                           |
| filters   | string | No       | `[]`        | Semicolon-separated list of filters                             |

<div class="h4">Enum Values</div>

**order**
- `name-asc`
- `name-desc`
- `added-asc`
- `added-desc`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the series list is retrieved successfully.

```json
{
    "series": [
        {
            "id": 1,
            "name": "Attack on Titan",
            "type": "Manga",
            "slug": "attack-on-titan-manga",
            "public": 1,
            "relation_diagram": null,
            "client": 1,
            "origin": "Japanese",
            "aliases": [
                "Ataque a los Titanes",
                "Attack on Titan",
                "L'Attaque des Titans",
                "L’attacco dei giganti",
                "Shingeki no Kyojin",
                "進撃の巨人"
            ],
            "alias": "Shingeki no Kyojin",
            "description": "Localized series description",
            "tags": [],
            "volume": {
                "id": 398,
                "cover_path": "uploaded/images/42642.jpg",
                "nsfw": 0,
                "nsfw18": 0,
                "aspect_ratio": "0.696250000"
            },
            "average_rating": 0
        }
    ],
    "max": 1,
    "from": 1,
    "to": 1
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

## `GET` /series/quick-search

Performs a lightweight search for public series by name or alias. This endpoint is optimized for autocomplete and quick lookup use cases.

<div class="h3">Authentication</div>

This endpoint does **not** require authentication.

<div class="h3">Query Parameters</div>

| Parameter | Type   | Required | Default            | Description                                      |
|-----------|--------|----------|--------------------|--------------------------------------------------|
| search    | string | Yes      | —                  | Search term matched against names and aliases    |
| limit     | number | No       | `MAX_SAFE_INT`     | Maximum number of results to return              |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when matching series are found successfully.

```json
[
    {
        "id": "number",
        "name": "string",
        "type": "string",
        "slug": "string",
        "origin": "string",
        "aliases": [
            "string"
        ]
    }
]
```
Models used
[Series Model](../../model-reference/series-model/index.html){.btn .btn-primary}
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

## `GET` /series/slug/:slug

Returns the full, detailed representation of a single series identified by its slug. This endpoint aggregates all related metadata, including aliases, descriptions, contributors, publishers, tags, relations, ratings, and preview volumes.

<div class="h3">Authentication</div>

This endpoint does **not** require authentication.

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description                  |
|-----------|--------|----------|------------------------------|
| slug      | string | Yes      | Unique slug of the series    |

<div class="h3">Query Parameters</div>

| Parameter | Type   | Required | Default | Description                                      |
|-----------|--------|----------|---------|--------------------------------------------------|
| lang      | string | Yes      | —       | Language used for localized data                 |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the series is retrieved successfully.

```json
{
    "id": "number",
    "name": "string",
    "type": "string",
    "slug": "string",
    "origin": "string",
    "aliases": ["string"],
    "contributors": [/* Contributor objects */],
    "publishers": [/* Publisher objects */],
    "publisher_editions": [/* Edition objects */],
    "tags": [/* Tag objects */],
    "descriptions": [/* Description objects */],
    "relations": {
        "<relation_type>": [
            {
                "id": "number",
                "name": "string",
                "alias": "string",
                "description": "string",
                "tags": [],
                "volume": { /* Preview volume */ }
            }
        ]
    },
    "volume": {
        "id": "number",
        "cover_path": "string",
        "nsfw": "number",
        "nsfw18": "number",
        "aspect_ratio": "string"
    },
    "average_rating": "number",
    "rating_count": "number",
    "ratings": [/* Rating objects */],
    "relation_diagram": {
        "nodes": [
            {
                "series_id": "number",
                "title": "string",
                "kind": "string",
                "slug": "string"
            }
        ],
        "edges": [/* Relation edges */]
    }
}
```
Models used
[Series Model](../../model-reference/series-model/index.html){.btn .btn-primary}
[Volume Model](../../model-reference/volume-model/index.html){.btn .btn-primary}
[Publisher Model](../../model-reference/publisher-model/index.html){.btn .btn-primary}
[Publisher Edition Model](../../model-reference/publisher-edition-model/index.html){.btn .btn-primary}
[Contributor Model](../../model-reference/contributor-model/index.html){.btn .btn-primary}
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

::: collapsible 404 Not Found
Returned when the requested series cannot be found.

```json
{
    "data": "Series not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `GET` /series/ratings/:slug

Returns rating information for a specific series, including the average rating, total rating count, and all individual ratings.

<div class="h3">Authentication</div>

This endpoint does **not** require authentication.

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description               |
|-----------|--------|----------|---------------------------|
| slug      | string | Yes      | Unique slug of the series | 

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the series ratings are retrieved successfully.

```json
{
    "id": "number",
    "average_rating": "number",
    "rating_count": "number",
    "ratings": [
        {
            "rating": "number",
            "count": "number"
        }
    ]
}
```
Models used
[Series Model](../../model-reference/series-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when the required slug parameter is missing.

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
Returned when the specified series cannot be found.

```json
{
    "data": "Series not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `GET` /series/editions/:id

Returns all publisher editions associated with a specific series.

<div class="h3">Authentication</div>

This endpoint does **not** require authentication.

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description                    |
|-----------|--------|----------|--------------------------------|
| id        | number | Yes      | Identifier of the series       |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the editions are retrieved successfully.

```json
[
    {
        "id": "number",
        "name": "string",
        "publisher_id": "number",
        "volumes": "number",
        "status": "string",
        "language": "string"
    }
]
```
:::

::: collapsible 400 Bad Request
Returned when the required series identifier is missing.

```json
{
    "data": "Required parameters missing",
    "code": 400
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `GET` /series/volume-editions/:id

Returns all publisher editions that are actually used by volumes within a specific series. This endpoint reflects **edition usage**, not just edition definitions.

<div class="h3">Authentication</div>

This endpoint does **not** require authentication.

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description                    |
|-----------|--------|----------|--------------------------------|
| id        | number | Yes      | Identifier of the series       |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when volume editions are retrieved successfully.

```json
[
    {
        "id": "number",
        "name": "string",
        "language": "string"
    }
]
```
:::

::: collapsible 400 Bad Request
Returned when the required series identifier is missing.

```json
{
    "data": "Required parameters missing",
    "code": 400
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `GET` /series/volumes/:id

Returns a paginated list of volumes for a specific series. Volumes can be filtered by edition or language and optionally include user-specific collection status when authenticated.

<div class="h3">Authentication</div>

This endpoint is **optionally authenticated**.

- If a **refresh token** is provided, user-specific data (collection status) is included.
- If no refresh token is provided, public volume data is returned.

| Cookie Name  | Required | Description                                      |
|--------------|----------|--------------------------------------------------|
| refreshToken | No       | Refresh token used to resolve user context       |

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description                    |
|-----------|--------|----------|--------------------------------|
| id        | number | Yes      | Identifier of the series       |

<div class="h3">Query Parameters</div>

| Parameter | Type    | Required | Default              | Description                                                     |
|-----------|---------|----------|----------------------|-----------------------------------------------------------------|
| edition   | string  | Yes      | —                    | Edition identifier or language                                 |
| special   | boolean | No       | `false`              | Whether to return special volumes only                          |
| limit     | number  | No       | `MAX_SAFE_INT`       | Maximum number of volumes to return                             |
| offset    | number  | No       | `0`                  | Number of volumes to skip (pagination)                          |

<div class="h4">Edition Format</div>

The `edition` parameter supports two formats:

- **Edition ID**
  - Format: `<label>:<id>`
  - Example: `German:5`
- **Language**
  - Example: `German`, `English`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when volumes are retrieved successfully.

```json
{
    "volumes": [
        {
            "id": "number",
            "name": "string",
            "slug": "string",
            "release_date": "string",
            "language": "string",
            "pages": "number",
            "nsfw": "number",
            "nsfw18": "number",
            "cover_path": "string",
            "special": "number",
            "special_name": "string | null",
            "collection_status": "string | null"
        }
    ],
    "max": "number",
    "from": "number",
    "to": "number"
}
```
Models used
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

::: collapsible 404 Not Found
Returned when a refresh token is provided but no user can be resolved.

```json
{
    "data": "User not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `GET` /series/trending

Returns a list of currently trending series for a given client and language. This endpoint is optimized for discovery features such as homepages and highlights.

<div class="h3">Authentication</div>

This endpoint does **not** require authentication.

<div class="h3">Query Parameters</div>

| Parameter | Type   | Required | Default | Description                                      |
|-----------|--------|----------|---------|--------------------------------------------------|
| client    | number | Yes      | —       | Client identifier                                |
| lang      | string | Yes      | —       | Language used for localization and volume lookup |
| limit     | number | No       | `10`    | Maximum number of trending series to return      |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when trending series are retrieved successfully.

```json
[
    {
        "id": "number",
        "name": "string",
        "alias": "string",
        "slug": "string",
        "description": "string",
        "tags": [
            {
                "id": "number",
                "name": "string",
                "type": "string"
            }
        ],
        "volume": {
            "id": "number",
            "cover_path": "string",
            "nsfw": "number",
            "nsfw18": "number",
            "aspect_ratio": "string"
        }
    }
]
```
Models used
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

## `POST` /series/:slug/click

Registers a click interaction for a public series. This endpoint is used to track series popularity on a monthly basis (e.g. for trending calculations).

<div class="h3">Authentication</div>

This endpoint does **not** require authentication.

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description                |
|-----------|--------|----------|----------------------------|
| slug      | string | Yes      | Unique slug of the series  | 

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the click is recorded successfully.

```json
{
    "data": "ok",
    "code": 200
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when the required slug parameter is missing.

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
Returned when the series cannot be found or is not public.

```json
{
    "data": "Series not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while updating the click count.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::