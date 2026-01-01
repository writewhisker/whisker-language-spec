# Phase 1: Specification - Detailed Plan

## Objective

Create the comprehensive Whisker Language Specification 1.0 document.

## Duration: 3 Weeks (Weeks 3-5)
## Effort: 300 hours

---

## Task 1.1: Introduction

**Effort:** 16 hours
**Deliverable:** `spec/01-INTRODUCTION.md`

### Content
- Document purpose and audience
- Design philosophy
- Notation conventions (RFC 2119)
- Document structure overview
- Version history

### Test Coverage
- N/A (documentation)

---

## Task 1.2: Core Concepts

**Effort:** 24 hours
**Deliverable:** `spec/02-CORE_CONCEPTS.md`

### Content
- Stories: structure, metadata
- Passages: definition, content
- Choices: player decisions
- State: game state management
- Execution model
- Lifecycle events

### Test Coverage
- Conceptual tests: 10 cases

---

## Task 1.3: Syntax Specification

**Effort:** 40 hours
**Deliverable:** `spec/03-SYNTAX.md`

### Content
- Lexical structure
- Tokens and keywords
- Operators (complete list)
- Expressions
- Statements
- Comments
- Escape sequences
- Whitespace handling

### Test Coverage
- Syntax tests: 50 cases

---

## Task 1.4: Variable System

**Effort:** 24 hours
**Deliverable:** `spec/04-VARIABLES.md`

### Content
- Variable declaration
- Variable types (number, string, boolean)
- Variable scoping (global, temp)
- Variable interpolation (`$var`)
- Expression interpolation (`${expr}`)
- Lists (if included)
- Type coercion rules

### Test Coverage
- Variable tests: 30 cases

---

## Task 1.5: Control Flow

**Effort:** 24 hours
**Deliverable:** `spec/05-CONTROL_FLOW.md`

### Content
- Conditional blocks (`{ cond }...{/}`)
- Else clauses (`{else}`)
- Inline conditionals (`{cond: text}`)
- Nested conditionals
- Alternative text (sequence, shuffle, cycle)
- Evaluation order

### Test Coverage
- Control flow tests: 35 cases

---

## Task 1.6: Choice System

**Effort:** 24 hours
**Deliverable:** `spec/06-CHOICES.md`

### Content
- Basic choices (`+ [text] -> target`)
- Conditional choices
- Once-only choices
- Sticky choices
- Fallback choices
- Nested choices (weave)
- Choice actions
- Gathers

### Test Coverage
- Choice tests: 25 cases

---

## Task 1.7: Lua API Reference

**Effort:** 32 hours
**Deliverable:** `spec/07-LUA_API.md`

### Content

#### whisker.state
- get(key)
- set(key, value)
- has(key)
- delete(key)
- all()

#### whisker.passage
- current()
- get(id)
- exists(id)
- tags(id)
- visited(id)

#### whisker.navigation
- goto(id)
- back()
- restart()

#### whisker.history
- entries
- length
- contains(id)

#### whisker.util
- random(min, max)
- print(...)

### Test Coverage
- API tests: 40 cases

---

## Task 1.8: File Formats

**Effort:** 24 hours
**Deliverable:** `spec/08-FILE_FORMATS.md`

### Content

#### Text Format (.ws)
- File structure
- Frontmatter
- Declarations
- Passage syntax
- Complete example

#### JSON Format
- Schema overview
- Story object
- Passage object
- Choice object
- Variable definitions
- Complete example

### Test Coverage
- Format tests: 20 cases

---

## Task 1.9: EBNF Grammar

**Effort:** 24 hours
**Deliverable:** `spec/GRAMMAR.ebnf`

### Content
- Complete formal grammar
- All productions
- Terminal definitions
- Comments and whitespace rules

### Test Coverage
- Grammar validation against all examples

---

## Task 1.10: JSON Schema

**Effort:** 16 hours
**Deliverable:** `shared/schemas/wls-1.0.schema.json`

### Content
- Complete JSON Schema for WLS format
- All object definitions
- Validation rules
- Examples

### Test Coverage
- Schema tests: 15 cases

---

## Task 1.11: Examples Chapter

**Effort:** 24 hours
**Deliverable:** `spec/09-EXAMPLES.md`

### Content
- Simple story (hello world)
- Variables example
- Conditionals example
- Choice patterns
- State management
- Ink-style features
- Complete game example

### Test Coverage
- All examples must run correctly

---

## Task 1.12: Best Practices

**Effort:** 16 hours
**Deliverable:** `spec/10-BEST_PRACTICES.md`

### Content
- Story organization
- Variable naming
- State management patterns
- Performance tips
- Testing strategies
- Common pitfalls

### Test Coverage
- N/A (documentation)

---

## Task 1.13: Test Corpus

**Effort:** 32 hours
**Deliverable:** `phase-4-validation/test-corpus/`

### Content
- 200+ test cases
- Organized by feature
- Input + expected output
- Edge cases
- Error cases

### Structure
```
test-corpus/
├── syntax/
├── variables/
├── conditionals/
├── choices/
├── api/
├── formats/
└── edge-cases/
```

---

## Task 1.14: Appendices

**Effort:** 16 hours
**Deliverable:** `spec/APPENDICES.md`

### Content
- Keyword list
- Operator precedence table
- Escape sequences
- Error codes
- Migration guide
- Glossary

### Test Coverage
- N/A (reference)

---

## Task 1.15: Compile Complete Spec

**Effort:** 8 hours
**Deliverable:** `spec/WLS-1.0-COMPLETE.md`

### Content
- Combine all chapters
- Add table of contents
- Add cross-references
- Final formatting

### Test Coverage
- Link validation

---

## Milestone Checklist

Before proceeding to Phase 2:

- [ ] All 15 tasks completed
- [ ] spec/ directory complete
- [ ] GRAMMAR.ebnf validates
- [ ] JSON schema validates
- [ ] All examples run correctly
- [ ] 200+ test cases defined
- [ ] WLS-1.0-COMPLETE.md generated
- [ ] Technical review complete
- [ ] STATE.md updated

---

## Dependencies

### Inputs (from Phase 0)
- WLS_DESIGN_DECISIONS.md
- ENHANCEMENT_PROPOSALS.md
- SUCCESS_CRITERIA.md

### Outputs (for Phases 2, 3, 4)
- Complete specification
- EBNF grammar
- JSON schema
- Test corpus
