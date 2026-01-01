# Ink Language Analysis

**Task:** 0.2
**Date:** December 29, 2025
**Status:** Complete

---

## Executive Summary

Ink is inkle's open-source scripting language designed for writing interactive narrative. Created by the developers of award-winning games like *80 Days* and *Heaven's Vault*, Ink emphasizes elegant handling of branching narratives with minimal syntax overhead.

The language introduces several powerful concepts that should inform WLS 1.0: **knots/stitches** for hierarchical content organization, **weave** for inline branching that gathers back together, **tunnels** for reusable subroutine-like passages, and a sophisticated **alternatives system** (sequences, cycles, shuffles) for dynamic text variation.

Key insights for WLS 1.0:
- Ink's weave pattern (branching that reconverges with `-` gathers) is more elegant than requiring explicit passage jumps
- The distinction between `*` (once-only) and `+` (sticky) choices is valuable for game design
- Alternatives syntax (`{~shuffle|options}`, `{&cycle|options}`) provides powerful text variation
- Tunnels (`->knot->`) enable reusable content blocks without breaking narrative flow
- Lists (state machines) enable complex state tracking with minimal code

---

## Narrative Structure

### Knots and Stitches

Knots are the primary organizational unit in Ink, analogous to passages in Twine or sections in a book. Stitches are sub-sections within knots.

```ink
=== london ===
We arrived in London.

= at_the_station
The platform was crowded.
-> leave_station

= leave_station
We stepped outside into the cold air.
-> END
```

**Key points:**
- Knots use `===` markers
- Stitches use single `=` markers
- Stitches are scoped to their parent knot
- Same stitch name can be reused across different knots
- Dot notation for addressing: `london.at_the_station`

### Diverts

Diverts are Ink's navigation mechanism, using the `->` arrow syntax.

```ink
=== start ===
You stand at a crossroads.
* [Go north] -> north_path
* [Go south] -> south_path
* [Stay here] -> start

=== north_path ===
You walk north into the forest.
-> END
```

**Divert types:**
- Basic: `-> knot_name`
- To stitch: `-> knot_name.stitch_name`
- End story: `-> END`
- Done (end thread): `-> DONE`

### Weave and Gathers

Weave is Ink's signature feature for inline branching that reconverges. Gathers use the `-` symbol to bring branches back together.

```ink
=== conversation ===
"What do you think?" she asked.
* "I agree completely."
    She smiled warmly.
* "I have some concerns."
    She frowned slightly.
* "I'm not sure yet."
    She nodded thoughtfully.
- "Either way," she continued, "we should proceed."
-> END
```

**Nested weave example:**
```ink
* "Tell me about the treasure."
    "Ah, the treasure..."
    ** "Where is it hidden?"
        "In the old castle."
    ** "What kind of treasure?"
        "Gold and jewels."
    -- "But be careful," he warned.
* "I don't care about treasure."
    He shrugged.
- We parted ways.
```

**Key insight:** The weave pattern eliminates the need for many explicit diverts, keeping the narrative flow readable.

---

## Choice System

### Basic Choices

Ink offers two fundamental choice types:

| Symbol | Type | Behavior |
|--------|------|----------|
| `*` | Once-only | Disappears after selection |
| `+` | Sticky | Remains available |

```ink
=== shop ===
You enter the shop.
* [Buy the sword]
    You purchase the sword for 50 gold.
    -> shop
+ [Look around]
    The shelves are full of interesting items.
    -> shop
* [Leave the shop]
    -> outside
```

### Choice Text Formatting

Ink provides fine control over what text appears in the choice vs. the result:

```ink
* "I'll take it!"[] you declared.
// Shows: "I'll take it!"
// Outputs: "I'll take it!" you declared.

* [Pick up the key]You picked up the rusty key.
// Shows: Pick up the key
// Outputs: You picked up the rusty key.

* I nodded[.], unsure what to say.
// Shows: I nodded.
// Outputs: I nodded, unsure what to say.
```

### Conditional Choices

Choices can be conditionally displayed based on variables or visit counts:

```ink
VAR has_key = false
VAR gold = 100

=== locked_door ===
* {has_key} [Unlock the door] -> inside
* {gold >= 50} [Bribe the guard] -> inside
* {not has_key} [Search for a key]
    ~ has_key = true
    You found a key under the mat.
    -> locked_door
+ [Walk away] -> outside
```

### Fallback Choices

Fallback choices are invisible to players but selected automatically when no other options exist:

```ink
=== examine_room ===
* [Look at painting] -> examine_painting
* [Check drawers] -> examine_drawers
* -> nothing_left_to_do
```

### Labeled Choices

Choices can be labeled for later reference:

