import React, { useState, useMemo, useEffect } from 'react';
import { RHYTHM_DATABASE, CATEGORY_LABELS } from './data/rhythmDatabase';
import { RhythmData, RhythmCategory } from './types/ekg';
import { StripViewer } from './components/StripViewer';
import { FiveStepAnalyzer } from './components/FiveStepAnalyzer';
import { RhythmCardDetail } from './components/RhythmCardDetail';
import { HeartBlockPoemRoom } from './components/HeartBlockPoemRoom';
import { ConductionLab } from './components/ConductionLab';
import { TelemetryGame } from './components/TelemetryGame';
import { RapidFireQuiz } from './components/RapidFireQuiz';
import { ProgressDashboard } from './components/ProgressDashboard';
import { getMasteredRhythms, RhythmMasteryRecord } from './utils/progressStorage';
import { MiamiUIcon, UHealthBadge } from './components/MiamiUIcon';
import {
  HeartPulse,
  Search,
  BookOpen,
  Gamepad2,
  Compass,
  FileText,
  Activity,
  Layers,
  ChevronRight,
  ExternalLink,
  Flame,
  Trophy,
  BarChart3,
  GraduationCap
} from 'lucide-react';

export default function App() {
  const [currentNav, setCurrentNav] = useState<'studio' | 'fivesteps' | 'quiz' | 'progress' | 'poem' | 'conduction' | 'game'>('studio');
  const [selectedRhythmId, setSelectedRhythmId] = useState<string>('nsr');
  const [activeCategory, setActiveCategory] = useState<RhythmCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quizOverrideIds, setQuizOverrideIds] = useState<string[] | null>(null);

  // User rhythm mastery tracking
  const [progressMap, setProgressMap] = useState<Record<string, RhythmMasteryRecord>>(() =>
    getMasteredRhythms()
  );

  const refreshProgress = () => {
    setProgressMap(getMasteredRhythms());
  };

  const totalRhythms = RHYTHM_DATABASE.length; // 27 rhythms
  const masteredCount = Object.keys(progressMap).filter(
    (id) => (progressMap[id]?.timesCorrect || 0) > 0
  ).length;
  const masteryPercentage = Math.round((masteredCount / totalRhythms) * 100);

  // Find active rhythm object
  const activeRhythm: RhythmData = useMemo(() => {
    return RHYTHM_DATABASE.find((r) => r.id === selectedRhythmId) || RHYTHM_DATABASE[0];
  }, [selectedRhythmId]);

  // Filtered rhythms list
  const filteredRhythms = useMemo(() => {
    return RHYTHM_DATABASE.filter((r) => {
      const matchCat = activeCategory === 'all' || r.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchCat;
      const matchSearch =
        r.name.toLowerCase().includes(q) ||
        (r.aka && r.aka.toLowerCase().includes(q)) ||
        r.tags.some((t) => t.toLowerCase().includes(q)) ||
        r.heartRate.toLowerCase().includes(q) ||
        r.medicalBSN.clinicalCauses.some((c) => c.toLowerCase().includes(q)) ||
        r.mnemonics.some((m) => m.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const selectRhythmAndGoToStudio = (id: string) => {
    setSelectedRhythmId(id);
    setCurrentNav('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePracticeUnmastered = (unmasteredIds: string[]) => {
    setQuizOverrideIds(unmasteredIds);
    setCurrentNav('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] text-[#0D1F17] flex flex-col font-sans">
      {/* 1. TOP BAR: University of Miami | UHealth Cardiology Wordmark — Nav Links — Action */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E0EAE4] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          {/* Zone 1: University of Miami "The U" Split Brand Wordmark */}
          <button
            onClick={() => setCurrentNav('studio')}
            className="flex items-center gap-3 text-left shrink-0 group focus-visible:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-white border border-[#E0EAE4] shadow-xs flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform">
              <MiamiUIcon className="w-full h-full" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-sm font-black tracking-tight text-[#005030] uppercase">
                  University of Miami
                </span>
                <span className="bg-[#FEF2EB] text-[#F47321] text-[10px] px-1.5 py-0.5 rounded font-mono font-bold border border-[#F47321]/30">
                  UHealth
                </span>
              </div>
              <span className="text-[10px] text-[#4B6358] tracking-wide font-medium block mt-0.5">
                School of Nursing & Health Studies · CCU Telemetry
              </span>
            </div>
          </button>

          {/* Zone 2: Collegiate Clean Nav Links */}
          <nav className="hidden lg:flex items-center gap-4 text-xs font-semibold text-[#4B6358]">
            <button
              onClick={() => setCurrentNav('studio')}
              className={`hover:text-[#005030] transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                currentNav === 'studio' ? 'border-[#005030] text-[#005030] font-bold' : 'border-transparent'
              }`}
            >
              Caliper Studio
            </button>
            <button
              onClick={() => setCurrentNav('fivesteps')}
              className={`hover:text-[#005030] transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                currentNav === 'fivesteps' ? 'border-[#005030] text-[#005030] font-bold' : 'border-transparent'
              }`}
            >
              5-Step Method
            </button>
            <button
              onClick={() => {
                setQuizOverrideIds(null);
                setCurrentNav('quiz');
              }}
              className={`hover:text-[#005030] transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 flex items-center gap-1.5 ${
                currentNav === 'quiz' ? 'border-[#F47321] text-[#F47321] font-bold' : 'border-transparent'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-[#F47321]" />
              <span>Rapid Quiz</span>
            </button>
            <button
              onClick={() => {
                refreshProgress();
                setCurrentNav('progress');
              }}
              className={`hover:text-[#005030] transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 flex items-center gap-1.5 ${
                currentNav === 'progress' ? 'border-[#005030] text-[#005030] font-bold' : 'border-transparent'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-[#F47321]" />
              <span>Canes Mastery ({masteryPercentage}%)</span>
            </button>
            <button
              onClick={() => setCurrentNav('poem')}
              className={`hover:text-[#005030] transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                currentNav === 'poem' ? 'border-[#005030] text-[#005030] font-bold' : 'border-transparent'
              }`}
            >
              Heart Block Poem
            </button>
            <button
              onClick={() => setCurrentNav('conduction')}
              className={`hover:text-[#005030] transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                currentNav === 'conduction' ? 'border-[#005030] text-[#005030] font-bold' : 'border-transparent'
              }`}
            >
              Conduction Lab
            </button>
          </nav>

          {/* Zone 3: Actions & Progress Badge */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                refreshProgress();
                setCurrentNav('progress');
              }}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono bg-[#EBF3EE] border border-[#005030]/20 hover:border-[#005030] rounded-lg text-[#005030] transition-colors"
              title="View full compendium progress dashboard"
            >
              <Trophy className="w-3.5 h-3.5 text-[#F47321]" />
              <span className="font-bold">{masteredCount}/{totalRhythms} ({masteryPercentage}%)</span>
            </button>

            <button
              onClick={() => setCurrentNav('game')}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#F47321] hover:bg-[#D95F12] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs flex items-center gap-1.5 active:scale-95"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Shift Simulator</span>
            </button>
          </div>
        </div>

        {/* Mobile Nav Sub-Bar */}
        <div className="flex lg:hidden border-t border-[#E0EAE4] px-3 py-1.5 overflow-x-auto gap-2 text-xs font-semibold text-[#4B6358] bg-[#FFFFFF]">
          <button
            onClick={() => setCurrentNav('studio')}
            className={`whitespace-nowrap px-2.5 py-1 rounded ${
              currentNav === 'studio' ? 'bg-[#005030] text-white font-bold' : ''
            }`}
          >
            Studio
          </button>
          <button
            onClick={() => setCurrentNav('fivesteps')}
            className={`whitespace-nowrap px-2.5 py-1 rounded ${
              currentNav === 'fivesteps' ? 'bg-[#005030] text-white font-bold' : ''
            }`}
          >
            5-Step
          </button>
          <button
            onClick={() => {
              setQuizOverrideIds(null);
              setCurrentNav('quiz');
            }}
            className={`whitespace-nowrap px-2.5 py-1 rounded flex items-center gap-1 ${
              currentNav === 'quiz' ? 'bg-[#FEF2EB] text-[#F47321] font-bold' : ''
            }`}
          >
            <Flame className="w-3 h-3 text-[#F47321]" />
            <span>Quiz</span>
          </button>
          <button
            onClick={() => {
              refreshProgress();
              setCurrentNav('progress');
            }}
            className={`whitespace-nowrap px-2.5 py-1 rounded flex items-center gap-1 ${
              currentNav === 'progress' ? 'bg-[#EBF3EE] text-[#005030] font-bold' : ''
            }`}
          >
            <Trophy className="w-3 h-3 text-[#F47321]" />
            <span>Mastery</span>
          </button>
          <button
            onClick={() => setCurrentNav('poem')}
            className={`whitespace-nowrap px-2.5 py-1 rounded ${
              currentNav === 'poem' ? 'bg-[#005030] text-white font-bold' : ''
            }`}
          >
            Poem
          </button>
          <button
            onClick={() => setCurrentNav('conduction')}
            className={`whitespace-nowrap px-2.5 py-1 rounded ${
              currentNav === 'conduction' ? 'bg-[#005030] text-white font-bold' : ''
            }`}
          >
            Conduction
          </button>
          <button
            onClick={() => setCurrentNav('game')}
            className={`whitespace-nowrap px-2.5 py-1 rounded ${
              currentNav === 'game' ? 'bg-[#F47321] text-white font-bold' : ''
            }`}
          >
            Shift Game
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full space-y-6">
        {/* VIEW 1: CALIPER STUDIO & RHYTHM COMPENDIUM */}
        {currentNav === 'studio' && (
          <div className="space-y-6">
            {/* Top Educational Intro Strip */}
            <div className="bg-[#FFFFFF] border border-[#E0EAE4] rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono text-[#005030] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#F47321]" />
                  <span>University of Miami School of Nursing & Health Studies</span>
                  <span className="text-[#A6BFB0]">·</span>
                  <span className="text-[#F47321]">UHealth CCU Curriculum Aligned</span>
                </div>
                <h1 className="text-xl md:text-2xl font-black text-[#005030] tracking-tight text-balance">
                  Mastering Cardiac Rhythm Strips & Systematic Telemetry
                </h1>
                <p className="text-xs text-[#4B6358] max-w-3xl leading-relaxed">
                  Every rhythm below is broken down in 4 complete ways: Medical BSN Analysis, Explain Like I'm 5, Clinical Metaphors, and NCLEX Mnemonics. Drag the digital calipers across the calibrated 6-second grid to measure intervals in real-time.
                </p>
              </div>

              {/* PDF Curriculum Link Button */}
              <a
                href="/assets/aistudio/Review_of_EKG_Rhythm__3__96a6ea3d.pdf"
                target="_blank"
                rel="noreferrer"
                className="shrink-0 px-3.5 py-2.5 bg-[#F5F8F6] border border-[#E0EAE4] hover:border-[#005030]/50 rounded-lg text-xs font-semibold text-[#005030] hover:bg-[#EBF3EE] transition-colors flex items-center gap-2.5 shadow-2xs"
                title="View original University of Miami 39-slide lecture deck"
              >
                <div className="w-8 h-8 rounded-lg bg-[#FEF2EB] text-[#F47321] flex items-center justify-center shrink-0 border border-[#F47321]/30">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-[11px] text-[#005030]">Original Lecture Deck</div>
                  <div className="text-[10px] text-[#61796F]">UM Health & Clinics (PDF)</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#A6BFB0] ml-1" />
              </a>
            </div>

            {/* Rhythm Filter Tabs & Search Bar */}
            <div className="bg-[#FFFFFF] border border-[#E0EAE4] rounded-xl p-3 shadow-xs space-y-3">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                {/* Category Segmented Buttons */}
                <div className="flex items-center gap-1 overflow-x-auto p-1 bg-[#F5F8F6] rounded-lg border border-[#E0EAE4]">
                  {(['all', 'sinus', 'atrial', 'blocks', 'ventricular', 'critical'] as RhythmCategory[]).map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap shrink-0 ${
                          activeCategory === cat
                            ? 'bg-[#005030] text-white shadow-xs'
                            : 'text-[#4B6358] hover:text-[#005030] hover:bg-[#EBF3EE]'
                        }`}
                      >
                        {cat === 'all'
                          ? `All Rhythms (${totalRhythms})`
                          : cat === 'sinus'
                          ? 'Sinus'
                          : cat === 'atrial'
                          ? 'Atrial'
                          : cat === 'blocks'
                          ? 'AV Blocks'
                          : cat === 'ventricular'
                          ? 'Ventricular'
                          : 'Critical / STEMI'}
                      </button>
                    )
                  )}
                </div>

                {/* Quick Search Input */}
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-[#A6BFB0] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search rhythm, drug, or cause..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F5F8F6] border border-[#E0EAE4] rounded-lg focus:outline-none focus:border-[#005030] focus:ring-1 focus:ring-[#005030]/30 text-[#0D1F17] placeholder:text-[#A6BFB0]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#61796F] hover:text-[#005030]"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Horizontal Scrollable Rhythm Badges Row */}
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {filteredRhythms.map((r) => {
                  const isSelected = r.id === selectedRhythmId;
                  const isMastered = (progressMap[r.id]?.timesCorrect || 0) > 0;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRhythmId(r.id)}
                      className={`px-3 py-1.5 rounded-lg border text-left transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                        isSelected
                          ? 'bg-[#EBF3EE] border-[#005030] text-[#005030] font-bold shadow-xs'
                          : 'bg-[#FFFFFF] border-[#E0EAE4] text-[#4B6358] hover:border-[#005030]/40 hover:text-[#005030]'
                      }`}
                    >
                      <span className="text-xs">{r.name}</span>
                      {isMastered && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#005030]" title="Mastered in Canes Quiz" />
                      )}
                      <span className="text-[10px] font-mono text-[#F47321] font-semibold">
                        {r.rateBpm > 0 ? `${r.rateBpm} bpm` : '0 bpm'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Selected Rhythm Header Info */}
            <div className="bg-[#FFFFFF] border border-[#E0EAE4] rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#FEF2EB] text-[#F47321] font-mono font-bold text-[10px] border border-[#F47321]/30">
                    {CATEGORY_LABELS[activeRhythm.category] || activeRhythm.category}
                  </span>
                  <h2 className="text-lg font-black text-[#005030]">{activeRhythm.name}</h2>
                </div>
                {activeRhythm.aka && (
                  <div className="text-[11px] text-[#61796F]">
                    Also known as: <em>{activeRhythm.aka}</em>
                  </div>
                )}
              </div>

              {/* Rapid Stats Text Separators */}
              <div className="flex items-center gap-2 font-mono text-[11px] text-[#4B6358]">
                <span>Rate: <strong className="text-[#005030] font-bold">{activeRhythm.heartRate}</strong></span>
                <span aria-hidden="true" className="text-[#C8D8CE]">·</span>
                <span>Rhythm: <strong className="text-[#005030] font-bold">{activeRhythm.regularity}</strong></span>
                <span aria-hidden="true" className="text-[#C8D8CE]">·</span>
                <span>PR: <strong className="text-[#005030] font-bold">{activeRhythm.prInterval.split(' ')[0]}</strong></span>
                <span aria-hidden="true" className="text-[#C8D8CE]">·</span>
                <span>QRS: <strong className="text-[#005030] font-bold">{activeRhythm.qrsDuration.split(' ')[0]}</strong></span>
              </div>
            </div>

            {/* 1. Main ECG Strip Viewer with Digital Caliper Tool */}
            <StripViewer rhythm={activeRhythm} />

            {/* 2. The 5-Step Systematic Analysis Breakdown */}
            <FiveStepAnalyzer rhythm={activeRhythm} />

            {/* 3. 4-Tier Masterclass Educational Deck */}
            <RhythmCardDetail rhythm={activeRhythm} />
          </div>
        )}

        {/* VIEW 2: 5-STEP SYSTEMATIC READING METHOD */}
        {currentNav === 'fivesteps' && (
          <div className="space-y-6">
            <div className="bg-[#FFFFFF] border border-[#E0EAE4] rounded-xl p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#005030] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#F47321]" />
                <span>UHealth CCU Telemetry Protocol</span>
                <span className="text-[#A6BFB0]">·</span>
                <span>University of Miami Curriculum Pages 6–7</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-[#005030]">
                The 5-Step Systematic Strip Interpretation Protocol
              </h2>
              <p className="text-xs text-[#4B6358] leading-relaxed max-w-3xl">
                Novice nurses often make the mistake of glancing at a strip and trying to guess the rhythm from overall visual impression. World-class cardiovascular nurses NEVER guess — they execute these 5 disciplined steps in strict order on every single strip.
              </p>
            </div>

            {/* Active Rhythm Strip for Demonstration */}
            <StripViewer rhythm={activeRhythm} />

            {/* Full 5-Step Interactive Component */}
            <FiveStepAnalyzer rhythm={activeRhythm} />
          </div>
        )}

        {/* VIEW 3: RAPID FIRE QUIZ SECTION */}
        {currentNav === 'quiz' && (
          <div className="space-y-6">
            <div className="bg-[#FFFFFF] border border-[#E0EAE4] rounded-xl p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#005030] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#F47321]" />
                <span>Miami Canes Assessment Engine</span>
                <span className="text-[#A6BFB0]">·</span>
                <span className="text-[#F47321]">45+ Clinical Variants · Randomized</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-[#005030]">
                Rapid Fire Canes EKG Strip Quiz
              </h2>
              <p className="text-xs text-[#4B6358] leading-relaxed max-w-3xl">
                Every quiz pulls 5 unique, randomized cardiac strips from the comprehensive 45+ variant library. Apply your 5-step interpretation method, use the digital calipers on the strip, and test your clinical speed with immediate feedback!
              </p>
            </div>

            <RapidFireQuiz
              onStudyRhythm={selectRhythmAndGoToStudio}
              onOpenDashboard={() => {
                refreshProgress();
                setCurrentNav('progress');
              }}
              overrideRhythmIds={quizOverrideIds}
              onClearOverride={() => setQuizOverrideIds(null)}
            />
          </div>
        )}

        {/* VIEW 4: USER PROGRESS DASHBOARD */}
        {currentNav === 'progress' && (
          <div className="space-y-6">
            <ProgressDashboard
              progressMap={progressMap}
              onStudyRhythm={selectRhythmAndGoToStudio}
              onPracticeUnmastered={handlePracticeUnmastered}
              onReset={refreshProgress}
            />
          </div>
        )}

        {/* VIEW 5: THE HEART BLOCK POEM ROOM */}
        {currentNav === 'poem' && (
          <HeartBlockPoemRoom onSelectRhythm={selectRhythmAndGoToStudio} />
        )}

        {/* VIEW 6: CARDIAC CONDUCTION ANATOMY LAB */}
        {currentNav === 'conduction' && <ConductionLab />}

        {/* VIEW 7: CLINICAL TELEMETRY SHIFT CHALLENGE / GAME */}
        {currentNav === 'game' && <TelemetryGame />}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#E0EAE4] bg-[#FFFFFF] py-6 mt-12 text-xs text-[#61796F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MiamiUIcon className="w-5 h-5 shrink-0" />
            <div className="leading-tight">
              <span className="font-bold text-[#005030]">University of Miami Health System</span>
              <span className="text-[#A6BFB0]"> · </span>
              <span className="text-[#4B6358]">School of Nursing & Health Studies Cardiac Telemetry</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Ref: Atwood, Stanton & Storey-Davenport</span>
            <span className="text-[#A6BFB0]">·</span>
            <a
              href="/assets/aistudio/Review_of_EKG_Rhythm__3__96a6ea3d.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-[#F47321] hover:underline font-bold flex items-center gap-1"
            >
              <span>UM Lecture Slides (PDF)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
