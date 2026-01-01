# Prompt 0.7: Feature Comparison Matrix

## Context

Create a comprehensive feature matrix comparing Twine, Ink, current Whisker, and WLS 1.0.

## Prerequisites

- Tasks 0.1-0.6 complete

## Task

Build a detailed feature matrix showing coverage across systems.

## Matrix Structure

### Categories

1. **Narrative Structure**
   - Passages/knots
   - Sub-sections
   - Navigation
   - Includes

2. **Choices**
   - Basic choices
   - Conditional choices
   - Sticky/once-only
   - Fallback

3. **Variables**
   - Declaration
   - Types
   - Scoping
   - Interpolation

4. **Conditionals**
   - Block conditionals
   - Inline conditionals
   - Else clauses
   - Nesting

5. **Text Features**
   - Alternatives
   - Cycling
   - Shuffle
   - Once-only

6. **State Management**
   - Save/load
   - History
   - Visited tracking

7. **Advanced Features**
   - Functions
   - Tunnels
   - Threads
   - External integration

## Output Format

Create `outputs/FEATURE_MATRIX.md` with:

```markdown
# Feature Comparison Matrix

## Legend
- ✅ Full support
- 🟡 Partial support
- ❌ Not supported
- 🆕 New in WLS 1.0

## Narrative Structure

| Feature | Harlowe | SugarCube | Ink | whisker-core | whisker-editor | WLS 1.0 |
|---------|---------|-----------|-----|--------------|----------------|---------|
| Passages | ✅ | ✅ | ✅ (knots) | ✅ | ✅ | ✅ |
| Sub-sections | ❌ | ❌ | ✅ (stitches) | ❌ | ❌ | 🆕 |
| Navigation | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Includes | ❌ | ✅ | ✅ | ❌ | ❌ | 🆕 |

## Choices

| Feature | Harlowe | SugarCube | Ink | whisker-core | whisker-editor | WLS 1.0 |
|---------|---------|-----------|-----|--------------|----------------|---------|
| Basic | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Conditional | ✅ | ✅ | ✅ | ✅ | 🟡 | ✅ |
| Once-only | 🟡 | ✅ | ✅ | ❌ | ❌ | 🆕 |
| Fallback | ❌ | ❌ | ✅ | ❌ | ❌ | 🆕 |
| Nested (weave) | ❌ | ❌ | ✅ | ❌ | ❌ | 🆕 |

[Continue for all categories]

## Feature Count Summary

| System | Full | Partial | None | Total Coverage |
|--------|------|---------|------|----------------|
| Harlowe | X | Y | Z | XX% |
| SugarCube | X | Y | Z | XX% |
| Ink | X | Y | Z | XX% |
| whisker-core | X | Y | Z | XX% |
| whisker-editor | X | Y | Z | XX% |
| WLS 1.0 | X | Y | Z | XX% |

## Unique Features by System

### Harlowe
- [List unique features]

### SugarCube
- [List unique features]

### Ink
- [List unique features]

### WLS 1.0 (New)
- [List new features added]

## WLS 1.0 Coverage Analysis
[Analysis of what WLS 1.0 covers vs competitors]
```

## Token Budget

Target: ~3,000 tokens
Focus on clear, scannable tables.

## Execution

```
Create a comprehensive feature matrix comparing Twine formats,
Ink, current Whisker implementations, and planned WLS 1.0.
Use the research outputs and design decisions as sources.

Output to: phase-0-research/outputs/FEATURE_MATRIX.md
```
