# Prompt 0.4: whisker-editor-web Audit

## Context

You are auditing the current whisker-editor-web implementation to understand what exists before designing WLS 1.0. whisker-editor-web is the TypeScript/Svelte web editor.

## Task

Analyze the whisker-editor-web codebase and document its current state.

## Files to Read

```
/Users/jims/code/github.com/writewhisker/whisker-editor-web/
├── README.md
├── ARCHITECTURE.md
├── packages/
│   ├── story-models/     # Data models
│   ├── story-player/     # Runtime engine
│   ├── scripting/        # Lua execution
│   ├── story-validation/ # Validators
│   ├── import/           # Import formats
│   └── export/           # Export formats
├── src/lib/
│   ├── stores/           # State management
│   └── components/       # UI components
└── docs/
    ├── SCRIPTING_GUIDE.md
    └── USER_GUIDE.md
```

Also reference:
- `/Users/jims/code/github.com/whisker-analysis/WHISKER_EDITOR_WEB_ANALYSIS.md`

## Analysis Structure

Document:

1. **Current Syntax Support**
   - Variable interpolation (`{{var}}`)
   - Choice conditions
   - Lua scripting hooks

2. **Current API (Lua)**
   - `game_state.get/set()`
   - `passages.*` functions
   - `history.*` access

3. **Editor Features**
   - Visual graph editor
   - Monaco code editor
   - Validation system
   - Import/export

4. **Parser Capabilities**
   - JSON format parsing
   - Twine import
   - What's NOT parsed (text format)

5. **Runtime (Story Player)**
   - Execution model
   - State management
   - Lua integration

6. **Identified Gaps**
   - No text format parser
   - No inline conditionals
   - API differences from core

7. **Required Changes for WLS 1.0**
   - New packages needed
   - Model changes
   - UI changes

## Output Format

Create `outputs/WHISKER_EDITOR_CURRENT.md` with:

```markdown
# whisker-editor-web Current State Audit

## Overview
[Brief description]

## Current Syntax Support

### Variable Interpolation
[Current: {{var}}, needs to support $var]

### Scripting Hooks
[onEnter, onExit, choice actions]

### Conditionals
[Choice conditions only, no inline]

## Current API

### game_state
[Functions and usage]

### passages
[Functions and usage]

### history
[Functions and usage]

## Editor Features

### Visual Editor
[Capabilities]

### Code Editor
[Capabilities]

### Validation
[Current validators]

### Import/Export
[Supported formats]

## Gaps and Limitations
[Comprehensive list]

## WLS 1.0 Changes Required

### New Packages
[List with descriptions]

### Model Changes
[List with descriptions]

### UI Changes
[List with descriptions]

### API Alignment
[Changes to match whisker-core]

## Effort Estimate
[High-level effort for updates]
```

## Token Budget

Target: ~4,000 tokens
Focus on facts needed for WLS 1.0 design.

## Execution

```
Please audit the whisker-editor-web codebase for the WLS 1.0 project.
Read the relevant files and documentation to understand the current
implementation. Document the current state and identify changes
needed for WLS 1.0.

Output to: phase-0-research/outputs/WHISKER_EDITOR_CURRENT.md
```
