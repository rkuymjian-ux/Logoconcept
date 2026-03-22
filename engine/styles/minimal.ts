import type { StyleDefinition } from '../logo-engine/types.js';

export const minimalStyle: StyleDefinition = {
  id: 'minimal',
  label: 'Minimal Precision',
  promptTemplate:
    'Create a premium minimalist brand symbol with decisive geometry, strong silhouette, and immediate recognizability.',
  constraints: [
    'Single dominant symbol',
    'Flat graphic treatment only',
    'Works in black and white first',
    'Maximum two visual primitives'
  ],
  compositionRules: [
    'Centered composition',
    'Balanced negative space',
    'Uniform stroke weight if strokes are used',
    'No decorative framing'
  ],
  forbiddenElements: [
    'Text',
    'Gradients',
    '3D shading',
    'Mascots',
    'Illustrative scenes'
  ],
  typographyMood: ['modern sans', 'clean geometric']
};
