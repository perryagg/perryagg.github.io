#!/usr/bin/env node
/**
 * Update HTML files to use hashed password verification
 * Replaces plain-text password with SHA-256 hash verification
 */

const fs = require('fs');
const path = require('path');

const PAGES = [
  { num: '01', password: 'alpha-4827-quasar' },
  { num: '02', password: 'bravo-9153-tundra' },
  { num: '03', password: 'cipher-2604-ember' },
  { num: '04', password: 'delta-7381-river' },
  { num: '05', password: 'echo-5096-canyon' },
  { num: '06', password: 'falcon-1247-meadow' },
  { num: '07', password: 'golf-8653-storm' },
  { num: '08', password: 'harbor-3419-arctic' },
  { num: '09', password: 'iris-6028-sunset' },
  { num: '10', password: 'jaguar-1594-forest' },
  { num: '11', password: 'kilo-4872-velvet' },
  { num: '12', password: 'lima-7305-harbor' },
  { num: '13', password: 'meteor-2168-cobalt' },
  { num: '14', password: 'nova-8941-flame' },
  { num: '15', password: 'oscar-3726-winter' },
  { num: '16', password: 'panther-6519-summit' },
  { num: '17', password: 'quartz-9284-breeze' },
  { num: '18', password: 'raven-2837-crystal' },
  { num: '19', password: 'summit-5461-garden' },
  { num: '20', password: 'tundra-7092-cosmic' },
  { num: '21', password: 'ultra-1358-walnut' },
  { num: '22', password: 'vortex-4823-amber' },
  { num: '23', password: 'willow-8671-crimson' },
  { num: '24', password: 'xenon-2946-sapphire' },
  { num: '25', password: 'yonder-6517-cedar' },
  { num: '26', password: 'zenith-9285-magnolia' },
  { num: '27', password: 'apex-3694-thunder' },
  { num: '28', password: 'bramble-7528-harvest' },
  { num: '29', password: 'cobalt-1846-starlight' },
  { num: '30', password: 'drift-9073-cascade' }
];

function hashPassword(password) {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(password, 'utf8').digest('hex');
}

PAGES.forEach(({ num, password }) => {
  const filename = `file-${num}.html`;
  const filepath = path.join(__dirname, '..', filename);
  
  if (!fs.existsSync(filepath)) {
    console.warn(`Warning: ${filename} not found, skipping`);
    return;
  }
  
  let content = fs.readFileSync(filepath, 'utf8');
  const hash = hashPassword(password);
  
  // Replace the PASSWORD variable with the hash
  const oldPattern = new RegExp(`var PASSWORD = "[^"]+";`);
  const newCode = `var PASSWORD_HASH = "${hash}";`;
  
  if (!oldPattern.test(content)) {
    console.warn(`Warning: Could not find PASSWORD variable in ${filename}`);
    return;
  }
  
  content = content.replace(oldPattern, newCode);
  
  // Update the tryUnlock function to use hash comparison
  const oldUnlockPattern = /function tryUnlock\(\) \{[\s\S]*?\}\s*\n\s*unlockBtn\.addEventListener/;
  const newUnlockCode = `function tryUnlock() {
      var input = pw.value;
      crypto.subtle.digest("SHA-256", new TextEncoder().encode(input)).then(function(hashBuffer) {
        var hashArray = Array.from(new Uint8Array(hashBuffer));
        var inputHash = hashArray.map(function(b) { return b.toString(16).padStart(2, "0"); }).join("");
        if (inputHash === PASSWORD_HASH) {
          msg.textContent = "";
          msg.className = "msg";
          gate.style.display = "none";
          reveal.classList.add("open");
        } else {
          msg.textContent = "Incorrect password. Please try again.";
          msg.className = "msg error";
          pw.select();
        }
      });
    }

    unlockBtn.addEventListener("click", tryUnlock);`;
  
  content = content.replace(oldUnlockPattern, newUnlockCode);
  
  fs.writeFileSync(filepath, content);
  console.log(`✓ Updated ${filename} with hash: ${hash.substring(0, 16)}...`);
});

console.log('\n✓ All files updated successfully!');
