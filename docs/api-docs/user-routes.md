---
title: "User Routes"
description: ""
---

## `POST` /users/:id/save-settings

Creates or updates user-specific settings for the specified user. If a settings record already exists, it is updated; otherwise, a new record is created.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| id        | string | Yes      | Identifier of the user   |

<div class="h3">Request Body</div>

The request body contains the user settings to be saved. The structure depends on the supported settings model.

```json
{
	"theme-accent-color":"#6394c6",
	"prefered-content-language":"interface",
	"theme":"light",
	"nsfw-mode":"settings.nsfw.show-nsfw-18",
	"view-mode":"column",
	"show-drag-indicator":false
}
```

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the settings are saved successfully.

```json
{
    "data": "Settings saved successfully",
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
Returned when the user associated with the refresh token cannot be found.

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
Returned when an unexpected error occurs while saving the settings.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## --- Reading History --- {.category-title data-category="Reading History"}

## `GET` /user/reading-history

Returns the authenticated user’s reading history. The result can be filtered, searched, paginated, and ordered using query parameters, and is enriched with localized metadata where available.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Query Parameters</div>

| Parameter   | Type   | Required | Description                                                                 |
|-------------|--------|----------|-----------------------------------------------------------------------------|
| order       | string | No       | Sort order for the results (see supported values below)                     |
| limit       | number | No       | Maximum number of results to return                                         |
| offset      | number | No       | Number of results to skip (for pagination)                                  |
| search      | string | No       | Search term used to filter results                                          |
| user_lang   | string | No       | Preferred language used for localized titles and descriptions               |
| client      | string | No       | Client identifier used for client-specific filtering or behavior            |

<div class="h3">Supported Ordering Values</div>

The `order` parameter supports the following values:

- `name-asc`, `name-desc`
- `update-asc`, `update-desc`
- `priority-asc`, `priority-desc`
- `score-asc`, `score-desc`
- `start-date-asc`, `start-date-desc`
- `end-date-asc`, `end-date-desc`

If no order is provided, the default ordering behavior is applied (```update-desc```).

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the reading history is retrieved successfully.

```json
{
    "series": [/* Array of series */],
    "max": "number",
    "from": "number",
    "to": "number"
}
```
Models used
[Series Model](../../model-reference/series-model/index.html){.btn .btn-primary}
:::

::: collapsible 404 Not Found
Returned when the user associated with the refresh token cannot be found.

```json
{
    "data": "User not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `GET` /user/reading-status/id/:id

Returns the authenticated user’s reading status for a specific series.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| id        | string | Yes      | Identifier of the series |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the reading status is retrieved successfully.

```json
{
    /* Reading status data for the series */
}
```
Models used
[Series Model](../../model-reference/series-model/index.html){.btn .btn-primary}
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

::: collapsible 404 Not Found
Returned when the user associated with the refresh token cannot be found.

```json
{
    "data": "User not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /user/reading-status/add/:id

Adds a new reading status entry for the authenticated user and the specified series. This endpoint is used when a reading status does not yet exist for the series.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| id        | string | Yes      | Identifier of the series |

<div class="h3">Request Body</div>

| Field         | Type    | Required | Description                                      |
|---------------|---------|----------|--------------------------------------------------|
| visibility    | string  | Yes      | Visibility settings for the reading status       |
| progressType  | string  | Yes      | Type used to track reading progress              |
| progress      | number  | Yes      | Current reading progress                         |
| status        | string  | Yes      | Current reading status                           |
| reread        | number  | No       | Indicates how often the series was reread        |
| score         | number  | No       | User-assigned score                              |
| priority      | string  | Yes      | Reading priority                                 |
| start         | string  | No       | Start date                                       |
| end           | string  | No       | End date                                         |
| notes         | string  | No       | User notes                                       |
| client        | string  | Yes      | Client identifier                                |

<div class="h4">Enum Values</div>

**visibility**
- `private` (default)
- `public`

**status**
- `started` (default)
- `completed`
- `paused`
- `dropped`

**progress_type**
- `chapters` (default)
- `volumes`

**priority**
- `low`
- `mid`
- `high`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the reading status is added successfully.

```json
{
    "data": "Reading status added successfully",
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
Returned when the user cannot be found.

```json
{
    "data": "User not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 409 Conflict
Returned when a reading status already exists for the specified series.

```json
{
    "data": "Reading status already exists for this series",
    "code": 409
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while adding the reading status.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /user/reading-status/update/:id

Updates an existing reading status entry for the authenticated user and the specified series. This endpoint is used when a reading status already exists.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Path Pparameters</div>

| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| id        | string | Yes      | Identifier of the series |

<div class="h3">Request Body</div>

| Field         | Type    | Required | Description                                      |
|---------------|---------|----------|--------------------------------------------------|
| visibility    | string  | Yes      | Visibility settings for the reading status       |
| progressType  | string  | Yes      | Type used to track reading progress              |
| progress      | number  | Yes      | Current reading progress                         |
| status        | string  | Yes      | Current reading status                           |
| reread        | number  | No       | Indicates how often the series was reread        |
| score         | number  | No       | User-assigned score                              |
| priority      | string  | Yes      | Reading priority                                 |
| start         | string  | No       | Start date                                       |
| end           | string  | No       | End date                                         |
| notes         | string  | No       | User notes                                       |
| client        | string  | Yes      | Client identifier                                |

<div class="h4">Enum Values</div>

**visibility**
- `private` (default)
- `public`

**status**
- `started` (default)
- `completed`
- `paused`
- `dropped`

**progress_type**
- `chapters` (default)
- `volumes`

**priority**
- `low`
- `mid`
- `high`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the reading status is updated successfully.

```json
{
    "data": "Reading status updated successfully",
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
Returned when the user cannot be found or no reading status exists for the specified series.

```json
{
    "data": "Reading status does not exist for this series",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while updating the reading status.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `DELETE` /user/reading-status/delete/:id

Deletes an existing reading status entry for the authenticated user and the specified series.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| id        | string | Yes      | Identifier of the series |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the reading status is deleted successfully.

```json
{
    "data": "Reading status deleted successfully",
    "code": 200
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
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

::: collapsible 404 Not Found
Returned when the user cannot be found or no reading status exists for the specified series.

```json
{
    "data": "Reading status does not exist for this series",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while deleting the reading status.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## --- Rating --- {.category-title data-category="Rating"}

## `GET` /user/series-rating/:id

Returns the authenticated user’s rating for a specific series.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| id        | string | Yes      | Identifier of the series |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the rating is retrieved successfully.

```json
{
    /* Rating data for the series */
}
```
Models used
[Series Model](../../model-reference/series-model/index.html){.btn .btn-primary}
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

::: collapsible 404 Not Found
Returned when the user associated with the refresh token cannot be found.

```json
{
    "data": "User not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /user/series-rating/add/:id

Adds a new rating for a specific series on behalf of the authenticated user. A rating can only be created if one does not already exist for the series.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `rate-series`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| id        | string | Yes      | Identifier of the series |

<div class="h3">Request Body</div>

| Field  | Type   | Required | Description          |
|--------|--------|----------|----------------------|
| rating | number | Yes      | Rating value for the series |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the rating is added successfully.

```json
{
    "data": "Rating added successfully",
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
Returned when the user cannot be found.

```json
{
    "data": "User not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 409 Conflict
Returned when a rating already exists for the specified series.

```json
{
    "data": "Rating already exists for this series",
    "code": 409
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while adding the rating.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /user/series-rating/update/:id

Updates an existing rating for a specific series on behalf of the authenticated user. This endpoint is used when a rating already exists.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `rate-series`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| id        | string | Yes      | Identifier of the series |

<div class="h3">Request Body</div>

| Field  | Type   | Required | Description          |
|--------|--------|----------|----------------------|
| rating | number | Yes      | Updated rating value |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the rating is updated successfully.

```json
{
    "data": "Rating updated successfully",
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
Returned when no existing rating is found for the specified series.

```json
{
    "data": "Rating does not exist for this series",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while updating the rating.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `DELETE` /user/series-rating/delete/:id

Deletes an existing rating for a specific series on behalf of the authenticated user.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `rate-series`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| id        | string | Yes      | Identifier of the series |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the rating is deleted successfully.

```json
{
    "data": "Rating deleted successfully",
    "code": 200
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
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

::: collapsible 404 Not Found
Returned when no rating exists for the specified series.

```json
{
    "data": "Rating does not exist for this series",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while deleting the rating.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## --- Collection --- {.category-title data-category="Collection"}

## `GET` /user/collection

Returns the authenticated user’s collection. The result can be filtered, searched, paginated, and ordered, and includes localized series titles where available.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Query Parameters</div>

| Parameter   | Type    | Required | Description                                                   |
|-------------|---------|----------|---------------------------------------------------------------|
| order       | string  | No       | Sort order for the collection (see supported values below)   |
| limit       | number  | No       | Maximum number of items to return                            |
| offset      | number  | No       | Number of items to skip (for pagination)                     |
| search      | string  | No       | Search term used to filter the collection                    |
| user_lang   | string  | No       | Preferred language for translated series titles              |
| client      | number  | Yes      | Client identifier                                            |

<div class="h4">Supported Ordering Values</div>

- `name-asc`
- `name-desc`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the collection is retrieved successfully.

```json
{
    "volumes": [/* Array of volumes */],
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

## `GET` /user/collection/stats/general

Returns general statistics about the authenticated user’s collection, including item counts, total spending, and purchase date range.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Query Parameters</div>

| Parameter | Type   | Required | Description        |
|-----------|--------|----------|--------------------|
| client    | number | Yes      | Client identifier |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the collection statistics are retrieved successfully.

```json
{
    "total_items": "number",
    "total_spent": "number",
    "first_buy": "string | null",
    "last_buy": "string | null"
}
```
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

## `POST` /user/collection/update/:id

Updates an existing item in the authenticated user’s collection, including its price and purchase date.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description                     |
|-----------|--------|----------|---------------------------------|
| id        | string | Yes      | Identifier of the collection item |

<div class="h3">Request Body</div>

| Field | Type   | Required | Description            |
|-------|--------|----------|------------------------|
| price | number | Yes      | Updated purchase price |
| date  | string | Yes      | Updated purchase date  |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the collection item is updated successfully.

```json
{
    "data": "Collection item updated successfully",
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
Returned when the collection item cannot be found.

```json
{
    "data": "Collection item not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while updating the collection item.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## --- File Operations --- {.category-title data-category="File Operations"}

## `POST` /user/update-image/:id

Updates the profile image of a user. A user may update their own profile image, while administrators may update profile images for other users using the `/admin` route. Existing locally stored profile images are removed before saving the new one.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| id        | string | Yes      | Identifier of the user   |

<div class="h3">Request Body</div>

| Field | Type   | Required | Description                                  |
|-------|--------|----------|----------------------------------------------|
| image | string | Yes      | Base64-encoded image data                    |

The image must be provided as a Base64 string (data URL format supported).

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the profile image is updated successfully.

```json
{
    "data": "Profile image updated successfully",
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

::: collapsible 403 Forbidden
Returned when the authenticated user is not allowed to update the specified user’s profile image.

```json
{
    "data": "Forbidden",
    "code": 403
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
Returned when an unexpected error occurs while updating the profile image.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 503 Service Unavailable
Returned when the current service is not configured to handle file operations (When API is called with this route).

```json
{
    "data": "This service is not handling file uploads.",
    "code": 503
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `DELETE` /user/delete-image/:id

Deletes the profile image of a user. A user may delete their own profile image, while administrators may delete profile images for other users.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description            |
|-----------|--------|----------|------------------------|
| id        | string | Yes      | Identifier of the user |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the profile image is deleted successfully.

```json
{
    "data": "Profile image deleted successfully",
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

::: collapsible 403 Forbidden
Returned when the authenticated user is not allowed to delete the specified user’s profile image.

```json
{
    "data": "Forbidden",
    "code": 403
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
Returned when the user has no profile image or an unexpected error occurs.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 503 Service Unavailable
Returned when the current service is not configured to handle file operations (When API is called with this route).

```json
{
    "data": "This service is not handling file uploads.",
    "code": 503
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::