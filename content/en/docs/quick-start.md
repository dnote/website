---
title: Quick Start
description: Get started with Dnote in minutes
weight: 1
---

## Installation

### Script

Download and install the latest release automatically. It supports Linux, macOS, FreeBSD, and Windows.

```bash
curl -s https://www.getdnote.com/install | sh
```


### Homebrew

If you have Homebrew installed:

```bash
brew install dnote
```

See [installation guide](cli/installation/) for other platforms and methods.

## Basic Usage

Notes are organized in books. Books are created automatically when you add your first note to them.

```bash
# Add a note
dnote add docker -c "Use docker system prune to clean up unused containers and images"

# View notes in a book
dnote view docker

# List all books
dnote view

# Search with full-text search ("cleaning container" finds "clean up...containers")
dnote find "cleaning container"

# Edit a note (opens in your configured editor)
dnote edit docker 1

# Remove a note
dnote remove docker 1

# Remove an entire book
dnote remove docker
```

## Next Steps

- [CLI commands reference](cli/commands/) - Explore all available commands
- [Configuration](cli/configuration/) - Customize your editor and settings
- [Server setup](server/docker/) - Sync notes across devices with your own server
