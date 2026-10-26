import React, { useState } from 'react';
import { StatusPill } from '../../components/ui/StatusPill';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

interface PdfAnomaly {
  id: string;
  category: 'REVISION_COUNT' | 'PRODUCER_TAG' | 'HIDDEN_TEXT' | 'FONT_MIX';
  title: string;
  citedObject: string;
  details: string;
  highlightedText?: string;
  isAnomaly: boolean;
}

const mockAnomalies: PdfAnomaly[] = [
  {
    id: 'ANOM-01',
    category: 'REVISION_COUNT',
    title: 'Incremental PDF Update Count',
    citedObject: 'Obj 42 0 R (xref table offset 0x0001B420)',
    details: 'File contains 3 separate incremental save trailers. First signed trailer at 2026-03-10, followed by 2 unsaved linear revisions at 2026-03-12.',
    isAnomaly: true,
  },
  {
    id: 'ANOM-02',
    category: 'PRODUCER_TAG',
    title: 'Discrepant Producer / Creator Metadata',
    citedObject: '/Info dictionary << /Producer (pdfTeX-1.40.24) /Creator (Nitro Pro 14.1) >>',
    details: 'Document header declares Adobe Acrobat Pro 2024, but trailer dictionary metadata reveals Nitro Pro 14.1 byte serialization.',
    isAnomaly: true,
  },
  {
    id: 'ANOM-03',
    category: 'FONT_MIX',
    title: 'Font-Mix on Numeric Field',
    citedObject: 'Font /F3 (Helvetica-Bold) mixed with /F7 (ArialMT) in stream Obj 19 0 R',
    details: 'In paragraph "Total Land Area", the digits "8,450" use ArialMT with synthetic glyph metrics differing from the document body font (Times-Roman /F1).',
    highlightedText: '8,450 sq.m.',
    isAnomaly: true,
  },
  {
    id: 'ANOM-04',
    category: 'HIDDEN_TEXT',
    title: 'Invisible OCR / Text Layer Overprint',
    citedObject: 'Rendering Mode 3 (Neither fill nor stroke text) in Content Stream Obj 28',
    details: 'White-on-white text overlay under the official state revenue seal. Underlying string: "[CANCELLED - SUPERSEDED TITLES]".',
    isAnomaly: true,
  },
];

