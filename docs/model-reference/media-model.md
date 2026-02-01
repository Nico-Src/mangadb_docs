---
title: "Media Model"
description: ""
---

## Media Model

Represents an image stored in the media library. Media entries are used for galleries, volume images, and other image associations across the system.

Each media item contains a file path, metadata, and optional tags for easier searching and organization.

### Fillable Fields

| Field     | Type           | Description                    |
| --------- | -------------- | ------------------------------ |
| id        | number         | Media ID                       |
| name      | string         | Display name of the media item |
| path      | string         | File path to the stored image  |
| tags      | string | array | Tags describing the media item |
| timestamp | datetime       | Upload timestamp               |

### Additional Behavior

The model normalizes tag data so that tags are always exposed as an array.

Tags may originate as:

* A comma-separated string
* An array of strings

Duplicates and empty values are automatically removed.

### Methods

#### setTags(tags)
Normalizes and stores tags as a clean array of unique values.

### Example JSON Output

```json
{
  "id": 301,
  "name": "Series Cover Illustration",
  "path": "media/gallery/301.jpg",
  "tags": [
    "cover",
    "illustration",
    "series"
  ],
  "timestamp": "2026-01-20T18:22:10Z"
}
```