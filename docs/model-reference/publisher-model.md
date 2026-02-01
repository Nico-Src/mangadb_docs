---
title: "Publisher Model"
description: ""
---

## Publisher Model

Represents a publishing company responsible for releasing series and volumes. Includes company metadata, aliases, descriptions, relations, and publication statistics.

### Fillable Fields

| Field         | Type   | Description                 |
| ------------- | ------ | --------------------------- |
| id            | number | Publisher ID                |
| name          | string | Publisher name              |
| short_name    | string | Abbreviated name            |
| website       | string | Official website URL        |
| headquarter   | string | Headquarters location       |
| founding_date | date   | Founding date               |
| image         | string | Publisher logo/image path   |
| image_source  | string | Image credit/source         |
| slug          | string | URL slug                    |
| client        | number | Client identifier           |
| status        | string | Publication status          |
| volumes       | number | Volume count                |
| chapter       | number | Chapter count               |
| language      | string | Publication language        |
| origin        | string | Country or origin           |
| start         | date   | Start of publishing period  |
| end           | date   | End of publishing period    |
| series_count  | number | Number of associated series |

### Additional Properties

| Field        | Type   | Description                    |
| ------------ | ------ | ------------------------------ |
| domain       | string | Domain extracted from website  |
| descriptions | array  | Publisher descriptions         |
| aliases      | array  | Alternate names                |
| relations    | array  | Relations to other publishers  |
| lockedBy     | object | Lock metadata in admin context |

### Alias Handling

Aliases may arrive as:

* An array of alias entries
* A semicolon-separated string

The model normalizes them into a unique array of alias names.

### Methods

#### setDomain(domain)
Stores parsed domain from website.

#### setDescriptions(descriptions)
Assigns publisher descriptions.

#### setAliases(aliases)
Normalizes and assigns aliases.

#### setRelations(relations)
Stores relations to other publishers.

#### setLockedBy(user)
Stores lock info for admin editing.

### Example JSON Output

```json
{
  "id": 12,
  "name": "Kodansha",
  "short_name": "Kodansha",
  "website": "https://kodansha.co.jp",
  "domain": "kodansha.co.jp",
  "origin": "Japan",
  "series_count": 120,
  "aliases": ["Kodansha Ltd."],
  "relations": [],
  "lockedBy": null
}
```

## Publisher Edition Model

Represents a specific edition of a series released by a publisher. Used for tracking alternative releases, reprints, or region-specific editions.

### Fillable Fields

| Field           | Type    | Description               |
| --------------- | ------- | ------------------------- |
| id              | number  | Edition ID                |
| publisher_id    | number  | Associated publisher ID   |
| name            | string  | Edition name              |
| volumes         | number  | Number of volumes         |
| chapter         | number  | Chapter count             |
| series_id       | number  | Series reference          |
| status          | string  | Publication status        |
| default_edition | boolean | Indicates default edition |
| start           | date    | Edition start date        |
| end             | date    | Edition end date          |

### Example JSON Output

```json
{
  "id": 3,
  "publisher_id": 12,
  "name": "Collector Edition",
  "series_id": 1,
  "default_edition": false,
  "volumes": 10,
  "status": "completed"
}
```