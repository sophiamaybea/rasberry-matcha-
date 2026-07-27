import React from 'react';
import { SceneId, Character } from '../types';
import { CHARACTERS, PERSONALITY_FRAGMENTS } from '../data/characters';
import { HarmonicAlignmentView } from './HarmonicAlignmentView';
import { CuratedExperienceView } from './CuratedExperienceView';
import { Sparkles, Feather, Compass, Layers, PhoneCall, ChevronDown, ArrowRight } from 'lucide-react';

interface ScrollNarrativeProps {
  currentScene: SceneId;
  onSelectScene: (scene: SceneId) => void;
  onOpenCorrespondence: () => void;
  onOpenDirectory: () => void;
  onOpenMembership: () => void;
}

export const ScrollNarrative: React.FC<ScrollNarrativeProps> = ({
  currentScene,
  onSelectScene,
  onOpenCorrespondence,
  onOpenDirectory,
  onOpenMembership,
}) => {
  return (
    <div className="relative z-10 w-full min-h-screen text-[#E2D2BD] font-sans selection:bg-[#4A6FA5] selection:text-white">
      {/* SCENE 1: The Garment & Weaving Threads */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative py-20">
        <div className="max-w-4xl space-y-8 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/15 backdrop-blur-2xl text-[10px] tracking-[0.4em] uppercase text-[#E2D2BD] font-sans">
            <Sparkles className="w-3.5 h-3.5 text-[#4A6FA5]" />
            <span>Relationship Intelligence Atelier</span>
          </div>

          <h1 className="font-serif text-6xl sm:text-8xl lg:text-9xl text-white font-light tracking-wider leading-[0.95] uppercase">
            HUMAN
          </h1>

          <p className="font-serif italic text-2xl sm:text-3xl text-[#E2D2BD]/90 max-w-2xl mx-auto font-light leading-relaxed">
            Transcend anything seen or felt before by crafting unparalleled connection for ambitious, thoughtful minds.
          </p>

          <p className="text-[10px] uppercase tracking-[0.4em] text-[#E2D2BD]/50 font-sans pt-2">
            2028 Paris Couture Atelier for the Soul
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
            <button
              id="btn-scene1-explore"
              onClick={() => onSelectScene(2)}
              className="px-8 py-4 rounded-full bg-[#E2D2BD] text-[#0a0a0a] font-sans font-medium text-[11px] tracking-[0.25em] uppercase hover:bg-white transition-all shadow-xl hover:shadow-2xl flex items-center gap-3 cursor-pointer"
            >
              <span>Explore Provenance</span>
              <ArrowRight className="w-4 h-4 text-[#4A6FA5]" />
            </button>

            <button
              id="btn-scene1-correspondence"
              onClick={onOpenCorrespondence}
              className="px-8 py-4 rounded-full bg-white/5 border border-white/20 text-white font-sans text-[11px] tracking-[0.25em] uppercase hover:border-white/50 backdrop-blur-xl transition-all flex items-center gap-3 cursor-pointer"
            >
              <Feather className="w-4 h-4 text-[#E2D2BD]" />
              <span>Tailor Correspondence</span>
            </button>
          </div>
        </div>

        <div
          onClick={() => onSelectScene(2)}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#E2D2BD]/50 hover:text-white cursor-pointer transition-colors font-sans"
        >
          <span>Scroll down to enter Scene Two</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* SCENE 2: Provenance & Floating Fragments */}
      <section className="min-h-screen flex flex-col justify-center px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#4A6FA5] font-sans block">
            Scene II — Personality Fragments
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-white font-light tracking-wide">
            Fragments of Provenance
          </h2>
          <p className="text-xs sm:text-sm text-[#E2D2BD]/75 font-light leading-relaxed max-w-xl mx-auto">
            Instead of standard profile cards, personality, values, communication cadences, and solitude boundaries float as illuminated glass fragments around each subject.
          </p>
        </div>

        {/* Fragment Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {PERSONALITY_FRAGMENTS.map((frag) => (
            <div
              key={frag.id}
              className="bg-white/5 border border-white/10 hover:border-white/30 rounded-2xl p-6 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] group shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.25em] font-sans text-[#E2D2BD]/80 mb-3">
                  <span>{frag.category}</span>
                  <span className="text-[#4A6FA5] font-mono">{(frag.threadStrength * 100).toFixed(0)}% Thread</span>
                </div>
                <h3 className="font-serif text-xl text-white font-light mb-3 group-hover:text-[#E2D2BD] transition-colors">
                  {frag.label}
                </h3>
                <p className="text-xs text-[#E2D2BD]/70 font-light leading-relaxed">
                  {frag.detail}
                </p>
              </div>

              {/* Neural thread intensity bar */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#E2D2BD] to-[#4A6FA5] rounded-full"
                    style={{ width: `${frag.threadStrength * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            id="btn-view-roster-scene2"
            onClick={onOpenDirectory}
            className="px-8 py-3.5 rounded-full bg-white/5 border border-white/20 text-xs tracking-[0.2em] font-sans uppercase text-[#E2D2BD] hover:border-white/50 backdrop-blur-xl transition-all cursor-pointer flex items-center gap-3"
          >
            <Layers className="w-4 h-4 text-[#4A6FA5]" />
            <span>View All 8 Haute Couture Subject Provenances</span>
          </button>
        </div>
      </section>

      {/* SCENE 3: Harmonic Alignment */}
      <section className="min-h-screen flex flex-col justify-center py-16">
        <div className="text-center mb-6">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#E2D2BD] font-sans block opacity-70">
            Scene III — Relational Chemistry
          </span>
        </div>
        <HarmonicAlignmentView />
      </section>

      {/* SCENE 4: Human Calls */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center max-w-4xl mx-auto">
        <div className="bg-white/5 border border-white/15 rounded-3xl p-10 sm:p-16 backdrop-blur-2xl shadow-2xl space-y-8">
          <div className="w-14 h-14 rounded-full bg-[#4A6FA5]/20 border border-[#4A6FA5] flex items-center justify-center mx-auto text-[#4A6FA5]">
            <PhoneCall className="w-6 h-6" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.4em] text-[#4A6FA5] font-sans block">
            Scene IV — Architecture of Encounter
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl text-white font-light">
            Human Calls
          </h2>

          <p className="font-serif italic text-xl sm:text-2xl text-[#E2D2BD]/90 max-w-2xl mx-auto font-light leading-relaxed">
            Instead of phone screens or noisy chat bubbles, architecture gently folds together. Connections are forged through high-fidelity scheduled encounters and structured presence.
          </p>

          <p className="text-[10px] text-[#E2D2BD]/50 font-sans uppercase tracking-[0.3em] max-w-lg mx-auto">
            Laser Light Beams Connecting Balconies in Florence & Paris
          </p>

          <div className="pt-4 flex justify-center">
            <button
              id="btn-apply-scene4"
              onClick={onOpenMembership}
              className="px-8 py-4 rounded-full bg-[#E2D2BD] text-[#0a0a0a] font-sans font-medium text-[11px] tracking-[0.25em] uppercase hover:bg-white transition-all cursor-pointer shadow-xl"
            >
              Request Access to Human Calls
            </button>
          </div>
        </div>
      </section>

      {/* SCENE 5: Correspondence Studio Feature Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24 max-w-5xl mx-auto text-center">
        <div className="space-y-8">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#E2D2BD] font-sans block opacity-70">
            Scene V — The Atelier Communication Studio
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl text-white font-light">
            The Correspondence Atelier
          </h2>

          <p className="font-serif italic text-xl sm:text-2xl text-[#E2D2BD]/90 max-w-2xl mx-auto font-light leading-relaxed">
            Fabric moves through the air. Letters become embroidered golden thread. The AI tailors difficult or delicate messages—removing unnecessary friction while elevating clarity and emotional dignity.
          </p>

          <div className="pt-6">
            <button
              id="btn-open-correspondence-scene5"
              onClick={onOpenCorrespondence}
              className="px-10 py-4.5 rounded-full bg-[#E2D2BD] text-[#0a0a0a] font-sans font-medium text-[11px] tracking-[0.25em] uppercase hover:bg-white transition-all shadow-2xl flex items-center gap-3 mx-auto cursor-pointer"
            >
              <Feather className="w-4 h-4 text-[#4A6FA5]" />
              <span>Launch Correspondence Studio</span>
            </button>
          </div>
        </div>
      </section>

      {/* SCENE 6: Curated Date Experiences */}
      <section className="min-h-screen flex flex-col justify-center py-16">
        <div className="text-center mb-6">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#4A6FA5] font-sans block">
            Scene VI — Atmosphere & Encounters
          </span>
        </div>
        <CuratedExperienceView />
      </section>

      {/* SCENE 7: The Finale & Application */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-28 text-center max-w-4xl mx-auto relative">
        <div className="space-y-10 animate-fadeIn">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#E2D2BD] font-sans block opacity-70">
            Scene VII — The Finale
          </span>

          <h2 className="font-serif text-5xl sm:text-7xl text-white font-light leading-tight">
            “Every relationship begins with understanding.”
          </h2>

          <p className="font-serif italic text-xl sm:text-2xl text-[#E2D2BD]/80 max-w-2xl mx-auto font-light">
            Step inside the digital flagship where human depth is honored as the ultimate luxury.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
            <button
              id="btn-scene7-apply"
              onClick={onOpenMembership}
              className="px-10 py-4.5 rounded-full bg-[#E2D2BD] text-[#0a0a0a] font-sans font-medium text-[11px] tracking-[0.25em] uppercase hover:bg-white transition-all shadow-2xl cursor-pointer"
            >
              Apply for Confidential Access
            </button>

            <button
              id="btn-scene7-roster"
              onClick={onOpenDirectory}
              className="px-8 py-4.5 rounded-full bg-white/5 border border-white/20 text-white font-sans text-[11px] tracking-[0.25em] uppercase hover:border-white/50 backdrop-blur-xl transition-all cursor-pointer"
            >
              View Atelier Figures
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
