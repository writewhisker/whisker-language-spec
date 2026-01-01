# Prompt 0.2: Ink Language Analysis

## Context

You are researching Inkle's Ink language to identify features that could enhance the Whisker Language Specification 1.0. Ink is known for its elegant handling of branching narratives.

## Task

Analyze the Ink scripting language comprehensively. Document:

1. **Narrative Structure**
   - Knots (major sections)
   - Stitches (sub-sections)
   - Diverts (navigation)
   - Weave (inline branching)
   - Gathers (convergence points)

2. **Choice System**
   - Basic choices (`*` and `+`)
   - Sticky vs non-sticky choices
   - Fallback choices
   - Conditional choices
   - Labeled choices for reference
   - Nested choices (weave)

3. **Variable System**
   - Global variables (`VAR`)
   - Temporary variables (`temp`)
   - Constants (`CONST`)
   - Variable types
   - Lists and sets
   - Variable observation/change tracking

4. **Control Flow**
   - Conditional content (`{ }`)
   - Conditional text variations
   - Alternative sequences
   - Shuffle/cycle alternatives
   - Logical operators

5. **Advanced Features**
   - Tunnels (subroutine-like flow)
   - Threads (parallel narratives)
   - Functions
   - External functions (game integration)
   - Include files

6. **Content Generation**
   - Inline conditionals
   - Sequence alternatives
   - Shuffle alternatives
   - Once-only alternatives
   - Cycle alternatives

## Output Format

Create `outputs/INK_ANALYSIS.md` with:

```markdown
# Ink Language Analysis

## Executive Summary
[Key features and patterns]

## Narrative Structure

### Knots and Stitches
[With examples]

### Diverts and Weave
[With examples]

### Gathers
[With examples]

## Choice System
[Detailed analysis with examples]

## Variable System
[Detailed analysis with examples]

## Control Flow
[Detailed analysis with examples]

## Advanced Features

### Tunnels
[With examples]

### Threads
[With examples]

### Functions
[With examples]

## Content Generation Patterns
[Alternatives, sequences, shuffles]

## Syntax Quick Reference
[Concise syntax summary]

## Recommendations for WLS 1.0
[Prioritized features to adopt with rationale]
```

## Example Ink Code to Analyze

```ink
=== london ===
VAR knows_about_secret = false
We arrived into London at 9.45pm exactly.
*   "There is not a moment to lose!"[] I declared.
    -> hurry_outside
*   {knows_about_secret} "But first, what about the secret?"
    -> discuss_secret
*   We savored the moment.
    -> relax

=== hurry_outside ===
We hurried outside.
{ stopping:
    - The night air was cold.
    - It was a cloudy night.
    - The streets were quiet.
}
-> END
```

## Research Sources

Use web search for:
- Official Ink documentation (inklestudios.com)
- Ink tutorial and examples
- Community patterns and best practices

## Token Budget

Target: ~6,000 tokens
Focus on patterns most applicable to interactive fiction.

## Execution

```
Please analyze the Ink scripting language for the WLS 1.0 project.
Search the web for current documentation and examples. Focus on
the elegant patterns Ink uses for branching narratives that could
enhance Whisker's capabilities.

Output to: phase-0-research/outputs/INK_ANALYSIS.md
```
