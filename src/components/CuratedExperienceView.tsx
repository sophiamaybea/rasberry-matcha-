import React, { useState } from 'react';
import { CuratedExperienceResult } from '../types';
import { Compass, MapPin, Wine, Music, Sparkles, RefreshCw, Clock } from 'lucide-react';

interface CuratedExperienceViewProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const CuratedExperienceView: React.FC<CuratedExperienceViewProps> = ({
  onClose,
  isModal = false,
}) => {
  const [location, setLocation] = useState<string>('Florence');
  const [mood, setMood] = useState<string>('Atmospheric & Intellectual');
  const [interests, setInterests] = useState<string>('Renaissance architecture, private wine archives, quiet chamber music');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<CuratedExperienceResult | null>({
    experienceTitle: 'Twilight Reverie at the Medici Observatory',
    settingDescription:
      'A private dusk access to a 16th-century rooftop observatory overlooking the terracotta roofs of Florence. Warm travertine stone catching the dying embers of sunlight while subtle cello harmonics reverberate.',
    curatedProgression: [
      {
        phase: '1. Arrival & Threshold',
        detail: 'Entry through an unmarked iron gate into an illuminated garden courtyard serving aged Tuscan vintage.',
      },
      {
        phase: '2. Private Viewing',
        detail: 'Access to astronomical manuscripts and an open-air telescope session with an astrophysicist-curator.',
      },
      {
        phase: '3. Late Reflection',
        detail: 'An unhurried conversation on the terrace over dark cocoa and single-origin tea under open stars.',
      },
    ],
    sensoryPalette: ['Warm Travertine', 'Aged Amber Wine', 'Quiet Cello', 'Smoked Oak', 'Dusk Violet'],
    signaturePrompt: '“If this evening could leave one single lingering impression in your memory, what would you choose it to be?”',
  });

  const handleCurate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/curate-experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, mood, mutualInterests: interests }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error curating experience:', err);
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
            <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-sans text-[#4A6FA5] mb-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Visual Date & Experience Curator</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-light">
              Not Listing Restaurants. Curating Atmospheres.
            </h2>
            <p className="text-xs text-[#E2D2BD]/70 mt-1.5 font-light max-w-2xl leading-relaxed">
              Designing bespoke real-world encounters rooted in architectural beauty, sensory nuance, and shared curiosity.
            </p>
          </div>
          {isModal && onClose && (
            <button
              id="btn-close-experience-modal"
              onClick={onClose}
              className="text-[#E2D2BD]/50 hover:text-white text-xl p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleCurate} className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-[#E2D2BD]/70 font-sans mb-2">
              Sanctuary City
            </label>
            <select
              id="select-experience-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/15 rounded-2xl p-3.5 text-xs text-white focus:outline-none focus:border-[#E2D2BD]"
            >
              <option value="Florence">Florence, Italy</option>
              <option value="Paris">Paris, France</option>
              <option value="Kyoto">Kyoto, Japan</option>
              <option value="London">London, UK</option>
              <option value="Zurich">Zurich, Switzerland</option>
              <option value="New York">New York, USA</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-[#E2D2BD]/70 font-sans mb-2">
              Desired Atmosphere & Mood
            </label>
            <select
              id="select-experience-mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/15 rounded-2xl p-3.5 text-xs text-white focus:outline-none focus:border-[#E2D2BD]"
            >
              <option value="Atmospheric & Intellectual">Atmospheric & Intellectual</option>
              <option value="Intimate & Architectural">Intimate & Architectural</option>
              <option value="Avant-Garde Arts & Cinema">Avant-Garde Arts & Cinema</option>
              <option value="Unhurried Salon & Wine Heritage">Unhurried Salon & Wine Heritage</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-[#E2D2BD]/70 font-sans mb-2">
              Shared Curiosities
            </label>
            <input
              id="input-experience-interests"
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-2xl p-3.5 text-xs text-white focus:outline-none focus:border-[#E2D2BD]"
              placeholder="e.g. Architecture, tea ceremony"
            />
          </div>

          <div className="sm:col-span-3 flex justify-end mt-2">
            <button
              id="btn-submit-curate-experience"
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#E2D2BD] text-[#0a0a0a] font-sans font-medium text-[11px] tracking-[0.2em] uppercase hover:bg-white disabled:opacity-50 transition-all shadow-2xl cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Curating Atmosphere...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#4A6FA5]" />
                  <span>Curate Bespoke Experience</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Output */}
        {result && (
          <div className="space-y-6 animate-fadeIn">
            {/* Title & Sensory Palette */}
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-sans text-[#E2D2BD] mb-1.5 opacity-80">
                <MapPin className="w-3.5 h-3.5 text-[#4A6FA5]" />
                <span>Curated Encounter — {location}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl text-white font-light my-2">
                {result.experienceTitle}
              </h3>
              <p className="text-xs text-[#E2D2BD]/80 font-light leading-relaxed my-3">
                {result.settingDescription}
              </p>

              {/* Palette pills */}
              <div className="flex flex-wrap gap-2.5 mt-5 pt-5 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#E2D2BD]/50 font-sans mr-2 self-center">
                  Sensory Palette:
                </span>
                {result.sensoryPalette?.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full bg-[#0a0a0a] border border-white/15 text-[11px] text-[#E2D2BD] font-serif italic"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Progression */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {result.curatedProgression?.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#4A6FA5] font-sans block mb-2.5">
                      {step.phase}
                    </span>
                    <p className="text-xs text-[#E2D2BD]/90 font-light leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                  <Clock className="w-3.5 h-3.5 text-[#E2D2BD]/30 mt-4 self-end" />
                </div>
              ))}
            </div>

            {/* Signature Prompt */}
            <div className="bg-[#4A6FA5]/15 border border-[#4A6FA5]/30 rounded-2xl p-6 font-serif text-center italic text-base text-white">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#4A6FA5] block mb-1.5 not-italic">
                Signature Encounter Conversation Prompt
              </span>
              {result.signaturePrompt}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
