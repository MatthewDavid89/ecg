import React, { useState } from 'react';
import { RHYTHM_DATABASE } from '../data/rhythmDatabase';
import { generateWaveformForRhythm } from '../utils/waveformGenerator';
import { BookOpen, Sparkles, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { MiamiUIcon } from './MiamiUIcon';

interface HeartBlockPoemRoomProps {
  onSelectRhythm: (rhythmId: string) => void;
}

export const HeartBlockPoemRoom: React.FC<HeartBlockPoemRoomProps> = ({ onSelectRhythm }) => {
  const [selectedStanza, setSelectedStanza] = useState<number>(0);

  const poemStanzas = [
    {
      degree: 'First-degree AV Block',
      rhythmId: 'first-degree-av-block',
      line: 'If the R is far from P, then you have a FIRST DEGREE.',
      keySign: 'PR Interval > 0.20s (> 5 small boxes) & strictly constant. No dropped beats!',
      site: 'AV Node delay',
      danger: 'Benign (Usually asymptomatic)',
      atropine: 'Responds to Atropine if bradycardic',
      action: 'Monitor PR interval; review AV-nodal blocking medications.'
    },
    {
      degree: 'Second-degree AV Block, Type I (Wenckebach)',
      rhythmId: 'second-degree-av-block-type-1',
      line: 'Longer, longer, longer, drop! Then you have a WENKEBACH.',
      keySign: 'PR interval progressively lengthens with each beat until a QRS is dropped.',
      site: 'AV Node progressive fatigue (decremental conduction)',
      danger: 'Low to Moderate (Transient post-inferior MI)',
      atropine: 'YES! Highly responsive to Atropine because block is inside AV node',
      action: 'Observe closely; give Atropine 1mg IV if symptomatic bradycardia.'
    },
    {
      degree: 'Second-degree AV Block, Type II (Mobitz II)',
      rhythmId: 'second-degree-av-block-type-2',
      line: 'If some Ps don’t get through, then you have MOBITZ II.',
      keySign: 'Constant PR interval on conducted beats, with sudden, unannounced dropped QRS complexes!',
      site: 'Below AV Node (Infranodal: His-Purkinje system / Bundle Branches)',
      danger: 'HIGH EMERGENCY! Rapidly degenerates to Complete Heart Block or Asystole',
      atropine: 'NO! Atropine is ineffective or harmful! Pacing is required!',
      action: 'Apply transcutaneous pacing pads IMMEDIATELY; prep for temporary transvenous pacer wire.'
    },
    {
      degree: 'Third-degree AV Block (Complete Heart Block)',
      rhythmId: 'third-degree-av-block',
      line: 'If Ps and Qs don’t agree, then you have a THIRD DEGREE.',
      keySign: 'Complete AV Dissociation: P waves march regular, QRS march regular, but zero relationship between them!',
      site: 'Complete anatomic transection of conduction pathway at AV node or His bundle',
      danger: 'CRITICAL CODE THREAT! Profound hypotension, syncope, sudden death',
      atropine: 'Usually ineffective; pacing is definitive emergency life support',
      action: 'Initiate Transcutaneous Pacing (TCP); dopamine/epinephrine infusion; permanent pacemaker.'
    }
  ];

  const current = poemStanzas[selectedStanza];
  const currentRhythmData = RHYTHM_DATABASE.find((r) => r.id === current.rhythmId)!;
  // Standard 6-Second Strip (30 large boxes = 900px at 25 mm/s)
  const strip = generateWaveformForRhythm(currentRhythmData, 900, 150);

  return (
    <div className="bg-[#FFFFFF] border border-[#E0EAE4] rounded-xl p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E0EAE4] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <MiamiUIcon size={18} />
            <h3 className="text-lg font-bold text-[#1F1E1D]">The Heart Block Poem Room</h3>
          </div>
          <p className="text-xs text-[#54524D] mt-0.5">
            The world-famous Princeton Surgical Group & NursesLabs rhyme (Page 29 of the UM curriculum) — the #1 tool used by CCU preceptors to teach AV blocks.
          </p>
        </div>

        <button
          onClick={() => onSelectRhythm(current.rhythmId)}
          className="px-3.5 py-1.5 bg-[#005030] text-white rounded-lg text-xs font-semibold hover:bg-[#003822] transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <span>Open in Caliper Studio</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#FFB81C]" />
        </button>
      </div>

      {/* 4 Stanza Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {poemStanzas.map((stanza, idx) => {
          const isSelected = selectedStanza === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelectedStanza(idx)}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-[#005030] bg-[#005030]/8 ring-2 ring-[#005030]/20 shadow-xs'
                  : 'border-[#E0EAE4] bg-[#F5F8F6] hover:border-[#005030]/40'
              }`}
            >
              <div>
                <span className={`text-[10px] font-mono font-bold uppercase block mb-1 ${
                  isSelected ? 'text-[#005030]' : 'text-[#54524D]'
                }`}>
                  Verse {idx + 1}
                </span>
                <div className="font-serif text-sm font-bold text-[#1F1E1D] leading-snug mb-2">
                  "{stanza.line}"
                </div>
              </div>

              <div className="text-xs font-semibold text-[#54524D] mt-2 pt-2 border-t border-[#E0EAE4]">
                {stanza.degree}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stanza Interactive Showcase */}
      <div className="bg-[#F5F8F6] border border-[#E0EAE4] rounded-xl p-5 space-y-4">
        {/* Giant Stanza Quote */}
        <div className="text-center py-2.5 px-4 bg-[#FFFFFF] border border-[#E0EAE4] rounded-lg shadow-xs">
          <span className="font-serif text-lg md:text-xl font-bold text-[#005030] tracking-wide">
            "{current.line}"
          </span>
        </div>

        {/* Live Mini Strip of This Block — Standard 6-Second Strip with 1mV Cal Pulse */}
        <div className="border border-[#E0EAE4] rounded-xl overflow-hidden shadow-xs">
          <div className="ecg-grid-pink relative overflow-x-auto h-40 select-none">
            <div style={{ width: '900px', height: '150px' }} className="relative">
              {/* Top 0s, 3s, and 6s Calibration Marks */}
              <div className="absolute top-0 left-0 right-0 h-4 pointer-events-none z-10 flex">
                <div className="absolute top-0 left-0 flex flex-col items-center">
                  <div className="w-0.5 h-3 bg-red-700/80" />
                  <span className="text-[9px] font-mono text-red-700/90 font-bold pl-0.5">0s (1mV Cal)</span>
                </div>
                <div
                  style={{ left: `${strip.threeSecondMarkX}px` }}
                  className="absolute top-0 flex flex-col items-center -translate-x-1/2"
                >
                  <div className="w-0.5 h-3 bg-red-700/80" />
                  <span className="text-[9px] font-mono text-red-700/90 font-bold">3s (15 boxes)</span>
                </div>
                <div
                  style={{ left: `${strip.sixSecondMarkX - 2}px` }}
                  className="absolute top-0 flex flex-col items-end"
                >
                  <div className="w-0.5 h-3 bg-red-700/80" />
                  <span className="text-[9px] font-mono text-red-700/90 font-bold pr-0.5">6s (30 boxes)</span>
                </div>
              </div>

              <svg className="w-full h-full absolute inset-0 overflow-visible" viewBox="0 0 900 150">
                <path
                  d={strip.svgPath}
                  fill="none"
                  stroke="#1E293B"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="bg-[#FFFFFF] px-3.5 py-1.5 border-t border-[#E0EAE4] flex items-center justify-between text-xs text-[#54524D]">
            <span className="font-semibold text-[#1F1E1D]">{current.degree} — Standard 6-Second Strip (30 Large Boxes)</span>
            <span className="font-mono text-[11px] text-[#005030] font-bold">
              {strip.landmarks.length} R-waves in 6s × 10 = {strip.landmarks.length * 10} bpm
            </span>
          </div>
        </div>

        {/* 4-Box Clinical Comparison Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#E0EAE4]">
            <span className="text-[10px] font-mono text-[#005030] font-bold uppercase tracking-wider block mb-1">
              Hallmark ECG Finding
            </span>
            <span className="font-medium text-[#1F1E1D] leading-snug block">
              {current.keySign}
            </span>
          </div>

          <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#E0EAE4]">
            <span className="text-[10px] font-mono text-[#54524D] uppercase tracking-wider block mb-1">
              Anatomic Site of Block
            </span>
            <span className="font-medium text-[#1F1E1D] leading-snug block">
              {current.site}
            </span>
          </div>

          <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#E0EAE4]">
            <span className="text-[10px] font-mono text-[#F47321] font-bold uppercase tracking-wider block mb-1">
              Atropine Responsiveness
            </span>
            <span className="font-medium text-[#F47321] leading-snug block">
              {current.atropine}
            </span>
          </div>

          <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#E0EAE4]">
            <span className="text-[10px] font-mono text-[#005030] font-bold uppercase tracking-wider block mb-1">
              Priority Nursing Action
            </span>
            <span className="font-medium text-[#1F1E1D] leading-snug block">
              {current.action}
            </span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix */}
      <div className="overflow-x-auto border border-[#E0EAE4] rounded-lg">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#F5F8F6] border-b border-[#E0EAE4] text-[#005030] font-mono uppercase text-[10px]">
            <tr>
              <th className="py-2.5 px-3">Heart Block</th>
              <th className="py-2.5 px-3">PR Interval</th>
              <th className="py-2.5 px-3">Dropped QRS?</th>
              <th className="py-2.5 px-3">Location</th>
              <th className="py-2.5 px-3">Emergency Pacing?</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E0EAE4]">
            <tr className="hover:bg-[#F5F8F6]/80">
              <td className="py-2.5 px-3 font-semibold text-[#1F1E1D]">1st Degree</td>
              <td className="py-2.5 px-3 font-mono text-[#005030] font-medium">&gt; 0.20s CONSTANT</td>
              <td className="py-2.5 px-3 text-[#7C7971]">Never (1:1 conduction)</td>
              <td className="py-2.5 px-3">AV Node</td>
              <td className="py-2.5 px-3 text-[#7C7971]">No</td>
            </tr>
            <tr className="hover:bg-[#F5F8F6]/80">
              <td className="py-2.5 px-3 font-semibold text-[#1F1E1D]">2nd Degree Type I (Wenckebach)</td>
              <td className="py-2.5 px-3 font-mono text-[#F47321]">Progressively lengthens</td>
              <td className="py-2.5 px-3 text-[#F47321] font-medium">Yes, cyclical drop</td>
              <td className="py-2.5 px-3">AV Node</td>
              <td className="py-2.5 px-3 text-[#7C7971]">Rarely (try Atropine first)</td>
            </tr>
            <tr className="hover:bg-[#F5F8F6]/80">
              <td className="py-2.5 px-3 font-semibold text-[#1F1E1D]">2nd Degree Type II (Mobitz II)</td>
              <td className="py-2.5 px-3 font-mono text-rose-700 font-bold">Constant on conducted beats</td>
              <td className="py-2.5 px-3 text-rose-700 font-bold">Yes, unannounced drop!</td>
              <td className="py-2.5 px-3">Bundle of His / Branches</td>
              <td className="py-2.5 px-3 font-bold text-rose-700">YES! (Pads on chest)</td>
            </tr>
            <tr className="hover:bg-[#F5F8F6]/80">
              <td className="py-2.5 px-3 font-semibold text-[#1F1E1D]">3rd Degree (Complete)</td>
              <td className="py-2.5 px-3 font-mono text-rose-800 font-bold">Completely dissociated / variable</td>
              <td className="py-2.5 px-3 text-rose-800 font-bold">Independent ventricular escape</td>
              <td className="py-2.5 px-3">Complete block</td>
              <td className="py-2.5 px-3 font-bold text-rose-800">YES! Emergency Pacing</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
