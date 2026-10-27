import fs from 'fs';

// WCAG 2.1 relative luminance calculation
function sRGBtoLin(c) {
  const norm = c / 255;
  return norm <= 0.03928 ? norm / 12.92 : Math.pow((norm + 0.055) / 1.055, 2.4);
}

function hexToRgb(hex) {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map(ch => ch + ch).join('');
  }
  const n = parseInt(clean, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function luminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * sRGBtoLin(r) + 0.7152 * sRGBtoLin(g) + 0.0722 * sRGBtoLin(b);
}

function contrast(hex1, hex2) {
  const l1 = luminance(hex1);
  const l2 = luminance(hex2);
  const b = Math.max(l1, l2);
  const d = Math.min(l1, l2);
  return (b + 0.05) / (d + 0.05);
}

const PALETTE = {
  bg: '#F3EDE0',
  bgElevated: '#FAF6EC',
  surface: '#FBF8F0',
  surface2: '#ECE5D4',
  tintTeal: '#DCEAE5',
  tintClay: '#F2DFD0',
  tintIndigo: '#E1E4F2',
  tintOchre: '#F3E7C6',
  text: '#1F2B3D',
  textMuted: '#4A5568',
  textSubtle: '#5F6B7E',
  accent: '#B5432A',
  accent2: '#1C6B6F',
  accentContrast: '#FFFCF5',
  borderControl: '#8B8068',
  focusRing: '#1C6B6F',
  stPass: '#1B6F4F',
  stPassBg: '#E1EFEA',
  stDeficiency: '#B3341C',
  stDeficiencyBg: '#FAE2DD',
  stReview: '#8A5A00',
  stReviewBg: '#F8EDD2',
  stStructure: '#3A4A9C',
  stStructureBg: '#E7EAF7',
  stUnavailable: '#566074',
  stUnavailableBg: '#EAECEF',
};

const checks = [
  // Primary Text on all surfaces & tints
  { name: 'Text on Sandstone BG', fg: PALETTE.text, bg: PALETTE.bg, min: 4.5 },
  { name: 'Text on Surface', fg: PALETTE.text, bg: PALETTE.surface, min: 4.5 },
  { name: 'Text on Surface 2 (Bone)', fg: PALETTE.text, bg: PALETTE.surface2, min: 4.5 },
  { name: 'Text on Tint Teal', fg: PALETTE.text, bg: PALETTE.tintTeal, min: 4.5 },
  { name: 'Text on Tint Clay', fg: PALETTE.text, bg: PALETTE.tintClay, min: 4.5 },
  { name: 'Text on Tint Indigo', fg: PALETTE.text, bg: PALETTE.tintIndigo, min: 4.5 },
  { name: 'Text on Tint Ochre', fg: PALETTE.text, bg: PALETTE.tintOchre, min: 4.5 },

  // Muted Text on surfaces
  { name: 'Muted Text on BG', fg: PALETTE.textMuted, bg: PALETTE.bg, min: 4.5 },
  { name: 'Muted Text on Surface', fg: PALETTE.textMuted, bg: PALETTE.surface, min: 4.5 },
  { name: 'Muted Text on Surface 2', fg: PALETTE.textMuted, bg: PALETTE.surface2, min: 4.5 },

  // Button Contrast
  { name: 'Accent Button Text (White on Terracotta)', fg: PALETTE.accentContrast, bg: PALETTE.accent, min: 4.5 },
  { name: 'Teal Link/Nav on BG', fg: PALETTE.accent2, bg: PALETTE.bg, min: 4.5 },

  // Status Badge Contrast (fg on tinted bg)
  { name: 'Status Pass: FG on Tint BG', fg: PALETTE.stPass, bg: PALETTE.stPassBg, min: 4.5 },
  { name: 'Status Deficiency: FG on Tint BG', fg: PALETTE.stDeficiency, bg: PALETTE.stDeficiencyBg, min: 4.5 },
  { name: 'Status Review: FG on Tint BG', fg: PALETTE.stReview, bg: PALETTE.stReviewBg, min: 4.5 },
  { name: 'Status Structure: FG on Tint BG', fg: PALETTE.stStructure, bg: PALETTE.stStructureBg, min: 4.5 },
  { name: 'Status Unavailable: FG on Tint BG', fg: PALETTE.stUnavailable, bg: PALETTE.stUnavailableBg, min: 4.5 },

  // Non-text UI Contrast (>= 3.0:1)
  { name: 'Control Border on Surface', fg: PALETTE.borderControl, bg: PALETTE.surface, min: 3.0 },
  { name: 'Focus Ring on BG', fg: PALETTE.focusRing, bg: PALETTE.bg, min: 3.0 },
];

console.log('========================================================================');
console.log(' PRAMĀṆA — SANDSTONE & TEAL WCAG AA CONTRAST AUDIT');
console.log('========================================================================');
console.log(
  'Token Pair Name'.padEnd(42) +
  'Ratio'.padEnd(12) +
  'Target'.padEnd(10) +
  'Result'
);
console.log('------------------------------------------------------------------------');

let pass = true;
for (const c of checks) {
  const r = contrast(c.fg, c.bg);
  const ok = r >= c.min;
  if (!ok) pass = false;
  console.log(
    c.name.padEnd(42) +
    r.toFixed(2).padEnd(12) +
    `${c.min}:1`.padEnd(10) +
    (ok ? 'PASS' : 'FAIL')
  );
}

console.log('========================================================================');
if (!pass) {
  console.error('Contrast audit failed! Adjust token values.');
  process.exit(1);
} else {
  console.log('ALL token pairs satisfy WCAG AA contrast standards!');
  process.exit(0);
}
