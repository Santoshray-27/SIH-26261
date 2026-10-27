import fs from 'fs';
import path from 'path';

const PASS3_REPLACEMENTS = [
  { from: /bg-\[#FAF7F2\]/g, to: 'bg-bg' },
  { from: /text-\[#FAF7F2\]/g, to: 'text-bg' },
  { from: /bg-\[#0C0C0B\]/g, to: 'bg-text' },
  { from: /bg-\[#22221F\]/g, to: 'bg-surface-2' },
  { from: /bg-neutral-50/g, to: 'bg-surface-2' },
  { from: /text-neutral-700/g, to: 'text-text-muted' },
  { from: /border-neutral-600/g, to: 'border-border-strong' },
  { from: /bg-red-50\/20/g, to: 'bg-st-deficiency-bg' },
  { from: /bg-red-50/g, to: 'bg-st-deficiency-bg' },
  { from: /border-red-200/g, to: 'border-st-deficiency' },
  { from: /border-red-300/g, to: 'border-st-deficiency' },
  { from: /text-red-600/g, to: 'text-st-deficiency' },
  { from: /text-red-700/g, to: 'text-st-deficiency' },
  { from: /bg-green-50/g, to: 'bg-st-pass-bg' },
  { from: /text-green-700/g, to: 'text-st-pass' },
  { from: /bg-amber-50/g, to: 'bg-st-review-bg' },
  { from: /text-amber-700/g, to: 'text-st-review' },
  { from: /border-amber-200/g, to: 'border-st-review' },
  { from: /bg-blue-50/g, to: 'bg-st-structure-bg' },
  { from: /text-blue-700/g, to: 'text-st-structure' },
  { from: /bg-blue-900\/20/g, to: 'bg-st-structure-bg' },
  { from: /text-blue-400/g, to: 'text-st-structure' },
];

function migrate(filePath) {
  if (filePath.endsWith('tokens.css') || filePath.endsWith('check-colors.mjs') || filePath.endsWith('contrast-audit.mjs') || filePath.endsWith('FloorplanMeasureTool.tsx')) return;
  const ext = path.extname(filePath);
  if (!['.tsx', '.ts', '.css'].includes(ext)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const { from, to } of PASS3_REPLACEMENTS) {
    content = content.replace(from, to);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${path.relative(process.cwd(), filePath)}`);
  }
}

function traverse(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      traverse(full);
    } else {
      migrate(full);
    }
  }
}

traverse(path.resolve('src'));
console.log('Third migration pass complete.');
