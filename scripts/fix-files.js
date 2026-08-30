#!/usr/bin/env node
/**
 * Fix syntax error in HTML files
 * Removes duplicate event listener registration
 */

const fs = require('fs');
const path = require('path');

for (let i = 2; i <= 30; i++) {
  const num = String(i).padStart(2, '0');
  const filename = `file-${num}.html`;
  const filepath = path.join(__dirname, '..', filename);
  
  if (!fs.existsSync(filepath)) continue;
  
  let content = fs.readFileSync(filepath, 'utf8');
  const broken = 'unlockBtn.addEventListener("click", tryUnlock);("click", tryUnlock);';
  const fixed = 'unlockBtn.addEventListener("click", tryUnlock);';
  
  if (content.includes(broken)) {
    content = content.replace(broken, fixed);
    fs.writeFileSync(filepath, content);
    console.log(`✓ Fixed ${filename}`);
  } else {
    console.log(`- ${filename} already clean`);
  }
}
console.log('\nDone.');
