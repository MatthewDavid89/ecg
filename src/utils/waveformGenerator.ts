import { RhythmData } from '../types/ekg';

export interface WaveformPoint {
  x: number;
  y: number;
}

export interface BeatLandmark {
  beatIndex: number;
  rPeakX: number;
  rPeakY: number;
  pStartX?: number;
  pPeakX?: number;
  pEndX?: number;
  qrsStartX?: number;
  qrsEndX?: number;
  tPeakX?: number;
  tEndX?: number;
}

export interface GeneratedStrip {
  points: WaveformPoint[];
  svgPath: string;
  landmarks: BeatLandmark[];
  width: number;
  height: number;
  baselineY: number;
  sixSecondMarkX: number;
  threeSecondMarkX: number;
  smallBoxPx: number;
  largeBoxPx: number;
}

/**
 * Catmull-Rom to Cubic Bezier spline generator for ultra-realistic analogue ECG pen traces.
 */
function pointsToSmoothSvgPath(pts: WaveformPoint[]): string {
  if (pts.length === 0) return '';
  if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;

  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;

  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = i > 0 ? pts[i - 1] : pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = i < pts.length - 2 ? pts[i + 2] : p2;

    const tension = 0.5;
    const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension;
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension;
    const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension;
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  return d;
}

