# Prompt 1.3: Syntax Specification

## Context

Write the complete syntax specification for WLS 1.0.

## Prerequisites

- 01-INTRODUCTION.md complete
- 02-CORE_CONCEPTS.md complete
- Design decisions from Phase 0

## Task

Document all syntax elements of the Whisker language.

## Content Requirements

### 1. Lexical Structure
- Character encoding (UTF-8)
- Line endings
- Whitespace rules
- Token boundaries

### 2. Keywords
- Reserved words
- Contextual keywords

### 3. Identifiers
- Naming rules
- Case sensitivity
- Reserved names

### 4. Literals
- Numbers (integer, float)
- Strings (quotes, escapes)
- Booleans (true, false)
- Nil

### 5. Operators

#### Arithmetic
| Operator | Description |
|----------|-------------|
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `%` | Modulo |

#### Comparison
| Operator | Description |
|----------|-------------|
| `==` | Equal |
| `~=` | Not equal |
| `<` | Less than |
| `>` | Greater than |
| `<=` | Less or equal |
| `>=` | Greater or equal |

#### Logical
| Operator | Description |
|----------|-------------|
| `and` | Logical AND |
| `or` | Logical OR |
| `not` | Logical NOT |

#### Assignment
| Operator | Description |
|----------|-------------|
| `=` | Assign |
| `+=` | Add assign |
| `-=` | Subtract assign |
| `*=` | Multiply assign |
| `/=` | Divide assign |

### 6. Comments
- Single-line: `// comment`
- Multi-line: `/* comment */`

### 7. Escape Sequences
| Sequence | Character |
|----------|-----------|
| `\\` | Backslash |
| `\$` | Dollar sign |
| `\{` | Open brace |
| `\n` | Newline |
| `\"` | Quote |

### 8. Expressions
- Primary expressions
- Operator precedence
- Grouping with parentheses

### 9. Passage Syntax
- Declaration: `:: PassageName`
- Content rules
- Directives: `@directive: value`

### 10. Choice Syntax
- Basic: `+ [text] -> target`
- Conditional: `+ { cond } [text] -> target`
- Actions: `+ [text] -> target { action }`

## Output Format

Create `spec/03-SYNTAX.md`:

```markdown
# 3. Syntax

## 3.1 Lexical Structure

### 3.1.1 Character Encoding

WLS source files MUST be encoded in UTF-8...

### 3.1.2 Line Endings

All common line endings are accepted:
- LF (`\n`) - Unix
- CRLF (`\r\n`) - Windows
- CR (`\r`) - Legacy Mac

### 3.1.3 Whitespace
[Rules]

## 3.2 Keywords

The following words are reserved:
```
and     false   nil     or
not     true
```

## 3.3 Identifiers
[Rules and examples]

## 3.4 Literals

### 3.4.1 Numbers
[Rules and examples]

### 3.4.2 Strings
[Rules and examples]

### 3.4.3 Booleans
[Rules and examples]

## 3.5 Operators

### 3.5.1 Arithmetic Operators
[Table with examples]

### 3.5.2 Comparison Operators
[Table with examples]

### 3.5.3 Logical Operators
[Table with examples]

### 3.5.4 Assignment Operators
[Table with examples]

### 3.5.5 Operator Precedence

| Precedence | Operators | Associativity |
|------------|-----------|---------------|
| 1 (highest)| `not` | Right |
| 2 | `*`, `/`, `%` | Left |
| 3 | `+`, `-` | Left |
| 4 | `<`, `>`, `<=`, `>=` | Left |
| 5 | `==`, `~=` | Left |
| 6 | `and` | Left |
| 7 (lowest) | `or` | Left |

## 3.6 Comments
[Rules and examples]

## 3.7 Escape Sequences
[Table and examples]

## 3.8 Expressions
[Complete expression syntax]

## 3.9 Passage Syntax
[Complete passage rules]

## 3.10 Choice Syntax
[Complete choice rules]
```

## Token Budget

Target: ~8,000 tokens
This is one of the longest chapters.

## Execution

```
Write the complete syntax specification for WLS 1.0.
Be precise and exhaustive. Include examples for every construct.
Use RFC 2119 requirement levels.

Output to: phase-1-specification/spec/03-SYNTAX.md
```
