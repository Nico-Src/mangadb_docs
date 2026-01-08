---
title: "Auth Routes"
description: ""
---

## `POST` /auth/login

Authenticates a user using a username and password, then issues JWT tokens for session management.
### Request Body

The request body must be sent as JSON and include the following fields:

| Field     | Type   | Required | Description                     |
|-----------|--------|----------|---------------------------------|
| username  | string | Yes      | The user’s username             |
| password  | string | Yes      | The user’s plain-text password  |

#### Example

```json
{
  "username": "exampleUser",
  "password": "securePassword123"
}
```

### Responses

::: collapsible 200 OK
Returned when the user is authenticated successfully.

```json
{
    "accessToken": "<jwt-access-token>",
    "user": {
        "id": "string",
        "username": "string",
        "profile_image": "string | null",
        "registered": "string",
        "age_verified": "number",
        "slug": "string",
        "roles": [/* See model for reference */],
        "permissions": [/* See model for reference */],
    }
}
```
Models used
[User Model](../../model-reference/user-model/index.html){.btn .btn-primary}
[Role Model](../../model-reference/role-model/index.html){.btn .btn-primary}
[Permission Model](../../model-reference/permission-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when required request parameters are missing.

```json
{
    "data": "Required parameters missing",
    "code": 400
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 401 Unauthorized
Returned when the username does not exist or the password is incorrect.

```json
{
    "data": "Invalid credentials",
    "code": 401
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /auth/register

Registers a new user account using a username and password.

### Request Body

The request body must be sent as JSON and include the following fields:

| Field     | Type   | Required | Description                    |
|-----------|--------|----------|--------------------------------|
| username  | string | Yes      | Desired username               |
| password  | string | Yes      | Plain-text account password    |

#### Example

```json
{
  "username": "new_user",
  "password": "strongPassword123"
}
```

### Responses

::: collapsible 201 Created
Returned when the user account is created successfully.

```json
{
  "data": "User created successfully",
  "code": 201
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 400 Bad Request
Returned when required request parameters are missing.

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
Returned when the requested username is already in use.

```json
{
    "data": "Username already taken",
    "code": 409
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 422 Unprocessable Entity
Returned when the username or password does not meet validation requirements.

```json
{
    "data": "Invalid username",
    "code": 422
}
```

```json
{
    "data": "Invalid password",
    "code": 422
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 500 Internal Server Error
Returned when an internal error occurs during user creation or role assignment.

```json
{
    "data": "Error creating user",
    "code": 500
}
```

```json
{
    "data": "Error assigning role to user",
    "code": 500
}
```

```json
{
    "data": "No default role set",
    "code": 500
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `GET` /auth/me

Validates the current user session using a refresh token and returns the authenticated user context along with a newly issued access token.

### Authentication

This endpoint uses the **refresh token** stored in cookies.

| Cookie Name   | Required | Description                         |
|---------------|----------|-------------------------------------|
| refreshToken  | Yes      | Refresh token used to validate user |

---

### Responses

::: collapsible 200 OK
Returned when the user is authenticated successfully and the session is valid.

```json
{
    "accessToken": "<jwt-access-token>",
    "user": {
        "id": "string",
        "username": "string",
        "profile_image": "string | null",
        "registered": "string",
        "age_verified": "number",
        "slug": "string",
        "roles": [/* See model for reference */],
        "permissions": [/* See model for reference */],
        "settings": { /* User-specific settings */ }
    }
}
```
Models used
[User Model](../../model-reference/user-model/index.html){.btn .btn-primary}
[Role Model](../../model-reference/role-model/index.html){.btn .btn-primary}
[Permission Model](../../model-reference/permission-model/index.html){.btn .btn-primary}
:::

::: collapsible 401 Unauthorized
Returned when the refresh token is missing, invalid, or does not resolve to a user.

```json
{
    "data": "Unauthorized",
    "code": 401
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

## `POST` /auth/logout

Logs out the currently authenticated user by invalidating the refresh token and clearing the authentication cookie.

### Authentication

This endpoint uses the **refresh token** stored in cookies.

| Cookie Name   | Required | Description                         |
|---------------|----------|-------------------------------------|
| refreshToken  | Yes      | Refresh token used to identify user |

---

### Responses

::: collapsible 200 OK
Returned when the user is logged out successfully.

```json
{
    "data": "Logged out",
    "code": 200
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::

::: collapsible 401 Unauthorized
Returned when the refresh token is missing or invalid.

```json
{
    "data": "Unauthorized",
    "code": 401
}
```
Models used
[Response Model](../../model-reference/response-model/index.html){.btn .btn-primary}
:::