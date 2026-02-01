---
title: "Tag Model"
description: ""
---

## Tag Model

Represents a tag used to classify series (e.g. genre, theme, format). Tags are scoped per client and may optionally include how many series use the tag.

### Fillable Fields

| Field  | Type   | Description       |
| ------ | ------ | ----------------- |
| id     | number | Unique tag ID     |
| name   | string | Tag display name  |
| type   | string | Tag category/type |
| client | number | Client identifier |

### Additional Properties

| Field       | Type   | Description                                                |
| ----------- | ------ | ---------------------------------------------------------- |
| seriesCount | number | Number of series using this tag (defaults to 0 if not set) |

### Methods

#### setSeriesCount(count)
Sets how many series are associated with the tag.

### Example JSON Output

```json
{
  "id": 12,
  "name": "Action",
  "type": "genre",
  "client": 1,
  "seriesCount": 42
}
```