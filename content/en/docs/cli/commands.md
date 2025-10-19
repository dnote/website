---
title: CLI Commands
linkTitle: Commands
description: Complete reference for Dnote CLI commands
weight: 2
---

## Core Commands

### Add

Add a new note to a book. Opens your configured editor if no content is provided.

**Aliases:** `a`, `n`, `new`

```bash
dnote add <book>
dnote add <book> -c "content"
```

**Options:**
- `-c, --content` - Provide note content directly without opening editor

**Examples:**

```bash
# Open editor
dnote add docker

# Direct content
dnote add docker -c "docker system prune removes unused data"
```

**Stdin Support:**

You can pipe content directly from stdin, useful for capturing command output:

```bash
# Pipe from echo
echo "useful command" | dnote add cli

# Capture command output
docker images | dnote add docker

# Heredoc
dnote add git << EOF
Common Git commands:
- git status
- git log --oneline
EOF
```

### View

List books or notes, or view a specific note.

**Alias:** `v`

```bash
dnote view                    # List all books
dnote view <book>             # List notes in a book
dnote view <book> <index>     # View a specific note
```

**Options:**
- `--name-only` - Print book names only (when listing books)
- `--content-only` - Print note content only (when viewing a note)

**Examples:**

```bash
# List all books
dnote view

# List notes in docker book
dnote view docker

# View first note in docker book
dnote view docker 1
```

### Edit

Edit a note or rename a book. Opens your configured editor by default.

**Alias:** `e`

```bash
dnote edit <note-id>
dnote edit <book>
```

**Options:**
- `-c, --content` - Set note content without opening editor
- `-b, --book` - Move note to a different book
- `-n, --name` - Rename a book without opening editor

**Examples:**

```bash
# Edit note with ID 3
dnote edit 3

# Update note content directly
dnote edit 3 -c "new content"

# Move note to different book
dnote edit 3 -b linux

# Rename a book
dnote edit javascript -n js
```

### Remove

Remove a note or an entire book.

**Aliases:** `rm`, `d`, `delete`

```bash
dnote remove <note-id>
dnote remove <book>
```

**Options:**
- `-y, --yes` - Skip confirmation prompts (non-interactive mode)

**Examples:**

```bash
# Remove note by ID
dnote remove 5

# Remove a book
dnote remove javascript

# Remove without confirmation
dnote remove 5 -y
```

### Find

Search notes using full-text search.

**Alias:** `f`

```bash
dnote find <keywords>
```

**Options:**
- `-b, --book` - Search only within a specific book

**Examples:**

```bash
# Search all notes
dnote find "docker prune"

# Search within a book
dnote find "merge sort" -b algorithms
```

## Sync Commands

### Sync

Sync your local notes with a Dnote server (encrypted end-to-end).

**Alias:** `s`

```bash
dnote sync
```

**Options:**
- `-f, --full` - Perform a full sync instead of incremental sync
- `--apiEndpoint` - Override API endpoint (defaults to config value)

**Examples:**

```bash
# Incremental sync (default)
dnote sync

# Full sync
dnote sync --full
```

### Login

Authenticate with a Dnote server to enable syncing.

```bash
dnote login
```

**Options:**
- `-u, --username` - Email address (skip prompt)
- `-p, --password` - Password (skip prompt)
- `--apiEndpoint` - API endpoint to connect to

**Examples:**

```bash
# Interactive (prompts for credentials)
dnote login

# Non-interactive
dnote login -u me@example.com -p mypassword --apiEndpoint https://dnote.example.com/api
```

You'll be prompted for any missing credentials.

### Logout

Log out from the Dnote server and remove stored credentials.

```bash
dnote logout
```

**Options:**
- `--apiEndpoint` - API endpoint to connect to (defaults to config value)

## Utility Commands

### Version

Display the installed Dnote version.

```bash
dnote version
```

### Upgrade

Check if a new version of Dnote is available.

```bash
dnote upgrade
```

This command checks GitHub for the latest release. To upgrade, see the [installation guide](../installation/).

## Global Flags

All commands support the following global flag:

- `--dbPath` - Specify a custom database path (overrides default `~/.local/share/dnote/dnote.db`)

**Example:**

```bash
dnote --dbPath /path/to/custom.db view
dnote --dbPath /tmp/notes.db add docker -c "note content"
```
