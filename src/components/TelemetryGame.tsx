import React, { useState, useMemo } from 'react';
import { RHYTHM_DATABASE } from '../data/rhythmDatabase';
import { generateWaveformForRhythm } from '../utils/waveformGenerator';
import { CaliperTool } from './CaliperTool';
import { Trophy, CheckCircle2, XCircle, ArrowRight, RotateCcw, AlertTriangle, Compass, HeartPulse, Sparkles, ZoomIn, ZoomOut } from 'lucide-react';

interface GameScenario {
  id: number;
  room: string;
  patientDesc: string;
  rhythmId: string;
  rhythmOptions: string[];
  correctRhythm: string;
  interventionQuestion: string;
  interventionOptions: {
    text: string;
    isCorrect: boolean;
    rationale: string;
  }[];
}

const CLINICAL_SCENARIOS: GameScenario[] = [
  {
    id: 1,
    room: 'Room 312',
    patientDesc: '64-year-old male post-inferior STEMI day 2. Telemetry alarm beeps slow rate. Patient states: "Nurse, I feel suddenly dizzy and lightheaded." BP is 82/48 mmHg, HR 44 bpm.',
    rhythmId: 'sinus-bradycardia',
    rhythmOptions: ['Sinus Bradycardia', 'Sinus Arrest', 'First-degree AV Block', 'Idioventricular Rhythm'],
    correctRhythm: 'Sinus Bradycardia',
    interventionQuestion: 'Patient is symptomatic with hypotension and presyncope. What is your immediate ACLS first-line nursing intervention?',
    interventionOptions: [
      {
        text: 'Administer Atropine 1 mg IV push rapidly every 3-5 minutes (max 3 mg)',
        isCorrect: true,
        rationale: 'Correct! Atropine 1 mg IV push is the first-line medication for symptomatic sinus bradycardia (ACLS guidelines). It blocks vagal input to the SA node to elevate rate.'
      },
      {
        text: 'Administer Adenosine 6 mg rapid IV push',
        isCorrect: false,
        rationale: 'Adenosine slows conduction through the AV node and is used for SVT, NOT bradycardia. Giving it here would cause asystole!'
      },
      {
        text: 'Immediately perform unsynchronized defibrillation at 200 Joules',
        isCorrect: false,
        rationale: 'Defibrillation is strictly for pulseless VT and VF. Shocking an organized bradycardic rhythm with a pulse is lethal negligence.'
      },
      {
        text: 'Reassure patient and recheck vitals in 4 hours',
        isCorrect: false,
        rationale: 'The patient is hemodynamically unstable (SBP < 90 with presyncope). Waiting 4 hours invites cardiac arrest.'
      }
    ]
  },
  {
    id: 2,
    room: 'Room 408',
    patientDesc: '28-year-old female admitted with extreme palpitations and anxiety after 3 energy drinks. Monitor suddenly registers a regular narrow-complex rate of 190 bpm. BP is 118/74 mmHg, alert and oriented.',
    rhythmId: 'supraventricular-tachycardia',
    rhythmOptions: ['Supraventricular Tachycardia (SVT)', 'Sinus Tachycardia', 'Atrial Fibrillation', 'Ventricular Tachycardia'],
    correctRhythm: 'Supraventricular Tachycardia (SVT)',
    interventionQuestion: 'Patient is hemodynamically STABLE (normotensive, alert). What is your initial nursing action before pushing drugs?',
    interventionOptions: [
      {
        text: 'Instruct patient in Vagal Maneuvers (e.g. modified Valsalva maneuver with leg raise)',
        isCorrect: true,
        rationale: 'Correct! For stable narrow-complex SVT, vagal maneuvers are non-invasive, safe, and first-line. If ineffective, proceed immediately to Adenosine 6 mg rapid IV push.'
      },
      {
        text: 'Immediate Synchronized Cardioversion at 200J under emergency sedation',
        isCorrect: false,
        rationale: 'Cardioversion is reserved for UNSTABLE patients (hypotensive, chest pain, altered LOC). This patient is stable.'
      },
      {
        text: 'Administer Atropine 1 mg IV push',
        isCorrect: false,
        rationale: 'Atropine speeds up the heart! The rate is already 190 bpm!'
      },
      {
        text: 'Immediate CPR and chest compressions',
        isCorrect: false,
        rationale: 'The patient is awake, speaking, and has a strong pulse.'
      }
    ]
  },
  {
    id: 3,
    room: 'Room 501',
    patientDesc: '76-year-old female with long history of hypertension and mitral regurgitation. Telemetry shows an irregularly irregular cadence with no distinct P waves. Radial pulse is 126 bpm, irregular. Apical pulse is 142 bpm.',
    rhythmId: 'atrial-fibrillation',
    rhythmOptions: ['Atrial Fibrillation (Afib with RVR)', 'Atrial Flutter', 'Sinus Arrhythmia', 'Second-degree AV Block Type I'],
    correctRhythm: 'Atrial Fibrillation (Afib with RVR)',
    interventionQuestion: 'You note a significant "pulse deficit" between apical and radial pulses. What is the highest nursing safety priority regarding stroke prevention?',
    interventionOptions: [
      {
        text: 'Verify anticoagulation status (e.g. DOAC or Warfarin) before any rhythm conversion attempts',
        isCorrect: true,
        rationale: 'Correct! Atrial fibrillation allows blood to pool and clot in the left atrial appendage. Converting without therapeutic anticoagulation or TEE can launch a stroke-causing embolus to the brain!'
      },
      {
        text: 'Immediately shock the patient with unsynchronized 360 Joules',
        isCorrect: false,
        rationale: 'Never deliver unsynchronized shock to Afib (risk of R-on-T VFib), and cardioversion without anticoagulation risk assessment is dangerous.'
      },
      {
        text: 'Administer high-dose IV Potassium bolus over 1 minute',
        isCorrect: false,
        rationale: 'IV potassium must NEVER be given as a rapid push or bolus (causes instant lethal cardiac arrest).'
      },
      {
        text: 'Place patient in Trendelenburg position and discontinue oxygen',
        isCorrect: false,
        rationale: 'Trendelenburg increases cerebral venous congestion and will not slow the ventricular rate.'
      }
    ]
  },
  {
    id: 4,
    room: 'Room 214',
    patientDesc: '59-year-old male on day 3 of acute anterior wall MI. Telemetry reveals normal P waves with constant PR intervals, but every 3rd QRS complex is abruptly dropped without warning. BP is 86/50 mmHg.',
    rhythmId: 'second-degree-av-block-type-2',
    rhythmOptions: ['Second-degree AV Block, Type II (Mobitz II)', 'Second-degree AV Block, Type I (Wenckebach)', 'First-degree AV Block', 'Sinus Arrest'],
    correctRhythm: 'Second-degree AV Block, Type II (Mobitz II)',
    interventionQuestion: 'The PR interval does NOT lengthen before the dropped beat; it is constant. What is your critical emergency action?',
    interventionOptions: [
      {
        text: 'Attach Transcutaneous Pacing (TCP) pads immediately; prep for pacemaker wire',
        isCorrect: true,
        rationale: 'Correct! Mobitz II is an infranodal block below the AV node that frequently degenerates into complete heart block or asystole. Atropine is ineffective; emergency pacing is mandatory!'
      },
      {
        text: 'Give rapid bolus of Atropine 1 mg IV and wait 30 minutes',
        isCorrect: false,
        rationale: 'Atropine acts on the AV node, not bundle branches. Speeding up the atria can actually worsen infranodal block and precipitate asystole!'
      },
      {
        text: 'Reassure patient that this is normal post-MI Wenckebach',
        isCorrect: false,
        rationale: 'This is Mobitz II, not Wenckebach! In Wenckebach the PR progressively lengthens. Here it is constant.'
      },
      {
        text: 'Administer Adenosine 6 mg IV',
        isCorrect: false,
        rationale: 'Adenosine blocks AV conduction and would worsen the block.'
      }
    ]
  },
  {
    id: 5,
    room: 'Room 602 (Code Blue)',
    patientDesc: 'You hear a loud crash in Room 602. You rush in and find a 71-year-old male collapsed on the floor, unresponsive and apneic. The telemetry monitor shows a chaotic, wavy, erratic scribble with no QRS complexes.',
    rhythmId: 'ventricular-fibrillation',
    rhythmOptions: ['Ventricular Fibrillation (Vfib)', 'Ventricular Tachycardia', 'Torsades de Pointes', 'Asystole'],
    correctRhythm: 'Ventricular Fibrillation (Vfib)',
    interventionQuestion: 'The patient has NO carotid pulse. What is your immediate ACLS sequence?',
    interventionOptions: [
      {
        text: 'Yell for help, begin chest compressions immediately, and DEFIBRILLATE at 120-200J as soon as the pads are on!',
        isCorrect: true,
        rationale: 'Correct! "VFIB = DEFIB!" V-Fib is a shockable rhythm with zero cardiac output. Early defibrillation plus continuous high-quality CPR is the only intervention that restores spontaneous circulation.'
      },
      {
        text: 'Administer IV Atropine 1 mg and check pupillary reflex',
        isCorrect: false,
        rationale: 'Atropine has no role in V-Fib cardiac arrest and was removed from ACLS arrest algorithms years ago.'
      },
      {
        text: 'Spend 2 minutes attempting to sync the defibrillator before delivering a shock',
        isCorrect: false,
        rationale: 'V-Fib has no QRS to sync to! The shock must be UNSYNCHRONIZED (defibrillation), not synchronized cardioversion.'
      },
      {
        text: 'Start an IV infusion of normal saline and wait for the code team',
        isCorrect: false,
        rationale: 'Every second of delayed CPR and defibrillation drops survival by 10%!'
      }
    ]
  },
  {
    id: 6,
    room: 'Room 319',
    patientDesc: '52-year-old female receiving IV Azithromycin and Haloperidol. Baseline QTc was 540 ms. Telemetry monitor suddenly alarms with a rapid twisting ventricular rhythm that waxes and wanes in amplitude across the baseline.',
    rhythmId: 'torsades-de-pointes',
    rhythmOptions: ['Torsades de Pointes', 'Ventricular Fibrillation', 'Atrial Flutter', 'Monomorphic Ventricular Tachycardia'],
    correctRhythm: 'Torsades de Pointes',
    interventionQuestion: 'The rhythm exhibits the classic "twisting of the points" triggered by QT prolongation. What is the first-line medication you must administer stat?',
    interventionOptions: [
      {
        text: 'IV Magnesium Sulfate 1 to 2 grams diluted in 10 mL D5W pushed over 1-2 minutes',
        isCorrect: true,
        rationale: 'Correct! Magnesium Sulfate is the drug of choice for Torsades de Pointes, regardless of the patient\'s serum magnesium level. It stabilizes the cardiac membrane.'
      },
      {
        text: 'IV Amiodarone 150 mg bolus over 10 minutes',
        isCorrect: false,
        rationale: 'DANGEROUS! Amiodarone prolongs the QT interval and will make Torsades de Pointes lethal!'
      },
      {
        text: 'IV Digoxin 0.25 mg rapid push',
        isCorrect: false,
        rationale: 'Digoxin is not indicated and can trigger further ventricular dysrhythmias.'
      },
      {
        text: 'Oral Potassium pills with water',
        isCorrect: false,
        rationale: 'The patient is in acute unstable polymorphic VT; oral medication is far too slow and unsafe.'
      }
    ]
  },
  {
    id: 7,
    room: 'Room 415',
    patientDesc: '80-year-old male admitted with profound weakness. Telemetry strip shows P waves marching regular at 75 bpm and wide QRS complexes marching regular at 32 bpm. Calipers show zero correlation between P waves and QRS complexes.',
    rhythmId: 'third-degree-av-block',
    rhythmOptions: ['Third-degree AV Block (Complete Heart Block)', 'First-degree AV Block', 'Second-degree AV Block Type I', 'Sinus Bradycardia'],
    correctRhythm: 'Third-degree AV Block (Complete Heart Block)',
    interventionQuestion: 'The poem says "If Ps and Qs don\'t agree, then you have a THIRD DEGREE." The patient\'s BP is 74/42. What is the emergency treatment?',
    interventionOptions: [
      {
        text: 'Immediate Transcutaneous Pacing (TCP); prepare for permanent pacemaker',
        isCorrect: true,
        rationale: 'Correct! Third-Degree AV Block represents complete AV dissociation. Transcutaneous pacing provides artificial ventricular pacing until a transvenous or permanent pacer is placed.'
      },
      {
        text: 'Administer Metoprolol 5 mg IV push',
        isCorrect: false,
        rationale: 'Metoprolol is a beta blocker that will further suppress ventricular escape pacemaker cells and cause death.'
      },
      {
        text: 'Discharge patient home with a Holter monitor',
        isCorrect: false,
        rationale: 'This is a life-threatening complete heart block with severe hypotension requiring intensive care.'
      },
      {
        text: 'Instruct patient to cough vigorously to break the rhythm',
        isCorrect: false,
        rationale: 'Coughing increases vagal tone, which will not fix complete structural heart block.'
      }
    ]
  },
  {
    id: 8,
    room: 'Room 522',
    patientDesc: '49-year-old male with crushing substernal chest pain radiating to left jaw, diaphoresis. Telemetry Lead II shows 4mm ST segment elevation above the isoelectric baseline merged into a tombstone shape.',
    rhythmId: 'st-elevation-mi',
    rhythmOptions: ['ST-Elevated MI (STEMI)', 'Normal Sinus Rhythm', 'Pericarditis', 'Left Bundle Branch Block'],
    correctRhythm: 'ST-Elevated MI (STEMI)',
    interventionQuestion: 'You identify acute STEMI. What is the primary hospital-wide protocol you must trigger immediately?',
    interventionOptions: [
      {
        text: 'Activate "Code STEMI" / Cardiac Cath Lab team STAT for primary PCI (<90 min door-to-balloon)',
        isCorrect: true,
        rationale: 'Correct! "Time is muscle!" Total coronary occlusion requires emergent revascularization in the Cardiac Catheterization Laboratory within 90 minutes of medical contact.'
      },
      {
        text: 'Administer Adenosine 12 mg rapid IV push',
        isCorrect: false,
        rationale: 'Adenosine is for SVT, not myocardial infarction. It provides no reperfusion and can cause coronary steal.'
      },
      {
        text: 'Order a non-urgent outpatient stress test for next week',
        isCorrect: false,
        rationale: 'Acute STEMI requires immediate emergency reperfusion, not delayed outpatient testing.'
      },
      {
        text: 'Instruct patient to drink cold water to soothe esophageal spasm',
        isCorrect: false,
        rationale: 'Delaying STEMI care results in irreversible transmural myocardial necrosis.'
      }
    ]
  }
];

