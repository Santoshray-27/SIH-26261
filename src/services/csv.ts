/**
 * CSV export utility with formula injection neutralization (§14).
 * Strips or prefixes cells starting with dangerous characters (=, +, -, @, tab, carriage return).
 */

export function sanitizeCsvCell(cell: any): string {
  if (cell === null || cell === undefined) {
    return '""';
  }

  let str = String(cell);

  // Formula injection dangerous leading characters: =, +, -, @, 0x09 (tab), 0x0D (CR)
  const DANGEROUS_PREFIXES = ['=', '+', '-', '@', '\t', '\r'];
  const firstChar = str.charAt(0);

  if (DANGEROUS_PREFIXES.includes(firstChar)) {
    // Prefix with single quote to neutralize spreadsheet formula interpretation
    str = `'${str}`;
  }

  // Escape internal double quotes
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

export function generateCsv(headers: string[], rows: any[][]): string {
  const headerLine = headers.map(sanitizeCsvCell).join(',');
  const rowLines = rows.map((row) => row.map(sanitizeCsvCell).join(','));
  return [headerLine, ...rowLines].join('\r\n');
}

export function downloadCsvFile(filename: string, csvContent: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
