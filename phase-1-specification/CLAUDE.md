# Phase 1: Specification - Claude Guide

## Phase Objective

Create the comprehensive Whisker Language Specification 1.0 document, including syntax, API, formats, and examples.

## Prerequisites

- Phase 0 complete
- Design decisions finalized (WLS_DESIGN_DECISIONS.md)
- Feature set approved (ENHANCEMENT_PROPOSALS.md)

## Session Setup

Start each session with:

```
I'm working on WLS 1.0 Phase 1: Specification.
Current task: [Task ID from PLAN.md]
Design decisions are in: phase-0-research/outputs/WLS_DESIGN_DECISIONS.md
Please read phase-1-specification/CLAUDE.md and phase-1-specification/PLAN.md.
```

## Document Structure

The specification is split into chapters for manageability:

```
spec/
├── 01-INTRODUCTION.md       # Overview, goals, conventions
├── 02-CORE_CONCEPTS.md      # Stories, passages, choices, state
├── 03-SYNTAX.md             # Complete syntax reference
├── 04-VARIABLES.md          # Variable system
├── 05-CONTROL_FLOW.md       # Conditionals, flow control
├── 06-CHOICES.md            # Choice system
├── 07-LUA_API.md            # Complete API reference
├── 08-FILE_FORMATS.md       # .ws and JSON formats
├── 09-EXAMPLES.md           # Comprehensive examples
├── 10-BEST_PRACTICES.md     # Usage guidelines
├── GRAMMAR.ebnf             # Formal grammar
├── APPENDICES.md            # Reference tables
└── WLS-1.0-COMPLETE.md      # Compiled complete spec
```

## Task Execution Order

Execute in order. Each chapter builds on previous ones.

```
1.1  Introduction       → 01-INTRODUCTION.md
1.2  Core Concepts      → 02-CORE_CONCEPTS.md
1.3  Syntax             → 03-SYNTAX.md
1.4  Variables          → 04-VARIABLES.md
1.5  Control Flow       → 05-CONTROL_FLOW.md
1.6  Choices            → 06-CHOICES.md
1.7  Lua API            → 07-LUA_API.md
1.8  File Formats       → 08-FILE_FORMATS.md
1.9  EBNF Grammar       → GRAMMAR.ebnf
1.10 JSON Schema        → shared/schemas/wls-1.0.schema.json
1.11 Examples           → 09-EXAMPLES.md
1.12 Best Practices     → 10-BEST_PRACTICES.md
1.13 Test Corpus        → phase-4-validation/test-corpus/
1.14 Appendices         → APPENDICES.md
1.15 Complete Spec      → WLS-1.0-COMPLETE.md
```

## Token Management

| Task | Est. Tokens | Notes |
|------|-------------|-------|
| 1.1 | 2,000 | Short intro |
| 1.2 | 3,000 | Conceptual |
| 1.3 | 8,000 | Detailed syntax |
| 1.4 | 4,000 | Variable system |
| 1.5 | 5,000 | Control flow |
| 1.6 | 4,000 | Choice system |
| 1.7 | 8,000 | Complete API |
| 1.8 | 5,000 | Two formats |
| 1.9 | 3,000 | Formal grammar |
| 1.10 | 4,000 | JSON Schema |
| 1.11 | 6,000 | Many examples |
| 1.12 | 3,000 | Guidelines |
| 1.13 | 5,000 | Test definitions |
| 1.14 | 2,000 | Reference tables |
| 1.15 | 2,000 | Compilation |

## Writing Guidelines

### Specification Style

1. **Precise Language**
   - Use RFC 2119 keywords: MUST, SHOULD, MAY
   - Be unambiguous
   - Define all terms

2. **Examples for Everything**
   - Every feature needs a code example
   - Show both correct and incorrect usage
   - Include edge cases

3. **Consistent Formatting**
   - Code blocks with language hints
   - Tables for reference material
   - Clear headings hierarchy

### Code Example Format

```markdown
**Example: [Description]**

```whisker
// Example code here
```

**Result:**
[What happens when this runs]
```

### Specification Sections

Each feature section should include:
1. Description
2. Syntax (formal and informal)
3. Semantics (what it does)
4. Examples
5. Error conditions
6. Implementation notes

## State Tracking

Update `STATE.md` after each chapter:

```markdown
## Phase 1 Progress

| Task | Status | File | Tokens |
|------|--------|------|--------|
| 1.1 | done | 01-INTRODUCTION.md | 1,850 |
| 1.2 | in_progress | 02-CORE_CONCEPTS.md | - |
| ... | | | |

### Review Status
- [ ] Technical review complete
- [ ] Examples tested
- [ ] Cross-references verified
```

## Compact State Template

```markdown
## Phase 1 State - [Date]

**Completed:** 1.1-1.X
**Current:** 1.Y - [Specific section]
**Remaining:** 1.Z-1.15

### Spec Status
- Chapters 1-X: Done
- Chapter Y: In progress (section Z)

### Cross-References Needed
- [List any forward references to resolve]

### Open Questions
- [Any spec ambiguities to resolve]

### Next Session
1. Complete chapter Y
2. Start chapter Z
```

## Quality Checklist

Before marking Phase 1 complete:

- [ ] All 15 tasks completed
- [ ] All chapters in spec/
- [ ] EBNF grammar validates
- [ ] JSON schema validates
- [ ] All examples tested
- [ ] Cross-references verified
- [ ] Compiled spec generated
- [ ] Test corpus created (200+ cases)
- [ ] STATE.md updated

## Prompts Location

Use prompts from `phase-1-specification/prompts/`:
- `01-introduction.md`
- `02-core-concepts.md`
- ... (one per chapter)
- `15-compile-spec.md`
