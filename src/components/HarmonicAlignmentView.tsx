import React, { useState } from 'react';
import { Character, HarmonicAlignmentResult } from '../types';
import { CHARACTERS } from '../data/characters';
import { Sparkles, Activity, Layers, MessageSquare, ArrowRight, RefreshCw } from 'lucide-react';

interface HarmonicAlignmentViewProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const HarmonicAlignmentView: React.FC<HarmonicAlignmentViewProps> = ({
  onClose,
  isModal = false,
}) => {
  const [charAId, setCharAId] = useState<string>('muse');
  const [charBId, setCharBId] = useState<string>('architect');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<HarmonicAlignmentResult | null>({
    alignmentTitle: 'Resonance of Structure & Sculptural Drapery',
    harmonyScore: 92,
    coreResonance:
      'Elena Vance’s unhurried epistemic depth provides a fertile canvas for Julian Thorne’s structural clarity. Where she sees possibility in space, he creates the frame to ground it into living reality.',
    creativeTension:
      'Julian’s desire for concrete commitments may occasionally press against Elena’s protective solitude. Growth occurs as Julian learns to trust silence as form, and Elena lets structure feel like protection.',
    conversationStarters: [
      '“What physical space or piece of architecture has given you your deepest sense of safety?”',
      '“How do you decide when an unformed idea is ready to be shared with another human being?”',
    ],
    materialAnalogy:
      'Like carved alabaster supporting woven golden silk, structure gives freedom to form.',
  });

  const charA = CHARACTERS.find((c) => c.id === charAId) || CHARACTERS[0];
  const charB = CHARACTERS.find((c) => c.id === charBId) || CHARACTERS[1];

  const handleComputeAlignment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/harmonic-alignment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ charA, charB }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error computing harmonic alignment:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const containerClasses = isModal
    ? 'fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0a0a0a]/90 backdrop-blur-2xl animate-fadeIn'
    : 'w-full max-w-5xl mx-auto my-12 px-4';

  const innerClasses = isModal
    ? 'relative w-full max-w-4xl bg-[#0a0a0a] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[92vh] text-[#E2D2BD]'
    : 'bg-white/5 border border-white/15 rounded-3xl p-6 sm:p-10 text-[#E2D2BD] backdrop-blur-2xl shadow-2xl';

  return (
    <div className={containerClasses}>
      <div className={innerClasses}>
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-sans text-[#E2D2BD] mb-1.5 opacity-80">
              <Activity className="w-3.5 h-3.5 text-[#4A6FA5]" />
              <span>Harmonic Alignment Engine</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-light">
              Compatibility Isn’t a Score. It’s a Conversation.
            </h2>
            <p className="text-xs text-[#E2D2BD]/70 mt-1.5 font-light max-w-2xl leading-relaxed">
              Analyzing core values, communication cadences, and relational chemistry between Atelier figures.
            </p>
          </div>
          {isModal && onClose && (
            <button
              id="btn-close-alignment-modal"
              onClick={onClose}
              className="text-[#E2D2BD]/50 hover:text-white text-xl p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Character Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative">
          {/* Person A Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5">
            <img
              src={charA.imageSrc}
              alt={charA.name}
              referrerPolicy="no-referrer"
              className="w-24 h-32 object-cover rounded-xl border border-white/20 shadow-md"
            />
            <div className="flex-1 w-full text-center sm:text-left">
              <label className="text-[10px] uppercase tracking-[0.3em] text-[#E2D2BD]/50 font-sans block mb-1.5">
                Primary Subject (Person A)
              </label>
              <select
                id="select-character-a"
                value={charAId}
                onChange={(e) => setCharAId(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/15 rounded-xl p-2.5 text-xs text-white focus:outline-none mb-2"
              >
                {CHARACTERS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.role}
                  </option>
                ))}
              </select>
              <div className="text-xs text-[#E2D2BD] font-serif italic">{charA.fashionMaterial}</div>
              <div className="text-[11px] text-[#E2D2BD]/60 mt-1 font-light">{charA.location}</div>
            </div>
          </div>

          {/* Person B Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5">
            <img
              src={charB.imageSrc}
              alt={charB.name}
              referrerPolicy="no-referrer"
              className="w-24 h-32 object-cover rounded-xl border border-white/20 shadow-md"
            />
            <div className="flex-1 w-full text-center sm:text-left">
              <label className="text-[10px] uppercase tracking-[0.3em] text-[#E2D2BD]/50 font-sans block mb-1.5">
                Complement Subject (Person B)
              </label>
              <select
                id="select-character-b"
                value={charBId}
                onChange={(e) => setCharBId(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/15 rounded-xl p-2.5 text-xs text-white focus:outline-none mb-2"
              >
                {CHARACTERS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.role}
                  </option>
                ))}
              </select>
              <div className="text-xs text-[#4A6FA5] font-serif italic">{charB.fashionMaterial}</div>
              <div className="text-[11px] text-[#E2D2BD]/60 mt-1 font-light">{charB.location}</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-10">
          <button
            id="btn-compute-alignment"
            onClick={handleComputeAlignment}
            disabled={isLoading}
            className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#E2D2BD] text-[#0a0a0a] font-sans font-medium text-[11px] tracking-[0.25em] uppercase hover:bg-white transition-all shadow-2xl cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Weaving Neural Alignment...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#4A6FA5]" />
                <span>Synthesize Alignment Dynamics</span>
              </>
            )}
          </button>
        </div>

        {/* Alignment Output */}
        {result && (
          <div className="space-y-6 animate-fadeIn">
            {/* Title & Score Banner */}
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#E2D2BD] font-sans block opacity-80">
                  Harmonic Resonance Synthesis
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                  {result.alignmentTitle}
                </h3>
                <p className="text-xs text-[#E2D2BD]/75 mt-1 font-serif italic">
                  "{result.materialAnalogy}"
                </p>
              </div>

              <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-[#0a0a0a] border border-white/15 min-w-[130px]">
                <span className="font-serif text-4xl text-[#E2D2BD] font-light">
                  {result.harmonyScore}%
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#E2D2BD]/50 font-sans mt-1">
                  Resonance Index
                </span>
              </div>
            </div>

            {/* Core Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#E2D2BD] font-sans mb-3">
                  <Layers className="w-3.5 h-3.5 text-[#4A6FA5]" />
                  <span>Core Value Resonance</span>
                </div>
                <p className="text-xs text-[#E2D2BD]/90 font-light leading-relaxed">
                  {result.coreResonance}
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#4A6FA5] font-sans mb-3">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Creative Tension & Growth</span>
                </div>
                <p className="text-xs text-[#E2D2BD]/90 font-light leading-relaxed">
                  {result.creativeTension}
                </p>
              </div>
            </div>

            {/* Conversation Prompts */}
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#E2D2BD]/70 font-sans mb-4">
                <MessageSquare className="w-3.5 h-3.5 text-[#E2D2BD]" />
                <span>Bespoke First Conversation Invitations</span>
              </div>
              <div className="space-y-3">
                {result.conversationStarters.map((starter, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10 font-serif text-sm text-white italic flex items-start gap-3"
                  >
                    <ArrowRight className="w-4 h-4 text-[#4A6FA5] shrink-0 mt-0.5" />
                    <span>{starter}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
