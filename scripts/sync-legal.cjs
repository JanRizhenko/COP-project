/**
 * Copies legal markdown from project root into `public/` so the SPA can fetch them at runtime.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');

const files = ['PRIVACY_POLICY.md', 'USER_GUIDE.md'];

/** Serve MIT text in the built app (`/LICENSE`). */
const licenseSrc = path.join(root, 'LICENSE');
const licenseDest = path.join(publicDir, 'LICENSE');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

for (const name of files) {
  const src = path.join(root, name);
  const dest = path.join(publicDir, name);
  if (!fs.existsSync(src)) {
    console.warn(`[sync-legal] Skip missing: ${name}`);
    continue;
  }
  fs.copyFileSync(src, dest);
  console.log(`[sync-legal] ${name} -> public/${name}`);
}

if (fs.existsSync(licenseSrc)) {
  fs.copyFileSync(licenseSrc, licenseDest);
  console.log('[sync-legal] LICENSE -> public/LICENSE');
}
