const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    contentBase: './dist'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_module/,
      include: path.resolve(__dirname, 'src'),
      use: {
        loader: 'babel-loader',
        options: { presets: [ '@babel/preset-env' ] }
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