export const TelemetryGame: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedRhythm, setSelectedRhythm] = useState<string | null>(null);
  const [selectedIntervention, setSelectedIntervention] = useState<number | null>(null);
  const [step, setStep] = useState<'rhythm' | 'intervention' | 'reviewed'>('rhythm');
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [calipersOpen, setCalipersOpen] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const zoomIn = () => setZoomLevel((prev) => Math.min(2.0, Number((prev + 0.25).toFixed(2))));
  const zoomOut = () => setZoomLevel((prev) => Math.max(0.75, Number((prev - 0.25).toFixed(2))));
  const resetZoom = () => setZoomLevel(1.0);

  const scenario = CLINICAL_SCENARIOS[currentIdx];
  const rhythmData = RHYTHM_DATABASE.find((r) => r.id === scenario.rhythmId)!;
  // Standard 6-Second Strip (30 large boxes = 900px at 25 mm/s)
  const strip = useMemo(() => generateWaveformForRhythm(rhythmData, 900, 180), [rhythmData]);

  const handleRhythmSubmit = (choice: string) => {
    setSelectedRhythm(choice);
    const isCorrect = choice === scenario.correctRhythm;
    if (isCorrect) {
      setScore((s) => s + 50);
      setStreak((st) => {
        const next = st + 1;
        if (next > bestStreak) setBestStreak(next);
        return next;
      });
    } else {
      setStreak(0);
    }
    setStep('intervention');
  };

  const handleInterventionSubmit = (optIdx: number) => {
    setSelectedIntervention(optIdx);
    const isCorrect = scenario.interventionOptions[optIdx].isCorrect;
    if (isCorrect) {
      setScore((s) => s + 50);
    }
    setStep('reviewed');
  };

  const handleNextScenario = () => {
    if (currentIdx + 1 < CLINICAL_SCENARIOS.length) {
      setCurrentIdx((c) => c + 1);
      setSelectedRhythm(null);
      setSelectedIntervention(null);
      setStep('rhythm');
    } else {
      setIsFinished(true);
    }
  };

  const restartGame = () => {
    setCurrentIdx(0);
    setSelectedRhythm(null);
    setSelectedIntervention(null);
    setStep('rhythm');
    setScore(0);
    setStreak(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const maxScore = CLINICAL_SCENARIOS.length * 100;
    const percentage = Math.round((score / maxScore) * 100);

    return (
      <div className="bg-[#FFFFFF] border border-[#E0EAE4] rounded-xl p-8 text-center space-y-6 shadow-xs max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-[#FEF2EB] text-[#F47321] rounded-full flex items-center justify-center mx-auto shadow-xs border border-[#F47321]/30">
          <Trophy className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono font-bold text-[#005030] uppercase">
            University of Miami Hospital & Clinics
          </div>
          <h3 className="text-2xl font-black text-[#005030]">Clinical Telemetry Shift Complete!</h3>
          <p className="text-sm text-[#4B6358]">
            You analyzed {CLINICAL_SCENARIOS.length} critical cardiology patients at UHealth Tower & Ryder Trauma, calipored waveforms, and executed ACLS nursing protocols.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto font-mono text-center">
          <div className="bg-[#F5F8F6] p-3 rounded-lg border border-[#E0EAE4]">
            <span className="text-[10px] text-[#61796F] block font-sans uppercase">Score</span>
            <span className="text-xl font-bold text-[#F47321]">{score}</span>
          </div>
          <div className="bg-[#F5F8F6] p-3 rounded-lg border border-[#E0EAE4]">
            <span className="text-[10px] text-[#61796F] block font-sans uppercase">Accuracy</span>
            <span className="text-xl font-bold text-[#005030]">{percentage}%</span>
          </div>
          <div className="bg-[#F5F8F6] p-3 rounded-lg border border-[#E0EAE4]">
            <span className="text-[10px] text-[#61796F] block font-sans uppercase">Best Streak</span>
            <span className="text-xl font-bold text-[#F47321]">{bestStreak} 🔥</span>
          </div>
        </div>

        <div className="p-4 bg-[#F5F8F6] border border-[#E0EAE4] rounded-lg text-xs text-[#4B6358] text-left">
          <strong className="text-[#005030] block mb-1 font-bold">Canes Preceptor Clinical Evaluation:</strong>
          {percentage >= 80 ? (
            <span>Outstanding cardiac acumen! You demonstrate rapid telemetry pattern recognition, precise caliper discipline, and sound ACLS pharmacological judgment ready for UHealth Tower CCU or Ryder Trauma leadership.</span>
          ) : (
            <span>Solid clinical effort! Practice using calipers to verify PR and QRS intervals and review the Heart Block Poem to sharpen your speed on the telemetry floor.</span>
          )}
        </div>

        <button
          onClick={restartGame}
          className="px-6 py-2.5 bg-[#F47321] text-white rounded-lg text-sm font-bold hover:bg-[#D95F12] transition-colors inline-flex items-center gap-2 shadow-xs"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start New Telemetry Shift</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] border border-[#E0EAE4] rounded-xl overflow-hidden shadow-xs space-y-5 p-5">
      {/* Shift Game Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E0EAE4] pb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#FEF2EB] text-[#F47321] font-mono font-bold text-[11px] border border-[#F47321]/30">
            Case {currentIdx + 1} of {CLINICAL_SCENARIOS.length}
          </span>
          <span className="font-bold text-[#005030] text-sm">{scenario.room}</span>
          <span className="text-[#A6BFB0]">·</span>
          <span className="text-[#4B6358] font-medium">UHealth Tower Emergency Alert</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
          <div className="flex items-center gap-1">
            <span className="text-[#61796F]">Score:</span>
            <span className="font-bold text-[#F47321]">{score}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#61796F]">Streak:</span>
            <span className="font-bold text-[#F47321]">{streak} 🔥</span>
          </div>

          {/* Caliper Toggle */}
          <button
            onClick={() => setCalipersOpen(!calipersOpen)}
            className={`px-2 py-0.5 rounded border transition-colors flex items-center gap-1 font-semibold ${
              calipersOpen
                ? 'bg-[#FEF2EB] text-[#F47321] border-[#F47321]/40'
                : 'text-[#61796F] border-[#E0EAE4]'
            }`}
          >
            <Compass className="w-3 h-3" />
            <span>Calipers {calipersOpen ? 'ON' : 'OFF'}</span>
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center bg-[#F0EFEB] p-0.5 rounded font-mono text-[11px]">
            <button
              onClick={zoomOut}
              disabled={zoomLevel <= 0.75}
              className="p-1 text-[#7C7971] hover:text-[#1F1E1D] disabled:opacity-30 rounded hover:bg-white transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <button
              onClick={resetZoom}
              className="px-1.5 py-0.5 text-[#54524D] hover:text-[#1F1E1D] rounded hover:bg-white text-[10px] font-semibold"
              title="Reset zoom to 100%"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={zoomIn}
              disabled={zoomLevel >= 2.0}
              className="p-1 text-[#7C7971] hover:text-[#1F1E1D] disabled:opacity-30 rounded hover:bg-white transition-colors"
              title="Zoom in (enlarge waveform grid)"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Patient Bedside Scenario Report */}
      <div className="bg-[#FAF9F5] border border-[#E5E5DF] rounded-lg p-3.5 flex items-start gap-3">
        <HeartPulse className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
        <div className="text-xs space-y-0.5">
          <span className="font-bold text-[#1F1E1D] uppercase tracking-wider text-[10px] block">
            Bedside Nurse Report:
          </span>
          <p className="text-[#37352F] leading-relaxed">
            {scenario.patientDesc}
          </p>
        </div>
      </div>

      {/* Live ECG Strip with Interactive Calipers — Standard 6-Second Strip */}
      <div className="border border-[#E5E5DF] rounded-xl overflow-hidden shadow-inner">
        <div
          className="ecg-grid-pink relative overflow-x-auto select-none"
          style={{ minHeight: `${Math.round(180 * zoomLevel)}px` }}
        >
          <div
            style={{
              width: '900px',
              height: '180px',
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'top left',
              marginBottom: `${Math.round(180 * (zoomLevel - 1))}px`,
              marginRight: `${Math.round(900 * (zoomLevel - 1))}px`
            }}
            className="relative transition-transform duration-150"
          >
            {/* Top 0s, 3s, and 6s Calibration Marks */}
            <div className="absolute top-0 left-0 right-0 h-4 pointer-events-none z-10 flex">
              {/* 0s Mark */}
              <div className="absolute top-0 left-0 flex flex-col items-center">
                <div className="w-0.5 h-3 bg-red-700/80" />
                <span className="text-[9px] font-mono text-red-700/90 font-bold pl-0.5">0s</span>
              </div>

              {/* 3s Mark */}
              <div
                style={{ left: `${strip.threeSecondMarkX}px` }}
                className="absolute top-0 flex flex-col items-center -translate-x-1/2"
              >
                <div className="w-0.5 h-3 bg-red-700/80" />
                <span className="text-[9px] font-mono text-red-700/90 font-bold">3s (15 boxes)</span>
              </div>

              {/* 6s Mark */}
              <div
                style={{ left: `${strip.sixSecondMarkX - 2}px` }}
                className="absolute top-0 flex flex-col items-end"
              >
                <div className="w-0.5 h-3 bg-red-700/80" />
                <span className="text-[9px] font-mono text-red-700/90 font-bold pr-0.5">6s (30 boxes)</span>
              </div>
            </div>

            <svg className="w-full h-full absolute inset-0 overflow-visible" viewBox="0 0 900 180">
              <path
                d={strip.svgPath}
                fill="none"
                stroke="#1F2937"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Caliper Overlay */}
            <CaliperTool
              stripWidth={900}
              smallBoxPx={strip.smallBoxPx}
              visible={calipersOpen}
              rPeakX1={strip.landmarks[0]?.rPeakX ?? 150}
              rPeakX2={strip.landmarks[1]?.rPeakX ?? 270}
            />
          </div>
        </div>

        {/* 6-Second Strip Rate Helper */}
        <div className="bg-[#FAF9F5] px-3.5 py-1.5 border-t border-[#EAE8E3] flex flex-wrap items-center justify-between gap-2 text-xs text-[#54524D]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#1F1E1D]">Standard 6-Second Strip:</span>
            <span className="font-mono text-[#C2410C] bg-[#FAF0EB] px-2 py-0.5 rounded border border-[#D97706]/20 font-bold">
              {strip.landmarks.length} R-waves in 6 sec × 10 = {strip.landmarks.length * 10} bpm
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#7C7971]">
            30 Large Boxes = 6.0s (Count complete R-waves × 10)
          </span>
        </div>
      </div>

      {/* PHASE 1: IDENTIFY RHYTHM */}
      {step === 'rhythm' && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-white bg-[#005030] px-2.5 py-0.5 rounded shadow-2xs">
              Phase 1
            </span>
            <h4 className="text-sm font-bold text-[#005030]">
              Analyze the rhythm using your calipers. What is your definitive rhythm interpretation?
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {scenario.rhythmOptions.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleRhythmSubmit(opt)}
                className="p-3 text-left border border-[#E0EAE4] bg-[#FFFFFF] hover:bg-[#EBF3EE] hover:border-[#005030] rounded-lg text-xs font-semibold text-[#0D1F17] transition-all flex items-center justify-between shadow-2xs group"
              >
                <span>{opt}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A6BFB0] group-hover:text-[#005030] transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PHASE 2: IMMEDIATE NURSING INTERVENTION */}
      {(step === 'intervention' || step === 'reviewed') && (
        <div className="space-y-4 pt-2 border-t border-[#E0EAE4]">
          {/* Phase 1 Feedback Bar */}
          <div
            className={`p-3 rounded-lg border text-xs flex items-center gap-2.5 ${
              selectedRhythm === scenario.correctRhythm
                ? 'bg-[#EBF3EE] border-[#005030]/30 text-[#005030]'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            {selectedRhythm === scenario.correctRhythm ? (
              <CheckCircle2 className="w-4 h-4 text-[#005030] shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <div>
              <span className="font-bold">
                {selectedRhythm === scenario.correctRhythm ? 'Correct Rhythm Identification! ' : 'Incorrect Rhythm: '}
              </span>
              <span>
                You chose "{selectedRhythm}". Correct answer: <strong>{scenario.correctRhythm}</strong>.
              </span>
            </div>
          </div>

          {/* Phase 2 Question */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-white bg-[#F47321] px-2.5 py-0.5 rounded shadow-2xs">
                Phase 2
              </span>
              <h4 className="text-sm font-bold text-[#005030]">
                {scenario.interventionQuestion}
              </h4>
            </div>

            <div className="space-y-2">
              {scenario.interventionOptions.map((opt, idx) => {
                const isPicked = selectedIntervention === idx;
                const showResults = step === 'reviewed';

                let btnStyle = 'border-[#E0EAE4] bg-[#FFFFFF] hover:border-[#005030] hover:bg-[#EBF3EE]';
                if (showResults) {
                  if (opt.isCorrect) {
                    btnStyle = 'border-[#005030] bg-[#EBF3EE] text-[#005030] font-semibold';
                  } else if (isPicked) {
                    btnStyle = 'border-rose-300 bg-rose-50/70 text-rose-900 font-semibold';
                  }
                }

                return (
                  <div key={idx} className="space-y-1">
                    <button
                      disabled={showResults}
                      onClick={() => handleInterventionSubmit(idx)}
                      className={`w-full p-3 text-left border rounded-lg text-xs transition-all flex items-start gap-2.5 shadow-2xs ${btnStyle}`}
                    >
                      <span className="font-mono font-bold text-[#005030] shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <span className="font-medium text-[#0D1F17] flex-1">{opt.text}</span>
                    </button>

                    {showResults && (isPicked || opt.isCorrect) && (
                      <div className="text-[11px] px-3 py-1.5 bg-[#F5F8F6] border border-[#E0EAE4] rounded text-[#4B6358] flex items-start gap-1.5 ml-6">
                        <Sparkles className="w-3.5 h-3.5 text-[#F47321] shrink-0 mt-0.5" />
                        <span>{opt.rationale}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Bar when Reviewed */}
          {step === 'reviewed' && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextScenario}
                className="px-5 py-2.5 bg-[#F47321] text-white rounded-lg text-xs font-bold hover:bg-[#D95F12] transition-colors flex items-center gap-2 shadow-xs"
              >
                <span>{currentIdx + 1 < CLINICAL_SCENARIOS.length ? 'Next Clinical Case' : 'Complete Shift'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
