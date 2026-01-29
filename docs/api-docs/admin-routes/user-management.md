---
title: "User Management"
description: ""
---

## `GET` /admin-users

Returns a paginated list of users. The result can be filtered, searched, and ordered, and includes role assignments and lock information where applicable.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `view-users`

<div class="h3">Query Parameters</div>

| Parameter | Type   | Required | Description                                                   |
|-----------|--------|----------|---------------------------------------------------------------|
| order     | string | No       | Sort order for users (see supported values below)            |
| limit     | number | No       | Maximum number of users to return                            |
| offset    | number | No       | Number of users to skip (for pagination)                     |
| search    | string | No       | Search term applied to usernames                             |
| role      | string | No       | Filter users by role identifier                              |

<div class="h4">Supported Ordering Values</div>

- `name-asc` (default)
- `name-desc`
- `registered-asc`
- `registered-desc`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the users are retrieved successfully.

```json
{
    "users": [
        {
            "id": "number",
            "slug": "string",
            "username": "string",
            "age_verified": "boolean",
            "profile_image": "string",
            "registered": "string",
            "roles": [
                {
                    "id": "number",
                    "name": "string",
                    "description": "string"
                }
            ],
            "lock": {
                "id": "number",
                "username": "string"
            } | null
        }
    ],
    "max": "number",
    "from": "number",
    "to": "number"
}
```
Models used
[User Model](../../model-reference/user-model/index.html){.btn .btn-primary}
[Role Model](../../model-reference/role-model/index.html){.btn .btn-primary}
:::

## `GET` /admin-users/id/:id

Returns detailed information for a specific user, including assigned roles and current login status.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `view-users`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description            |
|-----------|--------|----------|------------------------|
| id        | string | Yes      | Identifier of the user |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the user is retrieved successfully.

```json
{
    "id": "number",
    "slug": "string",
    "username": "string",
    "profile_image": "string | null",
    "registered": "string",
    "age_verified": "boolean",
    "logged_in": "boolean",
    "roles": [
        {
            "id": "number",
            "name": "string",
            "description": "string | null"
        }
    ]
}
```
Models used
[User Model](../../model-reference/user-model/index.html){.btn .btn-primary}
[Role Model](../../model-reference/role-model/index.html){.btn .btn-primary}
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
Returned when the authenticated user or the requested user cannot be found.

```json
{
    "data": "User not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-users/edit/:id

Updates an existing user’s basic information and role assignments.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-users`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description            |
|-----------|--------|----------|------------------------|
| id        | string | Yes      | Identifier of the user |

<div class="h3">Request Body</div>

| Field         | Type    | Required | Default | Description                                      |
|---------------|---------|----------|---------|--------------------------------------------------|
| username      | string  | Yes      | —       | Updated username                                 |
| age_verified  | boolean | No       | `false` | Whether the user is age verified                 |
| added_roles   | array   | No       | `[]`    | List of role IDs to assign to the user           |
| removed_roles | array   | No       | `[]`    | List of role IDs to remove from the user         |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the user is updated successfully.

