class TelemetryAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.4;
  private timerId: number | null = null;
  private currentBpm: number = 75;
  private currentRhythmId: string = 'nsr';

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stop();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public playQrsBeep(pitch = 840) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.9, now + 0.05);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.6, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.065);
    } catch {
      // AudioContext policy handled gracefully
    }
  }

  public playAlarmChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // High-low alarm chime
      [
        { freq: 920, time: 0 },
        { freq: 740, time: 0.12 },
        { freq: 920, time: 0.24 },
        { freq: 740, time: 0.36 }
      ].forEach(({ freq, time }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + time);
        gain.gain.setValueAtTime(0.001, now + time);
        gain.gain.linearRampToValueAtTime(this.volume * 0.35, now + time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + time + 0.09);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + time);
        osc.stop(now + time + 0.1);
      });
    } catch {
      // AudioContext policy handled gracefully
    }
  }

  public startRhythmLoop(rhythmId: string, bpm: number) {
    this.stop();
    this.currentRhythmId = rhythmId;
    this.currentBpm = bpm;

    if (this.isMuted) return;

    if (rhythmId === 'asystole') {
      // Slow ominous periodic warning alarm every 3 seconds
      this.timerId = window.setInterval(() => {
        this.playAlarmChime();
      }, 3000);
      return;
    }

    if (rhythmId === 'ventricular-fibrillation' || rhythmId === 'ventricular-tachycardia' || rhythmId === 'torsades-de-pointes') {
      // Rapid code blue alarm chime
      this.playAlarmChime();
      this.timerId = window.setInterval(() => {
        this.playAlarmChime();
      }, 1600);
      return;
    }

    const intervalMs = (60 / Math.max(bpm || 75, 25)) * 1000;
    this.playQrsBeep();
    this.timerId = window.setInterval(() => {
      this.playQrsBeep();
    }, intervalMs);
  }

  public stop() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}

export const telemetryAudio = new TelemetryAudioEngine();
