# WLS 1.0 Enhancement Proposals

**Task:** 0.5
**Date:** December 29, 2025
**Status:** Complete

---

## Executive Summary

Based on analysis of Twine formats (Harlowe, SugarCube, Chapbook), Ink language, and the current whisker-core and whisker-editor-web implementations, this document proposes 18 enhancements for WLS 1.0.

**Key themes:**
1. **Unified Syntax** - Standardize on Lua-style operators across both platforms
2. **Text Dynamics** - Add cycling, shuffling, and sequence alternatives from Ink/Chapbook
3. **Scoped Variables** - Add temporary variables like SugarCube's `_temp` pattern
4. **Improved Flow** - Add gather points and tunnels inspired by Ink
5. **Choice Flexibility** - Add sticky vs once-only choice distinction

**Recommendation:** Prioritize 8 P1 enhancements that provide highest value with manageable complexity.

---

## Priority 1: Critical Enhancements

### E1.1: Lua-Style Operators

**Source:** Lua standard, whisker-core alignment
**User Value:** High
**Complexity:** Low
**Risk:** Medium (breaking change)

**Description:**
Replace JavaScript-style logical operators with Lua-style operators for consistency with embedded Lua code.

**Syntax Example:**
```whisker
// Before (current)
{ $hasKey && $gold >= 50 }
{ !$visited || $isVIP }

// After (WLS 1.0)
{ $hasKey and $gold >= 50 }
{ not $visited or $isVIP }
```

**Operator Changes:**
| Current | WLS 1.0 |
|---------|---------|
| `&&` | `and` |
| `||` | `or` |
| `!` | `not` |
| `!=` | `~=` |

**Rationale:**
- Consistency with embedded Lua code
- Reduces cognitive load switching between contexts
- Aligns with Lua's operator precedence rules

**Implementation Notes:**
- Lexer: Add `and`, `or`, `not`, `~=` as tokens
- Parser: Update operator precedence
- Migration: Search/replace with boundary detection

---

### E1.2: Temporary Variables

**Source:** SugarCube (`_temp`), Ink (`temp`)
**User Value:** High
**Complexity:** Medium
**Risk:** Low

**Description:**
Add passage-scoped temporary variables that are cleared when leaving a passage.

**Syntax Example:**
```whisker
:: CalculateDamage
_baseDamage = 10
_modifier = {{ math.random(1, 6) }}
_total = _baseDamage + _modifier

You deal $_total damage!
// _baseDamage, _modifier, _total are cleared on passage exit
```

**Rationale:**
- Prevents variable namespace pollution
- Clear scoping prevents bugs
- Common pattern in SugarCube stories

**Implementation Notes:**
- Lexer: Detect `_` prefix
- Runtime: Clear temp vars on passage transition
- Editor: Show temp vars differently in variable panel

---

### E1.3: Text Alternatives (Sequences)

**Source:** Ink (`{stopping:}`), Chapbook
**User Value:** High
**Complexity:** Medium
**Risk:** Low

**Description:**
Add syntax for text that varies each time it's encountered.

**Syntax Example:**
```whisker
// Sequence (stops on last)
{|First visit.|Second visit.|Same old place.}

// Multi-line sequence
{|
  |You enter the cave for the first time.
  |You return to the familiar cave.
  |The cave feels like home now.
}
```

**Rationale:**
- Essential for narrative variety
- Reduces repetitive content
- Present in all analyzed languages

**Implementation Notes:**
- Parser: New AST node for alternatives
- Runtime: Track encounter count per alternative
- Storage: Persist alternative states

---

### E1.4: Text Alternatives (Cycles)

**Source:** Ink (`{&}`), SugarCube
**User Value:** High
**Complexity:** Medium
**Risk:** Low

**Description:**
Text that cycles through options indefinitely.

**Syntax Example:**
```whisker
// Cycle (loops forever)
The clock shows {&|1|2|3|4|5|6|7|8|9|10|11|12} o'clock.

// Compact cycle syntax
It's {&Monday|Tuesday|Wednesday|Thursday|Friday}.
```

**Rationale:**
- Useful for ambient descriptions
- Creates dynamic, living world feel
- Simpler than scripting random selection

**Implementation Notes:**
- Reuse sequence infrastructure
- Modulo counter instead of stopping

---

