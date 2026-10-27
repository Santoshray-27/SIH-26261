import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Network,
  AlertTriangle,
  Info,
  ShieldAlert,
  Building2,
  FileText,
  UserCheck,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  List,
  X,
  ChevronRight,
} from 'lucide-react';
import { computeGraphLayout, GraphNode, GraphEdge } from '../../services/graphLayout';

export interface OverlapCandidate {
  id: string;
  sourceInstitution: string;
  sourceId: string;
  targetInstitution: string;
  targetId: string;
  relatedDocId: string;
  overlapType: 'BYTE_IDENTICAL_DOCUMENT' | 'DEVIATING_SIGNATORY_PROFILE' | 'REGISTERED_ADDRESS';
  featureScore: number;
  matchFeatures: string[];
  status: 'PENDING_REVIEW' | 'FLAGGED_VIGILANCE';
}

const SEED_NODES: GraphNode[] = [
  {
    id: 'INST-8801',
    nameEn: 'Sri Vidya Institute of Technology',
    nameHi: 'श्री विद्या प्रौद्योगिकी संस्थान',
    subEn: 'APP-2026-8801',
    subHi: 'आवेदन-2026-8801',
    type: 'INSTITUTION',
    radius: 36,
    source: 'LIVE',
    hash: 'a4f890c21...8801',
    identifiers: ['AISHE-C-19820', 'AFF-JNTU-2026'],
    laneX: 0.14,
    laneY: 0.42,
  },
  {
    id: 'DOC-LAND',
    nameEn: 'Land Title Deed (Copy)',
    nameHi: 'भूमि स्वामित्व विलेख प्रतिलिपि',
    subEn: 'SHA: d7a8fb...e592',
    subHi: 'हैश: d7a8fb...e592',
    type: 'DOCUMENT',
    radius: 34,
    source: 'LIVE',
    hash: 'd7a8fbe2...e592',
    identifiers: ['SURVEY-142-B', 'REG-VOL-441'],
    laneX: 0.5,
    laneY: 0.42, // Placed squarely in the CENTRE
  },
  {
    id: 'INST-8808',
    nameEn: 'Thar Institute of Engineering',
    nameHi: 'थार अभियांत्रिकी संस्थान',
    subEn: 'APP-2026-8808',
    subHi: 'आवेदन-2026-8808',
    type: 'INSTITUTION',
    radius: 36,
    source: 'SIMULATED',
    hash: 'c8912e09...8808',
    identifiers: ['AISHE-C-45129', 'AFF-RU-2025'],
    laneX: 0.86,
    laneY: 0.42,
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
    hash: '45a99c...noc',
    identifiers: ['NOC-TS-2026-99', 'DISP-4401'],
    laneX: 0.5,
    laneY: 0.08, // Radiating ABOVE center
  },
  {
    id: 'PERSON-RAO',
    nameEn: 'Dr. Chandrasekhar Rao',
    nameHi: 'डॉ. चंद्रशेखर राव',
    subEn: 'Signatory Deponent',
    subHi: 'अधिकृत हस्ताक्षरकर्ता',
    type: 'SIGNATORY',
    radius: 30,
    source: 'SANDBOX',
    hash: 'd88f11...pan',
    identifiers: ['PAN: ABCPR****K', 'DIN: 08819201'],
    laneX: 0.25,
    laneY: 0.86, // Radiating BELOW left
  },
  {
    id: 'INST-8803',
    nameEn: 'Deccan Institute of Pharmacy',
    nameHi: 'डेक्कन फार्मेसी संस्थान',
    subEn: 'APP-2026-8803',
    subHi: 'आवेदन-2026-8803',
    type: 'INSTITUTION',
    radius: 36,
    source: 'SIMULATED',
    hash: '772bca...8803',
    identifiers: ['AISHE-C-38291', 'AFF-OU-2024'],
    laneX: 0.75,
    laneY: 0.86, // Radiating BELOW right
  },
];

