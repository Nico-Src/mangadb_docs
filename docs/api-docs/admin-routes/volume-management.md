---
title: "Volume Management"
description: ""
---

## `GET` /admin-volumes

Returns a paginated list of volume groups for administrative management. Depending on query parameters, this endpoint can include or exclude volumes within each group and supports filtering, searching, trash-bin views, and multiple sort orders.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `view-volumes`

<div class="h3">Query Parameters</div>

| Parameter      | Type    | Required | Default                     | Description |
|---------------|---------|----------|-----------------------------|-------------|
| order         | string  | No       | `series-title-asc`          | Sorting order |
| limit         | number  | No       | `Number.MAX_SAFE_INTEGER`   | Maximum number of results |
| offset        | number  | No       | `0`                         | Pagination offset |
| search        | string  | No       | `undefined`                 | Search term for series or group names |
| client        | number  | Yes      | —                           | Client identifier |
| trashBin      | boolean | No       | `false`                     | Whether to return trashed volume groups |
| withoutVolumes| boolean | No       | `false`                     | If true, only volume groups are returned (no volumes inside) |

<div class="h4">Enum Values</div>

**order**
- `name-asc`
- `name-desc`
- `series-title-asc`
- `series-title-desc`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when volume groups are successfully retrieved.

```json
{
  "groups": [
    {
      "id": "number",
      "name": "string",
      "series_order": "number",
      "series": {
        "id": "number",
        "name": "string",
        "type": "string"
      },
      "volumes": [
        {
          "id": "number",
          "name": "string",
          "slug": "string",
          "language": "string",
          "edition_id": "number | null",
          "edition_name": "string | null",
          "special": "number",
          "special_name": "string | null",
          "nsfw": "number",
          "nsfw18": "number",
          "locked_by": {
            "id": "number",
            "username": "string"
          }
        }
      ]
    }
  ],
  "max": 5,
  "from": 1,
  "to": 20
}
```
Models used
[Volume Model](../../../model-reference/volume-model/index.html){.btn .btn-primary}
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

## `GET` /admin-volumes/names

Returns a paginated list of **volume groups (names only)** for administrative usage. This endpoint is optimized for scenarios where only group metadata is required (e.g. selectors, move dialogs), without loading individual volumes.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `view-volumes`

<div class="h3">Query Parameters</div>

| Parameter | Type   | Required | Default                   | Description |
|----------|--------|----------|---------------------------|-------------|
| order    | string | No       | `series-title-asc`        | Sorting order |
| limit    | number | No       | `Number.MAX_SAFE_INTEGER` | Maximum number of results |
| offset   | number | No       | `0`                       | Pagination offset |
| search   | string | No       | `undefined`               | Search term for volume group or series name |
| client   | number | Yes      | —                         | Client identifier |

<div class="h4">Enum Values</div>

**order**
- `name-asc`
- `name-desc`
- `series-title-asc`
- `series-title-desc`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when volume group names are successfully retrieved.

```json
{
  "groups": [
    {
      "id": "number",
      "name": "string",
      "series_order": "number",
      "series": {
        "id": "number",
        "name": "string",
        "type": "string"
      }
    }
  ],
  "max": 5,
  "from": 1,
  "to": 20
}
```
Models used
[Volume Model](../../../model-reference/volume-model/index.html){.btn .btn-primary}
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

## `GET` /admin-volumes/groups/{id}

Returns all **volume groups** belonging to a specific series, ordered by their series order. This endpoint is used in admin tooling to manage or inspect volume group structure for a series.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `view-volumes`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description |
|----------|--------|----------|-------------|
| id       | number | Yes      | Series ID |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when volume groups for the given series are successfully retrieved.

