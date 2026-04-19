/**
 * Normalizes generated JSDoc HTML output to keep repository text English.
 * On some Windows locales JSDoc's timestamp includes a Ukrainian timezone label.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const docsDir = path.join(root, 'docs', 'jsdoc');

if (!fs.existsSync(docsDir)) {
  process.exit(0);
}

const UA_TZ = '(за східноєвропейським літнім часом)';
const EN_TZ = '(Eastern European Summer Time)';

const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;

    const before = fs.readFileSync(full, 'utf8');
    if (!before.includes(UA_TZ)) continue;
    const after = before.split(UA_TZ).join(EN_TZ);
    fs.writeFileSync(full, after, 'utf8');
  }
};

walk(docsDir);
