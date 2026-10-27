import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DuplicateCheckTool } from '../../features/evidence-tools/DuplicateCheckTool';
import { PdfStructureInspector } from '../../features/evidence-tools/PdfStructureInspector';
import { DigitalSignaturePanel } from '../../features/evidence-tools/DigitalSignaturePanel';
import { GeotagCard } from '../../features/evidence-tools/GeotagCard';
import { OfficialQrLookup } from '../../features/evidence-tools/OfficialQrLookup';
import { VideoEvidencePanel } from '../../features/evidence-tools/VideoEvidencePanel';
import { FloorplanMeasureTool } from '../../features/floorplan-measure/FloorplanMeasureTool';
import { Wrench } from 'lucide-react';

export const EvidenceToolsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const validTools = ['duplicate', 'structure', 'signature', 'geotag', 'floorplan', 'video', 'qr'];
  const currentToolParam = searchParams.get('tool');
  const activeTab = validTools.includes(currentToolParam || '') ? (currentToolParam as string) : 'duplicate';

  const tabListRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: 'duplicate', label: '1. Duplicate Check (SHA-256)' },
    { id: 'structure', label: '2. PDF Byte Structure' },
    { id: 'signature', label: '3. Digital Signature' },
    { id: 'geotag', label: '4. Geotag & Haversine' },
    { id: 'floorplan', label: '5. Floor-Plan Measure' },
    { id: 'video', label: '6. Video Frame Strip' },
    { id: 'qr', label: '7. Official QR Sandbox' },
  ];

  const handleSelectTab = (id: string) => {
    setSearchParams({ tool: id }, { replace: true });
  };

  // Arrow key navigation across tabs
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIdx = (index + 1) % tabs.length;
      handleSelectTab(tabs[nextIdx].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIdx = (index - 1 + tabs.length) % tabs.length;
      handleSelectTab(tabs[prevIdx].id);
    }
  };

  // Keep active tab in view horizontally
  useEffect(() => {
    const activeEl = tabListRef.current?.querySelector(`[data-tab-id="${activeTab}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTab]);

  return (
    <div className="space-y-6 text-text font-sans">
      {/* Editorial Header */}
      <div className="border-b border-border pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-sans font-semibold text-[13px] text-accent-2 mb-2 tracking-[0.02em]">
            <Wrench className="w-4 h-4 text-accent-2" />
            <span>Forensic evidence verifiers · <span className="font-mono text-[0.9em]">§3.3 / §6 / §14</span></span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-normal text-text">
            Forensic evidence toolbox
          </h1>
          <p className="text-sm font-sans text-text-muted mt-2 max-w-[66ch] leading-relaxed">
            Client-side cryptographic hashing, PDF structure markers, PAdES signature boundaries, Haversine geospatial tolerances, and interactive floorplan polygon tracing.
          </p>
        </div>

        <div className="flex items-center gap-2 font-sans text-xs text-text-muted bg-surface px-3 py-1.5 border border-border rounded-xs shadow-subtle font-medium">
          <span className="w-2 h-2 rounded-full bg-st-pass animate-pulse" />
          <span>7 active forensic tools</span>
        </div>
      </div>

      {/* Synchronized Tab Strip with Arrow-Key Navigation */}
      <div
        ref={tabListRef}
        role="tablist"
        aria-label="Evidence Tools Navigation"
        className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto scrollbar-thin"
      >
        {tabs.map((tab, idx) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              data-tab-id={tab.id}
              data-state={isSelected ? 'active' : 'inactive'}
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => handleSelectTab(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`px-3.5 py-2 font-sans text-xs rounded-xs transition-colors whitespace-nowrap border ${
                isSelected
                  ? 'border-accent-2 bg-tint-teal text-accent-2 font-bold shadow-subtle'
                  : 'border-transparent text-text-muted hover:text-text hover:bg-surface-2'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Render Single Source of Truth Panel on Tinted Surface */}
      <div className="p-4 sm:p-6 bg-surface border border-border rounded-xs shadow-subtle">
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
