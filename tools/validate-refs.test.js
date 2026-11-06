#!/usr/bin/env node
// Self-test for tools/validate-refs.js.
// Verifies that the real aws-saa-c03.js passes with 213/213 refs and 0 errors,
// and that planted bugs (bad module title, bad topic title, cram term the sheet
// cannot find, and unknown sheet id) are caught in an in-memory copy.

const assert = require('assert');
const path = require('path');
const {
  loadCramSheets,
  loadCourseFromFile,
  validateCourse
} = require('./validate-refs.js');

const ROOT = path.resolve(__dirname, '..');
const AWS_FILE = path.join(ROOT, 'www', 'courses', 'aws-saa-c03.js');

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function runTests() {
  const cramSheets = loadCramSheets();
  const loaded = loadCourseFromFile(AWS_FILE);
  assert(loaded, 'Expected aws-saa-c03.js to load');

  // 1. Assert the real file passes with 213/213 refs and 0 errors.
  const realResult = validateCourse(loaded.course, cramSheets, loaded.label);
  assert.strictEqual(realResult.totalQuestions, 213, 'Expected 213 exam questions');
  assert.strictEqual(realResult.refCount, 213, 'Expected 213/213 refs');
  assert.strictEqual(
    realResult.errors.length,
    0,
    'Expected 0 errors on real file, got: ' + realResult.errors.join('; ')
  );
  assert(realResult.cramLinks > 0, 'Expected at least 1 cram link');
  assert(realResult.gaps > 0, 'Expected at least 1 gap');

  // 2. Plant Bug #1: Bad module title.
  const badModCourse = clone(loaded.course);
  badModCourse.exam[0].ref.module = 'Nonexistent Module Title 404';
  const badModRes = validateCourse(badModCourse, cramSheets, 'aws-saa-c03');
  assert.strictEqual(badModRes.errors.length, 1, 'Expected 1 error for bad module title');
  assert(
    badModRes.errors[0].includes('exam[0]') &&
      badModRes.errors[0].includes('module not found'),
    'Unexpected error message for bad module: ' + badModRes.errors[0]
  );

  // 3. Plant Bug #2: Bad topic title inside a valid module.
  const badTopCourse = clone(loaded.course);
  badTopCourse.exam[1].ref.topic = 'Nonexistent Topic Title 404';
  const badTopRes = validateCourse(badTopCourse, cramSheets, 'aws-saa-c03');
  assert.strictEqual(badTopRes.errors.length, 1, 'Expected 1 error for bad topic title');
  assert(
    badTopRes.errors[0].includes('exam[1]') &&
      badTopRes.errors[0].includes('topic not found'),
    'Unexpected error message for bad topic: ' + badTopRes.errors[0]
  );

  // 4. Plant Bug #3: Cram term the sheet cannot find.
  const badCramTermCourse = clone(loaded.course);
  badCramTermCourse.exam[2].ref.cram = {
    sheet: 'aws',
    q: 'quantum-flux-capacitor-9999'
  };
  const badCramTermRes = validateCourse(
    badCramTermCourse,
    cramSheets,
    'aws-saa-c03'
  );
  assert.strictEqual(
    badCramTermRes.errors.length,
    1,
    'Expected 1 error for unsearchable cram term'
  );
  assert(
    badCramTermRes.errors[0].includes('exam[2]') &&
      badCramTermRes.errors[0].includes('not found in sheet'),
    'Unexpected error message for bad cram term: ' + badCramTermRes.errors[0]
  );

  // 5. Plant Bug #4: Unknown cram sheet id.
  const badSheetCourse = clone(loaded.course);
  badSheetCourse.exam[3].ref.cram = {
    sheet: 'nonexistent-sheet-id',
    q: 'Deep Archive'
  };
  const badSheetRes = validateCourse(badSheetCourse, cramSheets, 'aws-saa-c03');
  assert.strictEqual(
    badSheetRes.errors.length,
    1,
    'Expected 1 error for unknown cram sheet id'
  );
  assert(
    badSheetRes.errors[0].includes('exam[3]') &&
      badSheetRes.errors[0].includes('unknown cram sheet id'),
    'Unexpected error message for unknown sheet id: ' + badSheetRes.errors[0]
  );

  // 6. Plant all 4 bugs simultaneously in one in-memory copy and assert all 4 are caught.
  const multiBugCourse = clone(loaded.course);
  multiBugCourse.exam[0].ref.module = 'Bad Module';
  multiBugCourse.exam[1].ref.topic = 'Bad Topic';
  multiBugCourse.exam[2].ref.cram = { sheet: 'aws', q: 'unfindable-term-xyz' };
  multiBugCourse.exam[3].ref.cram = { sheet: 'bad-sheet', q: 'gp3' };
  const multiBugRes = validateCourse(multiBugCourse, cramSheets, 'aws-saa-c03');
  assert.strictEqual(
    multiBugRes.errors.length,
    4,
    'Expected all 4 planted bugs to be caught'
  );

  console.log(
    'validate-refs.test.js: PASS (' +
      realResult.summary +
      '; caught all 4 planted bug types)'
  );
}

if (require.main === module) {
  runTests();
}

module.exports = { runTests };
