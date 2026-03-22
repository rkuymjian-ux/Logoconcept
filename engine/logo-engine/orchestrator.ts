import { buildExports } from '../export/index.js';
import { buildTypography } from '../typography/index.js';
import { evaluateBatch } from './evaluation-engine.js';
import { MockGenerationProvider } from './generation-engine.js';
import { createSymbolPrompt } from './prompt-engine.js';
import { runRefinement } from './refinement-engine.js';
import { buildCreativeDirection } from './style-engine.js';
import type {
  BrandInput,
  EvaluationPolicy,
  FinalLogoPackage,
  GenerationProvider,
  SymbolPrompt
} from './types.js';

export interface LogoEngineConfig {
  provider?: GenerationProvider;
  evaluationPolicy?: EvaluationPolicy;
  baseSeed?: number;
  batchSize?: number;
}

export class LogoIntelligenceEngine {
  private readonly provider: GenerationProvider;
  private readonly policy: EvaluationPolicy;
  private readonly baseSeed: number;
  private readonly batchSize: number;

  constructor(config: LogoEngineConfig = {}) {
    this.provider = config.provider ?? new MockGenerationProvider();
    this.policy = config.evaluationPolicy ?? { minimumScore: 72, maxRegenerationRounds: 2 };
    this.baseSeed = config.baseSeed ?? 4200;
    this.batchSize = config.batchSize ?? 4;
  }

  async run(input: BrandInput): Promise<FinalLogoPackage> {
    const creativeDirection = buildCreativeDirection(input);

    for (let round = 0; round <= this.policy.maxRegenerationRounds; round += 1) {
      const prompt = this.buildRoundPrompt(input, creativeDirection, round);
      const generated = await this.provider.generate(prompt);
      const { selected, evaluated } = evaluateBatch(generated, this.policy);

      if (selected) {
        const refinedLogo = runRefinement(selected);
        const typography = buildTypography(input, refinedLogo);
        const exports = buildExports(refinedLogo, typography);

        return {
          creativeDirection,
          selectedCandidate: selected,
          refinedLogo,
          typography,
          exports
        };
      }

      if (round === this.policy.maxRegenerationRounds) {
        const best = evaluated[0];
        const refinedLogo = runRefinement(best);
        const typography = buildTypography(input, refinedLogo);
        const exports = buildExports(refinedLogo, typography);

        return {
          creativeDirection,
          selectedCandidate: best,
          refinedLogo,
          typography,
          exports
        };
      }
    }

    throw new Error('Pipeline failed to produce any logo candidates.');
  }

  private buildRoundPrompt(input: BrandInput, creativeDirection: ReturnType<typeof buildCreativeDirection>, round: number): SymbolPrompt {
    const seed = this.baseSeed + this.hashInput(input) + round * 100;
    return createSymbolPrompt(input, creativeDirection, seed, this.batchSize);
  }

  private hashInput(input: BrandInput): number {
    const payload = JSON.stringify({
      brandName: input.brandName,
      industry: input.industry,
      keywords: input.keywords,
      style: input.style
    });

    return Array.from(payload).reduce((accumulator, character) => accumulator + character.charCodeAt(0), 0);
  }
}
