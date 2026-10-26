import { describe, it, expect } from 'vitest';
import { sanitizeCsvCell, generateCsv } from './csv';

describe('CSV Service & Formula-Injection Neutralization (services/csv.ts)', () => {
  it('neutralizes leading = symbol', () => {
    const malicious = '=cmd|"/C calc"!A0';
    const sanitized = sanitizeCsvCell(malicious);
    expect(sanitized).toBe("\"'=cmd|\"\"/C calc\"\"!A0\"");
    expect(sanitized.startsWith("\"'=")).toBe(true);
  });

  it('neutralizes leading + symbol', () => {
    const malicious = '+1234567';
    const sanitized = sanitizeCsvCell(malicious);
    expect(sanitized).toBe("\"'+1234567\"");
  });

  it('neutralizes leading - symbol', () => {
    const malicious = '-SUM(A1:A10)';
    const sanitized = sanitizeCsvCell(malicious);
    expect(sanitized).toBe("\"'-SUM(A1:A10)\"");
  });

  it('neutralizes leading @ symbol', () => {
    const malicious = '@SUM(A1:A10)';
    const sanitized = sanitizeCsvCell(malicious);
    expect(sanitized).toBe("\"'@SUM(A1:A10)\"");
  });

  it('neutralizes tabs and carriage returns', () => {
    const malicious = '\tALERT(1)';
    const sanitized = sanitizeCsvCell(malicious);
    expect(sanitized.startsWith("\"'\t")).toBe(true);
  });

  it('preserves and escapes normal strings correctly', () => {
    const safe = 'Sri Vidya Institute of Technology, "Hyderabad"';
    const sanitized = sanitizeCsvCell(safe);
    expect(sanitized).toBe('"Sri Vidya Institute of Technology, ""Hyderabad"""');
  });

  it('generates well-formed CSV rows', () => {
    const headers = ['Case ID', 'Institution', 'Status'];
    const rows = [
      ['APP-8801', 'Sri Vidya', 'DEFICIENCY_FOUND'],
      ['APP-8802', '=MaliciousFormula', 'PASS'],
    ];

    const csv = generateCsv(headers, rows);
    expect(csv).toContain('"Case ID","Institution","Status"');
    expect(csv).toContain('"APP-8801","Sri Vidya","DEFICIENCY_FOUND"');
    expect(csv).toContain("\"APP-8802\",\"'=MaliciousFormula\",\"PASS\"");
  });
});
