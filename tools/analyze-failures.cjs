const fs = require("fs");

const core = JSON.parse(fs.readFileSync("../test-results/whisker-core-results.json"));
const webRaw = JSON.parse(fs.readFileSync("../test-results/test-results-1767160861231.json"));
const web = webRaw.platforms ? webRaw.platforms[0] : webRaw;

console.log("=== Detailed Failure Analysis ===\n");

// Collect all failures
const failures = {
    bothFail: [],
    coreOnly: [],
    webOnly: []
};

for (const coreCat of core.categories) {
    const webCat = web.categories.find(c => c.category === coreCat.category);
    if (!webCat) continue;

    for (const coreTest of coreCat.tests) {
        const webTest = webCat.tests.find(t => t.name === coreTest.name);
        if (!webTest) continue;

        if (!coreTest.passed && !webTest.passed) {
            failures.bothFail.push({
                name: coreTest.name,
                category: coreCat.category,
                expected: coreTest.expected,
                coreActual: coreTest.actual,
                webActual: webTest.actual
            });
        } else if (!coreTest.passed && webTest.passed) {
            failures.coreOnly.push({
                name: coreTest.name,
                category: coreCat.category,
                expected: coreTest.expected,
                actual: coreTest.actual
            });
        } else if (coreTest.passed && !webTest.passed) {
            failures.webOnly.push({
                name: coreTest.name,
                category: coreCat.category,
                expected: webTest.expected,
                actual: webTest.actual
            });
        }
    }
}

// Categorize failures
const categories = {
    semanticValidation: [], // Tests expect undefined var detection, type checking, etc.
    apiExecution: [],       // Tests require runtime execution
    choiceSyntax: [],       // Choice parsing issues
    formatHandling: [],     // JSON format issues
    errorMessages: [],      // Parser works but error message differs
    parserBugs: [],         // Actual parser bugs to fix
    testIssues: []          // Test expectations are wrong
};

function categorize(test, platform) {
    const name = test.name;
    const expected = test.expected || {};
    const actual = test.actual || test.coreActual || test.webActual || {};

    // API tests - require runtime
    if (name.startsWith("api-")) {
        categories.apiExecution.push({ ...test, platform });
        return;
    }

    // Semantic validation - tests expect error for valid syntax
    if (expected.valid === false && actual.valid === true) {
        const semanticErrors = [
            "Undefined variable", "Reserved prefix", "Type mismatch",
            "Invalid variable name", "Shadows story variable", "Duplicate passage",
            "Invalid passage name", "Target passage does not exist",
            "Nested inline conditional", "Missing false option", "Invalid condition",
            "Unclosed conditional", "Unexpected close", "Division by zero",
            "Modulo by zero", "No passages", "Missing required field", "Invalid format"
        ];

        const expectsSemanticError = semanticErrors.some(e =>
            (expected.error || "").includes(e)
        );

        if (expectsSemanticError) {
            categories.semanticValidation.push({ ...test, platform });
            return;
        }
    }

    // Choice syntax issues
    if (actual.error && actual.error.includes("Choice missing target")) {
        categories.choiceSyntax.push({ ...test, platform });
        return;
    }

    // Format handling
    if (name.startsWith("format-json")) {
        categories.formatHandling.push({ ...test, platform });
        return;
    }

    // Otherwise classify as parser bug or test issue
    if (expected.valid === true && actual.valid === false) {
        categories.parserBugs.push({ ...test, platform });
    } else {
        categories.testIssues.push({ ...test, platform });
    }
}

// Categorize all failures
failures.bothFail.forEach(t => categorize(t, "both"));
failures.coreOnly.forEach(t => categorize(t, "core"));
failures.webOnly.forEach(t => categorize(t, "web"));

console.log("=== Failure Categories ===\n");

console.log(`1. Semantic Validation (${categories.semanticValidation.length} tests)`);
console.log("   Tests expect parsers to catch semantic errors (not required by spec)");
categories.semanticValidation.slice(0, 5).forEach(t =>
    console.log(`   - ${t.name} [${t.platform}]: expects "${(t.expected?.error || "error").slice(0, 30)}..."`)
);
if (categories.semanticValidation.length > 5)
    console.log(`   ... and ${categories.semanticValidation.length - 5} more\n`);

console.log(`\n2. API Execution (${categories.apiExecution.length} tests)`);
console.log("   Tests require Lua runtime execution (web is parser-only)");
categories.apiExecution.slice(0, 3).forEach(t =>
    console.log(`   - ${t.name} [${t.platform}]`)
);
if (categories.apiExecution.length > 3)
    console.log(`   ... and ${categories.apiExecution.length - 3} more\n`);

console.log(`\n3. Choice Syntax (${categories.choiceSyntax.length} tests)`);
console.log("   Parser rejects valid choice syntax");
categories.choiceSyntax.slice(0, 5).forEach(t =>
    console.log(`   - ${t.name} [${t.platform}]`)
);
if (categories.choiceSyntax.length > 5)
    console.log(`   ... and ${categories.choiceSyntax.length - 5} more\n`);

console.log(`\n4. Format Handling (${categories.formatHandling.length} tests)`);
console.log("   JSON format parsing issues");
categories.formatHandling.forEach(t =>
    console.log(`   - ${t.name} [${t.platform}]`)
);

console.log(`\n5. Parser Bugs (${categories.parserBugs.length} tests)`);
console.log("   Valid input rejected by parser");
categories.parserBugs.forEach(t =>
    console.log(`   - ${t.name} [${t.platform}]: ${(t.actual?.error || t.coreActual?.error || t.webActual?.error || "no error").slice(0, 40)}`)
);

console.log(`\n6. Test Issues (${categories.testIssues.length} tests)`);
console.log("   Test expectations may be wrong");
categories.testIssues.forEach(t =>
    console.log(`   - ${t.name} [${t.platform}]`)
);

console.log("\n=== Recommended Actions ===\n");
console.log(`1. Update ${categories.semanticValidation.length} semantic tests to expect valid:true (parsers don't do semantic validation)`);
console.log(`2. Move ${categories.apiExecution.length} API tests to runtime-only category or mark web as expected-fail`);
console.log(`3. Fix ${categories.choiceSyntax.length} choice syntax parsing issues in whisker-core`);
console.log(`4. Update ${categories.formatHandling.length} JSON format tests (optional feature)`);
console.log(`5. Fix ${categories.parserBugs.length} parser bugs`);
console.log(`6. Review ${categories.testIssues.length} test expectations`);

// Output as JSON for programmatic use
fs.writeFileSync("../test-results/failure-analysis.json", JSON.stringify({
    summary: {
        semanticValidation: categories.semanticValidation.length,
        apiExecution: categories.apiExecution.length,
        choiceSyntax: categories.choiceSyntax.length,
        formatHandling: categories.formatHandling.length,
        parserBugs: categories.parserBugs.length,
        testIssues: categories.testIssues.length
    },
    categories
}, null, 2));

console.log("\nDetailed analysis saved to: ../test-results/failure-analysis.json");
