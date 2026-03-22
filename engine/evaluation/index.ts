import type { EvaluationBreakdown, GeneratedCandidate } from '../logo-engine/types.js';

function clampScore(value: number): number {
  return Math.max(0, Math.min(25, Math.round(value)));
}

export function scoreCandidate(candidate: GeneratedCandidate): EvaluationBreakdown {
  const metadata = candidate.metadata;
  const simplicityScore = clampScore(25 - Number(metadata.complexity ?? 8));
  const symmetryScore = clampScore(Number(metadata.symmetry ?? 18));
  const contrastScore = clampScore(Number(metadata.contrast ?? 18));
  const recognizabilityScore = clampScore(Number(metadata.recognizability ?? 18));
  const totalScore = simplicityScore + symmetryScore + contrastScore + recognizabilityScore;

  const rejectionReasons: string[] = [];
  if (Boolean(metadata.hasIllustrativeTraits)) rejectionReasons.push('Looks illustrative instead of logo-like.');
  if (Number(metadata.complexity ?? 0) > 14) rejectionReasons.push('Too complex for premium logo usage.');
  if (!Boolean(metadata.isCentered ?? true)) rejectionReasons.push('Composition is not centered.');
  if (Boolean(metadata.hasNoise)) rejectionReasons.push('Detected visual noise or artifacts.');
  if (contrastScore < 14) rejectionReasons.push('Insufficient contrast.');
  if (recognizabilityScore < 14) rejectionReasons.push('Weak recognizability at small sizes.');

  return {
    simplicityScore,
    symmetryScore,
    contrastScore,
    recognizabilityScore,
    totalScore,
    accepted: rejectionReasons.length === 0,
    rejectionReasons
  };
}
