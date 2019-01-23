const express = require('express')
const fetch = require('node-fetch')
const app = express()

const SPACE_ID = process.env.SPACE_ID
const TOKEN = process.env.TOKEN
const ALLOW_HOSTS = process.env.ALLOW_HOSTS.split(',')

app.use((req, res, next) => {
  // 指定したホストのみ利用可能
  const host = `${req.protocol}://${req.get('host')}`
  if (!ALLOW_HOSTS.includes(host)) {
    res.sendStatus(403)
    return false
  }
  res.header('Access-Control-Allow-Origin', host)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-Csrftoken, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET')
  res.header('Access-Control-Max-Age', 3600)
  next()
})

app.get('/entries/list', async (req, res) => {
  const entries = await fetchEntries({
    limit: req.query.limit,
    skip: req.query.skip
  })
  res.send(entries)
})

app.get('/entries/:id', async (req, res) => {
  const entryId = req.params.id
  const entry = await fetchEntry(entryId)
  res.send(entry)
})

const fetchEntries = async ({ limit = 10, skip = 0 }) => {
  const BASE_URL = 'https://cdn.contentful.com'
  const endPoint = `/spaces/${SPACE_ID}/environments/master/entries`
  const url = BASE_URL + endPoint

  const params = {
    order: '-sys.createdAt',
    limit: limit,
    skip: skip
  }

  const querys = Object.keys(params).map(key => `${key}=${params[key]}`).join('&')

  const response = await fetch(`${url}?${querys}`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${TOKEN}` }
  })
  return response.json()
}

const fetchEntry = async (entryId) => {
  const BASE_URL = 'https://cdn.contentful.com'
  const endPoint = `/spaces/${SPACE_ID}/environments/master/entries/${entryId}`
  const url = BASE_URL + endPoint
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${TOKEN}` }
  })
  return response.json()
}

app.listen(process.env.PORT || 3000)
