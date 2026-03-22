# Logo Intelligence Engine

A modular TypeScript architecture for deterministic, style-locked, premium logo generation.

## Pipeline

`INPUT → CREATIVE DIRECTION → SYMBOL GENERATION → SELECTION → REFINEMENT → TYPOGRAPHY → EXPORT`

## Structure

- `engine/logo-engine/` central orchestration and pipeline modules
- `engine/styles/` exact style definitions and constraints
- `engine/symbol/` symbol-only rule system
- `engine/evaluation/` scoring and rejection logic
- `engine/refinement/` post-processing and vectorization handoff
- `engine/typography/` font pairing and lockup rules
- `engine/export/` consistent PNG/SVG artifact generation

## Notes

- Deterministic seed derivation ensures similar outputs for the same input.
- Multi-generation loop evaluates batches and regenerates when quality thresholds are not met.
- Generation providers are abstracted so Replit backend services can plug in SDXL or Replicate.
