# Phase 4: Validation - Claude Guide

## Phase Objective

Verify bi-directional compatibility between whisker-core and whisker-editor-web by running comprehensive cross-platform tests.

## Prerequisites

- Phase 2 complete (whisker-core updated)
- Phase 3 complete (whisker-editor-web updated)
- Both platforms passing WLS test corpus

## Session Setup

Start each session with:

```
I'm working on WLS 1.0 Phase 4: Validation.
Current task: [Task ID from PLAN.md]

whisker-core: /Users/jims/code/github.com/writewhisker/whisker-core
whisker-editor-web: /Users/jims/code/github.com/writewhisker/whisker-editor-web
Test corpus: phase-4-validation/test-corpus/

Please read phase-4-validation/CLAUDE.md and PLAN.md.
```

## Validation Approach

### 1. Test Corpus Execution
Run identical tests on both platforms:
```
For each test case:
  1. Run in whisker-core
  2. Run in whisker-editor-web
  3. Compare outputs
  4. Report any differences
```

### 2. Behavioral Comparison
```
For each feature:
  1. Create test story
  2. Execute on both platforms
  3. Compare state at each step
  4. Verify identical behavior
```

### 3. Round-Trip Testing
```
1. Create story in whisker-core
2. Export as .ws and .json
3. Import into whisker-editor-web
4. Verify identical content
5. Export from editor
6. Import back to core
7. Verify no data loss
```

## Test Corpus Structure

```
test-corpus/
├── syntax/
│   ├── passages/          # 20 tests
│   ├── choices/           # 25 tests
│   ├── variables/         # 30 tests
│   ├── conditionals/      # 35 tests
│   └── expressions/       # 30 tests
├── api/
│   ├── state/             # 15 tests
│   ├── passage/           # 15 tests
│   ├── history/           # 10 tests
│   └── util/              # 10 tests
├── features/
│   ├── alternatives/      # 15 tests
│   ├── once-only/         # 10 tests
│   └── weave/             # 15 tests
├── formats/
│   ├── json/              # 15 tests
│   └── text/              # 15 tests
└── edge-cases/            # 25 tests

Total: 275 tests
```

## Test Case Format

```yaml
# test-corpus/syntax/variables/interpolation-basic.yaml
name: Basic Variable Interpolation
category: syntax/variables
id: VAR-001

input:
  format: ws
  content: |
    :: Start
    $gold = 100
    You have $gold gold coins.

expected:
  passages:
    - name: Start
      rendered_content: "You have 100 gold coins."
  variables:
    gold: 100

platforms:
  whisker-core: must-pass
  whisker-editor-web: must-pass
```

## Cross-Platform Test Runner

```javascript
// tools/cross-platform-test.js
async function runTests(corpusPath) {
  const results = {
    passed: [],
    failed: [],
    differences: []
  };

  for (const test of loadCorpus(corpusPath)) {
    const coreResult = await runInCore(test);
    const editorResult = await runInEditor(test);

    if (deepEqual(coreResult, editorResult)) {
      results.passed.push(test.id);
    } else {
      results.differences.push({
        test: test.id,
        core: coreResult,
        editor: editorResult
      });
    }
  }

  return results;
}
```

## Token Management

| Task | Est. Tokens | Sessions |
|------|-------------|----------|
| 4.1 Test Runner | 4,000 | 1 |
| 4.2 Execute Tests | 3,000 | 1 |
| 4.3 Behavioral Diffs | 4,000 | 1 |
| 4.4 Fix Discrepancies | 6,000 | 2 |
| 4.5 Benchmarks | 2,000 | 1 |
| 4.6 Security | 2,000 | 1 |
| 4.7 Migration Guide | 3,000 | 1 |
| 4.8 Final Review | 2,000 | 1 |
| 4.9 Summary | 1,500 | 1 |

## Prompt Templates

### For Investigating Differences
```
Test ID: [ID]
Category: [Category]

Core result:
[Output from whisker-core]

Editor result:
[Output from whisker-editor-web]

Expected (from spec):
[What WLS 1.0 says should happen]

Please identify the discrepancy and determine which
implementation is correct per the specification.
```

### For Fixing Issues
```
Discrepancy: [Description]
Spec reference: Section [X.Y]
Correct behavior: [What should happen]

Platform to fix: [whisker-core / whisker-editor-web]
File: [path/to/file]

Please implement the fix to match WLS 1.0 specification.
```

## State Tracking

Update `STATE.md` with:

```markdown
## Phase 4 Progress

### Test Execution

| Platform | Passing | Total | % |
|----------|---------|-------|---|
| whisker-core | X | 275 | X% |
| whisker-editor-web | X | 275 | X% |
| Cross-platform | X | 275 | X% |

### Discrepancies

| Test | Core | Editor | Status |
|------|------|--------|--------|
| VAR-001 | pass | fail | fixing |
| ... | | | |

### Fixes Applied

| Issue | Platform | Fix | Verified |
|-------|----------|-----|----------|
| ... | | | |
```

## Compact State Template

```markdown
## Phase 4 State - [Date]

**Tests:** Core X/275, Editor X/275, Cross X/275
**Discrepancies:** X found, Y fixed, Z remaining

### Open Issues
- [Issue 1]: [Platform] - [Status]

### Fixes Applied
- [Fix 1]: [Platform] - [File]

### Next Session
1. Fix remaining discrepancies
2. Re-run full test suite
3. Generate final report
```

## Quality Checklist

Before marking Phase 4 complete:

- [ ] All test corpus tests passing on both platforms
- [ ] Zero behavioral differences
- [ ] Round-trip testing verified
- [ ] Performance benchmarks acceptable
- [ ] Security review complete
- [ ] Migration guide written
- [ ] Final documentation reviewed
- [ ] STATE.md updated
- [ ] PHASE_4_SUMMARY.md written

## Deliverables

1. **test-results/** - All test results
2. **BEHAVIORAL_DIFFS.md** - Any differences found (should be empty)
3. **BENCHMARKS.md** - Performance comparison
4. **SECURITY_REVIEW.md** - Security audit
5. **MIGRATION_GUIDE.md** - User migration guide
6. **PHASE_4_SUMMARY.md** - Final summary

## Prompts Location

Use prompts from `phase-4-validation/prompts/`:
- `01-test-runner.md`
- `02-execute-tests.md`
- `03-investigate-diff.md`
- `04-fix-discrepancy.md`
- `05-benchmarks.md`
- `06-security.md`
- `07-migration-guide.md`
- `08-final-review.md`
- `09-summary.md`
