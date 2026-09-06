/**
 * Web Audio API gentle background music box synthesizer & sound effects.
 * Creates an emotional, peaceful, lo-fi music box arpeggio with zero external dependencies.
 */

class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;
  private currentNoteIndex = 0;
  private listeners: Set<(muted: boolean) => void> = new Set();

  // Soothing pentatonic / pastel lullaby notes (in Hz)
  // C major / A minor pentatonic extended with gentle chords (C4, E4, G4, A4, B4, C5, D5, E5)
  private melody = [
    261.63, 329.63, 392.00, 523.25, // C4, E4, G4, C5
    440.00, 523.25, 659.25, 523.25, // A4, C5, E5, C5
    349.23, 440.00, 523.25, 440.00, // F4, A4, C5, A4
    392.00, 493.88, 587.33, 493.88, // G4, B4, D5, B4
    329.63, 392.00, 523.25, 659.25, // E4, G4, C5, E5
    440.00, 523.25, 659.25, 783.99, // A4, C5, E5, G5
    392.00, 523.25, 587.33, 523.25, // G4, C5, D5, C5
    261.63, 329.63, 392.00, 523.25, // C4, E4, G4, C5
  ];

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public subscribe(listener: (muted: boolean) => void): () => void {
    this.listeners.add(listener);
    listener(this.isMuted);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l(this.isMuted));
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.startMusic();
      this.playChime(659.25, 0.15); // soft feedback note
    } else {
      this.stopMusic();
    }
    this.notify();
    return this.isMuted;
  }

  public unmute(): void {
    if (this.isMuted) {
      this.isMuted = false;
      this.startMusic();
      this.notify();
    }
  }

  public startMusic(): void {
    const ctx = this.getAudioContext();
    if (!ctx || this.isMuted || this.isPlaying) return;

    this.isPlaying = true;
    this.stepMusic();
  }

  private stepMusic = () => {
    if (!this.isPlaying || this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const note = this.melody[this.currentNoteIndex];
    this.playTone(note, 0.08, 1.8);

    // Occasionally play a gentle soft harmony bass note
    if (this.currentNoteIndex % 4 === 0) {
      const bassNote = note / 2;
      this.playTone(bassNote, 0.04, 2.4, 'sine');
    }

    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;

    // Timing between notes: 520ms (slow, tender music box pace)
    this.intervalId = window.setTimeout(this.stepMusic, 520);
  };

  public stopMusic(): void {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      window.clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Delicate music-box / celesta chime tone
   */
  private playTone(freq: number, peakVol: number, duration: number, type: OscillatorType = 'triangle'): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Sweet bell envelope: immediate attack, lingering soft decay
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(peakVol, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration + 0.1);
    } catch {
      // Audio playback restrictions or errors safely ignored
    }
  }

  /**
   * Sound effect: Soft bubble pop for button interactions
   */
  public playBubble(): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Ignore
    }
  }

  /**
   * Sound effect: Sweet chime
   */
  public playChime(freq = 523.25, vol = 0.12): void {
    if (this.isMuted) return;
    this.playTone(freq, vol, 1.2, 'sine');
  }

  /**
   * Sound effect: Celebration arpeggio / sparkle fanfares
   */
  public playCelebration(): void {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.14, 1.4, 'sine');
      }, idx * 130);
    });
  }
}

export const soundCtrl = new SoundController();
