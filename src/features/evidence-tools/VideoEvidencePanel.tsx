import React, { useState } from 'react';
import { Film, Tag, BookmarkPlus } from 'lucide-react';

interface SampledFrame {
  id: string;
  timestamp: string; // e.g. "00:04.200"
  seconds: number;
  label: string;
  description: string;
  facilityClaim: string;
  isMarked?: boolean;
}

const mockFrames: SampledFrame[] = [
  {
    id: 'FR-01',
    timestamp: '00:02.150',
    seconds: 2.15,
    label: 'Main Entrance & Ramps',
    description: 'Divyangjan barrier-free ramp leading to ground floor entrance.',
    facilityClaim: 'Accessible Infrastructure Norm §4.2',
  },
  {
    id: 'FR-02',
    timestamp: '00:08.400',
    seconds: 8.4,
    label: 'Computer Centre Terminal Array',
    description: '120 active terminal workstations with dual LAN routing.',
    facilityClaim: 'Minimum Terminal Ratio (1:4 approved intake)',
  },
  {
    id: 'FR-03',
    timestamp: '00:15.820',
    seconds: 15.82,
    label: 'Central Library Reading Hall',
    description: 'Instructional reading floor with seating capacity marked.',
    facilityClaim: 'Instructional Library Carpet Area (400 sq.m.)',
  },
  {
    id: 'FR-04',
    timestamp: '00:23.100',
    seconds: 23.1,
    label: 'Chemistry Laboratory Fume Hoods',
    description: 'Safety ventilation hood systems and eyewash station.',
    facilityClaim: 'Essential Safety Norms & Exhaust Compliance',
  },
  {
    id: 'FR-05',
    timestamp: '00:31.500',
    seconds: 31.5,
    label: 'Fire Exit & Fire Hose Reel',
    description: 'Operational fire suppression cabinet adjacent to staircase.',
    facilityClaim: 'Fire Safety Certificate Cross-Check',
  },
];

export const VideoEvidencePanel: React.FC = () => {
  const [frames, setFrames] = useState<SampledFrame[]>(mockFrames);
  const [selectedFrame, setSelectedFrame] = useState<SampledFrame>(mockFrames[1]);
  const [claimAnnotation, setClaimAnnotation] = useState<string>('');

  const toggleBookmark = (frameId: string) => {
    setFrames((prev) =>
      prev.map((f) => (f.id === frameId ? { ...f, isMarked: !f.isMarked } : f))
    );
  };

  return (
    <div className="bg-surface border border-border rounded-md overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 bg-surface-2 border-b border-border flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-wider text-slate">
            TEMPORAL INFRASTRUCTURE EVIDENCE · §3.3
          </div>
          <h3 className="text-sm font-serif font-bold text-text mt-0.5">
            Campus Walkthrough Video Frame Sampling
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-surface-2 border border-border rounded font-mono text-[10px] text-slate">
            ADVISORY LABELS ONLY
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <p className="text-xs text-slate leading-relaxed">
          Sampled-frame inspection strip with calibrated timestamps. Officers can inspect keyframes,
          correlate physical layout with declared architectural blueprints, and attach advisory evidentiary annotations.
        </p>

        {/* Video Canvas Simulation */}
        <div className="relative aspect-video bg-bg border border-border rounded flex items-center justify-center overflow-hidden">
          {/* Simulated Frame Preview with Timestamp Stamp */}
          <div className="w-full h-full p-8 flex flex-col justify-between bg-gradient-to-t from-black via-neutral-900 to-black/80">
            <div className="flex items-center justify-between font-mono text-[11px] text-slate">
              <div className="flex items-center gap-2 bg-surface-2 px-2 py-1 rounded border border-border">
                <span className="w-2 h-2 rounded-full bg-vermilion animate-pulse" />
                <span className="text-text font-bold">FRAME {selectedFrame.id}</span>
                <span>·</span>
                <span className="text-ochre">{selectedFrame.timestamp}</span>
              </div>
              <div className="bg-surface-2 px-2 py-1 rounded border border-border text-slate">
                FPS: 29.97 · H.264 MP4
              </div>
            </div>

            {/* Frame Subject Watermark */}
            <div className="text-center space-y-2 py-8">
              <Film className="w-12 h-12 text-slate/40 mx-auto" />
              <div className="font-serif font-bold text-xl text-text">
                {selectedFrame.label}
              </div>
              <p className="text-xs font-mono text-slate max-w-md mx-auto">
                {selectedFrame.description}
              </p>
            </div>

            {/* Bottom Bar inside simulated player */}
            <div className="flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2 text-slate">
                <Tag className="w-3.5 h-3.5 text-ochre" />
                <span>Linked Claim: </span>
                <span className="text-text font-bold">{selectedFrame.facilityClaim}</span>
              </div>

              {selectedFrame.isMarked && (
                <span className="px-2 py-0.5 bg-ochre/20 text-ochre border border-ochre/40 rounded text-[10px] font-bold flex items-center gap-1">
                  <BookmarkPlus className="w-3 h-3" />
                  <span>BOOKMARKED FOR DOSSIER</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Frame Strip */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono uppercase text-slate tracking-wider">
            Sampled Frame Strip (True Timestamp Interval)
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {frames.map((frame) => (
              <button
                key={frame.id}
                type="button"
                onClick={() => setSelectedFrame(frame)}
                className={`p-2.5 rounded border text-left transition-all relative ${
                  selectedFrame.id === frame.id
                    ? 'bg-st-structure-bg border-st-structure'
                    : 'bg-surface-2 border-border hover:border-white/25'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-slate mb-1">
                  <span>{frame.id}</span>
                  <span className="text-ochre">{frame.timestamp}</span>
                </div>
                <div className="text-xs font-serif font-bold text-text truncate">
                  {frame.label}
                </div>
                <div className="text-[10px] font-mono text-slate truncate mt-0.5">
                  {frame.facilityClaim}
                </div>

                {frame.isMarked && (
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-ochre" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Annotation & Claim Attachment */}
        <div className="p-4 bg-surface-2 border border-border rounded space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate">
              Officer Evidentiary Annotation for Frame {selectedFrame.id}:
            </span>
            <button
              onClick={() => toggleBookmark(selectedFrame.id)}
              className="text-xs font-mono text-ochre hover:underline flex items-center gap-1"
            >
              <BookmarkPlus className="w-3.5 h-3.5" />
              <span>{selectedFrame.isMarked ? 'Remove Bookmark' : 'Bookmark Frame'}</span>
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={claimAnnotation}
              onChange={(e) => setClaimAnnotation(e.target.value)}
              placeholder="e.g. Verified Divyangjan handrail and slope angle matches Form 1 declarations."
              className="flex-1 bg-surface border border-border rounded p-2.5 text-xs text-text font-mono focus:border-verdigris outline-none"
            />
            <button
              onClick={() => {
                if (claimAnnotation) {
                  toggleBookmark(selectedFrame.id);
                  setClaimAnnotation('');
                }
              }}
              className="px-4 py-2.5 bg-surface-2 hover:bg-white/20 text-text font-mono text-xs rounded transition-colors"
            >
              Attach Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
