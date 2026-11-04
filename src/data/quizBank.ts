import { RhythmData } from '../types/ekg';
import { RHYTHM_DATABASE } from './rhythmDatabase';

export interface QuizVariant {
  id: string;
  rhythmId: string;
  rhythmName: string;
  clinicalContext: string;
  rhythmData: RhythmData;
  distractorOptions: string[];
  seed?: number;
}

function getBase(id: string): RhythmData {
  const found = RHYTHM_DATABASE.find((r) => r.id === id);
  if (!found) throw new Error(`Rhythm ${id} not found in database`);
  return JSON.parse(JSON.stringify(found));
}

export const QUIZ_BANK: QuizVariant[] = [
  // -------------------------------------------------------------
  // 1. SINUS RHYTHM VARIANTS
  // -------------------------------------------------------------
  {
    id: 'nsr-standard-75',
    rhythmId: 'nsr',
    rhythmName: 'Normal Sinus Rhythm (NSR)',
    clinicalContext: '45yo routine pre-operative screening, resting calmly. Blood pressure 120/78 mmHg.',
    rhythmData: {
      ...getBase('nsr'),
      rateBpm: 75,
      heartRate: '75 beats/min'
    },
    distractorOptions: ['Sinus Bradycardia', 'First-degree AV Block', 'Sinus Arrhythmia'],
    seed: 0
  },
  {
    id: 'nsr-rate-88',
    rhythmId: 'nsr',
    rhythmName: 'Normal Sinus Rhythm (NSR)',
    clinicalContext: '32yo sitting comfortably, mild situational nervousness before discharge.',
    rhythmData: {
      ...getBase('nsr'),
      rateBpm: 88,
      heartRate: '88 beats/min'
    },
    distractorOptions: ['Sinus Tachycardia', 'Atrial Flutter', 'First-degree AV Block'],
    seed: 2
  },
  {
    id: 'nsr-athlete-62',
    rhythmId: 'nsr',
    rhythmName: 'Normal Sinus Rhythm (NSR)',
    clinicalContext: '22yo varsity swimmer at rest. Crisp narrow complexes with normal intervals.',
    rhythmData: {
      ...getBase('nsr'),
      rateBpm: 62,
      heartRate: '62 beats/min'
    },
    distractorOptions: ['Sinus Bradycardia', 'First-degree AV Block', 'Sinus Arrhythmia'],
    seed: 1
  },
  {
    id: 'sb-athlete-50',
    rhythmId: 'sinus-bradycardia',
    rhythmName: 'Sinus Bradycardia',
    clinicalContext: '26yo collegiate marathon runner resting asleep. Alert when gently awakened, skin warm and dry.',
    rhythmData: {
      ...getBase('sinus-bradycardia'),
      rateBpm: 50,
      heartRate: '50 beats/min'
    },
    distractorOptions: ['Sinus Arrest', 'First-degree AV Block', 'Idioventricular Rhythm'],
    seed: 2
  },
  {
    id: 'sb-severe-36',
    rhythmId: 'sinus-bradycardia',
    rhythmName: 'Sinus Bradycardia',
    clinicalContext: '73yo female admitted with syncope and dizziness, currently taking Metoprolol. SBP 84/50 mmHg.',
    rhythmData: {
      ...getBase('sinus-bradycardia'),
      rateBpm: 36,
      heartRate: '36 beats/min'
    },
    distractorOptions: ['Sinus Arrest', 'Third-degree AV Block', 'Idioventricular Rhythm'],
    seed: 1
  },
  {
    id: 'sb-rca-42',
    rhythmId: 'sinus-bradycardia',
    rhythmName: 'Sinus Bradycardia',
    clinicalContext: '61yo post-inferior STEMI day 1. RCA branch ischemia affecting SA node automaticity.',
    rhythmData: {
      ...getBase('sinus-bradycardia'),
      rateBpm: 42,
      heartRate: '42 beats/min'
    },
    distractorOptions: ['Second-degree AV Block Type I', 'Sinus Arrest', 'Idioventricular Rhythm'],
    seed: 4
  },
  {
    id: 'st-postop-115',
    rhythmId: 'sinus-tachycardia',
    rhythmName: 'Sinus Tachycardia',
    clinicalContext: '48yo 4 hours post-cholecystectomy, reporting incisional pain 8/10. Normotensive.',
    rhythmData: {
      ...getBase('sinus-tachycardia'),
      rateBpm: 115,
      heartRate: '115 beats/min'
    },
    distractorOptions: ['Supraventricular Tachycardia (SVT)', 'Atrial Flutter', 'Normal Sinus Rhythm'],
    seed: 2
  },
  {
    id: 'st-fever-135',
    rhythmId: 'sinus-tachycardia',
    rhythmName: 'Sinus Tachycardia',
    clinicalContext: '59yo admitted with pneumonia, temperature 39.2°C (102.6°F), tachypneic. P waves clearly visible.',
    rhythmData: {
      ...getBase('sinus-tachycardia'),
      rateBpm: 135,
      heartRate: '135 beats/min'
    },
    distractorOptions: ['Atrial Flutter', 'Supraventricular Tachycardia (SVT)', 'Paroxysmal Atrial Tachycardia'],
    seed: 4
  },
  {
    id: 'st-severe-148',
    rhythmId: 'sinus-tachycardia',
    rhythmName: 'Sinus Tachycardia',
    clinicalContext: '67yo in early septic shock. Compensatory sinus rate approaching 150 bpm with upright P waves.',
    rhythmData: {
      ...getBase('sinus-tachycardia'),
      rateBpm: 148,
      heartRate: '148 beats/min'
    },
    distractorOptions: ['Supraventricular Tachycardia (SVT)', 'Atrial Flutter', 'Ventricular Tachycardia'],
    seed: 3
  },
  {
    id: 'sarrhythmia-respiratory',
    rhythmId: 'sinus-arrhythmia',
    rhythmName: 'Sinus Arrhythmia',
    clinicalContext: '19yo healthy college student. Heart rate speeds up on inhalation and slows on exhalation.',
    rhythmData: {
      ...getBase('sinus-arrhythmia'),
      rateBpm: 72,
      heartRate: 'Cyclic 60 - 88 bpm'
    },
    distractorOptions: ['Atrial Fibrillation', 'Sinus Bradycardia', 'Premature Atrial Complex'],
    seed: 0
  },
  {
    id: 'sarrhythmia-prolonged-vagal',
    rhythmId: 'sinus-arrhythmia',
    rhythmName: 'Sinus Arrhythmia',
    clinicalContext: '25yo conditioned athlete during deep meditation. P-P intervals vary by >0.16s synchronously with breath.',
    rhythmData: {
      ...getBase('sinus-arrhythmia'),
      rateBpm: 66,
      heartRate: 'Cyclic 50 - 80 bpm'
    },
    distractorOptions: ['Sinus Arrest', 'Atrial Fibrillation', 'Second-degree AV Block Type I'],
    seed: 1
  },
  {
    id: 'sarrest-pause-28',
    rhythmId: 'sinus-arrest',
    rhythmName: 'Sinus Arrest',
    clinicalContext: '78yo with Sick Sinus Syndrome. Regular sinus beats interrupted by sudden 2.8s flatline pause.',
    rhythmData: {
      ...getBase('sinus-arrest'),
      rateBpm: 52,
      heartRate: 'Overall ~50 bpm (with 2.8s pause)'
    },
    distractorOptions: ['Second-degree AV Block Type II', 'Sinus Bradycardia', 'Third-degree AV Block'],
    seed: 0
  },
  {
    id: 'sarrest-pause-42',
    rhythmId: 'sinus-arrest',
    rhythmName: 'Sinus Arrest',
    clinicalContext: '82yo on Diltiazem. Prolonged 4.2s pause causing presyncope before late sinus resumption.',
    rhythmData: {
      ...getBase('sinus-arrest'),
      rateBpm: 46,
      heartRate: 'Slow with 4.2s pause'
    },
    distractorOptions: ['Asystole', 'Sinus Bradycardia', 'Second-degree AV Block Type I'],
    seed: 3
  },

  // -------------------------------------------------------------
  // 2. ATRIAL DYSRHYTHMIAS
  // -------------------------------------------------------------
  {
    id: 'pac-frequent-unifocal',
    rhythmId: 'premature-atrial-complex',
    rhythmName: 'Premature Atrial Complex (PAC)',
    clinicalContext: '42yo reporting palpitations after 4 double espressos. Narrow QRS with premature peaked P wave.',
    rhythmData: {
      ...getBase('premature-atrial-complex'),
      rateBpm: 78
    },
    distractorOptions: ['Premature Ventricular Complex (PVC)', 'Sinus Arrhythmia', 'Atrial Fibrillation'],
    seed: 1
  },
  {
    id: 'pac-bigeminy',
    rhythmId: 'premature-atrial-complex',
    rhythmName: 'Premature Atrial Complex (PAC)',
    clinicalContext: '63yo with COPD. Every other beat is an early narrow beat with abnormal P-wave morphology.',
    rhythmData: {
      ...getBase('premature-atrial-complex'),
      rateBpm: 82
    },
    distractorOptions: ['Premature Ventricular Complex (PVC)', 'Sinus Arrhythmia', 'Atrial Flutter'],
    seed: 2
  },
  {
    id: 'pac-nonconducted-blocked',
    rhythmId: 'premature-atrial-complex',
    rhythmName: 'Premature Atrial Complex (PAC)',
    clinicalContext: '57yo on telemetry. Early ectopic P wave arrives during AV refractoriness; no QRS follows!',
    rhythmData: {
      ...getBase('premature-atrial-complex'),
      rateBpm: 70
    },
    distractorOptions: ['Sinus Arrest', 'Second-degree AV Block Type II', 'Sinus Bradycardia'],
    seed: 4
  },
  {
    id: 'psvt-burst-175',
    rhythmId: 'paroxysmal-atrial-tachycardia',
    rhythmName: 'Paroxysmal Atrial Tachycardia (PAT / PSVT)',
    clinicalContext: '31yo female with sudden onset racing heart while sitting at desk. Abruptly starts and stops.',
    rhythmData: {
      ...getBase('paroxysmal-atrial-tachycardia'),
      rateBpm: 175,
      heartRate: '175 beats/min (paroxysmal)'
    },
    distractorOptions: ['Sinus Tachycardia', 'Ventricular Tachycardia', 'Atrial Flutter'],
    seed: 0
  },
  {
    id: 'psvt-continuous-180',
    rhythmId: 'paroxysmal-atrial-tachycardia',
    rhythmName: 'Paroxysmal Atrial Tachycardia (PAT / PSVT)',
    clinicalContext: '44yo in ED with acute onset palpitations. Constant rapid narrow complex tachycardia at 180 bpm.',
    rhythmData: {
      ...getBase('paroxysmal-atrial-tachycardia'),
      rateBpm: 180,
      heartRate: '180 beats/min'
    },
    distractorOptions: ['Sinus Tachycardia', 'Atrial Flutter', 'Ventricular Tachycardia'],
    seed: 1
  },
  {
    id: 'svt-sustained-195',
    rhythmId: 'supraventricular-tachycardia',
    rhythmName: 'Supraventricular Tachycardia (SVT)',
    clinicalContext: '24yo with palpitations and lightheadedness. Regular narrow complex tachycardia at 195 bpm with buried P waves.',
    rhythmData: {
      ...getBase('supraventricular-tachycardia'),
      rateBpm: 195,
      heartRate: '195 beats/min'
    },
    distractorOptions: ['Sinus Tachycardia', 'Ventricular Tachycardia', 'Atrial Fibrillation'],
    seed: 0
  },
  {
    id: 'svt-extreme-220',
    rhythmId: 'supraventricular-tachycardia',
    rhythmName: 'Supraventricular Tachycardia (SVT)',
    clinicalContext: '39yo admitted with WPW reentrant tachycardia. Narrow QRS marching fast at 220 bpm (picket fence).',
    rhythmData: {
      ...getBase('supraventricular-tachycardia'),
      rateBpm: 220,
      heartRate: '220 beats/min'
    },
    distractorOptions: ['Ventricular Tachycardia', 'Atrial Flutter', 'Sinus Tachycardia'],
    seed: 1
  },
  {
    id: 'aflutter-2to1-150',
    rhythmId: 'atrial-flutter',
    rhythmName: 'Atrial Flutter',
    clinicalContext: '66yo with COPD. Regular narrow QRS at exactly 150 bpm with classic sawtoothed F-waves in Lead II.',
    rhythmData: {
      ...getBase('atrial-flutter'),
      rateBpm: 150,
      heartRate: 'Atrial 300 bpm, Ventricular 150 bpm (2:1 block)'
    },
    distractorOptions: ['Supraventricular Tachycardia (SVT)', 'Sinus Tachycardia', 'Atrial Fibrillation'],
    seed: 0
  },
  {
    id: 'aflutter-3to1-100',
    rhythmId: 'atrial-flutter',
    rhythmName: 'Atrial Flutter',
    clinicalContext: '70yo on Diltiazem. 3 flutter waves preceding each QRS complex (3:1 conduction ratio).',
    rhythmData: {
      ...getBase('atrial-flutter'),
      rateBpm: 100,
      heartRate: 'Atrial 300 bpm, Ventricular 100 bpm (3:1 block)'
    },
    distractorOptions: ['Normal Sinus Rhythm', 'Second-degree AV Block Type II', 'Atrial Fibrillation'],
    seed: 1
  },
  {
    id: 'aflutter-4to1-75',
    rhythmId: 'atrial-flutter',
    rhythmName: 'Atrial Flutter',
    clinicalContext: '74yo post-cardiac surgery. Four clear sawtooth waves between narrow QRS complexes.',
    rhythmData: {
      ...getBase('atrial-flutter'),
      rateBpm: 75,
      heartRate: 'Atrial 300 bpm, Ventricular 75 bpm (4:1 block)'
    },
    distractorOptions: ['First-degree AV Block', 'Sinus Bradycardia', 'Atrial Fibrillation'],
    seed: 2
  },
  {
    id: 'aflutter-variable',
    rhythmId: 'atrial-flutter',
    rhythmName: 'Atrial Flutter',
    clinicalContext: '79yo in CCU with variable AV conduction: alternating 2:1, 3:1, and 4:1 block with sawteeth.',
    rhythmData: {
      ...getBase('atrial-flutter'),
      rateBpm: 110,
      heartRate: 'Variable ventricular response'
    },
    distractorOptions: ['Atrial Fibrillation', 'Sinus Arrhythmia', 'Second-degree AV Block Type I'],
    seed: 3
  },
  {
    id: 'afib-rvr-140',
    rhythmId: 'atrial-fibrillation',
    rhythmName: 'Atrial Fibrillation (Afib)',
    clinicalContext: '68yo male with acute decompensated heart failure. Irregularly irregular pulse deficit, rate 140 bpm.',
    rhythmData: {
      ...getBase('atrial-fibrillation'),
      rateBpm: 140,
      heartRate: 'Ventricular rate 140 bpm (Afib with RVR)'
    },
    distractorOptions: ['Atrial Flutter', 'Sinus Tachycardia', 'Supraventricular Tachycardia (SVT)'],
    seed: 1
  },
  {
    id: 'afib-controlled-78',
    rhythmId: 'atrial-fibrillation',
    rhythmName: 'Atrial Fibrillation (Afib)',
    clinicalContext: '72yo on chronic Apixaban and Metoprolol. Irregularly irregular rhythm with fine fibrillatory baseline.',
    rhythmData: {
      ...getBase('atrial-fibrillation'),
      rateBpm: 78,
      heartRate: 'Ventricular rate 78 bpm (Controlled Afib)'
    },
    distractorOptions: ['Sinus Arrhythmia', 'Premature Atrial Complex', 'Second-degree AV Block Type I'],
    seed: 0
  },
  {
    id: 'afib-coarse-wavy',
    rhythmId: 'atrial-fibrillation',
    rhythmName: 'Atrial Fibrillation (Afib)',
    clinicalContext: '80yo with massive left atrial enlargement. Coarse fibrillatory waves > 1mm with chaotic R-R spacing.',
    rhythmData: {
      ...getBase('atrial-fibrillation'),
      rateBpm: 95,
      heartRate: 'Coarse Afib ~95 bpm'
    },
    distractorOptions: ['Atrial Flutter', 'Ventricular Fibrillation', 'Sinus Arrhythmia'],
    seed: 2
  },
  {
    id: 'afib-slow-52',
    rhythmId: 'atrial-fibrillation',
    rhythmName: 'Atrial Fibrillation (Afib)',
    clinicalContext: '84yo female on Digoxin. Irregular wavy baseline with slow ventricular response under 60 bpm.',
    rhythmData: {
      ...getBase('atrial-fibrillation'),
      rateBpm: 52,
      heartRate: 'Ventricular rate 52 bpm (Slow Afib)'
    },
    distractorOptions: ['Sinus Bradycardia', 'Idioventricular Rhythm', 'Third-degree AV Block'],
    seed: 4
  },

  // -------------------------------------------------------------
  // 3. ATRIO-VENTRICULAR (AV) HEART BLOCKS
  // -------------------------------------------------------------
  {
    id: 'first-degree-pr24',
    rhythmId: 'first-degree-av-block',
    rhythmName: 'First-degree AV Block',
    clinicalContext: '54yo on Atenolol. PR interval measures 0.24 seconds (6 small boxes), constant on every beat.',
    rhythmData: {
      ...getBase('first-degree-av-block'),
      rateBpm: 66,
      heartRate: '66 beats/min',
      prInterval: '0.24 seconds (prolonged & constant)'
    },
    distractorOptions: ['Normal Sinus Rhythm', 'Second-degree AV Block Type I', 'Sinus Bradycardia'],
    seed: 0
  },
  {
    id: 'first-degree-pr32',
    rhythmId: 'first-degree-av-block',
    rhythmName: 'First-degree AV Block',
    clinicalContext: '67yo with chronic coronary disease. Strikingly long PR interval of 0.32 seconds (8 small boxes).',
    rhythmData: {
      ...getBase('first-degree-av-block'),
      rateBpm: 60,
      heartRate: '60 beats/min',
      prInterval: '0.32 seconds (significantly prolonged)'
    },
    distractorOptions: ['Second-degree AV Block Type II', 'Third-degree AV Block', 'Sinus Bradycardia'],
    seed: 1
  },
  {
    id: 'first-degree-pr40',
    rhythmId: 'first-degree-av-block',
    rhythmName: 'First-degree AV Block',
    clinicalContext: '73yo with extreme AV nodal delay. PR interval measures a massive 0.40 seconds (two full large boxes)!',
    rhythmData: {
      ...getBase('first-degree-av-block'),
      rateBpm: 58,
      heartRate: '58 beats/min',
      prInterval: '0.40s extreme delay'
    },
    distractorOptions: ['Third-degree AV Block', 'Second-degree AV Block Type I', 'Normal Sinus Rhythm'],
    seed: 2
  },
  {
    id: 'wenckebach-4to3',
    rhythmId: 'second-degree-av-block-type-1',
    rhythmName: 'Second-degree AV Block, Type I (Mobitz I, Wenckebach)',
    clinicalContext: '64yo post-inferior wall MI. PR interval progressively lengthens across 3 beats until 4th QRS drops!',
    rhythmData: {
      ...getBase('second-degree-av-block-type-1'),
      rateBpm: 64,
      heartRate: 'Atrial 80 bpm, Ventricular 64 bpm'
    },
    distractorOptions: ['Second-degree AV Block Type II', 'First-degree AV Block', 'Sinus Arrest'],
    seed: 0
  },
  {
    id: 'wenckebach-3to2',
    rhythmId: 'second-degree-av-block-type-1',
    rhythmName: 'Second-degree AV Block, Type I (Mobitz I, Wenckebach)',
    clinicalContext: '52yo marathon runner at rest. Rapid 3:2 Wenckebach cycle: short PR -> long PR -> dropped beat.',
    rhythmData: {
      ...getBase('second-degree-av-block-type-1'),
      rateBpm: 58,
      heartRate: 'Ventricular ~58 bpm'
    },
    distractorOptions: ['Third-degree AV Block', 'Sinus Arrhythmia', 'Second-degree AV Block Type II'],
    seed: 1
  },
  {
    id: 'mobitz2-3to2',
    rhythmId: 'second-degree-av-block-type-2',
    rhythmName: 'Second-degree AV Block, Type II (Mobitz II)',
    clinicalContext: '62yo with extensive anterior wall MI. Constant PR on conducted beats; abrupt unannounced dropped 3rd QRS.',
    rhythmData: {
      ...getBase('second-degree-av-block-type-2'),
      rateBpm: 46,
      heartRate: 'Ventricular 46 bpm'
    },
    distractorOptions: ['Second-degree AV Block Type I (Wenckebach)', 'First-degree AV Block', 'Third-degree AV Block'],
    seed: 0
  },
  {
    id: 'mobitz2-2to1',
    rhythmId: 'second-degree-av-block-type-2',
    rhythmName: 'Second-degree AV Block, Type II (Mobitz II)',
    clinicalContext: '71yo with calcific aortic disease. Every other P-wave fails to conduct (2:1). Constant PR on conducted beats.',
    rhythmData: {
      ...getBase('second-degree-av-block-type-2'),
      rateBpm: 40,
      heartRate: 'Ventricular 40 bpm (2:1)'
    },
    distractorOptions: ['Sinus Bradycardia', 'Second-degree AV Block Type I', 'Third-degree AV Block'],
    seed: 1
  },
  {
    id: 'chb-vent-escape-32',
    rhythmId: 'third-degree-av-block',
    rhythmName: 'Third-degree AV Block (Complete Heart Block)',
    clinicalContext: '79yo female with complete AV dissociation: regular P-waves at 95 bpm, independent wide QRS at 32 bpm.',
    rhythmData: {
      ...getBase('third-degree-av-block'),
      rateBpm: 32,
      heartRate: 'Atrial 95 bpm, Ventricular 32 bpm'
    },
    distractorOptions: ['Second-degree AV Block Type II', 'Sinus Bradycardia', 'Idioventricular Rhythm'],
    seed: 1
  },
  {
    id: 'chb-profound-24',
    rhythmId: 'third-degree-av-block',
    rhythmName: 'Third-degree AV Block (Complete Heart Block)',
    clinicalContext: '85yo with Stokes-Adams syncope. P waves march regular at 72 bpm while wide ventricular escape is only 24 bpm!',
    rhythmData: {
      ...getBase('third-degree-av-block'),
      rateBpm: 24,
      heartRate: 'Atrial 72 bpm, Ventricular 24 bpm'
    },
    distractorOptions: ['Idioventricular Rhythm', 'Sinus Bradycardia', 'Second-degree AV Block Type II'],
    seed: 2
  },

  // -------------------------------------------------------------
  // 4. VENTRICULAR DYSRHYTHMIAS
  // -------------------------------------------------------------
  {
    id: 'pvc-unifocal-isolated',
    rhythmId: 'premature-ventricular-complex',
    rhythmName: 'Premature Ventricular Complex (PVC)',
    clinicalContext: '49yo post-op day 1. Normal baseline rhythm interrupted by an early, wide (>0.12s), bizarre complex.',
    rhythmData: {
      ...getBase('premature-ventricular-complex'),
      rateBpm: 74
    },
    distractorOptions: ['Premature Atrial Complex (PAC)', 'Ventricular Tachycardia', 'Sinus Arrhythmia'],
    seed: 0
  },
  {
    id: 'pvc-bigeminy',
    rhythmId: 'premature-ventricular-complex',
    rhythmName: 'Premature Ventricular Complex (PVC)',
    clinicalContext: '56yo with hypokalemia (K+ 3.1 mEq/L). Every normal sinus beat is paired with an alternating wide PVC (Bigeminy).',
    rhythmData: {
      ...getBase('premature-ventricular-complex'),
      rateBpm: 72
    },
    distractorOptions: ['Ventricular Tachycardia', 'Atrial Fibrillation', 'Second-degree AV Block Type I'],
    seed: 1
  },
  {
    id: 'pvc-trigeminy',
    rhythmId: 'premature-ventricular-complex',
    rhythmName: 'Premature Ventricular Complex (PVC)',
    clinicalContext: '68yo post-PCI. Every third beat is an early wide bizarre ventricular complex (Ventricular Trigeminy).',
    rhythmData: {
      ...getBase('premature-ventricular-complex'),
      rateBpm: 75
    },
    distractorOptions: ['Premature Atrial Complex (PAC)', 'Sinus Arrhythmia', 'Atrial Flutter'],
    seed: 2
  },
  {
    id: 'pvc-couplet',
    rhythmId: 'premature-ventricular-complex',
    rhythmName: 'Premature Ventricular Complex (PVC)',
    clinicalContext: '62yo with ischemic cardiomyopathy. Pair of two consecutive wide bizarre PVCs firing back-to-back.',
    rhythmData: {
      ...getBase('premature-ventricular-complex'),
      rateBpm: 70
    },
    distractorOptions: ['Ventricular Tachycardia', 'Premature Atrial Complex (PAC)', 'Atrial Fibrillation'],
    seed: 3
  },
  {
    id: 'vtach-mono-165',
    rhythmId: 'ventricular-tachycardia',
    rhythmName: 'Ventricular Tachycardia (Vtach)',
    clinicalContext: '65yo male post-myocardial infarction scar. Continuous regular wide tombstone QRS at 165 bpm.',
    rhythmData: {
      ...getBase('ventricular-tachycardia'),
      rateBpm: 165,
      heartRate: '165 beats/min'
    },
    distractorOptions: ['Supraventricular Tachycardia (SVT)', 'Ventricular Fibrillation', 'Torsades de Pointes'],
    seed: 0
  },
  {
    id: 'vtach-rapid-205',
    rhythmId: 'ventricular-tachycardia',
    rhythmName: 'Ventricular Tachycardia (Vtach)',
    clinicalContext: '70yo collapsed in telemetry corridor. Wide complex monomorphic tachycardia at 205 bpm. Check pulse!',
    rhythmData: {
      ...getBase('ventricular-tachycardia'),
      rateBpm: 205,
      heartRate: '205 beats/min'
    },
    distractorOptions: ['Torsades de Pointes', 'Ventricular Fibrillation', 'Sinus Tachycardia'],
    seed: 1
  },
  {
    id: 'vtach-slow-130',
    rhythmId: 'ventricular-tachycardia',
    rhythmName: 'Ventricular Tachycardia (Vtach)',
    clinicalContext: '59yo with ischemic heart failure. Slow tolerated monomorphic VT at 130 bpm with wide notched complexes.',
    rhythmData: {
      ...getBase('ventricular-tachycardia'),
      rateBpm: 130,
      heartRate: '130 beats/min'
    },
    distractorOptions: ['Supraventricular Tachycardia (SVT)', 'Accelerated Idioventricular Rhythm', 'Sinus Tachycardia'],
    seed: 2
  },
  {
    id: 'torsades-twisting-220',
    rhythmId: 'torsades-de-pointes',
    rhythmName: 'Torsades de Pointes',
    clinicalContext: '51yo on IV Haloperidol and Azithromycin with QTc 530ms. Undulating twisting amplitude ribbon across baseline.',
    rhythmData: {
      ...getBase('torsades-de-pointes'),
      rateBpm: 220,
      heartRate: '220 beats/min (polymorphic)'
    },
    distractorOptions: ['Ventricular Tachycardia', 'Ventricular Fibrillation', 'Atrial Flutter'],
    seed: 0
  },
  {
    id: 'torsades-longqt-burst',
    rhythmId: 'torsades-de-pointes',
    rhythmName: 'Torsades de Pointes',
    clinicalContext: '46yo with severe hypomagnesemia. Long-QT baseline suddenly degenerates into rapid twisting spindle tachycardia.',
    rhythmData: {
      ...getBase('torsades-de-pointes'),
      rateBpm: 240,
      heartRate: '240 bpm burst'
    },
    distractorOptions: ['Ventricular Fibrillation', 'Ventricular Tachycardia', 'Atrial Fibrillation'],
    seed: 2
  },
  {
    id: 'ivr-escape-32',
    rhythmId: 'idioventricular-rhythm',
    rhythmName: 'Idioventricular Rhythm (Agonal Rhythm)',
    clinicalContext: '83yo with severe cardiogenic shock. Very wide, slurred QRS complexes pacing at 32 bpm without P waves.',
    rhythmData: {
      ...getBase('idioventricular-rhythm'),
      rateBpm: 32,
      heartRate: '32 beats/min'
    },
    distractorOptions: ['Sinus Bradycardia', 'Third-degree AV Block', 'Asystole'],
    seed: 0
  },
  {
    id: 'ivr-aivr-72',
    rhythmId: 'idioventricular-rhythm',
    rhythmName: 'Idioventricular Rhythm (Agonal Rhythm)',
    clinicalContext: '58yo post-primary PCI for acute STEMI. Reperfusion rhythm: wide QRS pacing smoothly at 72 bpm (AIVR).',
    rhythmData: {
      ...getBase('idioventricular-rhythm'),
      rateBpm: 72,
      heartRate: '72 beats/min (AIVR)'
    },
    distractorOptions: ['Ventricular Tachycardia', 'Sinus Tachycardia', 'Normal Sinus Rhythm'],
    seed: 1
  },
  {
    id: 'agonal-dying-18',
    rhythmId: 'idioventricular-rhythm',
    rhythmName: 'Idioventricular Rhythm (Agonal Rhythm)',
    clinicalContext: 'End-stage arrest patient. Sluggish, wide, distorted complexes firing at only 18 bpm ("dying heart").',
    rhythmData: {
      ...getBase('idioventricular-rhythm'),
      rateBpm: 18,
      heartRate: '18 beats/min (Agonal)'
    },
    distractorOptions: ['Asystole', 'Sinus Bradycardia', 'Ventricular Fibrillation'],
    seed: 2
  },
  {
    id: 'vfib-coarse',
    rhythmId: 'ventricular-fibrillation',
    rhythmName: 'Ventricular Fibrillation (Vfib)',
    clinicalContext: 'Unresponsive code blue patient. Chaotic, coarse squiggly line with zero organized QRS complexes. Shockable!',
    rhythmData: {
      ...getBase('ventricular-fibrillation'),
      rateBpm: 0,
      heartRate: 'None (chaotic coarse VF)'
    },
    distractorOptions: ['Ventricular Tachycardia', 'Torsades de Pointes', 'Asystole'],
    seed: 0
  },
  {
    id: 'vfib-fine',
    rhythmId: 'ventricular-fibrillation',
    rhythmName: 'Ventricular Fibrillation (Vfib)',
    clinicalContext: 'Prolonged cardiac arrest. Low-amplitude erratic fibrillatory wavelets ("fine VF"). Confirm in 2 leads!',
    rhythmData: {
      ...getBase('ventricular-fibrillation'),
      rateBpm: 0,
      name: 'Ventricular Fibrillation (Fine VF)',
      heartRate: 'None (chaotic fine VF)'
    },
    distractorOptions: ['Asystole', 'Atrial Fibrillation', 'Idioventricular Rhythm'],
    seed: 2
  },
  {
    id: 'asystole-true-flatline',
    rhythmId: 'asystole',
    rhythmName: 'Asystole',
    clinicalContext: 'Cardiac arrest with absence of all electrical activity. Straight isoelectric baseline. CPR + Epinephrine!',
    rhythmData: {
      ...getBase('asystole'),
      rateBpm: 0,
      heartRate: 'None (0 bpm)'
    },
    distractorOptions: ['Ventricular Fibrillation (Fine VF)', 'Idioventricular Rhythm', 'Sinus Arrest'],
    seed: 0
  },
  {
    id: 'asystole-pwave-standstill',
    rhythmId: 'asystole',
    rhythmName: 'Asystole',
    clinicalContext: 'Ventricular standstill: isolated upright P-waves continue at 60 bpm, but ventricles fail to respond with zero QRS!',
    rhythmData: {
      ...getBase('asystole'),
      rateBpm: 0,
      heartRate: 'P-wave asystole (0 ventricular)'
    },
    distractorOptions: ['Third-degree AV Block', 'Sinus Bradycardia', 'Idioventricular Rhythm'],
    seed: 1
  },

  // -------------------------------------------------------------
  // 5. CRITICAL TOPICS
  // -------------------------------------------------------------
  {
    id: 'pea-hypovolemia',
    rhythmId: 'pulseless-electrical-activity',
    rhythmName: 'Pulseless Electrical Activity (PEA)',
    clinicalContext: 'Monitor shows organized sinus rhythm at 65 bpm, but carotid pulse is absent! Severe traumatic hemorrhage.',
    rhythmData: {
      ...getBase('pulseless-electrical-activity'),
      rateBpm: 65,
      heartRate: '65 bpm on monitor (Pulseless!)'
    },
    distractorOptions: ['Normal Sinus Rhythm', 'Sinus Bradycardia', 'Asystole'],
    seed: 0
  },
  {
    id: 'pea-bradycardic-44',
    rhythmId: 'pulseless-electrical-activity',
    rhythmName: 'Pulseless Electrical Activity (PEA)',
    clinicalContext: 'Arrest patient with slow organized complexes at 44 bpm on screen, but zero mechanical pulse. Non-shockable!',
    rhythmData: {
      ...getBase('pulseless-electrical-activity'),
      rateBpm: 44,
      heartRate: '44 bpm (PEA Arrest)'
    },
    distractorOptions: ['Sinus Bradycardia', 'Idioventricular Rhythm', 'Asystole'],
    seed: 1
  },
  {
    id: 'paced-ventricular-70',
    rhythmId: 'paced-rhythm',
    rhythmName: 'Paced Rhythm (Atrial, Ventricular, Dual)',
    clinicalContext: '76yo with permanent pacemaker. Sharp vertical needle spikes immediately preceding wide LBBB-like QRS complexes.',
    rhythmData: {
      ...getBase('paced-rhythm'),
      rateBpm: 70,
      heartRate: '70 bpm (Ventricular Paced)'
    },
    distractorOptions: ['Ventricular Tachycardia', 'Idioventricular Rhythm', 'Left Bundle Branch Block'],
    seed: 0
  },
  {
    id: 'paced-dual-chamber',
    rhythmId: 'paced-rhythm',
    rhythmName: 'Paced Rhythm (Atrial, Ventricular, Dual)',
    clinicalContext: '82yo with dual-chamber pacemaker. Two distinct spikes: atrial spike before P wave, ventricular spike before wide QRS.',
    rhythmData: {
      ...getBase('paced-rhythm'),
      rateBpm: 75,
      heartRate: '75 bpm (Dual Chamber AV Paced)'
    },
    distractorOptions: ['First-degree AV Block', 'Ventricular Tachycardia', 'Normal Sinus Rhythm'],
    seed: 2
  },
  {
    id: 'stemi-tombstone-anterior',
    rhythmId: 'st-elevation-mi',
    rhythmName: 'ST-Elevated MI (STEMI)',
    clinicalContext: '53yo with crushing chest pain and diaphoresis. ST-segment elevation >4mm above isoelectric line (Tombstone MI).',
    rhythmData: {
      ...getBase('st-elevation-mi'),
      rateBpm: 86,
      heartRate: '86 beats/min'
    },
    distractorOptions: ['Normal Sinus Rhythm', 'Pericarditis', 'Ventricular Tachycardia'],
    seed: 0
  },
  {
    id: 'stemi-hyperacute-t',
    rhythmId: 'st-elevation-mi',
    rhythmName: 'ST-Elevated MI (STEMI)',
    clinicalContext: '60yo with acute 20-minute onset substernal pressure. Tall hyperacute T waves with 3mm ST-elevation at J-point.',
    rhythmData: {
      ...getBase('st-elevation-mi'),
      rateBpm: 76,
      heartRate: '76 beats/min'
    },
    distractorOptions: ['Normal Sinus Rhythm', 'Sinus Tachycardia', 'Left Bundle Branch Block'],
    seed: 3
  }
];