### E1.5: Text Alternatives (Shuffle)

**Source:** Ink (`{~}`), Chapbook
**User Value:** High
**Complexity:** Medium
**Risk:** Low

**Description:**
Randomly selected text alternatives.

**Syntax Example:**
```whisker
// Shuffle (random selection)
You see {~|a bird|a squirrel|nothing|a shadow} in the trees.

// Can combine with conditions
The guard looks {~|bored|alert|sleepy}.
```

**Rationale:**
- Essential for procedural variety
- Keeps replays interesting
- Common narrative technique

**Implementation Notes:**
- Random seed management
- Consider "shuffle once" and "shuffle stopping" variants

---

### E1.6: Sticky vs Once-Only Choices

**Source:** Ink (`+` vs `*`)
**User Value:** High
**Complexity:** Low
**Risk:** Low

**Description:**
Distinguish between choices that persist and choices that disappear after selection.

**Syntax Example:**
```whisker
:: Shop
+ [Buy sword] -> BuySword      // Once-only: disappears after used
* [Look around] -> LookAround  // Sticky: always available
* [Ask about prices] -> Prices // Sticky: can ask repeatedly
+ [Leave shop] -> Exit         // Once-only: one-time exit
```

**Rationale:**
- Critical for exploration-based games
- Prevents exhausting all options accidentally
- Ink's most praised choice feature

**Implementation Notes:**
- Choice model: Add `sticky: boolean`
- Runtime: Track which once-only choices used
- Current `+` becomes once-only, new `*` for sticky

---

### E1.7: Unified API Namespace

**Source:** Original (alignment need)
**User Value:** High
**Complexity:** Medium
**Risk:** Medium (breaking change)

**Description:**
Standardize API across both platforms under `whisker.*` namespace.

**Syntax Example:**
```lua
// Unified API (both platforms)
whisker.state.get("gold")
whisker.state.set("gold", 100)
whisker.passage.current()
whisker.passage.go("Shop")
whisker.history.back()
whisker.visited("Caves")
```

**Current APIs:**
| whisker-core | whisker-editor-web | WLS 1.0 |
|--------------|-------------------|---------|
| `whisker.state:get()` | `game_state.get()` | `whisker.state.get()` |
| `whisker.passage:current()` | `passages.current()` | `whisker.passage.current()` |

**Rationale:**
- Stories portable between platforms
- Single API to learn
- Clear ownership of functions

**Implementation Notes:**
- Both platforms: Implement unified API
- Compatibility shim for migration period
- Warn on deprecated API usage

---

### E1.8: Visit Tracking Built-in

**Source:** Ink, Harlowe (`visits`)
**User Value:** High
**Complexity:** Low
**Risk:** Low

**Description:**
Built-in function to check how many times a passage has been visited.

**Syntax Example:**
```whisker
{ whisker.visited("Cave") == 0 }
This is your first time in the cave.
{ / }

{ whisker.visited("Cave") > 3 }
You know this cave well by now.
{ / }

// In conditions
+ { whisker.visited("Shop") > 0 } [Return to shop] -> Shop
```

**Rationale:**
- Extremely common pattern
- Currently requires manual tracking
- Present in all analyzed languages

**Implementation Notes:**
- Runtime: Auto-increment visit count on entry
- API: `whisker.visited(passageId)` returns count

---

## Priority 2: Important Enhancements

### E2.1: Inline Conditionals

**Source:** Ink, Chapbook
**User Value:** Medium
**Complexity:** Medium
**Risk:** Low

**Description:**
Conditional text inline without full block syntax.

**Syntax Example:**
```whisker
// Inline conditional
You have $gold gold {$gold == 1: piece | pieces}.
The door is {$hasKey: unlocked | locked}.

// Can chain
You feel {$health > 75: great | $health > 25: okay | terrible}.
```

**Rationale:**
- Reduces verbosity for simple conditions
- Better flow in prose
- Very common in Ink

**Implementation Notes:**
- Parser: New inline conditional node
- Consider nesting limits

---

### E2.2: Gather Points

**Source:** Ink weave
**User Value:** Medium
**Complexity:** High
**Risk:** Medium

**Description:**
Allow narrative branches to reconverge without explicit passage jumps.

