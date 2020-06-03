const webpack = require('webpack')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin  = require('optimize-css-assets-webpack-plugin')
let { smart } = require('webpack-merge')
let base = require('./webpack.base')

module.exports = smart(base, {
  mode: 'production',
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new TerserJSPlugin()
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ DEV: JSON.stringify('production') })
  ]
})
