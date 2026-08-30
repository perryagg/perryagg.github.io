# perryagg.github.io

Protected pages with SHA-256 password hashing.

## Password Management

### Setup

Passwords are stored in two files:

1. **`.passwords-plain.json`** - Plain-text passwords (gitignored, never commit!)
2. **`.passwords.json`** - SHA-256 hashed passwords (committed to repo)

### Adding/Updating Passwords

1. Edit `.passwords-plain.json` with your plain-text passwords:
   ```json
   {
     "entries": [
       { "page": "file-01.html", "password": "my-new-password" },
       { "page": "file-02.html", "password": "another-password" }
     ]
   }
   ```

2. Generate hashes by running:
   ```bash
   node scripts/hash-passwords.js
   ```

3. Commit the updated `.passwords.json` file:
   ```bash
   git add .passwords.json
   git commit -m "Update password hashes"
   ```

### Security Notes

- ⚠️ **Never commit** `.passwords-plain.json` - it's in `.gitignore`
- Passwords are hashed using SHA-256 before storage
- The hashed file can be safely committed to the repository
- Keep `.passwords-plain.json` secure and backed up separately

## Scripts

- `node scripts/hash-passwords.js` - Convert plain-text passwords to SHA-256 hashes
- `node scripts/update-html-files.js` - Update HTML files with new password hashes
- `node scripts/fix-files.js` - Fix syntax errors in HTML files

## How It Works

1. Users enter passwords on protected pages
2. The entered password is hashed using SHA-256 (via Web Crypto API)
3. The hash is compared against the stored hash in `.passwords.json`
4. Access is granted only if the hashes match

This ensures plain-text passwords are never stored in the repository.