const { join } = require('path')
const express = require('express')
const app = express()

const port = process.env.PORT0 || 8080

app.use(express.static(join(__dirname, 'build')))

app.get('/*', (req, res) => {
  res.sendfile(join(__dirname, 'build/index.html'))
})

app.listen(port, () => {
  console.log('listening')
})
