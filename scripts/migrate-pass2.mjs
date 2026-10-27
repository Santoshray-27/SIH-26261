import fs from 'fs';
import path from 'path';

const MORE_REPLACEMENTS = [
  { from: /bg-\[#1F2A38\]/g, to: 'bg-st-structure-bg' },
  { from: /border-\[#385B88\]/g, to: 'border-st-structure' },
  { from: /bg-\[#F5F2EB\]/g, to: 'bg-surface-2' },
  { from: /bg-\[#F7F4EC\]/g, to: 'bg-surface' },
  { from: /bg-\[#0B0B0A\]/g, to: 'bg-bg' },
  { from: /bg-\[#1A1A18\]/g, to: 'bg-surface-2' },
  { from: /border-neutral-200/g, to: 'border-border' },
  { from: /border-neutral-300/g, to: 'border-border' },
  { from: /border-neutral-400/g, to: 'border-border' },
  { from: /border-neutral-700/g, to: 'border-border' },
  { from: /border-neutral-800/g, to: 'border-border' },
  { from: /border-neutral-900/g, to: 'border-border-strong' },
  { from: /text-neutral-800/g, to: 'text-text' },
  { from: /text-neutral-900/g, to: 'text-text' },
  { from: /bg-neutral-100/g, to: 'bg-surface-2' },
  { from: /bg-neutral-200/g, to: 'bg-surface-2' },
  { from: /stroke="#1F6B5C"/g, to: 'stroke="var(--st-pass)"' },
  { from: /fill="#1F6B5C"/g, to: 'fill="var(--st-pass)"' },
  { from: /stroke="#D6361F"/g, to: 'stroke="var(--st-deficiency)"' },
  { from: /stroke="#C48A12"/g, to: 'stroke="var(--st-review)"' },
];

function migrate(filePath) {
  if (filePath.endsWith('tokens.css') || filePath.endsWith('check-colors.mjs') || filePath.endsWith('contrast-audit.mjs')) return;
  const ext = path.extname(filePath);
  if (!['.tsx', '.ts', '.css'].includes(ext)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const { from, to } of MORE_REPLACEMENTS) {
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
console.log('Second migration pass complete.');
