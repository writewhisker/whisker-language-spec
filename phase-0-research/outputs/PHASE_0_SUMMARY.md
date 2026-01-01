# Phase 0 Summary: Research & Design

**Date:** December 29, 2025
**Status:** Complete

---

## Executive Summary

Phase 0 research analyzed three major interactive fiction systems (Twine's Harlowe/SugarCube/Chapbook, and Ink) alongside audits of the existing whisker-core and whisker-editor-web implementations. The goal was to identify the most valuable features to incorporate into WLS 1.0 while ensuring bi-directional compatibility between both Whisker platforms.

**Key findings:**
- Current Whisker implementations have ~45% feature coverage compared to competitors
- The two platforms have incompatible APIs (`whisker.state:get()` vs `game_state.get()`)
- Ink's text alternatives and choice flexibility are highly valued features missing from Whisker
- SugarCube's temporary variable scoping solves a real authoring problem

**Key decisions:**
- Adopt Lua-style operators (`and`, `or`, `not`, `~=`) for consistency
- Unified API under `whisker.*` namespace with dot notation
- Add 12 new features including text alternatives, sticky choices, and temporary variables
- Defer complex features (tunnels, threads, gather points) to WLS 2.0

WLS 1.0 will achieve 71% feature coverage, positioning it as a competitive, modern IF language that's easier to learn than Ink while more powerful than Harlowe.

---

## Research Findings

### Twine Analysis

**Harlowe 3.x:**
- Elegant hook system for conditional text
- `it` keyword reduces variable repetition
- Macro-based approach keeps logic close to prose

**SugarCube 2.x:**
- Robust save/load system with multiple slots
- Clear `_temp` variable scoping
- Full JavaScript integration for extensibility

**Chapbook 1.x:**
- Clean vars section separates logic from prose
- Insert/modifier pattern is conceptually clear
- Cycling/reveal links for dynamic content

### Ink Analysis

**Most valuable patterns:**
- Weave/gather for inline branching that reconverges
- `*` (once-only) vs `+` (sticky) choice distinction
- Text alternatives: sequences, cycles, shuffles
- Tunnels for reusable content blocks
- Built-in visit counting

### Current Whisker State

**Gaps identified:**
| Gap | Impact |
|-----|--------|
| API mismatch | Stories not portable |
| No text alternatives | Repetitive content |
| No temporary variables | Namespace pollution |
| No sticky choices | Limited exploration design |
| JavaScript operators | Inconsistent with Lua |
| No inline conditionals | Verbose syntax |

---

## Design Decisions

### Syntax

| Element | Syntax | Example |
|---------|--------|---------|
| Variables | `$var`, `${expr}` | `$gold`, `${gold * 2}` |
| Temp vars | `_var` | `_count = 0` |
| Conditionals | `{ cond }...{/}` | `{ $hasKey }...{/}` |
| Inline cond | `{cond: a \| b}` | `{$x: yes \| no}` |
| Operators | Lua-style | `and`, `or`, `not`, `~=` |
| Sequences | `{\| a \| b}` | `{\| First. \| Again.}` |
| Cycles | `{&\| a \| b}` | `{&\| Red \| Blue}` |
| Shuffles | `{~\| a \| b}` | `{~\| bird \| cat}` |
| Once-only | `+` | `+ [Buy] -> Shop` |
| Sticky | `*` | `* [Look] -> Look` |

### API

```lua
whisker.state.get(key)
whisker.state.set(key, value)
whisker.passage.current()
whisker.passage.go(id)
whisker.history.back()
whisker.visited(passage)
whisker.random(min, max)
```

### Features Included (WLS 1.0)

**Priority 1:**
- Lua-style operators
- Temporary variables
- Text sequences/cycles/shuffles
- Sticky vs once-only choices
- Unified API
- Built-in visit tracking

**Priority 2:**
- Inline conditionals
- Expression interpolation
- Choice actions
- Once-only text
- Elif support

### Features Deferred (WLS 2.0+)

| Feature | Rationale |
|---------|-----------|
| Tunnels | High parser complexity |
| Threads | High runtime complexity |
| Gather points | Significant architecture change |
| Lists/sets | Scope creep |
| Includes | File system complexity |
| External calls | Security implications |

---

## Enhancement Summary

### From Twine
- **Temporary variables** (SugarCube): `_var` prefix for passage-scoped vars
- **Visit tracking** (Harlowe): Built-in `whisker.visited()` function

### From Ink
- **Text alternatives**: Sequences, cycles, shuffles, once-only
- **Sticky choices**: `*` marker for repeatable choices
- **Inline conditionals**: `{cond: true | false}` syntax
- **Choice actions**: Inline script execution on choice

### Original
- **Expression interpolation**: `${expr}` for inline expressions
- **Unified API**: Single `whisker.*` namespace for both platforms
- **Elif support**: `{elif cond}` in conditional blocks

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Migration breaks stories | Medium | High | Migration tool with validation |
| Parser complexity | Medium | Medium | Incremental implementation |
| Learning curve | Low | Medium | Tutorial and examples |
| Performance regression | Low | High | Benchmarking from start |
| API confusion | Medium | Medium | Compatibility shim period |
| Scope creep | High | High | Strict feature freeze |

---

## Phase 1 Prerequisites

### Inputs Ready
- [x] Design decisions finalized (13 decisions)
- [x] Feature set approved (12 new features)
- [x] Success criteria defined (14 criteria)
- [x] Test corpus outlined (275 cases)
- [x] Feature matrix complete (56 features)

### Open Questions
1. Should `{else}` or `{|}` be used for else clauses in inline conditionals?
2. What is the exact behavior when alternatives run out of content?
3. Should passage IDs be case-sensitive?

### Recommended Focus for Phase 1

1. **Core syntax specification** - Get the EBNF grammar locked down
2. **API specification** - Complete function signatures
3. **Test corpus design** - Cover all edge cases
4. **Migration specification** - Document all breaking changes

---

## Appendix: Document Index

| Document | Purpose | Status |
|----------|---------|--------|
| TWINE_ANALYSIS.md | Harlowe, SugarCube, Chapbook research | Complete |
| INK_ANALYSIS.md | Ink language research | Complete |
| WHISKER_CORE_CURRENT.md | Core implementation audit | Complete |
| WHISKER_EDITOR_CURRENT.md | Editor implementation audit | Complete |
| ENHANCEMENT_PROPOSALS.md | 18 proposed features | Complete |
| WLS_DESIGN_DECISIONS.md | 13 final design choices | Complete |
| FEATURE_MATRIX.md | 56-feature comparison table | Complete |
| SUCCESS_CRITERIA.md | 14 success metrics | Complete |

---

## Next Steps

1. **Begin Phase 1** with specification writing
2. **Start with EBNF grammar** to lock syntax
3. **Create JSON schema** for format validation
4. **Design test corpus** covering all features
5. **Review and approve** specification before Phase 2

---

## Handoff State

```
Phase: 0 - Research & Design
Status: COMPLETE
Tasks: 9/9 complete
Deliverables: 9/9 complete
Next: Phase 1 - Specification
Blockers: None
```
