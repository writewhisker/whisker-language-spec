# whisker-core Current State Audit

**Task:** 0.3
**Date:** December 29, 2025
**Status:** Complete

---

## Overview

**whisker-core** is a pure Lua interactive fiction engine designed for creating choice-based narratives. It's embeddable, zero-dependency, and serves as the reference implementation for the Whisker language.

**Key Stats:**
- Language: Pure Lua
- Dependencies: None
- Tests: 3000+ passing
- Platforms: CLI, Desktop (Lua), Web (via JavaScript)
- Format versions: v1.0 (verbose), v2.0 (compact)

---

## Current Syntax

### Passages

Passages are declared with `::` followed by a name:

```whisker
:: PassageName
Content of the passage goes here.
Multiple lines are supported.

:: AnotherPassage
More content here.
```

**Rules:**
- Names must start with letter or underscore
- Can contain letters, numbers, underscores
- Case-sensitive (`Start` ≠ `start`)
- End at next `::` or file end

### Choices

```whisker
+ [Choice text] -> TargetPassage
+ { condition } [Choice text] -> TargetPassage
+ [Buy sword ($gold gold)] -> Shop
```

**Components:**
- `+` marks choice start
- `{ }` optional condition
- `[ ]` display text
- `->` target arrow
- Variable interpolation in text supported

### Variables

**Creation and Assignment:**
```whisker
$gold = 100
$player_name = "Alice"
$has_key = true
$health = 100.5
```

**Modification:**
```whisker
$gold += 50
$health -= 10
$visits += 1
```

**Types:** Numbers (int/float), strings, booleans

**Interpolation:**
```whisker
You have $gold gold coins.
Welcome, $player_name!
```

### Conditionals

```whisker
{ $has_key }
You unlock the door!
{ / }

{ !$has_key }
The door is locked.
{ / }
```

**Features:**
- Curly braces `{ }` delimit conditions
- `{ / }` closes block
- Nesting supported

### Comments

```whisker
// Single-line comment
$gold = 100  // Inline comment

/* Multi-line
   comment */
```

### Embedded Lua

**Inline:**
```whisker
$random_gold = {{ math.random(10, 100) }}
$current_time = {{ os.time() }}
```

**Block:**
```whisker
{{
  local bonus = 0
  if whisker.state:get("vip_member") then
    bonus = 50
  end
  whisker.state:set("gold", whisker.state:get("gold") + bonus)
}}
```

### Operators

| Category | Operators |
|----------|-----------|
| Comparison | `==`, `!=`, `<`, `>`, `<=`, `>=` |
| Logical | `&&`, `||`, `!` |
| Assignment | `=`, `+=`, `-=` |

**Precedence (high to low):**
1. `!` (NOT)
2. `<`, `>`, `<=`, `>=`
3. `==`, `!=`
4. `&&` (AND)
5. `||` (OR)

---

## Current API

### State Management

```lua
whisker.state:get("variable")           -- Get value
whisker.state:set("variable", value)    -- Set value
whisker.state:increment("variable", n)  -- Add to value
whisker.state:reset()                   -- Clear all
```

### Navigation

```lua
whisker.passage:current()               -- Get current passage
whisker.passage:go("PassageName")       -- Navigate to passage
whisker.passage:exists("name")          -- Check if exists
whisker.story:passages()                -- Get all passages
```

### History

```lua
whisker.history:back()                  -- Go back
whisker.history:can_back()              -- Check if can go back
whisker.history:list()                  -- Get history list
whisker.history:count()                 -- Get history length
```

### Utilities

```lua
whisker.util:random(min, max)           -- Random number
whisker.util:either("a", "b", "c")      -- Random choice
whisker.visited("PassageName")          -- Visit count
```

---

## Architecture

### Parser

**Three-layer architecture:**

1. **Lexer** (`lib/whisker/parser/lexer.lua`)
   - Context-sensitive tokenization
   - Line/column tracking
   - Comment stripping
   - Modes: normal, header, choice, condition, string, lua

2. **Parser** (`lib/whisker/parser/parser.lua`)
   - Recursive descent parsing
   - Token stream to AST conversion
   - Passage reference validation
   - Error recovery and reporting

3. **Compiler** (`lib/whisker/script/compiler.lua`)
   - AST to executable form
   - Variable tracking
   - Passage validation
   - Code generation

**Token Types:**
- Structural: `::`, `+`, `->`, `{}`, `[]`
- Assignment: `=`, `+=`, `-=`
- Comparison: `==`, `!=`, `<`, `>`, `<=`, `>=`
- Logical: `&&`, `||`, `!`
- Literals: identifier, number, string, true/false
- Special: `$`, `{{`, `}}`

### Runtime

**Core Engine (`lib/whisker/core/engine.lua`):**
- Story navigation and branching
- Game state management
- Condition evaluation
- Variable interpolation
- Event system

