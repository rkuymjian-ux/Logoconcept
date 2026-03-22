import type { BrandInput, RefinedLogo, TypographySpec } from '../logo-engine/types.js';

const FONT_MAP = {
  minimal: ['Inter', 'Manrope'],
  tech: ['Space Grotesk', 'IBM Plex Sans'],
  bold: ['Sora', 'General Sans']
} as const;

export function buildTypography(input: BrandInput, _logo: RefinedLogo): TypographySpec {
  const fontPair = FONT_MAP[input.style];
  return {
    fontPair: [fontPair[0], fontPair[1]],
    wordmark: input.brandName,
    tracking: input.style === 'bold' ? 10 : 20,
    kerning: input.style === 'tech' ? 'tight' : 'normal',
    lockup: input.tagline ? 'stacked' : 'horizontal',
    alignment: 'center'
  };
}
