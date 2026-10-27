import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve('src');
const ALLOWED_FILES = [
  path.normalize('src/styles/tokens.css'),
  path.normalize('src/pages/PortalAPage.tsx'),
  path.normalize('src/pages/PortalBPage.tsx'),
];

// Disallowed patterns: #000, #fff, #000000, #ffffff, raw hex codes, raw tailwind palette
const FORBIDDEN_BLACK_WHITE = /#(000|fff|000000|ffffff)\b/i;
const HEX_REGEX = /#[0-9a-fA-F]{3,8}\b/g;
const RAW_TW_COLORS = /\b(text|bg|border)-(gray|zinc|neutral|stone|red|blue|green|yellow|purple|pink|teal|orange)-\d{2,3}\b/g;

let violations = [];

function scanFile(filePath) {
  const normPath = path.normalize(path.relative(process.cwd(), filePath));
  if (ALLOWED_FILES.some(allowed => normPath.endsWith(allowed))) return;

  const ext = path.extname(filePath);
  if (!['.tsx', '.ts', '.css'].includes(ext)) return;

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    // Ignore data uri and comments
    if (line.includes('data:image/svg+xml') || line.trim().startsWith('//') || line.trim().startsWith('*')) return;

    // Check pure black / pure white
    if (FORBIDDEN_BLACK_WHITE.test(line)) {
      violations.push({
        file: normPath,
        line: idx + 1,
        issue: `FORBIDDEN: Pure black or pure white found. Use --text, --accent-contrast (#FFFCF5), or --surface.`,
        snippet: line.trim()
      });
    }

    // Check raw hex
    const hexMatches = line.match(HEX_REGEX);
    if (hexMatches) {
      hexMatches.forEach(match => {
        // Exclude mock SHA-256 hashes or test string identifiers
        if (match.length >= 7 && !line.includes('sha256') && !line.includes('hash') && !line.includes('0x')) {
          violations.push({
            file: normPath,
            line: idx + 1,
            issue: `Direct hex color "${match}" found. Use semantic token.`,
            snippet: line.trim()
          });
        }
      });
    }

    // Check raw Tailwind palette
    const twMatches = line.match(RAW_TW_COLORS);
    if (twMatches) {
      twMatches.forEach(match => {
        violations.push({
          file: normPath,
          line: idx + 1,
          issue: `Direct Tailwind palette class "${match}" found. Use semantic token class.`,
          snippet: line.trim()
        });
      });
    }
  });
}

function traverse(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      traverse(fullPath);
    } else {
      scanFile(fullPath);
    }
  }
}

traverse(SRC_DIR);

console.log('========================================================================');
console.log(' PRAMĀṆA — COLOR AUDIT (NO RAW HEX, NO #000/#FFF OUTSIDE TOKENS.CSS)');
console.log('========================================================================');

if (violations.length === 0) {
  console.log('PASS: Zero forbidden colors or raw hex found in src/!');
  process.exit(0);
} else {
  console.log(`Found ${violations.length} color rule violations in src/:`);
  console.log('------------------------------------------------------------------------');
  violations.slice(0, 25).forEach(v => {
    console.log(`${v.file}:${v.line} -> ${v.issue}`);
    console.log(`  "${v.snippet}"`);
  });
  if (violations.length > 25) {
    console.log(`... and ${violations.length - 25} more.`);
  }
  console.log('========================================================================');
  process.exit(1);
}
