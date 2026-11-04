import React, { useState } from 'react';
import { RHYTHM_DATABASE, CATEGORY_LABELS } from '../data/rhythmDatabase';
import { RhythmMasteryRecord, resetProgress } from '../utils/progressStorage';
import { MiamiUIcon } from './MiamiUIcon';
import {
  Trophy,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Target,
  Award,
  GraduationCap
} from 'lucide-react';

interface ProgressDashboardProps {
  progressMap: Record<string, RhythmMasteryRecord>;
  onStudyRhythm: (rhythmId: string) => void;
  onPracticeUnmastered: (unmasteredIds: string[]) => void;
  onReset: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progressMap,
  onStudyRhythm,
  onPracticeUnmastered,
  onReset
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState<boolean>(false);
  const totalRhythms = RHYTHM_DATABASE.length; // 27 rhythms

  // Count mastered rhythms (at least 1 correct identification)
  const masteredIds = Object.keys(progressMap).filter(
    (id) => (progressMap[id]?.timesCorrect || 0) > 0
  );
  const masteredCount = masteredIds.length;
  const percentage = Math.round((masteredCount / totalRhythms) * 100);

  // Unmastered IDs
  const unmasteredRhythms = RHYTHM_DATABASE.filter(
    (r) => (progressMap[r.id]?.timesCorrect || 0) === 0
  );

  // Group by category (22 total rhythms across 5 categories)
  const categories = ['sinus', 'atrial', 'blocks', 'ventricular', 'critical'] as const;

  const categoryStats = categories.map((cat) => {
    const inCat = RHYTHM_DATABASE.filter((r) => r.category === cat);
    const masteredInCat = inCat.filter(
      (r) => (progressMap[r.id]?.timesCorrect || 0) > 0
    );
    return {
      cat,
      name: CATEGORY_LABELS[cat] || cat,
      total: inCat.length,
      mastered: masteredInCat.length,
      pct: inCat.length > 0 ? Math.round((masteredInCat.length / inCat.length) * 100) : 0,
      rhythms: inCat
    };
  });

