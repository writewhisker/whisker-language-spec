# Prompt 0.6: Design Decisions

## Context

Finalize the design decisions for WLS 1.0 based on research and enhancement proposals.

## Prerequisites

- 0.5: ENHANCEMENT_PROPOSALS.md complete

## Task

Make definitive design decisions for every aspect of WLS 1.0.

## Decisions Required

### 1. Syntax Decisions

#### Variable Interpolation
- **Decision needed:** `$var` vs `{{var}}` vs both
- **Recommendation:** `$var` for simple, `${expr}` for expressions
- Document: Exact syntax, escaping rules

#### Conditionals
- **Decision needed:** Block syntax, inline syntax
- **Recommendation:** `{ cond }...{/}` for blocks, `{cond: text}` for inline
- Document: Nesting rules, else syntax

#### Operators
- **Decision needed:** C-style (`&&`, `||`) vs Lua-style (`and`, `or`)
- **Recommendation:** Lua-style only
- Document: Complete operator list with precedence

#### Comments
- **Decision needed:** Comment syntax
- **Recommendation:** `//` single-line, `/* */` multi-line
- Document: Nesting rules

### 2. API Decisions

#### Namespace Structure
- **Decision needed:** API organization
- **Recommendation:** `whisker.state.*`, `whisker.passage.*`, etc.
- Document: Complete API surface

#### Function Signatures
- **Decision needed:** Dot vs colon notation
- **Recommendation:** Dot notation (`whisker.state.get()`)
- Document: All function signatures

### 3. Feature Decisions

For each enhancement from 0.5, decide:
- Include in WLS 1.0: Yes/No
- Syntax choice (if multiple options)
- Implementation priority

### 4. Format Decisions

#### Text Format (.ws)
- Document: Complete syntax
- Document: Header format
- Document: Directive syntax

#### JSON Format
- Document: Schema structure
- Document: Version handling
- Document: Validation rules

## Output Format

Create `outputs/WLS_DESIGN_DECISIONS.md` with:

```markdown
# WLS 1.0 Design Decisions

## Decision Log

### D1: Variable Interpolation Syntax
**Decision:** Use `$var` for variables, `${expr}` for expressions
**Rationale:** Clean syntax, clear distinction between simple and complex
**Alternatives Considered:**
- `{{var}}`: Too verbose, conflicts with template engines
- `${{expr}}`: Inconsistent
**Breaking Changes:** Editor stories using `{{var}}` need migration

[Repeat for each major decision]

## Syntax Reference

### Variables
```whisker
$gold = 100           // Assignment
$name = "Hero"        // String
$hasKey = true        // Boolean

You have $gold gold.  // Interpolation
Roll: ${random(1,6)}  // Expression
```

### Conditionals
```whisker
// Block conditional
{ $hasKey }
  The door is unlocked.
{/}

// Inline conditional
The door is {$hasKey: unlocked|locked}.

// Else clause
{ $gold >= 100 }
  You can afford it.
{else}
  Not enough gold.
{/}
```

[Continue for all syntax elements]

## API Reference

### whisker.state
| Function | Signature | Description |
|----------|-----------|-------------|
| get | `(key: string) -> any` | Get variable |
| set | `(key: string, value: any) -> nil` | Set variable |
| ... | | |

[Continue for all namespaces]

## Feature Inclusion

| Feature | Included | Priority | Notes |
|---------|----------|----------|-------|
| Inline conditionals | Yes | P1 | Core feature |
| Tunnels | Yes | P2 | Ink-inspired |
| Threads | No | - | Too complex for v1 |
| ... | | | |

## Format Specifications

### Text Format (.ws)
[Complete syntax specification]

### JSON Format
[Complete schema description]

## Migration Notes
[Breaking changes and migration paths]
```

## Token Budget

Target: ~8,000 tokens
This is the most comprehensive document in Phase 0.

## Execution

```
Make all design decisions for WLS 1.0. Reference the enhancement
proposals and research. For each decision, document the choice,
rationale, and alternatives considered.

This document becomes the blueprint for the specification.

Output to: phase-0-research/outputs/WLS_DESIGN_DECISIONS.md
```
