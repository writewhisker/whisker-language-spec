# Prompt 1.1: Introduction Chapter

## Context

Write the introduction chapter for the Whisker Language Specification 1.0.

## Prerequisites

- Phase 0 outputs available in `phase-0-research/outputs/`

## Task

Create the introduction chapter that sets the stage for the specification.

## Content Requirements

1. **Purpose Statement**
   - What is Whisker?
   - Who is this specification for?
   - What can you build with it?

2. **Design Philosophy**
   - Prose-first approach
   - Minimal syntax
   - Lua integration
   - Platform agnostic

3. **Notation Conventions**
   - RFC 2119 keywords (MUST, SHOULD, MAY)
   - Code example formatting
   - Syntax notation

4. **Document Organization**
   - Chapter overview
   - How to read the spec

5. **Version Information**
   - WLS 1.0 scope
   - Compatibility notes

## Output Format

Create `spec/01-INTRODUCTION.md`:

```markdown
# 1. Introduction

## 1.1 What is Whisker?

Whisker is a language for creating interactive fiction—stories where
readers make choices that affect the narrative...

## 1.2 Purpose of This Document

This specification defines the Whisker Language Specification version 1.0
(WLS 1.0). It is intended for:

- **Authors** creating interactive stories
- **Developers** implementing Whisker interpreters
- **Tool builders** creating editors and utilities

## 1.3 Design Philosophy

### 1.3.1 Prose First
[Description]

### 1.3.2 Minimal Syntax
[Description]

### 1.3.3 Lua Integration
[Description]

### 1.3.4 Platform Agnostic
[Description]

## 1.4 Notation Conventions

### 1.4.1 Requirement Levels

This document uses RFC 2119 terminology:

- **MUST**: Absolute requirement
- **SHOULD**: Recommended but not required
- **MAY**: Optional feature

### 1.4.2 Syntax Notation

Grammar is specified in EBNF notation:
- `|` indicates alternatives
- `[ ]` indicates optional elements
- `{ }` indicates zero or more repetitions

### 1.4.3 Examples

Code examples appear in blocks:

```whisker
:: Example
This is example content.
```

## 1.5 Document Structure

| Chapter | Content |
|---------|---------|
| 2 | Core Concepts |
| 3 | Syntax |
| ... | ... |

## 1.6 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025 | Initial specification |
```

## Token Budget

Target: ~2,000 tokens

## Execution

```
Write the introduction chapter for the WLS 1.0 specification.
Follow the outline above. Use professional technical writing style.
Reference Phase 0 design decisions for philosophy section.

Output to: phase-1-specification/spec/01-INTRODUCTION.md
```
