import React, { useState } from 'react';
import { RhythmData } from '../types/ekg';
import { CheckCircle2, AlertTriangle, Calculator, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';

interface FiveStepAnalyzerProps {
  rhythm: RhythmData;
}

export const FiveStepAnalyzer: React.FC<FiveStepAnalyzerProps> = ({ rhythm }) => {
  const [calculatorInput, setCalculatorInput] = useState<string>('20');
  const [activeStepTab, setActiveStepTab] = useState<number>(0);

  // Calculate 1500 and 300 rule values
  const smallBoxes = parseFloat(calculatorInput) || 20;
  const largeBoxes = smallBoxes / 5;
  const rate1500 = smallBoxes > 0 ? Math.round(1500 / smallBoxes) : 0;
  const rate300 = largeBoxes > 0 ? Math.round(300 / largeBoxes) : 0;
  const seconds = (smallBoxes * 0.04).toFixed(2);

  const steps = [
    {
      num: 1,
      title: 'Heart Rate',
      question: 'What is the heart rate?',
      normal: '60 - 100 beats/min',
      currentValue: rhythm.heartRate,
      isNormal: rhythm.rateBpm >= 60 && rhythm.rateBpm <= 100 && rhythm.id === 'nsr',
      methodTip: 'Method 1: Count R-waves in a 6-second strip (30 large boxes) x 10. Method 2: Divide 1500 by small boxes between two R waves.'
    },
    {
      num: 2,
      title: 'Rhythm Regularity',
      question: 'Are all R-to-R intervals equal (regular)?',
      normal: 'Regular (all R-to-R distances match within 1-2 small boxes)',
      currentValue: rhythm.regularity,
      isNormal: rhythm.regularity === 'Regular',
      methodTip: 'Place calipers on two consecutive R-wave peaks, then march them across the entire strip without changing the width.'
    },
    {
      num: 3,
      title: 'P Waves',
      question: 'Present, upright, uniform, 1 before every QRS?',
      normal: 'Present, smooth, upright in Lead II, 1:1 before every QRS',
      currentValue: rhythm.pWave,
      isNormal: rhythm.pWave.includes('Present, upright, uniform') && !rhythm.pWave.includes('more P waves'),
      methodTip: 'Look for sawtooth waves (Flutter), squiggly fibrillatory line (Afib), abnormal ectopic P waves, or independent marching (3rd Degree Block).'
    },
    {
      num: 4,
      title: 'PR Interval (PRI)',
      question: 'Measure each PRI: 0.12 to 0.20 second (3 to 5 small boxes)?',
      normal: '0.12 - 0.20 seconds (3 - 5 small boxes) & constant',
      currentValue: rhythm.prInterval,
      isNormal: rhythm.prInterval.includes('0.12 - 0.20') && !rhythm.prInterval.includes('PROLONGED') && !rhythm.prInterval.includes('LENGTHENS'),
      methodTip: 'Measure from the START of the P wave to the START of the QRS complex. More than 5 small boxes (>0.20s) = AV Block!'
    },
    {
      num: 5,
      title: 'QRS Complex',
      question: 'Measure each QRS: 0.04 to 0.12 second (1 to 3 small boxes)?',
      normal: '0.04 - 0.12 seconds (1 - 3 small boxes, narrow)',
      currentValue: rhythm.qrsDuration,
      isNormal: !rhythm.qrsDuration.toLowerCase().includes('wide') && !rhythm.qrsDuration.toLowerCase().includes('bizarre') && !rhythm.qrsDuration.toLowerCase().includes('chaotic'),
      methodTip: 'Measure from start of Q wave (or R wave if no Q) to end of S wave. Wider than 3 small boxes (>0.12s) = Ventricular origin or Bundle Branch Block!'
    }
  ];

  return (
    <div className="bg-[#FFFFFF] border border-[#E0EAE4] rounded-xl p-5 shadow-xs flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E0EAE4] pb-3">
        <div>
          <h3 className="text-base font-bold text-[#1F1E1D] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#005030]" />
            <span>The 5-Step Cardiac Rhythm Analysis</span>
          </h3>
          <p className="text-xs text-[#54524D] mt-0.5">
            The gold-standard systematic interpretation method taught in University of Miami School of Nursing & Health Studies CCU training.
          </p>
        </div>

        {/* Rapid Reference Tag */}
        <div className="text-xs text-[#005030] bg-[#005030]/10 border border-[#005030]/30 px-2.5 py-1 rounded-md font-mono font-medium flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F47321]" />
          <span>Curriculum Slide: #{rhythm.slideNumber ?? 'Clinical'}</span>
        </div>
      </div>

      {/* 5 Steps Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
        {steps.map((st, idx) => {
          const isSelected = activeStepTab === idx;
          return (
            <button
              key={st.num}
              onClick={() => setActiveStepTab(idx)}
              className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-[#005030] bg-[#005030]/8 ring-2 ring-[#005030]/20'
                  : 'border-[#E0EAE4] bg-[#F5F8F6] hover:border-[#005030]/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`font-mono font-bold ${isSelected ? 'text-[#005030]' : 'text-[#54524D]'}`}>
                    Step 0{st.num}
                  </span>
                  {st.isNormal ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#005030]" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-[#F47321]" />
                  )}
                </div>
                <div className="font-semibold text-xs text-[#1F1E1D] truncate">{st.title}</div>
              </div>

              <div className="mt-2 text-[11px] font-mono text-[#54524D] line-clamp-2">
                {st.currentValue}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Step Detailed Deep-Dive Card */}
      <div className="bg-[#F5F8F6] border border-[#E0EAE4] rounded-lg p-4 flex flex-col md:flex-row gap-4 items-start justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-white bg-[#005030] px-2 py-0.5 rounded">
              Step {steps[activeStepTab].num}
            </span>
            <span className="font-bold text-sm text-[#1F1E1D]">
              {steps[activeStepTab].title}: {steps[activeStepTab].question}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="bg-[#FFFFFF] p-2.5 rounded border border-[#E0EAE4]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#005030] block mb-0.5">
                Normal Benchmark (NSR)
              </span>
              <span className="font-mono text-[#005030] font-semibold">
                {steps[activeStepTab].normal}
              </span>
            </div>

            <div className="bg-[#FFFFFF] p-2.5 rounded border border-[#E0EAE4]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#54524D] block mb-0.5">
                Current Rhythm Finding ({rhythm.name})
              </span>
              <span className={`font-mono font-semibold ${steps[activeStepTab].isNormal ? 'text-[#005030]' : 'text-[#F47321]'}`}>
                {steps[activeStepTab].currentValue}
              </span>
            </div>
          </div>

          <div className="text-xs text-[#54524D] bg-[#FFFFFF] p-2.5 rounded border border-[#E0EAE4] flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#F47321] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#005030]">UM Preceptor Clinical Tip: </strong>
              <span>{steps[activeStepTab].methodTip}</span>
            </div>
          </div>
        </div>

        {/* Small Interactive Box / Heart Rate Calculator Widget */}
        <div className="w-full md:w-64 bg-[#FFFFFF] p-3 rounded-lg border border-[#E0EAE4] flex flex-col gap-2 shrink-0">
          <div className="flex items-center justify-between text-xs font-semibold text-[#1F1E1D]">
            <span className="flex items-center gap-1.5 text-[#005030]">
              <Calculator className="w-3.5 h-3.5 text-[#F47321]" />
              <span>Telemetry Box Calculator</span>
            </span>
          </div>

          <div>
            <label className="text-[11px] text-[#54524D] block mb-1">
              Small boxes between R-waves:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="3"
                max="80"
                value={calculatorInput}
                onChange={(e) => setCalculatorInput(e.target.value)}
                className="w-20 px-2 py-1 text-xs font-mono bg-[#F5F8F6] border border-[#D0E0D6] rounded focus:outline-none focus:border-[#005030]"
              />
              <span className="text-xs text-[#54524D] font-mono">= {seconds} sec</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-[#E0EAE4] text-[11px] font-mono text-center">
            <div className="bg-[#F5F8F6] p-1.5 rounded border border-[#E0EAE4]">
              <span className="text-[9px] text-[#54524D] block font-sans">1500 Rule</span>
              <span className="font-bold text-[#005030] text-xs">{rate1500} bpm</span>
            </div>
            <div className="bg-[#F5F8F6] p-1.5 rounded border border-[#E0EAE4]">
              <span className="text-[9px] text-[#54524D] block font-sans">300 Rule</span>
              <span className="font-bold text-[#F47321] text-xs">{rate300} bpm</span>
            </div>
          </div>
          <span className="text-[10px] text-[#7C7971] italic text-center">
            Formula: 1500 / # small boxes = HR bpm
          </span>
        </div>
      </div>
    </div>
  );
};
