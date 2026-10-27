import { describe, it, expect } from 'vitest';
import { mockApplications, mockFindings } from './mockData';

describe('Sakshya‑I5 Domain Model & Synthetic Seeds', () => {
  it('contains the Hero case Sri Vidya Institute of Technology matching steps 1-10', () => {
    const hero = mockApplications.find((app) => app.id === 'APP-2026-8801');
    expect(hero).toBeDefined();
    expect(hero?.institutionName).toContain('Sri Vidya Institute of Technology');
    expect(hero?.category).toBe('EXTENSION_OF_APPROVAL');
  });

  it('contains the 8 seeded synthetic cases', () => {
    expect(mockApplications.length).toBe(8);
  });

  it('verifies the Hero case contains all required findings from demo script in v1', () => {
    const heroV1Findings = mockFindings.filter(
      (f) => f.applicationId === 'APP-2026-8801' && (f.applicationVersion === 1 || !f.applicationVersion)
    );
    expect(heroV1Findings.length).toBe(5);

    const statuses = heroV1Findings.map((f) => f.status);
    expect(statuses).toContain('DEFICIENCY_FOUND'); // expired accreditation
    expect(statuses).toContain('MISMATCH_FOUND'); // name mismatch
    expect(statuses).toContain('POSSIBLE_DUPLICATE'); // byte-identical SHA-256
    expect(statuses).toContain('SIGNATURE_VALID'); // valid test signature
    expect(statuses).toContain('SOURCE_UNAVAILABLE'); // simulated external failure
  });
});
