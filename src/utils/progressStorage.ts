export interface RhythmMasteryRecord {
  rhythmId: string;
  timesCorrect: number;
  timesAttempted: number;
  lastIdentifiedAt: number;
}

const STORAGE_KEY = 'cardionurse_rhythm_progress_v1';

export function getMasteredRhythms(): Record<string, RhythmMasteryRecord> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function recordQuizAttempt(rhythmId: string, isCorrect: boolean): Record<string, RhythmMasteryRecord> {
  if (typeof window === 'undefined') return {};
  try {
    const current = getMasteredRhythms();
    const existing = current[rhythmId] || {
      rhythmId,
      timesCorrect: 0,
      timesAttempted: 0,
      lastIdentifiedAt: 0
    };

    existing.timesAttempted += 1;
    if (isCorrect) {
      existing.timesCorrect += 1;
      existing.lastIdentifiedAt = Date.now();
    }

    current[rhythmId] = existing;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return current;
  } catch {
    return {};
  }
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
