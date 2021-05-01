require('dotenv').config()
const express = require('express')
const app = express()
const { authenticateRequest, apiGetRequest, apiPostRequest } = require('./api')

app.use(express.json())
app.get(
  '/api/:module/:service/:param_1?/:param_2?/:param_3?',
  authenticateRequest,
  (req, res) => {
    res.status(200)
    apiGetRequest(req, res)
  }
)
app.post('/api/:module/:service', authenticateRequest, (req, res) => {
  apiPostRequest(req, res)
})
app.use(function (req, res, next) {
  res.status(404)
  res.json({ error: '404: API Not Found' })
})
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
})
