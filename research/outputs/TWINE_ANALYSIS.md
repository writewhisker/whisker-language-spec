# Twine Story Format Analysis

**Task:** 0.1
**Date:** December 29, 2025
**Status:** Complete

---

## Executive Summary

Twine story formats represent three distinct philosophies for interactive fiction authoring. **Harlowe** prioritizes prose-first writing with a rich macro system that keeps logic close to the text. **SugarCube** offers a JavaScript-powered approach with robust save/load systems and maximum extensibility. **Chapbook** takes a minimalist path, separating content from logic through a vars section and using modifiers/inserts for dynamic content.

For WLS 1.0, the most valuable patterns to adopt are: Harlowe's hook-based conditional text, SugarCube's temporary variable scoping (`_temp` vs `$permanent`), and Chapbook's clean separation of variable declarations from prose. Additionally, cycling/alternating text patterns found across all formats would significantly enhance Whisker's narrative capabilities.

The key insight is that each format solves the "code in prose" problem differently—Harlowe embeds it elegantly, SugarCube makes it powerful, and Chapbook separates it entirely. WLS 1.0 should draw from all three approaches to provide flexibility for different authoring styles.

---

## Harlowe 3.x

### Syntax Overview

Harlowe uses a macro-based syntax where all functionality is expressed through parenthesized macros.

#### Variables

```harlowe
<!-- Declaration and assignment -->
(set: $playerName to "Alice")
(set: $gold to 100)
(set: $hasKey to true)

<!-- Using variables in text -->
Hello, $playerName! You have $gold gold coins.

<!-- Modifying variables -->
(set: $gold to $gold + 50)
(set: $gold to it + 50)  <!-- 'it' refers to current value -->
```

#### Conditionals

```harlowe
<!-- Basic if/else -->
(if: $gold > 50)[You can afford the sword.]
(else:)[You need more gold.]

<!-- Chained conditions -->
(if: $gold >= 100)[Wealthy!]
(else-if: $gold >= 50)[Comfortable.]
(else:)[Poor.]

<!-- Unless (inverse if) -->
(unless: $hasKey)[The door is locked.]
```

#### Links and Choices

```harlowe
<!-- Basic link -->
[[Go to the forest->Forest]]

<!-- Link with action -->
(link: "Pick up the key")[(set: $hasKey to true)]

<!-- Link that goes somewhere -->
(link-goto: "Enter the cave", "Cave")
```

#### Passages

Passages are created in the Twine editor. Content is prose-first with macros embedded:

```harlowe
:: Start
You wake up in a dark room.

(if: $visitCount is 0)[This is your first time here.]
(set: $visitCount to it + 1)

[[Look around->Explore]]
[[Go back to sleep->Sleep]]
```

### State Management

| Feature | Support |
|---------|---------|
| Variable types | Numbers, strings, booleans, arrays, datamaps |
| Scoping | All variables are global (`$var`) |
| Temporary vars | Use `(set: _temp to value)` with underscore |
| Save/load | Built-in browser storage |
| History | Full undo/redo with browser back button |
| Visited tracking | `visits` keyword returns visit count |

```harlowe
<!-- Datamap (object-like) -->
(set: $player to (dm: "name", "Alice", "hp", 100))
(print: $player's name)

<!-- Arrays -->
(set: $inventory to (a: "sword", "shield"))
(set: $inventory to it + (a: "potion"))
```

### Unique Features

1. **Hook System**: Text in `[ ]` can be styled, shown/hidden, or manipulated
   ```harlowe
   |secret>[This text is hidden](click: ?secret)[Now it's revealed!]
   ```

2. **Lambda Expressions**: Functional programming for data manipulation
   ```harlowe
   (find: where its name is "sword", ...$inventory)
   ```

3. **Transition Effects**: Built-in passage transitions
   ```harlowe
   (transition: "dissolve")
   ```

4. **Debug Mode**: Live variable inspector during development

5. **Changer Macros**: Composable text transformations
   ```harlowe
   (text-style: "bold") + (text-color: red)[Important!]
   ```

### Applicable to Whisker

| Feature | Priority | Notes |
|---------|----------|-------|
| Hook-based conditional text | High | `|name>[content]` pattern is elegant |
| `it` keyword for current value | Medium | Reduces repetition in assignments |
| Transition effects | Low | Presentation layer, not core |
| Lambda expressions | Medium | Powerful for list manipulation |
| Visited tracking | High | `visits` keyword is simple and useful |

---

## SugarCube 2.x

### Syntax Overview

SugarCube uses `<<macro>>` syntax with double angle brackets and supports full JavaScript integration.