const SEED_EDGES: GraphEdge[] = [
  {
    id: 'E-COLLISION-1',
    source: 'INST-8801',
    target: 'DOC-LAND',
    pattern: 'dashed',
    status: 'DEFICIENCY',
    labelEn: 'Identical file',
    labelHi: 'समान फ़ाइल',
    fullReasonEn: 'Byte-identical collision: exact SHA-256 byte match on uploaded Land Title Deed',
    fullReasonHi: 'बाइट-समान टकराव: अपलोड किए गए भूमि स्वामित्व विलेख पर सटीक SHA-256 मिलान',
    tRatio: 0.42,
    curveOffset: 12,
  },
  {
    id: 'E-COLLISION-2',
    source: 'INST-8808',
    target: 'DOC-LAND',
    pattern: 'dashed',
    status: 'DEFICIENCY',
    labelEn: 'Identical file',
    labelHi: 'समान फ़ाइल',
    fullReasonEn: 'Byte-identical collision: Survey 142/B claimed simultaneously by separate institution',
    fullReasonHi: 'बाइट-समान टकराव: अलग संस्थान द्वारा एक ही विलेख सर्वेक्षण संख्या का दावा',
    tRatio: 0.58,
    curveOffset: -12,
  },
  {
    id: 'E-NOC',
    source: 'INST-8801',
    target: 'DOC-NOC',
    pattern: 'solid',
    status: 'PASS',
    labelEn: 'Affiliation valid',
    labelHi: 'संबद्धता वैध',
    fullReasonEn: 'Government NOC validated with State Higher Education Council',
    fullReasonHi: 'राज्य उच्च शिक्षा परिषद द्वारा अनापत्ति प्रमाण पत्र सत्यापित',
    tRatio: 0.5,
    curveOffset: 18,
  },
  {
    id: 'E-DEPONENT-1',
    source: 'INST-8801',
    target: 'PERSON-RAO',
    pattern: 'dotted',
    status: 'REVIEW',
    labelEn: 'Shared signatory',
    labelHi: 'साझा हस्ताक्षरकर्ता',
    fullReasonEn: 'Listed as Chairman & Authorized Signatory across applications',
    fullReasonHi: 'आवेदनों में अध्यक्ष एवं अधिकृत हस्ताक्षरकर्ता के रूप में सूचीबद्ध',
    tRatio: 0.5,
  },
  {
    id: 'E-DEPONENT-2',
    source: 'INST-8803',
    target: 'PERSON-RAO',
    pattern: 'dotted',
    status: 'REVIEW',
    labelEn: 'Shared signatory',
    labelHi: 'साझा हस्ताक्षरकर्ता',
    fullReasonEn: 'Signatory profile overlaps across separate applications',
    fullReasonHi: 'अलग-अलग आवेदनों में हस्ताक्षरकर्ता प्रोफ़ाइल का अतिच्छादन',
    tRatio: 0.5,
  },
];

const OVERLAP_CANDIDATES: OverlapCandidate[] = [
  {
    id: 'OVL-01',
    sourceInstitution: 'Sri Vidya Institute of Technology (APP-2026-8801)',
    sourceId: 'INST-8801',
    targetInstitution: 'Thar Institute of Engineering (APP-2026-8808)',
    targetId: 'INST-8808',
    relatedDocId: 'DOC-LAND',
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
    sourceId: 'INST-8801',
    targetInstitution: 'Deccan Institute of Pharmacy (APP-2026-8803)',
    targetId: 'INST-8803',
    relatedDocId: 'PERSON-RAO',
    overlapType: 'DEVIATING_SIGNATORY_PROFILE',
    featureScore: 0.88,
    matchFeatures: [
      'Matching Authorized Signatory Name: Dr. Chandrasekhar Rao',
      'Distinct Tax Identifiers (PAN/GSTIN) across deponents',
    ],
    status: 'PENDING_REVIEW',
  },
];

