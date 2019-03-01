const app = require('../app')
const fetch = require('node-fetch')
const { SPACE_ID, TOKEN } = require('../env')

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

app.get('/entries/:id', async (req, res) => {
  const entryId = req.params.id
  const entry = await fetchEntry(entryId)
  res.send(entry)
})

module.exports = app