#### Variables

```sugarcube
/* Story variables (persistent) */
<<set $playerName to "Alice">>
<<set $gold to 100>>

/* Temporary variables (passage-scoped) */
<<set _tempValue to $gold * 2>>

/* Display variables */
You have <<print $gold>> gold coins.
You have $gold gold coins.  /* shorthand */
```

#### Conditionals

```sugarcube
<<if $gold > 50>>
  You can afford the sword.
<<elseif $gold > 25>>
  You might afford something small.
<<else>>
  You're broke.
<</if>>

/* One-liner */
<<if $hasKey>>The door is unlocked.<</if>>
```

#### Links and Choices

```sugarcube
/* Basic link */
[[Go to forest|Forest]]
[[Forest]]  /* text matches passage name */

/* Link with action */
<<link "Pick up key">>
  <<set $hasKey to true>>
<</link>>

/* Link that navigates */
<<link "Enter cave" "Cave">><</link>>
```

### State Management

| Feature | Support |
|---------|---------|
| Variable types | JavaScript types (number, string, object, array) |
| Story variables | `$var` - persist across passages |
| Temp variables | `_var` - cleared each passage |
| Save/load | Full save system with slots, autosave, export |
| History | Configurable history depth |
| Metadata | `State.metadata` for cross-save data |

```sugarcube
/* Save system */
<<link "Save Game">>
  <<run Save.slots.save(0)>>
<</link>>

/* Custom save titles */
Config.saves.descriptions = function () {
  return "$playerName - Day $day";
};
```

### Unique Features

1. **Widget Macros**: Create reusable components
   ```sugarcube
   <<widget "healthbar">>
     <div class="health" style="width: $hp%"></div>
   <</widget>>

   /* Usage */
   <<healthbar>>
   ```

2. **Full JavaScript Integration**: Access to JS in `<<script>>` or inline
   ```sugarcube
   <<script>>
     State.variables.gold += Math.floor(Math.random() * 100);
   <</script>>
   ```

3. **Robust Save System**: Multiple slots, autosave, disk export
   ```sugarcube
   Save.slots.save(0, "My Save")
   Save.slots.load(0)
   Save.export()  /* Downloads save file */
   ```

4. **Settings Dialog**: Built-in player settings UI
   ```sugarcube
   Setting.addToggle("darkMode", {
     label: "Dark Mode",
     default: false
   });
   ```

5. **Timed Macros**: Delayed content display
   ```sugarcube
   <<timed 2s>>This appears after 2 seconds.<</timed>>
   ```

### Applicable to Whisker

| Feature | Priority | Notes |
|---------|----------|-------|
| Temp variables (`_var`) | High | Clear scoping is very useful |
| Save/load system API | High | Essential for games |
| Widget/macro creation | Medium | User-defined components |
| Timed content | Low | Nice for pacing |
| Settings API | Medium | Player preferences |

---

## Chapbook 1.x

### Syntax Overview

Chapbook uses a unique two-section approach: a vars section at the top of each passage, separated by `--` from the content.

#### Variables

```chapbook
gold: 100
playerName: "Alice"
hasKey: false
--
Hello, {playerName}! You have {gold} gold.
```

#### Conditionals

```chapbook
[if gold > 50]
You can afford the sword.

[if hasKey]
The door is unlocked.
[else]
The door is locked.

[unless hasKey]
You need a key.
```

#### Links and Choices

```chapbook
> [[Go to the forest->Forest]]
> [[Stay here->Start]]

/* Forks (choice groups) */
> [[Option A->PassageA]]
> [[Option B->PassageB]]
```

#### Modifiers and Inserts

Chapbook separates functionality into:
- **Modifiers**: `[modifier]` on its own line, affects following content
- **Inserts**: `{insert}` inline, produces content

```chapbook
[align center]
This text is centered.

The random number is {random 1, 10}.
```

### State Management

| Feature | Support |
|---------|---------|
| Variable types | Inferred (number, string, boolean) |
| Scoping | All variables are global |
| Declaration | Vars section at passage start |
| Persistence | Browser local storage |
| Lookup variables | `{embed passage: 'PassageName'}` |

```chapbook
/* Vars section */
inventory: ["sword", "shield"]
inventory (array): inventory.concat(["potion"])
--
You have {inventory.length} items.
```

### Unique Features

1. **Vars Section Separation**: Logic clearly separated from prose
   ```chapbook
   gold: gold + 10
   visited: true
   --
   You found 10 gold!
   ```

