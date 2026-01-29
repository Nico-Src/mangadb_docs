---
title: "Report-Routes"
description: ""
---

## `GET` /reports

Returns a paginated list of user-submitted reports for moderation and review. Each report is enriched with related user and content metadata.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `view-report`

<div class="h3">Query Parameters</div>

| Parameter | Type   | Required | Default          | Description                                      |
|-----------|--------|----------|------------------|--------------------------------------------------|
| order     | string | No       | `added-desc`    | Sorting order of reports                         |
| limit     | number | No       | `MAX_SAFE_INT`  | Maximum number of reports to return              |
| offset    | number | No       | `0`             | Number of reports to skip (pagination)           |
| search    | string | No       | `undefined`     | Search term applied to report content            |

<div class="h4">Enum Values</div>

**order**
- `added-asc` – Oldest reports first
- `added-desc` – Newest reports first (default) 

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when reports are retrieved successfully.

```json
{
    "reports": [
        {
            "id": "number",
            "report_type": "series | volume",
            "item_id": "number",
            "reason": "string",
            "timestamp": "string",
            "series": {
                "name": "string",
                "slug": "string"
            },
            "volume": {
                "name": "string",
                "slug": "string"
            },
            "user": {
                "id": "number",
                "username": "string",
                "slug": "string",
                "profile_image": "string | null"
            },
            "reviewed_by": {
                "id": "number",
                "username": "string",
                "slug": "string",
                "profile_image": "string | null"
            } | null
        }
    ],
    "total": "number"
}
```
Models used
[Report Model](../../model-reference/report-model/index.html){.btn .btn-primary}
[User Model](../../model-reference/user-model/index.html){.btn .btn-primary}
[Series Model](../../model-reference/series-model/index.html){.btn .btn-primary}
[Volume Model](../../model-reference/volume-model/index.html){.btn .btn-primary}
:::

## `POST` /reports/add/:type

Creates a new report for a series or volume. This endpoint is used by authenticated users to submit moderation reports.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `create-report`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description                                  |
|-----------|--------|----------|----------------------------------------------|
| type      | string | Yes      | Target type of the report                    |

<div class="h4">Enum Values</div>

**type**
- `series`
- `volume`

<div class="h3">Request Body</div>

| Field       | Type   | Required | Default | Description                                   |
|-------------|--------|----------|---------|-----------------------------------------------|
| type        | string | Yes      | —       | Report category/type                          |
| description | string | Yes      | —       | Detailed description of the issue             |
| item_id     | number | Yes      | —       | Identifier of the reported series or volume   |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the report is created successfully.

```json
{
    "data": "Report added successfully",
    "code": 200
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when required parameters are missing or the report type is invalid.

```json
{
    "data": "Required parameters missing | Invalid report type",
    "code": 400
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 404 Not Found
Returned when the authenticated user cannot be found.

```json
{
    "data": "User not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while creating the report.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `GET` /reports/:type/:id

Returns all reports associated with a specific series or volume. This endpoint is primarily used for moderation and review purposes.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `view-report`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description                              |
|-----------|--------|----------|------------------------------------------|
| type      | string | Yes      | Target type of the reports               |
| id        | number | Yes      | Identifier of the reported item          |

<div class="h4">Enum Values</div>

**type**
- `series`
- `volume`  

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the reports are retrieved successfully.

```json
[
    {
        "id": "number",
        "type": "string",
        "description": "string",
        "status": "string",
        "timestamp": "string",
        "user": {
            "id": "number",
            "slug": "string",
            "username": "string"
        },
        "reviewer": {
            "id": "number",
            "slug": "string",
            "username": "string"
        } | null
    }
]
```
Models used
[Report Model](../../model-reference/report-model/index.html){.btn .btn-primary}
[User Model](../../model-reference/user-model/index.html){.btn .btn-primary}
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

## `POST` /reports/update/:id/:type

Updates the status and moderation note of an existing report. This endpoint is used by moderators to review and resolve reports.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-report`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description                         |
|-----------|--------|----------|-------------------------------------|
| id        | number | Yes      | Identifier of the report            |
| type      | string | Yes      | Target report type                  |

<div class="h4">Enum Values</div>

**type**
- `series`
- `volume`

<div class="h3">Request Body</div>

| Field  | Type   | Required | Default | Description                                   |
|--------|--------|----------|---------|-----------------------------------------------|
| status | string | Yes      | —       | New moderation status of the report           |
| note   | string | No       | `null`  | Optional moderator note                       |

<div class="h4">Enum Values</div>

**status**
- `open`
- `under-review`
- `resolved`
- `refused`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the report is updated successfully.

```json
{
    "data": "Report updated successfully",
    "code": 200
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when required parameters are missing or invalid enum values are provided.

```json
{
    "data": "Required parameters missing | Invalid report type | Invalid status value",
    "code": 400
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 404 Not Found
Returned when the authenticated user cannot be found.

```json
{
    "data": "User not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while updating the report.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `DELETE` /reports/delete/:id/:type

Deletes an existing report. This endpoint is intended for moderators and administrators to permanently remove reports.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `delete-report`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description                         |
|-----------|--------|----------|-------------------------------------|
| id        | number | Yes      | Identifier of the report            |
| type      | string | Yes      | Target report type                  |

<div class="h4">Enum Values</div>

**type**
- `series`
- `volume`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the report is deleted successfully.

```json
{
    "data": "Report deleted successfully",
    "code": 200
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when required parameters are missing or the report type is invalid.

```json
{
    "data": "Required parameters missing | Invalid report type",
    "code": 400
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while deleting the report.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::