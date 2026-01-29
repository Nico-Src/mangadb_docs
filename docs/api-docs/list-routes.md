---
title: "List-Routes"
description: ""
---

## `GET` /lists

Returns all lists belonging to the authenticated user for a specific client. Each list includes item counts and a preview item based on the most recently added entry.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Query Parameters</div>

| Parameter | Type   | Required | Default     | Description                                             |
|-----------|--------|----------|-------------|---------------------------------------------------------|
| client    | number | Yes      | —           | Client identifier                                       |
| user_lang | string | No       | `undefined` | Preferred language for localized preview items          |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the lists are retrieved successfully.

```json
[
    {
        "id": "number",
        "name": "string",
        "slug": "string",
        "type": "string",
        "last_change": "string",
        "last_added": "number",
        "item_count": "number",
        "preview_item": {
            /* Volume preview data */
        } | null
    }
]
```
Models used
[List Model](../../model-reference/list-model/index.html){.btn .btn-primary}
[Volume Model](../../model-reference/volume-model/index.html){.btn .btn-primary}
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

## `GET` /lists/slug/:slug

Returns a specific list belonging to the authenticated user, identified by its slug.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| slug      | string | Yes      | Slug identifier of the list |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the list is retrieved successfully.

```json
{
    "id": "number",
    "name": "string",
    "user_id": "number",
    "last_change": "string",
    "slug": "string",
    "type": "string",
    "client": "number"
}
```
Models used
[List Model](../../model-reference/list-model/index.html){.btn .btn-primary}
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
Returned when the authenticated user or the requested list cannot be found.

