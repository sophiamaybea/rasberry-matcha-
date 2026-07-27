import React from 'react';
import { SceneId } from '../types';
import { Sparkles, Users, Key } from 'lucide-react';

interface HeaderNavProps {
  currentScene: SceneId;
  onSelectScene: (scene: SceneId) => void;
  onOpenDirectory: () => void;
  onOpenMembership: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentScene,
  onSelectScene,
  onOpenDirectory,
  onOpenMembership,
}) => {
  const scenes: { id: SceneId; label: string }[] = [
    { id: 1, label: 'Atelier' },
    { id: 2, label: 'Provenance' },
    { id: 3, label: 'Alignment' },
    { id: 4, label: 'Calls' },
    { id: 5, label: 'Studio' },
    { id: 6, label: 'Curations' },
    { id: 7, label: 'Sanctuary' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-8 lg:px-12 py-6 flex items-center justify-between border-b border-white/10 bg-[#0a0a0a]/75 backdrop-blur-2xl transition-all">
      {/* Brand & Identity */}
      <div className="flex flex-col cursor-pointer group" onClick={() => onSelectScene(1)}>
        <span className="font-serif text-[22px] sm:text-[24px] tracking-[0.2em] font-light uppercase text-[#E2D2BD] group-hover:text-white transition-colors">
          HUMAN
        </span>
        <span className="text-[9px] sm:text-[10px] tracking-[0.5em] font-sans opacity-50 uppercase mt-0.5 text-[#E2D2BD]">
          Relationship Intelligence
        </span>
      </div>

      {/* Scene Navigation Sequence */}
      <nav className="hidden lg:flex items-center space-x-8 text-[11px] tracking-[0.3em] font-sans uppercase">
        {scenes.map((s) => (
          <button
            key={s.id}
            id={`nav-scene-${s.id}`}
            onClick={() => onSelectScene(s.id)}
            className={`transition-all duration-300 relative py-1 cursor-pointer ${
              currentScene === s.id
                ? 'text-[#E2D2BD] opacity-100 font-medium'
                : 'text-[#E2D2BD] opacity-60 hover:opacity-100'
            }`}
          >
            {s.label}
            {currentScene === s.id && (
              <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#E2D2BD] animate-fadeIn" />
            )}
          </button>
        ))}
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <button
          id="btn-atelier-roster"
          onClick={onOpenDirectory}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 hover:border-white/40 bg-white/5 text-[#E2D2BD] text-[11px] tracking-[0.2em] font-sans uppercase backdrop-blur-md transition-all cursor-pointer"
        >
          <Users className="w-3.5 h-3.5 text-[#4A6FA5]" />
          <span className="hidden md:inline">Atelier Roster</span>
        </button>

        <button
          id="btn-request-access"
          onClick={onOpenMembership}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#E2D2BD] text-[#0a0a0a] hover:bg-white text-[11px] font-sans tracking-[0.2em] uppercase transition-all shadow-lg hover:shadow-2xl cursor-pointer"
        >
          <Key className="w-3.5 h-3.5" />
          <span>Apply Access</span>
        </button>
      </div>
    </header>
  );
};
