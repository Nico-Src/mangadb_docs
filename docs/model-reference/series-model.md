---
title: "Series Model"
description: ""
---

## Series Model

Represents a series entity (e.g., manga, comics, or similar publications).
The model aggregates metadata, relations, ratings, contributors, publishers, and optional user-specific reading history.

### Fillable Fields

| Field              | Type          | Description                              |
| ------------------ | ------------- | ---------------------------------------- |
| id                 | number        | Unique series ID                         |
| name               | string        | Series title                             |
| type               | string        | Series type (e.g., Manga, Comic, etc.)   |
| slug               | string        | URL-friendly identifier                  |
| public             | number        | Visibility flag (1 = public, 0 = hidden) |
| relation_diagram   | object / null | Serialized relation diagram data         |
| client             | number        | Client identifier                        |
| origin             | string        | Original language or origin              |
| alias              | string        | Preferred alias for current context      |
| description        | string        | Localized or selected description        |
| tags               | array         | Tags associated with the series          |
| volume             | object        | First or representative volume           |
| reading-history    | object        | User-specific reading history entry      |
| rating             | object        | Rating of the current user               |
| average_rating     | number        | Average rating score                     |
| publisher_language | string        | Language of the publisher edition        |

### Additional Properties

These are populated through helper methods and are commonly present in responses.

| Field              | Type         | Description                       |
| ------------------ | ------------ | --------------------------------- |
| aliases            | array        | All known series aliases          |
| ratings            | array        | List of individual ratings        |
| rating_count       | number       | Total number of ratings           |
| contributors       | array        | Associated contributors           |
| publishers         | array        | Publisher entries                 |
| publisher_editions | array        | Publisher editions                |
| descriptions       | array        | Available localized descriptions  |
| relations          | array/object | Related series entries            |
| lockedBy           | object       | Admin lock metadata               |
| tag_ids            | string       | Internal tag metadata (temporary) |
| tag_names          | string       | Internal tag metadata (temporary) |
| tag_types          | string       | Internal tag metadata (temporary) |

### Reading History Structure

When available, the `reading-history` field contains:

```json
{
  "user_id": "string",
  "series_id": "number",
  "notes": "string",
  "reread": true,
  "visibility": "string",
  "status": "string",
  "progress": 0,
  "progress_type": "string",
  "score": 0,
  "priority": 0,
  "start": "date",
  "end": "date",
  "last_update": "datetime"
}
```

### Rating Structure

User rating entry:

```json
{
  "rating": 8,
  "user_id": "string",
  "series_id": 12
}
```

### Methods

#### setReadingHistoryValue(data)
Sets user reading history information.

#### setRating(data)
Sets the current user's rating entry.

#### setRatings(ratings)
Sets rating list.

#### setAverageRating(value)
Sets average rating.

#### setRatingCount(count)
Sets rating count.

#### setVolume(volume)
Attaches representative volume data.

#### setAlias(alias)
Sets context-specific alias.

#### setDescription(description)
Sets selected description.

#### setTags(tags)
Sets tag list.

#### setTagMeta(data)
Stores temporary tag metadata from queries.

#### setAliases(aliases)
Parses and sets alias list, removing duplicates.

#### setContributors(contributors)
Sets contributor list.

#### setPublishers(publishers)
Sets publisher list.

#### setPublisherEditions(editions)
Sets publisher editions.

#### setDescriptions(descriptions)
Sets description list.

#### setRelations(relations)
Sets related series.

#### setLockedBy(user)
Sets lock metadata.

#### setOrigin(origin)
Overrides origin.

### Example JSON Output

```json
{
  "id": 1,
  "name": "Attack on Titan",
  "type": "Manga",
  "slug": "attack-on-titan-manga",
  "public": 1,
  "origin": "Japanese",
  "aliases": ["Shingeki no Kyojin"],
  "alias": "Shingeki no Kyojin",
  "description": "Humanity fights Titans.",
  "tags": [],
  "volume": {
    "id": 398,
    "cover_path": "uploaded/images/42642.jpg"
  },
  "average_rating": 8.7,
  "rating_count": 1243,
  "contributors": [],
  "publishers": [],
  "relations": {},
  "publisher_language": "Japanese"
}
```