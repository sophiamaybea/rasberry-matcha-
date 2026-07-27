export type SceneId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Character {
  id: string;
  name: string;
  role: string; // e.g. "The Muse", "The Architect", "The Collector", "The Luminary"
  title: string; // e.g. "Ivory Couture & Neural Resonance"
  provenance: string; // Deep editorial background
  location: string;
  imageSrc: string;
  values: string[];
  communicationStyle: string;
  boundaries: string;
  travel: string;
  curiosities: string[];
  fashionMaterial: string; // e.g., "Carved Ivory Silk & Liquid Gold Thread"
  quote: string;
}

export interface PersonalityFragment {
  id: string;
  category: 'Values' | 'Communication' | 'Curiosity' | 'Boundaries' | 'Travel' | 'Intellect';
  label: string;
  detail: string;
  threadStrength: number; // 0.1 to 1.0 for golden glow
  characterId: string;
}

export interface TailoredCorrespondenceResult {
  tailoredMessage: string;
  keyShift: string;
  emotionalNuance: string;
  atelierNote: string;
}

export interface HarmonicAlignmentResult {
  alignmentTitle: string;
  harmonyScore: number;
  coreResonance: string;
  creativeTension: string;
  conversationStarters: string[];
  materialAnalogy: string;
}

export interface CuratedExperienceResult {
  experienceTitle: string;
  settingDescription: string;
  curatedProgression: { phase: string; detail: string }[];
  sensoryPalette: string[];
  signaturePrompt: string;
}