export const CrossAppNetworkPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isHindi = Boolean(i18n.language && i18n.language.startsWith('hi'));

  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 850, height: 540 });
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('INST-8801');
  const [highlightedEdgeId, setHighlightedEdgeId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showListView, setShowListView] = useState<boolean>(false);

  // ResizeObserver for automatic width/height detection
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const w = entry.contentRect.width;
        // Keep minimum height: 520px on desktop, 420px on mobile
        const h = w < 640 ? 420 : 540;
        setDimensions({ width: w, height: h });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Keyboard navigation & Esc key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedNodeId(null);
        setHighlightedEdgeId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute layout with deterministic relaxation pass
  const { positionedNodes, positionedEdges } = useMemo(() => {
    return computeGraphLayout(SEED_NODES, SEED_EDGES, {
      width: dimensions.width,
      height: dimensions.height,
      padding: 40,
    });
  }, [dimensions]);

  const activeNode = useMemo(() => {
    return positionedNodes.find((n) => n.id === selectedNodeId) || null;
  }, [positionedNodes, selectedNodeId]);

  const connectedEdges = useMemo(() => {
    if (!selectedNodeId) return [];
    return positionedEdges.filter(
      (e) => e.source === selectedNodeId || e.target === selectedNodeId
    );
  }, [positionedEdges, selectedNodeId]);

  const handleSelectCandidate = (candidate: OverlapCandidate) => {
    setSelectedNodeId(candidate.sourceId);
    const edge = positionedEdges.find(
      (e) =>
        (e.source === candidate.sourceId && e.target === candidate.relatedDocId) ||
        (e.target === candidate.sourceId && e.source === candidate.relatedDocId)
    );
    if (edge) {
      setHighlightedEdgeId(edge.id);
    }
    // Scroll container smoothly if needed
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const handleArrowNav = (direction: 'next' | 'prev') => {
    const idx = positionedNodes.findIndex((n) => n.id === selectedNodeId);
    let nextIdx = 0;
    if (direction === 'next') {
      nextIdx = (idx + 1) % positionedNodes.length;
    } else {
      nextIdx = (idx - 1 + positionedNodes.length) % positionedNodes.length;
    }
    setSelectedNodeId(positionedNodes[nextIdx].id);
    const btn = document.getElementById(`node-btn-${positionedNodes[nextIdx].id}`);
    btn?.focus();
  };

  return (
    <div className="space-y-6 text-text font-sans">
      {/* 1. Page Header (Editorial, Sentence Case, No letter-spaced uppercase) */}
      <div className="border-b border-border pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-sans font-semibold text-[13px] text-accent-2 mb-2 tracking-[0.02em]">
            <Network className="w-4 h-4 text-accent-2" />
            <span>{isHindi ? 'क्रॉस-आवेदन ग्राफ विश्लेषण' : 'Cross-application graph analytics'}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-normal text-text">
            {isHindi ? 'संस्थान एवं दस्तावेज़ संबंध नेटवर्क' : 'Entity relationship & document collision network'}
          </h1>
          <p className="text-sm font-sans text-text-muted mt-2 max-w-[66ch] leading-relaxed">
            {isHindi
              ? 'बहु-वर्षीय संस्थान ओवरलैप, साझा हस्ताक्षरकर्ता और दस्तावेज़ टकरावों का स्वचालित मानचित्रण।'
              : 'Detects multi-year entity overlaps, shared deponents, and document collisions across institutions.'}
          </p>
        </div>

        {/* Phase 4 Banner Badge */}
        <div className="px-3 py-1.5 bg-tint-ochre border border-border text-text rounded-xs font-sans text-xs font-semibold flex items-center gap-2 shrink-0 shadow-xs">
          <Info className="w-4 h-4 text-accent-2 shrink-0" />
          <span>{isHindi ? 'अब डिज़ाइन किया गया · चरण 4 में निर्मित' : 'Designed now · built in Phase 4'}</span>
        </div>
      </div>

      {/* 2. Safety & Algorithmic Boundaries Notice */}
      <div className="p-4 bg-surface border border-border rounded-xs text-xs font-sans text-text-muted space-y-1.5 shadow-subtle">
        <div className="text-text font-bold flex items-center gap-1.5 text-sm">
          <AlertTriangle className="w-4 h-4 text-accent" />
          <span>{isHindi ? 'एल्गोरिद्मिक सुरक्षा एवं गोपनीयता सीमाएं (§14):' : 'Algorithmic safety & privacy boundaries (§14):'}</span>
        </div>
        <p className="leading-relaxed">
          • <strong className="text-text">{isHindi ? 'शून्य बायोमेट्रिक:' : 'Zero biometrics:'}</strong>{' '}
          {isHindi
            ? 'साक्ष्य‑I5 में चेहरे की पहचान, आवाज़ के नमूने या बायोमेट्रिक प्रोफ़ाइलिंग का पूर्णतः निषेध है।'
            : 'No facial recognition, voiceprints, or biometric profiling exist anywhere in Sakshya‑I5.'}
          <br />
          • <strong className="text-text">{isHindi ? 'केवल समीक्षा संकेतक:' : 'Review indicators only:'}</strong>{' '}
          {isHindi
            ? 'बाइट-समान मिलान केवल सतर्कता अधिकारियों के लिए समीक्षा अलर्ट उत्पन्न करते हैं; वैधानिक समीक्षा के बिना रिकॉर्ड कभी स्वतः मर्ज नहीं होते।'
            : 'Exact byte-identical matches produce candidate alerts for vigilance officers; records are never automatically merged or altered without human statutory review.'}
        </p>
      </div>

      {/* 3. Main Grid: Graph Canvas (65% / 8 cols) + Candidates Column (35% / 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Graph Canvas + Controls + Legend */}
        <div className="lg:col-span-8 bg-surface border border-border rounded-xs p-4 sm:p-5 space-y-3 shadow-subtle">
          {/* Canvas Toolbar */}
          <div className="flex flex-wrap items-center justify-between text-xs font-sans text-text-muted border-b border-border pb-2 gap-2">
            <div className="flex items-center gap-2 font-medium">
              <span className="font-semibold text-text">
                {isHindi ? 'संस्थागत संबंध ग्राफ (2023–2027 चक्र)' : 'Entity relationship graph (2023–2027 cycle)'}
              </span>
              <span className="text-border">·</span>
              <span className="font-sans text-xs text-accent-2 tabular-nums">
                {positionedNodes.length} {isHindi ? 'नोड्स' : 'nodes'} / {positionedEdges.length} {isHindi ? 'संबंध' : 'edges'}
              </span>
            </div>

            {/* Accessible Canvas Controls */}
            <div className="flex items-center gap-1 bg-surface-2 p-1 rounded-xs border border-border">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
                className="p-1 hover:bg-surface rounded-xs text-text transition-colors"
                title="Zoom in"
                aria-label="Zoom in graph"
              >
                <ZoomIn size={14} />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
                className="p-1 hover:bg-surface rounded-xs text-text transition-colors"
                title="Zoom out"
                aria-label="Zoom out graph"
              >
                <ZoomOut size={14} />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                className="p-1 hover:bg-surface rounded-xs text-text transition-colors"
                title="Fit to canvas"
                aria-label="Fit graph to canvas"
              >
                <Maximize2 size={14} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setZoomLevel(1);
                  setSelectedNodeId('INST-8801');
                  setHighlightedEdgeId(null);
                }}
                className="p-1 hover:bg-surface rounded-xs text-text transition-colors"
                title="Reset selection"
                aria-label="Reset selection"
              >
                <RotateCcw size={14} />
              </button>
              <span className="text-border mx-0.5" aria-hidden="true">|</span>
              <button
                type="button"
                onClick={() => setShowListView(!showListView)}
                className={`px-2 py-0.5 rounded-xs text-[11px] font-sans flex items-center gap-1 transition-colors ${
                  showListView ? 'bg-accent-2 text-surface font-bold' : 'hover:bg-surface text-text'
                }`}
                aria-pressed={showListView}
              >
                <List size={12} />
                <span>{isHindi ? 'तालिका दृश्य' : 'List view'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Graph Container */}
          <div
            ref={containerRef}
            role="group"
            aria-label={isHindi ? 'संस्थागत संबंध इंटरैक्टिव आरेख' : 'Entity relationship interactive graph'}
            className="w-full bg-bg-elevated rounded-xs border border-border relative overflow-hidden flex items-center justify-center min-h-[420px] sm:min-h-[520px] select-none"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                handleArrowNav('next');
              } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                handleArrowNav('prev');
              }
            }}
          >
            {/* SVG Edge & Path Rendering Layer */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
                transition: 'transform 0.15s ease-out',
              }}
              viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            >
              {positionedEdges.map((edge) => {
                const isEdgeHighlighted =
                  highlightedEdgeId === edge.id ||
                  (selectedNodeId && (edge.source === selectedNodeId || edge.target === selectedNodeId));

                const strokeColor =
                  edge.status === 'DEFICIENCY'
                    ? 'var(--st-deficiency)'
                    : edge.status === 'REVIEW'
                    ? 'var(--st-review)'
                    : 'var(--st-pass)';

                const strokeDasharray =
                  edge.pattern === 'dashed' ? '5 4' : edge.pattern === 'dotted' ? '2 3' : undefined;

                const pathData = `M ${edge.startX} ${edge.startY} Q ${edge.curveControlX} ${edge.curveControlY} ${edge.endX} ${edge.endY}`;

                return (
                  <g key={edge.id} className="transition-opacity duration-200">
                    {/* Shadow / Halo path for clear visual separation */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="var(--bg-elevated)"
                      strokeWidth={isEdgeHighlighted ? 6 : 4}
                      strokeLinecap="round"
                    />
                    {/* Foreground Styled Edge */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={isEdgeHighlighted ? 3 : 2}
                      strokeDasharray={strokeDasharray}
                      strokeLinecap="round"
                      opacity={selectedNodeId && !isEdgeHighlighted ? 0.35 : 1}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Absolute HTML Edge Pills Layer (Positioned at midpoint perpendicular offset, above edges, never under nodes) */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
                transition: 'transform 0.15s ease-out',
              }}
            >
              {positionedEdges.map((edge) => {
                const isEdgeHighlighted =
                  highlightedEdgeId === edge.id ||
                  (selectedNodeId && (edge.source === selectedNodeId || edge.target === selectedNodeId));

                const pillBg =
                  edge.status === 'DEFICIENCY'
                    ? 'bg-st-deficiency text-accent-contrast border-st-deficiency'
                    : edge.status === 'REVIEW'
                    ? 'bg-st-review-bg text-st-review border-st-review'
                    : 'bg-st-pass-bg text-st-pass border-st-pass';

                return (
                  <div
                    key={`pill-${edge.id}`}
                    style={{
                      left: `${edge.pillX}px`,
                      top: `${edge.pillY}px`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className={`absolute z-20 pointer-events-auto transition-all duration-200 px-2 py-0.5 rounded-xs border text-[11px] font-sans font-bold shadow-xs whitespace-nowrap leading-none ${pillBg} ${
                      isEdgeHighlighted ? 'scale-105 ring-2 ring-focus-ring' : 'opacity-95'
                    }`}
                    title={isHindi ? (edge.fullReasonHi || edge.reasonHi) : (edge.fullReasonEn || edge.reasonEn)}
                    aria-label={isHindi ? (edge.fullReasonHi || edge.reasonHi) : (edge.fullReasonEn || edge.reasonEn)}
                    onClick={() => {
                      setHighlightedEdgeId(edge.id);
                      setSelectedNodeId(edge.source);
                    }}
                  >
                    {isHindi ? edge.labelHi : edge.labelEn}
                  </div>
                );
              })}
            </div>

            {/* Real HTML <button> Nodes Layer */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
                transition: 'transform 0.15s ease-out',
              }}
            >
              {positionedNodes.map((node) => {
                const isSelected = selectedNodeId === node.id;
                const isNeighbour = connectedEdges.some(
                  (e) => e.source === node.id || e.target === node.id
                );
                const isDimmed = selectedNodeId !== null && !isSelected && !isNeighbour;

                const nodeBg =
                  node.type === 'INSTITUTION'
                    ? 'bg-tint-teal text-accent-2 border-accent-2'
                    : node.type === 'DOCUMENT'
                    ? 'bg-tint-clay text-accent border-st-deficiency'
                    : 'bg-tint-ochre text-st-review border-st-review';

                const Icon =
                  node.type === 'INSTITUTION'
                    ? Building2
                    : node.type === 'DOCUMENT'
                    ? FileText
                    : UserCheck;

                const diameter = node.radius * 2;
                const connectionCount = positionedEdges.filter(
                  (e) => e.source === node.id || e.target === node.id
                ).length;

                return (
                  <div
                    key={node.id}
                    style={{
                      left: `${node.x}px`,
                      top: `${node.y}px`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className={`absolute z-30 flex flex-col items-center pointer-events-auto transition-all duration-200 ${
                      isDimmed ? 'opacity-40 hover:opacity-100' : 'opacity-100'
                    }`}
                  >
                    {/* Circular Button */}
                    <button
                      id={`node-btn-${node.id}`}
                      type="button"
                      onClick={() => {
                        setSelectedNodeId(node.id);
                        setHighlightedEdgeId(null);
                      }}
                      style={{ width: `${diameter}px`, height: `${diameter}px` }}
                      className={`rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-subtle ${nodeBg} ${
                        isSelected
                          ? 'ring-3 ring-focus-ring ring-offset-3 ring-offset-bg-elevated scale-105'
                          : 'hover:scale-105 focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:ring-offset-2'
                      }`}
                      aria-label={`${node.type}: ${isHindi ? node.nameHi : node.nameEn}. ${connectionCount} connections.`}
                      aria-pressed={isSelected}
                    >
                      <Icon size={diameter >= 70 ? 24 : 20} strokeWidth={1.5} />
                    </button>

                    {/* High-Readability Label Below Node (Wrapped, ≥ 12px, solid background chip) */}
                    <div className="mt-1.5 flex flex-col items-center max-w-[140px] text-center pointer-events-none">
                      <span className="px-1.5 py-0.5 rounded-xs bg-surface text-text font-sans font-bold text-xs sm:text-[13px] leading-tight line-clamp-2 shadow-xs border border-border">
                        {isHindi ? node.nameHi : node.nameEn}
                      </span>
                      <span className="mt-0.5 px-1 py-0.2 rounded-xs bg-surface-2 font-mono text-[11px] text-text-muted font-semibold border border-border/40">
                        {isHindi ? node.subHi : node.subEn}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Inline Anchored Inspected Node Details Card (Always visible within viewport, Esc to close) */}
            {activeNode && (
              <div
                className="absolute bottom-3 left-3 z-40 max-w-[320px] bg-surface border border-border rounded-xs p-3.5 shadow-floating animate-fadeIn font-sans space-y-2 text-xs"
                role="region"
                aria-label="Node details panel"
              >
                <div className="flex items-start justify-between border-b border-border pb-1.5">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] uppercase font-bold text-accent-2">
                      {activeNode.type} · {activeNode.source}
                    </span>
                    <h2 className="font-bold text-text text-sm leading-tight">
                      {isHindi ? activeNode.nameHi : activeNode.nameEn}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedNodeId(null)}
                    className="p-1 hover:bg-surface-2 rounded-xs text-text-muted hover:text-text transition-colors"
                    aria-label="Close node details"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="space-y-1 font-mono text-[11px] text-text-muted">
                  <div>
                    <span className="text-text font-semibold">Ref ID: </span>
                    <span>{isHindi ? activeNode.subHi : activeNode.subEn}</span>
                  </div>
                  {activeNode.hash && (
                    <div className="truncate">
                      <span className="text-text font-semibold">Hash: </span>
                      <span className="text-accent-2 font-bold">{activeNode.hash}</span>
                    </div>
                  )}
                  {activeNode.identifiers && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {activeNode.identifiers.map((ident) => (
                        <span key={ident} className="px-1.5 py-0.2 bg-bg border border-border rounded-xs text-[10px]">
                          {ident}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Connected Edges Breakdown */}
                {connectedEdges.length > 0 && (
                  <div className="pt-1.5 border-t border-border space-y-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-text-muted block">
                      {isHindi ? 'संबद्ध संबंध कारण:' : 'Connected relationships:'}
                    </span>
                    {connectedEdges.map((edge) => (
                      <div key={edge.id} className="text-[11px] text-text-muted leading-snug">
                        <span className="font-bold text-text">• {isHindi ? edge.labelHi : edge.labelEn}: </span>
                        <span>{isHindi ? (edge.fullReasonHi || edge.reasonHi) : (edge.fullReasonEn || edge.reasonEn)}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-1 border-t border-border text-[10px] text-accent font-sans leading-tight">
                  {isHindi
                    ? 'संभावित ओवरलैप — मानवीय अधिकारी समीक्षा आवश्यक। स्वतः मर्ज प्रतिबंधित है।'
                    : 'Fuzzy candidate — requires manual officer review. Automatic merging prohibited.'}
                </div>
              </div>
            )}
          </div>

          {/* Accessible List View Table (Toggled via button or keyboard) */}
          {showListView && (
            <div className="border border-border rounded-xs p-3 bg-surface-2 animate-fadeIn font-sans text-xs space-y-2">
              <span className="font-bold text-text block">
                {isHindi ? 'नोड्स एवं संबंध तालिका' : 'Tabular entity list'}
              </span>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border text-text-muted font-mono text-[11px]">
                      <th className="p-1.5">ID</th>
                      <th className="p-1.5">{isHindi ? 'नाम' : 'Entity Name'}</th>
                      <th className="p-1.5">{isHindi ? 'प्रकार' : 'Type'}</th>
                      <th className="p-1.5">{isHindi ? 'स्रोत' : 'Source'}</th>
                      <th className="p-1.5">{isHindi ? 'कार्रवाई' : 'Action'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positionedNodes.map((node) => (
                      <tr key={node.id} className="border-b border-border/50 hover:bg-surface">
                        <td className="p-1.5 font-mono">{node.id}</td>
                        <td className="p-1.5 font-semibold text-text">{isHindi ? node.nameHi : node.nameEn}</td>
                        <td className="p-1.5">{node.type}</td>
                        <td className="p-1.5 font-mono text-[10px]">{node.source}</td>
                        <td className="p-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedNodeId(node.id)}
                            className="px-2 py-0.5 bg-surface border border-border rounded-xs hover:bg-tint-teal font-medium"
                          >
                            {isHindi ? 'चुनें' : 'Select'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. Complete Legend (Nodes AND Edge Styles) */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-text-muted pt-3 border-t border-border">
            {/* Node Types Legend */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-tint-teal border border-accent-2 flex items-center justify-center text-[8px] font-bold text-accent-2">
                  <Building2 size={9} />
                </span>
                <span>{isHindi ? 'संस्थान' : 'Institutions'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-tint-clay border border-st-deficiency flex items-center justify-center text-[8px] font-bold text-st-deficiency">
                  <FileText size={9} />
                </span>
                <span>{isHindi ? 'दस्तावेज़' : 'Documents'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-tint-ochre border border-st-review flex items-center justify-center text-[8px] font-bold text-st-review">
                  <UserCheck size={9} />
                </span>
                <span>{isHindi ? 'हस्ताक्षरकर्ता' : 'Signatory Deponents'}</span>
              </div>
            </div>

            {/* Edge Patterns Legend */}
            <div className="flex flex-wrap items-center gap-4 border-l border-border pl-4">
              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                <span className="w-6 h-0.5 border-t-2 border-dashed border-st-deficiency" />
                <span className="font-sans">{isHindi ? 'बाइट टकराव' : 'Collision'}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                <span className="w-6 h-0.5 border-t-2 border-dotted border-st-review" />
                <span className="font-sans">{isHindi ? 'साझा प्रोफ़ाइल' : 'Shared profile'}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                <span className="w-6 h-0.5 bg-st-pass" />
                <span className="font-sans">{isHindi ? 'संबद्धता' : 'Affiliation'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Identity Overlap Candidates (35% / 4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h2 className="text-sm font-sans font-bold text-text">
              {isHindi ? 'पहचान ओवरलैप उम्मीदवार' : 'Identity overlap candidates'} ({OVERLAP_CANDIDATES.length})
            </h2>
            <span className="text-xs font-sans text-accent-2 font-semibold"><span className="font-mono">§14</span> Safe review</span>
          </div>

          <div className="space-y-3 font-sans">
            {OVERLAP_CANDIDATES.map((candidate) => (
              <div
                key={candidate.id}
                onClick={() => handleSelectCandidate(candidate)}
                className={`p-4 bg-surface border rounded-xs space-y-3 text-xs shadow-subtle cursor-pointer transition-all hover:bg-surface-2 ${
                  selectedNodeId === candidate.sourceId
                    ? 'border-accent-2 ring-1 ring-accent-2'
                    : 'border-border'
                }`}
                role="button"
                tabIndex={0}
                aria-label={`Inspect candidate collision ${candidate.id}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleSelectCandidate(candidate);
                }}
              >
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="font-mono font-bold text-accent-2">{candidate.id}</span>
                  <span
                    className={`px-2 py-0.5 rounded-xs font-sans text-xs font-semibold ${
                      candidate.status === 'FLAGGED_VIGILANCE'
                        ? 'bg-st-deficiency-bg text-st-deficiency border border-st-deficiency'
                        : 'bg-st-review-bg text-st-review border border-st-review'
                    }`}
                  >
                    {candidate.status === 'FLAGGED_VIGILANCE' ? 'Flagged vigilance' : 'Pending review'}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-text-muted font-medium text-[11px]">{isHindi ? 'स्रोत संस्थान:' : 'Source:'}</div>
                  <div className="font-bold text-text text-xs leading-snug">{candidate.sourceInstitution}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-text-muted font-medium text-[11px]">{isHindi ? 'लक्ष्य संस्थान:' : 'Target:'}</div>
                  <div className="font-bold text-text text-xs leading-snug">{candidate.targetInstitution}</div>
                </div>

                <div className="p-2.5 bg-bg-elevated border border-border rounded-xs space-y-1 text-text-muted">
                  <div className="font-semibold text-text text-[11px] flex items-center gap-1">
                    <ShieldAlert size={12} className="text-st-deficiency shrink-0" />
                    <span>{isHindi ? 'साक्ष्य उद्धरण:' : 'Evidence citations:'}</span>
                  </div>
                  {candidate.matchFeatures.map((f, i) => (
                    <div key={i} className="text-[11px] leading-snug">• {f}</div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1 text-xs font-sans text-accent-2 font-semibold">
                  <span>{isHindi ? 'ग्राफ पर देखें' : 'View on graph'}</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
