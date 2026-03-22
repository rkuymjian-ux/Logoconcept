import type { GeneratedCandidate, GenerationProvider, SymbolPrompt } from './types.js';

export class MockGenerationProvider implements GenerationProvider {
  async generate(prompt: SymbolPrompt): Promise<GeneratedCandidate[]> {
    return Array.from({ length: prompt.batchSize }, (_, index) => {
      const seed = prompt.seed + index;
      return {
        id: `candidate-${seed}`,
        seed,
        prompt,
        assetUri: `memory://logo-${seed}.png`,
        metadata: {
          complexity: 6 + index,
          symmetry: 19 - index,
          contrast: 21 - index,
          recognizability: 20 - index,
          isCentered: true,
          hasNoise: false,
          hasIllustrativeTraits: false
        }
      } satisfies GeneratedCandidate;
    });
  }
}

export interface ReplicateGenerationConfig {
  model: string;
  endpoint: string;
}

export class ReplicateGenerationProvider implements GenerationProvider {
  constructor(private readonly config: ReplicateGenerationConfig) {}

  async generate(prompt: SymbolPrompt): Promise<GeneratedCandidate[]> {
    void this.config;
    throw new Error(
      `Replicate provider not wired yet. Connect ${this.config.model} at ${this.config.endpoint} to your backend transport.`
    );
  }
}
