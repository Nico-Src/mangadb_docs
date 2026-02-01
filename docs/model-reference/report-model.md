---
title: "Report Model"
description: ""
---

## Report Model

Represents a user-submitted report for a series or volume. Reports can be reviewed and updated by moderators and may include references to the reporting user and reviewer.

### Fillable Fields

| Field       | Type              | Description                                     |
| ----------- | ----------------- | ----------------------------------------------- |
| id          | number            | Unique report ID                                |
| type        | string            | Report category/type                            |
| description | string            | Report description provided by the user         |
| user_id     | string            | ID of the reporting user                        |
| item_id     | number            | ID of the reported item                         |
| timestamp   | string (datetime) | Report creation timestamp                       |
| status      | string            | Current report status                           |
| reviewed_by | string            | ID of the reviewing user                        |
| note        | string            | Optional moderator note                         |
| report_type | string            | Item type being reported (`series` or `volume`) |
| user        | object            | Embedded user data                              |
| reviewer    | object            | Embedded reviewer data                          |

### Additional Properties

| Field  | Type   | Description                                  |
| ------ | ------ | -------------------------------------------- |
| series | object | Series data when the report targets a series |
| volume | object | Volume data when the report targets a volume |

### Methods

#### setSeries(series)
Attaches series data to the report.

#### setVolume(volume)
Attaches volume data to the report.

#### setUser(user)
Attaches reporting user data.

#### setReviewedBy(user)
Attaches reviewer data.

### Example JSON Output

```json
{
  "id": 3,
  "type": "wrong-information",
  "description": "Release date is incorrect.",
  "user_id": "usr_42",
  "item_id": 12,
  "timestamp": "2026-01-20T12:33:44Z",
  "status": "under-review",
  "reviewed_by": "usr_1",
  "note": "Needs verification",
  "report_type": "series",
  "series": {
    "id": 12,
    "name": "Example Series"
  },
  "volume": null,
  "user": {
    "id": "usr_42",
    "username": "Nico"
  },
  "reviewer": {
    "id": "usr_1",
    "username": "Admin"
  }
}
```