```ink
* (chose_sword) [Take the sword]
    You picked up the sword.
* (chose_shield) [Take the shield]
    You grabbed the shield.
-
{chose_sword: The sword gleamed in the light.}
{chose_shield: The shield felt heavy but reassuring.}
```

---

## Variable System

### Global Variables (VAR)

Global variables persist throughout the entire story:

```ink
VAR player_name = "Alice"
VAR health = 100
VAR inventory = ()
VAR current_location = -> start

Hello, {player_name}! You have {health} health points.
```

**Supported types:**
- Numbers (integers and floats)
- Strings
- Booleans (true/false)
- Diverts (stored references to knots)
- Lists (see below)

### Temporary Variables (temp)

Temporary variables exist only within their knot/stitch scope:

```ink
=== calculate_damage ===
~ temp base_damage = 10
~ temp modifier = RANDOM(1, 6)
~ temp total = base_damage + modifier
You deal {total} damage!
-> next_scene
```

### Constants (CONST)

Constants are immutable values defined at story level:

```ink
CONST MAX_HEALTH = 100
CONST SWORD_DAMAGE = 15
CONST GAME_VERSION = "1.0"

VAR health = MAX_HEALTH
~ health = health - SWORD_DAMAGE
```

### Lists (State Machines)

Lists are Ink's powerful feature for tracking complex states:

```ink
LIST DoorState = locked, unlocked, open, destroyed
VAR front_door = locked

=== at_door ===
{front_door:
- locked: The door is locked tight.
- unlocked: The door is unlocked but closed.
- open: The door stands open.
- destroyed: Splinters are all that remain.
}

* {front_door == locked} [Pick the lock]
    ~ front_door = unlocked
* {front_door == unlocked} [Open the door]
    ~ front_door = open
* {front_door ? (locked, unlocked)} [Kick down the door]
    ~ front_door = destroyed
```

**Multi-valued lists (sets):**

```ink
LIST Inventory = sword, shield, potion, key

VAR player_items = (sword, shield)

~ player_items += key
~ player_items -= sword

{player_items ? key: You have a key.}
{player_items has shield: Your shield is equipped.}
```

---

## Control Flow

### Conditional Blocks

Standard if/else conditionals:

```ink
{health > 75:
    You feel strong and healthy.
- health > 25:
    You're wounded but still standing.
- else:
    You're barely clinging to life.
}
```

### Switch-style Conditionals

```ink
{day_of_week:
- 1: Monday
- 2: Tuesday
- 3: Wednesday
- 4: Thursday
- 5: Friday
- else: Weekend
}
```

### Inline Conditionals

Short conditionals can be written inline:

```ink
You have {gold} gold{gold != 1: pieces| piece}.
The door is {has_key:unlocked|locked}.
{visited_castle: You've been here before.}
```

### Logical Operators

| Operator | Meaning |
|----------|---------|
| `and` / `&&` | Logical AND |
| `or` / `||` | Logical OR |
| `not` / `!` | Logical NOT |
| `==` | Equals |
| `!=` | Not equals |
| `>`, `<`, `>=`, `<=` | Comparisons |

```ink
{has_key and gold >= 100: You can afford the premium entrance.}
{not (visited_garden or visited_library): There's still much to explore.}
```

---

## Content Generation Patterns

### Sequences (Stopping)

Default behavior - shows content in order, then sticks on the last:

```ink
{I entered.|I walked in again.|Here I was, once more.|Same old place.}

// Or multi-line:
{stopping:
- First time here!
- Back again.
- You really like this place.
}
```

### Cycles

Loop through content infinitely:

```ink
The clock showed {&1|2|3|4|5|6|7|8|9|10|11|12} o'clock.

// Multi-line:
{cycle:
- The wind howled.
- Rain pattered on the window.
- Thunder rumbled in the distance.
}
```

### Once-only

Show each once, then nothing:

```ink
{!First visit.|Second visit.|Third visit.}

// After three visits, outputs nothing
```

### Shuffles

Random selection:

```ink
I drew a card: {~Ace|King|Queen|Jack} of {~Hearts|Diamonds|Clubs|Spades}.

// shuffle stopping - random until last, then sticks:
{shuffle stopping:
- You see a cat.
- A dog runs past.
- There are birds.
- It's quiet now.
}
```

---

## Advanced Features

### Tunnels

Tunnels are reusable content blocks that return to the caller:

```ink
=== morning_routine ===
You wake up and stretch.
-> brush_teeth ->
-> eat_breakfast ->
-> get_dressed ->
Ready for the day!
-> END

=== brush_teeth ===
You brush your teeth thoroughly.
->->

=== eat_breakfast ===
* [Eat cereal] Quick and easy.
* [Make eggs] Delicious and filling.
- ->->

=== get_dressed ===
You put on your clothes.
->->
```

**Tunnels with parameters:**

```ink
-> greet("Alice") ->
-> greet("Bob") ->

=== greet(name) ===
"Hello, {name}!" you said.
->->
```

