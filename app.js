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

  console.debug(key, req.headers['x-api-key'])
  console.debug(secret, req.headers['x-api-secret'])

  if (req.headers['x-api-key'] !== key || req.headers['x-api-secret'] !== secret) {
    return res.status(403).send(apiFixtures.invalidCredentials)
  }

  next();
}

app.post('/payload', auth, (req, res) => {
  const {txjson, txblob} = req.body;
  if (!txjson && !txblob) {
    return res.sendStatus(400)
  }

  if (txjson && !txjson.TransactionType) {
    return res.sendStatus(400)
  }

  res.send(apiFixtures.payload.created)
})

app.get('/payload/:uuid', auth, (req, res) => {
  const payload = apiFixtures.payload.get

  res.send(req.params.uuid !== payload.meta.uuid ? 404 : payload)
})

app.get('/payload/ci/:identifier', auth, (req, res) => {
  const payload = apiFixtures.payload.get

  res.send(req.params.identifier !== payload.custom_meta.identifier ? 404 : payload)
})

app.delete('/payload/:uuid', auth,  (req, res) => {
  res.send(req.params.uuid !== payload.meta.uuid ? 404 : apiFixtures.payload.cancelled)
})

app.get('/ping', auth, (req, res) => {
  res.send(apiFixtures.ping.pong)
})

app.get('/curated-assets', auth,  (req, res) => {
  res.send(apiFixtures.curatedAssets)
})

app.get('/rates/:currency', auth, (req, res) => {
  const {currency} = req.params
  const result = apiFixtures.rates[currency]
  if (!result) {
    return res.sendStatus(400)
  }

  res.send(result)
})

app.post('/kyc-status', auth, (req, res) => {
  res.send({
    "account": req.params.account,
    "kycApproved": true
  })
})

app.get('/kyc-status/:account', auth, (req, res) => {
  res.send({
    "account": req.params.account,
    "kycApproved": true
  })
})

app.get('/xrpl-tx/:txid', auth, (req, res) => {
  const tx = apiFixtures.xrplTx
  res.send(tx.txid !== req.params.txid ? 404 : tx)
})

app.listen(port, () => {
  console.log(`Test server listening on port ${port}`)
})