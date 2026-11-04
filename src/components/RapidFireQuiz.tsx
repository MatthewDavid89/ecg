import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { RHYTHM_DATABASE } from '../data/rhythmDatabase';
import { QUIZ_BANK } from '../data/quizBank';
import { RhythmData } from '../types/ekg';
import { generateWaveformForRhythm } from '../utils/waveformGenerator';
import { CaliperTool } from './CaliperTool';
import {
  getMasteredRhythms,
  recordQuizAttempt,
  RhythmMasteryRecord
} from '../utils/progressStorage';
import {
  Flame,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Compass,
  Sparkles,
  HelpCircle,
  Trophy,
  ChevronDown,
  ChevronUp,
  Target,
  BarChart3,
  ZoomIn,
  ZoomOut,
  HeartPulse
} from 'lucide-react';

interface QuizQuestion {
  variantId: string;
  rhythmId: string;
  rhythm: RhythmData;
  clinicalContext?: string;
  options: string[];
  variantSeed: number;
}

interface RapidFireQuizProps {
  onStudyRhythm?: (rhythmId: string) => void;
  onOpenDashboard?: () => void;
  overrideRhythmIds?: string[] | null;
  onClearOverride?: () => void;
}

export const RapidFireQuiz: React.FC<RapidFireQuizProps> = ({
  onStudyRhythm,
  onOpenDashboard,
  overrideRhythmIds,
  onClearOverride
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [answeredCount, setAnsweredCount] = useState<number>(0);
  const [showFiveStepHint, setShowFiveStepHint] = useState<boolean>(false);
  const [calipersActive, setCalipersActive] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [progressMap, setProgressMap] = useState<Record<string, RhythmMasteryRecord>>(() =>
    getMasteredRhythms()
  );
  const [quizHistory, setQuizHistory] = useState<{
    rhythmName: string;
    userAnswer: string;
    isCorrect: boolean;
    explanation: string;
  }[]>([]);

  const zoomIn = () => setZoomLevel((prev) => Math.min(2.0, Number((prev + 0.25).toFixed(2))));
  const zoomOut = () => setZoomLevel((prev) => Math.max(0.75, Number((prev - 0.25).toFixed(2))));
  const resetZoom = () => setZoomLevel(1.0);

  // Generator: Creates 5 randomized strips from QUIZ_BANK (45+ realistic clinical variants across all types)
  const generateNewQuiz = useCallback(() => {
    let sourcePool = [...QUIZ_BANK];
    if (overrideRhythmIds && overrideRhythmIds.length > 0) {
      const filtered = sourcePool.filter((v) => overrideRhythmIds.includes(v.rhythmId));
      if (filtered.length > 0) {
        sourcePool = filtered;
      }
    }

    const shuffled = [...sourcePool].sort(() => Math.random() - 0.5);
    const chosenFive = shuffled.slice(0, Math.min(5, shuffled.length));

    const generated: QuizQuestion[] = chosenFive.map((variant) => {
      // Build options with 3 distractors
      let distractors = [...variant.distractorOptions];
      if (distractors.length < 3) {
        const fallbackDistractors = RHYTHM_DATABASE
          .filter((r) => r.id !== variant.rhythmId && !distractors.includes(r.name))
          .sort(() => Math.random() - 0.5)
          .slice(0, 3 - distractors.length)
          .map((r) => r.name);
        distractors = [...distractors, ...fallbackDistractors];
      }
      const options = [variant.rhythmName, ...distractors.slice(0, 3)].sort(() => Math.random() - 0.5);

      // Random variant seed (0 to 4) ensuring strips are dynamically unique every quiz!
      const seed = variant.seed !== undefined ? variant.seed : Math.floor(Math.random() * 5);

      return {
        variantId: variant.id,
        rhythmId: variant.rhythmId,
        rhythm: variant.rhythmData,
        clinicalContext: variant.clinicalContext,
        options,
        variantSeed: seed
      };
    });

    setQuestions(generated);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnsweredCount(0);
    setShowFiveStepHint(false);
    setQuizFinished(false);
    setQuizHistory([]);
  }, [overrideRhythmIds]);

  // Initialize on mount or when override changes
  useEffect(() => {
    generateNewQuiz();
  }, [generateNewQuiz]);

  const currentQ = questions[currentIdx];

  // Generate waveform for the active quiz strip with randomized variant seed
  const strip = useMemo(() => {
    if (!currentQ) return null;
    return generateWaveformForRhythm(currentQ.rhythm, 900, 180, currentQ.variantSeed);
  }, [currentQ]);

  // Overall mastery calculation
  const totalRhythms = RHYTHM_DATABASE.length;
  const masteredCount = Object.keys(progressMap).filter(
    (id) => (progressMap[id]?.timesCorrect || 0) > 0
  ).length;
  const masteryPercentage = Math.round((masteredCount / totalRhythms) * 100);

  const handleSelectOption = (choice: string) => {
    if (selectedAnswer !== null || !currentQ) return;

    setSelectedAnswer(choice);
    const isCorrect = choice === currentQ.rhythm.name;
    if (isCorrect) {
      setScore((s) => s + 1);
    }
    setAnsweredCount((c) => c + 1);

    // Save progress to localStorage in real time using the canonical rhythm ID!
    const updatedMap = recordQuizAttempt(currentQ.rhythmId, isCorrect);
    setProgressMap(updatedMap);

    setQuizHistory((prev) => [
      ...prev,
      {
        rhythmName: currentQ.rhythm.name,
        userAnswer: choice,
        isCorrect,
        explanation: `${currentQ.rhythm.medicalBSN.definition} (${currentQ.rhythm.clinicalPearl})`
      }
    ]);
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((c) => c + 1);
      setSelectedAnswer(null);
      setShowFiveStepHint(false);
    } else {
      setQuizFinished(true);
    }
  };

  if (!currentQ || !strip) {
    return (
      <div className="bg-[#FFFFFF] border border-[#E5E5DF] rounded-xl p-8 text-center text-xs text-[#7C7971]">
        Generating random EKG strips...
      </div>
    );
  }

  // Quiz Results Summary Screen
  if (quizFinished) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="bg-[#FFFFFF] border border-[#E0EAE4] rounded-xl p-6 sm:p-8 space-y-6 shadow-xs max-w-2xl mx-auto">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-[#FEF2EB] text-[#F47321] rounded-full flex items-center justify-center mx-auto shadow-xs border border-[#F47321]/30">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-[#005030] font-bold">
              <span>University of Miami Telemetry Academy</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#005030]">
              Canes Rapid Fire Quiz Complete!
            </h3>
            <p className="text-xs text-[#4B6358]">
              {questions.length} randomized clinical EKG strips analyzed using the 5-step method.
            </p>
          </div>

          {/* Score & Mastery Badges */}
          <div className="flex items-center justify-center gap-3 py-2 font-mono flex-wrap">
            <div className="bg-[#F5F8F6] border border-[#E0EAE4] px-4 py-2 rounded-lg text-center">
              <span className="text-[10px] text-[#61796F] block font-sans uppercase">Quiz Score</span>
              <span className="text-xl font-bold text-[#F47321]">{score} / {questions.length}</span>
            </div>
            <div className="bg-[#F5F8F6] border border-[#E0EAE4] px-4 py-2 rounded-lg text-center">
              <span className="text-[10px] text-[#61796F] block font-sans uppercase">Accuracy</span>
              <span className="text-xl font-bold text-[#005030]">{percentage}%</span>
            </div>
            <div className="bg-[#F5F8F6] border border-[#E0EAE4] px-4 py-2 rounded-lg text-center">
              <span className="text-[10px] text-[#61796F] block font-sans uppercase">Compendium Mastery</span>
              <span className="text-xl font-bold text-[#005030]">{masteredCount}/{totalRhythms} ({masteryPercentage}%)</span>
            </div>
          </div>
        </div>

        {/* 5 Questions Review List */}
        <div className="space-y-2.5 pt-2 border-t border-[#E0EAE4]">
          <span className="text-[11px] font-mono font-bold uppercase text-[#005030] block">
            Clinical Vignette Review:
          </span>

          <div className="space-y-2">
            {quizHistory.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border text-xs space-y-1 ${
                  item.isCorrect
                    ? 'bg-[#EBF3EE] border-[#005030]/30 text-[#005030]'
                    : 'bg-rose-50/60 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <div className="flex items-center gap-2">
                    {item.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-[#005030] shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span>Strip #{idx + 1}: {item.rhythmName}</span>
                  </div>
                  <span className="text-[11px] font-mono">
                    {item.isCorrect ? 'Mastered' : `Answered: ${item.userAnswer}`}
                  </span>
                </div>
                <p className="text-[11px] text-[#4B6358] pl-6 leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              if (onClearOverride) onClearOverride();
              generateNewQuiz();
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#F47321] text-white rounded-lg text-xs font-bold hover:bg-[#D95F12] transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Generate 5 New Canes Strips</span>
          </button>

          {onOpenDashboard && (
            <button
              onClick={onOpenDashboard}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#EBF3EE] border border-[#005030]/20 text-[#005030] hover:bg-[#E0EAE4] rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <BarChart3 className="w-4 h-4 text-[#005030]" />
              <span>Open Mastery Dashboard</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === currentQ.rhythm.name;

  return (
    <div className="space-y-4">
      {/* Live Compendium Progress Header Strip */}
      <div className="bg-[#FFFFFF] border border-[#E0EAE4] rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#4B6358] flex items-center gap-1.5 font-semibold">
              <Trophy className="w-3.5 h-3.5 text-[#F47321]" />
              <span>Full Compendium Progress: <strong className="text-[#005030]">{masteredCount} of {totalRhythms}</strong> rhythms mastered</span>
            </span>
            <span className="font-bold text-[#F47321]">{masteryPercentage}%</span>
          </div>

          <div className="w-full h-2 bg-[#EBF3EE] rounded-full overflow-hidden border border-[#005030]/10">
            <div
              className="h-full bg-[#005030] rounded-full transition-all duration-300"
              style={{ width: `${masteryPercentage}%` }}
            />
          </div>
        </div>

        {onOpenDashboard && (
          <button
            onClick={onOpenDashboard}
            className="px-3 py-1.5 bg-[#F5F8F6] border border-[#E0EAE4] hover:border-[#005030]/40 rounded-lg text-xs font-bold text-[#005030] hover:bg-[#EBF3EE] transition-colors flex items-center gap-1.5 shrink-0"
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#005030]" />
            <span>Mastery Dashboard</span>
          </button>
        )}
      </div>

      {/* Main Quiz Box */}
      <div className="bg-[#FFFFFF] border border-[#E0EAE4] rounded-xl p-5 sm:p-6 shadow-xs space-y-5">
        {/* Quiz Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E0EAE4] pb-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#FEF2EB] text-[#F47321] flex items-center justify-center border border-[#F47321]/30">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-[#005030] text-sm flex items-center gap-1.5">
                <span>Canes Rapid Fire EKG Quiz</span>
                <span className="text-[#61796F] font-normal text-xs">
                  {overrideRhythmIds && overrideRhythmIds.length > 0
                    ? `· Practicing Unmastered (${overrideRhythmIds.length} pool)`
                    : '· 5 Random Strips'}
                </span>
              </h3>
            </div>
          </div>

          {/* Progress, Caliper Toggle & Zoom Controls */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
            <span className="bg-[#FAF9F5] border border-[#EAE8E3] px-2.5 py-1 rounded text-[#C2410C] font-semibold">
              Strip {currentIdx + 1} of {questions.length}
            </span>
            <span className="text-[#54524D]">
              Score: <strong className="text-[#1F1E1D]">{score}</strong>
            </span>

            {/* Caliper Toggle */}
            <button
              onClick={() => setCalipersActive(!calipersActive)}
              className={`px-2 py-1 rounded border transition-colors flex items-center gap-1 text-[11px] ${
                calipersActive
                  ? 'bg-[#FAF0EB] text-[#C2410C] border-[#D97706]/40'
                  : 'text-[#7C7971] border-[#E0DDD5]'
              }`}
              title="Toggle calipers on/off"
            >
              <Compass className="w-3 h-3" />
              <span>Calipers {calipersActive ? 'ON' : 'OFF'}</span>
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

            {/* Reset / Regenerate 5 Random Strips */}
            <button
              onClick={() => {
                if (onClearOverride) onClearOverride();
                generateNewQuiz();
              }}
              className="p-1 text-[#7C7971] hover:text-[#1F1E1D] rounded hover:bg-[#F0EFEB]"
              title="Generate 5 new random strips"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Clinical Bedside Context Card */}
        {currentQ.clinicalContext && (
          <div className="bg-[#FAF9F5] border border-[#EAE8E3] rounded-lg px-3.5 py-2.5 flex items-start gap-3 text-xs text-[#54524D]">
            <div className="w-6 h-6 rounded-md bg-[#FAF0EB] text-[#C2410C] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <HeartPulse className="w-3.5 h-3.5" />
            </div>
            <div className="space-y-0.5">
              <span className="font-bold text-[#1F1E1D] text-[10px] uppercase tracking-wider block">
                Bedside Patient Report
              </span>
              <p className="text-[#37352F] leading-relaxed">{currentQ.clinicalContext}</p>
            </div>
          </div>
        )}

        {/* Instructions & Strip Callout */}
        <div className="flex items-center justify-between text-xs text-[#54524D]">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
            <span>
              Use your calipers to count boxes, march out the rhythm, and apply the <strong>5-step systematic method</strong> to identify this strip.
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#7C7971] hidden sm:inline">
            Lead II · 25 mm/s · 10 mm/mV
          </span>
        </div>

        {/* Main EKG Strip Viewport with Interactive Calipers — Standard 6-Second Strip */}
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
              {/* Top 0s, 3s, and 6s Calibration Hash Marks */}
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

              {/* SVG Waveform */}
              <svg className="w-full h-full absolute inset-0 overflow-visible" viewBox="0 0 900 180">
                <path
                  d={strip.svgPath}
                  fill="none"
                  stroke="#1F2937"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Caliper Tool Overlay */}
              <CaliperTool
                stripWidth={900}
                smallBoxPx={strip.smallBoxPx}
                visible={calipersActive}
                rPeakX1={strip.landmarks[0]?.rPeakX ?? 140}
                rPeakX2={strip.landmarks[1]?.rPeakX ?? 260}
              />
            </div>
          </div>

          {/* 6-Second Strip Live Rate Helper Bar */}
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

        {/* 5-Step Clue / Caliper Assistant Accordion */}
        <div className="border border-[#EAE8E3] rounded-lg overflow-hidden bg-[#FAF9F5]">
          <button
            onClick={() => setShowFiveStepHint(!showFiveStepHint)}
            className="w-full px-3 py-2 text-xs font-semibold text-[#54524D] hover:text-[#1F1E1D] flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Need a clue? Check the 5-Step Telemetry Breakdown for this strip</span>
            </div>
            {showFiveStepHint ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showFiveStepHint && (
            <div className="p-3 bg-[#FFFFFF] border-t border-[#EAE8E3] text-xs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 font-mono">
              <div className="p-2 bg-[#FAF9F5] rounded border border-[#F0EFEB]">
                <span className="text-[10px] text-[#7C7971] block font-sans">Step 1: Heart Rate</span>
                <span className="font-semibold text-[#1F1E1D]">{currentQ.rhythm.heartRate}</span>
              </div>
              <div className="p-2 bg-[#FAF9F5] rounded border border-[#F0EFEB]">
                <span className="text-[10px] text-[#7C7971] block font-sans">Step 2: Regularity</span>
                <span className="font-semibold text-[#1F1E1D]">{currentQ.rhythm.regularity}</span>
              </div>
              <div className="p-2 bg-[#FAF9F5] rounded border border-[#F0EFEB]">
                <span className="text-[10px] text-[#7C7971] block font-sans">Step 3: P Waves</span>
                <span className="font-semibold text-[#1F1E1D] truncate block">{currentQ.rhythm.pWave}</span>
              </div>
              <div className="p-2 bg-[#FAF9F5] rounded border border-[#F0EFEB]">
                <span className="text-[10px] text-[#7C7971] block font-sans">Step 4: PR Interval</span>
                <span className="font-semibold text-[#1F1E1D] truncate block">{currentQ.rhythm.prInterval}</span>
              </div>
              <div className="p-2 bg-[#FAF9F5] rounded border border-[#F0EFEB]">
                <span className="text-[10px] text-[#7C7971] block font-sans">Step 5: QRS Width</span>
                <span className="font-semibold text-[#1F1E1D] truncate block">{currentQ.rhythm.qrsDuration}</span>
              </div>
              <div className="p-2 bg-[#FEF2EB] rounded border border-[#F47321]/30 font-sans text-[#F47321]">
                <span className="text-[10px] text-[#005030] font-bold block uppercase">Nurse Memory Hint</span>
                <span className="text-[11px] italic truncate block">"{currentQ.rhythm.mnemonics[0]}"</span>
              </div>
            </div>
          )}
        </div>

        {/* Question & 4 Multiple Choice Buttons */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-[#005030] uppercase tracking-wider">
            Identify the Rhythm:
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {currentQ.options.map((option, idx) => {
              const isPicked = selectedAnswer === option;
              const isThisCorrect = option === currentQ.rhythm.name;

              let buttonStyle = 'bg-[#FFFFFF] border-[#E0EAE4] hover:border-[#005030] hover:bg-[#EBF3EE]/60 text-[#0D1F17] shadow-2xs';
              if (isAnswered) {
                if (isThisCorrect) {
                  buttonStyle = 'bg-[#EBF3EE] border-[#005030] text-[#005030] font-bold ring-1 ring-[#005030]/20';
                } else if (isPicked && !isThisCorrect) {
                  buttonStyle = 'bg-rose-50 border-rose-300 text-rose-900 font-bold';
                } else {
                  buttonStyle = 'bg-[#FFFFFF]/60 border-[#E0EAE4] text-[#A6BFB0] opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(option)}
                  className={`p-3 rounded-lg border text-xs text-left transition-all flex items-center justify-between ${buttonStyle}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#005030] font-bold text-[11px]">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswered && isThisCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-[#005030] shrink-0" />
                  )}
                  {isAnswered && isPicked && !isThisCorrect && (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Immediate Pedagogical Feedback Bar */}
        {isAnswered && (
          <div
            className={`p-4 rounded-xl border space-y-3 transition-all ${
              isCorrect
                ? 'bg-[#EBF3EE] border-[#005030]/30 text-[#005030]'
                : 'bg-rose-50/60 border-rose-200 text-rose-950'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2 border-b border-black/5 pb-2">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-[#005030] shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <span className="font-bold text-sm">
                  {isCorrect ? 'Correct! Rhythm Identified!' : `Incorrect — This is ${currentQ.rhythm.name}`}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {onStudyRhythm && (
                  <button
                    onClick={() => onStudyRhythm(currentQ.rhythm.id)}
                    className="px-2.5 py-1 text-xs text-[#005030] bg-white border border-[#E0EAE4] hover:border-[#005030] rounded-md transition-colors font-semibold"
                  >
                    Study in Studio
                  </button>
                )}
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-1.5 bg-[#F47321] text-white rounded-lg text-xs font-bold hover:bg-[#D95F12] transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <span>{currentIdx + 1 < questions.length ? 'Next Strip' : 'See Final Score'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 5-Step Clinical Verification */}
            <div className="text-xs space-y-1.5 leading-relaxed text-[#37352F]">
              <div>
                <strong className="text-[#1F1E1D]">Clinical Pathophysiology: </strong>
                <span>{currentQ.rhythm.medicalBSN.definition}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
                <div className="bg-white/80 p-1.5 rounded border border-black/5">
                  <span className="text-[9px] text-[#7C7971] block font-sans">Rate</span>
                  <span className="font-semibold text-[#1F1E1D]">{currentQ.rhythm.heartRate}</span>
                </div>
                <div className="bg-white/80 p-1.5 rounded border border-black/5">
                  <span className="text-[9px] text-[#7C7971] block font-sans">Regularity</span>
                  <span className="font-semibold text-[#1F1E1D]">{currentQ.rhythm.regularity.split(' ')[0]}</span>
                </div>
                <div className="bg-white/80 p-1.5 rounded border border-black/5">
                  <span className="text-[9px] text-[#7C7971] block font-sans">PR Interval</span>
                  <span className="font-semibold text-[#1F1E1D]">{currentQ.rhythm.prInterval.split(' ')[0]}</span>
                </div>
                <div className="bg-white/80 p-1.5 rounded border border-black/5">
                  <span className="text-[9px] text-[#7C7971] block font-sans">QRS Width</span>
                  <span className="font-semibold text-[#1F1E1D]">{currentQ.rhythm.qrsDuration.split(' ')[0]}</span>
                </div>
              </div>

              {/* Child Metaphor & Mnemonic Reminder */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px]">
                <div className="text-[#C2410C] font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                  <span>Memory Rule: {currentQ.rhythm.mnemonics[0]}</span>
                </div>
                <span className="text-[#7C7971] italic">
                  "{currentQ.rhythm.childMetaphor.takeaway}"
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
