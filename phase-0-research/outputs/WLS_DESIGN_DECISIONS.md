# WLS 1.0 Design Decisions

**Task:** 0.6
**Date:** December 29, 2025
**Status:** Complete

---

## Decision Log

### D1: Variable Interpolation Syntax

**Decision:** Use `$var` for simple variables, `${expr}` for expressions

**Rationale:**
- Clean, minimal syntax for common case
- Clear visual distinction between simple and complex interpolation
- `$` prefix familiar from shell scripting and SugarCube
- Curly braces for expressions prevent ambiguity

**Alternatives Considered:**
| Option | Pros | Cons |
|--------|------|------|
| `{{var}}` | Template engine style | Verbose, conflicts with Lua blocks |
| `${{expr}}` | Clear expression marker | Inconsistent with simple case |
| `${var}` always | Consistent | Overly verbose for simple case |

**Breaking Changes:**
- whisker-editor-web: `{{var}}` → `$var` migration needed

---

### D2: Operators

**Decision:** Lua-style operators only (`and`, `or`, `not`, `~=`)

**Rationale:**
- Consistency with embedded Lua code
- Single mental model for authors
- Lua's precedence rules apply universally

**Operator Table:**

| Category | Operators |
|----------|-----------|
| Comparison | `==`, `~=`, `<`, `>`, `<=`, `>=` |
| Logical | `and`, `or`, `not` |
| Arithmetic | `+`, `-`, `*`, `/`, `%` |
| Assignment | `=`, `+=`, `-=` |

**Precedence (highest to lowest):**
1. `not`, unary `-`
2. `*`, `/`, `%`
3. `+`, `-`
4. `<`, `>`, `<=`, `>=`
5. `==`, `~=`
6. `and`
7. `or`

**Breaking Changes:**
- All: `&&` → `and`, `||` → `or`, `!` → `not`, `!=` → `~=`

---

### D3: Conditional Block Syntax

**Decision:** `{ condition }...{/}` for blocks, `{ condition: true | false }` for inline

**Rationale:**
- Curly braces align with expression syntax
- Minimal punctuation for clean prose
- `{/}` closing is short and clear

**Block Syntax:**
```whisker
{ $hasKey }
  You can unlock the door.
{/}

{ $gold >= 100 }
  You can afford the item.
{else}
  You need more gold.
{/}

{ $level >= 10 }
  Expert mode available.
{elif $level >= 5}
  Intermediate mode available.
{else}
  Keep practicing.
{/}
```

**Inline Syntax:**
```whisker
The door is {$hasKey: unlocked | locked}.
You have $gold gold {$gold == 1: piece | pieces}.
```

**Nesting Rules:**
- Block conditionals can nest to any depth
- Inline conditionals cannot nest (use block instead)
- Indentation is aesthetic only, not semantic

---

### D4: Comment Syntax

**Decision:** `//` for single-line, `/* */` for multi-line

**Rationale:**
- Familiar to most programmers
- Consistent with Lua (partial overlap)
- Clear visual distinction

**Syntax:**
```whisker
// Single-line comment

/* Multi-line
   comment */

$gold = 100  // Inline comment
```

**Nesting:** Multi-line comments do NOT nest.

---

### D5: API Namespace Structure

**Decision:** `whisker.*` namespace with dot notation

**Rationale:**
- Single unified API for both platforms
- Dot notation simpler than colon notation
- Clear hierarchical organization

**API Structure:**
```lua
whisker.state.*      -- Variable management
whisker.passage.*    -- Passage operations
whisker.history.*    -- Navigation history
whisker.choice.*     -- Choice management
whisker.util.*       -- Utility functions
whisker.visited()    -- Visit tracking (top-level)
whisker.random()     -- Random number (top-level)
```

**Breaking Changes:**
- whisker-core: `:` → `.` (e.g., `whisker.state:get()` → `whisker.state.get()`)
- whisker-editor-web: `game_state.*` → `whisker.state.*`

---

### D6: Choice Syntax

**Decision:** `+` for once-only, `*` for sticky; actions in braces

