# CLAUDE.md - Whisker Language Specification 1.0 Project

## Project Overview

This project creates the **Whisker Language Specification 1.0 (WLS 1.0)**, a comprehensive interactive fiction authoring language, and implements it across two platforms:
- **whisker-core** (Lua) - The reference implementation
- **whisker-editor-web** (TypeScript/Svelte) - The web-based editor

## How to Use Claude Effectively

### Session Management

**Starting a New Session:**
```
I'm working on the Whisker Language Specification 1.0 project.
Current phase: [Phase X]
Current task: [Task description]
Please read CLAUDE.md and the relevant phase documentation.
```

**Resuming Work:**
```
Resuming WLS 1.0 work.
Phase: [X] - [Phase Name]
Last completed: [Task/file]
Next task: [Description]
See STATE.md for current progress.
```

### Token-Efficient Prompting

1. **Reference files by path** rather than pasting content
2. **Use task IDs** from the plan documents
3. **Provide context in layers** - start minimal, add if Claude needs more
4. **Batch related tasks** when possible

### Recommended Workflow

```
1. Read the phase CLAUDE.md
2. Check STATE.md for current progress
3. Execute prompts from prompts/ directory
4. Update STATE.md after completing tasks
5. Run tests before moving to next task
```

## State Compaction Strategy

When you need to continue work in a new Claude session, use these strategies:

### Quick State Summary Template

```markdown
## WLS 1.0 Session State

**Phase:** [0-4]
**Task:** [Current task ID]
**Files Modified:** [List of files changed this session]
**Blockers:** [Any issues encountered]
**Next Steps:** [1-3 immediate next actions]

### Key Decisions Made
- [Decision 1]
- [Decision 2]

### Context Files to Read
- [path/to/file1]
- [path/to/file2]
```

### Creating a Compact Handoff

Run this prompt at the end of each session:

```
Please create a compact state summary for continuing this work.
Include:
1. Current phase and task
2. Files created/modified (paths only)
3. Key decisions made
4. Any open questions
5. Next 3 tasks to do

Format as markdown suitable for STATE.md
```

### STATE.md Location

Each phase has its own `STATE.md`:
- `phase-0-research/STATE.md`
- `phase-1-specification/STATE.md`
- `phase-2-whisker-core/STATE.md`
- `phase-3-whisker-editor-web/STATE.md`
- `phase-4-validation/STATE.md`

## Directory Structure

```
whisker-language-specification-1.0/
├── CLAUDE.md                 # This file - project-wide guidance
├── MASTER_PLAN.md            # Complete implementation plan
├── STATE.md                  # Overall project state
│
├── phase-0-research/         # Research & feature design
│   ├── CLAUDE.md             # Phase-specific Claude guidance
│   ├── PLAN.md               # Detailed phase plan
│   ├── STATE.md              # Phase progress tracking
│   ├── prompts/              # Claude prompts for this phase
│   ├── templates/            # Document templates
│   └── outputs/              # Research outputs
│
├── phase-1-specification/    # WLS 1.0 document creation
│   ├── CLAUDE.md
│   ├── PLAN.md
│   ├── STATE.md
│   ├── prompts/
│   ├── templates/
│   └── spec/                 # The specification documents
│
├── phase-2-whisker-core/     # whisker-core updates
│   ├── CLAUDE.md
│   ├── PLAN.md
│   ├── STATE.md
│   ├── prompts/
│   └── tests/                # Test definitions
│
├── phase-3-whisker-editor-web/  # whisker-editor-web updates
│   ├── CLAUDE.md
│   ├── PLAN.md
│   ├── STATE.md
│   ├── prompts/
│   └── tests/
│
├── phase-4-validation/       # Cross-platform validation
│   ├── CLAUDE.md
│   ├── PLAN.md
│   ├── STATE.md
│   ├── prompts/
│   └── test-corpus/          # Shared test cases
│
└── shared/                   # Shared resources
    ├── schemas/              # JSON schemas
    ├── examples/             # Example stories
    └── reference/            # Reference materials
```

## Key Principles

### 1. Specification First
Always update the specification before implementing. The spec is the source of truth.

### 2. Test-Driven
Write test cases before implementation. Tests define expected behavior.

### 3. Bi-Directional Compatibility
Every feature must work identically in both whisker-core and whisker-editor-web.

### 4. Incremental Progress
Complete one task fully before starting the next. Update STATE.md after each task.

### 5. Documentation Alongside Code
Update documentation as you implement, not after.

## Phase Dependencies

```
Phase 0 (Research) ──► Phase 1 (Specification)
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
            Phase 2 (Core)    Phase 3 (Editor)
                    │                   │
                    └─────────┬─────────┘
                              ▼
                    Phase 4 (Validation)
```

Phases 2 and 3 can run in parallel after Phase 1 completes.

## Token Budget Guidelines

Each phase is designed to fit within token limits:

| Phase | Estimated Tokens | Sessions |
|-------|-----------------|----------|
| Phase 0 | 8,000-10,000 | 2-3 |
| Phase 1 | 8,000-10,000 | 4-5 |
| Phase 2 | 8,000-10,000 | 3-4 |
| Phase 3 | 8,000-10,000 | 5-6 |
| Phase 4 | 5,000-8,000 | 2-3 |

Break work into chunks that fit within a single session when possible.

## Common Commands

### Check Project Status
```bash
cat whisker-language-specification-1.0/STATE.md
```

### Run Tests (Phase 2+)
```bash
# whisker-core
cd writewhisker/whisker-core && busted

# whisker-editor-web
cd writewhisker/whisker-editor-web && pnpm test
```

### Validate Specification
```bash
# Check JSON schema
npx ajv validate -s shared/schemas/wls-1.0.schema.json -d example.json
```

## Getting Help

If stuck on a task, use this prompt:

```
I'm stuck on [task description].

Context:
- Phase: [X]
- Task: [ID]
- Error/Issue: [Description]
- Files involved: [List paths]

What I've tried: [List attempts]

Please help me resolve this.
```

## Quality Checklist

Before marking any task complete:

- [ ] Code/content matches specification
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] STATE.md updated
- [ ] No regressions in existing tests
