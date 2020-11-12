const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const webpackNodeExternals = require('webpack-node-externals');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: path.join(__dirname, 'src/app/index.js')
  },
  output: {
    path: path.join(__dirname, '/src/public/js'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    noInfo: true
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      components: path.join(__dirname, 'src/app/components/App.vue')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html')

    })
  ]
};