export function generateWaveformForRhythm(
  rhythm: RhythmData,
  totalWidth = 900,
  height = 200,
  variantSeed = 0
): GeneratedStrip {
  const smallBoxPx = 6; // 1 small box = 6px (0.04s)
  const largeBoxPx = smallBoxPx * 5; // 30px (0.20s)
  const baselineY = height * 0.52; // centered baseline
  const threeSecondMarkX = largeBoxPx * 15; // 450px
  const sixSecondMarkX = largeBoxPx * 30; // 900px

  const points: WaveformPoint[] = [];
  const landmarks: BeatLandmark[] = [];

  const add = (x: number, y: number, skipJitter = false) => {
    const wander = Math.sin((x + variantSeed * 25) * 0.007) * 1.1 + Math.cos((x + variantSeed * 18) * 0.016) * 0.45;
    const microJitter = skipJitter ? 0 : (Math.sin(x * 1.8 + variantSeed * 3) * 0.35 + Math.cos(x * 3.4) * 0.2);
    points.push({
      x: Math.round(x * 10) / 10,
      y: Math.round((y + wander + microJitter) * 10) / 10
    });
  };

  /**
   * Standard Clinical 1.0 mV (10 mm / 60 px) Calibration Mark
   */
  const addCalibrationPulse = () => {
    add(0, baselineY, true);
    add(5, baselineY, true);
    add(5.2, baselineY - 60, true); // 10 small boxes = 1.0 mV = 60px
    add(17, baselineY - 60, true);
    add(17.2, baselineY, true);
    add(28, baselineY, true);
  };

  const id = rhythm.id;

  // -----------------------------------------------------------------
  // 1. ASYSTOLE (5 distinct visual clinical variants)
  // -----------------------------------------------------------------
  if (id === 'asystole') {
    addCalibrationPulse();
    if (variantSeed === 1) {
      // Variant 1: P-Wave Asystole (Ventricular Standstill) - Regular lone P waves at 60 bpm with NO QRS!
      const pSpacing = 150; // 60 bpm P waves
      let nextP = 65;
      for (let x = 28; x <= totalWidth; x += 3.5) {
        if (Math.abs(x - nextP) <= 10) {
          const frac = (x - (nextP - 10)) / 20;
          const pY = -Math.sin(frac * Math.PI) * 15;
          add(x, baselineY + pY);
          if (x >= nextP + 9) nextP += pSpacing;
        } else {
          add(x, baselineY);
        }
      }
    } else if (variantSeed === 2) {
      // Variant 2: Respiratory slow sway (chest rise & fall on ventilator, 0 cardiac activity)
      for (let x = 28; x <= totalWidth; x += 4) {
        const slowSway = Math.sin((x / totalWidth) * Math.PI * 3.5) * 3.8;
        add(x, baselineY + slowSway);
      }
    } else if (variantSeed === 3) {
      // Variant 3: Code Blue flatline with coarse analog thermal pen noise
      for (let x = 28; x <= totalWidth; x += 3.5) {
        const noise = (Math.sin(x * 0.4) * 0.8 + Math.cos(x * 1.1) * 0.5);
        add(x, baselineY + noise);
      }
    } else if (variantSeed === 4) {
      // Variant 4: Agonal dying trace with single dying deflection at x=280
      for (let x = 28; x <= totalWidth; x += 3.5) {
        if (x >= 270 && x <= 320) {
          const frac = (x - 270) / 50;
          const agonalBlip = -Math.sin(frac * Math.PI) * 11;
          add(x, baselineY + agonalBlip);
        } else {
          add(x, baselineY);
        }
      }
    } else {
      // Variant 0: Textbook flatline
      for (let x = 28; x <= totalWidth; x += 4) {
        add(x, baselineY);
      }
    }
    return buildStrip(points, landmarks, totalWidth, height, baselineY, smallBoxPx, largeBoxPx, threeSecondMarkX, sixSecondMarkX);
  }

  // -----------------------------------------------------------------
  // 2. VENTRICULAR FIBRILLATION (5 distinct visual variants)
  // -----------------------------------------------------------------
  if (id === 'ventricular-fibrillation') {
    addCalibrationPulse();
    for (let x = 28; x <= totalWidth; x += 3.5) {
      let val = 0;
      if (variantSeed === 0) {
        // Coarse VFib: High amplitude chaotic waves (>3mm / 45px tall)
        val = Math.sin(x * 0.08) * 38 + Math.cos(x * 0.17 + 1.2) * 26 + Math.sin(x * 0.35) * 14;
      } else if (variantSeed === 1) {
        // Moderate VFib: Intermediate chaotic waves
        val = Math.sin(x * 0.11) * 22 + Math.cos(x * 0.22) * 16 + Math.sin(x * 0.45) * 8;
      } else if (variantSeed === 2) {
        // Fine VFib: Tiny low-voltage erratic tremor (<1.5mm / 10px tall, easily mistaken for asystole)
        val = Math.sin(x * 0.14) * 8 + Math.cos(x * 0.28) * 6 + Math.sin(x * 0.6) * 3.5;
      } else if (variantSeed === 3) {
        // Chaotic VFib Storm: High frequency, violent erratic oscillations
        val = Math.sin(x * 0.15) * 34 + Math.cos(x * 0.32) * 22 + Math.sin(x * 0.7) * 16;
      } else {
        // Decaying VFib: Starts coarse on left, decays into fine VFib on right
        const decay = 1.2 - (x / totalWidth) * 0.85;
        val = (Math.sin(x * 0.09) * 32 + Math.cos(x * 0.19) * 20 + Math.sin(x * 0.4) * 10) * decay;
      }
      add(x, baselineY + val);
    }
    return buildStrip(points, landmarks, totalWidth, height, baselineY, smallBoxPx, largeBoxPx, threeSecondMarkX, sixSecondMarkX);
  }

  // -----------------------------------------------------------------
  // 3. TORSADES DE POINTES (5 distinct visual variants)
  // -----------------------------------------------------------------
  if (id === 'torsades-de-pointes') {
    addCalibrationPulse();
    if (variantSeed === 2) {
      // Variant 2: Starts with 2 beats of long-QT, then R-on-T triggers Torsades run!
      let x = 34;
      for (let b = 0; b < 2; b++) {
        landmarks.push({ beatIndex: b, rPeakX: x + 24, rPeakY: baselineY - 70 });
        for (let dx = 0; dx <= 16; dx += 2) add(x + dx, baselineY - Math.sin((dx / 16) * Math.PI) * 14);
        x += 20;
        add(x, baselineY + 2);
        add(x + 4, baselineY - 72);
        add(x + 8, baselineY + 18);
        x += 10;
        // Prolonged QT wave
        for (let dx = 0; dx <= 44; dx += 2) add(x + dx, baselineY - Math.sin((dx / 44) * Math.PI) * 20);
        x += 65;
      }
      // Sudden twisting burst
      for (let tx = x; tx <= totalWidth; tx += 3.5) {
        const envelope = Math.sin(((tx - x) / (totalWidth - x)) * Math.PI * 4);
        const fastOsc = Math.sin(tx * 0.14) * 48 * envelope;
        add(tx, baselineY + fastOsc);
      }
      return buildStrip(points, landmarks, totalWidth, height, baselineY, smallBoxPx, largeBoxPx, threeSecondMarkX, sixSecondMarkX);
    }

    const envCycles = [5.2, 7.2, 4.5, 3.8, 5.8];
    const envFreq = envCycles[variantSeed % envCycles.length];
    const oscSpeed = variantSeed === 1 ? 0.16 : 0.13;
    const peakAmp = variantSeed === 3 ? 62 : 48;

    for (let x = 28; x <= totalWidth; x += 3.5) {
      const envelope = Math.sin(((x + variantSeed * 40) / totalWidth) * Math.PI * envFreq);
      const fastOsc = Math.sin(x * oscSpeed) * peakAmp * envelope;
      const secondHarmonic = Math.cos(x * (oscSpeed * 2)) * 14 * Math.abs(envelope);
      add(x, baselineY + fastOsc + secondHarmonic);
    }
    return buildStrip(points, landmarks, totalWidth, height, baselineY, smallBoxPx, largeBoxPx, threeSecondMarkX, sixSecondMarkX);
  }

  // -----------------------------------------------------------------
  // 4. VENTRICULAR TACHYCARDIA (5 distinct visual variants)
  // -----------------------------------------------------------------
  if (id === 'ventricular-tachycardia') {
    addCalibrationPulse();
    // 0=165 bpm standard, 1=210 bpm rapid flutter, 2=128 bpm slow notched, 3=Inverted negative VT, 4=Asymmetric wide
    const rates = [165, 210, 128, 175, 150];
    const currentRate = rates[variantSeed % rates.length];
    const cyclePx = (60 / currentRate) * 150;
    const isInverted = variantSeed === 3;
    const sign = isInverted ? 1 : -1;
    let x = 34;
    let bIdx = 0;

    while (x < totalWidth) {
      const rX = x + cyclePx * 0.42;
      landmarks.push({ beatIndex: bIdx++, rPeakX: rX, rPeakY: baselineY + 65 * sign });

      for (let dx = 0; dx < cyclePx; dx += 2.5) {
        const norm = dx / cyclePx;
        let wave = Math.sin(norm * Math.PI * 2) * 58 * sign;
        // Notches
        if (variantSeed === 2 && norm > 0.45 && norm < 0.75) {
          wave += Math.sin((norm - 0.45) * Math.PI * 3.3) * 22 * sign;
        } else if (norm > 0.45 && norm < 0.75) {
          wave += Math.sin((norm - 0.45) * Math.PI * 3.3) * 14 * sign;
        }
        add(x + dx, baselineY + wave);
      }
      x += cyclePx;
    }
    return buildStrip(points, landmarks, totalWidth, height, baselineY, smallBoxPx, largeBoxPx, threeSecondMarkX, sixSecondMarkX);
  }

  // -----------------------------------------------------------------
  // 5. ATRIAL FLUTTER (5 distinct visual variants: 2:1, 3:1, 4:1, Variable, High-Voltage)
  // -----------------------------------------------------------------
  if (id === 'atrial-flutter') {
    addCalibrationPulse();
    const flutterPeriod = 24; // 300 bpm atrial flutter waves

    let x = 32;
    let bIdx = 0;
    let cycleCounter = 0;

    while (x < totalWidth) {
      // Determine conduction ratio for this beat
      let currentRatio = 2; // default 2:1 = 150 bpm
      if (variantSeed === 1) currentRatio = 3; // 3:1 = 100 bpm
      if (variantSeed === 2) currentRatio = 4; // 4:1 = 75 bpm
      if (variantSeed === 3) {
        // Variable conduction: alternates between 2:1, 4:1, 3:1
        currentRatio = cycleCounter % 3 === 0 ? 2 : cycleCounter % 3 === 1 ? 4 : 3;
      }
      if (variantSeed === 4) currentRatio = 2; // 2:1 high voltage

      const qrsInterval = flutterPeriod * currentRatio;
      const isQrsBeat = Math.round(x) % qrsInterval < flutterPeriod;

      if (isQrsBeat && x > 44) {
        cycleCounter++;
        const rX = x + 10;
        landmarks.push({ beatIndex: bIdx++, rPeakX: rX, rPeakY: baselineY - 74 });
        // Conducted QRS
        add(x, baselineY + 4);
        add(x + 4, baselineY + 10); // Q
        add(rX, baselineY - 76); // R
        add(x + 14, baselineY + 22); // S
        add(x + 18, baselineY + 2); // J-point
        x += 20;
      } else {
        const sawAmp = variantSeed === 4 ? 18 : 13;
        for (let dx = 0; dx < flutterPeriod; dx += 2.5) {
          const frac = dx / flutterPeriod;
          let yOffset = 0;
          if (frac < 0.25) {
            yOffset = -(frac / 0.25) * sawAmp;
          } else {
            yOffset = -sawAmp + ((frac - 0.25) / 0.75) * (sawAmp * 1.85);
          }
          add(x + dx, baselineY + yOffset);
        }
        x += flutterPeriod;
      }
    }
    return buildStrip(points, landmarks, totalWidth, height, baselineY, smallBoxPx, largeBoxPx, threeSecondMarkX, sixSecondMarkX);
  }

  // -----------------------------------------------------------------
  // 6. ATRIAL FIBRILLATION (5 distinct visual variants: Controlled, RVR, Coarse, Fine, Slow)
  // -----------------------------------------------------------------
  if (id === 'atrial-fibrillation') {
    addCalibrationPulse();
    let baseRRs = [74, 46, 98, 58, 118, 52, 86, 128, 64, 92, 52, 106, 76];
    let fibScale = 1.0;

    if (variantSeed === 1) {
      // Afib with RVR (145 bpm) - fast, narrow, irregular
      baseRRs = [42, 50, 38, 58, 44, 54, 40, 56, 42, 48, 40, 60, 44];
      fibScale = 0.85;
    } else if (variantSeed === 2) {
      // Coarse Afib: Large rolling chaotic waves (>1.8mm / 18px)
      fibScale = 2.2;
      baseRRs = [84, 52, 110, 60, 96, 126, 68, 102, 58, 92];
    } else if (variantSeed === 3) {
      // Fine Afib: Near-flatline micro-tremor
      fibScale = 0.35;
      baseRRs = [92, 64, 106, 56, 88, 76, 118, 66, 98];
    } else if (variantSeed === 4) {
      // Slow Afib (48 bpm): Wide spaces between beats
      baseRRs = [150, 120, 180, 135, 160, 125, 190, 140];
      fibScale = 1.1;
    }

    let x = 32;
    let rrIdx = 0;
    let bIdx = 0;

    while (x < totalWidth - 30) {
      const rr = baseRRs[rrIdx % baseRRs.length];
      rrIdx++;

      const nextQrsStart = x + rr - 24;
      let currX = points[points.length - 1]?.x ?? 32;

      while (currX < nextQrsStart) {
        currX += 2.5;
        const fibNoise =
          (Math.sin(currX * 0.28) * 4.2 +
          Math.cos(currX * 0.65) * 2.8 +
          Math.sin(currX * 1.4) * 1.4) * fibScale;
        add(currX, baselineY + fibNoise);
      }

      const qX = nextQrsStart;
      const rX = qX + 6;
      landmarks.push({ beatIndex: bIdx++, rPeakX: rX, rPeakY: baselineY - 76 });

      add(qX, baselineY + 2);
      add(qX + 3, baselineY + 9);
      add(rX, baselineY - 78);
      add(rX + 4, baselineY + 19);
      add(rX + 8, baselineY + 1);

      for (let dx = 8; dx <= 38; dx += 2.5) {
        const tFrac = (dx - 8) / 30;
        const tY = -Math.sin(Math.pow(tFrac, 0.85) * Math.PI) * 17;
        const fibJitter = Math.sin((rX + dx) * 0.4) * 1.8 * fibScale;
        add(rX + dx, baselineY + tY + fibJitter);
      }

      x = rX + 44;
    }
    return buildStrip(points, landmarks, totalWidth, height, baselineY, smallBoxPx, largeBoxPx, threeSecondMarkX, sixSecondMarkX);
  }

  // -----------------------------------------------------------------
  // 7. THIRD-DEGREE AV BLOCK (5 distinct visual variants with marching dissociated P-waves!)
  // -----------------------------------------------------------------
  if (id === 'third-degree-av-block') {
    addCalibrationPulse();
    // In CHB: P waves march at atrial rate (75-105 bpm); QRS escapes independently at 24-48 bpm
    const atrialRates = [85, 95, 75, 90, 105];
    const escapeRates = [48, 32, 22, 28, 40];
    const isWideEscape = [false, true, true, true, false]; // Narrow junctional vs wide ventricular escape

    const aRate = atrialRates[variantSeed % atrialRates.length];
    const eRate = escapeRates[variantSeed % escapeRates.length];
    const wideQRS = isWideEscape[variantSeed % isWideEscape.length];

    const pCyclePx = (60 / aRate) * 150; // px between P waves
    const qrsCyclePx = (60 / eRate) * 150; // px between QRS complexes

    // Generate continuous points
    const pWaveXs: number[] = [];
    for (let px = 45; px < totalWidth; px += pCyclePx) {
      pWaveXs.push(px);
    }

    const qrsXs: number[] = [];
    for (let qx = 75; qx < totalWidth; qx += qrsCyclePx) {
      qrsXs.push(qx);
    }

    for (let x = 28; x <= totalWidth; x += 3) {
      let yOffset = 0;

      // 1. Check if x is within any dissociated P wave
      for (const px of pWaveXs) {
        if (Math.abs(x - px) <= 9) {
          const norm = (x - (px - 9)) / 18;
          yOffset += -Math.sin(norm * Math.PI) * 15;
        }
      }

      // 2. Check if x is within any independent QRS complex
      for (let i = 0; i < qrsXs.length; i++) {
        const qx = qrsXs[i];
        if (wideQRS) {
          // Wide ventricular escape (36px wide)
          if (x >= qx && x <= qx + 40) {
            const norm = (x - qx) / 40;
            yOffset += -Math.sin(norm * Math.PI) * 65;
            if (norm > 0.4 && norm < 0.7) {
              yOffset += Math.sin((norm - 0.4) * Math.PI * 3.3) * 18;
            }
            if (Math.abs(x - (qx + 16)) < 2) {
              if (!landmarks.some((l) => l.beatIndex === i)) {
                landmarks.push({ beatIndex: i, rPeakX: qx + 16, rPeakY: baselineY - 65 });
              }
            }
          }
          // Wide discordant T wave
          if (x > qx + 40 && x <= qx + 75) {
            const norm = (x - (qx + 40)) / 35;
            yOffset += Math.sin(norm * Math.PI) * 22; // opposite direction
          }
        } else {
          // Narrow junctional escape (16px wide)
          if (x >= qx && x <= qx + 16) {
            const norm = (x - qx) / 16;
            if (norm < 0.25) yOffset += 8;
            else if (norm < 0.5) {
              yOffset += -75;
              if (!landmarks.some((l) => l.beatIndex === i)) {
                landmarks.push({ beatIndex: i, rPeakX: qx + 6, rPeakY: baselineY - 75 });
              }
            } else if (norm < 0.75) yOffset += 18;
            else yOffset += 2;
          }
          // Narrow T wave
          if (x > qx + 22 && x <= qx + 48) {
            const norm = (x - (qx + 22)) / 26;
            yOffset += -Math.sin(norm * Math.PI) * 16;
          }
        }
      }

      add(x, baselineY + yOffset);
    }

    return buildStrip(points, landmarks, totalWidth, height, baselineY, smallBoxPx, largeBoxPx, threeSecondMarkX, sixSecondMarkX);
  }

  // -----------------------------------------------------------------
  // 8. GENERAL BEAT-BASED RHYTHMS (Sinus, Blocks, Ectopics, Paced, STEMI)
  // -----------------------------------------------------------------
  let baseCyclePx = (60 / Math.max(rhythm.rateBpm || 75, 20)) * 150;

  if (id === 'sinus-bradycardia') {
    // 0=46 bpm, 1=36 bpm (huge spaces!), 2=54 bpm, 3=40 bpm, 4=48 bpm
    const bradyRates = [46, 36, 54, 40, 48];
    const r = bradyRates[variantSeed % bradyRates.length];
    baseCyclePx = (60 / r) * 150;
  }
  if (id === 'sinus-tachycardia') {
    // 0=128 bpm, 1=145 bpm, 2=115 bpm, 3=150 bpm, 4=135 bpm
    const tachyRates = [128, 145, 115, 150, 135];
    const r = tachyRates[variantSeed % tachyRates.length];
    baseCyclePx = (60 / r) * 150;
  }
  if (id === 'supraventricular-tachycardia') {
    // 0=195 bpm, 1=225 bpm, 2=165 bpm, 3=180 bpm, 4=200 bpm
    const svtRates = [195, 225, 165, 180, 200];
    const r = svtRates[variantSeed % svtRates.length];
    baseCyclePx = (60 / r) * 150;
  }
  if (id === 'paroxysmal-atrial-tachycardia') {
    baseCyclePx = variantSeed === 0 ? 50 : variantSeed === 1 ? 46 : variantSeed === 3 ? 42 : 54;
  }
  if (id === 'idioventricular-rhythm') {
    // 0=32 bpm (classic), 1=72 bpm (AIVR), 2=16 bpm (terminal agonal dying heart!), 3=24 bpm, 4=36 bpm
    const ivrRates = [32, 72, 16, 24, 36];
    const r = ivrRates[variantSeed % ivrRates.length];
    baseCyclePx = (60 / r) * 150;
  }
  if (id === 'nsr') {
    // 0=75 bpm textbook, 1=62 bpm athletic, 2=90 bpm post-activity, 3=68 bpm night shift, 4=82 bpm high-voltage
    const nsrRates = [75, 62, 90, 68, 82];
    const r = nsrRates[variantSeed % nsrRates.length];
    baseCyclePx = (60 / r) * 150;
  }
  if (id === 'pulseless-electrical-activity') {
    const peaRates = [75, 40, 125, 55, 32];
    const r = peaRates[variantSeed % peaRates.length];
    baseCyclePx = (60 / r) * 150;
  }
  if (id === 'st-elevation-mi') {
    const stemiRates = [88, 105, 48, 76, 92];
    const r = stemiRates[variantSeed % stemiRates.length];
    baseCyclePx = (60 / r) * 150;
  }

  addCalibrationPulse();
  let currentX = 34;
  let beatCount = 0;

  while (currentX < totalWidth) {
    let cyclePx = baseCyclePx;

    // Sinus Arrhythmia (phasic respiratory acceleration & deceleration)
    if (id === 'sinus-arrhythmia') {
      const breathPhase = (currentX / totalWidth) * Math.PI * (variantSeed === 1 ? 3.0 : 4.5);
      const amp = variantSeed === 1 ? 52 : 36;
      cyclePx = baseCyclePx + Math.sin(breathPhase) * amp;
    }

    // Sinus Arrest (sudden flatline pause > 2.5s)
    if (id === 'sinus-arrest') {
      const pauseBeats = [2, 1, 3, 2, 2];
      const pauseDurations = [320, 420, 290, 360, 310];
      const targetBeat = pauseBeats[variantSeed % pauseBeats.length];
      const targetPause = pauseDurations[variantSeed % pauseDurations.length];

      if (beatCount === targetBeat) {
        for (let px = 0; px < targetPause; px += 3.5) {
          add(currentX + px, baselineY);
        }
        currentX += targetPause;
        beatCount++;
        continue;
      }
    }

    // PAT sudden burst or termination
    if (id === 'paroxysmal-atrial-tachycardia' && variantSeed === 0) {
      cyclePx = beatCount < 2 ? 125 : 48; // burst into 185 bpm mid-strip!
    } else if (id === 'paroxysmal-atrial-tachycardia' && variantSeed === 2) {
      cyclePx = beatCount >= 5 ? 130 : 48; // self-terminates at beat 5!
    }

    // PAC ectopic beat
    let isPacBeat = false;
    let isBlockedPac = false;

    if (id === 'premature-atrial-complex') {
      if (variantSeed === 0) {
        // Isolated beat 3
        isPacBeat = beatCount === 3;
        if (beatCount === 3) cyclePx = baseCyclePx * 0.58;
        if (beatCount === 4) cyclePx = baseCyclePx * 1.34;
      } else if (variantSeed === 1) {
        // Frequent PACs (beats 2 and 5)
        isPacBeat = beatCount === 2 || beatCount === 5;
        if (isPacBeat) cyclePx = baseCyclePx * 0.60;
        if (beatCount === 3 || beatCount === 6) cyclePx = baseCyclePx * 1.35;
      } else if (variantSeed === 2) {
        // Atrial Bigeminy (every other beat)
        isPacBeat = beatCount % 2 === 1;
        cyclePx = isPacBeat ? baseCyclePx * 0.60 : baseCyclePx * 1.32;
      } else if (variantSeed === 3) {
        // Couplet PACs (beats 3 and 4)
        isPacBeat = beatCount === 3 || beatCount === 4;
        if (beatCount === 3 || beatCount === 4) cyclePx = baseCyclePx * 0.54;
        if (beatCount === 5) cyclePx = baseCyclePx * 1.45;
      } else if (variantSeed === 4) {
        // Non-conducted / Blocked PAC on beat 3
        if (beatCount === 3) isBlockedPac = true;
      }
    }

    // PVC ectopic beat
    let isPvcBeat = false;
    let isPvcInverted = false;

    if (id === 'premature-ventricular-complex') {
      if (variantSeed === 0) {
        // Isolated beat 3
        isPvcBeat = beatCount === 3;
        if (beatCount === 3) cyclePx = baseCyclePx * 0.62;
        if (beatCount === 4) cyclePx = baseCyclePx * 1.38;
      } else if (variantSeed === 1) {
        // Ventricular Bigeminy (every other beat is PVC)
        isPvcBeat = beatCount % 2 === 1;
        cyclePx = isPvcBeat ? baseCyclePx * 0.64 : baseCyclePx * 1.35;
      } else if (variantSeed === 2) {
        // Ventricular Trigeminy (every 3rd beat is PVC)
        isPvcBeat = beatCount % 3 === 2;
        if (isPvcBeat) cyclePx = baseCyclePx * 0.64;
        if (beatCount % 3 === 0) cyclePx = baseCyclePx * 1.36;
      } else if (variantSeed === 3) {
        // Couplet PVCs (beats 3 and 4)
        isPvcBeat = beatCount === 3 || beatCount === 4;
        if (beatCount === 3 || beatCount === 4) cyclePx = baseCyclePx * 0.58;
        if (beatCount === 5) cyclePx = baseCyclePx * 1.42;
      } else if (variantSeed === 4) {
        // Multifocal PVCs (beat 2 upright, beat 5 downward)
        isPvcBeat = beatCount === 2 || beatCount === 5;
        isPvcInverted = beatCount === 5;
        if (isPvcBeat) cyclePx = baseCyclePx * 0.64;
        if (beatCount === 3 || beatCount === 6) cyclePx = baseCyclePx * 1.36;
      }
    }

    // Wenckebach Cycle
    let wenckebachPrExtra = 0;
    let isWenckebachDrop = false;

    if (id === 'second-degree-av-block-type-1') {
      const cycleLen = variantSeed === 1 || variantSeed === 4 ? 3 : variantSeed === 2 ? 5 : 4;
      const step = beatCount % cycleLen;
      if (step === cycleLen - 1) {
        isWenckebachDrop = true;
      } else {
        wenckebachPrExtra = step * 16;
      }
    }

    // Mobitz II Drop
    let isMobitz2Drop = false;

    if (id === 'second-degree-av-block-type-2') {
      if (variantSeed === 1) {
        // 2:1 Conduction
        if (beatCount % 2 === 1) isMobitz2Drop = true;
      } else if (variantSeed === 2) {
        // 4:3 Conduction
        if (beatCount % 4 === 3) isMobitz2Drop = true;
      } else {
        // 3:2 Conduction
        if (beatCount % 3 === 2) isMobitz2Drop = true;
      }
    }

    // Resting baseline before P wave
    const flatBefore = Math.max(8, (cyclePx - 110) * 0.38);
    for (let dx = 0; dx < flatBefore; dx += 3) {
      add(currentX + dx, baselineY);
    }
    currentX += flatBefore;

    // --- PACER SPIKES ---
    const isPacedAtrial = id === 'paced-rhythm' && (variantSeed === 1 || variantSeed === 2);
    let isPacedVent = id === 'paced-rhythm' && (variantSeed === 0 || variantSeed === 2 || variantSeed === 4);
    if (id === 'paced-rhythm' && variantSeed === 3) {
      // Demand pacing: beats 1-2 native, beats 3+ paced
      isPacedVent = beatCount >= 2;
    }
    const isPacerFailureToCapture = id === 'paced-rhythm' && variantSeed === 4 && beatCount === 3;

    if (isPacedAtrial) {
      add(currentX, baselineY);
      add(currentX, baselineY - 48); // razor thin needle spike
      add(currentX + 0.8, baselineY + 12);
      add(currentX + 1.6, baselineY);
      currentX += 3.5;
    }

    // --- P WAVE ---
    const hasNormalPWave = id !== 'idioventricular-rhythm' && !isPvcBeat;

    if (hasNormalPWave) {
      const pWidth = isPacBeat ? 15 : 18;
      const pAmp = isPacBeat ? 22 : variantSeed === 4 ? 20 : 16;

      for (let dx = 0; dx <= pWidth; dx += 2) {
        const frac = dx / pWidth;
        const pY = Math.sin(Math.pow(frac, 0.9) * Math.PI) * pAmp * -1;
        add(currentX + dx, baselineY + pY);
      }
      currentX += pWidth;
    }

    // Blocked PAC: dropped beat here!
    if (isBlockedPac) {
      for (let dx = 0; dx <= 16; dx += 2) {
        add(currentX + dx, baselineY - Math.sin((dx / 16) * Math.PI) * 22);
      }
      currentX += 16;
      for (let dx = 0; dx <= baseCyclePx * 1.35; dx += 3) {
        add(currentX + dx, baselineY);
      }
      currentX += baseCyclePx * 1.35;
      beatCount++;
      continue;
    }

    // --- PR SEGMENT / INTERVAL ---
    let prSegmentWidth = 18;
    if (id === 'first-degree-av-block') {
      // PR > 0.20s: 0=0.24s (36px), 1=0.32s (48px), 2=0.40s (60px), 3=0.28s, 4=0.26s
      const prs = [36, 48, 60, 42, 38];
      prSegmentWidth = prs[variantSeed % prs.length];
    } else if (id === 'second-degree-av-block-type-1') {
      prSegmentWidth = 18 + wenckebachPrExtra;
    }

    for (let dx = 0; dx < prSegmentWidth; dx += 3) {
      add(currentX + dx, baselineY);
    }
    currentX += prSegmentWidth;

    // Wenckebach or Mobitz II Dropped Beat
    if (isWenckebachDrop || isMobitz2Drop) {
      const droppedPause = 85;
      for (let dx = 0; dx < droppedPause; dx += 3) {
        add(currentX + dx, baselineY);
      }
      currentX += droppedPause;
      beatCount++;
      continue;
    }

    // Ventricular pacer spike
    if (isPacedVent) {
      add(currentX, baselineY);
      add(currentX, baselineY - 55);
      add(currentX + 0.8, baselineY + 16);
      add(currentX + 1.6, baselineY);
      currentX += 3.5;
    }

    // Pacer failure to capture: spike with NO QRS!
    if (isPacerFailureToCapture) {
      for (let dx = 0; dx < 120; dx += 3) {
        add(currentX + dx, baselineY);
      }
      currentX += 120;
      beatCount++;
      continue;
    }

    // --- QRS COMPLEX ---
    const qrsStart = currentX;
    const isWideVentricular =
      isPvcBeat ||
      id === 'idioventricular-rhythm' ||
      (id === 'pulseless-electrical-activity' && (variantSeed === 1 || variantSeed === 4)) ||
      (id === 'second-degree-av-block-type-2' && variantSeed === 4) ||
      isPacedVent;

    if (isWideVentricular) {
      // Wide bizarre notched complex (> 0.12s)
      const qrsW = (id === 'idioventricular-rhythm' && variantSeed === 2) ? 58 : 36;
      const rX = qrsStart + qrsW * 0.42;
      landmarks.push({ beatIndex: beatCount, rPeakX: rX, rPeakY: isPvcInverted ? baselineY + 68 : baselineY - 68 });

      const sign = isPvcInverted ? 1 : -1;
      for (let dx = 0; dx <= qrsW; dx += 2) {
        const norm = dx / qrsW;
        let y = Math.sin(norm * Math.PI) * 72 * sign;
        if (norm > 0.4 && norm < 0.7) {
          y += Math.sin((norm - 0.4) * Math.PI * 3.3) * 16 * sign;
        }
        add(qrsStart + dx, baselineY + y);
      }
      currentX += qrsW;

      // Inverted discordant wide T wave
      const tW = 42;
      const tSign = isPvcInverted ? -1 : 1;
      for (let dx = 0; dx <= tW; dx += 2.5) {
        const norm = dx / tW;
        const tY = Math.sin(norm * Math.PI) * 24 * tSign;
        add(currentX + dx, baselineY + tY);
      }
      currentX += tW;
    } else {
      // Normal narrow QRS (0.04 - 0.12s)
      const rX = currentX + 6;
      const rAmp = variantSeed === 1 && id === 'nsr' ? 88 : 78;
      landmarks.push({ beatIndex: beatCount, rPeakX: rX, rPeakY: baselineY - rAmp });

      add(currentX, baselineY + 2);
      add(currentX + 3, baselineY + 9); // Q
      add(rX, baselineY - rAmp); // R
      add(currentX + 10, baselineY + 20); // S
      add(currentX + 14, baselineY + 1); // J-point
      currentX += 14;

      // ST Segment & T Wave
      const isStemi = id === 'st-elevation-mi';
      let stElevationPx = 0;
      if (isStemi) {
        stElevationPx = variantSeed === 4 ? 42 : variantSeed === 0 ? 30 : 24;
      }

      if (isStemi) {
        if (variantSeed === 3) {
          // Hyperacute tall vaulted T wave
          for (let dx = 0; dx <= 46; dx += 2.5) {
            const norm = dx / 46;
            const tombstone = Math.sin(norm * Math.PI) * 44;
            add(currentX + dx, baselineY - tombstone);
          }
          currentX += 46;
        } else {
          // Classic Tombstone ST elevation
          for (let dx = 0; dx <= 42; dx += 2.5) {
            const norm = dx / 42;
            const tombstone = Math.sin(norm * Math.PI * 0.75) * stElevationPx;
            add(currentX + dx, baselineY - tombstone);
          }
          currentX += 42;
        }
      } else {
        // Normal ST flat segment
        for (let dx = 0; dx < 12; dx += 3) {
          add(currentX + dx, baselineY);
        }
        currentX += 12;

        // Normal smooth asymmetrical T wave
        for (let dx = 0; dx <= 28; dx += 2) {
          const norm = dx / 28;
          const tAmp = (variantSeed === 2 && id === 'sinus-bradycardia') ? 26 : 19;
          const tY = -Math.sin(Math.pow(norm, 0.85) * Math.PI) * tAmp;
          add(currentX + dx, baselineY + tY);
        }
        currentX += 28;
      }
    }

    beatCount++;
  }

  return buildStrip(points, landmarks, totalWidth, height, baselineY, smallBoxPx, largeBoxPx, threeSecondMarkX, sixSecondMarkX);
}

function buildStrip(
  points: WaveformPoint[],
  landmarks: BeatLandmark[],
  width: number,
  height: number,
  baselineY: number,
  smallBoxPx: number,
  largeBoxPx: number,
  threeSecondMarkX: number,
  sixSecondMarkX: number
): GeneratedStrip {
  return {
    points,
    svgPath: pointsToSmoothSvgPath(points),
    landmarks,
    width,
    height,
    baselineY,
    threeSecondMarkX,
    sixSecondMarkX,
    smallBoxPx,
    largeBoxPx
  };
}
