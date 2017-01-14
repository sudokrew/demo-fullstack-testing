import path from 'path';
import merge from 'webpack-merge';
import webpack from 'webpack';

import BASE_CONFIG from './webpack.config.base.babel';

const SOURCE_PATH = path.resolve(__dirname, 'src');
const BUY_ADS_ENTRY_PATH = path.resolve(SOURCE_PATH, 'buy-ads.js');

export default merge(BASE_CONFIG, {
  devtool: 'inline-source-map',
  entry: [
    'babel-polyfill',
    BUY_ADS_ENTRY_PATH,
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [
          'ignore-loader',
        ],
      }
    ]
  }
});