```json
{
    "data": "User edited successfully",
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
Returned when the specified username is already taken.

```json
{
    "data": "Username already taken",
    "code": 409
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while editing the user.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `DELETE` /admin-users/delete/:id

Deletes a user and all associated data from the system. This operation is irreversible.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `delete-users`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description            |
|-----------|--------|----------|------------------------|
| id        | string | Yes      | Identifier of the user |  

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the user and all associated data are deleted successfully.

```json
{
    "data": "User deleted successfully",
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
Returned when the authenticated admin user or the target user cannot be found.

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
Returned when an unexpected error occurs while deleting the user.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-users/logout/:id

Forcibly logs out a user by invalidating their refresh token. This endpoint is typically used by administrators to terminate active user sessions.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-users`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description            |
|-----------|--------|----------|------------------------|
| id        | string | Yes      | Identifier of the user | 

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the user is logged out successfully.

```json
{
    "data": "User logged out successfully",
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
Returned when the authenticated admin user or the target user cannot be found.

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
Returned when an unexpected error occurs while logging out the user.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-users/update-image/:id

Updates the profile image of a user. This endpoint is intended for administrative use and allows updating the profile image of any user.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-users`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description            |
|-----------|--------|----------|------------------------|
| id        | string | Yes      | Identifier of the user |

<div class="h3">Request Body</div>

| Field | Type   | Required | Default | Description                       |
|-------|--------|----------|---------|-----------------------------------|
| image | string | Yes      | —       | Base64-encoded image data         |

The image must be provided as a Base64-encoded string (data URL format supported).

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

## `DELETE` /admin-users/delete-image/:id

Deletes the profile image of a user. This administrative endpoint allows removing profile images for any user.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-users`

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

## --- Roles --- {.category-title data-category="Roles"}

## `GET` /admin-roles

Returns a list of all roles in the system, including the number of permissions and users associated with each role.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `view-roles`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the roles are retrieved successfully.

```json
[
    {
        "id": "number",
        "name": "string",
        "description": "string | null",
        "permission_count": "number",
        "user_count": "number"
    }
]
```
Models used
[Role Model](../../model-reference/role-model/index.html){.btn .btn-primary}
:::

## `GET` /admin-roles/id/:id

Returns detailed information for a specific role, including all permissions assigned to that role.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `view-roles`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description            |
|-----------|--------|----------|------------------------|
| id        | string | Yes      | Identifier of the role |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the role is retrieved successfully.

```json
{
    "id": "number",
    "name": "string",
    "description": "string",
    "is_default": "number",
    "permissions": [
        {
            /* Permission data */
        }
    ]
}
```
Models used
[Role Model](../../model-reference/role-model/index.html){.btn .btn-primary}
[Permission Model](../../model-reference/permission-model/index.html){.btn .btn-primary}
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
Returned when the specified role cannot be found.

```json
{
    "data": "Role not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-roles/edit/:id

Updates an existing role, including its name, description, and assigned permissions.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-roles`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description            |
|-----------|--------|----------|------------------------|
| id        | string | Yes      | Identifier of the role |

<div class="h3">Request Body</div>

| Field                | Type   | Required | Description                                  |
|----------------------|--------|----------|----------------------------------------------|
| name                 | string | Yes      | Updated role name                             |
| description          | string | No       | Updated role description                     |
| added_permissions    | array  | No       | List of permission IDs to assign to the role |
| removed_permissions  | array  | No       | List of permission IDs to remove from the role |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the role is updated successfully.

```json
{
    "data": "Role updated successfully",
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


::: collapsible 409 Conflict
Returned when a role with the same name already exists.

```json
{
    "data": "Role with the same name already exists",
    "code": 409
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while updating the role.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-roles/add

Creates a new role in the system.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `add-roles`

<div class="h3">Request Body</div>

| Field        | Type   | Required | Description              |
|--------------|--------|----------|--------------------------|
| name         | string | Yes      | Name of the new role     |
| description  | string | Yes      | Description of the role  | 

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the role is added successfully.

```json
{
    "data": "Role added successfully",
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

::: collapsible 409 Conflict
Returned when a role with the same name already exists.

```json
{
    "data": "Role with the same name already exists",
    "code": 409
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while adding the role.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `DELETE` /admin-roles/delete/:id

Deletes an existing role from the system. Users who are assigned only this role are automatically reassigned to the default role.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `delete-roles`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description            |
|-----------|--------|----------|------------------------|
| id        | string | Yes      | Identifier of the role |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the role is deleted successfully.

```json
{
    "data": "Role deleted successfully",
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

::: collapsible 405 Method Not Allowed
Returned when attempting to delete the default role.

```json
{
    "data": "Cannot delete default role",
    "code": 405
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while deleting the role or when the default role cannot be resolved.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## --- Permissions --- {.category-title data-category="Permissions"}

## `GET` /admin-permissions

Returns a list of all permissions defined in the system.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `view-permissions`

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the permissions are retrieved successfully.

```json
[
    {
        "id": "number",
        "name": "string",
        "description": "string"
    }
]
```
Models used
[Permission Model](../../model-reference/permission-model/index.html){.btn .btn-primary}
:::

## `GET` /admin-permissions/id/:id

Returns detailed information for a specific permission.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `view-permissions`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description                  |
|-----------|--------|----------|------------------------------|
| id        | string | Yes      | Identifier of the permission |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the permission is retrieved successfully.

```json
{
    "id": "number",
    "name": "string",
    "description": "string"
}
```
Models used
[Permission Model](../../model-reference/permission-model/index.html){.btn .btn-primary}
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
Returned when the specified permission cannot be found.

```json
{
    "data": "Permission not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-permissions/edit/:id

Updates an existing permission, including its name and description.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `edit-permissions`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description                  |
|-----------|--------|----------|------------------------------|
| id        | string | Yes      | Identifier of the permission |

<div class="h3">Request Body</div>

| Field        | Type   | Required | Description                   |
|--------------|--------|----------|-------------------------------|
| name         | string | Yes      | Updated permission name       |
| description  | string | Yes      | Updated permission description|

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the permission is updated successfully.

```json
{
    "data": "Permission updated successfully",
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
Returned when the specified permission cannot be found.

```json
{
    "data": "Permission not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 409 Conflict
Returned when a permission with the same name already exists.

```json
{
    "data": "Permission with the same name already exists",
    "code": 409
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while updating the permission.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /admin-permissions/add

Creates a new permission in the system.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `add-permissions`

<div class="h3">Request Body</div>

| Field        | Type   | Required | Description                    |
|--------------|--------|----------|--------------------------------|
| name         | string | Yes      | Name of the new permission     |
| description  | string | Yes      | Description of the permission  |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the permission is added successfully.

```json
{
    "data": "Permission added successfully",
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

::: collapsible 409 Conflict
Returned when a permission with the same name already exists.

```json
{
    "data": "Permission with the same name already exists",
    "code": 409
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while adding the permission.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `DELETE` /admin-permissions/delete/:id

Deletes an existing permission from the system. All role–permission associations for the permission are removed before deletion.

<div class="h3">Authentication</div>

This endpoint requires authentication via a **refresh token** stored in cookies and the appropriate permission.

| Cookie Name  | Required | Description                        |
|--------------|----------|------------------------------------|
| refreshToken | Yes      | Refresh token used to authenticate |

**Required Permission:** `delete-permissions`

<div class="h3">Path Parameters</div>

| Parameter | Type   | Required | Description                  |
|-----------|--------|----------|------------------------------|
| id        | string | Yes      | Identifier of the permission |

<div class="h3">Responses</div>

::: collapsible 200 OK
Returned when the permission is deleted successfully.

```json
{
    "data": "Permission deleted successfully",
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
Returned when the specified permission cannot be found.

```json
{
    "data": "Permission not found",
    "code": 404
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an unexpected error occurs while deleting the permission.

```json
{
    "data": "Internal server error",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::