# Prompt 0.1: Twine Format Analysis

## Context

You are researching Twine story formats to identify features that could enhance the Whisker Language Specification 1.0. Whisker is an interactive fiction authoring language.

## Task

Analyze the three major Twine story formats: Harlowe, SugarCube, and Chapbook. For each, document:

1. **Syntax Overview**
   - How variables are declared and used
   - How conditionals work
   - How choices/links are created
   - How passages are structured

2. **Unique Features**
   - Features not found in other formats
   - Particularly elegant solutions
   - Common author pain points addressed

3. **State Management**
   - Variable types supported
   - Scoping rules
   - Save/load capabilities
   - History/undo support

4. **Dynamic Content**
   - Text replacement/interpolation
   - Conditional text display
   - Cycling/alternating text
   - Delayed/animated text

5. **Advanced Features**
   - Macros/widgets
   - Custom JavaScript integration
   - Styling and theming
   - Audio/media support

## Output Format

Create a structured document `outputs/TWINE_ANALYSIS.md` with:

```markdown
# Twine Story Format Analysis

## Executive Summary
[2-3 paragraphs summarizing key findings]

## Harlowe 3.x

### Syntax
[With code examples]

### State Management
[With code examples]

### Unique Features
[List with descriptions]

### Applicable to Whisker
[Features worth adopting]

## SugarCube 2.x
[Same structure as Harlowe]

## Chapbook 1.x
[Same structure as Harlowe]

## Cross-Format Patterns
[Common patterns across all formats]

## Recommendations for WLS 1.0
[Prioritized list of features to adopt]
```

## Research Sources

Use web search to find:
- Official Twine documentation
- Format-specific documentation
- Community tutorials and examples

## Token Budget

Target: ~6,000 tokens
Focus on features most relevant to Whisker enhancement.

## Execution

```
Please analyze Twine story formats (Harlowe, SugarCube, Chapbook)
for the WLS 1.0 project. Search the web for current documentation
and examples. Focus on features that would enhance interactive
fiction authoring in Whisker.

Output to: phase-0-research/outputs/TWINE_ANALYSIS.md
```
