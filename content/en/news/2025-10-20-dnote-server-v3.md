---
title: "Dnote Server 3.0 - Easier Self-Hosting"
date: 2025-11-01
slug: dnote-server-v3
description: "Major release featuring SQLite support, multi-platform Docker images, and simplified self-hosting."
---

Dnote 3.0.0 makes self-hosting simpler with a smaller resource footprint. By switching to SQLite, you no longer need to run a separate PostgreSQL database server. The entire setup now runs as a single binary with a single database file. Docker images are now available for Linux AMD64, ARM64, ARMv7, and 386. Run Dnote on Raspberry Pi, ARM servers, and other platforms. The server also officially supports FreeBSD AMD64, expanding deployment options for BSD users.

User management is now built into the server CLI with the `dnote-server user` subcommand for creating, removing, and managing users. Docker healthcheck support improves container orchestration. Client rate limiting helps prevent server overload. Also, in keeping with Dnote's guiding principle of openness, Dnote is now licensed under more permissive Apache 2.0.

## Migrating from 2.x to 3.0

Users running 2.x should migrate to 3.0 using the [pg2sqlite](https://github.com/dnote/pg2sqlite) migration tool:

```bash
# Migrate your database
dnote-pg2sqlite \
  --pg-host localhost \
  --pg-port 5432 \
  --pg-database dnote \
  --pg-user dnote \
  --pg-password yourpassword \
  --sqlite-path ~/.local/share/dnote/server.db
```

For detailed instructions, see the [pg2sqlite documentation](https://github.com/dnote/pg2sqlite).
