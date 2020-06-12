const path = require('path')

// 插件
class P {
  apply (compiler) {
    compiler.hooks.emit.tap('emit', function() {
      console.log('emit')
    })
  }
}
class P1 {
  apply (compiler) {
    compiler.hooks.afterPlugins.tap('afterPlugins', function() {
      console.log('afterPlugins')
    })
  }
}

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
  },
  plugins: [
    new P(),
    new P1(),
  ]
}
