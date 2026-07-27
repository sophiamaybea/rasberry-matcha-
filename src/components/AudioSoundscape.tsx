import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioSoundscape: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);

  const toggleSoundscape = () => {
    if (!isPlaying) {
      // Start audio context
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      droneGainRef.current = masterGain;

      // Low Cello-like warm harmonic drone (65Hz & 130Hz)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(65.41, ctx.currentTime); // C2
      osc2.frequency.setValueAtTime(130.81, ctx.currentTime); // C3

      // Low pass filter for warm organic warmth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, ctx.currentTime);
      filterRef.current = filter;

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);

      osc1.start();
      osc2.start();

      setIsPlaying(true);
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      id="soundscape-toggle"
      onClick={toggleSoundscape}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3 rounded-full bg-[#0a0a0a]/80 border border-white/15 backdrop-blur-2xl text-[#E2D2BD] hover:border-white/40 transition-all text-[11px] tracking-[0.2em] font-sans uppercase shadow-2xl group cursor-pointer"
      title="Toggle Generative Atmospheric Soundscape"
    >
      <span className="relative flex h-2 w-2">
        {isPlaying && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4A6FA5] opacity-75"></span>
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isPlaying ? 'bg-[#4A6FA5]' : 'bg-[#E2D2BD]/40'
          }`}
        ></span>
      </span>
      <span className="font-serif italic text-sm">{isPlaying ? 'Atelier Soundscape' : 'Atmosphere Off'}</span>
      {isPlaying ? (
        <Volume2 className="w-3.5 h-3.5 text-[#E2D2BD] group-hover:scale-110 transition-transform" />
      ) : (
        <VolumeX className="w-3.5 h-3.5 text-[#E2D2BD]/50 group-hover:scale-110 transition-transform" />
      )}
    </button>
  );
};
