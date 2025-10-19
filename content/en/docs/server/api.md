---
title: API Reference
description: Dnote Server API documentation
weight: 4
---

The Dnote server provides a REST API (v3) for syncing notes and books.

## Base URL

```
https://your-server.com/api/v3
```

## Authentication

### Sign In

Authenticate by signing in to get a session key:

```bash
POST /v3/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-password"
}
```

Example:

```bash
curl -X POST https://your-server.com/api/v3/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"your-password"}'
```

Response:

```json
{
  "key": "your-session-key",
  "expires_at": 1234567890
}
```

Use the session key in subsequent requests:

```bash
Authorization: Bearer your-session-key
```

### Sign Out

End the current session and invalidate the session key.

```bash
POST /v3/signout
```

Example:

```bash
curl -X POST https://your-server.com/api/v3/signout \
  -H "Authorization: Bearer your-session-key"
```

## Notes

### List Notes

Get all notes for the authenticated user.

```bash
GET /v3/notes
```

Query parameters:
- `page` - Page number (default: 1)
- `year` - Filter by year
- `month` - Filter by month (1-12)
- `book` - Filter by book UUID(s)
- `q` - Search query

Example:

```bash
curl -H "Authorization: Bearer your-session-key" \
  https://your-server.com/api/v3/notes?page=1&q=search
```

Response:

```json
{
  "notes": [
    {
      "uuid": "note-uuid",
      "content": "Note content",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z",
      "added_on": 1704067200,
      "public": false,
      "usn": 1,
      "book": {
        "uuid": "book-uuid",
        "label": "javascript"
      },
      "user": {
        "uuid": "user-uuid",
        "name": ""
      }
    }
  ],
  "total": 42
}
```

### Get Note

Retrieve a specific note by UUID.

```bash
GET /v3/notes/{noteUUID}
```

Example:

```bash
curl -H "Authorization: Bearer your-session-key" \
  https://your-server.com/api/v3/notes/note-uuid
```

### Create Note

Create a new note in a book.

```bash
POST /v3/notes
Content-Type: application/json

{
  "book_uuid": "book-uuid",
  "content": "Note content",
  "added_on": 1704067200,
  "edited_on": 1704067200
}
```

Example:

```bash
curl -X POST https://your-server.com/api/v3/notes \
  -H "Authorization: Bearer your-session-key" \
  -H "Content-Type: application/json" \
  -d '{"book_uuid":"book-uuid","content":"Note content"}'
```

### Update Note

Update an existing note. All fields are optional.

```bash
PATCH /v3/notes/{noteUUID}
Content-Type: application/json

{
  "content": "Updated content",
  "book_uuid": "new-book-uuid",
  "public": false
}
```

Example:

```bash
curl -X PATCH https://your-server.com/api/v3/notes/note-uuid \
  -H "Authorization: Bearer your-session-key" \
  -H "Content-Type: application/json" \
  -d '{"content":"Updated content"}'
```

### Delete Note

Delete a note by UUID.

```bash
DELETE /v3/notes/{noteUUID}
```

Example:

```bash
curl -X DELETE https://your-server.com/api/v3/notes/note-uuid \
  -H "Authorization: Bearer your-session-key"
```

## Books

### List Books

Get all books for the authenticated user.

```bash
GET /v3/books
```

Example:

```bash
curl -H "Authorization: Bearer your-session-key" \
  https://your-server.com/api/v3/books
```

Response:

```json
{
  "books": [
    {
      "uuid": "book-uuid",
      "label": "javascript",
      "usn": 1,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Get Book

Retrieve a specific book by UUID.

```bash
GET /v3/books/{bookUUID}
```

Example:

```bash
curl -H "Authorization: Bearer your-session-key" \
  https://your-server.com/api/v3/books/book-uuid
```

### Create Book

Create a new book (notebook/collection).

```bash
POST /v3/books
Content-Type: application/json

{
  "name": "javascript"
}
```

Example:

```bash
curl -X POST https://your-server.com/api/v3/books \
  -H "Authorization: Bearer your-session-key" \
  -H "Content-Type: application/json" \
  -d '{"name":"javascript"}'
```

### Update Book

Rename an existing book.

```bash
PATCH /v3/books/{bookUUID}
Content-Type: application/json

{
  "name": "typescript"
}
```

Example:

```bash
curl -X PATCH https://your-server.com/api/v3/books/book-uuid \
  -H "Authorization: Bearer your-session-key" \
  -H "Content-Type: application/json" \
  -d '{"name":"typescript"}'
```

### Delete Book

Delete a book and all its notes.

```bash
DELETE /v3/books/{bookUUID}
```

Example:

```bash
curl -X DELETE https://your-server.com/api/v3/books/book-uuid \
  -H "Authorization: Bearer your-session-key"
```

## Health

Check if the server is running.

```bash
GET /health
```

Example:

```bash
curl https://your-server.com/health
```

Response:

```
ok
```
