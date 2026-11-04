import React, { useState, useEffect, useRef, useMemo } from 'react';
import { RhythmData } from '../types/ekg';
import { generateWaveformForRhythm, GeneratedStrip } from '../utils/waveformGenerator';
import { CaliperTool } from './CaliperTool';
import { telemetryAudio } from '../utils/audioTelemetry';
import { getRhythmVariants } from '../data/rhythmDatabase';
import { Volume2, VolumeX, Play, Pause, Compass, Eye, Sparkles, Layers, ZoomIn, ZoomOut, Maximize2, Dices } from 'lucide-react';

interface StripViewerProps {
  rhythm: RhythmData;
  onSelectLandmark?: (name: string) => void;
}

export const StripViewer: React.FC<StripViewerProps> = ({ rhythm }) => {
  const [theme, setTheme] = useState<'pink' | 'dark'>('pink');
  const [isSweeping, setIsSweeping] = useState<boolean>(false);
  const [sweepX, setSweepX] = useState<number>(0);
  const [calipersActive, setCalipersActive] = useState<boolean>(true);
  const [showAnnotations, setShowAnnotations] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.3);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedVariantSeed, setSelectedVariantSeed] = useState<number>(0);

  const zoomIn = () => setZoomLevel((z) => Math.min(2, Math.round((z + 0.25) * 100) / 100));
  const zoomOut = () => setZoomLevel((z) => Math.max(0.75, Math.round((z - 0.25) * 100) / 100));
  const resetZoom = () => setZoomLevel(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  const stripWidth = 900;
  const stripHeight = 210;

  // Variants list for this rhythm
  const variants = useMemo(() => getRhythmVariants(rhythm.id), [rhythm.id]);
  const currentVariant = variants.find((v) => v.seed === selectedVariantSeed) || variants[0];

  // Reset variant when rhythm changes
  useEffect(() => {
    setSelectedVariantSeed(0);
  }, [rhythm.id]);

  // Generate waveform points with selected variant
  const stripData: GeneratedStrip = useMemo(() => {
    return generateWaveformForRhythm(rhythm, stripWidth, stripHeight, selectedVariantSeed);
  }, [rhythm, selectedVariantSeed]);

  // Audio telemetry management
  useEffect(() => {
    if (audioEnabled) {
      telemetryAudio.setMute(false);
      telemetryAudio.setVolume(volume);
      telemetryAudio.startRhythmLoop(rhythm.id, rhythm.rateBpm);
    } else {
      telemetryAudio.setMute(true);
      telemetryAudio.stop();
    }

    return () => {
      telemetryAudio.stop();
    };
  }, [audioEnabled, rhythm, volume]);

  // Sweep animation loop
  useEffect(() => {
    if (!isSweeping) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    let lastTime = performance.now();
    const speedPxPerSec = 150; // 25 mm/s at 6px/mm = 150px/sec

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      setSweepX((prev) => {
        const next = prev + speedPxPerSec * dt;
        return next > stripWidth ? 0 : next;
      });
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isSweeping]);

  const toggleAudio = () => {
    setAudioEnabled((prev) => !prev);
  };

  const firstR = stripData.landmarks[0]?.rPeakX ?? 150;
  const secondR = stripData.landmarks[1]?.rPeakX ?? (firstR + 120);

  return (
    <div className="bg-[#FFFFFF] border border-[#E0EAE4] rounded-xl overflow-hidden shadow-xs flex flex-col">
      {/* Top Telemetry Strip Bar */}
      <div className="px-4 py-2.5 bg-[#F5F8F6] border-b border-[#E0EAE4] flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Lead, Hospital, and Patient Rate Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-mono">
            <span className="bg-[#005030] text-white px-2 py-0.5 rounded text-[11px] font-bold">
              LEAD II
            </span>
            <span className="text-[#005030] font-bold text-sm">{rhythm.heartRate}</span>
            <span className="text-[#A6BFB0]">·</span>
            <span className="text-[#005030] font-semibold text-xs hidden md:inline">
              UHealth Tower CCU Bed 04
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#61796F] font-mono">
            <span>25 mm/s</span>
            <span>·</span>
            <span>10 mm/mV</span>
            <span>·</span>
            <span>CAL: 1mV = 10mm</span>
          </div>
        </div>

        {/* Right: Interactive Controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Caliper Toggle */}
          <button
            onClick={() => setCalipersActive(!calipersActive)}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              calipersActive
                ? 'bg-[#FEF2EB] text-[#F47321] border border-[#F47321]/40'
                : 'text-[#4B6358] hover:bg-[#EBF3EE]'
            }`}
            title="Toggle measurement calipers"
          >
            <Compass className="w-3.5 h-3.5 text-[#F47321]" />
            <span>Calipers {calipersActive ? 'ON' : 'OFF'}</span>
          </button>

          {/* Wave Annotations Toggle */}
          <button
            onClick={() => setShowAnnotations(!showAnnotations)}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              showAnnotations
                ? 'bg-[#EBF3EE] text-[#005030] border border-[#005030]/30'
                : 'text-[#4B6358] hover:bg-[#EBF3EE]'
            }`}
            title="Highlight P, QRS, and T waves"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Wave Marks</span>
          </button>

          {/* Live Sweep Toggle */}
          <button
            onClick={() => setIsSweeping(!isSweeping)}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              isSweeping
                ? 'bg-[#005030] text-white shadow-xs'
                : 'text-[#4B6358] hover:bg-[#EBF3EE]'
            }`}
            title="Toggle animated monitor sweep"
          >
            {isSweeping ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#F47321]" />}
            <span>{isSweeping ? 'Freeze' : 'Live Sweep'}</span>
          </button>

          {/* Sound Audio Toggle */}
          <button
            onClick={toggleAudio}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              audioEnabled
                ? 'bg-[#F47321] text-white shadow-xs'
                : 'text-[#4B6358] hover:bg-[#EBF3EE]'
            }`}
            title="Telemetry monitor beeps and emergency alarms"
          >
            {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-[#A6BFB0]" />}
            <span>{audioEnabled ? 'Beep ON' : 'Audio'}</span>
          </button>

          {/* Zoom In/Out Controls */}
          <div className="flex items-center bg-[#EBF3EE] p-0.5 rounded ml-1 font-mono text-[11px] border border-[#DDE7E1]">
            <button
              onClick={zoomOut}
              disabled={zoomLevel <= 0.75}
              className="p-1 text-[#61796F] hover:text-[#005030] disabled:opacity-30 rounded hover:bg-white transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={resetZoom}
              className="px-1.5 py-0.5 text-[#005030] hover:text-[#003D24] rounded hover:bg-white text-[10px] font-bold"
              title="Reset zoom to 100%"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={zoomIn}
              disabled={zoomLevel >= 2.0}
              className="p-1 text-[#61796F] hover:text-[#005030] disabled:opacity-30 rounded hover:bg-white transition-colors"
              title="Zoom in (enlarge millimeter grid)"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Paper Style Switcher */}
          <div className="flex items-center bg-[#EBF3EE] p-0.5 rounded ml-1 border border-[#DDE7E1]">
            <button
              onClick={() => setTheme('pink')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                theme === 'pink' ? 'bg-[#FFFFFF] text-[#DC2626] shadow-xs' : 'text-[#61796F]'
              }`}
            >
              Thermal Pink
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                theme === 'dark' ? 'bg-[#005030] text-[#22C55E] shadow-xs' : 'text-[#61796F]'
              }`}
            >
              UHealth CCU
            </button>
          </div>
        </div>
      </div>

      {/* Clinical Examples / Strip Variations Bar */}
      <div className="px-4 py-2 bg-[#F0F5F2] border-b border-[#DDE7E1] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-[#005030] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#F47321]" />
            <span>Clinical Strip Examples:</span>
          </span>

          <div className="flex items-center gap-1.5 flex-wrap">
            {variants.map((v, idx) => {
              const isSelected = selectedVariantSeed === v.seed;
              return (
                <button
                  key={v.seed}
                  onClick={() => setSelectedVariantSeed(v.seed)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1 ${
                    isSelected
                      ? 'bg-[#005030] text-white font-bold shadow-xs'
                      : 'bg-white text-[#4B6358] hover:bg-[#EBF3EE] border border-[#DDE7E1]'
                  }`}
                  title={v.clinicalNote}
                >
                  <span>Ex {idx + 1}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#FFB81C]" />}
                </button>
              );
            })}

            <button
              onClick={() => {
                const available = variants.map((v) => v.seed).filter((s) => s !== selectedVariantSeed);
                const randomSeed = available[Math.floor(Math.random() * available.length)] ?? 0;
                setSelectedVariantSeed(randomSeed);
              }}
              className="px-2.5 py-1 bg-[#FEF2EB] hover:bg-[#FCE5D7] text-[#F47321] border border-[#F47321]/40 rounded-md text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
              title="Pick a random clinical strip example"
            >
              <Dices className="w-3.5 h-3.5" />
              <span>Random Strip</span>
            </button>
          </div>
        </div>

        {/* Current Variant Clinical Note */}
        {currentVariant && (
          <div className="text-[11px] font-mono text-[#005030] bg-white px-2.5 py-1 rounded border border-[#DDE7E1] truncate max-w-lg shadow-2xs">
            <strong className="text-[#F47321]">{currentVariant.label}:</strong> {currentVariant.clinicalNote}
          </div>
        )}
      </div>

      {/* Main EKG Strip Paper Viewport */}
      <div
        ref={containerRef}
        className={`relative w-full overflow-x-auto select-none border-b border-[#E5E5DF] ${
          theme === 'pink' ? 'ecg-grid-pink' : 'ecg-grid-dark'
        }`}
        style={{ minHeight: `${stripHeight * zoomLevel}px` }}
      >
        <div
          style={{
            width: `${stripWidth}px`,
            height: `${stripHeight}px`,
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top left',
            marginBottom: `${stripHeight * (zoomLevel - 1)}px`,
            marginRight: `${stripWidth * (zoomLevel - 1)}px`
          }}
          className="relative transition-transform duration-150"
        >
          {/* 0-Second, 3-Second, and 6-Second Calibration Hash Marks at Top (Clinical Standard) */}
          <div className="absolute top-0 left-0 right-0 h-4 pointer-events-none z-10 flex">
            {/* 0-second mark */}
            <div className="absolute top-0 left-0 flex flex-col items-center">
              <div
                className={`w-0.5 h-3 ${theme === 'pink' ? 'bg-red-700/80' : 'bg-cyan-400/80'}`}
              />
              <span
                className={`text-[9px] font-mono font-bold leading-none mt-0.5 pl-0.5 ${
                  theme === 'pink' ? 'text-red-700/90' : 'text-cyan-400/90'
                }`}
              >
                0s (1mV Cal)
              </span>
            </div>

            {/* 3-second mark */}
            <div
              style={{ left: `${stripData.threeSecondMarkX}px` }}
              className="absolute top-0 flex flex-col items-center -translate-x-1/2"
            >
              <div
                className={`w-0.5 h-3 ${theme === 'pink' ? 'bg-red-700/80' : 'bg-cyan-400/80'}`}
              />
              <span
                className={`text-[9px] font-mono font-bold leading-none mt-0.5 ${
                  theme === 'pink' ? 'text-red-700/90' : 'text-cyan-400/90'
                }`}
              >
                3s (15 boxes)
              </span>
            </div>

            {/* 6-second mark */}
            <div
              style={{ left: `${stripData.sixSecondMarkX - 2}px` }}
              className="absolute top-0 flex flex-col items-end"
            >
              <div
                className={`w-0.5 h-3 ${theme === 'pink' ? 'bg-red-700/80' : 'bg-cyan-400/80'}`}
              />
              <span
                className={`text-[9px] font-mono font-bold leading-none mt-0.5 pr-0.5 ${
                  theme === 'pink' ? 'text-red-700/90' : 'text-cyan-400/90'
                }`}
              >
                6s (30 boxes)
              </span>
            </div>
          </div>

          {/* SVG Waveform Rendering */}
          <svg
            className="w-full h-full absolute inset-0 overflow-visible"
            viewBox={`0 0 ${stripWidth} ${stripHeight}`}
          >
            {/* Monitor Sweep Beam Background Dimmer */}
            {isSweeping && theme === 'dark' && (
              <rect
                x={sweepX}
                y={0}
                width={36}
                height={stripHeight}
                fill="url(#sweepGlow)"
                className="pointer-events-none"
              />
            )}

            {/* Waveform Trace */}
            <path
              d={stripData.svgPath}
              fill="none"
              stroke={theme === 'pink' ? '#1F2937' : '#22C55E'}
              strokeWidth={theme === 'pink' ? '2.2' : '2.4'}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={theme === 'dark' ? 'url(#greenGlow)' : undefined}
            />

            {/* Sweep vertical line indicator */}
            {isSweeping && (
              <line
                x1={sweepX}
                y1={0}
                x2={sweepX}
                y2={stripHeight}
                stroke={theme === 'pink' ? '#F47321' : '#F47321'}
                strokeWidth="2.5"
                strokeDasharray="4 2"
                className="pointer-events-none opacity-80"
              />
            )}

            {/* Green glow filter for CCU dark mode */}
            <defs>
              <filter id="greenGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="1.8" floodColor="#22C55E" floodOpacity="0.8" />
              </filter>
              <linearGradient id="sweepGlow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22C55E" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Optional Wave Mark Annotations */}
            {showAnnotations &&
              stripData.landmarks.map((lm, idx) => (
                <g key={idx} className="pointer-events-none text-[10px] font-mono">
                  {/* P wave label */}
                  <text
                    x={lm.rPeakX - 35}
                    y={stripData.baselineY - 24}
                    textAnchor="middle"
                    fill={theme === 'pink' ? '#005030' : '#4ADE80'}
                    fontWeight="bold"
                  >
                    P
                  </text>
                  {/* R peak label */}
                  <text
                    x={lm.rPeakX}
                    y={lm.rPeakY - 8}
                    textAnchor="middle"
                    fill={theme === 'pink' ? '#DC2626' : '#EF4444'}
                    fontWeight="bold"
                  >
                    R
                  </text>
                  {/* T wave label */}
                  <text
                    x={lm.rPeakX + 32}
                    y={stripData.baselineY - 24}
                    textAnchor="middle"
                    fill={theme === 'pink' ? '#F47321' : '#FBBF24'}
                    fontWeight="bold"
                  >
                    T
                  </text>
                </g>
              ))}
          </svg>

          {/* Interactive Caliper Tool Overlay */}
          <CaliperTool
            stripWidth={stripWidth}
            smallBoxPx={stripData.smallBoxPx}
            visible={calipersActive}
            rPeakX1={firstR}
            rPeakX2={secondR}
          />
        </div>
      </div>

      {/* Strip Bottom Educational Guidance Strip: Always a Standard 6-Second Strip */}
      <div className="px-4 py-2 bg-[#F5F8F6] flex flex-wrap items-center justify-between text-xs text-[#4B6358] gap-2 border-t border-[#E0EAE4]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-[#005030]">Standard 6-Second Strip:</span>
          <span className="font-mono text-[#F47321] bg-[#FEF2EB] px-2 py-0.5 rounded border border-[#F47321]/30 font-bold">
            {stripData.landmarks.length} R-waves in 6 sec × 10 = {stripData.landmarks.length * 10} bpm
          </span>
          <span className="text-[#61796F] hidden md:inline">
            (Count complete R-waves across the 30 large boxes and multiply by 10)
          </span>
        </div>

        <div className="flex items-center gap-2.5 text-[11px] font-mono text-[#61796F]">
          <span className="text-[#005030] font-semibold">30 Large Boxes = 6.0s</span>
          <span>·</span>
          <span>150 Small Boxes</span>
          <span>·</span>
          <span>25 mm/s</span>
        </div>
      </div>
    </div>
  );
};
