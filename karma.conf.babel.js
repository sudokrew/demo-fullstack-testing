import WEBPACK_CONFIG from './webpack.config.test.babel.js';

export default (config) => {
  config.set({
    browsers: [
      'Chrome',
      'Firefox',
    ],
    colors: true,
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'src/**/*.spec.js',
    ],
    frameworks: [
      'mocha',
    ],
    preprocessors: {
      'src/**/*.js': [
        'webpack',
        'sourcemap',
      ],
    },
    singleRun: true,
    webpack: WEBPACK_CONFIG,
  });
};
