# whisker-editor-web Current State Audit

**Task:** 0.4
**Date:** December 29, 2025
**Status:** Complete

---

## Overview

**whisker-editor-web** is an enterprise interactive fiction authoring platform built with modern web technologies.

**Key Stats:**
- Framework: Svelte 5, TypeScript 5.9
- Build: Vite, Turbo monorepo, pnpm
- Packages: 95+ specialized packages
- Tests: 776 passing (100%), 96%+ coverage
- Status: Production-ready

---

## Current Syntax Support

### Variable Interpolation

```
Current: {{variableName}}
```

Variables are interpolated in passage content using double curly braces:
```
You have {{gold}} gold coins.
Welcome, {{playerName}}!
```

**Limitations:**
- No inline expressions
- No `$var` shorthand
- No conditional interpolation

### Scripting Hooks

**Passage Lifecycle:**
```typescript
passage.onEnterScript  // Lua code run on entry
passage.onExitScript   // Lua code run on exit
```

**Choice Actions:**
```typescript
choice.action  // Lua code run when choice selected
choice.condition  // Lua expression for visibility
```

**Story Scripts:**
- Story-wide scripts executed on start

### Conditionals

**Choice Conditions Only:**
```typescript
{
  text: "Open the door",
  target: "inside",
  condition: "hasKey == true"  // Lua expression
}
```

**No inline conditionals in content** - conditionals are only supported in choice visibility.

---

## Current API

### game_state

```lua
game_state.get("variable")           -- Get value
game_state.set("variable", value)    -- Set value
game_state["variable"]               -- Table access
```

### passages

```lua
passages.get("name")                 -- Get passage by name
passages.current()                   -- Current passage
passages.go("name")                  -- Navigate to passage
```

### history

```lua
history.back()                       -- Go back
history.count()                      -- History length
history.list()                       -- Get history
```

### API Differences from whisker-core

| whisker-core | whisker-editor-web |
|--------------|-------------------|
| `whisker.state:get()` | `game_state.get()` |
| `whisker.passage:current()` | `passages.current()` |
| `whisker.history:back()` | `history.back()` |

**Key Issue:** Different API namespaces and styles between platforms.

---

## Editor Features

### Visual Graph Editor

- **Library:** @xyflow/svelte
- **Features:**
  - Interactive node-based layout
  - Multiple layout algorithms (hierarchical, circular, grid)
  - Pan, zoom, minimap
  - Drag-and-drop positioning
  - Visual choice connections
  - Color-coded conditions

### Code Editor

- **Library:** Monaco Editor
- **Features:**
  - Custom Lua language definition
  - Story API autocomplete (30+ suggestions)
  - Bracket matching and auto-closing
  - Code folding
  - Custom theme (story-dark)
  - Error highlighting

### Validation System

**Built-in Validators:**
| Validator | Description |
|-----------|-------------|
| Dead links | Choices pointing to non-existent passages |
| Orphaned passages | Passages with no incoming links |
| Unreachable passages | Passages not accessible from start |
| Undefined variables | Variables used but not defined |
| Unused variables | Variables defined but not used |
| Broken scripts | Lua syntax errors |

**Features:**
- Plugin architecture for extensibility
- Auto-fix capabilities
- Real-time validation

### Import/Export

**Import Formats (2):**
| Format | Status |
|--------|--------|
| Whisker JSON v1.0-2.1 | Full support |
| Twine 2 HTML | Good (macro conversion) |

**Export Formats (6):**
| Format | Features |
|--------|----------|
| JSON | Complete data, validation status |
| HTML | Embedded player, 10 themes |
| Markdown | Human-readable, metrics |
| Twine 2 | Harlowe 3.x compatible |
| EPUB | E-reader format |
| Static Site | Multi-page navigation |

---

## Parser Capabilities

### What IS Parsed

**Whisker JSON Format:**
```typescript
// JSONImporter handles:
- Story metadata (title, author, version, IFID)
- Passage definitions (id, name, content, choices)
- Variable definitions (typed in v2.0)
- Tags and settings
- Asset references
```

**Twine Import:**
- HTML parsing and passage extraction
- Macro conversion for common patterns
- Link syntax: `[[Link]]` and `[[Text|Target]]`

### What IS NOT Parsed

**No text format parser exists.** The editor does not parse:
- `:: PassageName` passage syntax
- `+ [Choice] -> Target` choice syntax
- `$variable = value` assignment syntax
- `{ condition }...{ / }` conditionals
- `{{ lua }}` embedded Lua (in text format)

**All editing is done via:**
- JSON format import/export
- GUI property panels
- Monaco editor for scripts

---

## Runtime (Story Player)

### StoryPlayer Class

**Key Methods:**
```typescript
loadStory(story)           // Load story into player
start(fromPassageId?)      // Begin playthrough
makeChoice(choiceId)       // Advance via choice
canMakeChoice(choiceId)    // Check conditions
undo()                     // Go back
reset()                    // Clear state
getState()                 // Get current state
```

