---
title: Docker Installation
description: Run Dnote server using Docker
weight: 1
---

## Docker compose

Create `compose.yaml`:

```yaml
services:
  dnote:
    image: dnote/dnote:latest
    container_name: dnote
    ports:
      - 3001:3001
    volumes:
      - ./dnote_data:/data
    restart: unless-stopped
```

Start the server:

```bash
docker compose up -d
```

Access at `http://localhost:3001`.

### Configuration

Add environment variables to customize the server:

```yaml
services:
  dnote:
    ...
    environment:
      - WebURL=https://dnote.example.com
      - PORT=3001
      - DisableRegistration=false
```

See [configuration docs](../configuration/) for all options.

### Updating

Pull the latest image and restart the container:

```bash
docker compose pull
docker compose up -d
```


## Docker run

If you prefer to use `docker run` instead of Docker Compose:

```bash
docker run -d \
  --name dnote \
  -p 3001:3001 \
  -v ./dnote_data:/data \
  dnote/dnote:latest
```

## Supported Platforms

The Docker images support the following platforms and architectures:

- **linux/amd64** (x86_64)
- **linux/arm64** (ARM 64-bit)
- **linux/arm/v7** (ARM 32-bit)
- **linux/386** (x86 32-bit)

Docker automatically selects the correct image for your platform.


## Data & Backups

All data is stored in a single SQLite file. No separate database server required. The `./dnote_data:/data` volume mount persists data on your host at `./dnote_data/dnote.db`, so your notes survive container restarts and upgrades.

**Backup:**

```bash
cp ./dnote_data/dnote.db ./backup-$(date +%Y%m%d).db
```

## Connecting CLI to Server

Edit your Dnote CLI config at `$XDG_CONFIG_HOME/dnote/dnoterc` (typically `~/.config/dnote/dnoterc`):

```yaml
apiEndpoint: https://dnote.example.com/api
```

Then log in:

```bash
dnote login
```

See [CLI configuration](../../cli/configuration/) for more details.
