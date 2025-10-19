---
title: CLI Configuration
linkTitle: Configuration
description: Configure your Dnote CLI
weight: 3
---

## Location

Dnote follows the [XDG Base Directory](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html) for organizing configuration and data files.

* **Config file:** `$XDG_CONFIG_HOME/dnote/dnoterc`
* **Database:** `$XDG_DATA_HOME/dnote/dnote.db`

You can customize these locations by setting the `XDG_CONFIG_HOME` and `XDG_DATA_HOME` environment variables. By default they will be under your home directory (`~`).

## Keys

A config file looks like following:

```yaml
editor: vi
apiEndpoint: http://localhost:3001/api
enableUpgradeCheck: true
```

### editor

Text editor for interactive note editing.

* **Default:** `vi`
* **Examples:** `vim`, `nano`, `emacs`, `code --wait`, `subl -w`

### apiEndpoint

Server URL for syncing notes.

* **Default:** `http://localhost:3001/api`

### enableUpgradeCheck

Check for new versions occasionally.

* **Default:** `true`
* **Values:** `true`, `false`