**Rationale:**
- Ink-inspired distinction is valuable
- `+` suggests single use, `*` suggests multiple
- Inline actions reduce passage explosion

**Syntax:**
```whisker
:: Shop
+ [Buy sword ($50)] { $gold -= 50 } -> Inventory
* [Look around] -> LookAround
+ { $gold >= 100 } [Buy armor] -> BuyArmor
* [Leave] -> Exit
```

**Components:**
- `+` or `*` - choice marker (once-only vs sticky)
- `{ condition }` - optional visibility condition
- `[text]` - displayed choice text
- `{ action }` - optional action block (after text)
- `-> target` - navigation target

---

### D7: Temporary Variables

**Decision:** `_` prefix for passage-scoped temporary variables

**Rationale:**
- Visual distinction from permanent variables
- SugarCube-inspired convention
- Clear scoping semantics

**Syntax:**
```whisker
:: Calculate
_base = 10
_modifier = {{ math.random(1, 6) }}
_total = _base + _modifier

Result: $_total

// _base, _modifier, _total cleared on passage exit
```

**Scoping Rules:**
- `$var` - story-scoped (persists across sessions)
- `_var` - passage-scoped (cleared on passage exit)

---

### D8: Text Alternatives

**Decision:** `{| }` for sequences, prefixes for variants

**Rationale:**
- Pipe separator is common convention
- Prefix modifiers are concise
- Builds on Ink patterns

**Syntax:**
```whisker
// Sequence (stops on last)
{| First visit. | Second visit. | Same old place. }

// Cycle (loops forever)
{&| Monday | Tuesday | Wednesday | Thursday | Friday }

// Shuffle (random each time)
{~| a bird | a squirrel | nothing }

// Once-only (each shows once, then nothing)
{!| First. | Second. | Third. }
```

**Modifiers:**
| Prefix | Behavior |
|--------|----------|
| (none) | Sequence (stopping) |
| `&` | Cycle (looping) |
| `~` | Shuffle (random) |
| `!` | Once-only |

---

### D9: Visit Tracking

**Decision:** Built-in `whisker.visited(passage)` function

**Rationale:**
- Extremely common pattern
- Automatic tracking reduces boilerplate
- Consistent with Ink and Harlowe

**API:**
```lua
whisker.visited("Cave")         -- Returns visit count (0 if never)
whisker.visited()               -- Returns current passage visit count
```

**Usage:**
```whisker
{ whisker.visited("Cave") == 0 }
  You enter the cave for the first time.
{else}
  You return to the familiar cave.
{/}
```

---

### D10: Passage Declaration

**Decision:** `:: Name` with optional metadata header

**Rationale:**
- Double colon is distinctive and easy to type
- Optional metadata block keeps simple stories simple
- Aligns with existing whisker-core

**Syntax:**
```whisker
:: PassageName
Content starts here.

:: PassageWithMetadata
@tags: important, chapter1
@color: #ff0000
Content with metadata.
```

**Metadata Directives:**
| Directive | Purpose |
|-----------|---------|
| `@tags:` | Passage tags (comma-separated) |
| `@color:` | Editor color |
| `@position:` | Editor position (x, y) |
| `@onEnter:` | Lua script on entry |
| `@onExit:` | Lua script on exit |

---

### D11: Passage Linking

**Decision:** Keep `[[text->target]]` syntax, add `[[target]]` shorthand

**Rationale:**
- Familiar from Twine/existing Whisker
- Arrow direction is intuitive
- Shorthand for when text matches target

**Syntax:**
```whisker
[[Go to the forest->Forest]]    // text and target different
[[Forest]]                       // text matches target
```

---

### D12: Embedded Lua

**Decision:** `{{ lua code }}` for inline, block form for multi-line

**Rationale:**
- Clear delimiters
- Supports both inline and block usage
- Avoids conflict with other syntax

**Syntax:**
```whisker
// Inline expression
$random = {{ math.random(1, 100) }}

// Multi-line block
{{
  local bonus = whisker.state.get("level") * 10
  whisker.state.set("gold", whisker.state.get("gold") + bonus)
}}
```

