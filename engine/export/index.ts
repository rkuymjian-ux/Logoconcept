import type { ExportArtifact, RefinedLogo, TypographySpec } from '../logo-engine/types.js';

export function buildExports(logo: RefinedLogo, typography: TypographySpec): ExportArtifact[] {
  const base = logo.refinedAssetUri.replace(/\?.*$/, '');
  const slug = typography.wordmark.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  return [
    {
      format: 'png',
      uri: `${base.replace(/\.png$/, '')}-${slug}.png`,
      transparent: true
    },
    {
      format: 'svg',
      uri: `${base.replace(/\.png$/, '')}-${slug}.svg`,
      transparent: true
    }
  ];
}
