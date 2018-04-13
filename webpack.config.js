const webpack = require('webpack')
const { resolve } = require('path')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  target: 'node',
  devtool: 'source-map',
  entry: {
    // (optional) allow use to use utils from outside
    utils: './src/utils.js',
    // the core lib to manipulate a deck
    core: './src/core.js',
    // the REST api
    api: './src/api/start.js'
  },
  output: {
    path: resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
}