**Game State (`lib/whisker/core/game_state.lua`):**
- Dynamic variable storage
- Type preservation
- Auto-initialization of undefined variables

**Story Object (`lib/whisker/core/story.lua`):**
- Metadata (title, author, IFID, version)
- Passage collection
- Variable definitions
- Asset management
- Settings and scripts

**Passage Object (`lib/whisker/core/passage.lua`):**
- ID, name, content
- Choices array
- Tags and metadata
- Position/size (editor)
- Lifecycle scripts (onEnter, onExit)

### Format Support

**Native Formats:**
- v1.0 Verbose: Full explicit fields, maximum compatibility
- v2.0 Compact: 30-40% smaller, omits defaults, shortened field names

**Import:**
- Whisker JSON v1.0, v2.0
- Twine HTML (Harlowe, SugarCube, Snowman, Chapbook)

**Export:**
- Whisker JSON
- HTML (embedded player)

---

## Gaps and Limitations

### Missing Features

| Feature | Status | Notes |
|---------|--------|-------|
| Text alternatives/cycling | Missing | No `{~a|b|c}` syntax |
| Inline conditionals | Missing | No `{cond:a|b}` syntax |
| Tunnels/subroutines | Missing | No reusable passage calls |
| Gather points | Missing | No weave-style reconvergence |
| Sticky vs once-only choices | Missing | All choices are once-only |
| Temporary variables | Missing | All variables are global |
| Variable observation | Missing | No change tracking |

### Syntax Limitations

| Issue | Current | Desired |
|-------|---------|---------|
| Boolean operators | `&&`, `||`, `!` | Should also support `and`, `or`, `not` |
| Not-equal | `!=` | Should also support `~=` (Lua-style) |
| Expression interpolation | Limited | Full expression support |

### API Inconsistencies

| Issue | Description |
|-------|-------------|
| Method vs function style | `whisker.state:get()` (colon) mixed |
| Namespace depth | 3+ levels: `whisker.state:get()` |
| Return values | Inconsistent `nil` vs `false` |

---

## WLS 1.0 Changes Required

### API Changes

| Current | WLS 1.0 | Rationale |
|---------|---------|-----------|
| `whisker.state:get(var)` | `whisker.state.get(var)` | Consistency |
| `whisker.passage:current()` | `whisker.passage.current()` | Consistency |
| Mixed styles | All dot notation | Simplicity |

**New API additions:**
```lua
whisker.state.temp(var, value)    -- Temporary variable
whisker.visited(passage)          -- Built-in visit counting
whisker.random(min, max)          -- Random number
whisker.choice(...)               -- Random choice
```

### Syntax Changes

| Current | WLS 1.0 | Rationale |
|---------|---------|-----------|
| `$var` | `$var` or `${expr}` | Expression support |
| `{{ lua }}` | `{{ lua }}` | Keep as-is |
| `!=` | `~=` | Lua consistency |
| `&&` | `and` | Lua consistency |
| `||` | `or` | Lua consistency |
| `!` | `not` | Lua consistency |

**New syntax:**
```whisker
// Text alternatives
{~first|second|third}      // Shuffle
{&one|two|three}           // Cycle
{!once|twice|thrice}       // Sequence

// Inline conditionals
{$gold > 50: rich | poor}

// Sticky choices
+ [Repeatable option] -> Target   // once-only (default)
* [Sticky option] -> Target       // sticky

// Temporary variables
_temp = 100                       // Passage-scoped
```

### Breaking Changes

| Change | Migration |
|--------|-----------|
| `!=` → `~=` | Search and replace |
| `&&` → `and` | Search and replace |
| `||` → `or` | Search and replace |
| `!` → `not` | Search and replace (careful with `!=`) |
| `:` → `.` in API | Update all script calls |

**Migration tool required:**
- Automated syntax conversion
- API call updates
- Format version upgrade

---

## Effort Estimate

| Component | Effort | Notes |
|-----------|--------|-------|
| Lexer updates | Medium | New tokens, operators |
| Parser updates | Medium | New syntax constructs |
| API standardization | Low | Method to function |
| New features | High | Alternatives, tunnels |
| Migration tool | Medium | Automated conversion |
| Test updates | Medium | Update existing tests |
| Documentation | Low | Update guides |

**Total estimate:** 500 hours (as per MASTER_PLAN.md Phase 2)

---

## Summary

whisker-core provides a solid foundation with:
- Complete passage/choice/variable system
- Embedded Lua support
- Multiple format support
- Comprehensive test suite

Key changes for WLS 1.0:
1. Standardize API to dot notation
2. Switch to Lua-style operators
3. Add text alternatives syntax
4. Add temporary variables
5. Add sticky/once-only choice distinction
6. Build migration tool
