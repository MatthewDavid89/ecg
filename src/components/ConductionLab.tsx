import React, { useState } from 'react';
import { Activity, Zap, Compass, BookOpen, Layers, CheckCircle2, ChevronRight, HeartPulse } from 'lucide-react';
import { MiamiUIcon } from './MiamiUIcon';

export const ConductionLab: React.FC = () => {
  const [selectedStructure, setSelectedStructure] = useState<string>('sa-node');
  const [activeTab, setActiveTab] = useState<'anatomy' | 'characteristics' | 'paper-math'>('anatomy');

  const structures: Record<
    string,
    {
      name: string;
      rate: string;
      location: string;
      role: string;
      clinicalSignificance: string;
      metaphor: string;
    }
  > = {
    'sa-node': {
      name: 'Sinoatrial (SA) Node',
      rate: '60 - 100 beats/min',
      location: 'Superior wall of right atrium near opening of superior vena cava',
      role: 'The heart’s primary intrinsic pacemaker. Spontaneously generates action potentials at the fastest baseline rate.',
      clinicalSignificance: 'Supplied by the Right Coronary Artery (RCA) in ~60% of people and Left Circumflex in ~40%. Inferior wall MIs frequently cause sinus bradycardia and sinus arrest.',
      metaphor: 'The Head Conductor of the orchestra — everyone naturally follows his tempo.'
    },
    'internodal-tracts': {
      name: 'Internodal Tracts & Bachmann’s Bundle',
      rate: 'Conduction highway (no intrinsic pacing)',
      location: 'Anterior, middle (Wenckebach), posterior (Thorel) tracts across right atrium and Bachmann bundle to left atrium',
      role: 'Rapidly distributes electrical depolarization across both atria, ensuring coordinated atrial contraction.',
      clinicalSignificance: 'Atrial enlargement or fibrosis in these pathways causes P-wave widening (>0.12s), notching (P-mitrale), or triggers Atrial Fibrillation.',
      metaphor: 'The interstate highways connecting the conductor to all the choir singers.'
    },
    'av-node': {
      name: 'Atrioventricular (AV) Node / Junction',
      rate: '40 - 60 beats/min (40-59 bpm)',
      location: 'Floor of right atrium near tricuspid valve and coronary sinus',
      role: 'Introduces a crucial 0.10 second physiological delay to allow atria to contract fully and pump their "atrial kick" into the ventricles before ventricular systole.',
      clinicalSignificance: 'The heart’s heroic backup pacemaker if the SA node fails. Blocks like Wenckebach and First-Degree block occur here.',
      metaphor: 'The polite hallway door monitor who makes sure everyone pauses before stepping into the main assembly.'
    },
    'bundle-of-his': {
      name: 'Bundle of His (AV Bundle)',
      rate: '10 - 39 beats/min',
      location: 'Upper portion of interventricular septum below AV node',
      role: 'The ONLY normal electrical bridge connecting the atria and ventricles across the fibrous cardiac skeleton.',
      clinicalSignificance: 'If severed or blocked (e.g. anterior MI), ventricles are completely cut off from atria (Third-Degree AV Block).',
      metaphor: 'The single electrical suspension bridge crossing the deep river canyon.'
    },
    'bundle-branches': {
      name: 'Right & Left Bundle Branches',
      rate: '10 - 39 beats/min',
      location: 'Interventricular septum (Left divides into anterior and posterior fascicles)',
      role: 'High-speed specialized conduction tracts carrying impulses down both ventricular walls.',
      clinicalSignificance: 'Blockage in either bundle creates wide QRS complexes (>0.12s): Right Bundle Branch Block (RBBB) or Left Bundle Branch Block (LBBB).',
      metaphor: 'The express twin elevators descending simultaneously into the left and right engine rooms.'
    },
    'purkinje-fibers': {
      name: 'Purkinje Fibers',
      rate: '10 - 39 beats/min (20-40 bpm escape)',
      location: 'Subendocardial network throughout both ventricular walls',
      role: 'Finest microscopic terminal fibers transmitting impulse at 2-4 meters/sec, causing nearly simultaneous ventricular contraction from apex toward base.',
      clinicalSignificance: 'Last-ditch failsafe pacemaker. Paces Idioventricular Rhythm (20-40 bpm). Very susceptible to ischemia and hypokalemia (PVCs, VTach, VFib).',
      metaphor: 'The tiny electrical roots spreading into every blade of grass.'
    }
  };

  const curr = structures[selectedStructure];

  return (
    <div className="bg-[#FFFFFF] border border-[#E0EAE4] rounded-xl p-6 shadow-xs space-y-6">
      {/* Top Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E0EAE4] pb-4">
        <div>
          <h3 className="text-lg font-bold text-[#1F1E1D] flex items-center gap-2">
            <MiamiUIcon size={18} />
            <span>Cardiac Conduction Electrophysiology Lab</span>
          </h3>
          <p className="text-xs text-[#54524D] mt-0.5">
            Core foundations from Slides 2–5: intrinsic pacemaker hierarchies, four cardiac cell properties, and EKG paper mathematics.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center bg-[#F5F8F6] p-1 rounded-lg border border-[#E0EAE4]">
          <button
            onClick={() => setActiveTab('anatomy')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'anatomy'
                ? 'bg-[#005030] text-white shadow-xs'
                : 'text-[#54524D] hover:text-[#005030]'
            }`}
          >
            Conduction Pathway
          </button>
          <button
            onClick={() => setActiveTab('characteristics')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'characteristics'
                ? 'bg-[#005030] text-white shadow-xs'
                : 'text-[#54524D] hover:text-[#005030]'
            }`}
          >
            4 Heart Properties
          </button>
          <button
            onClick={() => setActiveTab('paper-math')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'paper-math'
                ? 'bg-[#005030] text-white shadow-xs'
                : 'text-[#54524D] hover:text-[#005030]'
            }`}
          >
            EKG Paper Grid Math
          </button>
        </div>
      </div>

      {/* TAB 1: CONDUCTION PATHWAY INTERACTIVE SYSTEM */}
      {activeTab === 'anatomy' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Interactive Conduction Map (5 Cols) */}
          <div className="lg:col-span-5 bg-[#F5F8F6] border border-[#E0EAE4] rounded-xl p-4 flex flex-col items-center">
            <span className="text-xs font-mono font-bold text-[#005030] uppercase tracking-wider mb-2">
              Interactive Conduction Hierarchy
            </span>

            {/* Schematic Flow Nodes */}
            <div className="w-full space-y-2">
              <button
                onClick={() => setSelectedStructure('sa-node')}
                className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-center justify-between ${
                  selectedStructure === 'sa-node'
                    ? 'border-[#005030] bg-[#005030]/10 text-[#005030] shadow-xs'
                    : 'border-[#E0EAE4] bg-[#FFFFFF] hover:border-[#005030]/40'
                }`}
              >
                <div>
                  <div className="font-bold text-xs text-[#1F1E1D]">1. SA Node (Natural Pacemaker)</div>
                  <div className="text-[11px] font-mono text-[#005030] font-semibold">Intrinsic Rate: 60 - 100 bpm</div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#F47321]" />
              </button>

              <div className="w-0.5 h-3 bg-[#005030]/30 mx-auto" />

              <button
                onClick={() => setSelectedStructure('internodal-tracts')}
                className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-center justify-between ${
                  selectedStructure === 'internodal-tracts'
                    ? 'border-[#005030] bg-[#005030]/10 text-[#005030] shadow-xs'
                    : 'border-[#E0EAE4] bg-[#FFFFFF] hover:border-[#005030]/40'
                }`}
              >
                <div>
                  <div className="font-bold text-xs text-[#1F1E1D]">2. Internodal Tracts & Bachmann</div>
                  <div className="text-[11px] text-[#54524D]">Atrial Depolarization (P Wave)</div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#F47321]" />
              </button>

              <div className="w-0.5 h-3 bg-[#005030]/30 mx-auto" />

              <button
                onClick={() => setSelectedStructure('av-node')}
                className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-center justify-between ${
                  selectedStructure === 'av-node'
                    ? 'border-[#005030] bg-[#005030]/10 text-[#005030] shadow-xs'
                    : 'border-[#E0EAE4] bg-[#FFFFFF] hover:border-[#005030]/40'
                }`}
              >
                <div>
                  <div className="font-bold text-xs text-[#1F1E1D]">3. AV Junction (Gatekeeper)</div>
                  <div className="text-[11px] font-mono text-[#F47321] font-semibold">Intrinsic Rate: 40 - 59 bpm</div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#F47321]" />
              </button>

              <div className="w-0.5 h-3 bg-[#005030]/30 mx-auto" />

              <button
                onClick={() => setSelectedStructure('bundle-of-his')}
                className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-center justify-between ${
                  selectedStructure === 'bundle-of-his'
                    ? 'border-[#005030] bg-[#005030]/10 text-[#005030] shadow-xs'
                    : 'border-[#E0EAE4] bg-[#FFFFFF] hover:border-[#005030]/40'
                }`}
              >
                <div>
                  <div className="font-bold text-xs text-[#1F1E1D]">4. Bundle of His</div>
                  <div className="text-[11px] font-mono text-[#54524D]">Rate: 10 - 39 bpm</div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#F47321]" />
              </button>

              <div className="w-0.5 h-3 bg-[#005030]/30 mx-auto" />

              <button
                onClick={() => setSelectedStructure('bundle-branches')}
                className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-center justify-between ${
                  selectedStructure === 'bundle-branches'
                    ? 'border-[#005030] bg-[#005030]/10 text-[#005030] shadow-xs'
                    : 'border-[#E0EAE4] bg-[#FFFFFF] hover:border-[#005030]/40'
                }`}
              >
                <div>
                  <div className="font-bold text-xs text-[#1F1E1D]">5. Right & Left Bundle Branches</div>
                  <div className="text-[11px] font-mono text-[#54524D]">Rate: 10 - 39 bpm</div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#F47321]" />
              </button>

              <div className="w-0.5 h-3 bg-[#005030]/30 mx-auto" />

              <button
                onClick={() => setSelectedStructure('purkinje-fibers')}
                className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-center justify-between ${
                  selectedStructure === 'purkinje-fibers'
                    ? 'border-[#005030] bg-[#005030]/10 text-[#005030] shadow-xs'
                    : 'border-[#E0EAE4] bg-[#FFFFFF] hover:border-[#005030]/40'
                }`}
              >
                <div>
                  <div className="font-bold text-xs text-[#1F1E1D]">6. Purkinje Fibers (Final Escape)</div>
                  <div className="text-[11px] font-mono text-rose-700 font-semibold">Rate: 10 - 39 bpm (Escape: 20-40)</div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#F47321]" />
              </button>
            </div>
          </div>

          {/* Selected Structure Educational Dossier (7 Cols) */}
          <div className="lg:col-span-7 bg-[#F5F8F6] border border-[#E0EAE4] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E0EAE4] pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#005030] uppercase tracking-wider block">
                  Electrophysiological Unit
                </span>
                <h4 className="text-base font-bold text-[#1F1E1D]">{curr.name}</h4>
              </div>

              <div className="text-right font-mono text-xs">
                <span className="text-[10px] text-[#7C7971] block font-sans">Intrinsic Rate</span>
                <span className="font-bold text-[#005030]">{curr.rate}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-[#1F1E1D] block mb-0.5">Anatomical Location:</span>
                <p className="text-[#54524D] leading-relaxed">{curr.location}</p>
              </div>

              <div>
                <span className="font-bold text-[#1F1E1D] block mb-0.5">Physiological Function:</span>
                <p className="text-[#54524D] leading-relaxed">{curr.role}</p>
              </div>

              <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#E0EAE4]">
                <span className="font-bold text-[#005030] block mb-0.5">Clinical BSN Significance:</span>
                <p className="text-[#54524D] leading-relaxed">{curr.clinicalSignificance}</p>
              </div>

              <div className="bg-[#F47321]/8 p-3 rounded-lg border border-[#F47321]/25">
                <span className="font-bold text-[#F47321] block mb-0.5">Educational Metaphor:</span>
                <p className="text-[#37352F] italic">{curr.metaphor}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FOUR CHARACTERISTICS OF THE HEART (Slide 2) */}
      {activeTab === 'characteristics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#F5F8F6] border border-[#E0EAE4] rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#005030]" />
              <h4 className="text-sm font-bold text-[#1F1E1D]">1. Automaticity</h4>
            </div>
            <p className="text-xs text-[#54524D] leading-relaxed">
              <strong>Definition:</strong> Ability of cardiac cells to spontaneously generate or initiate their own electrical impulses without external nerve stimulation.
            </p>
            <div className="pt-2 border-t border-[#E0EAE4] text-[11px] text-[#7C7971]">
              <strong>Clinical Context:</strong> SA node has highest automaticity. Ectopic pacemakers (PACs, PVCs) occur when abnormal cells develop enhanced automaticity.
            </div>
          </div>

          <div className="bg-[#F5F8F6] border border-[#E0EAE4] rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#2563EB]" />
              <h4 className="text-sm font-bold text-[#1F1E1D]">2. Excitability</h4>
            </div>
            <p className="text-xs text-[#54524D] leading-relaxed">
              <strong>Definition:</strong> Ability of cardiac cells to respond to an incoming electrical stimulus (from neighboring cells or an artificial pacemaker).
            </p>
            <div className="pt-2 border-t border-[#E0EAE4] text-[11px] text-[#7C7971]">
              <strong>Clinical Context:</strong> Ischemia, acidosis, and hypokalemia increase myocardial excitability, lowering the threshold for dangerous arrhythmias.
            </div>
          </div>

          <div className="bg-[#F5F8F6] border border-[#E0EAE4] rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#005030]" />
              <h4 className="text-sm font-bold text-[#1F1E1D]">3. Conductivity</h4>
            </div>
            <p className="text-xs text-[#54524D] leading-relaxed">
              <strong>Definition:</strong> Ability of cardiac cells to transmit an electrical impulse rapidly from cell to cell across intercalated discs and gap junctions.
            </p>
            <div className="pt-2 border-t border-[#E0EAE4] text-[11px] text-[#7C7971]">
              <strong>Clinical Context:</strong> Conduction slowing creates heart blocks (AV blocks, bundle branch blocks) or reentrant circuits (SVT, Flutter, VT).
            </div>
          </div>

          <div className="bg-[#F5F8F6] border border-[#E0EAE4] rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-[#F47321]" />
              <h4 className="text-sm font-bold text-[#1F1E1D]">4. Contractility</h4>
            </div>
            <p className="text-xs text-[#54524D] leading-relaxed">
              <strong>Definition:</strong> Ability of myocardial muscle fibers to shorten mechanically in response to electrical depolarization, producing physical cardiac pump action.
            </p>
            <div className="pt-2 border-t border-[#E0EAE4] text-[11px] text-[#7C7971]">
              <strong>Clinical Context:</strong> Calcium ions trigger actin-myosin contraction. In Pulseless Electrical Activity (PEA), electrical activity exists but contractility fails completely!
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: EKG PAPER GRID MATH (Slide 4) */}
      {activeTab === 'paper-math' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-[#F5F8F6] border border-[#E0EAE4] rounded-xl p-4 space-y-2">
              <span className="font-mono font-bold text-[#005030] block text-sm">
                1 Small Box (1 mm)
              </span>
              <ul className="space-y-1 text-[#54524D]">
                <li>• <strong>Horizontal Time:</strong> 0.04 seconds (40 ms)</li>
                <li>• <strong>Vertical Voltage:</strong> 0.1 mV (0.1 millivolt)</li>
                <li>• Standard paper speed: 25 mm per second</li>
              </ul>
            </div>

            <div className="bg-[#F5F8F6] border border-[#E0EAE4] rounded-xl p-4 space-y-2">
              <span className="font-mono font-bold text-[#F47321] block text-sm">
                1 Large Box (5 mm)
              </span>
              <ul className="space-y-1 text-[#54524D]">
                <li>• <strong>Horizontal Time:</strong> 0.20 seconds (200 ms)</li>
                <li>• <strong>Contains:</strong> 5 small boxes (5 x 0.04s)</li>
                <li>• <strong>Vertical Voltage:</strong> 0.5 mV (0.5 millivolt)</li>
              </ul>
            </div>

            <div className="bg-[#F5F8F6] border border-[#E0EAE4] rounded-xl p-4 space-y-2">
              <span className="font-mono font-bold text-[#005030] block text-sm">
                6-Second Strip (30 Boxes)
              </span>
              <ul className="space-y-1 text-[#54524D]">
                <li>• <strong>5 Large Boxes:</strong> 1.0 second</li>
                <li>• <strong>15 Large Boxes:</strong> 3.0 seconds (tick mark)</li>
                <li>• <strong>30 Large Boxes:</strong> 6.0 seconds (tick mark)</li>
                <li>• Multiply R-waves in 30 boxes by 10 to find HR!</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-[#005030]/5 border border-[#005030]/20 rounded-xl text-xs text-[#005030] leading-relaxed">
            <strong className="block mb-1 text-[#005030]">Nurse Quick Math Formulas to Memorize for the NCLEX:</strong>
            1) <strong>Rule of 1500 (Exact for regular rhythms):</strong> 1500 ÷ Number of small boxes between 2 R-waves = Heart Rate.<br />
            2) <strong>Rule of 300 (Fast estimate):</strong> 300 ÷ Number of large boxes between 2 R-waves (Sequence: 300, 150, 100, 75, 60, 50, 43, 37).<br />
            3) <strong>6-Second Rule (Mandatory for irregular rhythms like Afib):</strong> Count total R-waves in a 6-second window × 10.
          </div>
        </div>
      )}
    </div>
  );
};
