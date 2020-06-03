const webpack = require('webpack')
let { smart } = require('webpack-merge')
let base = require('./webpack.base')

module.exports = smart(base, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    // 1 代理法
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: { '/api': '' }
    //   }
    // },

    // 2 mock 法
    // before (app) {
    //   app.get('/user', (req, res) => {
    //     res.json({
    //       name: 'circlesharp before'
    //     })
    //   })
    // }

    // 3 webpack 中间件法，用服务端端口
    // webpack-dev-middleware
  },
  plugins: [
    new webpack.DefinePlugin({ DEV: JSON.stringify('development') })
  ]
})
