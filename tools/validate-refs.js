#!/usr/bin/env node
// Validates exam question `ref` fields across Mammoth Academy course packs.
// Usage: node tools/validate-refs.js [courseFile...] [--self-test]

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_COURSES_DIR = path.join(ROOT, 'www', 'courses');
const DEFAULT_CRAM_FILE = path.join(ROOT, 'www', 'cram.js');

function loadCramSheets(cramFile = DEFAULT_CRAM_FILE) {
  const code = fs.readFileSync(cramFile, 'utf8');
  const ctx = {
    window: {},
    document: {
      readyState: 'loading',
      addEventListener: function () {}
    },
    location: { search: '', hash: '' }
  };
  vm.runInNewContext(code + '\n;this.__Cram = Cram;', ctx, { filename: cramFile });
  const cramObj = ctx.__Cram || ctx.window.Cram;
  if (!cramObj || !Array.isArray(cramObj.SHEETS)) {
    throw new Error('Failed to load Cram.SHEETS from ' + cramFile);
  }
  return cramObj.SHEETS;
}

function searchCramSheet(sheet, rawQuery) {
  if (!sheet || typeof rawQuery !== 'string') return false;
  const q = rawQuery.trim().toLowerCase();
  if (!q) return false;

  const rowMatches = (rows) =>
    Array.isArray(rows) &&
    rows.some((r) => Array.isArray(r) && r.join(' ').toLowerCase().includes(q));

  if (sheet.columns && sheet.rows && rowMatches(sheet.rows)) {
    return true;
  }
  if (
    Array.isArray(sheet.groups) &&
    sheet.groups.some((g) => rowMatches(g.rows))
  ) {
    return true;
  }
  if (
    Array.isArray(sheet.lists) &&
    sheet.lists.some((l) =>
      ((l.title || '') + ' ' + (l.steps || []).join(' '))
        .toLowerCase()
        .includes(q)
    )
  ) {
    return true;
  }
  if (sheet.table && rowMatches(sheet.table.rows)) {
    return true;
  }
  return false;
}

function loadCourseFromFile(filePath) {
  const absPath = path.resolve(filePath);
  const code = fs.readFileSync(absPath, 'utf8');
  const ctx = {};
  vm.runInNewContext(code, ctx, { filename: absPath });
  const courseKey = Object.keys(ctx).find(
    (k) =>
      k.startsWith('COURSE_') &&
      ctx[k] &&
      typeof ctx[k] === 'object' &&
      Array.isArray(ctx[k].modules) &&
      Array.isArray(ctx[k].exam)
  );
  if (!courseKey) {
    return null;
  }
  return {
    label: path.basename(absPath, '.js'),
    course: ctx[courseKey]
  };
}

function validateCourse(course, cramSheets, label = 'course') {
  const errors = [];
  const modules = Array.isArray(course && course.modules) ? course.modules : [];
  const exam = Array.isArray(course && course.exam) ? course.exam : [];

  const moduleMap = new Map();
  for (const m of modules) {
    if (m && typeof m.title === 'string') {
      const topicSet = new Set();
      if (Array.isArray(m.topics)) {
        for (const t of m.topics) {
          if (t && typeof t.title === 'string') {
            topicSet.add(t.title);
          }
        }
      }
      moduleMap.set(m.title, topicSet);
    }
  }

  const sheetMap = new Map();
  if (Array.isArray(cramSheets)) {
    for (const s of cramSheets) {
      if (s && typeof s.id === 'string') {
        sheetMap.set(s.id, s);
      }
    }
  }

  let refCount = 0;
  let cramLinks = 0;
  let gaps = 0;

  exam.forEach((qObj, idx) => {
    if (!qObj || qObj.ref === undefined) {
      return;
    }
    refCount++;
    const ref = qObj.ref;
    if (!ref || typeof ref !== 'object' || Array.isArray(ref)) {
      errors.push(`${label} exam[${idx}]: ref must be an object`);
      return;
    }

    if (typeof ref.module !== 'string' || !moduleMap.has(ref.module)) {
      errors.push(
        `${label} exam[${idx}]: module not found: ${JSON.stringify(ref.module)}`
      );
    } else {
      const topicSet = moduleMap.get(ref.module);
      if (typeof ref.topic !== 'string' || !topicSet.has(ref.topic)) {
        errors.push(
          `${label} exam[${idx}]: topic not found in module ${JSON.stringify(
            ref.module
          )}: ${JSON.stringify(ref.topic)}`
        );
      }
    }

    if (ref.cram !== undefined) {
      cramLinks++;
      if (!ref.cram || typeof ref.cram !== 'object' || Array.isArray(ref.cram)) {
        errors.push(`${label} exam[${idx}]: ref.cram must be an object`);
      } else {
        const sheetId = ref.cram.sheet;
        const cramQuery = ref.cram.q;
        if (typeof sheetId !== 'string' || !sheetMap.has(sheetId)) {
          errors.push(
            `${label} exam[${idx}]: unknown cram sheet id: ${JSON.stringify(
              sheetId
            )}`
          );
        } else {
          const sheet = sheetMap.get(sheetId);
          if (typeof cramQuery !== 'string' || !searchCramSheet(sheet, cramQuery)) {
            errors.push(
              `${label} exam[${idx}]: cram query ${JSON.stringify(
                cramQuery
              )} not found in sheet ${JSON.stringify(sheetId)}`
            );
          }
        }
      }
    }

    if (ref.gap === true) {
      gaps++;
    } else if (ref.gap !== undefined && ref.gap !== false) {
      errors.push(
        `${label} exam[${idx}]: ref.gap must be boolean when present`
      );
    }
  });

  const summary = `${label}: ${refCount}/${exam.length} refs, ${errors.length} errors, ${cramLinks} cram links, ${gaps} gaps`;
  return {
    label,
    totalQuestions: exam.length,
    refCount,
    cramLinks,
    gaps,
    errors,
    summary
  };
}

function resolveDefaultCourseFiles() {
  return fs
    .readdirSync(DEFAULT_COURSES_DIR)
    .filter((f) => f.endsWith('.js') && !f.startsWith('build-'))
    .sort()
    .map((f) => path.join(DEFAULT_COURSES_DIR, f));
}

function main(argv = process.argv.slice(2)) {
  if (argv.includes('--self-test')) {
    const { runTests } = require('./validate-refs.test.js');
    runTests();
    return;
  }

  const files = argv.length > 0 ? argv : resolveDefaultCourseFiles();
  const cramSheets = loadCramSheets();
  let totalErrors = 0;

  for (const file of files) {
    const loaded = loadCourseFromFile(file);
    if (!loaded) continue;
    const res = validateCourse(loaded.course, cramSheets, loaded.label);
    console.log(res.summary);
    for (const err of res.errors) {
      console.error('  ERROR: ' + err);
    }
    totalErrors += res.errors.length;
  }

  if (totalErrors > 0) {
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  loadCramSheets,
  searchCramSheet,
  loadCourseFromFile,
  validateCourse,
  resolveDefaultCourseFiles,
  main
};
