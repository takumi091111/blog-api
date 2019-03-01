const app = require('../app')
const fetch = require('node-fetch')
const { SPACE_ID, TOKEN } = require('../env')

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

app.get('/entries/list', async (req, res) => {
  const entries = await fetchEntries({
    limit: req.query.limit,
    skip: req.query.skip
  })
  res.send(entries)
})

module.exports = app
