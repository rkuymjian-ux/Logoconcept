export type LogoStyleId = 'minimal' | 'tech' | 'bold';

export interface BrandInput {
  brandName: string;
  tagline?: string;
  industry: string;
  keywords: string[];
  style: LogoStyleId;
  palette?: string[];
  audience?: string;
  values?: string[];
}

export interface StyleDefinition {
  id: LogoStyleId;
  label: string;
  promptTemplate: string;
  constraints: string[];
  compositionRules: string[];
  forbiddenElements: string[];
  typographyMood: string[];
}

export interface CreativeDirection {
  style: StyleDefinition;
  conceptNarrative: string;
  symbolIntent: string;
  silhouetteTargets: string[];
  monochromeRequirements: string[];
  promptFragments: string[];
}

export interface SymbolPrompt {
  positivePrompt: string;
  negativePrompt: string;
  seed: number;
  width: number;
  height: number;
  steps: number;
  guidanceScale: number;
  batchSize: number;
}

export interface GeneratedCandidate {
  id: string;
  seed: number;
  prompt: SymbolPrompt;
  assetUri: string;
  metadata: Record<string, string | number | boolean>;
}

export interface EvaluationBreakdown {
  simplicityScore: number;
  symmetryScore: number;
  contrastScore: number;
  recognizabilityScore: number;
  totalScore: number;
  accepted: boolean;
  rejectionReasons: string[];
}

export interface EvaluatedCandidate extends GeneratedCandidate {
  evaluation: EvaluationBreakdown;
}

export interface RefinedLogo {
  candidate: EvaluatedCandidate;
  refinedAssetUri: string;
  vectorAssetUri?: string;
  refinements: string[];
}

export interface TypographySpec {
  fontPair: [string, string?];
  wordmark: string;
  tracking: number;
  kerning: 'tight' | 'normal' | 'wide';
  lockup: 'horizontal' | 'stacked';
  alignment: 'center' | 'left';
}

export interface ExportArtifact {
  format: 'png' | 'svg';
  uri: string;
  transparent: boolean;
}

export interface FinalLogoPackage {
  creativeDirection: CreativeDirection;
  selectedCandidate: EvaluatedCandidate;
  refinedLogo: RefinedLogo;
  typography: TypographySpec;
  exports: ExportArtifact[];
}

export interface GenerationProvider {
  generate(prompt: SymbolPrompt): Promise<GeneratedCandidate[]>;
}

export interface EvaluationPolicy {
  minimumScore: number;
  maxRegenerationRounds: number;
}
