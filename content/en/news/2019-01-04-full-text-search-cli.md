---
title: "Full-Text Search in CLI"
date: 2019-01-04
slug: full-text-search-cli
description: "Fast full-text search of notes with the new find command in Dnote CLI."
---

The Dnote CLI now supports full-text search with the `find` command (or `f` for short). The search uses SQLite's full-text indexing with stemming support for English - searching for "mesmerize" will also match "mesmerizing" and "mesmerized." Performance is fast even with large note collections. Tests on the Enron Email Dataset with 517,204 documents showed search times under 0.02 seconds for small result sets.

The search performs full-text indexing on all Unicode characters in note bodies, excluding spacing and punctuation. Multiple keywords can be searched using double quotes (e.g., `dnote find "building heap"`). Space characters act as implicit AND operators, matching notes containing all specified terms.