### Execution Model

1. Story loaded → player initialized
2. Start passage displayed
3. Choices evaluated (conditions checked)
4. User makes choice → action script runs
5. Navigate to target → onExit runs → onEnter runs
6. State updated, history recorded

### Lua Integration

**Dual Engine Approach:**

| Engine | Use Case | Compatibility |
|--------|----------|---------------|
| SimplifiedLuaEngine (TS) | Preview | ~30% Lua |
| WasmMoon (WASM) | Full execution | Full Lua 5.1+ |

**Preview Engine Supports:**
- Variables, basic types
- Arithmetic: `+`, `-`, `*`, `/`, `%`
- Comparisons, logical operators
- `if/then/else`, `while`, `for`
- `math.*`, `string.*` basics
- `print()`

**Preview Engine MISSING:**
- Function definitions
- Generic `for` loops
- Metatables, coroutines
- Pattern matching

---

## Gaps and Limitations

### Major Gaps

| Gap | Impact |
|-----|--------|
| No text format parser | Cannot edit .ws files directly |
| No inline conditionals | Content can't have conditional text |
| API mismatch with core | Stories not portable without changes |
| Limited Lua preview | 30% compatibility causes confusion |
| No text alternatives | No cycling/shuffle text |
| No temporary variables | All variables persist |

### Feature Gaps vs whisker-core

| Feature | whisker-core | whisker-editor-web |
|---------|--------------|-------------------|
| Text format parsing | Yes | No |
| Inline conditionals | Yes | No |
| Variable interpolation | `$var` | `{{var}}` |
| Choice syntax | `+ [text] ->` | JSON only |
| Lua execution | Full | Limited preview |
| API namespace | `whisker.*` | `game_state.*` |

### UI/UX Gaps

| Gap | Description |
|-----|-------------|
| No diff view | Can't compare story versions |
| No real-time collab | Single-user only |
| No mobile support | Desktop/tablet only |
| PDF export incomplete | Not yet implemented |

---

## WLS 1.0 Changes Required

### New Packages Needed

| Package | Purpose |
|---------|---------|
| `@writewhisker/parser` | Text format lexer/parser |
| `@writewhisker/wls-compiler` | WLS 1.0 AST to model |
| `@writewhisker/migration` | v0.x to WLS 1.0 converter |

### Model Changes

| Model | Changes |
|-------|---------|
| Story | Add format version, WLS compliance flag |
| Passage | Add raw text content, parsed AST |
| Choice | Add sticky flag, inline actions |
| Variable | Add temporary flag, scope |

**New Properties:**
```typescript
interface Passage {
  // Existing...
  rawContent?: string;      // Original WLS text
  parsedContent?: AST;      // Parsed structure
  inlineConditionals?: Conditional[];
}

interface Choice {
  // Existing...
  sticky?: boolean;         // Repeatable choice
  onceOnly?: boolean;       // Default true
}

interface Variable {
  // Existing...
  scope?: 'story' | 'passage' | 'temporary';
}
```

### UI Changes

| Component | Changes |
|-----------|---------|
| Content Editor | Support WLS text format editing |
| Code Highlighter | Highlight WLS syntax |
| Property Panel | Show sticky/once-only for choices |
| Variable Panel | Show scope badges |
| Validator | WLS syntax validation |

### API Alignment

**Before (whisker-editor-web):**
```lua
game_state.get("gold")
passages.current()
history.back()
```

**After (WLS 1.0 unified):**
```lua
whisker.state.get("gold")
whisker.passage.current()
whisker.history.back()
```

**Migration:**
- Add compatibility shim for old API
- Warn on deprecated API usage
- Auto-convert scripts on import

---

## Effort Estimate

| Component | Effort | Notes |
|-----------|--------|-------|
| New parser package | High | 150-200 hours |
| Model updates | Medium | 40-60 hours |
| API alignment | Medium | 60-80 hours |
| UI updates | High | 200+ hours |
| Migration tool | Medium | 80-100 hours |
| Test updates | High | 150+ hours |
| Documentation | Medium | 40+ hours |

**Total estimate:** 1500 hours (as per MASTER_PLAN.md Phase 3)

---

## Summary

whisker-editor-web provides a sophisticated authoring platform with:
- Visual graph editor
- Monaco code editor
- Comprehensive validation
- Multi-format export

Key changes for WLS 1.0:
1. Build text format parser package
2. Align API with whisker-core (`whisker.*` namespace)
3. Update variable interpolation (`$var` support)
4. Add inline conditional support
5. Add temporary variable scope
6. Add sticky/once-only choice distinction
7. Build migration UI

The editor requires more work than whisker-core due to:
- Need to build parser from scratch
- Larger codebase (95+ packages)
- More UI updates required
- Need to maintain backward compatibility during transition
