---
title: "List Model"
description: ""
---

## List Model

Represents a user-created list that can contain volumes or other items, depending on the list type. Lists are commonly used for collections, favorites, reading lists, or custom user groupings.

The `List` model extends the BaseModel and supports additional metadata such as preview items and item counts for efficient frontend rendering.

### Fillable Fields

These fields are automatically populated when constructing the model.

| Field       | Type              | Description                                               |
| ----------- | ----------------- | --------------------------------------------------------- |
| id          | number            | Unique list identifier                                    |
| name        | string            | Name of the list                                          |
| user_id     | string            | Owner of the list                                         |
| last_change | string / datetime | Timestamp of the last modification                        |
| last_added  | string / datetime | Timestamp of the last item added                          |
| slug        | string            | URL-friendly identifier                                   |
| type        | string            | List type (e.g., series, volumes, etc.)                 |
| client      | number            | Client identifier                                         |
| in_list     | boolean           | Indicates whether a specific queried item is in this list |

### Additional Runtime Fields

These values are typically attached dynamically via setter methods.

| Field        | Type          | Description                              |
| ------------ | ------------- | ---------------------------------------- |
| items        | array         | Items contained in the list              |
| item_count   | number        | Total number of items in the list        |
| preview_item | object | null | Representative item used as list preview |

### Methods

#### setPreviewItem(item)

Assigns a preview item used for display purposes.

#### setItems(items)

Sets the list items returned in list-detail responses.

#### setItemCount(count)

Stores the number of items in the list.

### JSON Serialization

The `toJSON()` method returns the serialized representation used in API responses.

Example response:

```json
{
  "id": 5,
  "name": "My Favorites",
  "user_id": "20ß4aklsdop21",
  "last_change": "2025-01-10T12:30:00Z",
  "last_added": "2025-01-10T12:30:00Z",
  "slug": "my-favorites",
  "type": "series",
  "client": 1,
  "items": [],
  "item_count": 0,
  "preview_item": null,
  "in_list": false
}
```

### Notes

• Lists belong to a specific user via `user_id`.
• `preview_item` allows fast rendering of list cards without loading all items.
• `in_list` is commonly used when checking if an is already in the list (used for dropdown for example)