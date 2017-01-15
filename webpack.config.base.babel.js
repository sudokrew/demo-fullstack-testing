import path from 'path';
import webpack from 'webpack';

import postcssImport from 'postcss-import';
import cssnext from 'postcss-cssnext';
import postcssReporter from 'postcss-reporter';

const OUTPUT_PATH = path.join(__dirname, 'public');
const SOURCE_PATH = path.resolve(__dirname, 'src');

export default {
  devtool: 'source-map',
  entry: {
    'buy-ads': [
      'babel-polyfill',
      path.resolve(SOURCE_PATH, 'buy-ads.js')
    ],
  },
  externals: {},
  module: {
    rules: [
      {
        test: /\.css$/,
        include: SOURCE_PATH,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        include: SOURCE_PATH,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        include: SOURCE_PATH,
        exclude: /node_modules/,
        loader: 'json-loader',
      },
    ],
  },
  output: {
    path: OUTPUT_PATH,
    filename: '[name].js',
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
            path: [ SOURCE_PATH ],
          }),
          cssnext({ browsers: ['last 2 versions', 'IE > 10'] }),
          postcssReporter({ clearMessages: true }),
        ],
      }
    })
  ],
};