---

### D13: Escaping

**Decision:** Backslash escaping for special characters

**Rationale:**
- Standard escaping convention
- Clear and predictable

**Escape Sequences:**
| Sequence | Result |
|----------|--------|
| `\$` | Literal `$` |
| `\{` | Literal `{` |
| `\}` | Literal `}` |
| `\\` | Literal `\` |
| `\n` | Newline |
| `\t` | Tab |

---

## Syntax Reference

### Variables

```whisker
// Assignment
$gold = 100
$name = "Hero"
$hasKey = true
_temp = 50          // Temporary (passage-scoped)

// Modification
$gold += 50
$health -= 10

// Interpolation
You have $gold gold coins.
Name: $name

// Expression interpolation
Double: ${$gold * 2}
Random: ${whisker.random(1, 6)}
```

### Conditionals

```whisker
// Block conditional
{ $hasKey }
  You can unlock the door.
{/}

// With else
{ $gold >= 100 }
  You can afford it.
{else}
  Not enough gold.
{/}

// With elif
{ $health > 75 }
  Feeling great!
{elif $health > 25}
  A bit tired.
{else}
  Badly wounded.
{/}

// Inline conditional
The door is {$hasKey: unlocked | locked}.
```

### Choices

```whisker
// Once-only choice (disappears after use)
+ [Enter the cave] -> Cave

// Sticky choice (always available)
* [Look around] -> LookAround

// Conditional choice
+ { $hasKey } [Unlock door] -> Inside

// Choice with action
+ [Buy sword] { $gold -= 50 } -> Inventory

// Combined
+ { $gold >= 50 } [Buy sword ($50)] { $gold -= 50 } -> Inventory
```

### Text Alternatives

```whisker
// Sequence (stops on last)
{| First. | Second. | Third. }

// Cycle (loops forever)
{&| Red | Green | Blue }

// Shuffle (random)
{~| Option A | Option B | Option C }

// Once-only (shows each once)
{!| First only. | Second only. | Third only. }
```

### Passages

```whisker
:: Start
Welcome to the adventure!
+ [Begin] -> Chapter1

:: Chapter1
@tags: chapter, beginning
@color: #3498db
The journey begins here.

:: SecretRoom
@onEnter: whisker.state.set("foundSecret", true)
You discovered a secret!
```

### Comments

```whisker
// This is a single-line comment

/* This is a
   multi-line comment */

$gold = 100  // Inline comment
```

---

## API Reference

### whisker.state

| Function | Signature | Description |
|----------|-----------|-------------|
| `get` | `(key: string) -> any` | Get variable value |
| `set` | `(key: string, value: any) -> nil` | Set variable value |
| `has` | `(key: string) -> boolean` | Check if variable exists |
| `delete` | `(key: string) -> nil` | Remove variable |
| `all` | `() -> table` | Get all variables as table |
| `reset` | `() -> nil` | Clear all variables |

### whisker.passage

| Function | Signature | Description |
|----------|-----------|-------------|
| `current` | `() -> Passage` | Get current passage |
| `get` | `(id: string) -> Passage?` | Get passage by ID |
| `go` | `(id: string) -> nil` | Navigate to passage |
| `exists` | `(id: string) -> boolean` | Check if passage exists |
| `all` | `() -> table` | Get all passages |
| `tags` | `(tag: string) -> table` | Get passages with tag |

### whisker.history

| Function | Signature | Description |
|----------|-----------|-------------|
| `back` | `() -> boolean` | Go back one step |
| `canBack` | `() -> boolean` | Check if can go back |
| `list` | `() -> table` | Get history list |
| `count` | `() -> number` | Get history length |
| `clear` | `() -> nil` | Clear history |

### whisker.choice

| Function | Signature | Description |
|----------|-----------|-------------|
| `available` | `() -> table` | Get available choices |
| `select` | `(index: number) -> nil` | Select choice by index |
| `count` | `() -> number` | Count available choices |

### Top-Level Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `whisker.visited` | `(passage?: string) -> number` | Get visit count |
| `whisker.random` | `(min: number, max: number) -> number` | Random integer |
| `whisker.pick` | `(...) -> any` | Random pick from args |

---

## Feature Inclusion

| Feature | Included | Priority | Notes |
|---------|----------|----------|-------|
| Lua-style operators | Yes | P1 | Core syntax change |
| Temporary variables | Yes | P1 | `_` prefix |
| Text sequences | Yes | P1 | `{\| a \| b}` |
| Text cycles | Yes | P1 | `{&\| a \| b}` |
| Text shuffles | Yes | P1 | `{~\| a \| b}` |
| Sticky choices | Yes | P1 | `*` marker |
| Unified API | Yes | P1 | `whisker.*` |
| Visit tracking | Yes | P1 | Built-in function |
| Inline conditionals | Yes | P2 | `{cond: a \| b}` |
| Gather points | No | - | Deferred to v2 |
| Tunnels | No | - | Deferred to v2 |
| Expression interpolation | Yes | P2 | `${expr}` |
| Choice actions | Yes | P2 | Inline `{ action }` |
| Once-only text | Yes | P2 | `{!\| a \| b}` |
| Vars section | No | - | Nice-to-have only |
| Timed content | No | - | Deferred to v2 |
| Threads | No | - | Deferred to v2 |

---

## Format Specifications

### Text Format (.ws)

**File Structure:**
```whisker
// Optional story header
@title: My Story
@author: Author Name
@ifid: UUID
@version: 1.0

