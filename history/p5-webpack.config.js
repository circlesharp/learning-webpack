// webpack.config.js 本质是一个 node 模块，不是 JSON

/** <-- webpack 简介 -->
 * webpack 是一个模块打包工具
 * 能够从一个需要处理的 JavaScript 文件开始
 * 构建一个依赖关系图（dependency graph），该图映射到了项目中每个模块
 * 然后将这个依赖关系图输出到一个或者多个 bundle 中
 */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash:6].js'
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.styl$/, use: ['style-loader', 'css-loader', 'stylus-loader'] },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      hash: true,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      }
    }),
    new CleanWebpackPlugin()
  ]
}
