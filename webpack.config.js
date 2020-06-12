const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          path.resolve(__dirname, 'loader', 'style-loader.js'),
          path.resolve(__dirname, 'loader', 'stylus-loader.js')
        ]
      }
    ]
  }
}
