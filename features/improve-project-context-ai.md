# Feature: generate-compressed-project-context

## Goal
Create a compressed and structured project context file that captures all essential architectural, domain, and behavioral information while minimizing token usage for AI consumption.

## Scope
- Affected areas:
  - backend
  - frontend
  - shared/domain
- Includes:
  - Reading and analyzing the full codebase
  - Extracting key architectural patterns, modules, and rules
  - Generating a reduced/optimized context file (context.IA or similar)
- Does NOT include:
  - Refactoring existing code
  - Changing business logic or behavior

## Requirements
- The AI must scan and understand:
  - Project structure (modules, layers, boundaries)
  - Core domain entities and relationships
  - Key business rules and constraints
  - API contracts and main flows
  - Security and role rules (if present)
- Generate a compressed context file that:
  - Preserves all critical information needed for future AI tasks
  - Removes redundancy and low-value details
  - Uses short, dense, and structured language
- The output format must:
  - Be optimized for token efficiency (bullet points, compact sections)
  - Avoid long prose explanations
  - Prioritize clarity over completeness of wording
- The file must include at least:
  - System overview
  - Architecture style and patterns
  - Module breakdown
  - Domain rules
  - API behavior summary
  - Frontend patterns (if applicable)
- Ensure consistency with actual code (no assumptions)

## Constraints
- Do NOT break existing behavior
- Do NOT change API contracts unless strictly necessary
- Keep changes incremental and localized
- Follow existing architecture and patterns

## Implementation Notes
- Where:
  - Root-level file (e.g., context.IA.md or AI_CONTEXT.md)
- How:
  - Traverse folders and prioritize:
    - Domain layer
    - Services
    - Controllers / API layer
    - Frontend service layer
  - Ignore:
    - Build artifacts
    - Logs
    - Generated files
- Compression strategy:
  - Replace verbose text with structured bullets
  - Group similar rules instead of repeating
  - Use consistent naming (avoid synonyms)
- Important:
  - Prefer accuracy over over-compression
  - Keep the file stable and deterministic (same structure every run)

## Validation
- How to test:
  - Use the generated context as input for a new AI task
  - Verify if the AI can correctly understand and modify the project
- Expected behavior:
  - AI should not need to re-scan the entire project
  - AI responses should align with real architecture and rules
- Regression:
  - No loss of critical domain or architectural information

## Done Criteria
- A compressed context file is generated successfully
- The file contains all key system knowledge in reduced form
- The context is sufficient for guiding future AI-driven development without re-reading the full codebase