---
title: "State-Based Synchronization"
date: 2018-12-10
slug: state-based-sync
description: "Faster and more stable sync using state-based approach instead of transaction logs."
---

Synchronization is now faster and more stable in v0.4.9 by switching from transaction logs to state-based sync.

The previous log-based system tracked all user actions with timestamps. This created complex dependencies between actions - for example, handling an edit for a note that was already deleted, or processing add/remove actions for the same book in sequence.

The new state-based approach treats the server as the source of truth and replicates it to clients. Resources are tagged with sequence numbers, and clients track the furthest number seen. When syncing, the client pulls unseen changes from the server and uploads changes the server hasn't seen. A full sync option (`dnote sync -f` or `dnote sync --full`) is available to recover from erroneous states by resyncing all data from the server.
