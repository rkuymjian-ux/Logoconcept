import { getStyleDefinition } from '../styles/index.js';
import type { BrandInput, CreativeDirection } from './types.js';

export function buildCreativeDirection(input: BrandInput): CreativeDirection {
  const style = getStyleDefinition(input.style);
  const values = input.values?.join(', ') ?? 'clarity, confidence, distinctiveness';
  const palette = input.palette?.join(', ') ?? 'monochrome-first';

  return {
    style,
    conceptNarrative: `${input.brandName} should feel ${values} for ${input.audience ?? 'a modern audience'} in ${input.industry}.`,
    symbolIntent: `Abstract symbol expressing ${input.keywords.join(', ')} through ${style.label.toLowerCase()} cues.`,
    silhouetteTargets: ['memorable outer contour', 'small-size recognizability', 'balanced negative space'],
    monochromeRequirements: ['must work in solid black', 'must remain legible in one color'],
    promptFragments: [style.promptTemplate, `Preferred palette: ${palette}.`]
  };
}