:: Start
Story content begins here.

:: Passage2
More content.
```

**Story Header Directives:**
| Directive | Required | Description |
|-----------|----------|-------------|
| `@title:` | No | Story title |
| `@author:` | No | Author name |
| `@ifid:` | Recommended | Unique story identifier |
| `@version:` | No | Story version |
| `@start:` | No | Start passage (default: first) |

### JSON Format

**Version:** 2.1
**Schema:** `wls-1.0.schema.json`

**Structure:**
```json
{
  "format": "whisker",
  "version": "2.1",
  "wls": "1.0",
  "metadata": {
    "title": "Story Title",
    "author": "Author Name",
    "ifid": "UUID",
    "created": "ISO8601",
    "modified": "ISO8601"
  },
  "settings": {},
  "variables": {},
  "passages": [],
  "assets": []
}
```

---

## Migration Notes

### From whisker-core (current)

| Change | Migration |
|--------|-----------|
| `&&` → `and` | Regex: `/&&/g` → `and` |
| `||` → `or` | Regex: `/\|\|/g` → `or` |
| `!` → `not` | Regex: `/!(?!=)/g` → `not ` |
| `!=` → `~=` | Regex: `/!=/g` → `~=` |
| `:` → `.` in API | Regex: `/whisker\.(\w+):/g` → `whisker.$1.` |

### From whisker-editor-web (current)

| Change | Migration |
|--------|-----------|
| `{{var}}` → `$var` | Regex: `/\{\{(\w+)\}\}/g` → `$$1` |
| `game_state.get()` → `whisker.state.get()` | String replace |
| `passages.current()` → `whisker.passage.current()` | String replace |

### Migration Tool Requirements

1. **Automatic conversion** for:
   - Operator replacement
   - Variable interpolation syntax
   - API namespace changes

2. **Manual review** for:
   - Complex Lua expressions
   - Custom scripting patterns
   - Edge cases with escaping

3. **Validation** after migration:
   - Parse both formats
   - Compare AST equivalence
   - Run test suite

---

## Summary

WLS 1.0 design decisions prioritize:
1. **Consistency** - Lua-style operators, unified API
2. **Simplicity** - Clean syntax, minimal punctuation
3. **Power** - Text alternatives, choice flexibility, expression interpolation
4. **Migration** - Clear path from existing implementations

Key syntax choices:
- `$var` / `${expr}` for interpolation
- `{ cond }...{/}` for conditionals
- `+` / `*` for once-only / sticky choices
- `{| }`, `{& }`, `{~ }`, `{! }` for alternatives
- `_var` for temporary variables
- `whisker.*` unified API
