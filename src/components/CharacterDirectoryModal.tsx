import React, { useState } from 'react';
import { Character } from '../types';
import { CHARACTERS } from '../data/characters';
import { Users, Sparkles, MapPin, Feather, Quote, Shield } from 'lucide-react';

interface CharacterDirectoryModalProps {
  onClose: () => void;
  onSelectCharacterForAlignment?: (char: Character) => void;
}

export const CharacterDirectoryModal: React.FC<CharacterDirectoryModalProps> = ({
  onClose,
  onSelectCharacterForAlignment,
}) => {
  const [selectedChar, setSelectedChar] = useState<Character>(CHARACTERS[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0a0a0a]/90 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[92vh] text-[#E2D2BD]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-sans text-[#4A6FA5] mb-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>Atelier Roster & Character Provenance</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-light">
              Recurring Figures of Presence
            </h2>
            <p className="text-xs text-[#E2D2BD]/70 mt-1.5 font-light max-w-xl leading-relaxed">
              Every subject embodies intelligence, mysterious poise, and high-fashion couture framing.
            </p>
          </div>
          <button
            id="btn-close-directory-modal"
            onClick={onClose}
            className="text-[#E2D2BD]/50 hover:text-white text-xl p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Character Selector Grid */}
          <div className="md:col-span-5 space-y-3 overflow-y-auto max-h-[550px] pr-2">
            {CHARACTERS.map((char) => (
              <div
                key={char.id}
                id={`character-card-${char.id}`}
                onClick={() => setSelectedChar(char)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                  selectedChar.id === char.id
                    ? 'bg-white/10 border-[#E2D2BD] shadow-xl'
                    : 'bg-white/5 border-white/10 hover:border-white/30'
                }`}
              >
                <img
                  src={char.imageSrc}
                  alt={char.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-18 object-cover rounded-xl border border-white/20 shrink-0"
                />
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#E2D2BD]/80 font-sans block">
                    {char.role}
                  </span>
                  <h4 className="font-serif text-lg text-white font-light">{char.name}</h4>
                  <p className="text-[11px] text-[#E2D2BD]/60 font-light truncate max-w-[200px]">
                    {char.fashionMaterial}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Character Detail Sheet */}
          <div className="md:col-span-7 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-5">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#4A6FA5] font-sans block mb-1">
                    {selectedChar.role}
                  </span>
                  <h3 className="font-serif text-3xl text-white font-light">{selectedChar.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#E2D2BD]/70 font-light mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#E2D2BD]" />
                    <span>{selectedChar.location}</span>
                  </div>
                </div>

                <div className="px-4 py-1.5 rounded-full bg-[#0a0a0a] border border-white/15 text-xs text-[#E2D2BD] font-serif italic text-right">
                  {selectedChar.fashionMaterial}
                </div>
              </div>

              {/* Editorial Image & Bio */}
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <img
                  src={selectedChar.imageSrc}
                  alt={selectedChar.name}
                  referrerPolicy="no-referrer"
                  className="w-full sm:w-44 h-56 object-cover rounded-2xl border border-white/20 shadow-2xl shrink-0"
                />
                <div className="space-y-4 text-xs text-[#E2D2BD]/90">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#E2D2BD]/50 font-sans block mb-1">
                      Provenance & Identity
                    </span>
                    <p className="font-light leading-relaxed">{selectedChar.provenance}</p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#E2D2BD]/50 font-sans block mb-1">
                      Communication Style
                    </span>
                    <p className="font-light leading-relaxed">{selectedChar.communicationStyle}</p>
                  </div>
                </div>
              </div>

              {/* Quote & Values */}
              <blockquote className="bg-[#0a0a0a]/80 border-l-2 border-[#E2D2BD] p-4 rounded-r-2xl font-serif italic text-sm text-white mb-6">
                "{selectedChar.quote}"
              </blockquote>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedChar.values.map((val, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1 rounded-full bg-[#0a0a0a] border border-white/15 text-[10px] text-[#E2D2BD] font-sans uppercase tracking-[0.2em]"
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>

            {/* Action */}
            {onSelectCharacterForAlignment && (
              <button
                id="btn-select-for-alignment"
                onClick={() => {
                  onSelectCharacterForAlignment(selectedChar);
                  onClose();
                }}
                className="w-full py-4 rounded-full bg-[#E2D2BD] text-[#0a0a0a] font-sans font-medium text-[11px] tracking-[0.2em] uppercase hover:bg-white transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#4A6FA5]" />
                <span>Analyze Alignment with {selectedChar.name}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