### Threads

Threads allow combining content from multiple sources:

```ink
=== party ===
The party is in full swing.
<- serve_drinks
<- play_music
<- mingle_with_guests
-> END

=== serve_drinks ===
* [Get a drink]
    You grab a cocktail from the bar.
    -> DONE

=== play_music ===
* [Request a song]
    The DJ nods and changes the track.
    -> DONE

=== mingle_with_guests ===
+ [Talk to someone]
    You strike up a conversation.
    -> party
```

### Functions

Ink supports function-like constructs:

```ink
=== function max(a, b) ===
{a > b:
    ~ return a
}
~ return b

VAR bigger = 0
~ bigger = max(10, 5)
// bigger is now 10
```

### External Functions

Integration with game engines:

```ink
EXTERNAL playSound(soundName)
EXTERNAL getPlayerScore()

~ playSound("victory")
Your score is {getPlayerScore()}.
```

### Include Files

Split stories across files:

```ink
INCLUDE chapter1.ink
INCLUDE chapter2.ink
INCLUDE common/utils.ink
```

---

## Syntax Quick Reference

| Syntax | Purpose |
|--------|---------|
| `=== knot ===` | Define a knot |
| `= stitch` | Define a stitch |
| `-> target` | Divert to target |
| `-> END` | End the story |
| `->->` | Return from tunnel |
| `<- thread` | Fork to thread |
| `* [text]` | Once-only choice |
| `+ [text]` | Sticky choice |
| `-` | Gather point |
| `(label)` | Label a choice/gather |
| `VAR x = value` | Global variable |
| `~ temp x = value` | Temporary variable |
| `CONST X = value` | Constant |
| `LIST Name = a, b, c` | Define a list |
| `{condition: text}` | Conditional text |
| `{a\|b\|c}` | Sequence |
| `{&a\|b\|c}` | Cycle |
| `{!a\|b\|c}` | Once-only |
| `{~a\|b\|c}` | Shuffle |
| `INCLUDE file.ink` | Include file |
| `EXTERNAL func()` | External function |

---

## Recommendations for WLS 1.0

### Priority 1: Must Have

| Feature | Source | Rationale |
|---------|--------|-----------|
| **Gather points** | Weave | Reconvergence without explicit jumps |
| **Sticky vs once-only choices** | Choice system | Essential for repeatable content |
| **Conditional choices** | Choice system | `{ condition } [text] -> target` |
| **Sequence alternatives** | Content gen | `{stopping: ...}` for varied text |
| **Visit counting** | Built-in | Automatic tracking of passage visits |

### Priority 2: Should Have

| Feature | Source | Rationale |
|---------|--------|-----------|
| **Tunnels** | Advanced | Reusable content with `->passage->` |
| **Cycle/shuffle alternatives** | Content gen | `{&...}` and `{~...}` for variety |
| **Choice text formatting** | Choice system | `[displayed]output` pattern |
| **Inline conditionals** | Control flow | `{cond:true_text\|false_text}` |
| **Labeled choices** | Choice system | Reference previous selections |

### Priority 3: Nice to Have

| Feature | Source | Rationale |
|---------|--------|-----------|
| **Lists/state machines** | Variables | Complex state tracking |
| **Threads** | Advanced | Parallel content composition |
| **Include files** | Structure | Multi-file stories |
| **Functions** | Advanced | Reusable logic |

### Syntax Proposals for WLS 1.0

Based on this analysis, consider these WLS 1.0 syntaxes:

```whisker
:: start
@vars
  gold: 100
  has_key: false

You stand before the ancient door.

+ { $has_key } [Unlock the door] -> treasure_room
+ { $gold >= 50 } [Bribe the guard]
  You slip the guard 50 gold.
  ~ gold = gold - 50
  -> treasure_room
* [Search for a key]
  {stopping:
    |You look around carefully.
    |You search more thoroughly.
    |Aha! A key under the mat!
  }
  ~ has_key = true
- The door awaits your decision.
-> start
```

---

## Sources

- [Ink Official Site](https://www.inklestudios.com/ink/)
- [Ink GitHub Repository](https://github.com/inkle/ink)
- [Writing with Ink Documentation](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md)
- [Ink Web Tutorial](https://www.inklestudios.com/ink/web-tutorial/)
- [Unfold Studio Ink Documentation](https://docs.unfold.studio/user_guide/ink.html)
- [Learning Ink Tutorial Series](https://videlais.com/2018/08/02/learning-ink-part-2-choices-and-knots/)
- [Unofficial Ink Cookbook](https://videlais.github.io/Unofficial-Ink-Cookbook/Chapter6/)
- [Creating Playable Stories with Ink](https://pressbooks.library.torontomu.ca/playablestoriesink/)
