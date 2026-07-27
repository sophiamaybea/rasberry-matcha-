import { Character, PersonalityFragment } from '../types';

import museImg from '../assets/images/muse_portrait_1785181535435.jpg';
import architectImg from '../assets/images/architect_portrait_1785181548142.jpg';
import collectorImg from '../assets/images/collector_portrait_1785181559638.jpg';
import luminaryImg from '../assets/images/luminary_portrait_1785181571655.jpg';

export const CHARACTERS: Character[] = [
  {
    id: 'muse',
    name: 'Elena Vance',
    role: 'The Muse',
    title: 'Renaissance Proportion & Neural Drapery',
    provenance: 'Sculptural silk tailored like carved marble with liquid gold neural pathway embroidery following organic thought patterns. She stands in Florentine travertine architecture with total presence and quiet poise.',
    location: 'Florence & Paris Atelier',
    imageSrc: museImg,
    values: ['Architectural Grace', 'Epistemic Depth', 'Uncompromising Integrity'],
    communicationStyle: 'Measured, contemplative, deeply attentive. Prefers long, thoughtful written reflections over immediate banter.',
    boundaries: 'Protects her solitude fiercely; connects through quiet, uninterrupted focus rather than high-frequency noise.',
    travel: 'Florentine archives, private villas in Lake Como, Kyoto paper mills.',
    curiosities: ['Sacred geometry in Renaissance facades', 'Neural networks as textile patterns', 'Acoustics of ancient stone'],
    fashionMaterial: 'Carved Ivory Silk & Liquid Gold Embroidery',
    quote: 'True presence does not demand space—it alters the atmosphere of the room.'
  },
  {
    id: 'architect',
    name: 'Julian Thorne',
    role: 'The Architect',
    title: 'Florentine Nobility & Modern Structuralism',
    provenance: 'Wearing sharp charcoal wool tailoring with minimal smoked bronze lapels. He approaches human connection with the rigor of an architect and the quiet warmth of a patron of the arts.',
    location: 'Zurich & Milan',
    imageSrc: architectImg,
    values: ['Structural Clarity', 'Purposeful Silence', 'Subtle Distinction'],
    communicationStyle: 'Direct, candid, deeply grounded. Expresses care through actions and meticulously planned physical environments.',
    boundaries: 'Clear separation between public enterprise and private sanctuary; values explicit commitments.',
    travel: 'Alpine modernism, Scandinavian timber pavilions, Tokyo architectural tours.',
    curiosities: ['Brutalist interior sanctuaries', 'Aged smoked glass', 'Generative spatial acoustics'],
    fashionMaterial: 'Deep Charcoal Wool & Smoked Bronze Accents',
    quote: 'Structure is not constraint—it is the frame through which freedom becomes visible.'
  },
  {
    id: 'collector',
    name: 'Soren de la Tour',
    role: 'The Collector',
    title: 'Curator Poise & Champagne Gold Tailoring',
    provenance: 'Silver hair framing extraordinary champagne gold tailored lines. Museum curator energy with profound appreciation for provenance, historical artifacts, and human emotional nuance.',
    location: 'Paris, Marais District',
    imageSrc: collectorImg,
    values: ['Emotional Provenance', 'Intellectual Curiosity', 'Timeless Elegance'],
    communicationStyle: 'Witty, articulate, richly storied. Loves discussing ideas, cinema, and hidden cultural histories.',
    boundaries: 'Rejects superficial small talk; seeks conversations that leave an indelible mark.',
    travel: 'Venice Biennale, private Parisian salons, Kyoto craft heritage gardens.',
    curiosities: ['Lost 19th-century epistolary journals', 'Rare scent formulations', 'Sculptural metalwork'],
    fashionMaterial: 'Champagne Gold Silk & Schiaparelli Lapels',
    quote: 'The rarest luxury in modern life is an unhurried, deeply perceptive mind.'
  },
  {
    id: 'luminary',
    name: 'Gabriel Mercer',
    role: 'The Luminary',
    title: 'Celestial Embroidery & Dark Travertine',
    provenance: 'Midnight navy wool evening coat with iridescent sapphire thread constellations hand-stitched along the shoulder line. A magnetic figure focused on sustainable innovation and human connection.',
    location: 'London & Geneva',
    imageSrc: luminaryImg,
    values: ['Cosmic Perspective', 'Quiet Philanthropy', 'Empathic Depth'],
    communicationStyle: 'Warm, resonant, evocative. Uses metaphor and storytelling to bridge complex ideas.',
    boundaries: 'Keeps social circles intimate and high-trust; highly values discretion.',
    travel: 'Atacama Desert stargazing observatories, Scottish highlands, Geneva lakeshore.',
    curiosities: ['Orbital mechanics', 'Chamber music compositions', 'Vintage horology'],
    fashionMaterial: 'Midnight Navy Wool & Sapphire Thread Constellations',
    quote: 'We are all orbiting one another, looking for the gravity that feels like home.'
  },
  {
    id: 'alchemist',
    name: 'Camille Saint-Germain',
    role: 'The Alchemist',
    title: 'Liquid Bronze & Organic Synthesis',
    provenance: 'Fluid metallic jersey that shifts under light like molten bronze. A researcher in bio-materials and human empathy algorithms who views conversations as chemical transformations.',
    location: 'Basel & New York',
    imageSrc: collectorImg, // using high-end fallback
    values: ['Relational Chemistry', 'Experimental Artistry', 'Raw Vulnerability'],
    communicationStyle: 'Expressive, intellectually daring, emotionally translucent.',
    boundaries: 'Insists on complete authenticity; disengages when performance replaces presence.',
    travel: 'Icelandic volcanic hot springs, Hudson Valley art retreats, Berlin sound labs.',
    curiosities: ['Scent memory psychology', 'Botanical alchemy', 'Interactive kinetic installations'],
    fashionMaterial: 'Molten Bronze Jersey & Bio-Resin Necklines',
    quote: 'Transformation occurs when two people drop the armor and let the heat of truth refine them.'
  },
  {
    id: 'visionary',
    name: 'Alexander Sterling',
    role: 'The Visionary',
    title: 'Monolithic Silhouette & Smoked Glass',
    provenance: 'Structured double-breasted coat in smoked slate Cashmere with sharp architectural lines. A pioneer in human-centered AI systems.',
    location: 'Tokyo & San Francisco',
    imageSrc: architectImg,
    values: ['Technological Humanism', 'Intentionality', 'Quiet Mastery'],
    communicationStyle: 'Precise, calm, deeply attentive with zero wasted words.',
    boundaries: 'Reserves deep engagement for shared long-term visions.',
    travel: 'Naoshima Art Island, Kyoto zen gardens, Swiss mountain retreats.',
    curiosities: ['Mindfulness in high-frequency trading', 'Japanese joinery', 'Generative ambient sound'],
    fashionMaterial: 'Smoked Slate Cashmere & Laser-Cut Titanium Trim',
    quote: 'Technology should recede like water; what remains is the depth of the human bond.'
  }
];

