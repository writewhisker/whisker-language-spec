# Phase 2: whisker-core Updates - Detailed Plan

## Objective

Update whisker-core to implement WLS 1.0 exactly.

## Duration: 6 Weeks (Weeks 6-11)
## Effort: 500 hours

---

## Task 2.1: Update API Namespace Structure

**Effort:** 40 hours
**Deliverable:** `lib/whisker/api/*.lua`

### Changes Required

**Current:**
```lua
whisker.state:get("key")    -- Colon notation
whisker.state:set("key", v)
whisker.current_passage     -- Property
whisker.goto("passage")
```

**WLS 1.0:**
```lua
whisker.state.get("key")    -- Dot notation
whisker.state.set("key", v)
whisker.passage.current()   -- Function
whisker.goto("passage")
```

### Subtasks
1. Create `lib/whisker/api/` directory structure
2. Implement `whisker.state` module
3. Implement `whisker.passage` module
4. Implement `whisker.history` module
5. Implement `whisker.util` module
6. Update engine to use new API
7. Add deprecation warnings for old API

### Test Coverage
- 40 API tests in `tests/wls/test_api.lua`

---

## Task 2.2: Implement `${expr}` Syntax

**Effort:** 48 hours
**Deliverable:** `lib/whisker/parser/expression.lua`

### Changes Required

**Current:**
```whisker
{{ math.random(1, 6) }}
```

**WLS 1.0:**
```whisker
${ whisker.random(1, 6) }
```

### Subtasks
1. Update lexer to recognize `${` and `}`
2. Implement expression parser
3. Integrate with content renderer
4. Handle nested expressions
5. Error handling for malformed expressions

### Test Coverage
- 30 expression tests

---

## Task 2.3: Standardize Operators

**Effort:** 24 hours
**Deliverable:** `lib/whisker/parser/operators.lua`

### Changes Required

Remove C-style operators, keep only Lua-style:

| Remove | Keep |
|--------|------|
| `&&` | `and` |
| `\|\|` | `or` |
| `!` | `not` |
| `!=` | `~=` |

### Subtasks
1. Update lexer to reject C-style operators
2. Provide helpful error messages
3. Update expression evaluator

### Test Coverage
- 25 operator tests

---

## Task 2.4: Update Conditional Blocks

**Effort:** 32 hours
**Deliverable:** `lib/whisker/parser/conditional.lua`

### Changes Required

Ensure full support for:
```whisker
{ $hasKey }
  The door is unlocked.
{/}

{ $gold >= 100 }
  You can afford it.
{else}
  Not enough gold.
{/}
```

### Subtasks
1. Verify block conditional parsing
2. Add else clause support
3. Verify nesting support
4. Add inline conditional: `{cond: text}`

### Test Coverage
- 35 conditional tests

---

## Task 2.5: Implement Enhanced Variables

**Effort:** 40 hours
**Deliverable:** `lib/whisker/core/variables.lua`

### Features

1. **Global variables:** `$var`
2. **Temp variables:** `$$temp`
3. **Lists:** `@list colors: red, green, blue`
4. **Variable observation**

### Subtasks
1. Implement temp variable scoping
2. Implement list type
3. Implement variable change callbacks
4. Update serialization

### Test Coverage
- 30 variable tests

---

## Task 2.6: Add Ink-Inspired Features

**Effort:** 48 hours
**Deliverable:** `lib/whisker/features/*.lua`

### Features to Implement

1. **Once-only choices:** `* [text]`
2. **Sticky choices:** `+ [text]`
3. **Fallback choices:** `* -> target`
4. **Alternatives:** `{~a|b|c}`, `{&a|b|c}`, `{!a|b|c}`
5. **Weave/Gathers:** Nested choices

### Subtasks
1. Implement once-only vs sticky
2. Implement fallback choices
3. Implement alternative sequences
4. Implement weave parsing
5. Implement gather points

### Test Coverage
- 40 feature tests

---

## Task 2.7: Update File Format Parser

**Effort:** 40 hours
**Deliverable:** `lib/whisker/format/wls.lua`

### Changes

1. Update to WLS 1.0 JSON format
2. Support new text format directives
3. Add format version detection
4. Migration from old formats

### Subtasks
1. Update JSON schema handling
2. Update text parser
3. Add version migration
4. Update serialization

### Test Coverage
- 25 format tests

---

## Task 2.8: Create Migration Tool

**Effort:** 32 hours
**Deliverable:** `tools/migrate-to-wls.lua`

### Features

```bash
lua tools/migrate-to-wls.lua story.ws --output story-v1.ws
```

### Migrations
- `{{ expr }}` → `${ expr }`
- `&&` → `and`
- `||` → `or`
- `!` → `not`
- `!=` → `~=`
- Old API → New API

### Subtasks
1. Implement lexer for old syntax
2. Implement transformation rules
3. Implement output generator
4. Add dry-run mode
5. Add batch processing

### Test Coverage
- 20 migration tests

---

## Task 2.9: Write Unit Tests

**Effort:** 80 hours
**Deliverable:** `tests/wls/*.lua`

### Test Structure
```
tests/wls/
├── test_api.lua           # 40 tests
├── test_expressions.lua   # 30 tests
├── test_operators.lua     # 25 tests
├── test_conditionals.lua  # 35 tests
├── test_variables.lua     # 30 tests
├── test_features.lua      # 40 tests
├── test_formats.lua       # 25 tests
└── test_migration.lua     # 20 tests
```

### Subtasks
1. Write tests for each module
2. Ensure edge cases covered
3. Ensure error cases covered
4. Run and verify all pass

---

## Task 2.10: Update Documentation

**Effort:** 40 hours
**Deliverable:** `docs/*.md`

### Documents to Update
- README.md
- WHISKER_SCRIPT_TUTORIAL.md
- API_REFERENCE.md
- LANGUAGE_DESIGN.md

### Subtasks
1. Update all examples to WLS 1.0
2. Document new features
3. Add migration guide
4. Update API reference

---

## Task 2.11: Integration Testing

**Effort:** 40 hours
**Deliverable:** `tests/integration/*.lua`

### Tests
1. Full story execution
2. Complex branching scenarios
3. State management scenarios
4. Performance benchmarks

### Subtasks
1. Create integration test framework
2. Write scenario tests
3. Run WLS test corpus
4. Fix any failures

---

## Task 2.12: Performance Optimization

**Effort:** 24 hours
**Deliverable:** Performance improvements

### Areas
1. Parser performance
2. Expression evaluation
3. State management
4. Large story handling

### Subtasks
1. Profile current performance
2. Identify bottlenecks
3. Implement optimizations
4. Verify improvements

---

## Task 2.13: Write Phase Summary

**Effort:** 8 hours
**Deliverable:** `PHASE_2_SUMMARY.md`

### Content
- Changes implemented
- Test results
- Performance results
- Known issues
- Phase 4 prerequisites

---

## Milestone Checklist

Before Phase 4:

- [ ] All 13 tasks completed
- [ ] All unit tests passing (245+ tests)
- [ ] WLS test corpus: 100% passing
- [ ] Migration tool tested
- [ ] Documentation updated
- [ ] Performance acceptable
- [ ] No regressions from previous version
- [ ] STATE.md updated

---

## Dependencies

### Inputs (from Phase 1)
- WLS 1.0 specification
- EBNF grammar
- Test corpus

### Outputs (for Phase 4)
- Updated whisker-core
- Migration tool
- Test results
