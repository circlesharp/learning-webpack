const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    other: './src/other.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 3000,
    open: true,
    contentBase: './dist' // 告诉服务器从哪个目录中提供内容, 只有在你想要提供静态文件时才需要
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              // '@babel/preset-react'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, 'dist', 'manifest.json')
    // }),
  ],
  optimization: {
    splitChunks: {
       cacheGroups: {
         common: {
           chunks: 'initial', // 入口
           minSize: 0, // 最小的大小
           minChunks: 2 // 最小引用次数
         }
       }
    }
  }
}
