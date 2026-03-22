import type { StyleDefinition } from '../logo-engine/types.js';

export const boldStyle: StyleDefinition = {
  id: 'bold',
  label: 'Bold Impact',
  promptTemplate:
    'Create a bold iconic brand mark with confident massing, memorable silhouette, and assertive contrast.',
  constraints: [
    'Simple blocky silhouette',
    'Maximum three major shapes',
    'Instant recognition in one glance',
    'No fragile detail'
  ],
  compositionRules: [
    'Centered and stable',
    'Weighted visual balance',
    'Dominant primary shape with one supporting gesture',
    'Clear figure-ground contrast'
  ],
  forbiddenElements: [
    'Text',
    'Thin linework',
    'Illustrative textures',
    'Background scenes',
    'Busy ornament'
  ],
  typographyMood: ['display sans', 'strong grotesk']
};
