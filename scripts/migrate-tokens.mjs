import fs from 'fs';
import path from 'path';

// Replacement map from old direct hex and tailwind classes to semantic token classes
const REPLACEMENTS = [
  // Direct dark background tokens
  { from: /bg-\[#141413\]/g, to: 'bg-surface' },
  { from: /bg-\[#171715\]/g, to: 'bg-surface-2' },
  { from: /bg-\[#181816\]/g, to: 'bg-surface-2' },
  { from: /bg-\[#1F1B12\]/g, to: 'bg-surface-2' },
  { from: /bg-\[#102B24\]/g, to: 'bg-st-pass-bg' },
  { from: /bg-\[#30130F\]/g, to: 'bg-st-deficiency-bg' },
  { from: /bg-\[#2B2109\]/g, to: 'bg-st-review-bg' },
  { from: /bg-\[#1F6B5C\]/g, to: 'bg-st-pass' },
  { from: /bg-\[#D6361F\]/g, to: 'bg-st-deficiency' },
  { from: /bg-\[#C48A12\]/g, to: 'bg-st-review' },
  { from: /bg-\[#1B2A49\]/g, to: 'bg-st-structure' },
  { from: /bg-\[#FDF5E3\]/g, to: 'bg-st-review-bg' },
  { from: /bg-\[#E5F3F0\]/g, to: 'bg-st-pass-bg' },
  { from: /bg-\[#FDE8E5\]/g, to: 'bg-st-deficiency-bg' },
  { from: /bg-\[#E7ECF7\]/g, to: 'bg-st-structure-bg' },
  { from: /bg-\[#F0F0EE\]/g, to: 'bg-st-unavailable-bg' },

  // Text hex tokens
  { from: /text-\[#EDE7DA\]/g, to: 'text-text' },
  { from: /text-\[#0C0C0B\]/g, to: 'text-text' },
  { from: /text-\[#1F6B5C\]/g, to: 'text-st-pass' },
  { from: /text-\[#D6361F\]/g, to: 'text-st-deficiency' },
  { from: /text-\[#C48A12\]/g, to: 'text-st-review' },
  { from: /text-\[#926405\]/g, to: 'text-st-review' },
  { from: /text-\[#1B2A49\]/g, to: 'text-st-structure' },
  { from: /text-\[#6B6B66\]/g, to: 'text-text-muted' },
  { from: /text-\[#a0a09a\]/g, to: 'text-text-muted' },
  { from: /text-\[#CCCCCC\]/g, to: 'text-text-muted' },

  // Border hex tokens
  { from: /border-\[#1F6B5C\]/g, to: 'border-st-pass' },
  { from: /border-\[#D6361F\]/g, to: 'border-st-deficiency' },
  { from: /border-\[#C48A12\]/g, to: 'border-st-review' },
  { from: /border-\[#1B2A49\]/g, to: 'border-st-structure' },
  { from: /border-\[#6B6B66\]/g, to: 'border-st-unavailable' },
  { from: /border-\[#a0a09a\]/g, to: 'border-st-unavailable' },

  // Tailwind neutral/gray/white/black palette conversions
  { from: /\bbg-black\/40\b/g, to: 'bg-surface-2' },
  { from: /\bbg-black\/60\b/g, to: 'bg-surface-2' },
  { from: /\bbg-white\/5\b/g, to: 'bg-surface-2' },
  { from: /\bbg-white\/10\b/g, to: 'bg-surface-2' },
  { from: /\bbg-white\/15\b/g, to: 'bg-surface-2' },
  { from: /\bborder-white\/5\b/g, to: 'border-border' },
  { from: /\bborder-white\/10\b/g, to: 'border-border' },
  { from: /\bborder-white\/15\b/g, to: 'border-border' },
  { from: /\bborder-white\/20\b/g, to: 'border-border' },
  { from: /\bborder-white\/30\b/g, to: 'border-border-strong' },
  { from: /\btext-white\b/g, to: 'text-text' },
  { from: /\btext-black\b/g, to: 'text-text' },
  { from: /\btext-neutral-400\b/g, to: 'text-text-muted' },
  { from: /\btext-neutral-500\b/g, to: 'text-text-muted' },
  { from: /\btext-neutral-600\b/g, to: 'text-text-muted' },
  { from: /\btext-gray-400\b/g, to: 'text-text-muted' },
  { from: /\btext-gray-500\b/g, to: 'text-text-muted' },
  { from: /\bbg-neutral-700\b/g, to: 'bg-surface-2' },
  { from: /\bbg-neutral-800\b/g, to: 'bg-surface-2' },
  { from: /\bbg-neutral-900\b/g, to: 'bg-surface' },
  { from: /\bbg-gray-100\b/g, to: 'bg-surface-2' },
  { from: /\bbg-gray-50\b/g, to: 'bg-surface' },
];

function migrateFile(filePath) {
  if (filePath.endsWith('tokens.css') || filePath.endsWith('check-colors.mjs')) return;
  const ext = path.extname(filePath);
  if (!['.tsx', '.ts', '.css'].includes(ext)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const { from, to } of REPLACEMENTS) {
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
      migrateFile(full);
    }
  }
}

traverse(path.resolve('src'));
console.log('Semantic token migration pass complete.');
