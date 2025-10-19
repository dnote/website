---
title: Autocomplete
description: Enable tab completion for Dnote commands
weight: 4
---

Dnote supports shell autocomplete for commands and book names, making it faster to work with your notes.

## Bash

Download the completion script:

```bash
curl -o ~/.dnote-completion.bash https://raw.githubusercontent.com/dnote/dnote/master/pkg/cli/dnote-completion.bash
```

Add to your `~/.bashrc`:

```bash
source ~/.dnote-completion.bash
```

Reload your shell:

```bash
source ~/.bashrc
```

## Zsh

### Oh My Zsh

If you use [Oh My Zsh](https://ohmyz.sh/), Dnote completion is already included. Simply add `dnote` to your plugins in `~/.zshrc`:

```bash
plugins=(git dnote ...)
```

Reload your shell:

```bash
source ~/.zshrc
```

### Vanila Zsh

Download the completion script:

```bash
curl -o ~/.dnote-completion.bash https://raw.githubusercontent.com/dnote/dnote/master/pkg/cli/dnote-completion.bash
```

Add to your `~/.zshrc`:

```bash
autoload -U +X compinit && compinit
autoload -U +X bashcompinit && bashcompinit
source ~/.dnote-completion.bash
```

Reload your shell:

```bash
source ~/.zshrc
```


## Usage

Once configured, you can use Tab to autocomplete commands and book names:

```bash
$ dnote v j<hit tab>
$ dnote v javascript
# Lists all notes in the javascript book
```

Autocomplete works with:
- **Command aliases** - `v` expands to `view`
- **Partial book names** - `j` completes to `javascript`
- **Multiple books** - If multiple books match, Tab shows all options
