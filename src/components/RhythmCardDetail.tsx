import React, { useState } from 'react';
import { RhythmData } from '../types/ekg';
import { Stethoscope, Baby, Flame, Lightbulb, ShieldAlert, Pill, HeartPulse, Sparkles } from 'lucide-react';
import { MiamiUIcon } from './MiamiUIcon';

interface RhythmCardDetailProps {
  rhythm: RhythmData;
}

export const RhythmCardDetail: React.FC<RhythmCardDetailProps> = ({ rhythm }) => {
  const [activeTab, setActiveTab] = useState<'bsn' | 'eli5' | 'metaphor' | 'mnemonics'>('bsn');

  return (
    <div className="bg-[#FFFFFF] border border-[#E0EAE4] rounded-xl overflow-hidden shadow-xs">
      {/* Top Pedagogical Navigation Tabs */}
      <div className="flex border-b border-[#E0EAE4] bg-[#F5F8F6] px-4 pt-3 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('bsn')}
          className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
            activeTab === 'bsn'
              ? 'border-[#005030] text-[#005030]'
              : 'border-transparent text-[#54524D] hover:text-[#1F1E1D]'
          }`}
        >
          <Stethoscope className="w-3.5 h-3.5" />
          <span>BSN Nurse Clinical Masterclass</span>
        </button>

        <button
          onClick={() => setActiveTab('eli5')}
          className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
            activeTab === 'eli5'
              ? 'border-[#F47321] text-[#F47321]'
              : 'border-transparent text-[#54524D] hover:text-[#1F1E1D]'
          }`}
        >
          <Baby className="w-3.5 h-3.5 text-[#F47321]" />
          <span>Explain Like I’m 5 (Child Metaphor)</span>
        </button>

        <button
          onClick={() => setActiveTab('metaphor')}
          className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
            activeTab === 'metaphor'
              ? 'border-[#005030] text-[#005030]'
              : 'border-transparent text-[#54524D] hover:text-[#1F1E1D]'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-[#F47321]" />
          <span>Clinical Metaphors & Visual Anchors</span>
        </button>

        <button
          onClick={() => setActiveTab('mnemonics')}
          className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
            activeTab === 'mnemonics'
              ? 'border-[#F47321] text-[#F47321]'
              : 'border-transparent text-[#54524D] hover:text-[#1F1E1D]'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5 text-[#FFB81C]" />
          <span>Nurse Mnemonics & Pearls</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="p-6">
        {/* TAB 1: BSN MEDICAL ANALYSIS */}
        {activeTab === 'bsn' && (
          <div className="space-y-6">
            {/* Rhythm Definition & Electrophysiology */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#1F1E1D] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#005030]" />
                <span>Clinical Definition & Electrophysiological Mechanism</span>
              </h4>
              <p className="text-sm text-[#37352F] leading-relaxed">
                {rhythm.medicalBSN.definition}
              </p>
              <div className="bg-[#F5F8F6] border border-[#E0EAE4] rounded-lg p-3 text-xs text-[#54524D] leading-relaxed">
                <strong className="text-[#005030]">Conduction Vector: </strong>
                <span>{rhythm.medicalBSN.electrophysiology}</span>
              </div>
            </div>

            {/* Two-Column Grid: Causes & Hemodynamic Impact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Clinical Causes */}
              <div className="bg-[#F5F8F6] border border-[#E0EAE4] rounded-lg p-4 space-y-2.5">
                <div className="text-xs font-bold text-[#005030] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#F47321]" />
                  <span>Clinical Causes & Triggers</span>
                </div>
                <ul className="space-y-1.5 text-xs text-[#54524D]">
                  {rhythm.medicalBSN.clinicalCauses.map((cause, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#F47321] font-bold">·</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hemodynamic Impact */}
              <div className="bg-[#F5F8F6] border border-[#E0EAE4] rounded-lg p-4 space-y-2.5">
                <div className="text-xs font-bold text-[#005030] uppercase tracking-wider flex items-center gap-1.5">
                  <HeartPulse className="w-3.5 h-3.5 text-[#F47321]" />
                  <span>Hemodynamic Impact & Perfusion Threat</span>
                </div>
                <p className="text-xs text-[#54524D] leading-relaxed">
                  {rhythm.medicalBSN.hemodynamicImpact}
                </p>
                <div className="pt-2 border-t border-[#E0EAE4] text-[11px] font-mono text-[#005030] font-semibold">
                  Stroke Volume x Heart Rate = Cardiac Output
                </div>
              </div>
            </div>

            {/* Two-Column Grid: Nursing Priorities & ACLS Interventions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Nursing Priorities */}
              <div className="bg-[#F5F8F6] border border-[#E0EAE4] rounded-lg p-4 space-y-2.5">
                <div className="text-xs font-bold text-[#005030] uppercase tracking-wider flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-[#005030]" />
                  <span>Bedside Nursing Priorities</span>
                </div>
                <ul className="space-y-2 text-xs text-[#54524D]">
                  {rhythm.medicalBSN.nursingPriorities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-xs font-mono font-bold text-[#005030] shrink-0">
                        {idx + 1}.
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ACLS Interventions & Meds */}
              <div className="bg-[#F5F8F6] border border-[#E0EAE4] rounded-lg p-4 space-y-2.5">
                <div className="text-xs font-bold text-[#005030] uppercase tracking-wider flex items-center gap-1.5">
                  <Pill className="w-3.5 h-3.5 text-[#F47321]" />
                  <span>ACLS Protocols & Pharmacotherapy</span>
                </div>
                <ul className="space-y-2 text-xs text-[#54524D]">
                  {rhythm.medicalBSN.aclsInterventions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#F47321] font-bold shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EXPLAIN LIKE I'M 5 */}
        {activeTab === 'eli5' && (
          <div className="space-y-4">
            <div className="bg-[#F47321]/5 border border-[#F47321]/25 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#F47321]/15 text-[#F47321] border border-[#F47321]/30">
                  Child-Friendly Analogy
                </span>
                <h4 className="text-base font-bold text-[#1F1E1D]">
                  {rhythm.childMetaphor.title}
                </h4>
              </div>

              <p className="text-sm text-[#1F1E1D] leading-relaxed font-sans">
                {rhythm.childMetaphor.story}
              </p>

              <div className="pt-3 border-t border-[#F47321]/20 flex items-center gap-2 text-xs font-semibold text-[#F47321]">
                <Sparkles className="w-4 h-4 shrink-0 text-[#FFB81C]" />
                <span>The Golden Takeaway: {rhythm.childMetaphor.takeaway}</span>
              </div>
            </div>

            <div className="p-4 bg-[#F5F8F6] border border-[#E0EAE4] rounded-lg text-xs text-[#54524D] leading-relaxed">
              <strong className="text-[#005030]">Why teach this way? </strong>
              Cognitive research in nursing education shows that when a BSN student anchors high-stress telemetry patterns to intuitive childhood concepts, recall speed during an emergent code blue increases by over 400%.
            </div>
          </div>
        )}

        {/* TAB 3: CLINICAL METAPHORS & VISUAL ANCHORS */}
        {activeTab === 'metaphor' && (
          <div className="space-y-5">
            <div className="bg-[#F5F8F6] border border-[#E0EAE4] rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#005030]/10 text-[#005030] border border-[#005030]/25">
                  Clinical Simile
                </span>
                <h4 className="text-base font-bold text-[#1F1E1D]">
                  {rhythm.clinicalMetaphor.title}
                </h4>
              </div>

              <div className="text-sm text-[#37352F] italic border-l-2 border-[#005030] pl-3 py-1">
                "{rhythm.clinicalMetaphor.simile}"
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-[#005030] uppercase tracking-wider">
                  Visual Recognition Anchor:
                </div>
                <p className="text-xs text-[#54524D] leading-relaxed">
                  {rhythm.clinicalMetaphor.visualAnchor}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: NURSE MNEMONICS & PEARLS */}
        {activeTab === 'mnemonics' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rhythm.mnemonics.map((mnem, idx) => (
                <div
                  key={idx}
                  className="bg-[#F5F8F6] border border-[#E0EAE4] rounded-lg p-4 flex items-start gap-3 hover:border-[#005030]/30 transition-colors"
                >
                  <Lightbulb className="w-5 h-5 text-[#FFB81C] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#005030] font-bold block">
                      NCLEX & ICU Mnemonic #{idx + 1}
                    </span>
                    <p className="text-xs font-medium text-[#1F1E1D] leading-relaxed">
                      {mnem}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Critical Clinical Pearl */}
            <div className="bg-[#F47321]/5 border border-[#F47321]/30 rounded-xl p-4 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#F47321] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-xs font-bold text-[#F47321] uppercase tracking-wider flex items-center gap-1.5">
                  <MiamiUIcon size={14} />
                  <span>University of Miami Cardiovascular Nurse Preceptor Pearl</span>
                </div>
                <p className="text-xs text-[#37352F] leading-relaxed">
                  {rhythm.clinicalPearl}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
