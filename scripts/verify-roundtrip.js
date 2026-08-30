#!/usr/bin/env node
/**
 * Round-trip sanity check: for each entry in scripts/secrets.json, fetch the
 * matching data/<hash>.json and decrypt it. Prints PASS/FAIL.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const SECRETS = path.join(__dirname, 'secrets.json');
const DATA = path.join(ROOT, 'data');

function deriveAesKey(secret) {
  const buf = Buffer.from(secret, 'utf8');
  if (buf.length >= 32) return buf.subarray(0, 32);
  const out = Buffer.alloc(32);
  buf.copy(out);
  out.fill('0'.charCodeAt(0), buf.length);
  return out;
}

const map = JSON.parse(fs.readFileSync(SECRETS, 'utf8'));
let pass = 0, fail = 0;
for (const [hash, secret] of Object.entries(map)) {
  const file = path.join(DATA, `${hash}.json`);
  const payload = JSON.parse(fs.readFileSync(file, 'utf8'));
  const key = deriveAesKey(secret);
  const iv = Buffer.from(payload.iv, 'hex');
  // ct is base64(ciphertext || authtag). GCM tag is last 16 bytes.
  const ctBuf = Buffer.from(payload.ct, 'base64');
  const tag = ctBuf.subarray(ctBuf.length - 16);
  const data = ctBuf.subarray(0, ctBuf.length - 16);
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  try {
    const plain = Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8');
    if (plain.includes('Welcome')) { pass++; console.log(`PASS  ${hash.slice(0, 16)}…`); }
    else { fail++; console.log(`FAIL  ${hash.slice(0, 16)}… unexpected plaintext`); }
  } catch (e) {
    fail++; console.log(`FAIL  ${hash.slice(0, 16)}… ${e.message}`);
  }
}
console.log(`\n${pass} pass, ${fail} fail (out of ${pass + fail})`);
process.exit(fail ? 1 : 0);
