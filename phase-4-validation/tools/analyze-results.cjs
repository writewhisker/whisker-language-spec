const fs = require('fs');

const reportPath = process.argv[2] || '../test-results/test-results-1767156555898.json';
const data = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

console.log('=== FAILED TESTS BY CATEGORY ===\n');

for (const cat of data.platforms[0].categories) {
  const failed = cat.tests.filter(t => !t.passed);
  if (failed.length > 0) {
    console.log('\n' + cat.category.toUpperCase() + ' (' + failed.length + ' failures):');
    for (const test of failed.slice(0, 5)) {
      console.log('  - ' + test.name);
      console.log('    Expected:', JSON.stringify(test.expected));
      console.log('    Actual:  ', JSON.stringify(test.actual));
      if (test.error) console.log('    Error:   ', test.error.substring(0, 100));
    }
    if (failed.length > 5) console.log('    ... and ' + (failed.length - 5) + ' more');
  }
}

console.log('\n\n=== SUMMARY ===');
console.log('Total:', data.platforms[0].summary.total);
console.log('Passed:', data.platforms[0].summary.passed);
console.log('Failed:', data.platforms[0].summary.failed);
console.log('Pass Rate:', data.platforms[0].summary.passRate);
