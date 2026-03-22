import { buildSymbolIntent, getSymbolRules } from '../symbol/index.js';
import type { BrandInput, CreativeDirection, SymbolPrompt } from './types.js';

export function createSymbolPrompt(
  input: BrandInput,
  direction: CreativeDirection,
  seed: number,
  batchSize = 4
): SymbolPrompt {
  const positivePrompt = [
    direction.style.promptTemplate,
    direction.conceptNarrative,
    direction.symbolIntent,
    ...direction.style.constraints,
    ...direction.style.compositionRules,
    ...direction.monochromeRequirements,
    ...buildSymbolIntent(input, direction)
  ].join(' ');

  const negativePrompt = [
    ...direction.style.forbiddenElements,
    ...getSymbolRules(),
    'illustration',
    'mockup',
    'text',
    'watermark',
    'background clutter',
    'noise',
    'photorealistic render'
  ].join(', ');

  return {
    positivePrompt,
    negativePrompt,
    seed,
    width: 1024,
    height: 1024,
    steps: 40,
    guidanceScale: 7.5,
    batchSize
  };
}
