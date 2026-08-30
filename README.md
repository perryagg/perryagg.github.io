# perryagg.github.io

Static site with 30 password-protected pages using SHA-256 hashing.

## Overview

Each page is gated by its own password. Passwords are stored as SHA-256 hashes — plain-text passwords never appear in the repository.

## How Password Hashing Works

```
User enters password
        ↓
SHA-256 hash in browser (Web Crypto API)
        ↓
Compare against stored hash
        ↓
Grant access if match
```

Plain-text passwords → hashed locally → only hashes are committed.

## Direct Hash URLs

Any 64-character SHA-256 hash in the URL path resolves directly to its page:

```
https://perryagg.github.io/<hash>  →  file-XX.html (password-gated)
```

This works via a `404.html` redirector that:

1. Reads the last path segment from `location.pathname`.
2. Validates it as a 64-char hex string.
3. Looks it up (case-insensitive) in `passwords.json` and redirects to the
   matching `file-XX.html`.

Unknown hashes show a "Hash not recognized" message with a link back to the
index. The redirector is read-only — it does not modify the JSON or any
`file-XX.html` page.

## Setup

### Prerequisites

- Node.js (any recent version)

### Files

| File | Purpose | Committed? |
|------|---------|------------|
| `.passwords-plain.json` | Plain-text passwords (source of truth) | ❌ No (gitignored) |
| `passwords.json` | SHA-256 hashed passwords (read by every page at runtime) | ✅ Yes |
| `file-XX.html` | Protected pages — fetch their hash from `.passwords.json` | ✅ Yes |
| `404.html` | Hash-to-page redirector (see "Direct Hash URLs" above) | ✅ Yes |

## Usage

### 1. Set or change passwords

Edit `.passwords-plain.json`:

```json
{
  "entries": [
    { "page": "file-01.html", "password": "my-secret-password" },
    { "page": "file-02.html", "password": "another-password" }
  ]
}
```

### 2. Generate hashes

```bash
node scripts/hash-passwords.js
```

Output:
```
✓ Successfully wrote hashed passwords to .passwords.json
```

The script only writes `passwords.json` — it does **not** modify any HTML file.
Each `file-XX.html` fetches its own hash from `passwords.json` on page load, keyed
off `location.pathname.split('/').pop()`.

### 3. Commit the change

```bash
git add .passwords.json
git commit -m "Update password hashes"
```

**Never commit** `.passwords-plain.json` — it's already in `.gitignore`.

## Scripts

| Script | Purpose |
|--------|---------|Read `.passwords-plain.json`, write `.passwords.json` with SHA-256 hashds with hashes in HTML |
| `node scripts/fix-files.js` | Fix duplicate event listener syntax errors in HTML files |

## Security

- **Algorithm:** SHA-256 via Web Crypto API (`crypto.subtle.digest`)
- **Hashes stored:** 64-character hex strings in `.passwords.json` and embedded in HTML
- **Plain-text storage:** Only in `.passwords-plain.json` (local, gitignored)
- **Browser-side:** Passwords are hashed in the browser before comp(loaded at runtime by every page)never leaves the user's machine for verification

## Caveats

- This is a static site. The HTML source (including hashes) is publicly visible.
- SHA-256 without salt is fast to brute-force for weak passwords. Use long, high-entropy passwords.
- This scheme is suitable for low-sensitivity distribution (e.g. sharing with a small known group), as noted on the index page.

## Project Structure

```
.
├── index.html              # Landing page with card grid
├── file-01.html            # Protected page (password-gated)
├── file-02.html
├── ...
├── file-30.html
├── .passwords.json         # SHA-256 hashes (committed, read at runtime)
├── .passwords-plain.json   # Plain-text passwords (gitignored)
├── .gitignore
├── README.md
└── scripts/
    └── hash-passwords.js
```