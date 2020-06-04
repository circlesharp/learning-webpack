const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    test: './src/test.js'
  },
  output: {
    filename: '[name].[hash:4].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ab'
  }
}
