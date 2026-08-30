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

## Setup

### Prerequisites

- Node.js (any recent version)

### Files

| File | Purpose | Committed? |
|------|---------|------------|
| `.passwords-plain.json` | Plain-text passwords (source of truth) | ❌ No (gitignored) |
| `.passwords.json` | SHA-256 hashed passwords | ✅ Yes |
| `file-XX.html` | Protected pages with embedded hash | ✅ Yes |

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

### 2. Generate hashes and update everything

Run a single command — it updates both `.passwords.json` and all HTML files:

```bash
node scripts/hash-passwords.js
```

Output:
```
✓ Successfully wrote hashed passwords to .passwords.json
✓ Updated 30 HTML file(s)
```

### 3. Commit the changes

```bash
git add .passwords.json file-*.html
git commit -m "Update password hashes"
```

**Never commit** `.passwords-plain.json` — it's already in `.gitignore`.

## Scripts

| Script | Purpose |
|--------|---------|
| `node scripts/hash-passwords.js` | Hash passwords and update `.passwords.json` + all HTML files |
| `node scripts/update-html-files.js` | One-time migration: replace plain-text passwords with hashes in HTML |
| `node scripts/fix-files.js` | Fix duplicate event listener syntax errors in HTML files |

## Security

- **Algorithm:** SHA-256 via Web Crypto API (`crypto.subtle.digest`)
- **Hashes stored:** 64-character hex strings in `.passwords.json` and embedded in HTML
- **Plain-text storage:** Only in `.passwords-plain.json` (local, gitignored)
- **Browser-side:** Passwords are hashed in the browser before comparison — plain text never leaves the user's machine for verification

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
├── .passwords.json         # SHA-256 hashes (committed)
├── .passwords-plain.json   # Plain-text passwords (gitignored)
├── .gitignore
├── README.md
└── scripts/
    ├── hash-passwords.js
    ├── update-html-files.js
    └── fix-files.js
```