2. **Sound/Ambient Audio**: Built-in audio support
   ```chapbook
   {ambient sound: 'rain.mp3'}
   {sound effect: 'thunder.mp3'}
   ```

3. **Reveal Links**: Text that expands in place
   ```chapbook
   {reveal link: 'Click for more', text: 'Here is the hidden content.'}
   ```

4. **Text Cycling**: Alternate text on click
   ```chapbook
   {cycling link, choices: ['hot', 'cold', 'warm']}
   ```

5. **Engine Extensions**: JavaScript extension system
   ```javascript
   engine.extend('1.0.0', () => {
     config.template.inserts.myInsert = {
       match: /^my insert/i,
       render: () => 'Hello!'
     };
   });
   ```

### Applicable to Whisker

| Feature | Priority | Notes |
|---------|----------|-------|
| Vars section concept | High | Clean separation of logic |
| Reveal/cycling links | Medium | Dynamic in-passage content |
| Ambient audio API | Low | Media layer, not core |
| Insert/modifier pattern | High | Conceptually clean |

---

## Cross-Format Patterns

### Common Approaches

| Pattern | Harlowe | SugarCube | Chapbook |
|---------|---------|-----------|----------|
| Variables | `$var` | `$var` / `_temp` | `varName:` in vars |
| Conditionals | `(if:)` | `<<if>>` | `[if]` |
| Links | `[[text->target]]` | `[[text\|target]]` | `[[text->target]]` |
| Display var | `$var` | `$var` or `<<print>>` | `{varName}` |
| Comments | `<!-- -->` | `/* */` or `/% %/` | `{note}` |

### Shared Best Practices

1. **Passage Organization**
   - Start passage for story entry
   - Logical grouping by location/chapter
   - Utility passages for shared content

2. **Variable Naming**
   - CamelCase: `$playerName`
   - Prefixes for categories: `$inv_sword`, `$stat_hp`
   - Booleans as questions: `$hasKey`, `$isAlive`

3. **Conditional Patterns**
   - Check for first visit
   - Check for item possession
   - Check for relationship thresholds

4. **Navigation Patterns**
   - Hub-and-spoke for exploration
   - Linear with branches for story
   - State machine for complex logic

---

## Recommendations for WLS 1.0

### Priority 1: Must Have

| Feature | Source | Rationale |
|---------|--------|-----------|
| **Temporary variables** | SugarCube | Clear scoping prevents bugs |
| **Visited tracking** | All | `visited("passage")` or `visits` keyword |
| **Conditional text blocks** | All | `{ cond }...{/}` already planned |
| **Variable interpolation** | All | `$var` syntax already planned |

### Priority 2: Should Have

| Feature | Source | Rationale |
|---------|--------|-----------|
| **Cycling/alternating text** | Chapbook | `{~first|second|third}` for variety |
| **Hook/reveal pattern** | Harlowe | Click to reveal more text |
| **Save/load API** | SugarCube | `whisker.save.*` namespace |
| **`it` keyword** | Harlowe | `$gold = it + 10` reduces repetition |

### Priority 3: Nice to Have

| Feature | Source | Rationale |
|---------|--------|-----------|
| **Vars section** | Chapbook | Optional header for declarations |
| **Timed content** | SugarCube | `@delay: 2s` directive |
| **Audio API** | Chapbook | `whisker.audio.*` namespace |
| **Debug mode** | Harlowe | Variable inspector |

### Syntax Proposals

Based on this analysis, consider these WLS 1.0 syntaxes:

```whisker
:: Start
@vars
  gold: 100
  playerName: "Alice"

Welcome, $playerName!

{ $gold > 50 }
  You're doing well financially.
{/}

You see {~a sword|a shield|nothing} on the ground.

+ [Pick it up] -> PickUp
+ { visited("Shop") } [Return to shop] -> Shop
```

---

## Sources

- [Harlowe 3.3.8 Manual](https://twine2.neocities.org/)
- [Twine Cookbook - Conditionals](https://twinery.org/cookbook/conditionalstatements/harlowe/harlowe_conditionalstatements.html)
- [SugarCube v2 Documentation](https://www.motoslave.net/sugarcube/2/docs/)
- [SugarCube Official Site](https://www.motoslave.net/sugarcube/2/)
- [Custom Macros for SugarCube 2](https://github.com/ChapelR/custom-macros-for-sugarcube-2)
- [Chapbook Official Guide](https://klembot.github.io/chapbook/guide/)
- [Chapbook GitHub Repository](https://github.com/klembot/chapbook)
- [100% Good Chapbook Reference](https://manonamora.itch.io/twine-chapbook-reference-page)
