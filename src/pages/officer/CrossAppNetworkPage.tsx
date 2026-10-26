import React, { useState } from 'react';
import {
  Network,
  AlertTriangle,
  Info,
} from 'lucide-react';

interface OverlapCandidate {
  id: string;
  sourceInstitution: string;
  targetInstitution: string;
  overlapType: 'BYTE_IDENTICAL_DOCUMENT' | 'DEVIATING_SIGNATORY_PROFILE' | 'REGISTERED_ADDRESS';
  featureScore: number;
  matchFeatures: string[];
  status: 'PENDING_REVIEW' | 'FLAGGED_VIGILANCE';
}

export const CrossAppNetworkPage: React.FC = () => {
  const [, setSelectedNode] = useState<string>('INST-8801');

  const overlapCandidates: OverlapCandidate[] = [
    {
      id: 'OVL-01',
      sourceInstitution: 'Sri Vidya Institute of Technology (APP-2026-8801)',
      targetInstitution: 'Thar Institute of Engineering (APP-2026-8808)',
      overlapType: 'BYTE_IDENTICAL_DOCUMENT',
      featureScore: 1.0,
      matchFeatures: [
        'Exact SHA-256 Byte Match on Land_Title_Deed_Copy.pdf (d7a8fb...e592)',
        'Survey Number 142/B cross-referenced in separate state revenue circles',
      ],
      status: 'FLAGGED_VIGILANCE',
    },
    {
      id: 'OVL-02',
      sourceInstitution: 'Sri Vidya Institute of Technology (APP-2026-8801)',
      targetInstitution: 'Deccan Institute of Pharmacy (APP-2026-8803)',
      overlapType: 'DEVIATING_SIGNATORY_PROFILE',
      featureScore: 0.88,
      matchFeatures: [
        'Matching Authorized Signatory Name: Dr. Chandrasekhar Rao',
        'Distinct Tax Identifiers (PAN/GSTIN) across deponents',
      ],
      status: 'PENDING_REVIEW',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0E] text-[#EDE7DA] p-6 lg:p-10 space-y-6 font-sans select-none">
      {/* Editorial Header with Required Copy Banner */}
      <div className="border-b border-white/10 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-ochre uppercase tracking-wider mb-1">
            <Network className="w-4 h-4" />
            <span>Cross-Application Graph Analytics</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-serif font-black tracking-tight text-white">
            Institution & Document Entity Network
          </h1>
          <p className="text-xs font-mono text-slate mt-1 max-w-2xl">
            Detects multi-year entity overlaps, shared deponents, and document collisions across institutions.
          </p>
        </div>

        {/* MANDATORY COPY RULE BANNER */}
        <div className="px-3.5 py-1.5 bg-ochre/15 border border-ochre/40 text-ochre rounded font-mono text-xs font-bold flex items-center gap-2">
          <Info className="w-4 h-4 flex-shrink-0" />
          <span>Designed now · built in Phase 4</span>
        </div>
      </div>

      {/* Strict Privacy & Governance Banner */}
      <div className="p-4 bg-[#141413] border border-white/10 rounded-md text-xs font-mono text-slate space-y-1">
        <div className="text-white font-bold flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-ochre" />
          <span>Algorithmic Safety & Privacy Boundaries (§14):</span>
        </div>
        <div>
          • <strong className="text-white">Zero Biometrics:</strong> No facial recognition, fingerprint hashes, or biometric identifiers exist anywhere in Pramāṇa.
        </div>
        <div>
          • <strong className="text-white">Never Auto-Merge:</strong> Fuzzy identity matches produce review candidates only and are never merged automatically.
        </div>
      </div>

      {/* Interactive SVG Network Graph (Synthetic) */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-[#141413] border border-white/10 rounded-md p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate border-b border-white/5 pb-2">
            <span>Entity Relationship Graph (Multi-Cycle 2023–2027)</span>
            <span>Click any node to inspect entity metadata</span>
          </div>

          <div className="h-[460px] bg-black/40 rounded border border-white/5 relative overflow-hidden flex items-center justify-center">
            <svg className="w-full h-full">
              {/* Connection Edges */}
              {/* Sri Vidya to Land Deed */}
              <line x1="280" y1="220" x2="440" y2="140" stroke="rgba(214, 54, 31, 0.6)" strokeWidth="2" strokeDasharray="4 2" />
              {/* Thar Institute to Land Deed (COLLISION) */}
              <line x1="600" y1="220" x2="440" y2="140" stroke="rgba(214, 54, 31, 0.6)" strokeWidth="2" strokeDasharray="4 2" />
              {/* Sri Vidya to Dr. Rao */}
              <line x1="280" y1="220" x2="160" y2="340" stroke="rgba(196, 138, 18, 0.5)" strokeWidth="1.5" />
              {/* Deccan Inst to Dr. Rao */}
              <line x1="280" y1="380" x2="160" y2="340" stroke="rgba(196, 138, 18, 0.5)" strokeWidth="1.5" />
              {/* Sri Vidya to Telangana NOC */}
              <line x1="280" y1="220" x2="200" y2="100" stroke="rgba(31, 107, 92, 0.5)" strokeWidth="1.5" />

              {/* Central Collision Edge Callout */}
              <rect x="370" y="115" width="140" height="20" rx="3" fill="#D6361F" />
              <text x="440" y="129" fill="#FFFFFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                BYTE-IDENTICAL COLLISION
              </text>

              {/* Node 1: Sri Vidya Institute (Hero) */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedNode('INST-8801')}
              >
                <circle cx="280" cy="220" r="32" fill="#1B2A49" stroke="#EDE7DA" strokeWidth="2" />
                <text x="280" y="218" fill="#FFFFFF" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
                  Sri Vidya
                </text>
                <text x="280" y="232" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  APP-8801
                </text>
              </g>

              {/* Node 2: Land Deed Document (Collision Target) */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedNode('DOC-LAND')}
              >
                <circle cx="440" cy="140" r="26" fill="#7F1D1D" stroke="#D6361F" strokeWidth="2" />
                <text x="440" y="138" fill="#FCA5A5" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
                  Land Deed
                </text>
                <text x="440" y="150" fill="#FFFFFF" fontSize="7.5" fontFamily="monospace" textAnchor="middle">
                  d7a8fb...
                </text>
              </g>

              {/* Node 3: Thar Institute */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedNode('INST-8808')}
              >
                <circle cx="600" cy="220" r="28" fill="#1B2A49" stroke="#94A3B8" strokeWidth="1.5" />
                <text x="600" y="218" fill="#FFFFFF" fontSize="9.5" fontFamily="sans-serif" textAnchor="middle">
                  Thar Inst
                </text>
                <text x="600" y="230" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  APP-8808
                </text>
              </g>

              {/* Node 4: Common Signatory Dr. Rao */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedNode('PERSON-RAO')}
              >
                <circle cx="160" cy="340" r="24" fill="#2E230D" stroke="#C48A12" strokeWidth="1.5" />
                <text x="160" y="338" fill="#FDE68A" fontSize="9" fontFamily="sans-serif" textAnchor="middle">
                  Dr. Rao
                </text>
                <text x="160" y="350" fill="#94A3B8" fontSize="7.5" fontFamily="monospace" textAnchor="middle">
                  Signatory
                </text>
              </g>

              {/* Node 5: Deccan Institute */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedNode('INST-8803')}
              >
                <circle cx="280" cy="380" r="24" fill="#1B2A49" stroke="#94A3B8" strokeWidth="1.5" />
                <text x="280" y="378" fill="#FFFFFF" fontSize="9" fontFamily="sans-serif" textAnchor="middle">
                  Deccan Inst
                </text>
                <text x="280" y="390" fill="#94A3B8" fontSize="7.5" fontFamily="monospace" textAnchor="middle">
                  APP-8803
                </text>
              </g>

              {/* Node 6: State NOC Document */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedNode('DOC-NOC')}
              >
                <circle cx="200" cy="100" r="22" fill="#064E3B" stroke="#1F6B5C" strokeWidth="1.5" />
                <text x="200" y="103" fill="#A7F3D0" fontSize="8.5" fontFamily="sans-serif" textAnchor="middle">
                  State NOC
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Overlap Review Candidates (Right 4 cols) */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <div className="text-xs font-mono uppercase text-slate tracking-wider font-bold">
            Identity Overlap Candidates ({overlapCandidates.length})
          </div>

          <div className="space-y-3">
            {overlapCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="p-4 bg-[#141413] border border-white/10 rounded space-y-3 font-mono text-xs"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-ochre font-bold">{candidate.id}</span>
                  <span className="px-2 py-0.5 bg-vermilion/20 border border-vermilion/40 text-vermilion rounded text-[10px] font-bold">
                    {candidate.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-slate text-[10px]">Source:</div>
                  <div className="text-white font-bold">{candidate.sourceInstitution}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-slate text-[10px]">Target Collision:</div>
                  <div className="text-white font-bold">{candidate.targetInstitution}</div>
                </div>

                <div className="p-2.5 bg-black/40 rounded border border-white/5 space-y-1">
                  <div className="text-[10px] uppercase text-ochre">Explained Match Features:</div>
                  {candidate.matchFeatures.map((feat, idx) => (
                    <div key={idx} className="text-[11px] text-slate/90 leading-tight">
                      • {feat}
                    </div>
                  ))}
                </div>

                <div className="text-[10px] text-slate italic pt-1">
                  Fuzzy candidate: requires manual officer review. Automatic merging prohibited.
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