export const PdfStructureInspector: React.FC = () => {
  const [selectedAnomalyId, setSelectedAnomalyId] = useState<string>('ANOM-03');
  const [showHiddenLayer, setShowHiddenLayer] = useState<boolean>(true);

  const activeAnomaly = mockAnomalies.find((a) => a.id === selectedAnomalyId) || mockAnomalies[0];

  return (
    <div className="bg-[#141413] border border-white/10 rounded-md overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 bg-[#171715] border-b border-white/10 flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-wider text-slate">
            FORENSIC PARSER · §3.3
          </div>
          <h3 className="text-sm font-serif font-bold text-[#EDE7DA] mt-0.5">
            PDF Structure & Byte-Level Inspection
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-black/40 border border-white/10 rounded font-mono text-[10px] text-ochre">
            SYNTHETIC EDITED PDF FIXTURE
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="p-3 bg-black/40 border border-white/10 rounded text-[11px] text-slate leading-relaxed flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-ochre flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#EDE7DA]">Statutory Copy Rule (§14):</strong> Structure anomalies are
            strictly categorized as <span className="text-ochre font-mono font-bold">"indicator, requires review"</span>,
            never "forgery" or "fraud". Mechanical indicators highlight byte inconsistencies for officer adjudication.
          </div>
        </div>

        {/* 2-Column Inspector View */}
        <div className="grid grid-cols-12 gap-5">
          {/* Anomaly list (Left 5 cols) */}
          <div className="col-span-12 lg:col-span-5 space-y-2">
            <div className="text-[10px] font-mono uppercase text-slate tracking-wider mb-1">
              Detected Structural Indicators ({mockAnomalies.length})
            </div>

            {mockAnomalies.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedAnomalyId(item.id)}
                className={`w-full text-left p-3 rounded border transition-all ${
                  selectedAnomalyId === item.id
                    ? 'bg-[#1F2A38] border-[#385B88]'
                    : 'bg-[#181816] border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] text-slate">{item.id}</span>
                  <StatusPill status="STRUCTURE_INDICATOR" label="indicator, requires review" />
                </div>
                <div className="text-xs font-serif font-bold text-[#EDE7DA]">
                  {item.title}
                </div>
                <div className="font-mono text-[10.5px] text-slate truncate mt-1">
                  {item.citedObject}
                </div>
              </button>
            ))}
          </div>

          {/* Forensic Detail & Simulated Stream View (Right 7 cols) */}
          <div className="col-span-12 lg:col-span-7 bg-[#181816] border border-white/10 rounded p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono text-ochre uppercase font-bold">
                  {activeAnomaly.id} · {activeAnomaly.category}
                </span>
                <h4 className="text-sm font-serif font-bold text-white mt-0.5">
                  {activeAnomaly.title}
                </h4>
              </div>
              <StatusPill status="STRUCTURE_INDICATOR" label="indicator, requires review" />
            </div>

            {/* Cited Object Spec */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate">
                Cited PDF Low-Level Object / Stream:
              </span>
              <div className="p-2.5 bg-black/50 border border-white/10 rounded font-mono text-xs text-ochre break-all select-all">
                {activeAnomaly.citedObject}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate">
                Forensic Finding Description:
              </span>
              <p className="text-xs text-[#EDE7DA] leading-relaxed">
                {activeAnomaly.details}
              </p>
            </div>

            {/* Simulated Visual Highlight if Font-Mix */}
            {activeAnomaly.category === 'FONT_MIX' && (
              <div className="mt-4 p-4 bg-[#F5F2EB] text-[#0C0C0B] rounded border border-neutral-300 font-serif">
                <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 mb-2 border-b border-neutral-200 pb-1 flex items-center justify-between">
                  <span>Document Visual Rendering Simulation</span>
                  <span className="text-vermilion font-bold font-mono">GLYPH DISPARITY DETECTED</span>
                </div>
                <div className="text-xs text-neutral-800 leading-relaxed">
                  The applicant declares that the total campus instructional space is{' '}
                  <span className="px-1.5 py-0.5 bg-vermilion/20 border-b-2 border-vermilion font-sans font-bold text-vermilion inline-block" title="Font /F7 (ArialMT) substituted into Times-Roman stream">
                    {activeAnomaly.highlightedText}
                  </span>{' '}
                  constructed in accordance with AICTE approval norms.
                </div>
                <div className="mt-2 text-[10px] font-mono text-neutral-600 bg-neutral-100 p-2 rounded">
                  Font metric diff: Glyphs "8,450" rendered in ArialMT (72.4pt bbox height) while surrounding text uses Times-Roman (68.1pt bbox).
                </div>
              </div>
            )}

            {/* Simulated Hidden Text Layer Toggle */}
            {activeAnomaly.category === 'HIDDEN_TEXT' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-slate">Hidden Rendering Stream:</span>
                  <button
                    type="button"
                    onClick={() => setShowHiddenLayer(!showHiddenLayer)}
                    className="flex items-center gap-1 text-[11px] font-mono text-ochre hover:underline"
                  >
                    {showHiddenLayer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showHiddenLayer ? 'Hide OCR Layer' : 'Reveal Hidden Layer'}</span>
                  </button>
                </div>

                <div className="p-3 bg-black/60 border border-white/10 rounded font-mono text-xs">
                  <div className="text-slate text-[10px]">BT /F1 10.0 Tf 1 0 0 1 72 710 Tm 3 Tr</div>
                  <div className={showHiddenLayer ? 'text-vermilion font-bold text-sm bg-vermilion/20 p-1.5 rounded my-1' : 'text-slate/30'}>
                    [CANCELLED - SUPERSEDED TITLES]
                  </div>
                  <div className="text-slate text-[10px]">ET (Text rendering mode 3: Invisible)</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