**Syntax Example:**
```whisker
:: Conversation
"What do you think?" she asked.
* [Agree] She smiled.
* [Disagree] She frowned.
* [Stay silent] She waited.
- "Either way," she continued, "we should proceed."
```

**Rationale:**
- Elegant handling of convergent branches
- Reduces passage explosion
- Ink's signature feature

**Implementation Notes:**
- Parser: Handle `-` gather markers
- Significant parser complexity
- May need weave tracking stack

---

### E2.3: Tunnels (Subroutine Passages)

**Source:** Ink tunnels
**User Value:** Medium
**Complexity:** High
**Risk:** Medium

**Description:**
Call a passage and return to the current location.

**Syntax Example:**
```whisker
:: MorningRoutine
You wake up.
-> BrushTeeth ->
-> EatBreakfast ->
Ready for the day!

:: BrushTeeth
You brush your teeth thoroughly.
<-  // Return to caller

:: EatBreakfast
* [Cereal] Quick and easy.
* [Eggs] Delicious.
- <-  // Return to caller
```

**Rationale:**
- Enables reusable content blocks
- Reduces duplication
- Key Ink feature for complex stories

**Implementation Notes:**
- Runtime: Call stack for return addresses
- Parser: Handle `->passage->` and `<-` syntax
- Consider parameter passing

---

### E2.4: Expression Interpolation

**Source:** Original enhancement
**User Value:** Medium
**Complexity:** Medium
**Risk:** Low

**Description:**
Allow expressions in variable interpolation, not just simple variables.

**Syntax Example:**
```whisker
// Simple variable (existing)
You have $gold gold.

// Expression interpolation (new)
You have ${gold * 2} gold after doubling.
Total: ${gold + silver + bronze} coins.
Tax: ${gold * 0.1} gold.
```

**Rationale:**
- Reduces need for temporary variables
- More expressive inline math
- Common request

**Implementation Notes:**
- Lexer: Detect `${` vs `$`
- Parser: Parse expression within braces

---

### E2.5: Choice Actions Inline

**Source:** Ink, SugarCube
**User Value:** Medium
**Complexity:** Low
**Risk:** Low

**Description:**
Execute code when a choice is selected, inline in the choice definition.

**Syntax Example:**
```whisker
+ [Buy sword] { $gold -= 50 } -> Inventory
+ [Steal sword] { $karma -= 10; $hasGuardAlert = true } -> Escape
```

**Rationale:**
- Common pattern: modify state on choice
- Currently requires separate passage
- Cleaner story organization

**Implementation Notes:**
- Parser: Accept action block in choice
- Runtime: Execute action before navigation

---

### E2.6: Once-Only Text

**Source:** Ink (`{!}`)
**User Value:** Medium
**Complexity:** Low
**Risk:** Low

**Description:**
Text that shows once then never again.

**Syntax Example:**
```whisker
{!|For the first time, you notice a painting on the wall.}
// Shows first time only, then nothing

{!|"Welcome!"|"Nice to see you again."|"Hello."}
// Shows each once, then nothing
```

**Rationale:**
- Common narrative pattern
- First-time discovery moments
- Complements sequence/cycle

**Implementation Notes:**
- Variant of sequence with empty final state

---

## Priority 3: Nice-to-Have

### E3.1: Vars Section

**Source:** Chapbook
**User Value:** Low
**Complexity:** Medium
**Risk:** Low

**Description:**
Optional header section for variable declarations.

**Syntax Example:**
```whisker
:: Start
@vars
  gold: 100
  playerName: "Alice"
  hasKey: false

Welcome, $playerName! You have $gold gold.
```

**Rationale:**
- Clear variable documentation
- Separation of logic from prose
- Chapbook's clean pattern

---

### E3.2: Timed Content

**Source:** SugarCube (`<<timed>>`)
**User Value:** Low
**Complexity:** Medium
**Risk:** Low

**Description:**
Content that appears after a delay.

**Syntax Example:**
```whisker
You wait in the darkness.
@delay: 2s
Suddenly, a light appears!
```

---

### E3.3: Documentation Comments

**Source:** Original
**User Value:** Low
**Complexity:** Low
**Risk:** Low

**Description:**
Comments that are preserved in parsed output for documentation.

**Syntax Example:**
```whisker
/// This passage handles the main combat loop
/// @param enemy - The enemy being fought
:: CombatLoop
```

