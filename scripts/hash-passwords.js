#!/usr/bin/env node
/**
 * Password Hash Generator
 *
 * Usage: node scripts/hash-passwords.js [password-file]
 *
 * Reads plain-text passwords from a JSON file and generates SHA-256 hashes
 * that the protected pages (file-XX.html) read at runtime from .passwords.json.
 *
 * The password file format:
 * {
 *   "entries": [
 *     { "page": "file-01.html", "password": "my-secret-password" },
 *     ...
 *   ]
 * }
 *
 * Output: Writes .passwords.json with hashed values.
 *         Does NOT touch any HTML file — the pages fetch .passwords.json themselves.
 */

const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// Default password file (plain text, gitignored)
const DEFAULT_PASSWORD_FILE = '.passwords-plain.json';
const HASHED_PASSWORD_FILE = '.passwords.json';

/**
 * Hash a password using SHA-256
 * @param {string} password 
 * @returns {string} Hex-encoded hash
 */
function hashPassword(password) {
  return crypto.createHash('sha256').update(password, 'utf8').digest('hex');
}

/**
 * Main function
 */
function main() {
  const passwordFile = process.argv[2] || DEFAULT_PASSWORD_FILE;
  const passwordPath = path.join(__dirname, '..', passwordFile);
  const outputPath = path.join(__dirname, '..', HASHED_PASSWORD_FILE);

  // Check if password file exists
  if (!fs.existsSync(passwordPath)) {
    console.error(`Error: Password file not found: ${passwordPath}`);
    console.error(`Create a password file with plain-text passwords first.`);
    process.exit(1);
  }

  // Read plain-text passwords
  const passwordData = JSON.parse(fs.readFileSync(passwordPath, 'utf8'));
  
  if (!passwordData.entries || !Array.isArray(passwordData.entries)) {
    console.error('Error: Invalid password file format. Expected { "entries": [...] }');
    process.exit(1);
  }

  // Generate hashes
  const hashedEntries = passwordData.entries.map(entry => {
    if (!entry.page || !entry.password) {
      console.error(`Error: Missing page or password for entry: ${JSON.stringify(entry)}`);
      process.exit(1);
    }
    
    const hash = hashPassword(entry.password);
    console.log(`Hashed password for ${entry.page}: ${hash}`);
    
    return {
      page: entry.page,
      hash: hash
    };
  });

  // Write hashed passwords to .passwords.json
  const outputData = {
    version: '1.0',
    algorithm: 'SHA-256',
    entries: hashedEntries
  };

  fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2) + '\n');
  console.log(`\n✓ Successfully wrote hashed passwords to ${HASHED_PASSWORD_FILE}`);
  console.log(`  Remember: ${passwordFile} should never be committed to git!`);
  console.log(`  Commit .passwords.json only — the HTML files fetch it at runtime.`);
}

main();
