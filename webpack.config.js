'use strict';

var webpack = require('webpack');

module.exports = {
  entry: './app/main.jsx',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      },
      {
        test: /\.css/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['style-loader', 'css-loader'],
        include: __dirname + '/src'
      }
    ]
  }
};