  const handleReset = () => {
    resetProgress();
    setShowConfirmReset(false);
    onReset();
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E0EAE4] rounded-xl p-6 shadow-xs space-y-6">
      {/* Top Banner: Master Progress Metric */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#E0EAE4] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#005030] font-semibold">
            <MiamiUIcon size={16} />
            <span className="text-[#005030] font-bold">University of Miami SONHS Telemetry Competency</span>
            <span className="text-[#7C7971]">·</span>
            <span className="text-[#F47321] font-semibold">UHealth CCU Standard</span>
          </div>
          <h2 className="text-xl font-bold text-[#1F1E1D] flex items-center gap-2">
            <span>Canes Compendium Mastery: {masteredCount} of {totalRhythms} ({percentage}%)</span>
            {percentage === 100 && (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-[#005030] text-white font-mono">
                <GraduationCap className="w-3.5 h-3.5 text-[#FFB81C]" />
                CCU Certified
              </span>
            )}
          </h2>
          <p className="text-xs text-[#54524D]">
            Official UHealth telemetry credential tracker. Verified across all {totalRhythms} cardiac rhythms from the school curriculum.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {unmasteredRhythms.length > 0 && (
            <button
              onClick={() => onPracticeUnmastered(unmasteredRhythms.map((r) => r.id))}
              className="px-3.5 py-1.5 bg-[#F47321] text-white hover:bg-[#EE7624] rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Target className="w-3.5 h-3.5 text-white" />
              <span>Drill Unmastered ({unmasteredRhythms.length} remaining)</span>
            </button>
          )}

          {showConfirmReset ? (
            <div className="flex items-center gap-1 bg-[#F5F8F6] p-1 rounded-lg border border-[#E0EAE4]">
              <span className="text-[11px] text-rose-700 px-2">Clear data?</span>
              <button
                onClick={handleReset}
                className="px-2 py-0.5 bg-rose-600 text-white rounded text-[10px] font-semibold hover:bg-rose-700"
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-2 py-0.5 text-[#7C7971] text-[10px] hover:text-[#1F1E1D]"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirmReset(true)}
              className="px-2.5 py-1.5 text-xs text-[#7C7971] hover:text-[#005030] hover:bg-[#F5F8F6] rounded-lg transition-colors flex items-center gap-1"
              title="Reset quiz history and mastery count"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Overall Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-[#54524D] font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#005030]" />
            Full {totalRhythms}-Rhythm Curriculum (UM School of Nursing & Health Studies)
          </span>
          <span className="font-bold text-[#005030] flex items-center gap-1.5">
            <span className="text-[#F47321]">{masteredCount}/{totalRhythms}</span>
            <span>{percentage}% Completed</span>
          </span>
        </div>
        <div className="w-full h-3.5 bg-[#E8F0EC] rounded-full overflow-hidden border border-[#D0E0D6] p-0.5">
          <div
            className="h-full bg-gradient-to-r from-[#005030] via-[#005030] to-[#F47321] rounded-full transition-all duration-500 ease-out shadow-xs"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Category Progress Micro-Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {categoryStats.map((cs) => (
          <div
            key={cs.cat}
            className="bg-[#F5F8F6] border border-[#E0EAE4] rounded-lg p-3 space-y-1.5 flex flex-col justify-between hover:border-[#005030]/40 transition-colors"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#005030] truncate block">
                {cs.name.replace(' Rhythms', '').replace(' Dysrhythmias', '')}
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-base font-bold text-[#1F1E1D] font-mono">
                  {cs.mastered}/{cs.total}
                </span>
                <span className="text-[10px] text-[#7C7971]">({cs.pct}%)</span>
              </div>
            </div>

            <div className="w-full h-1.5 bg-[#E0EAE4] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  cs.pct === 100 ? 'bg-[#005030]' : 'bg-[#F47321]'
                }`}
                style={{ width: `${cs.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Complete Rhythm Compendium Breakdown Table */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-xs">
          <h3 className="font-bold text-[#1F1E1D] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-[#F47321] rounded-xs" />
            <span>Mastery Status by Rhythm</span>
          </h3>
          <span className="text-[#7C7971] text-[11px]">
            Click any rhythm to inspect with calipers in Studio
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {RHYTHM_DATABASE.map((rhythm) => {
            const record = progressMap[rhythm.id];
            const isMastered = (record?.timesCorrect || 0) > 0;
            const attempted = (record?.timesAttempted || 0) > 0;

            let statusBg = 'bg-[#F5F8F6] border-[#E0EAE4] text-[#54524D]';
            let icon = <HelpCircle className="w-3.5 h-3.5 text-[#A0AFA6]" />;
            let statusText = 'Not yet tested';

            if (isMastered) {
              statusBg = 'bg-[#005030]/5 border-[#005030]/25 text-[#005030]';
              icon = <CheckCircle2 className="w-3.5 h-3.5 text-[#005030]" />;
              statusText = `Mastered (${record.timesCorrect}/${record.timesAttempted})`;
            } else if (attempted) {
              statusBg = 'bg-[#F47321]/10 border-[#F47321]/30 text-[#A04000]';
              icon = <AlertCircle className="w-3.5 h-3.5 text-[#F47321]" />;
              statusText = `Missed (0/${record.timesAttempted})`;
            }

            return (
              <button
                key={rhythm.id}
                onClick={() => onStudyRhythm(rhythm.id)}
                className={`p-2.5 rounded-lg border text-left transition-all flex items-center justify-between group hover:border-[#005030] hover:shadow-xs ${statusBg}`}
                title={`Study ${rhythm.name} in Caliper Studio`}
              >
                <div className="space-y-0.5 truncate pr-2">
                  <div className="font-semibold text-xs truncate group-hover:text-[#005030] transition-colors">
                    {rhythm.name}
                  </div>
                  <div className="text-[10px] font-mono text-[#7C7971] truncate">
                    {statusText}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {icon}
                  <ExternalLink className="w-3 h-3 text-[#A0AFA6] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
