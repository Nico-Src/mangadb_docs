---
title: "User Model"
description: ""
---

## User Model

Represents an authenticated user within the system, including account metadata, permissions, settings, and session-related information.

The `User` model extends the BaseModel and controls which database fields are populated through the `fillable` configuration. Additional runtime data such as roles and permissions can be attached using setter methods.

### Fillable Fields

These fields can be populated automatically when constructing the model:

| Field         | Type              | Description                                          |
| ------------- | ----------------- | ---------------------------------------------------- |
| id            | string            | Unique user identifier                               |
| username      | string            | User's display and login name                        |
| password      | string            | User password hash (not exposed in API responses)    |
| profile_image | string | null     | Path or URL to the user's profile image              |
| registered    | string / datetime | Registration timestamp                               |
| age_verified  | boolean           | Whether the user passed age verification             |
| slug          | string            | URL-friendly identifier                              |
| refresh_token | string | null     | Current refresh token (not exposed in API responses) |
| locked_by     | object | null     | Lock information for admin editing workflows         |
| logged_in     | boolean           | Indicates if the user is currently logged in         |

### Additional Runtime Fields

These fields are typically attached after model creation using setter methods.

| Field       | Type          | Description                                         |
| ----------- | ------------- | --------------------------------------------------- |
| roles       | array         | Roles assigned to the user                          |
| permissions | array         | Effective permissions derived from roles            |
| settings    | object        | User-specific application settings                  |
| locked_by   | object | null | Information about which admin locked the user entry |
| logged_in   | boolean       | Current login state                                 |

### Methods

#### setRoles(roles)

Assigns role data to the model.

#### setPermissions(perms)

Assigns computed permission data.

#### setSettings(settings)

Assigns user-specific settings.

#### setLockInfo(lockInfo)

Sets lock metadata when the user is being edited.

#### setLoggedIn(loggedIn)

Sets the user's login status.

### JSON Serialization

The `toJSON()` method returns a sanitized representation of the user model. Sensitive fields such as password and refresh tokens are excluded.

Example serialized output:

```json
{
  "id": "29031830912j",
  "username": "nico",
  "profile_image": "media/profile/1.jpg",
  "registered": "2024-01-01T12:00:00Z",
  "age_verified": true,
  "slug": "nico",
  "roles": ["admin"],
  "permissions": ["edit-series"],
  "settings": {},
  "locked_by": null,
  "logged_in": true
}
```

### Notes

• Sensitive fields like `password` and `refresh_token` are intentionally excluded from API responses.
• Roles and permissions are typically populated after authentication.
• Locking metadata is mainly used in administrative editing workflows.