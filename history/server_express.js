// express

const express = require('express')

const app = express()

app.get('/user', (req, res) => {
// app.get('/api/user', (req, res) => {
  res.json({
    name: 'circlesharp'
  })
})

app.listen(3000)
