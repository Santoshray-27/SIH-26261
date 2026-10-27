import React, { useState } from 'react';
import {
  Network,
  AlertTriangle,
  Info,
  ShieldAlert,
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

interface NodeData {
  id: string;
  name: string;
  sub: string;
  type: 'INSTITUTION' | 'DOCUMENT' | 'SIGNATORY';
  x: number;
  y: number;
  r: number;
}

export const CrossAppNetworkPage: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('INST-8801');

  const nodes: NodeData[] = [
    { id: 'INST-8801', name: 'Sri Vidya Institute', sub: 'APP-2026-8801', type: 'INSTITUTION', x: 200, y: 220, r: 38 },
    { id: 'DOC-LAND', name: 'Land Title Deed', sub: 'SHA: d7a8fb...e592', type: 'DOCUMENT', x: 420, y: 130, r: 34 },
    { id: 'INST-8808', name: 'Thar Institute of Engg', sub: 'APP-2026-8808', type: 'INSTITUTION', x: 640, y: 220, r: 38 },
    { id: 'PERSON-RAO', name: 'Dr. C. Rao', sub: 'Signatory Deponent', type: 'SIGNATORY', x: 200, y: 380, r: 32 },
    { id: 'INST-8803', name: 'Deccan Inst Pharmacy', sub: 'APP-2026-8803', type: 'INSTITUTION', x: 420, y: 380, r: 36 },
    { id: 'DOC-NOC', name: 'State Govt NOC', sub: 'Affiliation Valid', type: 'DOCUMENT', x: 420, y: 20, r: 28 },
  ];

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

  const activeNodeInfo = nodes.find((n) => n.id === selectedNode);

  return (
    <div className="space-y-6 text-text font-sans">
      {/* Editorial Header */}
      <div className="border-b border-border pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-st-review uppercase tracking-wider mb-1">
            <Network className="w-4 h-4" />
            <span>Cross-Application Graph Analytics</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-display font-black tracking-tight text-text">
            Institution & Document Entity Network
          </h1>
          <p className="text-sm font-sans text-text-muted mt-1 max-w-2xl">
            Detects multi-year entity overlaps, shared deponents, and document collisions across institutions.
          </p>
        </div>

        {/* Phase 4 Banner */}
        <div className="px-3.5 py-1.5 bg-tint-ochre border border-border-strong text-st-review rounded-xs font-mono text-xs font-bold flex items-center gap-2 shrink-0">
          <Info className="w-4 h-4 flex-shrink-0" />
          <span>Designed now · built in Phase 4</span>
        </div>
      </div>

      {/* Safety & Boundaries Notice */}
      <div className="p-4 bg-surface border border-border rounded-xs text-xs font-sans text-text-muted space-y-1.5 shadow-subtle">
        <div className="text-text font-bold flex items-center gap-1.5 text-sm">
          <AlertTriangle className="w-4 h-4 text-st-review" />
          <span>Algorithmic Safety & Privacy Boundaries (§14):</span>
        </div>
        <p className="leading-relaxed">
          • <strong className="text-text">Zero Biometrics:</strong> No facial recognition, voiceprints, or biometric profiling exist anywhere in Pramāṇa.
          <br />
          • <strong className="text-text">Review Indicators Only:</strong> Exact byte-identical matches produce candidate alerts for vigilance officers; records are never automatically merged or altered without human statutory review.
        </p>
      </div>

      {/* Responsive Graph and Candidate Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Responsive SVG Graph */}
        <div className="lg:col-span-8 bg-surface border border-border rounded-xs p-4 sm:p-5 space-y-3 shadow-subtle">
          <div className="flex flex-wrap items-center justify-between text-xs font-mono text-text-muted border-b border-border pb-2 gap-2">
            <span>Entity Relationship Graph (Multi-Cycle 2023–2027)</span>
            <span>Tap/click any node to inspect metadata</span>
          </div>

          <div className="w-full bg-bg-elevated rounded-xs border border-border relative overflow-hidden flex items-center justify-center min-h-[480px]">
            <svg
              viewBox="0 0 840 460"
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-[480px] select-none"
            >
              <defs>
                <filter id="halo" x="-20%" y="-20%" width="140%" height="140%">
                  <feFlood floodColor="var(--surface)" result="bg" />
                  <feComposite in="SourceGraphic" in2="bg" operator="over" />
                </filter>
              </defs>

              {/* Edge 1: Sri Vidya to Land Deed */}
              <line x1="200" y1="220" x2="420" y2="130" stroke="var(--st-deficiency)" strokeWidth="2.5" strokeDasharray="4 3" />
              {/* Edge 2: Thar Inst to Land Deed (COLLISION) */}
              <line x1="640" y1="220" x2="420" y2="130" stroke="var(--st-deficiency)" strokeWidth="2.5" strokeDasharray="4 3" />
              {/* Edge 3: Sri Vidya to Dr. Rao */}
              <line x1="200" y1="220" x2="200" y2="380" stroke="var(--st-review)" strokeWidth="2" />
              {/* Edge 4: Deccan Inst to Dr. Rao */}
              <line x1="420" y1="380" x2="200" y2="380" stroke="var(--st-review)" strokeWidth="2" />
              {/* Edge 5: Sri Vidya to State NOC */}
              <line x1="200" y1="220" x2="420" y2="20" stroke="var(--st-pass)" strokeWidth="2" />

              {/* Central Collision Edge Pill (Solid background, above edges) */}
              <g transform="translate(330, 95)">
                <rect x="0" y="0" width="180" height="24" rx="4" fill="var(--st-deficiency)" stroke="var(--border-strong)" strokeWidth="1" />
                <text x="90" y="16" fill="var(--accent-contrast)" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  BYTE-IDENTICAL COLLISION
                </text>
              </g>

              {/* Render Nodes with High-Contrast Text Halo and Full Labels */}
              {nodes.map((node) => {
                const isSelected = selectedNode === node.id;
                const fillColor =
                  node.type === 'INSTITUTION'
                    ? 'var(--tint-teal)'
                    : node.type === 'DOCUMENT'
                    ? 'var(--tint-clay)'
                    : 'var(--tint-ochre)';

                const strokeColor =
                  node.type === 'INSTITUTION'
                    ? 'var(--accent-2)'
                    : node.type === 'DOCUMENT'
                    ? 'var(--st-deficiency)'
                    : 'var(--st-review)';

                return (
                  <g
                    key={node.id}
                    className="cursor-pointer transition-transform"
                    onClick={() => setSelectedNode(node.id)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Select entity ${node.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setSelectedNode(node.id);
                    }}
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.r}
                      fill={fillColor}
                      stroke={isSelected ? 'var(--text)' : strokeColor}
                      strokeWidth={isSelected ? 3.5 : 2}
                    />

                    {/* Node Label (2-line centered, high contrast) */}
                    <text
                      x={node.x}
                      y={node.y - 3}
                      fill="var(--text)"
                      fontSize="11"
                      fontFamily="sans-serif"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {node.name}
                    </text>
                    <text
                      x={node.x}
                      y={node.y + 12}
                      fill="var(--text-muted)"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {node.sub}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Graph Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-text-muted pt-2 border-t border-border">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-tint-teal border border-accent-2" />
              <span>Institutions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-tint-clay border border-st-deficiency" />
              <span>Documents</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-tint-ochre border border-st-review" />
              <span>Signatory Deponents</span>
            </div>
          </div>
        </div>

        {/* Overlap Review Candidates (Sidebar Cards) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="text-sm font-sans uppercase text-text-muted tracking-wider font-bold">
            Identity Overlap Candidates ({overlapCandidates.length})
          </div>

          <div className="space-y-3 font-sans">
            {overlapCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="p-4 bg-surface border border-border rounded-xs space-y-3 text-xs shadow-subtle"
              >
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="font-mono font-bold text-accent-2">{candidate.id}</span>
                  <span
                    className={`px-2 py-0.5 rounded-xs font-mono text-[10px] uppercase font-bold ${
                      candidate.status === 'FLAGGED_VIGILANCE'
                        ? 'bg-st-deficiency-bg text-st-deficiency border border-st-deficiency'
                        : 'bg-st-review-bg text-st-review border border-st-review'
                    }`}
                  >
                    {candidate.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-text-muted font-medium">Source:</div>
                  <div className="font-bold text-text">{candidate.sourceInstitution}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-text-muted font-medium">Target:</div>
                  <div className="font-bold text-text">{candidate.targetInstitution}</div>
                </div>

                <div className="p-2.5 bg-bg-elevated border border-border rounded-xs space-y-1 text-text-muted">
                  <div className="font-semibold text-text text-[11px] flex items-center gap-1">
                    <ShieldAlert size={12} className="text-st-deficiency" />
                    <span>Evidence Feature Citations:</span>
                  </div>
                  {candidate.matchFeatures.map((f, i) => (
                    <div key={i} className="text-[11px] leading-snug">• {f}</div>
                  ))}
                </div>
              </div>
            ))}

            {activeNodeInfo && (
              <div className="p-4 bg-tint-teal border border-accent-2 rounded-xs space-y-1.5 text-xs">
                <div className="font-bold text-accent-2 uppercase text-[11px] font-mono">
                  Inspected Node Details
                </div>
                <div className="text-text font-bold text-sm">{activeNodeInfo.name}</div>
                <div className="text-text-muted font-mono">{activeNodeInfo.sub}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
