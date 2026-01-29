---
title: "Tag-Routes"
description: ""
---

## `GET` /tags

Returns all tags available for a specific client. This endpoint is publicly accessible and does not require authentication.

<div class="h3">Authentication</div>

This endpoint does **not** require authentication.

<div class="h3">Query Parameters</div>

| Parameter | Type   | Required | Default | Description               |
|-----------|--------|----------|---------|---------------------------|
| client    | number | Yes      | —       | Client identifier         |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the tags are retrieved successfully.

```json
[
    {
        "id": "number",
        "name": "string",
        "type": "string"
    }
]
```
Models used
[Tag Model](../../model-reference/tag-model/index.html){.btn .btn-primary}
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

## `GET` /tags/id/:id

Returns detailed information for a specific tag, including how many series are associated with it.

<div class="h3">Authentication</div>

This endpoint does **not** require authentication.

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description            |
|-----------|--------|----------|------------------------|
| id        | number | Yes      | Identifier of the tag  |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the tag data is retrieved successfully.

```json
{
    "id": "number",
    "name": "string",
    "type": "string",
    "series_count": "number"
}
```
Models used
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
Returned when the specified tag cannot be found.

```json
{
    "data": "Tag not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::