```json
{
    "data": "List not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `GET` /lists/items/:id

Returns the items of a specific list belonging to the authenticated user. Items are resolved either as volumes or series depending on the list type and are localized based on the requested language.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| id        | number | Yes      | Identifier of the list   |

<div class="h3">Query Parameters</div>

| Parameter | Type   | Required | Default     | Description                                              |
|-----------|--------|----------|-------------|----------------------------------------------------------|
| limit     | number | No       | `Number.MAX_SAFE_INTEGER`    | Maximum number of items to return                        |
| offset    | number | No       | `0`         | Number of items to skip (for pagination)                 |
| user_lang | string | Yes      | —           | Preferred language for localized content                 |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when list items are retrieved successfully.

```json
{
    "items": [
        {
            /* Volume or Series object depending on list type */
        }
    ],
    "max": "number",
    "from": "number",
    "to": "number"
}
```
Models used
[Volume Model](../../model-reference/volume-model/index.html){.btn .btn-primary}
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

::: collapsible 404 Not Found
Returned when the authenticated user or the requested list cannot be found.

```json
{
    "data": "List not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /lists/reorder/:id

Updates the ordering of items within a user-owned list.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description            |
|-----------|--------|----------|------------------------|
| id        | string | Yes      | Identifier of the list |

<div class="h3">Request Body</div>

| Field | Type   | Required | Default | Description                                                |
|-------|--------|----------|---------|------------------------------------------------------------|
| order | string | Yes      | —       | Comma-separated list of `itemId:order` pairs               |

**Format example:**  
`"12:1,5:2,9:3"`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the list is reordered successfully.

```json
{
    "data": "List reordered successfully",
    "code": 200
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when required parameters are missing or the order format is invalid.

```json
{
    "data": "Required parameters missing | Invalid order format",
    "code": 400
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 404 Not Found
Returned when the list does not exist or when one of the specified items is not part of the list.

```json
{
    "data": "List not found | Item with ID <item_id> not found in list <list_id>",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while reordering the list.

```json
{
    "data": "Error reordering list",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /lists/add

Creates a new list for the authenticated user.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Request Body</div>

| Field  | Type   | Required | Default | Description                         |
|--------|--------|----------|---------|-------------------------------------|
| name   | string | Yes      | —       | Name of the new list                |
| type   | string | Yes      | —       | Type of the list                    |
| client | number | Yes      | —       | Client identifier                   |

<div class="h4">Enum Values</div>

**type**
- `volume`
- `series`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the list is created successfully.

```json
{
    "data": "List added successfully",
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

::: collapsible 409 Conflict
Returned when a list with the same name already exists for the user and client.

```json
{
    "data": "List with this name already exists",
    "code": 409
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while creating the list.

```json
{
    "data": "Error adding list",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `DELETE` /lists/items/delete

Removes a specific item from a user-owned list.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Request Body</div>

| Field    | Type   | Required | Default | Description                     |
|----------|--------|----------|---------|---------------------------------|
| list_id  | number | Yes      | —       | Identifier of the list          |
| item_id  | number | Yes      | —       | Identifier of the item to remove| 

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the item is removed from the list successfully.

```json
{
    "data": "Item removed from list successfully",
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
Returned when the list does not exist or the item is not part of the list.

```json
{
    "data": "List not found | Item not found in list",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while removing the item from the list.

```json
{
    "data": "Error removing item from list",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `DELETE` /lists/delete/:id

Deletes a user-owned list and all items contained within it.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description            |
|-----------|--------|----------|------------------------|
| id        | string | Yes      | Identifier of the list | 

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the list is deleted successfully.

```json
{
    "data": "List deleted successfully",
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
Returned when the authenticated user or the specified list cannot be found.

```json
{
    "data": "List not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while deleting the list.

```json
{
    "data": "Error deleting list",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /lists/edit/:id

Updates the name and/or type of a user-owned list.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description            |
|-----------|--------|----------|------------------------|
| id        | string | Yes      | Identifier of the list |

<div class="h3">Request Body</div>

| Field | Type   | Required | Default | Description             |
|-------|--------|----------|---------|-------------------------|
| name  | string | Yes      | —       | Updated list name       |
| type  | string | Yes      | —       | Updated list type       |

<div class="h4">Enum Values</div>

**type**
- `volume`
- `series`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the list is updated successfully.

```json
{
    "data": "List updated successfully",
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
Returned when the authenticated user or the specified list cannot be found.

```json
{
    "data": "List not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when attempting to change the list type while items exist or when an unexpected error occurs.

```json
{
    "data": "Cannot change list type when items exist | Error updating list",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `GET` /lists/type/:type/:id

Returns all user-owned lists of a given type and indicates whether a specific item is already present in each list.

This endpoint is typically used to determine which lists an item can be added to and whether it already exists in them.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description                               |
|-----------|--------|----------|-------------------------------------------|
| type      | string | Yes      | List type to filter by                    |
| id        | number | Yes      | Identifier of the item (series or volume) |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the lists are retrieved successfully.

```json
[
    {
        "id": "number",
        "name": "string",
        "slug": "string",
        "in_list": "boolean"
    }
]
```
Models used
[List Model](../../model-reference/list-model/index.html){.btn .btn-primary}
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

## `POST` /lists/add-item/:type

Adds an item to a user-owned list. The item type must match the list type.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description                 |
|-----------|--------|----------|-----------------------------|
| type      | string | Yes      | Type of the item to be added|

<div class="h3">Request Body</div>

| Field    | Type   | Required | Default | Description                         |
|----------|--------|----------|---------|-------------------------------------|
| item_id  | number | Yes      | —       | Identifier of the item              |
| list_id  | number | Yes      | —       | Identifier of the target list       |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the item is added to the list successfully.

```json
{
    "data": "Item added to list successfully",
    "code": 200
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when required parameters are missing or the item type does not match the list type.

```json
{
    "data": "Required parameters missing | Item type does not match list type",
    "code": 400
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 404 Not Found
Returned when the authenticated user or the specified list cannot be found.

```json
{
    "data": "User not found | List not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 409 Conflict
Returned when the item already exists in the list.

```json
{
    "data": "Item already in list",
    "code": 409
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while adding the item to the list.

```json
{
    "data": "Error adding item to list",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::