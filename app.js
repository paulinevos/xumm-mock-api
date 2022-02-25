require('dotenv').config()

const apiFixtures = require('./fixtures/api')
const express = require('express')
const app = express()
const port = typeof process.env.PORT !== "undefined" ? process.env.PORT : 3000

const auth = (req, res, next) => {
  const key = req.headers['X-API-Key'];
  const secret = req.headers['X-API-Secret'];

  if (apiFixtures.api.key !== key || apiFixtures.api.secret !== secret) {
    return res.status(403).send({
      "error": {
        "reference": "a26ffe51-e4b8-4a28-8c7b-f4edfd73e12f",
        "code": 811
      }
    });
  }

  next();
}

app.post('/payload', (req, res) => {
  res.send(apiFixtures.payload.created)
})

app.post('/payload', (req, res) => {
  res.send({})
})

app.post('/payload', (req, res) => {
  res.send({})
})

app.get('/ping', auth, (req, res) => {
  res.send({})
})

app.get('/curated-assets', (req, res) => {
  res.send({})
})

app.get('/kyc-status/:account', (req, res) => {
  res.send({})
})

app.get('/xrpl-tx/:txid', (req, res) => {
  res.send({})
})

app.listen(port, () => {
  console.log(`Test server listening on port ${port}`)
})