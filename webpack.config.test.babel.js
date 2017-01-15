import path from 'path';
import merge from 'webpack-merge';
import webpack from 'webpack';

import BASE_CONFIG from './webpack.config.base.babel';
const SOURCE_PATH = path.resolve(__dirname, 'src');

export default merge.smart(BASE_CONFIG, {
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [
          //'style-loader',    // inherited from base config, via merge.smart
          'css-loader?modules&sourceMap&context="/"',
          //'postcss-loader',  // inherited from base config, via merge.smart
        ],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader?plugins=istanbul',
      },
    ]
  }
});
