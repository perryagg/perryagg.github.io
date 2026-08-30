#!/usr/bin/env node
/**
 * Page Encryptor
 *
 * Usage: node scripts/encrypt-pages.js
 *
 * Reads .passwords-plain.json (gitignored) and produces, for each entry,
 * an encrypted JSON payload in data/<sha256(password)>.json. The payload is
 * the inner HTML of a generic "reveal" page, encrypted with AES-256-GCM
 * using a fresh random 12-byte IV per file. The password itself is the
 * SecretKey — also used by the browser to derive the storage filename
 * (SHA-256) and to decrypt (AES key = UTF-8 bytes of the SecretKey,
 * truncated/padded to 32 bytes).
 *
 * Output:
 *   - data/<sha256(secretKey)>.json  (committed, public)
 *   - scripts/secrets.json           (gitignored, build-only sanity map)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const PLAIN_FILE = path.join(ROOT, '.passwords-plain.json');
const DATA_DIR = path.join(ROOT, 'data');
const SECRETS_FILE = path.join(__dirname, 'secrets.json');

// Generic reveal content — same for every page. (All 30 existing file-XX.html
// had a placeholder "Hello." body, so per-page content is just the page
// number label, which is meaningless to encrypt.)
const REVEAL_HTML = `<main>
  <h2>Welcome</h2>
  <p>This page is unlocked. Your SecretKey is valid.</p>
</main>`;

function sha256(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

// 32-byte AES-256 key derived from arbitrary-length secret:
//   UTF-8 bytes of the secret, padded with '0' or truncated to 32 bytes.
function deriveAesKey(secret) {
  const buf = Buffer.from(secret, 'utf8');
  if (buf.length >= 32) return buf.subarray(0, 32);
  const out = Buffer.alloc(32);
  buf.copy(out);
  out.fill('0'.charCodeAt(0), buf.length);
  return out;
}

function encrypt(secret, plaintext) {
  const key = deriveAesKey(secret);
  const iv = crypto.randomBytes(12); // fresh per file — never reuse (key, iv)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return { iv, ciphertext: Buffer.concat([enc, tag]) };
}

function main() {
  if (!fs.existsSync(PLAIN_FILE)) {
    console.error(`Missing ${PLAIN_FILE}. Create it first (it's gitignored).`);
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(PLAIN_FILE, 'utf8'));
  if (!Array.isArray(data.entries)) {
    console.error('Expected { entries: [...] }');
    process.exit(1);
  }

  fs.mkdirSync(DATA_DIR, { recursive: true });

  const seen = new Set();
  const ivs = new Set();
  const secretsOut = {};

  for (const e of data.entries) {
    const secret = String(e.password || '');
    if (!secret) {
      console.error(`Empty password for ${e.page}; skipping.`);
      continue;
    }
    const hash = sha256(secret);
    if (seen.has(hash)) {
      console.error(`Duplicate SecretKey hash for ${e.page} (collision with prior entry). Aborting.`);
      process.exit(1);
    }
    seen.add(hash);

    const { iv, ciphertext } = encrypt(secret, REVEAL_HTML);
    const ivHex = iv.toString('hex');
    if (ivs.has(ivHex)) {
      console.error(`IV reuse detected for ${e.page} — random source broken?`);
      process.exit(1);
    }
    ivs.add(ivHex);

    const payload = {
      v: 1,
      alg: 'AES-256-GCM',
      iv: ivHex,
      ct: ciphertext.toString('base64'),
    };
    const outPath = path.join(DATA_DIR, `${hash}.json`);
    fs.writeFileSync(outPath, JSON.stringify(payload));
    secretsOut[hash] = secret;
    console.log(`Encrypted ${e.page} -> data/${hash}.json`);
  }

  // Sanity map: filename -> secret. Local-only, gitignored.
  fs.writeFileSync(SECRETS_FILE, JSON.stringify(secretsOut, null, 2) + '\n');
  console.log(`\nWrote ${seen.size} encrypted payloads.`);
  console.log(`Local sanity map: ${path.relative(ROOT, SECRETS_FILE)} (gitignored).`);
}

main();
