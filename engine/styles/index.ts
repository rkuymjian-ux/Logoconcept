import { boldStyle } from './bold.js';
import { minimalStyle } from './minimal.js';
import { techStyle } from './tech.js';
import type { LogoStyleId, StyleDefinition } from '../logo-engine/types.js';

const styleRegistry: Record<LogoStyleId, StyleDefinition> = {
  minimal: minimalStyle,
  tech: techStyle,
  bold: boldStyle
};

export function getStyleDefinition(style: LogoStyleId): StyleDefinition {
  return styleRegistry[style];
}

export function listStyleDefinitions(): StyleDefinition[] {
  return Object.values(styleRegistry);
}
