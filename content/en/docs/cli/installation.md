---
title: Installation
description: Install Dnote CLI on your system
weight: 1
---

## Script

Automatically install platform-specific Dnote binary. Supports Linux, macOS, FreeBSD, and Windows:

```bash
curl -s https://www.getdnote.com/install | sh
```

## Homebrew (macOS)

```bash
brew install dnote
```

## Manual Download

Download from [GitHub Releases](https://github.com/dnote/cli/releases) for your platform.

Pre-built binaries are available for:

- **Linux**: amd64, arm64, armv7 (32-bit)
- **macOS**: amd64 (Intel), arm64 (Apple Silicon)
- **Windows**: amd64
- **FreeBSD**: amd64

## Build from Source

Requires Go 1.21+:

```bash
git clone https://github.com/dnote/dnote.git
cd dnote
make version=[latest version] build-cli
sudo cp ./build/dnote /usr/local/bin/
```
