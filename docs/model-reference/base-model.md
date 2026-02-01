---
title: "Base Model"
description: ""
---

# Base Model

The **Base Model** provides shared functionality for all application models. It implements a controlled data assignment mechanism using a whitelist of allowed fields, ensuring models only receive explicitly permitted properties.

All other models inherit from this class.

## Overview

The Base Model automatically fills model instances using a predefined list of allowed properties (`fillable`). This prevents accidental assignment of unwanted or unsafe fields.

Child models define which fields can be populated by overriding the static `fillable` array.

## Class Definition

```js
class BaseModel {
    static fillable = [];

    constructor(data = {}, excludeFields = []) {
        this.fill(data, excludeFields);
    }

    fill(data, excludeFields = []) {
        for (const key of this.constructor.fillable) {
            if (data[key] !== undefined && !excludeFields.includes(key)) {
                this[key] = data[key];
            }
        }
    }
}
````

## Properties

### `fillable` (static)

Defines which properties are allowed to be filled when constructing or updating a model.

**Type:** `string[]`
**Default:** `[]`

Child classes override this.

Example:

```js
static fillable = ["id", "name", "slug"];
```

## Constructor

### `new BaseModel(data?, excludeFields?)`

Creates a new model instance and fills it using allowed fields.

| Parameter     | Type     | Required | Default | Description                  |
| ------------- | -------- | -------- | ------- | ---------------------------- |
| data          | object   | No       | `{}`    | Source data object           |
| excludeFields | string[] | No       | `[]`    | Fields to skip while filling |

## Methods

### `fill(data, excludeFields?)`

Fills the model with values from `data`, but only for keys listed in `fillable`.

| Parameter     | Type     | Required | Default | Description                     |
| ------------- | -------- | -------- | ------- | ------------------------------- |
| data          | object   | Yes      | —       | Source data                     |
| excludeFields | string[] | No       | `[]`    | Fields excluded from assignment |

#### Behavior

* Only keys defined in `fillable` are assigned.
* Fields in `excludeFields` are ignored.
* Undefined values are skipped.

## Example Usage

### Defining a Model

```js
class Series extends BaseModel {
    static fillable = ["id", "name", "slug"];
}
```

### Creating an Instance

```js
const series = new Series({
    id: 1,
    name: "Example",
    slug: "example",
    ignored_field: "not assigned"
});
```

Result:

```js
{
    id: 1,
    name: "Example",
    slug: "example"
}
```

## Purpose & Benefits

* Prevents unintended property assignment
* Ensures consistent model initialization
* Simplifies repository-to-model mapping
* Provides safe extension point for all models

## Used By

All application models inherit from **BaseModel**.