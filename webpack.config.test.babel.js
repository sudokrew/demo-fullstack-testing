import path from 'path';
import merge from 'webpack-merge';
import webpack from 'webpack';

import BASE_CONFIG from './webpack.config.base.babel';
const SOURCE_PATH = path.resolve(__dirname, 'src');

export default merge.smart(BASE_CONFIG, {
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [
          //'style-loader',    // inherited from base config, via merge.smart
          'css-loader?modules&sourceMap&context="/"&localIdentName=[name]__[local]___[hash:base64:5]',
          //'postcss-loader',  // inherited from base config, via merge.smart
        ],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader?plugins=istanbul',
      },
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/ReactContext/, /enzyme/),
    new webpack.IgnorePlugin(/ExecutionEnvironment/, /enzyme/),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
});
