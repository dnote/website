---
title: Server Configuration
linkTitle: Configuration
description: Configure your Dnote server
weight: 4
---

## Options

Each option can be set via flag or environment variable:

- `--port` / `PORT` - Server port. Default: `3001`
- `--dbPath` / `DBPath` - Database file path. Default: `$XDG_DATA_HOME/dnote/server.db`
- `--disableRegistration` / `DisableRegistration` - Disable user registration. Default: `false`
- `--logLevel` / `LOG_LEVEL` - Log level (`debug`, `info`, `warn`, `error`). Default: `info`
- `--appEnv` / `APP_ENV` - Application environment (`PRODUCTION` or `DEVELOPMENT`). Default: `PRODUCTION`
- `--webUrl` / `WebURL` - Full server URL (no trailing slash). Default: `http://localhost:3001`

## Examples

### Docker Compose

```yaml
environment:
  - PORT=3001
  - DBPath=~/custom.db
  - DisableRegistration=false
  - LOG_LEVEL=debug
  - WebURL=https://dnote.example.com
```

### Systemd

```ini
Environment="PORT=3001"
Environment="DBPath=~/custom.db"
Environment="DisableRegistration=false"
Environment="LOG_LEVEL=debug"
Environment="WebURL=https://dnote.example.com"
```

### Command Line

```bash
dnote-server start \
  --port=3001 \
  --dbPath=/var/lib/dnote/server.db \
  --disableRegistration=true \
  --logLevel=debug \
  --webUrl=https://dnote.example.com
```

## Email (Optional)

Email is not required. Configure SMTP only if you want to send password reset and welcome emails. If not configured, emails will be logged to the console instead. Set the following environment variables:

- `SmtpHost` - SMTP server hostname
- `SmtpPort` - SMTP server port (default: `587`)
- `SmtpUsername` - SMTP username
- `SmtpPassword` - SMTP password
