# Phase 4: Validation - Detailed Plan

## Objective

Verify bi-directional compatibility between whisker-core and whisker-editor-web.

## Duration: 2 Weeks (Weeks 19-20)
## Effort: 200 hours

---

## Task 4.1: Build Cross-Platform Test Runner

**Effort:** 40 hours
**Deliverable:** `tools/cross-platform-test.js`

### Features
- Load test corpus
- Execute on whisker-core (via Lua)
- Execute on whisker-editor-web (via Node)
- Compare results
- Generate report

### Components
```javascript
// Test runner architecture
class CrossPlatformRunner {
  loadCorpus(path)
  runOnCore(test)
  runOnEditor(test)
  compareResults(coreResult, editorResult)
  generateReport(results)
}
```

### Test Coverage
- Runner unit tests: 15 tests

---

## Task 4.2: Execute Full Test Corpus

**Effort:** 24 hours
**Deliverable:** `test-results/*.json`

### Process
1. Run all 275 tests on whisker-core
2. Run all 275 tests on whisker-editor-web
3. Compare results pair-wise
4. Generate difference report

### Output Format
```json
{
  "timestamp": "2025-01-XX",
  "corpus_version": "1.0",
  "results": {
    "whisker-core": {
      "passed": 275,
      "failed": 0,
      "errors": 0
    },
    "whisker-editor-web": {
      "passed": 275,
      "failed": 0,
      "errors": 0
    },
    "cross-platform": {
      "identical": 275,
      "different": 0
    }
  },
  "differences": []
}
```

---

## Task 4.3: Behavioral Diff Testing

**Effort:** 32 hours
**Deliverable:** `BEHAVIORAL_DIFFS.md`

### Testing Scenarios

1. **State Management**
   - Variable setting/getting
   - Variable scoping
   - State persistence

2. **Navigation**
   - Passage transitions
   - History tracking
   - Back navigation

3. **Choice Processing**
   - Condition evaluation
   - Once-only tracking
   - Action execution

4. **Content Rendering**
   - Variable interpolation
   - Conditional blocks
   - Alternative text

### Output
Document any behavioral differences with:
- Test case reference
- Expected behavior (per spec)
- Actual behavior (each platform)
- Root cause analysis

---

## Task 4.4: Fix Discrepancies

**Effort:** 40 hours
**Deliverable:** Bug fixes in both codebases

### Process
1. Prioritize by severity
2. Identify correct behavior per spec
3. Implement fix in incorrect platform
4. Write regression test
5. Verify fix

### Priority
- P1: Spec violations
- P2: Edge case differences
- P3: Minor variations

---

## Task 4.5: Performance Benchmarking

**Effort:** 16 hours
**Deliverable:** `BENCHMARKS.md`

### Metrics

| Metric | Core Target | Editor Target |
|--------|-------------|---------------|
| Parse time (1000 passages) | <100ms | <150ms |
| Story load time | <50ms | <100ms |
| Choice evaluation | <5ms | <10ms |
| State update | <1ms | <2ms |
| Memory (typical story) | <10MB | <50MB |

### Benchmark Suite
- Small story (10 passages)
- Medium story (100 passages)
- Large story (1000 passages)
- Complex branching
- Heavy scripting

---

## Task 4.6: Security Review

**Effort:** 16 hours
**Deliverable:** `SECURITY_REVIEW.md`

### Review Areas

1. **Lua Sandboxing**
   - No file system access
   - No network access
   - No dangerous functions
   - Iteration limits

2. **Input Validation**
   - Story file validation
   - Script injection prevention
   - XSS prevention (editor)

3. **Data Handling**
   - State serialization
   - Import/export safety
   - Token storage (editor)

---

## Task 4.7: Write Migration Guide

**Effort:** 24 hours
**Deliverable:** `MIGRATION_GUIDE.md`

### Content

1. **Overview**
   - What's changing
   - Why migrate
   - Timeline

2. **Syntax Changes**
   - `{{ }}` → `${ }`
   - `&&` → `and`
   - `||` → `or`
   - `!=` → `~=`

3. **API Changes**
   - Old API → New API mapping
   - Code examples

4. **Migration Tools**
   - whisker-core migration tool
   - whisker-editor-web migration UI

5. **Step-by-Step Guide**
   - Backup
   - Run migration
   - Verify
   - Test

6. **Troubleshooting**
   - Common issues
   - Solutions

---

## Task 4.8: Final Documentation Review

**Effort:** 16 hours
**Deliverable:** Documentation updates

### Review
- WLS 1.0 specification accuracy
- Example correctness
- Cross-references
- Version consistency

---

## Task 4.9: Write Phase Summary

**Effort:** 8 hours
**Deliverable:** `PHASE_4_SUMMARY.md`

### Content
- Test results summary
- Discrepancies found and fixed
- Performance comparison
- Security status
- Migration readiness
- Recommendations

---

## Milestone Checklist

Before declaring WLS 1.0 complete:

- [ ] All 275 test corpus tests pass on both platforms
- [ ] Zero behavioral differences
- [ ] Performance targets met
- [ ] Security review passed
- [ ] Migration guide complete
- [ ] Documentation reviewed
- [ ] PHASE_4_SUMMARY.md written
- [ ] STATE.md updated

---

## Success Criteria (from Phase 0)

| Criterion | Target | Actual |
|-----------|--------|--------|
| Test corpus pass rate | 100% | |
| Behavioral differences | 0 | |
| Parse time (1000 passages) | <100ms | |
| Memory (typical story) | <50MB | |
| Migration success rate | 95% | |

---

## Dependencies

### Inputs
- Phase 2: Updated whisker-core
- Phase 3: Updated whisker-editor-web
- Phase 1: Test corpus

### Outputs
- Validation report
- Migration guide
- Performance benchmarks
- Security review
