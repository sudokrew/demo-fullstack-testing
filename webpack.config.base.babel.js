import path from 'path';
import webpack from 'webpack';

import postcssImport from 'postcss-import';
import cssnext from 'postcss-cssnext';
import postcssReporter from 'postcss-reporter';

const OUTPUT_PATH = path.join(__dirname, 'public');
const SOURCE_PATH = path.resolve(__dirname, 'src');

export default {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader?plugins=istanbul',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  output: {
    path: OUTPUT_PATH,
    filename: 'bundle.js',
  },
  resolve: {
    modules: [
      SOURCE_PATH,
      'node_modules',
    ],
    extensions: ['.js', '.json'],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV == 'development',
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: webpack => [
          postcssImport({
            addDependencyTo: webpack,
            path: [SOURCE_PATH],
          }),
          cssnext({ browsers: ['last 2 versions', 'IE > 10'] }),
          postcssReporter({ clearMessages: true }),
        ],
      }
    })
  ],
  externals: {},
};
