/**
 * Password verification utility for browser
 * Uses SHA-256 hashing via Web Crypto API
 */

// Hash a password using SHA-256
async function hashPassword(userInput) {
  const encoder = new TextEncoder();
  const data = encoder.encode(userInput);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hexHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hexHash;
}

// Verify password against stored hash
async function verifyPassword(inputPassword, storedHash) {
  const inputHash = await hashPassword(inputPassword);
  return inputHash === storedHash;
}

// Load hashed passwords from .passwords.json
async function loadPasswordHashes() {
  try {
    const response = await fetch('.passwords.json');
    if (!response.ok) {
      throw new Error('Failed to load password hashes');
    }
    const data = await response.json();
    
    // Create a map of page -> hash
    const passwordMap = {};
    data.entries.forEach(entry => {
      passwordMap[entry.page] = entry.hash;
    });
    
    return passwordMap;
  } catch (error) {
    console.error('Error loading password hashes:', error);
    return {};
  }
}

// Check password for a specific page
async function checkPagePassword(pageUrl, inputPassword) {
  const passwordHashes = await loadPasswordHashes();
  const storedHash = passwordHashes[pageUrl];
  
  if (!storedHash) {
    console.warn(`No password hash found for ${pageUrl}`);
    return false;
  }
  
  return await verifyPassword(inputPassword, storedHash);
}
