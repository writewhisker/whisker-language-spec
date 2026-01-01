# Whisker Language Specification 1.0

**Complete Specification Document**

**Version:** 1.0.0
**Date:** December 29, 2025
**Status:** Final

---

## Table of Contents

### Part I: Foundation

- [Chapter 1: Introduction](#chapter-1-introduction)
  - 1.1 Purpose
  - 1.2 Scope
  - 1.3 Design Philosophy
  - 1.4 Notation Conventions
  - 1.5 Document Structure
  - 1.6 Terminology
  - 1.7 Conformance

- [Chapter 2: Core Concepts](#chapter-2-core-concepts)
  - 2.1 Overview
  - 2.2 Stories
  - 2.3 Passages
  - 2.4 Choices
  - 2.5 State
  - 2.6 Execution Model
  - 2.7 Lifecycle Events
  - 2.8 Navigation
  - 2.9 Error Handling

### Part II: Language Reference

- [Chapter 3: Syntax](#chapter-3-syntax)
  - 3.1 Lexical Structure
  - 3.2 Tokens
  - 3.3 Keywords
  - 3.4 Operators
  - 3.5 Expressions
  - 3.6 Statements
  - 3.7 Comments
  - 3.8 Escape Sequences

- [Chapter 4: Variables](#chapter-4-variables)
  - 4.1 Overview
  - 4.2 Variable Declaration
  - 4.3 Variable Types
  - 4.4 Variable Scopes
  - 4.5 Variable Interpolation
  - 4.6 Variable Operations
  - 4.7 Type Coercion

- [Chapter 5: Control Flow](#chapter-5-control-flow)
  - 5.1 Overview
  - 5.2 Block Conditionals
  - 5.3 Inline Conditionals
  - 5.4 Text Alternatives
  - 5.5 Evaluation Order

- [Chapter 6: Choices](#chapter-6-choices)
  - 6.1 Overview
  - 6.2 Basic Choice Syntax
  - 6.3 Choice Types
  - 6.4 Conditional Choices
  - 6.5 Choice Actions
  - 6.6 Choice Presentation
  - 6.7 Advanced Patterns
  - 6.8 Fallback Behavior

### Part III: API & Formats

- [Chapter 7: Lua API](#chapter-7-lua-api)
  - 7.1 Overview
  - 7.2 Embedded Lua
  - 7.3 whisker.state
  - 7.4 whisker.passage
  - 7.5 whisker.history
  - 7.6 whisker.choice
  - 7.7 Top-Level Functions
  - 7.8 Lua Standard Library
  - 7.9 Sandboxing

- [Chapter 8: File Formats](#chapter-8-file-formats)
  - 8.1 Overview
  - 8.2 Text Format (.ws)
  - 8.3 JSON Format
  - 8.4 Format Conversion
  - 8.5 MIME Types
  - 8.6 Validation

### Part IV: Practical Guide

- [Chapter 9: Examples](#chapter-9-examples)
  - 9.1 Hello World
  - 9.2 Basic Navigation
  - 9.3 Variables and State
  - 9.4 Conditionals
  - 9.5 Text Alternatives
  - 9.6 Choice Patterns
  - 9.7 Lua API Usage
  - 9.8 Complete Game

- [Chapter 10: Best Practices](#chapter-10-best-practices)
  - 10.1 Story Organization
  - 10.2 Variable Management
  - 10.3 Control Flow Patterns
  - 10.4 Choice Design
  - 10.5 State Management
  - 10.6 Testing Strategies
  - 10.7 Common Pitfalls

### Part V: Reference

- [Appendix A: Keywords](#appendix-a-keywords)
- [Appendix B: Operator Reference](#appendix-b-operator-reference)
- [Appendix C: Escape Sequences](#appendix-c-escape-sequences)
- [Appendix D: Error Codes](#appendix-d-error-codes)
- [Appendix E: Migration Guide](#appendix-e-migration-guide)
- [Appendix F: Glossary](#appendix-f-glossary)
- [Appendix G: Quick Reference](#appendix-g-quick-reference)

### Formal Specifications

- [EBNF Grammar](GRAMMAR.ebnf)
- [JSON Schema](../../shared/schemas/wls-1.0.schema.json)

---

## Document Map

| Document | Location | Description |
|----------|----------|-------------|
| 01-INTRODUCTION.md | spec/ | Chapter 1 |
| 02-CORE_CONCEPTS.md | spec/ | Chapter 2 |
| 03-SYNTAX.md | spec/ | Chapter 3 |
| 04-VARIABLES.md | spec/ | Chapter 4 |
| 05-CONTROL_FLOW.md | spec/ | Chapter 5 |
| 06-CHOICES.md | spec/ | Chapter 6 |
| 07-LUA_API.md | spec/ | Chapter 7 |
| 08-FILE_FORMATS.md | spec/ | Chapter 8 |
| 09-EXAMPLES.md | spec/ | Chapter 9 |
| 10-BEST_PRACTICES.md | spec/ | Chapter 10 |
| APPENDICES.md | spec/ | Appendices A-G |
| GRAMMAR.ebnf | spec/ | Formal grammar |
| wls-1.0.schema.json | shared/schemas/ | JSON Schema |
| test-corpus/ | phase-4-validation/ | 250 test cases |

---

## Specification Summary

### Language Features

| Feature | Syntax | Reference |
|---------|--------|-----------|
| Story variables | `$varName` | Ch. 4 |
| Temp variables | `_varName` | Ch. 4 |
| Simple interpolation | `$var` | Ch. 4.5 |
| Expression interpolation | `${expr}` | Ch. 4.5 |
| Block conditional | `{ cond }...{/}` | Ch. 5.2 |
| Inline conditional | `{cond: a \| b}` | Ch. 5.3 |
| Sequence alternative | `{\| a \| b}` | Ch. 5.4 |
| Cycle alternative | `{&\| a \| b}` | Ch. 5.4 |
| Shuffle alternative | `{~\| a \| b}` | Ch. 5.4 |
| Once-only alternative | `{!\| a \| b}` | Ch. 5.4 |
| Once-only choice | `+ [text] -> target` | Ch. 6.3 |
| Sticky choice | `* [text] -> target` | Ch. 6.3 |
| Conditional choice | `+ { cond } [text] -> target` | Ch. 6.4 |
| Choice action | `+ [text] { action } -> target` | Ch. 6.5 |
| Embedded Lua | `{{ code }}` | Ch. 7.2 |

### Operators

| Precedence | Operators |
|------------|-----------|
| 1 (highest) | `not`, `-` (unary) |
| 2 | `*`, `/`, `%` |
| 3 | `+`, `-` |
| 4 | `..` |
| 5 | `<`, `>`, `<=`, `>=` |
| 6 | `==`, `~=` |
| 7 | `and` |
| 8 (lowest) | `or` |

### API Namespaces

| Namespace | Functions |
|-----------|-----------|
| `whisker.state` | get, set, has, delete, all, reset |
| `whisker.passage` | current, get, go, exists, all, tags |
| `whisker.history` | back, canBack, list, count, contains, clear |
| `whisker.choice` | available, select, count |
| Top-level | visited, random, pick, print |

### File Formats

| Format | Extension | MIME Type |
|--------|-----------|-----------|
| Text | `.ws` | `text/x-whisker` |
| JSON | `.json` | `application/json` |

---

## Conformance Requirements

### Implementation Conformance

An implementation is **WLS 1.0 conformant** if it:

1. ✓ Correctly parses all valid WLS 1.0 syntax
2. ✓ Correctly rejects all invalid WLS 1.0 syntax with appropriate errors
3. ✓ Implements all MUST requirements in this specification
4. ✓ Implements the complete `whisker.*` API
5. ✓ Produces identical output for the WLS 1.0 test corpus

### Story Conformance

A story is **WLS 1.0 conformant** if it:

1. ✓ Uses only syntax defined in this specification
2. ✓ Uses only API functions defined in this specification
3. ✓ Produces consistent behavior across all conformant implementations

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-29 | Initial release |

---

## Cross-Reference Index

### By Topic

| Topic | Primary | Related |
|-------|---------|---------|
| Variables | Ch. 4 | Ch. 3.5, Ch. 7.3 |
| Conditionals | Ch. 5.2-5.3 | Ch. 3.4, App. B |
| Choices | Ch. 6 | Ch. 2.4, Ch. 5 |
| Navigation | Ch. 2.8 | Ch. 6, Ch. 7.4-7.5 |
| State | Ch. 2.5 | Ch. 4, Ch. 7.3 |
| Lua API | Ch. 7 | Ch. 5.4, Ch. 6.5 |
| Parsing | Ch. 3 | GRAMMAR.ebnf |
| Validation | Ch. 8.6 | JSON Schema |

### By Syntax Element

| Element | Definition | Usage |
|---------|------------|-------|
| `::` | Ch. 2.3.2 | Passage declaration |
| `$` | Ch. 4.4.1 | Story variable prefix |
| `_` | Ch. 4.4.2 | Temp variable prefix |
| `{ }` | Ch. 5.2 | Conditional block |
| `{/}` | Ch. 5.2 | Conditional close |
| `{\|}` | Ch. 5.4.2 | Sequence alternative |
| `+` | Ch. 6.3.1 | Once-only choice |
| `*` | Ch. 6.3.2 | Sticky choice |
| `->` | Ch. 6.2.3 | Navigation target |
| `{{ }}` | Ch. 7.2 | Embedded Lua |
| `@` | Ch. 2.2.3 | Directive prefix |

---

## Acknowledgments

WLS 1.0 draws inspiration from:

- **Twine** - Harlowe, SugarCube, Chapbook story formats
- **Ink** - inkle's narrative scripting language
- **Lua** - Scripting language

---

## Reference Implementations

| Implementation | Language | Platform |
|----------------|----------|----------|
| whisker-core | Lua | CLI, Desktop, Embedded |
| whisker-editor-web | TypeScript | Web browsers |

Both implementations produce identical behavior for all WLS 1.0 stories.

---

## Contact & Feedback

- **Specification Issues:** Report at project repository
- **Implementation Questions:** See implementation documentation

---

## License

This specification is released for public use. Implementations may freely claim WLS 1.0 conformance upon passing the test corpus.

---

**End of Whisker Language Specification 1.0**

*Document generated: December 29, 2025*
*Total specification size: ~60,000 tokens across all documents*
