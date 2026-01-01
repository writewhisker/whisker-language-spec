# Phase 0: Research & Design - Claude Guide

## Phase Objective

Analyze existing interactive fiction systems (Twine, Ink) and current Whisker implementations to design an enhanced feature set for WLS 1.0.

## Session Setup

Start each session with:

```
I'm working on WLS 1.0 Phase 0: Research & Design.
Current task: [Task ID from PLAN.md]
Please read phase-0-research/CLAUDE.md and phase-0-research/PLAN.md.
```

## Task Execution Order

Execute tasks in order. Each produces a specific deliverable.

```
0.1 Twine Analysis      → TWINE_ANALYSIS.md
0.2 Ink Analysis        → INK_ANALYSIS.md
0.3 whisker-core Audit  → WHISKER_CORE_CURRENT.md
0.4 whisker-editor Audit→ WHISKER_EDITOR_CURRENT.md
0.5 Enhancements        → ENHANCEMENT_PROPOSALS.md
0.6 Design Decisions    → WLS_DESIGN_DECISIONS.md
0.7 Feature Matrix      → FEATURE_MATRIX.md
0.8 Success Criteria    → SUCCESS_CRITERIA.md
0.9 Phase Summary       → PHASE_0_SUMMARY.md
```

## Token Management

Each task is designed to fit in one session (~8,000 tokens output):

| Task | Est. Tokens | Notes |
|------|-------------|-------|
| 0.1 | 6,000 | May require web research |
| 0.2 | 6,000 | May require web research |
| 0.3 | 4,000 | Reference existing codebase |
| 0.4 | 4,000 | Reference existing codebase |
| 0.5 | 5,000 | Synthesis of 0.1-0.4 |
| 0.6 | 8,000 | Comprehensive decisions |
| 0.7 | 3,000 | Matrix format |
| 0.8 | 2,000 | Concise criteria |
| 0.9 | 2,000 | Summary only |

## Research Approach

### For Twine/Ink Analysis (0.1, 0.2)

Use web search to find:
- Official documentation
- Language specifications
- Community examples
- Common patterns

Focus on features that would enhance narrative authoring:
- State management
- Branching patterns
- Text formatting
- Dynamic content
- Save/load systems

### For Whisker Audits (0.3, 0.4)

Read the existing codebases:
- whisker-core: `/Users/jims/code/github.com/writewhisker/whisker-core`
- whisker-editor-web: `/Users/jims/code/github.com/writewhisker/whisker-editor-web`

Reference the existing analysis:
- `/Users/jims/code/github.com/whisker-analysis/GAP_ANALYSIS.md`
- `/Users/jims/code/github.com/whisker-analysis/WHISKER_EDITOR_WEB_ANALYSIS.md`

## Output Format

All deliverables should:
1. Use Markdown format
2. Include clear headings
3. Have tables for comparisons
4. Include code examples where relevant
5. Be saved to `phase-0-research/outputs/`

## State Tracking

Update `STATE.md` after each task:

```markdown
## Phase 0 Progress

| Task | Status | Completed | Notes |
|------|--------|-----------|-------|
| 0.1 | done | 2025-01-XX | |
| 0.2 | in_progress | - | Researching ink docs |
| ... | | | |

### Current Context
[Key decisions/findings to remember]

### Next Session
[What to do next]
```

## Prompts Location

Use prompts from `phase-0-research/prompts/`:
- `01-twine-analysis.md`
- `02-ink-analysis.md`
- `03-whisker-core-audit.md`
- `04-whisker-editor-audit.md`
- `05-enhancement-proposals.md`
- `06-design-decisions.md`
- `07-feature-matrix.md`
- `08-success-criteria.md`
- `09-phase-summary.md`

## Compact State Template

When ending a session:

```markdown
## Phase 0 State - [Date]

**Completed:** [Task IDs]
**In Progress:** [Task ID] - [Specific subtask]
**Blocked:** [Any blockers]

### Key Findings
- [Finding 1]
- [Finding 2]

### Decisions Made
- [Decision 1]
- [Decision 2]

### Files Created
- outputs/[file1].md
- outputs/[file2].md

### Next Session
1. [First action]
2. [Second action]
```

## Quality Checklist

Before marking Phase 0 complete:

- [ ] All 9 tasks completed
- [ ] All deliverables in `outputs/`
- [ ] Feature set documented
- [ ] Design decisions justified
- [ ] Success criteria defined
- [ ] STATE.md updated
- [ ] Ready for Phase 1 review
