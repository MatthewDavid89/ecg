export type RhythmCategory = 'all' | 'sinus' | 'atrial' | 'blocks' | 'ventricular' | 'critical';

export interface RhythmVariantOption {
  seed: number;
  label: string;
  clinicalNote: string;
}

export interface RhythmData {
  id: string;
  name: string;
  aka?: string;
  category: 'sinus' | 'atrial' | 'blocks' | 'ventricular' | 'critical';
  heartRate: string;
  rateBpm: number; // typical bpm for simulation/audio
  regularity: string;
  pWave: string;
  prInterval: string;
  qrsDuration: string;
  slideNumber?: number;
  tags: string[];

  // Multiple realistic clinical examples for this rhythm
  variants?: RhythmVariantOption[];

  // 1. World-class BSN Cardiovascular Nurse Explanation
  medicalBSN: {
    definition: string;
    electrophysiology: string;
    clinicalCauses: string[];
    hemodynamicImpact: string;
    nursingPriorities: string[];
    aclsInterventions: string[];
  };

  // 2. Child / ELI5 Metaphor
  childMetaphor: {
    title: string;
    story: string;
    takeaway: string;
  };

  // 3. Nurse Metaphor & Simile
  clinicalMetaphor: {
    title: string;
    simile: string;
    visualAnchor: string;
  };

  // 4. Memory Mnemonics
  mnemonics: string[];

  // Quick Clinical Pearl
  clinicalPearl: string;

  // Waveform rendering parameters
  waveform: {
    type: string;
    pAmp?: number;
    pWidth?: number;
    prLength?: number; // small boxes (approx)
    qrsWidth?: number;
    qrsAmp?: number;
    invertedP?: boolean;
    hiddenP?: boolean;
    sawtooth?: boolean;
    fibrillatory?: boolean;
    droppedBeats?: boolean;
    irregularRR?: boolean;
    wideQRS?: boolean;
    stElevation?: boolean;
    pacerSpike?: 'atrial' | 'ventricular' | 'dual' | 'none';
    torsadesWave?: boolean;
    wenckebachCycle?: boolean;
    mobitz2Drop?: boolean;
    chbDissociation?: boolean;
  };
}

export interface CaliperMeasurement {
  startX: number;
  endX: number;
  pixels: number;
  smallBoxes: number;
  seconds: number;
  milliseconds: number;
  heartRateBpm: number | null;
}
