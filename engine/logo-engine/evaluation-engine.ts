import { scoreCandidate } from '../evaluation/index.js';
import type { EvaluatedCandidate, EvaluationPolicy, GeneratedCandidate } from './types.js';

export function evaluateBatch(
  candidates: GeneratedCandidate[],
  policy: EvaluationPolicy
): { evaluated: EvaluatedCandidate[]; selected?: EvaluatedCandidate } {
  const evaluated = candidates
    .map((candidate) => ({
      ...candidate,
      evaluation: scoreCandidate(candidate)
    }))
    .sort((left, right) => right.evaluation.totalScore - left.evaluation.totalScore);

  const selected = evaluated.find(
    (candidate) => candidate.evaluation.accepted && candidate.evaluation.totalScore >= policy.minimumScore
  );

  return { evaluated, selected };
}
