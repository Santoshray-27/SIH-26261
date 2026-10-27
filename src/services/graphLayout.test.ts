import { describe, it, expect } from 'vitest';
import { computeGraphLayout, GraphNode, GraphEdge } from './graphLayout';

describe('computeGraphLayout', () => {
  const testNodes: GraphNode[] = [
    {
      id: 'INST-8801',
      nameEn: 'Sri Vidya Institute of Technology',
      nameHi: 'श्री विद्या प्रौद्योगिकी संस्थान',
      subEn: 'APP-2026-8801',
      subHi: 'आवेदन-2026-8801',
      type: 'INSTITUTION',
      radius: 40,
      source: 'LIVE',
      laneX: 0.15,
      laneY: 0.45,
    },
    {
      id: 'DOC-LAND',
      nameEn: 'Land Title Deed',
      nameHi: 'भूमि स्वामित्व विलेख',
      subEn: 'SHA: d7a8fb...e592',
      subHi: 'हैश: d7a8fb...e592',
      type: 'DOCUMENT',
      radius: 34,
      source: 'LIVE',
      laneX: 0.5,
      laneY: 0.25,
    },
    {
      id: 'INST-8808',
      nameEn: 'Thar Institute of Engineering',
      nameHi: 'थार अभियांत्रिकी संस्थान',
      subEn: 'APP-2026-8808',
      subHi: 'आवेदन-2026-8808',
      type: 'INSTITUTION',
      radius: 40,
      source: 'SIMULATED',
      laneX: 0.85,
      laneY: 0.45,
    },
    {
      id: 'PERSON-RAO',
      nameEn: 'Dr. Chandrasekhar Rao',
      nameHi: 'डॉ. चंद्रशेखर राव',
      subEn: 'Authorized Signatory',
      subHi: 'अधिकृत हस्ताक्षरकर्ता',
      type: 'SIGNATORY',
      radius: 30,
      source: 'SANDBOX',
      laneX: 0.2,
      laneY: 0.85,
    },
    {
      id: 'INST-8803',
      nameEn: 'Deccan Institute of Pharmacy',
      nameHi: 'डेक्कन फार्मेसी संस्थान',
      subEn: 'APP-2026-8803',
      subHi: 'आवेदन-2026-8803',
      type: 'INSTITUTION',
      radius: 38,
      source: 'SIMULATED',
      laneX: 0.65,
      laneY: 0.85,
    },
    {
      id: 'DOC-NOC',
      nameEn: 'State Govt NOC',
      nameHi: 'राज्य सरकार अनापत्ति प्रमाण-पत्र',
      subEn: 'Affiliation Valid',
      subHi: 'संबद्धता वैध',
      type: 'DOCUMENT',
      radius: 32,
      source: 'LIVE',
      laneX: 0.5,
      laneY: 0.05,
    },
  ];

  const testEdges: GraphEdge[] = [
    {
      id: 'E-COLLISION',
      source: 'INST-8801',
      target: 'DOC-LAND',
      pattern: 'dashed',
      status: 'DEFICIENCY',
      labelEn: 'Byte-Identical Match',
      labelHi: 'बाइट-समान मिलान',
      reasonEn: 'Exact SHA-256 match found on title deed',
      reasonHi: 'स्वामित्व विलेख पर सटीक SHA-256 मिलान पाया गया',
    },
    {
      id: 'E-THAR',
      source: 'INST-8808',
      target: 'DOC-LAND',
      pattern: 'dashed',
      status: 'DEFICIENCY',
      labelEn: 'Byte-Identical Collision',
      labelHi: 'बाइट-समान टकराव',
      reasonEn: 'Survey Number 142/B cross-referenced',
      reasonHi: 'सर्वेक्षण संख्या 142/बी संदर्भित',
    },
  ];

  const viewports = [
    { name: 'mobile', width: 360, height: 420 },
    { name: 'tablet', width: 768, height: 500 },
    { name: 'desktop-1280', width: 850, height: 540 },
    { name: 'desktop-1920', width: 1200, height: 600 },
  ];

  for (const vp of viewports) {
    it(`should compute deterministic bounds-compliant layout for ${vp.name}`, () => {
      const { positionedNodes, positionedEdges } = computeGraphLayout(testNodes, testEdges, {
        width: vp.width,
        height: vp.height,
        padding: 30,
      });

      expect(positionedNodes).toHaveLength(testNodes.length);
      expect(positionedEdges).toHaveLength(testEdges.length);

      // Verify all nodes remain strictly within canvas padding bounds
      for (const node of positionedNodes) {
        expect(node.x).toBeGreaterThanOrEqual(15);
        expect(node.x).toBeLessThanOrEqual(vp.width - 15);
        expect(node.y).toBeGreaterThanOrEqual(15);
        expect(node.y).toBeLessThanOrEqual(vp.height - 15);
      }

      // Verify no center-to-center collision between any two nodes
      for (let i = 0; i < positionedNodes.length; i++) {
        for (let j = i + 1; j < positionedNodes.length; j++) {
          const dx = positionedNodes[i].x - positionedNodes[j].x;
          const dy = positionedNodes[i].y - positionedNodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minRequired = positionedNodes[i].radius + positionedNodes[j].radius;
          expect(distance).toBeGreaterThanOrEqual(minRequired);
        }
      }
    });
  }
});
