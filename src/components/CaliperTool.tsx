import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeftRight, Lock, Unlock, RotateCcw, FastForward, Info } from 'lucide-react';

interface CaliperToolProps {
  stripWidth: number;
  smallBoxPx: number; // 6px
  visible: boolean;
  onClose?: () => void;
  rPeakX1?: number;
  rPeakX2?: number;
}

export const CaliperTool: React.FC<CaliperToolProps> = ({
  stripWidth,
  smallBoxPx,
  visible,
  rPeakX1,
  rPeakX2
}) => {
  const [leftX, setLeftX] = useState<number>(rPeakX1 ?? 150);
  const [rightX, setRightX] = useState<number>(rPeakX2 ?? 270);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [activeDrag, setActiveDrag] = useState<'left' | 'right' | 'both' | null>(null);
  const dragStartRef = useRef<{ mouseX: number; initLeft: number; initRight: number }>({
    mouseX: 0,
    initLeft: 0,
    initRight: 0
  });

  // Sync if landmarks change
  useEffect(() => {
    if (rPeakX1 !== undefined && rPeakX2 !== undefined && rPeakX2 > rPeakX1) {
      setLeftX(rPeakX1);
      setRightX(rPeakX2);
    }
  }, [rPeakX1, rPeakX2]);

  const handlePointerDown = (type: 'left' | 'right' | 'both', e: React.PointerEvent) => {
    e.stopPropagation();
    setActiveDrag(type);
    dragStartRef.current = {
      mouseX: e.clientX,
      initLeft: leftX,
      initRight: rightX
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!activeDrag) return;
    const deltaX = e.clientX - dragStartRef.current.mouseX;
    const width = dragStartRef.current.initRight - dragStartRef.current.initLeft;

    if (activeDrag === 'both' || isLocked) {
      let newL = dragStartRef.current.initLeft + deltaX;
      let newR = newL + width;
      if (newL < 5) {
        newL = 5;
        newR = newL + width;
      }
      if (newR > stripWidth - 5) {
        newR = stripWidth - 5;
        newL = newR - width;
      }
      setLeftX(newL);
      setRightX(newR);
    } else if (activeDrag === 'left') {
      const newL = Math.max(5, Math.min(rightX - 10, dragStartRef.current.initLeft + deltaX));
      setLeftX(newL);
    } else if (activeDrag === 'right') {
      const newR = Math.max(leftX + 10, Math.min(stripWidth - 5, dragStartRef.current.initRight + deltaX));
      setRightX(newR);
    }
  }, [activeDrag, isLocked, leftX, rightX, stripWidth]);

  const handlePointerUp = (e: React.PointerEvent) => {
    setActiveDrag(null);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  // Step/March calipers right
  const marchRight = () => {
    const width = rightX - leftX;
    if (rightX + width <= stripWidth) {
      setLeftX(rightX);
      setRightX(rightX + width);
    } else {
      // Wrap around or nudge
      setLeftX(5);
      setRightX(5 + width);
    }
  };

  const marchLeft = () => {
    const width = rightX - leftX;
    if (leftX - width >= 5) {
      setRightX(leftX);
      setLeftX(leftX - width);
    }
  };

  const resetCalipers = () => {
    setLeftX(rPeakX1 ?? 150);
    setRightX(rPeakX2 ?? 270);
    setIsLocked(false);
  };

  if (!visible) return null;

  // Real-world ECG calculations
  const pixelDiff = Math.abs(rightX - leftX);
  const smallBoxes = pixelDiff / smallBoxPx;
  const largeBoxes = smallBoxes / 5;
  const seconds = smallBoxes * 0.04;
  const ms = Math.round(seconds * 1000);
  const calculatedBpm = smallBoxes > 0 ? Math.round(1500 / smallBoxes) : null;

  // Clinical interpretation
  let interpretation = '';
  if (seconds >= 0.12 && seconds <= 0.20) {
    interpretation = 'Normal PR Interval (0.12 - 0.20s)';
  } else if (seconds > 0.20 && seconds < 0.35) {
    interpretation = 'Prolonged PR Interval (First-Degree AV Block range)';
  } else if (seconds >= 0.04 && seconds <= 0.12) {
    interpretation = 'Normal QRS Duration (0.04 - 0.12s, Narrow)';
  } else if (seconds > 0.12 && seconds < 0.25) {
    interpretation = 'Wide QRS Complex (> 0.12s, Ventricular / BBB)';
  } else if (calculatedBpm && calculatedBpm >= 60 && calculatedBpm <= 100) {
    interpretation = `Normal Heart Rate (${calculatedBpm} bpm)`;
  } else if (calculatedBpm && calculatedBpm < 60) {
    interpretation = `Bradycardic Rate (${calculatedBpm} bpm)`;
  } else if (calculatedBpm && calculatedBpm > 100) {
    interpretation = `Tachycardic Rate (${calculatedBpm} bpm)`;
  }

  const minX = Math.min(leftX, rightX);
  const maxX = Math.max(leftX, rightX);
  const centerX = (minX + maxX) / 2;

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none z-20"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Visual Caliper Span Line & Ruler */}
      <svg className="w-full h-full absolute inset-0 overflow-visible pointer-events-none">
        {/* Shaded Measurement Zone */}
        <rect
          x={minX}
          y={20}
          width={maxX - minX}
          height={160}
          fill="rgba(244, 115, 33, 0.08)"
          stroke="rgba(244, 115, 33, 0.3)"
          strokeDasharray="3 3"
        />

        {/* Top Span Connector Line */}
        <line
          x1={minX}
          y1={35}
          x2={maxX}
          y2={35}
          stroke="#F47321"
          strokeWidth="2.5"
        />

        {/* Left Caliper Needle (Miami Orange) */}
        <line
          x1={minX}
          y1={25}
          x2={minX}
          y2={180}
          stroke="#F47321"
          strokeWidth="2.2"
        />
        {/* Left Arrow Point */}
        <polygon
          points={`${minX - 5},25 ${minX + 5},25 ${minX},35`}
          fill="#F47321"
        />

        {/* Right Caliper Needle (Miami Green) */}
        <line
          x1={maxX}
          y1={25}
          x2={maxX}
          y2={180}
          stroke="#005030"
          strokeWidth="2.2"
        />
        {/* Right Arrow Point */}
        <polygon
          points={`${maxX - 5},25 ${maxX + 5},25 ${maxX},35`}
          fill="#005030"
        />
      </svg>

      {/* Draggable Handle: Center Bar (Move Both) */}
      <div
        style={{ left: `${minX}px`, width: `${maxX - minX}px`, top: '15px' }}
        onPointerDown={(e) => handlePointerDown('both', e)}
        className="absolute h-10 pointer-events-auto cursor-grab active:cursor-grabbing flex items-center justify-center group"
        title="Drag whole caliper across strip"
      >
        <div className="bg-[#FFFFFF] border border-[#F47321]/40 text-[#005030] text-[11px] font-mono px-2 py-0.5 rounded shadow-sm group-hover:border-[#F47321] transition-colors flex items-center gap-1.5 backdrop-blur-xs">
          <ArrowLeftRight className="w-3 h-3 text-[#F47321]" />
          <span className="font-bold">{seconds.toFixed(2)}s · {ms}ms</span>
        </div>
      </div>

      {/* Draggable Handle: Left Needle Tip (Miami Orange) */}
      <div
        style={{ left: `${minX - 12}px`, top: '80px' }}
        onPointerDown={(e) => handlePointerDown('left', e)}
        className="absolute w-6 h-12 pointer-events-auto cursor-ew-resize flex items-center justify-center group"
        title="Drag Left Needle (Miami Orange)"
      >
        <div className="w-4 h-6 rounded-full bg-[#F47321] text-white flex items-center justify-center shadow-md ring-2 ring-white text-[9px] font-bold group-hover:scale-110 transition-transform">
          L
        </div>
      </div>

      {/* Draggable Handle: Right Needle Tip (Miami Green) */}
      <div
        style={{ left: `${maxX - 12}px`, top: '80px' }}
        onPointerDown={(e) => handlePointerDown('right', e)}
        className="absolute w-6 h-12 pointer-events-auto cursor-ew-resize flex items-center justify-center group"
        title="Drag Right Needle (Miami Green)"
      >
        <div className="w-4 h-6 rounded-full bg-[#005030] text-white flex items-center justify-center shadow-md ring-2 ring-white text-[9px] font-bold group-hover:scale-110 transition-transform">
          R
        </div>
      </div>

      {/* Caliper Floating Control Dock */}
      <div
        style={{
          left: `${Math.max(20, Math.min(stripWidth - 280, centerX - 130))}px`,
          top: '190px'
        }}
        className="absolute pointer-events-auto bg-[#FFFFFF] border border-[#E0EAE4] text-[#0D1F17] px-3 py-2 rounded-lg shadow-md text-xs z-30 flex flex-col gap-1.5 w-64"
      >
        <div className="flex items-center justify-between border-b border-[#EBF3EE] pb-1">
          <div className="flex items-center gap-1.5 text-[#005030] font-bold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#F47321]" />
            <span>UHealth Digital Calipers</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsLocked(!isLocked)}
              className={`p-1 rounded text-[10px] transition-colors ${
                isLocked ? 'bg-[#FEF2EB] text-[#F47321] font-semibold' : 'text-[#61796F] hover:bg-[#F5F8F6]'
              }`}
              title={isLocked ? 'Caliper locked (width fixed)' : 'Caliper unlocked'}
            >
              {isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
            </button>
            <button
              onClick={resetCalipers}
              className="p-1 text-[#61796F] hover:text-[#005030] rounded hover:bg-[#F5F8F6]"
              title="Reset calipers to default R-R"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Readout Metrics */}
        <div className="grid grid-cols-3 gap-1.5 font-mono text-center">
          <div className="bg-[#F5F8F6] p-1 rounded border border-[#E0EAE4]">
            <span className="text-[9px] text-[#61796F] block font-sans">Interval</span>
            <span className="font-bold text-[#F47321] text-[11px]">{seconds.toFixed(2)}s</span>
          </div>
          <div className="bg-[#F5F8F6] p-1 rounded border border-[#E0EAE4]">
            <span className="text-[9px] text-[#61796F] block font-sans">Boxes</span>
            <span className="font-bold text-[#005030] text-[11px]">{smallBoxes.toFixed(1)} sm</span>
          </div>
          <div className="bg-[#F5F8F6] p-1 rounded border border-[#E0EAE4]">
            <span className="text-[9px] text-[#61796F] block font-sans">Rate</span>
            <span className="font-bold text-[#005030] text-[11px]">{calculatedBpm ? `${calculatedBpm}` : '--'}</span>
          </div>
        </div>

        {/* Clinical Meaning Tag */}
        {interpretation && (
          <div className="text-[10px] text-[#005030] bg-[#EBF3EE] px-2 py-1 rounded border border-[#005030]/20 font-medium leading-tight">
            {interpretation}
          </div>
        )}

        {/* Marching Assistant Button */}
        <div className="flex items-center justify-between pt-1 border-t border-[#EBF3EE] text-[10px]">
          <span className="text-[#61796F] font-medium">March Calipers:</span>
          <div className="flex items-center gap-1 font-mono">
            <button
              onClick={marchLeft}
              className="px-2 py-0.5 bg-[#F5F8F6] hover:bg-[#EBF3EE] text-[#005030] rounded border border-[#E0EAE4] transition-colors"
              title="Step calipers left by 1 interval"
            >
              ← Left
            </button>
            <button
              onClick={marchRight}
              className="px-2 py-0.5 bg-[#FEF2EB] hover:bg-[#FDE2D2] text-[#F47321] rounded border border-[#F47321]/30 font-semibold transition-colors flex items-center gap-0.5"
              title="Step calipers right by 1 interval"
            >
              <span>Right</span>
              <FastForward className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
