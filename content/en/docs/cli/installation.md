---
title: Installation
description: Install Dnote CLI on your system
weight: 1
---

## Commands

### Script

Automatically install platform-specific Dnote binary. Supports Linux, macOS, FreeBSD, and Windows:

```bash
curl -s https://www.getdnote.com/install | sh
```

### Homebrew (macOS)

```bash
brew install dnote
```

### Manual Download

Download from [GitHub Releases](https://github.com/dnote/cli/releases) for your platform:

**Windows:**

Download the `.zip` file from the releases page and add to PATH.

### Build from Source

Requires Go 1.21+:

```bash
git clone https://github.com/dnote/dnote.git
cd dnote
make version=[latest version] build-cli
sudo cp ./build/dnote /usr/local/bin/
```
