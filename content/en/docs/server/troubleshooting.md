---
title: Troubleshooting
description: Common issues and solutions for Dnote server
weight: 10
---

## Server Data Management

### Clearing Server Data

If you need to reset your server data (for example, to start fresh or resolve sync issues), you can directly modify the SQLite database.

**Warning:** These operations are destructive and will permanently delete data. Always create a backup first.

#### Backup First

```bash
# Create a backup
sqlite3 /var/lib/dnote/server.db ".backup /var/lib/dnote/backups/backup-$(date +%Y%m%d-%H%M%S).db"
```

#### Clear All Data for a User

To delete all books and notes for a specific user:

```bash
# Connect to database
sqlite3 /var/lib/dnote/server.db

# Find your user ID
SELECT id, email FROM users;

# Delete all notes and books for user (replace USER_ID with your user ID)
DELETE FROM notes WHERE user_id = USER_ID;
DELETE FROM books WHERE user_id = USER_ID;

# Reset user's sync state to empty
UPDATE users SET max_usn = 0 WHERE id = USER_ID;

# Verify
SELECT COUNT(*) FROM notes WHERE user_id = USER_ID;
SELECT COUNT(*) FROM books WHERE user_id = USER_ID;

# Exit
.quit
```

#### Clear All Data (All Users)

To completely reset the server (useful for testing or fresh start):

```bash
sqlite3 /var/lib/dnote/server.db << EOF
DELETE FROM notes;
DELETE FROM books;
UPDATE users SET max_usn = 0;
VACUUM;
EOF
```

#### After Clearing Server Data

After clearing server data, clients will need to re-sync. The next time a client syncs:

1. The server is now empty (`max_usn = 0`)
2. Clients with local data will be prompted to upload their data
3. Confirm the upload to restore data from that client

**Note:** Only confirm the upload from the client with the data you want to keep. If you have multiple clients, pick one to upload from, then sync the others normally afterward.

## Sync Modes

### Full Sync vs Incremental Sync

Dnote supports two sync modes:

#### Incremental Sync (Default)

The default sync mode. It only syncs changes since your last sync:

```bash
dnote sync
```

**How it works:**
- Downloads only new/changed items from server (based on USN)
- Uploads only local changes (dirty items)
- Fast and efficient for regular use

#### Full Sync

Downloads **all** data from the server and reconciles with local state:

```bash
dnote sync --full
```

**How it works:**
1. Downloads ALL books and notes from server (not just changes)
2. **Cleans up orphaned local data** - deletes local items that don't exist on server (unless they're new/dirty)
3. Merges server data with local data
4. Uploads local changes

**Warning:** Full sync will delete local items that don't exist on server (unless they're new unsynced items). If you have local data you want to keep:
1. Make sure it has been uploaded to the server first, OR

## Sync Issues

#### "Server is empty but you have local data"

This warning appears when:
- Your server's `max_usn` is 0 (empty)
- Your client has previously synced (`last_max_usn > 0`)
- You have local books or notes

**Causes:**
- You switched to a new empty server
- Server data was accidentally deleted
- You're setting up a new server after using a different one

**Solutions:**
- Confirm the upload when prompted to push local data to the empty server

#### Orphaned Notes After Sync

Orphaned notes occur when notes reference non-existent books. This can happen due to sync conflicts or interrupted syncs.

**Check for orphaned notes:**

```bash
sqlite3 ~/.local/share/dnote/dnote.db << EOF
SELECT n.uuid, n.body, n.book_uuid
FROM notes n
WHERE n.deleted = 0
AND n.book_uuid NOT IN (SELECT uuid FROM books WHERE deleted = 0);
EOF
```

**Fix orphaned notes:**

If you find orphaned notes, you can either:

1. Delete them locally and sync:
```bash
sqlite3 ~/.local/share/dnote/dnote.db << EOF
DELETE FROM notes
WHERE deleted = 0
AND book_uuid NOT IN (SELECT uuid FROM books WHERE deleted = 0);
EOF
```

2. Sync again to upload the corrected local state
