import React, { useState } from 'react';
import { StatusPill } from '../../components/ui/StatusPill';
import { haversineDistanceMeters } from '../../services/geometry';
import { MapPin, Compass, AlertCircle, CheckCircle2 } from 'lucide-react';

interface GeotagCardProps {
  initialDeclaredCoords?: [number, number]; // [lat, lon]
}

export const GeotagCard: React.FC<GeotagCardProps> = ({
  initialDeclaredCoords = [17.4399, 78.4983], // Hyderabad campus coords
}) => {
  const [photoState, setPhotoState] = useState<'WITH_GEOTAG' | 'GEOTAG_ABSENT'>('WITH_GEOTAG');
  const [toleranceMeters, setToleranceMeters] = useState<number>(250);

  // Photo EXIF coordinates
  const photoCoords: [number, number] = [17.4412, 78.4975]; // ~165 meters away

  const distanceMeters =
    photoState === 'WITH_GEOTAG'
      ? haversineDistanceMeters(
          initialDeclaredCoords[0],
          initialDeclaredCoords[1],
          photoCoords[0],
          photoCoords[1]
        )
      : null;

  const isWithinTolerance = distanceMeters !== null && distanceMeters <= toleranceMeters;

  return (
    <div className="bg-surface border border-border rounded-md overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 bg-surface-2 border-b border-border flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-wider text-slate">
            PHYSICAL INFRASTRUCTURE EVIDENCE · §3.3
          </div>
          <h3 className="text-sm font-serif font-bold text-text mt-0.5">
            Campus Photo Geotag Verification
          </h3>
        </div>

        {photoState === 'WITH_GEOTAG' ? (
          isWithinTolerance ? (
            <StatusPill status="PASS" label="COORDINATES MATCH CAMPUS" />
          ) : (
            <StatusPill status="MISMATCH_FOUND" label="EXCEEDS TOLERANCE" />
          )
        ) : (
          <StatusPill status="GEOTAG_ABSENT" />
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* Toggle between with Geotag and Geotag Absent */}
        <div className="flex items-center justify-between p-3 bg-surface-2 border border-border rounded text-xs font-mono">
          <span className="text-slate">EXIF Metadata Mode:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPhotoState('WITH_GEOTAG')}
              className={`px-3 py-1 rounded transition-colors ${
                photoState === 'WITH_GEOTAG'
                  ? 'bg-white/20 text-text font-bold'
                  : 'text-slate hover:text-text'
              }`}
            >
              Photo with EXIF GPS
            </button>
            <button
              onClick={() => setPhotoState('GEOTAG_ABSENT')}
              className={`px-3 py-1 rounded transition-colors ${
                photoState === 'GEOTAG_ABSENT'
                  ? 'bg-ochre text-text font-bold'
                  : 'text-slate hover:text-text'
              }`}
            >
              Simulate GEOTAG_ABSENT
            </button>
          </div>
        </div>

        {/* Copy Rule clarification for GEOTAG_ABSENT */}
        <div className="p-3 bg-surface-2 border border-border rounded text-[11px] text-slate flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-ochre flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-text">Statutory Status Rule:</strong>{' '}
            <code className="text-ochre font-mono font-bold">GEOTAG_ABSENT</code> is rendered as an
            outlined ochre pill. It represents missing auxiliary sensor metadata and is{' '}
            <strong className="text-text">NOT treated as a failure or deficiency</strong> unless mandatory
            geotagging was statutory for the specific category.
          </div>
        </div>

        {/* Coords & Distance Comparison */}
        {photoState === 'WITH_GEOTAG' && distanceMeters !== null ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Declared Campus Coords */}
              <div className="p-4 bg-surface-2 border border-border rounded space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate">
                  <span className="flex items-center gap-1.5 text-text font-bold">
                    <MapPin className="w-3.5 h-3.5 text-verdigris" />
                    Declared Campus Boundary Center
                  </span>
                  <span>Land Title Deed</span>
                </div>
                <div className="p-2.5 bg-surface-2 rounded font-mono text-xs text-text">
                  Lat: {initialDeclaredCoords[0].toFixed(4)}° N, Lon: {initialDeclaredCoords[1].toFixed(4)}° E
                </div>
              </div>

              {/* Photo EXIF Coords */}
              <div className="p-4 bg-surface-2 border border-border rounded space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate">
                  <span className="flex items-center gap-1.5 text-text font-bold">
                    <Compass className="w-3.5 h-3.5 text-ochre" />
                    Photo EXIF Header GPS
                  </span>
                  <span>Hardware Sensor</span>
                </div>
                <div className="p-2.5 bg-surface-2 rounded font-mono text-xs text-text">
                  Lat: {photoCoords[0].toFixed(4)}° N, Lon: {photoCoords[1].toFixed(4)}° E
                </div>
              </div>
            </div>

            {/* Tolerance Slider & Haversine Delta */}
            <div className="p-4 bg-surface-2 border border-border rounded space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono uppercase text-slate">
                    Haversine Great-Circle Distance:
                  </div>
                  <div className="text-lg font-serif font-bold text-text mt-0.5">
                    {distanceMeters} meters
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono uppercase text-slate">
                    Configurable Radius Tolerance:
                  </div>
                  <div className="text-lg font-serif font-bold text-ochre mt-0.5">
                    {toleranceMeters} meters
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-slate">
                  <span>Strict (100m)</span>
                  <span>Standard AICTE Campus Radius (250m)</span>
                  <span>Generous (500m)</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={600}
                  step={25}
                  value={toleranceMeters}
                  onChange={(e) => setToleranceMeters(Number(e.target.value))}
                  className="w-full accent-ochre"
                />
              </div>

              <div
                className={`p-3 rounded text-xs font-mono flex items-center gap-2 ${
                  isWithinTolerance
                    ? 'bg-verdigris/10 border border-verdigris/30 text-verdigris'
                    : 'bg-vermilion/10 border border-vermilion/30 text-vermilion'
                }`}
              >
                {isWithinTolerance ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>
                      Photo location is within acceptable {toleranceMeters}m campus perimeter (Delta: {distanceMeters}m).
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>
                      Photo location exceeds campus radius tolerance of {toleranceMeters}m by {distanceMeters - toleranceMeters}m.
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-surface-2 border border-ochre/20 rounded space-y-2">
            <Compass className="w-10 h-10 text-ochre mx-auto opacity-70" />
            <h4 className="text-sm font-serif font-bold text-text">
              No EXIF GPS Header Found in Image File
            </h4>
            <p className="text-xs text-slate max-w-md mx-auto">
              Camera did not embed latitude/longitude metadata. Under solution rule §3.3, this produces
              <code className="text-ochre font-mono ml-1">GEOTAG_ABSENT</code> (outlined pill) requiring manual
              verification, rather than registering a system failure.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
