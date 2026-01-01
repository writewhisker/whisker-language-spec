# Phase 2: whisker-core Updates - Claude Guide

## Phase Objective

Update whisker-core (Lua) to implement WLS 1.0 exactly, including API changes, syntax updates, and new features.

## Prerequisites

- Phase 1 complete
- WLS 1.0 specification finalized
- Test corpus available

## Session Setup

Start each session with:

```
I'm working on WLS 1.0 Phase 2: whisker-core updates.
Current task: [Task ID from PLAN.md]
Specification: phase-1-specification/spec/WLS-1.0-COMPLETE.md
Codebase: /Users/jims/code/github.com/writewhisker/whisker-core
Please read phase-2-whisker-core/CLAUDE.md and PLAN.md.
```

## Codebase Structure

```
whisker-core/
├── lib/whisker/
│   ├── api/            # API namespace (whisker.*)
│   ├── core/           # Story, Passage, Choice, State
│   ├── parser/         # Lexer, Parser
│   ├── script/         # Compiler, AST
│   ├── runtime/        # Execution engines
│   └── format/         # Import/Export
├── tests/              # Test suite
├── tools/              # CLI tools
└── examples/           # Example stories
```

## Task Categories

### 1. API Updates (Tasks 2.1-2.2)
- Namespace restructuring
- Function signature changes
- Dot notation consistency

### 2. Parser Updates (Tasks 2.3-2.5)
- `${expr}` syntax
- Operator standardization
- Conditional blocks

### 3. Feature Implementation (Tasks 2.6-2.7)
- Ink-inspired features
- Format parser updates

### 4. Tooling (Task 2.8)
- Migration tool

### 5. Testing (Tasks 2.9-2.11)
- Unit tests
- Integration tests
- WLS test corpus

### 6. Documentation (Task 2.10, 2.12-2.13)

## Code Change Guidelines

### 1. Read Before Writing
Always read existing code before modifying.

### 2. Test First
Write tests before implementing features.

### 3. Incremental Changes
Make small, focused commits.

### 4. Backward Compatibility
Mark deprecated features, don't remove until migration tool works.

## Testing Approach

### Unit Tests
```lua
-- tests/wls/test_variables.lua
describe("WLS 1.0 Variables", function()
  it("interpolates $var in content", function()
    local state = GameState.new()
    state:set("gold", 100)
    local result = interpolate("You have $gold gold.", state)
    assert.equals("You have 100 gold.", result)
  end)
end)
```

### WLS Test Corpus
Run corpus tests:
```bash
lua tools/run-wls-tests.lua phase-4-validation/test-corpus/
```

## Token Management

| Task | Est. Tokens | Sessions |
|------|-------------|----------|
| 2.1 API Namespace | 6,000 | 1 |
| 2.2 Expression Syntax | 5,000 | 1 |
| 2.3 Operators | 3,000 | 1 |
| 2.4 Conditionals | 5,000 | 1 |
| 2.5 Variables | 5,000 | 1 |
| 2.6 New Features | 8,000 | 2 |
| 2.7 Format Parser | 6,000 | 1 |
| 2.8 Migration Tool | 5,000 | 1 |
| 2.9-2.11 Tests | 8,000 | 2 |
| 2.12-2.13 Docs | 4,000 | 1 |

## Prompt Templates

### For Code Changes
```
Task: [ID] - [Name]
Spec Reference: section [X.Y] of WLS-1.0-COMPLETE.md

Current code location: lib/whisker/[path]
Required changes:
1. [Change 1]
2. [Change 2]

Please implement these changes following WLS 1.0 spec.
Include unit tests in tests/wls/
```

### For Bug Fixes
```
Issue: [Description]
Spec section: [X.Y]
Current behavior: [What happens]
Expected behavior: [What should happen]
Relevant code: [file:line]

Please fix to match WLS 1.0 specification.
```

## State Tracking

Update `STATE.md` after each task:

```markdown
## Phase 2 Progress

| Task | Status | Tests | Notes |
|------|--------|-------|-------|
| 2.1 | done | 15/15 | API refactored |
| 2.2 | in_progress | 8/12 | ${expr} working |
| ... | | | |

### Test Results
- Unit: X/Y passing
- WLS Corpus: X/200 passing

### Breaking Changes Made
- whisker.state:get() → whisker.state.get()
- ...
```

## Compact State Template

```markdown
## Phase 2 State - [Date]

**Completed:** 2.1-2.X (Y hours)
**Current:** 2.Z - [Specific task]
**Tests:** Unit X/Y, Corpus Z/200

### Code Changed
- lib/whisker/api/state.lua
- lib/whisker/parser/lexer.lua
- ...

### Breaking Changes
- [List all breaking changes]

### Blockers
- [Any issues]

### Next Session
1. Complete task 2.Z
2. Run full test suite
3. Start task 2.W
```

## Quality Checklist

Before marking Phase 2 complete:

- [ ] All 13 tasks completed
- [ ] All unit tests passing
- [ ] All WLS corpus tests passing
- [ ] Migration tool works for all legacy syntax
- [ ] Documentation updated
- [ ] No regressions
- [ ] Performance acceptable
- [ ] STATE.md updated
- [ ] Ready for Phase 4 validation

## Prompts Location

Use prompts from `phase-2-whisker-core/prompts/`:
- `01-api-namespace.md`
- `02-expression-syntax.md`
- `03-operators.md`
- ... (one per major task)