export const PERSONALITY_FRAGMENTS: PersonalityFragment[] = [
  { id: 'f1', category: 'Values', label: 'Epistemic Depth', detail: 'Desires conversations that dig beneath social surfaces into core principles.', threadStrength: 0.95, characterId: 'muse' },
  { id: 'f2', category: 'Communication', label: 'Unhurried Cadence', detail: 'Prefers deep written reflections over rapid-fire notifications.', threadStrength: 0.88, characterId: 'muse' },
  { id: 'f3', category: 'Boundaries', label: 'Solitude Sanctuary', detail: 'Requires uninterrupted periods of quiet contemplation to regenerate.', threadStrength: 0.92, characterId: 'muse' },
  { id: 'f4', category: 'Values', label: 'Structural Integrity', detail: 'Believes consistency between words and action is the highest elegance.', threadStrength: 0.90, characterId: 'architect' },
  { id: 'f5', category: 'Curiosity', label: 'Architectural Sanctuaries', detail: 'Fascinated by how light and stone dictate human emotional feeling.', threadStrength: 0.85, characterId: 'architect' },
  { id: 'f6', category: 'Intellect', label: 'Cultural Provenance', detail: 'Evaluates life through historical continuity, art history, and rare books.', threadStrength: 0.91, characterId: 'collector' },
  { id: 'f7', category: 'Travel', label: 'Venetian & Kyoto Heritage', detail: 'Seeks immersive journeys centered on ancient craftsmanship.', threadStrength: 0.87, characterId: 'collector' },
  { id: 'f8', category: 'Communication', label: 'Empathic Metaphor', detail: 'Uses poetic clarity to communicate delicate emotional nuances.', threadStrength: 0.94, characterId: 'luminary' }
];
