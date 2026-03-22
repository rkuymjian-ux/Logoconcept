import type { BrandInput, CreativeDirection } from '../logo-engine/types.js';

const SYMBOL_RULES = [
  'Never include text, letters, numerals, or wordmarks.',
  'Centered composition only.',
  'Simple scalable silhouette with minimal detail.',
  'Readable at very small sizes.',
  'No mockups, no backgrounds, no photography.'
];

export function buildSymbolIntent(input: BrandInput, direction: CreativeDirection): string[] {
  return [
    `Brand industry context: ${input.industry}.`,
    `Target symbol idea: ${direction.symbolIntent}.`,
    `Keywords: ${input.keywords.join(', ')}.`,
    ...SYMBOL_RULES
  ];
}

export function getSymbolRules(): string[] {
  return [...SYMBOL_RULES];
}
