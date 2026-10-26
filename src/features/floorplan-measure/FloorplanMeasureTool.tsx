import React, { useRef, useState, useEffect } from 'react';
import {
  Point2D,
  derivePixelsPerMeter,
  computeShoelaceArea,
  evaluateAreaTolerance,
  euclideanDistance,
} from '../../services/geometry';
import { StatusPill } from '../../components/ui/StatusPill';
import { Button } from '../../components/ui/Button';
import {
  Ruler,
  Maximize2,
  Trash2,
  CheckCircle2,
  Upload,
} from 'lucide-react';

export const FloorplanMeasureTool: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Calibration state
  const [statedScaleLength, setStatedScaleLength] = useState<number>(10); // 10 meters
  const [scalePoints, setScalePoints] = useState<Point2D[]>([
    { x: 50, y: 380 },
    { x: 250, y: 380 },
  ]); // Default 200px = 10m => 20 px/m
  const [pixelsPerMeter, setPixelsPerMeter] = useState<number>(20);

  // Polygon room tracing state
  const [polygonPoints, setPolygonPoints] = useState<Point2D[]>([
    { x: 80, y: 80 },
    { x: 380, y: 80 },
    { x: 380, y: 280 },
    { x: 80, y: 280 },
  ]); // 300px * 200px => (15m * 10m) = 150 sqm

  const [mode, setMode] = useState<'SCALE' | 'POLYGON'>('POLYGON');
  const [declaredAreaSqm, setDeclaredAreaSqm] = useState<number>(150);
  const [tolerancePercent, setTolerancePercent] = useState<number>(5.0);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [savedSession, setSavedSession] = useState<boolean>(false);

  // Recalculate pixels per meter whenever scale points or stated length changes
  useEffect(() => {
    if (scalePoints.length === 2 && statedScaleLength > 0) {
      try {
        const ppm = derivePixelsPerMeter(scalePoints[0], scalePoints[1], statedScaleLength);
        setPixelsPerMeter(ppm);
      } catch (e) {
        // Points might overlap while clicking
      }
    }
  }, [scalePoints, statedScaleLength]);

  // Derived metrics
  const computedAreaSqm = computeShoelaceArea(polygonPoints, pixelsPerMeter);
  const toleranceEval = evaluateAreaTolerance(computedAreaSqm, declaredAreaSqm, tolerancePercent);

  // Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // If custom image loaded, render it; otherwise draw synthetic blueprint grid
    if (customImage) {
      const img = new Image();
      img.src = customImage;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    } else {
      // Blueprint grid background
      ctx.fillStyle = '#0E1726';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Simulated blueprint architectural walls
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 2;
      ctx.strokeRect(60, 60, 360, 260); // outer wall

      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillStyle = '#94A3B8';
      ctx.fillText('LABORATORY WING - BLOCK B (AICTE APPROVED FLOORPLAN)', 70, 50);
      ctx.fillText('SCALE BAR REF', 50, 365);
    }

    // Render Scale Bar Line & Points
    if (scalePoints.length > 0) {
      ctx.strokeStyle = '#F59E0B'; // ochre
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(scalePoints[0].x, scalePoints[0].y);
      if (scalePoints.length === 2) {
        ctx.lineTo(scalePoints[1].x, scalePoints[1].y);
      }
      ctx.stroke();

      // Tick markers at scale bar ends
      scalePoints.forEach((pt, i) => {
        ctx.fillStyle = '#F59E0B';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillStyle = '#FDE68A';
        ctx.fillText(`P${i + 1}`, pt.x - 8, pt.y - 10);
      });

      if (scalePoints.length === 2) {
        const midX = (scalePoints[0].x + scalePoints[1].x) / 2;
        const midY = (scalePoints[0].y + scalePoints[1].y) / 2;
        ctx.fillStyle = '#FDE68A';
        ctx.font = '11px JetBrains Mono, monospace';
        ctx.fillText(`${statedScaleLength}m (${Math.round(euclideanDistance(scalePoints[0], scalePoints[1]))}px)`, midX - 25, midY - 8);
      }
    }

    // Render Polygon Room Trace
    if (polygonPoints.length > 0) {
      ctx.beginPath();
      ctx.moveTo(polygonPoints[0].x, polygonPoints[0].y);
      for (let i = 1; i < polygonPoints.length; i++) {
        ctx.lineTo(polygonPoints[i].x, polygonPoints[i].y);
      }
      if (polygonPoints.length >= 3) {
        ctx.closePath();
        ctx.fillStyle = 'rgba(31, 107, 92, 0.25)'; // verdigris translucent
        ctx.fill();
      }

      ctx.strokeStyle = '#1F6B5C';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Polygon vertices
      polygonPoints.forEach((pt, i) => {
        ctx.fillStyle = '#2DD4BF';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '9px JetBrains Mono, monospace';
        ctx.fillStyle = '#EDE7DA';
        ctx.fillText(`V${i + 1}`, pt.x + 6, pt.y + 4);
      });
    }
  }, [scalePoints, polygonPoints, customImage, statedScaleLength]);

  // Handle canvas clicks
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    if (mode === 'SCALE') {
      if (scalePoints.length >= 2) {
        setScalePoints([{ x, y }]);
      } else {
        setScalePoints([...scalePoints, { x, y }]);
      }
    } else {
      setPolygonPoints([...polygonPoints, { x, y }]);
    }
  };

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="bg-[#141413] border border-white/10 rounded-md overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 bg-[#171715] border-b border-white/10 flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-wider text-slate">
            CANVAS GEOMETRY ENGINE · §6
          </div>
          <h3 className="text-sm font-serif font-bold text-[#EDE7DA] mt-0.5">
            Architectural Floor-Plan Area Measurement
          </h3>
        </div>

        {toleranceEval.isWithinTolerance ? (
          <StatusPill status="PASS" label="WITHIN AREA TOLERANCE" />
        ) : (
          <StatusPill status="MISMATCH_FOUND" label="AREA DEFICIENCY FOUND" />
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-[#181816] border border-white/10 rounded text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate uppercase text-[10px]">Active Cursor Mode:</span>
            <button
              onClick={() => setMode('SCALE')}
              className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                mode === 'SCALE'
                  ? 'bg-ochre text-white font-bold'
                  : 'bg-black/30 text-slate hover:text-white'
              }`}
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>1. Calibrate Scale ({scalePoints.length}/2 pts)</span>
            </button>

            <button
              onClick={() => setMode('POLYGON')}
              className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                mode === 'POLYGON'
                  ? 'bg-verdigris text-white font-bold'
                  : 'bg-black/30 text-slate hover:text-white'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>2. Trace Room Polygon ({polygonPoints.length} vertices)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPolygonPoints([])}
              className="p-1.5 text-slate hover:text-vermilion transition-colors"
              title="Clear Polygon Vertices"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <label className="px-3 py-1.5 bg-black/40 border border-white/10 hover:border-white/30 text-slate hover:text-white rounded cursor-pointer transition-colors flex items-center gap-1.5 text-[11px]">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Custom Plan</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleCustomImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* 2-Column Main Workspace */}
        <div className="grid grid-cols-12 gap-6">
          {/* Canvas area (8 cols) */}
          <div className="col-span-12 lg:col-span-8 space-y-2">
            <div className="border border-white/15 rounded bg-black relative overflow-hidden flex justify-center">
              <canvas
                ref={canvasRef}
                width={560}
                height={420}
                onClick={handleCanvasClick}
                className="cursor-crosshair block select-none"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate">
              <span>Click to add vertices. Switch to Calibrate Scale to re-anchor the 2 scale bar points.</span>
              <span className="text-ochre">Scale: {pixelsPerMeter.toFixed(2)} px / meter</span>
            </div>
          </div>

          {/* Derivation Parameters & Shoelace Formula Results (4 cols) */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            {/* Calibration Params */}
            <div className="p-4 bg-[#181816] border border-white/10 rounded space-y-3 font-mono text-xs">
              <div className="text-[10px] uppercase text-slate font-bold">
                Scale Calibration Parameter
              </div>
              <div>
                <label className="block text-[11px] text-slate mb-1">
                  Stated Scale Bar Length (Meters):
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={statedScaleLength}
                  onChange={(e) => setStatedScaleLength(Number(e.target.value))}
                  className="w-full bg-[#141413] border border-white/15 rounded p-2 text-white font-bold"
                />
              </div>
              <div className="text-[10px] text-slate">
                Pixel distance: {scalePoints.length === 2 ? Math.round(euclideanDistance(scalePoints[0], scalePoints[1])) : 0} px
              </div>
            </div>

            {/* Shoelace Calculation Box */}
            <div className="p-4 bg-[#181816] border border-white/10 rounded space-y-3 font-mono text-xs">
              <div className="text-[10px] uppercase text-slate font-bold">
                Shoelace Formula Output
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-slate">Computed Area:</span>
                <span className="text-lg font-serif font-bold text-white">
                  {computedAreaSqm.toFixed(2)} sq.m.
                </span>
              </div>

              <div>
                <label className="block text-[11px] text-slate mb-1">
                  Declared Carpet Area in Form:
                </label>
                <input
                  type="number"
                  value={declaredAreaSqm}
                  onChange={(e) => setDeclaredAreaSqm(Number(e.target.value))}
                  className="w-full bg-[#141413] border border-white/15 rounded p-2 text-white font-bold"
                />
              </div>

              <div className="pt-2 border-t border-white/5 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate">Area Delta:</span>
                  <span className={toleranceEval.deltaSqm < 0 ? 'text-vermilion' : 'text-verdigris'}>
                    {toleranceEval.deltaSqm > 0 ? `+${toleranceEval.deltaSqm}` : toleranceEval.deltaSqm} sq.m. ({toleranceEval.deltaPercent}%)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate">Statutory Tolerance:</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={1}
                      max={20}
                      step={0.5}
                      value={tolerancePercent}
                      onChange={(e) => setTolerancePercent(Number(e.target.value))}
                      className="w-14 bg-[#141413] border border-white/10 rounded px-1.5 py-0.5 text-right text-white font-mono text-[11px]"
                    />
                    <span className="text-slate">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Session Persistence Action */}
            <Button
              onClick={() => {
                setSavedSession(true);
                setTimeout(() => setSavedSession(false), 3000);
              }}
              variant="primary"
              className="w-full text-xs font-mono flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{savedSession ? 'Evidence Session Saved!' : 'Save as measurement_session'}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
