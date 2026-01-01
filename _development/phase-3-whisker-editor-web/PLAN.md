# Phase 3: whisker-editor-web Updates - Detailed Plan

## Objective

Implement WLS 1.0 in whisker-editor-web.

## Duration: 7 Weeks (Weeks 6-12)
## Effort: 1,500 hours

*Note: Can run in parallel with Phase 2 after Phase 1 completes*

---

## Task 3.1: Update Story Models

**Effort:** 80 hours
**Deliverable:** `packages/story-models/src/*.ts`

### Changes
- Update Story interface for WLS 1.0
- Update Passage interface
- Update Choice interface
- Add new variable types
- Add list support

### Test Coverage: 40 tests

---

## Task 3.2: Implement WLS Lexer

**Effort:** 120 hours
**Deliverable:** `packages/parser/src/lexer.ts`

### Token Types
```typescript
enum TokenType {
  // Structure
  PASSAGE_MARKER,      // ::
  CHOICE_MARKER,       // +
  ONCE_CHOICE_MARKER,  // *
  ARROW,               // ->

  // Delimiters
  LBRACE, RBRACE,      // { }
  COND_END,            // {/}
  EXPR_START,          // ${
  LBRACKET, RBRACKET,  // [ ]

  // Operators
  ASSIGN, PLUS_ASSIGN, MINUS_ASSIGN,
  EQ, NEQ, LT, GT, LTE, GTE,
  AND, OR, NOT,

  // Literals
  IDENTIFIER, NUMBER, STRING,
  TRUE, FALSE, NIL,

  // Special
  DOLLAR,              // $
  DIRECTIVE,           // @
  COMMENT,
  NEWLINE, EOF
}
```

### Test Coverage: 60 tests

---

## Task 3.3: Implement WLS Parser

**Effort:** 160 hours
**Deliverable:** `packages/parser/src/parser.ts`

### Parser Features
- Recursive descent parser
- Story structure parsing
- Passage parsing
- Choice parsing
- Conditional parsing
- Expression parsing
- Error recovery
- Source location tracking

### Test Coverage: 80 tests

---

## Task 3.4: Define AST Types

**Effort:** 80 hours
**Deliverable:** `packages/parser/src/ast.ts`

### AST Nodes
```typescript
interface StoryNode {
  type: 'story';
  metadata: MetadataNode;
  variables: VariableNode[];
  passages: PassageNode[];
}

interface PassageNode {
  type: 'passage';
  name: string;
  directives: DirectiveNode[];
  content: ContentNode[];
  location: SourceLocation;
}

interface ContentNode {
  type: 'text' | 'interpolation' | 'expression' |
        'conditional' | 'choice';
  // ... specific fields
}
```

### Test Coverage: 30 tests

---

## Task 3.5: Update Lua Runtime API

**Effort:** 80 hours
**Deliverable:** `packages/scripting/src/*.ts`

### Changes
- Implement `whisker.state.*` API
- Implement `whisker.passage.*` API
- Implement `whisker.history.*` API
- Implement `whisker.util.*` API
- Remove old `game_state.*` API

### Test Coverage: 40 tests

---

## Task 3.6: Implement Expression Evaluation

**Effort:** 80 hours
**Deliverable:** `packages/scripting/src/expressions.ts`

### Features
- Parse `${expr}` syntax
- Evaluate Lua expressions
- Handle function calls
- Error handling

### Test Coverage: 35 tests

---

## Task 3.7: Implement Conditional Renderer

**Effort:** 120 hours
**Deliverable:** `packages/story-player/src/*.ts`

### Features
- Block conditionals `{ cond }...{/}`
- Else clauses `{else}`
- Inline conditionals `{cond: text}`
- Nested conditionals
- Alternative text

### Test Coverage: 45 tests

---

## Task 3.8: Update Variable Interpolation

**Effort:** 60 hours
**Deliverable:** `packages/core-ts/src/interpolation.ts`

### Features
- `$variable` interpolation
- `${expression}` interpolation
- Escape handling
- Error handling

### Test Coverage: 30 tests

---

## Task 3.9: Implement New Features

**Effort:** 120 hours
**Deliverable:** `packages/features/*.ts`

### Features
- Once-only choices
- Sticky choices
- Fallback choices
- Alternatives (sequence, shuffle, cycle)
- Weave/gathers
- Temp variables

### Test Coverage: 50 tests

---

## Task 3.10: Update Monaco Syntax Highlighting

**Effort:** 40 hours
**Deliverable:** `src/lib/editor/wls-language.ts`

### Features
- WLS 1.0 token definitions
- Keyword highlighting
- Operator highlighting
- API autocomplete
- Error markers

### Test Coverage: 15 tests

---

## Task 3.11: Update Validation Rules

**Effort:** 60 hours
**Deliverable:** `packages/story-validation/src/*.ts`

### Validators
- Syntax validators
- Link validators
- Variable validators
- Expression validators
- WLS compliance validator

### Test Coverage: 40 tests

---

## Task 3.12: Update Import/Export

**Effort:** 80 hours
**Deliverable:** `packages/import/src/*.ts`, `packages/export/src/*.ts`

### Import
- WLS 1.0 JSON
- WLS 1.0 text (.ws)
- Legacy format migration

### Export
- WLS 1.0 JSON
- WLS 1.0 text (.ws)
- HTML (updated player)

### Test Coverage: 35 tests

---

## Task 3.13: Create Migration UI

**Effort:** 40 hours
**Deliverable:** `src/lib/components/MigrationDialog.svelte`

### Features
- Detect legacy format
- Show changes preview
- One-click migration
- Batch migration

### Test Coverage: 15 tests

---

## Task 3.14: Write Unit Tests

**Effort:** 160 hours
**Deliverable:** `packages/*/src/__tests__/*.ts`

### Test Distribution
- Parser: 170 tests
- Runtime: 110 tests
- Validation: 55 tests
- Import/Export: 50 tests
- UI: 30 tests

**Total: 415 tests**

---

## Task 3.15: Update UI Components

**Effort:** 80 hours
**Deliverable:** `src/lib/components/*.svelte`

### Components to Update
- PassageEditor
- ChoiceEditor
- VariableEditor
- ConditionBuilder
- ScriptEditor

### Test Coverage: 25 tests

---

## Task 3.16: Update Documentation

**Effort:** 40 hours
**Deliverable:** `docs/*.md`

### Documents
- SCRIPTING_GUIDE.md
- USER_GUIDE.md
- README.md

---

## Task 3.17: Integration Testing

**Effort:** 60 hours
**Deliverable:** `tests/integration/*.ts`

### Scenarios
- Full story creation
- Import/export roundtrip
- Complex branching
- Migration scenarios

---

## Task 3.18: Write Phase Summary

**Effort:** 8 hours
**Deliverable:** `PHASE_3_SUMMARY.md`

---

## Milestone Checklist

Before Phase 4:

- [ ] All 18 tasks completed
- [ ] All unit tests passing (415+ tests)
- [ ] WLS test corpus: 100% passing
- [ ] .ws file parsing works
- [ ] All UI components updated
- [ ] Import/export works
- [ ] Migration UI functional
- [ ] Documentation updated
- [ ] STATE.md updated

---

## Dependencies

### Inputs (from Phase 1)
- WLS 1.0 specification
- EBNF grammar
- JSON schema
- Test corpus

### Outputs (for Phase 4)
- Updated whisker-editor-web
- Migration UI
- Test results
