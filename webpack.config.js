const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  mode: 'production',
  plugins: [new webpack.ProgressPlugin(), new HtmlWebpackPlugin({
            template: 'index.html'
          })],

  module: {
    rules: []
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/docs'
  },

  devServer: {
    open: true
  },

  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      chunks: 'all'
    }
  }
}