---
title: Server Commands
linkTitle: Commands
description: Dnote server CLI commands
weight: 3
---

The Dnote server provides CLI commands for managing your server instance and users.

## Start Server

Start the Dnote server:

```bash
dnote-server start
```

See [Configuration](../configuration/) for available flags and environment variables.

## User Management

### Create User

Create a new user account:

```bash
dnote-server user create --email=user@example.com --password=yourpassword
```

**Flags:**
- `--email` - User email address (required)
- `--password` - User password (required, minimum 8 characters)
- `--dbPath` - Path to database file (optional, defaults to `$XDG_DATA_HOME/dnote/server.db`)

**Example with custom database path:**

```bash
dnote-server user create \
  --dbPath=/var/lib/dnote/server.db \
  --email=user@example.com \
  --password=yourpassword
```

### Reset Password

Reset a user's password:

```bash
dnote-server user reset-password --email=user@example.com --password=newpassword
```

**Flags:**
- `--email` - User email address (required)
- `--password` - New password (required, minimum 8 characters)
- `--dbPath` - Path to database file (optional)

**Example:**

```bash
dnote-server user reset-password \
  --dbPath=/var/lib/dnote/server.db \
  --email=user@example.com \
  --password=newpassword123
```

### Remove User

Remove a user account:

```bash
dnote-server user remove --email=user@example.com
```

**Flags:**
- `--email` - User email address (required)
- `--dbPath` - Path to database file (optional)

**Example:**

```bash
dnote-server user remove \
  --dbPath=/var/lib/dnote/server.db \
  --email=user@example.com
```

**Important:** Users with existing notes or books cannot be removed. Delete all their notes and books first.

## Version

Display the server version:

```bash
dnote-server version
```

## Help

Display help information:

```bash
# General help
dnote-server

# Command-specific help
dnote-server start --help
dnote-server user
dnote-server user create --help
```
