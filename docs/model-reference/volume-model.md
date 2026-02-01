---
title: "Volume Model"
description: ""
---

## Volume Model

Represents a single volume belonging to a series.
The model contains publication metadata, edition information, media, navigation data, and optional user collection data.

### Fillable Fields

| Field            | Type     | Description                      |
| ---------------- | -------- | -------------------------------- |
| id               | number   | Unique volume ID                 |
| name             | string   | Volume title or number           |
| group_id         | number   | Associated volume group ID       |
| cover_path       | string   | Path to front cover image        |
| back_cover_path  | string   | Path to back cover image         |
| spine_cover_path | string   | Path to spine cover image        |
| group_order      | number   | Order within its group           |
| release_date     | date     | Official release date            |
| last_update      | datetime | Last modification timestamp      |
| language         | string   | Publication language             |
| description      | string   | Volume description               |
| isbn10           | string   | ISBN-10 identifier               |
| isbn13           | string   | ISBN-13 identifier               |
| type             | string   | Volume type                      |
| measures         | string   | Physical dimensions              |
| pages            | number   | Page count                       |
| rating           | number   | Rating value                     |
| copyright        | string   | Copyright information            |
| edition_id       | number   | Edition reference ID             |
| edition_name     | string   | Human-readable edition name      |
| extras           | string   | Extra information                |
| nsfw             | number   | 16+ Flag                        |
| nsfw18           | number   | 18+ Flag            |
| special          | number   | Special edition flag             |
| slug             | string   | URL slug                         |
| special_name     | string   | Special edition label            |
| three_d          | number   | Wether Volume is viewable in 3d                  |
| aspect_ratio     | number   | Cover image aspect ratio         |
| collection       | object   | Collection metadata              |
| in_collection    | boolean  | Indicates user collection status |
| series           | object   | Parent series metadata           |
| media            | array    | Associated media items           |

### Additional Properties

| Field          | Type   | Description                        |
| -------------- | ------ | ---------------------------------- |
| links          | array  | Purchase or provider links         |
| images         | array  | Cover and gallery images           |
| navigation     | object | Previous/next navigation metadata  |
| lockedBy       | object | Lock information in admin context  |
| last_copyright | string | Autofill helper for admin creation |

### Collection Structure

If collection data is present:

```json
{
  "item_id": 10,
  "buy_date": "2023-01-01",
  "price": 9.99
}
```

### Navigation Metadata

```json
{
  "count": 20,
  "index": 5,
  "next": "volume-6",
  "prev": "volume-4"
}
```

### Series Structure

```json
{
  "id": 1,
  "name": "Attack on Titan",
  "type": "manga"
}
```

### Methods

#### setCollection(data)
Sets collection purchase metadata.

#### setCollectionStatus(status)
Sets whether the volume exists in the user collection.

#### setEditionName(name)
Sets edition display name.

#### setLinks(links)
Sets provider or purchase links.

#### setImages(images)
Sets gallery and cover images.

#### setNavigationMetadata(count, index, next, prev)
Sets navigation information.

#### setSeries(data)
Sets parent series metadata.

#### setLockedBy(user)
Stores lock info for admin tools.

#### setMedia(media)
Sets associated media entries.

#### setLastCopyright(value)
Stores last known copyright entry for admin autofill.

### Example JSON Output

```json
{
  "id": 398,
  "name": "Volume 1",
  "language": "English",
  "slug": "volume-1",
  "cover_path": "media/images/42642.jpg",
  "pages": 192,
  "edition_name": "Collector Edition",
  "series": {
    "id": 1,
    "name": "Attack on Titan",
    "type": "manga"
  },
  "navigation": {
    "count": 34,
    "index": 0,
    "next": "volume-2",
    "prev": null
  },
  "in_collection": true
}
```

## Volume Group Model

Represents a group of volumes within a series (e.g., arcs, editions, or grouped releases).

### Fillable Fields

| Field        | Type   | Description         |
| ------------ | ------ | ------------------- |
| id           | number | Group ID            |
| name         | string | Group name          |
| series_order | number | Order inside series |

### Additional Properties

| Field   | Type   | Description                      |
| ------- | ------ | -------------------------------- |
| series  | object | Parent series metadata           |
| volumes | array  | List of volumes within the group |

### Methods

#### setSeries(data)
Sets associated series metadata.

#### setVolumes(volumes)
Assigns volumes to the group.

### Example JSON Output

```json
{
  "id": 5,
  "name": "Main Volumes",
  "series_order": 0,
  "series": {
    "id": 1,
    "name": "Attack on Titan",
    "type": "manga"
  },
  "volumes": []
}
```