// webpack.config.js 本质是一个 node 模块，不是 JSON

/** <-- webpack 简介 -->
 * webpack 是一个模块打包工具
 * 能够从一个需要处理的 JavaScript 文件开始
 * 构建一个依赖关系图（dependency graph），该图映射到了项目中每个模块
 * 然后将这个依赖关系图输出到一个或者多个 bundle 中
 */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin  = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // mode: 'development',
  mode: 'production',
  // entry: './src/index.js',
  entry: {
    home: './src/index.js',
    other: './src/other.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:6].js'
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new TerserJSPlugin()
    ]
  },
  module: {
    rules: [
      // {
      //   test: require.resolve('jquery'),
      //   use: 'expose-loader?$'
      // },
      {
        test: /\.html$/,
        use: 'html-withimg-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../' }
          },
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../' }
          },
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env' ],
            plugins: [
              [ "@babel/plugin-proposal-decorators", { "legacy": true } ],
              [ "@babel/plugin-proposal-class-properties", { "loose" : true } ],
              "@babel/plugin-transform-runtime",
            ]
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // limit: 200 * 1024,
            limit: 200,
            esModule: false,
            outputPath: './img/'
          }
        }
      },
      // {
      //   test: /\.js$/,
      //   include: path.resolve(__dirname, 'src'),
      //   exclude: /(node_modules|dist)/,
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       enforce: 'pre' // 强制 pre, post
      //     }
      //   }
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      hash: true,
      chunks: [ 'home', 'other' ],
      minify: { removeAttributeQuotes: true, collapseWhitespace: true }
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'other.html',
      hash: true,
      chunks: [ 'other' ],
      minify: { removeAttributeQuotes: true, collapseWhitespace: true }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: './css/main.css' }),
    new webpack.ProvidePlugin({ $: 'jquery' })
  ]
}
