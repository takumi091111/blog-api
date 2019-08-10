import { app } from './app'
import { fetchEntry, fetchEntries } from './client'

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
    .catch(e => {
      res.status(404)
      res.send({ message: e.message })
      return
    })
  res.send(entry)
})

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000')
})
