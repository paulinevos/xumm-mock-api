require('dotenv').config()
const ws = require('ws')
const apiFixtures = require('./fixtures/api')
const port = process.env.XUMM_PORT ? process.env.XUMM_PORT : 3000

const express = require('express')
const app = express()
app.use(express.json());

const auth = (req, res, next) => {
  const key = process.env.XUMM_TEST_API_KEY ? process.env.XUMM_TEST_API_KEY : apiFixtures.api.key;
  const secret = process.env.XUMM_TEST_API_SECRET ? process.env.XUMM_TEST_API_SECRET : apiFixtures.api.secret;

  if (req.headers['X-API-Key'] !== key || req.headers['X-API-Secret'] !== secret) {
    return res.status(403).send(apiFixtures.invalidCredentials)
  }

  next();
}

app.post('/payload', (req, res) => {
  const {txjson, txblob} = req.body;
  if (!txjson && !txblob) {
    return res.sendStatus(400)
  }

  if (txjson && !txjson.TransactionType) {
    return res.sendStatus(400)
  }

  res.send(apiFixtures.payload.created)
})

app.post('/payload', (req, res) => {
  res.send({})
})

app.get('/ping', auth, (req, res) => {
  res.send(apiFixtures.ping)
})

app.get('/curated-assets', (req, res) => {
  res.send(apiFixtures.curatedAssets)
})

app.get('/rates/:currency', (req, res) => {
  const {currency} = req.params
  const result = apiFixtures.rates[currency]
  if (!result) {
    return res.sendStatus(400)
  }

  res.send(result)
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