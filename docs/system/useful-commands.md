---
title: "Useful Commands"
description: ""
---

# Useful Commands

This document provides an overview of commonly used operational commands, including what each command does and when it should be used.

---

## Sync Media Files

These commands use `rsync` to keep media files in sync between the local machine and the server.

---

### Sync From Local to Server

```bash
rsync -avz --progress \
"LOCAL_PATH" \
root@164.90.223.57:/root/mangadb_api/media/
```

This command synchronizes the contents of ```LOCAL_PATH``` with the target directory on the server.

### Sync from Server to Local

```bash
rsync -avz --progress --delete \
root@164.90.223.57:/root/mangadb_api/media/ \
"LOCAL_PATH"
```

This command synchronizes the contents of a specified directory on the server to ```LOCAL_PATH```. 
The ```--delete``` option removes files in ```LOCAL_PATH``` that do not exist in the source directory.

## MariaDB / MySQL

These commands provide basic management and maintenance operations for a MariaDB/MySQL database.

### Start Docker Container

```bash
docker start mariadb104
```

This command starts the MariaDB Docker container if it is not already running.

### Log into the MySQL Interface

```bash
docker exec -it mariadb104 mysql -u root -p
```

### Import SQL-File

```bash
docker exec -i mariadb104 mysql -h 127.0.0.1 -u mangadb --password=YOUR_DB_PASSWORD mangadb < mangadb.sql
```

Imports an SQL file into a specified database.
```-h``` specifies the database host (must be 127.0.0.1).
```-u``` specifies the database user used for the import (typically mangadb).
```--password``` provides the password for the specified user.
The database name following the password is the target of the import.