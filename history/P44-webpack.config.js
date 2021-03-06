const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolveLoader:{
    modules: ['node_modules', path.resolve(__dirname, 'loaders')]
  },
  devtool: 'source-map',
  module: {
    rules:[
      {
        test: /\.js$/,
        use: {
          loader: 'banner-loader',
          options: {
            text: 'author: circlesharp',
            filename: path.resolve(__dirname, 'banner.txt')
          }
        }
      },
      // {
      //   test: /\.jpg/,
      //   use: {
      //     loader: 'file-loader',
      //     options:{

      //     }
      //   }
      // },
      {
        test: /\.jpg/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 20 * 1024
          }
        }
      }
    ]
  }
}