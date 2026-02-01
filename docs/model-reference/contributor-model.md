---
title: "Contributor Model"
description: ""
---

## Contributor Model

Represents a person or entity contributing to a series or volume, such as authors, artists, translators, or editors.

A contributor can have multiple aliases, descriptions, relations, and associated works.

### Fillable Fields

| Field            | Type          | Description                             |
| ---------------- | ------------- | --------------------------------------- |
| id               | number        | Contributor ID                          |
| first_name       | string        | Contributor's first name                |
| last_name        | string | null | Contributor's last name                 |
| image            | string | null | Avatar/profile image path               |
| gender           | string | null | Gender information                      |
| type             | string        | Contributor type (e.g., person, group)  |
| contributor_role | string        | Role in a series (author, artist, etc.) |
| slug             | string        | URL slug                                |
| series_count     | number        | Number of associated series             |

### Additional Properties

| Field         | Type   | Description                                 |
| ------------- | ------ | ------------------------------------------- |
| links         | array  | External links associated with contributor  |
| descriptions  | array  | Multilingual descriptions                   |
| aliases       | array  | Alternative names                           |
| relations     | array  | Relations to other contributors             |
| random_series | object | Random associated series (used in listings) |
| lockedBy      | object | Lock metadata in admin context              |

### Link Handling

Links may be stored in two formats:

* Comma-separated string
* Array of URLs

The model normalizes both formats into an array.

### Methods

#### setLinks(links)
Normalizes and stores contributor links.

#### setDescriptions(descriptions)
Stores contributor descriptions.

#### setAliases(aliases)
Stores alternate contributor names.

#### setRelations(relations)
Stores relations to other contributors.

#### setRandomSeries(series)
Stores a randomly selected associated series for preview purposes.

#### setLockedBy(user)
Stores lock metadata used in admin editing contexts.

### Example JSON Output

```json
{
  "id": 44,
  "first_name": "Hajime",
  "last_name": "Isayama",
  "image": "media/author_images/44.jpg",
  "links": [
    "https://twitter.com/example"
  ],
  "type": "person",
  "contributor_role": "Author",
  "series_count": 3,
  "aliases": [],
  "relations": [],
  "random_series": {
    "id": 1,
    "name": "Attack on Titan"
  },
  "lockedBy": null
}
```