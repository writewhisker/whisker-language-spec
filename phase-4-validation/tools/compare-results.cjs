const fs = require("fs");

const core = JSON.parse(fs.readFileSync("../test-results/whisker-core-results.json"));
const webFiles = fs.readdirSync("../test-results").filter(f => f.startsWith("test-results-") && f.endsWith(".json"));
const latestWeb = webFiles.sort().pop();
const webRaw = JSON.parse(fs.readFileSync("../test-results/" + latestWeb));

// Extract web platform data (it's in platforms[0])
const web = webRaw.platforms ? webRaw.platforms[0] : webRaw;

console.log("=== Cross-Platform Comparison ===\n");
console.log("Using web results from:", latestWeb);
console.log("");

if (web.summary) {
    console.log("\nPlatform         | Total | Passed | Failed | Rate");
    console.log("-----------------+-------+--------+--------+------");
    console.log(`whisker-core     | ${core.summary.total.toString().padStart(5)} | ${core.summary.passed.toString().padStart(6)} | ${core.summary.failed.toString().padStart(6)} | ${core.summary.passRate}`);
    console.log(`whisker-editor   | ${web.summary.total.toString().padStart(5)} | ${web.summary.passed.toString().padStart(6)} | ${web.summary.failed.toString().padStart(6)} | ${web.summary.passRate}`);
    console.log("");

    console.log("=== By Category ===\n");
    console.log("Category       | Core  | Web   | Diff");
    console.log("---------------+-------+-------+------");

    for (const coreCat of core.categories) {
        const webCat = web.categories.find(c => c.category === coreCat.category);
        if (webCat) {
            const coreStr = `${coreCat.passed}/${coreCat.total}`;
            const webStr = `${webCat.passed}/${webCat.total}`;
            const diff = coreCat.passed - webCat.passed;
            const diffStr = diff > 0 ? `+${diff}` : diff.toString();
            console.log(`${coreCat.category.padEnd(14)} | ${coreStr.padStart(5)} | ${webStr.padStart(5)} | ${diffStr.padStart(4)}`);
        }
    }

    // Find tests that differ
    console.log("\n=== Tests with Different Results ===\n");
    let onlyCoreFailed = [];
    let onlyWebFailed = [];
    let bothFailed = [];

    for (const coreCat of core.categories) {
        const webCat = web.categories.find(c => c.category === coreCat.category);
        if (!webCat) continue;

        for (const coreTest of coreCat.tests) {
            const webTest = webCat.tests.find(t => t.name === coreTest.name);
            if (!webTest) continue;

            if (coreTest.passed && !webTest.passed) {
                onlyWebFailed.push({ name: coreTest.name, category: coreCat.category });
            } else if (!coreTest.passed && webTest.passed) {
                onlyCoreFailed.push({ name: coreTest.name, category: coreCat.category, error: coreTest.actual?.error });
            } else if (!coreTest.passed && !webTest.passed) {
                bothFailed.push({ name: coreTest.name, category: coreCat.category });
            }
        }
    }

    console.log(`Tests failing ONLY in whisker-core (${onlyCoreFailed.length}):`);
    for (const t of onlyCoreFailed.slice(0, 10)) {
        console.log(`  - ${t.category}/${t.name}${t.error ? ": " + t.error.slice(0, 40) : ""}`);
    }
    if (onlyCoreFailed.length > 10) console.log(`  ... and ${onlyCoreFailed.length - 10} more`);

    console.log(`\nTests failing ONLY in whisker-editor-web (${onlyWebFailed.length}):`);
    for (const t of onlyWebFailed.slice(0, 10)) {
        console.log(`  - ${t.category}/${t.name}`);
    }
    if (onlyWebFailed.length > 10) console.log(`  ... and ${onlyWebFailed.length - 10} more`);

    console.log(`\nTests failing in BOTH platforms (${bothFailed.length}):`);
    for (const t of bothFailed.slice(0, 10)) {
        console.log(`  - ${t.category}/${t.name}`);
    }
    if (bothFailed.length > 10) console.log(`  ... and ${bothFailed.length - 10} more`);
} else {
    console.log("Web results have different structure, attempting to parse...");
    console.log("First 3 keys:", Object.keys(web).slice(0, 3));
}
