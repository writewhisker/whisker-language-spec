# Phase 3: whisker-editor-web Updates - Claude Guide

## Phase Objective

Implement WLS 1.0 in whisker-editor-web (TypeScript/Svelte), including new parser, unified API, and editor updates.

## Prerequisites

- Phase 1 complete
- WLS 1.0 specification finalized
- Test corpus available
- (Can run in parallel with Phase 2)

## Session Setup

Start each session with:

```
I'm working on WLS 1.0 Phase 3: whisker-editor-web updates.
Current task: [Task ID from PLAN.md]
Specification: phase-1-specification/spec/WLS-1.0-COMPLETE.md
Codebase: /Users/jims/code/github.com/writewhisker/whisker-editor-web
Please read phase-3-whisker-editor-web/CLAUDE.md and PLAN.md.
```

## Codebase Structure

```
whisker-editor-web/
├── packages/
│   ├── story-models/      # Data models
│   ├── story-player/      # Runtime engine
│   ├── scripting/         # Lua execution
│   ├── story-validation/  # Validators
│   ├── import/            # Import formats
│   ├── export/            # Export formats
│   └── parser/            # NEW: WLS text parser
├── src/
│   ├── lib/
│   │   ├── stores/        # Svelte stores
│   │   ├── components/    # UI components
│   │   └── editor/        # Editor config
│   └── routes/            # Pages
└── tests/                 # Test files
```

## Major Work Areas

### 1. New Parser Package (Tasks 3.2-3.4)
Create `packages/parser/` for WLS text format:
- Lexer (tokenizer)
- Parser (AST generator)
- AST types

### 2. Model Updates (Task 3.1)
Update `packages/story-models/` for WLS 1.0.

### 3. Runtime Updates (Tasks 3.5-3.8)
Update Lua API, expression evaluation, rendering.

### 4. Editor Updates (Tasks 3.10, 3.15)
Monaco highlighting, UI components.

### 5. Import/Export (Task 3.12)
Update to WLS 1.0 formats.

## TypeScript Guidelines

### Code Style
```typescript
// Use interfaces for data structures
interface Passage {
  id: string;
  name: string;
  content: string;
  choices: Choice[];
}

// Use type for unions/intersections
type VariableType = 'string' | 'number' | 'boolean';

// Prefer const assertions for literals
const TOKEN_TYPES = ['PASSAGE', 'CHOICE', 'VARIABLE'] as const;
```

### Testing
```typescript
// Use Vitest
import { describe, it, expect } from 'vitest';

describe('WLS Parser', () => {
  it('parses passage declaration', () => {
    const result = parse(':: Start\nHello world');
    expect(result.passages).toHaveLength(1);
    expect(result.passages[0].name).toBe('Start');
  });
});
```

## Token Management

| Task | Est. Tokens | Sessions |
|------|-------------|----------|
| 3.1 Story Models | 6,000 | 1 |
| 3.2 Lexer | 8,000 | 2 |
| 3.3 Parser | 10,000 | 2 |
| 3.4 AST | 5,000 | 1 |
| 3.5 Lua Runtime | 6,000 | 1 |
| 3.6 Expressions | 6,000 | 1 |
| 3.7 Conditionals | 8,000 | 2 |
| 3.8 Variables | 5,000 | 1 |
| 3.9 Features | 8,000 | 2 |
| 3.10 Monaco | 4,000 | 1 |
| 3.11 Validation | 5,000 | 1 |
| 3.12 Import/Export | 6,000 | 1 |
| 3.13 Migration UI | 4,000 | 1 |
| 3.14-3.18 Tests/Docs | 8,000 | 2 |

## Prompt Templates

### For New Files
```
Task: [ID] - [Name]
Spec Reference: section [X.Y] of WLS-1.0-COMPLETE.md

Create new file: packages/[path]/[file].ts
Purpose: [Description]

Interface/API requirements:
1. [Requirement 1]
2. [Requirement 2]

Include tests in: packages/[path]/__tests__/[file].test.ts
```

### For Updates
```
Task: [ID] - [Name]
Spec Reference: section [X.Y]

Update file: packages/[path]/[file].ts
Current behavior: [What it does now]
Required behavior: [What WLS 1.0 requires]

Changes needed:
1. [Change 1]
2. [Change 2]

Update tests in: packages/[path]/__tests__/[file].test.ts
```

## State Tracking

Update `STATE.md` after each task:

```markdown
## Phase 3 Progress

| Task | Status | Tests | Files |
|------|--------|-------|-------|
| 3.1 | done | 25/25 | 5 |
| 3.2 | in_progress | 40/60 | 2 |
| ... | | | |

### New Packages Created
- packages/parser/

### Test Results
- Unit: X/Y passing
- WLS Corpus: X/200 passing

### UI Changes
- [List visible changes]
```

## Compact State Template

```markdown
## Phase 3 State - [Date]

**Completed:** 3.1-3.X
**Current:** 3.Y - [Specific task]
**Tests:** X/Y passing

### New Files
- packages/parser/src/lexer.ts
- packages/parser/src/parser.ts
- ...

### Modified Files
- packages/story-models/src/Story.ts
- packages/scripting/src/LuaEngine.ts
- ...

### Breaking Changes
- [List API changes]

### Next Session
1. [First action]
2. [Second action]
```

## Quality Checklist

Before marking Phase 3 complete:

- [ ] All 18 tasks completed
- [ ] All unit tests passing
- [ ] WLS test corpus: 100% passing
- [ ] .ws file parsing works
- [ ] All UI components updated
- [ ] Import/export works
- [ ] Migration UI functional
- [ ] Documentation updated
- [ ] No regressions
- [ ] STATE.md updated

## Prompts Location

Use prompts from `phase-3-whisker-editor-web/prompts/`:
- `01-story-models.md`
- `02-lexer.md`
- `03-parser.md`
- `04-ast.md`
- ... (one per major task)
