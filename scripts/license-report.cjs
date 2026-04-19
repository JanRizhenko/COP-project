/**
 * Writes LICENSE-REPORT.md using license-checker (full dependency tree).
 */
const fs = require('fs');
const path = require('path');
const checker = require('license-checker');

const root = path.join(__dirname, '..');
const outPath = path.join(root, 'LICENSE-REPORT.md');

checker.init(
  {
    start: root,
    production: false,
  },
  (err, packages) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    const rows = Object.entries(packages)
      .map(([pkg, meta]) => ({
        pkg,
        license: (meta.licenses || 'UNKNOWN').toString().replace(/\n/g, ' '),
        url: meta.url || '',
        publisher: meta.publisher || '',
      }))
      .sort((a, b) => a.pkg.localeCompare(b.pkg));

    const lines = [
      '# Dependency License Report',
      '',
      'Generated with [`license-checker`](https://www.npmjs.com/package/license-checker) for the full `npm` dependency tree (including dev dependencies).',
      '',
      'Regenerate locally:',
      '',
      '```bash',
      'npm run licenses:report',
      '```',
      '',
      '| Package | License | Repository / URL |',
      '| --- | --- | --- |',
    ];

    for (const r of rows) {
      const safeLic = r.license.replace(/\|/g, '\\|');
      const safeUrl = (r.url || '').replace(/\|/g, '\\|');
      lines.push(`| ${r.pkg} | ${safeLic} | ${safeUrl} |`);
    }

    lines.push('', `*Entries: ${rows.length}.*`);
    fs.writeFileSync(outPath, `${lines.join('\n')}\n`, 'utf8');
    console.log(`[license-report] Wrote ${outPath}`);
  }
);
