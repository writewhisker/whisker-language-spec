# WLS 1.0 Test Corpus

This directory contains the official test corpus for validating WLS 1.0 implementations.

## Structure

```
test-corpus/
├── syntax/          # Lexical and syntactic tests
├── variables/       # Variable system tests
├── conditionals/    # Control flow tests
├── choices/         # Choice system tests
├── alternatives/    # Text alternative tests
├── api/             # Lua API tests
├── formats/         # File format tests
└── edge-cases/      # Boundary and edge case tests
```

## Test Format

Each test file uses YAML format:

```yaml
name: test-name
description: What this test validates
category: category-name
input: |
  :: Start
  Test content...
expected:
  passages: 1
  output: "Expected output text"
  variables:
    gold: 100
  error: null  # or error message for error tests
```

## Running Tests

Implementations should:

1. Parse the `input` field as a Whisker story
2. Execute from the start passage
3. Compare results against `expected` fields
4. Report pass/fail for each test

## Test Categories

| Category | Count | Description |
|----------|-------|-------------|
| syntax | 50 | Lexical structure, tokens, parsing |
| variables | 35 | Variable declaration, types, scope |
| conditionals | 40 | Block/inline conditionals, nesting |
| choices | 30 | Choice types, conditions, actions |
| alternatives | 25 | Sequence, cycle, shuffle, once-only |
| api | 25 | Lua API function tests |
| formats | 15 | Text and JSON format tests |
| edge-cases | 30 | Boundary conditions, limits |
| **Total** | **250** | |

## Conformance

An implementation is conformant if it passes all non-error tests and correctly rejects all error tests with appropriate error messages.