---

### E3.4: Debug Assertions

**Source:** Original
**User Value:** Low
**Complexity:** Low
**Risk:** Low

**Description:**
Debug-only assertions for testing.

**Syntax Example:**
```whisker
@assert $gold >= 0, "Gold should never be negative"
@assert whisker.visited("Start") > 0, "Must visit Start first"
```

---

## Deferred (Future Version)

### For WLS 2.0+

| Feature | Source | Reason for Deferral |
|---------|--------|---------------------|
| Threads | Ink | High complexity, niche use |
| Lists/Sets | Ink | Significant parser work |
| Include files | Ink | File system complexity |
| External functions | Ink | Security implications |
| Audio API | Chapbook | Presentation layer |
| Text transitions | Harlowe | Presentation layer |

---

## Enhancement Matrix

| ID | Enhancement | Source | Value | Complexity | Risk | Priority |
|----|-------------|--------|-------|------------|------|----------|
| E1.1 | Lua-Style Operators | Lua | High | Low | Medium | P1 |
| E1.2 | Temporary Variables | SugarCube | High | Medium | Low | P1 |
| E1.3 | Sequences | Ink | High | Medium | Low | P1 |
| E1.4 | Cycles | Ink | High | Medium | Low | P1 |
| E1.5 | Shuffles | Ink | High | Medium | Low | P1 |
| E1.6 | Sticky Choices | Ink | High | Low | Low | P1 |
| E1.7 | Unified API | Original | High | Medium | Medium | P1 |
| E1.8 | Visit Tracking | Ink/Harlowe | High | Low | Low | P1 |
| E2.1 | Inline Conditionals | Ink | Medium | Medium | Low | P2 |
| E2.2 | Gather Points | Ink | Medium | High | Medium | P2 |
| E2.3 | Tunnels | Ink | Medium | High | Medium | P2 |
| E2.4 | Expression Interpolation | Original | Medium | Medium | Low | P2 |
| E2.5 | Choice Actions | Ink | Medium | Low | Low | P2 |
| E2.6 | Once-Only Text | Ink | Medium | Low | Low | P2 |
| E3.1 | Vars Section | Chapbook | Low | Medium | Low | P3 |
| E3.2 | Timed Content | SugarCube | Low | Medium | Low | P3 |
| E3.3 | Doc Comments | Original | Low | Low | Low | P3 |
| E3.4 | Debug Assertions | Original | Low | Low | Low | P3 |

---

## Dependencies

```
E1.1 Lua-Style Operators
  └── E1.7 Unified API (both need migration)

E1.3 Sequences
  ├── E1.4 Cycles (same infrastructure)
  ├── E1.5 Shuffles (same infrastructure)
  └── E2.6 Once-Only Text (variant)

E1.6 Sticky Choices
  └── E1.8 Visit Tracking (related state)

E2.2 Gather Points
  └── E2.3 Tunnels (both need call stack)
```

---

## Implementation Order

**Phase 1: Foundation**
1. E1.1 Lua-Style Operators (lexer/parser updates)
2. E1.7 Unified API (API standardization)
3. E1.8 Visit Tracking (runtime enhancement)

**Phase 2: Variables & Choices**
4. E1.2 Temporary Variables (scoping)
5. E1.6 Sticky Choices (choice enhancement)
6. E2.5 Choice Actions (choice enhancement)

**Phase 3: Text Alternatives**
7. E1.3 Sequences (new syntax)
8. E1.4 Cycles (builds on sequences)
9. E1.5 Shuffles (builds on sequences)
10. E2.6 Once-Only Text (variant of sequences)

**Phase 4: Advanced Flow**
11. E2.1 Inline Conditionals (parser enhancement)
12. E2.4 Expression Interpolation (parser enhancement)
13. E2.2 Gather Points (if time permits)
14. E2.3 Tunnels (if time permits)

**Phase 5: Polish**
15. E3.1-E3.4 Nice-to-haves (as time permits)

---

## Summary

WLS 1.0 should prioritize:
- **8 P1 enhancements** for maximum impact
- **6 P2 enhancements** for improved authoring
- **4 P3 enhancements** as time permits

The implementation order balances:
- Foundation changes first (operators, API)
- High-value features early (alternatives, choices)
- Complex features later (gather points, tunnels)
