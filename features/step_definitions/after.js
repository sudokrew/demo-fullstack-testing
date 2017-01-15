import fs from 'fs';
import path from 'path';

import {
  createCoverageMap,
  createCoverageSummary,
} from 'istanbul-lib-coverage';

const globalCoverage = createCoverageMap({});
const summary = createCoverageSummary();

export default function () {
  this.AfterStep((event, done) => {
    const value = getCoverageObjectValue();
    globalCoverage.merge(value);
    done();
  });

  this.AfterFeatures((event, done) => {
    globalCoverage.files().forEach(f => {
      const fc = globalCoverage.fileCoverageFor(f);
      const s = fc.toSummary();
      summary.merge(s);
    });
    const COVERAGE_DIR = path.resolve('coverage', 'frontend');
    if(fs.existsSync(COVERAGE_DIR) === false) {
    fs.mkdirSync(COVERAGE_DIR);
  }
    fs.writeFile(path.resolve(COVERAGE_DIR, 'coverage.json'), JSON.stringify(globalCoverage), 'utf8', done);
  });
};

/**
* Get the coverage object
* @return {[type]} [description]
*/
function getCoverageObjectValue() {
  const __coverage__ = browser.execute(() => window.__coverage__);
  return __coverage__.value;
}
