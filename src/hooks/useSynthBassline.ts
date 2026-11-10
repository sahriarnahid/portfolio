import { useState, useRef, useEffect, useCallback } from 'react';

const SYNTH_NOTES = [110, 110, 130.81, 146.83, 164.81, 146.83, 130.81, 98];

export function useSynthBassline() {
  const [isSynthPlaying, setIsSynthPlaying] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const stopSynth = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsSynthPlaying(false);
  }, []);

  const toggleSynthBassline = useCallback(() => {
    if (intervalRef.current !== null) {
      stopSynth();
      return;
    }

    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtxRef.current && AudioContextClass) {
      audioCtxRef.current = new AudioContextClass();
    }

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    let step = 0;
    setIsSynthPlaying(true);

    intervalRef.current = window.setInterval(() => {
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(SYNTH_NOTES[step % SYNTH_NOTES.length], ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.19);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
      step++;
    }, 220);
  }, [stopSynth]);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { isSynthPlaying, toggleSynthBassline, stopSynth };
}