```json
[
  {
    "id": "number",
    "name": "string",
    "series_order": "number",
    "series": {
        "id": "number",
        "name": "string",
        "type": "string"
    }
  }
]
```
Models used
[Volume Model](../../../model-reference/volume-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when the required series_id parameter is missing.

```json
{
  "data": "Required parameters missing",
  "code": 400
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-volumes/reorder-groups

Reorders **volume groups** by updating their `series_order` based on the provided order array. This endpoint is intended for admin tools that allow drag-and-drop or manual reordering of volume groups.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-volumes`

<div class="h3">Request Body</div>

| Field | Type            | Required | Description |
|------|-----------------|----------|-------------|
| order | number[]       | Yes      | Array of volume group IDs in the desired order (index = new `series_order`) |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the volume groups are successfully reordered.

```json
{
  "data": "Groups reordered",
  "code": 200
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when the order field is missing from the request body or is empty.

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
Returned when an error occurs while updating the order.

```json
{
  "data": "Could not reorder groups",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `GET` /admin-volumes/id/:id

Returns detailed **administrative metadata for a single volume**, including navigation context (previous/next volume), external links, associated media, and helper metadata used by the admin UI.

This endpoint is intended for backend/admin tooling.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `view-volumes`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description |
|----------|--------|----------|-------------|
| id       | number | Yes      | Volume ID |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the volume exists and the admin has sufficient permissions.

```json
{
  "id": "number",
  "name": "string",
  "slug": "string",
  "language": "string",
  "edition_id": "number | null",
  "special": "boolean",
  "series_id": "number",
  "navigation": {
    "next": "string | null",
    "prev": "string | null"
  },
  "links": [
    {
      "id": "number",
      "url": "string",
      "name": "string",
      "src": "string"
    }
  ],
  "media": [
    {
      "id": "number",
      "name": "string"
    }
  ],
  "last_copyright": "string | null"
}
```
Models used
[Volume Model](../../../model-reference/volume-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when the volume ID is missing.

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
Returned when the volume does not exist.

```json
{
  "data": "Volume not found",
  "code": 404
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-volumes/regen-slug/:id

Regenerates the **slug** for a volume based on its current metadata (name, language, edition, special name, and series). This is typically used when volume data has changed or legacy slugs need to be normalized.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-volumes`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description |
|----------|--------|----------|-------------|
| id       | number | Yes      | Volume ID |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the slug was successfully regenerated.

```json
{
  "data": "Slug regenerated",
  "code": 200
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when the volume ID is missing.

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
Returned when the volume does not exist.

```json
{
  "data": "Volume not found",
  "code": 404
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when the slug could not be regenerated due to an unexpected error.

```json
{
  "data": "Could not regenerate slug",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-volumes/edit-volume/:id

Updates an existing volume and its associated metadata. This endpoint allows administrators to modify core volume fields, regenerate the slug when necessary, manage links and media associations, and move the volume between groups or series.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-volumes`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description |
|----------|--------|----------|-------------|
| id       | number | Yes      | Volume ID |

<div class="h3">Request Body</div>

| Field            | Type    | Required | Default | Description |
|------------------|---------|----------|---------|-------------|
| name             | string  | No       | —       | Volume title |
| group            | number  | No       | —       | Target volume group ID |
| language         | string  | No       | —       | Language of the volume |
| release_date     | string  | No       | —       | Release date (ISO format) |
| description      | string  | No       | `null`  | Volume description |
| copyright        | string  | No       | `null`  | Copyright notice |
| edition          | number  | No       | `null`  | Publisher edition ID |
| extras           | object  | No       | `null`  | Additional metadata |
| isbn10           | string  | No       | `null`  | ISBN-10 |
| isbn13           | string  | No       | `null`  | ISBN-13 |
| type             | string  | No       | `null`  | Volume type |
| measures         | string  | No       | `null`  | Physical dimensions |
| pages            | number  | No       | `null`  | Page count |
| rating           | number  | No       | `null`  | Rating value |
| special          | boolean | No       | `false`  | Marks volume as special |
| special_name     | string  | No       | —       | Special edition name |
| nsfw             | boolean | No       | `false`  | NSFW flag |
| nsfw18           | boolean | No       | `false`  | Explicit NSFW flag |
| three_d          | boolean | No       | `false` | 3D volume indicator |
| public          | boolean | No       | `false` | Public visibility flag |
| added_links      | array   | No       | `[]`    | Links to add |
| removed_links    | array   | No       | `[]`    | Links to remove |
| added_media      | array   | No       | `[]`    | Media items to associate |
| removed_media    | array   | No       | `[]`    | Media items to remove |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the volume was updated successfully.

```json
{
  "data": "Volume updated",
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
Returned when the volume does not exist.

```json
{
  "data": "Volume not found",
  "code": 404
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when the volume could not be updated due to an unexpected error.

```json
{
  "data": "Could not update volume",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-volumes/update-order

Updates the ordering of volumes within their respective volume groups. This endpoint is typically used after drag-and-drop reordering in admin tooling.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-volumes`

<div class="h3">Request Body</div>

| Field | Type  | Required | Description |
|------|-------|----------|-------------|
| order | array | Yes      | Array of volume IDs in the desired order. The index of each ID determines its new `group_order`. |

**Example**
```json
{
  "order": [12, 8, 15, 22]
}
```

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the volumes were reordered successfully.

```json
{
  "data": "Volumes reordered",
  "code": 200
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when the order parameter is missing.

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
Returned when the volumes could not be reordered.

```json
{
  "data": "Could not reorder volumes",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-volumes/add-group

Adds a new volume group to a specific series. The new group is appended to the end of the existing group order for that series.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-volumes`

<div class="h3">Request Body</div>

| Field  | Type   | Required | Description |
|-------|--------|----------|-------------|
| name  | string | Yes      | Name of the new volume group |
| series | number | Yes      | ID of the series the group belongs to |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the volume group is created successfully.

```json
{
  "data": "Added volume group",
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
Returned when a volume group with the same name already exists in the specified series.

```json
{
  "data": "Volume group with the same name already exists in this series",
  "code": 409
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when the volume group could not be created due to an unexpected error.

```json
{
  "data": "Could not add volume group",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `DELETE` /admin-volumes/delete-group/:id

Deletes a volume group by its ID. All volumes belonging to this group are moved to the default volume group (`-1`) before deletion to prevent data loss.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `delete-volumes`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description |
|----------|--------|----------|-------------|
| id       | number | Yes      | ID of the volume group to delete |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the volume group is deleted successfully.

```json
{
  "data": "Deleted volume group",
  "code": 200
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when the required parameter is missing.

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
Returned when the volume group could not be deleted due to an unexpected error.

```json
{
  "data": "Could not delete volume group",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-volumes/edit-group/:id

Edits an existing volume group. Allows updating the group name and/or assigning it to a different series. The operation will fail if another group with the same name already exists within the target series.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-volumes`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description |
|----------|--------|----------|-------------|
| id       | number | Yes      | ID of the volume group to edit |

<div class="h3">Request Body</div>

| Field  | Type   | Required | Description |
|-------|--------|----------|-------------|
| name  | string | Yes      | New name of the volume group |
| series| number | Yes      | ID of the series the group belongs to |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the volume group was edited successfully.

```json
{
  "data": "Edited volume group",
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
Returned when another volume group with the same name already exists in the specified series.

```json
{
  "data": "Volume group with the same name already exists in this series",
  "code": 409
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when the volume group could not be edited due to an unexpected error.

```json
{
  "data": "Could not edit volume group",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-volumes/add-volume

Adds a new volume to an existing volume group. The volume slug is generated automatically based on the series, edition (if provided), volume name, and language.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-volumes`

<div class="h3">Request Body</div>

| Field    | Type    | Required | Default | Description |
|---------|---------|----------|---------|-------------|
| name    | string  | Yes      | —       | Name of the volume |
| group   | number  | Yes      | —       | ID of the volume group the volume belongs to |
| edition | number  | No       | `null`  | ID of the publisher edition |
| language| string  | Yes      | —       | Language of the volume |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the volume is added successfully.

```json
{
  "data": "Added volume",
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
Returned when the volume could not be added due to an unexpected error.

```json
{
  "data": "Could not add volume",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `DELETE` /admin-volumes/delete-volume/:id

Deletes a volume and all related data, including links, reports, collection and list associations, media associations, and cover images (front, spine, and back).

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `delete-volumes`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description              |
|----------|--------|----------|--------------------------|
| id       | number | Yes      | Identifier of the volume |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the volume is deleted successfully.

```json
{
  "data": "Deleted volume",
  "code": 200
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when the volume ID is missing.

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
Returned when the volume could not be deleted due to an unexpected error.

```json
{
  "data": "Could not delete volume",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-volumes/update-image/:id/:type

Uploads and updates a volume cover image. This endpoint supports updating **front**, **back**, or **spine** cover images and replaces any previously existing image of the same type.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-volumes`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description |
|----------|--------|----------|-------------|
| id       | number | Yes      | Volume ID   |
| type     | string | Yes      | Cover type (`front`, `back`, `spine`) |

<div class="h4">Enum Values</div>

**type**
- `front`
- `back`
- `spine`

<div class="h3">Request Body</div>

| Field | Type   | Required | Default | Description |
|------|--------|----------|---------|-------------|
| image | string | Yes | — | Base64-encoded image data |
| crop  | object | No  | `undefined` | Crop configuration `{ width, height, left, top }` |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the cover image is updated successfully.

```json
{
  "data": "Updated cover",
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
Returned when the image could not be processed or saved.

```json
{
  "data": "Could not update cover",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
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
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `DELETE` /admin-volumes/delete-image/:id/:type

Deletes a specific cover image (front, back, or spine) associated with a volume. This permanently removes the image files and clears the corresponding database fields.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-volumes`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description |
|----------|--------|----------|-------------|
| id       | number | Yes      | Volume ID   |
| type     | string | Yes      | Cover type to delete |

<div class="h4">Enum Values</div>

**type**
- `front`
- `back`
- `spine`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the cover image is deleted successfully.

```json
{
  "data": "Deleted cover",
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
Returned when the cover image could not be deleted.

```json
{
  "data": "Could not delete cover",
  "code": 500
}
```
Models used
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
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
[Response Model](../../../model-reference/response-model/index.html){.btn .btn-primary}
:::