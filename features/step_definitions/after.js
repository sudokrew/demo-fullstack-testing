import fs from 'fs';

import {
  createCoverageMap,
  createCoverageSummary,
} from 'istanbul-lib-coverage';

const globalCoverage = createCoverageMap({});
const summary = createCoverageSummary();

export default function () {
  this.AfterStep((event, done) => {
    const value = getCoverageObjectValue();
    globalCoverage.merge(createCoverageMap(value));
    done();
  });

  this.AfterFeatures((event, done) => {
    globalCoverage.files().forEach(f => {
      const fc = globalCoverage.fileCoverageFor(f);
      const s = fc.toSummary();
      summary.merge(s);
    });
    fs.writeFile('coverage/coverage.frontend.json', JSON.stringify(globalCoverage), 'utf8', done);
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
