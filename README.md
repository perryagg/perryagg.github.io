# perryagg.github.io

Static site using **Blind Key Derivation (Double-Hashing)**. Each protected
page is an AES-256-GCM-encrypted JSON payload, fetched and decrypted in the
browser using a SecretKey supplied via the URL hash. The SecretKey never
appears in the public repository — only the SHA-256 of the SecretKey
appears, and only as the filename of an opaque ciphertext blob.

## How It Works

```
User visits  https://yoursite.github.io/#<SecretKey>
                      │
                      ▼
index.html (SPA) reads location.hash → SecretKey
                      │
        ┌─────────────┴─────────────┐
        │                           │
   SHA-256(SecretKey)         AES-256-GCM key
   → storage filename         ← padded/truncated
   data/<hash>.json              UTF-8 bytes
        │                           │
        └─────────────┬─────────────┘
                      │
                      ▼
   fetch ./data/<hash>.json
   decrypt with SecretKey
   innerHTML the plaintext
```

### Why this is safer than a public hash

- **The URL is secret.** The repository only contains `data/<hash>.json`
  filenames. SHA-256 is one-way, so an attacker who browses the repo
  cannot reverse a filename back into the SecretKey.
- **The content is encrypted.** Even if they download every file in
  `data/`, the contents are random ciphertext without the SecretKey.
- **The link form `/#SecretKey` keeps the key client-side only.** The hash
  fragment is never sent to the server, so it never appears in server
  logs, GitHub Pages access logs, or the browser history sent over the
  wire.

## Link Format

| Form | Status |
| --- | --- |
| `yoursite.github.io/#<SecretKey>` | ✅ Supported — opens the matching page |
| `yoursite.github.io/#` (empty) | Shows the access-key prompt |
| `yoursite.github.io/<64-hex>` (legacy) | ❌ Deprecated — `404.html` shows a notice |

## Repository Layout

```
.
├── index.html              # Single SPA loader
├── 404.html                # Notice for legacy direct-hash URLs
├── data/                   # 30 encrypted JSON payloads (public)
│   ├── <sha256>.json
│   └── …
├── scripts/
│   ├── encrypt-pages.js    # Build script: produces data/*.json
│   ├── hash-passwords.js   # Legacy SHA-256 helper (kept for reference)
│   ├── password-verify.js  # Legacy browser verify helper (kept for reference)
│   └── secrets.json        # Build-only sanity map (gitignored)
├── passwords.json          # Public hash inventory (committed)
├── .passwords-plain.json   # Plaintext SecretKeys (gitignored)
├── README.md
└── .gitignore
```

## Build / Update

### Prerequisites
- Node.js (any recent version)

### 1. Edit `.passwords-plain.json`
```json
{
  "entries": [
    { "page": "file-01.html", "password": "alpha-8162-coral" },
    { "page": "file-02.html", "password": "another-secret-key" }
  ]
}
```
The `password` field is the SecretKey.

### 2. Generate encrypted payloads
```bash
node scripts/encrypt-pages.js
```
This writes 30 files into `data/<sha256(secretKey)>.json` and a local
`scripts/secrets.json` sanity map (gitignored).

### 3. Commit and push
```bash
git add data/ passwords.json
git commit -m "Update encrypted payloads"
git push
```

### 4. Distribute the link
Share `https://yoursite.github.io/#<SecretKey>` with the authorized user
out-of-band (Signal, email, etc.). Never commit the SecretKey.

## Security

- **Algorithm:** AES-256-GCM with a fresh random 12-byte IV per file.
- **Key derivation:** `key = utf8(SecretKey).pad(0x30).slice(0, 32)`.
- **Storage hash:** SHA-256 of the SecretKey (hex-encoded) → filename.
- **No secret material in the repo.** Only ciphertext + IV are committed.
- **HTTPS required.** `crypto.subtle` is only available on secure origins
  (GitHub Pages enforces HTTPS).

### Caveats
- This is a static site. The link form `yoursite/#SecretKey` is the only
  secret — anyone who learns the link can read the page. Treat the link
  like a password.
- SHA-256 is fast to brute-force for low-entropy SecretKeys. Use
  high-entropy keys (`word-1234-word` style is fine; dictionary words
  alone are not).
- Once published, an encrypted payload at `data/<hash>.json` is
  effectively immutable. To rotate a SecretKey, change it in
  `.passwords-plain.json`, re-run `encrypt-pages.js`, and share the new
  link. The old filename stays in the repo (it's ciphertext; no harm)
  but the old link will no longer decrypt.

## Local Preview

```bash
npx http-server
# then open http://localhost:8080/#alpha-8162-coral
```

(The exact SecretKey to use is whichever one you put in
`.passwords-plain.json` for `file-01.html`.)
