const express = require('express')
const webpack = require('webpack')
const middle = require('webpack-dev-middleware')

const app = express()

// 中间件
const config = require('./webpack.config.js')
const compiler = webpack(config)

app.use(middle(compiler))

app.get('/user', (req, res) => {
  res.json({
    name: 'circlesharp'
  })
})

app.listen(3000)
