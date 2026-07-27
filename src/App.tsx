import React, { useState, useEffect } from 'react';
import { SceneId } from './types';
import { ThreeCanvas } from './components/ThreeCanvas';
import { HeaderNav } from './components/HeaderNav';
import { AudioSoundscape } from './components/AudioSoundscape';
import { ScrollNarrative } from './components/ScrollNarrative';
import { CorrespondenceStudio } from './components/CorrespondenceStudio';
import { CharacterDirectoryModal } from './components/CharacterDirectoryModal';
import { MembershipModal } from './components/MembershipModal';

export default function App() {
  const [currentScene, setCurrentScene] = useState<SceneId>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Modal states
  const [isCorrespondenceOpen, setIsCorrespondenceOpen] = useState<boolean>(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState<boolean>(false);
  const [isMembershipOpen, setIsMembershipOpen] = useState<boolean>(false);

  // Track mouse coordinates for 3D cursor light orb
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track page scroll progress and update active scene
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;

      const currentScroll = window.scrollY;
      const progress = Math.min(Math.max(currentScroll / totalScroll, 0), 1);
      setScrollProgress(progress);

      // Determine scene from scroll progress
      if (progress < 0.14) setCurrentScene(1);
      else if (progress < 0.28) setCurrentScene(2);
      else if (progress < 0.42) setCurrentScene(3);
      else if (progress < 0.56) setCurrentScene(4);
      else if (progress < 0.70) setCurrentScene(5);
      else if (progress < 0.84) setCurrentScene(6);
      else setCurrentScene(7);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectScene = (sceneId: SceneId) => {
    setCurrentScene(sceneId);
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = ((sceneId - 1) / 6) * totalScroll;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <div className="relative bg-[#0e0d0c] min-h-screen text-[#e2d2bd] font-sans overflow-x-hidden">
      {/* 3D WebGL Canvas Layer */}
      <ThreeCanvas
        currentScene={currentScene}
        scrollProgress={scrollProgress}
        mousePosition={mousePosition}
      />

      {/* Header Navigation */}
      <HeaderNav
        currentScene={currentScene}
        onSelectScene={handleSelectScene}
        onOpenDirectory={() => setIsDirectoryOpen(true)}
        onOpenMembership={() => setIsMembershipOpen(true)}
      />

      {/* Main Cinematic Scroll Narrative */}
      <main>
        <ScrollNarrative
          currentScene={currentScene}
          onSelectScene={handleSelectScene}
          onOpenCorrespondence={() => setIsCorrespondenceOpen(true)}
          onOpenDirectory={() => setIsDirectoryOpen(true)}
          onOpenMembership={() => setIsMembershipOpen(true)}
        />
      </main>

      {/* Atmospheric Audio Soundscape Controller */}
      <AudioSoundscape />

      {/* Modals & Studios */}
      {isCorrespondenceOpen && (
        <CorrespondenceStudio onClose={() => setIsCorrespondenceOpen(false)} />
      )}

      {isDirectoryOpen && (
        <CharacterDirectoryModal
          onClose={() => setIsDirectoryOpen(false)}
          onSelectCharacterForAlignment={() => {
            setIsDirectoryOpen(false);
            handleSelectScene(3); // Navigate to Harmonic Alignment scene
          }}
        />
      )}

      {isMembershipOpen && (
        <MembershipModal onClose={() => setIsMembershipOpen(false)} />
      )}
    </div>
  );
}
