import React, { useState } from 'react';
import { DuplicateCheckTool } from '../../features/evidence-tools/DuplicateCheckTool';
import { PdfStructureInspector } from '../../features/evidence-tools/PdfStructureInspector';
import { DigitalSignaturePanel } from '../../features/evidence-tools/DigitalSignaturePanel';
import { GeotagCard } from '../../features/evidence-tools/GeotagCard';
import { OfficialQrLookup } from '../../features/evidence-tools/OfficialQrLookup';
import { VideoEvidencePanel } from '../../features/evidence-tools/VideoEvidencePanel';
import { FloorplanMeasureTool } from '../../features/floorplan-measure/FloorplanMeasureTool';
import { Wrench } from 'lucide-react';

export const EvidenceToolsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('duplicate');

  const tabs = [
    { id: 'duplicate', label: '1. Duplicate Check (SHA-256)' },
    { id: 'structure', label: '2. PDF Byte Structure' },
    { id: 'signature', label: '3. Digital Signature' },
    { id: 'geotag', label: '4. Geotag & Haversine' },
    { id: 'floorplan', label: '5. Floor-Plan Measure' },
    { id: 'video', label: '6. Video Frame Strip' },
    { id: 'qr', label: '7. Official QR Sandbox' },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0E] text-[#EDE7DA] p-6 lg:p-10 space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-ochre uppercase tracking-wider mb-1">
            <Wrench className="w-4 h-4" />
            <span>Forensic Evidence Toolbox · §3.3 / §6 / §14</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-white">
            Forensic Evidence Verifiers
          </h1>
          <p className="text-sm font-mono text-slate mt-2 max-w-2xl">
            Modular evidentiary verification tools: client-side cryptographic hashing, PDF byte-structure inspection,
            PAdES digital signature boundaries, Haversine geospatial tolerances, Shoelace canvas measurement, and sandbox QR lookup.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate">
          <span className="w-2 h-2 rounded-full bg-verdigris" />
          <span>7 Active Forensic Tools</span>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-mono text-xs rounded transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-paper text-ink font-bold shadow-md'
                : 'text-slate hover:text-paper hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Verifier Content */}
      <div className="space-y-6">
        {activeTab === 'duplicate' && <DuplicateCheckTool />}
        {activeTab === 'structure' && <PdfStructureInspector />}
        {activeTab === 'signature' && <DigitalSignaturePanel />}
        {activeTab === 'geotag' && <GeotagCard />}
        {activeTab === 'floorplan' && <FloorplanMeasureTool />}
        {activeTab === 'video' && <VideoEvidencePanel />}
        {activeTab === 'qr' && <OfficialQrLookup />}
      </div>
    </div>
  );
};
