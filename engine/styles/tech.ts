import type { StyleDefinition } from '../logo-engine/types.js';

export const techStyle: StyleDefinition = {
  id: 'tech',
  label: 'Future Systems',
  promptTemplate:
    'Create a refined technology symbol with modular geometry, engineered precision, and disciplined futuristic character.',
  constraints: [
    'Symbol only',
    'Geometric forms with crisp edges',
    'High legibility at favicon size',
    'Monochrome structure before color'
  ],
  compositionRules: [
    'Centered and grid-aligned',
    'Use repeatable angles or arcs',
    'Maintain strong outer silhouette',
    'Avoid visual clutter in interior details'
  ],
  forbiddenElements: [
    'Text',
    'Lens flares',
    'Photorealism',
    'Circuit-board overload',
    'Complex backgrounds'
  ],
  typographyMood: ['neo-grotesk sans', 'technical sans']
};
