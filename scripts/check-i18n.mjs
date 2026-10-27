import fs from 'fs';
import path from 'path';

console.log('========================================================================');
console.log(' SAKSHYA-I5 — COMPREHENSIVE I18N PARITY & KEY AUDIT');
console.log('========================================================================');

const localesDir = path.resolve('src/i18n/locales');
const namespaces = fs.readdirSync(path.join(localesDir, 'en')).map(f => f.replace('.json', ''));

let hasError = false;

function flattenKeys(obj, prefix = '') {
  let keys = [];
  for (const k of Object.keys(obj)) {
    const val = obj[k];
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      keys = keys.concat(flattenKeys(val, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

// 1. Check en/hi key parity per namespace
console.log('\n1. Checking EN/HI Key Parity across all namespaces...');
for (const ns of namespaces) {
  const enPath = path.join(localesDir, 'en', `${ns}.json`);
  const hiPath = path.join(localesDir, 'hi', `${ns}.json`);

  if (!fs.existsSync(hiPath)) {
    console.error(`FAIL: Missing Hindi locale file for namespace: ${ns}`);
    hasError = true;
    continue;
  }

  const enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const hiJson = JSON.parse(fs.readFileSync(hiPath, 'utf8'));

  const enKeys = new Set(flattenKeys(enJson));
  const hiKeys = new Set(flattenKeys(hiJson));

  const missingInHi = [...enKeys].filter(k => !hiKeys.has(k));
  const missingInEn = [...hiKeys].filter(k => !enKeys.has(k));

  if (missingInHi.length > 0) {
    console.error(`FAIL [${ns}]: Keys present in EN but missing in HI:`, missingInHi);
    hasError = true;
  }
  if (missingInEn.length > 0) {
    console.error(`FAIL [${ns}]: Keys present in HI but missing in EN:`, missingInEn);
    hasError = true;
  }

  if (missingInHi.length === 0 && missingInEn.length === 0) {
    console.log(`PASS [${ns}]: 100% key parity (${enKeys.size} keys verified)`);
  }
}

if (hasError) {
  console.error('\nI18N AUDIT FAILED! Please fix parity mismatches.');
  process.exit(1);
} else {
  console.log('\n========================================================================');
  console.log('PASS: All namespaces have 100% EN/HI key parity!');
  console.log('========================================================================\n');
}
